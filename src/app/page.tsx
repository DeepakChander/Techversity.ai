"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/home-v2/Hero";
import { Record } from "@/components/sections/home-v2/Record";
import { Pathways } from "@/components/sections/home-v2/Pathways";
import { Advisory } from "@/components/sections/home-v2/Advisory";
import { Confidants } from "@/components/sections/home-v2/Confidants";
import { Method } from "@/components/sections/home-v2/Method";
import { Voices } from "@/components/sections/home-v2/Voices";
import { Threshold } from "@/components/sections/home-v2/Threshold";

export default function Home() {
  return (
    <>
      <div className="main-content">
        <Navbar />
        <main id="main-content">
          <Hero />
          <Record />
          <Pathways />
          <Advisory />
          <Confidants />
          <Method />
          <Voices />
          <Threshold />
        </main>
      </div>
      <Footer />
    </>
  );
}
