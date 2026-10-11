"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

/** Text ale cărui cuvinte se „aprind” pe măsură ce derulezi. */
export function ScrubWords({ text, as = "p", className }: { text: string; as?: "p" | "h2" | "blockquote"; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let split: SplitText | undefined;
        document.fonts.ready.then(() => {
          if (!el.isConnected) return;
          split = SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit(self) {
              return gsap.fromTo(
                self.words,
                { opacity: 0.14 },
                { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } },
              );
            },
          });
        });
        return () => split?.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
