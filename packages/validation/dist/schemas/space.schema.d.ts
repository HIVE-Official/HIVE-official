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
    createdAt: Date;
    memberCount: number;
    name: string;
    description: string;
    imageUrl: string;
    category: "Major" | "Residential" | "Student Life" | "Club" | "General";
    isPublic: boolean;
    createdBy: string;
    updatedAt?: Date | undefined;
    lastActivityAt?: Date | undefined;
}, {
    name: string;
    description: string;
    imageUrl: string;
    category: "Major" | "Residential" | "Student Life" | "Club" | "General";
    createdBy: string;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    memberCount?: number | undefined;
    isPublic?: boolean | undefined;
    lastActivityAt?: Date | undefined;
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