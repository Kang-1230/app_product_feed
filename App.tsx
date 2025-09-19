// App.tsx
import RootNavigator from "@/navigation/RootNavigator";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCartStore from "./store/useCartStore";

export default function App() {
  const hydrate = useCartStore((state) => state.hydrate);
  // 앱 시작 시 장바구니 복원
  useEffect(() => {
    hydrate();
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
