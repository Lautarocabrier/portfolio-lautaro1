"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import ThemeControl from "./ThemeControl";
import PortfolioInfo from "./PortfolioInfo";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
        <nav className="mb-0 flex items-center justify-between rounded-2xl px-2 py-2 bg-transparent">
          {/* Botón de info (reemplaza el LC y color) */}
            <PortfolioInfo />

          {/* Desktop: menú + control de tema */}
            <div className="hidden items-center gap-3 md:flex">
            <ul className="flex items-center gap-1">
                {navItems.map((item) => (
                <li key={item.href}>
                    <Link
                    href={item.href}
                    className={`relative block rounded-xl px-3 py-2 text-sm transition
                        hover:text-white/95
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                        ${isActive(item.href) ? "text-white" : "text-white/70"}`}
                    >
                    {item.name}
                    {isActive(item.href) && (
                        <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-2 -bottom-1 h-px bg-white/70"
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
            className="md:hidden inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
        <div id="mobile-menu" className="mx-auto max-w-6xl px-4 md:px-6 md:hidden pb-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-md">
            {navItems.map((item) => (
            <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-3 py-2 text-sm transition
                hover:bg-white/10
                ${isActive(item.href) ? "text-white bg-white/10" : "text-white/80"}`}
            >
                {item.name}
            </Link>
            ))}
            <div className="mt-2 flex items-center justify-between">
              {/* El botón de info también disponible en mobile */}
            <PortfolioInfo />
            <ThemeControl />
            </div>
        </div>
        </div>
    )}
    </header>
);
}
