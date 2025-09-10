"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserProfile = useUserProfile;
exports.useUserSpaceMemberships = useUserSpaceMemberships;
exports.useUserAnalytics = useUserAnalytics;
exports.useUpdateProfile = useUpdateProfile;
exports.useUploadProfilePhoto = useUploadProfilePhoto;
exports.useProfileData = useProfileData;
exports.useProfileSubscription = useProfileSubscription;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const query_client_1 = require("./query-client");
const auth_store_1 = require("../stores/auth-store");
const profile_store_1 = require("../stores/profile-store");
// API client functions
async function fetchUserProfile(userId) {
    const token = await auth_store_1.useAuthStore.getState().user?.getIdToken();
    const response = await fetch(`/api/profile/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }
    const data = await response.json();
    return data.profile;
}
async function fetchUserSpaceMemberships(userId, includeActivity = true) {
    const token = await auth_store_1.useAuthStore.getState().user?.getIdToken();
    const params = new URLSearchParams({
        includeActivity: includeActivity.toString(),
        timeRange: 'week',
    });
    const response = await fetch(`/api/profile/spaces?${params}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch space memberships: ${response.statusText}`);
    }
    const data = await response.json();
    return data.memberships || [];
}
async function fetchUserAnalytics(userId) {
    const token = await auth_store_1.useAuthStore.getState().user?.getIdToken();
    const response = await fetch(`/api/profile/analytics`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch profile analytics: ${response.statusText}`);
    }
    const data = await response.json();
    return data.analytics;
}
async function updateUserProfile(userId, updates) {
    const token = await auth_store_1.useAuthStore.getState().user?.getIdToken();
    const response = await fetch(`/api/profile/me`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
    }
    const data = await response.json();
    return data.profile;
}
async function uploadProfilePhoto(file) {
    const token = await auth_store_1.useAuthStore.getState().user?.getIdToken();
    const formData = new FormData();
    formData.append('photo', file);
    const response = await fetch('/api/profile/upload-photo', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload photo');
    }
    return await response.json();
}
// React Query hooks
function useUserProfile(userId = 'me') {
    const { setProfile, setProfileLoading, setProfileError } = (0, profile_store_1.useProfileStore)();
    const query = (0, react_query_1.useQuery)({
        queryKey: query_client_1.queryKeys.profile(userId),
        queryFn: () => fetchUserProfile(userId),
        staleTime: 2 * 60 * 1000, // Consider fresh for 2 minutes
        enabled: !!userId,
    });
    // Handle side effects using useEffect instead of deprecated callbacks
    (0, react_1.useEffect)(() => {
        if (userId === 'me') {
            if (query.data) {
                setProfile(query.data);
                setProfileError(null);
            }
            if (query.error) {
                setProfileError(query.error.message);
            }
            setProfileLoading(query.isLoading);
        }
    }, [userId, query.data, query.error, query.isLoading, setProfile, setProfileError, setProfileLoading]);
    return query;
}
function useUserSpaceMemberships(userId = 'me', includeActivity = true) {
    const { setSpaceMemberships, setSpacesLoading, setSpacesError } = (0, profile_store_1.useProfileStore)();
    const query = (0, react_query_1.useQuery)({
        queryKey: [...query_client_1.queryKeys.profile(userId), 'spaces', { includeActivity }],
        queryFn: () => fetchUserSpaceMemberships(userId, includeActivity),
        staleTime: 1 * 60 * 1000, // Consider fresh for 1 minute (more dynamic data)
        enabled: !!userId,
    });
    // Handle side effects using useEffect instead of deprecated callbacks
    (0, react_1.useEffect)(() => {
        if (userId === 'me') {
            if (query.data) {
                setSpaceMemberships(query.data);
                setSpacesError(null);
            }
            if (query.error) {
                setSpacesError(query.error.message);
            }
            setSpacesLoading(query.isLoading);
        }
    }, [userId, query.data, query.error, query.isLoading, setSpaceMemberships, setSpacesError, setSpacesLoading]);
    return query;
}
function useUserAnalytics(userId = 'me') {
    const { setAnalytics, setAnalyticsLoading, setAnalyticsError } = (0, profile_store_1.useProfileStore)();
    const query = (0, react_query_1.useQuery)({
        queryKey: query_client_1.queryKeys.userAnalytics(userId),
        queryFn: () => fetchUserAnalytics(userId),
        staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes (less dynamic)
        enabled: !!userId,
    });
    // Handle side effects using useEffect instead of deprecated callbacks
    (0, react_1.useEffect)(() => {
        if (userId === 'me') {
            if (query.data) {
                setAnalytics(query.data);
                setAnalyticsError(null);
            }
            if (query.error) {
                setAnalyticsError(query.error.message);
            }
            setAnalyticsLoading(query.isLoading);
        }
    }, [userId, query.data, query.error, query.isLoading, setAnalytics, setAnalyticsError, setAnalyticsLoading]);
    return query;
}
// Mutations
function useUpdateProfile() {
    const queryClient = (0, react_query_1.useQueryClient)();
    const { updateProfile } = (0, profile_store_1.useProfileStore)();
    const _user = (0, auth_store_1.useAuthStore)((state) => state.user);
    return (0, react_query_1.useMutation)({
        mutationFn: (updates) => updateUserProfile('me', updates),
        onMutate: async (updates) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: query_client_1.queryKeys.profile('me') });
            // Snapshot previous value
            const previousProfile = queryClient.getQueryData(query_client_1.queryKeys.profile('me'));
            // Optimistically update store
            updateProfile(updates);
            // Return rollback function
            return { previousProfile };
        },
        onError: (error, _updates, context) => {
            // Rollback optimistic update
            if (context?.previousProfile) {
                queryClient.setQueryData(query_client_1.queryKeys.profile('me'), context.previousProfile);
            }
            // Set error in store
            profile_store_1.useProfileStore.getState().setProfileError(error.message);
        },
        onSuccess: (data) => {
            // Update cache with server response
            queryClient.setQueryData(query_client_1.queryKeys.profile('me'), data);
            // Update store with final server data
            profile_store_1.useProfileStore.getState().setProfile(data);
            profile_store_1.useProfileStore.getState().setProfileError(null);
        },
        onSettled: () => {
            // Refetch to ensure consistency
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.profile('me') });
        },
    });
}
function useUploadProfilePhoto() {
    const queryClient = (0, react_query_1.useQueryClient)();
    const { updateProfile } = (0, profile_store_1.useProfileStore)();
    return (0, react_query_1.useMutation)({
        mutationFn: uploadProfilePhoto,
        onSuccess: (data) => {
            // Update profile with new avatar URL
            updateProfile({ avatarUrl: data.avatarUrl });
            // Invalidate profile queries to refetch
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.profile('me') });
        },
        onError: (error) => {
            profile_store_1.useProfileStore.getState().setProfileError(error.message);
        },
    });
}
// Combined hook for all profile data
function useProfileData(userId = 'me') {
    const profile = useUserProfile(userId);
    const spaces = useUserSpaceMemberships(userId);
    const analytics = useUserAnalytics(userId);
    return {
        profile,
        spaces,
        analytics,
        isLoading: profile.isLoading || spaces.isLoading || analytics.isLoading,
        isError: profile.isError || spaces.isError || analytics.isError,
        error: profile.error || spaces.error || analytics.error,
    };
}
// Real-time subscription hook (for Firebase integration)
function useProfileSubscription(_userId = 'me') {
    const _queryClient = (0, react_query_1.useQueryClient)();
    const { setProfile: _setProfile, setSpaceMemberships: _setSpaceMemberships } = (0, profile_store_1.useProfileStore)();
    // This would integrate with Firebase real-time listeners
    // For now, it's a placeholder that could be extended
    return {
        subscribe: () => {
            // Set up Firebase listeners here
            // Return cleanup function
            return () => {
                // Cleanup listeners
            };
        },
        unsubscribe: () => {
            // Manual unsubscribe if needed
        },
    };
}
//# sourceMappingURL=profile-queries.js.map