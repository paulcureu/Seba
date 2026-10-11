import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allProducts,
  capitalize,
  categories,
  getProduct,
  ingredientsOf,
  productsByCategory,
  shortPrice,
} from "@/lib/menu";
import { site } from "@/lib/site";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ProductVisual } from "@/components/product/ProductVisual";
import { ProductConfigurator } from "@/components/product/ProductConfigurator";
import { ProductCard, TagBadges } from "@/components/product/ProductCard";
import { QuickAdd } from "@/components/product/QuickAdd";
import { ArrowRight } from "@/components/ui/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/meniu/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const title = p.category === "pizza" ? `Pizza ${p.name}` : p.name;
  return {
    title,
    description: `${title} — ${capitalize(p.description)}. ${p.weight}, ${p.category === "pizza" ? `de la ${p.price} lei` : shortPrice(p.price)}. Comandă online de la Pizza Seba, Cluj-Napoca.`,
    alternates: { canonical: `/meniu/${p.slug}` },
    openGraph: p.image ? { images: [{ url: p.image }] } : undefined,
  };
}

const pairingSlugs = ["weihenstephan", "paulaner", "carlsberg-na", "lipton-500"];

export default async function ProductPage({ params }: PageProps<"/meniu/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cat = categories.find((c) => c.id === product.category)!;
  const isPizza = product.category === "pizza";
  const ingredients = ingredientsOf(product);
  const showIngredients = !["bauturi", "pachete", "sosuri"].includes(product.category);
  const related = productsByCategory[product.category]
    .filter((p) => p.slug !== product.slug && p.imageKind !== "none")
    .slice(0, 4);
  const pairings = pairingSlugs.map((s) => getProduct(s)!).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: isPizza ? `Pizza ${product.name}` : product.name,
    description: capitalize(product.description),
    image: product.image ? `${site.url}${product.image}` : undefined,
    offers: { "@type": "Offer", price: product.price, priceCurrency: "RON" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container-x flex flex-col gap-8 pb-24 pt-8 md:pt-10">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          <Link href="/" className="hover:text-cream">Acasă</Link>
          <span className="text-[#5e6960]">/</span>
          <Link href="/meniu" className="hover:text-cream">Meniu</Link>
          <span className="text-[#5e6960]">/</span>
          <Link href={product.category === "pizza" ? "/meniu" : `/meniu?categorie=${product.category}`} className="hover:text-cream">
            {cat.label}
          </Link>
          <span className="text-[#5e6960]">/</span>
          <span className="text-brass-light">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            <div data-reveal className="relative aspect-square overflow-hidden rounded-[32px]">
              <ProductVisual product={product} sizes="(min-width: 1024px) 640px, 100vw" zoom={isPizza ? 1.5 : 1.1} large preload />
              <span className="absolute left-5 top-5">
                <TagBadges product={product} />
              </span>
              {isPizza && (
                <span className="absolute bottom-5 right-5 flex size-28 flex-col items-center justify-center rounded-full bg-brass text-center text-ink sm:size-32">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.16em]">Mărimea mare</span>
                  <span className="font-display text-4xl font-semibold leading-none">900 g</span>
                </span>
              )}
            </div>
            <div data-reveal className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5 rounded-[20px] border border-cream/[0.08] bg-panel px-5 py-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-dim">Gramaj</span>
                <span className="text-base font-bold text-ivory">{product.weight}</span>
              </div>
              <div className="flex flex-col gap-1.5 rounded-[20px] border border-cream/[0.08] bg-panel px-5 py-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-dim">Preț</span>
                <span className="text-base font-bold text-ivory">
                  {isPizza ? `${product.price} – ${product.priceLarge} lei` : shortPrice(product.price)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">{cat.label}</span>
              <SplitHeading as="h1" trigger="load" className="display text-[clamp(3.25rem,7vw,5.75rem)] leading-[0.92]">
                {isPizza ? (
                  <>
                    <em className="text-brass-light">Pizza</em> {product.name}
                  </>
                ) : (
                  product.name
                )}
              </SplitHeading>
              <p data-reveal className="text-[17px] leading-[1.75] text-soft">
                {isPizza ? `Coaptă la cuptor, cu ${product.description}.` : capitalize(product.description)}
              </p>
            </div>
            <div data-reveal>
              <ProductConfigurator product={product} variant="page" />
            </div>
          </div>
        </div>
      </section>

      {showIngredients && (
        <section className="bg-cream py-20 text-ink md:py-28">
          <div className="container-x flex flex-col gap-12">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="flex flex-col gap-3.5">
                <span className="eyebrow text-umber">Ce găsești în farfurie</span>
                <SplitHeading className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-[0.95]">
                  {ingredients.length} ingrediente, <em>un singur gust.</em>
                </SplitHeading>
              </div>
              <p data-reveal className="max-w-sm text-base leading-relaxed text-[#4a4f49]">
                Ingrediente italienești de calitate superioară, ca în bucătăriile din Puglia.
              </p>
            </div>
            <ol className="grid grid-cols-2 border-t border-ink/20 sm:grid-cols-3 lg:grid-cols-6">
              {ingredients.map((g, i) => (
                <li key={g} data-reveal className="flex flex-col gap-3 border-b border-r border-ink/10 py-7 pr-4">
                  <span className="text-xs font-extrabold tracking-[0.16em] text-umber">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[26px] font-medium leading-[1.05] sm:text-3xl">{capitalize(g)}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {product.category !== "bauturi" && (
        <section className="py-20 md:py-28">
          <div className="container-x flex flex-col gap-10">
            <div className="flex flex-col gap-3.5">
              <span className="eyebrow">Merge perfect cu</span>
              <SplitHeading className="display text-[clamp(2.25rem,4vw,3.5rem)]">
                O bere rece <em className="text-brass-light">sau un suc.</em>
              </SplitHeading>
            </div>
            <QuickAdd products={pairings} />
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="pb-24 md:pb-32">
          <div className="container-x flex flex-col gap-10">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="flex flex-col gap-3.5">
                <span className="eyebrow">Dacă îți place {product.name}</span>
                <SplitHeading className="display text-[clamp(2.25rem,4vw,3.5rem)]">
                  Încearcă și <em className="text-brass-light">acestea.</em>
                </SplitHeading>
              </div>
              <Link href="/meniu" className="group inline-flex items-center gap-2 border-b border-brass pb-1.5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-brass-light">
                Tot meniul <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <div key={p.slug} data-reveal>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
