import { NextRequest, NextResponse } from "next/server";

const FORM_ID = "9644806";
const TAG_ID = 20878464; // emailvmail-newsletter

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const apiKey = process.env.KIT_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const kitRes = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      email,
      tags: [TAG_ID],
    }),
  });

  const kitBody = await kitRes.json().catch(() => ({}));

  if (!kitRes.ok) {
    console.error("Kit newsletter error:", kitRes.status, kitBody);
    return NextResponse.json({ error: "Kit error", detail: kitBody }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
