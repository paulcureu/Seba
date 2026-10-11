"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import { productsByCategory, formatPrice, shortPrice } from "@/lib/menu";
import { site } from "@/lib/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { ProductVisual } from "@/components/product/ProductVisual";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { ArrowRight, CloseIcon, PlusIcon } from "@/components/ui/icons";
import { CartThumb } from "./CartThumb";

const upsell = ["pepsi-250", "lipton-500", "weihenstephan"]
  .map((s) => productsByCategory.bauturi.find((p) => p.slug === s))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, count, subtotal, setQty, remove, add } = useCart();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const reduce = !window.matchMedia(MOTION_OK).matches;
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? 0 : 0.3 })
        .fromTo(panelRef.current, { xPercent: 100 }, { xPercent: 0, duration: reduce ? 0 : 0.6, ease: "expo.out" }, 0);
    },
    { scope: rootRef },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (drawerOpen) {
      lockScroll();
      tl.current.timeScale(1).play();
      panelRef.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        unlockScroll();
      };
    }
    tl.current.timeScale(1.8).reverse();
  }, [drawerOpen, closeDrawer]);

  return (
    <div
      ref={rootRef}
      className="invisible fixed inset-0 z-[65] flex justify-end overflow-hidden bg-black/65 backdrop-blur-[2px]"
      onMouseDown={(e) => e.target === e.currentTarget && closeDrawer()}
      aria-hidden={!drawerOpen}
    >
      <aside ref={panelRef} aria-label="Coșul tău" className="flex h-full w-full max-w-[470px] flex-col border-l border-cream/10 bg-overlay">
        <div className="flex items-center justify-between border-b border-cream/[0.08] px-6 pb-5 pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-7">
          <div className="flex flex-col gap-1">
            <span className="display text-4xl">Coșul tău</span>
            <span className="text-[13px] text-muted">
              {count} {count === 1 ? "produs" : "produse"}
            </span>
          </div>
          <button data-close type="button" onClick={closeDrawer} aria-label="Închide coșul" className="flex size-12 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-brass">
            <CloseIcon className="size-[18px]" />
          </button>
        </div>

        <div data-lenis-prevent className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-6 sm:px-7">
          {lines.length === 0 && (
            <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
              <span className="display text-3xl">Coșul e gol</span>
              <span className="text-sm text-muted">Alege o pizza din meniu ca să începi.</span>
              <Link href="/meniu" onClick={closeDrawer} className="btn btn-primary mt-3">
                Vezi meniul
              </Link>
            </div>
          )}
          {lines.map((l) => (
            <div key={l.id} className="flex gap-4 border-b border-cream/[0.08] py-5">
              <CartThumb line={l} />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex justify-between gap-3">
                  <span className="font-display text-[22px] font-semibold leading-tight text-ivory">{l.name}</span>
                  <span className="whitespace-nowrap text-[15px] font-extrabold">{formatPrice(l.unit * l.qty)}</span>
                </div>
                {l.details.length > 0 && <span className="text-[12.5px] leading-normal text-muted">{l.details.join(" · ")}</span>}
                <div className="flex items-center justify-between">
                  <QtyStepper value={l.qty} onChange={(n) => setQty(l.id, n)} size="sm" />
                  <button type="button" onClick={() => remove(l.id)} className="h-11 text-xs font-bold uppercase tracking-[0.1em] text-muted underline underline-offset-4 hover:text-cream">
                    Șterge
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-3 py-6">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brass-light">Ceva de băut?</span>
            <div className="grid grid-cols-3 gap-2.5">
              {upsell.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => add({ slug: d.slug, name: d.name, image: d.image, imageKind: d.imageKind, unit: d.price, qty: 1, details: [d.weight] })}
                  aria-label={`Adaugă ${d.name}`}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-cream/[0.12] bg-panel p-2.5 transition-colors hover:border-brass/60"
                >
                  <span className="relative block h-24 w-full overflow-hidden rounded-xl">
                    <ProductVisual product={d} sizes="140px" />
                  </span>
                  <span className="text-xs font-bold">{d.name}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-brass-light">
                    <PlusIcon className="size-3" /> {shortPrice(d.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-cream/10 bg-ink px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-5 sm:px-7">
          <div className="flex justify-between text-sm text-soft">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-soft">
            <span>Livrare</span>
            <span>{formatPrice(site.deliveryFee)}</span>
          </div>
          <div className="flex items-baseline justify-between border-t border-dashed border-cream/15 pt-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.16em]">Total</span>
            <span className="display text-4xl">{formatPrice(subtotal ? subtotal + site.deliveryFee : 0)}</span>
          </div>
          <Link
            href="/cos"
            onClick={closeDrawer}
            aria-disabled={lines.length === 0}
            className={`btn btn-primary mt-2 min-h-14 ${lines.length === 0 ? "pointer-events-none opacity-50" : ""}`}
          >
            Finalizează comanda <ArrowRight className="size-4" />
          </Link>
          <button type="button" onClick={closeDrawer} className="btn btn-ghost min-h-12">
            Continuă cumpărăturile
          </button>
        </div>
      </aside>
    </div>
  );
}
