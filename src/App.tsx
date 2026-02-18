import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cart from "@/pages/Cart";
import type { CartItem } from "@/data/cart";
import { readCart, writeCart } from "@/data/cart";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MainLayout from "@/components/layouts/MainLayout";
import { Toaster } from "./components/ui/sonner";
import Cookies from "js-cookie";

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => readCart());

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
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setCartItems((current) => {
      const existingItem = current.find((item) =>
        isSameCartLine(item, { productId, color, size }),
      );

      if (!existingItem) {
        return [...current, { productId, color, size, quantity: 1 }];
      }

      return current.map((item) =>
        isSameCartLine(item, { productId, color, size })
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
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

  const removeItem = (
    target: Pick<CartItem, "productId" | "size" | "color">,
  ) => {
    setCartItems((current) =>
      current.filter((item) => !isSameCartLine(item, target)),
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isCartPage = pathname === "/cart";
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isAuthenticated = Boolean(
    Cookies.get("token") || Cookies.get("access_token"),
  );
  const redirectToHome = isAuthenticated && (isLoginPage || isRegisterPage);
  const redirectToLogin = !isAuthenticated && isCartPage;

  useEffect(() => {
    if (redirectToHome) {
      navigate("/", { replace: true });
      return;
    }

    if (redirectToLogin) {
      navigate("/login", { replace: true });
    }
  }, [navigate, redirectToHome, redirectToLogin]);

  if (redirectToHome || redirectToLogin) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="floating-orb absolute -left-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-[color:var(--primary)]/20 blur-3xl" />
        <div className="floating-orb-reverse absolute -bottom-40 -right-40 h-[48rem] w-[48rem] rounded-full bg-[color:var(--ring)]/20 blur-3xl" />
      </div>
      <Toaster position="top-center" />
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
