"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, pulseGlow, staggerContainer } from "@/lib/animations";

interface TimelineEntry {
  period: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  role: string;
  description: string;
}

const timeline: TimelineEntry[] = [
  {
    period: "2023 - Now",
    logo: "https://tfisak.vercel.app/assets/images/logo/logo-4.svg",
    logoWidth: 32,
    logoHeight: 32,
    role: "Independent Designer & No-Code Developer",
    description:
      "Helping startups and creative teams launch websites, scale their brand identity, and build powerful no-code products with Framer.",
  },
  {
    period: "2021 - 2023",
    logo: "https://tfisak.vercel.app/assets/images/item/edu-2_dark.svg",
    logoWidth: 29,
    logoHeight: 32,
    role: "Web & Brand Designer at Creative Studio",
    description:
      "Led projects across branding and digital design, delivering interfaces and websites that balanced usability with striking visual impact.",
  },
  {
    period: "2019 - 2021",
    logo: "https://tfisak.vercel.app/assets/images/item/edu-3_dark.svg",
    logoWidth: 120,
    logoHeight: 32,
    role: "Junior Designer at Design Academy",
    description:
      "Gained hands-on experience in brand systems and interface design while working closely with mentors to sharpen creative direction.",
  },
];

const GRID_COLS = "grid-cols-[72px_28px_1fr] sm:grid-cols-[96px_32px_1fr]";
const LINE_LEFT = "left-[86px] sm:left-[112px]";

function TimelineLine({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 55%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={cn("absolute top-0 bottom-0 w-px bg-card-border", LINE_LEFT)}>
      <motion.div
        style={{ scaleY }}
        className="absolute inset-0 origin-top bg-accent"
      />
    </div>
  );
}

function TimelineRow({
  entry,
  isCurrent,
}: {
  entry: TimelineEntry;
  isCurrent: boolean;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn("grid items-start", GRID_COLS)}
    >
      <p className="pt-1 text-[clamp(16px,0.8vw_+_13px,18px)] font-medium text-muted">
        {entry.period}
      </p>

      <div className="flex justify-center pt-2">
        <span className="relative flex h-3.5 w-3.5">
          {isCurrent && (
            <motion.span
              variants={pulseGlow}
              animate="animate"
              className="absolute inline-flex h-full w-full rounded-full bg-accent"
            />
          )}
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent" />
        </span>
      </div>

      <div className="min-w-0">
        <Image
          src={entry.logo}
          alt={`${entry.role} — logo`}
          width={entry.logoWidth}
          height={entry.logoHeight}
          className="mb-6 h-9 w-auto sm:h-10"
        />
        <p className="mb-2 font-heading text-[clamp(18px,1vw_+_14px,22px)] font-medium text-foreground">
          {entry.role}
        </p>
        <p className="max-w-[600px] text-sm leading-[1.5] text-muted">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Education() {
  const ref = useRef(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="education">
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
          <Briefcase className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium uppercase tracking-wider text-foreground">
            Education &amp; Experience
          </span>
        </motion.div>

        <motion.div
          ref={timelineRef}
          variants={staggerContainer(0.12)}
          className="relative flex flex-col gap-16 sm:gap-20 lg:gap-24"
        >
          <TimelineLine containerRef={timelineRef} />

          {timeline.map((entry, i) => (
            <TimelineRow key={entry.period} entry={entry} isCurrent={i === 0} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
