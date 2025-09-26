"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";

const experiences = [
    {
        year: "2025 – Actualidad",
        title: "Proyecto Final de Carrera – Instituto Cura Brochero",
        role: "Líder de Proyecto & Frontend",
        description:
        "Desarrollo en Angular, queries SQL en PostgreSQL, planificación de sprints en Jira y liderazgo técnico en un sistema de gestión educativa.",
    },
    {
        year: "2025 – En desarrollo",
        title: "Obras – Proyecto Freelance (Constructora)",
        role: "Frontend Developer",
        description:
        "Aplicación de gestión para constructora, desarrollada con Angular + PrimeNG. Enfocada en modularidad, rendimiento y escalabilidad.",
    },
    {
        year: "2024 – 2025",
        title: "Pasantía / Shadow – ENCODE S.A",
        role: "Frontend Developer & QA",
        description:
        "Angular + testing manual en Jira, GitHub y exposición a Selenium + Python. Trabajo en equipo bajo Scrum.",
    },
    ];

    export default function ExperiencePage() {
    const reduce = useReducedMotion();

    // variantes (igual que tenías)
    const listVariants: Variants = {
        hidden: {},
        show: {
        transition: {
            staggerChildren: reduce ? 0 : 0.5,
            delayChildren: reduce ? 0 : 0.1,
        },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 18 },
        show: {
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <main className="relative overflow-hidden">
        {/* blobs sutiles (opcionales) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full grad-brand blur-3xl opacity-25 animate-blob" />
            <div className="absolute top-32 right-1/5 h-72 w-72 rounded-full grad-brand blur-3xl opacity-15 animate-blob [animation-delay:4s]" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full grad-brand blur-3xl opacity-15 animate-blob [animation-delay:8s]" />
        </div>

        <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
            {/* contenedor alineado a About/Contact (sin cambiar el estilo, solo colores) */}
            <div className="rounded-3xl border-s bg-[var(--surface-2)]/85 p-6 md:p-10 shadow-brand ring-1 ring-[var(--border)]">
            <motion.h1
                initial={{ opacity: 0, y: reduce ? 0 : -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.5 }}
                className="text-center text-4xl md:text-6xl font-extrabold tracking-tight"
            >
                Experiencia
            </motion.h1>

            {/* timeline */}
            <motion.div
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="relative mx-auto w-full max-w-3xl pl-10 mt-8 md:mt-10"
            >
                {/* barra izquierda: VERDE en claro, BLANCA en oscuro */}
                <div
                aria-hidden
                className="
                    pointer-events-none absolute left-3 top-0 bottom-0 w-[3px]
                    bg-[var(--primary)] dark:bg-white/70 rounded-full
                "
                />

                {experiences.map((exp, idx) => (
                <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="relative mb-10 last:mb-0"
                >
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--fg)]">
                    {exp.role}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--primary)] font-semibold">
                    {exp.year}
                    </p>
                    <h4 className="text-base md:text-lg font-medium text-[var(--accent-2)]">
                    {exp.title}
                    </h4>
                    <p className="mt-2 text-[var(--muted)]">{exp.description}</p>
                </motion.div>
                ))}
            </motion.div>
            </div>
        </section>
        </main>
    );
    }