"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  // Pe telefon bara de adrese apare/dispare la scroll: nu recalculăm animațiile pentru asta (evită „sărituri”).
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Media query folosit pentru toate animațiile: respectă „reduce motion”. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
