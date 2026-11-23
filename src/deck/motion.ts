export const EASE = [0.76, 0, 0.24, 1] as const;
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
export const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
export const bar = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: EASE, delay: 0.15 } },
};
