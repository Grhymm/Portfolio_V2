import { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>
      <path
        d="M8 26V6h4.2l11.6 15.4V6H28v20h-4.2L12.2 10.6V26H8Z"
        fill="url(#logo-gradient)"
      />
    </svg>
  );
}
