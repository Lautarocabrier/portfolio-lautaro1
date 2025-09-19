"use client";
import { motion } from "framer-motion";
import Link from "next/link";

type CardProps = {
    title?: string;
    subtitle?: string;
    href?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
};

export default function Card({ title, subtitle, href, children, footer, className }: CardProps) {
    const content = (
    <motion.article
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        className={`card p-6 ${className ?? ""}`}
    >
        {title && (
        <h3 className="text-lg font-semibold">
            {href ? <span className="hover:underline">{title}</span> : title}
        </h3>
        )}
        {subtitle && <p className="mt-1 text-sm text-white/70">{subtitle}</p>}
        {children && <div className="mt-4 text-white/85">{children}</div>}
        {footer && <div className="mt-5 border-t border-white/10 pt-4">{footer}</div>}
    </motion.article>
);

if (href) {
    return (
    <Link href={href} className="block focus:outline-none focus:shadow-glow rounded-2xl">
        {content}
    </Link>
    );
}
return content;
}
