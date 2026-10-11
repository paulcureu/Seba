import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const BagIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 7h12l-1 13H7L6 7z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
  </svg>
);
export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRight = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = (p: P) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M5 12h14" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base} strokeWidth={2.4} {...p}>
    <path d="M5 12l5 5L20 7" />
  </svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
export const SearchIcon = (p: P) => (
  <svg {...base} strokeWidth={2} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4" />
  </svg>
);
export const TrashIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
);
export const ScooterIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="17" r="3" />
    <circle cx="18" cy="17" r="3" />
    <path d="M6 17h4l3-7h4l1 7" />
    <path d="M13 10l-2-4H8" />
  </svg>
);
export const CardIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
  </svg>
);
export const PizzaIcon = (p: P) => (
  <svg {...base} strokeWidth={1.3} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5.5" />
    <circle cx="10" cy="10" r="0.8" />
    <circle cx="14" cy="13" r="0.8" />
  </svg>
);
export const SlidersIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 6h10M4 12h6M4 18h12" />
    <circle cx="17" cy="6" r="2" />
    <circle cx="13" cy="12" r="2" />
    <circle cx="19" cy="18" r="2" />
  </svg>
);
export const SparkIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}>
    <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" />
  </svg>
);
export const FacebookIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z" />
  </svg>
);
export const InstagramIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" />
  </svg>
);
export const BottleIcon = (p: P) => (
  <svg {...base} strokeWidth={1.3} {...p}>
    <path d="M10 2h4v4l2 3v12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3z" />
    <path d="M8 13h8" />
  </svg>
);
