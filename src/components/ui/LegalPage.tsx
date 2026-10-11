import { site } from "@/lib/site";
import { PageIntro } from "./PageIntro";

/**
 * Șablon pentru paginile legale. Textul complet trebuie copiat de pe site-ul actual
 * (aceleași adrese: /termeni-si-conditii etc.), în locul paragrafului marcat mai jos.
 */
export function LegalPage({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <>
      <PageIntro crumbs={[{ href: "/", label: "Acasă" }, { label: title }]} title={title} />
      <section className="container-x max-w-3xl py-16 md:py-24">
        <div className="flex flex-col gap-6 text-[16px] leading-[1.8] text-soft [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-ivory">
          <h2>Operator</h2>
          <p>
            {site.company}, CUI {site.cui}, {site.regCom}, cu punct de lucru în {site.address}, {site.city}. Contact: {site.phone}, {site.email}.
          </p>
          {children ?? (
            <p className="rounded-2xl border border-dashed border-brass/50 p-5 text-brass-light">
              [Textul complet al acestei pagini se copiază de pe site-ul actual pizzaseba.ro.]
            </p>
          )}
          <h2>Soluționarea litigiilor</h2>
          <p>
            Consumatorii se pot adresa ANPC prin platforma{" "}
            <a href={site.anpcSal} className="text-brass-light underline" target="_blank" rel="noopener noreferrer">SAL</a> sau platformei europene{" "}
            <a href={site.sol} className="text-brass-light underline" target="_blank" rel="noopener noreferrer">SOL</a>.
          </p>
        </div>
      </section>
    </>
  );
}
