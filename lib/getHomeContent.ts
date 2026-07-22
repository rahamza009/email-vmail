import clientPromise from "@/lib/mongodb";

export interface HeroSection {
  tag?: string;
  h1Line1?: string;
  h1Line2?: string;
  subhead?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export interface ProblemSection {
  tag?: string;
  h2Line1?: string;
  h2Line2?: string;
  subhead?: string;
  cards?: Array<{ title: string; body: string }>;
}

export interface ServicesSection {
  tag?: string;
  h2Line1?: string;
  h2Line2?: string;
  subhead?: string;
  cards?: Array<{ title: string; desc: string }>;
}

export interface HomeContent {
  hero?: HeroSection;
  problem?: ProblemSection;
  services?: ServicesSection;
  seo?: { metaTitle?: string; metaDescription?: string };
}

export async function getHomeContent(): Promise<HomeContent | null> {
  try {
    const client = await clientPromise;
    const doc = await client
      .db("emailvmail")
      .collection("site_content")
      .findOne({ pageKey: "home" });
    return (doc?.sections as HomeContent) ?? null;
  } catch {
    return null;
  }
}
