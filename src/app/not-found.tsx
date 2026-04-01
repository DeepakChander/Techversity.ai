import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <div className="main-content">
        <Navbar />
        <main className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1
              className="font-heading font-bold text-slate-200 mb-4"
              style={{ fontSize: "clamp(6rem, 15vw, 12rem)" }}
            >
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-4 -mt-4">
              Page Not Found
            </h2>
            <p className="text-slate-600 mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-start to-blue-mid text-white font-medium shadow-lg shadow-blue-start/20 hover:shadow-xl hover:shadow-blue-start/30 transition-all"
              >
                Go Home
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-transparent text-slate-900 border border-slate-300 font-medium hover:bg-slate-50 transition-all"
              >
                View Programs
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
