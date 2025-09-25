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
        <main className="mx-auto max-w-5xl px-6 md:px-8 pt-10 md:pt-12 pb-16">
        {/* Título */}
        <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-8"
            style={{ color: "var(--primary)" }}
        >
            Experiencia
        </motion.h1>

        {/* Contenedor con recuadro acorde a la paleta */}
        <section className="rounded-3xl border-s bg-[color:var(--surface-2)]/85 shadow-brand ring-1 ring-[color:var(--primary)]/10 p-5 md:p-8">
            {/* Timeline */}
            <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="relative mx-auto w-full max-w-3xl pl-10"
            >
            {/* Línea vertical (usa --border) */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-3 top-0 bottom-0 w-[2px] rounded-full"
                style={{ background: "var(--border)" }}
            />

            {experiences.map((exp, idx) => (
                <motion.article
                key={idx}
                variants={itemVariants}
                className="relative mb-8 last:mb-0"
                >
                {/* Punto del timeline */}
                <span
                    aria-hidden
                    className="absolute -left-[6px] top-1 h-3.5 w-3.5 rounded-full"
                    style={{
                    background: "var(--surface)",
                    border: "2px solid var(--primary)",
                    boxShadow: "0 0 0 3px color-mix(in oklab, var(--primary) 18%, transparent)",
                    }}
                />

                {/* Rol */}
                <h3
                    className="text-xl md:text-2xl font-bold"
                    style={{ color: "var(--fg)" }}
                >
                    {exp.role}
                </h3>

                {/* Año */}
                <p
                    className="text-sm md:text-base font-semibold"
                    style={{ color: "var(--primary)" }}
                >
                    {exp.year}
                </p>

                {/* Título */}
                <h4
                    className="text-lg md:text-xl font-medium"
                    style={{ color: "var(--accent)" }}
                >
                    {exp.title}
                </h4>

                {/* Descripción */}
                <p className="mt-2" style={{ color: "var(--muted)" }}>
                    {exp.description}
                </p>
                </motion.article>
            ))}
            </motion.div>
        </section>
        </main>
    );
    }
