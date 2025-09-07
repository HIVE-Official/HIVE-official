"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProfileErrors = exports.useProfileLoading = exports.useProfileUnlocks = exports.useProfileAnalytics = exports.useSpaceMemberships = exports.useProfileData = exports.useProfileStore = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const initialCardUnlocks = {
    identity: true,
    campusConnection: false,
    profileStrength: true,
    socialConnections: false,
    personalAnalytics: false,
    personalTools: false,
    activityHistory: false,
    quickActions: true,
};
const initialState = {
    profile: null,
    spaceMemberships: [],
    analytics: null,
    unlockStatus: initialCardUnlocks,
    isEditing: false,
    selectedCard: null,
    isProfileLoading: false,
    isSpacesLoading: false,
    isAnalyticsLoading: false,
    profileError: null,
    spacesError: null,
    analyticsError: null,
};
exports.useProfileStore = (0, zustand_1.create)()((0, middleware_1.devtools)((0, middleware_1.persist)((set, get) => ({
    ...initialState,
    // Profile actions
    setProfile: (profile) => {
        set({ profile }, false, 'setProfile');
        get().calculateUnlocks();
    },
    updateProfile: (updates) => set((state) => {
        if (!state.profile)
            return state;
        const updatedProfile = {
            ...state.profile,
            ...updates,
            updatedAt: new Date(),
        };
        // Recalculate completion
        const requiredFields = ['fullName', 'handle', 'bio', 'major', 'avatarUrl'];
        const completedFields = requiredFields.filter(field => updatedProfile[field]);
        const completionPercentage = Math.round((completedFields.length / requiredFields.length) * 100);
        return {
            profile: {
                ...updatedProfile,
                completedFields,
                completionPercentage,
            },
        };
    }, false, 'updateProfile'),
    setProfileLoading: (isProfileLoading) => set({ isProfileLoading }, false, 'setProfileLoading'),
    setProfileError: (profileError) => set({ profileError, isProfileLoading: false }, false, 'setProfileError'),
    // Spaces actions
    setSpaceMemberships: (spaceMemberships) => {
        set({ spaceMemberships }, false, 'setSpaceMemberships');
        get().calculateUnlocks();
    },
    updateSpaceMembership: (spaceId, updates) => set((state) => ({
        spaceMemberships: state.spaceMemberships.map((membership) => membership.spaceId === spaceId
            ? { ...membership, ...updates, lastActivity: new Date() }
            : membership),
    }), false, 'updateSpaceMembership'),
    addSpaceMembership: (membership) => {
        set((state) => ({
            spaceMemberships: [...state.spaceMemberships, membership],
        }), false, 'addSpaceMembership');
        get().calculateUnlocks();
    },
    removeSpaceMembership: (spaceId) => {
        set((state) => ({
            spaceMemberships: state.spaceMemberships.filter((membership) => membership.spaceId !== spaceId),
        }), false, 'removeSpaceMembership');
        get().calculateUnlocks();
    },
    setSpacesLoading: (isSpacesLoading) => set({ isSpacesLoading }, false, 'setSpacesLoading'),
    setSpacesError: (spacesError) => set({ spacesError, isSpacesLoading: false }, false, 'setSpacesError'),
    // Analytics actions
    setAnalytics: (analytics) => set({ analytics }, false, 'setAnalytics'),
    updateAnalytics: (updates) => set((state) => ({
        analytics: state.analytics
            ? { ...state.analytics, ...updates }
            : null,
    }), false, 'updateAnalytics'),
    setAnalyticsLoading: (isAnalyticsLoading) => set({ isAnalyticsLoading }, false, 'setAnalyticsLoading'),
    setAnalyticsError: (analyticsError) => set({ analyticsError, isAnalyticsLoading: false }, false, 'setAnalyticsError'),
    // UI actions
    setUnlockStatus: (status) => set((state) => ({
        unlockStatus: { ...state.unlockStatus, ...status },
    }), false, 'setUnlockStatus'),
    setEditing: (isEditing) => set({ isEditing }, false, 'setEditing'),
    setSelectedCard: (selectedCard) => set({ selectedCard }, false, 'setSelectedCard'),
    // Calculate unlocks based on current state
    calculateUnlocks: () => {
        const state = get();
        const { profile, spaceMemberships, analytics } = state;
        const newUnlocks = {};
        // Campus connection unlocks after basic profile info
        if (profile) {
            const hasBasicInfo = !!(profile.fullName && profile.handle && profile.bio);
            newUnlocks.campusConnection = hasBasicInfo || spaceMemberships.length > 0;
        }
        // Social connections unlock after joining 2+ spaces
        newUnlocks.socialConnections = spaceMemberships.length >= 2;
        // Personal analytics unlock after having analytics data
        newUnlocks.personalAnalytics = !!analytics;
        // Personal tools unlock after creating or using tools (would come from analytics)
        newUnlocks.personalTools = !!analytics && (analytics.toolsCreated > 0 || analytics.recentActivity.toolDeployments > 0);
        // Activity history unlocks after sufficient interactions
        const totalInteractions = analytics
            ? analytics.recentActivity.posts + analytics.recentActivity.comments + analytics.recentActivity.reactions
            : 0;
        newUnlocks.activityHistory = totalInteractions >= 10;
        set((state) => ({
            unlockStatus: { ...state.unlockStatus, ...newUnlocks },
        }), false, 'calculateUnlocks');
    },
    // Reset all state
    reset: () => set(initialState, false, 'reset'),
}), {
    name: 'hive-profile',
    partialize: (state) => ({
        // Persist UI preferences and unlock status
        unlockStatus: state.unlockStatus,
        selectedCard: state.selectedCard,
    }),
}), {
    name: 'ProfileStore',
}));
// Selectors for common use cases
const useProfileData = () => (0, exports.useProfileStore)((state) => state.profile);
exports.useProfileData = useProfileData;
const useSpaceMemberships = () => (0, exports.useProfileStore)((state) => state.spaceMemberships);
exports.useSpaceMemberships = useSpaceMemberships;
const useProfileAnalytics = () => (0, exports.useProfileStore)((state) => state.analytics);
exports.useProfileAnalytics = useProfileAnalytics;
const useProfileUnlocks = () => (0, exports.useProfileStore)((state) => state.unlockStatus);
exports.useProfileUnlocks = useProfileUnlocks;
const useProfileLoading = () => (0, exports.useProfileStore)((state) => ({
    profile: state.isProfileLoading,
    spaces: state.isSpacesLoading,
    analytics: state.isAnalyticsLoading,
}));
exports.useProfileLoading = useProfileLoading;
const useProfileErrors = () => (0, exports.useProfileStore)((state) => ({
    profile: state.profileError,
    spaces: state.spacesError,
    analytics: state.analyticsError,
}));
exports.useProfileErrors = useProfileErrors;
//# sourceMappingURL=profile-store.js.map