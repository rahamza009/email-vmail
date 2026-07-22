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
import type { HomeContent } from "@/lib/getHomeContent";

export default function HomeClient({ content }: { content?: HomeContent | null }) {
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
      <Hero data={content?.hero} />
      <TrustBar />
      <Problem data={content?.problem} />
      <Services data={content?.services} />
      <ICP />
      <Founder />
      <Pricing />
      <FAQ />
      <Newsletter />
    </main>
  );
}
