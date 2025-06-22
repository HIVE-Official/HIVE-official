import { ReactNode } from "react";
export interface AuthUser {
    uid: string;
    email: string | null;
    fullName: string | null;
    onboardingCompleted: boolean;
    getIdToken: () => Promise<string>;
}
export interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}
export declare function AuthProvider({ children }: {
    children: ReactNode;
}): AuthContext.Provider;
export declare function useAuth(): AuthContextType;
//# sourceMappingURL=use-auth.d.ts.map