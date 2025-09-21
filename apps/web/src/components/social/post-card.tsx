"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Card,
  Button,
  ShadcnAvatar as Avatar,
  ShadcnAvatarImage as AvatarImage,
  ShadcnAvatarFallback as AvatarFallback,
  Badge,
  Textarea,
  Progress,
} from '@hive/ui';
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Pin,
  Bookmark,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  Eye,
  Send,
  Reply,
  Download,
  Copy,
  CheckCircle,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  currentUserId: string;
  onLike: (_postId: string) => Promise<void>;
  onComment: (_postId: string, _content: string) => Promise<void>;
  onShare: (_postId: string) => Promise<void>;
  onEdit?: (_postId: string) => void;
  onDelete?: (_postId: string) => Promise<void>;
  onVote?: (_postId: string, _optionId: string) => Promise<void>;
  showComments?: boolean;
  isCompact?: boolean;
}

interface Post {
  id: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'link' | 'poll' | 'event' | 'tool' | 'announcement';
  author: {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
    isVerified?: boolean;
    badges?: string[];
  };
  createdAt: string;
  updatedAt?: string;
  visibility: 'public' | 'space' | 'private';
  spaceId?: string;
  spaceName?: string;
  attachments?: Attachment[];
  mentions?: string[];
  tags?: string[];
  poll?: Poll;
  event?: Event;
  location?: Location;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    hasLiked: boolean;
    hasBookmarked: boolean;
  };
  comments?: Comment[];
  isPinned?: boolean;
  isEdited?: boolean;
}

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
  };
  createdAt: string;
  likes: number;
  hasLiked: boolean;
  replies?: Comment[];
  isReply?: boolean;
}

interface Attachment {
  id: string;
  type: 'image' | 'video' | 'file' | 'link' | 'tool';
  url: string;
  name: string;
  size?: number;
  metadata?: Record<string, any>;
}

interface Poll {
  question: string;
  options: PollOption[];
  allowMultiple: boolean;
  expiresAt?: string;
  totalVotes: number;
  hasVoted: boolean;
  userVotes?: string[];
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface Event {
  title: string;
  description: string;
  startTime: string;
  endTime?: string;
  location?: string;
  attendees?: number;
  isAttending?: boolean;
}

interface Location {
  name: string;
  coordinates?: [number, number];
}

export function PostCard({
  post,
  currentUserId: _currentUserId,
  onLike,
  onComment,
  onShare,
  onEdit: _onEdit,
  onDelete: _onDelete,
  onVote,
  showComments = true,
  isCompact: _isCompact = false
}: PostCardProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [_replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isActing, setIsActing] = useState<string | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);
  
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleLike = async () => {
    if (isActing) return;
    setIsActing('like');
    try {
      await onLike(post.id);
    } finally {
      setIsActing(null);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim() || isActing) return;
    setIsActing('comment');
    try {
      await onComment(post.id, commentText.trim());
      setCommentText('');
      setIsCommenting(false);
    } finally {
      setIsActing(null);
    }
  };

  const handleShare = async () => {
    if (isActing) return;
    setIsActing('share');
    try {
      await onShare(post.id);
    } finally {
      setIsActing(null);
    }
  };

