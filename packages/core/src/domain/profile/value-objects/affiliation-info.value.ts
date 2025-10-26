// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import { err, ok, type Result } from "../../../shared/result";

const affiliationInfoSchema = z.object({
  department: z
    .string({ required_error: "Department is required" })
    .trim()
    .min(1, "Department is required")
    .max(120, "Department must be 120 characters or fewer")
});

export type AffiliationInfo = z.infer<typeof affiliationInfoSchema>;

export const AffiliationInfoFactory = {
  create(input: unknown): Result<AffiliationInfo> {
    const parsed = affiliationInfoSchema.safeParse(input);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return err(issue?.message ?? "Invalid affiliation info");
    }

    return ok(parsed.data);
  }
};

export type AffiliationInfoFactoryType = typeof AffiliationInfoFactory;
