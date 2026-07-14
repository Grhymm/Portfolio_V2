import { Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
};

export function staggerContainer(
  staggerChildren = 0.12,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

export const blinkCursor: Variants = {
  animate: {
    opacity: [1, 0, 1],
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
  },
};

export const pulseGlow: Variants = {
  animate: {
    scale: [1, 1.6, 1],
    opacity: [0.7, 0, 0.7],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

export const spinSlow: Variants = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

export const floatY: Variants = {
  animate: {
    y: [0, -16, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};
