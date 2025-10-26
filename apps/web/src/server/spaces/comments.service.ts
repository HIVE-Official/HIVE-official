// Bounded Context Owner: Community Guild
// Lightweight in-memory comments service for dev/demo usage.

export interface SpacePostComment {
  readonly id: string;
  readonly spaceId: string;
  readonly postId: string;
  readonly authorId: string;
  readonly authorName: string;
  readonly authorHandle: string;
  readonly content: string;
  readonly createdAt: Date;
}

const store = new Map<string, SpacePostComment[]>(); // key: `${spaceId}:${postId}`

const keyOf = (spaceId: string, postId: string) => `${spaceId}:${postId}`;

export const commentsService = {
  async list(spaceId: string, postId: string, limit = 50, cursor?: string) {
    const key = keyOf(spaceId, postId);
    const all = store.get(key) ?? [];
    const startIndex = cursor ? all.findIndex((c) => c.id === cursor) + 1 : 0;
    const slice = all.slice(startIndex, startIndex + limit);
    const nextCursor = slice.length === limit ? slice[slice.length - 1].id : null;
    return { items: slice, nextCursor } as const;
  },
  async add(input: {
    spaceId: string;
    postId: string;
    authorId: string;
    authorName: string;
    authorHandle: string;
    content: string;
  }) {
    const now = new Date();
    const comment: SpacePostComment = {
      id: `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
      spaceId: input.spaceId,
      postId: input.postId,
      authorId: input.authorId,
      authorName: input.authorName,
      authorHandle: input.authorHandle,
      content: input.content,
      createdAt: now
    };
    const key = keyOf(input.spaceId, input.postId);
    const list = store.get(key) ?? [];
    store.set(key, [comment, ...list]);
    return comment;
  }
};

