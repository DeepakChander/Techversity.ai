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
    />
  );
}
