import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Specialties } from "@/components/home/Specialties";
import { PacksGrid } from "@/components/home/PacksGrid";
import { Marquee } from "@/components/motion/Marquee";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Parallax } from "@/components/motion/Parallax";
import { CountUp } from "@/components/motion/CountUp";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { Magnetic } from "@/components/motion/Magnetic";
import { productsByCategory } from "@/lib/menu";
import { site } from "@/lib/site";
import { ArrowRight, ArrowUpRight, ClockIcon, PhoneIcon, PinIcon, PizzaIcon, ScooterIcon, SlidersIcon } from "@/components/ui/icons";

const marquee = ["Mozzarella fior di latte", "Parmigiano Reggiano", "Jamón Serrano", "Bresaola", "Hribi", "Gorgonzola", "Speck", "Rucola", "Radicchio", "Ricotta"];

const steps = [
  { n: "01", title: "Alegi pizza", text: "Peste 40 de rețete: clasice italiene, specialitățile casei, vegetariene și cu fructe de mare.", Icon: PizzaIcon },
  { n: "02", title: "O personalizezi", text: "500/550 g sau 900 g, ingrediente extra, sosuri și desert — totul dintr-o singură fereastră.", Icon: SlidersIcon },
  { n: "03", title: "Livrare sau ridicare", text: "Livrare 6,99 lei. Plătești la livrare cu card, cash sau tichete Up, Edenred, Sodexo.", Icon: ScooterIcon },
];

