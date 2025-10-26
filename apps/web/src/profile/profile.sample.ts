// Bounded Context Owner: Identity & Access Management Guild
import {
  profileBundleSchema,
  profilePrivacyUpdatePayloadSchema,
  type ProfileBundle,
  type ProfileConnection,
  type ProfileConnectionState,
  type ProfilePrivacySettings,
  type ProfilePrivacyUpdatePayload,
  type ProfileSnapshot,
  type ProfileUpdatePayload
} from "./profile.contract";

const sampleBundle = profileBundleSchema.parse({
  profile: {
    identity: {
      id: "profile-jwrhineh",
      email: "jwrhineh@buffalo.edu",
      campusId: "ub-buffalo",
      userType: "student",
      handle: "jwrhineh",
      personalInfo: {
        firstName: "Jacob",
        lastName: "Rhinehart",
        pronouns: "he/him",
        bio: "Industrial engineering senior prototyping campus coordination tools. Running HiveLAB pilot operations this fall.",
        photoUrl: "https://example.com/profiles/jacob-rhinehart.jpg"
      },
      academicInfo: {
        majors: ["Industrial Engineering"],
        graduationYear: new Date().getFullYear() + 1,
        courses: ["IE 306", "IE 435", "EE 383"]
      },
      socialInfo: {
        instagram: "@jacob.rhinehart",
        linkedin: "https://www.linkedin.com/in/jacob-rhinehart",
        website: "https://jacobrhinehart.com"
      },
      interests: [
        { id: "operations", label: "Operations Systems", category: "Engineering" },
        { id: "campus-life", label: "Campus Life", category: "Community" },
        { id: "product-experiments", label: "Product Experiments", category: "Tech" }
      ],
      clubs: ["Hive Builders", "Campus Ops Collective"],
      residentialSelection: { spaceId: "governors-residence", name: "Governors Residence Complex" },
      isVerified: true,
      isActive: true,
      onboarding: {
        isComplete: true,
        completedAt: new Date("2024-09-02T18:32:00Z"),
        consentGrantedAt: new Date("2024-09-01T16:32:00Z"),
        stepsCompleted: ["personal-info", "academic-info", "interests", "review"]
      }
    },
    privacy: {
      visibility: "campus",
      showEmail: false,
      showAcademicInfo: true,
      showActivity: true,
      showSpaces: true,
      allowMessages: true
    },
    stats: {
      completion: 93,
      connectionCount: 4,
      spacesJoined: 6,
      postsAuthored: 14,
      ritualsCompleted: 3,
      toolsCreated: 2
    },
    presence: {
      status: "online",
      lastSeenAt: new Date("2024-10-09T21:15:00Z"),
      isGhostMode: false
    },
    lastUpdatedAt: new Date("2024-10-09T17:45:00Z")
  },
  connections: {
    accepted: [
      {
        summary: {
          profileId: "profile-991",
          handle: "jamierivera",
          displayName: "Jamie Rivera",
          avatarUrl: "https://example.com/profiles/jamie.jpg",
          userType: "student",
          campusId: "ub-buffalo",
          mutualSpaces: 3,
          mutualConnections: 4,
          lastActiveAt: new Date("2024-10-07T17:35:00Z")
        },
        connectedAt: new Date("2024-09-03T15:12:00Z"),
        tags: ["study-buddy", "project-team"]
      },
      {
        summary: {
          profileId: "profile-512",
          handle: "drsofia",
          displayName: "Dr. Sofia Martinez",
          avatarUrl: "https://example.com/profiles/sofia.jpg",
          userType: "faculty",
          campusId: "ub-buffalo",
          mutualSpaces: 2,
          mutualConnections: 1,
          lastActiveAt: new Date("2024-10-07T15:20:00Z")
        },
        connectedAt: new Date("2024-08-28T12:45:00Z"),
        tags: ["mentor"]
      }
    ],
    pending: [
      {
        profileId: "profile-777",
        handle: "waleeds",
        displayName: "Waleed Shaikh",
        avatarUrl: "https://example.com/profiles/waleed.jpg",
        userType: "student",
        campusId: "ub-buffalo",
        mutualSpaces: 1,
        mutualConnections: 2,
        lastActiveAt: new Date("2024-10-06T22:10:00Z")
      }
    ],
    suggestions: [
      {
        profileId: "profile-888",
        handle: "campusconnector",
        displayName: "Morgan Patel",
        avatarUrl: "https://example.com/profiles/morgan.jpg",
        userType: "student",
        campusId: "ub-buffalo",
        mutualSpaces: 4,
        mutualConnections: 6,
        lastActiveAt: new Date("2024-10-07T18:05:00Z")
      },
      {
        profileId: "profile-654",
        handle: "hivelabtracy",
        displayName: "Tracy Nguyen",
        avatarUrl: "https://example.com/profiles/tracy.jpg",
        userType: "student",
        campusId: "ub-buffalo",
        mutualSpaces: 2,
        mutualConnections: 5,
        lastActiveAt: new Date("2024-10-07T16:30:00Z")
      }
    ],
    lastSyncedAt: new Date("2024-10-07T17:45:00Z")
  },
  activity: {
    entries: [
      {
        id: "activity-1",
        type: "space_joined",
        occurredAt: new Date("2024-10-05T19:20:00Z"),
        description: "Joined HiveLAB Operations Space to lead the fall pilot",
        metadata: { spaceId: "space-hivelab-ops" }
      },
      {
        id: "activity-2",
        type: "badge_earned",
        occurredAt: new Date("2024-10-01T12:00:00Z"),
        description: "Earned 'Coordination Architect' badge",
        metadata: { badgeId: "coordination-architect" }
      },
      {
        id: "activity-3",
        type: "tool_published",
        occurredAt: new Date("2024-09-24T10:45:00Z"),
        description: "Published 'Event Runbook Template' tool to HiveLAB",
        metadata: { toolId: "tool-event-runbook" }
      }
    ],
    lastUpdatedAt: new Date("2024-10-07T17:40:00Z")
  },
  recommendations: {
    spaces: [
      {
        spaceId: "space-innovation-lab",
        name: "Innovation Build Lab",
        reason: "Matches your interest in product experiments and rapid pilots",
        memberCount: 182,
        joinUrl: "/spaces/space-innovation-lab"
      },
      {
        spaceId: "space-campus-rides",
        name: "Campus Ride Network",
        reason: "Operations-heavy space coordinating campus rides daily",
        memberCount: 312,
        joinUrl: "/spaces/space-campus-rides"
      }
    ],
    people: [
      {
        profileId: "profile-321",
        handle: "eng-maya",
        displayName: "Maya Johnson",
        avatarUrl: "https://example.com/profiles/maya.jpg",
        userType: "student",
        campusId: "ub-buffalo",
        mutualSpaces: 3,
        mutualConnections: 5,
        lastActiveAt: new Date("2024-10-07T17:55:00Z")
      }
    ],
    generatedAt: new Date("2024-10-07T17:50:00Z")
  }
});

