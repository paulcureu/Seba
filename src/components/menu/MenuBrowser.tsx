"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, pizzaFilters, productsByCategory, type Category } from "@/lib/menu";
import { site } from "@/lib/site";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchIcon } from "@/components/ui/icons";
import { getLenis } from "@/lib/scroll";

type PizzaFilter = (typeof pizzaFilters)[number]["id"];

function isCategory(v: string | null): v is Category {
  return !!v && categories.some((c) => c.id === v);
}

export function MenuBrowser() {
  const router = useRouter();
  const [cat, setCat] = useState<Category>("pizza");
  const [filter, setFilter] = useState<PizzaFilter>("toate");
  const [q, setQ] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  // Categoria din URL (?categorie=paste) se citește după încărcare, ca pagina să rămână statică (bun pentru SEO).
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("categorie");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincronizare unică cu URL-ul
    if (isCategory(initial)) setCat(initial);
  }, []);

  const meta = categories.find((c) => c.id === cat)!;

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    // Căutarea se face în tot meniul; altfel arătăm categoria aleasă
    let list = query ? Object.values(productsByCategory).flat() : productsByCategory[cat];
    if (!query && cat === "pizza" && filter !== "toate") {
      list = list.filter((p) => (filter === "clasice" ? !p.tags.includes("specialitate") : p.tags.includes(filter)));
    }
    if (query) list = list.filter((p) => `${p.name} ${p.description}`.toLowerCase().includes(query));
    return list;
  }, [cat, filter, q]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-card]",
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: { each: 0.045, from: "start" }, ease: "expo.out", clearProps: "transform" },
        );
      });
      return () => mm.revert();
    },
    { scope: gridRef, dependencies: [cat, filter, q], revertOnUpdate: true },
  );

  const listRef = useRef<HTMLElement>(null);

  const chooseCat = (c: Category, tab?: HTMLElement) => {
    tab?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    // Dacă ești mai jos în listă, urcă la începutul rezultatelor
    const list = listRef.current;
    if (list && list.getBoundingClientRect().top < 0) {
      const lenis = getLenis();
      const y = list.getBoundingClientRect().top + window.scrollY - 130;
      if (lenis) lenis.scrollTo(y, { duration: 0.8 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    }
    setCat(c);
    setFilter("toate");
    setQ("");
    router.replace(c === "pizza" ? "/meniu" : `/meniu?categorie=${c}`, { scroll: false });
  };

  return (
    <>
      <div className="container-x -mt-2 mb-2 flex flex-col gap-3 md:max-w-[1320px]">
        <label htmlFor="cauta" className="label">
          Caută în meniu
        </label>
        <div className="flex h-14 max-w-xl items-center gap-3 rounded-full border border-cream/15 bg-panel px-5 transition-colors focus-within:border-brass">
          <SearchIcon className="size-[18px] shrink-0 text-brass" />
          <input
            id="cauta"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ex: gorgonzola, hribi, Diavola"
            className="h-full min-w-0 flex-1 bg-transparent text-base text-ivory outline-none"
          />
        </div>
      </div>

      <div className="sticky top-[72px] z-30 mt-6 border-y border-cream/[0.08] bg-ink/90 backdrop-blur-xl transition-[top] duration-500 md:top-[84px] [html[data-header=hidden]_&]:top-0">
        <div role="tablist" aria-label="Categorii" className="no-scrollbar container-x flex snap-x gap-2 overflow-x-auto overscroll-x-contain scroll-px-5 py-3 sm:gap-2.5 sm:py-3.5 [mask-image:linear-gradient(90deg,#000_88%,transparent)] md:[mask-image:none]">
          {categories.map((c) => {
            const on = c.id === cat && !q;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={(e) => chooseCat(c.id, e.currentTarget)}
                className={`press flex h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors ${
                  on ? "border-cream bg-cream text-ink" : "border-cream/20 text-cream hover:border-cream/50"
                }`}
              >
                {c.label}
                <span className={`rounded-full px-1.5 py-0.5 text-[11px] ${on ? "bg-ink text-cream" : "bg-cream/10 text-soft"}`}>{productsByCategory[c.id].length}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section ref={listRef} className="container-x flex flex-col gap-6 pb-28 pt-9 sm:gap-8 md:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow">{q ? "Rezultate" : meta.kicker}</span>
            <h2 className="display text-[clamp(2.25rem,4.4vw,3.6rem)]">{q ? `„${q}”` : meta.title}</h2>
          </div>
          <span className="text-sm text-muted">
            {items.length} {items.length === 1 ? "preparat" : "preparate"}
          </span>
        </div>

        {cat === "pizza" && !q && (
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            {pizzaFilters.map((f) => (
              <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)} className="chip h-11 shrink-0">
                {f.label}
              </button>
            ))}
          </div>
        )}

        <div ref={gridRef} className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="flex flex-col items-center gap-2.5 rounded-3xl border border-dashed border-cream/20 px-6 py-16 text-center">
            <span className="display text-3xl">Nimic găsit pentru „{q}”</span>
            <span className="text-[15px] text-muted">Încearcă un ingredient, de exemplu „hribi” sau „gorgonzola”.</span>
          </div>
        )}

        <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-cream/[0.08] bg-panel p-7 md:flex-row md:items-center md:p-8">
          <div className="flex flex-col gap-1.5">
            <span className="font-display text-[28px] text-ivory">Preferi să comanzi la telefon?</span>
            <span className="text-sm text-muted">Sună sau scrie-ne pe WhatsApp, {site.hours.toLowerCase()}.</span>
          </div>
          <a href={site.phoneHref} className="btn btn-primary">
            {site.phone}
          </a>
        </div>
      </section>
    </>
  );
}
