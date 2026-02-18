import type { ReactNode } from "react";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";

type MainLayoutProps = {
  children: ReactNode;
  cartCount?: number;
};

export default function MainLayout({ children, cartCount = 0 }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={cartCount} />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}
