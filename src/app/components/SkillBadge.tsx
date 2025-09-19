"use client";
import { motion } from "framer-motion";

type Props = {
    label: string;
    variant?: "solid" | "ghost";
    className?: string;
};

export default function SkillBadge({ label, variant = "solid", className }: Props) {
    const base = "rounded-full px-4 py-2 text-sm font-semibold";
    const styles =
        variant === "solid"
        ? "bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 text-white shadow-card"
        : "border border-white/15 bg-white/5 text-white/90 backdrop-blur-md";
    return (
    <motion.span whileHover={{ scale: 1.06 }} className={`${base} ${styles} ${className ?? ""}`}>
        {label}
    </motion.span>
    );
}
