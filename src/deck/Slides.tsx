import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { ArrowRight, RefreshCw } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { charByKey, CHARACTERISTICS, tone, type CharKey } from "@/data/characteristics";
import {
  ACTORS, COMPARISON, CONCLUSIONS, CONTEXT_CHIPS, INDEX_ITEMS, LIFECYCLE_STEPS, NAME_SHIFTS,
  STUDENTS, USE_TABS, WHAT_BULLETS, type SlideData,
} from "@/data/slides";
import { TOPICS } from "@/data/topics";
import { item, stagger, bar } from "./motion";
import { Card, CardGrid, En, Pill, toneStyle, Visual } from "./primitives";
import { QualityWheel, WheelBadge } from "./QualityWheel";
import {
  Balance, CompatLink, Counter, GaugeVisual, Heartbeat, LifecycleTimeline, Pentagon, Puzzle, ScopeSplit, Timeline2011,
} from "./visuals";

export interface SlideProps { s: SlideData; goTo: (n: number) => void }

function Header({ s, aside }: { s: SlideData; aside?: React.ReactNode }) {
  const label = s.badgeLabel ?? (s.badge?.length === 1 ? charByKey(s.badge[0] ?? "funcional").name : undefined);
  const head = (
    <div className="flex min-w-0 flex-col gap-3">
      <motion.div variants={item} className="flex flex-wrap items-center gap-3">
        {s.badge && <WheelBadge keys={s.badge} />}
        <span className="t-label text-muted-foreground">{s.kicker}{label ? ` · ${label}` : ""}</span>
      </motion.div>
      <motion.h2 variants={item} data-slide-title tabIndex={-1} className="t-h2 text-ink outline-none">{s.title}</motion.h2>
      {s.lead && <motion.p variants={item} className="t-lead">{s.lead}</motion.p>}
    </div>
  );
  if (!aside) return head;
  return (
    <div className="grid items-center gap-block xl:grid-cols-12">
      <div className="xl:col-span-7">{head}</div>
      <div className="flex max-h-[18vh] justify-center xl:col-span-5 xl:max-h-[30vh] hide-short [&_svg]:max-h-[18vh] xl:[&_svg]:max-h-[30vh]">{aside}</div>
    </div>
  );
}

const VISUALS = { puzzle: Puzzle, gauge: GaugeVisual, compat: CompatLink, heartbeat: Heartbeat, balance: Balance };

function Frame({ children, header }: { children: React.ReactNode; header: React.ReactNode }) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto flex w-full max-w-[1480px] flex-col gap-block">
      {header}
      {children}
    </motion.div>
  );
}

/* ---------- Diapositivas ---------- */

function Cover({ s }: SlideProps) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto grid h-full w-full max-w-[1480px] items-center gap-block lg:grid-cols-[7fr_5fr]">
      <div className="flex flex-col gap-4">
        <motion.span variants={item} className="t-label text-on-dark-2">{s.kicker}</motion.span>
        <motion.h1 variants={item} data-slide-title tabIndex={-1} className="t-cover text-on-dark outline-none">ISO <span className="text-brand">25010</span></motion.h1>
        <motion.p variants={item} className="t-lead text-on-dark-2" style={{ color: "var(--on-dark-2)" }}>Modelo de calidad del producto de software</motion.p>
      </div>
      <motion.div variants={item} className="hide-short flex h-[22dvh] justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[60vh]">
        <QualityWheel spin sequence dark center="25010" className="aspect-square h-full" label="Rueda con las 9 características de calidad" />
      </motion.div>
      <motion.dl variants={item} className="grid gap-4 border-t pt-5" style={{ borderColor: "var(--dark-border)" }}>
        <div><dt className="t-label text-on-dark-2">Institución</dt><dd className="font-semibold text-on-dark" style={{ fontSize: "var(--fs-card)" }}>Universidad Politécnica Territorial del Oeste de Sucre "Clodosbaldo Russián"</dd></div>
        <div><dt className="t-label text-on-dark-2">Acreditable</dt><dd className="font-semibold text-on-dark" style={{ fontSize: "var(--fs-card)" }}>Trayecto IV · Profesora Rosemid Mago</dd></div>
        <div><dt className="t-label text-on-dark-2">Estudiantes</dt>
          <dd><ul className="mt-1 grid gap-x-6 gap-y-1 sm:grid-cols-2 xl:grid-cols-3">{STUDENTS.map((n) => <li key={n} className="font-semibold text-on-dark" style={{ fontSize: "var(--fs-card)" }}>{n}</li>)}</ul></dd></div>
      </motion.dl>
    </motion.div>
  );
}

