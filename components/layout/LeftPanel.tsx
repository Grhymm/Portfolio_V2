"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HeroCard } from "@/components/hero/HeroCard";
import { WorkCard } from "@/components/work/WorkCard";
import { useWork } from "@/lib/work-context";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

export function LeftPanel() {
  const { activeIndex } = useWork();

  return (
    <div className="grid w-full lg:w-[350px] lg:shrink-0 lg:self-stretch">
      <AnimatePresence initial={false}>
        {activeIndex === null ? (
          <motion.div key="hero" {...fade} className="[grid-area:1/1]">
            <HeroCard />
          </motion.div>
        ) : (
          <motion.div key="work" {...fade} className="[grid-area:1/1]">
            <WorkCard index={activeIndex} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
