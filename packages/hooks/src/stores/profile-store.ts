import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Domain types
export interface ProfileData {
  // Basic profile info
  id: string;
  fullName?: string;
  handle?: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  onboardingCompleted: boolean;
  
  // Privacy settings
  isPublic?: boolean;
  builderOptIn?: boolean;
  builderAnalyticsEnabled?: boolean;
  
  // Completion tracking
  completedFields: string[];
  completionPercentage: number;
  
  // Timestamps
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
  identity: boolean; // Always unlocked
  campusConnection: boolean; // Unlocked after basic profile completion
  profileStrength: boolean; // Always unlocked
  socialConnections: boolean; // Unlocked after joining 2+ spaces
  personalAnalytics: boolean; // Unlocked after 1 week of activity
  personalTools: boolean; // Unlocked after creating or using a tool
  activityHistory: boolean; // Unlocked after 10 interactions
  quickActions: boolean; // Always unlocked
}

interface ProfileState {
  // Core profile data
  profile: ProfileData | null;
  spaceMemberships: SpaceMembership[];
  analytics: ProfileAnalytics | null;
  
  // UI state
  unlockStatus: CardUnlockStatus;
  isEditing: boolean;
  selectedCard: string | null;
  
  // Loading states
  isProfileLoading: boolean;
  isSpacesLoading: boolean;
  isAnalyticsLoading: boolean;
  
  // Error states
  profileError: string | null;
  spacesError: string | null;
  analyticsError: string | null;

  // Actions - Profile
  setProfile: (profile: ProfileData | null) => void;
  updateProfile: (updates: Partial<ProfileData>) => void;
  setProfileLoading: (loading: boolean) => void;
  setProfileError: (error: string | null) => void;
  
  // Actions - Spaces
  setSpaceMemberships: (memberships: SpaceMembership[]) => void;
  updateSpaceMembership: (spaceId: string, updates: Partial<SpaceMembership>) => void;
  addSpaceMembership: (membership: SpaceMembership) => void;
  removeSpaceMembership: (spaceId: string) => void;
  setSpacesLoading: (loading: boolean) => void;
  setSpacesError: (error: string | null) => void;
  
  // Actions - Analytics
  setAnalytics: (analytics: ProfileAnalytics | null) => void;
  updateAnalytics: (updates: Partial<ProfileAnalytics>) => void;
  setAnalyticsLoading: (loading: boolean) => void;
  setAnalyticsError: (error: string | null) => void;
  
  // Actions - UI
  setUnlockStatus: (status: Partial<CardUnlockStatus>) => void;
  setEditing: (editing: boolean) => void;
  setSelectedCard: (cardId: string | null) => void;
  
  // Utility
  calculateUnlocks: () => void;
  reset: () => void;
}

const initialCardUnlocks: CardUnlockStatus = {
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

export const useProfileStore = create<ProfileState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Profile actions
        setProfile: (profile) => {
          set({ profile }, false, 'setProfile');
          get().calculateUnlocks();
        },

        updateProfile: (updates) =>
          set(
            (state) => {
              if (!state.profile) return state;
              
              const updatedProfile = {
                ...state.profile,
                ...updates,
                updatedAt: new Date(),
              };
              
              // Recalculate completion
              const requiredFields = ['fullName', 'handle', 'bio', 'major', 'avatarUrl'];
              const completedFields = requiredFields.filter(field => updatedProfile[field as keyof ProfileData]);
              const completionPercentage = Math.round((completedFields.length / requiredFields.length) * 100);
              
              return {
                profile: {
                  ...updatedProfile,
                  completedFields,
                  completionPercentage,
                },
              };
            },
            false,
            'updateProfile'
          ),

        setProfileLoading: (isProfileLoading) =>
          set({ isProfileLoading }, false, 'setProfileLoading'),

        setProfileError: (profileError) =>
          set({ profileError, isProfileLoading: false }, false, 'setProfileError'),

        // Spaces actions
        setSpaceMemberships: (spaceMemberships) => {
          set({ spaceMemberships }, false, 'setSpaceMemberships');
          get().calculateUnlocks();
        },

        updateSpaceMembership: (spaceId, updates) =>
          set(
            (state) => ({
              spaceMemberships: state.spaceMemberships.map((membership) =>
                membership.spaceId === spaceId
                  ? { ...membership, ...updates, lastActivity: new Date() }
                  : membership
              ),
            }),
            false,
            'updateSpaceMembership'
          ),

        addSpaceMembership: (membership) => {
          set(
            (state) => ({
              spaceMemberships: [...state.spaceMemberships, membership],
            }),
            false,
            'addSpaceMembership'
          );
          get().calculateUnlocks();
        },

        removeSpaceMembership: (spaceId) => {
          set(
            (state) => ({
              spaceMemberships: state.spaceMemberships.filter(
                (membership) => membership.spaceId !== spaceId
              ),
            }),
            false,
            'removeSpaceMembership'
          );
          get().calculateUnlocks();
        },

        setSpacesLoading: (isSpacesLoading) =>
          set({ isSpacesLoading }, false, 'setSpacesLoading'),

        setSpacesError: (spacesError) =>
          set({ spacesError, isSpacesLoading: false }, false, 'setSpacesError'),

        // Analytics actions
        setAnalytics: (analytics) =>
          set({ analytics }, false, 'setAnalytics'),

        updateAnalytics: (updates) =>
          set(
            (state) => ({
              analytics: state.analytics
                ? { ...state.analytics, ...updates }
                : null,
            }),
            false,
            'updateAnalytics'
          ),

        setAnalyticsLoading: (isAnalyticsLoading) =>
          set({ isAnalyticsLoading }, false, 'setAnalyticsLoading'),

        setAnalyticsError: (analyticsError) =>
          set({ analyticsError, isAnalyticsLoading: false }, false, 'setAnalyticsError'),

        // UI actions
        setUnlockStatus: (status) =>
          set(
            (state) => ({
              unlockStatus: { ...state.unlockStatus, ...status },
            }),
            false,
            'setUnlockStatus'
          ),

        setEditing: (isEditing) =>
          set({ isEditing }, false, 'setEditing'),

        setSelectedCard: (selectedCard) =>
          set({ selectedCard }, false, 'setSelectedCard'),

        // Calculate unlocks based on current state
        calculateUnlocks: () => {
          const state = get();
          const { profile, spaceMemberships, analytics } = state;
          
          const newUnlocks: Partial<CardUnlockStatus> = {};
          
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
          
          set(
            (state) => ({
              unlockStatus: { ...state.unlockStatus, ...newUnlocks },
            }),
            false,
            'calculateUnlocks'
          );
        },

        // Reset all state
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'hive-profile',
        partialize: (state) => ({
          // Persist UI preferences and unlock status
          unlockStatus: state.unlockStatus,
          selectedCard: state.selectedCard,
        }),
      }
    ),
    {
      name: 'ProfileStore',
    }
  )
);

// Selectors for common use cases
export const useProfileData = () => useProfileStore((state) => state.profile);
export const useSpaceMemberships = () => useProfileStore((state) => state.spaceMemberships);
export const useProfileAnalytics = () => useProfileStore((state) => state.analytics);
export const useProfileUnlocks = () => useProfileStore((state) => state.unlockStatus);
export const useProfileLoading = () => useProfileStore((state) => ({
  profile: state.isProfileLoading,
  spaces: state.isSpacesLoading,
  analytics: state.isAnalyticsLoading,
}));
export const useProfileErrors = () => useProfileStore((state) => ({
  profile: state.profileError,
  spaces: state.spacesError,
  analytics: state.analyticsError,
}));