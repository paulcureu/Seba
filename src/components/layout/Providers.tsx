"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { CartProvider, useCart } from "@/components/cart/CartProvider";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import { setLenis, scrollToTop } from "@/lib/scroll";

/** Smooth scroll (Lenis) sincronizat cu GSAP ScrollTrigger. Dezactivat la „reduce motion”. */
function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia(MOTION_OK);
    if (!mq.matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: false });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}

/** La fiecare schimbare de pagină: închide panourile, urcă sus, pornește animațiile de „reveal”. */
function RouteEffects() {
  const pathname = usePathname();
  const { closeDrawer, closeQuickView } = useCart();

  useEffect(() => {
    closeDrawer();
    closeQuickView();
    scrollToTop(true);

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-revealed])");
      if (!items.length) return;
      gsap.set(items, { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          batch.forEach((el) => el.setAttribute("data-revealed", ""));
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.09, ease: "power3.out", overwrite: true });
        },
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (items.length) gsap.set(items, { autoAlpha: 1, y: 0 });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => {
      window.clearTimeout(refresh);
      mm.revert();
      document.querySelectorAll("[data-revealed]").forEach((el) => el.removeAttribute("data-revealed"));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <SmoothScroll />
      {children}
      <RouteEffects />
    </CartProvider>
  );
}
