import type { ToneKey } from "./characteristics";

export const TOTAL_SLIDES = 25;

export const TOPICS: { n: number; name: string; short: string; start: number; tone: ToneKey }[] = [
  { n: 1, name: "Introducción: qué es, para qué sirve y quién la usa", short: "Introducción", start: 3, tone: "intro" },
  { n: 2, name: "Modelo de calidad en uso", short: "Calidad en uso", start: 7, tone: "uso" },
  { n: 3, name: "Adecuación funcional, eficiencia de desempeño y compatibilidad", short: "Funcional, desempeño y compatibilidad", start: 9, tone: "funcional" },
  { n: 4, name: "Usabilidad, fiabilidad y seguridad", short: "Usabilidad, fiabilidad y seguridad", start: 13, tone: "interaccion" },
  { n: 5, name: "Mantenibilidad, portabilidad y cambios de la versión 2023", short: "Mantenibilidad, portabilidad y 2023", start: 17, tone: "mantenib" },
  { n: 6, name: "Ventajas, limitaciones y conclusiones", short: "Ventajas y conclusiones", start: 23, tone: "intro" },
];

/** Tema (1–6) de una diapositiva (1–25); 0 para portada e índice. */
export function topicOf(slide: number): number {
  if (slide >= 23) return 6;
  if (slide >= 17) return 5;
  if (slide >= 13) return 4;
  if (slide >= 9) return 3;
  if (slide >= 7) return 2;
  if (slide >= 3) return 1;
  return 0;
}

/** Progreso (0–1) del tema dado en la diapositiva actual. */
export function topicProgress(topic: number, slide: number): number {
  const cur = topicOf(slide);
  if (cur === 0 || topic > cur) return 0;
  if (topic < cur) return 1;
  const t = TOPICS[topic - 1]!;
  const end = topic < 6 ? TOPICS[topic]!.start - 1 : TOTAL_SLIDES;
  return (slide - t.start + 1) / (end - t.start + 1);
}

export function slideFromHash(hash: string): number {
  const n = Number.parseInt(hash.replace(/^#/, ""), 10);
  return Number.isFinite(n) && n >= 1 && n <= TOTAL_SLIDES ? n : 1;
}

export const showsTopicBar = (slide: number) => slide !== 1 && slide !== TOTAL_SLIDES;
