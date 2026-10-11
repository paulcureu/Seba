import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meniu — pizza, paste, salate",
  description:
    "Meniul complet Pizza Seba: peste 40 de pizze la cuptor (500/550 g și 900 g), paste, salate, calzone, pachete și băuturi. Comandă online cu livrare în Cluj-Napoca.",
  alternates: { canonical: "/meniu" },
};

export default function MenuPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ href: "/", label: "Acasă" }, { label: "Meniu" }]}
        title={
          <>
            Meniul <em className="text-brass-light">Seba</em>
          </>
        }
        image="/images/mille-gusti-wide.jpg"
        aside={
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-mist lg:max-w-sm lg:justify-end">
            <span className="rounded-full bg-cream/[0.07] px-3 py-2">Livrare 6,99 lei</span>
            <span className="rounded-full bg-cream/[0.07] px-3 py-2">Card · Cash · Tichete</span>
            <span className="rounded-full bg-cream/[0.07] px-3 py-2">{site.hours}</span>
          </div>
        }
      >
        Apasă pe orice preparat ca să vezi ingredientele, să alegi mărimea și să adaugi extra. Pizza vine în 500/550 g sau 900 g.
      </PageIntro>
      <div className="pt-10">
        <MenuBrowser />
      </div>
    </>
  );
}
