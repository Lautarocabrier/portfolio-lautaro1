"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Globe, ExternalLink, Wrench, Brain, FolderGit2 } from "lucide-react";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import { Stagger, item } from "@/app/components/Stagger";
import { ANIM } from "../../lib/anim";

type Project = {
  id: string;
  titulo: string;
  subtitulo?: string;
  periodo?: string;
  resumen: string;
  stack: string[];
  bullets: string[];
  aprendizajes: string[];
  repo?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    id: "siade",
    titulo: "SIADE",
    subtitulo: "Sistema académico",
    periodo: "2023 · side project",
    resumen:
      "Plataforma para gestión académica con roles (alumno/docente/admin), autenticación y avisos segmentados.",
    stack: ["Angular", "PrimeNG", "PostgreSQL", "JWT"],
    bullets: [
      "Autenticación con JWT y guardas de ruta.",
      "Módulos por rol: panel de alumno, docente y administrador.",
      "Notificaciones y avisos segmentados por curso/carrera.",
    ],
    aprendizajes: [
      "Arquitectura por módulos y lazy-loading en Angular.",
      "Patrón de comunicación con RxJS entre componentes.",
    ],
    repo: "https://github.com/tu-usuario/siade",
  },
  {
    id: "pizza-happ",
    titulo: "Pizza Happ",
    subtitulo: "Pedidos y carrito",
    periodo: "2022 · práctica",
    resumen:
      "Carrito, validaciones y flujo de pedido optimizado para mobile. Enfoque en UX (fricción mínima al pagar).",
    stack: ["Angular", "RxJS", "Forms"],
    bullets: [
      "Checkout con validaciones reactivas.",
      "Persistencia ligera del carrito en LocalStorage.",
      "Diseño mobile-first con componentes reutilizables.",
    ],
    aprendizajes: [
      "Manejo de estado simple con RxJS Subjects.",
      "Accesibilidad: foco visible y navegación por teclado.",
    ],
    repo: "https://github.com/tu-usuario/pizza-happ",
  },
  {
    id: "ai-trader-mvp",
    titulo: "AI Trader MVP",
    subtitulo: "Indicadores y backtests",
    periodo: "2024 · MVP personal",
    resumen:
      "Panel en Streamlit para probar estrategias (SMA/RSI), graficar y correr backtests vectorizados con datos de yfinance.",
    stack: ["Python", "Streamlit", "pandas", "yfinance"],
    bullets: [
      "Cálculo vectorizado de indicadores (SMA/EMA/RSI).",
      "Backtests rápidos con métricas de rendimiento.",
      "UI en Streamlit con configuración de parámetros.",
    ],
    aprendizajes: [
      "Vectorización con NumPy/Pandas vs. bucles.",
      "Separación de lógica (core) y UI (Streamlit).",
    ],
    repo: "https://github.com/tu-usuario/ai-trader-mvp",
    demo: "https://tu-demo.vercel.app",
  },
];

/* ====== SOLO PALETA (sin tocar concepto) ====== */
function Chip({ children }: { children: React.ReactNode }) {
  return <span className="chip text-xs">{children}</span>;
}

// delays extra por card
const EXTRA_DELAYS = [0.5, 0.6, 0.2];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const extra = EXTRA_DELAYS[index % EXTRA_DELAYS.length];
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });
  const [hover, setHover] = useState(false);

  const innerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: ANIM.d,
        ease: ANIM.ease,
        delay: hover ? 0 : extra,
        staggerChildren: 0.12,
        delayChildren: hover ? 0 : extra,
      },
    },
  };

  const innerItem = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: ANIM.d, ease: ANIM.ease } },
  };

  return (
    <motion.article
      ref={ref}
      variants={item}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      /* card de tu paleta: fondo, borde y sombra correctos */
      className="rounded-2xl p-5 sm:p-6 mb-8 card shadow-brand"
    >
      <motion.div variants={innerContainer} initial="hidden" animate={inView ? "show" : "hidden"}>
        {/* Encabezado */}
        <motion.div
          variants={innerItem}
          className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <div>
            <h2 className="text-2xl font-semibold text-[var(--fg)]">
              {p.titulo}
              {p.subtitulo && (
                <span className="ml-2 font-normal text-muted">· {p.subtitulo}</span>
              )}
            </h2>
          </div>
          {p.periodo && <p className="text-sm text-muted">{p.periodo}</p>}
        </motion.div>

        {/* Resumen */}
        <motion.p variants={innerItem} className="mt-3 text-muted">
          {p.resumen}
        </motion.p>

        {/* Stack */}
        <motion.div variants={innerItem} className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </motion.div>

        {/* Contenido */}
        <motion.div variants={innerItem} className="mt-6 grid gap-6 md:grid-cols-2">
          <section>
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-[var(--fg)]">
              <Wrench className="size-4" /> Qué hace
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              {p.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-[var(--fg)]">
              <Brain className="size-4" /> Rol & Aprendizajes
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-muted">
              {p.aprendizajes.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>
        </motion.div>

        {/* Acciones */}
        <motion.div variants={innerItem} className="mt-6 flex flex-wrap items-center gap-3">
          {p.repo && (
            <Link href={p.repo} target="_blank" className="btn">
              <Github className="size-4" />
              Repo
              <ExternalLink className="size-3.5 opacity-70" />
            </Link>
          )}
          {p.demo && (
            <Link href={p.demo} target="_blank" className="btn">
              <Globe className="size-4" />
              Demo
              <ExternalLink className="size-3.5 opacity-70" />
            </Link>
          )}
          <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted">
            <FolderGit2 className="size-4" /> ID: {p.id}
          </span>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 pt-13 md:pt-13 pb-24">
      <header className="mb-10">
        <Reveal>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-center mx-auto text-[var(--fg)]">
            Proyectos
          </h1>
        </Reveal>
      </header>

      <Stagger>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} />
        ))}
      </Stagger>
    </main>
  );
}
