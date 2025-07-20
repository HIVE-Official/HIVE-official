"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
// Zod validation schemas
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    uid: zod_1.z.string(),
    email: zod_1.z.string().email(),
    fullName: zod_1.z.string(),
    handle: zod_1.z.string(),
    avatarUrl: zod_1.z.string().optional(),
    bio: zod_1.z.string().max(500).optional(),
    major: zod_1.z.string(),
    graduationYear: zod_1.z.number().optional(),
    schoolId: zod_1.z.string(),
    isPublic: zod_1.z.boolean().default(false),
    consentGiven: zod_1.z.boolean(),
    builderOptIn: zod_1.z.boolean().default(false),
    isBuilder: zod_1.z.boolean().default(false),
    builderAnalyticsEnabled: zod_1.z.boolean().default(true),
    onboardingCompleted: zod_1.z.boolean().default(false),
    isVerified: zod_1.z.boolean().default(false),
    status: zod_1.z.enum(["active", "suspended", "deleted"]).default("active"),
    createdAt: zod_1.z.number(),
    updatedAt: zod_1.z.number(),
    lastActiveAt: zod_1.z.number().optional(),
});
exports.CreateUserSchema = exports.UserSchema.omit({
    id: true,
    uid: true,
    createdAt: true,
    updatedAt: true,
    lastActiveAt: true,
});
exports.UpdateUserSchema = exports.UserSchema.partial().omit({
    id: true,
    uid: true,
    handle: true,
    schoolId: true,
    createdAt: true,
});
//# sourceMappingURL=user.js.map