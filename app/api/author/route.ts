import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const doc = await client.db("emailvmail").collection("site_content").findOne({ pageKey: "author" });
    return NextResponse.json({ content: doc?.sections ?? null });
  } catch {
    return NextResponse.json({ content: null });
  }
}
