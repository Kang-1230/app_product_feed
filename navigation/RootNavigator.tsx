// src/navigation/RootNavigator.tsx
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
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
