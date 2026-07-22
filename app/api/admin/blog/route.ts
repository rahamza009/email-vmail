import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/adminAuth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("ev_admin")?.value;
  return !!token && verifyAdminToken(token);
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const client = await clientPromise;
  const posts = await client.db("emailvmail").collection("blog_posts")
    .find({}).sort({ displayOrder: 1, createdAt: -1 }).toArray();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const now = new Date();
  const doc = {
    title: body.title ?? "Untitled",
    slug: body.slug || slugify(body.title ?? "untitled"),
    category: body.category ?? "General",
    tags: Array.isArray(body.tags) ? body.tags : [],
    excerpt: body.excerpt ?? "",
    content: body.content ?? "",
    coverImage: body.coverImage ?? "",
    mainImage: body.mainImage ?? "",
    keywords: body.keywords ?? "",
    publishDate: body.publishDate ? new Date(body.publishDate) : null,
    displayOrder: typeof body.displayOrder === "number" ? body.displayOrder : 99,
    isActive: body.isActive !== false,
    seoTitle: body.seoTitle ?? body.title ?? "",
    seoDescription: body.seoDescription ?? body.excerpt ?? "",
    robotsIndex: body.robotsIndex !== false,
    robotsFollow: body.robotsFollow !== false,
    ogTitle: body.ogTitle ?? body.title ?? "",
    ogDescription: body.ogDescription ?? body.excerpt ?? "",
    ogType: body.ogType ?? "article",
    status: body.status ?? "draft",
    publishedAt: body.status === "published" ? now : null,
    createdAt: now,
    updatedAt: now,
  };
  const client = await clientPromise;
  const result = await client.db("emailvmail").collection("blog_posts").insertOne(doc);
  return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...updates } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  updates.updatedAt = new Date();
  if (updates.status === "published" && !updates.publishedAt) updates.publishedAt = new Date();
  if (updates.publishDate) updates.publishDate = new Date(updates.publishDate);
  if (updates.tags && !Array.isArray(updates.tags)) updates.tags = [];
  const client = await clientPromise;
  await client.db("emailvmail").collection("blog_posts")
    .updateOne({ _id: new ObjectId(id) }, { $set: updates });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const client = await clientPromise;
  await client.db("emailvmail").collection("blog_posts").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
