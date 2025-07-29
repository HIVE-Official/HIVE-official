"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useRef } from "react";
import { useInfiniteQuery, useMutation, useQueryClient, } from "@tanstack/react-query";
import { Card, CardContent } from "../ui/card";
import { Button } from "../../atomic/atoms/button-enhanced";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { FeedComposer } from "./feed-composer";
import { PostCard } from "./post-card";
import { cn } from "../../lib/utils";
export const SpaceFeed = ({ spaceId, currentUser, className,
// posts: _posts = [], // Not currently used - relying on API fetch instead
 }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const queryClient = useQueryClient();
    const observerRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Fetch posts with infinite scroll
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
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
            return response.json();
        },
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.lastPostId : undefined,
        initialPageParam: "",
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchInterval: 60 * 1000, // Refetch every minute for live updates
    });
    // Infinite scroll observer
    const lastPostRef = useCallback((node) => {
        if (isFetchingNextPage)
            return;
        if (observerRef.current)
            observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                void fetchNextPage();
            }
        });
        if (node)
            observerRef.current.observe(node);
    }, [isFetchingNextPage, fetchNextPage, hasNextPage]);
    // React to post mutation
    const reactMutation = useMutation({
        mutationFn: async ({ postId, reaction, action, }) => {
            const response = await fetch(`/api/spaces/${spaceId}/posts/${postId}/react`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reaction, action }),
            });
            if (!response.ok) {
                throw new Error("Failed to react to post");
            }
            return response.json();
        },
        onSuccess: (data, variables) => {
            // Optimistically update the cache
            queryClient.setQueryData(["space-feed", spaceId], (oldData) => {
                if (!oldData)
                    return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        posts: page.posts.map((post) => {
                            if (post.id === variables.postId) {
                                const newReactedUsers = [...(post.reactedUsers?.heart || [])];
                                if (variables.action === "add" &&
                                    !newReactedUsers.includes(currentUser.id)) {
                                    newReactedUsers.push(currentUser.id);
                                }
                                else if (variables.action === "remove") {
                                    const index = newReactedUsers.indexOf(currentUser.id);
                                    if (index > -1)
                                        newReactedUsers.splice(index, 1);
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
            });
        },
    });
    // Delete post mutation
    const deleteMutation = useMutation({
        mutationFn: async (postId) => {
            const response = await fetch(`/api/spaces/${spaceId}/posts/${postId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete post");
            }
            return response.json();
        },
        onSuccess: (data, postId) => {
            // Update the cache to mark post as deleted
            queryClient.setQueryData(["space-feed", spaceId], (oldData) => {
                if (!oldData)
                    return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
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
            });
        },
    });
    // Pin post mutation
    const pinMutation = useMutation({
        mutationFn: async ({ postId, pin }) => {
            const response = await fetch(`/api/spaces/${spaceId}/posts/${postId}/moderate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: pin ? "pin" : "unpin",
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to pin post");
            }
            return response.json();
        },
        onSuccess: () => {
            // Refetch to get updated order (pinned posts go to top)
            void refetch();
        },
    });
    // Flag post mutation
    const flagMutation = useMutation({
        mutationFn: async ({ postId, reason, }) => {
            const response = await fetch(`/api/spaces/${spaceId}/posts/${postId}/moderate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    action: "flag",
                    reason,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to flag post");
            }
            return response.json();
        },
        onSuccess: () => {
            void refetch();
        },
    });
    const handlePostCreated = (newPost) => {
        // Add new post to the top of the feed
        queryClient.setQueryData(["space-feed", spaceId], (oldData) => {
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
        });
    };
    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await refetch();
        }
        finally {
            setIsRefreshing(false);
        }
    };
    const allPosts = data?.pages.flatMap((page) => page.posts) || [];
    const fetchMorePosts = useCallback(async () => {
        try {
            // Fetch logic with proper typing
            const response = await fetch(`/api/spaces/${spaceId}/posts`);
            const data = (await response.json());
            return {
                hasMore: data.hasMore || false,
                lastPostId: data.lastPostId || "",
            };
        }
        catch (error) {
            console.error("Error fetching posts:", error);
            return { hasMore: false, lastPostId: "" };
        }
    }, [spaceId]);
    const handleLoadMore = useCallback(async () => {
        setIsLoading(true);
        try {
            await fetchMorePosts();
        }
        catch (error) {
            console.error("Error loading more posts:", error);
            setError("Failed to load more posts");
        }
        finally {
            setIsLoading(false);
        }
    }, [fetchMorePosts]);
    // Removed unused handlers and memoized posts
    if (isLoading) {
        return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsx(FeedComposer, { spaceId: spaceId, currentUser: currentUser, onPostCreated: handlePostCreated }), _jsx("div", { className: "flex items-center justify-center py-8", children: _jsx(Loader2, { className: "h-6 w-6 animate-spin" }) })] }));
    }
    if (error) {
        return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsx(FeedComposer, { spaceId: spaceId, currentUser: currentUser, onPostCreated: handlePostCreated }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(AlertCircle, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "Failed to load posts" }), _jsx("p", { className: "text-muted-foreground mb-4", children: error || "Something went wrong" }), _jsx(Button, { onClick: () => void handleRefresh(), disabled: isRefreshing, children: isRefreshing ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Retrying..."] })) : (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Try Again"] })) })] }) })] }));
    }
    return (_jsxs("div", { className: cn("space-y-4", className), children: [_jsx(FeedComposer, { spaceId: spaceId, currentUser: currentUser, onPostCreated: handlePostCreated }), _jsx("div", { className: "flex justify-center", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: () => void handleRefresh(), disabled: isRefreshing, className: "gap-2", children: [_jsx(RefreshCw, { className: cn("h-4 w-4", isRefreshing && "animate-spin") }), isRefreshing ? "Refreshing..." : "Refresh"] }) }), allPosts.length === 0 ? (_jsx(Card, { children: _jsx(CardContent, { className: "p-8 text-center", children: _jsxs("div", { className: "text-muted-foreground", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "No posts yet" }), _jsx("p", { children: "Be the first to share something in this space!" })] }) }) })) : (_jsxs("div", { className: "space-y-4", children: [allPosts.map((post, index) => (_jsx("div", { ref: index === allPosts.length - 1 ? lastPostRef : undefined, children: _jsx(PostCard, { post: post, currentUser: currentUser, onReact: async (postId, reaction, action) => {
                                return new Promise((resolve, reject) => {
                                    reactMutation.mutate({ postId, reaction, action }, {
                                        onSuccess: () => resolve(),
                                        onError: (error) => reject(error),
                                    });
                                });
                            }, onDelete: async (postId) => {
                                return new Promise((resolve, reject) => {
                                    deleteMutation.mutate(postId, {
                                        onSuccess: () => resolve(),
                                        onError: (error) => reject(error),
                                    });
                                });
                            }, onPin: async (postId, pin) => {
                                return new Promise((resolve, reject) => {
                                    pinMutation.mutate({ postId, pin }, {
                                        onSuccess: () => resolve(),
                                        onError: (error) => reject(error),
                                    });
                                });
                            }, onFlag: async (postId, reason) => {
                                return new Promise((resolve, reject) => {
                                    flagMutation.mutate({ postId, reason: reason || "Inappropriate content" }, {
                                        onSuccess: () => resolve(),
                                        onError: (error) => reject(error),
                                    });
                                });
                            } }) }, post.id))), isFetchingNextPage && (_jsx("div", { className: "flex items-center justify-center py-4", children: _jsx(Loader2, { className: "h-5 w-5 animate-spin" }) })), !hasNextPage && allPosts.length > 0 && (_jsx("div", { className: "text-center py-4 text-sm text-muted-foreground", children: "You've reached the end of the feed" }))] })), _jsx(Button, { onClick: () => void handleLoadMore(), disabled: isLoading, className: "w-full", children: "Load More Posts" })] }));
};
//# sourceMappingURL=space-feed.js.map