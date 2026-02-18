import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo } from "react";
import type { CartItem } from "@/data/cart";
import { products } from "@/data/catalog";

type CartProps = {
  cartItems: CartItem[];
  onChangeQuantity: (
    item: Pick<CartItem, "productId" | "size" | "color">,
    delta: number,
  ) => void;
  onRemoveItem: (item: Pick<CartItem, "productId" | "size" | "color">) => void;
};

export default function Cart({
  cartItems,
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
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-[var(--card)]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)] ring-1 ring-[var(--border)]">
            <ShoppingBag size={14} />
            Корзина
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[var(--foreground)] sm:text-5xl">
            Ваш заказ
          </h1>
          <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
            Проверьте размер, количество и итоговую сумму перед оформлением.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="space-y-4">
            {detailedItems.length === 0 ? (
              <div className="rounded-xl bg-[var(--card)] p-10 text-center shadow-sm ring-1 ring-[var(--border)]">
                <p className="text-lg font-semibold text-[var(--card-foreground)]">
                  Корзина пока пуста
                </p>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                  Добавьте товары из каталога, чтобы оформить заказ.
                </p>
                <a
                  href="/#products"
                  className="mt-6 inline-flex rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-90"
                >
                  Вернуться в каталог
                </a>
              </div>
            ) : (
              detailedItems.map((item) => (
                <article
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="grid gap-4 rounded-xl bg-[var(--card)] p-4 shadow-sm ring-1 ring-[var(--border)] sm:grid-cols-[120px_1fr]"
                >
                  <div className="h-28 overflow-hidden rounded-xl bg-[var(--muted)] sm:h-32">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                          {item.product.brand}
                        </p>
                        <h2 className="text-lg font-semibold text-[var(--card-foreground)]">
                          {item.product.name}
                        </h2>
                        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                          Размер EU: {item.size}
                        </p>
                        <p className="mt-1 inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                          Цвет:
                          <span
                            className="h-4 w-4 rounded-full border border-[var(--border)]"
                            style={{
                              backgroundColor:
                                item.color ||
                                item.product.colors[0] ||
                                "#000000",
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
                        className="rounded-xl p-2 text-[var(--muted-foreground)] transition hover:bg-[var(--muted)] hover:text-[var(--destructive)]"
                        aria-label={`Удалить ${item.product.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
                        <button
                          className="p-2.5 text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
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
                        <span className="min-w-10 text-center text-sm font-semibold text-[var(--card-foreground)]">
                          {item.quantity}
                        </span>
                        <button
                          className="p-2.5 text-[var(--muted-foreground)] transition hover:bg-[var(--muted)]"
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

                      <p className="text-xl font-bold text-[var(--card-foreground)]">
                        {(item.product.price * item.quantity).toLocaleString()}{" "}
                        ₽
                      </p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>

          <aside className="h-fit rounded-xl bg-[var(--card)] p-6 shadow-sm ring-1 ring-[var(--border)] lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-[var(--card-foreground)]">Итого</h2>
            <div className="mt-6 space-y-3 text-sm text-[var(--muted-foreground)]">
              <div className="flex items-center justify-between">
                <span>Товары</span>
                <span>{subtotal.toLocaleString()} ₽</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Скидка</span>
                <span className="text-[var(--primary)]">
                  -{discount.toLocaleString()} ₽
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Доставка</span>
                <span>{shipping.toLocaleString()} ₽</span>
              </div>
            </div>

            <div className="my-5 h-px bg-[var(--border)]" />

            <div className="flex items-center justify-between text-lg font-bold text-[var(--card-foreground)]">
              <span>К оплате</span>
              <span>{total.toLocaleString()} ₽</span>
            </div>

            <button className="mt-6 w-full rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-90">
              Оформить заказ
            </button>

            <a
              href="/#products"
              className="mt-3 block w-full rounded-xl border border-[var(--border)] px-5 py-3 text-center text-sm font-semibold text-[var(--card-foreground)] transition hover:bg-[var(--muted)]"
            >
              Продолжить покупки
            </a>
          </aside>
        </div>
    </main>
  );
}
