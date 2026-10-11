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


/** Card de produs: orizontal și compact pe telefon, vertical cu poză mare de la tabletă în sus. */
export function ProductCard({ product }: { product: Product }) {
  const { openQuickView } = useCart();
  const firstTag = product.tags[0];
  return (
    <button
      type="button"
      data-card
      onClick={() => openQuickView(product.slug)}
      aria-label={`Vezi detalii și comandă ${product.name}`}
      className="card-lift img-zoom press group relative flex w-full flex-row overflow-hidden rounded-[22px] border border-cream/[0.08] bg-panel text-left sm:flex-col sm:rounded-3xl"
    >
      <span className="relative block min-h-[136px] w-[118px] shrink-0 self-stretch overflow-hidden min-[400px]:w-[132px] sm:aspect-[4/3] sm:min-h-0 sm:w-full sm:self-auto">
        <ProductVisual product={product} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 140px" />
      </span>
      <span className="absolute left-3.5 top-3.5 hidden sm:block">
        <TagBadges product={product} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1.5 px-4 py-3.5 sm:gap-2.5 sm:p-6">
        {(firstTag || product.oldPrice) && (
          <span className={`text-[10px] font-extrabold uppercase tracking-[0.14em] sm:hidden ${firstTag ? tagColor[firstTag] : "text-brass-light"}`}>
            {product.tags.map((t) => tagLabels[t]).join(" · ") || `Economisești ${(product.oldPrice ?? 0) - product.price} lei`}
          </span>
        )}
        <span className="flex items-baseline justify-between gap-3">
          <span className="font-display text-[22px] font-semibold leading-[1.05] text-ivory sm:text-[28px]">{product.name}</span>
          <span className="hidden shrink-0 text-[11px] font-bold tracking-wider text-dim sm:inline">{product.weight}</span>
        </span>
        <span className="line-clamp-2 text-[12.5px] leading-relaxed text-muted first-letter:uppercase sm:text-[13.5px]">{product.description}</span>
        <span className="mt-auto flex items-center justify-between pt-1 sm:border-t sm:border-cream/[0.08] sm:pt-4">
          <span className="flex items-baseline gap-2">
            <span className="text-[15px] font-extrabold text-ivory sm:text-base">{priceLabel(product)}</span>
            {product.oldPrice && <span className="text-xs text-dim line-through">{product.oldPrice} lei</span>}
          </span>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brass text-ink transition-transform duration-500 group-hover:rotate-90 sm:size-10">
            <PlusIcon className="size-4" />
          </span>
        </span>
      </span>
    </button>
  );
}
