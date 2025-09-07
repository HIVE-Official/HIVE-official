"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthOperations = useAuthOperations;
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const auth_store_1 = require("../stores/auth-store");
const ui_store_1 = require("../stores/ui-store");
/**
 * Hook that provides auth operations connected to the store
 */
function useAuthOperations(auth, db) {
    const { setLoading, setError } = (0, auth_store_1.useAuthStore)();
    const { addToast } = (0, ui_store_1.useUIStore)();
    const login = async (email) => {
        try {
            setLoading(true);
            setError(null);
            const actionCodeSettings = {
                url: `${window.location.origin}/auth/verify?email=${encodeURIComponent(email)}`,
                handleCodeInApp: true,
            };
            await (0, auth_1.sendSignInLinkToEmail)(auth, email, actionCodeSettings);
            // Store email for later verification
            window.localStorage.setItem('emailForSignIn', email);
            addToast({
                title: 'Check your email!',
                description: `We've sent a magic link to ${email}`,
                type: 'success',
            });
        }
        catch (error) {
            console.error('Login error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            setError(errorMessage);
            addToast({
                title: 'Login failed',
                description: errorMessage,
                type: 'error',
            });
            throw error;
        }
        finally {
            setLoading(false);
        }
    };
    const verifyMagicLink = async (email, link) => {
        try {
            setLoading(true);
            setError(null);
            const emailLink = link || window.location.href;
            if (!(0, auth_1.isSignInWithEmailLink)(auth, emailLink)) {
                throw new Error('Invalid magic link');
            }
            await (0, auth_1.signInWithEmailLink)(auth, email, emailLink);
            // Clear stored email
            window.localStorage.removeItem('emailForSignIn');
            // User is now signed in via Firebase Auth state listener
            addToast({
                title: 'Welcome back!',
                description: 'You have been successfully signed in.',
                type: 'success',
            });
            return true;
        }
        catch (error) {
            console.error('Verification error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Verification failed';
            setError(errorMessage);
            addToast({
                title: 'Verification failed',
                description: errorMessage,
                type: 'error',
            });
            return false;
        }
        finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        try {
            setLoading(true);
            await (0, auth_1.signOut)(auth);
            // Store will be updated by auth state listener
            addToast({
                title: 'Signed out',
                description: 'You have been successfully signed out.',
                type: 'info',
            });
        }
        catch (error) {
            console.error('Logout error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Logout failed';
            setError(errorMessage);
            addToast({
                title: 'Logout failed',
                description: errorMessage,
                type: 'error',
            });
        }
        finally {
            setLoading(false);
        }
    };
    const updateProfile = async (updates) => {
        try {
            const user = auth_store_1.useAuthStore.getState().user;
            if (!user)
                throw new Error('No user logged in');
            setLoading(true);
            // Update Firestore
            await (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, 'users', user.uid), {
                ...updates,
                updatedAt: new Date(),
            });
            // Local store will be updated by real-time listener
            addToast({
                title: 'Profile updated',
                description: 'Your changes have been saved.',
                type: 'success',
            });
        }
        catch (error) {
            console.error('Profile update error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Update failed';
            setError(errorMessage);
            addToast({
                title: 'Update failed',
                description: errorMessage,
                type: 'error',
            });
            throw error;
        }
        finally {
            setLoading(false);
        }
    };
    const completeOnboarding = async (profileData) => {
        try {
            const user = auth_store_1.useAuthStore.getState().user;
            if (!user)
                throw new Error('No user logged in');
            setLoading(true);
            // Create or update user profile
            await (0, firestore_1.setDoc)((0, firestore_1.doc)(db, 'users', user.uid), {
                ...profileData,
                id: user.uid,
                email: user.email,
                onboardingCompleted: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }, { merge: true });
            addToast({
                title: 'Welcome to HIVE!',
                description: 'Your profile has been created.',
                type: 'success',
            });
        }
        catch (error) {
            console.error('Onboarding error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Onboarding failed';
            setError(errorMessage);
            addToast({
                title: 'Onboarding failed',
                description: errorMessage,
                type: 'error',
            });
            throw error;
        }
        finally {
            setLoading(false);
        }
    };
    return {
        login,
        verifyMagicLink,
        logout,
        updateProfile,
        completeOnboarding,
    };
}
//# sourceMappingURL=use-auth-operations.js.map