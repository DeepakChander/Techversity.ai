import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Techversity.ai cookie policy. Learn how we use cookies and similar technologies on our website.",
};

export default function CookiesPage() {
  return (
    <>
      <div className="main-content">
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-8">
            Cookie Policy
          </h1>
          <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
            <p>
              <strong>Last Updated:</strong> March 2026
            </p>
            <p>
              This Cookie Policy explains how Techversity.ai uses cookies and
              similar technologies when you visit our website.
            </p>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              What Are Cookies
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit
              a website. They help us provide a better experience by
              remembering your preferences and understanding how you use our
              site.
            </p>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Types of Cookies We Use
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for the website
                to function properly.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how
                visitors interact with our site.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings
                and preferences.
              </li>
            </ul>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Managing Cookies
            </h2>
            <p>
              You can manage or disable cookies through your browser settings.
              Note that disabling certain cookies may affect website
              functionality.
            </p>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Contact
            </h2>
            <p>
              For questions about our cookie practices, contact us at{" "}
              <a
                href="mailto:admissions@techversity.ai"
                className="text-blue-start hover:underline"
              >
                admissions@techversity.ai
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      </div>
      <Footer />
    </>
  );
}
