import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

// Define the Movie type (adjust if needed)
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

const MovieCard: React.FC<Movie> = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}) => {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/300x450.png?text=No+Image";

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity
        className="w-[30%]" // good for 3-column grid
        activeOpacity={0.8}
      >
        {/* Movie Poster */}
        <Image
          source={{ uri: posterUrl }}
          className="w-full h-40 rounded-lg"
          resizeMode="cover"
        />

        {/* Movie Info */}
        <View className="mt-2">
          <Text
            className="text-white text-xs font-semibold"
            numberOfLines={1} // avoids layout breaking
          >
            {title || "Untitled"}
          </Text>

          <Text className="text-gray-400 text-[10px] mt-1">
            ⭐ {vote_average != null ? vote_average.toFixed(1) : "N/A"} •{" "}
            {release_date ? release_date.slice(0, 4) : "----"}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
