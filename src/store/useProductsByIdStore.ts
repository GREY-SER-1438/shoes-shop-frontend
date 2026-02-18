import { create } from "zustand";
import { instance } from "@/api/instance";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";

export interface ProductsById {
  groupId: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
  variants: {
    id: number;
    color: string;
    size: number;
    stock: number;
  }[];
}

export interface productsByIdStore {
  loading: boolean;
  getProductById: (groupId: number) => Promise<ProductsById | null>;
  productsById: Record<number, ProductsById>;
  error: string | null | undefined;
}

export const useProductsByIdStore = create<productsByIdStore>((set, get) => ({
  productsById: {},
  loading: false,
  error: null,

  getProductById: async (groupId) => {
    const cachedProduct = get().productsById[groupId];
    if (cachedProduct) return cachedProduct;

    if (get().loading) return null;

    set({ loading: true });
    try {
      const response = await instance.get<ProductsById>(`/products/${groupId}`);
      const product = response.data;

      set((state) => ({
        loading: false,
        productsById: {
          ...state.productsById,
          [groupId]: product,
        },
      }));

      return product;
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
      set({
        loading: false,
        error: errorMessage,
      });
      return null;
    }
  },
}));
