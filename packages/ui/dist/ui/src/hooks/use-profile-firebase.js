/**
 * React Hooks for Firebase Profile Integration
 * Provides clean interface for components to interact with Firebase data
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { profileFirebaseService } from '../lib/firebase/profile-service';
// Custom hook for user profile management
export function useUserProfile(uid) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const unsubscribeRef = useRef(null);
    useEffect(() => {
        if (!uid) {
            setProfile(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        // Set up real-time listener
        unsubscribeRef.current = profileFirebaseService.subscribeToProfile(uid, (profileData) => {
            setProfile(profileData);
            setLoading(false);
        });
        // Initial fetch
        profileFirebaseService.getUserProfile(uid)
            .then((profileData) => {
            setProfile(profileData);
            setLoading(false);
        })
            .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
                unsubscribeRef.current = null;
            }
        };
    }, [uid]);
    const updateProfile = useCallback(async (updates) => {
        if (!uid)
            return;
        try {
            await profileFirebaseService.updateUserProfile(uid, updates);
            // Profile will be updated via real-time listener
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
    }, [uid]);
    const uploadPhoto = useCallback(async (file) => {
        if (!uid)
            throw new Error('No user ID');
        try {
            const photoURL = await profileFirebaseService.uploadProfilePhoto(uid, file);
            // Update profile with new photo URL
            await updateProfile({ profilePhotoURL: photoURL });
            return photoURL;
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
    }, [uid, updateProfile]);
    return {
        profile,
        loading,
        error,
        updateProfile,
        uploadPhoto,
        clearError: () => setError(null)
    };
}
// Custom hook for notifications
export function useNotifications(uid) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!uid) {
            setNotifications([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        profileFirebaseService.getUserNotifications(uid)
            .then((notificationData) => {
            setNotifications(notificationData);
            setLoading(false);
        })
            .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, [uid]);
    const markAsRead = useCallback(async (notificationId) => {
        try {
            await profileFirebaseService.markNotificationRead(notificationId);
            setNotifications(prev => prev.map(notification => notification.id === notificationId
                ? { ...notification, isRead: true }
                : notification));
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
    }, []);
    const markAllAsRead = useCallback(async () => {
        try {
            const unreadNotifications = notifications.filter(n => !n.isRead);
            await Promise.all(unreadNotifications.map(n => profileFirebaseService.markNotificationRead(n.id)));
            setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
    }, [notifications]);
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return {
        notifications,
        unreadCount,
        loading,
        error,
        markAsRead,
        markAllAsRead,
        clearError: () => setError(null)
    };
}
// Custom hook for user spaces
export function useUserSpaces(uid) {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!uid) {
            setSpaces([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        profileFirebaseService.getUserSpaces(uid)
            .then((spaceData) => {
            setSpaces(spaceData);
            setLoading(false);
        })
            .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, [uid]);
    return {
        spaces,
        loading,
        error,
        clearError: () => setError(null)
    };
}
// Custom hook for ghost mode
export function useGhostMode(uid) {
    const [ghostMode, setGhostMode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const updateGhostMode = useCallback(async (settings) => {
        if (!uid)
            return;
        try {
            await profileFirebaseService.updateGhostMode(uid, settings);
            setGhostMode(prev => prev ? { ...prev, ...settings } : null);
        }
        catch (err) {
            setError(err.message);
            throw err;
        }
    }, [uid]);
    const toggleGhostMode = useCallback(async (enabled) => {
        await updateGhostMode({
            isEnabled: enabled,
            updatedAt: new Date()
        });
    }, [updateGhostMode]);
    useEffect(() => {
        // Initialize with default settings if none exist
        if (!loading && !ghostMode && uid) {
            const defaultSettings = {
                uid,
                isEnabled: false,
                level: 'medium',
                settings: {
                    hideOnlineStatus: true,
                    hideActivity: true,
                    hideLocation: false,
                    hideSpaces: false,
                    hideTools: false,
                    muteNotifications: false
                },
                automation: {
                    quietHours: {
                        enabled: false,
                        start: '22:00',
                        end: '08:00'
                    },
                    autoEnabled: false
                },
                duration: 'session',
                updatedAt: new Date()
            };
            setGhostMode(defaultSettings);
        }
    }, [loading, ghostMode, uid]);
    return {
        ghostMode,
        loading,
        error,
        updateGhostMode,
        toggleGhostMode,
        clearError: () => setError(null)
    };
}
// Custom hook for user tools
export function useUserTools(uid) {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!uid) {
            setTools([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        profileFirebaseService.getUserTools(uid)
            .then((toolData) => {
            setTools(toolData);
            setLoading(false);
        })
            .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, [uid]);
    return {
        tools,
        loading,
        error,
        clearError: () => setError(null)
    };
}
// Custom hook for analytics tracking
export function useProfileAnalytics(uid) {
    const trackEvent = useCallback(async (event, data) => {
        if (!uid)
            return;
        try {
            await profileFirebaseService.updateProfileAnalytics(uid, event, data);
        }
        catch (err) {
            console.error('Analytics tracking failed:', err);
            // Don't throw error for analytics - it shouldn't break the app
        }
    }, [uid]);
    const trackProfileView = useCallback(() => {
        trackEvent('profile_view');
    }, [trackEvent]);
    const trackCardInteraction = useCallback((cardType, action) => {
        trackEvent('card_interaction', { cardType, action });
    }, [trackEvent]);
    const trackLayoutChange = useCallback((layoutData) => {
        trackEvent('layout_change', { layoutData });
    }, [trackEvent]);
    return {
        trackEvent,
        trackProfileView,
        trackCardInteraction,
        trackLayoutChange
    };
}
// Custom hook for comprehensive profile data
export function useProfileData(uid) {
    const profile = useUserProfile(uid);
    const notifications = useNotifications(uid);
    const spaces = useUserSpaces(uid);
    const ghostMode = useGhostMode(uid);
    const tools = useUserTools(uid);
    const analytics = useProfileAnalytics(uid);
    const loading = profile.loading || notifications.loading || spaces.loading || ghostMode.loading || tools.loading;
    const error = profile.error || notifications.error || spaces.error || ghostMode.error || tools.error;
    const clearAllErrors = useCallback(() => {
        profile.clearError();
        notifications.clearError();
        spaces.clearError();
        ghostMode.clearError();
        tools.clearError();
    }, [profile, notifications, spaces, ghostMode, tools]);
    return {
        profile: profile.profile,
        notifications: notifications.notifications,
        unreadNotifications: notifications.unreadCount,
        spaces: spaces.spaces,
        ghostMode: ghostMode.ghostMode,
        tools: tools.tools,
        loading,
        error,
        actions: {
            // Profile actions
            updateProfile: profile.updateProfile,
            uploadPhoto: profile.uploadPhoto,
            // Notification actions
            markNotificationAsRead: notifications.markAsRead,
            markAllNotificationsAsRead: notifications.markAllAsRead,
            // Ghost mode actions
            updateGhostMode: ghostMode.updateGhostMode,
            toggleGhostMode: ghostMode.toggleGhostMode,
            // Analytics actions
            trackEvent: analytics.trackEvent,
            trackProfileView: analytics.trackProfileView,
            trackCardInteraction: analytics.trackCardInteraction,
            trackLayoutChange: analytics.trackLayoutChange
        },
        clearAllErrors
    };
}
// Utility hooks for specific functionality
export function useProfileLayout(uid) {
    const { profile, actions } = useProfileData(uid);
    const saveLayout = useCallback(async (layoutData) => {
        try {
            await actions.updateProfile({
                preferences: {
                    theme: "auto",
                    notifications: {
                        email: true,
                        push: true,
                        inApp: true
                    },
                    ...profile?.preferences,
                    profileLayout: JSON.stringify(layoutData)
                }
            });
            actions.trackLayoutChange(layoutData);
        }
        catch (err) {
            console.error('Failed to save layout:', err);
            throw err;
        }
    }, [profile?.preferences, actions]);
    const getLayout = useCallback(() => {
        try {
            return profile?.preferences?.profileLayout
                ? JSON.parse(profile.preferences.profileLayout)
                : null;
        }
        catch (err) {
            console.error('Failed to parse layout:', err);
            return null;
        }
    }, [profile?.preferences?.profileLayout]);
    return {
        layout: getLayout(),
        saveLayout,
        hasCustomLayout: !!profile?.preferences?.profileLayout
    };
}
// Cleanup hook for component unmounting
export function useProfileCleanup() {
    useEffect(() => {
        return () => {
            profileFirebaseService.cleanup();
        };
    }, []);
}
//# sourceMappingURL=use-profile-firebase.js.map