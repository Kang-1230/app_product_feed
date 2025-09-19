import { ProductItem } from "@/type/productItem";
import { create } from "zustand";

type CartItem = ProductItem & { quantity: number };

type State = {
  cart: CartItem[];
};

type Actions = {
  addToCart: (product: ProductItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const useCartStore = create<State & Actions>((set) => ({
  cart: [],

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
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  // 특정 상품 완전히 제거
  removeFromCart: (id: number) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // 장바구니 비우기(결제 완료)
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
