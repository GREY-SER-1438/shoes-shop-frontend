import { Star } from "lucide-react";
import type { Product } from "@/data/catalog";

type ProductCardProps = {
  product: Product;
  onAddToCart: (productId: number) => void;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
            Новинка
          </span>
        )}
        {product.isBestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
            Бестселлер
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {product.brand}
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-zinc-700">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-zinc-900">{product.name}</h3>

        <div className="flex gap-2">
          {product.colors.map((color) => (
            <span
              key={`${product.id}-${color}`}
              className="h-5 w-5 rounded-full border border-black/10"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {product.oldPrice && (
            <span className="text-sm text-zinc-400 line-through">
              {product.oldPrice.toLocaleString()} ₽
            </span>
          )}
          <span className="text-xl font-bold text-zinc-950">
            {product.price.toLocaleString()} ₽
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
        >
          В корзину
        </button>
      </div>
    </article>
  );
}
