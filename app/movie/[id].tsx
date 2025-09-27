import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter()

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true; // ✅ guard against updates on unmounted component

    const loadMovie = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchMovieDetails(id as string);
        if (isMounted) setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadMovie();

    return () => {
      isMounted = false; // cleanup on unmount
    };
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#ab8bff" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-white">Movie details not found</Text>
      </View>
    );
  }

  // movie info section
  interface MovieInfoProps {
    label: string;
    value?: string | number | null;
  }

  const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-light-100 mt-2 font-bold text-sm">
        {value || "N/A"}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary">
    <TouchableOpacity
  onPress={() => router.push("/(tabs)")}
  className="absolute top-10 left-5 z-50 flex-row items-center justify-center bg-white rounded-full px-4 py-2 w-[110px]"
>
  <Image source={icons.arrow} className="w-4 h-4 mr-2" resizeMode="contain" />
  <Text className="text-sm text-primary font-semibold">Go Back</Text>
</TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Poster */}
        <View>
          <Image
            className="w-full h-[565px]"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            resizeMode="cover"
          />
        </View>

        {/* Details */}
        <View className="w-full flex-col items-start justify-start py-6 px-4">
          <Text className="text-white font-bold text-xl">{movie.title}</Text>

          {/* Year + Runtime */}
          <View className="w-full flex-row items-center justify-start gap-2 my-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.runtime
                ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                : "N/A"}
            </Text>
          </View>

          {/* Ratings */}
          <View className="flex-row items-center">
            <View className="flex-row items-center bg-dark-100 px-2 py-2 gap-1 mt-2 rounded">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white text-sm font-bold">
                {Math.round(movie?.vote_average ?? 0)}/10
              </Text>
              <Text className="text-light-200">
                ({movie?.vote_count} votes)
              </Text>
            </View>
          </View>

          {/* Overview */}
          <MovieInfo label="Overview" value={movie?.overview} />
          {/* Genres */}
          <MovieInfo label="Genres" value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"} />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo label="Budget" value={`$${movie?.budget / 1_000_000}million`} />
            <MovieInfo label="Revenue" value={`$${Math.round(movie?.revenue) / 1_000_000}million`} />

          </View>

          <MovieInfo label="Production Companies" value={movie?.production_companies.map((c)=>c.name).join(' - ')||'N/A'} />


        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
