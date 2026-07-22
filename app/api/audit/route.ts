import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, websiteUrl, email, phone, revenue, listSize, challenge } = body;

  const required = { fullName, websiteUrl, email, phone, revenue, listSize, challenge };
  for (const [key, val] of Object.entries(required)) {
    if (!val?.trim()) {
      return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("emailvmail");
    await db.collection("audit_leads").insertOne({
      fullName: fullName.trim(),
      websiteUrl: websiteUrl.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      revenue,
      listSize,
      challenge: challenge.trim(),
      submittedAt: new Date(),
      read: false,
    });

    const webhook = process.env.SLACK_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🎯 *New Audit Request — Email-Vmail*\n\n*Name:* ${fullName.trim()}\n*Email:* ${email.trim()}\n*Phone:* ${phone.trim()}\n*Website:* ${websiteUrl.trim()}\n*Revenue:* ${revenue}\n*List Size:* ${listSize}\n*Challenge:* ${challenge.trim()}`,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Audit submission error:", msg);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
