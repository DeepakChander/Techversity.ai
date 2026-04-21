import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/shared/LegalPage";
import { LEGAL_PAGES } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Techversity uses cookies and similar technologies on the website.",
};

export default function CookiesPage() {
  return <LegalPage content={LEGAL_PAGES.cookies} />;
}
