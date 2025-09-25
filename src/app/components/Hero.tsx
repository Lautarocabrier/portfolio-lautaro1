"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/app/components/Reveal";
import { Stagger, item } from "@/app/components/Stagger";
import { ANIM } from "../../lib/anim";

    export default function Hero() {
    return (
        <section className="relative">
        <div className="mx-auto max-w-6xl px-4 md:px-6 pt-6 pb-10 md:pt-8 md:pb-10">
            {/* Título */}
            <Reveal>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
                Lautaro Cabrier Molina
                </span>
            </h1>
            </Reveal>

            {/* Rol */}
            <Reveal delay={0.06}>
            <h2 className="mt-2 text-2xl font-bold text-white/95">
                Desarrollador de software
            </h2>
            </Reveal>

            {/* Ubicación + redes (entra en cascada) */}
            <Stagger>
            <motion.div
                variants={item}
                className="mt-6 flex flex-wrap items-center gap-3"
            >
                {/* Ubicación */}
                <motion.span variants={item} className="btn">
                <MapPin className="size-4" />
                Córdoba, Argentina
                </motion.span>

                {/* Gmail */}
                <motion.a
                variants={item}
                href="https://mail.google.com/mail/?view=cm&fs=1&to=cabrierlautaro4@gmail.com&su=Consulta%20desde%20tu%20portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                aria-label="Escribirme por Gmail"
                >
                <Mail className="size-4" />
                </motion.a>

                {/* GitHub */}
                <motion.a
                variants={item}
                href="https://github.com/Lautarocabrier"
                target="_blank"
                className="btn"
                aria-label="GitHub"
                >
                <Github className="size-4" />
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                variants={item}
                href="https://www.linkedin.com/in/lautaro-cabrier-095192368/"
                target="_blank"
                className="btn"
                aria-label="LinkedIn"
                >
                <Linkedin className="size-4" />
                </motion.a>
            </motion.div>
            </Stagger>

            {/* Acciones (también en cascada) */}
            <Stagger>
            <motion.div
                variants={item}
                className="mt-8 flex flex-wrap items-center gap-3"
            >
                <motion.div variants={item}>
                <Link href="/about" className="btn">
                    Sobre mí
                </Link>
                </motion.div>

                <motion.div variants={item}>
                <Link href="/cv/lautaro-cabrier-cv.pdf" download className="btn">
                    Descargar CV
                </Link>
            </motion.div>
            </motion.div>
        </Stagger>
        </div>
    </section>
        );
}
