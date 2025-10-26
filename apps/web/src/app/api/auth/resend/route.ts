// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { getAuthContainer } from "../../../../server/auth/container";
import { createSignupController } from "../../../../server/auth/controllers/signup.controller";
import { enforceThrottle, formatRetryAfterHeader } from "../../../../server/auth/throttle/throttle-policy";
import { extractClientIp } from "../../../../server/http/request-ip";
import { z } from "zod";

const COOKIE_NAME = "ml_cd"; // magic link cooldown
const COOLDOWN_SECONDS = 60; // soft client/browser cooldown

export async function POST(request: NextRequest): Promise<NextResponse> {
  const now = Date.now();
  const existing = request.cookies.get(COOKIE_NAME)?.value;
  if (existing) {
    const until = Number(existing);
    if (!Number.isNaN(until) && until > now) {
      const ms = until - now;
      return NextResponse.json(
        { error: "Rate limited. Please wait before requesting another link.", retryAfterMs: ms },
        { status: 429, headers: { "Retry-After": String(Math.ceil(ms / 1000)) } }
      );
    }
  }

  const payloadUnknown = (await request.json().catch(() => null)) as unknown;
  const payloadSchema = z.object({ email: z.string().email(), userType: z.string() });
  const parsed = payloadSchema.safeParse(payloadUnknown);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }
  const { email, userType } = parsed.data;
  const ipAddress = extractClientIp(request);

  const throttleRules = [
    {
      bucket: "auth:resend:ip:24h",
      identifier: ipAddress,
      limit: 20,
      windowMs: 24 * 60 * 60 * 1000
    }
  ];

  if (email) {
    throttleRules.push(
      {
        bucket: "auth:resend:email:30m",
        identifier: email,
        limit: 3,
        windowMs: 30 * 60 * 1000
      },
      {
        bucket: "auth:resend:email:24h",
        identifier: email,
        limit: 10,
        windowMs: 24 * 60 * 60 * 1000
      }
    );
  }

  for (const rule of throttleRules) {
    const result = await enforceThrottle(rule);
    if (!result.allowed) {
      const retryAfter = formatRetryAfterHeader(result.retryAfter);
      return NextResponse.json(
        { error: "Too many magic link requests. Please try again later." },
        {
          status: 429,
          headers: retryAfter ? { "Retry-After": retryAfter } : undefined
        }
      );
    }
  }

  const container = getAuthContainer();
  const controller = createSignupController(container.signUpService);
  const result = await controller({ email: email.toLowerCase(), userType });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const response = NextResponse.json(result.body, { status: result.status });
  response.cookies.set(COOKIE_NAME, String(now + COOLDOWN_SECONDS * 1000), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: COOLDOWN_SECONDS
  });
  return response;
}
