// Bounded Context Owner: Identity & Access Management Guild
"use client";

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
import type { ProfileState } from "../state/profile.state";
import {
  createInitialProfileState,
  profileReducer
} from "../state/profile.state";
import {
  createInMemoryProfileClient,
  profileClient,
  type ProfileClient
} from "../services/profileClient";
import { useAuth } from "@auth";
import type {
  ProfileActivityState,
  ProfileConnectionState,
  ProfilePrivacyUpdatePayload,
  ProfileRecommendationsState,
  ProfileSnapshot,
  ProfileUpdatePayload
} from "../../../profile/profile.contract";

const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

export interface ProfileContextActions {
  readonly loadProfile: () => Promise<void>;
  readonly refreshProfile: () => Promise<void>;
  readonly updateProfile: (payload: ProfileUpdatePayload) => Promise<void>;
  readonly updatePrivacy: (payload: ProfilePrivacyUpdatePayload) => Promise<void>;
  readonly connectToProfile: (targetProfileId: string) => Promise<void>;
  readonly disconnectFromProfile: (targetProfileId: string) => Promise<void>;
  readonly refreshConnections: () => Promise<void>;
}

export interface ProfileContextValue {
  readonly state: ProfileState;
  readonly profile: ProfileSnapshot | null;
  readonly connections: ProfileConnectionState | null;
  readonly activity: ProfileActivityState | null;
  readonly recommendations: ProfileRecommendationsState | null;
  readonly actions: ProfileContextActions;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export interface ProfileProviderProps extends PropsWithChildren {
  readonly profileId?: string;
  readonly client?: ProfileClient;
  readonly autoLoad?: boolean;
}

export const ProfileProvider = ({
  children,
  profileId,
  client = profileClient,
  autoLoad = true
}: ProfileProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(profileReducer, undefined, createInitialProfileState);
  const { state: authState } = useAuth();
  const resolvedClient = client ?? createInMemoryProfileClient();

  const resolvedProfileId =
    profileId ??
    authState.profileId ??
    authState.session?.profileId ??
    null;

  const loadProfile = useCallback(async () => {
    if (!resolvedProfileId) {
      return;
    }

    dispatch({ type: "LOAD_REQUEST" });
    try {
      const bundle = await resolvedClient.getProfile(resolvedProfileId);
      dispatch({
        type: "LOAD_SUCCESS",
        payload: { bundle }
      });
    } catch (error) {
      dispatch({
        type: "LOAD_FAILURE",
        error: getErrorMessage(error, "Failed to load profile")
      });
    }
  }, [resolvedProfileId, resolvedClient]);

  const refreshProfile = useCallback(async () => {
    await loadProfile();
  }, [loadProfile]);

  const updateProfile = useCallback(
    async (payload: ProfileUpdatePayload) => {
      if (!resolvedProfileId) {
        dispatch({
          type: "UPDATE_FAILURE",
          error: "Profile ID is not available yet"
        });
        return;
      }

      dispatch({ type: "UPDATE_REQUEST" });
      try {
        const snapshot = await resolvedClient.updateProfile(resolvedProfileId, payload);
        dispatch({
          type: "UPDATE_SUCCESS",
          payload: { snapshot }
        });
      } catch (error) {
        dispatch({
          type: "UPDATE_FAILURE",
          error: getErrorMessage(error, "Failed to update profile")
        });
      }
    },
    [resolvedProfileId, resolvedClient]
  );

  const updatePrivacy = useCallback(
    async (payload: ProfilePrivacyUpdatePayload) => {
      if (!resolvedProfileId) {
        dispatch({
          type: "UPDATE_FAILURE",
          error: "Profile ID is not available yet"
        });
        return;
      }
      try {
        const privacy = await resolvedClient.updatePrivacy(resolvedProfileId, payload);
        dispatch({
          type: "UPDATE_PRIVACY_SUCCESS",
          payload: { privacy }
        });
      } catch (error) {
        dispatch({
          type: "UPDATE_FAILURE",
          error: getErrorMessage(error, "Failed to update privacy settings")
        });
      }
    },
    [resolvedProfileId, resolvedClient]
  );

  const connectToProfile = useCallback(
    async (targetProfileId: string) => {
      if (!resolvedProfileId) {
        dispatch({
          type: "UPDATE_FAILURE",
          error: "Profile ID is not available yet"
        });
        return;
      }
      try {
        const connection = await resolvedClient.connect(resolvedProfileId, targetProfileId);
        dispatch({
          type: "CONNECTION_ADDED",
          payload: { connection }
        });
      } catch (error) {
        dispatch({
          type: "UPDATE_FAILURE",
          error: getErrorMessage(error, "Failed to connect with profile")
        });
      }
    },
    [resolvedProfileId, resolvedClient]
  );

  const disconnectFromProfile = useCallback(
    async (targetProfileId: string) => {
      if (!resolvedProfileId) {
        dispatch({
          type: "UPDATE_FAILURE",
          error: "Profile ID is not available yet"
        });
        return;
      }
      try {
        await resolvedClient.disconnect(resolvedProfileId, targetProfileId);
        dispatch({
          type: "CONNECTION_REMOVED",
          payload: { profileId: targetProfileId }
        });
      } catch (error) {
        dispatch({
          type: "UPDATE_FAILURE",
          error: getErrorMessage(error, "Failed to remove connection")
        });
      }
    },
    [resolvedProfileId, resolvedClient]
  );

  const refreshConnections = useCallback(async () => {
    if (!resolvedProfileId) {
      dispatch({
        type: "UPDATE_FAILURE",
        error: "Profile ID is not available yet"
      });
      return;
    }
    try {
      const connections = await resolvedClient.refreshConnections(resolvedProfileId);
      dispatch({
        type: "CONNECTIONS_REFRESHED",
        payload: { connections }
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_FAILURE",
        error: getErrorMessage(error, "Failed to refresh connections")
      });
    }
  }, [resolvedProfileId, resolvedClient]);

  useEffect(() => {
    if (!autoLoad || !resolvedProfileId) {
      return;
    }
    void loadProfile();
  }, [autoLoad, loadProfile, resolvedProfileId]);

  const value = useMemo<ProfileContextValue>(
    () => ({
      state,
      profile: state.profile,
      connections: state.connections,
      activity: state.activity,
      recommendations: state.recommendations,
      actions: {
        loadProfile,
        refreshProfile,
        updateProfile,
        updatePrivacy,
        connectToProfile,
        disconnectFromProfile,
        refreshConnections
      }
    }),
    [state, loadProfile, refreshProfile, updateProfile, updatePrivacy, connectToProfile, disconnectFromProfile, refreshConnections]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfileContext = (): ProfileContextValue => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};
