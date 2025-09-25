// src/app/page.tsx
"use client";

import Hero from "./components/Hero";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "./components/Reveal";
import { ANIM } from "../lib/anim";

const projects = [
  {
    title: "SIAD",
    desc:
      "Sistema académico con roles múltiples, autenticación segura y avisos segmentados para mejorar la gestión educativa",
    href: "/projects#siade",
    tags: ["Angular", "nestJS"],
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
  {
    title: "Pizza Happ",
    subtitle: "Angular",
    desc: "Carrito, validaciones y flujo de pedido optimizado para mobile.",
    href: "/projects#pizza",
    tags: ["Angular", "RxJS", "Forms"],
  },
];

// Delays extra para el contenido interno de cada card (ajustá a gusto)
const EXTRA_DELAYS = [0.5, 0.5, 0.5, 0.4];

function ProjectCard({
  p,
  idx,
}: {
  p: (typeof projects)[number];
  idx: number;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });
  const [hover, setHover] = useState(false);
  const extra = EXTRA_DELAYS[idx % EXTRA_DELAYS.length];

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
  } as const;

  const innerItem = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: ANIM.d, ease: ANIM.ease } },
  };

  return (
    <motion.a
      ref={ref}
      href={p.href}
      initial={{ opacity: 0, y: ANIM.y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: ANIM.y }}
      transition={{ duration: ANIM.d, ease: ANIM.ease }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:shadow-[0_20px_50px_rgba(255,255,255,.15)]"
    >
      <motion.div
        variants={innerContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <motion.div variants={innerItem}>
          <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
          {p.subtitle && (
            <p className="mt-1 text-sm text-white/70">{p.subtitle}</p>
          )}
        </motion.div>

        <motion.p variants={innerItem} className="mt-3 text-sm leading-relaxed text-white/80">
          {p.desc}
        </motion.p>

        <motion.div variants={innerItem} className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/90"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ruido suave */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
    </motion.a>
  );
}

export default function HomePage() {
  // --- CTA: helpers de animación ---
const ctaRef = useRef<HTMLDivElement | null>(null);
const ctaInView = useInView(ctaRef, { amount: 0.25, once: true });

const ctaInner = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: ANIM.d,
      ease: ANIM.ease,
      delay: 0.4,           // delay antes de que empiece
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
} as const;

const ctaItem = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: ANIM.d, ease: ANIM.ease } },
};
  return (
    <main>
      <Hero />

      {/* Proyectos */}
      <section className="mx-auto max-w-6xl px-4 md:px-6 pb-6">
        <Reveal>
          <h2 className="mb-6 text-xl font-semibold text-white/90">Proyectos</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, idx) => (
            <ProjectCard key={p.title} p={p} idx={idx} />
          ))}
        </div>
      </section>

   {/* CTA */}
<section className="mx-auto max-w-6xl px-4 md:px-6 py-6">
  <motion.div
    ref={ctaRef}
    initial={{ opacity: 0, y: ANIM.y }}
    animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: ANIM.y }}
    transition={{ duration: ANIM.d, ease: ANIM.ease }}
    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center"
  >
    <motion.div variants={ctaInner} initial="hidden" animate={ctaInView ? "show" : "hidden"}>
      <motion.h3 variants={ctaItem} className="text-2xl font-semibold">
        ¿Colaboramos?
      </motion.h3>

      <motion.p variants={ctaItem} className="mx-auto mt-2 max-w-2xl text-white/80">
        Abierto a trainee/pasantía. Puedo sumar valor rápido en UI, performance y QA.
      </motion.p>

      <motion.div variants={ctaItem} className="flex flex-wrap justify-center gap-3 mt-3">
        <a href="/contact" className="btn">Contactar</a>
        <a href="/experience" className="btn">Experiencia</a>
      </motion.div>
    </motion.div>

    {/* ruido suave */}
    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
  </motion.div>
</section>

    </main>
  );
}
