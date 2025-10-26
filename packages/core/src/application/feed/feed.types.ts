// Bounded Context Owner: Engagement Guild
import type { SpacePostSnapshot } from "../../domain/spaces/aggregates/space-post.aggregate";

export type FeedItemType = "space_post";

export interface FeedItemBase {
  readonly id: string;
  readonly type: FeedItemType;
  readonly createdAt: Date;
}

export interface SpacePostFeedItem extends FeedItemBase {
  readonly type: "space_post";
  readonly post: SpacePostSnapshot;
}

export type FeedItem = SpacePostFeedItem; // future: union with other item types

