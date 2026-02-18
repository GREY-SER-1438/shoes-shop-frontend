import { useEffect, type ReactNode } from "react";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { useMeStore } from "@/store/useMeStore";
import Cookies from "js-cookie";

type MainLayoutProps = {
  children: ReactNode;
  cartCount?: number;
};

export default function MainLayout({
  children,
  cartCount = 0,
}: MainLayoutProps) {
  const { getMe } = useMeStore();
  useEffect(() => {
    if (Cookies.get("token") || Cookies.get("access_token")) {
      getMe();
    }
  }, []);
  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={cartCount} />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
