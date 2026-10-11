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
        className="pointer-events-none absolute -right-[10%] top-[38%] -translate-y-1/2 select-none whitespace-nowrap font-display text-[44vw] italic leading-none text-cream/[0.03] lg:top-1/2 lg:text-[26vw]"
      >
        <span data-hero-ghost className="inline-block">Seba</span>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[30%] size-[70vw] max-w-[640px] rounded-full bg-brass/10 blur-[90px] lg:top-[18%] lg:size-[46vw] lg:blur-[120px]"
      />

      <div className="container-x relative grid grid-cols-1 gap-8 pb-16 pt-8 sm:gap-10 md:pt-14 lg:min-h-[calc(100dvh-120px)] lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[1fr_auto_1fr] lg:gap-x-14 lg:gap-y-8 lg:pb-24">
        {/* 1. Titlu */}
        <div className="flex flex-col gap-5 sm:gap-7 lg:col-start-1 lg:row-start-1 lg:self-end">
          <div data-hero data-hero-fade className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-brass sm:gap-3.5 sm:text-xs sm:tracking-[0.3em]">
            <span className="block h-px w-8 bg-brass sm:w-11" />
            Pizzeria e Trattoria · Cluj
          </div>
          <SplitHeading
            as="h1"
            trigger="load"
            delay={0.2}
            className="display text-[clamp(2.6rem,11.4vw,5.5rem)] leading-[0.92] tracking-[-0.015em] text-balance lg:text-[clamp(4.5rem,7.3vw,7.25rem)] lg:leading-[0.9]"
          >
            Rețete din Puglia, <em className="text-brass-light">coapte în Cluj.</em>
          </SplitHeading>
        </div>

        {/* 2. Pizza (pe mobil apare imediat sub titlu) */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[min(86vw,420px)] items-center justify-center sm:max-w-[520px] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:max-w-[640px] lg:self-center">
          <div data-hero data-hero-ring className="absolute inset-[2%] rounded-full">
            <div data-hero-ring-dash className="size-full rounded-full border border-dashed border-brass/35" />
          </div>
          <div data-hero data-hero-ring className="absolute inset-[11%] rounded-full bg-panel shadow-[inset_0_0_0_1px_rgba(239,232,218,0.06)]" />
          <div data-hero-scroll className="relative w-[100%] sm:w-[108%] lg:w-[112%]">
            <div data-hero data-hero-pizza>
              <div data-hero-spin>
                <Image
                  src="/images/hero-pizza.png"
                  alt="Pizza Primavera cu roșii cherry, radicchio și rucola"
                  width={1224}
                  height={816}
                  preload
                  sizes="(min-width: 1024px) 640px, (min-width: 640px) 520px, 90vw"
                  className="h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
                />
              </div>
            </div>
          </div>

          <div data-hero data-hero-card className="absolute left-0 top-[6%] flex items-center gap-2.5 rounded-2xl border border-cream/10 bg-ink/85 px-3 py-2.5 backdrop-blur-md sm:left-[-2%] sm:gap-3 sm:px-4 sm:py-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-brass text-ink sm:size-10">
              <ClockIcon className="size-4 sm:size-[18px]" />
            </span>
            <span className="flex flex-col">
              <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-muted sm:text-[10.5px]">Luni – Sâmbătă</span>
              <span className="text-[13px] font-bold text-ivory sm:text-[15px]">10:00 – 21:00</span>
            </span>
          </div>

          <button
            data-hero
            data-hero-card
            type="button"
            onClick={() => openQuickView("primavera")}
            className="absolute bottom-[3%] right-0 flex min-w-[160px] flex-col gap-0.5 rounded-[18px] bg-cream p-3 text-left text-ink shadow-[0_24px_50px_rgba(0,0,0,0.4)] active:scale-[0.97] sm:min-w-[230px] sm:gap-1 sm:rounded-[20px] sm:p-5"
          >
            <span className="text-[9.5px] font-extrabold uppercase tracking-[0.16em] text-umber sm:text-[10.5px]">Recomandarea casei</span>
            <span className="font-display text-[24px] font-semibold leading-none sm:text-[30px]">Primavera</span>
            <span className="hidden text-[13px] text-[#4a4f49] sm:block">roșii cherry · radicchio · rucola</span>
            <span className="flex items-center justify-between pt-1.5 text-[13px] font-extrabold sm:pt-2 sm:text-[15px]">
              de la 54 lei
              <span className="flex size-7 items-center justify-center rounded-full bg-ink text-cream sm:size-8">
                <PlusIcon className="size-3.5" />
              </span>
            </span>
          </button>
        </div>

        {/* 3. Text, butoane, cifre */}
        <div className="flex flex-col gap-7 lg:col-start-1 lg:row-start-2">
          <p data-hero data-hero-fade className="max-w-[500px] text-base leading-[1.7] text-soft sm:text-[17px] sm:leading-[1.75] md:text-lg">
            Pizza la cuptor cu mozzarella fior di latte, paste și salate cu ingrediente italienești. Livrăm în Cluj sau te așteptăm pe strada Mureșului.
          </p>
          <div data-hero data-hero-fade className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
            <Magnetic className="w-full sm:w-auto">
              <Link href="/meniu" className="btn btn-primary min-h-14 w-full px-8 text-sm sm:w-auto">
                Comandă acum <ArrowRight className="size-4" />
              </Link>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Link href="/rezervari" className="btn btn-ghost min-h-14 w-full px-8 text-sm sm:w-auto">
                Rezervă o masă
              </Link>
            </Magnetic>
          </div>
        </div>
        <dl data-hero data-hero-fade className="grid max-w-[560px] grid-cols-3 gap-3 border-t border-cream/10 pt-6 sm:gap-4 sm:pt-7 lg:col-start-1 lg:row-start-3 lg:self-start">
          <div className="flex flex-col gap-1.5">
            <dt className="order-2 text-[10px] font-bold uppercase leading-snug tracking-[0.12em] text-muted sm:text-[11px] sm:tracking-[0.16em]">Rețete de pizza</dt>
            <dd className="font-display text-[34px] leading-none text-ivory sm:text-[42px]">
              <CountUp to={40} suffix="+" />
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="order-2 text-[10px] font-bold uppercase leading-snug tracking-[0.12em] text-muted sm:text-[11px] sm:tracking-[0.16em]">Mărimea mare</dt>
            <dd className="font-display text-[34px] leading-none text-ivory sm:text-[42px]">
              <CountUp to={900} suffix=" g" />
            </dd>
          </div>
          <div className="flex flex-col gap-1.5">
            <dt className="order-2 text-[10px] font-bold uppercase leading-snug tracking-[0.12em] text-muted sm:text-[11px] sm:tracking-[0.16em]">Lei livrarea</dt>
            <dd className="font-display text-[34px] leading-none text-ivory sm:text-[42px]">
              <CountUp to={6.99} decimals={2} />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
