import { Menu, ShoppingBag, X } from "lucide-react";
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          className="flex items-center gap-3 text-left"
          onClick={() => (isHomePage ? scrollTo("top") : window.location.assign("/"))}
        >
          <span className="inline-block rotate-45 text-3xl font-bold text-pink-500">
            ⟁
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight">DREAM</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
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
              className="relative text-sm font-medium text-zinc-800 transition hover:text-pink-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 transition hover:border-pink-400 hover:text-pink-600"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Корзина</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs text-white">
              {cartCount}
            </span>
          </a>

          <button
            className="rounded-md p-2 text-zinc-800 md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 transform bg-white/95 p-8 shadow-2xl backdrop-blur transition duration-300 md:hidden ${
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
              className="text-lg font-medium text-zinc-900"
            >
              {item.label}
            </a>
          ))}
          <a href="/cart" className="text-lg font-medium text-zinc-900">
            Корзина
          </a>
        </div>
      </div>
    </header>
  );
}
