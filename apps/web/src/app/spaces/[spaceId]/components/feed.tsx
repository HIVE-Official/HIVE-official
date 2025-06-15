'use client';

import { useQuery } from '@tanstack/react-query';
import { type Post } from '@hive/core/src/domain/firestore/post';
import { PostCard } from '@hive/ui/src/components/post-card';
import { useAuth } from '@hive/hooks';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

async function fetchFeed(spaceId: string): Promise<Post[]> {
  const response = await fetch(`/api/spaces/${spaceId}/feed`);
  if (!response.ok) {
    throw new Error('Failed to fetch feed');
  }
  return response.json();
}

interface FeedProps {
  spaceId: string;
}

export function Feed({ spaceId }: FeedProps) {
  const { user } = useAuth();
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['feed', spaceId],
    queryFn: () => fetchFeed(spaceId),
    enabled: !!spaceId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Could not load the feed. Please try again later.</p>;
  }

  return (
    <div className="space-y-4">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Link href={`/u/${post.author.name}`} key={post.id} className="block">
            <PostCard
              post={post}
              currentUserId={user?.uid}
              authorProfileUrl={`/u/${post.author.name}`}
            />
          </Link>
        ))
      ) : (
        <div className="py-12 text-center text-neutral-500">
          <h3 className="text-lg font-semibold text-white">Be the first to post!</h3>
          <p>This space is quiet... for now. Start the conversation.</p>
        </div>
      )}
    </div>
  );
} 