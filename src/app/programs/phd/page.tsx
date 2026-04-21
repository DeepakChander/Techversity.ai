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
    />
  );
}
