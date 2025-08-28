"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOnboardingSessionSchema = exports.CreateOnboardingSessionSchema = exports.SchoolInvitationSchema = exports.WaitlistEntrySchema = exports.OnboardingSessionSchema = exports.OnboardingErrorSchema = void 0;
const zod_1 = require("zod");
// Zod validation schemas
exports.OnboardingErrorSchema = zod_1.z.object({
    step: zod_1.z.enum(['email_verification', 'school_selection', 'profile_setup', 'academic_info', 'interests', 'space_discovery', 'consent', 'completion']),
    error: zod_1.z.string(),
    timestamp: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]),
    resolved: zod_1.z.boolean().default(false),
});
exports.OnboardingSessionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string().optional(),
    sessionStarted: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]),
    sessionExpires: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]),
    currentStep: zod_1.z.enum(['email_verification', 'school_selection', 'profile_setup', 'academic_info', 'interests', 'space_discovery', 'consent', 'completion']),
    isComplete: zod_1.z.boolean().default(false),
    email: zod_1.z.string().email(),
    schoolId: zod_1.z.string(),
    schoolDomain: zod_1.z.string(),
    fullName: zod_1.z.string().optional(),
    handle: zod_1.z.string().optional(),
    avatarUrl: zod_1.z.string().optional(),
    majorId: zod_1.z.string().optional(),
    graduationYear: zod_1.z.number().optional(),
    academicLevel: zod_1.z.enum(['undergraduate', 'graduate', 'phd', 'faculty', 'alumni']).optional(),
    interestTags: zod_1.z.array(zod_1.z.string()).default([]),
    isFirstYear: zod_1.z.boolean().default(false),
    isLeaderCandidate: zod_1.z.boolean().default(false),
    selectedSpaces: zod_1.z.array(zod_1.z.string()).default([]),
    autoJoinSpaces: zod_1.z.array(zod_1.z.string()).default([]),
    consentGiven: zod_1.z.boolean().default(false),
    builderOptIn: zod_1.z.boolean().default(false),
    stepsCompleted: zod_1.z.array(zod_1.z.enum(['email_verification', 'school_selection', 'profile_setup', 'academic_info', 'interests', 'space_discovery', 'consent', 'completion'])).default([]),
    lastActivity: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]),
    completedAt: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]).optional(),
    errors: zod_1.z.array(exports.OnboardingErrorSchema).default([]),
});
exports.WaitlistEntrySchema = zod_1.z.object({
    id: zod_1.z.string(),
    schoolId: zod_1.z.string(),
    email: zod_1.z.string().email(),
    fullName: zod_1.z.string().optional(),
    graduationYear: zod_1.z.number().optional(),
    interests: zod_1.z.array(zod_1.z.string()).default([]),
    referralSource: zod_1.z.string().optional(),
    status: zod_1.z.enum(['pending', 'approved', 'rejected']).default('pending'),
    position: zod_1.z.number().optional(),
    emailVerified: zod_1.z.boolean().default(false),
    notificationsEnabled: zod_1.z.boolean().default(true),
    joinedAt: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]),
    approvedAt: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]).optional(),
    notifiedAt: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]).optional(),
});
exports.SchoolInvitationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    schoolId: zod_1.z.string(),
    email: zod_1.z.string().email(),
    invitedBy: zod_1.z.string(),
    role: zod_1.z.enum(['student', 'faculty', 'admin']).optional(),
    message: zod_1.z.string().optional(),
    status: zod_1.z.enum(['pending', 'accepted', 'expired', 'revoked']).default('pending'),
    sentAt: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]),
    expiresAt: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]),
    acceptedAt: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]).optional(),
    revokedAt: zod_1.z.union([zod_1.z.date(), zod_1.z.number()]).optional(),
});
exports.CreateOnboardingSessionSchema = exports.OnboardingSessionSchema.omit({
    id: true,
    sessionStarted: true,
    lastActivity: true,
});
exports.UpdateOnboardingSessionSchema = exports.OnboardingSessionSchema.partial().omit({
    id: true,
    sessionStarted: true,
});
//# sourceMappingURL=onboarding.js.map