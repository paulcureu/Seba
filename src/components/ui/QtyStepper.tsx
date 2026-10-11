"use client";

import { MinusIcon, PlusIcon } from "./icons";

export function QtyStepper({
  value,
  onChange,
  size = "md",
  min = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  size?: "sm" | "md";
  min?: number;
}) {
  const btn = size === "sm" ? "size-10" : "size-12";
  return (
    <div role="group" aria-label="Cantitate" className="inline-flex items-center rounded-full border border-cream/20 p-0.5">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label="Scade cantitatea" className={`${btn} flex items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10 disabled:opacity-40`} disabled={value <= min}>
        <MinusIcon className="size-4" />
      </button>
      <span aria-live="polite" className="min-w-7 text-center text-base font-extrabold tabular-nums">
        {value}
      </span>
      <button type="button" onClick={() => onChange(Math.min(99, value + 1))} aria-label="Crește cantitatea" className={`${btn} flex items-center justify-center rounded-full text-cream transition-colors hover:bg-cream/10`}>
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}
