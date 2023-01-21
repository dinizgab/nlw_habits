import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import LogoImage from "../assets/logo.svg";


export default function Header() {
  return (
    <View className="w-full flex-row item-center justify-between">
      <LogoImage />

      <TouchableOpacity activeOpacity={0.7} className="flex flex-row items-center h-11 px-4 border border-violet-500 rounded-lg">
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text className="ml-2 text-white font-semibold">Novo</Text>
      </TouchableOpacity>
    </View>
  );
}
