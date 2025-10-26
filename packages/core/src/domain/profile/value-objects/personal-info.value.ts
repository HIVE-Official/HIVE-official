// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import { err, ok, type Result } from "../../../shared/result";

const personalInfoSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, "First name is required")
    .max(100, "First name must be 100 characters or fewer"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .trim()
    .min(1, "Last name is required")
    .max(100, "Last name must be 100 characters or fewer"),
  pronouns: z
    .string()
    .trim()
    .max(100, "Pronouns must be 100 characters or fewer")
    .optional(),
  bio: z
    .string()
    .trim()
    .max(500, "Bio must be 500 characters or fewer")
    .optional(),
  photoUrl: z
    .string()
    .url("Photo must be a valid URL")
    .optional()
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;

export const PersonalInfoFactory = {
  create(input: unknown): Result<PersonalInfo> {
    const parsed = personalInfoSchema.safeParse(input);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return err(issue?.message ?? "Invalid personal info");
    }

    return ok(parsed.data);
  }
};

export type PersonalInfoFactoryType = typeof PersonalInfoFactory;
