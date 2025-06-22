import { z } from "zod";
// Zod validation schemas
export const UserSchema = z.object({
    id: z.string(),
    uid: z.string(),
    email: z.string().email(),
    fullName: z.string(),
    handle: z.string(),
    avatarUrl: z.string().optional(),
    major: z.string(),
    graduationYear: z.number().optional(),
    schoolId: z.string(),
    dormitory: z.string().optional(),
    roomNumber: z.string().optional(),
    housingType: z.enum(["on_campus", "off_campus", "commuter"]).optional(),
    organizations: z.array(z.string()).default([]),
    clubs: z.array(z.string()).default([]),
    academicInterests: z.array(z.string()).default([]),
    isPublic: z.boolean().default(false),
    consentGiven: z.boolean(),
    showDormitory: z.boolean().default(true),
    showOrganizations: z.boolean().default(true),
    builderOptIn: z.boolean().default(false),
    isBuilder: z.boolean().default(false),
    builderApprovedAt: z.union([z.date(), z.number()]).optional(),
    builderAchievements: z
        .object({
        toolsCreated: z.number().default(0),
        totalEngagement: z.number().default(0),
        invitesSent: z.number().default(0),
        nextBadgeTarget: z.string().optional(),
    })
        .default({
        toolsCreated: 0,
        totalEngagement: 0,
        invitesSent: 0,
    }),
    builderAnalyticsEnabled: z.boolean().default(true),
    onboardingCompleted: z.boolean().default(false),
    isVerified: z.boolean().default(false),
    status: z.enum(["active", "suspended", "deleted"]).default("active"),
    createdAt: z.union([z.date(), z.number()]),
    updatedAt: z.union([z.date(), z.number()]),
    lastActiveAt: z.union([z.date(), z.number()]).optional(),
});
export const CreateUserSchema = UserSchema.omit({
    id: true,
    uid: true,
    createdAt: true,
    updatedAt: true,
    lastActiveAt: true,
});
export const UpdateUserSchema = UserSchema.partial().omit({
    id: true,
    uid: true,
    handle: true,
    schoolId: true,
    createdAt: true,
});
//# sourceMappingURL=user.js.map