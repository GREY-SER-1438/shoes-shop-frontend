import { useMeStore } from "@/store/useMeStore";
import { Menu, ShoppingBag, X } from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";

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
  const isHomePage = window.location.pathname === "/";
  const isLoginPage = window.location.pathname === "/login";
  const hasAuthCookie = Boolean(
    Cookies.get("token") || Cookies.get("access_token"),
  );

  const scrollTo = (id: string) => {
    if (!isHomePage) {
      window.location.assign(`/#${id}`);
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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          className="flex items-center gap-3 text-left"
          onClick={() =>
            isHomePage ? scrollTo("top") : window.location.assign("/")
          }
        >
          <span className="inline-block rotate-45 text-3xl font-bold text-[var(--primary)]">
            ⟁
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight">DREAM</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
              SNEAKERS
            </span>
          </span>
        </button>

        <nav className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollTo(item.id);
              }}
              className="relative text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--primary)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {me?.email && (
            <span className="hidden max-w-[220px] truncate text-sm text-[var(--muted-foreground)] md:inline">
              {me.email}
            </span>
          )}
          <a
            href={hasAuthCookie ? "/cart" : "/login"}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm font-semibold text-[var(--card-foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Корзина</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--foreground)] px-1.5 text-xs text-[var(--background)]">
              {cartCount}
            </span>
          </a>
          {!hasAuthCookie && !isLoginPage && (
            <a
              href="/login"
              className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              Войти
            </a>
          )}
          {hasAuthCookie && (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              Выйти
            </button>
          )}

          <button
            className="rounded-xl p-2 text-[var(--foreground)] md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 transform bg-[var(--background)]/95 p-8 shadow-2xl backdrop-blur transition duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mt-14 flex flex-col gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollTo(item.id);
              }}
              className="text-lg font-medium text-[var(--foreground)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href={hasAuthCookie ? "/cart" : "/login"}
            className="text-lg font-medium text-[var(--foreground)]"
          >
            {me?.email && (
              <span className="mb-1 block text-sm text-[var(--muted-foreground)]">
                {me.email}
              </span>
            )}
            Корзина
          </a>
          {!hasAuthCookie && !isLoginPage && (
            <a
              href="/login"
              className="text-lg font-medium text-[var(--foreground)]"
            >
              Войти
            </a>
          )}
          {hasAuthCookie && (
            <button
              type="button"
              onClick={handleLogout}
              className="text-left text-lg font-medium text-[var(--foreground)]"
            >
              Выйти
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
