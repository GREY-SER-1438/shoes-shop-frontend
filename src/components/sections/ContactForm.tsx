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
    <section id="contact" className="bg-zinc-100 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-4xl font-black leading-tight tracking-tight text-zinc-950 sm:text-5xl">
            <span className="block">Свяжитесь с нами</span>
            <span className="block">любым удобным способом</span>
          </h2>

          <div className="mt-10 space-y-4">
            <button
              onClick={() => (window.location.href = "tel:+79118057418")}
              className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-sm transition hover:translate-x-1"
            >
              <span className="rounded-full bg-black p-3 text-white">
                <Phone size={18} />
              </span>
              <span>
                <span className="block font-semibold text-zinc-900">
                  Телефон
                </span>
                <span className="text-sm text-zinc-600">
                  +7 (911) 805-74-18
                </span>
              </span>
            </button>

            <button
              onClick={() =>
                (window.location.href = "mailto:info@dreamsneakers.ru")
              }
              className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-sm transition hover:translate-x-1"
            >
              <span className="rounded-full bg-black p-3 text-white">
                <Mail size={18} />
              </span>
              <span>
                <span className="block font-semibold text-zinc-900">Email</span>
                <span className="text-sm text-zinc-600">
                  info@dreamsneakers.ru
                </span>
              </span>
            </button>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <span className="rounded-full bg-black p-3 text-white">
                <Clock3 size={18} />
              </span>
              <span>
                <span className="block font-semibold text-zinc-900">
                  Часы работы
                </span>
                <span className="text-sm text-zinc-600">
                  Пн-Пт: 9:00 - 20:00
                </span>
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl bg-white p-6 shadow-xl sm:p-8"
        >
          <h3 className="text-2xl font-bold text-zinc-950">Оставьте заявку</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Мы свяжемся с вами в течение 15 минут
          </p>

          <div className="mt-6 space-y-4">
            <input
              className="w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
              placeholder="Ваше имя *"
              value={formData.name}
              onChange={(e) => setField("name", e.target.value)}
            />
            {formErrors.name && (
              <p className="text-xs text-rose-600">{formErrors.name}</p>
            )}
            <input
              className="w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
              placeholder="Телефон"
              value={formData.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
            {formErrors.phone && (
              <p className="text-xs text-rose-600">{formErrors.phone}</p>
            )}
            <input
              className="w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setField("email", e.target.value)}
            />
            {formErrors.email && (
              <p className="text-xs text-rose-600">{formErrors.email}</p>
            )}
            <textarea
              className="min-h-32 max-h-32 w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
              placeholder="Ваше сообщение..."
              maxLength={340}
              value={formData.message}
              onChange={(e) => setField("message", e.target.value)}
            />
            {formErrors.message && (
              <p className="text-xs text-rose-600">{formErrors.message}</p>
            )}
          </div>

          {formMessage && (
            <p className="mt-4 rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-700">
              {formMessage}
            </p>
          )}

          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
          >
            <Send size={16} />
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
}
