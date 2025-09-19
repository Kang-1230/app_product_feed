import useCartStore from "@/store/useCartStore";
import { RootStackParamList } from "@/type/navigation";
import { ProductItem } from "@/type/productItem";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Nav = NativeStackNavigationProp<RootStackParamList, "Home">;

const ProductCard = ({ item }: { item: ProductItem }) => {
  const navigation = useNavigation<Nav>();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { id: item.id.toString() })}
    >
      <View className="flex flex-col max-w-[1200px]">
        <Image
          source={{ uri: item.image }}
          style={{ width: 276, height: 218 }}
        />

        <View className="w-[276px] h-[146px]">
          <Text>{item.id}</Text>
          <Text className="w-[126px] h-[22px]">{item.salePrice}원</Text>

          <Text className="text-[16px] leading-[24px] font-semibold">
            {item.name}
          </Text>

          <Text
            className="text-[13px] leading-[18px] h-[54px] overflow-hidden"
            numberOfLines={3}
          >
            {item.description}
          </Text>

          <View className="flex-row gap-[2px] items-center">
            <Text className="text-[12px] leading-[18px]">
              할인율 {item.discountRate}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
