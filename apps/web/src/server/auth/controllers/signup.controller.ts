// Bounded Context Owner: Identity & Access Management Guild
import type { SignUpService } from "@core";
import { z } from "zod";
import type { HttpResponse } from "../../http/types";

export interface SignupRequest {
  readonly email: string;
  readonly userType: string;
}

export interface SignupResponse {
  readonly profileId: string;
  readonly campusId: string;
  readonly magicLinkExpiresAt: string;
  readonly messageId: string;
  readonly mode: "new" | "resume" | "welcomeBack";
}

const mapErrorToStatus = (message: string): number => {
  if (
    message.includes("Only approved campus emails") ||
    message.includes("Unsupported user type") ||
    message.includes("Invalid") ||
    message.includes("required")
  ) {
    return 400;
  }

  if (message.includes("already exists")) {
    return 409;
  }

  if (message.includes("Failed to send magic link")) {
    return 502;
  }

  return 400;
};

export const createSignupController = (
  signUpService: SignUpService
) => async (request: SignupRequest): Promise<HttpResponse<SignupResponse>> => {
  const schema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    userType: z.string().min(1, "User type is required")
  });

  const parsed = schema.safeParse(request);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid request";
    return { status: 400, error: message };
  }

  const result = await signUpService.execute({
    email: parsed.data.email,
    userType: parsed.data.userType
  });

  if (!result.ok) {
    return {
      status: mapErrorToStatus(result.error),
      error: result.error
    };
  }

  return {
    status: 200,
    body: {
      profileId: result.value.profileId,
      campusId: result.value.campusId,
      magicLinkExpiresAt: result.value.magicLinkExpiresAt.toISOString(),
      messageId: result.value.magicLinkMessageId,
      mode: result.value.mode
    }
  };
};
