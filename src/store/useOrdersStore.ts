import { create } from "zustand";
import { instance } from "@/api/instance";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";

export interface OrderProduct {
  id: number;
  groupId: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  color: string;
  size: number;
  stock: number;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price_at_purchase: number;
  product: OrderProduct;
}

export interface Order {
  id: number;
  total_price: number;
  status: string;
  items: OrderItem[];
}

interface OrdersStore {
  orders: Order[];
  loading: boolean;
  error: string | null | undefined;
  getOrders: (force?: boolean) => Promise<void>;
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  getOrders: async (force = false) => {
    if (get().loading && !force) return;

    set({ loading: true, error: null });
    try {
      const response = await instance.get<Order[]>("/orders");
      set({ loading: false, orders: response.data });
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
      set({
        loading: false,
        error: errorMessage,
      });
    }
  },
}));
