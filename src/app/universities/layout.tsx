import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Universities | Global Academic Network",
  description:
    "Explore Techversity.ai's network of accredited partner universities across North America and Europe. Discover doctoral programs, institutional accreditation, and global academic collaborations.",
};

export default function UniversitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
