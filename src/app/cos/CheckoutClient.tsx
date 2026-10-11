"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { CartThumb } from "@/components/cart/CartThumb";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { formatPrice, getProduct, desserts } from "@/lib/menu";
import { site } from "@/lib/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { ArrowRight, CheckIcon, PinIcon, PlusIcon, TrashIcon } from "@/components/ui/icons";

type Method = "livrare" | "ridicare";
type Pay = "card" | "cash" | "tichete";

const payNames: Record<Pay, string> = { card: "Card la livrare", cash: "Numerar", tichete: "Tichete de masă" };

const quick = [
  ...["pepsi-250", "lipton-500"].map((s) => {
    const p = getProduct(s)!;
    return { slug: p.slug, name: p.name, price: p.price, image: p.image, imageKind: p.imageKind, detail: p.weight };
  }),
  ...desserts.slice(1, 4).map((d) => ({ slug: d.id, name: d.label, price: d.price, image: undefined, imageKind: "none" as const, detail: d.note ?? "" })),
];

function Radio({ on }: { on: boolean }) {
  return <span className={`size-5 shrink-0 rounded-full ${on ? "border-[6px] border-brass bg-ink" : "border-[1.5px] border-cream/40"}`} />;
}

export function CheckoutClient() {
  const { lines, subtotal, count, setQty, remove, add, clear, ready } = useCart();
  const [method, setMethod] = useState<Method>("livrare");
  const [pay, setPay] = useState<Pay>("card");
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({ nume: "", telefon: "", email: "", strada: "", bloc: "", ap: "", oras: "Cluj-Napoca", obs: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [receipt, setReceipt] = useState<{ id: string; total: number; pay: Pay; method: Method } | null>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const delivery = method === "livrare" && subtotal > 0 ? site.deliveryFee : 0;
  const total = subtotal + delivery;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  useGSAP(
    () => {
      if (status !== "done" || !doneRef.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(doneRef.current!.children, { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.9, ease: "expo.out" });
        gsap.from("[data-check]", { scale: 0, rotate: -90, duration: 0.9, ease: "back.out(2)" });
      });
      return () => mm.revert();
    },
    { dependencies: [status] },
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.nume.trim()) err.nume = "Scrie-ne numele tău.";
    if (!/^[+\d][\d\s]{8,}$/.test(form.telefon.trim())) err.telefon = "Avem nevoie de un număr de telefon valid.";
    if (method === "livrare" && !form.strada.trim()) err.strada = "Adresa de livrare e obligatorie.";
    if (!agree) err.agree = "Bifează acordul cu termenii pentru a continua.";
    if (lines.length === 0) err.cart = "Coșul e gol.";
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(Object.keys(err)[0] === "agree" ? "acord" : Object.keys(err)[0])?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/comanda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, method, pay, lines, subtotal, delivery, total }),
      });
      const data = (await res.json()) as { ok: boolean; id?: string };
      if (!res.ok || !data.ok) throw new Error("fail");
      setReceipt({ id: data.id ?? "", total, pay, method });
      setStatus("done");
      clear();
      window.scrollTo({ top: 0 });
    } catch {
      setStatus("error");
    }
  }

  if (status === "done" && receipt) {
    return (
      <div ref={doneRef} className="container-x flex max-w-3xl flex-col items-center gap-7 py-24 text-center md:py-32">
        <span data-check className="flex size-28 items-center justify-center rounded-full bg-brass text-ink">
          <CheckIcon className="size-12" />
        </span>
        <span className="eyebrow">Comanda {receipt.id} a fost trimisă</span>
        <h1 className="display text-[clamp(3rem,7vw,5.5rem)]">
          Grazie mille, <em className="text-brass-light">pregătim cuptorul!</em>
        </h1>
        <p className="max-w-xl text-[17px] leading-relaxed text-soft">
          {receipt.method === "livrare"
            ? "Comanda ta a ajuns la noi și pornește spre tine cât de repede se poate. Plata se face la livrare."
            : `Comanda ta a ajuns la noi. Te așteptăm pe ${site.address} să o ridici.`}
        </p>
        <div className="grid w-full gap-4 rounded-3xl border border-cream/10 bg-panel p-6 text-left sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <span className="label">Total</span>
            <span className="display text-4xl">{formatPrice(receipt.total)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="label">Plată</span>
            <span className="pt-2 font-bold text-ivory">{payNames[receipt.pay]}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="label">Întrebări?</span>
            <a href={site.phoneHref} className="pt-2 font-bold text-brass-light">{site.phone}</a>
          </div>
        </div>
        <Link href="/" className="btn btn-primary">
          Înapoi acasă
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="container-x grid grid-cols-1 items-start gap-8 pb-32 pt-8 md:pt-14 lg:grid-cols-[1fr_400px] lg:gap-10">
      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">Finalizează comanda</span>
          <h1 className="display text-[clamp(3rem,6vw,4.75rem)]">
            Coșul <em className="text-brass-light">tău</em>
          </h1>
        </div>

        {/* Produse */}
        <div className="rounded-[26px] border border-cream/[0.08] bg-panel px-5 sm:px-7">
          {ready && lines.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-14 text-center">
              <span className="display text-3xl">Coșul e gol</span>
              <Link href="/meniu" className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-brass-light">
                Mergi la meniu →
              </Link>
            </div>
          )}
          {lines.map((l) => (
            <div key={l.id} className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 border-b border-cream/[0.08] py-5 sm:grid-cols-[auto_1fr_auto_auto_auto]">
              <CartThumb line={l} size="lg" />
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-display text-[24px] font-semibold leading-tight text-ivory">{l.name}</span>
                {l.details.length > 0 && <span className="text-[13px] text-muted">{l.details.join(" · ")}</span>}
                <span className="text-[13px] text-dim">{formatPrice(l.unit)} / buc.</span>
              </div>
              <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-3 sm:justify-end sm:gap-5">
                <QtyStepper value={l.qty} onChange={(n) => setQty(l.id, n)} size="sm" />
                <span className="min-w-24 text-right text-[17px] font-extrabold">{formatPrice(l.unit * l.qty)}</span>
                <button type="button" onClick={() => remove(l.id)} aria-label={`Șterge ${l.name}`} className="flex size-11 items-center justify-center rounded-full border border-cream/15 text-muted transition-colors hover:border-hot hover:text-hot">
                  <TrashIcon className="size-4" />
                </button>
              </div>
            </div>
          ))}
          <span className="block pt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-brass-light sm:hidden">Adaugă rapid</span>
          <div className="no-scrollbar -mx-5 flex items-center gap-2.5 overflow-x-auto overscroll-x-contain px-5 py-4 sm:mx-0 sm:flex-wrap sm:px-0 sm:py-5">
            <span className="mr-1 hidden text-xs font-extrabold uppercase tracking-[0.18em] text-brass-light sm:inline">Adaugă rapid</span>
            {quick.map((q) => (
              <button
                key={q.slug}
                type="button"
                onClick={() => add({ slug: q.slug, name: q.name, image: q.image, imageKind: q.imageKind, unit: q.price, qty: 1, details: q.detail ? [q.detail] : [] })}
                className="chip h-11 shrink-0 whitespace-nowrap"
              >
                <PlusIcon className="size-3 text-brass" />
                {q.name} <span className="font-extrabold text-brass">{q.price} lei</span>
              </button>
            ))}
          </div>
          {errors.cart && <p role="alert" className="pb-4 text-sm font-bold text-hot">{errors.cart}</p>}
        </div>

        {/* Livrare */}
        <fieldset className="flex flex-col gap-5 rounded-[26px] border border-cream/[0.08] bg-panel p-5 sm:p-7">
          <legend className="sr-only">Cum primești comanda</legend>
          <h2 className="flex items-center gap-3.5 font-display text-[30px] font-semibold text-ivory">
            <span className="flex size-9 items-center justify-center rounded-full bg-brass font-sans text-sm font-extrabold text-ink">1</span>
            Cum primești comanda?
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                { k: "livrare", t: "Livrare la domiciliu", s: "În Cluj-Napoca", p: formatPrice(site.deliveryFee) },
                { k: "ridicare", t: "Ridicare personală", s: site.address, p: "Gratuit" },
              ] as const
            ).map((o) => (
              <button
                key={o.k}
                type="button"
                aria-pressed={method === o.k}
                onClick={() => setMethod(o.k)}
                className={`flex min-h-[84px] items-center justify-between gap-4 rounded-2xl border-[1.5px] p-4 text-left transition-colors sm:p-5 ${
                  method === o.k ? "border-brass bg-brass/15" : "border-cream/15 bg-ink hover:border-cream/30"
                }`}
              >
                <span className="flex items-center gap-3.5">
                  <Radio on={method === o.k} />
                  <span className="flex flex-col gap-0.5">
                    <span className="font-extrabold text-ivory">{o.t}</span>
                    <span className="text-[13px] text-soft">{o.s}</span>
                  </span>
                </span>
                <span className="text-[15px] font-extrabold">{o.p}</span>
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="nume" label="Nume și prenume" error={errors.nume}>
              <input id="nume" autoComplete="name" value={form.nume} onChange={set("nume")} placeholder="ex: Andrei Pop" className="field" />
            </Field>
            <Field id="telefon" label="Telefon" error={errors.telefon}>
              <input id="telefon" type="tel" autoComplete="tel" value={form.telefon} onChange={set("telefon")} placeholder="07xx xxx xxx" className="field" />
            </Field>
            <Field id="email" label="Email (opțional)" className="sm:col-span-2">
              <input id="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} placeholder="nume@email.ro" className="field" />
            </Field>
          </div>

          {method === "livrare" ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <Field id="strada" label="Stradă și număr" error={errors.strada} className="sm:col-span-3">
                <input id="strada" autoComplete="street-address" value={form.strada} onChange={set("strada")} placeholder="ex: Str. Mureșului 20" className="field" />
              </Field>
              <Field id="bloc" label="Bloc / scară">
                <input id="bloc" value={form.bloc} onChange={set("bloc")} placeholder="opțional" className="field" />
              </Field>
              <Field id="ap" label="Etaj / apartament">
                <input id="ap" value={form.ap} onChange={set("ap")} placeholder="opțional" className="field" />
              </Field>
              <Field id="oras" label="Localitate">
                <input id="oras" value={form.oras} onChange={set("oras")} className="field" />
              </Field>
            </div>
          ) : (
            <div className="flex items-center gap-4 rounded-2xl border border-brass/35 bg-brass/10 p-4 sm:p-5">
              <PinIcon className="size-6 shrink-0 text-brass" />
              <span className="flex flex-col">
                <span className="font-extrabold text-ivory">Ridici de la Seba, {site.address}</span>
                <span className="text-[13px] text-soft">{site.hours}</span>
              </span>
            </div>
          )}

          <Field id="obs" label="Observații pentru bucătărie sau livrator">
            <textarea id="obs" rows={3} value={form.obs} onChange={set("obs")} placeholder="ex: fără ceapă, interfon 24" className="field resize-y" />
          </Field>
          <p className="text-[13px] text-muted">{site.hoursNote}</p>
        </fieldset>

        {/* Plata */}
        <fieldset className="flex flex-col gap-5 rounded-[26px] border border-cream/[0.08] bg-panel p-5 sm:p-7">
          <legend className="sr-only">Plata</legend>
          <h2 className="flex items-center gap-3.5 font-display text-[30px] font-semibold text-ivory">
            <span className="flex size-9 items-center justify-center rounded-full bg-brass font-sans text-sm font-extrabold text-ink">2</span>
            Plata
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {(
              [
                { k: "card", t: "Card la livrare", s: "POS la livrator sau la ridicare" },
                { k: "cash", t: "Numerar", s: "Plătești la primirea comenzii" },
                { k: "tichete", t: "Tichete de masă", s: "Up, Edenred, Sodexo, Translivania" },
              ] as const
            ).map((o) => (
              <button
                key={o.k}
                type="button"
                aria-pressed={pay === o.k}
                onClick={() => setPay(o.k)}
                className={`flex min-h-[84px] items-center gap-3.5 rounded-2xl border-[1.5px] p-4 text-left transition-colors ${
                  pay === o.k ? "border-brass bg-brass/15" : "border-cream/15 bg-ink hover:border-cream/30"
                }`}
              >
                <Radio on={pay === o.k} />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-extrabold text-ivory">{o.t}</span>
                  <span className="text-[12.5px] leading-snug text-soft">{o.s}</span>
                </span>
              </button>
            ))}
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-soft">
            <input id="acord" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-brass" />
            <span>
              Am citit și sunt de acord cu <Link href="/termeni-si-conditii" className="underline underline-offset-2">Termenii și condițiile</Link>,{" "}
              <Link href="/politica-de-confidentialitate" className="underline underline-offset-2">Politica de confidențialitate</Link> și{" "}
              <Link href="/politica-de-livrare" className="underline underline-offset-2">Politica de livrare</Link>.
            </span>
          </label>
          {errors.agree && <p role="alert" className="text-sm font-bold text-hot">{errors.agree}</p>}
        </fieldset>
      </div>

      {/* Sumar */}
      <aside aria-label="Sumar comandă" className="flex flex-col gap-4 rounded-[28px] bg-cream p-6 text-ink sm:p-8 lg:sticky lg:top-28">
        <span className="font-display text-4xl font-semibold leading-none">Sumar</span>
        <div className="flex flex-col gap-2.5 border-b border-ink/15 pb-4">
          {lines.map((l) => (
            <div key={l.id} className="flex justify-between gap-3 text-sm">
              <span className="text-[#3d433d]">
                {l.qty} × {l.name}
              </span>
              <span className="whitespace-nowrap font-bold">{formatPrice(l.unit * l.qty)}</span>
            </div>
          ))}
          {lines.length === 0 && <span className="text-sm text-[#4a4f49]">Niciun produs încă.</span>}
        </div>
        <div className="flex justify-between text-[15px] text-[#3d433d]">
          <span>Subtotal ({count})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[15px] text-[#3d433d]">
          <span>{method === "livrare" ? "Livrare" : "Ridicare personală"}</span>
          <span>{method === "livrare" ? formatPrice(delivery) : "Gratuit"}</span>
        </div>
        <div className="flex items-baseline justify-between border-t border-dashed border-ink/25 pt-4">
          <span className="text-[13px] font-extrabold uppercase tracking-[0.16em]">Total</span>
          <span className="font-display text-5xl font-semibold leading-none">{formatPrice(total)}</span>
        </div>
        <button type="submit" disabled={status === "sending"} className="btn btn-dark mt-1 min-h-[60px] text-sm disabled:opacity-60">
          {status === "sending" ? "Se trimite…" : "Plasează comanda"} <ArrowRight className="size-4" />
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm font-bold text-[#8a2e1a]">
            Comanda nu a putut fi trimisă. Încearcă din nou sau sună la {site.phone}.
          </p>
        )}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {["Up", "Edenred", "Sodexo", "Translivania", "Card", "Cash"].map((x) => (
            <span key={x} className="rounded-lg border border-ink/10 bg-paper px-2.5 py-1.5 text-[11px] font-extrabold">
              {x}
            </span>
          ))}
        </div>
        <span className="text-[12.5px] leading-relaxed text-[#4a4f49]">
          Preferi la telefon? Sună la{" "}
          <a href={site.phoneHref} className="font-extrabold text-ink">
            {site.phone}
          </a>
          .
        </span>
      </aside>

      {/* Bară fixă pe telefon: totalul + trimitere, mereu la îndemână */}
      {lines.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-ink/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <span className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Total</span>
              <span className="font-display text-[28px] font-semibold leading-none text-ivory">{formatPrice(total)}</span>
            </span>
            <button type="submit" disabled={status === "sending"} className="btn btn-primary min-h-[52px] flex-1 px-4 text-[13px] disabled:opacity-60">
              {status === "sending" ? "Se trimite…" : "Plasează comanda"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({ id, label, error, className = "", children }: { id: string; label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {error && (
        <span role="alert" className="text-[13px] font-semibold text-hot">
          {error}
        </span>
      )}
    </div>
  );
}
