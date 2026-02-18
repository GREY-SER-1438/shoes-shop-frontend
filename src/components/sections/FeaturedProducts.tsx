import { ArrowRight, ChevronUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/sections/ProductCard";
import { useProductsStore } from "@/store/useProductsStore";

type FeaturedProductsProps = {
  onAddToCart: (productId: number, color: string, size: string) => void;
};

export default function FeaturedProducts({ onAddToCart }: FeaturedProductsProps) {
  const [showAll, setShowAll] = useState(false);
  const { products, loading, error, getProducts } = useProductsStore();

  useEffect(() => {
    void getProducts();
  }, [getProducts]);

  const visibleProducts = useMemo(
    () => (showAll ? products : products.slice(0, 4)),
    [showAll, products],
  );

  return (
    <section id="products" className="bg-[var(--card)] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-black tracking-tight text-[var(--card-foreground)] sm:text-5xl">
            Каталог
          </h2>
          <button
            onClick={() => setShowAll((value) => !value)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--card-foreground)] transition hover:text-[var(--primary)]"
          >
            {showAll ? (
              <>
                Свернуть <ChevronUp size={16} />
              </>
            ) : (
              <>
                Смотреть все <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="mb-6 text-sm text-[var(--destructive)]">
            Не удалось загрузить каталог: {error}
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading &&
            visibleProducts.length === 0 &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`product-skeleton-${index}`}
                className="h-[470px] animate-pulse rounded-xl bg-[var(--muted)] ring-1 ring-[var(--border)]"
              />
            ))}
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.groupId}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
