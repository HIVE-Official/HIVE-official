// Bounded Context Owner: Community Guild
import { notFound } from "next/navigation";
import { spaceService, serializeSpace } from "../../../../server/spaces/service";
import type { SerializedSpaceMember } from "../../../../server/spaces/types";
import { type Space as UiSpace, type SpaceMember } from "@hive/ui/server";
import { AboutClient } from "./AboutClient";

const viewerId = "profile-jwrhineh";

const mapTypeToUi = (type: string): UiSpace["type"] => {
  switch (type) {
    case "student_organization":
      return "student_org";
    case "university_organization":
      return "university_org";
    case "greek_life":
      return "greek";
    case "residential":
      return "residential";
    default:
      return "student_org";
  }
};

const mapVisibilityToUi = (visibility: string): UiSpace["visibility"] => {
  // UI model supports public or members_only; map campus/private to members_only
  return visibility === "public" ? "public" : "members_only";
};

export default async function SpaceAboutPage({ params }: { params: { spaceId: string } }) {
  const snapshot = await spaceService.getSpaceById(params.spaceId);
  if (!snapshot) {
    notFound();
  }

  const payload = await serializeSpace(snapshot, viewerId, {
    includeMembers: true,
    includeMeta: true
  });

  const postingPolicy = (payload.postingPolicy === "leaders_only" ? "leaders_only" : "members");
  const allowPublicPosts = Boolean(payload.shareToCampusAllowed);

  const space: UiSpace = {
    id: payload.id,
    campusId: payload.campusId,
    name: payload.name ?? "Untitled",
    description: payload.description ?? "",
    type: mapTypeToUi(payload.type),
    source: "manual",
    visibility: mapVisibilityToUi(payload.visibility),
    joinPolicy: "open",
    postingPolicy,
    allowPublicPosts,
    tags: Array.isArray(payload.tags) ? payload.tags.filter((t): t is string => typeof t === "string") : [],
    featuredLinks: (() => {
      const settings = payload.settings as { featuredLinks?: Array<Record<string, unknown>> } | undefined;
      const linksRaw = settings?.featuredLinks;
      const links = Array.isArray(linksRaw) ? linksRaw : [];
      return links.map((link) => ({
        label: typeof link.label === "string" ? link.label : "Resource",
        url: typeof link.url === "string" ? link.url : "#",
        iconName: typeof link.iconName === "string" ? link.iconName : undefined
      }));
    })(),
    memberCount: typeof payload.memberCount === "number" ? payload.memberCount : 0,
    activeMembers7d: 0,
    isVerified: false,
    accentColor: typeof payload.pattern === "string" ? payload.pattern : undefined,
    createdAt: new Date(payload.createdAt),
    updatedAt: new Date(payload.updatedAt)
  };

  const membership = payload.membership as { role?: string } | null;
  const viewerRole = typeof membership?.role === "string" ? membership.role : null;

  const memberList: SerializedSpaceMember[] = Array.isArray(payload.members)
    ? (payload.members as unknown as SerializedSpaceMember[])
    : [];
  const leaders: SpaceMember[] = memberList
    .filter((m) => m.role === "leader" || m.role === "admin")
    .map((m) => ({
      userId: String(m.profileId),
      spaceId: payload.id,
      role: "leader" as const,
      joinedAt: new Date(String(m.joinedAt)),
      fullName: String(m.profileId),
      handle: String(m.profileId),
      avatarUrl: undefined
    }));

  const helperIds: string[] = Array.isArray(payload.helperIds) ? payload.helperIds as string[] : [];
  const guidelines: string[] = Array.isArray(payload.guidelines) ? payload.guidelines as string[] : [];

  return (
    <AboutClient
      space={space}
      leaders={leaders}
      viewerRole={viewerRole}
      helperIds={helperIds}
      guidelines={guidelines}
      postingPolicy={postingPolicy}
      allowPublicPosts={allowPublicPosts}
    />
  );
}
