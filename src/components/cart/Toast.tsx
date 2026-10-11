"use client";

import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { CheckIcon } from "@/components/ui/icons";

export function Toast() {
  const { toast, openDrawer } = useCart();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toast || !ref.current || !window.matchMedia(MOTION_OK).matches) return;
    gsap.fromTo(ref.current, { y: -24, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" });
  }, [toast]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-4 z-[80] flex justify-center px-4">
      {toast && (
        <div
          key={toast.key}
          ref={ref}
          role="status"
          className="pointer-events-auto flex items-center gap-3 rounded-full bg-brass py-2 pl-4 pr-2 text-sm font-bold text-ink shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
        >
          <CheckIcon className="size-[18px] shrink-0" />
          <span className="line-clamp-1">{toast.text}</span>
          <button type="button" onClick={openDrawer} className="h-9 shrink-0 rounded-full bg-ink px-4 text-[11px] font-extrabold uppercase tracking-[0.1em] text-cream">
            Vezi coșul
          </button>
        </div>
      )}
    </div>
  );
}
