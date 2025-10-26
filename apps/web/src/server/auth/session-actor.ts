// Bounded Context Owner: Identity & Access Management Guild
// Resolves the actor's profileId from the session cookie when available.
// Falls back to a dev/testing override via `x-actor-id` header when auth is disabled or seeds are enabled.

import type { NextRequest } from "next/server";
import { getAuthContainer } from "./container";
import { SESSION_COOKIE_NAME } from "./constants";

const BYPASS_AUTH =
  process.env.NEXT_PUBLIC_AUTH_MODE === "mock" ||
  process.env.DISABLE_AUTH === "true" ||
  process.env.ENABLE_DEV_SEEDS === "true";

const readCookie = (cookieHeader: string | null | undefined, name: string): string | null => {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(/;\s*/);
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx <= 0) continue;
    const key = part.slice(0, idx).trim();
    if (key === name) {
      return decodeURIComponent(part.slice(idx + 1));
    }
  }
  return null;
};

export const resolveActorProfileId = async (
  request: Request | NextRequest,
  providedFallback?: string | null
): Promise<string | null> => {
  try {
    const cookieHeader = request.headers.get("cookie");
    const sessionId = readCookie(cookieHeader, SESSION_COOKIE_NAME);
    if (sessionId) {
      const container = getAuthContainer();
      const session = await container.sessionRepository.findById(sessionId);
      if (session) {
        return session.getProps().profileId;
      }
    }
  } catch {
    // ignore and try fallbacks
  }

  if (BYPASS_AUTH) {
    const headerActor = request.headers.get("x-actor-id");
    if (headerActor && headerActor.trim().length > 0) {
      return headerActor.trim();
    }
  }

  return providedFallback ?? null;
};

// Resolve the actor and optionally forbid dev bypass even if BYPASS_AUTH is set.
// When allowDevBypass is false, only a valid session cookie is accepted.
export const requireActorProfileId = async (
  request: Request | NextRequest,
  allowDevBypass = false
): Promise<string | null> => {
  try {
    const cookieHeader = request.headers.get("cookie");
    const sessionId = ((): string | null => {
      if (!cookieHeader) return null;
      const parts = cookieHeader.split(/;\s*/);
      for (const part of parts) {
        const idx = part.indexOf("=");
        if (idx <= 0) continue;
        const key = part.slice(0, idx).trim();
        if (key === SESSION_COOKIE_NAME) {
          return decodeURIComponent(part.slice(idx + 1));
        }
      }
      return null;
    })();

    if (sessionId) {
      const container = getAuthContainer();
      const session = await container.sessionRepository.findById(sessionId);
      if (session) {
        return session.getProps().profileId;
      }
    }
  } catch {
    // ignore
  }

  if (allowDevBypass && BYPASS_AUTH) {
    const headerActor = request.headers.get("x-actor-id");
    if (headerActor && headerActor.trim().length > 0) {
      return headerActor.trim();
    }
  }
  return null;
};
