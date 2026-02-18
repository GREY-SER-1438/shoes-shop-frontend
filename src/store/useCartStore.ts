import { create } from "zustand";
import { instance } from "@/api/instance";

export interface Cart {
  id: number;
  name: string;
  ip: string;
  port: string;
  map: string;
  online: number;
}

export interface cartStore {
  loading: boolean;
  getCart: () => Promise<void>;
  cart: Cart | null;
  error: string | null | undefined;
}

export const useCartStore = create<cartStore>((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  getCart: async () => {
    if (get().loading) return;

    set({ loading: true });
    try {
      const response = await instance.get<Cart>("/cart");
      set({ loading: false, cart: response.data });
    } catch (e) {
      console.error(e);
      set({
        loading: false,
        error: e instanceof Error ? e.message : "An unknown error occurred",
      });
    }
  },
}));
