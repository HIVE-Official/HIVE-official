// Bounded Context Owner: Identity & Access Management Guild
import type { SignUpMode, UserType } from "@core";

export interface SignupPayload {
  readonly email: string;
  readonly userType: string;
}

export interface SignupResponse {
  readonly profileId: string;
  readonly campusId: string;
  readonly magicLinkExpiresAt: string;
  readonly messageId: string;
  readonly mode: SignUpMode;
}

export interface SessionResponse {
  readonly session: {
    readonly sessionId: string;
    readonly profileId: string;
    readonly issuedAt: string;
    readonly expiresAt: string;
    readonly scopes?: readonly string[];
  };
  readonly onboardingComplete: boolean;
  readonly userType: UserType | null;
}

const jsonHeaders = {
  "Content-Type": "application/json"
};

const parseJson = async <T>(response: Response): Promise<T> => {
  const data = (await response.json()) as T | undefined;
  if (!data) {
    throw new Error("Empty response");
  }
  return data;
};

export const authClient = {
  async requestMagicLink(payload: SignupPayload): Promise<SignupResponse> {
    const response = await globalThis.fetch("/api/signup", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to request magic link");
    }

    return parseJson<SignupResponse>(response);
  },

  async fetchSession(): Promise<SessionResponse | null> {
    const response = await globalThis.fetch("/api/auth/session", {
      method: "GET",
      cache: "no-store"
    });

    if (response.status === 204) {
      return null;
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to fetch session");
    }

    return parseJson<SessionResponse>(response);
  },

  async destroySession(): Promise<void> {
    await globalThis.fetch("/api/auth/session", {
      method: "DELETE",
      cache: "no-store"
    });
  }
};
