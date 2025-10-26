// Bounded Context Owner: Identity & Access Management Guild
import {
  AcademicInfoFactory,
  AffiliationInfoFactory,
  PersonalInfoFactory,
  ProfileAggregate,
  ProfileHandleFactory,
  SocialInfoFactory,
  type ProfileProps
} from "@core";
import { Timestamp, type DocumentData, type Firestore } from "firebase-admin/firestore";
import {
  profileActivityEntrySchema,
  profileBundleSchema,
  profileConnectionSchema,
  profileConnectionSummarySchema,
  profileConnectionStateSchema,
  profilePrivacySettingsSchema,
  profilePrivacyUpdatePayloadSchema,
  profileSnapshotSchema,
  profileUpdatePayloadSchema,
  type ProfileActivityEntry,
  type ProfileActivityState,
  type ProfileBundle,
  type ProfileConnection,
  type ProfileConnectionState,
  type ProfileConnectionSummary,
  type ProfilePrivacySettings,
  type ProfilePrivacyUpdatePayload,
  type ProfilePresence,
  type ProfileRecommendationsState,
  type ProfileSnapshot,
  type ProfileStats,
  type ProfileUpdatePayload
} from "../../profile/profile.contract";
import { defaultProfileBundle } from "../../profile/profile.sample";
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import { FirestoreProfileRepository } from "../auth/repositories/firestore-profile.repository";
import { ProfileServiceError } from "./profile.errors";
import { getAuthContainer } from "../auth/container";
import {
  recordConnectionCreated,
  recordConnectionRemoved,
  recordProfileUpdated
} from "./telemetry/console-profile-telemetry";

const privacyDefaults: ProfilePrivacySettings = {
  visibility: "campus",
  showEmail: false,
  showAcademicInfo: true,
  showActivity: true,
  showSpaces: true,
  allowMessages: true
};

const presenceDefaults: ProfilePresence = {
  status: "offline",
  lastSeenAt: null,
  isGhostMode: false
};

let cachedRepository: FirestoreProfileRepository | null = null;

// In dev without Firebase credentials, reuse the auth container's repository (in‑memory fallback)
const usingDevInMemory = (): boolean => !isFirebaseConfigured() && process.env.ENABLE_DEV_SEEDS === "true";

const resolveRepository = () => {
  if (usingDevInMemory()) {
    return getAuthContainer().profileRepository;
  }
  if (!cachedRepository) {
    cachedRepository = new FirestoreProfileRepository(firebaseFirestore());
  }
  return cachedRepository;
};

const resolveFirestore = (): Firestore => {
  if (usingDevInMemory()) {
    throw new Error("Firestore unavailable in dev; using in-memory repository");
  }
  return firebaseFirestore();
};

const toDate = (value: unknown): Date | undefined => {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (value instanceof Timestamp) return value.toDate();
  return undefined;
};

const toNullableDate = (value: unknown): Date | null => toDate(value) ?? null;

const ensureProfileExists = async (profileId: string) => {
  const repository = resolveRepository();
  const aggregate = await repository.findById(profileId);
  if (!aggregate) {
    throw new ProfileServiceError(404, "Profile not found", "PROFILE_NOT_FOUND");
  }
  return aggregate;
};

const loadPrivacy = async (profileId: string): Promise<ProfilePrivacySettings> => {
  const firestore = resolveFirestore();
  const doc = await firestore
    .collection("profiles")
    .doc(profileId)
    .collection("settings")
    .doc("privacy")
    .get();

  if (!doc.exists) {
    return privacyDefaults;
  }

  try {
    return profilePrivacySettingsSchema.parse(doc.data());
  } catch (error) {
    console.warn("profile.privacy_invalid", error);
    return privacyDefaults;
  }
};

const savePrivacy = async (
  profileId: string,
  payload: ProfilePrivacySettings
): Promise<ProfilePrivacySettings> => {
  const firestore = resolveFirestore();
  const privacy = profilePrivacySettingsSchema.parse(payload);

  await firestore
    .collection("profiles")
    .doc(profileId)
    .collection("settings")
    .doc("privacy")
    .set(
      {
        ...privacy,
        updatedAt: Timestamp.now()
      },
      { merge: true }
    );

  return privacy;
};

