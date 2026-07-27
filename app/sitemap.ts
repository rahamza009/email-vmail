import type { MetadataRoute } from "next";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const BASE = "https://emailvmail.com";

const STATIC_SITEMAP: MetadataRoute.Sitemap = [
  { url: BASE,                                                   lastModified: new Date(), changeFrequency: "monthly", priority: 1    },
  { url: `${BASE}/about`,                                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8  },
  { url: `${BASE}/services/firearms-ammo`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9  },
  { url: `${BASE}/services/knife-tactical-outdoor`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.9  },
  { url: `${BASE}/services/growth-services`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE}/audit`,                                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8  },
  { url: `${BASE}/blog`,                                         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7  },
  { url: `${BASE}/tactical-merchandise`,                         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6  },
  { url: `${BASE}/blog/why-mailchimp-bans-firearms-businesses`,  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7  },
  { url: `${BASE}/blog/is-klaviyo-good-for-gun-stores`,          lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7  },
  { url: `${BASE}/blog/win-back-flow-for-gun-stores`,            lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7  },
];

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const client = await clientPromise;
    const doc = await client.db().collection("seo_config").findOne({ type: "sitemap" });

    if (doc?.entries?.length) {
      return (doc.entries as Array<{
        path: string; priority: number; changeFrequency: string; lastmod: string; include: boolean;
      }>)
        .filter(e => e.include)
        .map(e => ({
          url: `${BASE}${e.path}`,
          lastModified: e.lastmod ? new Date(e.lastmod) : new Date(),
          changeFrequency: e.changeFrequency as ChangeFreq,
          priority: e.priority,
        }));
    }
  } catch {
    // fall through to static
  }

  return STATIC_SITEMAP;
}
