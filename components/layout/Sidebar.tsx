"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Home,
  User,
  Briefcase,
  Sparkles,
  Layers,
  Boxes,
  Quote,
  PenLine,
  Send,
  Sun,
  ArrowUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "education", label: "Education", icon: Briefcase },
  { id: "work", label: "Work", icon: Sparkles },
  { id: "service", label: "Services", icon: Layers },
  { id: "tech", label: "Tech Stack", icon: Boxes },
  { id: "testimonials", label: "Testimonials", icon: Quote },
  { id: "blog", label: "Blog", icon: PenLine },
  { id: "contact", label: "Contact", icon: Send },
];

function ThemeToggleButton({
  className,
  iconClassName = "h-5 w-5",
}: {
  className?: string;
  iconClassName?: string;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={className}
    >
      <Sun className={iconClassName} />
    </button>
  );
}

function ScrollTopButton({
  className,
  iconClassName = "h-5 w-5",
}: {
  className?: string;
  iconClassName?: string;
}) {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={className}
    >
      <ArrowUp className={iconClassName} />
    </button>
  );
}

export function Sidebar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActive(mostVisible.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: one centered fixed group, 3 visually separate blocks inside it */}
      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        <ThemeToggleButton
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0D0D0D] text-accent shadow-lg shadow-black/40 transition-colors hover:bg-[#1A1A1A]"
          iconClassName="h-[18px] w-[18px]"
        />

        <nav className="flex w-12 shrink-0 flex-col items-center gap-4 rounded-full border border-white/10 bg-[#0D0D0D] py-4 shadow-lg shadow-black/40">
          {navItems.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-label={label}
              aria-current={active === id ? "true" : undefined}
              onClick={() => setActive(id)}
              className={cn(
                "flex h-5 w-5 items-center justify-center transition-colors",
                active === id
                  ? "text-accent"
                  : "text-[#6B6B6B] hover:text-foreground",
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </nav>

        <ScrollTopButton
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0D0D0D] text-white/70 shadow-lg shadow-black/40 transition-colors hover:bg-[#1A1A1A] hover:text-foreground"
          iconClassName="h-[18px] w-[18px]"
        />
      </div>

      {/* Mobile: floating utility buttons only (nav list stays desktop-only) */}
      <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 lg:hidden">
        <ThemeToggleButton className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1A1A] text-accent shadow-lg shadow-black/40" />
        <ScrollTopButton className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1A1A] text-white/70 shadow-lg shadow-black/40" />
      </div>
    </>
  );
}
