import { create } from "zustand";
import { instance } from "@/api/instance";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";

export interface ProductListItem {
  groupId: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
  color: string[];
  size: number[];
  stock: number;
}

type ProductsStore = {
  products: ProductListItem[];
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
};

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  getProducts: async () => {
    if (get().loading) return;

    set({ loading: true, error: null });
    try {
      const response = await instance.get<unknown[]>("/products");

      const normalizedProducts: ProductListItem[] = response.data
        .map((item) => {
          const raw = item as Record<string, unknown>;
          const rawGroupId = raw.groupId ?? raw.group_id ?? raw.id;
          const groupId =
            typeof rawGroupId === "number"
              ? rawGroupId
              : Number(rawGroupId);

          if (!Number.isFinite(groupId)) return null;

          return {
            groupId,
            name: String(raw.name ?? ""),
            brand: String(raw.brand ?? ""),
            image: String(raw.image ?? ""),
            price:
              typeof raw.price === "number" ? raw.price : Number(raw.price ?? 0),
            category: String(raw.category ?? ""),
            color: Array.isArray(raw.color)
              ? raw.color.map((value) => String(value))
              : [],
            size: Array.isArray(raw.size)
              ? raw.size
                  .map((value) =>
                    typeof value === "number" ? value : Number(value),
                  )
                  .filter((value) => Number.isFinite(value))
              : [],
            stock:
              typeof raw.stock === "number" ? raw.stock : Number(raw.stock ?? 0),
          };
        })
        .filter((item): item is ProductListItem => item !== null);

      set({ products: normalizedProducts, loading: false });
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
