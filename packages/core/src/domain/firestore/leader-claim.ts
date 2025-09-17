import { type Timestamp } from "firebase/firestore";
import { z } from "zod";

/**
 * Represents a user's request to become a leader of a new or existing space.
 */
export interface LeaderClaim {
  id: string; // Document ID
  userId: string; // The user making the claim
  requestedSpaceName: string; // The name of the space being claimed/requested
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Zod validation schema for LeaderClaim
export const LeaderClaimSchema = z.object({
  id: z.string(),
  userId: z.string(),
  requestedSpaceName: z
    .string()
    .min(3, "Space name must be at least 3 characters"),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).default("PENDING"),
  createdAt: z.union([z.date(), z.number()]),
  updatedAt: z.union([z.date(), z.number()]),
});

export const CreateLeaderClaimSchema = LeaderClaimSchema.omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateLeaderClaimSchema = LeaderClaimSchema.pick({
  status: true,
});

export type CreateLeaderClaimData = z.infer<typeof CreateLeaderClaimSchema>;
export type UpdateLeaderClaimData = z.infer<typeof UpdateLeaderClaimSchema>;