const loadPresence = async (profileId: string): Promise<ProfilePresence> => {
  const firestore = resolveFirestore();
  const doc = await firestore.collection("presence").doc(profileId).get();
  if (!doc.exists) {
    return presenceDefaults;
  }

  const raw = (doc.data() as Record<string, unknown>) ?? {};
  const s = raw.status;
  let statusOut: ProfilePresence["status"] = "offline";
  if (s === "online" || s === "away") {
    statusOut = s;
  }
  return {
    status: statusOut,
    lastSeenAt: toNullableDate(raw.lastSeen),
    isGhostMode: Boolean(raw.isGhostMode)
  };
};

const toProfileSnapshot = (
  props: ProfileProps,
  stats: ProfileStats,
  privacy: ProfilePrivacySettings,
  presence: ProfilePresence
): ProfileSnapshot => {
  const fallbackPersonalInfo = {
    firstName: props.personalInfo?.firstName ?? props.email.value.split("@")[0] ?? "Student",
    lastName: props.personalInfo?.lastName ?? "Student",
    pronouns: props.personalInfo?.pronouns,
    bio: props.personalInfo?.bio ?? "",
    photoUrl: props.personalInfo?.photoUrl
  };

  const personalInfo = props.personalInfo ?? fallbackPersonalInfo;

  const identity = {
    id: props.profileId.value,
    email: props.email.value,
    campusId: props.campusId,
    userType: props.userType,
    handle: props.handle?.value ?? props.email.value.split("@")[0] ?? "",
    personalInfo,
    academicInfo: props.academicInfo,
    affiliation: props.affiliation,
    socialInfo: props.socialInfo,
    interests: props.interests,
    clubs: props.clubs,
    residentialSelection: props.residentialSelection,
    isVerified: props.isVerified,
    isActive: props.isActive,
    onboarding: {
      isComplete: props.isOnboarded,
      completedAt: props.onboardingCompletedAt ?? null,
      consentGrantedAt: props.consentGrantedAt ?? null,
      stepsCompleted: props.isOnboarded ? defaultProfileBundle.profile.identity.onboarding.stepsCompleted : []
    }
  };

  return profileSnapshotSchema.parse({
    identity,
    privacy,
    stats,
    presence,
    lastUpdatedAt: new Date()
  });
};

const mapConnectionSummary = (
  data: DocumentData,
  fallbackHandle: string
) => {
  const d = data as Record<string, unknown>;
  const profileId = typeof d.profileId === "string" ? d.profileId : "";
  const handle = typeof d.handle === "string" ? d.handle : fallbackHandle;
  const displayName = typeof d.displayName === "string" ? d.displayName : (typeof d.handle === "string" ? d.handle : fallbackHandle);
  const summary = {
    profileId,
    handle,
    displayName,
    avatarUrl: (d.avatarUrl as string | undefined) ?? undefined,
    userType: (d.userType as string | undefined) ?? "student",
    campusId: (d.campusId as string | undefined) ?? "ub-buffalo",
    mutualSpaces: Number(d.mutualSpaces ?? 0),
    mutualConnections: Number(d.mutualConnections ?? 0),
    lastActiveAt: toNullableDate(d.lastActiveAt)
  };

  return profileConnectionSummarySchema.parse(summary);
};

const loadConnections = async (profileId: string): Promise<ProfileConnectionState> => {
  const firestore = resolveFirestore();
  const profileDoc = firestore.collection("profiles").doc(profileId);

  const [acceptedSnap, pendingSnap, suggestionsSnap] = await Promise.all([
    profileDoc.collection("connections").get(),
    profileDoc.collection("pendingConnections").get(),
    profileDoc.collection("suggestedConnections").get()
  ]);

  const accepted: ProfileConnection[] = acceptedSnap.docs.map((doc) => {
    const data = doc.data() as Record<string, unknown>;
    return profileConnectionSchema.parse({
      summary: mapConnectionSummary(data as unknown as DocumentData, doc.id),
      connectedAt: toDate(data.connectedAt) ?? new Date(),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : []
    });
  });

  const pending = pendingSnap.docs.map((doc) =>
    profileConnectionSummarySchema.parse(mapConnectionSummary(doc.data(), doc.id))
  );

  const suggestions = suggestionsSnap.docs.map((doc) =>
    profileConnectionSummarySchema.parse(mapConnectionSummary(doc.data(), doc.id))
  );

  return profileConnectionStateSchema.parse({
    accepted,
    pending,
    suggestions,
    lastSyncedAt: new Date()
  });
};

