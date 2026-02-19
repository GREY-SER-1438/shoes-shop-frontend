import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminLogin from "@/pages/AdminLogin";
import AdminPanel from "@/pages/AdminPanel";
import Orders from "@/pages/Orders";
import MainLayout from "@/components/layouts/MainLayout";
import { Toaster } from "./components/ui/sonner";
import Cookies from "js-cookie";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import RouteGuard from "@/components/routing/RouteGuard";
import { useMeStore } from "@/store/useMeStore";
import ScrollToTop from "@/components/routing/ScrollToTop";

export default function App() {
  const navigate = useNavigate();
  const { cart, getCart, addCartItem } = useCartStore();
  const { me, loading: meLoading, error: meError } = useMeStore();

  const addToCart = (productId: number, stock: number) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const currentQuantity =
      cart?.items
        .filter((item) => item.productId === productId)
        .reduce((sum, item) => sum + item.quantity, 0) ?? 0;

    if (currentQuantity >= stock) {
      toast.error("Достигнут лимит остатка на складе");
      return;
    }

    void addCartItem(productId, 1);
  };

  const cartCount = cart?.totalItems ?? 0;
  const isAuthenticated = Boolean(
    Cookies.get("token") || Cookies.get("access_token"),
  );

  useEffect(() => {
    if (!isAuthenticated) return;
    void getCart();
  }, [getCart, isAuthenticated]);

  const isAdmin = me?.role?.name?.trim().toUpperCase() === "ADMIN";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="floating-orb absolute -left-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-[color:var(--primary)]/20 blur-3xl" />
        <div className="floating-orb-reverse absolute -bottom-40 -right-40 h-[48rem] w-[48rem] rounded-full bg-[color:var(--ring)]/20 blur-3xl" />
      </div>
      <Toaster position="top-center" />
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout cartCount={cartCount}>
              <Home onAddToCart={addToCart} />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <MainLayout>
                <Register />
              </MainLayout>
            )
          }
        />
        <Route
          path="/cart"
          element={
            <RouteGuard isAllowed={isAuthenticated} redirectTo="/login">
              <MainLayout cartCount={cartCount}>
                <Cart />
              </MainLayout>
            </RouteGuard>
          }
        />
        <Route
          path="/orders"
          element={
            <RouteGuard isAllowed={isAuthenticated} redirectTo="/login">
              <MainLayout cartCount={cartCount}>
                <Orders />
              </MainLayout>
            </RouteGuard>
          }
        />
        <Route
          path="/admin/login"
          element={
            <MainLayout>
              <AdminLogin />
            </MainLayout>
          }
        />
        <Route
          path="/admin/panel"
          element={
            !isAuthenticated ? (
              <Navigate to="/admin/login" replace />
            ) : meLoading || (!me && !meError) ? (
              <MainLayout>
                <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
                  <p className="text-[var(--muted-foreground)]">
                    Проверка доступа...
                  </p>
                </main>
              </MainLayout>
            ) : !me ? (
              <Navigate to="/admin/login" replace />
            ) : !isAdmin ? (
              <Navigate to="/" replace />
            ) : (
              <MainLayout>
                <AdminPanel />
              </MainLayout>
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