const cats = [
  { name: "Pizza", count: `${productsByCategory.pizza.length} rețete`, img: "/images/menu/monte-bianco.jpg", href: "/meniu?categorie=pizza" },
  { name: "Paste", count: `${productsByCategory.paste.length} preparate`, img: "/images/menu/tagliatelle-creveti-zucchini.jpg", href: "/meniu?categorie=paste" },
  { name: "Salate", count: `${productsByCategory.salate.length} preparate`, img: "/images/menu/insalata-camembert-smochine.jpg", href: "/meniu?categorie=salate" },
  { name: "Calzone", count: `${productsByCategory.calzone.length} preparate`, img: "/images/menu/calzone-seba.jpg", href: "/meniu?categorie=calzone" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="bg-brass text-ink">
        <Marquee items={marquee} />
      </div>

      {/* 01 — Cum comanzi */}
      <section className="py-24 md:py-32">
        <div className="container-x flex flex-col gap-14">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">01 — Comandă în 3 pași</span>
              <SplitHeading className="display text-[clamp(2.5rem,5vw,4.25rem)]">
                Pizza ta, <em className="text-brass-light">exact cum îți place.</em>
              </SplitHeading>
            </div>
            <p data-reveal className="max-w-sm text-base leading-relaxed text-muted">
              Alegi pizza, mărimea și ingredientele extra direct din meniu. Noi o coacem și ți-o aducem caldă.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map(({ n, title, text, Icon }) => (
              <div key={n} data-reveal className="card-lift flex flex-col gap-6 rounded-[26px] border border-cream/[0.08] bg-panel p-8">
                <div className="flex items-center justify-between">
                  <span className="flex size-16 items-center justify-center rounded-full border border-brass/50 text-brass">
                    <Icon className="size-7" />
                  </span>
                  <span className="font-display text-6xl text-cream/15">{n}</span>
                </div>
                <h3 className="font-display text-[32px] font-semibold text-ivory">{title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Specialități (scroll orizontal) */}
      <Specialties />

      {/* 03 — Povestea */}
      <section className="bg-panel py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="grid h-[460px] grid-cols-5 grid-rows-2 gap-4 sm:h-[520px]">
            <Parallax amount={10} className="col-span-3 row-span-2 rounded-[28px]">
              <Image src="/images/menu/melanzane-alla-parmigiana.jpg" alt="Melanzane alla parmigiana la cuptor" fill sizes="(min-width: 1024px) 380px, 60vw" className="object-cover" />
            </Parallax>
            <Parallax amount={14} className="col-span-2 rounded-[28px]">
              <Image src="/images/menu/speck-si-hribi.jpg" alt="Paste cu speck și hribi" fill sizes="(min-width: 1024px) 260px, 40vw" className="scale-125 object-cover" />
            </Parallax>
            <div data-reveal className="col-span-2 flex flex-col justify-between rounded-[28px] bg-brass p-6 text-ink">
              <span className="font-display text-6xl font-medium leading-[0.9] sm:text-7xl">
                <CountUp to={10} suffix="+" />
              </span>
              <span className="text-[13px] font-bold leading-snug">ani în restaurantele din Puglia, Italia</span>
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <span className="eyebrow">03 — Povestea noastră</span>
            <SplitHeading className="display text-[clamp(2.5rem,5vw,4rem)]">
              Din Puglia, <em className="text-brass-light">direct la masa ta.</em>
            </SplitHeading>
            <p data-reveal className="text-[17px] leading-[1.8] text-soft">
              După mai bine de zece ani petrecuți în restaurante renumite din Puglia, ne-am întors acasă cu un singur gând: o trattoria-pizzeria cu ingrediente italienești de calitate superioară și meșteșugul învățat acolo. Am construit-o împreună cu familia.
            </p>
            <p data-reveal className="text-[17px] leading-[1.8] text-soft">
              Ne găsești pe strada Mureșului, aproape de Iulius Mall și de campusul studențesc.
            </p>
            <div data-reveal>
              <Link href="/despre" className="btn btn-ghost">
                Citește povestea <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Categorii */}
      <section className="py-24 md:py-32">
        <div className="container-x flex flex-col gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">04 — Meniul</span>
            <SplitHeading className="display text-[clamp(2.5rem,5vw,4.25rem)]">
              Ce poftești <em className="text-brass-light">astăzi?</em>
            </SplitHeading>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cats.map((c) => (
              <Link key={c.name} href={c.href} data-reveal className="img-zoom group relative block h-[340px] overflow-hidden rounded-[26px] bg-panel-2 lg:h-[420px]">
                <Image src={c.img} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="scale-110 object-cover" />
                <span className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/10 to-ink/90" />
                <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-3 text-ivory">
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-4xl font-semibold leading-none">{c.name}</span>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-brass-light">{c.count}</span>
                  </span>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Pachete */}
      <section className="bg-cream py-24 text-ink md:py-32">
        <div className="container-x flex flex-col gap-14">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex max-w-2xl flex-col gap-4">
              <span className="eyebrow text-umber">05 — Pachete</span>
              <SplitHeading className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-medium leading-[1.08] text-ink">
                Mai mulți la masă, <em>preț mai bun.</em>
              </SplitHeading>
            </div>
            <p data-reveal className="max-w-sm text-base leading-relaxed text-[#4a4f49]">
              Pizza, suc și sos la preț de pachet — pentru birou, familie sau seara de film cu prietenii.
            </p>
          </div>
          <PacksGrid />
        </div>
      </section>

      {/* Citat */}
      <section className="relative flex min-h-[640px] items-center justify-center overflow-hidden md:min-h-[720px]">
        <Parallax amount={14} className="absolute! inset-0">
          <Image src="/images/mille-gusti-wide.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-[#090e0c]/70" />
        <div className="container-x relative flex max-w-5xl flex-col items-center gap-8 py-24 text-center">
          <Image src="/images/logo-seba.png" alt="" width={197} height={100} className="h-16 w-auto opacity-90 md:h-20" />
          <ScrubWords
            as="blockquote"
            text="„Locație vintage, atmosferă relaxantă și ambianța potrivită pentru familii.”"
            className="font-display text-[clamp(2.25rem,5vw,4.25rem)] italic leading-[1.16] text-ivory"
          />
          <Magnetic>
            <Link href="/rezervari" className="btn bg-cream text-ink hover:bg-white">
              Rezervă o masă
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* Vizită */}
      <section className="py-24 md:py-32">
        <div className="container-x grid gap-5 md:grid-cols-3">
          <div data-reveal className="flex flex-col gap-4 rounded-[26px] border border-cream/[0.08] bg-panel p-8">
            <PinIcon className="size-7 text-brass" />
            <span className="label">Adresă</span>
            <span className="font-display text-[32px] leading-tight text-ivory">
              {site.address}
              <br />
              {site.city}
            </span>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-auto text-[13px] font-extrabold uppercase tracking-[0.12em] text-brass-light hover:text-white">
              Deschide în Google Maps →
            </a>
          </div>
          <div data-reveal className="flex flex-col gap-4 rounded-[26px] border border-cream/[0.08] bg-panel p-8">
            <ClockIcon className="size-7 text-brass" />
            <span className="label">Program</span>
            <span className="font-display text-[32px] leading-tight text-ivory">
              Luni – Sâmbătă
              <br />
              10:00 – 21:00
            </span>
            <span className="mt-auto text-sm text-muted">{site.hoursNote}</span>
          </div>
          <div data-reveal className="flex flex-col gap-4 rounded-[26px] bg-brass p-8 text-ink">
            <PhoneIcon className="size-7" />
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#3d3424]">Comenzi &amp; rezervări</span>
            <a href={site.phoneHref} className="font-display text-[34px] font-semibold leading-tight">
              {site.phone}
            </a>
            <Link href="/rezervari" className="btn btn-dark mt-auto">
              Rezervă online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
