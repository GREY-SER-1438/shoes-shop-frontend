import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo } from "react";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import type { CartItem } from "@/data/cart";
import { products } from "@/data/catalog";

type CartProps = {
  cartItems: CartItem[];
  cartCount: number;
  onChangeQuantity: (
    item: Pick<CartItem, "productId" | "size" | "color">,
    delta: number,
  ) => void;
  onRemoveItem: (item: Pick<CartItem, "productId" | "size" | "color">) => void;
};

export default function Cart({
  cartItems,
  cartCount,
  onChangeQuantity,
  onRemoveItem,
}: CartProps) {
  const detailedItems = useMemo(() => {
    return cartItems
      .map((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [cartItems]);

  const subtotal = useMemo(
    () =>
      detailedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [detailedItems],
  );

  const shipping = detailedItems.length > 0 ? 490 : 0;
  const discount = subtotal >= 25000 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount + shipping;

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600 ring-1 ring-black/5">
            <ShoppingBag size={14} />
            Корзина
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
            Ваш заказ
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-600">
            Проверьте размер, количество и итоговую сумму перед оформлением.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="space-y-4">
            {detailedItems.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
                <p className="text-lg font-semibold text-zinc-900">
                  Корзина пока пуста
                </p>
                <p className="mt-2 text-sm text-zinc-600">
                  Добавьте товары из каталога, чтобы оформить заказ.
                </p>
                <a
                  href="/#products"
                  className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                  Вернуться в каталог
                </a>
              </div>
            ) : (
              detailedItems.map((item) => (
                <article
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:grid-cols-[120px_1fr]"
                >
                  <div className="h-28 overflow-hidden rounded-xl bg-zinc-100 sm:h-32">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          {item.product.brand}
                        </p>
                        <h2 className="text-lg font-semibold text-zinc-950">
                          {item.product.name}
                        </h2>
                        <p className="mt-1 text-sm text-zinc-600">
                          Размер EU: {item.size}
                        </p>
                        <p className="mt-1 inline-flex items-center gap-2 text-sm text-zinc-600">
                          Цвет:
                          <span
                            className="h-4 w-4 rounded-full border border-black/10"
                            style={{
                              backgroundColor:
                                item.color || item.product.colors[0] || "#000000",
                            }}
                          />
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          onRemoveItem({
                            productId: item.productId,
                            size: item.size,
                            color: item.color,
                          })
                        }
                        className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-red-500"
                        aria-label={`Удалить ${item.product.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-xl border border-zinc-200 bg-white">
                        <button
                          className="p-2.5 text-zinc-700 transition hover:bg-zinc-100"
                          aria-label="Уменьшить количество"
                          onClick={() =>
                            onChangeQuantity(
                              {
                                productId: item.productId,
                                size: item.size,
                                color: item.color,
                              },
                              -1,
                            )
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span className="min-w-10 text-center text-sm font-semibold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          className="p-2.5 text-zinc-700 transition hover:bg-zinc-100"
                          aria-label="Увеличить количество"
                          onClick={() =>
                            onChangeQuantity(
                              {
                                productId: item.productId,
                                size: item.size,
                                color: item.color,
                              },
                              1,
                            )
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <p className="text-xl font-bold text-zinc-950">
                        {(item.product.price * item.quantity).toLocaleString()} ₽
                      </p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-zinc-950">Итого</h2>
            <div className="mt-6 space-y-3 text-sm text-zinc-700">
              <div className="flex items-center justify-between">
                <span>Товары</span>
                <span>{subtotal.toLocaleString()} ₽</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Скидка</span>
                <span className="text-emerald-600">-{discount.toLocaleString()} ₽</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Доставка</span>
                <span>{shipping.toLocaleString()} ₽</span>
              </div>
            </div>

            <div className="my-5 h-px bg-zinc-200" />

            <div className="flex items-center justify-between text-lg font-bold text-zinc-950">
              <span>К оплате</span>
              <span>{total.toLocaleString()} ₽</span>
            </div>

            <button className="mt-6 w-full rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600">
              Оформить заказ
            </button>

            <a
              href="/#products"
              className="mt-3 block w-full rounded-xl border border-zinc-200 px-5 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50"
            >
              Продолжить покупки
            </a>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
