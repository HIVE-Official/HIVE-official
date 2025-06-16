import { z } from 'zod';
export declare const spaceSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    imageUrl: z.ZodString;
    category: z.ZodEnum<["Major", "Residential", "Student Life", "Club", "General"]>;
    memberCount: z.ZodDefault<z.ZodNumber>;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    createdBy: z.ZodString;
    lastActivityAt: z.ZodOptional<z.ZodDate>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    isPublic: boolean;
    createdAt: Date;
    name: string;
    description: string;
    imageUrl: string;
    category: "Major" | "Residential" | "Student Life" | "Club" | "General";
    memberCount: number;
    createdBy: string;
    lastActivityAt?: Date | undefined;
    updatedAt?: Date | undefined;
}, {
    name: string;
    description: string;
    imageUrl: string;
    category: "Major" | "Residential" | "Student Life" | "Club" | "General";
    createdBy: string;
    isPublic?: boolean | undefined;
    createdAt?: Date | undefined;
    memberCount?: number | undefined;
    lastActivityAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;
export declare const memberSchema: z.ZodObject<{
    userId: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["admin", "member"]>>;
    joinedAt: z.ZodDefault<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    role: "admin" | "member";
    joinedAt: Date;
}, {
    userId: string;
    role?: "admin" | "member" | undefined;
    joinedAt?: Date | undefined;
}>;
export type Space = z.infer<typeof spaceSchema>;
export type Member = z.infer<typeof memberSchema>;
//# sourceMappingURL=space.schema.d.ts.map