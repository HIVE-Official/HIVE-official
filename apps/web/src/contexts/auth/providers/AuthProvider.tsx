// Bounded Context Owner: Identity & Access Management Guild
import { type SignUpMode, type UserType } from "@core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren
} from "react";
import type { JSX } from "react";
import { authClient } from "../services/authClient";
import { sendMagicLinkViaFirebase } from "../../../lib/firebase.client";

export type AuthStatus =
  | "idle"
  | "loading"
  | "magicLinkSent"
  | "awaitingVerification"
  | "onboarding"
  | "authenticated"
  | "error";

export interface AuthState {
  readonly status: AuthStatus;
  readonly email?: string;
  readonly profileId?: string;
  readonly userType?: UserType;
  readonly session?: SessionSummary;
  readonly lastMagicLink?: {
    readonly messageId: string;
    readonly expiresAt: string;
    readonly mode: SignUpMode;
  };
  readonly error?: string;
}

export interface SessionSummary {
  readonly sessionId: string;
  readonly profileId: string;
  readonly issuedAt: string;
  readonly expiresAt: string;
  readonly scopes?: readonly string[];
}

const normalizeUserType = (value: string | undefined): UserType => {
  switch (value) {
    case "student":
    case "alumni":
    case "faculty":
      return value;
    default:
      return "student";
  }
};

const AUTH_MODE = process.env.NEXT_PUBLIC_AUTH_MODE ?? "server";
const IS_MOCK_AUTH_MODE = AUTH_MODE === "mock";
const MOCK_PROFILE_ID = process.env.NEXT_PUBLIC_AUTH_PROFILE_ID ?? "profile-jwrhineh";
const MOCK_SESSION_ID = process.env.NEXT_PUBLIC_AUTH_SESSION_ID ?? "dev-session";
const MOCK_USER_TYPE: UserType = normalizeUserType(process.env.NEXT_PUBLIC_AUTH_USER_TYPE);
const MOCK_SCOPES = (process.env.NEXT_PUBLIC_AUTH_SCOPES ?? "")
  .split(",")
  .map((scope) => scope.trim())
  .filter((scope) => scope.length > 0);

const createMockSession = (): SessionSummary => {
  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + 1000 * 60 * 60 * 12);
  return {
    sessionId: MOCK_SESSION_ID,
    profileId: MOCK_PROFILE_ID,
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    scopes: MOCK_SCOPES.length > 0 ? MOCK_SCOPES : undefined
  };
};

type Action =
  | { type: "SET_STATUS"; readonly status: AuthStatus }
  | { type: "SET_ERROR"; readonly error: string }
  | {
      type: "MAGIC_LINK_SENT";
      readonly email: string;
      readonly profileId: string;
      readonly userType: UserType;
      readonly payload: {
        readonly messageId: string;
        readonly expiresAt: string;
        readonly mode: SignUpMode;
      };
    }
  | {
      type: "SET_ONBOARDING";
      readonly profileId: string;
      readonly userType: UserType;
    }
  | {
      type: "SET_SESSION";
      readonly session: SessionSummary;
      readonly nextStatus: AuthStatus;
      readonly userType?: UserType | null;
    }
  | { type: "SIGN_OUT" };

const initialState: AuthState = {
  status: "idle"
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
        error: action.status === "error" ? state.error : undefined
      };
    case "SET_ERROR":
      return {
        ...state,
        status: "error",
        error: action.error
      };
    case "MAGIC_LINK_SENT":
      return {
        ...state,
        status: "awaitingVerification",
        email: action.email,
        profileId: action.profileId,
        userType: action.userType,
        lastMagicLink: action.payload,
        error: undefined
      };
    case "SET_ONBOARDING":
      return {
        ...state,
        status: "onboarding",
        profileId: action.profileId,
        error: undefined
      };
    case "SET_SESSION":
      return {
        ...state,
        status: action.nextStatus,
        session: action.session,
        profileId: action.session.profileId,
        userType: action.userType ?? state.userType,
        error: undefined
      };
    case "SIGN_OUT":
      return initialState;
    default:
      return state;
  }
};

interface AuthContextValue {
  readonly state: AuthState;
  readonly actions: {
    readonly requestMagicLink: (payload: {
      readonly email: string;
      readonly userType: UserType;
    }) => Promise<void>;
    readonly completeOnboarding: (session: SessionSummary) => Promise<void>;
    readonly restoreSession: () => Promise<void>;
    readonly signOut: () => void;
  };
}

const AuthContext = createContext<AuthContextValue | null>(null);

const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

export const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const requestMagicLink = useCallback(
    async ({ email, userType }: { email: string; userType: UserType }) => {
      dispatch({ type: "SET_STATUS", status: "loading" });
      if (IS_MOCK_AUTH_MODE) {
        dispatch({
          type: "SET_SESSION",
          session: createMockSession(),
          nextStatus: "authenticated",
          userType
        });
        return;
      }
      try {
        const response = await authClient.requestMagicLink({ email, userType });
        // Trigger Firebase to deliver the email using configured templates.
        try {
          await sendMagicLinkViaFirebase({ email, messageId: response.messageId });
        } catch (e) {
          // Non-fatal: we still surface awaiting state; resend will retry
          // eslint-disable-next-line no-console
          console.warn("firebase.sendSignInLinkToEmail.failed", e);
        }
        dispatch({
          type: "MAGIC_LINK_SENT",
          email,
          profileId: response.profileId,
          userType,
          payload: {
            messageId: response.messageId,
            expiresAt: response.magicLinkExpiresAt,
            mode: response.mode
          }
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          error: getErrorMessage(error, "Failed to request magic link")
        });
      }
    },
    []
  );

  const completeOnboarding = useCallback((session: SessionSummary) => {
    dispatch({ type: "SET_SESSION", session, nextStatus: "authenticated" });
    return Promise.resolve();
  }, []);

  const restoreSession = useCallback(async () => {
    if (IS_MOCK_AUTH_MODE) {
      dispatch({
        type: "SET_SESSION",
        session: createMockSession(),
        nextStatus: "authenticated",
        userType: MOCK_USER_TYPE
      });
      return;
    }

    dispatch({ type: "SET_STATUS", status: "loading" });
    try {
      const sessionResponse = await authClient.fetchSession();
      if (!sessionResponse) {
        dispatch({ type: "SET_STATUS", status: "idle" });
        return;
      }
      const session: SessionSummary = {
        sessionId: sessionResponse.session.sessionId,
        profileId: sessionResponse.session.profileId,
        issuedAt: sessionResponse.session.issuedAt,
        expiresAt: sessionResponse.session.expiresAt,
        scopes: sessionResponse.session.scopes
      };

      dispatch({
        type: "SET_SESSION",
        session,
        nextStatus: sessionResponse.onboardingComplete ? "authenticated" : "onboarding",
        userType: sessionResponse.userType
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        error: getErrorMessage(error, "Failed to restore session")
      });
    }
  }, []);

  const signOut = useCallback(() => {
    dispatch({ type: "SIGN_OUT" });
    void authClient.destroySession().catch(() => {
      // best-effort cleanup
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      state,
      actions: {
        requestMagicLink,
        completeOnboarding,
        restoreSession,
        signOut
      }
    }),
    [completeOnboarding, requestMagicLink, restoreSession, signOut, state]
  );

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
