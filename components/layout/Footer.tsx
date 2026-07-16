"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-card-border">
      <Container className="max-w-7xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={staggerContainer(0.15)}
          className="flex flex-col gap-10 py-16 sm:py-20"
        >
          <motion.blockquote
            variants={fadeInUp}
            className="ml-auto flex max-w-xl flex-col items-end gap-3 text-right"
          >
            <p className="font-heading text-xl italic leading-snug text-muted sm:text-2xl">
              &ldquo;Design is not just what it looks like and feels like.
              Design is how it works.&rdquo;
            </p>
            <cite className="text-sm not-italic text-muted">
              — Steve Jobs
            </cite>
          </motion.blockquote>

          <motion.div variants={fadeInUp} className="h-px w-full bg-card-border" />

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm text-muted">
              All rights reserved © {year} Atarga Ondo Donel Portfolio
            </p>
            <Logo className="h-6 w-6 opacity-50" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
}