// Friends model — symmetrical friend docs with request→accept flow
export type FriendsState = {
  accepted: ReadonlyArray<ProfileConnectionSummary>;
  incoming: ReadonlyArray<ProfileConnectionSummary>;
  outgoing: ReadonlyArray<ProfileConnectionSummary>;
  lastSyncedAt: Date;
};

export const getFriendsState = async (profileId: string): Promise<FriendsState> => {
  const firestore = resolveFirestore();
  const profileDoc = firestore.collection("profiles").doc(profileId);
  const [friendsSnap, incomingSnap, outgoingSnap] = await Promise.all([
    profileDoc.collection("friends").get(),
    profileDoc.collection("friendRequests").where("direction", "==", "incoming").get(),
    profileDoc.collection("friendRequests").where("direction", "==", "outgoing").get()
  ]);

  const toSummary = (doc: FirebaseFirestore.QueryDocumentSnapshot): ProfileConnectionSummary =>
    profileConnectionSummarySchema.parse(mapConnectionSummary(doc.data(), doc.id));

  return {
    accepted: friendsSnap.docs.map(toSummary),
    incoming: incomingSnap.docs.map(toSummary),
    outgoing: outgoingSnap.docs.map(toSummary),
    lastSyncedAt: new Date()
  };
};

export const requestFriendship = async (profileId: string, targetProfileId: string): Promise<void> => {
  if (profileId === targetProfileId) {
    throw new ProfileServiceError(400, "Cannot friend yourself", "INVALID_FRIEND_REQUEST");
  }
  await ensureProfileExists(profileId);
  const target = await ensureProfileExists(targetProfileId);
  const firestore = resolveFirestore();
  const now = Timestamp.now();

  const targetSummary = mapConnectionSummary(
    {
      profileId,
      handle: (await resolveRepository().findById(profileId))?.getProps().handle?.value ?? profileId,
      displayName: "",
      campusId: target.getProps().campusId
    } as unknown as DocumentData,
    profileId
  );

  await firestore.runTransaction(async (tx) => {
    tx.set(
      firestore.collection("profiles").doc(targetProfileId).collection("friendRequests").doc(profileId),
      { ...targetSummary, direction: "incoming", requestedAt: now },
      { merge: true }
    );
    tx.set(
      firestore.collection("profiles").doc(profileId).collection("friendRequests").doc(targetProfileId),
      { ...targetSummary, direction: "outgoing", requestedAt: now },
      { merge: true }
    );
  });
};

export const acceptFriendship = async (profileId: string, targetProfileId: string): Promise<void> => {
  await Promise.all([ensureProfileExists(profileId), ensureProfileExists(targetProfileId)]);
  const firestore = resolveFirestore();
  const now = Timestamp.now();

  const [currentProps, targetProps] = await Promise.all([
    resolveRepository().findById(profileId).then((a) => a?.getProps()),
    resolveRepository().findById(targetProfileId).then((a) => a?.getProps())
  ]);

  const currentSummary = mapConnectionSummary(
    {
      profileId: targetProfileId,
      handle: targetProps?.handle?.value ?? targetProfileId,
      displayName: `${targetProps?.personalInfo?.firstName ?? ""} ${targetProps?.personalInfo?.lastName ?? ""}`.trim(),
      campusId: targetProps?.campusId ?? "ub-buffalo"
    } as unknown as DocumentData,
    targetProfileId
  );

  const reverseSummary = mapConnectionSummary(
    {
      profileId,
      handle: currentProps?.handle?.value ?? profileId,
      displayName: `${currentProps?.personalInfo?.firstName ?? ""} ${currentProps?.personalInfo?.lastName ?? ""}`.trim(),
      campusId: currentProps?.campusId ?? "ub-buffalo"
    } as unknown as DocumentData,
    profileId
  );

  await firestore.runTransaction(async (tx) => {
    // Write accepted on both sides
    tx.set(
      firestore.collection("profiles").doc(profileId).collection("friends").doc(targetProfileId),
      { ...currentSummary, acceptedAt: now },
      { merge: true }
    );
    tx.set(
      firestore.collection("profiles").doc(targetProfileId).collection("friends").doc(profileId),
      { ...reverseSummary, acceptedAt: now },
      { merge: true }
    );

    // Remove friendRequests on both sides
    tx.delete(firestore.collection("profiles").doc(profileId).collection("friendRequests").doc(targetProfileId));
    tx.delete(firestore.collection("profiles").doc(targetProfileId).collection("friendRequests").doc(profileId));
  });
};

