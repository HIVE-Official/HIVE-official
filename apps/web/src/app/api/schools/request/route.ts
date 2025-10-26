// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import { enforceThrottle, formatRetryAfterHeader } from "../../../../server/auth/throttle/throttle-policy";
import { extractClientIp } from "../../../../server/http/request-ip";

const schema = z.object({
  name: z.string().max(200).optional(),
  email: z.string().email("Invalid email"),
  school: z.string().min(2, "School is required").max(200)
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json({ error: issue?.message ?? "Invalid request" }, { status: 400 });
  }

  const { name, email, school } = parsed.data;
  const ip = extractClientIp(request);

  // Basic throttling: protect from spam via IP and email limits
  const throttleRules = [
    { bucket: "schools:request:ip:24h", identifier: ip, limit: 30, windowMs: 24 * 60 * 60 * 1000 },
    { bucket: "schools:request:email:24h", identifier: email.toLowerCase(), limit: 3, windowMs: 24 * 60 * 60 * 1000 }
  ] as const;

  for (const rule of throttleRules) {
    const result = await enforceThrottle(rule);
    if (!result.allowed) {
      const retryAfter = formatRetryAfterHeader(result.retryAfter);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: retryAfter ? { "Retry-After": retryAfter } : undefined }
      );
    }
  }

  const record = {
    name: name?.trim() || null,
    email: email.toLowerCase(),
    school: school.trim(),
    ua: request.headers.get("user-agent") ?? null,
    ip,
    createdAt: new Date()
  } as const;

  try {
    if (isFirebaseConfigured()) {
      const db = firebaseFirestore();
      await db.collection("school_requests").add(record as unknown as Record<string, unknown>);
    } else {
      // eslint-disable-next-line no-console
      console.warn("schools.request.capture", { email: record.email, school: record.school });
    }
  } catch {
    // Non-fatal: we still return success to avoid leaking infra details
  }

  return NextResponse.json({ ok: true });
}
