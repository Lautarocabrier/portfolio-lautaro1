"use client";

import { useRef, useState, useEffect } from "react";
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
  id: "siad",
  titulo: "SIAD",
  subtitulo: "Sistema académico integral",
  periodo: "2025 · Proyecto académico / side project",
  resumen:
    "Plataforma web de gestión académica desarrollada con Angular + PrimeNG, NestJS y PostgreSQL. Permite administrar materias, usuarios, exámenes finales y avisos segmentados según el rol del usuario. Se realizaron pruebas funcionales y de interfaz durante el desarrollo para garantizar la calidad.",
  stack: ["Angular", "PrimeNG", "NestJS", "PostgreSQL", "JWT", "RxJS", "Docker", "TypeScript", "Testing"],
  bullets: [
    "Desarrollo del frontend en Angular con componentes standalone y arquitectura modular.",
    "Implementación de PrimeNG y Tailwind para una UI moderna, accesible y responsive.",
    "Gestión de roles (alumno, docente, preceptor, secretaría) y autenticación con JWT.",
    "Pruebas funcionales y de flujo (QA manual y validaciones de interfaz) durante el desarrollo.",
    "Creación del panel de bienvenida con KPIs, avisos segmentados y accesos rápidos."
  ],
  aprendizajes: [
    "Optimización del flujo de desarrollo mediante testing continuo durante la implementación.",
    "Uso avanzado de Angular Signals y comunicación entre componentes con RxJS.",
    "Integración segura entre frontend (Angular) y backend (NestJS + PostgreSQL).",
    "Buenas prácticas de QA y revisión visual de componentes con PrimeNG."
  ],
  repo: "https://github.com/federicowoodward/siaade-mejorado.git"
},

  {
  id: "obras-app",
  titulo: "Obras · Panel de gestión de materiales",
  subtitulo: "Trazabilidad, devoluciones y stock en tiempo real",
  periodo: "2025–desarollo · Proyecto freelance con colaboradores",
  resumen:
    "Interfaz web para controlar materiales y herramientas en obras. Permite visualizar stock, registrar retiros y devoluciones, y gestionar roles (obrero, capataz, arquitecto) desde un panel centralizado.",
  stack: ["Angular", "PrimeNG", "TypeScript", "TailwindCSS"],

  bullets: [
    "Diseño y desarrollo del panel de obrero, arquitecto y capataz.",
    "Componentes dinámicos con filtros por categorías, ubicaciones y buscadores en tiempo real.",
    "Integración visual con PrimeNG (DataTable, Dialog, Toast, Dropdown).",
    "Estilo responsive y coherente con la identidad de la app (tema oscuro + acentos amarillos).",
    "Validación de formularios y manejo de estados con señales reactivas."
  ],

  aprendizajes: [
    "Optimización de vistas con componentes standalone y servicios compartidos.",
    "Uso avanzado de PrimeNG para UI profesional en entornos CRUD.",
    "Refinamiento de UX: jerarquía visual, espaciado y consistencia de colores.",
    "Comunicación efectiva entre front y backend (simulación con mocks y endpoints)."
  ],

  repo: "https://github.com/Lautarocabrier/obrasApp.git",
},


  {
  id: "ai-trader-mvp",
  titulo: "AI Trader MVP",
  subtitulo: "Indicadores y backtests",
  periodo: "2024 · MVP personal",
  resumen:
    "Panel en Streamlit para diseñar y evaluar estrategias EOD con señales explicables (SMA/RSI). Descarga datos vía yfinance, corre backtests vectorizados (T+1) y muestra métricas como CAGR, Máx. Drawdown y Sharpe.",
  stack: ["Python", "Streamlit", "pandas", "numpy", "yfinance", "plotly"],

  // Qué hace (features)
  bullets: [
    "Cálculo vectorizado de indicadores (SMA/EMA/RSI).",
    "Backtests rápidos con ejecución T+1 y curva de equity.",
    "Métricas de rendimiento: Total Return, CAGR, Máx. Drawdown, Sharpe.",
    "UI en Streamlit con parámetros ajustables y gráficos interactivos (Plotly)."
  ],

  // Rol y aprendizajes (opcional – se muestra en una columna aparte)
  aprendizajes: [
    "Vectorización con NumPy/Pandas vs. bucles.",
    "Separación de capas: lógica (core) y UI (Streamlit).",
    "Diseño de UI responsiva y i18n (EN/ES)."
  ],
  repo: "https://github.com/Lautarocabrier/TRADER-MVP.git",
  demo: "https://trader-mvp-production.up.railway.app/",
}

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

  // dispara un poco antes para mobile (viewport más permisivo)
  const inView = useInView(ref, {
    amount: 0.2,
    once: true,
    margin: "-10% 0px",           // entra antes de estar totalmente visible
  });

  const [hover, setHover] = useState(false);

  // ---- Fallback para móvil: auto-mostrar 0.8–1.2s después de montar ----
  const [prefetch, setPrefetch] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && matchMedia("(hover: none)").matches) {
      const t = setTimeout(() => setPrefetch(true), 1000); // 1s luego de abrir la pantalla
      return () => clearTimeout(t);
    }
  }, []);
  const showNow = inView || prefetch; // si es touch, entra solo

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
      className="rounded-2xl p-5 sm:p-6 mb-8 card shadow-brand"
    >
      {/* usa showNow */}
      <motion.div variants={innerContainer} initial="hidden" animate={showNow ? "show" : "hidden"}>
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
