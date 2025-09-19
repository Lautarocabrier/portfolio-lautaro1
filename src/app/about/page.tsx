"use client";

import { motion } from "framer-motion";

// Reutilizamos los datos que ya tenías
const skillsMain = [
    "React", "Angular", "NextJS", "PostgreSQL", "TailwindCSS", "PrimeNG", "Git/GitHub", "Docker"
];
const skillsExtra = [
    "Python", "C#", ".NET", "Selenium", "Node.js", "CI/CD"
];

// Variants para un stagger suave
const container = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.05 }
    } 
};
const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
};

export default function AboutPage() {
    return (
    <main className="relative overflow-hidden">
      {/* blobs del fondo (mismos del Home) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full grad-brand blur-3xl opacity-25 animate-blob" />
        <div className="absolute top-32 right-1/5 h-72 w-72 rounded-full grad-brand blur-3xl opacity-15 animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full grad-brand blur-3xl opacity-15 animate-blob [animation-delay:8s]" />
        </div>

        <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        {/* Título */}
        <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-4xl font-extrabold tracking-tight md:text-6xl"
        >
            <span className="grad-text">Sobre mí</span>
        </motion.h1>

        {/* Descripción */}
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl text-center"
        >
            Soy <span className="font-semibold">Lautaro Cabrier Molina</span>, estudiante avanzado de
            Desarrollo de Software y <span className="font-semibold">Desarrollador Frontend</span>.
            Experiencia en <strong>Angular, React, NextJS y PostgreSQL</strong>. Me apasiona el
            desarrollo web, el diseño UX/UI y actualmente doy mis primeros pasos en{" "}
            <strong>Testing Automatizado</strong> con Selenium.
        </motion.p>

        {/* Tarjeta compacta con highlights (opcional, suma jerarquía visual) */}
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="card mx-auto mt-10 max-w-3xl p-6"
        >
            <ul className="grid gap-3 text-sm text-white/85 md:grid-cols-3">
            <li>⚡ Enfoque: Frontend + UX/UI</li>
            <li>🧪 QA: Selenium (iniciando)</li>
            <li>🗂️ Metodologías: Scrum</li>
            </ul>
        </motion.div>

        {/* Skills principales */}
        <motion.section
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-16"
        >
            <h2 className="text-center text-2xl font-bold">Skills principales</h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
            {skillsMain.map((s) => (
                <motion.span
                key={s}
                variants={item}
                whileHover={{ scale: 1.06 }}
                className="rounded-full bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-card"
                >
                {s}
                </motion.span>
            ))}
            </div>
        </motion.section>

        {/* Skills complementarios */}
        <motion.section
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12"
        >
            <h2 className="text-center text-2xl font-bold">Conocimientos complementarios</h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
            {skillsExtra.map((s) => (
            <motion.span
                key={s}
                variants={item}
                whileHover={{ scale: 1.06 }}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md"
            >
                {s}
                </motion.span>
            ))}
            </div>
        </motion.section>
        </section>
    </main>
    );
}
