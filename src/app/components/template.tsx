"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ANIM } from "@/lib/anim";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: ANIM.y }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: ANIM.d, ease: ANIM.ease }}
        >
            {children}
        </motion.div>
        </AnimatePresence>
    );
    }
