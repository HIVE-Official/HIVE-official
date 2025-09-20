"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system';
import { type Space } from '@hive/core';
import { 
  MessageSquare,
  Plus,
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Pin,
  Flag,
  Edit3,
  Trash2,
  Clock,
  Users,
  TrendingUp,
  Eye,
  Heart,
  Bookmark,
  Reply,
  Send,
  Image as ImageIcon,
  BarChart3 as Poll,
  Link as LinkIcon,
  Calendar,
  ChevronUp,
  ChevronDown,
  Filter,
  SortDesc,
  Crown,
  Sparkles,
  Lock,
  Loader2
} from 'lucide-react';

// Post creation will be handled via props/callbacks

// Coordination Post Component for campus coordination
const CoordinationSection: React.FC<{
  post: Post;
  onCoordinationResponse?: (postId: string, response: Omit<CoordinationResponse, 'id' | 'createdAt'>) => Promise<void>;
  onUpdateStatus?: (postId: string, status: 'planning' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled') => Promise<void>;
  currentUserId?: string
}> = ({ post, onCoordinationResponse, onUpdateStatus, currentUserId }) => {
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [responseType, setResponseType] = useState<'interested' | 'going' | 'maybe' | 'cant_make_it'>('interested');
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const coordination = post.coordinationData;
  if (!coordination) return null;
  
  const handleResponse = async () => {
    if (!onCoordinationResponse || !currentUserId) return;
    
    setIsSubmitting(true);
    try {
      await onCoordinationResponse(post.id, {
        userId: currentUserId,
        responseType,
        message: responseMessage.trim() || undefined,
      })};
      setShowResponseForm(false);
      setResponseMessage('')
    } catch (error) {
      console.error('Failed to submit coordination response:', error)
    } finally {
      setIsSubmitting(false)
    }
  };
  
  const userResponse = coordination.responses.find(r => r.userId === currentUserId);
  const interestedCount = coordination.responses.filter(r => r.responseType === 'interested' || r.responseType === 'going').length;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'confirmed': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'in_progress': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'completed': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      case 'cancelled': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  };
  
  return (
    <motion.div
      className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Coordination Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn("px-2 py-1 rounded text-xs border", getStatusColor(coordination.status))}>
            {coordination.status.replace('_', ' ').toUpperCase()}
          </div>
          <span className="text-sm text-gray-300">
            {interestedCount} {interestedCount === 1 ? 'person' : 'people'} interested
            {coordination.maxParticipants && ` (${coordination.maxParticipants} max)`}
          </span>
        </div>
        
        {coordination.datetime && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>
              {new Date(
                coordination.datetime instanceof Date 
                  ? coordination.datetime 
                  : coordination.datetime.toDate()
              ).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
          })}
            </span>
          </div>
        )}
      </div>
      
      {/* Coordination Details */}
      {coordination.details && (
        <div className="mb-3 space-y-2">
          {coordination.details.subject && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Subject:</span>
              <span className="text-white">{coordination.details.subject}</span>
            </div>
          )}
          {coordination.details.restaurant && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Restaurant:</span>
              <span className="text-white">{coordination.details.restaurant}</span>
            </div>
          )}
          {coordination.details.destination && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Destination:</span>
              <span className="text-white">{coordination.details.destination}</span>
            </div>
          )}
          {coordination.location && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Location:</span>
              <span className="text-white">{coordination.location}</span>
            </div>
          )}
        </div>
      )}
      
      {/* Responses */}
      {coordination.responses.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {coordination.responses.slice(0, 8).map((response, i) => (
              <div
                key={response.id}
                className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs"
              >
                <div className="w-4 h-4 rounded-full bg-gray-600 overflow-hidden">
                  {response.user?.photoURL ? (
                    <img src={response.user.photoURL} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-xs text-white">
                        {(response.user?.fullName || 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-blue-300">{response.user?.fullName || 'User'}</span>
                {response.responseType === 'going' && (
                  <span className="text-green-400">✓</span>
                )}
              </div>
            ))}
            {coordination.responses.length > 8 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{coordination.responses.length - 8} more
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* User Response */}
      <div className="flex items-center gap-2">
        {userResponse ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">You're</span>
            <span className={cn(
              "px-2 py-1 rounded text-xs border",
              userResponse.responseType === 'going' ? 'text-green-400 bg-green-500/20 border-green-500/30' :
              userResponse.responseType === 'interested' ? 'text-blue-400 bg-blue-500/20 border-blue-500/30' :
              userResponse.responseType === 'maybe' ? 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30' :
              'text-gray-400 bg-gray-500/20 border-gray-500/30'
            )}>
              {userResponse.responseType.replace('_', ' ')}
            </span>
            <motion.button
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => setShowResponseForm(true)}
              whileHover={{ scale: 1.02 }}
            >
              Change
            </motion.button>
          </div>
        ) : (
          <motion.button
            className="px-3 py-1.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all text-sm"
            onClick={() => setShowResponseForm(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            I'm Interested
          </motion.button>
        )}
      </div>
      
      {/* Response Form */}
      {showResponseForm && (
        <motion.div
          className="mt-3 p-3 bg-white/5 border border-white/10 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {(['interested', 'going', 'maybe', 'cant_make_it'] as const).map((type) => (
                <motion.button
                  key={type}
                  className={cn(
                    "px-3 py-1 rounded text-xs border transition-all",
                    responseType === type
                      ? 'text-blue-400 bg-blue-500/20 border-blue-500/30'
                      : 'text-gray-400 bg-gray-500/20 border-gray-500/30 hover:text-white'
                  )}
                  onClick={() => setResponseType(type)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {type.replace('_', ' ')}
                </motion.button>
              ))}
            </div>
            
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-400/50 transition-colors"
              placeholder="Add a message (optional)..."
              rows={2}
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
            />
            
            <div className="flex justify-end gap-2">
              <motion.button
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-md transition-colors"
                onClick={() => {
                  setShowResponseForm(false);
                  setResponseMessage('')
          }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors disabled:opacity-50"
                onClick={handleResponse}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <><Loader2 className="w-3 h-3 mr-1 inline animate-spin" />Submitting...</>
                ) : (
                  'Submit Response'
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
};

// Comment Thread Component for nested replies
const CommentThread: React.FC<{
  comment: Comment;
  onReply: (commentId: string, content: string) => void;
  level: number
}> = ({ comment, onReply, level }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const maxLevel = 3; // Limit nesting depth
  
  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent.trim());
      setReplyContent('');
      setShowReplyInput(false)
    }
  };
  
  return (
    <div className={cn(
      "relative",
      level > 0 && "ml-8 pl-4 border-l border-white/10"
    )}>
      <div className="flex gap-3 mb-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-600 overflow-hidden">
          {comment.author?.photoURL ? (
            <img src={comment.author.photoURL} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <span className="text-xs font-medium text-[var(--hive-text-primary)]">
                {comment.author?.fullName?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-[var(--hive-text-primary)] text-sm">
              {comment.author?.fullName || 'Unknown User'}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <time className="text-xs text-gray-400">
              {new Date(comment.createdAt instanceof Date ? comment.createdAt : comment.createdAt.toDate()).toLocaleDateString()}
            </time>
            {comment.isEdited && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">edited</span>
              </>
            )}
          </div>
          
          <div className="text-sm text-gray-300 mb-2">
            {comment.content}
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <motion.button
              className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-3 h-3" />
              <span>{comment.reactions?.heart || 0}</span>
            </motion.button>
            
            {level < maxLevel && (
              <motion.button
                className="text-gray-400 hover:text-blue-400 transition-colors"
                onClick={() => setShowReplyInput(!showReplyInput)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reply
              </motion.button>
            )}
          </div>
          
          {/* Reply Input */}
          {showReplyInput && (
            <motion.div
              className="mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex gap-2">
                <textarea
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder-gray-400 resize-none focus:outline-none focus:border-blue-400/50 transition-colors"
                  placeholder={`Reply to ${comment.author?.fullName || 'user'}...`}
                  rows={2}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <div className="flex flex-col gap-1">
                  <motion.button
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors"
                    onClick={handleReply}
                    disabled={!replyContent.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reply
                  </motion.button>
                  <motion.button
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-md transition-colors"
                    onClick={() => {
                      setShowReplyInput(false);
                      setReplyContent('')
          }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              onReply={onReply}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
};

// HIVE Posts Surface - Community Discussion & Threads
// Rich posting system with threads, polls, and engagement

const hivePostsSurfaceVariants = cva(
  "relative w-full",
  {
    variants: {
      mode: {
        view: "",
        edit: "ring-2 ring-[var(--hive-status-info)]/30 ring-offset-2 ring-offset-[var(--hive-background-primary)]/20",
        builder: "ring-2 ring-[var(--hive-status-info)]/30 ring-offset-2 ring-offset-[var(--hive-background-primary)]/20",
      }
    },
    defaultVariants: {
      mode: "view",
    },
  }
);

// Post types with HIVE design patterns - Enhanced for Campus Coordination
const postTypes = {
  discussion: {
    icon: MessageSquare,
    label: 'Discussion',
    color: 'text-[var(--hive-status-info)]',
    description: 'Start a conversation'
  },
  question: {
    icon: MessageCircle,
    label: 'Question',
    color: 'text-[var(--hive-status-success)]',
    description: 'Ask the community'
  },
  poll: {
    icon: Poll,
    label: 'Poll',
    color: 'text-[var(--hive-brand-accent)]',
    description: 'Gather opinions'
  },
  announcement: {
    icon: Pin,
    label: 'Announcement',
    color: 'text-[var(--hive-brand-primary)]',
    description: 'Important updates'
  },
  link: {
    icon: LinkIcon,
    label: 'Link Share',
    color: 'text-[var(--hive-brand-accent)]',
    description: 'Share a resource'
  },
  // NEW: Campus Coordination Post Types
  study_session: {
    icon: Users,
    label: 'Study Session',
    color: 'text-blue-400',
    description: 'Organize study groups',
    coordinationType: 'study_session'
  },
  food_run: {
    icon: Users,
    label: 'Food Run',
    color: 'text-orange-400', 
    description: 'Coordinate food orders',
    coordinationType: 'food_run'
  },
  activity: {
    icon: Calendar,
    label: 'Activity',
    color: 'text-green-400',
    description: 'Plan group activities',
    coordinationType: 'activity'
  },
  ride_share: {
    icon: Users,
    label: 'Ride Share',
    color: 'text-purple-400',
    description: 'Share transportation',
    coordinationType: 'ride_share'
  },
  meetup: {
    icon: Users,
    label: 'Meetup',
    color: 'text-pink-400',
    description: 'Quick meetups',
    coordinationType: 'meetup'
  },
} as const;

// Coordination Response for campus coordination posts
export interface CoordinationResponse {
  id: string;
  userId: string;
  user?: {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string
  };
  responseType: 'interested' | 'going' | 'maybe' | 'cant_make_it';
  message?: string;
  createdAt: Date | { toDate: () => Date };
  // For specific coordination types
  extraData?: {
    // For study sessions
    studyTopic?: string;
    bringNotes?: boolean;
    // For food runs
    foodOrder?: string;
    contribution?: number;
    // For rides
    canDrive?: boolean;
    seatsAvailable?: number;
    // For activities
    skillLevel?: string;
    equipment?: string[]
  }
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author?: {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string
  };
  createdAt: Date | { toDate: () => Date };
  updatedAt: Date | { toDate: () => Date };
  parentCommentId?: string;
  replies: Comment[];
  reactions?: {
    heart: number
  };
  isEdited?: boolean;
  isDeleted?: boolean
}

export interface Post {
  id: string;
  type: string;
  content: string;
  authorId: string;
  author?: {
    id: string;
    fullName: string;
    handle: string;
    photoURL?: string
  };
  createdAt: Date | { toDate: () => Date };
  updatedAt: Date | { toDate: () => Date };
  reactions?: {
    heart: number
  };
  isPinned?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
  spaceId: string;
  comments?: Comment[];
  replyCount?: number;
  
  // NEW: Coordination Features
  coordinationData?: {
    coordinationType: 'study_session' | 'food_run' | 'activity' | 'ride_share' | 'meetup';
    responses: CoordinationResponse[];
    maxParticipants?: number;
    currentParticipants?: number;
    location?: string;
    datetime?: Date | { toDate: () => Date };
    status: 'planning' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    requirements?: string[];
    // Type-specific data
    details?: {
      // Study session
      subject?: string;
      duration?: number;
      studyMaterials?: string[];
      // Food run
      restaurant?: string;
      minOrder?: number;
      deadline?: Date | { toDate: () => Date };
      // Activity
      activityType?: string;
      skillLevel?: 'beginner' | 'intermediate' | 'advanced';
      equipment?: string[];
      // Ride share
      destination?: string;
      departureTime?: Date | { toDate: () => Date };
      returnTime?: Date | { toDate: () => Date };
      costPerPerson?: number
    }
  };
  
  // Legacy props for backward compatibility
  title?: string;
  authorName?: string;
  authorAvatar?: string;
  likes?: number;
  replies?: number;
  views?: number;
  isLocked?: boolean;
  tags?: string[];
  imageUrls?: string[];
  pollOptions?: Array<{ id: string; text: string; votes: number }>;
  linkPreview?: {
    title: string;
    description: string;
    imageUrl?: string;
    domain: string
  }
}

export interface HivePostsSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hivePostsSurfaceVariants> {
  space: Space;
  posts?: Post[];
  isBuilder?: boolean;
  canPost?: boolean;
  canModerate?: boolean;
  leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
  onCreatePost?: (type: keyof typeof postTypes) => void;
  onLikePost?: (postId: string) => void;
  onReplyToPost?: (postId: string, parentCommentId?: string) => void;
  onCreateComment?: (postId: string, content: string, parentCommentId?: string) => Promise<Comment>;
  onLoadComments?: (postId: string) => Promise<Comment[]>;
  onSharePost?: (postId: string) => void;
  onPinPost?: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
  onLockPost?: (postId: string) => void;
  onViewPost?: (postId: string) => void;
  
  // NEW: Coordination callbacks
  onCoordinationResponse?: (postId: string, response: Omit<CoordinationResponse, 'id' | 'createdAt'>) => Promise<void>;
  onUpdateCoordinationStatus?: (postId: string, status: 'planning' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled') => Promise<void>;
  
  sortBy?: 'recent' | 'popular' | 'trending';
  showFilters?: boolean;
  maxPosts?: number;
  // New props for real data fetching
  autoFetch?: boolean;
  authToken?: string;
  // Integration props
  usePlatformIntegration?: boolean;
  
  // NEW: Real-time activity
  showLiveActivity?: boolean;
  liveActivityCount?: number;
  onActivityUpdate?: (activity: { type: string; user: string; action: string; timestamp: Date }) => void;
  
  // User context for coordination features
  currentUserId?: string
}

// Helper function to get auth token from session storage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionJson = localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      return process.env.NODE_ENV === 'development' 
        ? `dev_token_${session.uid}` 
        : session.token
    }
  } catch (error) {
    console.error('Error getting session:', error)
  }
  return null
};

// API function to fetch posts
const fetchPosts = async (spaceId: string, limit = 20): Promise<Post[]> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token available')
  }

  const response = await fetch(`/api/spaces/${spaceId}/posts?limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`)
  }

  const data = await response.json();
  return data.posts || []
};

export const HivePostsSurface = React.forwardRef<HTMLDivElement, HivePostsSurfaceProps>(
  ({ 
    className,
    mode,
    space,
    posts: propPosts,
    isBuilder = false,
    canPost = true,
    canModerate = false,
    leaderMode = null,
    onCreatePost,
    onLikePost,
    onReplyToPost,
    onCreateComment,
    onLoadComments,
    onSharePost,
    onPinPost,
    onDeletePost,
    onLockPost,
    onViewPost,
    onCoordinationResponse,
    onUpdateCoordinationStatus,
    sortBy = 'recent',
    showFilters = true,
    maxPosts = 10,
    autoFetch = true,
    authToken,
    usePlatformIntegration = true,
    showLiveActivity = false,
    liveActivityCount = 0,
    onActivityUpdate,
    currentUserId,
    ...props 
  }, ref) => {
    
    const [hoveredPost, setHoveredPost] = useState<string | null>(null);
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [currentSort, setCurrentSort] = useState(sortBy);
    const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
    const [fetchedPosts, setFetchedPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(autoFetch);
    const [error, setError] = useState<string | null>(null);
    const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
    const [commentText, setCommentText] = useState<Record<string, string>>({});
    const [replyText, setReplyText] = useState<Record<string, string>>({});
    const [loadingComments, setLoadingComments] = useState<Set<string>>(new Set());
    
    // Fetch posts from API if autoFetch is enabled
    useEffect(() => {
      if (!autoFetch || !space?.id) return;
      
      const loadPosts = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const posts = await fetchPosts(space.id, maxPosts);
          setFetchedPosts(posts)
        } catch (error) {
          console.error('Failed to fetch posts:', error);
          setError(error instanceof Error ? error.message : 'Failed to fetch posts')
        } finally {
          setIsLoading(false)
        }
      };

      loadPosts()
    }, [autoFetch, space?.id, maxPosts]);
    
    // Use either provided posts or fetched posts
    const posts = propPosts || fetchedPosts;
    
    // Normalize post data and sort posts
    const normalizedPosts = posts.map(post => ({
      ...post,
      // Normalize date fields
      createdAt: post.createdAt && typeof post.createdAt === 'object' && 'toDate' in post.createdAt 
        ? post.createdAt.toDate() 
        : post.createdAt instanceof Date ? post.createdAt : new Date(post.createdAt as unknown as string | number),
      updatedAt: post.updatedAt && typeof post.updatedAt === 'object' && 'toDate' in post.updatedAt 
        ? post.updatedAt.toDate() 
        : post.updatedAt instanceof Date ? post.updatedAt : new Date(post.updatedAt as unknown as string | number),
      // Use real author data or fallback to legacy fields
      authorName: post.author?.fullName || post.authorName || 'Unknown User',
      authorAvatar: post.author?.photoURL || post.authorAvatar,
      // Use real reaction data or fallback to legacy fields
      likes: post.reactions?.heart || post.likes || 0,
      replies: post.replies || 0,
      views: post.views || 0,
      // Ensure boolean fields are properly set
      isPinned: post.isPinned || false,
      isLocked: post.isLocked || false,
      tags: post.tags || [],
      // Map type if needed
      type: post.type as keyof typeof postTypes || 'discussion',
      // Create title from content if not provided
      title: post.title || post.content.slice(0, 100) + (post.content.length > 100 ? '...' : ''),
    })});

    const sortedPosts = normalizedPosts
      .sort((a, b) => {
        // Pinned posts always first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        
        switch (currentSort) {
          case 'popular':
            return (b.likes + b.replies) - (a.likes + a.replies);
          case 'trending':
            // Mock trending algorithm - consider recent engagement
            const aScore = a.likes + a.replies + (a.views / 10);
            const bScore = b.likes + b.replies + (b.views / 10);
            return bScore - aScore;
          case 'recent':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
      })}
      .slice(0, maxPosts);
    
    const handleCreatePost = useCallback((type: keyof typeof postTypes) => {
      onCreatePost?.(type);
      setShowCreateMenu(false)
    }, [onCreatePost]);
    
    const togglePostExpansion = useCallback((postId: string) => {
      setExpandedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId)
        } else {
          newSet.add(postId)
        }
        return newSet
      })}
    }, []);
    
    // Loading state
    if (isLoading) {
      return (
        <div
          ref={ref}
          className={cn(hivePostsSurfaceVariants({ mode, className }))}
          {...props}
        >
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl p-5 animate-pulse">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-600 rounded mb-2 w-32"></div>
                    <div className="h-3 bg-gray-700 rounded w-24"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Error state
    if (error) {
      return (
        <div
          ref={ref}
          className={cn(hivePostsSurfaceVariants({ mode, className }))}
          {...props}
        >
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: motionDurations.quick }}
            >
              <MessageSquare className="w-8 h-8 text-red-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">Unable to Load Posts</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm max-w-md mx-auto mb-8 leading-relaxed">
              {error}
            </p>
            
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 rounded-xl hover:bg-[var(--hive-status-info)]/30 transition-all duration-200 font-medium"
              onClick={() => {
                setError(null);
                setIsLoading(true);
                // Retry fetching
                if (autoFetch && space?.id) {
                  fetchPosts(space.id, maxPosts)
                    .then(setFetchedPosts)
                    .catch(e => setError(e.message))
                    .finally(() => setIsLoading(false))
                }
          })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      )
    }

    // Empty state
    if (posts.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(hivePostsSurfaceVariants({ mode, className }))}
          {...props}
        >
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: motionDurations.quick }}
            >
              <MessageSquare className="w-8 h-8 text-blue-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">Start the Conversation</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm max-w-md mx-auto mb-8 leading-relaxed">
              This Space is ready for discussions! Share questions, ideas, and connect with the community through posts and threads.
            </p>
            
            {canPost && (
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 rounded-xl hover:bg-[var(--hive-status-info)]/30 transition-all duration-200 font-medium"
                onClick={() => setShowCreateMenu(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                Create First Post
              </motion.button>
            )}
          </motion.div>
        </div>
      )
    }
    
    return (
      <div
        ref={ref}
        className={cn(hivePostsSurfaceVariants({ mode, className }))}
        {...props}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Posts</h3>
            <span className="text-sm text-[var(--hive-text-secondary)]">{posts.length} discussions</span>
            
            {/* NEW: Live Activity Indicator */}
            {showLiveActivity && liveActivityCount && liveActivityCount > 0 && (
              <motion.div
                className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.05, 1]
          }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  scale: { repeat: Infinity, duration: 2 }
          }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-300">
                  {liveActivityCount} active now
                </span>
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Sort Options */}
            {showFilters && (
              <select
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value as any)}
                className="bg-[var(--hive-background-primary)]/20 text-[var(--hive-text-primary)] border border-[var(--hive-border-subtle)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--hive-status-info)]/50"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
              </select>
            )}
            
            {/* Create Post Button */}
            {canPost && (
              <div className="relative">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 rounded-xl hover:bg-[var(--hive-status-info)]/30 transition-all duration-200 font-medium"
                  onClick={() => setShowCreateMenu(!showCreateMenu)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Post</span>
                </motion.button>
                
                {/* Create Menu */}
                <AnimatePresence>
                  {showCreateMenu && (
                    <motion.div
                      className="absolute top-full right-0 mt-2 w-64 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-20"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: motionDurations.quick }}
                    >
                      <div className="p-2">
                        {Object.entries(postTypes).map(([type, config]) => {
                          const Icon = config.icon;
                          return (
                            <motion.button
                              key={type}
                              className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                              onClick={() => handleCreatePost(type as keyof typeof postTypes)}
                              whileHover={{ x: 4 }}
                            >
                              <Icon className={cn("w-5 h-5", config.color)} />
                              <div>
                                <div className="text-sm font-medium text-[var(--hive-text-primary)]">{config.label}</div>
                                <div className="text-xs text-gray-400">{config.description}</div>
                              </div>
                            </motion.button>
                          )
          })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        
        {/* Posts Feed */}
        <div className="space-y-4">
          {sortedPosts.map((post, index) => {
            const typeConfig = postTypes[post.type];
            const TypeIcon = typeConfig.icon;
            const isHovered = hoveredPost === post.id;
            const isExpanded = expandedPosts.has(post.id);
            
            return (
              <motion.article
                key={post.id}
                className={cn(
                  "relative group bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-200",
                  isHovered && "border-white/10",
                  post.isPinned && "ring-1 ring-yellow-500/30 bg-yellow-500/5",
                  mode === 'edit' && "hover:ring-2 hover:ring-blue-500/30"
                )}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                {/* Pinned Indicator */}
                {post.isPinned && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500/50 to-yellow-500/20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  />
                )}
                
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Author Avatar */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                        {post.authorAvatar ? (
                          <img src={post.authorAvatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                              {post.authorName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-[var(--hive-text-primary)] text-sm">{post.authorName}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <time className="text-xs text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </time>
                          {post.isPinned && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <div className="flex items-center gap-1 text-xs text-yellow-400">
                                <Pin className="w-3 h-3" />
                                <span>Pinned</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <TypeIcon className={cn("w-4 h-4", typeConfig.color)} />
                          <span className="text-xs text-gray-400">{typeConfig.label}</span>
                          {post.tags.length > 0 && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <div className="flex items-center gap-1">
                                {post.tags.slice(0, 2).map((tag, i) => (
                                  <span key={i} className="text-xs bg-[var(--hive-text-primary)]/5 px-2 py-0.5 rounded text-gray-300">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Post Actions */}
                    <div className="flex items-center gap-1">
                      {/* Moderation Actions - Enhanced for Leader Toolbar */}
                      {(canModerate || leaderMode === 'moderate') && (
                        <AnimatePresence>
                          {(isHovered || mode === 'edit' || leaderMode === 'moderate') && (
                            <motion.div
                              className="flex items-center gap-1"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                            >
                              <motion.button
                                className={cn(
                                  "p-1.5 rounded-lg transition-all duration-200",
                                  leaderMode === 'moderate' 
                                    ? "text-yellow-400 bg-yellow-500/20 border border-yellow-500/30" 
                                    : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"
                                )}
                                onClick={() => onPinPost?.(post.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Pin className="w-3.5 h-3.5" />
                              </motion.button>
                              
                              {onLockPost && (
                                <motion.button
                                  className={cn(
                                    "p-1.5 rounded-lg transition-all duration-200",
                                    leaderMode === 'moderate' 
                                      ? "text-orange-400 bg-orange-500/20 border border-orange-500/30" 
                                      : "text-gray-400 hover:text-orange-400 hover:bg-orange-500/10"
                                  )}
                                  onClick={() => onLockPost(post.id)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Lock className="w-3.5 h-3.5" />
                                </motion.button>
                              )}
                              
                              <motion.button
                                className={cn(
                                  "p-1.5 rounded-lg transition-all duration-200",
                                  leaderMode === 'moderate' 
                                    ? "text-red-400 bg-red-500/20 border border-red-500/30" 
                                    : "text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                                )}
                                onClick={() => onDeletePost?.(post.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </motion.button>
                              
                              {/* Leader Mode Indicator */}
                              {leaderMode === 'moderate' && (
                                <motion.div
                                  className="ml-2 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  Moderate
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                      
                      <motion.button
                        className="p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-[var(--hive-text-primary)] text-base leading-snug">
                      {post.title}
                    </h4>
                    
                    <div className={cn(
                      "text-sm text-gray-300 leading-relaxed",
                      !isExpanded && "line-clamp-3"
                    )}>
                      {post.content}
                    </div>
                    
                    {post.content.length > 200 && (
                      <motion.button
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={() => togglePostExpansion(post.id)}
                        whileHover={{ scale: 1.02 }}
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </motion.button>
                    )}
                    
                    {/* Poll Options */}
                    {post.pollOptions && (
                      <div className="space-y-2">
                        {post.pollOptions.map((option, i) => (
                          <motion.div
                            key={option.id}
                            className="relative p-3 bg-[var(--hive-text-primary)]/5 rounded-lg cursor-pointer hover:bg-[var(--hive-text-primary)]/10 transition-all duration-200"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[var(--hive-text-primary)]">{option.text}</span>
                              <span className="text-xs text-gray-400">{option.votes} votes</span>
                            </div>
                            <div 
                              className="absolute bottom-0 left-0 h-0.5 bg-purple-500/50 rounded-full"
                              style={{ 
                                width: `${(option.votes / Math.max(...post.pollOptions!.map(o => o.votes))) * 100}%` 
          }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {/* Link Preview */}
                    {post.linkPreview && (
                      <motion.div
                        className="p-3 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/5"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex gap-3">
                          {post.linkPreview.imageUrl && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                              <img 
                                src={post.linkPreview.imageUrl} 
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-medium text-[var(--hive-text-primary)] truncate">
                              {post.linkPreview.title}
                            </h5>
                            <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                              {post.linkPreview.description}
                            </p>
                            <span className="text-xs text-blue-400 mt-1 block">
                              {post.linkPreview.domain}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Engagement Bar */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <motion.button
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors"
                        onClick={() => onLikePost?.(post.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-400 transition-colors"
                        onClick={() => {
                          if (expandedComments.has(post.id)) {
                            setExpandedComments(prev => {
                              const newSet = new Set(prev);
                              newSet.delete(post.id);
                              return newSet
                            })}
                          } else {
                            setExpandedComments(prev => new Set([...prev, post.id]))
                          }
          })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Reply className="w-4 h-4" />
                        <span>{post.replyCount || post.replies || 0}</span>
                        <span className="ml-1">{expandedComments.has(post.id) ? 'Hide' : 'Reply'}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 transition-colors"
                        onClick={() => onSharePost?.(post.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                      
                      <motion.button
                        className="p-1 hover:text-yellow-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* NEW: Coordination Section */}
                  {post.coordinationData && (
                    <CoordinationSection 
                      post={post}
                      onCoordinationResponse={onCoordinationResponse}
                      onUpdateStatus={onUpdateCoordinationStatus}
                      currentUserId={currentUserId}
                    />
                  )}
                  
                  {/* Comments Section */}
                  {expandedComments.has(post.id) && (
                    <motion.div
                      className="mt-4 pt-4 border-t border-white/5"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {/* Comment Input */}
                      <div className="mb-4">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                              <span className="text-xs font-medium text-[var(--hive-text-primary)]">U</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <textarea
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder-gray-400 resize-none focus:outline-none focus:border-blue-400/50 transition-colors"
                              placeholder="Add a comment..."
                              rows={2}
                              value={commentText[post.id] || ''}
                              onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                            />
                            {commentText[post.id]?.trim() && (
                              <div className="flex justify-end mt-2">
                                <motion.button
                                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors"
                                  onClick={async () => {
                                    if (onCreateComment && commentText[post.id]?.trim()) {
                                      try {
                                        await onCreateComment(post.id, commentText[post.id].trim());
                                        setCommentText(prev => ({ ...prev, [post.id]: '' }));
                                        // Refresh comments if needed
                                        if (onLoadComments) {
                                          const comments = await onLoadComments(post.id);
                                          // Update post with new comments - would need state management
                                        }
                                      } catch (error) {
                                        console.error('Failed to create comment:', error)
                                      }
                                    }
          })}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Send className="w-3 h-3 mr-1 inline" />
                                  Comment
                                </motion.button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Comments List */}
                      {post.comments && post.comments.length > 0 && (
                        <div className="space-y-3">
                          {post.comments.map((comment) => (
                            <CommentThread
                              key={comment.id}
                              comment={comment}
                              onReply={(commentId, content) => {
                                if (onCreateComment) {
                                  onCreateComment(post.id, content, commentId)
                                }
          })}
                              level={0}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Load Comments Button */}
                      {!post.comments && (post.replyCount || post.replies) > 0 && (
                        <div className="text-center">
                          <motion.button
                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            onClick={async () => {
                              if (onLoadComments && !loadingComments.has(post.id)) {
                                setLoadingComments(prev => new Set([...prev, post.id]));
                                try {
                                  const comments = await onLoadComments(post.id);
                                  // Would need to update the post with comments in parent state
                                } catch (error) {
                                  console.error('Failed to load comments:', error)
                                } finally {
                                  setLoadingComments(prev => {
                                    const newSet = new Set(prev);
                                    newSet.delete(post.id);
                                    return newSet
                                  })}
                                }
                              }
          })}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {loadingComments.has(post.id) ? (
                              <><Loader2 className="w-4 h-4 mr-2 inline animate-spin" />Loading comments...</>
                            ) : (
                              <>View {post.replyCount || post.replies} {(post.replyCount || post.replies) === 1 ? 'comment' : 'comments'}</>
                            )}
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
        
        {/* Builder Hint */}
        {isBuilder && mode === 'edit' && (
          <motion.div
            className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-400 mb-1">Builder Mode Active</h4>
                <p className="text-xs text-blue-300/80">
                  Posts drive community engagement. Enable posting Tools to let members share ideas, ask questions, and build connections.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    )
  }
);

HivePostsSurface.displayName = "HivePostsSurface";

export { hivePostsSurfaceVariants, postTypes };