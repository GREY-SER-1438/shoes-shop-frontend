import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import type { ProductListItem } from "@/store/useProductsStore";

type ProductCardProps = {
  product: ProductListItem;
  onAddToCart: (productId: number, stock: number) => void;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const groupId = Number(product.groupId);
  const hasValidGroupId = Number.isFinite(groupId);
  const cart = useCartStore((state) => state.cart);
  const [selectedColor, setSelectedColor] = useState(product.color[0] ?? "");
  const [selectedSize, setSelectedSize] = useState<number | null>(product.size[0] ?? null);

  const colors =
    product.color.length > 0
      ? product.color
      : Array.from(new Set(product.variants.map((variant) => variant.color)));

  const sizes = product.variants
    .filter((variant) => variant.color === selectedColor)
    .map((variant) => variant.size);

  const selectedVariant = product.variants.find(
    (variant) => variant.color === selectedColor && variant.size === selectedSize,
  );

  useEffect(() => {
    if (colors.length === 0) return;

    if (!selectedColor || !colors.includes(selectedColor)) {
      setSelectedColor(colors[0]);
    }
  }, [colors, selectedColor]);

  useEffect(() => {
    if (sizes.length === 0) {
      setSelectedSize(null);
      return;
    }

    if (selectedSize === null || !sizes.includes(selectedSize)) {
      setSelectedSize(sizes[0]);
    }
  }, [selectedColor, sizes, selectedSize]);

  const currentCartQuantity =
    cart?.items
      .filter((item) => item.productId === selectedVariant?.variantId)
      .reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const selectedVariantStock = selectedVariant?.stock ?? 0;

  const isOutOfStock = selectedVariantStock <= 0;
  const isLimitReached = currentCartQuantity >= selectedVariantStock;
  const isAddDisabled =
    !selectedColor || selectedSize === null || isOutOfStock || isLimitReached;

  return (
    <article className="group overflow-hidden rounded-xl bg-[var(--card)] shadow-sm ring-1 ring-[var(--border)] transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            {product.brand}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-[var(--card-foreground)]">{product.name}</h3>

        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={`${groupId}-${color}`}
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
              key={`${groupId}-size-${size}`}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`rounded-xl border px-2.5 py-1 text-xs font-semibold transition ${
                selectedSize === size
                  ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-[var(--ring)]"
              }`}
            >
              EU {String(size)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[var(--card-foreground)]">
            {product.price.toLocaleString()} ₽
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!selectedVariant) return;
            if (!hasValidGroupId) return;
            onAddToCart(selectedVariant.variantId, selectedVariant.stock);
          }}
          disabled={isAddDisabled}
          className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-90"
        >
          {isOutOfStock ? "Нет в наличии" : "В корзину"}
        </button>
      </div>
    </article>
  );
}
