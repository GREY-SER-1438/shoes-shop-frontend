import { create } from "zustand";
import { instance } from "@/api/instance";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/get-error-message";

export interface Me {
  id: number;
  email: string;
  password?: string;
  role?: {
    id: number;
    name: string;
  };
}

export interface meStore {
  loading: boolean;
  getMe: () => Promise<void>;
  me: Me | null;
  error: string | null | undefined;
}

export const useMeStore = create<meStore>((set, get) => ({
  me: null,
  loading: false,
  error: null,

  getMe: async () => {
    if (get().loading) return;

    set({ loading: true, error: null });
    try {
      const response = await instance.get<Me>("/user/me");
      set({ loading: false, me: response.data, error: null });
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
      set({
        loading: false,
        me: null,
        error: errorMessage,
      });
    }
  },
}));
