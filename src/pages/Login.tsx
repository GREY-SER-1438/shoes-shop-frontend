import type { FormEvent } from "react";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Введите email")
    .email("Введите корректный email"),
  password: z
    .string()
    .min(1, "Введите пароль")
    .min(6, "Пароль должен быть не короче 6 символов"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type LoginErrors = Partial<Record<keyof LoginFormData, string>>;

const initialForm: LoginFormData = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>(initialForm);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [status, setStatus] = useState("");

  const setField = <K extends keyof LoginFormData>(
    key: K,
    value: LoginFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setStatus("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
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
    setStatus("Форма авторизации заполнена корректно");
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded-xl bg-[var(--card)] p-6 shadow-xl ring-1 ring-[var(--border)] sm:p-8">
        <h1 className="text-3xl font-black tracking-tight text-[var(--card-foreground)]">
          Авторизация
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Введите email и пароль, чтобы войти в аккаунт.
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
              <p className="mt-1 text-xs text-[var(--destructive)]">{errors.email}</p>
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
              <p className="mt-1 text-xs text-[var(--destructive)]">{errors.password}</p>
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
            Войти
          </button>
        </form>

        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          Нет аккаунта?{" "}
          <a className="font-semibold text-[var(--card-foreground)] underline" href="/register">
            Регистрация
          </a>
        </p>
      </section>
    </main>
  );
}
