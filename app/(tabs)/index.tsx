import { View, Text, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchArea from "@/components/SearchArea";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

const Index = () => {
  const router = useRouter();

  // Fetch trending movies
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  // Fetch latest movies
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      {/* Background */}
      <Image
        source={images.bg}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 100,
        }}
      >
        {/* Logo */}
        <Image
          source={icons.logo}
          className="w-10 h-10 mt-20 mb-5 mx-auto"
        />

        {/* Search Area */}
        <SearchArea
          onPress={() => router.push("/search")}
          placeholder={"Search through 300+ movies online"}
        />

        {/* Trending Movies Header */}
        {trendingMovies && trendingMovies.length > 0 && (
          <View className="mt-10">
            <Text className="text-white font-bold text-lg">
              Trending Movies
            </Text>
          </View>
        )}

        {/* Movies Section */}
        {(moviesLoading || trendingLoading) ? (
          <ActivityIndicator
            size="large"
            color="#ab8bff"
            style={{ marginTop: 20, alignSelf: "center" }}
          />
        ) : (moviesError || trendingError) ? (
          <Text className="text-red-500 text-center mt-5">
            Error: {String(moviesError || trendingError)}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* Trending Movies List */}
            <FlatList
              data={Array.isArray(trendingMovies) ? trendingMovies : []}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-4" />}
              keyExtractor={(item, index) =>
                `trending-${item.movie_id}-${index}`
              }
              renderItem={({ item, index }) =>
                item ? (
                  <TrendingCard
                    movie_id={item.movie_id}
                    title={item.title || ""}
                    poster_url={item.poster_url || ""}
                    index={index} // ✅ properly passed index
                  />
                ) : null
              }
            />
            {/* Latest Movies Section */}
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>

            <FlatList
              data={Array.isArray(movies) ? movies : []}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item, index) =>
                item?.id ? item.id.toString() : index.toString()
              }
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
