import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200",
        variant === "primary" &&
          "bg-accent text-black hover:bg-accent-bright",
        variant === "ghost" &&
          "border border-card-border text-foreground hover:border-accent/50 hover:text-accent-bright",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
