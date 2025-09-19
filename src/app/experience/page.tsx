"use client";

import { motion } from "framer-motion";

const experiences = [
    {
    year: "2025 – Actualidad",
    title: "Proyecto Final de Carrera – Instituto Cura Brochero",
    role: "Líder de Proyecto & Frontend",
    description:
    "Desarrollo en Angular, queries SQL en PostgreSQL, planificación de sprints en Jira y liderazgo técnico en un sistema de gestión educativa.",
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
    return (
    <section className="min-h-screen bg-gradient-to-b from-base via-neutral to-base py-16 px-6 md:px-20">
    <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-dark"
    >
        Experiencia
    </motion.h1>

    <div className="relative border-l-4 border-primary max-w-3xl mx-auto">
        {experiences.map((exp, idx) => (
        <motion.div
            key={idx}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="mb-12 ml-6"
        >
            <div className="absolute w-5 h-5 bg-accent rounded-full -left-2.5 mt-2 shadow-md" />
            <h3 className="text-xl md:text-2xl font-bold text-dark">{exp.role}</h3>
            <p className="text-sm md:text-base text-primary font-semibold">{exp.year}</p>
            <h4 className="text-lg md:text-xl text-accent font-medium">{exp.title}</h4>
            <p className="text-dark/80 mt-2">{exp.description}</p>
        </motion.div>
        ))}
    </div>
    </section>
);
}