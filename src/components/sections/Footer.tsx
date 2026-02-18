import {
  Clock3,
  Instagram,
  Mail,
  Phone,
  Send,
  SendHorizontal,
} from "lucide-react";

const socialLinks = [
  {
    href: "https://instagram.com/dreamsneakers",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://t.me/dreamsneakers",
    icon: Send,
    label: "Telegram",
  },
  { href: "https://vk.com/dreamsneakers", icon: SendHorizontal, label: "VK" },
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
    <footer className="bg-[var(--foreground)] px-4 pb-8 pt-10 text-[var(--background)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-sm bg-[var(--foreground)]/70 px-3 py-2 ring-1 ring-[var(--background)]/10">
              <span className="inline-block rotate-45 text-base text-[var(--primary)]">⟁</span>
              <p className="leading-none">
                <span className="block text-sm font-extrabold tracking-tight">DREAM</span>
                <span className="block text-[9px] uppercase tracking-[0.18em] text-[var(--background)]/70">
                  SNEAKERS
                </span>
              </p>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[var(--background)]/70">
              Кроссовки для каждого шага. Найди свою идеальную пару для спорта,
              стиля и комфорта.
            </p>

            <div className="mt-6 flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--background)] transition hover:text-[var(--primary)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-[var(--background)]">
              Навигация
            </h3>
            <ul className="space-y-2 text-xl text-[var(--background)]/85">
              {[
                { id: "about", label: "О бренде" },
                { id: "products", label: "Каталог" },
                { id: "reviews", label: "Отзывы" },
                { id: "contact", label: "Контакты" },
              ].map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollTo(id);
                    }}
                    className="group inline-flex items-center gap-2 transition hover:text-[var(--background)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-[var(--background)]">
              Контакты
            </h3>
            <div className="space-y-2 text-xl text-[var(--background)]/85">
              <a
                href="mailto:info@dreamsneakers.ru"
                className="inline-flex items-center gap-2 transition hover:text-[var(--background)]"
              >
                <Mail size={16} className="text-[var(--primary)]" />
                info@dreamsneakers.ru
              </a>
              <a
                href="tel:+79118057418"
                className="flex items-center gap-2 transition hover:text-[var(--background)]"
              >
                <Phone size={16} className="text-[var(--primary)]" />
                +7 911 805 74 18
              </a>
              <p className="flex items-center gap-2">
                <Clock3 size={16} className="text-[var(--primary)]" />
                Пн-Пт 9:00-20:00
              </p>
            </div>

            <button
              onClick={() => scrollTo("contact")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--primary)] px-5 py-2 text-sm font-semibold transition hover:bg-[var(--primary)]"
            >
              Написать нам <Send size={14} />
            </button>
          </div>
        </div>

        <p className="mt-8 border-t border-[var(--background)]/10 pt-4 text-center text-xs text-[var(--background)]/60">
          <SendHorizontal size={12} className="mr-1 inline" />
          {new Date().getFullYear()} Dream Sneakers. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
