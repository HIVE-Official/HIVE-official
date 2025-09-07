export interface ProfileData {
    id: string;
    fullName?: string;
    handle?: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    major?: string;
    graduationYear?: number;
    onboardingCompleted: boolean;
    isPublic?: boolean;
    builderOptIn?: boolean;
    builderAnalyticsEnabled?: boolean;
    completedFields: string[];
    completionPercentage: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface SpaceMembership {
    spaceId: string;
    spaceName: string;
    spaceType: string;
    memberCount: number;
    role: 'member' | 'moderator' | 'admin' | 'builder';
    status: 'active' | 'inactive' | 'pending';
    activityLevel: 'high' | 'medium' | 'low';
    recentActivity: {
        posts: number;
        interactions: number;
        timeSpent: number;
    };
    joinedAt: Date;
    lastActivity: Date;
}
export interface ProfileAnalytics {
    profileViews: number;
    connectionsCount: number;
    toolsCreated: number;
    spacesJoined: number;
    recentActivity: {
        posts: number;
        comments: number;
        reactions: number;
        toolDeployments: number;
    };
    weeklyStats: {
        logins: number;
        timeSpent: number;
        interactionsGiven: number;
        interactionsReceived: number;
    };
}
export interface CardUnlockStatus {
    identity: boolean;
    campusConnection: boolean;
    profileStrength: boolean;
    socialConnections: boolean;
    personalAnalytics: boolean;
    personalTools: boolean;
    activityHistory: boolean;
    quickActions: boolean;
}
interface ProfileState {
    profile: ProfileData | null;
    spaceMemberships: SpaceMembership[];
    analytics: ProfileAnalytics | null;
    unlockStatus: CardUnlockStatus;
    isEditing: boolean;
    selectedCard: string | null;
    isProfileLoading: boolean;
    isSpacesLoading: boolean;
    isAnalyticsLoading: boolean;
    profileError: string | null;
    spacesError: string | null;
    analyticsError: string | null;
    setProfile: (profile: ProfileData | null) => void;
    updateProfile: (updates: Partial<ProfileData>) => void;
    setProfileLoading: (loading: boolean) => void;
    setProfileError: (error: string | null) => void;
    setSpaceMemberships: (memberships: SpaceMembership[]) => void;
    updateSpaceMembership: (spaceId: string, updates: Partial<SpaceMembership>) => void;
    addSpaceMembership: (membership: SpaceMembership) => void;
    removeSpaceMembership: (spaceId: string) => void;
    setSpacesLoading: (loading: boolean) => void;
    setSpacesError: (error: string | null) => void;
    setAnalytics: (analytics: ProfileAnalytics | null) => void;
    updateAnalytics: (updates: Partial<ProfileAnalytics>) => void;
    setAnalyticsLoading: (loading: boolean) => void;
    setAnalyticsError: (error: string | null) => void;
    setUnlockStatus: (status: Partial<CardUnlockStatus>) => void;
    setEditing: (editing: boolean) => void;
    setSelectedCard: (cardId: string | null) => void;
    calculateUnlocks: () => void;
    reset: () => void;
}
export declare const useProfileStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<ProfileState>, "setState" | "devtools"> & {
    setState(partial: ProfileState | Partial<ProfileState> | ((state: ProfileState) => ProfileState | Partial<ProfileState>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ProfileState | ((state: ProfileState) => ProfileState), replace: true, action?: (string | {
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
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ProfileState, {
            unlockStatus: CardUnlockStatus;
            selectedCard: string | null;
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ProfileState) => void) => () => void;
        onFinishHydration: (fn: (state: ProfileState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<ProfileState, {
            unlockStatus: CardUnlockStatus;
            selectedCard: string | null;
        }>>;
    };
}>;
export declare const useProfileData: () => ProfileData | null;
export declare const useSpaceMemberships: () => SpaceMembership[];
export declare const useProfileAnalytics: () => ProfileAnalytics | null;
export declare const useProfileUnlocks: () => CardUnlockStatus;
export declare const useProfileLoading: () => {
    profile: boolean;
    spaces: boolean;
    analytics: boolean;
};
export declare const useProfileErrors: () => {
    profile: string | null;
    spaces: string | null;
    analytics: string | null;
};
export {};
//# sourceMappingURL=profile-store.d.ts.map