export const cloneBundle = (bundle: ProfileBundle): ProfileBundle =>
  profileBundleSchema.parse(JSON.parse(JSON.stringify(bundle)));

export const defaultProfileBundle: ProfileBundle = cloneBundle(sampleBundle);

export const applyProfileUpdates = (
  snapshot: ProfileSnapshot,
  payload: ProfileUpdatePayload
): ProfileSnapshot => {
  const interests = payload.interests ? [...payload.interests] : [...snapshot.identity.interests];
  const clubs = payload.clubs ? [...payload.clubs] : [...snapshot.identity.clubs];
  const personalInfo = payload.personalInfo
    ? { ...snapshot.identity.personalInfo, ...payload.personalInfo }
    : snapshot.identity.personalInfo;
  const academicInfo = mergeAcademicInfo(snapshot.identity.academicInfo, payload.academicInfo);
  const affiliation = mergeAffiliationInfo(snapshot.identity.affiliation, payload.affiliation);
  const socialInfo =
    payload.socialInfo === null
      ? undefined
      : payload.socialInfo
        ? { ...(snapshot.identity.socialInfo ?? {}), ...payload.socialInfo }
        : snapshot.identity.socialInfo;
  const residentialSelection =
    payload.residentialSelection === null
      ? undefined
      : payload.residentialSelection ?? snapshot.identity.residentialSelection;

  return {
    ...snapshot,
    identity: {
      ...snapshot.identity,
      handle: payload.handle ?? snapshot.identity.handle,
      personalInfo,
      academicInfo,
      affiliation,
      socialInfo,
      interests,
      clubs,
      residentialSelection
    },
    lastUpdatedAt: new Date()
  };
};

