// Bounded Context Owner: Governance Guild
import {
  spaceService,
  serializeSpace,
  getSpaceCalendar,
  type SpaceCalendarPayload,
} from "../../../web/src/server/spaces/service";
import type { SpaceSnapshot } from "@core";
import type { SpacePostSerialized, SerializedSpace } from "../../../web/src/server/spaces/types";

export interface AdminSpaceContext {
  readonly snapshot: SpaceSnapshot;
  readonly serialized: SerializedSpace;
  readonly posts: readonly SpacePostSerialized[];
  readonly calendar: SpaceCalendarPayload;
}

export async function loadAdminSpaceContext(spaceId: string): Promise<AdminSpaceContext | null> {
  const spaceAggregate = await spaceService.getSpaceById(spaceId);
  if (!spaceAggregate) {
    return null;
  }

  const baseSnapshot = spaceAggregate;

  const [serialized, calendar] = await Promise.all([
    serializeSpace(baseSnapshot, undefined, {
      includeMeta: true,
      includeMembers: true,
      includePosts: true
    }),
    getSpaceCalendar(spaceId)
  ]);

  const posts = Array.isArray((serialized as any).posts)
    ? ((serialized as any).posts as SpacePostSerialized[])
    : [];

  return {
    snapshot: baseSnapshot,
    serialized,
    posts,
    calendar
  };
}
