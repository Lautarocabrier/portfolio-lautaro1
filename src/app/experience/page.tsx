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

    // Animaciones — ajustadas si el usuario prefiere menos movimiento
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
        <section className="min-h-screen bg-gradient-to-b from-base via-neutral to-base px-6 md:px-20 py-12 md:py-16">
        <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-dark"
        >
            Experiencia
        </motion.h1>

        {/* Timeline */}
        <motion.div
            variants={listVariants}
            initial="hidden"
            animate="show"              
            className="relative mx-auto w-full max-w-3xl pl-10"
        >
            {/* Barra ajustada exactamente al contenido */}
            <div aria-hidden className="pointer-events-none absolute left-3 top-0 bottom-0 w-[2px] bg-white/50" />

            {experiences.map((exp, idx) => (
            <motion.div
                key={idx}
                variants={itemVariants}
                className="relative mb-10 last:mb-0"
            >
                <h3 className="text-xl md:text-2xl font-bold text-dark">{exp.role}</h3>
                <p className="text-sm md:text-base text-primary font-semibold">{exp.year}</p>
                <h4 className="text-lg md:text-xl text-accent font-medium">{exp.title}</h4>
                <p className="text-dark/80 mt-2">{exp.description}</p>
            </motion.div>
            ))}
        </motion.div>
        </section>
    );
    }