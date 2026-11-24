import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize, Minimize } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SLIDES } from '@/data/slides';
import { TOPICS, showsTopicBar, slideFromHash, topicOf, topicProgress, TOTAL_SLIDES } from '@/data/topics';
import { tone, type ToneKey } from '@/data/characteristics';
import { RENDERERS } from './Slides';
import { EASE } from './motion';

function PaperBackground({ dark, t }: { dark: boolean; t: ToneKey }) {
  return <div className={`paper-background ${dark ? 'paper-dark' : ''}`} aria-hidden="true">
    {!dark && <><div className="paper-grid"/><div className="paper-glow"/>
      <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" className="paper-shapes" style={{ stroke: tone(t) }}>
        <g className="drift-a deco-shape"><circle cx="1280" cy="130" r="180"/></g>
        <g className="drift-b deco-shape"><rect x="80" y="650" width="140" height="140" rx="6" transform="rotate(20 150 720)"/></g>
        <g className="drift-c deco-shape"><circle cx="1120" cy="780" r="120"/><circle cx="1120" cy="780" r="105"/></g>
      </svg></>}
  </div>;
}

function TopicBar({ slide, goTo }: { slide: number; goTo: (n: number) => void }) {
  const current = TOPICS.find(t => t.n === topicOf(slide));
  return <nav className="topic-nav" aria-label="Temas de la presentación">
    <div className="topic-line">
      <div className="topic-segments">
        {TOPICS.map(t => <Button key={t.n} variant="deck" size="deck" className="topic-segment" title={t.name}
          aria-label={`Tema ${t.n}: ${t.name}`} aria-current={current?.n === t.n ? 'step' : undefined} onClick={() => goTo(t.start)}>
          <span className="segment-track"><span className="segment-fill" style={{ background: tone(t.tone), transform: `scaleX(${topicProgress(t.n, slide)})` }}/></span>
          <span className="segment-label">{String(t.n).padStart(2,'0')} {t.short}</span>
        </Button>)}
      </div>
      <span className="deck-count">{String(slide).padStart(2,'0')} <span>/ 25</span></span>
    </div>
    <div className="topic-mobile-label">{current?.short ?? 'Índice de contenidos'}</div>
  </nav>;
}

