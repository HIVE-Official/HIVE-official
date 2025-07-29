import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card } from '../../atomic/atoms/card';
import { Button } from '../../atomic/atoms/button';
import { Text } from '../../atomic/atoms/text';
import { Badge } from '../../atomic/atoms/badge';
import { Input } from '../../atomic/atoms/input';
import { Avatar } from '../../atomic/atoms/avatar';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  MoreVertical, 
  Image, 
  Video, 
  Link, 
  Smile, 
  Send, 
  Reply, 
  ThumbsUp, 
  ThumbsDown,
  Flag,
  Eye,
  EyeOff,
  Pin,
  Trash2,
  Edit3,
  Copy,
  Download,
  ExternalLink,
  Calendar,
  MapPin,
  Hash,
  AtSign,
  Bold,
  Italic,
  List,
  Code,
  Quote,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Fire,
  Award,
  Target,
  Sparkles
} from 'lucide-react';

const meta: Meta = {
  title: '07-Spaces/Content Interaction',
  parameters: {
    docs: {
      description: {
        component: 'Comprehensive content interaction components for HIVE Spaces - Posts, comments, reactions, and moderation tools with kitchen sink variants',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock data for comprehensive testing
const mockPosts = [
  {
    id: '1',
    author: {
      id: 'user1',
      name: 'Sarah Chen',
      handle: '@sarahc',
      avatar: '/placeholder-avatar.jpg',
      role: 'admin',
      isVerified: true,
      reputation: 2840
    },
    content: 'Just wrapped up our machine learning workshop! Amazing to see everyone\'s projects come together. The neural network demos were particularly impressive. Who\'s excited for next week\'s deep learning session? 🚀\n\nP.S. - Don\'t forget to submit your project proposals by Friday!',
    type: 'text',
    createdAt: '2023-10-20T14:30:00Z',
    updatedAt: null,
    isPinned: true,
    isEdited: false,
    visibility: 'public',
    metrics: {
      likes: 24,
      comments: 8,
      shares: 3,
      views: 156,
      bookmarks: 12
    },
    reactions: [
      { type: 'like', count: 18, userReacted: true },
      { type: 'love', count: 4, userReacted: false },
      { type: 'fire', count: 2, userReacted: false }
    ],
    tags: ['#MachineLearning', '#Workshop', '#AI'],
    mentions: ['@john', '@emma'],
    attachments: [],
    isReported: false,
    moderationStatus: 'approved'
  },
  {
    id: '2',
    author: {
      id: 'user2',
      name: 'Marcus Rodriguez',
      handle: '@marcusr',
      avatar: '/placeholder-avatar-2.jpg',
      role: 'member',
      isVerified: false,
      reputation: 1950
    },
    content: 'Check out this interactive visualization I built for our data structures project! It shows how different sorting algorithms perform in real-time.',
    type: 'link',
    createdAt: '2023-10-20T12:15:00Z',
    updatedAt: '2023-10-20T12:45:00Z',
    isPinned: false,
    isEdited: true,
    visibility: 'public',
    metrics: {
      likes: 15,
      comments: 6,
      shares: 2,
      views: 89,
      bookmarks: 8
    },
    reactions: [
      { type: 'like', count: 12, userReacted: false },
      { type: 'fire', count: 3, userReacted: true }
    ],
    tags: ['#DataStructures', '#Visualization', '#Project'],
    mentions: [],
    attachments: [
      {
        id: 'att1',
        type: 'link',
        url: 'https://sorting-visualizer.demo.com',
        title: 'Interactive Sorting Algorithm Visualizer',
        description: 'Real-time visualization of bubble sort, merge sort, and quick sort algorithms',
        thumbnail: '/placeholder-link-preview.jpg'
      }
    ],
    isReported: false,
    moderationStatus: 'approved'
  },
  {
    id: '3',
    author: {
      id: 'user3',
      name: 'Elena Vasquez',
      handle: '@elenav',
      avatar: '/placeholder-avatar-3.jpg',
      role: 'moderator',
      isVerified: true,
      reputation: 1420
    },
    content: 'Weekly study group reminder! Tomorrow 6 PM in the library study room 204. We\'ll be covering advanced algorithms and preparing for midterms.',
    type: 'event',
    createdAt: '2023-10-19T16:20:00Z',
    updatedAt: null,
    isPinned: false,
    isEdited: false,
    visibility: 'public',
    metrics: {
      likes: 8,
      comments: 12,
      shares: 1,
      views: 67,
      bookmarks: 5
    },
    reactions: [
      { type: 'like', count: 6, userReacted: false },
      { type: 'heart', count: 2, userReacted: false }
    ],
    tags: ['#StudyGroup', '#Algorithms', '#Midterms'],
    mentions: [],
    attachments: [
      {
        id: 'att2',
        type: 'event',
        title: 'CS 441 Study Group',
        date: '2023-10-21T18:00:00Z',
        location: 'Library Study Room 204',
        description: 'Advanced algorithms review session'
      }
    ],
    isReported: false,
    moderationStatus: 'approved'
  },
  {
    id: '4',
    author: {
      id: 'user4',
      name: 'David Park',
      handle: '@davidp',
      avatar: '/placeholder-avatar-4.jpg',
      role: 'member',
      isVerified: false,
      reputation: 680
    },
    content: 'This content has been reported and is under review.',
    type: 'text',
    createdAt: '2023-10-19T10:30:00Z',
    updatedAt: null,
    isPinned: false,
    isEdited: false,
    visibility: 'hidden',
    metrics: {
      likes: 2,
      comments: 1,
      shares: 0,
      views: 23,
      bookmarks: 0
    },
    reactions: [
      { type: 'like', count: 2, userReacted: false }
    ],
    tags: [],
    mentions: [],
    attachments: [],
    isReported: true,
    moderationStatus: 'under_review',
    reportReason: 'inappropriate_content'
  }
];

const mockComments = [
  {
    id: 'c1',
    postId: '1',
    author: {
      id: 'user5',
      name: 'Jessica Wong',
      handle: '@jessicaw',
      avatar: '/placeholder-avatar-5.jpg',
      role: 'member'
    },
    content: 'This was incredible! The neural network demo completely changed how I think about AI. Can\'t wait for the deep learning session!',
    createdAt: '2023-10-20T15:45:00Z',
    isEdited: false,
    parentId: null,
    metrics: {
      likes: 5,
      replies: 2
    },
    reactions: [
      { type: 'like', count: 5, userReacted: true }
    ],
    isReported: false,
    moderationStatus: 'approved'
  },
  {
    id: 'c2',
    postId: '1',
    author: {
      id: 'user6',
      name: 'Alex Thompson',
      handle: '@alext',
      avatar: '/placeholder-avatar-6.jpg',
      role: 'member'
    },
    content: '@jessicaw Totally agree! The hands-on approach made everything click for me.',
    createdAt: '2023-10-20T16:10:00Z',
    isEdited: false,
    parentId: 'c1',
    metrics: {
      likes: 2,
      replies: 0
    },
    reactions: [
      { type: 'like', count: 2, userReacted: false }
    ],
    isReported: false,
    moderationStatus: 'approved'
  }
];

// Reaction types with emojis and colors
const reactionTypes = {
  like: { emoji: '👍', label: 'Like', color: 'text-blue-400' },
  love: { emoji: '❤️', label: 'Love', color: 'text-red-400' },
  fire: { emoji: '🔥', label: 'Fire', color: 'text-orange-400' },
  clap: { emoji: '👏', label: 'Clap', color: 'text-green-400' },
  mind_blown: { emoji: '🤯', label: 'Mind Blown', color: 'text-purple-400' },
  rocket: { emoji: '🚀', label: 'Rocket', color: 'text-yellow-400' }
};

// ============================================================================
// POST COMPOSER COMPONENT
// ============================================================================

interface PostComposerProps {
  variant?: 'inline' | 'modal' | 'compact';
  placeholder?: string;
  maxLength?: number;
  allowAttachments?: boolean;
  allowRichText?: boolean;
  onPost?: (content: string, attachments: any[]) => void;
  currentUser?: {
    name: string;
    handle: string;
    avatar: string;
  };
}

const PostComposer: React.FC<PostComposerProps> = ({
  variant = 'inline',
  placeholder = "Share something with the space...",
  maxLength = 2000,
  allowAttachments = true,
  allowRichText = true,
  onPost,
  currentUser = {
    name: 'Current User',
    handle: '@user',
    avatar: '/placeholder-avatar.jpg'
  }
}) => {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<any[]>([]);
  const [showRichText, setShowRichText] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePost = () => {
    if (content.trim()) {
      onPost?.(content, attachments);
      setContent('');
      setAttachments([]);
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    if (variant === 'compact') {
      setIsExpanded(true);
    }
  };

  const remainingChars = maxLength - content.length;
  const isOverLimit = remainingChars < 0;

  if (variant === 'compact' && !isExpanded) {
    return (
      <Card className="p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
        <div className="flex items-center gap-3">
          <Avatar
            src={currentUser.avatar}
            fallback={currentUser.name.charAt(0)}
            size="sm"
          />
          <button
            onClick={handleFocus}
            className="flex-1 text-left px-4 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-full text-[var(--hive-text-tertiary)] hover:bg-[color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)] transition-colors"
          >
            {placeholder}
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
      <div className="p-6">
        <div className="flex gap-4">
          <Avatar
            src={currentUser.avatar}
            fallback={currentUser.name.charAt(0)}
            size="md"
          />
          
          <div className="flex-1 space-y-4">
            {/* Text Area */}
            <div className="relative">
              <textarea
                placeholder={placeholder}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={handleFocus}
                rows={isExpanded || variant === 'modal' ? 4 : 2}
                maxLength={maxLength}
                className="w-full bg-transparent border-none text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] resize-none focus:outline-none text-lg"
              />
              
              {/* Character Count */}
              <div className="absolute bottom-2 right-2 text-xs">
                <span className={remainingChars < 50 ? 'text-red-400' : 'text-[var(--hive-text-tertiary)]'}>
                  {remainingChars}
                </span>
              </div>
            </div>
            
            {/* Rich Text Toolbar */}
            {allowRichText && (isExpanded || variant === 'modal') && (
              <div className="flex items-center gap-2 pb-4 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
                <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                  <List className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                  <Quote className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                  <Code className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Attachments */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[var(--hive-interactive-hover)] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Image className="h-5 w-5 text-[var(--hive-text-tertiary)]" />
                      <span className="text-[var(--hive-text-primary)] text-sm">{attachment.name}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Actions */}
            {(isExpanded || variant === 'modal') && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {allowAttachments && (
                    <>
                      <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3">
                  {variant === 'compact' && (
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsExpanded(false)}
                      className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button 
                    onClick={handlePost}
                    disabled={!content.trim() || isOverLimit}
                    className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)] disabled:opacity-50"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ============================================================================
// POST CARD COMPONENT
// ============================================================================

interface PostCardProps {
  post: typeof mockPosts[0];
  variant?: 'default' | 'compact' | 'detailed';
  showMetrics?: boolean;
  showActions?: boolean;
  currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
  onReaction?: (postId: string, reactionType: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  onModerate?: (postId: string, action: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  variant = 'default',
  showMetrics = true,
  showActions = true,
  currentUserRole = 'member',
  onReaction,
  onComment,
  onShare,
  onBookmark,
  onModerate
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [showModerationMenu, setShowModerationMenu] = useState(false);
  
  const canModerate = ['owner', 'admin', 'moderator'].includes(currentUserRole);
  const canEdit = post.author.id === 'current-user' || canModerate;
  
  const getRoleIcon = () => {
    switch (post.author.role) {
      case 'owner': return <Crown className="h-3 w-3 text-yellow-400" />;
      case 'admin': return <Shield className="h-3 w-3 text-blue-400" />;
      case 'moderator': return <Star className="h-3 w-3 text-purple-400" />;
      default: return null;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  // Don't render if content is hidden and user can't moderate
  if (post.visibility === 'hidden' && !canModerate) {
    return null;
  }

  return (
    <Card className={`bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)] ${post.isPinned ? 'border-[var(--hive-brand-secondary)]/30' : ''}`}>
      {/* Moderation Banner */}
      {post.isReported && canModerate && (
        <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <Text variant="body-xs" className="text-red-400">
            Content reported - {post.reportReason?.replace('_', ' ')} - Status: {post.moderationStatus?.replace('_', ' ')}
          </Text>
        </div>
      )}
      
      {/* Pin Indicator */}
      {post.isPinned && (
        <div className="px-4 py-2 bg-[var(--hive-brand-secondary)]/10 border-b border-[var(--hive-brand-secondary)]/20 flex items-center gap-2">
          <Pin className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
          <Text variant="body-xs" className="text-[var(--hive-brand-secondary)]">
            Pinned post
          </Text>
        </div>
      )}
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar
              src={post.author.avatar}
              fallback={post.author.name.charAt(0)}
              size={variant === 'compact' ? 'sm' : 'md'}
            />
            
            <div>
              <div className="flex items-center gap-2">
                <Text variant="body-md" className="text-[var(--hive-text-primary)] font-medium">
                  {post.author.name}
                </Text>
                {getRoleIcon()}
                {post.author.isVerified && (
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                )}
              </div>
              
              <div className="flex items-center gap-2 text-[var(--hive-text-tertiary)] text-sm">
                <span>{post.author.handle}</span>
                <span>•</span>
                <span>{formatTimeAgo(post.createdAt)}</span>
                {post.isEdited && (
                  <>
                    <span>•</span>
                    <span className="italic">edited</span>
                  </>
                )}
                {variant === 'detailed' && showMetrics && (
                  <>
                    <span>•</span>
                    <Eye className="h-3 w-3" />
                    <span>{post.metrics.views} views</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Actions Menu */}
          {showActions && (
            <div className="relative">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowModerationMenu(!showModerationMenu)}
                className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
              
              {showModerationMenu && (
                <div className="absolute right-0 top-8 w-48 bg-[var(--hive-background-primary)] border border-[var(--hive-interactive-active)] rounded-lg shadow-xl z-10">
                  <div className="py-2">
                    {canEdit && (
                      <button className="w-full px-4 py-2 text-left text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2">
                        <Edit3 className="h-4 w-4" />
                        Edit post
                      </button>
                    )}
                    
                    <button className="w-full px-4 py-2 text-left text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      Copy link
                    </button>
                    
                    {!post.isPinned && canModerate && (
                      <button 
                        onClick={() => onModerate?.(post.id, 'pin')}
                        className="w-full px-4 py-2 text-left text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2"
                      >
                        <Pin className="h-4 w-4" />
                        Pin post
                      </button>
                    )}
                    
                    <button className="w-full px-4 py-2 text-left text-red-400 hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2">
                      <Flag className="h-4 w-4" />
                      Report
                    </button>
                    
                    {canModerate && (
                      <>
                        <div className="border-t border-[var(--hive-interactive-active)] my-2"></div>
                        <button 
                          onClick={() => onModerate?.(post.id, 'hide')}
                          className="w-full px-4 py-2 text-left text-red-400 hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2"
                        >
                          <EyeOff className="h-4 w-4" />
                          Hide post
                        </button>
                        <button 
                          onClick={() => onModerate?.(post.id, 'delete')}
                          className="w-full px-4 py-2 text-left text-red-400 hover:bg-[var(--hive-interactive-hover)] flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete post
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="mb-4">
          {post.visibility === 'hidden' ? (
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
              <Text variant="body-sm" className="text-red-400 italic">
                This content has been hidden by moderators
              </Text>
            </div>
          ) : (
            <Text variant="body-md" className="text-[var(--hive-text-primary)] leading-relaxed whitespace-pre-wrap">
              {post.content}
            </Text>
          )}
        </div>
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Attachments */}
        {post.attachments.length > 0 && (
          <div className="mb-4 space-y-3">
            {post.attachments.map((attachment) => (
              <div key={attachment.id} className="border border-[var(--hive-interactive-active)] rounded-lg overflow-hidden">
                {attachment.type === 'link' && (
                  <div className="p-4 flex gap-4">
                    {attachment.thumbnail && (
                      <div className="w-20 h-20 bg-[var(--hive-interactive-hover)] rounded-lg flex-shrink-0"></div>
                    )}
                    <div className="flex-1">
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] font-medium mb-1">
                        {attachment.title}
                      </Text>
                      <Text variant="body-sm" className="text-[var(--hive-text-tertiary)] mb-2">
                        {attachment.description}
                      </Text>
                      <Button size="sm" variant="outline" className="border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Link
                      </Button>
                    </div>
                  </div>
                )}
                
                {attachment.type === 'event' && (
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-400" />
                      <Text variant="body-md" className="text-[var(--hive-text-primary)] font-medium">
                        {attachment.title}
                      </Text>
                    </div>
                    <div className="space-y-1 text-sm text-[var(--hive-text-tertiary)]">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {new Date(attachment.date).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {attachment.location}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Reactions */}
        {post.reactions.length > 0 && (
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
            {post.reactions.map((reaction) => {
              const reactionData = reactionTypes[reaction.type as keyof typeof reactionTypes];
              return (
                <button
                  key={reaction.type}
                  onClick={() => onReaction?.(post.id, reaction.type)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                    reaction.userReacted 
                      ? 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]' 
                      : 'hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-tertiary)]'
                  }`}
                >
                  <span>{reactionData.emoji}</span>
                  <span>{reaction.count}</span>
                </button>
              );
            })}
          </div>
        )}
        
        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Reaction Button */}
              <div className="relative">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setShowReactions(!showReactions)}
                  className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  {showMetrics && <span>{post.metrics.likes}</span>}
                </Button>
                
                {showReactions && (
                  <div className="absolute bottom-8 left-0 flex gap-1 p-2 bg-[var(--hive-background-primary)] border border-[var(--hive-interactive-active)] rounded-lg shadow-xl z-10">
                    {Object.entries(reactionTypes).map(([type, data]) => (
                      <button
                        key={type}
                        onClick={() => {
                          onReaction?.(post.id, type);
                          setShowReactions(false);
                        }}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[var(--hive-interactive-active)] rounded transition-colors"
                        title={data.label}
                      >
                        {data.emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Comment Button */}
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onComment?.(post.id)}
                className="text-[var(--hive-text-tertiary)] hover:text-blue-400 flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                {showMetrics && <span>{post.metrics.comments}</span>}
              </Button>
              
              {/* Share Button */}
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onShare?.(post.id)}
                className="text-[var(--hive-text-tertiary)] hover:text-green-400 flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                {showMetrics && <span>{post.metrics.shares}</span>}
              </Button>
            </div>
            
            {/* Bookmark Button */}
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onBookmark?.(post.id)}
              className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)]"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

// ============================================================================
// COMMENT SYSTEM COMPONENT
// ============================================================================

interface CommentSystemProps {
  comments: typeof mockComments;
  currentUser?: {
    name: string;
    handle: string;
    avatar: string;
  };
  onComment?: (content: string, parentId?: string) => void;
  onReaction?: (commentId: string, reactionType: string) => void;
  onModerate?: (commentId: string, action: string) => void;
  currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
}

const CommentSystem: React.FC<CommentSystemProps> = ({
  comments,
  currentUser = { name: 'Current User', handle: '@user', avatar: '/placeholder-avatar.jpg' },
  onComment,
  onReaction,
  onModerate,
  currentUserRole = 'member'
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const canModerate = ['owner', 'admin', 'moderator'].includes(currentUserRole);

  const handleComment = () => {
    if (newComment.trim()) {
      onComment?.(newComment);
      setNewComment('');
    }
  };

  const handleReply = (parentId: string) => {
    if (replyContent.trim()) {
      onComment?.(replyContent, parentId);
      setReplyContent('');
      setReplyTo(null);
    }
  };

  const topLevelComments = comments.filter(c => !c.parentId);
  const getReplies = (commentId: string) => comments.filter(c => c.parentId === commentId);

  return (
    <div className="space-y-6">
      {/* Comment Composer */}
      <Card className="p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
        <div className="flex gap-3">
          <Avatar
            src={currentUser.avatar}
            fallback={currentUser.name.charAt(0)}
            size="sm"
          />
          
          <div className="flex-1">
            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={2}
              className="w-full bg-transparent border-none text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] resize-none focus:outline-none"
            />
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]">
                  <Image className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                size="sm"
                onClick={handleComment}
                disabled={!newComment.trim()}
                className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)] disabled:opacity-50"
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Comments List */}
      <div className="space-y-4">
        {topLevelComments.map((comment) => {
          const replies = getReplies(comment.id);
          
          return (
            <div key={comment.id} className="space-y-3">
              {/* Main Comment */}
              <div className="flex gap-3">
                <Avatar
                  src={comment.author.avatar}
                  fallback={comment.author.name.charAt(0)}
                  size="sm"
                />
                
                <div className="flex-1">
                  <div className="bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] font-medium">
                        {comment.author.name}
                      </Text>
                      <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                        {comment.author.handle}
                      </Text>
                      <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                        •
                      </Text>
                      <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                        {formatTimeAgo(comment.createdAt)}
                      </Text>
                    </div>
                    
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                      {comment.content}
                    </Text>
                  </div>
                  
                  {/* Comment Actions */}
                  <div className="flex items-center gap-4 mt-2 ml-3">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onReaction?.(comment.id, 'like')}
                      className="text-[var(--hive-text-tertiary)] hover:text-blue-400 text-xs"
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {comment.metrics.likes}
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] text-xs"
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    
                    {canModerate && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-[var(--hive-text-tertiary)] hover:text-red-400 text-xs"
                      >
                        <Flag className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  {/* Reply Composer */}
                  {replyTo === comment.id && (
                    <div className="mt-3 ml-3">
                      <div className="flex gap-2">
                        <Avatar
                          src={currentUser.avatar}
                          fallback={currentUser.name.charAt(0)}
                          size="xs"
                        />
                        
                        <div className="flex-1">
                          <textarea
                            placeholder={`Reply to ${comment.author.name}...`}
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            rows={2}
                            className="w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] text-sm resize-none focus:outline-none"
                          />
                          
                          <div className="flex justify-end gap-2 mt-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => setReplyTo(null)}
                              className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] text-xs"
                            >
                              Cancel
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleReply(comment.id)}
                              disabled={!replyContent.trim()}
                              className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)] disabled:opacity-50 text-xs"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Replies */}
              {replies.length > 0 && (
                <div className="ml-8 space-y-3 border-l-2 border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)] pl-4">
                  {replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar
                        src={reply.author.avatar}
                        fallback={reply.author.name.charAt(0)}
                        size="xs"
                      />
                      
                      <div className="flex-1">
                        <div className="bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Text variant="body-xs" className="text-[var(--hive-text-primary)] font-medium">
                              {reply.author.name}
                            </Text>
                            <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                              {reply.author.handle}
                            </Text>
                            <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                              •
                            </Text>
                            <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                              {formatTimeAgo(reply.createdAt)}
                            </Text>
                          </div>
                          
                          <Text variant="body-xs" className="text-[var(--hive-text-primary)]">
                            {reply.content}
                          </Text>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2 ml-3">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-[var(--hive-text-tertiary)] hover:text-blue-400 text-xs"
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {reply.metrics.likes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to format time
const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
};

// ============================================================================
// STORYBOOK STORIES
// ============================================================================

export const PostComposerInline: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <PostComposer onPost={(content, attachments) => console.log('Post:', content, attachments)} />
    </div>
  ),
};

export const PostComposerCompact: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <PostComposer 
        variant="compact" 
        onPost={(content, attachments) => console.log('Post:', content, attachments)} 
      />
    </div>
  ),
};

export const PostCardDefault: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-6">
      {mockPosts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post}
          currentUserRole="admin"
          onReaction={(id, type) => console.log('Reaction:', id, type)}
          onComment={(id) => console.log('Comment:', id)}
          onShare={(id) => console.log('Share:', id)}
          onBookmark={(id) => console.log('Bookmark:', id)}
          onModerate={(id, action) => console.log('Moderate:', id, action)}
        />
      ))}
    </div>
  ),
};

export const PostCardDetailed: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <PostCard 
        post={mockPosts[0]}
        variant="detailed"
        currentUserRole="owner"
        showMetrics={true}
        onReaction={(id, type) => console.log('Reaction:', id, type)}
        onComment={(id) => console.log('Comment:', id)}
        onShare={(id) => console.log('Share:', id)}
        onBookmark={(id) => console.log('Bookmark:', id)}
        onModerate={(id, action) => console.log('Moderate:', id, action)}
      />
    </div>
  ),
};

export const CommentSystemDefault: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <CommentSystem 
        comments={mockComments}
        currentUserRole="moderator"
        onComment={(content, parentId) => console.log('Comment:', content, parentId)}
        onReaction={(id, type) => console.log('Reaction:', id, type)}
        onModerate={(id, action) => console.log('Moderate:', id, action)}
      />
    </div>
  ),
};

export const KitchenSinkContentInteraction: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
      <Text variant="display-md" className="text-[var(--hive-text-primary)] text-center">
        Content Interaction - Kitchen Sink
      </Text>
      
      {/* Post Composer */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Post Composer</Text>
        <PostComposer />
      </div>
      
      {/* Post Feed */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Post Feed</Text>
        <div className="space-y-6">
          {mockPosts.slice(0, 2).map((post) => (
            <PostCard 
              key={post.id} 
              post={post}
              currentUserRole="admin"
            />
          ))}
        </div>
      </div>
      
      {/* Comment System */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Comment System</Text>
        <CommentSystem comments={mockComments} />
      </div>
    </div>
  ),
};

export const ModerationView: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-6">
      <Text variant="display-md" className="text-[var(--hive-text-primary)] text-center">
        Content Moderation View
      </Text>
      
      {mockPosts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post}
          currentUserRole="admin"
          variant="detailed"
          showMetrics={true}
        />
      ))}
    </div>
  ),
};

export const EdgeCasesContent: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
      <Text variant="display-md" className="text-[var(--hive-text-primary)] text-center">
        Content Interaction - Edge Cases
      </Text>
      
      {/* Empty States */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Empty Comment System</Text>
        <CommentSystem comments={[]} />
      </div>
      
      {/* Long Content */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Long Content Post</Text>
        <PostCard 
          post={{
            ...mockPosts[0],
            content: 'This is a very long post content that should demonstrate how the component handles extended text. '.repeat(10)
          }}
          currentUserRole="member"
        />
      </div>
      
      {/* Disabled States */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Limited Permissions View</Text>
        <PostCard 
          post={mockPosts[0]}
          currentUserRole="member"
          showActions={false}
        />
      </div>
    </div>
  ),
};