    "use client";
    import Link from "next/link";
    import { Mail, Github, Linkedin, MapPin } from "lucide-react";

    export default function Hero() {
    return (
        <section className="relative">
        <div className="mx-auto max-w-6xl px-4 md:px-6 pt-6 pb-10 md:pt-8 md:pb-10">
            {/* Título */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
                Lautaro Cabrier Molina
            </span>
            </h1>

            {/* Rol */}
            <h2 className="mt-2 text-2xl font-bold text-white/95">
            Desarrollador de software
            </h2>

            {/* Ubicación + redes */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Ubicación: ahora usa .btn */}
            <span className="btn">
                <MapPin className="size-4" />
                Córdoba, Argentina
            </span>

            {/* Redes: ahora también usan .btn para igualar tamaño */}
            <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=cabrierlautaro4@gmail.com&su=Consulta%20desde%20tu%20portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                aria-label="Escribirme por Gmail"
            >
                <Mail className="size-4" />
            </a>

            <Link
                href="https://github.com/Lautarocabrier"
                target="_blank"
                className="btn"
                aria-label="GitHub"
            >
                <Github className="size-4" />
            </Link>

            <Link
                href="https://www.linkedin.com/in/lautaro-cabrier-095192368/"
                target="_blank"
                className="btn"
                aria-label="LinkedIn"
            >
                <Linkedin className="size-4" />
            </Link>
            </div>

            {/* Acciones */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/about" className="btn">
                Sobre mí
            </a>
            <a href="/cv/lautaro-cabrier-cv.pdf" download className="btn">
                Descargar CV
            </a>
            </div>
        </div>
        </section>
    );
    }