"use client";

import { type Product, priceLabel, tagLabels, type Tag } from "@/lib/menu";
import { useCart } from "@/components/cart/CartProvider";
import { ProductVisual } from "./ProductVisual";
import { PlusIcon } from "@/components/ui/icons";

const tagColor: Record<Tag, string> = {
  specialitate: "text-brass-light",
  vegetariana: "text-veg",
  picanta: "text-hot",
  "din-mare": "text-sea",
};

export function TagBadges({ product, className = "" }: { product: Product; className?: string }) {
  const badges = product.tags.map((t) => ({ key: t, label: tagLabels[t], cls: tagColor[t] }));
  if (product.oldPrice) badges.push({ key: "specialitate", label: `−${product.oldPrice - product.price} lei`, cls: "text-brass-light" });
  if (!badges.length) return null;
  return (
    <span className={`flex flex-wrap gap-1.5 ${className}`}>
      {badges.map((b) => (
        <span key={b.label} className={`rounded-full bg-ink/85 px-2.5 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em] backdrop-blur ${b.cls}`}>
          {b.label}
        </span>
      ))}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { openQuickView } = useCart();
  return (
    <button
      type="button"
      data-card
      onClick={() => openQuickView(product.slug)}
      aria-label={`Vezi detalii și comandă ${product.name}`}
      className="card-lift img-zoom group relative flex w-full flex-col overflow-hidden rounded-3xl border border-cream/[0.08] bg-panel text-left"
    >
      <span className="relative block aspect-[4/3] w-full overflow-hidden">
        <ProductVisual product={product} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </span>
      <TagBadges product={product} className="absolute left-3.5 top-3.5" />
      <span className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
        <span className="flex items-baseline justify-between gap-3">
          <span className="font-display text-[28px] font-semibold leading-[1.05] text-ivory">{product.name}</span>
          <span className="shrink-0 text-[11px] font-bold tracking-wider text-dim">{product.weight}</span>
        </span>
        <span className="line-clamp-2 text-[13.5px] leading-relaxed text-muted first-letter:uppercase">{product.description}</span>
        <span className="mt-auto flex items-center justify-between border-t border-cream/[0.08] pt-4">
          <span className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-ivory">{priceLabel(product)}</span>
            {product.oldPrice && <span className="text-xs text-dim line-through">{product.oldPrice} lei</span>}
          </span>
          <span className="flex size-10 items-center justify-center rounded-full bg-brass text-ink transition-transform duration-500 group-hover:rotate-90">
            <PlusIcon className="size-4" />
          </span>
        </span>
      </span>
    </button>
  );
}
