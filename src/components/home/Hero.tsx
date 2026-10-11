"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Magnetic } from "@/components/motion/Magnetic";
import { CountUp } from "@/components/motion/CountUp";
import { useCart } from "@/components/cart/CartProvider";
import { ArrowRight, ClockIcon, PlusIcon } from "@/components/ui/icons";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { openQuickView } = useCart();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set("[data-hero]", { visibility: "visible" });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-hero-fade]", { y: 28, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.35)
          .from("[data-hero-pizza]", { scale: 0.6, rotate: -18, xPercent: 12, autoAlpha: 0, duration: 1.8 }, 0.1)
          .from("[data-hero-ring]", { scale: 0.7, autoAlpha: 0, duration: 1.6, stagger: 0.1 }, 0.2)
          .from("[data-hero-card]", { y: 30, autoAlpha: 0, scale: 0.9, duration: 1, stagger: 0.15, ease: "back.out(1.5)" }, 0.9);

        // Pizza „plutește” ușor; inelul se rotește; la scroll pizza coboară și se înclină
        gsap.to("[data-hero-spin]", { y: -16, rotate: 2.5, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to("[data-hero-ring-dash]", { rotate: -360, duration: 120, ease: "none", repeat: -1 });
        gsap.to("[data-hero-scroll]", {
          yPercent: 22,
          rotate: 10,
          scale: 0.92,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-ghost]", {
          xPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-card]", { y: -10, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.8, delay: 2.4 });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero]", { visibility: "visible" });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="grain relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[44vw] italic leading-none text-cream/[0.03] lg:text-[26vw]"
      >
        <span data-hero-ghost className="inline-block">Seba</span>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[18%] size-[46vw] max-w-[640px] rounded-full bg-brass/10 blur-[120px]"
      />

      <div className="container-x relative grid items-center gap-10 pb-20 pt-10 md:pt-16 lg:min-h-[calc(100dvh-120px)] lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-28">
        <div className="flex flex-col gap-7">
          <div data-hero data-hero-fade className="flex items-center gap-3.5 text-xs font-bold uppercase tracking-[0.3em] text-brass">
            <span className="block h-px w-11 bg-brass" />
            Pizzeria e Trattoria · Cluj
          </div>
          <SplitHeading as="h1" trigger="load" delay={0.2} className="display text-[clamp(3.25rem,8.6vw,7.25rem)] leading-[0.9] tracking-[-0.015em]">
            Rețete din Puglia, <em className="text-brass-light">coapte în Cluj.</em>
          </SplitHeading>
          <p data-hero data-hero-fade className="max-w-[500px] text-[17px] leading-[1.75] text-soft md:text-lg">
            Pizza la cuptor cu mozzarella fior di latte, paste și salate cu ingrediente italienești. Livrăm în Cluj sau te așteptăm pe strada Mureșului.
          </p>
          <div data-hero data-hero-fade className="flex flex-wrap gap-3">
            <Magnetic>
              <Link href="/meniu" className="btn btn-primary min-h-14 px-8 text-sm">
                Comandă acum <ArrowRight className="size-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/rezervari" className="btn btn-ghost min-h-14 px-8 text-sm">
                Rezervă o masă
              </Link>
            </Magnetic>
          </div>
          <dl data-hero data-hero-fade className="mt-2 grid max-w-[560px] grid-cols-3 gap-4 border-t border-cream/10 pt-7">
            <div className="flex flex-col gap-1.5">
              <dt className="order-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted sm:text-[11px]">Rețete de pizza</dt>
              <dd className="font-display text-4xl leading-none text-ivory sm:text-[42px]">
                <CountUp to={40} suffix="+" />
              </dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="order-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted sm:text-[11px]">Mărimea mare</dt>
              <dd className="font-display text-4xl leading-none text-ivory sm:text-[42px]">
                <CountUp to={900} suffix=" g" />
              </dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="order-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted sm:text-[11px]">Lei livrarea</dt>
              <dd className="font-display text-4xl leading-none text-ivory sm:text-[42px]">
                <CountUp to={6.99} decimals={2} />
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-[640px] items-center justify-center">
          <div data-hero data-hero-ring className="absolute inset-[2%] rounded-full">
            <div data-hero-ring-dash className="size-full rounded-full border border-dashed border-brass/35" />
          </div>
          <div data-hero data-hero-ring className="absolute inset-[11%] rounded-full bg-panel shadow-[inset_0_0_0_1px_rgba(239,232,218,0.06)]" />
          <div data-hero-scroll className="relative w-[94%] sm:w-[112%]">
            <div data-hero data-hero-pizza>
              <div data-hero-spin>
                <Image
                  src="/images/hero-pizza.png"
                  alt="Pizza Primavera cu roșii cherry, radicchio și rucola"
                  width={1224}
                  height={816}
                  preload
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="h-auto w-full drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          </div>

          <div data-hero data-hero-card className="absolute left-0 top-[8%] flex items-center gap-3 rounded-2xl border border-cream/10 bg-ink/85 px-4 py-3 backdrop-blur-md sm:left-[-2%]">
            <span className="flex size-10 items-center justify-center rounded-full bg-brass text-ink">
              <ClockIcon className="size-[18px]" />
            </span>
            <span className="flex flex-col">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted">Luni – Sâmbătă</span>
              <span className="text-[15px] font-bold text-ivory">10:00 – 21:00</span>
            </span>
          </div>

          <button
            data-hero
            data-hero-card
            type="button"
            onClick={() => openQuickView("primavera")}
            className="absolute bottom-[2%] right-0 flex min-w-[190px] flex-col gap-1 rounded-[20px] bg-cream p-3.5 text-left text-ink shadow-[0_24px_50px_rgba(0,0,0,0.4)] sm:min-w-[230px] sm:p-5"
          >
            <span className="text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-umber">Recomandarea casei</span>
            <span className="font-display text-[30px] font-semibold leading-none">Primavera</span>
            <span className="text-[13px] text-[#4a4f49]">roșii cherry · radicchio · rucola</span>
            <span className="flex items-center justify-between pt-2 text-[15px] font-extrabold">
              de la 54 lei
              <span className="flex size-8 items-center justify-center rounded-full bg-ink text-cream">
                <PlusIcon className="size-3.5" />
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
