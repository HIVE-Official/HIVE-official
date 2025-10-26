// Simple in-memory data for the E2E sandbox. Resets on server restart.
// Minimal summary type used by list/recommended
export type Space = { id: string; name: string; description: string };

// Full Space types aligned with @hive/ui organisms (simplified for E2E)
export type SpaceFull = {
  space: {
    id: string;
    campusId: string;
    name: string;
    description: string;
    type: "student_org" | "university_org" | "greek" | "residential";
    source: "manual" | "rss_imported";
    isVerified: boolean;
    visibility: "public" | "members_only";
    joinPolicy: "open" | "request" | "invite_only";
    postingPolicy: "members" | "leaders_only";
    allowPublicPosts: boolean;
    tags: string[];
    featuredLinks: { label: string; url: string }[];
    memberCount: number;
    activeMembers7d: number;
    createdAt: Date;
    updatedAt: Date;
  };
  posts: Array<
    | ({
        id: string;
        spaceId: string;
        type: "standard";
        visibility: "public" | "members_only";
        authorId: string;
        authorName: string;
        authorHandle: string;
        authorAvatar?: string;
        authorRole: "member" | "moderator" | "leader" | "follower";
        isPinned: boolean;
        pinnedUntil?: Date;
        isHidden: boolean;
        reportCount: number;
        commentCount: number;
        reactionCount: number;
        createdAt: Date;
        updatedAt: Date;
        lastActivityAt: Date;
        attachments?: Array<{ id?: string; type: "image" | "file" | "link" | "video"; url: string; title?: string }>;
      } & { content: string; mediaUrls?: string[] })
    | ({
        id: string;
        spaceId: string;
        type: "event";
        visibility: "public" | "members_only";
        authorId: string;
        authorName: string;
        authorHandle: string;
        authorAvatar?: string;
        authorRole: "member" | "moderator" | "leader" | "follower";
        isPinned: boolean;
        pinnedUntil?: Date;
        isHidden: boolean;
        reportCount: number;
        commentCount: number;
        reactionCount: number;
        createdAt: Date;
        updatedAt: Date;
        lastActivityAt: Date;
        attachments?: Array<{ id?: string; type: "image" | "file" | "link" | "video"; url: string; title?: string }>;
      } & {
        title: string;
        description: string;
        location: string;
        startTime: Date;
        endTime: Date;
        coverImageUrl?: string;
        coverImageAlt?: string;
        maxAttendees?: number;
        enableWaitlist: boolean;
        checkInEnabled: boolean;
        checkInWindowBefore?: number;
        checkInWindowAfter?: number;
        qrCodeEnabled?: boolean;
        coHostIds: string[];
        state: "upcoming" | "active" | "ended";
        goingCount: number;
        maybeCount: number;
        waitlistCount: number;
        checkedInCount: number;
        userRsvp?: "going" | "maybe" | "not_going" | "waitlist";
      })
    | ({
        id: string;
        spaceId: string;
        type: "announcement";
        visibility: "public" | "members_only";
        authorId: string;
        authorName: string;
        authorHandle: string;
        authorAvatar?: string;
        authorRole: "member" | "moderator" | "leader" | "follower";
        isPinned: boolean;
        pinnedUntil?: Date;
        isHidden: boolean;
        reportCount: number;
        commentCount: number;
        reactionCount: number;
        createdAt: Date;
        updatedAt: Date;
        lastActivityAt: Date;
        attachments?: Array<{ id?: string; type: "image" | "file" | "link" | "video"; url: string; title?: string }>;
      } & { title: string; content?: string; priority?: "high" | "normal"; requiresAcknowledgment?: boolean; acknowledgmentCount?: number })
  >;
  events: Array<{
    id: string;
    spaceId: string;
    title: string;
    description: string;
    location: string;
    startTime: Date;
    endTime: Date;
    coverImageUrl?: string;
    coverImageAlt?: string;
    enableWaitlist: boolean;
    goingCount: number;
    maybeCount: number;
    waitlistCount: number;
    checkInEnabled: boolean;
    checkedInCount: number;
    coHostIds: string[];
    coHostNames: string[];
    isRssImported: boolean;
    postId?: string;
    userRsvp?: "going" | "maybe" | "not_going" | "waitlist";
    createdAt: Date;
    updatedAt: Date;
  }>;
  membersOnline: Array<{
    userId: string;
    spaceId: string;
    role: "member" | "moderator" | "leader" | "follower";
    joinedAt: Date;
    lastActiveAt?: Date;
    fullName: string;
    handle: string;
    avatarUrl?: string;
    graduationYear?: number;
  }>;
  tools: Array<{ id: string; name: string; type: "form" | "tracker" | "poll" | "signup"; status?: "active" | "paused" | "draft"; responseCount?: number; progress?: { current: number; total: number; label?: string }; voteCount?: number; lastRunAt?: Date; }>;
  resources: Array<{ id: string; type: "link" | "file"; title: string; url: string; description?: string; pinnedAt?: Date }>;
};

