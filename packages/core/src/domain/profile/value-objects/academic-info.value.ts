// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import { err, ok, type Result } from "../../../shared/result";

const CURRENT_YEAR = new Date().getFullYear();

const academicInfoSchema = z.object({
  majors: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Major cannot be empty")
        .max(120, "Major must be 120 characters or fewer")
    )
    .min(1, "At least one major is required")
    .max(2, "You can select up to two majors"),
  graduationYear: z
    .number({ required_error: "Graduation year is required" })
    .int("Graduation year must be an integer")
    .min(CURRENT_YEAR - 1, "Graduation year must be within a reasonable range")
    .max(
      CURRENT_YEAR + 10,
      "Graduation year must be within a reasonable range"
    ),
  courses: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Course name cannot be empty")
        .max(80, "Course name must be 80 characters or fewer")
    )
    .max(10, "You can list up to 10 courses")
    .optional()
});

export type AcademicInfo = z.infer<typeof academicInfoSchema>;

export const AcademicInfoFactory = {
  create(input: unknown): Result<AcademicInfo> {
    const parsed = academicInfoSchema.safeParse(input);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return err(issue?.message ?? "Invalid academic info");
    }

    return ok(parsed.data);
  }
};

export type AcademicInfoFactoryType = typeof AcademicInfoFactory;
