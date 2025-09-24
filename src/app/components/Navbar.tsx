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

    // activo
    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    // mobile: ocultar el activo
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
                        hover:text-white/95 focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-cyan-400
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

            {/* Botón Mobile (si usás una clase de tu botón de descargar, ponla acá) */}
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
            <>
            {/* Backdrop para cerrar al click afuera */}
            <button
                aria-hidden
                onClick={() => setOpen(false)}
                className="absoluted inset-0 z-40 md:hidden bg-black/30"
            />
            <div
                id="mobile-menu"
                className="absoluted inset-x-0 top-[56px] z-50 mx-auto max-w-6xl px-4 md:px-6 md:hidden"
            >
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,.12)] p-2">
                {visibleItems.map((item) => (
                    <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-3 py-2 text-sm transition border border-transparent
                        hover:bg-white/10 hover:border-white/10
                        ${isActive(item.href) ? "text-white bg-white/10 border-white/10" : "text-white/80"}`}
                    >
                    {item.name}
                    </Link>
                ))}

                <div className="mt-3 flex items-center">
                    <button
                    onClick={() => setOpen(false)}
                    className="btn btn-compact"
                    aria-label="Cerrar"
                    >
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
