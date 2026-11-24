import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CHARACTERISTICS, tone, type CharKey } from "@/data/characteristics";

const N = 9;
function arc(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const p = (r: number, a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  const [x0, y0] = p(r1, a0); const [x1, y1] = p(r1, a1);
  const [x2, y2] = p(r0, a1); const [x3, y3] = p(r0, a0);
  return `M${x0} ${y0} A${r1} ${r1} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 0 0 ${x3} ${y3}Z`;
}
const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / N;
const GAP = 0.025;

interface Props {
  highlight?: CharKey[];
  selected?: CharKey | null;
  onSelect?: (k: CharKey) => void;
  center?: string;
  spin?: boolean;
  sequence?: boolean;
  icons?: boolean;
  dark?: boolean;
  className?: string;
  label?: string;
}

export function QualityWheel({ highlight, selected, onSelect, center, spin, sequence, icons = true, dark, className, label }: Props) {
  const [tick, setTick] = useState(-1);
  const [tip, setTip] = useState<number | null>(null);
  useEffect(() => {
    if (!sequence || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setTick((v) => (v + 1) % N), 1400);
    return () => clearInterval(t);
  }, [sequence]);
  useEffect(() => {
    if (tip === null) return;
    const k = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") setTip(null); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [tip]);

  const interactive = !!onSelect;
  return (
    <div className={`relative ${className ?? ""}`}>
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" className="h-full w-full max-h-full"
        role={label ? "img" : undefined} aria-label={label} aria-hidden={!interactive && !label ? true : undefined}>
        <g className={spin ? "spin-120" : undefined}>
          {CHARACTERISTICS.map((c, i) => {
            const a0 = angle(i) - Math.PI / N + GAP; const a1 = angle(i) + Math.PI / N - GAP;
            const mid = angle(i);
            const lit = selected ? selected === c.key : highlight ? highlight.includes(c.key) : tick === -1 || tick === i;
            const Icon = c.icon;
            const ix = 200 + 140 * Math.cos(mid); const iy = 200 + 140 * Math.sin(mid);
            return (
              <g key={c.key}
                onClick={onSelect ? () => onSelect(c.key) : undefined}
                onMouseEnter={interactive ? () => setTip(i) : undefined}
                onMouseLeave={interactive ? () => setTip(null) : undefined}
                onFocus={interactive ? () => setTip(i) : undefined}
                onBlur={interactive ? () => setTip(null) : undefined}
                style={{ cursor: interactive ? "pointer" : undefined }}
                className="group">
                <path d={arc(200, 200, 92, 190, a0, a1)}
                  style={{ fill: tone(c.key), opacity: lit ? 1 : 0.22, transition: "opacity .5s, transform .3s", transformOrigin: "200px 200px", transform: selected === c.key ? "scale(1.04)" : undefined }}
                  className={interactive ? "group-focus-within:[stroke:var(--ink)] group-focus-within:[stroke-width:4]" : undefined} />
                {icons && (onSelect ? <foreignObject x={ix-23} y={iy-23} width={46} height={46}>
                  <Button variant="deck" size="deck" className="wheel-control" aria-label={c.name} aria-pressed={selected===c.key}
                    onClick={e=>{ e.stopPropagation(); onSelect(c.key); }} style={{color:"var(--surface)"}}>
                    <Icon aria-hidden="true" strokeWidth={2}/>
                  </Button>
                </foreignObject> : <Icon x={ix - 18} y={iy - 18} width={36} height={36} strokeWidth={2} style={{ color: "var(--surface)", opacity: lit ? 1 : 0.7 }} />)}
              </g>
            );
          })}
        </g>
        <circle cx="200" cy="200" r="84" style={{ fill: dark ? "var(--ink-bg)" : "var(--surface)" }} />
        {center && (
          <text x="200" y="214" textAnchor="middle" style={{ fill: dark ? "var(--on-dark)" : "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 40 }}>{center}</text>
        )}
      </svg>
      {interactive && tip !== null && (() => {
        const mid = angle(tip); const c = CHARACTERISTICS[tip];
        if (!c) return null;
        const y = 50 + 30 * Math.sin(mid);
        return (
          <div role="tooltip" className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[130%] rounded-lg bg-popover px-3 py-1.5 text-popover-foreground shadow-lg"
            style={{ left: "50%", top: `${y}%`, fontSize: 14, maxWidth: "min(280px, 90%)", width: "max-content" }}>
            {c.name} <span className="t-en opacity-80">({c.en})</span>
          </div>
        );
      })()}
    </div>
  );
}

export function WheelBadge({ keys }: { keys: CharKey[] }) {
  return <QualityWheel highlight={keys} icons={false} className="h-16 w-16 shrink-0" />;
}