export function Deck() {
  const [slide, setSlide] = useState(1);
  const [direction, setDirection] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [curtain, setCurtain] = useState<{ id: number; tone: ToneKey } | null>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const scroll = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const previous = useRef(1);
  const goTo = useCallback((n: number) => {
    const next = Math.max(1, Math.min(TOTAL_SLIDES, n));
    if (next !== slideFromHash(window.location.hash)) window.location.hash = String(next);
  }, []);
  const toggleFull = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { /* Fullscreen is unavailable in some embedded browsers. */ }
  }, []);
  useEffect(() => {
    const sync = () => {
      const n = slideFromHash(window.location.hash);
      setDirection(n >= previous.current ? 1 : -1);
      if (!reduce && topicOf(n) !== topicOf(previous.current)) {
        const s = SLIDES[n - 1];
        if (s) setCurtain({ id: Date.now(), tone: s.tone });
      }
      previous.current = n;
      setSlide(n);
    };
    sync();
    if (!window.location.hash) window.history.replaceState(null, '', '#1');
    setReady(true);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [reduce]);
  useEffect(() => {
    const full = () => setFullscreen(Boolean(document.fullscreenElement));
    const keyboard = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (['ArrowRight','PageDown'].includes(e.key)) { e.preventDefault(); goTo(slide + 1); }
      if (['ArrowLeft','PageUp'].includes(e.key)) { e.preventDefault(); goTo(slide - 1); }
      if (e.key === ' ' && !(e.target instanceof Element && e.target.closest('button,[role="button"],[role="tab"],input,textarea'))) { e.preventDefault(); goTo(slide + 1); }
      if (e.key.toLowerCase() === 'f') { e.preventDefault(); void toggleFull(); }
    };
    document.addEventListener('fullscreenchange', full);
    window.addEventListener('keydown', keyboard);
    return () => { document.removeEventListener('fullscreenchange', full); window.removeEventListener('keydown', keyboard); };
  }, [slide, goTo, toggleFull]);
  useEffect(() => {
    if (!ready) return;
    const s = SLIDES[slide - 1];
    if (s) document.title = `${slide}/25 — ${s.title} · ISO 25010`;
    scroll.current?.scrollTo({ top: 0 });
    const timer = window.setTimeout(() => scroll.current?.querySelector<HTMLElement>('[data-slide-title]')?.focus({ preventScroll: true }), 120);
    return () => window.clearTimeout(timer);
  }, [slide, ready]);
  const s = SLIDES[slide - 1];
  if (!s) return null;
  const Render = RENDERERS[s.kind];
  const dark = slide === 1 || slide === 25;
  return <MotionConfig reducedMotion="user">
    <main className={`deck-shell ${dark ? 'deck-dark' : ''}`} aria-label="Presentación ISO 25010"
      onTouchStart={e => { const p=e.touches[0]; if(p) touch.current={x:p.clientX,y:p.clientY}; }}
      onTouchEnd={e => { const p=e.changedTouches[0]; const start=touch.current; touch.current=null; if(!p||!start)return;
        const dx=p.clientX-start.x,dy=p.clientY-start.y;
        if(Math.abs(dx)>65 && Math.abs(dx)>Math.abs(dy)*1.5)goTo(slide+(dx<0?1:-1)); }}>
      <PaperBackground dark={dark} t={s.tone}/>
      <div className="deck-top">{showsTopicBar(slide) ? <TopicBar slide={slide} goTo={goTo}/> : <div className="cover-top"><span>ISO/IEC 25010</span><span>SQuaRE · 2023</span></div>}</div>
      <div ref={scroll} className="deck-viewport slide-scroll">
        <AnimatePresence initial={false} mode="wait">
          <motion.section key={slide} className="slide-page" aria-label={`Diapositiva ${slide} de 25`}
            initial={{ opacity:0, x:reduce?0:direction*40 }} animate={{opacity:1,x:0}} exit={{opacity:0,x:reduce?0:direction*-40}}
            transition={{duration:reduce?.15:.225,ease:EASE}}>
            <Render s={s} goTo={goTo}/>
          </motion.section>
        </AnimatePresence>
      </div>
      <footer className="slide-footer">
        <span className="footer-brand">ISO/IEC 25010 <span>·</span> Calidad de software</span>
        <div className="footer-controls">
          <Button variant="deck" size="deckIcon" title={fullscreen?'Salir de pantalla completa (F)':'Pantalla completa (F)'} aria-label={fullscreen?'Salir de pantalla completa':'Pantalla completa'} onClick={() => void toggleFull()}>{fullscreen?<Minimize/>:<Maximize/>}</Button>
          <span className="footer-count">{String(slide).padStart(2,'0')} / 25</span>
          <Button variant="deck" size="deckIcon" title="Diapositiva anterior" aria-label="Diapositiva anterior" disabled={slide===1} onClick={()=>goTo(slide-1)}><ArrowLeft/></Button>
          <Button variant="deck" size="deckIcon" title="Diapositiva siguiente" aria-label="Diapositiva siguiente" disabled={slide===25} onClick={()=>goTo(slide+1)}><ArrowRight/></Button>
        </div>
      </footer>
      <div className="sr-only" aria-live="polite" aria-atomic="true">Diapositiva {slide} de 25: {s.title}</div>
      <AnimatePresence>{curtain && !reduce && <motion.div key={curtain.id} aria-hidden="true" className="topic-curtain" style={{background:tone(curtain.tone)}}
        initial={{clipPath:'inset(100% 0 0 0)'}} animate={{clipPath:['inset(100% 0 0 0)','inset(0% 0 0 0)','inset(0 0 100% 0)']}}
        transition={{duration:.6,ease:EASE,times:[0,.45,1]}} onAnimationComplete={()=>setCurtain(null)}/>}</AnimatePresence>
    </main>
  </MotionConfig>;
}
