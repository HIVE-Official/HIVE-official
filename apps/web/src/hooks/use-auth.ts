import { useState, useEffect, createContext, useContext } from 'react';

export interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, displayName?: string) => Promise<void>;
  getAuthToken: () => Promise<string | null>;
}

// Development mode user for testing
const DEV_USER: User = {
  uid: 'test-user-id',
  email: 'test@example.com',
  displayName: 'Test User',
  emailVerified: true,
};

// Create auth context
export const AuthContext = createContext<AuthContextType | null>(null);

// Auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider hook for use in AuthProvider component
export const useAuthProvider = (): AuthContextType => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          // In development, use mock user
          setAuthState({
            user: DEV_USER,
            loading: false,
            error: null,
          });
          return;
        }

        // In production, check for existing session
        const token = localStorage.getItem('auth_token');
        if (token) {
          try {
            // Verify token with backend
            const response = await fetch('/api/auth/verify', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const userData = await response.json();
              setAuthState({
                user: userData.user,
                loading: false,
                error: null,
              });
            } else {
              // Token invalid, clear it
              localStorage.removeItem('auth_token');
              setAuthState({
                user: null,
                loading: false,
                error: null,
              });
            }
          } catch (error) {
            console.error('Token verification failed:', error);
            localStorage.removeItem('auth_token');
            setAuthState({
              user: null,
              loading: false,
              error: null,
            });
          }
        } else {
          setAuthState({
            user: null,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          loading: false,
          error: 'Failed to initialize authentication',
        });
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      if (process.env.NODE_ENV === 'development') {
        // Mock sign in for development
        setTimeout(() => {
          setAuthState({
            user: { ...DEV_USER, email },
            loading: false,
            error: null,
          });
        }, 1000);
        return;
      }

      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Sign in failed');
      }

      const { user, token } = await response.json();
      localStorage.setItem('auth_token', token);

      setAuthState({
        user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Sign in failed',
      }));
      throw error;
    }
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true }));

    try {
      if (process.env.NODE_ENV === 'development') {
        // Mock sign out for development
        setTimeout(() => {
          setAuthState({
            user: null,
            loading: false,
            error: null,
          });
        }, 500);
        return;
      }

      await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      localStorage.removeItem('auth_token');
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if the API call fails, clear local state
      localStorage.removeItem('auth_token');
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      if (process.env.NODE_ENV === 'development') {
        // Mock sign up for development
        setTimeout(() => {
          setAuthState({
            user: { ...DEV_USER, email, displayName },
            loading: false,
            error: null,
          });
        }, 1000);
        return;
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, displayName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Sign up failed');
      }

      const { user, token } = await response.json();
      localStorage.setItem('auth_token', token);

      setAuthState({
        user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Sign up failed',
      }));
      throw error;
    }
  };

  const getAuthToken = async (): Promise<string | null> => {
    if (process.env.NODE_ENV === 'development') {
      return 'test-token';
    }

    return localStorage.getItem('auth_token');
  };

  return {
    ...authState,
    signIn,
    signOut,
    signUp,
    getAuthToken,
  };
};