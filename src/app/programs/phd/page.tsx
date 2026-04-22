"use client";

import { ProgramPageV2 } from "@/components/sections/shared/ProgramPageV2";
import { PROGRAM_PAGES } from "@/lib/programs-data";

export default function PhDPage() {
  return (
    <ProgramPageV2
      data={PROGRAM_PAGES["phd"]}
      programNumber="003"
      programLabel="Doctor of Philosophy"
      subtitle="An original contribution to knowledge, defended."
      heroImage="/images/editorial/phd-hero.webp"
      heroImageAlt="The corner of a private scholar's library — tall wooden shelves of worn academic volumes, a small brass lamp lit on an open book"
    />
  );
}
