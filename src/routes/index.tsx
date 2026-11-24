import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/deck/Deck";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ISO 25010 — Modelo de calidad del producto de software" },
    { name: "description", content: "Presentación de 25 diapositivas en español sobre ISO/IEC 25010, sus nueve características y los cambios de 2023." },
    { property: "og:title", content: "ISO 25010 — Calidad del software" },
    { property: "og:description", content: "Las características de calidad del producto y la evolución de ISO/IEC 25010:2011 a 2023." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Deck,
});
