import { instance } from "@/api/instance";
import { getErrorMessage } from "@/lib/get-error-message";
import Cookies from "js-cookie";
import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const adminLoginSchema = z.object({
  email: z.string().trim().min(1, "Введите email").email("Некорректный email"),
  password: z.string().min(1, "Введите пароль"),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
type AdminLoginErrors = Partial<Record<keyof AdminLoginFormData, string>>;

const initialForm: AdminLoginFormData = {
  email: "",
  password: "",
};

export default function AdminLogin() {
  const [formData, setFormData] = useState<AdminLoginFormData>(initialForm);
  const [errors, setErrors] = useState<AdminLoginErrors>({});
  const [status, setStatus] = useState("");

  const setField = <K extends keyof AdminLoginFormData>(
    key: K,
    value: AdminLoginFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setStatus("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = adminLoginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      setStatus("Проверьте поля формы");
      return;
    }

    setErrors({});
    try {
      setStatus("Выполняется вход...");
      const response = await instance.post("auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data?.access_token;
      if (!token || typeof token !== "string") {
        setStatus("Не удалось получить токен");
        toast.error("Токен не пришел в ответе");
        return;
      }

      Cookies.set("token", token, { sameSite: "lax" });
      setStatus("Вход выполнен успешно");
      toast.success("Вы успешно вошли в аккаунт");
      navigate("/admin/panel");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setStatus("Ошибка входа");
      toast.error(errorMessage);
    }
  };
  const navigate = useNavigate();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded-xl bg-[var(--card)] p-6 shadow-xl ring-1 ring-[var(--border)] sm:p-8">
        <h1 className="text-3xl font-black tracking-tight text-[var(--card-foreground)]">
          Вход в админ-панель
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Доступ только для администраторов.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setField("email", e.target.value)}
              className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-4 py-3 text-sm outline-none transition focus:border-[var(--ring)]"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-[var(--destructive)]">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={(e) => setField("password", e.target.value)}
              className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-4 py-3 text-sm outline-none transition focus:border-[var(--ring)]"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-[var(--destructive)]">
                {errors.password}
              </p>
            )}
          </div>

          {status && (
            <p className="rounded-xl bg-[var(--muted)] px-3 py-2 text-sm text-[var(--muted-foreground)]">
              {status}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-90"
          >
            Войти в админ-панель
          </button>
        </form>
      </section>
    </main>
  );
}
