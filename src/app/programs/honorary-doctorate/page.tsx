"use client";

import { ProgramPageV2 } from "@/components/sections/shared/ProgramPageV2";
import { PROGRAM_PAGES } from "@/lib/programs-data";

export default function HonoraryDoctoratePage() {
  return (
    <ProgramPageV2
      data={PROGRAM_PAGES["honorary-doctorate"]}
      programNumber="001"
      programLabel="Honorary Doctorate"
      subtitle="Doctor Honoris Causa — the record a life's work earns."
      heroImage="/images/editorial/honorary-hero.webp"
      heroImageAlt="A close-up still life of an embossed certificate rolled with a deep crimson silk ribbon beside a wax seal impression"
      recognitionImage="/images/editorial/honorary-recognition.webp"
      recognitionImageAlt="A small oxblood leather-bound volume on warm ivory linen beside a pressed laurel leaf"
    />
  );
}
