// E2E-only mappers from Profile Bundle -> @hive/ui Profile components
import type {
  ProfileBundle,
  ProfileSnapshot
} from "@profile/contract";
import type { ProfileLayoutProps } from "@hive/ui";
import { CAMPUSES } from "@/fixtures/campuses";

type ActivityType = "space_joined" | "badge_earned" | "tool_published" | "connection_made" | "custom";

const campusNameFor = (campusId: string | undefined): string => {
  if (!campusId) return "Unknown campus";
  return CAMPUSES.find((c) => c.id === campusId)?.name ?? campusId;
};

const timeAgo = (date: Date | null | undefined): string => {
  if (!date) return "recently";
  const now = Date.now();
  const ts = new Date(date).getTime();
  const diff = Math.max(0, now - ts);
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) return "just now";
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  const d = Math.floor(diff / day);
  return `${d}d ago`;
};

const mapCompletionAccent = (completion: number): "default" | "success" | "warning" | "danger" => {
  if (completion >= 80) return "success";
  if (completion >= 50) return "warning";
  return "default";
};

export const mapBundleToProfileLayout = (bundle: ProfileBundle): ProfileLayoutProps => {
  const s: ProfileSnapshot = bundle.profile;
  const first = s.identity.personalInfo?.firstName ?? "";
  const last = s.identity.personalInfo?.lastName ?? "";
  const fullName = `${first} ${last}`.trim() || s.identity.handle;
  const campusName = campusNameFor(s.identity.campusId);

  return {
    header: {
      fullName,
      handle: s.identity.handle,
      pronouns: s.identity.personalInfo?.pronouns,
      bio: s.identity.personalInfo?.bio,
      campus: campusName,
      userType: s.identity.userType,
      photoUrl: s.identity.personalInfo?.photoUrl,
      tags: s.identity.interests?.map((i) => i.label) ?? []
    },
    stats: [
      {
        label: "Profile completion",
        value: `${Math.round(s.stats.completion)}%`,
        helperText: s.stats.completion >= 80 ? "Nice — looking solid" : "Add a few details to improve",
        accent: mapCompletionAccent(s.stats.completion)
      },
      { label: "Connections", value: String(bundle.connections.accepted.length) },
      { label: "Spaces", value: String(s.stats.spacesJoined) },
      { label: "Posts", value: String(s.stats.postsAuthored) }
    ],
    activity: (bundle.activity.entries ?? []).map((e) => ({
      id: e.id,
      type: (e.type === "space_joined" || e.type === "badge_earned" || e.type === "tool_published" || e.type === "connection_made"
        ? e.type
        : "custom") as ActivityType,
      occurredAt: timeAgo(e.occurredAt),
      description: e.description,
      metadata: e.metadata ? JSON.stringify(e.metadata) : undefined
    })),
    connections: (bundle.connections.accepted ?? []).map((c) => ({
      id: c.summary.profileId,
      name: c.summary.displayName ?? c.summary.handle,
      handle: `@${c.summary.handle}`,
      mutualSpaces: c.summary.mutualSpaces ?? 0,
      mutualConnections: c.summary.mutualConnections ?? 0,
      lastActive: timeAgo(c.summary.lastActiveAt ?? null),
      avatarUrl: c.summary.avatarUrl
    })),
    recommendations: (bundle.recommendations.spaces ?? []).map((r, i) => ({
      id: r.spaceId ?? `rec-${i}`,
      name: r.name,
      reason: r.reason,
      joinUrl: r.joinUrl,
      memberCount: r.memberCount,
      signal: "interest_match"
    })),
    spaces: {
      explore: (bundle.recommendations.spaces ?? []).map((r, i) => ({
        id: r.spaceId ?? `explore-${i}`,
        name: r.name,
        description: r.reason,
        memberCount: r.memberCount,
        joinUrl: r.joinUrl
      })),
      mine: []
    },
    visibility: s.privacy.visibility,
    ghostMode: s.presence.isGhostMode
  };
};
