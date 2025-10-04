'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Card, Badge, Input } from '@hive/ui';
import {
  Send,
  Pin,
  TrendingUp,
  MessageSquare,
  Vote,
  Calendar,
  Users,
  AlertCircle,
  Star,
  MoreHorizontal,
  Reply,
  Sparkles
} from 'lucide-react';
import { api } from '@/lib/api-client';
import { formatDistanceToNow } from 'date-fns';

interface Post {
  id: string;
  content: string;
  type: 'regular' | 'announcement' | 'poll' | 'event' | 'volunteer' | 'system';
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  updatedAt?: Date;

  // Threading
  isThread: boolean;
  threadId?: string;
  replyCount: number;
  lastReplyAt?: Date;

  // Enhancements
  pinned: boolean;
  promoted: boolean;
  isTab: boolean;

  // Reactions
  reactions: { [emoji: string]: string[] };
  engagementScore: number;

  // Type-specific data
  pollData?: any;
  eventData?: any;
  volunteerData?: any;
}

interface SpaceChatBoardProps {
  spaceId: string;
  threadId?: string;
  membership: any;
  isLeader: boolean;
  isModerator: boolean;
  onOpenContext: (panel: string) => void;
}

export function SpaceChatBoard({
  spaceId,
  threadId,
  membership,
  isLeader,
  isModerator,
  onOpenContext
}: SpaceChatBoardProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [postType, setPostType] = useState<Post['type']>('regular');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ChatGPT-like enhancement suggestions
  const [showEnhancements, setShowEnhancements] = useState(false);
  const [enhancementSuggestion, setEnhancementSuggestion] = useState('');

  useEffect(() => {
    loadPosts();
    // Set up real-time subscription
    const unsubscribe = subscribeToUpdates();
    return () => unsubscribe();
  }, [spaceId, threadId]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const endpoint = threadId
        ? `/api/spaces/${spaceId}/posts/${threadId}/replies`
        : `/api/spaces/${spaceId}/posts`;

      const response = await api.get(endpoint, {
        params: { limit: 50 }
      });

      setPosts(response.posts || []);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToUpdates = () => {
    // Real-time subscription via SSE
    const eventSource = new EventSource(
      `/api/realtime/sse?channels=space:${spaceId}:posts`
    );

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);

      // Handle SSE message format
      if (eventData.type === 'message' && eventData.data) {
        const message = eventData.data;
        if (message.content?.type === 'new_post' && message.content?.post) {
          setPosts(prev => [...prev, message.content.post]);
          scrollToBottom();
        } else if (message.content?.type === 'update_post' && message.content?.post) {
          setPosts(prev => prev.map(p =>
            p.id === message.content.post.id ? message.content.post : p
          ));
        }
      }

      // Handle direct message format (backward compatibility)
      else if (eventData.type === 'new_post') {
        setPosts(prev => [...prev, eventData.post]);
        scrollToBottom();
      } else if (eventData.type === 'update_post') {
        setPosts(prev => prev.map(p =>
          p.id === eventData.post.id ? eventData.post : p
        ));
      }
    };

    return () => eventSource.close();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendPost = async () => {
    if (!newPostContent.trim() || !membership) return;

    try {
      const response = await api.post(`/api/spaces/${spaceId}/posts`, {
        content: newPostContent,
        type: postType,
        threadId: replyingTo || undefined
      });

      setNewPostContent('');
      setReplyingTo(null);
      setPostType('regular');
      scrollToBottom();
    } catch (error) {
      console.error('Failed to send post:', error);
    }
  };

  const handlePinPost = async (postId: string) => {
    if (!isLeader && !isModerator) return;

    try {
      await api.post(`/api/spaces/${spaceId}/posts/${postId}/pin`);
      loadPosts();
    } catch (error) {
      console.error('Failed to pin post:', error);
    }
  };

  const handlePromotePost = async (postId: string) => {
    if (!isLeader) return;

    try {
      await api.post(`/api/spaces/${spaceId}/posts/${postId}/promote`);
      loadPosts();
    } catch (error) {
      console.error('Failed to promote post:', error);
    }
  };

  const handleMakeTab = async (postId: string) => {
    if (!isLeader) return;

    try {
      await api.post(`/api/spaces/${spaceId}/posts/${postId}/tab`);
      // This will trigger parent to update tabs
      loadPosts();
    } catch (error) {
      console.error('Failed to make tab:', error);
    }
  };

  const handleReaction = async (postId: string, emoji: string) => {
    try {
      await api.post(`/api/spaces/${spaceId}/posts/${postId}/react`, {
        emoji
      });
      loadPosts();
    } catch (error) {
      console.error('Failed to react:', error);
    }
  };

  // SPEC.md: ChatGPT-like enhancement suggestions
  useEffect(() => {
    if (newPostContent.length > 20) {
      // Analyze content for enhancements
      const suggestions = analyzeForEnhancements(newPostContent);
      setEnhancementSuggestion(suggestions);
      setShowEnhancements(!!suggestions);
    } else {
      setShowEnhancements(false);
    }
  }, [newPostContent]);

  const analyzeForEnhancements = (content: string): string => {
    // Simple analysis for demo
    if (content.includes('?') && !postType) {
      return 'This looks like a question. Consider making it a poll!';
    }
    if (content.includes('meeting') || content.includes('event')) {
      return 'Create an event with RSVP?';
    }
    if (content.includes('need') || content.includes('help')) {
      return 'Create a volunteer request?';
    }
    return '';
  };

  // Group posts by time periods (SPEC.md)
  const groupedPosts = groupPostsByTime(posts);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Pinned Posts (max 3) */}
      {posts.filter(p => p.pinned).slice(0, 3).map(post => (
        <div key={post.id} className="border-b border-gray-800 bg-yellow-900/10 p-3">
          <div className="flex items-start gap-2">
            <Pin className="w-4 h-4 text-[var(--hive-brand-primary)] mt-1" />
            <div className="flex-1">
              <p className="text-sm text-white">{post.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                Pinned by {post.authorName}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedPosts).map(([period, periodPosts]) => (
          <div key={period}>
            {/* Time Period Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-gray-800" />
              <span className="text-xs text-gray-500">{period}</span>
              <div className="flex-1 h-px bg-gray-800" />
            </div>

            {/* Posts in this period */}
            {periodPosts.map((post) => (
              <PostMessage
                key={post.id}
                post={post}
                isLeader={isLeader}
                isModerator={isModerator}
                onPin={() => handlePinPost(post.id)}
                onPromote={() => handlePromotePost(post.id)}
                onMakeTab={() => handleMakeTab(post.id)}
                onReply={() => setReplyingTo(post.id)}
                onReact={(emoji) => handleReaction(post.id, emoji)}
              />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - ChatGPT Style */}
      <div className="border-t border-gray-800 p-4">
        {/* Reply Indicator */}
        {replyingTo && (
          <div className="flex items-center justify-between mb-2 p-2 bg-gray-900 rounded">
            <span className="text-sm text-gray-400">
              Replying to post...
            </span>
            <button
              onClick={() => setReplyingTo(null)}
              className="text-gray-500 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Enhancement Suggestion */}
        {showEnhancements && (
          <div className="mb-2 p-2 bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 rounded">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--hive-brand-primary)]" />
              <span className="text-sm text-[var(--hive-brand-primary)]">{enhancementSuggestion}</span>
              <Button
                size="sm"
                variant="ghost"
                className="ml-auto text-[var(--hive-brand-primary)]"
                onClick={() => {
                  if (enhancementSuggestion.includes('poll')) setPostType('poll');
                  if (enhancementSuggestion.includes('event')) setPostType('event');
                  if (enhancementSuggestion.includes('volunteer')) setPostType('volunteer');
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        )}

        {/* Post Type Selector */}
        <div className="flex gap-2 mb-2">
          {['regular', 'announcement', 'poll', 'event', 'volunteer'].map((type) => (
            <button
              key={type}
              onClick={() => setPostType(type as Post['type'])}
              className={`px-3 py-1 rounded text-xs ${
                postType === type
                  ? 'bg-[var(--hive-brand-primary)] text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="flex gap-2">
          <Input
            value={newPostContent}
            onChange={(e: React.ChangeEvent) => setNewPostContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendPost();
              }
            }}
            placeholder={
              membership
                ? "Type a message... (Shift+Enter for new line)"
                : "Join the space to participate"
            }
            disabled={!membership}
            className="flex-1 bg-gray-900 border-gray-700"
          />
          <Button
            onClick={handleSendPost}
            disabled={!membership || !newPostContent.trim()}
            className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Individual post component
function PostMessage({
  post,
  isLeader,
  isModerator,
  onPin,
  onPromote,
  onMakeTab,
  onReply,
  onReact
}: {
  post: Post;
  isLeader: boolean;
  isModerator: boolean;
  onPin: () => void;
  onPromote: () => void;
  onMakeTab: () => void;
  onReply: () => void;
  onReact: (emoji: string) => void;
}) {
  const [showActions, setShowActions] = useState(false);

  const getTypeIcon = () => {
    switch (post.type) {
      case 'announcement': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'poll': return <Vote className="w-4 h-4 text-blue-400" />;
      case 'event': return <Calendar className="w-4 h-4 text-green-400" />;
      case 'volunteer': return <Users className="w-4 h-4 text-purple-400" />;
      default: return null;
    }
  };

  return (
    <div
      className={`group flex gap-3 p-3 rounded hover:bg-gray-900/50 ${
        post.promoted ? 'border-l-2 border-[var(--hive-brand-primary)]' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" />

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-white text-sm">{post.authorName}</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </span>
          {getTypeIcon()}
          {post.pinned && <Pin className="w-3 h-3 text-[var(--hive-brand-primary)]" />}
          {post.promoted && <TrendingUp className="w-3 h-3 text-green-400" />}
        </div>

        <p className="text-sm text-gray-200 whitespace-pre-wrap">{post.content}</p>

        {/* Thread Indicator */}
        {post.isThread && post.replyCount > 0 && (
          <button
            onClick={onReply}
            className="mt-2 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
          >
            <MessageSquare className="w-3 h-3" />
            {post.replyCount} replies
          </button>
        )}

        {/* Reactions */}
        {Object.keys(post.reactions || {}).length > 0 && (
          <div className="flex gap-1 mt-2">
            {Object.entries(post.reactions).map(([emoji, users]) => (
              <button
                key={emoji}
                onClick={() => onReact(emoji)}
                className="px-2 py-1 bg-gray-800 rounded text-xs hover:bg-gray-700"
              >
                {emoji} {users.length}
              </button>
            ))}
          </div>
        )}

        {/* Leader Actions (inline, SPEC.md) */}
        {showActions && (isLeader || isModerator) && (
          <div className="flex gap-2 mt-2">
            {!post.pinned && (
              <button
                onClick={onPin}
                className="text-xs text-gray-500 hover:text-[var(--hive-brand-primary)]"
              >
                [Pin]
              </button>
            )}
            {isLeader && !post.promoted && (
              <button
                onClick={onPromote}
                className="text-xs text-gray-500 hover:text-green-400"
              >
                [Promote]
              </button>
            )}
            {isLeader && post.replyCount >= 10 && !post.isTab && (
              <button
                onClick={onMakeTab}
                className="text-xs text-gray-500 hover:text-blue-400"
              >
                [Make Tab]
              </button>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-start gap-1">
        <button
          onClick={onReply}
          className="p-1 hover:bg-gray-800 rounded"
        >
          <Reply className="w-3 h-3 text-gray-400" />
        </button>
        <button
          onClick={() => onReact('👍')}
          className="p-1 hover:bg-gray-800 rounded"
        >
          👍
        </button>
      </div>
    </div>
  );
}

// Group posts by time periods (SPEC.md)
function groupPostsByTime(posts: Post[]): { [key: string]: Post[] } {
  const now = new Date();
  const groups: { [key: string]: Post[] } = {};

  posts.forEach(post => {
    const postDate = new Date(post.createdAt);
    const hoursDiff = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);

    let period: string;
    if (hoursDiff < 1) {
      period = 'Last hour';
    } else if (hoursDiff < 24) {
      period = 'Today';
    } else if (hoursDiff < 48) {
      period = 'Yesterday';
    } else if (hoursDiff < 168) {
      period = 'This week';
    } else {
      period = postDate.toLocaleDateString();
    }

    if (!groups[period]) {
      groups[period] = [];
    }
    groups[period].push(post);
  });

  return groups;
}