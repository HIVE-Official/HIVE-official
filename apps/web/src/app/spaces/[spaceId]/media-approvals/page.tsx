// Bounded Context Owner: Community Guild
import { notFound } from "next/navigation";
import { spaceService, serializeSpace } from "../../../../server/spaces/service";
import { MediaApprovalsClient } from "./MediaApprovalsClient";

const viewerId = "profile-jwrhineh";

export default async function MediaApprovalsPage({ params }: { params: { spaceId: string } }) {
  const snapshot = await spaceService.getSpaceById(params.spaceId);
  if (!snapshot) notFound();

  // Ensure viewer can moderate via membership
  const serialized = await serializeSpace(snapshot, viewerId, { includeMembers: true });
  const membership = serialized.membership as { role?: string } | null;
  const role = typeof membership?.role === "string" ? membership.role : null;
  const canModerate = role === "leader" || role === "admin" || role === "moderator";

  if (!canModerate) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">
          You do not have permission to review media in this space.
        </div>
      </div>
    );
  }

  // Fetch pending approvals via API to reuse permission checks consistently
  const res = await fetch(
    `/api/spaces/${params.spaceId}/media-approvals?actorId=${viewerId}`,
    { cache: "no-store" }
  );
  const json: unknown = await res.json().catch(() => ({ success: false }));
  const items = ((): Array<Record<string, unknown>> => {
    if (!res.ok) return [];
    if (typeof json !== "object" || json === null) return [];
    const data = (json as { data?: unknown }).data;
    return Array.isArray(data) ? (data as Array<Record<string, unknown>>) : [];
  })();

  const initialItems = items.map((item) => ({
    id: typeof item.id === "string" ? item.id : "",
    postId: typeof item.postId === "string" ? item.postId : "",
    author: typeof item.requestedBy === "string" ? item.requestedBy : "",
    thumbnailUrl:
      item && typeof item === "object" && typeof (item as any).attachment?.url === "string"
        ? (item as any).attachment.url as string
        : undefined,
    submittedAt: typeof item.requestedAt === "string" ? new Date(item.requestedAt) : new Date()
  }));

  return (
    <MediaApprovalsClient spaceId={params.spaceId} viewerId={viewerId} initialItems={initialItems} />
  );
}

export const dynamic = "force-dynamic";
