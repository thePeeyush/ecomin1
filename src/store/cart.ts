import { create } from "zustand";

interface Cart {
  cart: item[];
  addItem(item: item): void;
  setQuantity(id: string, quantity: number): void;
  removeItem(id: string): void;
  clearCart(): void;
  getQuantity(id: string): number;
  isInCart(id: string): boolean;
  getItems(): item[];
}

type item = {
  id: string;
  quantity: number;
};

const useCart = create<Cart>((set, get) => ({
  cart: [],

  addItem: (item) =>
    set((state) => {
      if (state.cart.some((i) => i.id === item.id)) {
        return state;
      }
      return { cart: [...state.cart, item] };
    }),

  setQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),

  removeItem: (id) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),

  clearCart: () => set({ cart: [] }),

  getQuantity: (id) => get().cart.find((item) => item.id === id)?.quantity || 0,

  isInCart: (id) => get().cart.some((item) => item.id === id),

  getItems: () => get().cart,
}));

export default useCart;
