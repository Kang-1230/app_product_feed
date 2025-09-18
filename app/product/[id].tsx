import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Link href="/">
        <View>
          <Text>home</Text>
        </View>
      </Link>
      <Text>ProductDetail : {id}</Text>
    </View>
  );
}