function Index({ s, goTo }: SlideProps) {
  return (
    <Frame header={<Header s={s} />}>
      <div className="grid gap-card md:grid-cols-2 xl:grid-cols-3">
        {INDEX_ITEMS.map((txt, i) => {
          const t = TOPICS[i];
          if (!t) return null;
          return (
            <motion.div key={txt} variants={item} style={toneStyle(t.tone)}><Button variant="deck" size="deck" onClick={() => goTo(t.start)} className="deck-card flex h-full w-full flex-col items-start gap-3 text-left">
              <motion.span variants={bar} className="card-bar" aria-hidden />
              <span className="font-mono text-4xl font-medium" style={{ color: tone(t.tone) }} aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <span className="t-card-title text-ink">{txt}</span>
              <span className="t-label mt-auto inline-flex items-center gap-2 text-muted-foreground">Ir a la diapositiva {t.start} <ArrowRight className="h-4 w-4" aria-hidden /></span>
            </Button></motion.div>
          );
        })}
      </div>
    </Frame>
  );
}

function What({ s }: SlideProps) {
  return (
    <Frame header={<Header s={s} />}>
      <div className="grid items-center gap-block xl:grid-cols-12">
        <ul className="flex flex-col gap-card xl:col-span-7">
          {WHAT_BULLETS.map((b, i) => (
            <motion.li key={b} variants={item} className="flex items-start gap-4">
              <span className="chip-num shrink-0" style={toneStyle("intro")}>{String(i + 1).padStart(2, "0")}</span>
              <p className="t-card text-ink" style={{ fontSize: "var(--fs-lead)" }}>{b}</p>
            </motion.li>
          ))}
        </ul>
        <div className="xl:col-span-5"><Visual><div className="w-full max-w-xl"><Timeline2011 /></div></Visual></div>
      </div>
    </Frame>
  );
}

function Lifecycle({ s }: SlideProps) {
  return <Frame header={<Header s={s} />}><LifecycleTimeline steps={LIFECYCLE_STEPS} t="intro" /></Frame>;
}

function Cards({ s }: SlideProps) {
  const V = s.visual ? VISUALS[s.visual] : null;
  return (
    <Frame header={<Header s={s} aside={V ? <V /> : undefined} />}>
      <CardGrid cards={s.cards ?? []} t={s.tone} cols={s.cols} numbered={s.numbered} />
      {s.band && (
        <motion.div variants={item} className="flex flex-wrap items-center gap-4 rounded-2xl border p-card" style={{ background: "color-mix(in oklab, var(--c-flex) 12%, var(--surface))" }}>
          <ArrowRight className="h-7 w-7 shrink-0" style={{ color: tone("flex") }} aria-hidden />
          <p className="t-card font-semibold text-ink">{s.band}</p>
          <Pill t="flex">Renombrada</Pill>
        </motion.div>
      )}
    </Frame>
  );
}

function Actors({ s }: SlideProps) {
  return (
    <Frame header={<Header s={s} />}>
      <ul className="flex flex-col gap-3">
        {ACTORS.map(({ actor, use, icon: Icon }) => (
          <motion.li key={actor} variants={item} className="deck-card grid items-center gap-3 !pt-[var(--pad-card)] md:grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1.4fr)] md:gap-6" style={toneStyle("intro")}>
            <Icon className="h-8 w-8" style={{ color: tone("intro") }} aria-hidden />
            <span className="t-card-title text-ink">{actor}</span>
            <ArrowRight className="hidden h-6 w-6 text-muted-foreground md:block" aria-label="para" />
            <span className="t-card">{use}</span>
          </motion.li>
        ))}
      </ul>
    </Frame>
  );
}

