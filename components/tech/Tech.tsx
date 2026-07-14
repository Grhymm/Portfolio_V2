"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Boxes } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const fillEase = [0.16, 1, 0.3, 1] as const;
const STAGGER_STEP = 0.15;
const FILL_DURATION = 2.4;

interface TechTool {
  name: string;
  description: string;
  percent: number;
  logo: string;
  logoWidth: number;
  logoHeight: number;
}

const tools: TechTool[] = [
  {
    name: "Figma",
    description: "Leading design tool",
    percent: 80,
    logo: "https://tfisak.vercel.app/assets/images/section/tech-1.svg",
    logoWidth: 19,
    logoHeight: 28,
  },
  {
    name: "Framer",
    description: "No-code website builder",
    percent: 90,
    logo: "https://tfisak.vercel.app/assets/images/section/tech-2_dark.svg",
    logoWidth: 18,
    logoHeight: 28,
  },
  {
    name: "Adobe Photoshop",
    description: "Raster graphics editor",
    percent: 60,
    logo: "https://tfisak.vercel.app/assets/images/section/tech-3.svg",
    logoWidth: 29,
    logoHeight: 28,
  },
];

function TechRow({
  tool,
  inView,
  index,
}: {
  tool: TechTool;
  inView: boolean;
  index: number;
}) {
  const delay = index * STAGGER_STEP;
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, tool.percent, {
      duration: FILL_DURATION,
      delay,
      ease: fillEase,
    });
    return controls.stop;
  }, [inView, count, tool.percent, delay]);

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col gap-4 border-b border-card-border py-8 sm:flex-row sm:items-center sm:gap-8 sm:py-10"
    >
      <div className="flex items-center gap-4 sm:w-52 sm:shrink-0 sm:gap-5">
        {/* Fixed dark chip: the Framer mark is a white-only asset that needs a
        guaranteed-dark backdrop, same principle as the HeroCard/WorkCard photo overlays */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#1A1A1A]">
          <Image
            src={tool.logo}
            alt={`${tool.name} logo`}
            width={tool.logoWidth}
            height={tool.logoHeight}
            className="h-8 w-auto"
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-heading text-base font-medium text-foreground sm:text-lg">
            {tool.name}
          </p>
          <p className="text-sm text-muted">{tool.description}</p>
        </div>
      </div>

      <div
        role="progressbar"
        aria-label={`${tool.name} proficiency`}
        aria-valuenow={tool.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-12 w-full overflow-hidden rounded-full bg-card sm:flex-1"
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: inView ? `${tool.percent}%` : "0%" }}
          transition={{ duration: FILL_DURATION, delay, ease: fillEase }}
          className="absolute inset-y-0 left-0 rounded-full bg-foreground/10"
        >
          <span className="absolute right-1 top-1/2 flex h-10 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full bg-card px-4 text-sm font-medium text-foreground">
            <motion.span>{display}</motion.span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Tech() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: "0px 0px 120px 0px",
  });

  return (
    <section id="tech">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer(0.15)}
        className="flex w-full flex-col gap-10 lg:gap-14"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-card-border bg-card px-4 py-1.5"
        >
          <Boxes className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium uppercase tracking-wider text-foreground">
            Tech Stack
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="max-w-3xl text-[clamp(26px,2.8vw_+_5px,36px)] font-medium leading-[clamp(32px,3.2vw_+_7px,42px)] text-foreground"
        >
          See how my expertise with these tools drives better results
        </motion.h2>

        <motion.div variants={fadeInUp}>
          {tools.map((tool, i) => (
            <TechRow key={tool.name} tool={tool} inView={inView} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
