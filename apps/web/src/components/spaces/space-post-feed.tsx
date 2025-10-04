'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Image,
  Paperclip,
  Smile,
  Send,
  MoreHorizontal,
  Pin,
  Reply,
  Heart,
  MessageCircle,
  Bookmark,
  Flag,
  Edit,
  Trash2,
  Calendar,
  AtSign,
  Hash
} from 'lucide-react';
import {
  Card,
  Button,
  Avatar,
  Badge,
  Input
} from '@hive/ui';
import type { User } from '@hive/core';
import { useRealtimePosts } from '@/hooks/use-realtime-posts';
import { useToast } from '@/hooks/use-toast';

// Define missing types that should be in @hive/core
interface Post {
  id: string;
  content: string;
  authorId: string;
  spaceId: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned?: boolean;
  author: User;
}

interface PostReaction {
  id: string;
  postId: string;
  userId: string;
  emoji: string;
  createdAt: Date;
}
import { formatDistanceToNow } from 'date-fns';

interface SpacePostFeedProps {
  spaceId: string;
  canPost: boolean;
  pinnedPosts?: Post[];
  spaceRules?: import('@/lib/space-type-rules').SpaceTypeRules | null;
}

interface PostWithAuthor extends Post {
  author: User;
  reactions: PostReaction[];
  replyCount: number;
  isBookmarked?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

export function SpacePostFeed({ spaceId, canPost, pinnedPosts = [], spaceRules }: SpacePostFeedProps) {
  const [posting, setPosting] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Space rules-based visibility and features
  const isGreekLife = spaceRules?.membership.joinMethod === 'invitation_only';
  const isResidential = spaceRules?.membership.maxSpaces === 1;
  const allowsPublicPosts = spaceRules?.visibility.posts !== 'members_only';

  // Customize post composer based on space type
  const getPostPlaceholder = () => {
    if (isGreekLife) return "Share with your brothers/sisters...";
    if (isResidential) return "Connect with your neighbors...";
    return "Share with your community...";
  };

  // Use real-time posts hook
  const {
    posts: realtimePosts,
    loading,
    error,
    createPost,
    reactToPost
  } = useRealtimePosts({
    spaceId,
    enabled: true,
    limitCount: 100
  });

  // Combine pinned posts with real-time posts
  const posts = [...pinnedPosts, ...realtimePosts.filter(p => !p.isPinned)] as PostWithAuthor[];

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  // Show error if posts fail to load
  useEffect(() => {
    if (error) {
      toast({
        title: 'Failed to load posts',
        description: 'Please refresh the page to try again',
        type: 'error'
      });
    }
  }, [error, toast]);

  // Handle post creation with real-time updates
  const handleCreatePost = async () => {
    if (!newPostContent.trim() || posting) return;

    setPosting(true);
    try {
      await createPost(newPostContent, replyingTo || undefined);
      setNewPostContent('');
      setReplyingTo(null);

      toast({
        title: 'Post created!',
        description: 'Your message has been shared with the space',
        type: 'success'
      });

      // Auto-scroll to top to see new post
      if (feedRef.current) {
        feedRef.current.scrollTop = 0;
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      toast({
        title: 'Failed to create post',
        description: 'Please try again',
        type: 'error'
      });
    } finally {
      setPosting(false);
    }
  };

  // Handle reactions with real-time updates
  const handleReaction = async (postId: string, emoji: string) => {
    try {
      await reactToPost(postId, emoji);
      // Real-time listener will handle the UI update
    } catch (error) {
      console.error('Failed to react to post:', error);
      toast({
        title: 'Failed to react',
        description: 'Please try again',
        type: 'error'
      });
    }
  };

  // Common emoji reactions
  const quickReactions = ['👍', '❤️', '😄', '😮', '😢', '🔥'];

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-800 h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[400px] max-h-[calc(100vh-300px)] md:max-h-[calc(100vh-200px)]">
      {/* Pinned Posts */}
      {pinnedPosts.length > 0 && (
        <div className="border-b border-gray-800 bg-yellow-500/5">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Pin className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-500">Pinned Posts</span>
            </div>
            <div className="space-y-2">
              {pinnedPosts.map((post) => (
                <div key={post.id} className="text-sm text-gray-300 bg-gray-800/50 p-3 rounded-lg">
                  <div className="font-medium">{post.author?.fullName}</div>
                  <div className="truncate">{post.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Post Feed */}
      <div ref={feedRef} className="flex-1 overflow-y-auto">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
            <p className="text-gray-400">
              {canPost ? "Start the conversation!" : "Be the first to share something with the space."}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {posts.map((post, index) => {
              const prevPost = posts[index - 1];
              const showAvatar = !prevPost ||
                prevPost.author.id !== post.author.id ||
                new Date(post.createdAt).getTime() - new Date(prevPost.createdAt).getTime() > 300000; // 5 minutes

              return (
                <PostMessage
                  key={post.id}
                  post={post}
                  showAvatar={showAvatar}
                  onReaction={handleReaction}
                  onReply={() => setReplyingTo(post.id)}
                  onEdit={() => setEditingPost(post.id)}
                  quickReactions={quickReactions}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Post Composer */}
      {canPost && (
        <div className="border-t border-gray-800 bg-gray-950/50 p-4">
          {replyingTo && (
            <div className="flex items-center space-x-2 mb-2 text-sm text-gray-400">
              <Reply className="w-4 h-4" />
              <span>Replying to message</span>
              <button
                onClick={() => setReplyingTo(null)}
                className="text-gray-500 hover:text-gray-300"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="flex space-x-3">
            <Avatar
              src="/current-user-avatar.jpg"
              fallback="You"
              className="w-8 h-8 mt-1"
            />

            <div className="flex-1 space-y-3">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={newPostContent}
                  onChange={(e: React.ChangeEvent) => {
                    setNewPostContent(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCreatePost();
                    }
                  }}
                  placeholder={replyingTo ? "Reply to this message..." : "Share with the space..."}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none focus:border-[var(--hive-brand-primary)] focus:outline-none min-h-[40px] max-h-[120px]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-[var(--hive-brand-primary)] hover:bg-gray-800 rounded-lg transition-colors">
                    <Image className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[var(--hive-brand-primary)] hover:bg-gray-800 rounded-lg transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[var(--hive-brand-primary)] hover:bg-gray-800 rounded-lg transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[var(--hive-brand-primary)] hover:bg-gray-800 rounded-lg transition-colors">
                    <AtSign className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim() || posting}
                  className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400 disabled:opacity-50"
                  size="sm"
                >
                  {posting ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Individual Post Message Component
function PostMessage({
  post,
  showAvatar,
  onReaction,
  onReply,
  onEdit,
  quickReactions
}: {
  post: PostWithAuthor;
  showAvatar: boolean;
  onReaction: (postId: string, emoji: string) => void;
  onReply: () => void;
  onEdit: () => void;
  quickReactions: string[];
}) {
  const [showActions, setShowActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  // Group reactions by emoji
  const groupedReactions = post.reactions.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = [];
    }
    acc[reaction.emoji].push(reaction);
    return acc;
  }, {} as Record<string, PostReaction[]>);

  return (
    <div
      className="group hover:bg-gray-900/50 px-4 py-2 transition-colors relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex space-x-3">
        {showAvatar ? (
          <Avatar
            src={post.author.avatarUrl}
            fallback={post.author.fullName?.[0]}
            className="w-8 h-8 mt-1"
          />
        ) : (
          <div className="w-8 h-8 mt-1 flex items-center justify-center">
            <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: false })}
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {showAvatar && (
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-white">{post.author.fullName}</span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
              {post.isPinned && (
                <Pin className="w-3 h-3 text-yellow-500" />
              )}
            </div>
          )}

          <div className="text-gray-100 leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </div>

          {/* Attachments - placeholder for future implementation */}

          {/* Reactions */}
          {Object.keys(groupedReactions).length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {Object.entries(groupedReactions).map(([emoji, reactions]) => (
                <button
                  key={emoji}
                  onClick={() => onReaction(post.id, emoji)}
                  className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 rounded-full px-2 py-1 text-sm transition-colors"
                >
                  <span>{emoji}</span>
                  <span className="text-gray-400">{reactions.length}</span>
                </button>
              ))}

              <button
                onClick={() => setShowReactions(!showReactions)}
                className="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-[var(--hive-brand-primary)] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick reaction picker */}
          {showReactions && (
            <div className="flex gap-1 mt-2 p-2 bg-gray-800 rounded-lg">
              {quickReactions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onReaction(post.id, emoji);
                    setShowReactions(false);
                  }}
                  className="w-8 h-8 hover:bg-gray-700 rounded flex items-center justify-center text-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        {showActions && (
          <div className="flex items-center space-x-1 absolute right-4 top-2">
            <button
              onClick={() => onReaction(post.id, '👍')}
              className="p-1 text-gray-400 hover:text-[var(--hive-brand-primary)] hover:bg-gray-800 rounded transition-colors"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              onClick={onReply}
              className="p-1 text-gray-400 hover:text-[var(--hive-brand-primary)] hover:bg-gray-800 rounded transition-colors"
            >
              <Reply className="w-4 h-4" />
            </button>
            {post.canEdit && (
              <button
                onClick={onEdit}
                className="p-1 text-gray-400 hover:text-[var(--hive-brand-primary)] hover:bg-gray-800 rounded transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            <button className="p-1 text-gray-400 hover:text-[var(--hive-brand-primary)] hover:bg-gray-800 rounded transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}