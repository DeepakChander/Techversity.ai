import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionRoot } from "@/components/layout/MotionRoot";

/* Type stack — Publication Voice */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "Techversity introduces accomplished professionals to the universities that recognise them — for Honorary Doctorates, DBAs, and PhDs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://techversity.ai"),
  title: {
    default: "Techversity · The record a life's work earns.",
    template: "%s · Techversity",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Honorary Doctorate",
    "Doctor Honoris Causa",
    "DBA",
    "Doctor of Business Administration",
    "PhD",
    "professional doctorate",
    "executive doctorate",
    "accredited university",
    "Techversity",
    "doctoral advisory",
  ],
  authors: [{ name: "Techversity Advisory" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Techversity",
    title: "Techversity · The record a life's work earns.",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Techversity · The record a life's work earns.",
    description: SITE_DESCRIPTION,
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
    name: "Techversity Advisory",
    url: "https://techversity.ai",
    description: SITE_DESCRIPTION,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "admissions@techversity.ai",
      contactType: "admissions",
      availableLanguage: "English",
    },
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <MotionRoot>
          <LenisProvider />
          <ScrollToTop />
          <CustomCursor />
          {children}
        </MotionRoot>
      </body>
    </html>
  );
}
