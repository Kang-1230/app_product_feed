// src/screens/ProductDetail.tsx
import { getProductById } from "@/lib/api";
import useCartStore from "@/store/useCartStore";
import { RootStackParamList } from "@/type/navigation";
import { ProductItem } from "@/type/productItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function ProductDetail({ route }: Props) {
  const { id } = route.params;
  const addToCart = useCartStore((state) => state.addToCart);
  const [item, setItem] = useState<ProductItem | null>(null);

  useEffect(() => {
    getProductById(Number(id)).then((item) => {
      setItem(item || null);
    });
  }, [id]);

  console.log("item", item);

  if (!item) return null;

  return (
    <View>
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
      <Button title="담기" onPress={() => addToCart(item)} />
    </View>
  );
}
