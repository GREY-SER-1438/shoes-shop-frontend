import { instance } from "@/api/instance";
import { getErrorMessage } from "@/lib/get-error-message";
import type { FormEvent } from "react";
import { useState } from "react";
import { toast } from "sonner";

type ProductListItem = {
  groupId: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
  color: string[];
  size: number[];
  stock: number;
};

type ProductVariant = {
  id: number;
  color: string;
  size: number;
  stock: number;
};

type ProductById = {
  groupId: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
  variants: ProductVariant[];
};

type CreateVariantPayload = {
  groupId: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  color: string;
  size: number;
  stock: number;
  categoryId: number;
};

type UpdateVariantPayload = Partial<CreateVariantPayload>;

const initialCreateForm: CreateVariantPayload = {
  groupId: 0,
  name: "",
  brand: "",
  image: "",
  price: 0,
  color: "",
  size: 0,
  stock: 0,
  categoryId: 0,
};

const initialUpdateForm = {
  id: 0,
  groupId: "",
  name: "",
  brand: "",
  image: "",
  price: "",
  color: "",
  size: "",
  stock: "",
  categoryId: "",
};

export default function AdminPanel() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const [detailsGroupId, setDetailsGroupId] = useState("");
  const [productDetails, setProductDetails] = useState<ProductById | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [createForm, setCreateForm] = useState<CreateVariantPayload>(initialCreateForm);
  const [createLoading, setCreateLoading] = useState(false);

  const [updateForm, setUpdateForm] = useState(initialUpdateForm);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await instance.get<ProductListItem[]>("/products");
      setProducts(response.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchProductById = async (e: FormEvent) => {
    e.preventDefault();
    const groupId = Number(detailsGroupId);
    if (!Number.isFinite(groupId) || groupId <= 0) {
      toast.error("Введите корректный groupId");
      return;
    }

    setDetailsLoading(true);
    try {
      const response = await instance.get<ProductById>(`/products/${groupId}`);
      setProductDetails(response.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setProductDetails(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  const createVariant = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !createForm.groupId ||
      !createForm.name ||
      !createForm.brand ||
      !createForm.image ||
      !createForm.price ||
      !createForm.color ||
      !createForm.size ||
      createForm.stock < 0 ||
      !createForm.categoryId
    ) {
      toast.error("Заполните все поля для создания вариации");
      return;
    }

    setCreateLoading(true);
    try {
      await instance.post("/products", createForm);
      toast.success("Вариация создана");
      setCreateForm(initialCreateForm);
      await fetchProducts();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setCreateLoading(false);
    }
  };

  const updateVariant = async (e: FormEvent) => {
    e.preventDefault();
    const variantId = Number(updateForm.id);
    if (!Number.isFinite(variantId) || variantId <= 0) {
      toast.error("Введите корректный id вариации");
      return;
    }

    const payload: UpdateVariantPayload = {};

    if (updateForm.groupId.trim()) payload.groupId = Number(updateForm.groupId);
    if (updateForm.name.trim()) payload.name = updateForm.name.trim();
    if (updateForm.brand.trim()) payload.brand = updateForm.brand.trim();
    if (updateForm.image.trim()) payload.image = updateForm.image.trim();
    if (updateForm.price.trim()) payload.price = Number(updateForm.price);
    if (updateForm.color.trim()) payload.color = updateForm.color.trim();
    if (updateForm.size.trim()) payload.size = Number(updateForm.size);
    if (updateForm.stock.trim()) payload.stock = Number(updateForm.stock);
    if (updateForm.categoryId.trim()) payload.categoryId = Number(updateForm.categoryId);

    if (Object.keys(payload).length === 0) {
      toast.error("Нужно указать хотя бы одно поле для обновления");
      return;
    }

    setUpdateLoading(true);
    try {
      await instance.patch(`/products/variant/${variantId}`, payload);
      toast.success("Вариация обновлена");
      await fetchProducts();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setUpdateLoading(false);
    }
  };

  const removeVariant = async (e: FormEvent) => {
    e.preventDefault();
    const variantId = Number(deleteId);
    if (!Number.isFinite(variantId) || variantId <= 0) {
      toast.error("Введите корректный id вариации");
      return;
    }

    setDeleteLoading(true);
    try {
      await instance.delete(`/products/variant/${variantId}`);
      toast.success("Вариация удалена");
      setDeleteId("");
      await fetchProducts();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight text-[var(--foreground)]">
        Админ-панель товаров
      </h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl bg-[var(--card)] p-6 ring-1 ring-[var(--border)]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-[var(--card-foreground)]">
              GET /products
            </h2>
            <button
              type="button"
              onClick={() => void fetchProducts()}
              className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)]"
            >
              {productsLoading ? "Загрузка..." : "Обновить"}
            </button>
          </div>
          <pre className="mt-4 max-h-80 overflow-auto rounded-lg bg-[var(--muted)] p-3 text-xs">
            {JSON.stringify(products, null, 2)}
          </pre>
        </section>

        <section className="rounded-xl bg-[var(--card)] p-6 ring-1 ring-[var(--border)]">
          <h2 className="text-xl font-bold text-[var(--card-foreground)]">
            GET /products/:groupId
          </h2>
          <form onSubmit={fetchProductById} className="mt-4 flex gap-2">
            <input
              value={detailsGroupId}
              onChange={(e) => setDetailsGroupId(e.target.value)}
              placeholder="groupId"
              className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)]"
            >
              {detailsLoading ? "..." : "Получить"}
            </button>
          </form>
          <pre className="mt-4 max-h-80 overflow-auto rounded-lg bg-[var(--muted)] p-3 text-xs">
            {JSON.stringify(productDetails, null, 2)}
          </pre>
        </section>

        <section className="rounded-xl bg-[var(--card)] p-6 ring-1 ring-[var(--border)]">
          <h2 className="text-xl font-bold text-[var(--card-foreground)]">
            POST /products
          </h2>
          <form onSubmit={createVariant} className="mt-4 space-y-2">
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="groupId" value={createForm.groupId || ""} onChange={(e) => setCreateForm((prev) => ({ ...prev, groupId: Number(e.target.value) }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="name" value={createForm.name} onChange={(e) => setCreateForm((prev) => ({ ...prev, name: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="brand" value={createForm.brand} onChange={(e) => setCreateForm((prev) => ({ ...prev, brand: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="image URL" value={createForm.image} onChange={(e) => setCreateForm((prev) => ({ ...prev, image: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="price" value={createForm.price || ""} onChange={(e) => setCreateForm((prev) => ({ ...prev, price: Number(e.target.value) }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="color" value={createForm.color} onChange={(e) => setCreateForm((prev) => ({ ...prev, color: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="size" value={createForm.size || ""} onChange={(e) => setCreateForm((prev) => ({ ...prev, size: Number(e.target.value) }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="stock" value={createForm.stock || ""} onChange={(e) => setCreateForm((prev) => ({ ...prev, stock: Number(e.target.value) }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="categoryId" value={createForm.categoryId || ""} onChange={(e) => setCreateForm((prev) => ({ ...prev, categoryId: Number(e.target.value) }))} />
            <button type="submit" className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)]">
              {createLoading ? "Создание..." : "Создать"}
            </button>
          </form>
        </section>

        <section className="rounded-xl bg-[var(--card)] p-6 ring-1 ring-[var(--border)]">
          <h2 className="text-xl font-bold text-[var(--card-foreground)]">
            PATCH /products/variant/:id
          </h2>
          <form onSubmit={updateVariant} className="mt-4 space-y-2">
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="id вариации (обяз.)" value={updateForm.id || ""} onChange={(e) => setUpdateForm((prev) => ({ ...prev, id: Number(e.target.value) }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="groupId (optional)" value={updateForm.groupId} onChange={(e) => setUpdateForm((prev) => ({ ...prev, groupId: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="name (optional)" value={updateForm.name} onChange={(e) => setUpdateForm((prev) => ({ ...prev, name: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="brand (optional)" value={updateForm.brand} onChange={(e) => setUpdateForm((prev) => ({ ...prev, brand: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="image (optional)" value={updateForm.image} onChange={(e) => setUpdateForm((prev) => ({ ...prev, image: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="price (optional)" value={updateForm.price} onChange={(e) => setUpdateForm((prev) => ({ ...prev, price: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="color (optional)" value={updateForm.color} onChange={(e) => setUpdateForm((prev) => ({ ...prev, color: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="size (optional)" value={updateForm.size} onChange={(e) => setUpdateForm((prev) => ({ ...prev, size: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="stock (optional)" value={updateForm.stock} onChange={(e) => setUpdateForm((prev) => ({ ...prev, stock: e.target.value }))} />
            <input className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm" placeholder="categoryId (optional)" value={updateForm.categoryId} onChange={(e) => setUpdateForm((prev) => ({ ...prev, categoryId: e.target.value }))} />
            <button type="submit" className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)]">
              {updateLoading ? "Обновление..." : "Обновить"}
            </button>
          </form>
        </section>

        <section className="rounded-xl bg-[var(--card)] p-6 ring-1 ring-[var(--border)] lg:col-span-2">
          <h2 className="text-xl font-bold text-[var(--card-foreground)]">
            DELETE /products/variant/:id
          </h2>
          <form onSubmit={removeVariant} className="mt-4 flex gap-2">
            <input
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              placeholder="id вариации"
              className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-xl bg-[var(--destructive)] px-4 py-2 text-sm font-semibold text-[var(--destructive-foreground)]"
            >
              {deleteLoading ? "Удаление..." : "Удалить"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
