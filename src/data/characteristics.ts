import type { LucideIcon } from "lucide-react";
import { Activity, Expand, Gauge, HardHat, Lock, MousePointerClick, Plug, Puzzle, Wrench } from "lucide-react";

export type CharKey =
  | "funcional" | "desempeno" | "compat" | "interaccion" | "fiabilidad"
  | "seguridad" | "mantenib" | "flex" | "safety";

export type ToneKey = CharKey | "uso" | "intro";

export interface Characteristic {
  key: CharKey;
  name: string;
  en: string;
  icon: LucideIcon;
  description: string;
  pill?: string;
}

export const tone = (k: ToneKey) => `var(--c-${k})`;

export const CHARACTERISTICS: Characteristic[] = [
  { key: "funcional", name: "Adecuación funcional", en: "Functional suitability", icon: Puzzle, description: "Funciones correctas para las necesidades del usuario, explícitas e implícitas." },
  { key: "desempeno", name: "Eficiencia de desempeño", en: "Performance efficiency", icon: Gauge, description: "Rendimiento del software frente a los recursos que consume." },
  { key: "compat", name: "Compatibilidad", en: "Compatibility", icon: Plug, description: "Intercambiar información y compartir entorno con otros sistemas." },
  { key: "interaccion", name: "Capacidad de interacción", en: "Interaction capability", icon: MousePointerClick, description: "Qué tan fácil, intuitivo y agradable es usar el sistema.", pill: "Antes: Usabilidad" },
  { key: "fiabilidad", name: "Fiabilidad", en: "Reliability", icon: Activity, description: "Funcionar de forma estable, predecible y sin caídas." },
  { key: "seguridad", name: "Seguridad", en: "Security", icon: Lock, description: "Proteger datos y funciones; cada rol accede solo a lo autorizado." },
  { key: "mantenib", name: "Mantenibilidad", en: "Maintainability", icon: Wrench, description: "Facilidad para corregir, mejorar y adaptar el software." },
  { key: "flex", name: "Flexibilidad", en: "Flexibility", icon: Expand, description: "Adaptarse y transferirse entre entornos, y escalar.", pill: "Antes: Portabilidad" },
  { key: "safety", name: "Seguridad física", en: "Safety", icon: HardHat, description: "Evitar que fallos del software causen daños físicos.", pill: "Nueva 2023" },
];

export function charByKey(k: CharKey): Characteristic {
  const result = CHARACTERISTICS.find(c => c.key === k);
  if (!result) throw new Error(`Unknown characteristic: ${k}`);
  return result;
}
