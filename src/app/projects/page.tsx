"use client";

import { motion } from "framer-motion";

const projects = [
{
    title: "SIADE – Sistema de Gestión Académica",
    tech: "Angular + PostgreSQL",
    description: "Sistema integral para instituciones educativas con roles múltiples.",
    link: "https://github.com/Lautarocabrier",
},
{
    title: "Pizza Happ – App de pedidos",
    tech: "Angular",
    description: "Carrito de compras y gestión de pedidos para pizzería.",
    link: "https://github.com/Lautarocabrier",
},
{
    title: "AI Trader MVP",
    tech: "Python + Streamlit",
    description: "Panel de trading con indicadores técnicos y backtests.",
    link: "https://github.com/Lautarocabrier",
},
];

export default function ProjectsPage() {
return (
    <section className="min-h-screen bg-gradient-to-b from-base via-neutral to-base py-16 px-6 md:px-20">
    <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-dark"
    >
        Proyectos
    </motion.h1>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projects.map((proj, idx) => (
        <motion.a
            key={idx}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-neutral hover:shadow-2xl transition-shadow flex flex-col"
        >
            <h3 className="text-xl md:text-2xl font-bold text-dark mb-2">{proj.title}</h3>
            <p className="text-sm md:text-base text-primary font-semibold mb-3">{proj.tech}</p>
            <p className="text-dark/80 flex-grow">{proj.description}</p>
            <span className="mt-4 inline-block text-accent font-medium hover:underline">
            Ver en GitHub →
            </span>
        </motion.a>
        ))}
    </div>
    </section>
);
}