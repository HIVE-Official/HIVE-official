import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from 'firebase/auth';

interface Profile {
  id: string;
  email: string;
  handle: string;
  displayName: string;
  photoURL?: string;
  schoolId: string;
  graduationYear: number;
  major?: string;
  interests: string[];
  isBuilder: boolean;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthState {
  // State
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  logout: () => void;
  reset: () => void;
}

const initialState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setUser: (user) =>
          set(
            (_state) => ({
              user,
              isAuthenticated: !!user,
              isLoading: false,
              error: null,
            }),
            false,
            'setUser'
          ),

        setProfile: (profile) =>
          set(
            { profile },
            false,
            'setProfile'
          ),

        setLoading: (isLoading) =>
          set({ isLoading }, false, 'setLoading'),

        setError: (error) =>
          set({ error, isLoading: false }, false, 'setError'),

        updateProfile: (updates) =>
          set(
            (state) => ({
              profile: state.profile
                ? { ...state.profile, ...updates, updatedAt: new Date() }
                : null,
            }),
            false,
            'updateProfile'
          ),

        logout: () =>
          set(
            {
              user: null,
              profile: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            },
            false,
            'logout'
          ),

        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'hive-auth',
        partialize: (state) => ({
          // Only persist non-sensitive data
          profile: state.profile,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'AuthStore',
    }
  )
);

// Selectors for common use cases
export const useUser = () => useAuthStore((state) => state.user);
export const useProfile = () => useAuthStore((state) => state.profile);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);