function Tabs({ s }: SlideProps) {
  const [a, setA] = useState(0);
  const tab = USE_TABS[a] ?? USE_TABS[0];
  if (!tab) return null;
  const Icon = tab.icon;
  const move = (d: number) => setA((v) => (v + d + 5) % 5);
  return (
    <Frame header={<Header s={s} />}>
      <motion.div variants={item} role="tablist" aria-label="Características de calidad en uso 2011" className="flex flex-wrap gap-2">
        {USE_TABS.map((t, i) => (
          <Button variant="deck" size="deck" key={t.name} role="tab" id={`tab-${i}`} aria-selected={a === i} aria-controls="tab-panel" tabIndex={a === i ? 0 : -1}
            onClick={() => setA(i)} onKeyDown={(e) => { if (e.key === "Home") setA(0); if (e.key === "End") setA(4); if (e.key === "ArrowDown") { e.preventDefault(); move(1); } if (e.key === "ArrowUp") { e.preventDefault(); move(-1); } }}
            className="seg-btn inline-flex items-center gap-2 border bg-surface">
            <t.icon className="h-5 w-5" aria-hidden /> {t.name}
          </Button>
        ))}
      </motion.div>
      <div className="grid items-center gap-block xl:grid-cols-12">
        <motion.div key={a} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          id="tab-panel" role="tabpanel" aria-labelledby={`tab-${a}`} className="deck-card flex flex-col gap-3 xl:col-span-7" style={toneStyle("uso")}>
          <span className="card-bar" aria-hidden />
          <Icon className="h-10 w-10" style={{ color: tone("uso") }} aria-hidden />
          <h3 className="t-card-title text-ink">{tab.name}</h3>
          <p className="t-card">{tab.def}</p>
          {tab.example && <p className="t-card"><strong className="text-ink">Ejemplo:</strong> {tab.example}</p>}
        </motion.div>
        <div className="xl:col-span-5"><Visual><div className="w-full max-w-[min(320px,28vh)]"><Pentagon active={a} /></div></Visual></div>
      </div>
    </Frame>
  );
}

function Uso2023({ s }: SlideProps) {
  return (
    <Frame header={<Header s={s} />}>
      <CardGrid cards={s.cards ?? []} t="uso" cols={3} />
      <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border bg-surface p-card" role="img" aria-label="5 características en 2011, 3 características en 2023">
        <span className="t-card-title text-ink"><span className="font-mono text-4xl">5</span> características <span className="t-label text-muted-foreground">(2011)</span></span>
        <ArrowRight className="h-7 w-7" style={{ color: tone("uso") }} aria-hidden />
        <span className="t-card-title text-ink"><Counter from={5} to={3} className="font-mono text-4xl" /> características <span className="t-label text-muted-foreground">(2023)</span></span>
      </motion.div>
    </Frame>
  );
}

function Wheel({ s }: SlideProps) {
  const [sel, setSel] = useState<CharKey>("funcional");
  const c = charByKey(sel);
  const Icon = c.icon;
  return (
    <Frame header={<Header s={s} />}>
      <div className="grid items-center gap-block md:grid-cols-2 xl:grid-cols-12">
        <motion.div variants={item} className="flex justify-center xl:col-span-6">
          <QualityWheel selected={sel} onSelect={setSel} className="aspect-square w-full max-w-[min(440px,52vh)]" />
        </motion.div>
        <motion.div key={sel} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
          aria-live="polite" className="deck-card flex flex-col gap-3 xl:col-span-6" style={toneStyle(sel)}>
          <span className="card-bar" aria-hidden />
          <div className="flex flex-wrap items-center gap-3">
            <Icon className="h-10 w-10" style={{ color: tone(sel) }} aria-hidden />
            <span className="t-label text-muted-foreground">{String(CHARACTERISTICS.indexOf(c) + 1).padStart(2, "0")} / 09</span>
            {c.pill && <Pill t={sel}>{c.pill}</Pill>}
          </div>
          <h3 className="t-card-title text-ink">{c.name} <En>{c.en}</En></h3>
          <p className="t-card">{c.description}</p>
          
        </motion.div>
      </div>
    </Frame>
  );
}

