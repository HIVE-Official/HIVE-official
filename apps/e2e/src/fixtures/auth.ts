import type { SignUpMode, UserType } from "@core";

interface PendingMagicLink {
  email: string;
  userType: UserType;
  profileId: string;
  requestedAt: number;
  messageId: string;
  mode: SignUpMode;
}

interface ActiveSession {
  sessionId: string;
  profileId: string;
  issuedAt: string;
  expiresAt: string;
  scopes?: string[];
}

let pending: PendingMagicLink | null = null;
let session: ActiveSession | null = null;

const MAGIC_LINK_DELAY_MS = 1500;

const createProfileId = (email: string): string => {
  const prefix = email.split("@")[0]?.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "demo";
  return `profile-${prefix}`;
};

export function requestMagicLinkFixture(email: string, userType: UserType) {
  const requestedAt = Date.now();
  const profileId = createProfileId(email);
  pending = {
    email,
    userType,
    profileId,
    requestedAt,
    messageId: `msg-${requestedAt}`,
    mode: "default"
  };
  session = null;

  return {
    profileId,
    campusId: "ub-buffalo",
    magicLinkExpiresAt: new Date(requestedAt + 15 * 60 * 1000).toISOString(),
    messageId: pending.messageId,
    mode: pending.mode
  };
}

const ensureSession = (): ActiveSession | null => {
  if (!pending) return session;
  if (Date.now() - pending.requestedAt < MAGIC_LINK_DELAY_MS) {
    return null;
  }
  if (!session) {
    const issuedAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
    session = {
      sessionId: `sandbox-session-${pending.profileId}`,
      profileId: pending.profileId,
      issuedAt,
      expiresAt
    };
  }
  return session;
};

export function getSessionFixture() {
  const active = ensureSession();
  if (!active) return null;
  return {
    session: active,
    onboardingComplete: false,
    userType: pending?.userType ?? null
  };
}

export function destroySessionFixture() {
  pending = null;
  session = null;
}

export function getPendingMagicLinkFixture(): PendingMagicLink | null {
  return pending;
}

export function verifyMagicLinkFixture(token?: string) {
  // If a token is provided, ensure it matches pending; otherwise accept any pending in dev flows.
  if (!pending) return null;
  if (token && token !== pending.messageId) return null;

  // Create or reuse session immediately (skip delay for verification endpoint).
  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + 12 * 60 * 60 * 1000);
  session = {
    sessionId: `sandbox-session-${pending.profileId}`,
    profileId: pending.profileId,
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    scopes: ["app:e2e"]
  };
  // Clear pending to emulate consumption.
  const result = {
    messageId: pending.messageId,
    profileId: pending.profileId,
    email: pending.email
  };
  pending = null;
  return result;
}
