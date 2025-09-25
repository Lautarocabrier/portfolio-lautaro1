    "use client";

    import { motion } from "framer-motion";
    import { useState } from "react";
    import Reveal from "@/app/components/Reveal";
    import { Stagger, item } from "@/app/components/Stagger";

    /* Chip local sin tocar globals.css */
    function Chip({
    children,
    variant = "ghost", // "brand" | "ghost"
    }: {
    children: React.ReactNode;
    variant?: "brand" | "ghost";
    }) {
    const [hovered, setHovered] = useState(false);

    // background y borde en base a tu paleta
    const brandBg =
        "linear-gradient(90deg," +
        "color-mix(in oklab, var(--surface) 82%, var(--primary) 18%)," +
        "color-mix(in oklab, var(--surface) 82%, var(--accent-2) 18%))";
    const brandBgHover =
        "linear-gradient(90deg," +
        "color-mix(in oklab, var(--surface) 78%, var(--primary) 22%)," +
        "color-mix(in oklab, var(--surface) 78%, var(--accent-2) 22%))";

    const ghostBg = "color-mix(in oklab, var(--surface) 92%, var(--silver) 8%)";
    const ghostBgHover =
        "color-mix(in oklab, var(--surface) 88%, var(--silver) 12%)";

    const styleBase =
        variant === "brand"
        ? {
            background: hovered ? brandBgHover : brandBg,
            borderColor: hovered
                ? "color-mix(in oklab, var(--border) 40%, var(--primary) 60%)"
                : "color-mix(in oklab, var(--border) 55%, var(--primary) 45%)",
            outline: "0.5px solid color-mix(in oklab, var(--primary) 20%, transparent)",
            outlineOffset: "-1px",
            boxShadow: hovered ? "0 10px 30px rgba(0,0,0,.06)" : "var(--shadow)",
            }
        : {
            background: hovered ? ghostBgHover : ghostBg,
            borderColor: hovered
                ? "color-mix(in oklab, var(--border) 85%, var(--primary) 15%)"
                : "color-mix(in oklab, var(--border) 90%, transparent)",
            boxShadow: hovered ? "0 10px 30px rgba(0,0,0,.05)" : "var(--shadow)",
            };

    return (
        <motion.span
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18 }}
        style={styleBase as React.CSSProperties}
        className="
            inline-flex items-center rounded-full
            px-4 py-2 text-sm md:text-base font-semibold
            border select-none text-[var(--fg)]
        "
        >
        {children}
        </motion.span>
    );
    }

    export default function AboutPage() {
    const skillsMain = [
        "React",
        "Angular",
        "CSS",
        "Html",
        "TailwindCSS",
        "PrimeNG",
        "Git/GitHub",
        "Docker",
    ];
    const skillsExtra = [
        "Python",
        "C#",
        ".NET",
        "NextJS",
        "Postman",
        "Node.js",
        "CI/CD",
        "PostgreSQL",
    ];

    return (
        <main className="relative overflow-hidden">
        {/* blobs sutiles */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full grad-brand blur-3xl opacity-25 animate-blob" />
            <div className="absolute top-32 right-1/5 h-72 w-72 rounded-full grad-brand blur-3xl opacity-15 animate-blob [animation-delay:4s]" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full grad-brand blur-3xl opacity-15 animate-blob [animation-delay:8s]" />
        </div>

        <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
            {/* contenedor con recuadro suave */}
            <div className="rounded-3xl border-s bg-[var(--surface-2)]/85 p-6 md:p-10 shadow-brand ring-1 ring-[var(--primary)]/10">
            {/* Título */}
            <Reveal>
                <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--primary)]">
                Sobre mí
                </h1>
            </Reveal>

            {/* Descripción */}
            <Reveal delay={0.08}>
                <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-muted text-center [&_strong]:text-[var(--primary)] [&_strong]:font-semibold">
                <strong>Hola, me llamo Lautaro Cabrier Molina</strong>. Soy
                estudiante avanzado de Desarrollo de Software con foco en el
                desarrollo frontend, principalmente con <strong>Angular</strong> y{" "}
                <strong>React</strong>. Además, cuento con formación en{" "}
                <strong>Testing Manual</strong> (diseño y ejecución de casos de
                prueba, reporte de bugs en Jira) y actualmente estoy dando mis
                primeros pasos en <strong>Testing Automatizado</strong>, con
                interés en profundizar en herramientas como{" "}
                <strong>Postman</strong>. Me apasiona crear interfaces modernas,
                aplicar buenas prácticas de <strong>UI/UX</strong> y trabajar en
                equipo bajo metodologías ágiles como Scrum.
                </p>
            </Reveal>

            {/* Skills principales */}
            <section className="mt-12">
                <Reveal>
                <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-8 text-[var(--fg)]">
                    Skills principales
                </h2>
                </Reveal>

                <Stagger>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {skillsMain.map((s) => (
                    <motion.div key={s} variants={item}>
                        <Chip variant="brand">{s}</Chip>
                    </motion.div>
                    ))}
                </div>
                </Stagger>
            </section>

            {/* Skills complementarios */}
            <section className="mt-12">
                <Reveal>
                <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-8 text-[var(--fg)]">
                    Conocimientos complementarios
                </h2>
                </Reveal>

                <Stagger>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {skillsExtra.map((s) => (
                    <motion.div key={s} variants={item}>
                        <Chip variant="ghost">{s}</Chip>
                    </motion.div>
                    ))}
                </div>
                </Stagger>
            </section>
            </div>
        </section>
        </main>
    );
    }
