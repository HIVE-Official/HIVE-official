import { type Timestamp } from "firebase/firestore";
import { z } from "zod";
/**
 * Represents a user's request to become a leader of a new or existing space.
 */
export interface LeaderClaim {
    id: string;
    userId: string;
    requestedSpaceName: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export declare const LeaderClaimSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    requestedSpaceName: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["PENDING", "APPROVED", "REJECTED"]>>;
    createdAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    updatedAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    userId: string;
    createdAt: number | Date;
    updatedAt: number | Date;
    requestedSpaceName: string;
}, {
    id: string;
    userId: string;
    createdAt: number | Date;
    updatedAt: number | Date;
    requestedSpaceName: string;
    status?: "PENDING" | "APPROVED" | "REJECTED" | undefined;
}>;
export declare const CreateLeaderClaimSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    userId: z.ZodString;
    requestedSpaceName: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["PENDING", "APPROVED", "REJECTED"]>>;
    createdAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    updatedAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
}, "id" | "status" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    userId: string;
    requestedSpaceName: string;
}, {
    userId: string;
    requestedSpaceName: string;
}>;
export declare const UpdateLeaderClaimSchema: z.ZodObject<Pick<{
    id: z.ZodString;
    userId: z.ZodString;
    requestedSpaceName: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["PENDING", "APPROVED", "REJECTED"]>>;
    createdAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
    updatedAt: z.ZodUnion<[z.ZodDate, z.ZodNumber]>;
}, "status">, "strip", z.ZodTypeAny, {
    status: "PENDING" | "APPROVED" | "REJECTED";
}, {
    status?: "PENDING" | "APPROVED" | "REJECTED" | undefined;
}>;
export type CreateLeaderClaimData = z.infer<typeof CreateLeaderClaimSchema>;
export type UpdateLeaderClaimData = z.infer<typeof UpdateLeaderClaimSchema>;
//# sourceMappingURL=leader-claim.d.ts.map