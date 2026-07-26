import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sendEmail } from "@/lib/mailer";
import { welcomeEmail } from "@/lib/emailTemplates";

const FORM_ID = "9644806";
const TAG_ID = 20878464; // emailvmail-newsletter

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const apiKey = process.env.KIT_API_KEY;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // 1. Add to Kit
  if (apiKey) {
    const kitRes = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, email, tags: [TAG_ID] }),
    });
    if (!kitRes.ok) {
      const kitBody = await kitRes.json().catch(() => ({}));
      console.error("Kit newsletter error:", kitRes.status, kitBody);
    }
  }

  // 2. Save subscriber to MongoDB for follow-up sequence
  try {
    const client = await clientPromise;
    const db = client.db();
    const col = db.collection("newsletter_subscribers");

    const now = new Date();
    const followUpAt = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 days

    await col.updateOne(
      { email },
      {
        $setOnInsert: {
          email,
          subscribedAt: now,
          followUpScheduledAt: followUpAt,
          followUpSentAt: null,
          welcomeSentAt: null,
        },
      },
      { upsert: true }
    );
  } catch (err) {
    console.error("MongoDB subscriber save error:", err);
  }

  // 3. Send welcome email
  try {
    await sendEmail(email, "Welcome to VMail", welcomeEmail());
    const client = await clientPromise;
    await client.db().collection("newsletter_subscribers").updateOne(
      { email },
      { $set: { welcomeSentAt: new Date() } }
    );
  } catch (err) {
    console.error("Welcome email send error:", err);
  }

  return NextResponse.json({ ok: true });
}
