// Bounded Context Owner: Identity & Access Management Guild
import {
  CampusEmailFactory,
  ProfileAggregate,
  type ProfileProps,
  ProfileHandleFactory
} from "@core";
import type {
  ProfileActivityState,
  ProfileBundle,
  ProfileConnection,
  ProfileConnectionState,
  ProfilePrivacySettings,
  ProfileRecommendationsState,
  ProfileSnapshot
} from "../../../profile/profile.contract";

export interface ProfileState {
  readonly status: "idle" | "loading" | "ready" | "error";
  readonly updating: boolean;
  readonly profile: ProfileSnapshot | null;
  readonly connections: ProfileConnectionState | null;
  readonly activity: ProfileActivityState | null;
  readonly recommendations: ProfileRecommendationsState | null;
  readonly error?: string;
  readonly lastSyncedAt?: Date;
}

export const createInitialProfileState = (): ProfileState => ({
  status: "idle",
  updating: false,
  profile: null,
  connections: null,
  activity: null,
  recommendations: null
});

interface LoadSuccessPayload {
  readonly bundle: ProfileBundle;
}

export type ProfileAction =
  | { readonly type: "LOAD_REQUEST" }
  | { readonly type: "LOAD_SUCCESS"; readonly payload: LoadSuccessPayload }
  | { readonly type: "LOAD_FAILURE"; readonly error: string }
  | { readonly type: "UPDATE_REQUEST" }
  | { readonly type: "UPDATE_SUCCESS"; readonly payload: { readonly snapshot: ProfileSnapshot } }
  | { readonly type: "UPDATE_FAILURE"; readonly error: string }
  | { readonly type: "UPDATE_PRIVACY_SUCCESS"; readonly payload: { readonly privacy: ProfilePrivacySettings } }
  | { readonly type: "CONNECTIONS_REFRESHED"; readonly payload: { readonly connections: ProfileConnectionState } }
  | { readonly type: "CONNECTION_ADDED"; readonly payload: { readonly connection: ProfileConnection } }
  | { readonly type: "CONNECTION_REMOVED"; readonly payload: { readonly profileId: string } };

const toProfileProps = (snapshot: ProfileSnapshot): ProfileProps | null => {
  const emailResult = CampusEmailFactory.create(snapshot.identity.email);
  if (!emailResult.ok) {
    return null;
  }

  const handleResult = ProfileHandleFactory.create(snapshot.identity.handle);
  if (!handleResult.ok) {
    return null;
  }

  return {
    profileId: { value: snapshot.identity.id },
    email: emailResult.value,
    userType: snapshot.identity.userType,
    campusId: snapshot.identity.campusId,
    handle: handleResult.value,
    personalInfo: snapshot.identity.personalInfo,
    academicInfo: snapshot.identity.academicInfo,
    socialInfo: snapshot.identity.socialInfo,
    affiliation: snapshot.identity.affiliation,
    interests: [...snapshot.identity.interests],
    clubs: [...snapshot.identity.clubs],
    residentialSelection: snapshot.identity.residentialSelection,
    isOnboarded: snapshot.identity.onboarding.isComplete,
    onboardingCompletedAt: snapshot.identity.onboarding.completedAt ?? undefined,
    consentGrantedAt: snapshot.identity.onboarding.consentGrantedAt ?? undefined,
    isVerified: snapshot.identity.isVerified,
    isActive: snapshot.identity.isActive
  };
};

const withComputedMetrics = (
  snapshot: ProfileSnapshot,
  connectionCountOverride?: number
): ProfileSnapshot => {
  const props = toProfileProps(snapshot);
  const completion = props
    ? ProfileAggregate.fromPersistence(props).getCompletionPercentage()
    : snapshot.stats.completion;

  return {
    ...snapshot,
    stats: {
      ...snapshot.stats,
      completion,
      connectionCount: connectionCountOverride ?? snapshot.stats.connectionCount
    }
  };
};

export const profileReducer = (state: ProfileState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case "LOAD_REQUEST":
      return {
        ...state,
        status: state.status === "ready" ? state.status : "loading",
        error: undefined
      };
    case "LOAD_SUCCESS": {
      const {
        bundle: { profile, connections, activity, recommendations }
      } = action.payload;
      const connectionCount = connections.accepted.length;
      const profileWithMetrics = withComputedMetrics(profile, connectionCount);
      return {
        status: "ready",
        updating: false,
        profile: profileWithMetrics,
        connections,
        activity,
        recommendations,
        lastSyncedAt: new Date(),
        error: undefined
      };
    }
    case "LOAD_FAILURE":
      return {
        ...state,
        status: "error",
        error: action.error
      };
    case "UPDATE_REQUEST":
      return {
        ...state,
        updating: true,
        error: undefined
      };
    case "UPDATE_SUCCESS": {
      const connectionCount = state.connections?.accepted.length ?? action.payload.snapshot.stats.connectionCount;
      const profileWithMetrics = withComputedMetrics(action.payload.snapshot, connectionCount);
      return {
        ...state,
        updating: false,
        profile: profileWithMetrics,
        status: "ready"
      };
    }
    case "UPDATE_FAILURE":
      return {
        ...state,
        updating: false,
        error: action.error
      };
    case "UPDATE_PRIVACY_SUCCESS":
      return state.profile
        ? {
            ...state,
            profile: {
              ...state.profile,
              privacy: {
                ...state.profile.privacy,
                ...action.payload.privacy
              },
              lastUpdatedAt: new Date()
            }
          }
        : state;
    case "CONNECTIONS_REFRESHED": {
      const connectionCount = action.payload.connections.accepted.length;
      return state.profile
        ? {
            ...state,
            connections: action.payload.connections,
            profile: withComputedMetrics(
              {
                ...state.profile,
                stats: {
                  ...state.profile.stats,
                  connectionCount
                }
              },
              connectionCount
            )
          }
        : {
            ...state,
            connections: action.payload.connections
          };
    }
    case "CONNECTION_ADDED": {
      if (!state.connections || !state.profile) {
        return state;
      }
      const accepted = [action.payload.connection, ...state.connections.accepted];
      const pending = state.connections.pending.filter(
        (item) => item.profileId !== action.payload.connection.summary.profileId
      );
      const suggestions = state.connections.suggestions.filter(
        (item) => item.profileId !== action.payload.connection.summary.profileId
      );
      const connectionCount = accepted.length;
      return {
        ...state,
        connections: {
          accepted,
          pending,
          suggestions,
          lastSyncedAt: new Date()
        },
        profile: withComputedMetrics(
          {
            ...state.profile,
            stats: {
              ...state.profile.stats,
              connectionCount
            }
          },
          connectionCount
        )
      };
    }
    case "CONNECTION_REMOVED": {
      if (!state.connections || !state.profile) {
        return state;
      }
      const accepted = state.connections.accepted.filter(
        (connection) => connection.summary.profileId !== action.payload.profileId
      );
      const connectionCount = accepted.length;
      return {
        ...state,
        connections: {
          ...state.connections,
          accepted,
          lastSyncedAt: new Date()
        },
        profile: withComputedMetrics(
          {
            ...state.profile,
            stats: {
              ...state.profile.stats,
              connectionCount
            }
          },
          connectionCount
        )
      };
    }
    default:
      return state;
  }
};
