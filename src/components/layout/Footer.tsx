import Image from "next/image";
import Link from "next/link";
import { legal, site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, ArrowRight } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink-deep pb-28 lg:pb-10">
      <div className="container-x flex flex-col gap-16 pt-20">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-cream/10 pb-14 md:flex-row md:items-end">
          <h2 className="display max-w-2xl text-5xl md:text-7xl">
            Ți-e poftă de <em className="text-brass-light">ceva bun?</em>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/meniu" className="btn btn-primary">
              Comandă online <ArrowRight className="size-4" />
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost">
              {site.phone}
            </a>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <Image src="/images/logo-seba.png" alt="Seba pizzeria e trattoria" width={197} height={100} className="h-16 w-auto self-start" />
            <p className="max-w-xs text-[15px] leading-relaxed text-muted">
              Pizzeria e Trattoria în Cluj-Napoca. Livrare, ridicare personală și mese în locație.
            </p>
            <div className="flex gap-2.5">
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex size-11 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-brass hover:text-brass">
                <FacebookIcon className="size-[18px]" />
              </a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex size-11 items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-brass hover:text-brass">
                <InstagramIcon className="size-[18px]" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-[15px]">
            <span className="eyebrow mb-1 text-xs tracking-[0.18em]">Meniu</span>
            <Link href="/meniu?categorie=pizza" className="text-mist hover:text-white">Pizza la cuptor</Link>
            <Link href="/meniu?categorie=paste" className="text-mist hover:text-white">Paste</Link>
            <Link href="/meniu?categorie=salate" className="text-mist hover:text-white">Salate</Link>
            <Link href="/meniu?categorie=pachete" className="text-mist hover:text-white">Pachete</Link>
            <Link href="/meniu?categorie=bauturi" className="text-mist hover:text-white">Băuturi</Link>
          </div>

          <div className="flex flex-col gap-3 text-[15px]">
            <span className="eyebrow mb-1 text-xs tracking-[0.18em]">Seba</span>
            <Link href="/despre" className="text-mist hover:text-white">Despre noi</Link>
            <Link href="/rezervari" className="text-mist hover:text-white">Rezervă o masă</Link>
            <Link href="/rezervari?tip=eveniment" className="text-mist hover:text-white">Rezervă un eveniment</Link>
            <Link href="/contact" className="text-mist hover:text-white">Contact</Link>
          </div>

          <div className="flex flex-col gap-3 text-[15px]">
            <span className="eyebrow mb-1 text-xs tracking-[0.18em]">Vizitează-ne</span>
            <span className="text-mist">{site.address}<br />{site.city}</span>
            <span className="text-mist">{site.hours}</span>
            <a href={`mailto:${site.email}`} className="text-mist hover:text-white">{site.email}</a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 pt-7 text-[13px] text-dim lg:flex-row lg:items-center lg:justify-between">
          <span>
            © {new Date().getFullYear()} {site.company} · CUI {site.cui} · {site.regCom}
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-cream">
                {l.label}
              </Link>
            ))}
            <a href={site.anpcSal} target="_blank" rel="noopener noreferrer" className="hover:text-cream">ANPC — SAL</a>
            <a href={site.sol} target="_blank" rel="noopener noreferrer" className="hover:text-cream">SOL</a>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none mt-10 select-none text-center font-display text-[28vw] italic leading-[0.7] text-cream/[0.035]">
        Seba
      </div>
    </footer>
  );
}
