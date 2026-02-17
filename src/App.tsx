import { useEffect, useState } from "react";
import Cart from "@/pages/Cart";
import type { CartItem } from "@/data/cart";
import { readCart, writeCart } from "@/data/cart";
import Home from "@/pages/Home";

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

  const addToCart = (productId: number, size = "42") => {
    setCartItems((current) => {
      const existing = current.find(
        (item) => item.productId === productId && item.size === size,
      );
      if (!existing) {
        return [...current, { productId, size, quantity: 1 }];
      }
      return current.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  };

  const changeQuantity = (productId: number, delta: number) => {
    setCartItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isCartPage = pathname === "/cart";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-950">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="floating-orb absolute -left-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-pink-500/20 blur-3xl" />
        <div className="floating-orb-reverse absolute -bottom-40 -right-40 h-[48rem] w-[48rem] rounded-full bg-fuchsia-700/20 blur-3xl" />
      </div>
      {isCartPage ? (
        <Cart
          cartCount={cartCount}
          cartItems={cartItems}
          onChangeQuantity={changeQuantity}
          onRemoveItem={removeItem}
        />
      ) : (
        <Home cartCount={cartCount} onAddToCart={addToCart} />
      )}
    </div>
  );
}
