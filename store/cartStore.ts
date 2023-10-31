import { create } from "zustand";
import { Product } from "@/store/interfaces";
import { zustandStorage } from "./mmkv";
import { createJSONStorage, persist } from "zustand/middleware";

type CartStore = {
  cart: Array<Product & { quantity: number }>;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  items: number;
};

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      items: 0,
      addToCart: (product: Product) =>
        set((state) => {
          state.items++;
          const hasItem = state.cart.find((item) => item.id === product.id);
          if (!hasItem) {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
            };
          } else {
            const cart = [...state.cart];
            const index = cart.findIndex((item) => item.id === product.id);
            cart[index].quantity += 1;
            return {
              cart,
            };
          }
        }),
      removeFromCart: (product: Product) =>
        set((state) => {
          return {
            cart: state.cart
              .map((item) => {
                if (item.id === product.id) {
                  state.items--;
                  return {
                    ...item,
                    quantity: item.quantity - 1,
                  };
                }
                return item;
              })
              .filter((item) => item.quantity > 0),
          };
        }),
      clearCart: () => set(() => ({ cart: [], items: 0 })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useCartStore;
