import type { LucideIcon } from "lucide-react";
import {
  Bot, Briefcase, Cloud, Code2, Compass, FlaskConical, Globe, Handshake, ListChecks, MessagesSquare,
  Scale, ShieldAlert, ShieldCheck, Smile, Sparkles, Target, ThumbsUp, Wifi, Workflow, Zap,
} from "lucide-react";
import type { CharKey, ToneKey } from "./characteristics";

export interface CardData {
  title: string;
  en?: string;
  text: string;
  icon?: LucideIcon;
  pill?: string;
  tone?: ToneKey;
}

export type SlideKind =
  | "cover" | "index" | "what" | "lifecycle" | "cards" | "actors" | "tabs" | "uso2023"
  | "wheel" | "scope" | "safety" | "nameshift" | "table" | "closing";

export type VisualKind = "puzzle" | "gauge" | "compat" | "heartbeat" | "balance";

export interface SlideData {
  id: number;
  kind: SlideKind;
  kicker: string;
  title: string;
  lead?: string;
  tone: ToneKey;
  badge?: CharKey[];
  badgeLabel?: string;
  cards?: CardData[];
  cols?: 2 | 3;
  numbered?: boolean;
  visual?: VisualKind;
  band?: string;
}

export const STUDENTS = ["Guillermo Rojas", "Manuel Salazar", "O'Neal Marchan", "Saúl Ramos", "Gabriel Bastardo"];

export const INDEX_ITEMS = [
  "Introducción: qué es, para qué sirve y quién la usa",
  "Modelo de calidad en uso",
  "Adecuación funcional, eficiencia de desempeño y compatibilidad",
  "Usabilidad, fiabilidad y seguridad",
  "Mantenibilidad, portabilidad y cambios de la versión 2023",
  "Ventajas, limitaciones y conclusiones",
];

export const WHAT_BULLETS = [
  "Estándar internacional que define un modelo de calidad para software y sistemas.",
  "Organiza la calidad en características y subcaracterísticas con un vocabulario común.",
  "Forma parte de la familia SQuaRE (serie ISO/IEC 25000).",
  "Actualizada en noviembre de 2023: la calidad en uso pasó a la ISO/IEC 25019.",
];

export const LIFECYCLE_STEPS = [
  "Obtener y definir requisitos de calidad",
  "Validar que la definición de requisitos esté completa",
  "Identificar objetivos de diseño",
  "Establecer objetivos de prueba",
  "Fijar criterios de aceptación para liberar el producto",
  "Definir medidas de calidad que respalden las actividades anteriores",
];

export const ACTORS: { actor: string; use: string; icon: LucideIcon }[] = [
  { actor: "Desarrolladores", use: "Diseñar y construir cumpliendo los atributos de calidad", icon: Code2 },
  { actor: "Adquirentes / clientes", use: "Exigir calidad en contratos y aceptar el producto", icon: Handshake },
  { actor: "QA / testers", use: "Planificar pruebas y criterios de aceptación", icon: FlaskConical },
  { actor: "Evaluadores independientes / auditores", use: "Evaluar de forma objetiva y comparable", icon: ShieldCheck },
  { actor: "Gerentes de proyecto", use: "Priorizar y controlar la calidad", icon: Briefcase },
];

export const USE_TABS: { name: string; icon: LucideIcon; def: string; example?: string }[] = [
  { name: "Efectividad", icon: Target, def: "Exactitud y completitud con las que los usuarios logran los objetivos especificados.", example: "Completar una compra en línea con el producto y la dirección correctos." },
  { name: "Eficiencia", icon: Zap, def: "Recursos gastados en relación con la exactitud y completitud con las que se logran los objetivos.", example: "Pagar en 3 clics en lugar de 12 pasos." },
  { name: "Satisfacción", icon: Smile, def: "Grado en que se satisfacen las necesidades del usuario al usar el producto en un contexto específico." },
  { name: "Libertad de riesgo", icon: ShieldAlert, def: "Grado en que el producto mitiga el riesgo potencial para el estatus económico, la vida humana, la salud o el ambiente.", example: "Una app bancaria que evita fraudes (económico) o un dispositivo médico que no daña al paciente (salud)." },
  { name: "Cobertura del contexto", icon: Globe, def: "Grado en que el producto se usa con efectividad, eficiencia, libertad de riesgo y satisfacción en los contextos especificados y más allá de los previstos.", example: "Una app pensada para oficina que también funciona con conexión lenta en el campo." },
];

