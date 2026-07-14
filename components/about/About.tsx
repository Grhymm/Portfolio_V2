"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  MotionValue,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Award {
  title: string;
  org: string;
  year: string;
  image: string;
}

const awards: Award[] = [
  {
    title: "Website of the Day",
    org: "CSSDA",
    year: "2019",
    image: "https://tfisak.vercel.app/assets/images/section/award-1.jpg",
  },
  {
    title: "Public Awards - UI",
    org: "CSSDA",
    year: "2019",
    image: "https://tfisak.vercel.app/assets/images/section/award-2.jpg",
  },
  {
    title: "Public Awards - INN",
    org: "CSSDA",
    year: "2019",
    image: "https://tfisak.vercel.app/assets/images/section/award-3.jpg",
  },
  {
    title: "Site of the Month",
    org: "Awwwards",
    year: "2018",
    image: "https://tfisak.vercel.app/assets/images/section/award-4.jpg",
  },
  {
    title: "Site of the Day",
    org: "Awwwards",
    year: "2017",
    image: "https://tfisak.vercel.app/assets/images/section/award-5.jpg",
  },
];

const PREVIEW_WIDTH = 220;
const PREVIEW_HEIGHT = 311;

function AwardPreview({
  award,
  mouseX,
  mouseY,
}: {
  award: Award | null;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const springX = useSpring(mouseX, { stiffness: 300, damping: 32, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 32, mass: 0.4 });
  const x = useTransform(springX, (v) => v - PREVIEW_WIDTH / 2);
  const y = useTransform(springY, (v) => v - PREVIEW_HEIGHT / 2);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
      animate={{ opacity: award ? 1 : 0, scale: award ? 1 : 0.85 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="pointer-events-none absolute left-0 top-0 z-30 hidden overflow-hidden rounded-2xl bg-card lg:block"
    >
      {award && (
        <Image
          key={award.image}
          src={award.image}
          alt={`${award.title} preview`}
          fill
          sizes="220px"
          className="object-cover"
        />
      )}
    </motion.div>
  );
}

function AwardRow({
  award,
  isActive,
  isDimmed,
  onEnter,
}: {
  award: Award;
  isActive: boolean;
  isDimmed: boolean;
  onEnter: () => void;
}) {
  return (
    <motion.li
      variants={fadeInUp}
      onMouseEnter={onEnter}
      className={cn(
        "flex items-center justify-between border-b border-card-border py-7 transition-opacity duration-300 sm:py-8",
        isDimmed && "lg:opacity-40",
      )}
    >
      <div>
        <p
          className={cn(
            "font-heading text-[clamp(18px,1.3vw_+_9px,22px)] font-medium leading-tight transition-colors duration-300",
            isActive ? "text-foreground" : "text-foreground/85",
          )}
        >
          {award.title}
        </p>
        <p className="mt-2 text-sm text-muted">{award.org}</p>
      </div>

      <p
        className={cn(
          "font-heading text-[clamp(18px,1.3vw_+_9px,22px)] font-medium leading-tight transition-colors duration-300",
          isActive ? "text-foreground" : "text-foreground/85",
        )}
      >
        {award.year}
      </p>
    </motion.li>
  );
}

function AwardsList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: React.MouseEvent<HTMLUListElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  const activeAward = activeIndex !== null ? awards[activeIndex] : null;

  return (
    <motion.ul
      variants={staggerContainer(0.08)}
      aria-label="Awards and recognitions"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveIndex(null)}
      className="relative flex flex-col border-t border-card-border"
    >
      {awards.map((award, i) => (
        <AwardRow
          key={award.title}
          award={award}
          isActive={activeIndex === i}
          isDimmed={activeIndex !== null && activeIndex !== i}
          onEnter={() => setActiveIndex(i)}
        />
      ))}
      <AwardPreview award={activeAward} mouseX={mouseX} mouseY={mouseY} />
    </motion.ul>
  );
}

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer(0.15)}
        className="flex w-full flex-col gap-8 lg:gap-10"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-card-border bg-card px-4 py-1.5"
        >
          <User className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium uppercase tracking-wider text-foreground">
            About
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="max-w-3xl text-[clamp(26px,2.8vw_+_5px,36px)] font-medium leading-[clamp(32px,3.2vw_+_7px,42px)] text-foreground"
        >
          Designing brands and websites with clarity, creativity, and no-code
          speed
        </motion.h2>

        <motion.div
          variants={staggerContainer(0.12)}
          className="flex max-w-[700px] flex-col gap-4"
        >
          <motion.p variants={fadeInUp} className="text-sm leading-[1.5] text-muted">
            I combine web design, brand identity, and no-code development to
            help businesses move faster while staying true to their
            personality.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-sm leading-[1.5] text-muted">
            Every project is approached with both strategy and style—making
            sure design isn&apos;t just good-looking, but also purposeful and
            effective.
          </motion.p>
        </motion.div>

        <AwardsList />
      </motion.div>
    </section>
  );
}
