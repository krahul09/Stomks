"use client";

import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import MarketOverview from "@/components/sections/MarketOverview";
import LearningPath from "@/components/sections/LearningPath";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <Features />
      <HowItWorks />
      <MarketOverview />
      <LearningPath />
      <Statistics />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
