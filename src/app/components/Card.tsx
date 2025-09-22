"use client";
import { motion } from "framer-motion";
import Link from "next/link";

    type CardProps = {
    title?: string;
    subtitle?: string;
    href?: string;                 // si viene, la Card es clickeable
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
            "rounded-2xl border p-6 transition shadow-sm",
            // fondo blanco SIEMPRE (modo claro y oscuro)
            "bg-white text-neutral-900 border-neutral-200",
            // hover blanco (sin celeste)
            "hover:bg-white hover:border-neutral-300 hover:shadow-[0_8px_30px_rgba(0,0,0,.08)]",
            className ?? "",
        ].join(" ")}
        >
        {title && (
            <h3 className="text-lg font-semibold text-neutral-900">
            {title}
            </h3>
        )}
        {subtitle && <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>}
        {children && <div className="mt-4 text-neutral-800">{children}</div>}
        {footer && (
            <div className="mt-5 border-t border-neutral-200 pt-4">{footer}</div>
        )}
        </motion.article>
    );

    // si hay href, envuelvo con Link; si no, devuelvo el artículo tal cual
    return href ? (
        <Link
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl"
        >
        {article}
        </Link>
    ) : (
        article
    );
    }
