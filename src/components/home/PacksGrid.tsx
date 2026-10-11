"use client";

import { productsByCategory } from "@/lib/menu";
import { useCart } from "@/components/cart/CartProvider";

export function PacksGrid() {
  const { openQuickView } = useCart();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {productsByCategory.pachete.map((k, i) => {
        const hi = i === 1;
        return (
          <article
            key={k.slug}
            data-reveal
            className={`card-lift relative flex flex-col gap-6 rounded-[26px] p-7 ${hi ? "bg-ink text-cream" : "border border-ink/10 bg-paper text-ink"}`}
          >
            {hi && (
              <span className="absolute -top-3 left-7 rounded-full bg-brass px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink">
                Cel mai ales
              </span>
            )}
            <div className="flex items-start justify-between gap-3">
              <span className="font-display text-[96px] font-medium leading-[0.8]">{k.packCount}</span>
              <span className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${hi ? "bg-brass text-ink" : "bg-ink text-cream"}`}>
                −{(k.oldPrice ?? 0) - k.price} lei
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] font-extrabold uppercase tracking-[0.16em]">Pizza la alegere</span>
              <span className="text-[15px] opacity-80">+ {k.packExtras}</span>
            </div>
            <div className="flex items-baseline gap-3 border-t border-current/20 pt-5">
              <span className="font-display text-[44px] font-semibold leading-none">{k.price} lei</span>
              <span className="text-sm line-through opacity-60">{k.oldPrice} lei</span>
            </div>
            <button
              type="button"
              onClick={() => openQuickView(k.slug)}
              className={`btn mt-auto ${hi ? "btn-primary" : "border border-ink text-ink hover:bg-ink hover:text-cream"}`}
            >
              Alege pachetul
            </button>
          </article>
        );
      })}
    </div>
  );
}
