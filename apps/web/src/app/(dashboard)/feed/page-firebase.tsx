"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Plus, 
  TrendingUp, 
  Users, 
  Calendar, 
  Zap,
  Heart,
  Globe,
  Loader2,
  RefreshCw,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Search,
  ChevronDown
} from 'lucide-react';
import { 
  Button, 
  Card, 
  CardContent,
  CardHeader,
  Badge, 
  Avatar,
  AvatarImage,
  AvatarFallback,
  useUnifiedAuth,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input
} from "@hive/ui";
import { useFirebaseFeed } from '@/hooks/use-firebase-feed';
import { PostComposer } from '@/components/social/post-composer';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export default function FeedPage() {
  const { user } = useUnifiedAuth();
  const [feedType, setFeedType] = useState<'personal' | 'trending' | 'following'>('personal');
  const [postTypes, setPostTypes] = useState<string[]>([]);
  const [showComposer, setShowComposer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Use Firebase feed hook with real-time updates
  const {
    posts,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    createPost,
    toggleLike,
    toggleBookmark,
    addComment,
    sharePost,
    loadMore,
    refresh,
    hasLiked,
    hasBookmarked
  } = useFirebaseFeed({
    feedType,
    postTypes: postTypes.length > 0 ? postTypes : undefined,
    sortBy: feedType === 'trending' ? 'popular' : 'recent',
    pageSize: 20,
    realtime: true // Enable real-time updates
  });

  // Filter posts based on search
  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.content.text?.toLowerCase().includes(query) ||
      post.content.title?.toLowerCase().includes(query) ||
      post.authorName.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  // Handle post creation
  const handleCreatePost = useCallback(async (postData: any) => {
    try {
      await createPost({
        type: postData.type || 'post',
        content: {
          text: postData.content,
          title: postData.title
        },
        tags: postData.tags || [],
        mentions: postData.mentions || [],
        visibility: postData.visibility || 'public',
        spaceId: postData.spaceId
      });
      setShowComposer(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  }, [createPost]);

  // Handle comment
  const handleComment = useCallback(async (postId: string) => {
    const comment = prompt('Add a comment:');
    if (comment) {
      try {
        await addComment(postId, comment);
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  }, [addComment]);

  // Post type filters
  const postTypeFilters = [
    { value: 'post', label: 'Posts', icon: MessageCircle },
    { value: 'tool_share', label: 'Tools', icon: Zap },
    { value: 'event', label: 'Events', icon: Calendar },
    { value: 'achievement', label: 'Achievements', icon: TrendingUp }
  ];

  // Toggle post type filter
  const togglePostTypeFilter = (type: string) => {
    setPostTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Render post card
  const renderPost = (post: any) => {
    const isLiked = hasLiked(post.id);
    const isBookmarked = hasBookmarked(post.id);
    const timeAgo = post.createdAt ? formatDistanceToNow(
      post.createdAt.toDate ? post.createdAt.toDate() : new Date(post.createdAt),
      { addSuffix: true }
    ) : 'just now';

    return (
      <motion.div
        key={post.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.authorAvatar} />
                  <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{post.authorName}</span>
                    <span className="text-sm text-muted-foreground">@{post.authorHandle}</span>
                    {post.isPinned && (
                      <Badge variant="secondary" className="text-xs">Pinned</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {post.spaceName && (
                      <>
                        <span>{post.spaceName}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{timeAgo}</span>
                  </div>
                </div>
              </div>

              <Dropdown>
                <DropdownTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu align="end">
                  <DropdownItem>Copy link</DropdownItem>
                  <DropdownItem>Report</DropdownItem>
                  {post.authorId === user?.uid && (
                    <>
                      <DropdownItem>Edit</DropdownItem>
                      <DropdownItem className="text-destructive">Delete</DropdownItem>
                    </>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </CardHeader>

          <CardContent className="pt-0 space-y-3">
            {/* Post content */}
            {post.content.title && (
              <h3 className="font-semibold text-lg">{post.content.title}</h3>
            )}
            
            {post.content.text && (
              <p className="text-foreground whitespace-pre-wrap">{post.content.text}</p>
            )}

            {/* Tool/Event cards */}
            {post.content.toolName && (
              <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="font-medium">{post.content.toolName}</span>
                </div>
                {post.content.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.content.description}
                  </p>
                )}
              </div>
            )}

            {post.content.eventDetails && (
              <div className="p-3 bg-[var(--hive-gold)]/10 rounded-lg border border-[var(--hive-gold)]/20">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[var(--hive-gold)]" />
                  <span className="font-medium">{post.content.eventDetails.name}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.content.eventDetails.date} • {post.content.eventDetails.location}
                </p>
              </div>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Engagement actions */}
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLike(post.id)}
                  className={cn(
                    "gap-2",
                    isLiked && "text-red-500"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                  <span className="text-sm">{post.engagement.likes}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleComment(post.id)}
                  className="gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{post.engagement.comments}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => sharePost(post.id)}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm">{post.engagement.shares}</span>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleBookmark(post.id)}
                className={cn(
                  isBookmarked && "text-accent"
                )}
              >
                <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Feed</h1>
          <p className="text-muted-foreground">
            Stay connected with your campus community
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
          
          <Button
            size="sm"
            onClick={() => setShowComposer(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      {/* Feed controls */}
      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Feed type tabs */}
        <div className="flex items-center gap-2">
          <Button
            variant={feedType === 'personal' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFeedType('personal')}
          >
            <Globe className="h-4 w-4 mr-2" />
            For You
          </Button>
          <Button
            variant={feedType === 'following' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFeedType('following')}
          >
            <Users className="h-4 w-4 mr-2" />
            Following
          </Button>
          <Button
            variant={feedType === 'trending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFeedType('trending')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </Button>
        </div>

        {/* Post type filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Filter:</span>
          {postTypeFilters.map(filter => {
            const Icon = filter.icon;
            const isActive = postTypes.includes(filter.value);
            return (
              <Button
                key={filter.value}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => togglePostTypeFilter(filter.value)}
              >
                <Icon className="h-3 w-3 mr-1" />
                {filter.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <Card className="p-4 border-destructive">
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="p-6">
              <div className="space-y-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-32 bg-muted rounded" />
                    <div className="h-3 w-24 bg-muted rounded" />
                  </div>
                </div>
                <div className="h-20 bg-muted rounded" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Posts */}
      {!isLoading && (
        <AnimatePresence mode="popLayout">
          {filteredPosts.length === 0 ? (
            <Card className="p-8 text-center">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to share something with your community!
              </p>
              <Button onClick={() => setShowComposer(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map(renderPost)}
            </div>
          )}
        </AnimatePresence>
      )}

      {/* Load more */}
      {hasMore && !isLoading && filteredPosts.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Load More
              </>
            )}
          </Button>
        </div>
      )}

      {/* Post composer modal */}
      {showComposer && (
        <PostComposer
          onSubmit={handleCreatePost}
          onClose={() => setShowComposer(false)}
        />
      )}
    </div>
  );
}