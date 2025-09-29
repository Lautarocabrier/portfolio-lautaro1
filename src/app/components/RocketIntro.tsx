"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

/* === Utils: rect de la ÚLTIMA "a/A" === */
function getLastACharRect(el: HTMLElement): DOMRect | null {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) {
    const n = walker.currentNode as Text;
    if (n.nodeValue && n.nodeValue.length) nodes.push(n);
  }
  for (let i = nodes.length - 1; i >= 0; i--) {
    const s = nodes[i].nodeValue || "";
    const idx = Math.max(s.lastIndexOf("a"), s.lastIndexOf("A"));
    if (idx !== -1) {
      const r = document.createRange();
      r.setStart(nodes[i], idx);
      r.setEnd(nodes[i], idx + 1);
      const rects = r.getClientRects();
      if (rects.length) return rects[0];
    }
  }
  return null;
}

/* === Path seguro (no toca “Inicio”) === */
function makeSafePath(
  sx: number, sy: number, tx: number, ty: number, vw: number, vh: number,
  heroTop: number, heroBottom: number, isMobile: boolean
) {
  const bandTop = heroTop + Math.min(84, vh * 0.10);
  const bandBot = heroBottom + Math.min(isMobile ? 48 : 72, vh * 0.10);

  const cx = vw * (isMobile ? 0.48 : 0.55);
  const cy = Math.max(bandTop + 40, Math.min(bandBot - 40, (bandTop + bandBot) / 2));

  const rY = Math.max(70, Math.min(140, (bandBot - bandTop) * 0.45));
  const topY = cy - rY;
  const botY = cy + rY;

  const c1x = sx + Math.min(80, vw * 0.08);
  const c1y = Math.max(bandTop + 8, sy - Math.min(70, vh * 0.08));
  const upX = sx + Math.min(160, vw * 0.16);
  const upY = Math.max(bandTop + 12, sy - Math.min(80, vh * 0.09));

  const approachX = tx - Math.min(isMobile ? 90 : 140, vw * 0.12);
  const approachY = Math.max(bandTop + 6, ty - Math.min(isMobile ? 70 : 90, vh * 0.09));

  return [
    `M ${sx},${sy}`,
    `C ${c1x},${c1y} ${upX},${upY} ${upX},${upY}`,
    `S ${cx - 60},${topY} ${cx},${topY}`,
    `S ${cx + 80},${botY} ${cx},${botY}`,
    `S ${approachX},${approachY} ${tx},${ty}`
  ].join(" ");
}

