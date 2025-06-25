"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { FeedComposer } from "./feed-composer";
import { PostCard } from "./post-card";
import { cn } from "../../lib/utils";
import type { Post } from "@hive/core";
import { logger } from "@hive/core";

interface FeedUser {
  id: string;
  fullName: string;
  handle: string;
  photoURL?: string;
  role?: "member" | "builder" | "admin";
}

interface FeedPost extends Post {
  author: FeedUser;
}

interface SpaceFeedProps {
  spaceId: string;
  currentUser: FeedUser;
  className?: string;
  posts?: FeedPost[];
}

interface FeedResponse {
  posts: FeedPost[];
  hasMore: boolean;
  lastPostId: string | null;
}

interface InfiniteQueryData {
  pages: FeedResponse[];
  pageParams: (string | undefined)[];
}

interface ReactResponse {
  success: boolean;
  reactions?: {
    heart: number;
  };
}

interface DeleteResponse {
  success: boolean;
}

interface ModerateResponse {
  success: boolean;
}

export const SpaceFeed: React.FC<SpaceFeedProps> = ({
  spaceId,
  currentUser,
  className,
  // posts: _posts = [], // Not currently used - relying on API fetch instead
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const observerRef = useRef<IntersectionObserver>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts with infinite scroll
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["space-feed", spaceId],
      queryFn: async ({ pageParam = "" }) => {
        const params = new URLSearchParams({
          limit: "20",
        });

        if (pageParam) {
          params.append("lastPostId", pageParam);
        }

        const response = await fetch(`/api/spaces/${spaceId}/feed?${params}`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json() as Promise<FeedResponse>;
      },
      getNextPageParam: (lastPage: FeedResponse) =>
        lastPage.hasMore ? lastPage.lastPostId : undefined,
      initialPageParam: "",
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 60 * 1000, // Refetch every minute for live updates
    });

  // Infinite scroll observer
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          void fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  // React to post mutation
  const reactMutation = useMutation({
    mutationFn: async ({
      postId,
      reaction,
      action,
    }: {
      postId: string;
      reaction: "heart";
      action: "add" | "remove";
    }) => {
      const response = await fetch(
        `/api/spaces/${spaceId}/posts/${postId}/react`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reaction, action }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to react to post");
      }

      return response.json() as Promise<ReactResponse>;
    },
    onSuccess: (data, variables) => {
      // Optimistically update the cache
      queryClient.setQueryData(
        ["space-feed", spaceId],
        (oldData: InfiniteQueryData | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: FeedResponse) => ({
              ...page,
              posts: page.posts.map((post) => {
                if (post.id === variables.postId) {
                  const newReactedUsers = [...(post.reactedUsers?.heart || [])];

                  if (
                    variables.action === "add" &&
                    !newReactedUsers.includes(currentUser.id)
                  ) {
                    newReactedUsers.push(currentUser.id);
                  } else if (variables.action === "remove") {
                    const index = newReactedUsers.indexOf(currentUser.id);
                    if (index > -1) newReactedUsers.splice(index, 1);
                  }

                  return {
                    ...post,
                    reactions: {
                      ...post.reactions,
                      heart: newReactedUsers.length,
                    },
                    reactedUsers: {
                      ...post.reactedUsers,
                      heart: newReactedUsers,
                    },
                  };
                }
                return post;
              }),
            })),
          };
        }
      );
    },
  });

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/spaces/${spaceId}/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      return response.json() as Promise<DeleteResponse>;
    },
    onSuccess: (data, postId) => {
      // Update the cache to mark post as deleted
      queryClient.setQueryData(
        ["space-feed", spaceId],
        (oldData: InfiniteQueryData | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: FeedResponse) => ({
              ...page,
              posts: page.posts.map((post) => {
                if (post.id === postId) {
                  return {
                    ...post,
                    isDeleted: true,
                    content: `Post removed by ${currentUser.fullName}`,
                  };
                }
                return post;
              }),
            })),
          };
        }
      );
    },
  });

  // Pin post mutation
  const pinMutation = useMutation({
    mutationFn: async ({ postId, pin }: { postId: string; pin: boolean }) => {
      const response = await fetch(
        `/api/spaces/${spaceId}/posts/${postId}/moderate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: pin ? "pin" : "unpin",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to pin post");
      }

      return response.json() as Promise<ModerateResponse>;
    },
    onSuccess: () => {
      // Refetch to get updated order (pinned posts go to top)
      void refetch();
    },
  });

  // Flag post mutation
  const flagMutation = useMutation({
    mutationFn: async ({
      postId,
      reason,
    }: {
      postId: string;
      reason: string;
    }) => {
      const response = await fetch(
        `/api/spaces/${spaceId}/posts/${postId}/moderate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "flag",
            reason,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to flag post");
      }

      return response.json() as Promise<ModerateResponse>;
    },
    onSuccess: () => {
      void refetch();
    },
  });

  const handlePostCreated = (newPost: FeedPost) => {
    // Add new post to the top of the feed
    queryClient.setQueryData(
      ["space-feed", spaceId],
      (oldData: InfiniteQueryData | undefined) => {
        if (!oldData)
          return {
            pages: [{ posts: [newPost], hasMore: false, lastPostId: null }],
            pageParams: [undefined],
          };

        const firstPage = oldData.pages[0];
        return {
          ...oldData,
          pages: [
            {
              ...firstPage,
              posts: [newPost, ...firstPage.posts],
            },
            ...oldData.pages.slice(1),
          ],
        };
      }
    );
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const allPosts =
    data?.pages.flatMap((page: FeedResponse) => page.posts) || [];

  const fetchMorePosts = useCallback(async (): Promise<{
    hasMore: boolean;
    lastPostId: string;
  }> => {
    try {
      // Fetch logic with proper typing
      const response = await fetch(`/api/spaces/${spaceId}/posts`);
      const data = (await response.json()) as FeedResponse;

      return {
        hasMore: data.hasMore || false,
        lastPostId: data.lastPostId || "",
      };
    } catch (error) {
      logger.error("Failed to fetch posts:", error);
      return { hasMore: false, lastPostId: "" };
    }
  }, [spaceId]);

  const handleLoadMore = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchMorePosts();
    } catch (error) {
      logger.error("Failed to load more feed items:", error);
      setError("Failed to load more posts");
    } finally {
      setIsLoading(false);
    }
  }, [fetchMorePosts]);

  // Removed unused handlers and memoized posts

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <FeedComposer
          spaceId={spaceId}
          currentUser={currentUser}
          onPostCreated={handlePostCreated}
        />
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("space-y-4", className)}>
        <FeedComposer
          spaceId={spaceId}
          currentUser={currentUser}
          onPostCreated={handlePostCreated}
        />
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Failed to load posts</h3>
            <p className="text-muted-foreground mb-4">
              {error || "Something went wrong"}
            </p>
            <Button
              onClick={() => void handleRefresh()}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Composer */}
      <FeedComposer
        spaceId={spaceId}
        currentUser={currentUser}
        onPostCreated={handlePostCreated}
      />

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => void handleRefresh()}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw
            className={cn("h-4 w-4", isRefreshing && "animate-spin")}
          />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Posts */}
      {allPosts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p>Be the first to share something in this space!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {allPosts.map((post, index) => (
            <div
              key={post.id}
              ref={index === allPosts.length - 1 ? lastPostRef : undefined}
            >
              <PostCard
                post={post}
                currentUser={currentUser}
                onReact={async (postId, reaction, action) => {
                  return new Promise<void>((resolve, reject) => {
                    reactMutation.mutate(
                      { postId, reaction, action },
                      {
                        onSuccess: () => resolve(),
                        onError: (error) => reject(error),
                      }
                    );
                  });
                }}
                onDelete={async (postId) => {
                  return new Promise<void>((resolve, reject) => {
                    deleteMutation.mutate(postId, {
                      onSuccess: () => resolve(),
                      onError: (error) => reject(error),
                    });
                  });
                }}
                onPin={async (postId, pin) => {
                  return new Promise<void>((resolve, reject) => {
                    pinMutation.mutate(
                      { postId, pin },
                      {
                        onSuccess: () => resolve(),
                        onError: (error) => reject(error),
                      }
                    );
                  });
                }}
                onFlag={async (postId, reason) => {
                  return new Promise<void>((resolve, reject) => {
                    flagMutation.mutate(
                      { postId, reason: reason || "Inappropriate content" },
                      {
                        onSuccess: () => resolve(),
                        onError: (error) => reject(error),
                      }
                    );
                  });
                }}
              />
            </div>
          ))}

          {/* Loading indicator for infinite scroll */}
          {isFetchingNextPage && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}

          {/* End of feed indicator */}
          {!hasNextPage && allPosts.length > 0 && (
            <div className="text-center py-4 text-sm text-muted-foreground">
              You&apos;ve reached the end of the feed
            </div>
          )}
        </div>
      )}

      <Button
        onClick={() => void handleLoadMore()}
        disabled={isLoading}
        className="w-full"
      >
        Load More Posts
      </Button>
    </div>
  );
};
