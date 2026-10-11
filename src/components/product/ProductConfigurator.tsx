"use client";

import { useMemo, useState } from "react";
import {
  type Product,
  type AddOn,
  extras,
  sauces,
  desserts,
  formatPrice,
  hasAddOns,
} from "@/lib/menu";
import { useCart } from "@/components/cart/CartProvider";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { CardIcon, PhoneIcon, ScooterIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

type Size = "mica" | "mare";

function ChipGroup({
  items,
  selected,
  toggle,
}: {
  items: AddOn[];
  selected: Set<string>;
  toggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x) => {
        const on = selected.has(x.id);
        return (
          <button key={x.id} type="button" aria-pressed={on} onClick={() => toggle(x.id)} className="chip">
            {x.label}
            <span className={on ? "text-xs font-extrabold text-ink" : "text-xs font-bold text-brass"}>+{x.price} lei</span>
          </button>
        );
      })}
    </div>
  );
}

function SectionTitle({ n, children, optional }: { n?: number; children: React.ReactNode; optional?: boolean }) {
  return (
    <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-brass-light">
      {n ? `${n} · ` : ""}
      {children}
      {optional && <span className="tracking-[0.1em] text-dim"> · opțional</span>}
    </span>
  );
}

export function ProductConfigurator({
  product,
  variant = "modal",
  onAdded,
}: {
  product: Product;
  variant?: "modal" | "page";
  onAdded?: () => void;
}) {
  const { add } = useCart();
  const isPizza = product.category === "pizza";
  const isPack = product.category === "pachete";
  const withAddOns = hasAddOns(product);
  const [size, setSize] = useState<Size>("mica");
  const [extrasOn, setExtrasOn] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const { unit, details } = useMemo(() => {
    let unit = isPizza && size === "mare" ? product.priceLarge ?? product.price : product.price;
    const details: string[] = [];
    if (isPizza) details.push(size === "mare" ? "900 g" : `${product.smallWeight} g`);
    const pick = (list: AddOn[], label: string, active = true) => {
      const chosen = list.filter((x) => selected.has(x.id));
      if (!active || !chosen.length) return;
      unit += chosen.reduce((s, x) => s + x.price, 0);
      details.push(`${label}: ${chosen.map((x) => x.label).join(", ")}`);
    };
    pick(extras, "Extra", isPizza && extrasOn);
    pick(sauces, "Sos", withAddOns);
    pick(desserts, "Desert", withAddOns);
    if (isPack && note.trim()) details.push(`Pizze: ${note.trim()}`);
    return { unit, details };
  }, [isPizza, isPack, withAddOns, size, extrasOn, selected, note, product]);

  const handleAdd = () => {
    add({
      slug: product.slug,
      name: product.name,
      image: product.image,
      imageKind: product.imageKind,
      unit,
      qty,
      details,
    });
    setSelected(new Set());
    setExtrasOn(false);
    setQty(1);
    setNote("");
    onAdded?.();
  };

  let step = 0;
  const n = () => (variant === "page" ? ++step : undefined);

  return (
    <div className="flex flex-col gap-8">
      {isPizza && (
        <fieldset className="flex flex-col gap-3.5">
          <legend className="mb-3.5 flex w-full justify-between">
            <SectionTitle n={n()}>Alege mărimea</SectionTitle>
            <span className="text-xs font-bold tracking-[0.1em] text-dim">OBLIGATORIU</span>
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { key: "mica", label: `${product.smallWeight} g`, price: product.price, sub: "Mărime normală" },
                { key: "mare", label: "900 g", price: product.priceLarge ?? product.price, sub: "Mărime mare" },
              ] as const
            ).map((z) => {
              const on = size === z.key;
              return (
                <button
                  key={z.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSize(z.key)}
                  className={`flex min-h-[88px] flex-col items-start gap-1.5 rounded-2xl border-[1.5px] p-4 text-left transition-colors ${
                    on ? "border-brass bg-brass/15 text-ivory" : "border-cream/15 bg-panel text-cream hover:border-cream/30"
                  }`}
                >
                  <span className="flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    <span className="flex items-center gap-3">
                      <span className={`size-[18px] shrink-0 rounded-full ${on ? "border-[5px] border-brass bg-ink" : "border-[1.5px] border-cream/40"}`} />
                      <span className="whitespace-nowrap font-display text-[28px] font-semibold leading-none sm:text-[30px]">{z.label}</span>
                    </span>
                    <span className="whitespace-nowrap pl-[30px] text-[15px] font-extrabold sm:pl-0">{z.price} lei</span>
                  </span>
                  <span className="pl-[30px] text-xs font-semibold opacity-75">{z.sub}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {isPizza && (
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle n={n()}>Dorești ingrediente extra?</SectionTitle>
            <div className="inline-flex rounded-full border border-cream/10 bg-ink p-1">
              {[false, true].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  aria-pressed={extrasOn === v}
                  onClick={() => setExtrasOn(v)}
                  className={`h-9 rounded-full px-5 text-[13px] font-bold transition-colors ${extrasOn === v ? "bg-cream text-ink" : "text-soft"}`}
                >
                  {v ? "Da" : "Nu"}
                </button>
              ))}
            </div>
          </div>
          {extrasOn && <ChipGroup items={extras} selected={selected} toggle={toggle} />}
        </div>
      )}

      {withAddOns && (
        <div className="flex flex-col gap-3.5">
          <SectionTitle n={n()} optional>
            Adaugă un sos
          </SectionTitle>
          <ChipGroup items={sauces} selected={selected} toggle={toggle} />
        </div>
      )}

      {withAddOns && (
        <div className="flex flex-col gap-3.5">
          <SectionTitle n={n()} optional>
            Și un desert?
          </SectionTitle>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {desserts.map((d) => {
              const on = selected.has(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(d.id)}
                  className={`flex min-h-[60px] items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 text-left transition-colors ${
                    on ? "border-brass bg-brass/15 text-ivory" : "border-cream/12 bg-panel text-cream hover:border-cream/30"
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="text-sm font-bold">{d.label}</span>
                    <span className="text-xs opacity-70">{d.note}</span>
                  </span>
                  <span className="whitespace-nowrap text-sm font-extrabold">+{d.price} lei</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isPack && (
        <div className="flex flex-col gap-3">
          <label htmlFor={`note-${product.slug}`} className="text-xs font-extrabold uppercase tracking-[0.2em] text-brass-light">
            Ce pizze dorești în pachet?
          </label>
          <textarea
            id={`note-${product.slug}`}
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="ex: 2 × Diavola, 1 × Margherita, 1 × Capriciosa"
            className="field resize-y"
          />
        </div>
      )}

      <div
        className={
          variant === "modal"
            ? "sticky bottom-0 -mx-5 -mb-6 flex items-center gap-3 border-t border-cream/10 bg-overlay/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3.5 backdrop-blur-xl sm:-mx-10 sm:-mb-10 sm:px-10 sm:py-4"
            : "flex flex-col gap-4 rounded-3xl border border-cream/10 bg-panel p-5 sm:p-6"
        }
      >
        {variant === "page" && (
          <div className="flex justify-between gap-4 text-sm text-soft">
            <span>{[product.name, ...details].join(" · ")}</span>
            <span className="whitespace-nowrap font-bold text-ivory">{formatPrice(unit)} / buc.</span>
          </div>
        )}
        <div className={`flex w-full items-center gap-2.5 sm:gap-3 ${variant === "page" ? "flex-wrap" : ""}`}>
          <QtyStepper value={qty} onChange={setQty} size={variant === "modal" ? "sm" : "md"} />
          <button type="button" onClick={handleAdd} className="btn btn-primary min-h-[52px] min-w-0 flex-1 justify-between gap-2 px-5 text-[13px] sm:min-h-14 sm:px-6 sm:text-sm">
            <span>
              Adaugă<span className="hidden min-[400px]:inline"> în coș</span>
            </span>
            <span className="text-base tracking-normal">{formatPrice(unit * qty)}</span>
          </button>
        </div>
        {variant === "page" && (
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
            <span className="inline-flex items-center gap-2"><ScooterIcon className="size-4 text-brass" />Livrare {formatPrice(site.deliveryFee)}</span>
            <span className="inline-flex items-center gap-2"><CardIcon className="size-4 text-brass" />Card, cash sau tichete</span>
            <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-cream"><PhoneIcon className="size-4 text-brass" />Sau sună: 0744 320 701</a>
          </div>
        )}
      </div>
    </div>
  );
}