export const CONTEXT_CHIPS: { label: string; icon: LucideIcon }[] = [
  { label: "Nube", icon: Cloud }, { label: "Microservicios", icon: Workflow },
  { label: "IoT", icon: Wifi }, { label: "Inteligencia artificial", icon: Bot },
];

export const COMPARISON: { aspect: string; y2011: string; y2023: string; changes: boolean }[] = [
  { aspect: "Alcance del estándar", y2011: "Producto + calidad en uso", y2023: "Solo calidad del producto", changes: true },
  { aspect: "Norma de calidad en uso", y2011: "Integrada en la 25010", y2023: "Independiente (ISO/IEC 25019)", changes: true },
  { aspect: "Total de características", y2011: "8", y2023: "9", changes: true },
  { aspect: "Protección física", y2011: "No explícita como nivel alto", y2023: "Nueva: Safety (Seguridad física)", changes: true },
  { aspect: "Evolución de Portabilidad", y2011: "Portabilidad", y2023: "Flexibilidad (+ Escalabilidad)", changes: true },
  { aspect: "Evolución de Usabilidad", y2011: "Usabilidad", y2023: "Capacidad de interacción", changes: true },
];

export const NAME_SHIFTS: { before: string; after: string; text: string; chips?: string[] }[] = [
  { before: "Portabilidad", after: "Flexibilidad", text: "Se renombra y se incorpora formalmente la Escalabilidad (Scalability): manejar volúmenes crecientes de carga o datos con escalado horizontal o vertical." },
  { before: "Usabilidad", after: "Capacidad de interacción", text: "Se reorganizan las subcaracterísticas para cubrir mejor la accesibilidad y la inclusión.", chips: ["Accesibilidad → Inclusividad + Asistencia al usuario", "Nueva: Autodescriptividad", "Involucración del usuario sustituye a Estética de la interfaz"] },
  { before: "Madurez", after: "Ausencia de fallos", text: "Ajuste en Fiabilidad: Madurez (Maturity) pasa a llamarse Ausencia de fallos (Faultlessness)." },
];

export const CONCLUSIONS = [
  "Adoptar la ISO/IEC 25010 no es cumplir una lista burocrática de requisitos, sino usar un mapa estratégico.",
  "Ese mapa ayuda a decidir qué atributos de calidad importan más según el tipo de software, el negocio y el nivel de riesgo.",
  "Con la actualización de 2023 (Safety, Flexibilidad y Capacidad de interacción), es la referencia más completa para construir sistemas confiables, inclusivos y sostenibles a largo plazo.",
];

