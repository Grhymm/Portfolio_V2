"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { XIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Typewriter } from "@/components/hero/Typewriter";
import { fadeInLeft, fadeInUp, staggerContainer, pulseGlow } from "@/lib/animations";

const PORTRAIT_IMAGE = "/images/hero-portrait.webp";

const socials = [
  { icon: XIcon, href: "https://x.com", label: "X" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
];

function AvailabilityDot() {
  return (
    <span className="relative flex h-2 w-2">
      <motion.span
        variants={pulseGlow}
        animate="animate"
        className="absolute inline-flex h-full w-full rounded-full bg-accent"
      />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  );
}

export function HeroCard() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeInLeft}
      className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/8 bg-black lg:sticky lg:top-24 lg:mx-0 lg:h-fit lg:w-[350px] lg:max-w-none lg:shrink-0"
    >
      <div className="relative h-full w-full">
        <Image
          src={PORTRAIT_IMAGE}
          alt="Portrait"
          fill
          priority
          sizes="(max-width: 1023px) 420px, 350px"
          className="object-cover object-top grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
        <Logo className="h-7 w-7 brightness-0 invert" />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1, 0.4)}
        className="absolute right-6 top-6 flex flex-col gap-3 sm:right-8 sm:top-8"
      >
        {socials.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1A1A]/70 text-white backdrop-blur-sm transition-colors hover:bg-[#1A1A1A]"
          >
            <Icon className="h-4 w-4" />
          </motion.a>
        ))}
      </motion.div>

      <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 lg:block">
        <div className="flex -rotate-90 items-center gap-2 whitespace-nowrap">
          <AvailabilityDot />
          <span className="text-xs uppercase tracking-widest text-white/70">
            Available for Work
          </span>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.12, 0.3)}
        className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-8"
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-2 lg:hidden">
          <AvailabilityDot />
          <span className="text-xs uppercase tracking-widest text-white/70">
            Available for Work
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="text-lg font-medium text-white sm:text-xl"
        >
          Hey, I&apos;m <Typewriter words={["Designer", "Developer", "Donel"]} />
        </motion.h2>

        <motion.p variants={fadeInUp} className="max-w-xs text-sm leading-[1.5] text-white/60">
          I help startups grow with smart design and no-code development,
          based in Cupertino, CA.
        </motion.p>

        <motion.div variants={fadeInUp} className="h-px w-full bg-white/10" />

        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              aria-label="Let's talk"
              whileHover="hover"
              whileTap={{ scale: 0.94 }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-black transition-colors hover:bg-accent-bright"
            >
              <motion.span variants={{ hover: { rotate: 45 } }} className="flex">
                <ArrowUpRight className="h-5 w-5" />
              </motion.span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 24px rgba(34, 255, 102, 0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent-bright"
            >
              Let&apos;s talk
            </motion.a>
          </div>

          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
          >
            <Download className="h-4 w-4" />
            Download CV
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
