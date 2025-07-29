import { z } from "zod";
// Zod validation schemas
export const UserSchema = z.object({
    id: z.string(),
    uid: z.string(),
    email: z.string().email(),
    fullName: z.string(),
    handle: z.string(),
    avatarUrl: z.string().optional(),
    bio: z.string().max(500).optional(),
    major: z.string(),
    graduationYear: z.number().optional(),
    schoolId: z.string(),
    isPublic: z.boolean().default(false),
    consentGiven: z.boolean(),
    builderOptIn: z.boolean().default(false),
    isBuilder: z.boolean().default(false),
    builderAnalyticsEnabled: z.boolean().default(true),
    onboardingCompleted: z.boolean().default(false),
    isVerified: z.boolean().default(false),
    status: z.enum(["active", "suspended", "deleted"]).default("active"),
    createdAt: z.number(),
    updatedAt: z.number(),
    lastActiveAt: z.number().optional(),
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