  const handleVote = async (optionId: string) => {
    if (!onVote || isActing) return;
    setIsActing('vote');
    try {
      await onVote(post.id, optionId);
    } finally {
      setIsActing(null);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
  };

  const getPostTypeIcon = () => {
    switch (post.type) {
      case 'announcement': return <Pin className="h-4 w-4 text-hive-gold" />;
      case 'poll': return <Badge className="text-xs bg-blue-500/20 text-blue-400">Poll</Badge>;
      case 'event': return <Badge className="text-xs bg-purple-500/20 text-purple-400">Event</Badge>;
      case 'tool': return <Badge className="text-xs bg-green-500/20 text-green-400">Tool</Badge>;
      default: return null;
    }
  };

  const getVisibilityIcon = () => {
    switch (post.visibility) {
      case 'space': return <Users className="h-3 w-3 text-hive-text-mutedLight" />;
      case 'private': return <Eye className="h-3 w-3 text-hive-text-mutedLight" />;
      default: return null;
    }
  };

  const shouldTruncateContent = post.content.length > 300 && !showFullContent;
  const displayContent = shouldTruncateContent 
    ? post.content.slice(0, 300) + '...' 
    : post.content;

  const visibleComments = showAllComments ? (post.comments || []) : (post.comments || []).slice(0, 3);

  const renderAttachments = () => {
    if (!post.attachments?.length) return null;

    return (
      <div className="mt-3 space-y-2">
        {post.attachments.map(attachment => (
          <div key={attachment.id} className="border border-hive-border-default rounded-lg overflow-hidden">
            {attachment.type === 'image' && (
              <Image
                src={attachment.url}
                alt={attachment.name}
                width={800}
                height={400}
                className="w-full max-h-96 object-cover"
              />
            )}
            {attachment.type === 'link' && (
              <div className="p-3 bg-hive-background-tertiary">
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-blue-400" />
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 truncate"
                  >
                    {attachment.name}
                  </a>
                </div>
              </div>
            )}
            {attachment.type === 'file' && (
              <div className="p-3 bg-hive-background-tertiary flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Download className="h-4 w-4 text-hive-text-mutedLight" />
                  <span className="text-sm text-white">{attachment.name}</span>
                  {attachment.size && (
                    <span className="text-xs text-hive-text-mutedLight">
                      ({(attachment.size / 1024).toFixed(1)}KB)
                    </span>
                  )}
                </div>
                <Button variant="secondary" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderPoll = () => {
    if (!post.poll) return null;

    const isExpired = post.poll.expiresAt && new Date(post.poll.expiresAt) < new Date();

    return (
      <div className="mt-3 p-4 bg-hive-background-tertiary rounded-lg">
        <h4 className="font-medium text-white mb-3">{post.poll.question}</h4>
        
        <div className="space-y-2">
          {post.poll.options.map(option => (
            <div key={option.id} className="space-y-1">
              <button
                onClick={() => handleVote(option.id)}
                disabled={isExpired || post.poll!.hasVoted || isActing === 'vote'}
                className={`w-full p-2 rounded text-left transition-colors ${
                  post.poll!.hasVoted || isExpired
                    ? 'cursor-default'
                    : 'hover:bg-hive-background-overlay cursor-pointer'
                } ${
                  post.poll!.userVotes?.includes(option.id)
                    ? 'bg-hive-gold/20 border border-hive-gold'
                    : 'bg-hive-background-overlay'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white">{option.text}</span>
                  <span className="text-sm text-hive-text-mutedLight">
                    {option.percentage}% ({option.votes})
                  </span>
                </div>
                {(post.poll!.hasVoted || isExpired) && (
                  <Progress value={option.percentage} className="h-1 mt-1" />
                )}
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-3 text-sm text-hive-text-mutedLight">
          <span>{post.poll.totalVotes} votes</span>
          {post.poll.expiresAt && (
            <span>
              {isExpired 
                ? 'Expired' 
                : `Ends ${formatDistanceToNow(new Date(post.poll.expiresAt), { addSuffix: true })}`
              }
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderEvent = () => {
    if (!post.event) return null;

    return (
      <div className="mt-3 p-4 bg-hive-background-tertiary rounded-lg">
        <h4 className="font-medium text-white mb-2">{post.event.title}</h4>
        {post.event.description && (
          <p className="text-hive-text-mutedLight text-sm mb-3">{post.event.description}</p>
        )}
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-hive-text-mutedLight" />
            <span className="text-white">
              {new Date(post.event.startTime).toLocaleString()}
              {post.event.endTime && ` - ${new Date(post.event.endTime).toLocaleString()}`}
            </span>
          </div>
          
          {post.event.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-hive-text-mutedLight" />
              <span className="text-white">{post.event.location}</span>
            </div>
          )}
          
          {post.event.attendees !== undefined && (
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-hive-text-mutedLight" />
              <span className="text-white">{post.event.attendees} attending</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mt-3">
          <Button
            size="sm"
            className={post.event.isAttending 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-hive-gold text-hive-obsidian hover:bg-hive-champagne'
            }
          >
            {post.event.isAttending ? 'Attending' : 'Attend'}
          </Button>
          <Button variant="secondary" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Add to Calendar
          </Button>
        </div>
      </div>
    );
  };

  const renderComments = () => {
    if (!showComments || !post.comments?.length) return null;

    return (
      <div className="mt-4 space-y-3">
        {visibleComments.map(comment => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
              <AvatarFallback className="text-xs">
                {comment.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="bg-hive-background-tertiary rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-white text-sm">{comment.author.name}</span>
                  <span className="text-xs text-hive-text-mutedLight">
                    @{comment.author.handle}
                  </span>
                  <span className="text-xs text-hive-text-mutedLight">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-white text-sm">{comment.content}</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-1">
                <button
                  className={`flex items-center space-x-1 text-xs ${
                    comment.hasLiked ? 'text-red-400' : 'text-hive-text-mutedLight hover:text-red-400'
                  }`}
                >
                  <Heart className={`h-3 w-3 ${comment.hasLiked ? 'fill-current' : ''}`} />
                  <span>{comment.likes}</span>
                </button>
                
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className="text-xs text-hive-text-mutedLight hover:text-white"
                >
                  <Reply className="h-3 w-3 mr-1 inline" />
                  Reply
                </button>
              </div>
              
              {/* Nested replies */}
              {comment.replies?.map(reply => (
                <div key={reply.id} className="flex space-x-2 mt-2 ml-4">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={reply.author.avatarUrl} alt={reply.author.name} />
                    <AvatarFallback className="text-xs">
                      {reply.author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 bg-hive-background-overlay rounded-lg p-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-white text-xs">{reply.author.name}</span>
                      <span className="text-xs text-hive-text-mutedLight">
                        {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-white text-xs">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Show More Comments */}
        {(post.comments?.length || 0) > 3 && !showAllComments && (
          <button
            onClick={() => setShowAllComments(true)}
            className="text-sm text-hive-gold hover:text-hive-champagne"
          >
            Show {(post.comments?.length || 0) - 3} more comments
          </button>
        )}
      </div>
    );
  };

  return (
    <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
              <AvatarFallback className="bg-hive-gold text-hive-obsidian font-semibold">
                {post.author.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-white">{post.author.name}</span>
                {post.author.isVerified && (
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                )}
                {post.author.badges?.map(badge => (
                  <Badge key={badge} variant="sophomore" className="text-xs">
                    {badge}
                  </Badge>
                ))}
                {getPostTypeIcon()}
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-hive-text-mutedLight">
                <span>@{post.author.handle}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                {post.isEdited && (
                  <>
                    <span>•</span>
                    <span>edited</span>
                  </>
                )}
                {post.spaceName && (
                  <>
                    <span>•</span>
                    <span>in {post.spaceName}</span>
                  </>
                )}
                {getVisibilityIcon()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {post.isPinned && <Pin className="h-4 w-4 text-hive-gold" />}
            <Button variant="secondary" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="text-white whitespace-pre-wrap">
            {displayContent}
            {shouldTruncateContent && (
              <button
                onClick={() => setShowFullContent(true)}
                className="text-hive-gold hover:text-hive-champagne ml-2"
              >
                Show more
              </button>
            )}
          </div>
          
          {/* Hashtags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags?.map(tag => (
                <button
                  key={tag}
                  className="text-hive-gold hover:text-hive-champagne text-sm"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Attachments, Poll, Event */}
        {renderAttachments()}
        {renderPoll()}
        {renderEvent()}

        {/* Engagement Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-hive-border-default">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              disabled={isActing === 'like'}
              className={`flex items-center space-x-2 p-2 rounded-lg min-h-[44px] ${
                post.engagement.hasLiked 
                  ? 'text-red-400' 
                  : 'text-hive-text-mutedLight hover:text-red-400'
              } transition-colors`}
            >
              <Heart className={`h-5 w-5 ${post.engagement.hasLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">{post.engagement.likes}</span>
            </button>
            
            <button
              onClick={() => setIsCommenting(!isCommenting)}
              className="flex items-center space-x-2 p-2 rounded-lg min-h-[44px] text-hive-text-mutedLight hover:text-blue-400 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{post.engagement.comments}</span>
            </button>
            
            <button
              onClick={handleShare}
              disabled={isActing === 'share'}
              className="flex items-center space-x-2 p-2 rounded-lg min-h-[44px] text-hive-text-mutedLight hover:text-green-400 transition-colors"
            >
              <Share2 className="h-5 w-5" />
              <span className="text-sm">{post.engagement.shares}</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className={`p-2 rounded ${post.engagement.hasBookmarked ? 'text-hive-gold' : 'text-hive-text-mutedLight hover:text-hive-gold'}`}>
              <Bookmark className={`h-4 w-4 ${post.engagement.hasBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <button onClick={handleCopyLink} className="p-2 rounded text-hive-text-mutedLight hover:text-white">
              <Copy className="h-4 w-4" />
            </button>
            
            <span className="text-xs text-hive-text-mutedLight">
              {post.engagement.views} views
            </span>
          </div>
        </div>

        {/* Comment Input */}
        {isCommenting && (
          <div className="flex space-x-3 pt-3 border-t border-hive-border-default">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">U</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <Textarea
                ref={commentInputRef}
                value={commentText}
                onChange={(e: React.ChangeEvent) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                rows={2}
                className="resize-none"
              />
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-hive-text-mutedLight">
                  {commentText.length}/500
                </span>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setIsCommenting(false);
                      setCommentText('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleComment}
                    disabled={!commentText.trim() || isActing === 'comment'}
                    size="sm"
                    className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isActing === 'comment' ? 'Posting...' : 'Comment'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comments */}
        {renderComments()}
      </div>
    </Card>
  );
}