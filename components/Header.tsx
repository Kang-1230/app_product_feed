import useCartStore from "@/store/useCartStore";
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
  //중복 포함한 장바구니의 총 수량 표시
  const cartCount = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <View className="flex-row items-center justify-between px-4 pt-6 pb-3 bg-white">
      <TouchableOpacity onPress={onPressLogo}>
        <Image
          source={require("../assets/images/yammi-logo.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>

      <Text className="text-lg font-bold">{title}</Text>

      <TouchableOpacity onPress={onPressCart} style={{ position: "relative" }}>
        <Ionicons style={{ top: 0 }} name="cart" size={24} color="#00AEEF" />
        {cartCount > 0 && (
          <View
            style={{
              position: "absolute",
              top: -4,
              right: -6,
              backgroundColor: "red",
              borderRadius: 8,
              width: 16,
              height: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              {cartCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