export const removeFriendship = async (profileId: string, targetProfileId: string): Promise<void> => {
  await Promise.all([ensureProfileExists(profileId), ensureProfileExists(targetProfileId)]);
  const firestore = resolveFirestore();
  await firestore.runTransaction(async (tx) => {
    tx.delete(firestore.collection("profiles").doc(profileId).collection("friends").doc(targetProfileId));
    tx.delete(firestore.collection("profiles").doc(targetProfileId).collection("friends").doc(profileId));
  });
};

const loadActivity = async (profileId: string): Promise<ProfileActivityState> => {
  const firestore = resolveFirestore();
  const snapshot = await firestore
    .collection("profiles")
    .doc(profileId)
    .collection("activity")
    .orderBy("occurredAt", "desc")
    .limit(25)
    .get();

  const entries: ProfileActivityEntry[] = snapshot.docs.map((doc) => {
    try {
      const raw = doc.data() as Record<string, unknown>;
      return profileActivityEntrySchema.parse({
        id: doc.id,
        type: raw.type,
        occurredAt: toDate(raw.occurredAt) ?? new Date(),
        description: (raw.description as string | undefined) ?? "",
        metadata: (raw as { metadata?: unknown }).metadata
      });
    } catch (error) {
      console.warn("profile.activity_invalid", doc.id, error);
      return {
        id: doc.id,
        type: "connection_made",
        occurredAt: new Date(),
        description: "Activity unavailable"
      };
    }
  });

  return {
    entries,
    lastUpdatedAt: new Date()
  };
};

const loadRecommendations = async (
  profileId: string,
  campusId: string
): Promise<ProfileRecommendationsState> => {
  const firestore = resolveFirestore();

  const spacesSnapshot = await firestore
    .collection("spaces")
    .where("campusId", "==", campusId)
    .where("isActive", "==", true)
    .orderBy("memberCount", "desc")
    .limit(5)
    .get()
    .catch((error) => {
      console.warn("profile.space_recommendations_failed", error);
      return null;
    });

  const spaces =
    spacesSnapshot?.docs.map((doc) => {
      const raw = doc.data() as Record<string, unknown>;
      const name = typeof raw.name === "string" ? raw.name : "Campus Space";
      const memberCount = Number(raw.memberCount ?? 0);
      return {
        spaceId: doc.id,
        name,
        reason: "Popular on your campus",
        memberCount,
        joinUrl: `/spaces/${doc.id}`
      };
    }) ?? [];

  // People: draw from connections and rank by mutualSpaces/lastActive
  let people: ProfileConnectionSummary[] = [];
  try {
    const connections = await loadConnections(profileId);
    people = [...connections.accepted]
      .map((c) => c.summary)
      .sort((a, b) => (b.mutualSpaces - a.mutualSpaces) || ((b.lastActiveAt?.getTime?.() ?? 0) - (a.lastActiveAt?.getTime?.() ?? 0)))
      .slice(0, 5);
  } catch (error) {
    console.warn("profile.people_recommendations_failed", error);
  }

  return {
    spaces,
    people,
    generatedAt: new Date()
  };
};

