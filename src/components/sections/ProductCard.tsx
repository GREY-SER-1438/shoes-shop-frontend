import { Star } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/catalog";

type ProductCardProps = {
  product: Product;
  onAddToCart: (productId: number, color: string, size: string) => void;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const sizes = ["39", "40", "41", "42", "43", "44"];
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");
  const [selectedSize, setSelectedSize] = useState("42");

  return (
    <article className="group overflow-hidden rounded-xl bg-[var(--card)] shadow-sm ring-1 ring-[var(--border)] transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-[var(--primary-foreground)]">
            Новинка
          </span>
        )}
        {product.isBestSeller && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--foreground)] px-3 py-1 text-xs font-semibold text-[var(--background)]">
            Бестселлер
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            {product.brand}
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
            <Star size={14} className="fill-[var(--primary)] text-[var(--primary)]" />
            {product.rating}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-[var(--card-foreground)]">{product.name}</h3>

        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={`${product.id}-${color}`}
              type="button"
              aria-label={`Выбрать цвет ${color}`}
              onClick={() => setSelectedColor(color)}
              className={`h-5 w-5 rounded-full border transition ${
                selectedColor === color
                  ? "scale-110 border-[var(--foreground)] ring-2 ring-[var(--ring)]/30"
                  : "border-[var(--border)]"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={`${product.id}-size-${size}`}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`rounded-xl border px-2.5 py-1 text-xs font-semibold transition ${
                selectedSize === size
                  ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-[var(--ring)]"
              }`}
            >
              EU {size}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {product.oldPrice && (
            <span className="text-sm text-[var(--muted-foreground)]/70 line-through">
              {product.oldPrice.toLocaleString()} ₽
            </span>
          )}
          <span className="text-xl font-bold text-[var(--card-foreground)]">
            {product.price.toLocaleString()} ₽
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product.id, selectedColor, selectedSize)}
          className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-90"
        >
          В корзину
        </button>
      </div>
    </article>
  );
}
