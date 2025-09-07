import { type Auth } from 'firebase/auth';
import { type Firestore } from 'firebase/firestore';
interface AuthOperations {
    login: (email: string) => Promise<void>;
    verifyMagicLink: (email: string, link?: string) => Promise<boolean>;
    logout: () => Promise<void>;
    updateProfile: (updates: Record<string, unknown>) => Promise<void>;
    completeOnboarding: (profileData: Record<string, unknown>) => Promise<void>;
}
/**
 * Hook that provides auth operations connected to the store
 */
export declare function useAuthOperations(auth: Auth, db: Firestore): AuthOperations;
export {};
//# sourceMappingURL=use-auth-operations.d.ts.map