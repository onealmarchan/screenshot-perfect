import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import type { CardData } from "@/data/slides";
import { tone, type ToneKey } from "@/data/characteristics";
import { bar, item } from "./motion";

export const toneStyle = (k: ToneKey) => ({ "--tone": tone(k) }) as CSSProperties;

export function Pill({ children, t }: { children: ReactNode; t?: ToneKey }) {
  return <span className="pill" style={t ? toneStyle(t) : undefined}>{children}</span>;
}

export function En({ children }: { children: ReactNode }) {
  return <span className="t-en text-ink-2">({children})</span>;
}

export function Card({ data, index, t, numbered }: { data: CardData; index: number; t: ToneKey; numbered?: boolean }) {
  const Icon = data.icon;
  return (
    <motion.article variants={item} className="deck-card flex flex-col gap-3" style={toneStyle(data.tone ?? t)}>
      <motion.span variants={bar} className="card-bar" aria-hidden />
      <div className="flex flex-wrap items-center gap-3">
        {numbered && <span className="chip-num">{String(index + 1).padStart(2, "0")}</span>}
        {Icon && <Icon aria-hidden className="h-8 w-8 shrink-0" style={{ color: tone(data.tone ?? t) }} strokeWidth={1.75} />}
        {data.pill && <Pill t={data.tone ?? t}>{data.pill}</Pill>}
      </div>
      <h3 className="t-card-title text-ink">
        {data.title} {data.en && <En>{data.en}</En>}
      </h3>
      <p className="t-card">{data.text}</p>
    </motion.article>
  );
}

const COLS: Record<number, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
};

export function CardGrid({ cards, t, cols = 3, numbered }: { cards: CardData[]; t: ToneKey; cols?: 2 | 3; numbered?: boolean }) {
  return (
    <div className={`grid gap-card ${COLS[cols]}`}>
      {cards.map((c, i) => <Card key={c.title} data={c} index={i} t={t} numbered={numbered} />)}
    </div>
  );
}

export function Visual({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <motion.div variants={item} className="flex min-h-0 min-w-0 items-center justify-center" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {children}
    </motion.div>
  );
}
