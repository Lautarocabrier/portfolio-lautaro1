"use client";
import Link from "next/link";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

export default function Hero() {
return (
    <section className="relative">
    <div className="mx-auto max-w-6xl px-4 md:px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Título */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
        <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
            Lautaro Cabrier Molina
        </span>
        </h1>

        {/* Rol (igual estilo a la referencia) */}
        <h2 className="mt-2 text-2xl font-bold text-white/95">
        Desarrollador de software
        </h2>

        {/* Ubicación + redes */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {/* Ubicación en píldora */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/85">
            <MapPin className="size-4" />
            Córdoba, Argentina
        </span>

          {/* Redes */}
        <div className="flex items-center gap-3">
            <a
            
            href="mailto:cabrierlautaro4@gmail.com"
            className="inline-grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/85 transition hover:bg-white/10"
            aria-label="Enviar email"
                >
            <Mail className="size-4" />
            </a>
            <Link
            href="https://github.com/Lautarocabrier"
            target="_blank"
            className="inline-grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/85 transition hover:bg-white/10"
            aria-label="GitHub"
            >
            <Github className="size-4" />
            </Link>
            <Link
            href="https://www.linkedin.com/in/lautaro-cabrier-095192368/"
            target="_blank"
            className="inline-grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/85 transition hover:bg-white/10"
            aria-label="LinkedIn"
            >
            <Linkedin className="size-4" />
            </Link>
            </div>
        </div>
        
       {/* Acciones */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
                href="/about"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
                Sobre mí
            </a>

            <a
                href="/cv/Lautaro-Cabrier-CV.pdf"
                download
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
            Descargar CV
        </a>
        </div>
    </div>
    </section>
);
}
