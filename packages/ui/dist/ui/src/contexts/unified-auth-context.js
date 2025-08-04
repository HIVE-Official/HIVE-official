"use client";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * HIVE Unified Auth Context Provider
 * Provides consistent authentication state across all systems
 * Integrates with Firebase Auth, session management, and API endpoints
 */
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { logger } from '../lib/logger.js';
// Create the context
const UnifiedAuthContext = createContext(null);
// Hook for consuming the context
export const useUnifiedAuth = () => {
    const context = useContext(UnifiedAuthContext);
    if (!context) {
        throw new Error('useUnifiedAuth must be used within a UnifiedAuthProvider');
    }
    return context;
};
// Development mode detection
const isDevelopmentMode = () => {
    if (typeof window === 'undefined')
        return false;
    return process.env.NODE_ENV === 'development' ||
        window.localStorage.getItem('dev_auth_mode') === 'true';
};
// Provider Component
export const UnifiedAuthProvider = ({ children }) => {
    // Core State
    const [authState, setAuthState] = useState({
        user: null,
        session: null,
        isLoading: true,
        isAuthenticated: false,
        error: null,
    });
    // Update auth state helper
    const updateAuthState = useCallback((updates) => {
        setAuthState(prev => ({ ...prev, ...updates }));
    }, []);
    // Session Validation
    const validateSession = useCallback(async () => {
        try {
            const token = await getAuthToken();
            if (!token)
                return false;
            // Handle development mode
            if (isDevelopmentMode() && token.startsWith('dev_token_')) {
                return true;
            }
            // Validate with backend
            const response = await fetch('/api/auth/session', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Session validation failed: ${response.status}`);
            }
            const data = await response.json();
            return data.valid === true;
        }
        catch (error) {
            logger.error('Session validation failed', { error });
            return false;
        }
    }, []);
    // Get Auth Token
    const getAuthToken = useCallback(async () => {
        if (typeof window === 'undefined')
            return null;
        if (isDevelopmentMode()) {
            // Check for dev session
            const sessionData = window.localStorage.getItem('hive_session');
            if (sessionData) {
                const session = JSON.parse(sessionData);
                return `dev_token_${session.userId}`;
            }
            return null;
        }
        // Production mode - check for stored token
        return window.localStorage.getItem('auth_token') ||
            window.localStorage.getItem('firebase_token') ||
            null;
    }, []);
    // Initialize Auth State
    const initializeAuth = useCallback(async () => {
        try {
            updateAuthState({ isLoading: true, error: null });
            // Development mode initialization
            if (isDevelopmentMode()) {
                const sessionJson = window.localStorage.getItem('hive_session');
                if (!sessionJson) {
                    // Create dev session
                    const devUser = {
                        id: 'dev_user_123',
                        email: 'dev@hive.com',
                        fullName: 'Dev User',
                        handle: 'devuser',
                        major: 'Computer Science',
                        schoolId: 'dev_school',
                        onboardingCompleted: true,
                        builderOptIn: true,
                        developmentMode: true,
                        isDeveloper: true,
                    };
                    const devSession = {
                        token: `dev_token_${devUser.id}`,
                        issuedAt: new Date().toISOString(),
                        developmentMode: true,
                    };
                    // Store dev session
                    const sessionData = {
                        userId: devUser.id,
                        email: devUser.email,
                        schoolId: devUser.schoolId,
                        onboardingCompleted: true,
                        verifiedAt: new Date().toISOString(),
                        profileData: {
                            fullName: devUser.fullName,
                            handle: devUser.handle,
                            major: devUser.major,
                            avatarUrl: devUser.avatarUrl || '',
                            builderOptIn: devUser.builderOptIn,
                        }
                    };
                    window.localStorage.setItem('hive_session', JSON.stringify(sessionData));
                    window.localStorage.setItem('dev_auth_mode', 'true');
                    updateAuthState({
                        user: devUser,
                        session: devSession,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return;
                }
                // Parse existing dev session
                const session = JSON.parse(sessionJson);
                const devUser = {
                    id: session.userId,
                    email: session.email,
                    schoolId: session.schoolId,
                    onboardingCompleted: session.onboardingCompleted || !!session.profileData?.fullName,
                    fullName: session.profileData?.fullName,
                    handle: session.profileData?.handle,
                    major: session.profileData?.major,
                    avatarUrl: session.profileData?.avatarUrl,
                    builderOptIn: session.profileData?.builderOptIn,
                    developmentMode: true,
                    isDeveloper: true,
                };
                const devSession = {
                    token: `dev_token_${devUser.id}`,
                    issuedAt: session.verifiedAt,
                    developmentMode: true,
                };
                updateAuthState({
                    user: devUser,
                    session: devSession,
                    isAuthenticated: true,
                    isLoading: false,
                });
                return;
            }
            // Production mode - validate existing session
            const token = await getAuthToken();
            if (!token) {
                updateAuthState({
                    user: null,
                    session: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
                return;
            }
            // Validate session with backend
            const response = await fetch('/api/auth/session', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                // Invalid session, clear it
                window.localStorage.removeItem('auth_token');
                window.localStorage.removeItem('firebase_token');
                updateAuthState({
                    user: null,
                    session: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
                return;
            }
            const data = await response.json();
            if (data.valid && data.user) {
                const user = {
                    id: data.user.id,
                    email: data.user.email,
                    fullName: data.user.fullName,
                    handle: data.user.handle,
                    major: data.user.major,
                    avatarUrl: data.user.avatarUrl,
                    schoolId: data.user.schoolId,
                    builderOptIn: data.user.builderOptIn,
                    onboardingCompleted: data.user.onboardingCompleted,
                    emailVerified: data.user.emailVerified,
                    createdAt: data.user.createdAt,
                    updatedAt: data.user.updatedAt,
                };
                const session = {
                    token,
                    issuedAt: data.session?.issuedAt,
                    expiresAt: data.session?.expiresAt,
                    lastActivity: new Date().toISOString(),
                };
                updateAuthState({
                    user,
                    session,
                    isAuthenticated: true,
                    isLoading: false,
                });
            }
            else {
                updateAuthState({
                    user: null,
                    session: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            }
        }
        catch (error) {
            logger.error('Auth initialization failed', { error });
            updateAuthState({
                user: null,
                session: null,
                isAuthenticated: false,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Authentication failed',
            });
        }
    }, [updateAuthState, getAuthToken]);
    // Login Methods
    const login = useCallback(async (email, password) => {
        try {
            updateAuthState({ isLoading: true, error: null });
            if (isDevelopmentMode()) {
                // Dev login logic
                await devLogin(email);
                return;
            }
            // Production login would integrate with Firebase or magic link
            throw new Error('Production login not yet implemented');
        }
        catch (error) {
            updateAuthState({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Login failed',
            });
            throw error;
        }
    }, [updateAuthState]);
    // Development Login
    const devLogin = useCallback(async (userId = 'dev_user_123') => {
        if (!isDevelopmentMode()) {
            throw new Error('Dev login only available in development mode');
        }
        const devUser = {
            id: userId,
            email: `${userId}@hive.com`,
            fullName: 'Dev User',
            handle: userId.replace('dev_user_', 'user'),
            major: 'Computer Science',
            schoolId: 'dev_school',
            onboardingCompleted: true,
            builderOptIn: true,
            developmentMode: true,
            isDeveloper: true,
        };
        const devSession = {
            token: `dev_token_${userId}`,
            issuedAt: new Date().toISOString(),
            developmentMode: true,
        };
        // Store session
        const sessionData = {
            userId: devUser.id,
            email: devUser.email,
            schoolId: devUser.schoolId,
            onboardingCompleted: true,
            verifiedAt: new Date().toISOString(),
            profileData: {
                fullName: devUser.fullName,
                handle: devUser.handle,
                major: devUser.major,
                avatarUrl: devUser.avatarUrl || '',
                builderOptIn: devUser.builderOptIn,
            }
        };
        window.localStorage.setItem('hive_session', JSON.stringify(sessionData));
        window.localStorage.setItem('dev_auth_mode', 'true');
        updateAuthState({
            user: devUser,
            session: devSession,
            isAuthenticated: true,
            isLoading: false,
        });
    }, [updateAuthState]);
    // Logout
    const logout = useCallback(async () => {
        try {
            updateAuthState({ isLoading: true });
            // Clear all auth data
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem('hive_session');
                window.localStorage.removeItem('auth_token');
                window.localStorage.removeItem('firebase_token');
                window.localStorage.removeItem('dev_auth_mode');
            }
            // Call logout API if not in dev mode
            if (!isDevelopmentMode()) {
                try {
                    await fetch('/api/auth/logout', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${await getAuthToken()}`,
                        },
                    });
                }
                catch (error) {
                    logger.error('Logout API call failed', { error });
                }
            }
            updateAuthState({
                user: null,
                session: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
        catch (error) {
            logger.error('Logout failed', { error });
            updateAuthState({
                user: null,
                session: null,
                isAuthenticated: false,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Logout failed',
            });
        }
    }, [updateAuthState, getAuthToken]);
    // Stub implementations for now
    const sendMagicLink = useCallback(async (email) => {
        // TODO: Implement magic link sending
        console.log('Magic link would be sent to:', email);
    }, []);
    const verifyMagicLink = useCallback(async (token) => {
        // TODO: Implement magic link verification
        console.log('Magic link token would be verified:', token);
    }, []);
    const refreshSession = useCallback(async () => {
        await initializeAuth();
    }, [initializeAuth]);
    const updateProfile = useCallback(async (updates) => {
        if (!authState.user)
            return;
        // Update local state
        const updatedUser = { ...authState.user, ...updates };
        updateAuthState({ user: updatedUser });
        // TODO: Sync with backend
    }, [authState.user, updateAuthState]);
    // Profile Data Hydration - syncs user data to profile system
    const hydrateProfileData = useCallback(async (user) => {
        try {
            // Call profile API to ensure data is synced
            const token = await getAuthToken();
            if (!token)
                return;
            const profileResponse = await fetch('/api/profile/route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fullName: user.fullName,
                    handle: user.handle,
                    major: user.major,
                    avatarUrl: user.avatarUrl,
                    schoolId: user.schoolId,
                    builderOptIn: user.builderOptIn,
                    onboardingCompleted: true,
                }),
            });
            if (profileResponse.ok) {
                logger.info('Profile data hydrated successfully', { userId: user.id });
            }
            else {
                logger.warn('Profile hydration failed', {
                    userId: user.id,
                    status: profileResponse.status
                });
            }
        }
        catch (error) {
            logger.error('Profile hydration error', { error, userId: user.id });
        }
    }, [getAuthToken]);
    const completeOnboarding = useCallback(async (onboardingData) => {
        if (!authState.user) {
            throw new Error('No authenticated user for onboarding completion');
        }
        try {
            updateAuthState({ isLoading: true, error: null });
            const token = await getAuthToken();
            if (!token) {
                throw new Error('No auth token available');
            }
            // Call the complete onboarding API
            const response = await fetch('/api/auth/complete-onboarding', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(onboardingData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to complete onboarding');
            }
            const result = await response.json();
            // Update user state with completed onboarding data
            const updatedUser = {
                ...authState.user,
                fullName: onboardingData.fullName,
                handle: onboardingData.handle,
                major: onboardingData.major,
                avatarUrl: onboardingData.avatarUrl,
                onboardingCompleted: true,
                profileCompletion: 90, // High completion after onboarding
                updatedAt: new Date().toISOString(),
            };
            updateAuthState({
                user: updatedUser,
                isLoading: false
            });
            // Update stored session data
            if (typeof window !== 'undefined') {
                const sessionJson = window.localStorage.getItem('hive_session');
                if (sessionJson) {
                    const session = JSON.parse(sessionJson);
                    session.onboardingCompleted = true;
                    session.profileData = {
                        fullName: onboardingData.fullName,
                        handle: onboardingData.handle,
                        major: onboardingData.major,
                        avatarUrl: onboardingData.avatarUrl || '',
                        builderOptIn: (onboardingData.builderRequestSpaces?.length || 0) > 0,
                    };
                    window.localStorage.setItem('hive_session', JSON.stringify(session));
                }
            }
            // Trigger profile data hydration
            await hydrateProfileData(updatedUser);
            return {
                user: result.user,
                builderRequestsCreated: result.builderRequestsCreated,
                success: result.success,
                message: result.message,
            };
        }
        catch (error) {
            updateAuthState({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Onboarding completion failed',
            });
            throw error;
        }
    }, [authState.user, updateAuthState, getAuthToken, hydrateProfileData]);
    const clearDevSession = useCallback(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('hive_session');
            window.localStorage.removeItem('dev_auth_mode');
        }
        updateAuthState({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
        });
    }, [updateAuthState]);
    // State Queries
    const requiresOnboarding = useCallback(() => {
        return authState.isAuthenticated && !authState.user?.onboardingCompleted;
    }, [authState.isAuthenticated, authState.user?.onboardingCompleted]);
    const hasValidSession = useCallback(() => {
        return authState.isAuthenticated && !!authState.session?.token;
    }, [authState.isAuthenticated, authState.session?.token]);
    const canAccessFeature = useCallback((feature) => {
        if (!authState.isAuthenticated)
            return false;
        switch (feature) {
            case 'builder':
                return authState.user?.builderOptIn === true;
            case 'admin':
                return authState.user?.isAdmin === true;
            default:
                return true;
        }
    }, [authState.isAuthenticated, authState.user]);
    // Initialize auth on mount
    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);
    // Listen for storage changes (multi-tab sync)
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const handleStorageChange = (e) => {
            if (e.key === 'hive_session' || e.key === 'auth_token') {
                initializeAuth();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [initializeAuth]);
    const contextValue = {
        ...authState,
        login,
        logout,
        sendMagicLink,
        verifyMagicLink,
        refreshSession,
        validateSession,
        getAuthToken,
        updateProfile,
        completeOnboarding,
        devLogin,
        clearDevSession,
        requiresOnboarding,
        hasValidSession,
        canAccessFeature,
    };
    return (_jsx(UnifiedAuthContext.Provider, { value: contextValue, children: children }));
};
// Export context for advanced usage
export { UnifiedAuthContext };
//# sourceMappingURL=unified-auth-context.js.map