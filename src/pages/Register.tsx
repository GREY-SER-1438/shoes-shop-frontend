import { instance } from "@/api/instance";
import type { FormEvent } from "react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Введите email")
      .email("Введите корректный email"),
    password: z
      .string()
      .min(8, "Пароль должен быть не короче 8 символов")
      .regex(/[A-Z]/, "Добавьте заглавную букву")
      .regex(/[0-9]/, "Добавьте цифру"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;
type RegisterErrors = Partial<Record<keyof RegisterFormData, string>>;

const initialForm: RegisterFormData = {
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>(initialForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [status, setStatus] = useState("");

  const setField = <K extends keyof RegisterFormData>(
    key: K,
    value: RegisterFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setStatus("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      setStatus("Проверьте поля формы");
      return;
    }

    setErrors({});
    setStatus("Выполняется регистрация...");
    try {
      await instance.post("auth/register", {
        email: formData.email,
        password: formData.password,
      });
      setStatus("Регистрация успешна");
      toast.success("Успешно!");
      navigate("/login");
    } catch (error) {
      setStatus("Ошибка регистрации");
      toast.error(`${error}`);
    }
  };

  const navigate = useNavigate();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-28 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-md rounded-xl bg-[var(--card)] p-6 shadow-xl ring-1 ring-[var(--border)] sm:p-8">
        <h1 className="text-3xl font-black tracking-tight text-[var(--card-foreground)]">
          Регистрация
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Создайте аккаунт для оформления и отслеживания заказов.
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

          <div>
            <input
              type="password"
              placeholder="Повторите пароль"
              value={formData.confirmPassword}
              onChange={(e) => setField("confirmPassword", e.target.value)}
              className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-4 py-3 text-sm outline-none transition focus:border-[var(--ring)]"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-[var(--destructive)]">
                {errors.confirmPassword}
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
            Зарегистрироваться
          </button>
        </form>

        <p className="mt-4 text-sm text-[var(--muted-foreground)]">
          Уже есть аккаунт?
          <a
            className="font-semibold text-[var(--card-foreground)] underline"
            href="/login"
          >
            Войти
          </a>
        </p>
      </section>
    </main>
  );
}
