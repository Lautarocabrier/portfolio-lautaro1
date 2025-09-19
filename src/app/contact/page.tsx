"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar con mailto (abre el cliente de correo del usuario)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = "cabrierlautaro4@gmail.com"; // <-- tu email
    const subject = encodeURIComponent(
      form.subject || `Mensaje desde el portfolio - ${form.name}`
    );
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 pt-24 md:pt-28 pb-24">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contacto</h1>
        <p className="mt-3 text-white/80">
          ¿Tenés una propuesta o querés charlar? Escribime y te respondo.
        </p>
      </motion.header>

      <section className="grid gap-6 md:grid-cols-5">
        {/* Info lateral (izquierda) */}
        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
        >
          <h2 className="text-lg font-semibold">Preferís un mail directo?</h2>
          <a
            href="mailto:cabrierlautaro4@gmail.com"
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            <Mail className="size-4" />
            cabrierlautaro4@gmail.com
          </a>

          <div className="mt-5 flex items-center gap-2 text-white/80">
            <MapPin className="size-4" />
            Córdoba, Argentina
          </div>

          <p className="mt-5 text-sm text-white/70 leading-relaxed">
            También podés escribirme por LinkedIn o abrir un issue en GitHub si
            querés comentar algo del repo del portfolio.
          </p>
        </motion.aside>

        {/* Formulario (derecha) */}
        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="md:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-md"
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
              className="mt-1 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-white/90 placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </label>

          {/* Email + Asunto en grid */}
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
                className="mt-1 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-white/90 placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </label>

            <label className="block text-sm font-medium text-white/85">
              Asunto
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Consulta / Propuesta / Feedback"
                className="mt-1 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-white/90 placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400"
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
              required
              placeholder="Escribí tu mensaje…"
              className="mt-1 h-36 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-white/90 placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </label>

          {/* Botón */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Enviar mensaje
          </motion.button>

          {/* Nota */}
          <p className="mt-3 text-xs text-white/60">
            Esto usa <code>mailto:</code> para abrir tu cliente de correo. Si
            preferís, después lo cambiamos por EmailJS o una API.
          </p>
        </motion.form>
      </section>
    </main>
  );
}
