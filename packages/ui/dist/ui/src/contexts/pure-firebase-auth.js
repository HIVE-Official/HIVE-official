"use client";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * HIVE Pure Firebase Auth Context
 * EMERGENCY REWRITE - Clean Firebase Authentication Only
 * Eliminates session auth chaos and implements proper Firebase flow
 */
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, signInWithCustomToken, signOut as firebaseSignOut, getIdToken } from 'firebase/auth';
import { auth } from '@hive/core';
// Clean logger
const logger = {
    info: (msg, ctx) => console.info(`[HIVE AUTH] ${msg}`, ctx),
    error: (msg, ctx) => console.error(`[HIVE AUTH] ${msg}`, ctx),
    warn: (msg, ctx) => console.warn(`[HIVE AUTH] ${msg}`, ctx),
};
// Create Context
const FirebaseAuthContext = createContext(null);
export function FirebaseAuthProvider({ children }) {
    // Pure Firebase State
    const [authState, setAuthState] = useState({
        user: null,
        firebaseUser: null,
        isLoading: true,
        isAuthenticated: false,
        error: null,
    });
    // Update auth state helper
    const updateAuthState = useCallback((updates) => {
        setAuthState(prev => ({ ...prev, ...updates }));
    }, []);
    // Get Firebase ID Token
    const getAuthToken = useCallback(async () => {
        if (!authState.firebaseUser) {
            return null;
        }
        try {
            const token = await getIdToken(authState.firebaseUser);
            return token;
        }
        catch (error) {
            logger.error('Failed to get ID token', { error });
            return null;
        }
    }, [authState.firebaseUser]);
    // Load HIVE user profile from Firestore
    const loadHiveUserProfile = useCallback(async (firebaseUser) => {
        try {
            const token = await getIdToken(firebaseUser);
            const response = await fetch('/api/auth/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                if (response.status === 404) {
                    // User exists in Firebase but not in Firestore - needs onboarding
                    return {
                        id: firebaseUser.uid,
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        emailVerified: firebaseUser.emailVerified,
                        onboardingCompleted: false,
                    };
                }
                throw new Error(`Failed to load profile: ${response.status}`);
            }
            const profileData = await response.json();
            return {
                id: firebaseUser.uid,
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                emailVerified: firebaseUser.emailVerified,
                ...profileData,
            };
        }
        catch (error) {
            logger.error('Failed to load HIVE profile', { error, uid: firebaseUser.uid });
            return null;
        }
    }, []);
    // Refresh user data
    const refreshUserData = useCallback(async () => {
        if (!authState.firebaseUser) {
            return;
        }
        updateAuthState({ isLoading: true, error: null });
        try {
            const hiveUser = await loadHiveUserProfile(authState.firebaseUser);
            if (hiveUser) {
                updateAuthState({
                    user: hiveUser,
                    isAuthenticated: true,
                    isLoading: false,
                });
            }
            else {
                throw new Error('Failed to load user profile');
            }
        }
        catch (error) {
            logger.error('Refresh user data failed', { error });
            updateAuthState({
                error: 'Failed to refresh user data',
                isLoading: false,
            });
        }
    }, [authState.firebaseUser, loadHiveUserProfile, updateAuthState]);
    // Sign in with Firebase Custom Token (from magic link)
    const signInWithMagicLink = useCallback(async (customToken) => {
        try {
            updateAuthState({ isLoading: true, error: null });
            // Sign in with Firebase
            const userCredential = await signInWithCustomToken(auth, customToken);
            // Firebase auth state change will trigger profile loading
            logger.info('Magic link sign-in successful', { uid: userCredential.user.uid });
        }
        catch (error) {
            logger.error('Magic link sign-in failed', { error });
            updateAuthState({
                error: error instanceof Error ? error.message : 'Sign-in failed',
                isLoading: false,
            });
            throw error;
        }
    }, [updateAuthState]);
    // Sign out
    const signOut = useCallback(async () => {
        try {
            await firebaseSignOut(auth);
            // Auth state change will clear user data
        }
        catch (error) {
            logger.error('Sign out failed', { error });
        }
    }, []);
    // Complete onboarding
    const completeOnboarding = useCallback(async (onboardingData) => {
        if (!authState.user || !authState.firebaseUser) {
            throw new Error('No authenticated user for onboarding');
        }
        try {
            const token = await getAuthToken();
            if (!token) {
                throw new Error('No auth token available');
            }
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
            // Refresh user data to get updated profile
            await refreshUserData();
            return {
                success: true,
                user: authState.user,
                builderRequestsCreated: result.builderRequestsCreated || 0,
            };
        }
        catch (error) {
            logger.error('Onboarding completion failed', { error });
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }, [authState.user, authState.firebaseUser, getAuthToken, refreshUserData]);
    // Check if onboarding required
    const requiresOnboarding = useCallback(() => {
        return authState.user ? !authState.user.onboardingCompleted : false;
    }, [authState.user]);
    // Firebase Auth State Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // User signed in
                updateAuthState({
                    firebaseUser,
                    isLoading: true,
                    error: null,
                });
                try {
                    const hiveUser = await loadHiveUserProfile(firebaseUser);
                    if (hiveUser) {
                        updateAuthState({
                            user: hiveUser,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                    }
                    else {
                        throw new Error('Failed to load user profile');
                    }
                }
                catch (error) {
                    logger.error('Auth state change failed', { error });
                    updateAuthState({
                        error: 'Authentication failed',
                        isLoading: false,
                    });
                }
            }
            else {
                // User signed out
                updateAuthState({
                    user: null,
                    firebaseUser: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null,
                });
            }
        });
        return unsubscribe;
    }, [loadHiveUserProfile, updateAuthState]);
    const contextValue = {
        ...authState,
        signInWithMagicLink,
        signOut,
        refreshUserData,
        getAuthToken,
        completeOnboarding,
        requiresOnboarding,
    };
    return (_jsx(FirebaseAuthContext.Provider, { value: contextValue, children: children }));
}
// Hook to use Firebase Auth
export function useFirebaseAuth() {
    const context = useContext(FirebaseAuthContext);
    if (!context) {
        throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
    }
    return context;
}
// Compatibility alias
export const useUnifiedAuth = useFirebaseAuth;
//# sourceMappingURL=pure-firebase-auth.js.map