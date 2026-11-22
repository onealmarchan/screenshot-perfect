# Plan: Presentación web "ISO 25010" (25 diapositivas)

## Presentación expositiva de **25 diapositivas**, en español, clara, editorial y técnica, optimizada para 16:9 y pantalla completa, pero con diseño fluido y plenamente responsive. Los textos, tablas y datos se usan **tal cual los entregué**, sin resumir, reordenar ni reescribir. No hay backend, autenticación, base de datos, almacenamiento local ni evaluación real de calidad: todo es contenido y estados fijos.

### Implementación

#### 1. Base visual

- Conservar la arquitectura actual (React + TypeScript + Tailwind). Añadir Framer Motion y lucide-react.
- Fuentes de Google Fonts con `display=swap` y `preconnect`: **Bricolage Grotesque** 700/800 (títulos), **Figtree** 400/500/600 (cuerpo) y **Geist Mono** 400/500 (etiquetas, numeración y términos en inglés), con fallbacks del sistema.
- Tokens semánticos como variables CSS en `src/styles.css`, sin colores escritos a mano:
  - Neutros: `--bg` `#F7F5F0` · `--surface` `#FFFFFF` · `--surface-2` `#EFEBE2` · `--border` `rgba(15,23,42,0.12)` · `--ink` `#0F172A` · `--ink-2` `#334155` · `--muted` `#475569` · `--ink-bg` `#0B1020` (portada y cierre).
  - Por característica: funcional `#2563EB` · desempeño `#F59E0B` · compatibilidad `#0D9488` · interacción `#DB2777` · fiabilidad `#16A34A` · seguridad `#DC2626` · mantenibilidad `#7C3AED` · flexibilidad `#EA580C` · safety `#65A30D` · calidad en uso `#0891B2` · intro, ventajas, limitaciones y conclusiones `#4F46E5`.
  - Fondo de tarjeta: tinte del color al 10 a 14 % sobre `--surface` con `color-mix`. Gradiente de marca (funcional → interacción → desempeño) solo para detalles y una palabra clave de título.
- **Contraste:** todo el texto usa `--ink` o `--ink-2`, nunca un color vivo sobre fondo claro; mínimo 4,5:1. Los colores vivos van en bordes, rellenos, iconos y barras. Ningún significado depende solo del color: cada característica lleva su icono y su nombre.
- **Tarjetas:** blancas, borde de 1 px, `rounded-2xl`, barra superior de 6 px del color de la característica, sombra suave, numeración en Geist Mono. Pastillas `rounded-full` para "Nueva 2023", "Renombrada" y "Antes: …".
- **Fondo claro:** cuadrícula milimetrada (líneas de `--ink` al 4 %), degradado radial cálido en una esquina y 2 o 3 formas geométricas suaves que derivan en ciclos de 25 a 40 s. Todo con `pointer-events: none`.
- **Iconos por característica:** `Puzzle`, `Gauge`, `Plug`, `MousePointerClick`, `Activity`, `Lock`, `Wrench`, `Expand` y `HardHat`, en el orden de la tabla de colores (Adecuación funcional a Seguridad física). Las subcaracterísticas llevan un chip numérico en mono, sin icono.

#### 2. Layout responsive (nada sobrepuesto ni amontonado)

