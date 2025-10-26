// Bounded Context Owner: Community Guild
import { notFound } from "next/navigation";
import { spaceService, serializeSpace } from "../../../../server/spaces/service";
import type { SpaceMember } from "@hive/ui/server";
import type { SerializedSpaceMember } from "../../../../server/spaces/types";
import { MembersClient } from "./MembersClient";

const viewerId = "profile-jwrhineh";

export default async function SpaceMembersPage({ params }: { params: { spaceId: string } }) {
  const snapshot = await spaceService.getSpaceById(params.spaceId);
  if (!snapshot) notFound();

  const payload = await serializeSpace(snapshot, viewerId, { includeMembers: true });
  const membership = payload.membership as { role?: string } | null;
  const viewerRole: SpaceMember["role"] = membership?.role === "leader" || membership?.role === "moderator"
    ? (membership.role as SpaceMember["role"]) 
    : "member";

  const rawMembers: ReadonlyArray<SerializedSpaceMember> = Array.isArray(payload.members)
    ? (payload.members as ReadonlyArray<SerializedSpaceMember>)
    : [];

  const members: SpaceMember[] = rawMembers.map((m: SerializedSpaceMember) => ({
    userId: String(m.profileId),
    spaceId: payload.id,
    role: (m.role === "leader" || m.role === "moderator" ? m.role : "member") as SpaceMember["role"],
    joinedAt: new Date(String(m.joinedAt)),
    lastActiveAt: new Date(String(m.presence?.lastActive ?? new Date().toISOString())),
    fullName: String(m.profileId),
    handle: String(m.profileId),
    avatarUrl: undefined
  }));

  return (
    <MembersClient members={members} totalCount={members.length} viewerRole={viewerRole} />
  );
}

export const dynamic = "force-dynamic";
