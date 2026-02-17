import { Clock3, Mail, Phone, Send, X } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

type FormDataState = {
  name: string;
  phone: string;
  email: string;
  message: string;
  agreement: boolean;
};

type MessageState = {
  text: string;
  type: "" | "success" | "error";
};

const scriptURL =
  "https://script.google.com/macros/s/AKfycbz6GWZuzsCUeOOfy60F_evoz_pWOStCju7kGI_dR9Nr-os1BalXS7gU51EFspC5wrh9UA/exec";

const initialForm: FormDataState = {
  name: "",
  phone: "",
  email: "",
  message: "",
  agreement: false,
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormDataState>(initialForm);
  const [formMessage, setFormMessage] = useState<MessageState>({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [hasReadPolicy, setHasReadPolicy] = useState(false);

  const validate = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      setFormMessage({ text: "Пожалуйста, заполните все обязательные поля", type: "error" });
      return false;
    }
    if (!formData.agreement || !hasReadPolicy) {
      setFormMessage({ text: "Необходимо принять политику конфиденциальности", type: "error" });
      setShowPolicy(true);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormMessage({ text: "Введите корректный email", type: "error" });
      return false;
    }
    if (formData.phone.replace(/\D/g, "").length < 10) {
      setFormMessage({ text: "Введите корректный номер телефона", type: "error" });
      return false;
    }
    return true;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("phone", formData.phone);
      payload.append("email", formData.email);
      payload.append("message", formData.message);
      payload.append("timestamp", new Date().toLocaleString());

      await fetch(scriptURL, {
        method: "POST",
        body: payload,
        mode: "no-cors",
      });

      setFormMessage({ text: "Спасибо! Ваша заявка отправлена.", type: "success" });
      setFormData(initialForm);
      setHasReadPolicy(false);
    } catch {
      setFormMessage({ text: "Ошибка при отправке. Попробуйте еще раз.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
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
                <span className="block font-semibold text-zinc-900">Телефон</span>
                <span className="text-sm text-zinc-600">+7 (911) 805-74-18</span>
              </span>
            </button>

            <button
              onClick={() => (window.location.href = "mailto:info@dreamsneakers.ru")}
              className="flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-sm transition hover:translate-x-1"
            >
              <span className="rounded-full bg-black p-3 text-white">
                <Mail size={18} />
              </span>
              <span>
                <span className="block font-semibold text-zinc-900">Email</span>
                <span className="text-sm text-zinc-600">info@dreamsneakers.ru</span>
              </span>
            </button>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <span className="rounded-full bg-black p-3 text-white">
                <Clock3 size={18} />
              </span>
              <span>
                <span className="block font-semibold text-zinc-900">Часы работы</span>
                <span className="text-sm text-zinc-600">Пн-Пт: 9:00 - 20:00</span>
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
          <h3 className="text-2xl font-bold text-zinc-950">Оставьте заявку</h3>
          <p className="mt-1 text-sm text-zinc-600">Мы свяжемся с вами в течение 15 минут</p>

          <div className="mt-6 space-y-4">
            <input
              className="w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
              placeholder="Ваше имя *"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
              placeholder="Телефон *"
              value={formData.phone}
              onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
            />
            <input
              className="w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
              placeholder="Email *"
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            />
            <textarea
              className="min-h-32 w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm outline-none transition focus:border-pink-500"
              placeholder="Ваше сообщение..."
              value={formData.message}
              onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
            />
          </div>

          <label className="mt-4 flex items-start gap-3 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={formData.agreement}
              disabled={!hasReadPolicy}
              onChange={(event) => setFormData((prev) => ({ ...prev, agreement: event.target.checked }))}
              className="mt-1"
            />
            <span>
              Согласен с
              <button
                type="button"
                className="ml-1 font-semibold text-zinc-900 underline decoration-pink-500 underline-offset-4"
                onClick={() => setShowPolicy(true)}
              >
                политикой конфиденциальности
              </button>
            </span>
          </label>

          {formMessage.text && (
            <p
              className={`mt-4 rounded-lg px-3 py-2 text-sm ${
                formMessage.type === "success" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}
            >
              {formMessage.text}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !hasReadPolicy}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            <Send size={16} />
            {isSubmitting ? "Отправляем..." : "Отправить заявку"}
          </button>
        </form>
      </div>

      {showPolicy && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              className="absolute right-3 top-3 rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
              onClick={() => setShowPolicy(false)}
              aria-label="Close policy"
            >
              <X size={18} />
            </button>

            <h3 className="text-2xl font-bold text-zinc-950">Политика конфиденциальности</h3>
            <div className="mt-5 space-y-3 rounded-xl bg-zinc-100 p-4 text-sm leading-7 text-zinc-700">
              <p>1. Мы собираем только необходимые данные: имя, телефон, email и сообщение.</p>
              <p>2. Данные используются только для обратной связи по вашей заявке.</p>
              <p>3. Мы не передаем данные третьим лицам и обеспечиваем их конфиденциальность.</p>
              <p>4. Срок хранения данных ограничен временем обработки запроса.</p>
            </div>

            <button
              className="mt-6 w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
              onClick={() => {
                setHasReadPolicy(true);
                setFormData((prev) => ({ ...prev, agreement: true }));
                setShowPolicy(false);
              }}
            >
              Я прочитал и принимаю условия
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
