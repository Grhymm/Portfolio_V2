"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  fadeInUp,
  staggerContainer,
  spinSlow,
  floatY,
} from "@/lib/animations";

const PLACEHOLDER_3D_SHAPE =
  "https://placehold.co/480x480/0a2e17/22ff66/png?text=3D+Shape";

const titleWords = [
  { text: "Start" },
  { text: "building" },
  { text: "websites", pill: true },
  { text: "people" },
  { text: "remember" },
];

const stats = [
  { target: 10, suffix: "+", label: "Year of experience" },
  { target: 6, suffix: "x", label: "Industry Awards" },
];

const clientLogos = [0, 1, 2, 3, 4];
const marqueeLogos = [...clientLogos, ...clientLogos];

function RotatingBadge() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full">
      <defs>
        <path
          id="badge-circle"
          d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
        />
      </defs>
      <text
        fontSize="10.5"
        letterSpacing="2"
        className="fill-current text-white/70 uppercase"
      >
        <textPath href="#badge-circle">
          Award winning agency &bull; Since 2022 &bull; Award winning agency
          &bull; Since 2022 &bull;
        </textPath>
      </text>
    </svg>
  );
}

function LogoipsumMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-1.5 text-muted",
        className,
      )}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-muted" />
      <span className="text-sm font-semibold tracking-tight">Logoipsum</span>
    </div>
  );
}

function Visual3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative shrink-0 self-center xl:self-start"
    >
      <motion.div variants={floatY} animate="animate">
        <Image
          src={PLACEHOLDER_3D_SHAPE}
          alt="3D shape"
          width={480}
          height={480}
          sizes="(min-width: 1024px) 256px, (min-width: 640px) 224px, 192px"
          className="h-auto w-48 sm:w-56 lg:w-64"
        />
      </motion.div>
      <motion.div
        variants={spinSlow}
        animate="animate"
        className="absolute -bottom-8 -left-8 h-24 w-24"
      >
        <RotatingBadge />
      </motion.div>
    </motion.div>
  );
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 1.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, [inView, count, target]);

  return (
    <motion.p
      ref={ref}
      className="text-[clamp(26px,3.2vw,36px)] font-medium text-foreground"
    >
      {display}
    </motion.p>
  );
}

function StatsRow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={staggerContainer(0.15)}
      className="flex flex-col gap-10"
    >
      {stats.map(({ target, suffix, label }) => (
        <motion.div key={label} variants={fadeInUp}>
          <CountUp target={target} suffix={suffix} />
          <p className="text-sm text-muted">{label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ClientsRow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={staggerContainer(0.08)}
      className="flex flex-col gap-4 border-t border-card-border pt-8"
    >
      <motion.div
        variants={fadeInUp}
        className="flex items-center gap-2 text-sm text-muted"
      >
        <Globe className="h-4 w-4" />
        Our clients (2015-25&copy;)
      </motion.div>

      <div className="overflow-hidden">
        <motion.div
          className="flex items-center gap-8"
          animate={inView ? { x: ["0%", "-50%"] } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {marqueeLogos.map((i, idx) => (
            <LogoipsumMark
              key={idx}
              className={i === 4 ? "opacity-40" : ""}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer(0.15)}
      className="flex w-full min-w-0 flex-col gap-10"
    >
      <motion.div variants={fadeInUp} className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card text-xl">
          🧑‍💻
        </div>
        <div>
          <p className="font-heading font-medium text-foreground">
            Alexander Isak
          </p>
          <p className="text-sm text-muted">
            UI Designer &amp; No-Code Developer
          </p>
        </div>
      </motion.div>

      <div className="relative flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
        <motion.h1
          variants={staggerContainer(0.08)}
          className="flex max-w-2xl flex-wrap items-center gap-x-4 gap-y-2 text-[clamp(32px,4.5vw,48px)] font-medium leading-none tracking-[-0.01em] text-foreground"
        >
          {titleWords.map(({ text, pill }) => (
            <motion.span
              key={text}
              variants={fadeInUp}
              className={
                pill
                  ? "inline-block rounded-full bg-[linear-gradient(180deg,#00DE51_0%,rgba(0,222,81,0.4)_100%)] px-5 text-black"
                  : undefined
              }
            >
              {text}
            </motion.span>
          ))}
        </motion.h1>

        <Visual3D />
      </div>

      <StatsRow />
      <ClientsRow />
    </motion.div>
  );
}
