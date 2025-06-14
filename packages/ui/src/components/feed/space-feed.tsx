import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react'
import { FeedComposer } from './feed-composer'
import { PostCard } from './post-card'
import { cn } from '@/lib/utils'
import { Post } from '@hive/core'

interface SpaceFeedProps {
  spaceId: string
  currentUser: {
    id: string
    fullName: string
    handle: string
    photoURL?: string
    role?: 'member' | 'builder' | 'admin'
  }
  className?: string
}

interface FeedResponse {
  posts: (Post & {
    author: {
      id: string
      fullName: string
      handle: string
      photoURL?: string
      role?: 'member' | 'builder' | 'admin'
    }
  })[]
  hasMore: boolean
  lastPostId: string | null
}

export const SpaceFeed: React.FC<SpaceFeedProps> = ({
  spaceId,
  currentUser,
  className,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const queryClient = useQueryClient()
  const observerRef = useRef<IntersectionObserver>()
  const lastPostElementRef = useRef<HTMLDivElement>()
  
  // Fetch posts with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['space-feed', spaceId],
    queryFn: async ({ pageParam = null }) => {
      const params = new URLSearchParams({
        limit: '20',
      })
      
      if (pageParam) {
        params.append('lastPostId', pageParam)
      }
      
      const response = await fetch(`/api/spaces/${spaceId}/posts?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      
      return response.json() as Promise<FeedResponse>
    },
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.lastPostId : undefined,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute for live updates
  })
  
  // Infinite scroll observer
  const lastPostRef = useCallback((node: HTMLDivElement) => {
    if (isFetchingNextPage) return
    if (observerRef.current) observerRef.current.disconnect()
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })
    
    if (node) observerRef.current.observe(node)
  }, [isFetchingNextPage, fetchNextPage, hasNextPage])
  
  // React to post mutation
  const reactMutation = useMutation({
    mutationFn: async ({ postId, reaction, action }: {
      postId: string
      reaction: 'heart'
      action: 'add' | 'remove'
    }) => {
      const response = await fetch(`/api/spaces/${spaceId}/posts/${postId}/react`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reaction, action }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to react to post')
      }
      
      return response.json()
    },
    onSuccess: (data, variables) => {
      // Optimistically update the cache
      queryClient.setQueryData(['space-feed', spaceId], (oldData: any) => {
        if (!oldData) return oldData
        
        return {
          ...oldData,
          pages: oldData.pages.map((page: FeedResponse) => ({
            ...page,
            posts: page.posts.map(post => {
              if (post.id === variables.postId) {
                const newReactedUsers = [...(post.reactedUsers?.heart || [])]
                
                if (variables.action === 'add' && !newReactedUsers.includes(currentUser.id)) {
                  newReactedUsers.push(currentUser.id)
                } else if (variables.action === 'remove') {
                  const index = newReactedUsers.indexOf(currentUser.id)
                  if (index > -1) newReactedUsers.splice(index, 1)
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
                }
              }
              return post
            }),
          })),
        }
      })
    },
  })
  
  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/spaces/${spaceId}/posts/${postId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete post')
      }
      
      return response.json()
    },
    onSuccess: (data, postId) => {
      // Update the cache to mark post as deleted
      queryClient.setQueryData(['space-feed', spaceId], (oldData: any) => {
        if (!oldData) return oldData
        
        return {
          ...oldData,
          pages: oldData.pages.map((page: FeedResponse) => ({
            ...page,
            posts: page.posts.map(post => {
              if (post.id === postId) {
                return {
                  ...post,
                  isDeleted: true,
                  content: `Post removed by ${currentUser.fullName}`,
                }
              }
              return post
            }),
          })),
        }
      })
    },
  })
  
  // Pin post mutation
  const pinMutation = useMutation({
    mutationFn: async ({ postId, pin }: { postId: string; pin: boolean }) => {
      const response = await fetch(`/api/spaces/${spaceId}/posts/${postId}/moderate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: pin ? 'pin' : 'unpin',
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to pin post')
      }
      
      return response.json()
    },
    onSuccess: () => {
      // Refetch to get updated order (pinned posts go to top)
      refetch()
    },
  })
  
  // Flag post mutation
  const flagMutation = useMutation({
    mutationFn: async ({ postId, reason }: { postId: string; reason: string }) => {
      const response = await fetch(`/api/spaces/${spaceId}/posts/${postId}/moderate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'flag',
          reason,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to flag post')
      }
      
      return response.json()
    },
    onSuccess: () => {
      refetch()
    },
  })
  
  const handlePostCreated = (newPost: any) => {
    // Add new post to the top of the feed
    queryClient.setQueryData(['space-feed', spaceId], (oldData: any) => {
      if (!oldData) return { pages: [{ posts: [newPost], hasMore: false, lastPostId: null }] }
      
      const firstPage = oldData.pages[0]
      return {
        ...oldData,
        pages: [
          {
            ...firstPage,
            posts: [newPost, ...firstPage.posts],
          },
          ...oldData.pages.slice(1),
        ],
      }
    })
  }
  
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refetch()
    } finally {
      setIsRefreshing(false)
    }
  }
  
  const allPosts = data?.pages.flatMap(page => page.posts) || []
  
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
    )
  }
  
  if (isError) {
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
              {error instanceof Error ? error.message : 'Something went wrong'}
            </p>
            <Button onClick={handleRefresh} disabled={isRefreshing}>
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
    )
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
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
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
                onReact={(postId, reaction, action) =>
                  reactMutation.mutate({ postId, reaction, action })
                }
                onDelete={(postId) => deleteMutation.mutate(postId)}
                onPin={(postId, pin) => pinMutation.mutate({ postId, pin })}
                onFlag={(postId, reason) => flagMutation.mutate({ postId, reason: reason || 'Inappropriate content' })}
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
    </div>
  )
} 