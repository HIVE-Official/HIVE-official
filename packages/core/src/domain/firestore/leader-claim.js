import { z } from "zod";
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
//# sourceMappingURL=leader-claim.js.map