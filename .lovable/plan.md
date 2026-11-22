# Plan: Presentación web "ISO 25010" (25 diapositivas)

Seguiré al pie de la letra la especificación que subiste: textos exactos, colores, fuentes, iconos e interacciones. Abajo está el resumen de cómo la voy a construir.

## Diseño
- Estilo claro y editorial, como una ficha técnica: fondo marfil, cuadrícula milimetrada tenue y tarjetas blancas con una barra de color arriba.
- La portada y el cierre van sobre fondo oscuro, con la rueda de 9 colores girando.
- Cada característica tiene siempre su mismo color, icono y nombre.
- Tipografías: Bricolage Grotesque en títulos, Figtree en el texto y Geist Mono en etiquetas y términos en inglés.

## Estructura de cada diapositiva
- Barra de temas arriba, luego el encabezado (etiqueta, título y entradilla), después el contenido y abajo los controles.
- Tarjetas en rejilla: 3 columnas en escritorio, 2 en tablet y 1 en móvil. En móvil, si algo no cabe, la diapositiva se desplaza hacia abajo; nunca se recorta ni se encima.
- Máximo 6 tarjetas por diapositiva.

## Navegación
- Flechas, barra espaciadora, AvPág/RePág, botones anterior/siguiente y deslizar el dedo a los lados.
- F activa pantalla completa. La dirección de la página (#1 a #25) indica la diapositiva, así un enlace compartido abre la diapositiva correcta.
- La barra de 6 temas lleva a cada tema y muestra el contador "05 / 25". En móvil se reduce a 6 puntos.
- Una mini rueda en las diapositivas de características (10–18 y 20–21) resalta la característica actual.

## Animaciones
- Dentro de un mismo tema, la diapositiva se desliza suavemente. Al cambiar de tema, sube una cortina del color del tema nuevo.
- Los elementos entran uno tras otro y la barra de color de cada tarjeta se dibuja al aparecer.
- Si el dispositivo pide menos movimiento, solo habrá desvanecidos.

## Interacciones (con datos fijos)
- Diap. 2: las tarjetas del índice llevan a cada tema.
- Diap. 7: pestañas para las 5 características, con un pentágono que se ilumina.
- Diap. 9: rueda de 9 segmentos que se puede pulsar, con panel de detalle y ayudas al pasar el cursor.
- Diap. 19: interruptor 2011 / 2023. Diap. 20: Security / Safety. Diap. 21: nombre que alterna entre antes y después. Diap. 22: control 2011 / 2023 / Ambas.

## Fuera de alcance
No habrá servidor, inicio de sesión, base de datos ni guardado en el navegador. No se evalúa software real.

## Detalles técnicos
- Se instalan `framer-motion` y `lucide-react`. Las fuentes se cargan desde Google Fonts con un link en `__root.tsx` (con preconnect y display=swap).
- Los colores van como tokens en `src/styles.css` (en oklch y registrados en `@theme inline`); el tinte de las tarjetas se hace con `color-mix`.
- Archivos:
  - `src/deck/data.ts`: las características, los temas y la relación diapositiva → tema.
  - `src/deck/components/*`: Deck, TopicBar, WheelBadge, QualityWheel, Card, Pill, Tooltip, Backdrop, Curtain y SlideFrame.
  - `src/deck/slides/Slide01..25.tsx`: una por diapositiva, en un registro central.
- La presentación vive en `/`, que se reescribe en `src/routes/index.tsx` con un head() en español. El hash se sincroniza con `hashchange`, el título de la pestaña se actualiza, el foco pasa al h2 y hay una región aria-live.
- Al deslizar, solo cuentan los gestos horizontales (`touch-action: pan-y`).
- Las pruebas de vitest cubren la relación diapositiva ↔ tema y el hash ↔ índice.
