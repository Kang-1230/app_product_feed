import { ProductItem } from "@/type/productItem";
import { create } from "zustand";

type State = {
  cart: ProductItem[];
};

type Actions = {
  addToCart: (product: ProductItem) => void;
  removeFromCart: (product: ProductItem) => void;
clearCart: () => void;
};

const useCartStore = create<State & Actions>((set) => ({
  cart: [],
  addToCart: (product: ProductItem) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),
  removeFromCart: (product: ProductItem) =>
    set((state) => ({
      cart: state.cart.filter((item: ProductItem) => item.id !== product.id),
    })),
  clearCart: () => set((state) => ({ cart: [] })),
}));

export default useCartStore;
