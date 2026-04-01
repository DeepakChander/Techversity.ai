import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Techversity.ai refund policy. Understand our refund conditions and how to request a refund.",
};

export default function RefundPage() {
  return (
    <>
      <div className="main-content">
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-8">
            Refund Policy
          </h1>
          <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
            <p>
              <strong>Last Updated:</strong> March 2026
            </p>
            <p>
              At Techversity.ai, we are committed to transparency. This Refund
              Policy outlines the conditions under which refunds are provided.
            </p>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Full Refund
            </h2>
            <p>
              If your application is not accepted by any of our partner
              universities, you are entitled to a full refund of all advisory
              fees paid.
            </p>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Partial Refund
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                If you withdraw your application before university review:
                75% refund
              </li>
              <li>
                If you withdraw after university review but before enrollment:
                50% refund
              </li>
              <li>After enrollment is confirmed: No refund</li>
            </ul>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              How to Request a Refund
            </h2>
            <p>
              To request a refund, email us at{" "}
              <a
                href="mailto:admissions@techversity.ai"
                className="text-blue-start hover:underline"
              >
                admissions@techversity.ai
              </a>{" "}
              with your application reference number. Refunds are processed
              within 14 business days.
            </p>
          </div>
        </div>
      </main>
      </div>
      <Footer />
    </>
  );
}
