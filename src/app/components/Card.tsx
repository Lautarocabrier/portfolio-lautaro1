"use client";
import { motion } from "framer-motion";
import Link from "next/link";

type CardProps = {
  title?: string;
  subtitle?: string;
  href?: string; // si viene, la Card es clickeable
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export default function Card({
    title,
    subtitle,
    href,
    children,
    footer,
    className,
    }: CardProps) {
    const article = (
    <motion.article
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        className={[
        // base de la card
        "rounded-2xl border p-6 transition",
        // modo claro y oscuro
        "bg-white text-neutral-900 border-neutral-200 dark:bg-white/5 dark:text-white dark:border-white/10",
        // hover: glow visible en dark y shadow limpia en light
        "hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:border-neutral-300 dark:hover:border-white/20",
        className ?? "",
        ].join(" ")}
        >
        {title && (
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
            {title}
            </h3>
        )}
        {subtitle && (
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            {subtitle}
            </p>
        )}
        {children && (
            <div className="mt-4 text-neutral-800 dark:text-neutral-200">
            {children}
            </div>
        )}
        {footer && (
            <div className="mt-5 border-t border-neutral-200 dark:border-white/10 pt-4">
            {footer}
            </div>
        )}
        </motion.article>
    );

    // si hay href, envuelvo con Link; si no, devuelvo el artículo tal cual
    return href ? (
        <Link
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-2xl"
        >
        {article}
        </Link>
    ) : (
        article
    );
    }
