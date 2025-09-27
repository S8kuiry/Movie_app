import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import SearchArea from "@/components/SearchArea";
import { getTrendingMovies, updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // ✅ Debounce user input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);


  // trending movies 
  const {
    data:trendingMovies,
    loading:trendingLoading,
    error:trendingError,

  } = useFetch(getTrendingMovies)

  // ✅ Stable fetch callback
  const fetchMoviesCallback = useCallback(
    () => fetchMovies({ query: debouncedQuery }),
    [debouncedQuery]
  );

  const {
    data: moviesRaw,
    loading: moviesLoading,
    error: moviesError,
    refetch,
  } = useFetch(fetchMoviesCallback, false);

  // ✅ Ensure movies is always array
  const movies = Array.isArray(moviesRaw) ? moviesRaw : [];

  // ✅ Trigger search when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery) {
      refetch();
    }
  }, [debouncedQuery]);

  // ✅ Update search count only when results exist
  useEffect(() => {
    if (debouncedQuery && movies.length > 0) {
      updateSearchCount(debouncedQuery, movies[0]).catch((err) =>
        console.error("updateSearchCount failed:", err)
      );
    }
  }, [debouncedQuery, movies.length]);

  return (
    <View className="flex-1 w-full h-[100%] bg-primary">
      {/* Background */}
      <Image
       source={images.bg}
  className="absolute top-0 left-0 w-full h-full"
  resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item, index) =>
          item?.id?.toString() || index.toString()
        }
        className="w-full px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginBottom: 10,
          marginTop: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            {/* Logo */}
            <View className="w-full flex-row items-center justify-center mt-20 mb-5">
              <Image source={icons.logo} className="w-10 h-10" />
            </View>

            {/* Search Area */}
            <View className="my-3 w-full flex items-center justify-center">
              <SearchArea
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />

              
            </View>

            {/* Loading */}
            {(moviesLoading || trendingLoading) && (
              <ActivityIndicator
                size="large"
                color="#e4e1eaff"
                className="my-3"
              />
            )}

            {/* Error */}
            {(moviesError || trendingError) && (
              <Text className="text-red-500 mx-auto mt-3">
                Error: {moviesError?.message || trendingError?.message}
              </Text>
            )}

            {/* Results header */}
            {!moviesLoading &&
              !moviesError &&
              debouncedQuery &&
              movies.length > 0 && (
                <View className="w-full flex-row items-start justify-start mt-2 mb-3">
                  <Text className="text-white text-xl font-medium mt-3">
                    Search Results for:
                    <Text className="text-purple-400 font-bold">
                      {" "}
                      {debouncedQuery.charAt(0).toUpperCase() +
                        debouncedQuery.slice(1)}
                    </Text>
                  </Text>
                </View>
              )}
          </>
        }
        ListEmptyComponent={
          <>
            {!moviesLoading && !moviesError ? (
              <View className="mt-5 px-5 w-full flex items-center justify-center">
                <Text className="text-gray-500 ">
                  {searchQuery ? "No results found" : "Search for Movies"}
                </Text>
              </View>
            ) : null}
          </>
        }
      />
    </View>
  );
};

export default Search;
