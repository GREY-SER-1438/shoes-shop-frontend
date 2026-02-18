export default function About() {
  return (
    <section
      id="about"
      className="bg-[var(--foreground)] py-20 text-[var(--background)] sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-stretch lg:px-8">
        <div className="space-y-10">
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">
            DREAMSNEAKERS - ЭТО НЕ ПРОСТО МАГАЗИН
          </h2>

          <div className="space-y-8">
            {[
              {
                number: "01",
                title: "Культура",
                text: "Мы создаем сообщество, где кроссовки - это образ жизни. Ивенты и коллаборации объединяют ценителей уличной моды.",
              },
              {
                number: "02",
                title: "Экспертиза",
                text: "Каждая пара проходит проверку нашими экспертами. Мы знаем технологии брендов и особенности каждой модели.",
              },
              {
                number: "03",
                title: "Доступность",
                text: "Специальные условия для постоянных клиентов, лист ожидания на редкие модели и честные цены без накруток.",
              },
            ].map((item) => (
              <div key={item.number} className="relative pl-14">
                <span className="absolute left-0 top-0 text-3xl font-extrabold text-[var(--background)]/20">
                  {item.number}
                </span>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-7 text-[var(--background)]/70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="min-h-88 rounded-xl bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.75), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1350&q=80')",
          }}
        />
      </div>
    </section>
  );
}
