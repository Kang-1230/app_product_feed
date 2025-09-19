// src/screens/ProductDetail.tsx
import { RootStackParamList } from "@/type/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function ProductDetail({ route, navigation }: Props) {
  const { id } = route.params;

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <View>
          <Text>home</Text>
        </View>
      </TouchableOpacity>
      <Text>ProductDetail : {id}</Text>
    </View>
  );
}
