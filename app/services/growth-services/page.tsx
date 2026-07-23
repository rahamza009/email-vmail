import type { Metadata } from "next";
import { getServiceContent } from "@/lib/getServiceContent";
import GrowthServicesClient from "./GrowthServicesClient";

export const revalidate = 60;

const DEFAULT_TITLE = "Digital Marketing Agency for Gun Stores | SEO, Web & Content | Email-Vmail";
const DEFAULT_DESC  = "Digital marketing agency for gun stores, FFL dealers, and 2A brands in the United States. SEO for firearms ecommerce, web development, and content writing — one partner for everything your store needs to grow online.";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getServiceContent("growth-services");
  return {
    title:       cms?.seo?.metaTitle       || DEFAULT_TITLE,
    description: cms?.seo?.metaDescription || DEFAULT_DESC,
    alternates: { canonical: "https://emailvmail.com/services/growth-services" },
  };
}

export default async function GrowthServicesPage() {
  const cms = await getServiceContent("growth-services");
  return (
    <GrowthServicesClient
      heroTag={cms?.heroTag}
      h1Line1={cms?.heroH1Line1}
      h1Line2={cms?.heroH1Line2}
      heroSubhead={cms?.heroSubhead}
      serviceCards={cms?.painPoints?.map(p => ({ title: p.title, desc: p.body }))}
      ctaBody={cms?.ctaBody}
    />
  );
}
