import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Techversity.ai | Powering the Techverse of Tomorrow",
    template: "%s | Techversity.ai",
  },
  description:
    "Premier admissions advisory connecting accomplished professionals with accredited universities for Honorary Doctorates, DBAs, and PhDs.",
  keywords: [
    "Honorary Doctorate",
    "DBA",
    "PhD",
    "online doctorate",
    "professional doctorate",
    "accredited university",
    "Techversity",
  ],
  authors: [{ name: "Techversity.ai" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Techversity.ai",
    title: "Techversity.ai | Powering the Techverse of Tomorrow",
    description:
      "Premier admissions advisory connecting accomplished professionals with accredited universities for Honorary Doctorates, DBAs, and PhDs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Techversity.ai | Powering the Techverse of Tomorrow",
    description:
      "Premier admissions advisory connecting accomplished professionals with accredited universities for Honorary Doctorates, DBAs, and PhDs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-bg-primary text-text-secondary font-sans antialiased overflow-x-hidden">
        <LenisProvider />
        <ScrollToTop />
        <CustomCursor />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
