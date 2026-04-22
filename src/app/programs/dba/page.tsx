"use client";

import { ProgramPageV2 } from "@/components/sections/shared/ProgramPageV2";
import { PROGRAM_PAGES } from "@/lib/programs-data";

export default function DBAPage() {
  return (
    <ProgramPageV2
      data={PROGRAM_PAGES["dba"]}
      programNumber="002"
      programLabel="Doctor of Business Administration"
      subtitle="Applied research, returning with discipline to practice."
      heroImage="/images/editorial/dba-hero.webp"
      heroImageAlt="Overhead view of a working desk — open notebook with handwritten notes, an annotated paper, a warm ceramic cup and reading glasses"
    />
  );
}
