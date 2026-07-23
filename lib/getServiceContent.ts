import clientPromise from "@/lib/mongodb";

export interface ServicePainCard {
  num: string;
  title: string;
  body: string;
}

export interface ServiceContent {
  heroTag?: string;
  heroH1Line1?: string;
  heroH1Line2?: string;
  heroSubhead?: string;
  problemTag?: string;
  problemH2Line1?: string;
  problemH2Line2?: string;
  painPoints?: ServicePainCard[];
  ctaH2Line1?: string;
  ctaH2Line2?: string;
  ctaBody?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
}

export async function getServiceContent(pageKey: string): Promise<ServiceContent | null> {
  try {
    const client = await clientPromise;
    const doc = await client
      .db("emailvmail")
      .collection("site_content")
      .findOne({ pageKey });
    return (doc?.sections as ServiceContent) ?? null;
  } catch {
    return null;
  }
}
