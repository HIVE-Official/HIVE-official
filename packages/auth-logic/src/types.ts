export interface AuthUser {
  uid: string;
  email: string | null;
  fullName?: string | null;
  onboardingCompleted?: boolean;
  emailVerified: boolean;
  customClaims: Record<string, unknown>;
  getIdToken?: () => Promise<string>;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signInWithCustomToken: (token: string) => Promise<void>;
}

export type UseAuthReturn = AuthContextType; 