"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSendMagicLink = useSendMagicLink;
exports.useVerifyMagicLink = useVerifyMagicLink;
exports.useSignUp = useSignUp;
exports.useSignIn = useSignIn;
exports.useSignOut = useSignOut;
exports.useResetPassword = useResetPassword;
exports.useUpdateAuthProfile = useUpdateAuthProfile;
exports.useCompleteOnboarding = useCompleteOnboarding;
exports.useValidateSession = useValidateSession;
exports.useDeleteAccount = useDeleteAccount;
const react_query_1 = require("@tanstack/react-query");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const core_1 = require("@hive/core");
// Magic link authentication
function useSendMagicLink() {
    return (0, react_query_1.useMutation)({
        mutationFn: async ({ email, schoolId, redirectUrl }) => {
            // Call your API endpoint to send magic link
            const response = await fetch('/api/auth/send-magic-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, schoolId, redirectUrl })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to send magic link');
            }
            return response.json();
        },
        onError: (error) => {
            core_1.logger.error('Failed to send magic link', { error });
        }
    });
}
function useVerifyMagicLink() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async ({ token }) => {
            // Call your API endpoint to verify magic link
            const response = await fetch('/api/auth/verify-magic-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Invalid or expired link');
            }
            const { customToken, user } = await response.json();
            // Sign in with custom token
            const userCredential = await (0, auth_1.signInWithCustomToken)(auth, customToken);
            // Fetch or create user profile
            const profile = await fetchOrCreateProfile(userCredential.user);
            return {
                user: {
                    ...user,
                    ...profile
                }
            };
        },
        onSuccess: ({ user }) => {
            // Update auth state in cache
            queryClient.setQueryData(['auth', 'user'], user);
            core_1.logger.info('Magic link verified successfully', { userId: user.id });
        },
        onError: (error) => {
            core_1.logger.error('Failed to verify magic link', { error });
        }
    });
}
// Email/password authentication
function useSignUp() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async ({ email, password, displayName }) => {
            const userCredential = await (0, auth_1.createUserWithEmailAndPassword)(auth, email, password);
            // Update display name
            await (0, auth_1.updateProfile)(userCredential.user, { displayName });
            // Create user profile
            const profile = {
                id: userCredential.user.uid,
                email,
                displayName,
                photoURL: null,
                school: null,
                graduationYear: null,
                major: null,
                interests: [],
                onboardingCompleted: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            await (0, firestore_1.setDoc)((0, firestore_1.doc)(db, 'users', userCredential.user.uid), profile);
            return profile;
        },
        onSuccess: (user) => {
            queryClient.setQueryData(['auth', 'user'], user);
            core_1.logger.info('User signed up successfully', { userId: user.id });
        },
        onError: (error) => {
            core_1.logger.error('Failed to sign up', { error });
        }
    });
}
function useSignIn() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async ({ email, password }) => {
            const userCredential = await (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
            // Fetch user profile
            const profile = await fetchOrCreateProfile(userCredential.user);
            return profile;
        },
        onSuccess: (user) => {
            queryClient.setQueryData(['auth', 'user'], user);
            core_1.logger.info('User signed in successfully', { userId: user.id });
        },
        onError: (error) => {
            core_1.logger.error('Failed to sign in', { error });
        }
    });
}
function useSignOut() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async () => {
            await (0, auth_1.signOut)(auth);
        },
        onSuccess: () => {
            // Clear all cached data
            queryClient.clear();
            core_1.logger.info('User signed out successfully');
        },
        onError: (error) => {
            core_1.logger.error('Failed to sign out', { error });
        }
    });
}
// Password reset
function useResetPassword() {
    return (0, react_query_1.useMutation)({
        mutationFn: async ({ email }) => {
            await (0, auth_1.sendPasswordResetEmail)(auth, email);
        },
        onSuccess: () => {
            core_1.logger.info('Password reset email sent');
        },
        onError: (error) => {
            core_1.logger.error('Failed to send password reset email', { error });
        }
    });
}
// Profile management
function useUpdateAuthProfile() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (updates) => {
            const user = auth.currentUser;
            if (!user)
                throw new Error('No authenticated user');
            // Update Firestore profile
            await (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, 'users', user.uid), {
                ...updates,
                updatedAt: (0, firestore_1.serverTimestamp)()
            });
            // Update Firebase Auth profile if needed
            if (updates.displayName || updates.photoURL) {
                await (0, auth_1.updateProfile)(user, {
                    displayName: updates.displayName,
                    photoURL: updates.photoURL
                });
            }
            return updates;
        },
        onMutate: async (updates) => {
            // Cancel queries
            await queryClient.cancelQueries({ queryKey: ['auth', 'user'] });
            // Optimistic update
            const previousUser = queryClient.getQueryData(['auth', 'user']);
            if (previousUser) {
                queryClient.setQueryData(['auth', 'user'], {
                    ...previousUser,
                    ...updates
                });
            }
            return { previousUser };
        },
        onError: (error, variables, context) => {
            // Rollback on error
            if (context?.previousUser) {
                queryClient.setQueryData(['auth', 'user'], context.previousUser);
            }
            core_1.logger.error('Failed to update profile', { error });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
        }
    });
}
// Complete onboarding
function useCompleteOnboarding() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (onboardingData) => {
            const user = auth.currentUser;
            if (!user)
                throw new Error('No authenticated user');
            // Update profile with onboarding data
            await (0, firestore_1.updateDoc)((0, firestore_1.doc)(db, 'users', user.uid), {
                ...onboardingData,
                onboardingCompleted: true,
                updatedAt: (0, firestore_1.serverTimestamp)()
            });
            // Call API to complete onboarding (creates spaces, etc.)
            const response = await fetch('/api/auth/complete-onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(onboardingData)
            });
            if (!response.ok) {
                throw new Error('Failed to complete onboarding');
            }
            return response.json();
        },
        onSuccess: (data) => {
            // Update user in cache
            queryClient.setQueryData(['auth', 'user'], (old) => ({
                ...old,
                ...data,
                onboardingCompleted: true
            }));
            core_1.logger.info('Onboarding completed successfully');
        },
        onError: (error) => {
            core_1.logger.error('Failed to complete onboarding', { error });
        }
    });
}
// Session validation
function useValidateSession() {
    return (0, react_query_1.useQuery)({
        queryKey: ['auth', 'session'],
        queryFn: async () => {
            const user = auth.currentUser;
            if (!user)
                return null;
            // Validate token hasn't expired
            const tokenResult = await user.getIdTokenResult();
            const isExpired = new Date(tokenResult.expirationTime).getTime() < Date.now();
            if (isExpired) {
                await (0, auth_1.signOut)(auth);
                return null;
            }
            return {
                user,
                token: tokenResult.token,
                expiresAt: tokenResult.expirationTime
            };
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false
    });
}
// Helper function to fetch or create user profile
async function fetchOrCreateProfile(firebaseUser) {
    const userDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(db, 'users', firebaseUser.uid));
    if (userDoc.exists()) {
        return {
            id: userDoc.id,
            ...userDoc.data()
        };
    }
    // Create new profile if doesn't exist
    const newProfile = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
        photoURL: firebaseUser.photoURL,
        school: null,
        graduationYear: null,
        major: null,
        interests: [],
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    await (0, firestore_1.setDoc)((0, firestore_1.doc)(db, 'users', firebaseUser.uid), newProfile);
    return newProfile;
}
// Delete account
function useDeleteAccount() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async () => {
            const user = auth.currentUser;
            if (!user)
                throw new Error('No authenticated user');
            // Call API to delete user data
            const response = await fetch('/api/auth/delete-account', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Failed to delete account');
            }
            // Delete Firebase Auth account
            await user.delete();
        },
        onSuccess: () => {
            queryClient.clear();
            core_1.logger.info('Account deleted successfully');
        },
        onError: (error) => {
            core_1.logger.error('Failed to delete account', { error });
        }
    });
}
//# sourceMappingURL=auth-queries.js.map