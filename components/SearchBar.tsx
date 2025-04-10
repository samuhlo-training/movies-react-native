import { View, TextInput } from "react-native";
import React from "react";
import { Image } from "react-native";
import { icons } from "@/constants/icons";

const SearchBar = ({
  onPress,
  placeholder,
}: {
  onPress?: () => void;
  placeholder: string;
}) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#A8B5DB"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        placeholderTextColor="#A8B5DB"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