const SPACES: Space[] = [
  { id: "space-robotics", name: "Robotics Guild", description: "Build autonomous bots, prep for competitions, and share hardware knowledge." },
  { id: "club-film", name: "Film Society", description: "Weekly screenings and post-film discussions." },
  { id: "club-outdoors", name: "Outdoors", description: "Weekend hikes and camping trips." },
  { id: "club-esports", name: "Esports", description: "Scrims, tournaments, and broadcast production." },
  { id: "club-debate", name: "Debate Union", description: "Policy and parliamentary debate practice." }
];

// Track joins and RSVPs per profile in-memory.
const joinsByProfile = new Map<string, Set<string>>();
const rsvpByProfile = new Map<string, Map<string, "going" | "maybe" | "not_going" | "waitlist">>();

// Seed one full space (robotics)
const now = new Date();
const spaceFullById = new Map<string, SpaceFull>([
  [
    "space-robotics",
    {
      space: {
        id: "space-robotics",
        campusId: "ub-buffalo",
        name: "Robotics Guild",
        description: "Build autonomous bots, prep for competitions, and share hardware knowledge.",
        type: "student_org",
        source: "manual",
        isVerified: true,
        visibility: "members_only",
        joinPolicy: "open",
        postingPolicy: "members",
        allowPublicPosts: false,
        tags: ["engineering", "hardware", "ai"],
        featuredLinks: [
          { label: "Resources doc", url: "https://ub.edu/robotics/resources" },
          { label: "Parts request form", url: "https://forms.gle/parts-request" }
        ],
        memberCount: 64,
        activeMembers7d: 38,
        createdAt: new Date(now.getTime() - 7200 * 60 * 1000),
        updatedAt: now
      },
      posts: [
        {
          id: "post-announcement-1",
          spaceId: "space-robotics",
          type: "announcement",
          visibility: "members_only",
          authorId: "profile-jwrhineh",
          authorName: "Jacob Rhinehart",
          authorHandle: "jacob",
          authorRole: "leader",
          authorAvatar: "https://i.pravatar.cc/80?img=45",
          isPinned: true,
          pinnedUntil: new Date(now.getTime() + 720 * 60 * 1000),
          isHidden: false,
          reportCount: 0,
          commentCount: 4,
          reactionCount: 25,
          createdAt: new Date(now.getTime() - 10 * 60 * 1000),
          updatedAt: new Date(now.getTime() - 4 * 60 * 1000),
          lastActivityAt: new Date(now.getTime() - 1 * 60 * 1000),
          title: "Competition transport schedule",
          content: "Bus pulls out Friday 5:30pm sharp. Pack toolboxes tonight—see checklist in Resources.",
          priority: "high",
          requiresAcknowledgment: true,
          acknowledgmentCount: 32,
          attachments: []
        },
        {
          id: "post-event-1",
          spaceId: "space-robotics",
          type: "event",
          visibility: "public",
          authorId: "profile-luca",
          authorName: "Luca Patel",
          authorHandle: "luca",
          authorRole: "leader",
          authorAvatar: "https://i.pravatar.cc/80?img=12",
          isPinned: true,
          pinnedUntil: new Date(now.getTime() + 300 * 60 * 1000),
          isHidden: false,
          reportCount: 0,
          commentCount: 9,
          reactionCount: 42,
          createdAt: new Date(now.getTime() - 90 * 60 * 1000),
          updatedAt: new Date(now.getTime() - 60 * 60 * 1000),
          lastActivityAt: new Date(now.getTime() - 2 * 60 * 1000),
          title: "Drive System Lab Night",
          description: "Bring last week's CAD changes—we're doing hands-on alignment and encoder calibration.",
          location: "Innovation Hub 2F Lab",
          startTime: new Date(now.getTime() + 180 * 60 * 1000),
          endTime: new Date(now.getTime() + 300 * 60 * 1000),
          coverImageUrl: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
          coverImageAlt: "Robotics workshop bench",
          maxAttendees: 25,
          enableWaitlist: true,
          checkInEnabled: true,
          checkInWindowBefore: 15,
          checkInWindowAfter: 30,
          qrCodeEnabled: true,
          coHostIds: ["profile-nia"],
          state: "upcoming",
          goingCount: 18,
          maybeCount: 6,
          waitlistCount: 2,
          checkedInCount: 0,
          attachments: []
        },
        {
          id: "post-standard-1",
          spaceId: "space-robotics",
          type: "standard",
          visibility: "members_only",
          authorId: "profile-jwrhineh",
          authorName: "Jacob Rhinehart",
          authorHandle: "jacob",
          authorRole: "leader",
          authorAvatar: "https://i.pravatar.cc/80?img=44",
          isPinned: false,
          isHidden: false,
          reportCount: 0,
          commentCount: 6,
          reactionCount: 18,
          createdAt: new Date(now.getTime() - 45 * 60 * 1000),
          updatedAt: new Date(now.getTime() - 30 * 60 * 1000),
          lastActivityAt: new Date(now.getTime() - 5 * 60 * 1000),
          content: "Sensor kits staged—pick yours up before 6pm. Drop blockers here so mentors can help tonight.",
          attachments: []
        }
      ],
      events: [
        {
          id: "calendar-event-1",
          spaceId: "space-robotics",
          title: "Drive System Lab Night",
          description: "Hands-on alignment and encoder calibration.",
          location: "Innovation Hub 2F Lab",
          startTime: new Date(now.getTime() + 180 * 60 * 1000),
          endTime: new Date(now.getTime() + 300 * 60 * 1000),
          coverImageUrl: "https://images.unsplash.com/photo-1555617983-7b0f991b0e1b?q=80&w=1600&auto=format&fit=crop",
          coverImageAlt: "Gears and tools on table",
          enableWaitlist: true,
          goingCount: 18,
          maybeCount: 6,
          waitlistCount: 2,
          checkInEnabled: true,
          checkedInCount: 0,
          coHostIds: ["profile-nia"],
          coHostNames: ["Nia Brooks"],
          isRssImported: false,
          createdAt: now,
          updatedAt: now
        }
      ],
      membersOnline: [
        { userId: "profile-jwrhineh", spaceId: "space-robotics", role: "leader", joinedAt: new Date(now.getTime() - 60 * 60 * 1000), lastActiveAt: new Date(now.getTime() - 1 * 60 * 1000), fullName: "Jacob Rhinehart", handle: "jacob" },
        { userId: "profile-luca", spaceId: "space-robotics", role: "moderator", joinedAt: new Date(now.getTime() - 120 * 60 * 1000), lastActiveAt: new Date(now.getTime() - 3 * 60 * 1000), fullName: "Luca Patel", handle: "luca" }
      ],
      tools: [
        { id: "tool-forms-1", name: "Parts Request", type: "form", responseCount: 12, lastRunAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), status: "active" },
        { id: "tool-tracker-1", name: "Build Progress", type: "tracker", progress: { current: 7, total: 10, label: "Subsystems" }, status: "active" },
        { id: "tool-poll-1", name: "Next Workshop Topic", type: "poll", voteCount: 42, status: "paused" }
      ],
      resources: [
        { id: "res-1", type: "link", title: "Resources doc", url: "https://ub.edu/robotics/resources" },
        { id: "res-2", type: "link", title: "Parts request form", url: "https://forms.gle/parts-request" }
      ]
    }
  ]
]);

