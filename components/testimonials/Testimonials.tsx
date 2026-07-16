"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
  Quote,
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  photo: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Daniel Ruiz",
    role: "Head of Product, Tempo App",
    quote:
      "Working with Donel was seamless. The website came out fast, modern, and easy to update—exactly what our team needed.",
    photo: "https://tfisak.vercel.app/assets/images/section/tes-1.jpg",
  },
  {
    name: "Sophia Lee",
    role: "Co-Founder, Horizon Finance",
    quote:
      "Donel shaped our vision into a strong brand. The process was clear, fast, and the result gave our startup the professional edge we needed.",
    photo: "https://tfisak.vercel.app/assets/images/section/tes-2.jpg",
  },
  {
    name: "Michael Anders",
    role: "Marketing Director, Flowly",
    quote:
      "Despite a tight launch schedule, Donel delivered a clean, flexible site in Framer. It's modern, easy to manage, and fits our needs perfectly.",
    photo: "https://tfisak.vercel.app/assets/images/section/tes-3.jpg",
  },
  {
    name: "Ava Thompson",
    role: "Founder, Northlane Studio",
    quote:
      "Donel brought both design sense and technical speed to the table. We went from a rough idea to a polished, no-code site in under two weeks.",
    photo: "https://placehold.co/640x720/111111/3d3d3d/png?text=Portrait",
  },
];

const AUTOPLAY_DELAY = 5500;

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 32 : -32,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -32 : 32,
  }),
};

const photoVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 16 : -16,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -16 : 16,
  }),
};

function StatCounter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [inView, count, target]);

  return (
    <div ref={ref} className="flex min-w-[130px] flex-col gap-2">
      <motion.p className="font-heading text-3xl font-medium text-foreground">
        {display}
      </motion.p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

export function Testimonials() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const total = testimonials.length;
  const current = testimonials[index];

  function goPrev() {
    setSlide(([i]) => [(i - 1 + total) % total, -1]);
  }

  function goNext() {
    setSlide(([i]) => [(i + 1) % total, 1]);
  }

  useEffect(() => {
    if (!inView || isPaused) return;
    const id = setInterval(() => {
      setSlide(([i]) => [(i + 1) % total, 1]);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [inView, isPaused, total]);

  return (
    <section
      id="testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer(0.15)}
        className="flex w-full flex-col gap-6 lg:gap-8"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-card-border bg-card px-4 py-1.5"
        >
          <MessageSquareQuote className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium uppercase tracking-wider text-foreground">
            Testimonials
          </span>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 items-start gap-6 sm:grid-cols-[3fr_2fr] sm:gap-8"
        >
          <div className="order-2 flex flex-col gap-6 sm:order-1">
            <h2 className="text-[clamp(26px,2.8vw_+_5px,36px)] font-medium leading-[clamp(32px,3.2vw_+_7px,42px)] text-foreground">
              Here&apos;s what people are saying
            </h2>

            <div className="flex flex-wrap gap-6 sm:gap-10">
              <StatCounter target={26} suffix="+" label="Finalized projects" />
              <StatCounter target={98} suffix="%" label="Client satisfaction" />
            </div>
          </div>

          <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-[360px] shrink-0 overflow-hidden rounded-3xl border border-card-border sm:order-2 sm:mx-0 sm:ml-auto">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                variants={photoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={current.photo}
                  alt={current.name}
                  fill
                  sizes="(min-width: 640px) 40vw, 360px"
                  className="object-cover"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              <Quote className="h-5 w-5 text-accent" aria-hidden="true" />

              <p className="max-w-3xl font-heading text-[clamp(19px,2vw,26px)] font-medium leading-tight text-muted">
                {current.quote}
              </p>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted" aria-hidden="true">
                  {index + 1}/{total}
                </span>
                <div className="flex flex-col">
                  <p className="font-medium text-foreground">{current.name}</p>
                  <p className="text-sm text-muted">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-card-border text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-card-border text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
