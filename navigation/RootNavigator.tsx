// src/navigation/RootNavigator.tsx
import CustomHeader from "@/components/Header";
import Cart from "@/screens/Cart";
import Home from "@/screens/Home";
import ProductDetail from "@/screens/ProductDetail";
import { RootStackParamList } from "@/type/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          header: () => {
            let title;
            switch (route.name) {
              case "Home":
                title = "상품 목록";
                break;
              case "Details":
                title = "상품 상세";
                break;
              case "Cart":
                title = "장바구니";
                break;
              default:
                title = "상품 목록";
            }

            return (
              <CustomHeader
                title={title}
                onPressCart={() => navigation.navigate("Cart")}
                onPressLogo={() => navigation.navigate("Home")}
              />
            );
          },
        })}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
