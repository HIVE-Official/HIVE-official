import { 
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { 
  signInWithEmailAndPassword,
  signInWithCustomToken,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  type User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { logger } from '@hive/core';

// Type definitions - these should be moved to a shared types package later
interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  school: string | null;
  graduationYear: number | null;
  major: string | null;
  interests: string[];
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Firebase instances - these should be imported from the app, not the package
// Using any here since Firebase types are complex and will be provided by the app
declare const auth: any; // eslint-disable-line @typescript-eslint/no-explicit-any
declare const db: any; // eslint-disable-line @typescript-eslint/no-explicit-any

// Magic link authentication
export function useSendMagicLink() {
  return useMutation({
    mutationFn: async ({ 
      email, 
      schoolId,
      redirectUrl 
    }: { 
      email: string; 
      schoolId?: string;
      redirectUrl?: string;
    }) => {
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
    onError: (error: Error) => {
      logger.error('Failed to send magic link', { error });
    }
  });
}

export function useVerifyMagicLink() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
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
      const userCredential = await signInWithCustomToken(auth, customToken);
      
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
      logger.info('Magic link verified successfully', { userId: user.id });
    },
    onError: (error: Error) => {
      logger.error('Failed to verify magic link', { error });
    }
  });
}

// Email/password authentication
export function useSignUp() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      email, 
      password, 
      displayName 
    }: { 
      email: string; 
      password: string; 
      displayName: string;
    }) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(userCredential.user, { displayName });
      
      // Create user profile
      const profile: UserProfile = {
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
      
      await setDoc(doc(db, 'users', userCredential.user.uid), profile);
      
      return profile;
    },
    onSuccess: (user: UserProfile) => {
      queryClient.setQueryData(['auth', 'user'], user);
      logger.info('User signed up successfully', { userId: user.id });
    },
    onError: (error: Error) => {
      logger.error('Failed to sign up', { error });
    }
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      email, 
      password 
    }: { 
      email: string; 
      password: string;
    }) => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Fetch user profile
      const profile = await fetchOrCreateProfile(userCredential.user);
      
      return profile;
    },
    onSuccess: (user: UserProfile) => {
      queryClient.setQueryData(['auth', 'user'], user);
      logger.info('User signed in successfully', { userId: user.id });
    },
    onError: (error: Error) => {
      logger.error('Failed to sign in', { error });
    }
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      await firebaseSignOut(auth);
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      logger.info('User signed out successfully');
    },
    onError: (error: Error) => {
      logger.error('Failed to sign out', { error });
    }
  });
}

// Password reset
export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      await sendPasswordResetEmail(auth, email);
    },
    onSuccess: () => {
      logger.info('Password reset email sent');
    },
    onError: (error: Error) => {
      logger.error('Failed to send password reset email', { error });
    }
  });
}

// Profile management
export function useUpdateAuthProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: Partial<UserProfile>) => {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');
      
      // Update Firestore profile
      await updateDoc(doc(db, 'users', user.uid), {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      // Update Firebase Auth profile if needed
      if (updates.displayName || updates.photoURL) {
        await updateProfile(user, {
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
      const previousUser = queryClient.getQueryData<UserProfile>(['auth', 'user']);
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
      logger.error('Failed to update profile', { error });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
    }
  });
}

// Complete onboarding
export function useCompleteOnboarding() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (onboardingData: {
      school: string;
      graduationYear: number;
      major: string;
      interests: string[];
    }) => {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');
      
      // Update profile with onboarding data
      await updateDoc(doc(db, 'users', user.uid), {
        ...onboardingData,
        onboardingCompleted: true,
        updatedAt: serverTimestamp()
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
    onSuccess: (data: UserProfile) => {
      // Update user in cache
      queryClient.setQueryData(['auth', 'user'], (old: UserProfile | undefined) => ({
        ...old,
        ...data,
        onboardingCompleted: true
      }));
      
      logger.info('Onboarding completed successfully');
    },
    onError: (error: Error) => {
      logger.error('Failed to complete onboarding', { error });
    }
  });
}

// Session validation
export function useValidateSession() {
  return useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      const user = auth.currentUser;
      if (!user) return null;
      
      // Validate token hasn't expired
      const tokenResult = await user.getIdTokenResult();
      const isExpired = new Date(tokenResult.expirationTime).getTime() < Date.now();
      
      if (isExpired) {
        await firebaseSignOut(auth);
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
async function fetchOrCreateProfile(firebaseUser: FirebaseUser): Promise<UserProfile> {
  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
  
  if (userDoc.exists()) {
    return {
      id: userDoc.id,
      ...userDoc.data()
    } as UserProfile;
  }
  
  // Create new profile if doesn't exist
  const newProfile: UserProfile = {
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
  
  await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
  
  return newProfile;
}

// Delete account
export function useDeleteAccount() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');
      
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
      logger.info('Account deleted successfully');
    },
    onError: (error: Error) => {
      logger.error('Failed to delete account', { error });
    }
  });
}