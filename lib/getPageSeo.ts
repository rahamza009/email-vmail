import clientPromise from "@/lib/mongodb";

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export async function getPageSeo(pageKey: string): Promise<PageSeo | null> {
  try {
    const client = await clientPromise;
    const doc = await client.db("emailvmail").collection("site_content").findOne({ pageKey });
    const seo = doc?.sections?.seo;
    if (seo?.metaTitle || seo?.metaDescription) return seo as PageSeo;
    return null;
  } catch {
    return null;
  }
}
