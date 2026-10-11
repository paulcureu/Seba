"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export function CountUp({ to, decimals = 0, prefix = "", suffix = "", className }: { to: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => `${prefix}${n.toFixed(decimals).replace(".", ",")}${suffix}`;
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const obj = { v: 0 };
        el.textContent = fmt(0);
        gsap.to(obj, {
          v: to,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = fmt(obj.v);
          },
        });
        return () => {
          el.textContent = fmt(to);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={className}>
      {fmt(to)}
    </span>
  );
}
