import type { User } from 'firebase/auth';
interface Profile {
    id: string;
    email: string;
    handle: string;
    displayName: string;
    photoURL?: string;
    schoolId: string;
    graduationYear: number;
    major?: string;
    interests: string[];
    isBuilder: boolean;
    onboardingCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
interface AuthState {
    user: User | null;
    profile: Profile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User | null) => void;
    setProfile: (profile: Profile | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    updateProfile: (updates: Partial<Profile>) => void;
    logout: () => void;
    reset: () => void;
}
export declare const useAuthStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<AuthState>, "setState" | "devtools"> & {
    setState(partial: AuthState | Partial<AuthState> | ((state: AuthState) => AuthState | Partial<AuthState>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: AuthState | ((state: AuthState) => AuthState), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AuthState, {
            profile: Profile | null;
            isAuthenticated: boolean;
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AuthState) => void) => () => void;
        onFinishHydration: (fn: (state: AuthState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AuthState, {
            profile: Profile | null;
            isAuthenticated: boolean;
        }>>;
    };
}>;
export declare const useUser: () => User | null;
export declare const useProfile: () => Profile | null;
export declare const useIsAuthenticated: () => boolean;
export declare const useAuthLoading: () => boolean;
export {};
//# sourceMappingURL=auth-store.d.ts.map