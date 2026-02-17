import { heroImage } from "@/data/catalog";

export default function Hero() {
  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="top" className="relative flex min-h-screen items-center pt-28">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h1 className="text-5xl font-black leading-tight tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            <span className="block">Кроссовки</span>
            <span className="block">для каждого шага</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-600 sm:text-xl">
            Найди идеальную пару для спорта, стиля и комфорта.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-pink-600"
            >
              Подобрать пару
            </button>
            <button
              onClick={() => scrollTo("products")}
              className="rounded-full border-2 border-black px-7 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-black/5"
            >
              Коллекция
            </button>
          </div>
        </div>

        <div className="relative mx-auto h-[20rem] w-[20rem] sm:h-[28rem] sm:w-[28rem] lg:h-[36rem] lg:w-[36rem]">
          <div className="pulse-circle absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-400/20" />
          <img
            src={heroImage}
            alt="Кроссовки"
            className="floating-shoe absolute inset-0 h-full w-full object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.24)]"
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-sm text-zinc-500 sm:block">
        Листайте вниз
      </div>
    </section>
  );
}
