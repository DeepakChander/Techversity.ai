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
  metadataBase: new URL("https://techversity.ai"),
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Techversity.ai",
    url: "https://techversity.ai",
    description:
      "Premier admissions advisory connecting accomplished professionals with accredited universities for Honorary Doctorates, DBAs, and PhDs.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "admissions@techversity.ai",
      contactType: "admissions",
      availableLanguage: "English",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-slate-600 font-sans antialiased overflow-x-hidden">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <LenisProvider />
        <ScrollToTop />
        <CustomCursor />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
