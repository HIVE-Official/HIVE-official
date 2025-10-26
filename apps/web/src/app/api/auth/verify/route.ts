// Bounded Context Owner: Identity & Access Management Guild
import { NextRequest, NextResponse } from "next/server";
import { firebaseFirestore } from "@hive/firebase";
import { getAuthContainer } from "../../../../server/auth/container";
import { ProfileAggregate, ProfileIdFactory } from "@core";
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS
} from "../../../../server/auth/constants";
import { enforceThrottle, formatRetryAfterHeader } from "../../../../server/auth/throttle/throttle-policy";
import { extractClientIp } from "../../../../server/http/request-ip";

const MAGIC_LINK_COLLECTION = "auth_magic_links";
const DEFAULT_REDIRECT = "/onboarding";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    // Redirect back to login with a friendly error instead of raw JSON
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set("error", "missing-token");
    return NextResponse.redirect(redirectUrl);
  }

  const throttleResult = await enforceThrottle({
    bucket: "auth:verify:ip:30m",
    identifier: extractClientIp(request),
    limit: 15,
    windowMs: 30 * 60 * 1000
  });

  if (!throttleResult.allowed) {
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set("error", "too-many-attempts");
    const response = NextResponse.redirect(redirectUrl);
    const retryAfter = formatRetryAfterHeader(throttleResult.retryAfter);
    if (retryAfter) {
      response.headers.set("Retry-After", retryAfter);
    }
    return response;
  }

  const allowDevSeeds = process.env.ENABLE_DEV_SEEDS === "true";
  // Idempotent consume using transaction when Firestore is available
  let record: { email: string; profileId: string; expiresAt?: unknown; consumed?: boolean } | null = null;
let consumedTokenId: string | null = null;
  try {
    const firestore = firebaseFirestore();
    await firestore.runTransaction(async (tx) => {
      const ref = firestore.collection(MAGIC_LINK_COLLECTION).doc(token);
      const snap = await tx.get(ref);
      if (!snap.exists) {
        throw new Error("invalid-link");
      }
      const data = snap.data() as { email: string; profileId: string; expiresAt?: unknown; consumed?: boolean };
      const exp = toDate(data.expiresAt);
      if (data.consumed) {
        throw new Error("consumed");
      }
      if (exp && exp.getTime() < Date.now()) {
        tx.update(ref, { consumed: true, consumedAt: new Date(), expired: true });
        throw new Error("expired");
      }
      // Mark consumed atomically to avoid replay
      tx.update(ref, { consumed: true, consumedAt: new Date() });
      record = { email: data.email, profileId: data.profileId, expiresAt: data.expiresAt, consumed: true };
      consumedTokenId = token;
    });
  } catch (e) {
    const code = e instanceof Error ? e.message : "invalid-link";
    if (allowDevSeeds && request.nextUrl.searchParams.get("dev") === "1") {
      // Dev fallback below
    } else {
      const redirectUrl = new URL("/login", request.nextUrl.origin);
      redirectUrl.searchParams.set("error", code === "consumed" || code === "expired" || code === "invalid-link" ? code : "invalid-link");
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (!record) {
    // Dev fallback: allow auto-verify without Firestore when ENABLE_DEV_SEEDS is true.
    if (allowDevSeeds && request.nextUrl.searchParams.get("dev") === "1") {
      const container = getAuthContainer();
      const fallbackProfileId = `profile-${token.slice(0, 8)}`;
      const existing = await container.profileRepository.findById(fallbackProfileId);
      if (!existing) {
        const id = ProfileIdFactory.create(fallbackProfileId);
        if (id.ok) {
          const created = ProfileAggregate.create({ profileId: id.value, email: "dev@buffalo.edu", userType: "student" });
          if (created.ok) {
            await container.profileRepository.save(created.value);
          }
        }
      }

      const sessionResult = await container.sessionService.create({ profileId: fallbackProfileId, scopes: ["app:web"], ttlHours: 12 });
      if (!sessionResult.ok) {
        return NextResponse.json({ error: sessionResult.error }, { status: 500 });
      }

      const response = NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.nextUrl.origin));
      response.cookies.set(SESSION_COOKIE_NAME, sessionResult.value.sessionId, {
        ...SESSION_COOKIE_OPTIONS,
        secure: process.env.NODE_ENV === "production",
        expires: sessionResult.value.expiresAt
      });
      return response;
    }
    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set("error", "invalid-link");
    return NextResponse.redirect(redirectUrl);
  }

  const container = getAuthContainer();
  const profileIdResolved: string = (record as { profileId: string }).profileId;
  const profile = await container.profileRepository.findById(profileIdResolved);
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  profile.verifyAccount();
  await container.profileRepository.save(profile);

  const profileId: string = profileIdResolved;
  const sessionResult = await container.sessionService.create({
    profileId,
    scopes: ["app:web"],
    ttlHours: 12
  });

  if (!sessionResult.ok) {
    return NextResponse.json({ error: sessionResult.error }, { status: 500 });
  }

  if (consumedTokenId) {
    try {
      const ref = firebaseFirestore().collection(MAGIC_LINK_COLLECTION).doc(consumedTokenId);
      await ref.update({ consumed: true, consumedAt: new Date(), sessionId: sessionResult.value.sessionId });
    } catch {
      // Best-effort in dev mode
    }
  }

  const response = NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.nextUrl.origin));
  response.cookies.set(SESSION_COOKIE_NAME, sessionResult.value.sessionId, {
    ...SESSION_COOKIE_OPTIONS,
    secure: process.env.NODE_ENV === "production",
    expires: sessionResult.value.expiresAt
  });

  return response;
}

const toDate = (value: unknown): Date | undefined => {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof (value as { toDate?: () => Date }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate();
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }

  // Unknown shape; do not attempt string coercion.
  return undefined;
};
