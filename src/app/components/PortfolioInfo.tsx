"use client";
import { useEffect, useRef, useState } from "react";

export default function PortfolioInfo() {
const [open, setOpen] = useState(false);
const panelRef = useRef<HTMLDivElement>(null);
const btnRef = useRef<HTMLButtonElement>(null);

  // cerrar al click afuera / Escape
useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
    if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
    ) {
        setOpen(false);
    }
    };
    const onEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
    document.removeEventListener("mousedown", onClick);
    document.removeEventListener("keydown", onEsc);
    };
}, [open]);

return (
    <div className="relative">
      {/* Botón de marca */}
    <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="portfolio-info"
    >
        <span className="font-medium">Lautaro.dev</span>
    </button>

      {/* Panel / popover */}
    {open && (
        <div
        id="portfolio-info"
        ref={panelRef}
        role="dialog"
        aria-label="Información del portfolio"
        className="absolute left-0 mt-2 w-[22rem] rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/90 shadow-lg backdrop-blur-md"
        >
        <h3 className="mb-2 text-base font-semibold">Cómo hice este portfolio</h3>
        <ul className="space-y-1 text-white/85">
            <li>
            <span className="text-white">Framework:</span> Next.js 15 (App Router)
            </li>
            <li>
            <span className="text-white">UI:</span> React + Tailwind CSS v4
            </li>
            <li>
            <span className="text-white">Build CSS:</span> @tailwindcss/postcss + Autoprefixer
            </li>
            <li>
            <span className="text-white">Animaciones:</span> Framer Motion (microinteracciones)
            </li>
            <li>
            <span className="text-white">Accesibilidad:</span> focus visible, aria-* en controles
            </li>
            <li>
            <span className="text-white">Extras:</span> selector de color y tema (claro/oscuro)
            </li>
        </ul>
        <p className="mt-3 text-white/75 leading-relaxed">
            Fue mi primera vez con Next, así que investigué bastante documentación y ejemplos hasta
            definir esta arquitectura y los estilos.
        </p>

        <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-white/60">Última actualización: {new Date().toLocaleDateString()}</span>
            <button
            onClick={() => setOpen(false)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs hover:bg-white/10"
            >
            Cerrar
            </button>
        </div>
        </div>
    )}
    </div>
);
}