export default function RocketIntro({
  delayMs = 1800,
  durationMs = 6500,
  autoFire = true,
  clickThemeOnFinish = true,
}: {
  delayMs?: number;
  durationMs?: number;
  autoFire?: boolean;
  clickThemeOnFinish?: boolean;
}) {
  const [d, setD] = useState<string | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);
  const [trailColor, setTrailColor] = useState<string>("var(--accent-2)");
  const [dotColor, setDotColor] = useState<string>("var(--accent-2)");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [fading, setFading] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  const controls = useAnimationControls();
  const started = useRef(false);

  const compute = () => {
    const title = document.getElementById("hero-name");
    const theme = document.getElementById("theme-toggle");
    const host = hostRef.current;
    if (!title || !theme || !host) return;

    // rects en viewport
    const hostRect = host.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const aRect = getLastACharRect(title as HTMLElement) ?? titleRect;
    const themeRect = theme.getBoundingClientRect();

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const mobile = vw < 768;

    if (mobile) {
      setIsMobile(true);
      setD(null);
      setEnd(null);
      return;
    }
    setIsMobile(false);

    // helper: pasar de viewport → coords locales del host (absolute inset-0)
    const toLocalX = (x: number) => x - hostRect.left;
    const toLocalY = (y: number) => y - hostRect.top;

    // ⬅️ al LADO derecho y CENTRADO vertical de la última "a/A"
    const START_OFFSET_X = 8;
    const START_OFFSET_Y = 0;
    const sx_vp = aRect.right + START_OFFSET_X;
    const sy_vp = aRect.top + aRect.height * 0.5 + START_OFFSET_Y;

    // destino: centro del botón de theme
    const tx_vp = themeRect.left + themeRect.width / 2;
    const ty_vp = themeRect.top + themeRect.height / 2;

    // hero top/bottom en coords locales
    const heroTopLoc = toLocalY(titleRect.top);
    const heroBotLoc = toLocalY(titleRect.bottom);

    // construimos path en coords locales
    const dLocal = makeSafePath(
      toLocalX(sx_vp),
      toLocalY(sy_vp),
      toLocalX(tx_vp),
      toLocalY(ty_vp),
      vw,
      vh,
      heroTopLoc,
      heroBotLoc,
      mobile
    );

    setD(dLocal);
    setEnd({ x: toLocalX(tx_vp), y: toLocalY(ty_vp) });
  };

  useEffect(() => {
    compute();
    let timer: any;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(compute, 120); };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  useEffect(() => {
    if (!autoFire || !d || !end || isMobile || started.current) return;
    started.current = true;
    const t = setTimeout(() => controls.start("run"), delayMs);
    return () => clearTimeout(t);
  }, [d, end, isMobile, autoFire, delayMs, controls]);

  if (isMobile || !d || !end) return null;
  const pathCss = `path("${d}")`;

  return (
    // ABSOLUTE dentro del section .relative (sin “bajarse” porque usamos coords locales)
    <div ref={hostRef} className="pointer-events-none absolute inset-0 z-[60]">
      {/* Estela */}
      <motion.svg className="absolute inset-0 w-full h-full">
        <motion.path
          d={d}
          fill="none"
          stroke={trailColor}
          strokeOpacity={0.95}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 12"
          initial={{ pathLength: 0 }}
          animate={controls}
          variants={{
            run: {
              pathLength: 1,
              transition: { duration: durationMs / 1000, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          style={{
            opacity: fading ? 0 : 1,
            transition: "stroke 280ms linear, opacity 1000ms linear",
          }}
        />
      </motion.svg>

      {/* Punto */}
      <motion.div
        className="absolute"
        style={{
          offsetPath: pathCss as any,
          offsetRotate: "auto",
          opacity: fading ? 0 : 1,
          transition: "opacity 1000ms linear",
        }}
        initial={{ offsetDistance: "0%" }}
        animate={controls}
        variants={{
          run: {
            offsetDistance: "100%",
            transition: { duration: durationMs / 1000, ease: [0.22, 1, 0.36, 1] },
          },
        }}
        onAnimationComplete={() => {
          // burst
          const burst = document.getElementById("theme-burst");
          burst?.animate(
            [
              { transform: "scale(0.2)", opacity: 0.8 },
              { transform: "scale(1.1)", opacity: 0.5 },
              { transform: "scale(1.6)", opacity: 0 },
            ],
            { duration: 460, easing: "cubic-bezier(.22,1,.36,1)" }
          );

          if (clickThemeOnFinish) {
            document.getElementById("theme-toggle")
              ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          }

          // 2s después: cambia color y arranca fade conjunto
          setTimeout(() => {
            const newColor = "var(--accent-3, #86efac)";
            setDotColor(newColor);
            setTrailColor(newColor);
            setFading(true);
          }, 2000);
        }}
      >
        <span
          aria-hidden
          style={{
            display: "block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: dotColor,
            transition: "background 280ms linear",
            boxShadow: "0 0 0 3px color-mix(in oklab, currentColor 30%, transparent)",
            color: dotColor,
          }}
        />
      </motion.div>

      {/* “explosión” */}
      <div
        id="theme-burst"
        className="absolute pointer-events-none rounded-full"
        style={{
          left: end.x - 14,
          top:  end.y - 14,
          width: 28,
          height: 28,
          background:
            "radial-gradient(circle, var(--accent-2) 0%, color-mix(in oklab, var(--accent-2) 20%, transparent) 55%, transparent 70%)",
          opacity: 0,
        }}
      />
    </div>
  );
}
