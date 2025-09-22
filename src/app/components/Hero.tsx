"use client";
import Link from "next/link";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";

export default function Hero() {
return (
    <section className="relative">
    <div className="mx-auto max-w-6xl px-4 md:px-6 pt-18 pb-10 md:pt-26 md:pb-14">
        {/* Título */}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
        <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
            Lautaro Cabrier Molina
        </span>
        </h1>

        {/* Rol (igual estilo a la referencia) */}
        <h2 className="mt-2 text-3xl font-bold text-white/95">
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
        href="https://mail.google.com/mail/?view=cm&fs=1&to=cabrierlautaro4@gmail.com&su=Consulta%20desde%20tu%20portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-grid size-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/85 transition hover:bg-white/10"
        aria-label="Escribirme por Gmail"
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
            
                <a href="/about" className="btn">
            
                Sobre mí
            </a>
        <a
            href="/cv/lautaro-cabrier-cv.pdf"
            download
            className="btn"
            >
            Descargar CV
        </a>
        </div>
    </div>
    </section>
);
}
