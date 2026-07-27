import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";

async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  return jar.get("admin_session")?.value === process.env.ADMIN_SECRET;
}

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clientPromise;
  const col = client.db().collection("seo_config");

  const [sitemapDoc, robotsDoc] = await Promise.all([
    col.findOne({ type: "sitemap" }),
    col.findOne({ type: "robots" }),
  ]);

  return NextResponse.json({
    sitemap: sitemapDoc?.entries ?? null,
    robots: robotsDoc?.content ?? null,
  });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const client = await clientPromise;
  const col = client.db().collection("seo_config");

  if (body.type === "sitemap") {
    await col.updateOne(
      { type: "sitemap" },
      { $set: { type: "sitemap", entries: body.entries, updatedAt: new Date() } },
      { upsert: true }
    );
  } else if (body.type === "robots") {
    await col.updateOne(
      { type: "robots" },
      { $set: { type: "robots", content: body.content, updatedAt: new Date() } },
      { upsert: true }
    );
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
