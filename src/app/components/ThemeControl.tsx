"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function hexToRgb(hex: string) {
    const m = hex.replace("#", "");
    const full = m.length === 3 ? [...m].map(x => x + x).join("") : m;
    const n = parseInt(full, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function applyBackground(hex: string) {
    const { r, g, b } = hexToRgb(hex);
    const isDark = document.documentElement.classList.contains("dark");
    const lightImg = `
    radial-gradient(1000px 600px at 12% -8%, rgba(${r},${g},${b},0.22), transparent 60%),
    radial-gradient(800px 420px at 85% -10%, rgba(${r},${g},${b},0.12), transparent 60%)
    `;
    const darkImg = `
    radial-gradient(1000px 600px at 85% -8%, rgba(${r},${g},${b},0.26), transparent 60%),
    radial-gradient(800px 420px at 12% -10%, rgba(${r},${g},${b},0.14), transparent 60%)
    `;
    document.body.style.backgroundImage = isDark ? darkImg : lightImg;
}

export default function ThemeControl() {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [color, setColor] = useState("#22d3ee"); // celeste default
    const colorInputRef = useRef<HTMLInputElement>(null);
    const pillRef = useRef<HTMLButtonElement>(null);

  // estado para la OLA
    const [pulse, setPulse] = useState<{ x: number; y: number; color: string; id: number } | null>(null);

  // init: tema + color
    useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");
    const systemDark =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const useDark = savedTheme ? savedTheme === "dark" : systemDark;
    document.documentElement.classList.toggle("dark", useDark);
    setIsDark(useDark);

    const savedColor = localStorage.getItem("themeColor") || "#22d3ee";
    setColor(savedColor);
    applyBackground(savedColor);
    }, []);

  // reaplicar color cuando cambia dark/light
    useEffect(() => {
    if (!mounted) return;
    const obs = new MutationObserver(() => applyBackground(color));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
    }, [mounted, color]);

    if (!mounted) return null;

  // dispara la ola desde el centro del botón
    const firePulse = (hex: string) => {
    const rect = pillRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    setPulse({ x, y, color: hex, id: Date.now() });
    // se limpia solo tras la animación
    setTimeout(() => setPulse(null), 650);
    };

    const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    applyBackground(color);
    firePulse(color); // ola al cambiar tema
    };

    const openPicker = (e: React.MouseEvent) => {
    e.stopPropagation(); // no togglear tema
    colorInputRef.current?.click();
    };

    const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setColor(next);
    localStorage.setItem("themeColor", next);
    applyBackground(next);
    firePulse(next); // ola al cambiar color
    };

    return (
    <>
      {/* Botón píldora */}
        <button
        ref={pillRef}
        type="button"
        onClick={toggleTheme}
        aria-label="Cambiar entre claro/oscuro"
        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
        >
        {/* Punto de color DENTRO (abre picker) */}
        <span
            onClick={openPicker}
            title="Cambiar color"
            className="inline-block size-5 rounded-full border border-white/15"
            style={{ background: color }}
        />
        <span>Diversión</span>
        <input
            ref={colorInputRef}
            type="color"
            className="hidden"
            value={color}
            onChange={onColorChange}
            aria-label="Elegir color de fondo"
        />
        </button>

      {/* Ola/ripple a pantalla completa */}
        {pulse && (
        <motion.div
            key={pulse.id}
            initial={{ scale: 0, opacity: 0.45 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
            position: "fixed",
            left: pulse.x,
            top: pulse.y,
            width: "200vmax",
            height: "200vmax",
            marginLeft: "-100vmax",
            marginTop: "-100vmax",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 40,
            background: `radial-gradient(circle, ${color}66 0%, ${color}00 60%)`,
            }}
        />
        )}
    </>
    );
}
