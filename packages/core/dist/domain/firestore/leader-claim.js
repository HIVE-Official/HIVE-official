"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLeaderClaimSchema = exports.CreateLeaderClaimSchema = exports.LeaderClaimSchema = void 0;
const zod_1 = require("zod");
// Zod validation schema for LeaderClaim
exports.LeaderClaimSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    requestedSpaceName: zod_1.z
        .string()
        .min(3, "Space name must be at least 3 characters"),
    status: zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"]).default("PENDING"),
    createdAt: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]),
    updatedAt: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]),
});
exports.CreateLeaderClaimSchema = exports.LeaderClaimSchema.omit({
    id: true,
    status: true,
    createdAt: true,
    updatedAt: true,
});
exports.UpdateLeaderClaimSchema = exports.LeaderClaimSchema.pick({
    status: true,
});
//# sourceMappingURL=leader-claim.js.map