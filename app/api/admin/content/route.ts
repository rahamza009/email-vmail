import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/adminAuth";
import clientPromise from "@/lib/mongodb";

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("ev_admin")?.value;
  return !!token && verifyAdminToken(token);
}

// GET /api/admin/content?page=home
export async function GET(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const page = new URL(req.url).searchParams.get("page") ?? "home";
  const client = await clientPromise;
  const doc = await client.db("emailvmail").collection("site_content").findOne({ pageKey: page });
  return NextResponse.json({ content: doc ?? null });
}

// PUT /api/admin/content
export async function PUT(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { pageKey, sections } = await req.json();
  if (!pageKey) return NextResponse.json({ error: "Missing pageKey" }, { status: 400 });
  const client = await clientPromise;
  await client.db("emailvmail").collection("site_content").updateOne(
    { pageKey },
    { $set: { pageKey, sections, updatedAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ success: true });
}
