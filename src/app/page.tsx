"use client";

import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/home/Hero";
import { Programs } from "@/components/sections/home/Programs";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { WhyUs } from "@/components/sections/home/WhyUs";
import { Universities } from "@/components/sections/home/Universities";
import { FAQ } from "@/components/sections/home/FAQ";
import { FinalCTA } from "@/components/sections/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Preloader />
      <div className="main-content">
        <Navbar />
        <main>
          <Hero />
          <Programs />
          <HowItWorks />
          <WhyUs />
          <Universities />
          <FAQ />
          <FinalCTA />
        </main>
      </div>
      <Footer />
    </>
  );
}
