// src/navigation/RootNavigator.tsx
import Home from "@/screens/Home";
import ProductDetail from "@/screens/ProductDetail";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 1) 스크린 정의 (정적 API)
const RootStack = createNativeStackNavigator({
  screens: {
    Home: Home,
    Details: {
      screen: ProductDetail,
    },
  },
});

// 2) 내비게이션 객체 생성 및 내보내기
export const Navigation = createStaticNavigation(RootStack);
