"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { workProjects } from "@/lib/work-data";

const textTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };
const imageTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

export function WorkCard({ index }: { index: number }) {
  const project = workProjects[index];

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/8 bg-black lg:sticky lg:top-24 lg:mx-0 lg:h-fit lg:w-[350px] lg:max-w-none lg:shrink-0">
      <div className="relative h-full w-full">
        <AnimatePresence>
          <motion.div
            key={project.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={imageTransition}
            className="absolute inset-0"
          >
            <Image
              src={project.image}
              alt={`${project.title} — project preview`}
              fill
              priority
              sizes="(max-width: 1023px) 420px, 350px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

      <div
        aria-hidden="true"
        className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-medium text-white backdrop-blur-sm sm:left-8 sm:top-8"
      >
        {project.title.charAt(0)}
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={textTransition}
            className="flex flex-col gap-4 p-6 sm:p-8"
          >
            <p className="font-heading text-2xl font-medium leading-[1.05] text-white">
              {project.title}
            </p>

            <p className="line-clamp-3 text-sm leading-[1.5] text-white/60">
              {project.description}
            </p>

            <div className="flex items-center gap-8">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-white/50">Year</p>
                <p className="text-sm font-medium text-white">{project.year}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-white/50">Role</p>
                <p className="text-sm font-medium text-white">{project.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#2A2A2A] px-3 py-1 text-xs text-white"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.a
                  href="#"
                  aria-label={`View ${project.title} case study`}
                  whileHover="hover"
                  whileTap={{ scale: 0.94 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-white/90"
                >
                  <motion.span
                    variants={{ hover: { rotate: 45 } }}
                    className="flex"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </motion.span>
                </motion.a>
                <motion.a
                  href="#"
                  aria-label={`View ${project.title} case study`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                >
                  View Work
                </motion.a>
              </div>

              <p className="text-sm text-white/50" aria-label={`Project ${index + 1} of ${workProjects.length}`}>
                <span className="text-white/90">{index + 1}</span> /{" "}
                {workProjects.length}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
