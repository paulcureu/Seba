"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { getProduct, ingredientsOf, capitalize } from "@/lib/menu";
import { useCart } from "@/components/cart/CartProvider";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { ProductVisual } from "./ProductVisual";
import { ProductConfigurator } from "./ProductConfigurator";
import { TagBadges } from "./ProductCard";
import { ArrowUpRight, CloseIcon } from "@/components/ui/icons";

export function ProductModal() {
  const { quickView, closeQuickView } = useCart();
  const product = quickView ? getProduct(quickView) : undefined;
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  // Animație de intrare
  useGSAP(
    () => {
      if (!product || !rootRef.current || !panelRef.current) return;
      closing.current = false;
      panelRef.current.scrollTop = 0;
      const mm = gsap.matchMedia();
      mm.add(
        { motion: MOTION_OK, mobile: "(max-width: 639px)" },
        (ctx) => {
          const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
          if (!motion) return;
          gsap.fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
          gsap.fromTo(
            panelRef.current,
            mobile ? { yPercent: 100 } : { y: 48, autoAlpha: 0, scale: 0.98 },
            mobile ? { yPercent: 0, duration: 0.6, ease: "expo.out" } : { y: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: "expo.out" },
          );
          gsap.from(panelRef.current!.querySelectorAll("[data-stagger]"), { y: 24, autoAlpha: 0, stagger: 0.06, duration: 0.7, delay: 0.15 });
        },
      );
      closeRef.current?.focus({ preventScroll: true });
      return () => mm.revert();
    },
    { dependencies: [quickView], revertOnUpdate: true },
  );

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (!window.matchMedia(MOTION_OK).matches || !panelRef.current) {
      closeQuickView();
      return;
    }
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    gsap.to(panelRef.current, mobile ? { yPercent: 100, duration: 0.4, ease: "power3.in" } : { y: 32, autoAlpha: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(rootRef.current, { autoAlpha: 0, duration: 0.35, delay: 0.05, onComplete: closeQuickView });
  }, [closeQuickView]);

  useEffect(() => {
    if (!product) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [product, close]);

  if (!product) return null;

  const isPizza = product.category === "pizza";

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        data-lenis-prevent
        className="relative grid max-h-[94dvh] w-full max-w-[1140px] overflow-y-auto overscroll-contain rounded-t-[28px] border border-cream/10 bg-overlay shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:max-h-[90dvh] sm:rounded-[30px] lg:grid-cols-[1fr_1.05fr]"
      >
        <div className="sticky top-0 z-20 col-span-full flex h-0 justify-end">
          <span aria-hidden className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-cream/30 sm:hidden" />
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Închide"
            className="mr-4 mt-4 flex size-11 shrink-0 items-center justify-center rounded-full border border-cream/20 bg-ink/85 text-cream backdrop-blur transition-colors hover:border-brass sm:mr-5 sm:mt-5 sm:size-12"
          >
            <CloseIcon className="size-[18px]" />
          </button>
        </div>

        <div className="flex flex-col bg-ink lg:sticky lg:top-0 lg:max-h-[90dvh]">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[420px] lg:flex-1">
            <ProductVisual product={product} sizes="(min-width: 1024px) 560px, 100vw" zoom={1.12} large />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink" />
          </div>
          <div className="flex flex-col gap-3.5 px-6 pb-7 pt-2 sm:px-8">
            <span className="label">{product.category === "bauturi" ? "Detalii" : product.category === "pachete" ? "Conține" : "Ingrediente"}</span>
            <div className="flex flex-wrap gap-2">
              {ingredientsOf(product).map((g) => (
                <span key={g} className="rounded-full border border-cream/15 px-3.5 py-2 text-[13px] font-semibold text-cream">
                  {capitalize(g)}
                </span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 rounded-2xl bg-panel px-4 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-dim">Gramaj</span>
                <span className="text-[15px] font-bold text-ivory">{product.weight}</span>
              </div>
              <Link href={`/meniu/${product.slug}`} className="flex flex-col gap-1 rounded-2xl bg-panel px-4 py-3.5 transition-colors hover:bg-panel-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-dim">Pagina produsului</span>
                <span className="inline-flex items-center gap-1 text-[15px] font-bold text-brass-light">
                  Deschide <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-7 p-6 sm:p-10">
          <div className="flex flex-col gap-3.5 pr-12">
            <div data-stagger>
              <TagBadges product={product} />
            </div>
            <h2 data-stagger className="display text-5xl sm:text-[56px]">
              {isPizza ? (
                <>
                  <span className="text-brass-light italic">Pizza</span> {product.name}
                </>
              ) : (
                product.name
              )}
            </h2>
            <p data-stagger className="text-[15.5px] leading-relaxed text-soft">
              {isPizza ? `Coaptă la cuptor, cu ${product.description}.` : capitalize(product.description)}
            </p>
          </div>
          <div data-stagger>
            <ProductConfigurator key={product.slug} product={product} onAdded={close} />
          </div>
        </div>
      </div>
    </div>
  );
}