- Rejilla de filas `auto auto 1fr auto` (barra de temas / encabezado / contenido / controles) con `100dvh` y padding `clamp(20px, 4vw, 72px)`. Ancho máximo del contenido: 1480 px, centrado. `min-height: 0` y `min-width: 0` en los hijos.
- Nunca texto con `position: absolute`. Los tooltips son la única excepción (solo con hover o foco, dentro de la ventana, se cierran con Escape).
- Los diagramas viven en su propia celda, con `viewBox` y `max-height: 100%`, sin invadir el texto.
- **Breakpoints:** ≥ 1280 px (hasta 3 columnas; diapositivas con visual: texto 7/12 y visual 5/12) · 768 a 1279 px (2 columnas; el visual pasa debajo del encabezado y se reduce) · < 768 px (1 columna; si no cabe, scroll vertical interno con degradado en el borde inferior, sin recortar) · horizontal con altura < 500 px (ocultar formas decorativas, reducir visuales y escalar texto con `vh`).
- **Tipografía fluida:** portada `clamp(3rem, 3vw + 5vh, 7rem)` (interlineado 1,0) · h2 `clamp(1.75rem, 1.4vw + 2.2vh, 3rem)` (1,1) · entradilla `clamp(1.0625rem, 0.6vw + 1.2vh, 1.5rem)` (1,5; máx. 62ch) · título de tarjeta `clamp(1.125rem, 0.5vw + 1.2vh, 1.5rem)` (1,2) · texto de tarjeta `clamp(1rem, 0.4vw + 1vh, 1.25rem)` (1,55) · etiquetas mono `clamp(0.75rem, 0.4vw + 0.6vh, 0.95rem)` en mayúsculas con tracking `0.14em`. Mínimos absolutos: 16 px y 12 px. `text-wrap: balance` en títulos y `pretty` en párrafos.
- **Espaciado** (escala de 8 px): entre bloques `clamp(16px, 2.5vh, 32px)`, entre tarjetas `clamp(12px, 1.8vh, 24px)`, padding de tarjeta `clamp(16px, 2vh, 28px)`.
- **Densidad:** máximo 6 tarjetas por diapositiva, de 24 palabras o menos, y una entradilla de 35 palabras o menos.
- **Rejilla por diapositiva** (no se aplica una rejilla genérica 3/2/1):


| Diapositivas | Rejilla en escritorio                    |
| ------------ | ---------------------------------------- |
| 1            | Texto + rueda a la derecha               |
| 2            | 3×2 de botones (2×3 en tablet)           |
| 3            | Viñetas + línea de tiempo 2011 → 2023    |
| 4            | Línea de tiempo horizontal de 6 pasos    |
| 5            | 2×2                                      |
| 6            | 5 filas (tarjetas en móvil)              |
| 7            | Pestañas + pentágono                     |
| 8            | 3 tarjetas + banda "5 → 3"               |
| 9            | Rueda grande + panel de detalle          |
| 10, 11, 12   | 3, 3 y 2 tarjetas, con visual pequeño    |
| 13, 14, 15   | 2×2                                      |
| 16           | 3×2                                      |
| 17           | 3 + 2                                    |
| 18           | 3 tarjetas + banda inferior              |
| 19           | Chips + interruptor + visual             |
| 20           | 2 tarjetas + interruptor + contador      |
| 21           | 3 tarjetas                               |
| 22           | Tabla + control segmentado               |
| 23           | 3 tarjetas                               |
| 24           | 2×2 + balanza                            |
| 25           | 3 conclusiones + cierre + rueda reducida |


#### 3. Barra de temas, rueda y navegación

- **Barra superior** de 6 tramos que se llenan con el progreso. Cada tramo es un `button` hacia la diapositiva 3, 7, 9, 13, 17 o 23, con el nombre del tema al pasar el cursor o enfocar. Contador `05 / 25` a la derecha. En móvil, 6 puntos y el nombre del tema actual debajo.
- Relación diapositiva ↔ tema: 3 a 6 → 01 · 7 y 8 → 02 · 9 a 12 → 03 · 13 a 16 → 04 · 17 a 22 → 05 · 23 a 25 → 06. La barra se **oculta en la portada y en el cierre (diapositiva 25)** y en la diapositiva 2 se ve sin tramo activo.
- **Mini rueda** (≈ 64 px, `aria-hidden`) con el segmento activo iluminado, solo en las diapositivas 10 a 18 y 20 a 21, junto al nombre de la característica.
- **Navegación:** flechas, barra espaciadora, AvPág/RePág, botones anterior/siguiente accesibles y deslizamiento solo horizontal (`touch-action: pan-y`). Las flechas siguen funcionando con un control enfocado. `F` activa pantalla completa y se maneja la salida.
- **Hash** `#1` a `#25` con carga inicial, enlaces compartidos y botones atrás/adelante. Título de pestaña con número y nombre. Al cambiar de diapositiva, el foco pasa al título y se anuncia con `aria-live="polite"`.

