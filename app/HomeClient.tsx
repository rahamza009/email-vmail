"use client";

import { useEffect } from "react";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import ICP from "@/components/sections/ICP";
import Founder from "@/components/sections/Founder";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Newsletter from "@/components/sections/Newsletter";

export default function HomeClient() {
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (target) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <main>
      <Hero />
      <TrustBar />
      <Problem />
      <Services />
      <ICP />
      <Founder />
      <Pricing />
      <FAQ />
      <Newsletter />
    </main>
  );
}
