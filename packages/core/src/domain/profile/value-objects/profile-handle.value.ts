// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import { err, ok, type Result } from "../../../shared/result";

// Normalized, lowercase handle with constraints:
// - 3–20 chars
// - allowed: a–z, 0–9, dot, underscore, hyphen
// - must start and end with alphanumeric
// - no consecutive special chars (., _, -)
const baseSchema = z
  .string({ invalid_type_error: "Handle is required" })
  .min(3, "Handle must be at least 3 characters")
  .max(20, "Handle must be no more than 20 characters");

const formatSchema = z
  .string()
  .regex(
    /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])$/,
    "Handle must start/end with a letter or number and may contain . _ - in between"
  )
  .refine((v) => !/[._-]{2,}/.test(v), {
    message: "Handle cannot contain consecutive special characters"
  });

export interface ProfileHandle {
  readonly value: string;
}

export const ProfileHandleFactory = {
  create(rawHandle: string): Result<ProfileHandle> {
    const normalized = rawHandle.trim().toLowerCase();

    const lengthCheck = baseSchema.safeParse(normalized);
    if (!lengthCheck.success) {
      return err(lengthCheck.error.issues[0]?.message ?? "Invalid handle");
    }

    const formatCheck = formatSchema.safeParse(normalized);
    if (!formatCheck.success) {
      return err(formatCheck.error.issues[0]?.message ?? "Invalid handle format");
    }

    return ok({ value: normalized });
  }
};

export type ProfileHandleFactoryType = typeof ProfileHandleFactory;
