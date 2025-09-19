import useCartStore from "@/store/useCartStore";
import { Button, Image, Text, View } from "react-native";

export default function Cart() {
  const cartList = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  return (
    <View>
      {cartList.map((item) => (
        <View key={item.id}>
          <Image
            key={item.image}
            source={{ uri: item.image }}
            style={{ width: 100, height: 100 }}
          />
          <Text key={item.name}>{item.name}</Text>
          <Text key={item.quantity}>{item.quantity}</Text>
          <Text key={item.discountRate}>할인율{item.discountRate}</Text>
          <Text key={item.salePrice}>판매가{item.salePrice}</Text>
          <Text key={item.salePrice * item.quantity + item.id}>
            상품 가격{item.salePrice * item.quantity}
          </Text>
        </View>
      ))}
      {cartList.length > 0 ? (
        <Text>
          총 가격
          {cartList.reduce(
            (sum, item) => sum + item.salePrice * item.quantity,
            0
          )}
        </Text>
      ) : (
        <Text>장바구니가 비었습니다.</Text>
      )}
      <Button
        title="주문하기"
        onPress={() => {
          clearCart();
          alert("주문이 완료되었습니다.");
        }}
      />
    </View>
  );
}
