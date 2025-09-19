import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  onPressCart?: () => void;
  onPressLogo?: () => void;
};

export default function CustomHeader({
  title,
  onPressCart,
  onPressLogo,
}: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white">
      <TouchableOpacity onPress={onPressLogo}>
        <Image
          source={require("../assets/images/yammi-logo.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      <Text className="text-lg font-bold">{title}</Text>

      <TouchableOpacity onPress={onPressCart}>
        <Ionicons name="cart" size={30} color="#00AEEF" />
      </TouchableOpacity>
    </View>
  );
}
