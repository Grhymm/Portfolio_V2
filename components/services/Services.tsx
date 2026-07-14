"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Layers, Minus, Plus } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Service {
  title: string;
  description: string;
  tags: string[];
  images: [string, string];
}

const services: Service[] = [
  {
    title: "Web Design",
    description:
      "I design modern, responsive websites that balance creativity with usability, making sure your digital presence feels seamless and memorable.",
    tags: ["Visual Design", "Interaction Design", "Responsive Layouts"],
    images: [
      "https://tfisak.vercel.app/assets/images/section/service-1.jpg",
      "https://tfisak.vercel.app/assets/images/section/service-2.jpg",
    ],
  },
  {
    title: "No-Code Development",
    description:
      "Build fast, scalable websites using tools like Framer and Webflow—helping you launch quickly with designs that are easy to edit and maintain.",
    tags: ["Framer Builds", "Webflow Sites", "Scalable Launches"],
    images: [
      "https://tfisak.vercel.app/assets/images/section/service-3.jpg",
      "https://tfisak.vercel.app/assets/images/section/service-4.jpg",
    ],
  },
  {
    title: "Brand Identity",
    description:
      "I craft cohesive brand systems with logos, colors, and typography that reflect your values—making your business recognizable and trusted.",
    tags: ["Logo Design", "Visual Systems", "Brand Guidelines"],
    images: [
      "https://tfisak.vercel.app/assets/images/section/service-5.jpg",
      "https://tfisak.vercel.app/assets/images/section/service-6.jpg",
    ],
  },
];

function ServiceImages({
  images,
  title,
}: {
  images: [string, string];
  title: string;
}) {
  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-2xl border border-card-border bg-card sm:h-[260px]">
      {images.map((src, i) => (
        <motion.div
          key={src}
          initial={{ left: "27%", rotate: i === 0 ? -6 : 6 }}
          animate={{ left: i === 0 ? "2%" : "52%", rotate: 0 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.05,
          }}
          style={{ zIndex: i === 0 ? 2 : 1 }}
          className="absolute top-[7.5%] h-[85%] w-[46%] overflow-hidden rounded-2xl border border-card-border shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
        >
          <Image
            src={src}
            alt={`${title} — example ${i + 1}`}
            fill
            sizes="(min-width: 1024px) 30vw, 45vw"
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}

function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-card-border sm:h-12 sm:w-12">
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.span
            key="minus"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute flex items-center justify-center"
          >
            <Minus className="h-4 w-4 text-foreground sm:h-5 sm:w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="plus"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute flex items-center justify-center"
          >
            <Plus className="h-4 w-4 text-foreground sm:h-5 sm:w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function AccordionItem({
  service,
  isOpen,
  onToggle,
}: {
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `service-panel-${service.title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="border-b border-card-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${isOpen ? "Collapse" : "Expand"} ${service.title}`}
        className="flex w-full items-center justify-between gap-6 py-8 text-left sm:py-10"
      >
        <span className="font-heading text-[clamp(22px,2.5vw,32px)] font-medium text-foreground">
          {service.title}
        </span>
        <ToggleIcon isOpen={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 pb-8 sm:pb-10"
            >
              <ServiceImages images={service.images} title={service.title} />

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-card-border bg-card px-4 py-2 text-sm text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="max-w-[600px] text-sm leading-[1.5] text-muted">
                {service.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="service">
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
          <Layers className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium uppercase tracking-wider text-foreground">
            Services
          </span>
        </motion.div>

        <motion.div variants={fadeInUp}>
          {services.map((service, i) => (
            <AccordionItem
              key={service.title}
              service={service}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex((current) => (current === i ? null : i))
              }
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
