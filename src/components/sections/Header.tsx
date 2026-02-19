import { useMeStore } from "@/store/useMeStore";
import { Menu, ShoppingBag, X } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { id: "products", label: "Каталог" },
  { id: "about", label: "О бренде" },
  { id: "reviews", label: "Отзывы" },
  { id: "contact", label: "Связаться" },
];

type HeaderProps = {
  cartCount: number;
};

export default function Header({ cartCount }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/login";
  const hasAuthCookie = Boolean(
    Cookies.get("token") || Cookies.get("access_token"),
  );

  const scrollTo = (id: string) => {
    if (!isHomePage) {
      navigate(`/#${id}`);
      setMenuOpen(false);
      return;
    }
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.reload();
  };

  const { me } = useMeStore();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          <button
            type="button"
            className="flex items-center gap-2 text-left sm:gap-3"
            onClick={() => (isHomePage ? scrollTo("top") : navigate("/"))}
          >
            <span className="inline-block rotate-45 text-2xl font-bold text-[var(--primary)] sm:text-3xl">
              ⟁
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight sm:text-xl">DREAM</span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--muted-foreground)] sm:text-[11px]">
                SNEAKERS
              </span>
            </span>
          </button>

          <nav className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--primary)]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {me?.email && (
              <span className="hidden max-w-[220px] truncate text-sm text-[var(--muted-foreground)] sm:inline">
                {me.email}
              </span>
            )}
            <button
              type="button"
              onClick={() => navigate(hasAuthCookie ? "/cart" : "/login")}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-2.5 py-2 text-sm font-semibold text-[var(--card-foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] sm:px-3"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">Корзина</span>
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--foreground)] px-1.5 text-xs text-[var(--background)]">
                {cartCount}
              </span>
            </button>
            {hasAuthCookie && (
              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="hidden rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] md:inline-flex"
              >
                Заказы
              </button>
            )}
            {!hasAuthCookie && !isLoginPage && (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="hidden rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] md:inline-flex"
              >
                Войти
              </button>
            )}
            {hasAuthCookie && (
              <button
                type="button"
                onClick={handleLogout}
                className="hidden rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] md:inline-flex"
              >
                Выйти
              </button>
            )}

            <button
              type="button"
              className="rounded-xl p-2 text-[var(--foreground)] md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-[60] bg-black/45 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        id="mobile-menu"
        className={`fixed inset-y-0 right-0 z-[70] w-64 transform bg-[var(--background)]/95 p-8 shadow-2xl backdrop-blur transition duration-300 md:hidden ${
          menuOpen
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="mt-14 flex flex-col gap-3">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-left text-base font-medium text-[var(--foreground)] transition hover:border-[var(--primary)]"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              navigate(hasAuthCookie ? "/cart" : "/login");
              setMenuOpen(false);
            }}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-left text-base font-medium text-[var(--foreground)] transition hover:border-[var(--primary)]"
          >
            Корзина
          </button>
          {hasAuthCookie && (
            <button
              type="button"
              onClick={() => {
                navigate("/orders");
                setMenuOpen(false);
              }}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-left text-base font-medium text-[var(--foreground)] transition hover:border-[var(--primary)]"
            >
              Заказы
            </button>
          )}
          {!hasAuthCookie && !isLoginPage && (
            <button
              type="button"
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-left text-base font-medium text-[var(--foreground)] transition hover:border-[var(--primary)]"
            >
              Войти
            </button>
          )}

          {hasAuthCookie && (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-left text-base font-medium text-[var(--foreground)] transition hover:border-[var(--primary)]"
            >
              Выйти
            </button>
          )}

          {me?.email && (
            <span className="mb-1 block mx-4 text-sm text-[var(--muted-foreground)]">
              {me.email}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
