import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Techversity.ai privacy policy. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="main-content">
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose max-w-none space-y-6 text-slate-600 text-sm leading-relaxed">
            <p>
              <strong>Last Updated:</strong> March 2026
            </p>
            <p>
              Techversity.ai (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website or use our services.
            </p>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Information We Collect
            </h2>
            <p>We may collect information about you in a variety of ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data:</strong> Name, email address, phone
                number, mailing address, professional history, and educational
                background that you voluntarily provide when applying or
                contacting us.
              </li>
              <li>
                <strong>Usage Data:</strong> Browser type, operating system,
                access times, pages viewed, and the referring URL.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies and similar tracking
                technologies to enhance your experience. See our Cookie Policy
                for details.
              </li>
            </ul>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and manage your applications</li>
              <li>Communicate with you about our services</li>
              <li>Match you with appropriate university programs</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Data Sharing
            </h2>
            <p>
              We may share your information with our partner universities as
              part of the application process. We do not sell your personal
              information to third parties.
            </p>

            <h2 className="text-xl font-heading font-semibold text-slate-900 mt-8 mb-4">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact
              us at{" "}
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
