// src/app/projects/page.tsx
import { Github, Globe, ExternalLink, Wrench, Brain, FolderGit2 } from "lucide-react";
import Link from "next/link";

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
    repo: "https://github.com/tu-usuario/siade", // <- reemplazar
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
    repo: "https://github.com/tu-usuario/pizza-happ", // <- reemplazar
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
    repo: "https://github.com/tu-usuario/ai-trader-mvp", // <- reemplazar
    demo: "https://tu-demo.vercel.app", // <- opcional, reemplazar
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/85 border border-white/10">
      {children}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 pt-24 md:pt-28 pb-24">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Proyectos</h1>
        <p className="mt-3 text-white/80">
          Selección de proyectos con detalle de stack, funcionalidades y aprendizajes.
        </p>
      </header>

      <div className="space-y-8">
        {projects.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6"
          >
            {/* Encabezado */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {p.titulo}
                  {p.subtitulo && (
                    <span className="ml-2 text-white/60 font-normal">· {p.subtitulo}</span>
                  )}
                </h2>
              </div>
              {p.periodo && <p className="text-sm text-white/60">{p.periodo}</p>}
            </div>

            {/* Resumen */}
            <p className="mt-3 text-white/85">{p.resumen}</p>

            {/* Stack */}
            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>

            {/* Contenido */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <section>
                <h3 className="mb-2 flex items-center gap-2 font-semibold">
                  <Wrench className="size-4" /> Qué hace
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-white/85">
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-2 flex items-center gap-2 font-semibold">
                  <Brain className="size-4" /> Rol & Aprendizajes
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-white/85">
                  {p.aprendizajes.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Acciones */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {p.repo && (
                <Link
                  href={p.repo}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                >
                  <Github className="size-4" />
                  Repo
                  <ExternalLink className="size-3.5 opacity-70" />
                </Link>
              )}
              {p.demo && (
                <Link
                  href={p.demo}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                >
                  <Globe className="size-4" />
                  Demo
                  <ExternalLink className="size-3.5 opacity-70" />
                </Link>
              )}
              <span className="ml-auto inline-flex items-center gap-2 text-xs text-white/60">
                <FolderGit2 className="size-4" /> ID: {p.id}
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}