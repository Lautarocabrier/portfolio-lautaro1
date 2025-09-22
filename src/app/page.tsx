import Hero from "./components/Hero";

const projects = [
  {
    title: "SIADE",
    subtitle: "Angular + PostgreSQL",
    desc: "Sistema académico con roles múltiples, autenticación y avisos segmentados.",
    href: "/projects#siade",
    tags: ["Angular", "PrimeNG", "JWT"],
  },
  {
    title: "Pizza Happ",
    subtitle: "Angular",
    desc: "Carrito, validaciones y flujo de pedido optimizado para mobile.",
    href: "/projects#pizza",
    tags: ["Angular", "RxJS", "Forms"],
  },
  {
    title: "AI Trader MVP",
    subtitle: "Python + Streamlit",
    desc: "SMA/RSI, backtests vectorizados y panel en vivo.",
    href: "/projects#ai-trader",
    tags: ["Python", "Streamlit", "yfinance"],
  },
  {
    title: "Portfolio",
    subtitle: "Next.js + TailwindCSS",
    desc: "Dark mode, animaciones y optimización para SEO y performance.",
    href: "/projects#portfolio",
    tags: ["Next.js", "TailwindCSS", "Framer Motion"],
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* Proyectos */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 pb-6">
        <h2 className="mb-6 text-xl font-semibold text-white/90">Proyectos</h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.href}
            className="relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:shadow-[0_20px_50px_rgba(255,255,255,.15)]"

            >
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{p.desc}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* ruido suave */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-14">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h3 className="text-2xl font-semibold">¿Colaboramos?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-white/80">
            Abierto a trainee/pasantía. Puedo sumar valor rápido en UI, performance y QA.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              Contactar
            </a>
            <a
              href="/experience"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              Experiencia
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