const calculateStats = (
  aggregate: ProfileAggregate,
  connections: ProfileConnectionState
): ProfileStats => ({
  completion: aggregate.getCompletionPercentage(),
  connectionCount: connections.accepted.length,
  spacesJoined: aggregate.getProps().clubs.length,
  postsAuthored: 0,
  ritualsCompleted: 0,
  toolsCreated: 0
});

const handleUnexpectedError = (error: unknown): never => {
  if (error instanceof ProfileServiceError) {
    throw error;
  }

  const message =
    error instanceof Error ? error.message : "Profile service unavailable";
  console.error("profile.unexpected_error", message);
  throw new ProfileServiceError(503, "Profile service is temporarily unavailable", "FIRESTORE_UNAVAILABLE");
};

export const fetchProfileBundle = async (profileId: string): Promise<ProfileBundle> => {
  try {
    const aggregate = await ensureProfileExists(profileId);
    const props = aggregate.getProps();

    if (usingDevInMemory()) {
      const connections: ProfileConnectionState = {
        accepted: [],
        pending: [],
        suggestions: [],
        lastSyncedAt: new Date()
      };
      const stats = calculateStats(aggregate, connections);
      const snapshot = toProfileSnapshot(props, stats, privacyDefaults, presenceDefaults);
      return profileBundleSchema.parse({
        profile: snapshot,
        connections,
        activity: { entries: [], lastUpdatedAt: new Date() },
        recommendations: { spaces: [], people: [], generatedAt: new Date() }
      });
    }

    const [privacy, presence, connections] = await Promise.all([
      loadPrivacy(profileId),
      loadPresence(profileId),
      loadConnections(profileId)
    ]);

    const stats = calculateStats(aggregate, connections);
    const snapshot = toProfileSnapshot(props, stats, privacy, presence);
    const [activity, recommendations] = await Promise.all([
      loadActivity(profileId),
      loadRecommendations(profileId, props.campusId)
    ]);

    return profileBundleSchema.parse({
      profile: snapshot,
      connections,
      activity,
      recommendations
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
};

const mergeProfileProps = async (
  profileId: string,
  aggregate: ProfileAggregate,
  payload: ProfileUpdatePayload
): Promise<ProfileProps> => {
  const repository = resolveRepository();
  const props = aggregate.getProps();

  let handle = props.handle;
  let personalInfo = props.personalInfo;
  let academicInfo = props.academicInfo;
  let affiliation = props.affiliation;
  let socialInfo = props.socialInfo;
  let interests: ReadonlyArray<ProfileProps["interests"][number]> = props.interests;
  let clubs: ReadonlyArray<string> = props.clubs;
  let residentialSelection = props.residentialSelection;
  let consentGrantedAt = props.consentGrantedAt;

  if (payload.handle) {
    const handleResult = ProfileHandleFactory.create(payload.handle);
    if (!handleResult.ok) {
      throw new ProfileServiceError(400, handleResult.error, "INVALID_HANDLE");
    }
    const existing = await repository.findByHandle(handleResult.value.value);
    if (existing && existing.getProps().profileId.value !== profileId) {
      throw new ProfileServiceError(409, "Handle is already taken", "HANDLE_CONFLICT");
    }
    handle = handleResult.value;
  }

  if (payload.personalInfo) {
    const base = props.personalInfo ?? {
      firstName: props.email.value.split("@")[0] ?? "Student",
      lastName: "Student"
    };
    const personalInfoResult = PersonalInfoFactory.create({
      ...base,
      ...payload.personalInfo
    });
    if (!personalInfoResult.ok) {
      throw new ProfileServiceError(400, personalInfoResult.error, "INVALID_PERSONAL_INFO");
    }
    personalInfo = personalInfoResult.value;
  }

  if (payload.academicInfo !== undefined) {
    if (payload.academicInfo === null) {
      academicInfo = undefined;
    } else {
      const base = props.academicInfo ?? payload.academicInfo;
      const academicInfoResult = AcademicInfoFactory.create({
        ...base,
        ...payload.academicInfo
      });
      if (!academicInfoResult.ok) {
        throw new ProfileServiceError(400, academicInfoResult.error, "INVALID_ACADEMIC_INFO");
      }
      academicInfo = academicInfoResult.value;
    }
  }

  if (payload.affiliation !== undefined) {
    if (payload.affiliation === null) {
      affiliation = undefined;
    } else {
      const base = props.affiliation ?? payload.affiliation;
      const affiliationInfoResult = AffiliationInfoFactory.create({
        ...base,
        ...payload.affiliation
      });
      if (!affiliationInfoResult.ok) {
        throw new ProfileServiceError(400, affiliationInfoResult.error, "INVALID_AFFILIATION_INFO");
      }
      affiliation = affiliationInfoResult.value;
    }
  }

  if (payload.socialInfo !== undefined) {
    if (payload.socialInfo === null) {
      socialInfo = undefined;
    } else {
      const base = props.socialInfo ?? {};
      const socialInfoResult = SocialInfoFactory.create({
        ...base,
        ...payload.socialInfo
      });
      if (!socialInfoResult.ok) {
        throw new ProfileServiceError(400, socialInfoResult.error, "INVALID_SOCIAL_INFO");
      }
      socialInfo = socialInfoResult.value;
    }
  }

  if (payload.interests) {
    interests = payload.interests;
  }

  if (payload.clubs) {
    clubs = [...payload.clubs];
  }

  if (payload.residentialSelection !== undefined) {
    residentialSelection = payload.residentialSelection ?? undefined;
  }

  consentGrantedAt = consentGrantedAt ?? props.consentGrantedAt;

  return {
    ...props,
    handle,
    personalInfo,
    academicInfo,
    affiliation,
    socialInfo,
    interests,
    clubs,
    residentialSelection,
    consentGrantedAt
  };
};

export const updateProfileDetails = async (
  profileId: string,
  payload: ProfileUpdatePayload
): Promise<ProfileSnapshot> => {
  try {
    const parsedPayload = profileUpdatePayloadSchema.parse(payload);
    const aggregate = await ensureProfileExists(profileId);
    const updatedProps = await mergeProfileProps(profileId, aggregate, parsedPayload);
    const updatedAggregate = ProfileAggregate.fromPersistence(updatedProps);
    const repository = resolveRepository();
    await repository.save(updatedAggregate);
    // Telemetry: which fields changed (approximate)
    const changed: string[] = Object.keys(parsedPayload);
    recordProfileUpdated(profileId, changed);

    if (usingDevInMemory()) {
      const connections: ProfileConnectionState = {
        accepted: [],
        pending: [],
        suggestions: [],
        lastSyncedAt: new Date()
      };
      const stats = calculateStats(updatedAggregate, connections);
      return toProfileSnapshot(updatedProps, stats, privacyDefaults, presenceDefaults);
    }

    const [connections, privacy, presence] = await Promise.all([
      loadConnections(profileId),
      loadPrivacy(profileId),
      loadPresence(profileId)
    ]);

    const stats = calculateStats(updatedAggregate, connections);
    return toProfileSnapshot(updatedProps, stats, privacy, presence);
  } catch (error) {
    return handleUnexpectedError(error);
  }
};

export const updateProfilePrivacy = async (
  profileId: string,
  payload: ProfilePrivacyUpdatePayload
): Promise<ProfilePrivacySettings> => {
  try {
    const parsedPayload = profilePrivacyUpdatePayloadSchema.parse(payload);
    await ensureProfileExists(profileId);

    const currentPrivacy = await loadPrivacy(profileId);
    const mergedPrivacy = profilePrivacySettingsSchema.parse({
      ...currentPrivacy,
      ...parsedPayload
    });

    return await savePrivacy(profileId, mergedPrivacy);
  } catch (error) {
    return handleUnexpectedError(error);
  }
};

export const fetchConnections = async (profileId: string): Promise<ProfileConnectionState> => {
  try {
    await ensureProfileExists(profileId);
    return await loadConnections(profileId);
  } catch (error) {
    return handleUnexpectedError(error);
  }
};

export const connectProfiles = async (
  profileId: string,
  targetProfileId: string
): Promise<ProfileConnection> => {
  try {
    if (profileId === targetProfileId) {
      throw new ProfileServiceError(400, "Cannot connect to the same profile", "INVALID_CONNECTION");
    }

    
    const [current, target] = await Promise.all([
      ensureProfileExists(profileId),
      ensureProfileExists(targetProfileId)
    ]);

    const currentProps = current.getProps();
    const targetProps = target.getProps();

    const firestore = resolveFirestore();
    const now = Timestamp.now();

    const summary = {
      profileId: targetProfileId,
      handle: targetProps.handle?.value ?? targetProps.email.value.split("@")[0] ?? targetProfileId,
      displayName: `${targetProps.personalInfo?.firstName ?? ""} ${targetProps.personalInfo?.lastName ?? ""}`.trim() ||
        (targetProps.handle?.value ?? targetProfileId),
      avatarUrl: targetProps.personalInfo?.photoUrl ?? null,
      userType: targetProps.userType,
      campusId: targetProps.campusId,
      mutualSpaces: 0,
      mutualConnections: 0,
      lastActiveAt: now
    };

    const reverseSummary = {
      profileId,
      handle: currentProps.handle?.value ?? currentProps.email.value.split("@")[0] ?? profileId,
      displayName: `${currentProps.personalInfo?.firstName ?? ""} ${currentProps.personalInfo?.lastName ?? ""}`.trim() ||
        (currentProps.handle?.value ?? profileId),
      avatarUrl: currentProps.personalInfo?.photoUrl ?? null,
      userType: currentProps.userType,
      campusId: currentProps.campusId,
      mutualSpaces: 0,
      mutualConnections: 0,
      lastActiveAt: now
    };

    await firestore.runTransaction(async (transaction) => {
      const currentDoc = firestore
        .collection("profiles")
        .doc(profileId)
        .collection("connections")
        .doc(targetProfileId);

      const targetDoc = firestore
        .collection("profiles")
        .doc(targetProfileId)
        .collection("connections")
        .doc(profileId);

      transaction.set(
        currentDoc,
        {
          ...summary,
          connectedAt: now,
          tags: [],
          updatedAt: now
        },
        { merge: true }
      );

      transaction.set(
        targetDoc,
        {
          ...reverseSummary,
          connectedAt: now,
          tags: [],
          updatedAt: now
        },
        { merge: true }
      );

      transaction.delete(
        firestore
          .collection("profiles")
          .doc(profileId)
          .collection("pendingConnections")
          .doc(targetProfileId)
      );

      transaction.delete(
        firestore
          .collection("profiles")
          .doc(profileId)
          .collection("suggestedConnections")
          .doc(targetProfileId)
      );
    });

    const response = profileConnectionSchema.parse({
      summary: profileConnectionSummarySchema.parse({
        ...summary,
        lastActiveAt: new Date()
      }),
      connectedAt: new Date(),
      tags: []
    });
    recordConnectionCreated(profileId, targetProfileId);
    return response;
  } catch (error) {
    return handleUnexpectedError(error);
  }
};

export const disconnectProfiles = async (
  profileId: string,
  targetProfileId: string
): Promise<void> => {
  try {
    await Promise.all([ensureProfileExists(profileId), ensureProfileExists(targetProfileId)]);
    const firestore = resolveFirestore();

    await firestore.runTransaction(async (transaction) => {
      transaction.delete(
        firestore
          .collection("profiles")
          .doc(profileId)
          .collection("connections")
          .doc(targetProfileId)
      );

      transaction.delete(
        firestore
          .collection("profiles")
          .doc(targetProfileId)
          .collection("connections")
          .doc(profileId)
      );
    });
    recordConnectionRemoved(profileId, targetProfileId);
  } catch (error) {
    return handleUnexpectedError(error);
  }
};

export const refreshConnections = async (
  profileId: string
): Promise<ProfileConnectionState> => {
  try {
    await ensureProfileExists(profileId);
    return await loadConnections(profileId);
  } catch (error) {
    return handleUnexpectedError(error);
  }
};
