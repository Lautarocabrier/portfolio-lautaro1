"use client";
import { motion } from "framer-motion";

export type TimelineItem = {
    date: string;        // "2025 – Actualidad"
    title: string;       // "Líder de Proyecto & Frontend"
    org?: string;        // "Instituto Cura Brochero"
    description?: string;
    tags?: string[];
};

type Props = {
items: TimelineItem[];
};

export default function Timeline({ items }: Props) {
return (
    <div className="relative mx-auto max-w-4xl">
      {/* línea central */}
    <div aria-hidden className="absolute left-4 top-0 h-full w-px bg-white/15 md:left-1/2" />

    <ul className="space-y-8">
        {items.map((it, idx) => {
          const isRight = idx % 2 === 0; // alterna lados en desktop
        return (
            <li key={idx} className="relative md:grid md:grid-cols-2 md:gap-10">
              {/* punto */}
            <span
                aria-hidden
                className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full grad-brand shadow-card md:left-1/2"
            />
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className={`mt-6 md:mt-0 ${isRight ? "md:col-start-1" : "md:col-start-2"}`}
            >
                <article className="card p-5">
                    <p className="text-xs uppercase tracking-wide text-white/60">{it.date}</p>
                    <h3 className="mt-1 text-lg font-semibold">{it.title}</h3>
                    {it.org && <p className="text-white/75">{it.org}</p>}
                    {it.description && <p className="mt-3 text-sm text-white/80">{it.description}</p>}
                    {!!it.tags?.length && (
                    <div className="mt-4 flex flex-wrap gap-2">
                    {it.tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/85">
                        {t}
                        </span>
                    ))}
                    </div>
                )}
                </article>
            </motion.div>
              {/* columna vacía para el alternado */}
            <div className={`${isRight ? "md:col-start-2" : "md:col-start-1"} hidden md:block`} />
            </li>
        );
        })}
    </ul>
    </div>
);
}
