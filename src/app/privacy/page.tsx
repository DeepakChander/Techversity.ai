import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/shared/LegalPage";
import { LEGAL_PAGES } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Techversity collects, uses, and safeguards personal information during the advisory.",
};

export default function PrivacyPage() {
  return <LegalPage content={LEGAL_PAGES.privacy} />;
}
