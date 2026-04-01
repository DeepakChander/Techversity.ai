import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Techversity.ai terms and conditions. Understand your rights and responsibilities when using our services.",
};

export default function TermsPage() {
  return (
    <>
      <div className="main-content">
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-8">
            Terms &amp; Conditions
          </h1>
          <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
            <p>
              <strong>Last Updated:</strong> March 2026
            </p>
            <p>
              By accessing and using the Techversity.ai website and services,
              you agree to be bound by these Terms and Conditions.
            </p>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Our Services
            </h2>
            <p>
              Techversity.ai provides admissions advisory services, connecting
              qualified professionals with accredited universities for doctoral
              programs. We are not a university or degree-granting institution.
              All academic decisions are made by the respective universities.
            </p>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not misrepresent your qualifications or achievements</li>
            </ul>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Limitation of Liability
            </h2>
            <p>
              Techversity.ai acts as an advisory intermediary. We do not
              guarantee admission to any university program. Our liability is
              limited to the fees paid for our advisory services.
            </p>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Contact
            </h2>
            <p>
              For questions about these terms, contact us at{" "}
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