export function listRecommended(params: { profileId: string; limit?: number }): Space[] {
  const joined = joinsByProfile.get(params.profileId) ?? new Set<string>();
  const unjoined = SPACES.filter((s) => !joined.has(s.id));
  return typeof params.limit === "number" ? unjoined.slice(0, params.limit) : unjoined;
}

/** Return a simple list of joined spaces for the viewer. */
export function listJoined(profileId: string): Space[] {
  const joined = joinsByProfile.get(profileId) ?? new Set<string>();
  return SPACES.filter((s) => joined.has(s.id));
}

/** Map a space id to its type for category sections. Falls back to student_org. */
function typeOf(spaceId: string): SpaceFull["space"]["type"] {
  const full = spaceFullById.get(spaceId);
  if (full) return full.space.type;
  // Provide a simple distribution for demo sections
  if (spaceId.startsWith("club-")) return "student_org";
  if (spaceId.includes("dorm") || spaceId.includes("hall")) return "residential";
  if (spaceId.includes("phi") || spaceId.includes("theta")) return "greek";
  return "student_org";
}

export type SpaceTypeLabel = "Student Organizations" | "University Organizations" | "Residential" | "Greek Life";
export function labelForType(t: SpaceFull["space"]["type"]): SpaceTypeLabel {
  switch (t) {
    case "student_org":
      return "Student Organizations";
    case "university_org":
      return "University Organizations";
    case "residential":
      return "Residential";
    case "greek":
      return "Greek Life";
  }
}

