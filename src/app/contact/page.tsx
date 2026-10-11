import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapCard } from "@/components/ui/MapCard";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Pizza Seba: ${site.phone}, ${site.email}, ${site.address}, ${site.city}. ${site.hours}.`,
  alternates: { canonical: "/contact" },
};

const info = [
  { label: "Adresă", value: `${site.address}, ${site.city}` },
  { label: "Program", value: site.hours },
  { label: "Telefon & WhatsApp", value: site.phone, href: site.phoneHref },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ href: "/", label: "Acasă" }, { label: "Contact" }]}
        title={
          <>
            Scrie-ne <em className="text-brass-light">sau treci pe la noi.</em>
          </>
        }
      >
        Pentru comenzi rapide sună sau scrie-ne pe WhatsApp. Pentru orice altceva, folosește formularul de mai jos.
      </PageIntro>
      <section className="bg-cream py-16 text-ink md:py-24">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div data-reveal>
              <MapCard className="h-[320px] md:h-[360px]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {info.map((i) => (
                <div key={i.label} data-reveal className="flex flex-col gap-1.5 rounded-[22px] border border-ink/10 bg-paper p-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-umber">{i.label}</span>
                  {i.href ? (
                    <a href={i.href} className="text-[15px] font-bold text-ink hover:underline">
                      {i.value}
                    </a>
                  ) : (
                    <span className="text-[15px] font-bold">{i.value}</span>
                  )}
                </div>
              ))}
            </div>
            <p data-reveal className="text-sm text-[#4a4f49]">{site.hoursNote}</p>
          </div>
          <div data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
