"use client";

import { useEffect, useState } from "react";

export default function ThemeControl() {
  const [dark, setDark] = useState<boolean>(false);

  // toma el estado inicial del <html class="dark"> si ya lo usabas
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setDark(el.classList.contains("dark"));
    // opcional: persistir
    try { localStorage.setItem("theme", el.classList.contains("dark") ? "dark" : "light"); } catch {}
  };

  // botón cuadrado sin etiqueta ni punto
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambiar tema"
      className="inline-grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-2xl
            border border-white/10 bg-white/5 text-white/90
            transition hover:bg-white/10 active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      title="Cambiar tema"
    >
      <span className="text-lg">{dark ? "🌙" : "☀️"}</span>
    </button>
  );
}
