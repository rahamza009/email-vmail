import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import ICP from "@/components/sections/ICP";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Problem />
      <Services />
      <ICP />
      <Pricing />
      <FAQ />
    </main>
  );
}
