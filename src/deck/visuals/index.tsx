import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect } from "react";
import { tone, type ToneKey } from "@/data/characteristics";
import { EASE } from "../motion";

const svgCls = "h-auto w-full max-h-full";
const mono = { fontFamily: "var(--font-mono)" };
const disp = { fontFamily: "var(--font-display)", fontWeight: 800 };

export function Timeline2011() {
  return (
    <svg viewBox="0 0 520 300" className={svgCls} preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="Línea de tiempo: 2011, ISO/IEC 25010:2011 con producto y calidad en uso; 2023, ISO/IEC 25010:2023 solo producto e ISO/IEC 25019:2023 calidad en uso">
      <motion.path d="M40 150 H480" style={{ stroke: "var(--ink)", strokeWidth: 2 }} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASE }} />
      <circle cx="80" cy="150" r="10" style={{ fill: tone("intro") }} />
      <circle cx="380" cy="150" r="10" style={{ fill: tone("uso") }} />
      <text x="80" y="128" textAnchor="middle" style={{ ...disp, fontSize: 30, fill: "var(--ink)" }}>2011</text>
      <text x="380" y="128" textAnchor="middle" style={{ ...disp, fontSize: 30, fill: "var(--ink)" }}>2023</text>
      <rect x="10" y="176" width="150" height="62" rx="10" style={{ fill: "var(--surface)", stroke: tone("intro"), strokeWidth: 2 }} />
      <text x="85" y="200" textAnchor="middle" style={{ ...mono, fontSize: 13, fill: "var(--ink)" }}>ISO/IEC 25010:2011</text>
      <text x="85" y="222" textAnchor="middle" style={{ fontSize: 13, fill: "var(--ink-2)" }}>producto + calidad en uso</text>
      <rect x="290" y="176" width="190" height="52" rx="10" style={{ fill: "var(--surface)", stroke: tone("funcional"), strokeWidth: 2 }} />
      <text x="385" y="198" textAnchor="middle" style={{ ...mono, fontSize: 13, fill: "var(--ink)" }}>ISO/IEC 25010:2023</text>
      <text x="385" y="217" textAnchor="middle" style={{ fontSize: 13, fill: "var(--ink-2)" }}>solo producto</text>
      <rect x="290" y="236" width="190" height="52" rx="10" style={{ fill: "var(--surface)", stroke: tone("uso"), strokeWidth: 2 }} />
      <text x="385" y="258" textAnchor="middle" style={{ ...mono, fontSize: 13, fill: "var(--ink)" }}>ISO/IEC 25019:2023</text>
      <text x="385" y="277" textAnchor="middle" style={{ fontSize: 13, fill: "var(--ink-2)" }}>calidad en uso</text>
    </svg>
  );
}

export function Pentagon({ active }: { active: number }) {
  const pts = Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [150 + 110 * Math.cos(a), 150 + 110 * Math.sin(a)] as const;
  });
  return (
    <svg viewBox="0 0 300 300" className={svgCls} aria-hidden>
      <polygon points={pts.map((p) => p.join(",")).join(" ")} style={{ fill: "color-mix(in oklab, var(--c-uso) 8%, transparent)", stroke: tone("uso"), strokeWidth: 1.5 }} />
      {pts.map(([x, y], i) => (
        <line key={`l${i}`} x1="150" y1="150" x2={x} y2={y} style={{ stroke: "var(--border)", strokeWidth: 1 }} />
      ))}
      {pts.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} animate={{ r: i === active ? 22 : 12, opacity: i === active ? 1 : 0.35 }} transition={{ duration: 0.35, ease: EASE }} style={{ fill: tone("uso") }} />
      ))}
      <text x="150" y="160" textAnchor="middle" style={{ ...disp, fontSize: 30, fill: "var(--ink)" }}>{active + 1}/5</text>
    </svg>
  );
}

export function Counter({ from, to, className }: { from: number; to: number; className?: string }) {
  const v = useMotionValue(from);
  const r = useTransform(v, (x) => Math.round(x).toString());
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { v.set(to); return; }
    v.set(from);
    const c = animate(v, to, { duration: 1.2, delay: 0.5, ease: EASE });
    return () => c.stop();
  }, [from, to, v, reduce]);
  return <motion.span className={className}>{r}</motion.span>;
}

