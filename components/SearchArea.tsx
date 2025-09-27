import { View, TextInput, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void; // Optional callback when input is focused
  value?: string; // ✅ use lowercase string + optional
  onChangeText?: (text: string) => void; // ✅ optional too
}

const SearchArea: React.FC<Props> = ({ placeholder, onPress, value, onChangeText }) => {
  return (
    <View
      className="z-10 mx-auto w-[97%] rounded-full bg-dark-200 mt-5 mb-5 
      flex-row items-center justify-start py-2 px-5 gap-2"
    >
      {/* Search Icon */}
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />

      {/* Input */}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 text-neutral-300 text-sm"
        value={value}
        onChangeText={onChangeText}
        onFocus={onPress} // ✅ trigger custom handler when focused
      />
    </View>
  );
};

export default SearchArea;
