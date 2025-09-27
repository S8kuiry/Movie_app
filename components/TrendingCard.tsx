import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import MaskedView from '@react-native-masked-view/masked-view'

interface TrendingCardProps {
  movie_id: number;
  title: string;
  poster_url: string | null;
  index?: number;
}

const TrendingCard = ({ movie_id, title, poster_url,index }: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie_id}`}  asChild>
      <TouchableOpacity className="w-35 relative shadow shadow-white">
        {/* Movie Poster */}
        {poster_url ? (
          <Image
            source={{ uri: poster_url }}
            className="w-32 h-48 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="w-32 h-48 bg-gray-500 rounded-lg justify-center items-center">
            <Text className="text-white">No Image</Text>
          </View>
        )}

        {/* Movie Title Overlay */}
        <View className="absolute bottom-7 left-1">
            <MaskedView maskElement={
                            <Text className="text-white text-6xl font-bold ">{index+1}</Text>


            }>
                <Image source={images.rankingGradient} className="size-14" resizeMode="cover"></Image>
                
            </MaskedView>
        </View>
         {/* Movie Info */}
              <View className="mt-2">
                <Text
                  className="text-white text-xs font-semibold"
                  numberOfLines={2} // avoids long text breaking layout
                >
                  {title.length > 20 ?title.slice(0,20)+'...':title}
                </Text>
        
               
              </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
