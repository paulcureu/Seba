"use client";

import Link from "next/link";
import { useRef } from "react";
import { getProduct, signatureSlugs, type Product } from "@/lib/menu";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useCart } from "@/components/cart/CartProvider";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ProductVisual } from "@/components/product/ProductVisual";
import { TagBadges } from "@/components/product/ProductCard";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

const items = signatureSlugs.map((s) => getProduct(s)).filter((p): p is Product => Boolean(p));

/** Specialitățile casei: scroll orizontal „fixat” pe desktop, carusel cu swipe pe mobil. */
export function Specialties() {
  const ref = useRef<HTMLElement>(null);
  const { openQuickView } = useCart();

  useGSAP(
    () => {
      const section = ref.current;
      const track = section?.querySelector<HTMLElement>("[data-track]");
      const bar = section?.querySelector<HTMLElement>("[data-progress]");
      if (!section || !track) return;
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 1024px)", motion: MOTION_OK }, (ctx) => {
        const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
        if (!desktop || !motion) return;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        if (bar) gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: true } });
        // Fiecare imagine se rotește ușor cât timp trece prin ecran
        gsap.utils.toArray<HTMLElement>("[data-spin]", section).forEach((img) => {
          gsap.fromTo(img, { rotate: -8, scale: 1.3 }, { rotate: 8, scale: 1.3, ease: "none", scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:py-0">
      <div className="container-x flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="eyebrow">02 — Specialitățile casei</span>
          <SplitHeading className="display text-[clamp(2.5rem,5vw,4.25rem)]">
            Cele mai iubite <em className="text-brass-light">de la Seba.</em>
          </SplitHeading>
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <Link href="/meniu" className="group inline-flex items-center gap-2 border-b border-brass pb-1.5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-brass-light">
            Vezi tot meniul <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="hidden h-px w-56 overflow-hidden bg-cream/15 lg:block">
            <span data-progress className="block h-full origin-left scale-x-0 bg-brass" />
          </span>
        </div>
      </div>

      <div className="no-scrollbar mt-10 snap-x snap-mandatory overflow-x-auto overscroll-x-contain lg:mt-14 lg:snap-none lg:overflow-visible">
        <div data-track className="flex w-max gap-4 px-5 md:gap-6 md:px-8 lg:pl-[max(2rem,calc((100vw-1320px)/2+2rem))] lg:pr-[8vw]">
          {items.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => openQuickView(p.slug)}
              aria-label={`Comandă ${p.name}`}
              className="card-lift group relative flex w-[80vw] max-w-[400px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] border border-cream/[0.08] bg-panel text-left sm:w-[400px] lg:w-[420px] lg:max-w-none"
            >
              <span className="relative block aspect-[1.08] overflow-hidden bg-[#2a2a2c]">
                <span data-spin className="absolute inset-0 block">
                  <ProductVisual product={p} sizes="420px" zoom={1.28} />
                </span>
                <span className="absolute left-4 top-4">
                  <TagBadges product={p} />
                </span>
                <span className="absolute right-4 top-4 font-display text-4xl italic text-cream/80">0{i + 1}</span>
              </span>
              <span className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                <span className="font-display text-[34px] font-semibold leading-none text-ivory">{p.name}</span>
                <span className="text-sm leading-relaxed text-muted first-letter:uppercase">{p.description}</span>
                <span className="mt-auto flex items-center justify-between gap-4 border-t border-cream/10 pt-5">
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">{p.weight}</span>
                    <span className="text-lg font-extrabold text-ivory">
                      {p.price} – {p.priceLarge} lei
                    </span>
                  </span>
                  <span className="inline-flex h-11 items-center gap-2 rounded-full border border-brass/60 px-5 text-xs font-extrabold uppercase tracking-[0.12em] text-brass-light transition-colors group-hover:bg-brass group-hover:text-ink">
                    Comandă
                  </span>
                </span>
              </span>
            </button>
          ))}
          <Link
            href="/meniu"
            className="group flex w-[70vw] max-w-[340px] shrink-0 snap-start flex-col justify-between rounded-[28px] bg-brass p-8 text-ink sm:w-[340px]"
          >
            <span className="text-xs font-extrabold uppercase tracking-[0.2em]">Încă 36 de rețete</span>
            <span className="font-display text-6xl leading-[0.9]">
              Tot <em>meniul</em>
            </span>
            <span className="flex size-16 items-center justify-center rounded-full bg-ink text-cream transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="size-6" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
