"use client";

import { ProgramPage } from "@/components/sections/shared/ProgramPage";
import { PROGRAM_PAGES } from "@/lib/programs-data";

export default function HonoraryDoctoratePage() {
  return <ProgramPage data={PROGRAM_PAGES["honorary-doctorate"]} />;
}
