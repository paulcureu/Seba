"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/menu";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { BagIcon } from "@/components/ui/icons";

/** Bară fixă jos cu totalul coșului (vizibilă pe mobil și tabletă, ascunsă pe pagina coșului). */
export function MobileCartBar() {
  const { count, subtotal, ready, openDrawer, drawerOpen, quickView } = useCart();
  const pathname = usePathname();
  const ref = useRef<HTMLButtonElement>(null);
  const visible = ready && count > 0 && !drawerOpen && !quickView && pathname !== "/cos";

  useEffect(() => {
    if (!visible || !ref.current || !window.matchMedia(MOTION_OK).matches) return;
    gsap.fromTo(ref.current, { y: 90, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" });
  }, [visible]);

  if (!visible) return null;
  return (
    <button
      ref={ref}
      type="button"
      onClick={openDrawer}
      className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-full bg-cream py-2 pl-5 pr-2 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 lg:hidden"
    >
      <BagIcon className="size-5" />
      <span className="text-sm font-bold">
        {count} {count === 1 ? "produs" : "produse"}
      </span>
      <span className="ml-auto text-sm font-extrabold sm:ml-2">{formatPrice(subtotal)}</span>
      <span className="flex h-11 items-center rounded-full bg-ink px-5 text-xs font-extrabold uppercase tracking-[0.12em] text-cream">Vezi coșul</span>
    </button>
  );
}