export const applyPrivacyUpdate = (
  privacy: ProfilePrivacySettings,
  payload: ProfilePrivacyUpdatePayload
): ProfilePrivacySettings => {
  const safePayload = profilePrivacyUpdatePayloadSchema.parse(payload);
  return {
    ...privacy,
    ...safePayload
  };
};

const findConnectionSummary = (
  state: ProfileBundle,
  profileId: string
): ProfileConnection["summary"] => {
  const candidate =
    state.connections.pending.find((item) => item.profileId === profileId) ??
    state.connections.suggestions.find((item) => item.profileId === profileId);

  if (candidate) {
    return { ...candidate, lastActiveAt: candidate.lastActiveAt ? new Date(candidate.lastActiveAt) : null };
  }

  return {
    profileId,
    handle: profileId,
    displayName: profileId,
    userType: "student",
    campusId: state.profile.identity.campusId,
    mutualSpaces: 0,
    mutualConnections: 0,
    lastActiveAt: new Date()
  };
};

export const connectProfileInBundle = (
  bundle: ProfileBundle,
  targetProfileId: string
): { bundle: ProfileBundle; connection: ProfileConnection } => {
  const working = cloneBundle(bundle);
  const summary = findConnectionSummary(working, targetProfileId);
  const connection: ProfileConnection = {
    summary,
    connectedAt: new Date(),
    tags: []
  };

  const accepted = [connection, ...working.connections.accepted];
  const pending = working.connections.pending.filter((candidate) => candidate.profileId !== targetProfileId);
  const suggestions = working.connections.suggestions.filter((candidate) => candidate.profileId !== targetProfileId);

  const next: ProfileBundle = {
    ...working,
    connections: {
      accepted,
      pending,
      suggestions,
      lastSyncedAt: new Date()
    },
    profile: {
      ...working.profile,
      stats: {
        ...working.profile.stats,
        connectionCount: accepted.length
      },
      lastUpdatedAt: new Date()
    }
  };

  return {
    bundle: next,
    connection
  };
};

export const disconnectProfileInBundle = (
  bundle: ProfileBundle,
  targetProfileId: string
): ProfileBundle => {
  const working = cloneBundle(bundle);
  const accepted = working.connections.accepted.filter(
    (candidate) => candidate.summary.profileId !== targetProfileId
  );

  return {
    ...working,
    connections: {
      ...working.connections,
      accepted,
      lastSyncedAt: new Date()
    },
    profile: {
      ...working.profile,
      stats: {
        ...working.profile.stats,
        connectionCount: accepted.length
      },
      lastUpdatedAt: new Date()
    }
  };
};

export const refreshConnectionsInBundle = (
  bundle: ProfileBundle
): { bundle: ProfileBundle; connections: ProfileConnectionState } => {
  const working = cloneBundle(bundle);
  const connections: ProfileConnectionState = {
    ...working.connections,
    lastSyncedAt: new Date()
  };

  return {
    bundle: { ...working, connections },
    connections
  };
};

// Helpers to safely merge partials into required shapes
function mergeAcademicInfo(
  prev: ProfileSnapshot["identity"]["academicInfo"],
  patch: ProfileUpdatePayload["academicInfo"]
): ProfileSnapshot["identity"]["academicInfo"] {
  if (patch === null) return undefined;
  if (!patch) return prev;
  const next = { ...(prev ?? {}), ...patch } as Partial<NonNullable<ProfileSnapshot["identity"]["academicInfo"]>>;
  if (next.majors && next.graduationYear) {
    return {
      majors: next.majors,
      graduationYear: next.graduationYear,
      courses: next.courses
    };
  }
  return prev;
}

function mergeAffiliationInfo(
  prev: ProfileSnapshot["identity"]["affiliation"],
  patch: ProfileUpdatePayload["affiliation"]
): ProfileSnapshot["identity"]["affiliation"] {
  if (patch === null) return undefined;
  if (!patch) return prev;
  const dept = patch.department ?? prev?.department;
  return dept ? { department: dept } : prev;
}