/** Build simple category sections grouped by type for the catalog endpoint. */
export function buildCategorySections(): Array<{ id: SpaceFull["space"]["type"]; title: SpaceTypeLabel; description: string; spaces: Space[] }> {
  const groups = new Map<SpaceFull["space"]["type"], Space[]>();
  for (const s of SPACES) {
    const t = typeOf(s.id);
    const arr = groups.get(t) ?? [];
    arr.push(s);
    groups.set(t, arr);
  }
  const describe = (t: SpaceFull["space"]["type"]) =>
    t === "student_org"
      ? "Clubs, interest groups, and student-led squads."
      : t === "university_org"
      ? "Departments, offices, and programs."
      : t === "residential"
      ? "Dorms, halls, and apartments."
      : "Chapters coordinating philanthropy and member life.";
  return Array.from(groups.entries()).map(([type, spaces]) => ({
    id: type,
    title: labelForType(type),
    description: describe(type),
    spaces
  }));
}

export function getSpace(id: string): Space | undefined {
  return SPACES.find((s) => s.id === id);
}

export function joinSpace(profileId: string, spaceId: string): { ok: boolean } {
  const set = joinsByProfile.get(profileId) ?? new Set<string>();
  set.add(spaceId);
  joinsByProfile.set(profileId, set);
  return { ok: true };
}

export function leaveSpace(profileId: string, spaceId: string): { ok: boolean } {
  const set = joinsByProfile.get(profileId) ?? new Set<string>();
  set.delete(spaceId);
  joinsByProfile.set(profileId, set);
  return { ok: true };
}

export function isMember(profileId: string, spaceId: string): boolean {
  const set = joinsByProfile.get(profileId);
  return set ? set.has(spaceId) : false;
}

// Full-space helpers for e2e rendering
export function getSpaceFull(id: string): SpaceFull | undefined {
  return spaceFullById.get(id);
}

export function listSpacePosts(spaceId: string): SpaceFull["posts"] {
  const data = spaceFullById.get(spaceId);
  if (!data) return [];
  return [...data.posts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function listSpaceEvents(spaceId: string): SpaceFull["events"] {
  const data = spaceFullById.get(spaceId);
  if (!data) return [];
  return [...data.events].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

export function listSpaceMembersOnline(spaceId: string): SpaceFull["membersOnline"] {
  const data = spaceFullById.get(spaceId);
  if (!data) return [];
  return data.membersOnline;
}

export function createStandardPost(params: { spaceId: string; profileId: string; content: string }): { ok: boolean; id: string } {
  const data = spaceFullById.get(params.spaceId);
  if (!data) return { ok: false, id: "" };
  const id = `post-${Date.now()}`;
  const nowTs = new Date();
  data.posts.unshift({
    id,
    spaceId: params.spaceId,
    type: "standard",
    visibility: "members_only",
    authorId: params.profileId,
    authorName: "Demo User",
    authorHandle: "demo",
    authorRole: "member",
    isPinned: false,
    isHidden: false,
    reportCount: 0,
    commentCount: 0,
    reactionCount: 0,
    createdAt: nowTs,
    updatedAt: nowTs,
    lastActivityAt: nowTs,
    content: params.content,
    attachments: []
  });
  return { ok: true, id };
}

export function rsvpEvent(profileId: string, eventId: string, status: "going" | "maybe" | "not_going" | "waitlist"): { ok: boolean } {
  const profileMap = rsvpByProfile.get(profileId) ?? new Map<string, "going" | "maybe" | "not_going" | "waitlist">();
  const prev = profileMap.get(eventId);
  profileMap.set(eventId, status);
  rsvpByProfile.set(profileId, profileMap);

  // Update denormalized userRsvp on events and counts (simplified)
  for (const [, data] of spaceFullById) {
    const ev = data.events.find((e) => e.id === eventId);
    if (ev) {
      ev.userRsvp = status;
      // no-op on counts to keep logic simple in e2e
    }
  }
  return { ok: true };
}
