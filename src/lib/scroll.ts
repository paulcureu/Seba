"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;
let locks = 0;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Blochează scroll-ul paginii (meniu mobil, modal, coș). Suportă apeluri imbricate. */
export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    lenis?.stop();
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    if (sbw > 0) document.documentElement.style.paddingRight = `${sbw}px`;
  }
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.documentElement.style.overflow = "";
    document.documentElement.style.paddingRight = "";
    lenis?.start();
  }
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
}
