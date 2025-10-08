import type { HiveProfile, ProfileSystem, UnifiedHiveProfile } from "../types/profile-system";

type MinimalProfileInput = {
  id: string;
  displayName: string;
  handle: string;
  email: string;
  campusId?: string;
};

export function toUnifiedProfile(profile: HiveProfile): UnifiedHiveProfile {
  return { ...profile } as UnifiedHiveProfile;
}

export function fromProfileSystem(profileSystem: ProfileSystem): UnifiedHiveProfile {
  return { ...profileSystem } as UnifiedHiveProfile;
}

export function toHiveProfile(profile: UnifiedHiveProfile): HiveProfile {
  return { ...profile } as HiveProfile;
}

export function toProfileSystem(profile: UnifiedHiveProfile): ProfileSystem {
  return { ...profile } as ProfileSystem;
}

export function createMinimalProfile(data: MinimalProfileInput): UnifiedHiveProfile {
  const { id, displayName, handle, email, campusId = "ub-buffalo" } = data;

  const baseProfile = {
    id,
    displayName,
    handle,
    email,
    campusId,
    interests: [],
    verification: {
      emailVerified: false,
      profileVerified: false,
      onboardingCompleted: false,
    },
  };

  return baseProfile as unknown as UnifiedHiveProfile;
}

export function hasAdvancedFeatures(profile: ProfileSystem | UnifiedHiveProfile): boolean {
  const candidate = profile as unknown as Record<string, unknown>;
  return Boolean(candidate.integrations || candidate.widgets || candidate.analytics);
}

export function isUnifiedProfile(profile: unknown): profile is UnifiedHiveProfile {
  if (!profile || typeof profile !== "object") {
    return false;
  }

  const candidate = profile as unknown as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.handle === "string" &&
    typeof candidate.campusId === "string"
  );
}

export function isHiveProfile(profile: unknown): profile is HiveProfile {
  if (!profile || typeof profile !== "object") {
    return false;
  }

  const candidate = profile as unknown as Record<string, unknown>;
  return typeof candidate.id === "string" && typeof candidate.handle === "string";
}

export function isProfileSystem(profile: unknown): profile is ProfileSystem {
  if (!profile || typeof profile !== "object") {
    return false;
  }

  const candidate = profile as unknown as Record<string, unknown>;
  return typeof candidate.id === "string" && typeof candidate.displayName === "string";
}

export function createMockProfileSystem(userId = "mock-user"): ProfileSystem {
  const unified = createMinimalProfile({
    id: userId,
    displayName: "Jacob Rhinehart",
    handle: "jacob",
    email: "jacob@hive.com",
  });

  const enhancedProfile = {
    ...unified,
    academic: {
      major: "Business Administration",
      academicYear: "senior",
      graduationYear: 2025,
      schoolId: "ub-buffalo",
      pronouns: "he/him",
    },
    personal: {
      bio: "Building the future of campus collaboration 🚀",
      statusMessage: "Shipping HIVE",
      location: "Buffalo, NY",
      interests: ["entrepreneurship", "product-design", "campus-life"],
    },
    builder: {
      isBuilder: true,
      builderOptIn: true,
      builderLevel: "advanced",
      specializations: ["product-management"],
      toolsCreated: 3,
    },
    stats: {
      spacesJoined: 8,
      spacesActive: 5,
      spacesLed: 3,
      toolsUsed: 12,
      connectionsCount: 156,
      totalActivity: 342,
      currentStreak: 7,
      longestStreak: 21,
      reputation: 89,
      achievements: 12,
    },
    verification: {
      emailVerified: true,
      profileVerified: true,
      onboardingCompleted: true,
    },
  };

  return enhancedProfile as ProfileSystem;
}

export function createHiveProfile(
  id: string,
  fullName: string,
  handle: string,
  email: string,
  options?: {
    major?: string;
    academicYear?: "freshman" | "sophomore" | "junior" | "senior" | "graduate" | "alumni" | "faculty";
    bio?: string;
    isBuilder?: boolean;
  },
): UnifiedHiveProfile {
  const minimal = createMinimalProfile({ id, displayName: fullName, handle, email });

  return {
    ...minimal,
    academic: {
      major: options?.major ?? "",
      academicYear: options?.academicYear ?? "freshman",
      graduationYear: undefined,
      schoolId: minimal.campusId,
    },
    personal: {
      bio: options?.bio ?? "",
      statusMessage: "",
      location: "",
      interests: [],
    },
    builder: {
      isBuilder: options?.isBuilder ?? false,
      builderOptIn: Boolean(options?.isBuilder),
      builderLevel: "starter",
      specializations: [],
      toolsCreated: 0,
    },
    grid: {
      cards: [
        { id: "spaces-hub", type: "spaces_hub", size: "2x1", position: { x: 0, y: 0 }, visible: true },
        { id: "friends-network", type: "friends_network", size: "1x1", position: { x: 2, y: 0 }, visible: true },
      ],
      mobileLayout: [
        { id: "spaces-hub", type: "spaces_hub", size: "2x1", position: { x: 0, y: 0 }, visible: true },
      ],
      lastModified: new Date(),
    },
    presence: {
      vibe: "🌟 New to HIVE",
      vibeUpdatedAt: new Date(),
      lastActive: new Date(),
      isOnline: true,
    },
  } as UnifiedHiveProfile;
}
