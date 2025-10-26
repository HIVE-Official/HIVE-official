// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import { err, ok, type Result } from "../../../shared/result";
import type { ProfileId } from "../profile.types";

const profileIdSchema = z
  .string({ required_error: "Profile ID is required" })
  .trim()
  .min(1, "Profile ID is required")
  .max(64, "Profile ID must be 64 characters or fewer");

export const ProfileIdFactory = {
  create(raw: string): Result<ProfileId> {
    const parsed = profileIdSchema.safeParse(raw);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return err(issue?.message ?? "Invalid profile id");
    }

    return ok({ value: parsed.data });
  }
};

export type ProfileIdFactoryType = typeof ProfileIdFactory;
