import { useEffect, useState } from "react";
import Cart from "@/pages/Cart";
import type { CartItem } from "@/data/cart";
import { readCart, writeCart } from "@/data/cart";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MainLayout from "@/components/layouts/MainLayout";

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readCart());

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  useEffect(() => {
    writeCart(cartItems);
  }, [cartItems]);

  const isSameCartLine = (
    item: CartItem,
    target: Pick<CartItem, "productId" | "size" | "color">,
  ) =>
    item.productId === target.productId &&
    item.size === target.size &&
    item.color === target.color;

  const addToCart = (productId: number, color: string, size = "42") => {
    void productId;
    void color;
    void size;
  };

  const changeQuantity = (
    target: Pick<CartItem, "productId" | "size" | "color">,
    delta: number,
  ) => {
    setCartItems((current) =>
      current.map((item) =>
        isSameCartLine(item, target)
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (target: Pick<CartItem, "productId" | "size" | "color">) => {
    setCartItems((current) =>
      current.filter((item) => !isSameCartLine(item, target)),
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isCartPage = pathname === "/cart";
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="floating-orb absolute -left-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-[color:var(--primary)]/20 blur-3xl" />
        <div className="floating-orb-reverse absolute -bottom-40 -right-40 h-[48rem] w-[48rem] rounded-full bg-[color:var(--ring)]/20 blur-3xl" />
      </div>
      {isCartPage ? (
        <MainLayout cartCount={cartCount}>
          <Cart
            cartItems={cartItems}
            onChangeQuantity={changeQuantity}
            onRemoveItem={removeItem}
          />
        </MainLayout>
      ) : isLoginPage ? (
        <MainLayout>
          <Login />
        </MainLayout>
      ) : isRegisterPage ? (
        <MainLayout>
          <Register />
        </MainLayout>
      ) : (
        <MainLayout cartCount={cartCount}>
          <Home onAddToCart={addToCart} />
        </MainLayout>
      )}
    </div>
  );
}
