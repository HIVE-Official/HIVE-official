import React from 'react';
export type AuthStep = 'welcome' | 'sign-in' | 'sign-up' | 'forgot-password' | 'verify-email' | 'magic-link-sent' | 'onboarding';
export interface AuthState {
    step: AuthStep;
    email: string;
    loading: boolean;
    error: string | null;
    isNewUser: boolean;
}
export interface AuthContextType {
    state: AuthState;
    setStep: (step: AuthStep) => void;
    setEmail: (email: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setIsNewUser: (isNewUser: boolean) => void;
    goBack: () => void;
    handleSignIn: (email: string, password?: string) => Promise<void>;
    handleSignUp: (email: string, password: string, name: string) => Promise<void>;
    handleMagicLink: (email: string) => Promise<void>;
    handleForgotPassword: (email: string) => Promise<void>;
}
export declare function useAuth(): AuthContextType;
interface AuthProviderProps {
    children: React.ReactNode;
    onAuthSuccess?: (user: {
        id: string;
        email: string;
        name: string;
        isNewUser: boolean;
    }) => void;
    initialStep?: AuthStep;
    mockMode?: boolean;
}
export declare function AuthProvider({ children, onAuthSuccess, initialStep, mockMode }: AuthProviderProps): import("react/jsx-runtime").JSX.Element;
interface HiveAuthFlowEnhancedProps {
    className?: string;
    onAuthSuccess?: (user: {
        id: string;
        email: string;
        name: string;
        isNewUser: boolean;
    }) => void;
    initialStep?: AuthStep;
    mockMode?: boolean;
}
export declare function HiveAuthFlowEnhanced({ className, onAuthSuccess, initialStep, mockMode }: HiveAuthFlowEnhancedProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=hive-auth-flow-enhanced.d.ts.map