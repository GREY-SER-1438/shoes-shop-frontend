import { useEffect, type ReactNode } from "react";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { useMeStore } from "@/store/useMeStore";
import Cookies from "js-cookie";
import { useCartStore } from "@/store/useCartStore";

type MainLayoutProps = {
  children: ReactNode;
  cartCount?: number;
};

export default function MainLayout({
  children,
  cartCount = 0,
}: MainLayoutProps) {
  const { getMe, me, loading: meLoading } = useMeStore();
  const { getCart } = useCartStore();
  useEffect(() => {
    if (Cookies.get("token") || Cookies.get("access_token")) {
      if (!me && !meLoading) {
        void getMe();
      }
      void getCart();
    }
  }, [getCart, getMe, me, meLoading]);
  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={cartCount} />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
