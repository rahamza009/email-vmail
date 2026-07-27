import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sendEmail } from "@/lib/mailer";
import { followUpEmail } from "@/lib/emailTemplates";

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");

  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const col = client.db().collection("newsletter_subscribers");

    const now = new Date();
    const due = await col
      .find({ followUpScheduledAt: { $lte: now }, followUpSentAt: null })
      .toArray();

    let sent = 0;
    for (const sub of due) {
      try {
        const { html: followHtml, text: followText } = followUpEmail();
        await sendEmail(sub.email, "Why I started VMail.", followHtml, followText);
        await col.updateOne({ _id: sub._id }, { $set: { followUpSentAt: new Date() } });
        sent++;
      } catch (err) {
        console.error(`Follow-up email failed for ${sub.email}:`, err);
      }
    }

    return NextResponse.json({ ok: true, sent, total: due.length });
  } catch (err) {
    console.error("Cron follow-up error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
