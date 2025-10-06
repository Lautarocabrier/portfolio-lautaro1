"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // anti-bot oculto
  });
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const emailOk = useMemo(() => /\S+@\S+\.\S+/.test(form.email), [form.email]);
  const nameOk = form.name.trim().length > 0;
  const msgLen = form.message.trim().length;
  const msgOk = msgLen >= 25;
  const canSubmit = nameOk && emailOk && msgOk;

  // Ocultar toast automáticamente
  useEffect(() => {
    if (status === "ok" || status === "error") {
      const t = setTimeout(() => setStatus("idle"), 3500);
      return () => clearTimeout(t);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    if (!canSubmit || status === "loading") return;

    try {
      setStatus("loading");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // { name, email, subject, message, honeypot }
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Error");

      setStatus("ok");
      setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
      setAttempted(false);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="relative overflow-hidden">
      {/* blobs sutiles (opcionales) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full grad-brand blur-3xl opacity-25 animate-blob" />
        <div className="absolute top-32 right-1/5 h-72 w-72 rounded-full grad-brand blur-3xl opacity-15 animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full grad-brand blur-3xl opacity-15 animate-blob [animation-delay:8s]" />
      </div>

      {/* TOAST */}
      {(status === "ok" || status === "error") && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed right-4 top-4 z-[60] rounded-lg border px-4 py-3 text-sm shadow-lg ${
            status === "ok"
              ? "border-white/20 bg-white/10 text-white"
              : "border-red-400/40 bg-red-500/10 text-red-200"
          }`}
        >
          {status === "ok"
            ? "✅ Mensaje enviado con éxito. ¡Gracias!"
            : "⚠️ No se pudo enviar. Probá nuevamente en unos minutos."}
        </motion.div>
      )}

      {/* mismo ancho/padding que About/Experience */}
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
        {/* contenedor unificado (SIN la línea izquierda) */}
        <div className="rounded-3xl border-s bg-[var(--surface-2)]/85 p-6 md:p-10 shadow-brand ring-1 ring-[var(--primary)]/10">
          
          
          
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--fg)]">
              Contacto
            </h1>
            <p className="mt-2 text-muted">
              ¿Tenés una propuesta o querés charlar? Escribime y te respondo.
            </p>
          </motion.header>

          <motion.form
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mx-auto"
          >
            {/* honeypot anti-bot (oculto) */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Nombre */}
            <label className="block text-sm font-medium text-[var(--fg)]">
              Nombre
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
                className="mt-1 w-full rounded-xl border-s bg-[var(--surface)] px-3 py-2
                           text-[var(--fg)] placeholder:text-muted/70 outline-none transition-colors
                           focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
              />
            </label>

            {/* Email + Asunto */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-[var(--fg)]">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  className={`mt-1 w-full rounded-xl bg-[var(--surface)] px-3 py-2
                              text-[var(--fg)] placeholder:text-muted/70 outline-none transition-colors
                              border ${
                                attempted && !emailOk
                                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                  : "border-s focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                              }`}
                />
                {attempted && !emailOk && (
                  <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                    Ingresá un email válido.
                  </span>
                )}
              </label>

              <label className="block text-sm font-medium text-[var(--fg)]">
                Asunto
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Consulta / Propuesta / Feedback"
                  className="mt-1 w-full rounded-xl border-s bg-[var(--surface)] px-3 py-2
                             text-[var(--fg)] placeholder:text-muted/70 outline-none transition-colors
                             focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                />
              </label>
            </div>

            {/* Mensaje */}
            <label className="mt-4 block text-sm font-medium text-[var(--fg)]">
              Mensaje
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Escribí tu mensaje…"
                className={`mt-1 h-48 w-full rounded-xl bg-[var(--surface)] px-3 py-2
                            text-[var(--fg)] placeholder:text-muted/70 outline-none transition-colors
                            border ${
                              attempted && !msgOk
                                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                : "border-s focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]"
                            }`}
              />
              {attempted && !msgOk && (
                <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                  El mensaje debe tener al menos 25 caracteres.
                </span>
              )}
            </label>

            {/* Botón */}
            <motion.button
              whileHover={{ scale: canSubmit && status !== "loading" ? 1.03 : 1 }}
              whileTap={{ scale: canSubmit && status !== "loading" ? 0.98 : 1 }}
              type="submit"
              disabled={status === "loading"}
              className={`mt-6 rounded-xl px-5 py-2 text-sm font-semibold transition
                          ${canSubmit && status !== "loading"
                            ? "btn btn-primary"
                            : "btn opacity-60 cursor-not-allowed"}`}
            >
              {status === "loading" ? "Enviando..." : "Enviar mensaje"}
            </motion.button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
