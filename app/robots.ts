import type { MetadataRoute } from "next";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const STATIC_ROBOTS: MetadataRoute.Robots = {
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api/",
        "/cgi-sys/",
        "/cgi-bin/",
        "/wp-admin/",
        "/wp-login.php",
        "/wp-content/",
        "/wp-includes/",
        "/wp-json/",
        "/xmlrpc.php",
        "/*?page_id=",
        "/*?feed=",
        "/*?p=",
        "/*?cat=",
      ],
    },
  ],
  sitemap: "https://emailvmail.com/sitemap.xml",
};

export default async function robots(): Promise<MetadataRoute.Robots> {
  try {
    const client = await clientPromise;
    const doc = await client.db().collection("seo_config").findOne({ type: "robots" });

    if (doc?.content) {
      // Parse the raw text into Next.js robots format
      const lines: string[] = (doc.content as string).split("\n").map((l: string) => l.trim()).filter(Boolean);
      const disallow: string[] = [];
      const allow: string[] = [];
      let sitemap: string | undefined;

      for (const line of lines) {
        if (line.startsWith("Disallow:")) disallow.push(line.replace("Disallow:", "").trim());
        else if (line.startsWith("Allow:") && !line.startsWith("Allow: /\n")) {
          const val = line.replace("Allow:", "").trim();
          if (val !== "/") allow.push(val);
        }
        else if (line.startsWith("Sitemap:")) sitemap = line.replace("Sitemap:", "").trim();
      }

      return {
        rules: [{ userAgent: "*", allow: "/", disallow }],
        sitemap: sitemap ?? "https://emailvmail.com/sitemap.xml",
      };
    }
  } catch {
    // fall through to static
  }

  return STATIC_ROBOTS;
}
