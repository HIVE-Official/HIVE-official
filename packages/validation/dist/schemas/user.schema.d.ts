import { z } from 'zod';
export declare const userSchema: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
    fullName: z.ZodString;
    preferredName: z.ZodOptional<z.ZodString>;
    major: z.ZodString;
    graduationYear: z.ZodNumber;
    handle: z.ZodString;
    avatar: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        url: string;
    }, {
        path: string;
        url: string;
    }>>;
    onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
    isBuilder: z.ZodDefault<z.ZodBoolean>;
    legal: z.ZodObject<{
        termsOfServiceAcceptedVersion: z.ZodString;
        privacyPolicyAcceptedVersion: z.ZodString;
        acceptedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        termsOfServiceAcceptedVersion: string;
        privacyPolicyAcceptedVersion: string;
        acceptedAt: Date;
    }, {
        termsOfServiceAcceptedVersion: string;
        privacyPolicyAcceptedVersion: string;
        acceptedAt: Date;
    }>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDefault<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    createdAt: Date;
    updatedAt: Date;
    email: string;
    fullName: string;
    major: string;
    graduationYear: number;
    handle: string;
    onboardingCompleted: boolean;
    isBuilder: boolean;
    legal: {
        termsOfServiceAcceptedVersion: string;
        privacyPolicyAcceptedVersion: string;
        acceptedAt: Date;
    };
    preferredName?: string | undefined;
    avatar?: {
        path: string;
        url: string;
    } | undefined;
}, {
    email: string;
    fullName: string;
    major: string;
    graduationYear: number;
    handle: string;
    legal: {
        termsOfServiceAcceptedVersion: string;
        privacyPolicyAcceptedVersion: string;
        acceptedAt: Date;
    };
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    preferredName?: string | undefined;
    avatar?: {
        path: string;
        url: string;
    } | undefined;
    onboardingCompleted?: boolean | undefined;
    isBuilder?: boolean | undefined;
}>;
export type User = z.infer<typeof userSchema>;
//# sourceMappingURL=user.schema.d.ts.map