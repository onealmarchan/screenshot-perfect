import { describe, expect, it } from "vitest";
import { slideFromHash, showsTopicBar, topicOf, topicProgress } from "./topics";

describe("relación diapositiva ↔ tema", () => {
  it("asigna los rangos 3–6, 7–8, 9–12, 13–16, 17–22, 23–25", () => {
    const expected: Record<number, number> = { 2: 0, 3: 1, 6: 1, 7: 2, 8: 2, 9: 3, 12: 3, 13: 4, 16: 4, 17: 5, 22: 5, 23: 6, 25: 6 };
    for (const [s, t] of Object.entries(expected)) expect(topicOf(Number(s))).toBe(t);
  });
  it("la diapositiva 2 no tiene tramo activo", () => {
    expect([1, 2, 3, 4, 5, 6].map((t) => topicProgress(t, 2))).toEqual([0, 0, 0, 0, 0, 0]);
  });
  it("los temas anteriores quedan completos", () => {
    expect(topicProgress(1, 10)).toBe(1);
    expect(topicProgress(3, 10)).toBe(0.5);
  });
  it("oculta la barra en portada y cierre", () => {
    expect(showsTopicBar(1)).toBe(false);
    expect(showsTopicBar(25)).toBe(false);
    expect(showsTopicBar(2)).toBe(true);
  });
  it("lee el hash #1 a #25 y cae a 1 si es inválido", () => {
    expect(slideFromHash("#25")).toBe(25);
    expect(slideFromHash("#26")).toBe(1);
    expect(slideFromHash("")).toBe(1);
  });
});
