"use client";
import { motion, useInView } from "framer-motion";
import { useRef, PropsWithChildren } from "react";
import { ANIM } from "@/lib/anim";

type Props = PropsWithChildren<{ delay?: number; y?: number; once?: boolean }>;

export default function Reveal({ children, delay = 0, y = ANIM.y, once = true }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { amount: 0.2, once });

    return (
        <motion.div
        ref={ref}
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={{ duration: ANIM.d, ease: ANIM.ease, delay }}
        >
        {children}
        </motion.div>
    );
}
