"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  children: ReactNode;
  /** „load” = animă imediat (hero), „scroll” = când intră în ecran */
  trigger?: "load" | "scroll";
  delay?: number;
  id?: string;
};

/** Titlu care apare rând cu rând, cu mască (GSAP SplitText). */
export function SplitHeading({ as = "h2", className, children, trigger = "scroll", delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let split: SplitText | undefined;
        // Așteptăm fonturile (max. 1,2 s), ca rândurile să fie împărțite corect
        Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(() => {
          if (!el.isConnected) return;
          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              return gsap.from(self.lines, {
                yPercent: 115,
                duration: 1.15,
                stagger: 0.1,
                ease: "expo.out",
                delay,
                scrollTrigger: trigger === "scroll" ? { trigger: el, start: "top 88%", once: true } : undefined,
              });
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
    <Tag ref={ref} className={className} id={id} data-split="">
      {children}
    </Tag>
  );
}
