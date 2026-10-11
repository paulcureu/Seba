import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Politica de confidențialitate", alternates: { canonical: "/politica-de-confidentialitate" } };

export default function Page() {
  return <LegalPage title="Politica de confidențialitate" />;
}
