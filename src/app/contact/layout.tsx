import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Techversity.ai",
  description:
    "Get in touch with our academic advisory team. Whether you have questions about admissions, programs, or partnerships — we respond within 4 hours.",
  openGraph: {
    title: "Contact Us — Techversity.ai",
    description:
      "Reach our advisory team for program inquiries, admissions guidance, and partnership opportunities. Average response time: under 4 hours.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
