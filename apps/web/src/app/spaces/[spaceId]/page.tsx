'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import {
  SpaceHeader,
  SpacePostComposer,
  SpaceAboutWidget,
  SpaceToolsWidget,
  type SpaceMembershipState,
} from '@hive/ui';
import { SpaceBoardSkeleton } from '@hive/ui';
import { secureApiFetch } from '@/lib/secure-auth-utils';
import { useFeed } from '@/hooks/use-feed';
import { useSpace } from '@/hooks/use-space';

type ToolListItem = {
  deploymentId: string;
  toolId: string;
  name: string;
  category?: string;
  status: string;
  usageCount?: number;
};

export default function SpaceBoardPage() {
  const router = useRouter();
  const params = useParams<{ spaceId: string }>();
  const spaceId = params.spaceId;

  const { space, isMember, isLeader, joinSpace, leaveSpace, isLoading: spaceLoading } = useSpace(spaceId);

  const {
    posts,
    isLoading: feedLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMore,
    refresh,
    likePost,
    bookmarkPost,
    commentOnPost,
    sharePost,
    createPost,
  } = useFeed({ spaceId, limit: 20, sortBy: 'recent' });

  const [composerOpen, setComposerOpen] = React.useState(false);
  const [tools, setTools] = React.useState<ToolListItem[]>([]);
  const [toolsHasMore, setToolsHasMore] = React.useState(false);
  const [leaders, setLeaders] = React.useState<Array<{ id: string; name: string; avatarUrl?: string; role: string }>>([]);

  // Load tools for right rail (members only)
  React.useEffect(() => {
    const loadTools = async () => {
      if (!spaceId || !isMember) return;
      try {
        const res = await secureApiFetch(`/api/spaces/${spaceId}/tools`);
        if (!res.ok) return;
        const data = await res.json();
        setTools(Array.isArray(data.tools) ? data.tools : []);
        setToolsHasMore(Boolean(data.hasMore));
      } catch {}
    };
    void loadTools();
  }, [spaceId, isMember]);

  // Load leaders (owners/admins)
  React.useEffect(() => {
    const loadLeaders = async () => {
      if (!spaceId || !isMember) return; // leader list visible to members
      try {
        const ownersRes = await secureApiFetch(`/api/spaces/${spaceId}/members?role=owner&limit=5`);
        const adminsRes = await secureApiFetch(`/api/spaces/${spaceId}/members?role=admin&limit=5`);
        const owners = ownersRes.ok ? (await ownersRes.json()).members || [] : [];
        const admins = adminsRes.ok ? (await adminsRes.json()).members || [] : [];
        const list = [...owners, ...admins].map((m: any) => ({ id: m.id, name: m.name, avatarUrl: m.avatar, role: m.role }));
        setLeaders(list);
      } catch {}
    };
    void loadLeaders();
  }, [spaceId, isMember]);

  // Loading skeleton
  if (spaceLoading) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)]">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <SpaceBoardSkeleton />
        </div>
      </div>
    );
  }

  const membershipState: SpaceMembershipState = isMember ? 'joined' : 'not_joined';

  const memberCount = space?.memberCount ?? 0;
  const onlineCount = undefined;
  const iconUrl = (space as any)?.iconUrl || (space as any)?.avatarImage;

  // Build pinned posts (max 3)
  const pinnedPosts = posts
    .filter((p: any) => p.isPinned)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      title: (p.content || '').split('\n')[0] || 'Pinned Post',
      author: p.author?.name || 'Unknown',
      timeAgo: formatDistanceToNow(new Date(p.createdAt), { addSuffix: true }),
    }));

  // Right-rail data mappers
  const aboutData = {
    spaceId: spaceId,
    description: (space?.description || '').trim() || 'Leaders have not added a description yet.',
    memberCount: memberCount,
    leaders,
    isPublic: true,
    isMember,
  };

  const toolsData = {
    spaceId,
    tools: tools.map((t) => ({
      id: t.toolId || t.deploymentId,
      name: t.name,
      type: t.category || 'tool',
      isActive: t.status === 'active',
      responseCount: t.usageCount || 0,
    })),
    hasMore: toolsHasMore,
  };

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Header */}
      <SpaceHeader
        space={{ id: spaceId, name: space?.name || 'Space', iconUrl }}
        memberCount={memberCount}
        onlineCount={onlineCount}
        membershipState={membershipState}
        isLeader={isLeader}
        onJoin={() => joinSpace()}
        onLeave={() => leaveSpace()}
        onSettings={isLeader ? () => router.push(`/spaces/${spaceId}/settings`) : undefined}
        className="border-b border-[var(--hive-border-default)]"
      />

      {/* Content Grid */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_320px]">
        {/* Center Column */}
        <div className="space-y-4">
          {/* Composer trigger */}
          {isMember && (
            <button
              onClick={() => setComposerOpen(true)}
              className="w-full rounded-xl border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-4 py-3 text-left text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
            >
              Share something with the space...
            </button>
          )}

          {/* Pinned posts */}
          {pinnedPosts.length > 0 && (
            <div className="space-y-2">
              <div className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]">
                Pinned Posts
              </div>
              <div className="space-y-2">
                {pinnedPosts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {/* TODO: open post */}}
                    className="group w-full rounded-xl border-l-4 border-[var(--hive-brand-primary)] bg-[color-mix(in_srgb,var(--hive-background-secondary) 96%,transparent)] p-4 text-left hover:bg-[color-mix(in_srgb,var(--hive-background-secondary) 92%,transparent)]"
                  >
                    <div className="text-sm font-semibold text-[var(--hive-text-primary)]">{p.title}</div>
                    <div className="text-xs text-[var(--hive-text-tertiary)]">{p.author} • {p.timeAgo}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feed list */}
          <div className="flex flex-col gap-4">
            {posts.map((post: any) => (
              <div
                key={post.id}
                className="rounded-xl border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-[var(--hive-text-primary)]">
                      {post.author?.name || 'Anonymous'}
                    </div>
                    <div className="text-xs text-[var(--hive-text-tertiary)]">
                      {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-[var(--hive-text-primary)] whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            ))}

            {/* Load more */}
            {hasMore && (
              <button
                disabled={isLoadingMore}
                onClick={loadMore}
                className="rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-4 py-2 text-sm text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
              >
                {isLoadingMore ? 'Loading…' : 'Load more posts'}
              </button>
            )}

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
                <button onClick={refresh} className="ml-3 underline">Retry</button>
              </div>
            )}
          </div>
        </div>

        {/* Right Rail */}
        <div className="hidden lg:block space-y-4">
          <SpaceAboutWidget data={aboutData} onJoin={() => joinSpace()} onLeave={() => leaveSpace()} />
          <SpaceToolsWidget
            data={toolsData}
            onToolClick={(toolId) => router.push(`/tools/${toolId}`)}
            onViewAll={() => router.push(`/spaces/${spaceId}/tools`)}
          />
        </div>
      </div>

      {/* Composer Modal */}
      {isMember && (
        <SpacePostComposer
          spaceId={spaceId}
          spaceName={space?.name || 'Space'}
          spaceIcon={iconUrl}
          open={composerOpen}
          onOpenChange={setComposerOpen}
          onSubmit={async ({ content, media }) => {
            try {
              await createPost({ content, type: 'text', visibility: 'space', spaceId, attachments: media });
              setComposerOpen(false);
            } catch {}
          }}
        />
      )}
    </div>
  );
}
