import {
  Globe2,
  Instagram,
  MessageCircle,
  Send,
  SendHorizontal,
} from "lucide-react";

const links = [
  {
    href: "https://instagram.com/dreamsneakers",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://t.me/dreamsneakers",
    icon: MessageCircle,
    label: "Telegram",
  },
  { href: "https://vk.com/dreamsneakers", icon: Globe2, label: "VK" },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    if (window.location.pathname !== "/") {
      window.location.assign(`/#${id}`);
      return;
    }
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <footer className="bg-black px-4 pb-8 pt-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-12 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block rotate-45 text-3xl text-pink-500">
              ⟁
            </span>
            <div className="leading-none">
              <p className="text-xl font-bold">DREAM</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                SNEAKERS
              </p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/70">
            Кроссовки для каждого шага. Найди идеальную пару для спорта, стиля и
            комфорта.
          </p>
          <div className="mt-6 flex gap-3">
            {links.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/10 p-2.5 transition hover:-translate-y-0.5 hover:bg-pink-500"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Навигация</h3>
          <ul className="space-y-3 text-sm text-white/80">
            {["products", "about", "reviews", "contact"].map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollTo(id);
                  }}
                  className="transition hover:text-white"
                >
                  {id === "products" && "Каталог"}
                  {id === "about" && "О бренде"}
                  {id === "reviews" && "Отзывы"}
                  {id === "contact" && "Контакты"}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Контакты</h3>
          <p className="text-sm text-white/70">Email: info@dreamsneakers.ru</p>
          <p className="mt-2 text-sm text-white/70">
            Телефон: +7 (911) 805-74-18
          </p>
          <button
            onClick={() => scrollTo("contact")}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-pink-500 px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-pink-500"
          >
            Написать нам <Send size={14} />
          </button>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-7xl text-center text-xs text-white/60">
        <SendHorizontal size={12} className="mr-1 inline" />
        {new Date().getFullYear()} Dream Sneakers. Все права защищены.
      </p>
    </footer>
  );
}
