    "use client";
    import { motion } from "framer-motion";
    import Link from "next/link";

    type CardProps = {
    title?: string;
    subtitle?: string;
    href?: string;           // si viene, la Card es clickeable
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
            // base consistente con la paleta global
            "card rounded-2xl p-6 transition",
            // sombra neutra definida por --shadow
            "shadow-brand",
            // texto y borde según variables (evita blancos/teales fijos)
            "text-[var(--fg)] border-s bg-[var(--surface)]",
            className ?? "",
        ].join(" ")}
        >
        {title && (
            <h3 className="text-lg font-semibold text-[var(--fg)]">
            {title}
            </h3>
        )}

        {subtitle && (
            <p className="mt-1 text-sm text-muted">
            {subtitle}
            </p>
        )}

        {children && (
            <div className="mt-4">
            {children}
            </div>
        )}

        {footer && (
            <div className="mt-5 border-t border-s pt-4">
            {footer}
            </div>
        )}
        </motion.article>
    );

    // Si hay href, hacemos toda la tarjeta clickeable (accesible)
    return href ? (
        <Link
        href={href}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-2xl"
        >
        {article}
        </Link>
    ) : (
        article
    );
    }
