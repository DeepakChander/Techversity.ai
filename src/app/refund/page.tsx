import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/shared/LegalPage";
import { LEGAL_PAGES } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "The circumstances in which Techversity returns advisory fees.",
};

export default function RefundPage() {
  return <LegalPage content={LEGAL_PAGES.refund} />;
}
