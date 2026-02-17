import { Star } from "lucide-react";
import { testimonials } from "@/data/catalog";

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-zinc-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-4xl font-black tracking-tight text-zinc-950 sm:mb-16 sm:text-5xl">
          <span className="block">Реальные отзывы</span>
          <span className="block">наших клиентов</span>
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={`${item.id}-star-${index}`}
                    size={17}
                    className={
                      index < item.rating
                        ? "fill-black text-black"
                        : "text-zinc-300"
                    }
                  />
                ))}
              </div>

              <p className="mb-8 text-base leading-7 text-zinc-700">
                "{item.text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-zinc-950">{item.name}</p>
                  <p className="text-sm text-zinc-500">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
