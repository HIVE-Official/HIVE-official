import React from 'react';
export interface HiveUser {
    id: string;
    email: string;
    name?: string;
    handle?: string;
    avatarUrl?: string;
    role?: string;
    schoolId?: string;
    emailVerified?: boolean;
    onboardingComplete?: boolean;
}
interface HiveAuthContextValue {
    user: HiveUser | null;
    loading: boolean;
    error: Error | null;
    signIn: (email: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateUser: (updates: Partial<HiveUser>) => Promise<void>;
}
export declare function HiveAuthProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useHiveAuth(): HiveAuthContextValue;
export {};
//# sourceMappingURL=hive-auth-context.d.ts.map