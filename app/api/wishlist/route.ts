import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, company, email } = await req.json();

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (!name || !company || !email) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const kitRes = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      email,
      first_name: name,
      fields: { company },
      tags: [20878327],
    }),
  });

  const kitBody = await kitRes.json().catch(() => ({}));

  if (!kitRes.ok) {
    console.error("Kit API error:", kitRes.status, kitBody);
    return NextResponse.json(
      { error: "Kit error", detail: kitBody },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
