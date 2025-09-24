"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [attempted, setAttempted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const emailOk = useMemo(() => /\S+@\S+\.\S+/.test(form.email), [form.email]);
  const nameOk = form.name.trim().length > 0;
  const msgLen = form.message.trim().length;
  const msgOk = msgLen >= 25;
  const canSubmit = nameOk && emailOk && msgOk;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);

    if (!canSubmit) return;

    const to = "cabrierlautaro4@gmail.com";
    const subject = encodeURIComponent(
      form.subject || `Mensaje desde el portfolio - ${form.name}`
    );
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    setForm({ name: "", email: "", subject: "", message: "" });
    setAttempted(false);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 pt-10 md:pt-12 pb-16">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contacto</h1>
        <p className="mt-2 text-white/80">
          ¿Tenés una propuesta o querés charlar? Escribime y te respondo.
        </p>
      </motion.header>

      <section className="flex justify-center">
        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          onSubmit={handleSubmit}
          className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md"
        >
          {/* Nombre */}
          <label className="block text-sm font-medium text-white/85">
            Nombre
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
              className="mt-1 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-white/90 placeholder-white/50 outline-none focus:ring-2 focus:ring-white"
            />
          </label>

          {/* Email + Asunto */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-white/85">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
                className={`mt-1 w-full rounded-xl border bg-transparent px-3 py-2 text-white/90 placeholder-white/50 outline-none focus:ring-2 ${
                  attempted && !emailOk
                    ? "border-red-400/60 focus:ring-red-400"
                    : "border-white/10 focus:ring-white"
                }`}
              />
              {attempted && !emailOk && (
                <span className="mt-1 block text-xs text-red-300/90">
                  Ingresá un email válido.
                </span>
              )}
            </label>

            <label className="block text-sm font-medium text-white/85">
              Asunto
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Consulta / Propuesta / Feedback"
                className="mt-1 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-white/90 placeholder-white/50 outline-none focus:ring-2 focus:ring-white"
              />
            </label>
          </div>

          {/* Mensaje */}
          <label className="mt-4 block text-sm font-medium text-white/85">
            Mensaje
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Escribí tu mensaje…"
              className={`mt-1 h-48 w-full rounded-xl border bg-transparent px-3 py-2 text-white/90 placeholder-white/50 outline-none focus:ring-2 ${
                form.message.trim().length > 0
                  ? "border-white focus:ring-white"
                  : "border-white/10 focus:ring-white"
              } ${attempted && !msgOk ? "border-red-400/60 focus:ring-red-400" : ""}`}
            />
            {attempted && !msgOk && (
              <span className="mt-1 block text-xs text-red-300/90">
                El mensaje debe tener al menos 25 caracteres.
              </span>
            )}
          </label>

          {/* Botón */}
          <motion.button
            whileHover={{ scale: canSubmit ? 1.03 : 1 }}
            whileTap={{ scale: canSubmit ? 0.98 : 1 }}
            type="submit"
            className={`mt-6 inline-flex items-center justify-center rounded-xl border px-5 py-2 text-sm font-semibold transition ${
              canSubmit
                ? "border-white/10 bg-white/10 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                : "border-white/10 bg-white/5 text-white/50"
            }`}
          >
            Enviar mensaje
          </motion.button>
        </motion.form>
      </section>
    </main>
  );
}
