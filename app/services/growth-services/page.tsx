import type { Metadata } from "next";
import { getPageSeo } from "@/lib/getPageSeo";
import GrowthServicesClient from "./GrowthServicesClient";

const DEFAULT_TITLE = "Digital Marketing Agency for Gun Stores | SEO, Web & Content | Email-Vmail";
const DEFAULT_DESC  = "Digital marketing agency for gun stores, FFL dealers, and 2A brands in the United States. SEO for firearms ecommerce, web development, and content writing — one partner for everything your store needs to grow online.";

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
