"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeControl from "./ThemeControl";
import PortfolioInfo from "./PortfolioInfo";

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Sobre mí", href: "/about" },
  { name: "Experiencia", href: "/experience" },
  { name: "Proyectos", href: "/projects" },
  { name: "Contacto", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const visibleItems = navItems.filter((item) => !isActive(item.href));

  // Bloquear scroll cuando el drawer está abierto
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [open]);

  return (
    <header id="site-header" className="z-[1000] w-full">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* NAVBAR: aparece a los 0.5s */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between py-0"
        >
          {/* Branding: entra a los 0.6s */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <PortfolioInfo />
          </motion.div>

          {/* Desktop */}
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative block rounded-xl px-3 py-2 text-sm transition
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]
                      ${
                        isActive(item.href)
                          ? "text-[var(--fg)]"
                          : "text-muted hover:text-[var(--fg)]"
                      }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2 -bottom-1 h-[2px] rounded-sm
                                   bg-[color-mix(in_oklab,var(--accent-2)_70%,var(--primary)_30%)]"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeControl />
          </div>

          {/* Botón Mobile */}
          <motion.button
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.65 }}
            className="md:hidden inline-flex items-center gap-2 rounded-xl
                        border border-s
                        bg-[color-mix(in_oklab,var(--surface)_86%,transparent)]
                        px-3 py-2 text-sm text-[var(--fg)]
                        transition hover:bg-[color-mix(in_oklab,var(--surface)_78%,transparent)]
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            Menu
            <span className="sr-only">Abrir/Cerrar</span>
          </motion.button>
        </motion.nav>
      </div>

      {/* Drawer Mobile */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />

            {/* Panel: SALE DESDE LA DERECHA */}
            <motion.div
              key="sheet"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              className="fixed right-4 top-[64px] z-50 w-[min(480px,92vw)] md:hidden"
            >
              <div className="rounded-2xl p-2 card shadow-brand ring-1 ring-[var(--border)]">
                <ul className="py-1">
                  {visibleItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-2 rounded-xl px-3 py-3 text-base transition
                          ${
                            isActive(item.href)
                              ? "text-[var(--fg)] bg-[color-mix(in_oklab,var(--surface)_85%,var(--silver)_15%)]"
                              : "text-[var(--fg)]/85 hover:bg-[color-mix(in_oklab,var(--surface)_90%,transparent)]"
                          }`}
                      >
                        <span
                          className={`mr-2 block h-4 w-1.5 rounded-full
                            ${
                              isActive(item.href)
                                ? "bg-[var(--primary)] dark:bg-white]"
                                : "bg-transparent"
                            }`}
                          aria-hidden
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => setOpen(false)} className="btn" aria-label="Cerrar">
                    Cerrar
                  </button>
                  <div className="ml-auto">
                    <ThemeControl />
                  </div>
                </div>
              </div>

              {/* Safe area bottom (iOS) */}
              <div style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
