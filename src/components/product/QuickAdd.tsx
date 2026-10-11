"use client";

import type { Product } from "@/lib/menu";
import { shortPrice } from "@/lib/menu";
import { useCart } from "@/components/cart/CartProvider";
import { ProductVisual } from "./ProductVisual";
import { PlusIcon } from "@/components/ui/icons";

/** Carduri mici „adaugă rapid” (băuturi recomandate). */
export function QuickAdd({ products }: { products: Product[] }) {
  const { add } = useCart();
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((d) => (
        <div key={d.slug} data-reveal className="card-lift flex flex-col overflow-hidden rounded-3xl border border-cream/[0.08] bg-panel">
          <span className="relative block h-48 sm:h-56">
            <ProductVisual product={d} sizes="(min-width: 1024px) 25vw, 50vw" />
          </span>
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <span className="flex flex-col">
              <span className="text-[15px] font-bold text-ivory">{d.name}</span>
              <span className="text-xs text-muted">{d.description}</span>
            </span>
            <button
              type="button"
              onClick={() => add({ slug: d.slug, name: d.name, image: d.image, imageKind: d.imageKind, unit: d.price, qty: 1, details: [d.weight] })}
              aria-label={`Adaugă ${d.name} în coș`}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full border border-brass/60 px-4 text-[13px] font-extrabold text-brass-light transition-colors hover:bg-brass hover:text-ink"
            >
              <PlusIcon className="size-3.5" /> {shortPrice(d.price)}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
