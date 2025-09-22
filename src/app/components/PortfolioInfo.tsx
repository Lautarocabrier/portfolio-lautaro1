"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PortfolioInfo() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Bloquear scroll y cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Botón de marca en la navbar */}
      <button
        onClick={() => setOpen(true)}
        className="btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="portfolio-info-modal"
      >
        <span className="font-medium">Lautaro.dev</span>
      </button>

      {/* Modal centrado con overlay borroso */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-info-title"
            id="portfolio-info-modal"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-[70] grid place-items-center px-4"
          >
            <div
              ref={panelRef}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md"
            >
              <h2 id="portfolio-info-title" className="text-lg font-semibold">
                Cómo hice este portfolio
              </h2>

              <ul className="mt-3 space-y-1 text-white/85 text-sm">
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
                  <span className="text-white">Animaciones:</span> Framer Motion
                </li>
                <li>
                  <span className="text-white">Accesibilidad:</span> focus-visible, aria-*
                </li>
                <li>
                  <span className="text-white">Extras:</span> selector de color y tema
                </li>
              </ul>

              <p className="mt-4 text-white/75 text-sm leading-relaxed">
                Fue mi primera vez con Next, así que investigué bastante documentación y
                ejemplos hasta definir esta arquitectura y los estilos.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-white/60">
                  Última actualización: {new Date().toLocaleDateString()}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs hover:bg-white/10"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}