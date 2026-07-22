import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { signAdminToken } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  const emailOk = email === adminEmail;

  let passwordOk = false;
  try {
    const a = Buffer.from(password ?? "");
    const b = Buffer.from(adminPassword);
    passwordOk = a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    passwordOk = false;
  }

  if (!emailOk || !passwordOk) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signAdminToken();
  const cookieStore = await cookies();
  cookieStore.set("ev_admin", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("ev_admin");
  return NextResponse.json({ success: true });
}
