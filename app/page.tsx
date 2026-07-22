import type { Metadata } from "next";
import { getPageSeo } from "@/lib/getPageSeo";
import HomeClient from "./HomeClient";

const DEFAULT_TITLE = "Email-Vmail | DFY Email Marketing for Firearms & 2A Brands";
const DEFAULT_DESC  = "Done-For-You email marketing agency for gun stores, FFL dealers, ammo retailers, and 2A brands. ESP-compliant lifecycle systems that turn subscribers into repeat buyers.";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("home");
  return {
    title:       seo?.metaTitle       || DEFAULT_TITLE,
    description: seo?.metaDescription || DEFAULT_DESC,
  };
}

export default function Page() {
  return <HomeClient />;
}
