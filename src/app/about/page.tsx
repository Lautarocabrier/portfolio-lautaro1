"use client";

import { motion } from "framer-motion";
import Reveal from "@/app/components/Reveal";
import { Stagger, item } from "@/app/components/Stagger";

export default function AboutPage() {
    const skillsMain = [
    "React", "Angular", "CSS", "Html", "TailwindCSS", "PrimeNG", "Git/GitHub", "Docker"
    ];
    const skillsExtra = [
    "Python", "C#", ".NET","NextJS","Postman", "Node.js", "CI/CD","PostgreSQL"
    ];

    return (
    <main className="relative overflow-hidden">
      {/* blobs de fondo */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full grad-brand blur-3xl opacity-25 animate-blob" />
        <div className="absolute top-32 right-1/5 h-72 w-72 rounded-full grad-brand blur-3xl opacity-15 animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full grad-brand blur-3xl opacity-15 animate-blob [animation-delay:8s]" />
        </div>

        <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
        {/* Título */}
        <Reveal>
            <h1 className="text-center text-4xl font-extrabold tracking-tight md:text-6xl">
            <span className="grad-text">Sobre mí</span>
            </h1>
        </Reveal>

        {/* Descripción */}
        <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl text-center">
            <span className="font-semibold">Hola, me llamo Lautaro Cabrier Molina</span>.  
            Soy estudiante avanzado de Desarrollo de Software con foco en el desarrollo frontend, principalmente con <strong>Angular</strong> y <strong>React</strong>.  
            Además, cuento con formación en <strong>Testing Manual</strong> (diseño y ejecución de casos de prueba, reporte de bugs en Jira) y actualmente estoy dando mis primeros pasos en <strong>Testing Automatizado</strong>, con interés en profundizar en herramientas como <strong>Postman</strong>.  
            Me apasiona crear interfaces modernas, aplicar buenas prácticas de <strong>UI/UX</strong> y trabajar en equipo bajo metodologías ágiles como Scrum.
            </p>
        </Reveal>

        {/* Skills principales */}
        <section className="mt-12">
            <Reveal><h2 className="text-center text-4xl md:text-5xl font-extrabold mb-8">Skills principales</h2></Reveal>
            <Stagger>
            <div className="flex flex-wrap justify-center gap-4">
                {skillsMain.map((s) => (
                <motion.span
                    key={s}
                    variants={item}
                    whileHover={{ scale: 1.08 }}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-400 to-accent-500 
                                text-base md:text-lg font-semibold text-white shadow-md"
                >
                    {s}
                </motion.span>
                ))}
            </div>
            </Stagger>
        </section>

        {/* Skills complementarios */}
        <section className="mt-12">
            <Reveal><h2 className="text-center text-4xl md:text-5xl font-extrabold mb-8">Conocimientos complementarios</h2></Reveal>
            <Stagger>
            <div className="flex flex-wrap justify-center gap-4">
                {skillsExtra.map((s) => (
                <motion.span
                key={s}
                variants={item}
                whileHover={{ scale: 1.08 }}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-300 to-primary-500 
                text-base md:text-lg font-semibold text-white shadow-md"
                >
                    {s}
                </motion.span>
                ))}
            </div>
            </Stagger>
        </  section>
        </section>
        </main>
    );
}
