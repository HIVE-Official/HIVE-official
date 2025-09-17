import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { AuthErrorCode, createAuthError, type AuthError } from '../errors';
import { 
  SessionStatus, 
  type Session, 
  type SessionStatusType,
  useSessionManager 
} from '../session';

interface AuthState {
  status: SessionStatusType;
  session: Session | null;
  error: AuthError | null;
}

const initialState: AuthState = {
  status: SessionStatus.LOADING,
  session: null,
  error: null
};

export const useAuth = () => {
  const router = useRouter();
  const [state, setState] = useState<AuthState>(initialState);
  const sessionManager = useSessionManager();

  // Handle user activity
  useEffect(() => {
    const handleActivity = () => {
      if (state.status === SessionStatus.AUTHENTICATED) {
        sessionManager.resetInactivityTimer();
      }
    };

    // Events to track for activity
    const events = [
      'mousedown',
      'keydown',
      'touchstart',
      'scroll'
    ];

    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [state.status, sessionManager]);

  // Handle session events
  useEffect(() => {
    const handleSessionExpired = (event: CustomEvent<AuthError>) => {
      setState(prev => ({
        ...prev,
        status: SessionStatus.UNAUTHENTICATED,
        error: event.detail
      }));
      
      // Redirect to auth page
      router.push('/auth/expired');
    };

    const handleSessionError = (event: CustomEvent<AuthError>) => {
      setState(prev => ({
        ...prev,
        status: SessionStatus.ERROR,
        error: event.detail
      }));
    };

    window.addEventListener('session:expired', handleSessionExpired as EventListener);
    window.addEventListener('session:error', handleSessionError as EventListener);

    return () => {
      window.removeEventListener('session:expired', handleSessionExpired as EventListener);
      window.removeEventListener('session:error', handleSessionError as EventListener);
    };
  }, [router]);

  // Initialize session
  const initSession = useCallback(async (sessionData: unknown) => {
    try {
      // Validate session data
      if (!sessionData) {
        throw createAuthError(AuthErrorCode.INVALID_SESSION);
      }

      // Initialize session management
      const session = await z.unknown()
        .transform(async (data) => {
          if (typeof data === 'object' && data !== null) {
            return data as Session;
          }
          throw createAuthError(AuthErrorCode.INVALID_SESSION);
        })
        .parseAsync(sessionData);

      // Validate session
      sessionManager.validateSession(session);
      
      // Initialize session monitoring
      sessionManager.initializeSession(session);

      setState({
        status: SessionStatus.AUTHENTICATED,
        session,
        error: null
      });

    } catch (error) {
      const authError = error instanceof Error 
        ? createAuthError(AuthErrorCode.INVALID_SESSION, { error: error.message })
        : createAuthError(AuthErrorCode.UNKNOWN_ERROR);

      setState({
        status: SessionStatus.ERROR,
        session: null,
        error: authError
      });
    }
  }, [sessionManager]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      // Clear session timers
      sessionManager.clearTimers();

      // Update state
      setState({
        status: SessionStatus.UNAUTHENTICATED,
        session: null,
        error: null
      });

      // Redirect to welcome page
      router.push('/welcome');

    } catch (error) {
      const authError = error instanceof Error
        ? createAuthError(AuthErrorCode.UNKNOWN_ERROR, { error: error.message })
        : createAuthError(AuthErrorCode.UNKNOWN_ERROR);

      setState(prev => ({
        ...prev,
        error: authError
      }));
    }
  }, [router, sessionManager]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  return {
    // State
    status: state.status,
    session: state.session,
    error: state.error,
    
    // Methods
    initSession,
    signOut,
    clearError,
    
    // Computed
    isAuthenticated: state.status === SessionStatus.AUTHENTICATED,
    isLoading: state.status === SessionStatus.LOADING,
    isError: state.status === SessionStatus.ERROR
  };
}; 