export function Puzzle() {
  const piece = "M0 0 H40 a12 12 0 1 0 24 0 H104 V40 a12 12 0 1 1 0 24 V104 H0 Z";
  return (
    <svg viewBox="-10 -20 260 150" className={svgCls} aria-hidden>
      <path d={piece} style={{ fill: "color-mix(in oklab, var(--c-funcional) 20%, var(--surface))", stroke: tone("funcional"), strokeWidth: 2 }} />
      <motion.path d={piece} transform="translate(116 0) scale(-1 1) translate(-104 0)" initial={{ x: 40 }} animate={{ x: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
        style={{ fill: tone("funcional"), stroke: tone("funcional"), strokeWidth: 2 }} />
    </svg>
  );
}

export function GaugeVisual() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 240 140" className={svgCls} aria-hidden>
      <path d="M20 120 A100 100 0 0 1 220 120" style={{ fill: "none", stroke: "var(--surface-2)", strokeWidth: 18, strokeLinecap: "round" }} />
      <path d="M20 120 A100 100 0 0 1 170 33" style={{ fill: "none", stroke: tone("desempeno"), strokeWidth: 18, strokeLinecap: "round" }} />
      <motion.g style={{ originX: "120px", originY: "120px" }} animate={reduce ? { rotate: 20 } : { rotate: [-40, 35, 10, 45, -40] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <line x1="120" y1="120" x2="120" y2="38" style={{ stroke: "var(--ink)", strokeWidth: 4, strokeLinecap: "round" }} />
      </motion.g>
      <circle cx="120" cy="120" r="9" style={{ fill: "var(--ink)" }} />
    </svg>
  );
}

export function CompatLink() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 280 150" className={svgCls} aria-hidden>
      <rect x="4" y="4" width="272" height="142" rx="16" style={{ fill: "none", stroke: tone("compat"), strokeDasharray: "6 6", strokeWidth: 1.5 }} />
      <rect x="24" y="45" width="80" height="60" rx="10" style={{ fill: tone("compat") }} />
      <rect x="176" y="45" width="80" height="60" rx="10" style={{ fill: "color-mix(in oklab, var(--c-compat) 25%, var(--surface))", stroke: tone("compat"), strokeWidth: 2 }} />
      <line x1="104" y1="75" x2="176" y2="75" style={{ stroke: tone("compat"), strokeWidth: 3 }} />
      {!reduce && <motion.circle cy="75" r="6" style={{ fill: "var(--c-desempeno)" }} animate={{ cx: [108, 172, 108] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />}
    </svg>
  );
}

export function Heartbeat() {
  const reduce = useReducedMotion();
  const d = "M0 60 H60 L75 20 L90 100 L105 60 H170 L185 30 L200 90 L215 60 H250 M265 60 H300 L315 20 L330 100 L345 60 H400";
  return (
    <svg viewBox="0 0 400 120" className={svgCls} aria-hidden>
      <motion.path d={d} style={{ fill: "none", stroke: tone("fiabilidad"), strokeWidth: 3, strokeLinejoin: "round" }}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={reduce ? { duration: 0 } : { duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }} />
    </svg>
  );
}

export function Balance() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 260 170" className={svgCls} aria-hidden>
      <path d="M130 30 V150 M95 155 H165" style={{ stroke: "var(--ink)", strokeWidth: 4, strokeLinecap: "round" }} />
      <motion.g style={{ originX: "130px", originY: "30px" }} animate={reduce ? {} : { rotate: [-6, 6, -6] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <line x1="40" y1="30" x2="220" y2="30" style={{ stroke: "var(--ink)", strokeWidth: 4, strokeLinecap: "round" }} />
        <path d="M40 30 L15 90 H65 Z" style={{ fill: "color-mix(in oklab, var(--c-intro) 18%, var(--surface))", stroke: tone("intro"), strokeWidth: 2 }} />
        <path d="M220 30 L195 90 H245 Z" style={{ fill: "color-mix(in oklab, var(--c-seguridad) 18%, var(--surface))", stroke: tone("seguridad"), strokeWidth: 2 }} />
      </motion.g>
      <circle cx="130" cy="30" r="7" style={{ fill: "var(--ink)" }} />
    </svg>
  );
}

export function LifecycleTimeline({ steps, t }: { steps: string[]; t: ToneKey }) {
  const top = steps.slice(0, 5);
  const base = steps[5]!;
  return (
    <div className="flex flex-col gap-card">
      <ol className="relative grid gap-card md:grid-cols-5">
        <motion.span aria-hidden className="absolute left-[10%] right-[10%] top-[22px] hidden h-0.5 origin-left md:block" style={{ background: tone(t) }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: EASE, delay: 0.3 }} />
        <motion.span aria-hidden className="absolute bottom-4 left-[22px] top-4 w-0.5 origin-top md:hidden" style={{ background: tone(t) }}
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.1, ease: EASE, delay: 0.3 }} />
        {top.map((s, i) => (
          <motion.li key={s} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08, ease: EASE, duration: 0.5 }}
            className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
            <span className="chip-num z-10 h-11 min-w-11 shrink-0 bg-surface" style={{ "--tone": tone(t) } as React.CSSProperties}>{String(i + 1).padStart(2, "0")}</span>
            <p className="t-card text-ink">{s}</p>
          </motion.li>
        ))}
      </ol>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, ease: EASE }}
        className="deck-card flex items-center gap-4" style={{ "--tone": tone(t) } as React.CSSProperties}>
        <span className="card-bar" aria-hidden />
        <span className="chip-num">06</span>
        <p className="t-card text-ink">{base}</p>
      </motion.div>
    </div>
  );
}

export function ScopeSplit({ split }: { split: boolean }) {
  return (
    <svg viewBox="0 0 320 200" className={svgCls} role="img"
      aria-label={split ? "2023: dos normas, ISO/IEC 25010 (producto) e ISO/IEC 25019 (calidad en uso)" : "2011: una sola norma con producto y calidad en uso"}>
      <motion.g animate={{ x: split ? -50 : 0 }} transition={{ duration: 0.6, ease: EASE }}>
        <motion.rect y="40" height="120" rx="14" animate={{ x: split ? 60 : 60, width: split ? 100 : 200 }} transition={{ duration: 0.6, ease: EASE }} style={{ fill: "color-mix(in oklab, var(--c-funcional) 16%, var(--surface))", stroke: tone("funcional"), strokeWidth: 2 }} />
        <text x={split ? 110 : 160} y="105" textAnchor="middle" style={{ ...mono, fontSize: 14, fill: "var(--ink)" }}>{split ? "25010" : "25010:2011"}</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: split ? 1 : 0, x: split ? 0 : -40 }} transition={{ duration: 0.6, ease: EASE }}>
        <rect x="170" y="40" width="100" height="120" rx="14" style={{ fill: "color-mix(in oklab, var(--c-uso) 16%, var(--surface))", stroke: tone("uso"), strokeWidth: 2 }} />
        <text x="220" y="105" textAnchor="middle" style={{ ...mono, fontSize: 14, fill: "var(--ink)" }}>25019</text>
      </motion.g>
    </svg>
  );
}
