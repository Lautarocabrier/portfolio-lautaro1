"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <header id="site-header" className="z-[1000] w-full">
      <div className="mx-auto max-w-6xl px-4 md:px-6 ">
        <nav className="flex items-center justify-between py-0">
          <PortfolioInfo />

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
          <button
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
          </button>
        </nav>
      </div>

      {/* Drawer Mobile */}
      {open && (
        <>
          {/* Backdrop para cerrar al click afuera */}
          <button
            aria-hidden
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 md:hidden bg-black/30"
          />
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-[56px] z-50 mx-auto max-w-6xl px-4 md:px-6 md:hidden"
          >
            <div
              className="rounded-2xl border border-s backdrop-blur-sm p-2
                         bg-[color-mix(in_oklab,var(--surface)_86%,transparent)]"
            >
              {visibleItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-3 py-2 text-sm transition
                    ${
                      isActive(item.href)
                        ? "text-[var(--fg)] bg-[color-mix(in_oklab,var(--surface)_85%,var(--silver)_15%)]"
                        : "text-muted hover:bg-[color-mix(in_oklab,var(--surface)_85%,transparent)] hover:text-[var(--fg)]"
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="mt-3 flex items-center">
                <button onClick={() => setOpen(false)} className="btn" aria-label="Cerrar">
                  Cerrar
                </button>
                <div className="ml-auto">
                  <ThemeControl />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
