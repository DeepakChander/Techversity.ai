"use client";

import { useLenisInit } from "@/hooks/useLenis";

export function LenisProvider() {
  useLenisInit();
  return null;
}
