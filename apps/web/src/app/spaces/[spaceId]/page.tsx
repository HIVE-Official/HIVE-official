// Bounded Context Owner: Community Guild
import { notFound } from "next/navigation";
import { spaceService, serializeSpace } from "../../../server/spaces/service";
import type { SerializedSpace } from "../../../server/spaces/types";
import { Flags } from "../../../server/flags";
import { SpaceDetailClient, type SpaceDetailViewModel } from "../../../components/spaces/SpaceDetailClient";
import { adaptSpacePosts, type SerializedSpacePost } from "../../../components/spaces/post-adapter";
import { SpaceDetailApiSchema } from "../../../components/spaces/space-schemas";

const viewerId = "profile-jwrhineh";
const campusId = "ub-buffalo";

const mapSerializedSpaceToDetail = (payload: unknown): SpaceDetailViewModel => {
  const p = SpaceDetailApiSchema.parse(payload);
  return {
    id: p.id,
    name: p.name,
    description: p.description,
    type: p.type,
    visibility: p.visibility,
    tags: p.tags,
    leaderId: p.leaderId,
    memberCount: p.memberCount,
    members: p.members.map((member) => ({
      profileId: member.profileId,
      role: member.role,
      joinedAt: member.joinedAt,
      presence: {
        status: member.presence.status,
        lastActive: member.presence.lastActive
      }
    })),
    membership: p.membership,
    tagline: p.tagline,
    accentIcon: p.accentIcon,
    pattern: p.pattern,
    onlineNow: p.onlineNow,
    activityScore: p.activityScore,
    urgency: p.urgency,
    helperIds: p.helperIds,
    recentPosts: p.recentPosts,
    upcomingEvents: p.upcomingEvents,
    guidelines: p.guidelines,
    posts: adaptSpacePosts((p.posts as unknown as SerializedSpacePost[])),
    postingPolicy: p.postingPolicy,
    shareToCampusAllowed: p.shareToCampusAllowed ?? false,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  };
};

export default async function SpaceDetailPage({ params }: { params: { spaceId: string } }) {
  const snapshot = await spaceService.getSpaceById(params.spaceId);

  if (!snapshot) {
    notFound();
  }

  const serialized: SerializedSpace = await serializeSpace(snapshot, viewerId, {
    includeMembers: true,
    includeMeta: true,
    includePosts: true,
    includeTools: true
  });
  const detail = mapSerializedSpaceToDetail(serialized);
  const useSheetDetail = Flags.navDetailSheet();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <SpaceDetailClient viewerId={viewerId} campusId={campusId} initialSpace={detail} useSheetDetail={useSheetDetail} />
    </div>
  );
}
