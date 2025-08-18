"use client";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * HIVE Unified Auth Context Provider
 * Provides consistent authentication state across all systems
 * Integrates with Firebase Auth, session management, and API endpoints
 */
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
// Simple logger for UI package
const logger = {
    info: (message, context) => {
        console.info(`[HIVE UI] ${message}`, context);
    },
    warn: (message, context) => {
        console.warn(`[HIVE UI] ${message}`, context);
    },
    error: (message, context) => {
        console.error(`[HIVE UI] ${message}`, context);
    },
    debug: (message, context) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[HIVE UI] ${message}`, context);
        }
    }
};
// Advanced auth features disabled for now - causing import failures
const AdvancedAuthSecurity = null;
const AuthPerformanceOptimizer = null;
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
// SECURITY: Development mode detection removed for production safety
// All authentication must use proper validation channels
const isDevelopmentMode = () => {
    return false; // Always enforce production security
};
// Provider Component
export const UnifiedAuthProvider = ({ children, firebaseIntegration }) => {
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
    // Get Auth Token - MOVED BEFORE validateSession to fix circular dependency
    const getAuthToken = useCallback(async () => {
        if (typeof window === 'undefined')
            return null;
        // Use Firebase token if integration is available
        if (firebaseIntegration) {
            try {
                const firebaseToken = await firebaseIntegration.getFirebaseToken();
                if (firebaseToken)
                    return firebaseToken;
            }
            catch (error) {
                logger.error('Failed to get Firebase token', { error });
            }
        }
        // Fallback to stored token
        return window.localStorage.getItem('auth_token') ||
            window.localStorage.getItem('firebase_token') ||
            null;
    }, [firebaseIntegration]);
    // Session Validation
    const validateSession = useCallback(async () => {
        try {
            const token = await getAuthToken();
            if (!token)
                return false;
            // Development token validation removed for production security
            // Validate with backend for production sessions
            const response = await fetch('/api/auth/session', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                logger.warn(`Session validation failed: ${response.status}`);
                return false;
            }
            const data = await response.json();
            return data.valid === true;
        }
        catch (error) {
            logger.error('Session validation failed', { error });
            return false;
        }
    }, [getAuthToken]);
    // Enhanced Session Persistence with Advanced Security
    const persistSession = useCallback(async (user, session) => {
        if (typeof window === 'undefined')
            return;
        let sessionData = {
            userId: user.id,
            email: user.email,
            schoolId: user.schoolId,
            onboardingCompleted: user.onboardingCompleted,
            verifiedAt: session.issuedAt || new Date().toISOString(),
            profileData: {
                fullName: user.fullName || '',
                handle: user.handle || '',
                major: user.major || '',
                avatarUrl: user.avatarUrl || '',
                builderOptIn: user.builderOptIn || false,
            },
            token: session.token,
            developmentMode: session.developmentMode || false,
        };
        // Enhance with security features if available
        if (AdvancedAuthSecurity) {
            try {
                const securityInstance = AdvancedAuthSecurity.getInstance();
                sessionData = securityInstance.createSecureSession(user.id, sessionData);
            }
            catch (error) {
                logger.warn('Advanced security features failed, using basic session');
            }
        }
        // Use performance optimizer for async storage if available
        if (AuthPerformanceOptimizer) {
            try {
                const optimizer = AuthPerformanceOptimizer.getInstance();
                await optimizer.setStorageAsync('hive_session', JSON.stringify(sessionData));
                // Cache user data for performance
                optimizer.setCachedUserData(user.id, user);
                if (session.developmentMode) {
                    await optimizer.setStorageAsync('dev_auth_mode', 'true');
                }
                return;
            }
            catch (error) {
                logger.warn('Performance optimizer failed, falling back to sync storage');
            }
        }
        // Standard session storage (basic security - server validates tokens)
        window.localStorage.setItem('hive_session', JSON.stringify(sessionData));
        // Store auth token separately for API calls
        if (sessionData.token) {
            window.localStorage.setItem('auth_token', sessionData.token);
        }
    }, []);
    // Session Loading Helper
    const loadPersistedSession = useCallback(() => {
        if (typeof window === 'undefined')
            return null;
        const sessionJson = window.localStorage.getItem('hive_session');
        if (!sessionJson)
            return null;
        try {
            const sessionData = JSON.parse(sessionJson);
            const user = {
                id: sessionData.userId,
                uid: sessionData.userId, // Map id to uid for Firebase compatibility
                email: sessionData.email,
                schoolId: sessionData.schoolId,
                onboardingCompleted: sessionData.onboardingCompleted || false,
                fullName: sessionData.profileData?.fullName,
                handle: sessionData.profileData?.handle,
                major: sessionData.profileData?.major,
                avatarUrl: sessionData.profileData?.avatarUrl,
                builderOptIn: sessionData.profileData?.builderOptIn || false,
                developmentMode: sessionData.developmentMode || false,
                isDeveloper: sessionData.developmentMode || false,
            };
            const session = {
                token: sessionData.token || null,
                issuedAt: sessionData.verifiedAt,
                developmentMode: sessionData.developmentMode || false,
            };
            // SECURITY: Reject sessions without valid tokens
            if (!session.token) {
                logger.warn('Session has no valid token, rejecting');
                return null;
            }
            return { user, session };
        }
        catch (error) {
            logger.error('Failed to parse persisted session', { error });
            return null;
        }
    }, []);
    // Initialize Auth State
    const initializeAuth = useCallback(async () => {
        try {
            updateAuthState({ isLoading: true, error: null });
            // If Firebase integration is available, use it for auth state
            if (firebaseIntegration && typeof window !== 'undefined') {
                // Check if this is an email link sign-in
                if (firebaseIntegration.isEmailLinkSignIn()) {
                    try {
                        await firebaseIntegration.handleEmailLinkSignIn();
                        // Firebase auth state will trigger updates via listener
                        return;
                    }
                    catch (error) {
                        logger.error('Email link sign-in failed', { error });
                        updateAuthState({
                            error: error instanceof Error ? error.message : 'Email link sign-in failed',
                            isLoading: false,
                        });
                        return;
                    }
                }
                // Firebase will handle auth state via listener
                // Just wait for the auth state to resolve
                return;
            }
            // Fallback to session-based auth
            const persistedAuth = loadPersistedSession();
            if (persistedAuth) {
                // SECURITY FIX: Validate session before trusting it
                const isValid = await validateSession();
                if (isValid) {
                    updateAuthState({
                        user: persistedAuth.user,
                        session: persistedAuth.session,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return;
                }
                else {
                    // Clear invalid session
                    clearPersistedSession();
                }
            }
            // No valid session found
            updateAuthState({
                user: null,
                session: null,
                isAuthenticated: false,
                isLoading: false,
            });
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
    }, [updateAuthState, loadPersistedSession, firebaseIntegration]);
    // Clear Persisted Session Helper
    const clearPersistedSession = useCallback(() => {
        if (typeof window === 'undefined')
            return;
        // Clear all auth-related storage keys
        const keysToRemove = [
            'hive_session',
            'auth_token',
            'firebase_token',
            'dev_auth_mode',
            'emailForSignIn'
        ];
        keysToRemove.forEach(key => {
            window.localStorage.removeItem(key);
        });
    }, []);
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
    // Development Login - Re-enabled for development workflow
    const devLogin = useCallback(async (userId = 'dev_user_123') => {
        if (process.env.NODE_ENV !== 'development') {
            throw new Error('Development login only available in development mode');
        }
        try {
            updateAuthState({ isLoading: true, error: null });
            const devUser = {
                id: userId,
                uid: userId,
                email: 'dev@hive.com',
                fullName: 'Dev User',
                handle: 'devuser',
                major: 'Computer Science',
                schoolId: 'dev_school',
                onboardingCompleted: true,
                emailVerified: true,
                builderOptIn: true,
                isDeveloper: true,
                developmentMode: true,
                profileCompletion: 100,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const devSession = {
                token: `dev_session_${userId}_${Date.now()}`,
                issuedAt: new Date().toISOString(),
                developmentMode: true,
                lastActivity: new Date().toISOString(),
            };
            updateAuthState({
                user: devUser,
                session: devSession,
                isAuthenticated: true,
                isLoading: false,
            });
            await persistSession(devUser, devSession);
            // Set dev auth mode flag
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('dev_auth_mode', 'true');
            }
            logger.info('Development login successful', { userId });
        }
        catch (error) {
            updateAuthState({
                isLoading: false,
                error: error instanceof Error ? error.message : 'Development login failed',
            });
            throw error;
        }
    }, [updateAuthState, persistSession]);
    // Logout
    const logout = useCallback(async () => {
        try {
            updateAuthState({ isLoading: true });
            // Use Firebase signout if integration is available
            if (firebaseIntegration) {
                try {
                    await firebaseIntegration.signOut();
                }
                catch (error) {
                    logger.error('Firebase logout failed', { error });
                }
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
            // Clear all persisted auth data
            clearPersistedSession();
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
    }, [updateAuthState, getAuthToken, clearPersistedSession, firebaseIntegration]);
    // Magic Link Implementation
    const sendMagicLink = useCallback(async (email, schoolId) => {
        try {
            updateAuthState({ isLoading: true, error: null });
            const response = await fetch('/api/auth/send-magic-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    schoolId: schoolId || 'default'
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send magic link');
            }
            const data = await response.json();
            logger.info('Magic link sent successfully', { email });
            updateAuthState({ isLoading: false });
            return data;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to send magic link';
            updateAuthState({
                isLoading: false,
                error: errorMessage,
            });
            throw error;
        }
    }, [updateAuthState]);
    const verifyMagicLink = useCallback(async (token, email, schoolId) => {
        try {
            updateAuthState({ isLoading: true, error: null });
            const response = await fetch('/api/auth/verify-magic-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    email: email || window.localStorage.getItem('emailForSignIn'),
                    schoolId: schoolId || 'default'
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to verify magic link');
            }
            const data = await response.json();
            if (data.success) {
                // Clear stored email
                window.localStorage.removeItem('emailForSignIn');
                if (data.needsOnboarding) {
                    // User needs onboarding
                    const newUser = {
                        id: data.userId,
                        uid: data.userId,
                        email: email || '',
                        onboardingCompleted: false,
                        emailVerified: true
                    };
                    const newSession = {
                        token: token,
                        issuedAt: new Date().toISOString(),
                        developmentMode: data.dev || false
                    };
                    updateAuthState({
                        user: newUser,
                        session: newSession,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    await persistSession(newUser, newSession);
                }
                else {
                    // Existing user, they can proceed to app
                    await initializeAuth();
                }
                logger.info('Magic link verified successfully', { userId: data.userId });
                return data;
            }
            throw new Error('Magic link verification failed');
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to verify magic link';
            updateAuthState({
                isLoading: false,
                error: errorMessage,
            });
            throw error;
        }
    }, [updateAuthState, persistSession]);
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
            // Update persisted session using centralized method
            const updatedSession = {
                ...authState.session,
                lastActivity: new Date().toISOString(),
            };
            persistSession(updatedUser, updatedSession);
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
    }, [authState.user, authState.session, updateAuthState, getAuthToken, hydrateProfileData, persistSession]);
    const clearDevSession = useCallback(() => {
        clearPersistedSession();
        updateAuthState({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
        });
    }, [updateAuthState, clearPersistedSession]);
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
    // Error Recovery
    const clearError = useCallback(() => {
        updateAuthState({ error: null });
    }, [updateAuthState]);
    const retryInitialization = useCallback(async () => {
        await initializeAuth();
    }, [initializeAuth]);
    // Firebase auth state listener
    useEffect(() => {
        if (!firebaseIntegration || typeof window === 'undefined')
            return;
        const unsubscribe = firebaseIntegration.listenToAuthChanges(async (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in with Firebase
                try {
                    // Get or create user session
                    const token = await firebaseIntegration.getFirebaseToken();
                    if (!token) {
                        logger.error('No Firebase token available');
                        return;
                    }
                    // Validate session with backend
                    const response = await fetch('/api/auth/session', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const sessionData = await response.json();
                        const user = {
                            id: sessionData.user.id,
                            uid: sessionData.user.id,
                            email: sessionData.user.email,
                            fullName: sessionData.user.fullName,
                            handle: sessionData.user.handle,
                            major: sessionData.user.major,
                            avatarUrl: sessionData.user.avatarUrl,
                            schoolId: sessionData.user.schoolId,
                            onboardingCompleted: sessionData.user.onboardingCompleted,
                            emailVerified: sessionData.user.emailVerified,
                            builderOptIn: sessionData.user.builderOptIn,
                        };
                        const session = {
                            token,
                            issuedAt: sessionData.session.issuedAt,
                            expiresAt: sessionData.session.expiresAt,
                        };
                        updateAuthState({
                            user,
                            session,
                            isAuthenticated: true,
                            isLoading: false,
                            error: null,
                        });
                        // Persist session
                        await persistSession(user, session);
                    }
                    else {
                        logger.error('Session validation failed', { status: response.status });
                        updateAuthState({
                            user: null,
                            session: null,
                            isAuthenticated: false,
                            isLoading: false,
                        });
                    }
                }
                catch (error) {
                    logger.error('Error processing Firebase auth state', { error });
                    updateAuthState({
                        user: null,
                        session: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: error instanceof Error ? error.message : 'Authentication failed',
                    });
                }
            }
            else {
                // User is signed out
                updateAuthState({
                    user: null,
                    session: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
                clearPersistedSession();
            }
        });
        return unsubscribe;
    }, [firebaseIntegration, updateAuthState, persistSession, clearPersistedSession]);
    // Initialize auth on mount - SECURITY FIX: Properly await async operation
    useEffect(() => {
        initializeAuth().catch(error => {
            logger.error('Auth initialization failed on mount', { error });
        });
    }, [initializeAuth]);
    // Listen for storage changes (multi-tab sync)
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const handleStorageChange = (e) => {
            if (e.key === 'hive_session' || e.key === 'auth_token') {
                // SECURITY FIX: Properly await async operation
                initializeAuth().catch(error => {
                    logger.error('Auth initialization failed on storage change', { error });
                });
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [initializeAuth]);
    // Auto-retry on network errors
    useEffect(() => {
        if (authState.error && authState.error.includes('network')) {
            const retryTimer = setTimeout(() => {
                logger.info('Auto-retrying after network error');
                retryInitialization();
            }, 5000);
            return () => clearTimeout(retryTimer);
        }
    }, [authState.error, retryInitialization]);
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
        clearError,
        retryInitialization,
    };
    return (_jsx(UnifiedAuthContext.Provider, { value: contextValue, children: children }));
};
// Export context for advanced usage
export { UnifiedAuthContext };
//# sourceMappingURL=unified-auth-context.js.map