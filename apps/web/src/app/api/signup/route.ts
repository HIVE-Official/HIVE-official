// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { getAuthContainer } from "../../../server/auth/container";
import { createSignupController } from "../../../server/auth/controllers/signup.controller";
import { enforceThrottle, formatRetryAfterHeader } from "../../../server/auth/throttle/throttle-policy";
import { extractClientIp } from "../../../server/http/request-ip";

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}));

  const email =
    typeof (payload as { email?: unknown }).email === "string"
      ? ((payload as { email: string }).email || "").toLowerCase()
      : undefined;
  const ipAddress = extractClientIp(request);

  const throttleRules = [
    {
      bucket: "signup:ip:1h",
      identifier: ipAddress,
      limit: 5,
      windowMs: 60 * 60 * 1000
    }
  ];

  if (email) {
    throttleRules.push({
      bucket: "signup:email:24h",
      identifier: email,
      limit: 10,
      windowMs: 24 * 60 * 60 * 1000
    });
  }

  for (const rule of throttleRules) {
    const result = await enforceThrottle(rule);
    if (!result.allowed) {
      const retryAfter = formatRetryAfterHeader(result.retryAfter);
      return NextResponse.json(
        { error: "Too many sign-up attempts. Please try again later." },
        {
          status: 429,
          headers: retryAfter ? { "Retry-After": retryAfter } : undefined
        }
      );
    }
  }

  const container = getAuthContainer();
  const controller = createSignupController(container.signUpService);

  const result = await controller(payload);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result.body, {
    status: result.status
  });
}
