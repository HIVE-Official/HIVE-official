// Bounded Context Owner: Community Guild
import { notFound } from "next/navigation";
import { spaceService, getSpacePostById, serializePost } from "../../../../../server/spaces/service";
import { Flags } from "../../../../../server/flags";
import { PostDetailClient } from "./PostDetailClient";


export default async function PostDetailPage({ params }: { params: { spaceId: string; postId: string } }) {
  const space = await spaceService.getSpaceById(params.spaceId);
  if (!space) notFound();

  const aggregate = await getSpacePostById(params.spaceId, params.postId);
  if (!aggregate) notFound();

  const serialized = serializePost(aggregate.toSnapshot());
  const authorHandle = String(serialized.authorHandle ?? "");
  const postAuthorName = authorHandle.startsWith("@") ? authorHandle.slice(1) : authorHandle || String(serialized.authorId ?? "");
  const totalCount = Number(serialized.commentCount ?? 0);

  const useSheet = Flags.navDetailSheet();

  return (
    <PostDetailClient
      postId={params.postId}
      postAuthorName={postAuthorName}
      totalCount={totalCount}
      useSheet={useSheet}
    />
  );
}

export const dynamic = "force-dynamic";
