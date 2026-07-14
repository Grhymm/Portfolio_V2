"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { workProjects, type WorkProject } from "@/lib/work-data";
import { useWork } from "@/lib/work-context";

function WorkBadge() {
  return (
    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-card-border bg-card px-4 py-1.5">
      <Sparkles className="h-3.5 w-3.5 text-accent" />
      <span className="text-xs font-medium uppercase tracking-wider text-foreground">
        Work Highlights
      </span>
    </div>
  );
}

function ProjectStackCard({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const project = workProjects[index];
  const step = 1 / total;

  // This card's own rise: slides up over the first half of its tranche,
  // then holds in place for the second half. Card 0 never rises — it's
  // the base layer, already in place from the start.
  const slideStart = index * step;
  const slideEnd = slideStart + step / 2;

  // The depth cue on this card while the *next* card rises over it —
  // shares the next card's slide window so the recede stays in lockstep.
  const nextSlideStart = slideStart + step;
  const nextSlideEnd = nextSlideStart + step / 2;

  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [slideStart, slideEnd],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"],
    { clamp: true },
  );

  const scale = useTransform(
    scrollYProgress,
    index === total - 1 ? [0, 1] : [nextSlideStart, nextSlideEnd],
    index === total - 1 ? [1, 1] : [1, 0.96],
    { clamp: true },
  );

  return (
    <motion.div
      style={{ y, scale, zIndex: index + 1 }}
      className="absolute inset-0 overflow-hidden rounded-3xl border border-card-border shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <Image
        src={project.image}
        alt={`${project.title} — project preview`}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        loading="lazy"
        className="object-cover"
      />
    </motion.div>
  );
}

function ProgressBar({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const step = 1 / workProjects.length;
  const start = index * step;
  const end = (index + 1) * step;
  const scaleX = useTransform(scrollYProgress, [start, end], [0, 1], {
    clamp: true,
  });

  return (
    <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-card-border">
      <motion.div
        style={{ scaleX }}
        className="h-full origin-left rounded-full bg-accent"
      />
    </div>
  );
}

function MobileProjectCard({
  project,
  index,
  total,
}: {
  project: WorkProject;
  index: number;
  total: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <p className="font-heading text-lg font-medium text-foreground">
          {project.title}
        </p>
        <p className="shrink-0 pt-1 text-sm text-muted">
          <span className="text-foreground/90">{index + 1}</span> / {total}
        </p>
      </div>

      <p className="text-sm leading-[1.5] text-muted">{project.description}</p>

      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted">Year</p>
          <p className="text-sm font-medium text-foreground">{project.year}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted">Role</p>
          <p className="text-sm font-medium text-foreground">{project.role}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-card px-3 py-1 text-xs text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-card-border">
        <Image
          src={project.image}
          alt={`${project.title} — project preview`}
          fill
          sizes="(min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)"
          className="object-cover"
        />
      </div>

      <a
        href="#"
        aria-label={`View ${project.title} case study`}
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
      >
        View Work
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveIndex } = useWork();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (typeof window === "undefined") return;

    // The pinned scrollytelling mechanic — and the HeroCard → WorkCard
    // swap it drives — only makes sense on desktop, where the left card
    // sits sticky next to this section. Below `lg`, the left card lives
    // at the top of the page (stacked layout), so swapping it here would
    // show the wrong content nowhere near where the user is scrolled.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) {
      setActiveIndex(null);
      return;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const isPinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
    if (!isPinned) {
      setActiveIndex(null);
      return;
    }

    setActiveIndex(
      Math.min(workProjects.length - 1, Math.floor(v * workProjects.length)),
    );
  });

  return (
    <section id="work" aria-label="Work highlights">
      {/* Desktop: pinned scrollytelling, stacked cards driven by scrollYProgress */}
      <div ref={containerRef} className="relative hidden lg:block lg:h-[300vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-6 py-16 lg:gap-8 lg:py-24">
          <WorkBadge />

          <div className="relative min-h-0 flex-1">
            {workProjects.map((project, i) => (
              <ProjectStackCard
                key={project.title}
                index={i}
                total={workProjects.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          <div className="flex gap-2" aria-hidden="true">
            {workProjects.map((project, i) => (
              <ProgressBar key={project.title} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / tablet: normal stacked scroll, no pin — fiche above its preview */}
      <div className="flex flex-col gap-16 py-16 sm:py-20 lg:hidden">
        <WorkBadge />
        {workProjects.map((project, i) => (
          <MobileProjectCard
            key={project.title}
            project={project}
            index={i}
            total={workProjects.length}
          />
        ))}
      </div>
    </section>
  );
}
