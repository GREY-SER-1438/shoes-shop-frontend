import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminLogin from "@/pages/AdminLogin";
import AdminPanel from "@/pages/AdminPanel";
import MainLayout from "@/components/layouts/MainLayout";
import { Toaster } from "./components/ui/sonner";
import Cookies from "js-cookie";
import { useCartStore } from "@/store/useCartStore";
import { useProductsStore } from "@/store/useProductsStore";
import { toast } from "sonner";

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { cart, getCart, addCartItem } = useCartStore();
  const products = useProductsStore((state) => state.products);

  const addToCart = (productId: number, color: string, size = "42") => {
    void color;
    void size;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const product = products.find((item) => item.groupId === productId);
    const currentQuantity =
      cart?.items
        .filter((item) => item.productId === productId)
        .reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    if (product && currentQuantity >= product.stock) {
      toast.error("Достигнут лимит остатка на складе");
      return;
    }

    void addCartItem(productId, 1);
  };

  const cartCount = cart?.totalItems ?? 0;
  const isCartPage = pathname === "/cart";
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isAdminLoginPage = pathname === "/admin/login";
  const isAdminPanelPage = pathname === "/admin/panel";
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

  useEffect(() => {
    if (!isAuthenticated) return;
    void getCart();
  }, [getCart, isAuthenticated]);

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
          <Cart />
        </MainLayout>
      ) : isLoginPage ? (
        <MainLayout>
          <Login />
        </MainLayout>
      ) : isRegisterPage ? (
        <MainLayout>
          <Register />
        </MainLayout>
      ) : isAdminLoginPage ? (
        <MainLayout>
          <AdminLogin />
        </MainLayout>
      ) : isAdminPanelPage ? (
        <MainLayout>
          <AdminPanel />
        </MainLayout>
      ) : (
        <MainLayout cartCount={cartCount}>
          <Home onAddToCart={addToCart} />
        </MainLayout>
      )}
    </div>
  );
}
