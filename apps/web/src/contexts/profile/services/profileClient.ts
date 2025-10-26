// Bounded Context Owner: Identity & Access Management Guild
import {
  profileBundleSchema,
  profileConnectionSchema,
  profileConnectionStateSchema,
  profilePrivacySettingsSchema,
  profileSnapshotSchema,
  type ProfileBundle,
  type ProfileConnection,
  type ProfileConnectionState,
  type ProfilePrivacySettings,
  type ProfilePrivacyUpdatePayload,
  type ProfileSnapshot,
  type ProfileUpdatePayload
} from "../../../profile/profile.contract";
import {
  applyPrivacyUpdate,
  applyProfileUpdates,
  cloneBundle,
  connectProfileInBundle,
  defaultProfileBundle,
  disconnectProfileInBundle,
  refreshConnectionsInBundle
} from "../../../profile/profile.sample";

const jsonHeaders = {
  "Content-Type": "application/json"
} as const;

const parseJson = async <T>(response: Response): Promise<T> => {
  const text = await response.text();
  if (!text) {
    throw new Error("Empty response");
  }
  return JSON.parse(text) as T;
};

const handleError = async (response: Response): Promise<never> => {
  const message = await response.text();
  throw new Error(message || `Request failed with status ${response.status}`);
};

const assertProfileId = (profileId: string): string => {
  if (!profileId) {
    throw new Error("Profile ID is required");
  }
  return profileId;
};

export interface ProfileClient {
  getProfile(profileId: string): Promise<ProfileBundle>;
  updateProfile(profileId: string, payload: ProfileUpdatePayload): Promise<ProfileSnapshot>;
  updatePrivacy(profileId: string, payload: ProfilePrivacyUpdatePayload): Promise<ProfilePrivacySettings>;
  connect(profileId: string, targetProfileId: string): Promise<ProfileConnection>;
  disconnect(profileId: string, targetProfileId: string): Promise<void>;
  refreshConnections(profileId: string): Promise<ProfileConnectionState>;
}

const createHttpProfileClient = (): ProfileClient => ({
  async getProfile(profileId: string): Promise<ProfileBundle> {
    const resolvedProfileId = assertProfileId(profileId);
    const response = await globalThis.fetch(`/api/profile?profileId=${encodeURIComponent(resolvedProfileId)}`, {
      method: "GET"
    });

    if (!response.ok) {
      await handleError(response);
    }

    const raw = await parseJson<ProfileBundle>(response);
    return profileBundleSchema.parse(raw);
  },

  async updateProfile(profileId: string, payload: ProfileUpdatePayload): Promise<ProfileSnapshot> {
    const resolvedProfileId = assertProfileId(profileId);
    const response = await globalThis.fetch("/api/profile", {
      method: "PATCH",
      headers: jsonHeaders,
      body: JSON.stringify({
        profileId: resolvedProfileId,
        profile: payload
      })
    });

    if (!response.ok) {
      await handleError(response);
    }

    const raw = await parseJson<ProfileSnapshot>(response);
    return profileSnapshotSchema.parse(raw);
  },

  async updatePrivacy(
    profileId: string,
    payload: ProfilePrivacyUpdatePayload
  ): Promise<ProfilePrivacySettings> {
    const resolvedProfileId = assertProfileId(profileId);
    const response = await globalThis.fetch("/api/profile/privacy", {
      method: "PATCH",
      headers: jsonHeaders,
      body: JSON.stringify({
        profileId: resolvedProfileId,
        privacy: payload
      })
    });

    if (!response.ok) {
      await handleError(response);
    }

    const raw = await parseJson<ProfilePrivacySettings>(response);
    return profilePrivacySettingsSchema.parse(raw);
  },

  async connect(profileId: string, targetProfileId: string): Promise<ProfileConnection> {
    const resolvedProfileId = assertProfileId(profileId);
    const response = await globalThis.fetch("/api/profile/connections", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({
        profileId: resolvedProfileId,
        targetProfileId
      })
    });

    if (!response.ok) {
      await handleError(response);
    }

    const raw = await parseJson<ProfileConnection>(response);
    return profileConnectionSchema.parse(raw);
  },

  async disconnect(profileId: string, targetProfileId: string): Promise<void> {
    const resolvedProfileId = assertProfileId(profileId);
    const response = await globalThis.fetch("/api/profile/connections", {
      method: "DELETE",
      headers: jsonHeaders,
      body: JSON.stringify({
        profileId: resolvedProfileId,
        targetProfileId
      })
    });

    if (!response.ok) {
      await handleError(response);
    }
  },

  async refreshConnections(profileId: string): Promise<ProfileConnectionState> {
    const resolvedProfileId = assertProfileId(profileId);
    const response = await globalThis.fetch(
      `/api/profile/connections?profileId=${encodeURIComponent(resolvedProfileId)}`,
      { method: "GET" }
    );

    if (!response.ok) {
      await handleError(response);
    }

    const raw = await parseJson<ProfileConnectionState>(response);
    return profileConnectionStateSchema.parse(raw);
  }
});

export const createInMemoryProfileClient = (seed?: ProfileBundle): ProfileClient => {
  let state = cloneBundle(seed ?? defaultProfileBundle);

  return {
    getProfile(_profileId: string): Promise<ProfileBundle> {
      return Promise.resolve(cloneBundle(state));
    },
    updateProfile(_profileId: string, payload: ProfileUpdatePayload): Promise<ProfileSnapshot> {
      state = {
        ...state,
        profile: applyProfileUpdates(state.profile, payload)
      };
      return Promise.resolve(cloneBundle(state).profile);
    },
    updatePrivacy(
      _profileId: string,
      payload: ProfilePrivacyUpdatePayload
    ): Promise<ProfilePrivacySettings> {
      state = {
        ...state,
        profile: {
          ...state.profile,
          privacy: applyPrivacyUpdate(state.profile.privacy, payload),
          lastUpdatedAt: new Date()
        }
      };
      return Promise.resolve(cloneBundle(state).profile.privacy);
    },
    connect(_profileId: string, targetProfileId: string): Promise<ProfileConnection> {
      const result = connectProfileInBundle(state, targetProfileId);
      state = result.bundle;
      return Promise.resolve(result.connection);
    },
    disconnect(_profileId: string, targetProfileId: string): Promise<void> {
      state = disconnectProfileInBundle(state, targetProfileId);
      return Promise.resolve();
    },
    refreshConnections(_profileId: string): Promise<ProfileConnectionState> {
      const result = refreshConnectionsInBundle(state);
      state = result.bundle;
      return Promise.resolve(result.connections);
    }
  };
};

export const profileClient: ProfileClient = createHttpProfileClient();
