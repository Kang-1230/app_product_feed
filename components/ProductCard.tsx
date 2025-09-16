import { ProductItem } from "@/type/productItem";
import { Image, Text, View } from "react-native";

const ProductCard = ({ item }: { item: ProductItem }) => {
  return (
    <View className="flex flex-col max-w-[1200px]">
      <Image source={{ uri: item.image }} style={{ width: 276, height: 218 }} />

      <View className="w-[276px] h-[146px]">
        <Text className="w-[126px] h-[22px]">{item.salePrice}원</Text>

        <Text className="text-[16px] leading-[24px] font-semibold">
          {item.name}
        </Text>

        <Text
          className="text-[13px] leading-[18px] h-[54px] overflow-hidden"
          numberOfLines={3} // RN에서는 이렇게 줄 제한 가능
        >
          {item.description}
        </Text>

        <View className="flex-row gap-[2px] items-center">
          {/* <Image
            source={require("../assets/review.png")} // RN은 보통 require 로 로컬 이미지
            style={{ width: 18, height: 18 }}
          /> */}
          <Text className="text-[12px] leading-[18px]">
            할인율 {item.discountRate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
