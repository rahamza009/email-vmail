import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/adminAuth";
import clientPromise from "@/lib/mongodb";

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("ev_admin")?.value;
  return !!token && verifyAdminToken(token);
}

const DEFAULTS = {
  calendlyUrl: "https://calendly.com/rahamza009-dzou/30min",
  linkedinUrl: "https://linkedin.com/in/rahamza009/",
  ctaAuditLabel: "Get $0 Account Audit",
  ctaCallLabel: "Book a Strategy Call",
  ctaAuditHref: "/audit",
  ga4Id: "G-28L8BWNRYP",
  gtmId: "GTM-KW478NFN",
  vercelDeployHook: "",
};

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const client = await clientPromise;
  const doc = await client.db("emailvmail").collection("site_settings").findOne({ key: "global" });
  return NextResponse.json({ settings: { ...DEFAULTS, ...(doc ?? {}), _id: undefined, key: undefined } });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  delete body._id;
  const client = await clientPromise;
  await client.db("emailvmail").collection("site_settings").updateOne(
    { key: "global" },
    { $set: { ...body, key: "global", updatedAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ success: true });
}
