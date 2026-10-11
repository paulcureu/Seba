import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Politica de livrare", alternates: { canonical: "/politica-de-livrare" } };

export default function Page() {
  return <LegalPage title="Politica de livrare" />;
}
