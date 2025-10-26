// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import { err, ok, type Result } from "../../../shared/result";

const socialInfoSchema = z.object({
  instagram: z
    .string()
    .trim()
    .regex(/^@?[a-zA-Z0-9._]{1,30}$/, "Instagram handle is invalid")
    .transform((value: string) =>
      value.startsWith("@") ? value : `@${value}`
    )
    .optional(),
  linkedin: z
    .string()
    .trim()
    .url("LinkedIn must be a valid URL")
    .optional(),
  website: z
    .string()
    .trim()
    .url("Website must be a valid URL")
    .optional()
});

export type SocialInfo = z.infer<typeof socialInfoSchema>;

export const SocialInfoFactory = {
  create(input: unknown): Result<SocialInfo> {
    const parsed = socialInfoSchema.safeParse(input);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return err(issue?.message ?? "Invalid social info");
    }

    return ok(parsed.data);
  }
};

export type SocialInfoFactoryType = typeof SocialInfoFactory;
