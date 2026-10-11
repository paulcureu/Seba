import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rezervă o masă",
  description: "Rezervă o masă sau un eveniment la Pizzeria e Trattoria Seba, Str. Mureșului nr. 14, Cluj-Napoca. Luni – Sâmbătă, 10:00 – 21:00.",
  alternates: { canonical: "/rezervari" },
};

export default function ReservationsPage() {
  return (
    <section className="container-x grid grid-cols-1 items-start gap-10 pb-24 pt-10 md:pt-16 lg:grid-cols-[0.9fr_1.2fr] lg:gap-14 lg:pb-32">
      <div className="flex flex-col gap-6 lg:sticky lg:top-28">
        <span className="eyebrow">Rezervări</span>
        <SplitHeading as="h1" trigger="load" className="display text-[clamp(3.25rem,7vw,6rem)] leading-[1.06]">
          O masă <em className="text-brass-light">pentru tine.</em>
        </SplitHeading>
        <p data-reveal className="text-[17px] leading-[1.75] text-soft">
          La Seba pizzeria e trattoria: locație vintage, atmosferă relaxantă și ambianța potrivită pentru familii. Trimite cererea și revenim cu confirmarea.
        </p>
        <div data-reveal className="relative h-[300px] overflow-hidden rounded-[28px] sm:h-[380px]">
          <Image src="/images/menu/primavera.jpg" alt="Pizza Primavera" fill sizes="(min-width: 1024px) 40vw, 100vw" className="scale-125 object-cover" />
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap justify-between gap-4 rounded-[20px] bg-ink/85 px-5 py-4 backdrop-blur-md">
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Program</span>
              <span className="text-[15px] font-bold">{site.hours}</span>
            </span>
            <span className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Rezervări rapide</span>
              <a href={site.phoneHref} className="text-[15px] font-bold text-brass-light">0744 320 701</a>
            </span>
          </div>
        </div>
      </div>
      <Suspense fallback={<div className="min-h-[700px] rounded-[30px] border border-cream/10 bg-panel" />}>
        <ReservationForm />
      </Suspense>
    </section>
  );
}
