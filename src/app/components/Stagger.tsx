    "use client";
    import { motion, Variants } from "framer-motion";
    import { PropsWithChildren } from "react";
    import { ANIM } from "@/lib/anim";

    const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.04 },
    },
    };

    export const item: Variants = {
    hidden: { opacity: 0, y: ANIM.y },
    show:  { opacity: 1, y: 0, transition: { duration: ANIM.d, ease: ANIM.ease } },
    };

    export function Stagger({ children }: PropsWithChildren) {
    return (
        <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        >
        {children}
        </motion.div>
    );
}
