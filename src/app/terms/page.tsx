import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/shared/LegalPage";
import { LEGAL_PAGES } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms under which Techversity introduces candidates to accredited institutions.",
};

export default function TermsPage() {
  return <LegalPage content={LEGAL_PAGES.terms} />;
}
