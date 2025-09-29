"use client";

import Link from "next/link";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, item } from "@/app/components/Stagger";
import { ANIM } from "../../lib/anim";
import RocketIntro from "@/app/components/RocketIntro";

export default function Hero() {
  const BASE_DELAY = 0.25;

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 md:px-6 pt-6 pb-10 md:pt-8 md:pb-10">
        {/* Título (1.0s) */}
        <motion.h1
          id="hero-name"
          initial={{ opacity: 0, y: ANIM.y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: ANIM.ease, delay: BASE_DELAY }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl"
        >
          Lautaro Cabrier Molina
        </motion.h1>

        {/* Rol (1.1s) */}
        <motion.h2
          initial={{ opacity: 0, y: ANIM.y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: ANIM.ease, delay: BASE_DELAY + 0.15 }}
          className="mt-2 text-2xl font-bold"
        >
          Desarrollador de software
        </motion.h2>

        {/* Ubicación + redes (1.4s) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: ANIM.ease, delay: BASE_DELAY + 0.45 }}
          className="mt-6"
        >
          <Stagger>
            <motion.div variants={item} className="flex flex-wrap items-center gap-2 md:gap-3">
              <motion.a
                variants={item}
                href="https://www.google.com/maps/search/?api=1&query=-31.4201%2C-64.1888"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Córdoba, Argentina en Google Maps"
                className="btn"
              >
                <MapPin className="size-4" />
                Córdoba, Argentina
              </motion.a>

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

              <motion.a
                variants={item}
                href="https://github.com/Lautarocabrier"
                target="_blank"
                className="btn"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </motion.a>

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
        </motion.div>

        {/* Acciones (1.9s) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: ANIM.ease, delay: BASE_DELAY + 0.8 }}
          className="mt-8"
        >
          <Stagger>
            <motion.div variants={item} className="flex flex-wrap items-center gap-2 md:gap-3">
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
        </motion.div>
      </div>

      {/* 🚀 Rocket intro (dispara el vuelo; sin cambiar tema automáticamente) */}
<RocketIntro autoFire clickThemeOnFinish />


    </section>
  );
}
