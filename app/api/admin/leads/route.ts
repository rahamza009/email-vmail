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

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("emailvmail");
    const leads = await db
      .collection("audit_leads")
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json({ leads });
  } catch (err) {
    console.error("Leads fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("emailvmail");
    await db
      .collection("audit_leads")
      .updateOne({ _id: new ObjectId(id) }, { $set: { read: true } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mark read error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
