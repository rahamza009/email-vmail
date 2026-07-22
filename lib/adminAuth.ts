import crypto from "crypto";

function secret() {
  return process.env.SESSION_SECRET!;
}

export function signAdminToken(): string {
  const payload = `admin:${Date.now()}`;
  const sig = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function verifyAdminToken(token: string): boolean {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return false;
    const payload = Buffer.from(payloadB64, "base64url").toString();
    const expected = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
    const sigBuf = Buffer.from(sig, "hex");
    const expectedBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(sigBuf, expectedBuf);
  } catch {
    return false;
  }
}
