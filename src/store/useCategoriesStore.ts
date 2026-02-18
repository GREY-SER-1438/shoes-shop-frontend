import { create } from "zustand";
import { instance } from "@/api/instance";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";

export interface Category {
  id: number;
  items: Items[];
  totalItems: number;
  totalPrice: number;
}

interface Items {
  itemId: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}
export interface categoryStore {
  loading: boolean;
  getCategory: () => Promise<void>;
  category: Category | null;
  error: string | null | undefined;
}

export const useCategoryStore = create<categoryStore>((set, get) => ({
  category: null,
  loading: false,
  error: null,

  getCategory: async () => {
    if (get().loading) return;

    set({ loading: true });
    try {
      const response = await instance.get<Category>("/category");
      set({ loading: false, category: response.data });
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
