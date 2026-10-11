"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SparkIcon } from "@/components/ui/icons";

/** Bandă infinită care accelerează și își schimbă direcția după viteza de scroll. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector("[data-track]");
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tween = gsap.to(track, { xPercent: -50, ease: "none", duration: 38, repeat: -1 });
        tween.totalTime(tween.duration() * 100); // loc pentru redare inversă
        const st = ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate(self) {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 5);
            tween.timeScale(self.direction * boost);
            gsap.to(tween, { timeScale: self.direction, duration: 1.2, ease: "power2.out", overwrite: true });
          },
        });
        return () => {
          st.kill();
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const row = [...items, ...items];
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div data-track className="flex w-max">
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className="flex items-center gap-7 whitespace-nowrap px-3.5 py-5 font-display text-[26px] italic md:text-[30px]">
            {t}
            <SparkIcon className="size-3.5" />
          </span>
        ))}
      </div>
    </div>
  );
}
