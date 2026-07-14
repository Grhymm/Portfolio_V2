"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { DateTimeClock } from "@/components/layout/DateTimeClock";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10">
      <a href="#home" aria-label="Home">
        <Logo className="h-8 w-8" />
      </a>

      <div className="flex items-center gap-3">
        <DateTimeClock />

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] text-foreground lg:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
