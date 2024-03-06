import { create } from "zustand";

interface Order {
  orders: order[];
  addOrder(order: order): void;
  removeOrder(id: string): void;
  getItems(): order[];
}

export type order = {
  id: string;
  status: string;
};

const useOrder = create<Order>((set, get) => ({
  orders: [],

  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),

  removeOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== id),
    })),

  getItems: () => get().orders,
}));

export default useOrder