export const SLIDES: SlideData[] = [
  { id: 1, kind: "cover", kicker: "Tema", title: "ISO 25010", tone: "intro" },
  { id: 2, kind: "index", kicker: "Contenido", title: "Índice de contenidos", tone: "intro" },
  { id: 3, kind: "what", kicker: "Tema 01", title: "¿Qué es la ISO/IEC 25010?", tone: "intro" },
  { id: 4, kind: "lifecycle", kicker: "Tema 01 · ¿Para qué sirve?", title: "Usos a lo largo del ciclo de vida", tone: "intro" },
  {
    id: 5, kind: "cards", kicker: "Tema 01", title: "Beneficios generales", tone: "intro", cols: 2,
    cards: [
      { title: "Vocabulario común", text: "Entre las partes interesadas del proyecto.", icon: MessagesSquare },
      { title: "Lista de verificación", text: "Para no olvidar requisitos no funcionales (rendimiento, seguridad, mantenibilidad, etc.).", icon: ListChecks },
      { title: "Comparación", text: "Permite comparar productos o versiones.", icon: Scale },
      { title: "Mejora continua", text: "Orienta contratos, auditorías y mejora continua.", icon: Compass },
    ],
  },
  { id: 6, kind: "actors", kicker: "Tema 01", title: "¿Quién la usa?", tone: "intro" },
  { id: 7, kind: "tabs", kicker: "Tema 02 · Calidad en uso", title: "Modelo 2011: cinco características", lead: "La ISO 25010:2011 agrupa las propiedades de calidad en uso en cinco características.", tone: "uso" },
  {
    id: 8, kind: "uso2023", kicker: "Tema 02 · Calidad en uso", title: "Modelo 2023 (ISO/IEC 25019): tres características", lead: "El modelo de la ISO/IEC 25019:2023 se compone de tres características.", tone: "uso", cols: 3,
    cards: [
      { title: "Beneficiosidad", en: "Beneficialness", icon: Sparkles, text: "Grado de beneficio que resulta de usar un producto, sistema o servicio." },
      { title: "Libertad de riesgo", en: "Freedom from risk", icon: ShieldAlert, pill: "Presente desde 2011", text: "Grado en que el producto mitiga el riesgo potencial para el estatus económico, la vida humana, la salud, la sociedad, las finanzas, las actividades empresariales o el ambiente." },
      { title: "Aceptabilidad", en: "Acceptability", icon: ThumbsUp, text: "Respuesta humana favorable ante el sistema." },
    ],
  },
  { id: 9, kind: "wheel", kicker: "Tema 03", title: "Las 9 características de calidad del producto (2023)", lead: "El modelo de calidad del producto de la versión 2023 tiene nueve características.", tone: "funcional" },
  {
    id: 10, kind: "cards", kicker: "Tema 03", title: "Adecuación funcional", tone: "funcional", badge: ["funcional"], cols: 3, numbered: true, visual: "puzzle",
    lead: "Si el software proporciona las funciones correctas para satisfacer las necesidades del usuario, explícitas e implícitas, bajo condiciones específicas.",
    cards: [
      { title: "Completitud funcional", text: "Evalúa si el conjunto de funciones cubre todas las tareas y objetivos del usuario. Si falta una función clave, la completitud es baja." },
      { title: "Corrección funcional", text: "Mide si el software entrega resultados precisos y correctos. Si los cálculos son erróneos, falla aunque la función exista." },
      { title: "Pertinencia funcional", text: "Valora si las funciones facilitan realmente las tareas del usuario, sin ser innecesariamente complejas o irrelevantes." },
    ],
  },
  {
    id: 11, kind: "cards", kicker: "Tema 03", title: "Eficiencia de desempeño", tone: "desempeno", badge: ["desempeno"], cols: 3, numbered: true, visual: "gauge",
    lead: "Rendimiento del software en relación con los recursos que consume (CPU, memoria, red, energía, etc.) bajo condiciones establecidas.",
    cards: [
      { title: "Comportamiento temporal", text: "Tiempos de respuesta y tasa de procesamiento (throughput). ¿Responde en un tiempo aceptable para el usuario?" },
      { title: "Utilización de recursos", text: "Cantidad y tipo de recursos que consume al ejecutar sus funciones. Un uso excesivo de memoria o CPU puede indicar ineficiencia." },
      { title: "Capacidad", text: "Límites máximos que soporta: usuarios concurrentes, tamaño de la base de datos o ancho de banda." },
    ],
  },
  {
    id: 12, kind: "cards", kicker: "Tema 03", title: "Compatibilidad", tone: "compat", badge: ["compat"], cols: 2, numbered: true, visual: "compat",
    lead: "Capacidad del producto para intercambiar información y/o realizar sus funciones compartiendo el mismo entorno (hardware o software) con otros productos o sistemas.",
    cards: [
      { title: "Coexistencia", text: "Funcionar eficientemente en un entorno compartido sin afectar negativamente a otros productos instalados en el mismo sistema." },
      { title: "Interoperabilidad", text: "Intercambiar información con otros sistemas y usarla de forma efectiva. Crucial para integrar APIs, servicios de terceros o sistemas heredados." },
    ],
  },
  {
    id: 13, kind: "cards", kicker: "Tema 04", title: "Usabilidad → Capacidad de interacción (1/2)", tone: "interaccion", badge: ["interaccion"], cols: 2, numbered: true,
    lead: "Mediciones específicas que verifican qué tan fácil, intuitivo y agradable es interactuar con el sistema para lograr objetivos sin frustraciones. La versión 2023 amplió el concepto para incluir inclusión y autodescriptividad.",
    cards: [
      { title: "Reconocibilidad de la adecuación", text: "El usuario entiende rápido si el software le sirve para lo que necesita (ej. una pantalla de inicio clara)." },
      { title: "Capacidad de aprendizaje", text: "Qué tan rápido aprende a usarlo alguien nuevo, sin leer un manual extenso." },
      { title: "Operabilidad", text: "Qué tan cómodo y sencillo es controlar y navegar el sistema en el día a día." },
      { title: "Protección contra errores de usuario", text: "Evita fallos graves del usuario (ej. pedir confirmación antes de borrar o validar formatos de fecha)." },
    ],
  },
  {
    id: 14, kind: "cards", kicker: "Tema 04", title: "Capacidad de interacción (2/2)", tone: "interaccion", badge: ["interaccion"], cols: 2, numbered: true,
    cards: [
      { title: "Involucramiento del usuario", pill: "Reemplaza a Estética de la interfaz", text: "La interfaz es atractiva, mantiene el interés y ofrece una experiencia visual agradable." },
      { title: "Inclusividad", pill: "Antes: Accesibilidad", text: "Cualquiera puede usarlo sin importar edad, idioma, cultura o capacidades físicas o visuales (accesibilidad)." },
      { title: "Asistencia al usuario", pill: "Antes: Accesibilidad", text: "Ofrece ayuda oportuna cuando alguien se atasca (ej. tooltips y mensajes de error que explican cómo solucionarlo)." },
      { title: "Autodescriptividad", pill: "Nueva 2023", text: "La interfaz se explica por sí sola con etiquetas, iconos y flujos lógicos, reduciendo la necesidad de ayuda externa." },
    ],
  },
  {
    id: 15, kind: "cards", kicker: "Tema 04", title: "Fiabilidad", tone: "fiabilidad", badge: ["fiabilidad"], cols: 2, numbered: true, visual: "heartbeat",
    lead: "Mediciones concretas que verifican la capacidad real del sistema para funcionar de manera estable, predecible y sin caídas durante un tiempo determinado.",
    cards: [
      { title: "Ausencia de fallos", en: "Faultlessness", pill: "Antes: Madurez", text: "Funciona en condiciones normales sin colgarse, lanzar errores inesperados ni corromper datos." },
      { title: "Disponibilidad", text: "Está activo y accesible cuando el usuario lo necesita (ej. un portal operativo las 24 horas)." },
      { title: "Tolerancia a fallos", text: "Si falla un componente, sigue funcionando (aunque sea de forma limitada) sin desplomarse." },
      { title: "Capacidad de recuperación", text: "Tras una caída (corte eléctrico o fallo de red), restaura sus datos y vuelve a operar rápido y sin pérdidas." },
    ],
  },
  {
    id: 16, kind: "cards", kicker: "Tema 04", title: "Seguridad", tone: "seguridad", badge: ["seguridad"], cols: 3, numbered: true,
    lead: "Mediciones concretas que verifican qué tan bien el software protege datos y funciones para que cada persona o rol acceda solo a lo que tiene autorizado.",
    cards: [
      { title: "Confidencialidad", text: "Solo las personas autorizadas ven la información (ej. contraseñas cifradas, datos médicos privados)." },
      { title: "Integridad", text: "Evita que los datos sean alterados o destruidos sin permiso, por atacantes o errores de transmisión." },
      { title: "No repudio", text: "Deja evidencia comprobable de una acción para que nadie pueda negarla (ej. firma digital, registro de transacciones)." },
      { title: "Responsabilidad (trazabilidad)", text: "Permite rastrear qué usuario hizo qué acción y cuándo (auditoría o historial de movimientos)." },
      { title: "Autenticidad", text: "Verifica que un usuario o sistema es quien dice ser (ej. usuario y clave, tokens o autenticación en dos pasos)." },
      { title: "Resistencia", pill: "Nueva 2023", text: "Capacidad de soportar, responder y recuperarse ante ataques maliciosos o intentos de intrusión activos." },
    ],
  },
  {
    id: 17, kind: "cards", kicker: "Tema 05", title: "Mantenibilidad (Maintainability)", tone: "mantenib", badge: ["mantenib"], cols: 3, numbered: true,
    lead: "Grado de eficacia y eficiencia con que un sistema puede modificarse para corregirlo, mejorarlo o adaptarlo a nuevos requisitos o a un entorno cambiante. Representa la sostenibilidad del software a largo plazo y el control de la deuda técnica.",
    cards: [
      { title: "Modularidad", text: "Sistema formado por módulos discretos, de modo que cambiar uno tenga impacto mínimo en los demás." },
      { title: "Reusabilidad", text: "Un activo o componente puede usarse en más de un sistema o en la construcción de otros activos." },
      { title: "Analizabilidad", text: "Facilidad para evaluar el impacto de un cambio, diagnosticar fallos e identificar las partes a modificar." },
      { title: "Modificabilidad", text: "Poder modificar el producto de forma efectiva y eficiente sin introducir defectos ni reducir la calidad." },
      { title: "Capacidad de ser probado (Testabilidad)", text: "Facilidad para establecer criterios de prueba y ejecutar pruebas que verifiquen su cumplimiento." },
    ],
  },
  {
    id: 18, kind: "cards", kicker: "Tema 05", title: "Portabilidad (modelo clásico 2011)", tone: "flex", badge: ["flex"], badgeLabel: "Portabilidad → Flexibilidad", cols: 3, numbered: true,
    lead: "Grado de eficacia y eficiencia con que un sistema o componente puede transferirse de un entorno de hardware, software, red u operación a otro.",
    band: "En 2023 se renombra Flexibilidad y suma Escalabilidad.",
    cards: [
      { title: "Adaptabilidad", text: "Se adapta a distintos entornos especificados (hardware, SO, navegadores) sin acciones distintas a las previstas." },
      { title: "Instalabilidad", text: "Se puede instalar y/o desinstalar con éxito, eficaz y eficientemente, en un entorno especificado." },
      { title: "Reemplazabilidad", text: "Puede sustituir a otro software especificado para el mismo propósito en el mismo entorno." },
    ],
  },
  { id: 19, kind: "scope", kicker: "Tema 05 · Versión 2023", title: "Cambios clave de la versión 2023: contexto y alcance", lead: "La norma se actualizó en noviembre de 2023 para adaptarse a la nube, los microservicios, el IoT y los sistemas con inteligencia artificial.", tone: "intro" },
  { id: 20, kind: "safety", kicker: "Tema 05 · Versión 2023", title: "De 8 a 9 características: aparece Safety", lead: "Se añade la característica Seguridad física (Safety). Hay que distinguirla de la Seguridad (Security).", tone: "safety", badge: ["safety"] },
  { id: 21, kind: "nameshift", kicker: "Tema 05 · Versión 2023", title: "Nuevos nombres y subcaracterísticas", tone: "intro", badge: ["flex", "interaccion", "fiabilidad"], badgeLabel: "Flexibilidad · Interacción · Fiabilidad" },
  { id: 22, kind: "table", kicker: "Tema 05 · Versión 2023", title: "Cuadro comparativo 2011 vs 2023", tone: "intro" },
  {
    id: 23, kind: "cards", kicker: "Tema 06", title: "Ventajas", tone: "intro", cols: 3, numbered: true,
    cards: [
      { title: "Lenguaje común", text: "Alinea a equipos técnicos, QA y negocio bajo criterios compartidos y sin ambigüedades." },
      { title: "Evaluación objetiva", text: "Permite integrar controles de calidad (quality gates) y pruebas medibles en todo el ciclo de desarrollo." },
      { title: "Visión integral y vigente", text: "Abarca desde la seguridad informática hasta la seguridad física y la escalabilidad moderna; clave incluso para verificar código generado con asistencia de IA." },
    ],
  },
  {
    id: 24, kind: "cards", kicker: "Tema 06", title: "Limitaciones", tone: "intro", cols: 2, numbered: true, visual: "balance",
    cards: [
      { title: "No define métricas directas", text: "Es un modelo conceptual; para medir cada atributo se combina con otras normas de la familia SQuaRE (como ISO/IEC 25023)." },
      { title: "Riesgo de sobreingeniería", text: "Maximizar las 9 características en proyectos pequeños o MVP dispara costos y plazos sin valor inmediato; exige priorizar." },
      { title: "Dependencia de múltiples herramientas", text: "Ninguna herramienta evalúa por sí sola todas las dimensiones del estándar de forma automática." },
      { title: "Compromisos entre atributos", text: "Mejorar al extremo una característica (por ejemplo, seguridad estricta) puede penalizar otra (como la rapidez de interacción o el rendimiento)." },
    ],
  },
  { id: 25, kind: "closing", kicker: "Tema 06", title: "Conclusiones", tone: "intro" },
];
