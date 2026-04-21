import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndexNumeral } from "@/components/ui/IndexNumeral";
import { ButtonV2 } from "@/components/ui/ButtonV2";

export default function NotFound() {
  return (
    <>
      <div className="main-content">
        <Navbar />
        <main className="min-h-[85vh] flex items-center justify-center bg-[var(--color-canvas-ivory)]">
          <div className="max-w-[900px] mx-auto px-8 lg:px-14 py-32 text-center">
            <IndexNumeral index="404" label="Off the record" />
            <h1
              className="type-display text-[var(--color-ink-primary)] mt-10 leading-[0.95] max-w-[22ch] mx-auto"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
            >
              This page is not in the record.
            </h1>
            <p className="type-display-italic text-[var(--color-ink-muted)] mt-6 text-[19px] max-w-[46ch] mx-auto">
              Either it has been moved, or it was never written. Both are possible — only one is worth resolving.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
              <ButtonV2 href="/" variant="heritage" size="md" showArrow>
                Return to the beginning
              </ButtonV2>
              <ButtonV2 href="/programs" variant="quiet" size="md" showArrow>
                Explore programmes
              </ButtonV2>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
