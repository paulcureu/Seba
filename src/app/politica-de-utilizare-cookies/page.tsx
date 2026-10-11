import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Politica de utilizare cookies", alternates: { canonical: "/politica-de-utilizare-cookies" } };

export default function Page() {
  return <LegalPage title="Politica de utilizare cookies" />;
}
