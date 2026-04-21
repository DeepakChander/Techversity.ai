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
    />
  );
}
