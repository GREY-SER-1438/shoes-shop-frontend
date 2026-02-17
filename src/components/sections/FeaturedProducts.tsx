import { ArrowRight, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "@/data/catalog";
import ProductCard from "@/components/sections/ProductCard";

type FeaturedProductsProps = {
  onAddToCart: (productId: number, color: string) => void;
};

export default function FeaturedProducts({ onAddToCart }: FeaturedProductsProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = useMemo(
    () => (showAll ? products : products.slice(0, 4)),
    [showAll],
  );

  return (
    <section id="products" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
            Каталог
          </h2>
          <button
            onClick={() => setShowAll((value) => !value)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition hover:text-pink-600"
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
