import { ProductItem } from "@/type/productItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type CartItem = ProductItem & { quantity: number };

type State = {
  cart: CartItem[];
};

type Actions = {
  addToCart: (product: ProductItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  hydrate: () => void;
};

const useCartStore = create<State & Actions>((set) => ({
  cart: [],

  // 장바구니 복원
  hydrate: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cart");
      if (jsonValue) {
        set({ cart: JSON.parse(jsonValue) });
      }
    } catch (e) {
      console.error("장바구니 복원 실패", e);
    }
  },

  // 같은 상품 있으면 quantity(수량) +1
  addToCart: (product: ProductItem) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      const updatedCart = [...state.cart, { ...product, quantity: 1 }];
      // 장바구니 저장
      AsyncStorage.setItem("cart", JSON.stringify(updatedCart)).catch(
        (error) => {
          console.error("장바구니 저장 실패:", error);
        }
      );
      return { cart: updatedCart };
    }),

  // 특정 상품 완전히 제거
  removeFromCart: (id: number) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);
      AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  // 장바구니 비우기(결제 완료)
  clearCart: () => {
    set({ cart: [] });
    AsyncStorage.removeItem("cart");
  },
}));

export default useCartStore;