#### 4. Movimiento

- **Mismo tema:** deslizamiento horizontal de 40 px con desvanecido, 0,45 s. **Cambio de tema:** cortina del color del tema nuevo que sube de abajo hacia arriba con `clip-path: inset`, 0,6 s. Easing `[0.76, 0, 0.24, 1]`.
- Entradas escalonadas de 0,06 s (etiqueta y título, entradilla, tarjetas, visual). Las tarjetas suben 16 px y la barra de color se dibuja con `scaleX`. Hover y foco: elevación de 4 px con sombra más marcada.
- **Movimiento continuo sutil:** formas del fondo, rotación de 120 s de la rueda con iluminación secuencial de sus segmentos, aguja del medidor, línea de latido, balanza y brillo de las líneas de conexión.
- `prefers-reduced-motion`: solo desvanecidos, sin cortina ni movimiento continuo, y cambios de estado instantáneos.

#### 5. Interacciones (datos fijos)

- Todas son `button` reales con `aria-pressed`, `aria-selected` o `aria-expanded`, foco visible y uso con teclado.
- Diap. 2: las 6 tarjetas llevan a su tema. Diap. 7: pestañas de las 5 características con el pentágono que se ilumina (en varias líneas, sin scroll horizontal). Diap. 9: rueda clicable con panel de detalle y tooltips (el panel pasa debajo de la rueda en móvil).
- Diap. 19: interruptor "2011 / 2023" con un bloque que se divide en dos. Diap. 20: interruptor "Security / Safety" con las dos tarjetas visibles y el contador "8 → 9". Diap. 21: título que alterna de "antes" a "después" con hover, foco y botón "Ver cambio". Diap. 22: control segmentado "2011 / 2023 / Ambas" que atenúa la columna no elegida.

#### 6. Contenido

- Las 25 diapositivas se montan exactamente con los textos, tablas, pastillas, iconos y colores del prompt original: portada con institución, acreditable, profesora y los 5 estudiantes, índice de 6 tarjetas, entradillas y tarjetas literales, y tabla comparativa de la diapositiva 22.
- Todo el contenido vive en un único archivo tipado (`src/data/slides.ts`) y las 9 características en otro, que alimenta la rueda y las insignias.
- Componentes: `SlideLayout`, `TopicBar`, `SlideNavigator`, `PaperBackground`, `CharacteristicCard`, `CardGrid`, `WheelBadge`, `QualityWheel`, `LifecycleTimeline`, `ContextTabs`, `ScopeSplit`, `SecuritySafetyToggle`, `NameShift`, `ComparisonTable`, `Gauge`, `HeartbeatLine`, `BalanceScale` y `CurtainTransition`.

### Detalles técnicos

- React + TypeScript (arquitectura actual), Tailwind CSS, Framer Motion y lucide-react, sin más dependencias.
- Fuentes con etiquetas `link` en la raíz; la presentación vive en `/` con metadatos propios (título, descripción, Open Graph y Twitter).
- Diagramas decorativos con `aria-hidden`; los que informan, con `role="img"` y `aria-label`.
- No se añade base de datos, autenticación, API ni almacenamiento local.

### Validación antes de entregar

- Revisar las 25 diapositivas en 1920×1080, 1440×900, 1366×768, 1024×768, 820×1180, 390×844 y 844×390, con capturas. Prestar atención a las diapositivas 13 a 17 y 22.
- Verificar que no hay solapes, recortes ni amontonamiento, que el texto cumple 4,5:1 de contraste y los mínimos de 16 y 12 px, y que la tabla de la diapositiva 22 no hace scroll horizontal en móvil.
- Confirmar que la barra marca el tema correcto, que cada tramo lleva a su diapositiva inicial y que se oculta en la portada y el cierre.
- Probar teclado, gestos, hash, pantalla completa, foco visible, controles interactivos y movimiento reducido; consola sin errores.