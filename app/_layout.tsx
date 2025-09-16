import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  //라우터 설정
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{ title: "상품 목록", headerShown: false }}
            />
            <Stack.Screen
              name="product/[id]"
              options={{ title: "상품 상세", headerShown: false }}
            />
            <Stack.Screen
              name="cart/index"
              options={{ title: "장바구니", headerShown: false }}
            />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
