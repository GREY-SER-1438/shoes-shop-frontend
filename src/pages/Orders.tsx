import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PackageCheck } from "lucide-react";
import { useOrdersStore } from "@/store/useOrdersStore";

export default function Orders() {
  const navigate = useNavigate();
  const { orders, loading, getOrders } = useOrdersStore();

  useEffect(() => {
    void getOrders();
  }, [getOrders]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="inline-flex items-center gap-2 rounded-full bg-[var(--card)]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)] ring-1 ring-[var(--border)]">
          <PackageCheck size={14} />
          Заказы
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-[var(--foreground)] sm:text-5xl">
          Мои заказы
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted-foreground)]">
          История всех ваших оформленных заказов.
        </p>
      </div>

      {loading ? (
        <section className="rounded-xl bg-[var(--card)] p-10 text-center shadow-sm ring-1 ring-[var(--border)]">
          <p className="text-lg font-semibold text-[var(--card-foreground)]">
            Загружаем заказы...
          </p>
        </section>
      ) : orders.length === 0 ? (
        <section className="rounded-xl bg-[var(--card)] p-10 text-center shadow-sm ring-1 ring-[var(--border)]">
          <p className="text-lg font-semibold text-[var(--card-foreground)]">
            У вас пока нет заказов
          </p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Перейдите в каталог, добавьте товары в корзину и оформите заказ.
          </p>
          <button
            type="button"
            onClick={() => navigate("/#products")}
            className="mt-6 inline-flex rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-90"
          >
            Перейти в каталог
          </button>
        </section>
      ) : (
        <section className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-xl bg-[var(--card)] p-5 shadow-sm ring-1 ring-[var(--border)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                    Заказ #{order.id}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    Статус: {order.status}
                  </p>
                </div>
                <p className="text-lg font-bold text-[var(--card-foreground)]">
                  {Number(order.total_price).toLocaleString("ru-RU")} ₽
                </p>
              </div>

              <div className="my-4 h-px bg-[var(--border)]" />

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-3 rounded-xl bg-[var(--muted)]/40 p-3 sm:grid-cols-[72px_1fr_auto]"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-[72px] w-[72px] rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                        {item.product.brand}
                      </p>
                      <p className="text-sm font-semibold text-[var(--card-foreground)]">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        Цвет: {item.product.color} | Размер: {item.product.size}
                      </p>
                    </div>
                    <div className="self-center text-right">
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {item.quantity} шт.
                      </p>
                      <p className="text-sm font-semibold text-[var(--card-foreground)]">
                        {Number(item.price_at_purchase).toLocaleString("ru-RU")} ₽
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
