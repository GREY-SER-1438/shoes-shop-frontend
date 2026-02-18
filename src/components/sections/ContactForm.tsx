import { instance } from "@/api/instance";
import { Clock3, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { z } from "zod";

type FormDataState = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const initialForm: FormDataState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Пожалуйста, укажите имя"),
  phone: z
    .string()
    .trim()
    .min(1, "Пожалуйста, укажите телефон")
    .refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Введите корректный номер телефона",
    }),
  email: z
    .string()
    .trim()
    .min(1, "Пожалуйста, укажите email")
    .email("Введите корректный email"),
  message: z.string().trim().optional(),
});

type FormErrors = Partial<Record<keyof FormDataState, string>>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormDataState>(initialForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formMessage, setFormMessage] = useState("");

  const setField = <K extends keyof FormDataState>(
    field: K,
    value: FormDataState[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormMessage("");
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const errors: FormErrors = {
        name: fieldErrors.name?.[0],
        phone: fieldErrors.phone?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      };

      setFormErrors(errors);
      setFormMessage("Проверьте корректность заполнения формы");
      return;
    }

    setFormErrors({});
    setFormMessage("Форма заполнена корректно");
  };

  return (
    <section id="contact" className="bg-[var(--muted)] py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl">
            <span className="block">Свяжитесь с нами</span>
            <span className="block">любым удобным способом</span>
          </h2>

          <div className="mt-10 space-y-4">
            <button
              onClick={() => (window.location.href = "tel:+79118057418")}
              className="flex w-full items-center gap-4 rounded-xl bg-[var(--card)] p-4 text-left shadow-sm transition hover:translate-x-1"
            >
              <span className="rounded-full bg-[var(--foreground)] p-3 text-[var(--background)]">
                <Phone size={18} />
              </span>
              <span>
                <span className="block font-semibold text-[var(--card-foreground)]">
                  Телефон
                </span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  +7 (911) 805-74-18
                </span>
              </span>
            </button>

            <button
              onClick={() =>
                (window.location.href = "mailto:info@dreamsneakers.ru")
              }
              className="flex w-full items-center gap-4 rounded-xl bg-[var(--card)] p-4 text-left shadow-sm transition hover:translate-x-1"
            >
              <span className="rounded-full bg-[var(--foreground)] p-3 text-[var(--background)]">
                <Mail size={18} />
              </span>
              <span>
                <span className="block font-semibold text-[var(--card-foreground)]">
                  Email
                </span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  info@dreamsneakers.ru
                </span>
              </span>
            </button>

            <div className="flex items-center gap-4 rounded-xl bg-[var(--card)] p-4 shadow-sm">
              <span className="rounded-full bg-[var(--foreground)] p-3 text-[var(--background)]">
                <Clock3 size={18} />
              </span>
              <span>
                <span className="block font-semibold text-[var(--card-foreground)]">
                  Часы работы
                </span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  Пн-Пт: 9:00 - 20:00
                </span>
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-xl bg-[var(--card)] p-6 shadow-xl sm:p-8"
        >
          <h3 className="text-2xl font-bold text-[var(--card-foreground)]">
            Оставьте заявку
          </h3>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Мы свяжемся с вами в течение 15 минут
          </p>

          <div className="mt-6 space-y-4">
            <input
              className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-4 py-3 text-sm outline-none transition focus:border-[var(--ring)]"
              placeholder="Ваше имя *"
              value={formData.name}
              onChange={(e) => setField("name", e.target.value)}
            />
            {formErrors.name && (
              <p className="text-xs text-[var(--destructive)]">
                {formErrors.name}
              </p>
            )}
            <input
              className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-4 py-3 text-sm outline-none transition focus:border-[var(--ring)]"
              placeholder="Телефон"
              value={formData.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
            {formErrors.phone && (
              <p className="text-xs text-[var(--destructive)]">
                {formErrors.phone}
              </p>
            )}
            <input
              className="w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-4 py-3 text-sm outline-none transition focus:border-[var(--ring)]"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setField("email", e.target.value)}
            />
            {formErrors.email && (
              <p className="text-xs text-[var(--destructive)]">
                {formErrors.email}
              </p>
            )}
            <textarea
              className="min-h-32 max-h-32 w-full rounded-xl border border-[var(--input)] bg-[var(--muted)] px-4 py-3 text-sm outline-none transition focus:border-[var(--ring)]"
              placeholder="Ваше сообщение..."
              maxLength={340}
              value={formData.message}
              onChange={(e) => setField("message", e.target.value)}
            />
            {formErrors.message && (
              <p className="text-xs text-[var(--destructive)]">
                {formErrors.message}
              </p>
            )}
          </div>

          {formMessage && (
            <p className="mt-4 rounded-xl bg-[var(--muted)] px-3 py-2 text-sm text-[var(--muted-foreground)]">
              {formMessage}
            </p>
          )}

          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-90"
            onClick={() => {
              instance.get("categories");
            }}
          >
            <Send size={16} />
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
}
