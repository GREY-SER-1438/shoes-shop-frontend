import { useEffect, useMemo, useState } from "react";
import { useProductsByIdStore } from "@/store/useProductsByIdStore";
import { useCartStore } from "@/store/useCartStore";
import type { ProductListItem } from "@/store/useProductsStore";

type ProductCardProps = {
  product: ProductListItem;
  onAddToCart: (productId: number, color: string, size: string) => void;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const groupId = Number(product.groupId);
  const hasValidGroupId = Number.isFinite(groupId);
  const getProductById = useProductsByIdStore((state) => state.getProductById);
  const productDetails = useProductsByIdStore(
    (state) => state.productsById[groupId],
  );
  const cart = useCartStore((state) => state.cart);
  const [selectedColor, setSelectedColor] = useState(product.color[0] ?? "");
  const [selectedSize, setSelectedSize] = useState<number | null>(
    product.size[0] ?? null,
  );

  useEffect(() => {
    if (!hasValidGroupId) return;
    void getProductById(groupId);
  }, [getProductById, groupId, hasValidGroupId]);

  const colors = useMemo(() => {
    if (!productDetails) return product.color;
    return Array.from(new Set(productDetails.variants.map((variant) => variant.color)));
  }, [productDetails, product.color]);

  const sizes = useMemo(() => {
    if (!productDetails) return product.size;

    return Array.from(
      new Set(
        productDetails.variants
          .filter((variant) => variant.color === selectedColor && variant.stock > 0)
          .map((variant) => variant.size),
      ),
    ).sort((a, b) => a - b);
  }, [productDetails, product.size, selectedColor]);

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
  }, [sizes, selectedSize]);

  const currentCartQuantity =
    cart?.items
      .filter((item) => item.productId === groupId)
      .reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const selectedVariantStock = useMemo(() => {
    if (!productDetails || !selectedColor || selectedSize === null) {
      return product.stock;
    }

    const variant = productDetails.variants.find(
      (item) => item.color === selectedColor && item.size === selectedSize,
    );
    return variant?.stock ?? 0;
  }, [productDetails, selectedColor, selectedSize, product.stock]);

  const isOutOfStock = selectedVariantStock <= 0;
  const isLimitReached = currentCartQuantity >= product.stock;
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
            if (!selectedColor || selectedSize === null) return;
            if (!hasValidGroupId) return;
            onAddToCart(groupId, selectedColor, String(selectedSize));
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
