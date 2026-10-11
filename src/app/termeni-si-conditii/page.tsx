import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Termeni și condiții", alternates: { canonical: "/termeni-si-conditii" } };

export default function Page() {
  return <LegalPage title="Termeni și condiții" />;
}
