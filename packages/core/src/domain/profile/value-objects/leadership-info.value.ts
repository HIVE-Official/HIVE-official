// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import { err, ok, type Result } from "../../../shared/result";
import type { LeadershipInfo, LeadershipSpace } from "../profile.types";

const leadershipSpaceSchema = z
  .object({
    id: z.string().min(1, "Space id is required"),
    name: z.string().min(1, "Space name is required"),
    campusId: z.string().min(1).optional()
  })
  .transform<LeadershipSpace>((value) => value);

const classCodeSchema = z
  .string()
  .trim()
  .min(2, "Class code must be at least 2 characters")
  .max(40, "Class code must be 40 characters or fewer");

const leadershipInfoSchema = z
  .object({
    isLeader: z.boolean().optional(),
    spaces: z.array(leadershipSpaceSchema).max(6).optional(),
    classCodes: z.array(classCodeSchema).max(12).optional()
  })
  .transform<LeadershipInfo>((value) => ({
    isLeader: Boolean(value.isLeader),
    spaces: (value.spaces ?? []).map((space) => ({
      id: space.id,
      name: space.name,
      campusId: space.campusId
    })),
    classCodes: (value.classCodes ?? []).map((code) => code.trim())
  }));

export const LeadershipInfoFactory = {
  create(input: unknown): Result<LeadershipInfo> {
    const parsed = leadershipInfoSchema.safeParse(input ?? {});
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return err(issue?.message ?? "Invalid leadership info");
    }
    return ok(parsed.data);
  }
};

export type LeadershipInfoFactoryType = typeof LeadershipInfoFactory;
