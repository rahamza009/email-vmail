import type { Metadata } from "next";
import { getPageSeo } from "@/lib/getPageSeo";
import GrowthServicesClient from "./GrowthServicesClient";

const DEFAULT_TITLE = "Growth Services for Firearms & Tactical Brands | Email-Vmail";
const DEFAULT_DESC  = "Web development, SEO, content writing, and compliant digital marketing for gun stores, FFL dealers, and 2A brands. One partner for everything your store needs to grow.";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("growth-services");
  return {
    title:       seo?.metaTitle       || DEFAULT_TITLE,
    description: seo?.metaDescription || DEFAULT_DESC,
    alternates: { canonical: "https://emailvmail.com/services/growth-services" },
  };
}

export default function GrowthServicesPage() {
  return <GrowthServicesClient />;
}
