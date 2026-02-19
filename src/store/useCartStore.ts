import { create } from "zustand";
import { instance } from "@/api/instance";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";

export interface Cart {
  id: number;
  items: CartApiItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartApiItem {
  itemId: number;
  productId: number;
  groupId?: number;
  name?: string;
  brand?: string;
  price?: number;
  quantity: number;
  total?: number;
  color?: string;
  size?: number;
  image?: string;
}

export interface CartStore {
  loading: boolean;
  mutating: boolean;
  getCart: (force?: boolean) => Promise<void>;
  addCartItem: (productId: number, quantity?: number) => Promise<void>;
  updateCartItem: (productId: number, quantity: number) => Promise<void>;
  removeCartItem: (productId: number) => Promise<void>;
  createOrder: () => Promise<void>;
  cart: Cart | null;
  error: string | null | undefined;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  loading: false,
  mutating: false,
  error: null,

  getCart: async (force = false) => {
    if (get().loading && !force) return;

    set({ loading: true, error: null });
    try {
      const response = await instance.get<Cart>("/cart");
      set({ loading: false, cart: response.data });
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
      set({
        loading: false,
        error: errorMessage,
      });
    }
  },

  addCartItem: async (productId, quantity = 1) => {
    const safeQuantity = Math.max(1, quantity);
    set({ mutating: true, error: null });

    try {
      await instance.post("/cart", {
        productId,
        quantity: safeQuantity,
      });
      await get().getCart(true);
      set({ mutating: false });
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
      set({
        mutating: false,
        error: errorMessage,
      });
    }
  },

  updateCartItem: async (productId, quantity) => {
    const safeQuantity = Math.max(1, quantity);
    set({ mutating: true, error: null });

    try {
      await instance.patch("/cart/quantity", {
        productId,
        quantity: safeQuantity,
      });
      await get().getCart(true);
      set({ mutating: false });
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
      set({
        mutating: false,
        error: errorMessage,
      });
    }
  },

  removeCartItem: async (productId) => {
    set({ mutating: true, error: null });

    try {
      await instance.delete(`/cart/item/${productId}`);
      await get().getCart(true);
      set({ mutating: false });
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
      set({
        mutating: false,
        error: errorMessage,
      });
    }
  },

  createOrder: async () => {
    set({ mutating: true, error: null });

    try {
      await instance.post("/orders");
      await get().getCart(true);
      toast.success("Заказ успешно оформлен");
      set({ mutating: false });
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
      set({
        mutating: false,
        error: errorMessage,
      });
    }
  },
}));
