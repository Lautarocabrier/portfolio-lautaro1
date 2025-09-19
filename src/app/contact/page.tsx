"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado 🚀 (aquí conectaríamos emailjs o backend)");
    setForm({ name: "", email: "", message: "" });
    };

    return (
    <section className="min-h-screen bg-gradient-to-b from-base via-neutral to-base py-16 px-6 md:px-20">
    <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-dark"
    >
        Contacto
    </motion.h1>

        <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-4 border border-neutral"
        >
        <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="border border-neutral rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none text-dark"
            required
        />
        <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Tu correo"
            className="border border-neutral rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none text-dark"
            required
        />
        <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Escribe tu mensaje..."
            className="border border-neutral rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none h-32 text-dark"
            required
        />
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-primary hover:bg-accent text-white font-bold py-3 rounded-lg shadow-md transition-colors"
        >
            Enviar mensaje
        </motion.button>
        </form>
    </section>
    );
}