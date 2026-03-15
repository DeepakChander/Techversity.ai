import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore our doctoral programs: Honorary Doctorate, DBA, and PhD. Find the right path for your professional journey.",
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
