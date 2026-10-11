import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Parallax } from "@/components/motion/Parallax";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Despre noi",
  description:
    "Povestea Seba: peste zece ani în restaurantele din Puglia, apoi o trattoria-pizzeria de familie în Cluj-Napoca, pe Str. Mureșului nr. 14.",
  alternates: { canonical: "/despre" },
};

const chapters = [
  { n: "I", kicker: "Puglia, Italia", title: "Peste zece ani în bucătării italiene", text: "Înainte de Seba, am lucrat mai bine de zece ani în restaurante renumite din Puglia. Acolo am învățat aluatul, sosurile și respectul pentru ingrediente." },
  { n: "II", kicker: "Întoarcerea acasă", title: "Un plan simplu: gust italian, în Cluj", text: "Ne-am întors în România cu dorința de a deschide o trattoria-pizzeria care folosește ingrediente italienești de calitate superioară." },
  { n: "III", kicker: site.address, title: "Seba, construită împreună cu familia", text: "Am ales o locație aproape de cartierele noi, de zona de birouri Iulius Mall și de campusul studențesc. Restul l-a făcut familia." },
];

const gallery = [
  { src: "/images/menu/fructe-de-mare.jpg", alt: "Pizza cu fructe de mare", cls: "col-span-2 row-span-2" },
  { src: "/images/menu/tagliatelle-creveti-zucchini.jpg", alt: "Tagliatelle cu creveți și zucchini", cls: "" },
  { src: "/images/menu/crudaiola.jpg", alt: "Pizza Crudaiola", cls: "" },
  { src: "/images/menu/calzone-seba.jpg", alt: "Calzone Seba", cls: "" },
  { src: "/images/menu/insalata-pollo-rucola.jpg", alt: "Salată pollo rucola", cls: "" },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-x flex flex-col gap-12 pt-12 md:gap-14 md:pt-20">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex max-w-4xl flex-col gap-5">
            <span className="eyebrow">Despre noi</span>
            <SplitHeading as="h1" trigger="load" className="display text-[clamp(3.5rem,9vw,8rem)] leading-[0.88] tracking-[-0.02em]">
              De la Puglia <em className="text-brass-light">la Mureșului 14.</em>
            </SplitHeading>
          </div>
          <p data-reveal className="max-w-sm text-[17px] leading-[1.75] text-soft">
            O trattoria-pizzeria de familie, construită pe ingrediente italienești și pe meșteșugul învățat în sudul Italiei.
          </p>
        </div>
        <div data-reveal className="relative">
          <Parallax amount={12} className="h-[380px] rounded-[28px] sm:h-[460px] md:h-[580px] md:rounded-[36px]">
            <Image src="/images/menu/valtellina.jpg" alt="Pizza Valtellina" fill sizes="100vw" preload className="scale-125 object-cover" />
          </Parallax>
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2.5 md:inset-x-8 md:bottom-8">
            {["Locație vintage", "Atmosferă relaxantă", "Potrivit pentru familii"].map((t) => (
              <span key={t} className="rounded-full bg-ink/85 px-4 py-3 text-[13px] font-bold tracking-wide backdrop-blur-md">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="flex flex-col gap-5 lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow">Povestea</span>
          <SplitHeading className="display text-[clamp(2.5rem,4.6vw,4rem)]">
            Ce am adus <em className="text-brass-light">acasă din Italia.</em>
          </SplitHeading>
          <p data-reveal className="font-display text-2xl italic leading-snug text-mist md:text-[26px]">
            Ingrediente italienești, meșteșug din Puglia și o masă la care te simți ca acasă.
          </p>
        </div>
        <ol className="flex flex-col">
          {chapters.map((c) => (
            <li key={c.n} data-reveal className="flex gap-6 border-t border-cream/10 py-9 md:gap-8">
              <span className="w-14 shrink-0 font-display text-5xl leading-[0.9] text-brass md:w-20 md:text-6xl">{c.n}</span>
              <span className="flex flex-col gap-2.5">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-muted">{c.kicker}</span>
                <span className="font-display text-[30px] font-semibold leading-[1.05] text-ivory md:text-[34px]">{c.title}</span>
                <span className="text-base leading-[1.75] text-soft">{c.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-cream py-24 text-ink md:py-32">
        <div className="container-x flex flex-col gap-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow text-umber">În ce credem</span>
            <SplitHeading className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-[0.95]">
              Trei lucruri <em>pe care nu le negociem.</em>
            </SplitHeading>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div data-reveal className="flex flex-col gap-5 rounded-[28px] border border-ink/10 bg-paper p-8 md:p-10">
              <span className="font-display text-6xl text-umber">01</span>
              <h3 className="font-display text-[32px] font-semibold">Ingrediente italienești</h3>
              <p className="text-[15.5px] leading-[1.75] text-[#3d433d]">Mozzarella fior di latte, Parmigiano Reggiano, gorgonzola, jamón serrano, bresaola și hribi — pe fiecare pizza.</p>
            </div>
            <div data-reveal className="flex flex-col gap-5 rounded-[28px] bg-ink p-8 text-cream md:p-10">
              <span className="font-display text-6xl text-brass">02</span>
              <h3 className="font-display text-[32px] font-semibold text-ivory">Meșteșug din Puglia</h3>
              <p className="text-[15.5px] leading-[1.75] text-soft">Peste zece ani de bucătărie în restaurante renumite din sudul Italiei, puși acum în fiecare aluat și în fiecare farfurie de paste.</p>
            </div>
            <div data-reveal className="flex flex-col gap-5 rounded-[28px] border border-ink/10 bg-paper p-8 md:p-10">
              <span className="font-display text-6xl text-umber">03</span>
              <h3 className="font-display text-[32px] font-semibold">O afacere de familie</h3>
              <p className="text-[15.5px] leading-[1.75] text-[#3d433d]">Am construit Seba împreună cu familia. De aici vine și atmosfera: relaxată, caldă și potrivită pentru mese cu cei mici.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x flex flex-col gap-10 py-24 md:py-32">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Din bucătăria noastră</span>
            <SplitHeading className="display text-[clamp(2.5rem,4.6vw,4rem)]">
              Pizza, paste <em className="text-brass-light">și răbdare.</em>
            </SplitHeading>
          </div>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="self-start border-b border-brass pb-1.5 text-[13px] font-extrabold uppercase tracking-[0.14em] text-brass-light md:self-auto">
            @pizzaseba pe Instagram →
          </a>
        </div>
        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-4 lg:auto-rows-[250px]">
          {gallery.map((g) => (
            <div key={g.src} data-reveal className={`img-zoom relative overflow-hidden rounded-[22px] md:rounded-[28px] ${g.cls}`}>
              <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="scale-110 object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-x flex flex-col gap-10 pb-24 md:pb-32">
        <ScrubWords
          as="h2"
          text="Aproape de cartierele noi, de zona de birouri Iulius Mall și de campusul studențesc — aproape de oamenii pe care îi hrănim."
          className="display max-w-5xl text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.05]"
        />
      </section>

      <section className="relative overflow-hidden">
        <Parallax amount={12} className="absolute! inset-0">
          <Image src="/images/mille-gusti-wide.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-[#090e0c]/72" />
        <div className="container-x relative flex flex-col justify-between gap-8 py-24 md:flex-row md:items-center md:py-32">
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="eyebrow text-brass-light">La Seba pizzeria e trattoria</span>
            <SplitHeading className="display text-[clamp(2.75rem,5.4vw,4.75rem)]">
              Rezervă o masă <em className="text-brass-light">sau un eveniment.</em>
            </SplitHeading>
          </div>
          <div data-reveal className="flex flex-wrap gap-3">
            <Link href="/rezervari" className="btn btn-primary min-h-14">
              Rezervă acum
            </Link>
            <Link href="/meniu" className="btn btn-ghost min-h-14">
              Vezi meniul
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
