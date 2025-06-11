import { z } from "zod";

export const UserProfileSchema = z.object({
    uid: z.string().min(1),
    email: z.string().email(),
    handle: z.string().min(4).max(15).regex(/^[a-z0-9]+$/),
    fullName: z.string().min(1).max(40),
    preferredName: z.string().max(20).optional(),
    major: z.string().min(1),
    gradYear: z.string().length(4),
    isBuilder: z.boolean().default(false),
    isPublic: z.boolean().default(true),
    avatarUrl: z.string().url().optional(),
    status: z.enum(["active", "suspended", "deleted"]).default("active"),
    roles: z.array(z.string()).default(["student"]),
    reputation: z.number().int().default(0),
    createdAt: z.any(), // Firestore Timestamp
    lastSeen: z.any(), // Firestore Timestamp
});

export type UserProfile = z.infer<typeof UserProfileSchema>; 