function Toggle<T extends string>({ options, value, onChange, label }: { options: { v: T; l: string }[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-full border bg-surface p-1">
      {options.map((o) => (
        <Button variant="deck" size="deck" key={o.v} aria-pressed={value === o.v} onClick={() => onChange(o.v)} className="seg-btn">{o.l}</Button>
      ))}
    </div>
  );
}

function Scope({ s }: SlideProps) {
  const [y, setY] = useState<"2011" | "2023">("2011");
  return (
    <Frame header={<Header s={s} />}>
      <motion.ul variants={item} className="flex flex-wrap gap-2">
        {CONTEXT_CHIPS.map(({ label, icon: Icon }) => (
          <li key={label} className="pill !text-base" style={toneStyle("intro")}><Icon className="h-4 w-4" aria-hidden />{label}</li>
        ))}
      </motion.ul>
      <div className="grid items-center gap-block xl:grid-cols-12">
        <motion.div variants={item} className="deck-card flex flex-col gap-4 xl:col-span-7" style={toneStyle(y === "2011" ? "intro" : "uso")}>
          <span className="card-bar" aria-hidden />
          <div className="flex flex-wrap items-center gap-3">
            <Toggle label="Versión" value={y} onChange={setY} options={[{ v: "2011", l: "2011" }, { v: "2023", l: "2023" }]} />
            <span className="t-label text-muted-foreground">Cambio A: separación del modelo de calidad en uso</span>
          </div>
          <div aria-live="polite" className="flex flex-col gap-2">
            {y === "2011" ? (
              <p className="t-card text-ink">2011: la ISO 25010 abarcaba la calidad del producto y la calidad en uso.</p>
            ) : (
              <>
                <p className="t-card text-ink">2023: la ISO/IEC 25010 se centra exclusivamente en la calidad del producto de software.</p>
                <p className="t-card">El modelo de calidad en uso se extrajo y ahora es una norma independiente: la ISO/IEC 25019:2023.</p>
              </>
            )}
          </div>
        </motion.div>
        <div className="xl:col-span-5"><Visual><div className="w-full max-w-md"><ScopeSplit split={y === "2023"} /></div></Visual></div>
      </div>
    </Frame>
  );
}

function Safety({ s }: SlideProps) {
  const [v, setV] = useState<"security" | "safety">("safety");
  const cards = [
    { k: "security" as const, title: "Security", sub: "ciberseguridad", text: "Protección de información y datos contra ataques.", c: charByKey("seguridad"), t: "seguridad" as const },
    { k: "safety" as const, title: "Safety", sub: "seguridad física", text: "Prevenir que fallos del software causen daños físicos a personas, bienes, salud o medio ambiente. Crítica en medicina, vehículos autónomos e industria.", c: charByKey("safety"), t: "safety" as const },
  ];
  return (
    <Frame header={<Header s={s} />}>
      <motion.div variants={item} className="flex flex-wrap items-center justify-between gap-4">
        <Toggle label="Comparar" value={v} onChange={setV} options={[{ v: "security", l: "Security" }, { v: "safety", l: "Safety" }]} />
        <span className="t-card-title text-ink" role="img" aria-label="De 8 a 9 características"><span className="font-mono">8 → </span><Counter from={8} to={9} className="font-mono" /> características</span>
      </motion.div>
      <div className="grid gap-card md:grid-cols-2">
        {cards.map(({ k, title, sub, text, c, t }) => (
          <motion.article key={k} variants={item} animate={{ scale: v === k ? 1 : 0.98 }} transition={{ duration: 0.3 }}
            className="deck-card flex flex-col gap-3" style={toneStyle(t)} aria-current={v === k ? "true" : undefined}>
            <span className="card-bar" aria-hidden />
            <c.icon className="h-10 w-10" style={{ color: tone(t) }} aria-hidden />
            <h3 className="t-card-title text-ink"><span className="font-mono">{title}</span> ({sub})</h3>
            <p className="t-card">{text}</p>
            {k === "safety" && <Pill t="safety">Nueva 2023</Pill>}
          </motion.article>
        ))}
      </div>
    </Frame>
  );
}

function NameShiftCard({ d, i }: { d: (typeof NAME_SHIFTS)[number]; i: number }) {
  const [before, setBefore] = useState(false);
  return (
    <motion.article variants={item} className="deck-card flex flex-col gap-3" style={toneStyle("intro")}
      onMouseEnter={() => setBefore(true)} onMouseLeave={() => setBefore(false)}>
      <motion.span variants={bar} className="card-bar" aria-hidden />
      <div className="flex flex-wrap items-center gap-3">
        <span className="chip-num">{String(i + 1).padStart(2, "0")}</span>
        <Pill>Antes: {d.before}</Pill>
      </div>
      <h3 className="t-card-title text-ink" aria-live="polite">
        <motion.span key={String(before)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="inline-block">
          {before ? <span className="text-ink-2 line-through decoration-2">{d.before}</span> : d.after}
        </motion.span>
      </h3>
      <p className="t-card">{d.text}</p>
      {d.chips && <ul className="flex flex-wrap gap-2">{d.chips.map((c) => <li key={c} className="pill whitespace-normal" style={{ whiteSpace: "normal" }}>{c}</li>)}</ul>}
      <Button variant="deck" size="deck" aria-pressed={before} onClick={() => setBefore((b) => !b)} onFocus={() => setBefore(true)} onBlur={() => setBefore(false)}
        className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border bg-surface px-4 py-2 font-semibold text-ink">
        <RefreshCw className="h-4 w-4" aria-hidden /> Ver cambio
      </Button>
    </motion.article>
  );
}

function NameShift({ s }: SlideProps) {
  return (
    <Frame header={<Header s={s} />}>
      <div className="grid gap-card md:grid-cols-2 xl:grid-cols-3">
        {NAME_SHIFTS.map((d, i) => <NameShiftCard key={d.after} d={d} i={i} />)}
      </div>
    </Frame>
  );
}

function Table({ s }: SlideProps) {
  const [v, setV] = useState<"2011" | "2023" | "both">("both");
  const dim = (col: "2011" | "2023"): CSSProperties => ({ background: v === "both" || v === col ? "var(--surface)" : "var(--surface-2)", transition: "background .3s" });
  return (
    <Frame header={<Header s={s} />}>
      <motion.div variants={item}><Toggle label="Versión" value={v} onChange={setV} options={[{ v: "2011", l: "2011" }, { v: "2023", l: "2023" }, { v: "both", l: "Ambas" }]} /></motion.div>
      <div className="overflow-hidden rounded-2xl border bg-surface" style={{ boxShadow: "var(--shadow-card)" }}>
        <table className="w-full border-collapse text-left">
          <thead className="hidden md:table-header-group">
            <tr className="bg-surface-2">
              <th scope="col" className="t-label p-card text-ink">Aspecto</th>
              <th scope="col" className="t-label p-card text-ink" style={dim("2011")}>ISO/IEC 25010:2011</th>
              <th scope="col" className="t-label p-card text-ink" style={dim("2023")}>ISO/IEC 25010:2023</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((r, i) => (
              <motion.tr key={r.aspect} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.08 }}
                className="flex flex-col gap-1 border-t px-[var(--pad-card)] py-3 md:table-row md:p-0">
                <th scope="row" className="t-card font-semibold text-ink md:px-[var(--pad-card)] md:py-3" style={{ fontSize: "var(--fs-card)" }}>
                  <span className="inline-flex flex-wrap items-center gap-2">{r.aspect}{r.changes && <Pill>Cambia</Pill>}</span>
                </th>
                <td className="t-card md:px-[var(--pad-card)] md:py-3" style={dim("2011")}><span className="t-label mr-2 text-muted-foreground md:hidden">2011</span>{r.y2011}</td>
                <td className="t-card text-ink md:px-[var(--pad-card)] md:py-3" style={dim("2023")}><span className="t-label mr-2 text-muted-foreground md:hidden">2023</span>{r.y2023}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

function Closing({ s }: SlideProps) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto flex w-full max-w-[1480px] flex-col gap-block">
      <motion.span variants={item} className="t-label text-on-dark-2">{s.kicker} · Cierre</motion.span>
      <motion.h2 variants={item} data-slide-title tabIndex={-1} className="t-h2 text-on-dark outline-none">{s.title}</motion.h2>
      <ol className="grid gap-card md:grid-cols-3">
        {CONCLUSIONS.map((c, i) => (
          <motion.li key={c} variants={item} className="flex flex-col gap-3 rounded-2xl border p-card" style={{ borderColor: "var(--dark-border)", background: "var(--dark-surface)" }}>
            <span className="font-mono text-3xl text-brand">{String(i + 1).padStart(2, "0")}</span>
            <p className="text-on-dark" style={{ fontSize: "var(--fs-card)", lineHeight: 1.55 }}>{c}</p>
          </motion.li>
        ))}
      </ol>
      <motion.div variants={item} className="flex flex-wrap items-center gap-block border-t pt-5" style={{ borderColor: "var(--dark-border)" }}>
        <QualityWheel spin sequence dark icons={false} className="hide-short h-24 w-24 shrink-0" />
        <div className="flex min-w-0 flex-col gap-2">
          <p className="t-cover text-on-dark" style={{ fontSize: "clamp(2rem, 2vw + 3vh, 4rem)" }}>¡Gracias! <span className="text-brand">¿Preguntas?</span></p>
          <p className="text-on-dark-2" style={{ fontSize: "var(--fs-card)" }}>{STUDENTS.join(" · ")}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const RENDERERS: Record<SlideData["kind"], (p: SlideProps) => React.ReactElement | null> = {
  cover: Cover, index: Index, what: What, lifecycle: Lifecycle, cards: Cards, actors: Actors, tabs: Tabs,
  uso2023: Uso2023, wheel: Wheel, scope: Scope, safety: Safety, nameshift: NameShift, table: Table, closing: Closing,
};
export { Card };
