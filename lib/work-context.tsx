"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface WorkContextValue {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const WorkContext = createContext<WorkContextValue | null>(null);

export function WorkProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <WorkContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </WorkContext.Provider>
  );
}

export function useWork() {
  const ctx = useContext(WorkContext);
  if (!ctx) {
    throw new Error("useWork must be used within a WorkProvider");
  }
  return ctx;
}
