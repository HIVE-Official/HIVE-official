"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal, 
  Clock, 
  Users,
  Pin,
  Flag,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';

// HIVE UI Components
import { 
  Card, 
  CardContent,
  Button,
  Avatar,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@hive/ui';

// Types
interface PostDisplayProps {
  post: {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      handle: string;
      avatar?: string;
    };
    createdAt: string;
    type: string;
    visibility: string;
    spaceId?: string;
    spaceName?: string;
    likes: number;
    comments: number;
    shares: number;
    isLiked?: boolean;
    isPinned?: boolean;
    attachments?: any[];
  };
  currentUserId?: string;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onEdit?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  compact?: boolean;
}

export function PostDisplay({ 
  post, 
  currentUserId, 
  onLike, 
  onComment, 
  onShare, 
  onEdit, 
  onDelete,
  compact = false 
}: PostDisplayProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isLiking, setIsLiking] = useState(false);

  const isOwnPost = currentUserId === post.author.id;

  const handleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);
      const newLikedState = !isLiked;
      
      // Optimistic update
      setIsLiked(newLikedState);
      setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);

      // TODO: Replace with actual API call
      // await fetch(`/api/posts/${post.id}/like`, { method: newLikedState ? 'POST' : 'DELETE' });
      
      onLike?.(post.id);
    } catch (error) {
      // Revert on error
      setIsLiked(post.isLiked || false);
      setLikeCount(post.likes);
      console.error('Failed to like post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                {post.author.avatar ? (
                  <img src={post.author.avatar} alt={post.author.name} className="rounded-full" />
                ) : (
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-[var(--hive-text-inverse)] font-medium">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                )}
              </Avatar>
              
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">{post.author.name}</span>
                  {post.isPinned && (
                    <Pin className="h-4 w-4 text-amber-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>@{post.author.handle}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(post.createdAt)}</span>
                  </div>
                  {post.spaceName && (
                    <>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{post.spaceName}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Post Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isOwnPost ? (
                  <>
                    <DropdownMenuItem onClick={() => onEdit?.(post.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Post
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete?.(post.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Post
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Flag className="h-4 w-4 mr-2" />
                      Report Post
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content */}
          <div className="text-foreground">
            <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
            
            {/* Post Type Badge */}
            {post.type !== 'text' && (
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs capitalize">
                  {post.type}
                </Badge>
              </div>
            )}
          </div>

          {/* Attachments */}
          {post.attachments && post.attachments.length > 0 && (
            <div className="rounded-lg border border-border bg-accent/30 p-3">
              <p className="text-sm text-muted-foreground">
                {post.attachments.length} attachment(s) • Feature coming soon
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center space-x-6">
              
              {/* Like */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center space-x-2 ${
                  isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500'
                }`}
              >
                <motion.div
                  animate={{ scale: isLiking ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </motion.div>
                <span className="text-sm">{likeCount}</span>
              </Button>

              {/* Comment */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onComment?.(post.id)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{post.comments}</span>
              </Button>

              {/* Share */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare?.(post.id)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-green-500"
              >
                <Share className="h-4 w-4" />
                <span className="text-sm">{post.shares}</span>
              </Button>
            </div>

            {/* Visibility Badge */}
            <Badge variant="outline" className="text-xs capitalize">
              {post.visibility}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}