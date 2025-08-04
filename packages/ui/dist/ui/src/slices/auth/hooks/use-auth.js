/**
 * useAuth Hook
 *
 * Main authentication hook that manages user state, login/logout flows,
 * and authentication status for HIVE applications.
 */
"use client";
import { useState, useCallback, useEffect, useContext, createContext } from 'react';
import { AUTH_ROUTES, SESSION_CONFIG, AUTH_ERROR_CODES, AUTH_ERROR_MESSAGES, DEV_CONFIG } from '../constants.js';
// Create auth context
const AuthContext = createContext(null);
const initialAuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitializing: true,
    error: null
};
export function useAuthProvider() {
    const [state, setState] = useState(initialAuthState);
    // Initialize auth state from stored session
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                setState(prev => ({ ...prev, isInitializing: true }));
                // Check for stored session
                const storedSession = localStorage.getItem(SESSION_CONFIG.STORAGE_KEY);
                if (storedSession) {
                    const sessionData = JSON.parse(storedSession);
                    // Validate session is not expired
                    if (new Date(sessionData.expiresAt) > new Date()) {
                        // Fetch current user data
                        const response = await fetch(AUTH_ROUTES.API.SESSION, {
                            headers: {
                                'Authorization': `Bearer ${sessionData.sessionToken}`
                            }
                        });
                        if (response.ok) {
                            const userData = await response.json();
                            setState(prev => ({
                                ...prev,
                                user: userData,
                                isAuthenticated: true,
                                sessionToken: sessionData.sessionToken,
                                expiresAt: new Date(sessionData.expiresAt),
                                isInitializing: false
                            }));
                            return;
                        }
                    }
                    // Clear invalid session
                    localStorage.removeItem(SESSION_CONFIG.STORAGE_KEY);
                }
            }
            catch (error) {
                console.warn('Failed to initialize auth:', error);
            }
            finally {
                setState(prev => ({ ...prev, isInitializing: false }));
            }
        };
        initializeAuth();
    }, []);
    // Login with email/password
    const login = useCallback(async (credentials) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await fetch(AUTH_ROUTES.API.SESSION, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR]);
            }
            const { user, sessionToken, expiresAt } = await response.json();
            // Store session
            const sessionData = {
                sessionToken,
                expiresAt,
                user: user
            };
            localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, JSON.stringify(sessionData));
            setState(prev => ({
                ...prev,
                user,
                isAuthenticated: true,
                sessionToken,
                expiresAt: new Date(expiresAt),
                isLoading: false
            }));
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR],
                isLoading: false
            }));
            throw error;
        }
    }, []);
    // Logout
    const logout = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            // Call logout API if we have a session token
            if (state.sessionToken) {
                await fetch(AUTH_ROUTES.API.LOGOUT, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${state.sessionToken}`
                    }
                });
            }
        }
        catch (error) {
            console.warn('Logout API call failed:', error);
        }
        finally {
            // Clear local state regardless of API call success
            localStorage.removeItem(SESSION_CONFIG.STORAGE_KEY);
            localStorage.removeItem(SESSION_CONFIG.REFRESH_KEY);
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isInitializing: false,
                error: null
            });
        }
    }, [state.sessionToken]);
    // Send magic link
    const sendMagicLink = useCallback(async (request) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await fetch(AUTH_ROUTES.API.SEND_MAGIC_LINK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR]);
            }
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR]
            }));
            throw error;
        }
        finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, []);
    // Verify magic link
    const verifyMagicLink = useCallback(async (verification) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await fetch(AUTH_ROUTES.API.VERIFY_MAGIC_LINK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(verification)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INVALID_MAGIC_LINK]);
            }
            const { user, sessionToken, expiresAt } = await response.json();
            // Store session
            const sessionData = {
                sessionToken,
                expiresAt,
                user: user
            };
            localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, JSON.stringify(sessionData));
            setState(prev => ({
                ...prev,
                user,
                isAuthenticated: true,
                sessionToken,
                expiresAt: new Date(expiresAt),
                isLoading: false
            }));
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR],
                isLoading: false
            }));
            throw error;
        }
    }, []);
    // Refresh session
    const refreshSession = useCallback(async () => {
        if (!state.sessionToken)
            return;
        try {
            const response = await fetch(AUTH_ROUTES.API.REFRESH, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${state.sessionToken}`
                }
            });
            if (response.ok) {
                const { sessionToken, expiresAt } = await response.json();
                // Update stored session
                const storedSession = localStorage.getItem(SESSION_CONFIG.STORAGE_KEY);
                if (storedSession) {
                    const sessionData = JSON.parse(storedSession);
                    sessionData.sessionToken = sessionToken;
                    sessionData.expiresAt = expiresAt;
                    localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, JSON.stringify(sessionData));
                }
                setState(prev => ({
                    ...prev,
                    sessionToken,
                    expiresAt: new Date(expiresAt)
                }));
            }
        }
        catch (error) {
            console.warn('Failed to refresh session:', error);
        }
    }, [state.sessionToken]);
    // Update profile
    const updateProfile = useCallback(async (updates) => {
        if (!state.user || !state.sessionToken)
            return;
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await fetch('/api/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.sessionToken}`
                },
                body: JSON.stringify(updates)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR]);
            }
            const updatedUser = await response.json();
            setState(prev => ({
                ...prev,
                user: updatedUser,
                isLoading: false
            }));
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR],
                isLoading: false
            }));
            throw error;
        }
    }, [state.user, state.sessionToken]);
    // Development login
    const devLogin = useCallback(async (data) => {
        if (!DEV_CONFIG.ENABLED) {
            throw new Error('Development login is not available in production');
        }
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await fetch(AUTH_ROUTES.API.DEV_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR]);
            }
            const { user, sessionToken, expiresAt } = await response.json();
            // Store session
            const sessionData = {
                sessionToken,
                expiresAt,
                user: user
            };
            localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, JSON.stringify(sessionData));
            setState(prev => ({
                ...prev,
                user,
                isAuthenticated: true,
                sessionToken,
                expiresAt: new Date(expiresAt),
                isLoading: false
            }));
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : AUTH_ERROR_MESSAGES[AUTH_ERROR_CODES.INTERNAL_ERROR],
                isLoading: false
            }));
            throw error;
        }
    }, []);
    return {
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        login,
        logout,
        sendMagicLink,
        verifyMagicLink,
        refreshSession,
        updateProfile,
        devLogin
    };
}
// Hook to consume auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
// Export context for provider
export { AuthContext };
//# sourceMappingURL=use-auth.js.map