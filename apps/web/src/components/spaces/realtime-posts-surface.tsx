"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { useRealtimePosts, useRealtimeComments, RealtimePost } from '@/hooks/use-realtime-posts';
import { useAuth } from '@/hooks/use-auth';
import { Button, Card, Avatar, Badge, Input, Textarea } from '@hive/ui';
import { 
  MessageSquare, 
  Heart,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  Send,
  RefreshCw,
  Loader2,
  AlertCircle,
  Plus,
  MapPin,
  Calendar,
  Users,
  Car,
  Coffee,
  BookOpen
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { collection, addDoc, updateDoc, doc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadPostImages, compressImage } from '@/lib/firebase-storage';
import Image from 'next/image';

interface RealtimePostsSurfaceProps {
  spaceId: string;
  spaceName?: string;
  canPost?: boolean;
  className?: string;
}

const POST_TYPE_CONFIG = {
  general: { icon: MessageSquare, color: 'text-gray-500', label: 'Discussion' },
  study_session: { icon: BookOpen, color: 'text-blue-500', label: 'Study Session' },
  food_run: { icon: Coffee, color: 'text-orange-500', label: 'Food Run' },
  ride_share: { icon: Car, color: 'text-green-500', label: 'Ride Share' },
  party: { icon: Users, color: 'text-purple-500', label: 'Party' },
  emergency: { icon: AlertCircle, color: 'text-red-500', label: 'Emergency' }
};

export function RealtimePostsSurface({
  spaceId,
  spaceName = 'Space',
  canPost = true,
  className = ''
}: RealtimePostsSurfaceProps) {
  const { user } = useAuth();
  const { posts, loading, error, refresh, subscribed } = useRealtimePosts({ 
    spaceId, 
    userId: user?.id 
  });
  
  const [isCreating, setIsCreating] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<RealtimePost['type']>('general');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  // Create a new post
  const handleCreatePost = async () => {
    if (!user || !newPostContent.trim()) return;

    setIsPosting(true);
    try {
      // Upload images to Firebase Storage
      let imageUrls: string[] = [];
      if (selectedImages.length > 0) {
        // Compress images before upload
        const compressedImages = await Promise.all(
          selectedImages.map(file => compressImage(file, 1920, 1080, 0.85))
        );
        
        // Upload compressed images
        imageUrls = await uploadPostImages(
          compressedImages,
          user.id,
          spaceId,
          (progress: any) => {
          }
        );
      }
      
      const postData = {
        content: newPostContent,
        authorId: user.id,
        authorName: user.displayName || 'Anonymous',
        authorAvatar: user.photoURL,
        spaceId,
        type: newPostType,
        images: imageUrls,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        comments: 0,
        likedBy: [],
        tags: extractHashtags(newPostContent),
        metadata: {}
      };

      await addDoc(collection(db, 'posts'), postData);
      
      // Reset form
      setNewPostContent('');
      setSelectedImages([]);
      setIsCreating(false);
      setNewPostType('general');
      
      // Show success (in production, use toast)
    } catch (err) {
      logger.error('Error creating post:', { error: String(err) });
      alert('Failed to create post');
    } finally {
      setIsPosting(false);
    }
  };

  // Like/unlike a post
  const handleLikePost = async (post: RealtimePost) => {
    if (!user) return;

    try {
      const postRef = doc(db, 'posts', post.id);
      
      if (post.isLiked) {
        await updateDoc(postRef, {
          likes: increment(-1),
          likedBy: arrayRemove(user.id)
        });
      } else {
        await updateDoc(postRef, {
          likes: increment(1),
          likedBy: arrayUnion(user.id)
        });
      }
    } catch (err) {
      logger.error('Error updating like:', { error: String(err) });
    }
  };

  // Add comment to post
  const handleAddComment = async (postId: string, content: string) => {
    if (!user || !content.trim()) return;

    try {
      await addDoc(collection(db, `posts/${postId}/comments`), {
        content,
        authorId: user.id,
        authorName: user.displayName || 'Anonymous',
        authorAvatar: user.photoURL,
        createdAt: new Date(),
        likes: 0
      });

      // Update comment count
      await updateDoc(doc(db, 'posts', postId), {
        comments: increment(1)
      });
    } catch (err) {
      logger.error('Error adding comment:', { error: String(err) });
    }
  };

  // Extract hashtags from content
  const extractHashtags = (text: string): string[] => {
    const regex = /#[a-zA-Z0-9_]+/g;
    return (text.match(regex) || []).map(tag => tag.slice(1));
  };

  // Toggle comments section
  const toggleComments = (postId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Render individual post
  const renderPost = (post: RealtimePost) => {
    const typeConfig = POST_TYPE_CONFIG[post.type] || POST_TYPE_CONFIG.general;
    const TypeIcon = typeConfig.icon;
    const showComments = expandedComments.has(post.id);

    return (
      <Card key={post.id} className="overflow-hidden">
        <div className="p-4">
          {/* Post Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar
                src={post.authorAvatar}
                alt={post.authorName}
                fallback={post.authorName[0]}
                size="sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.authorName}</span>
                  <Badge variant="secondary" className="text-xs">
                    <TypeIcon className="h-3 w-3 mr-1" />
                    {typeConfig.label}
                  </Badge>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-3">
            <p className="text-sm whitespace-pre-wrap">{post.content}</p>
            
            {/* Images */}
            {post.images && post.images.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {post.images.map((image, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={image}
                      alt={`Post image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLikePost(post)}
                className={post.isLiked ? 'text-red-500' : ''}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="ml-1 text-xs">{post.likes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleComments(post.id)}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="ml-1 text-xs">{post.comments}</span>
              </Button>
              
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <CommentsSection
              postId={post.id}
              onAddComment={handleAddComment}
            />
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className={`realtime-posts-surface ${className}`}>
      {/* Connection Status */}
      {!subscribed && !loading && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-600 dark:text-yellow-400">
              Not receiving real-time updates
            </span>
          </div>
          <Button size="sm" variant="outline" onClick={refresh}>
            <RefreshCw className="h-3 w-3 mr-1" />
            Reconnect
          </Button>
        </div>
      )}

      {/* Create Post */}
      {canPost && !isCreating && (
        <Card className="mb-4">
          <button
            onClick={() => setIsCreating(true)}
            className="w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Avatar
              src={user?.photoURL}
              alt={user?.displayName || 'You'}
              fallback={user?.displayName?.[0] || 'U'}
              size="sm"
            />
            <span className="text-gray-500">What's happening in {spaceName}?</span>
          </button>
        </Card>
      )}

      {/* Post Creation Form */}
      {isCreating && (
        <Card className="mb-4 p-4">
          <div className="flex items-start gap-3">
            <Avatar
              src={user?.photoURL}
              alt={user?.displayName || 'You'}
              fallback={user?.displayName?.[0] || 'U'}
              size="sm"
            />
            <div className="flex-1">
              <Textarea
                value={newPostContent}
                onChange={(e: any) => setNewPostContent(e.target.value)}
                placeholder={`Share with ${spaceName}...`}
                className="min-h-[100px] mb-3"
                autoFocus
              />
              
              {/* Post Type Selection */}
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(POST_TYPE_CONFIG).map(([type, config]) => {
                  const Icon = config.icon;
                  return (
                    <button
                      key={type}
                      onClick={() => setNewPostType(type as RealtimePost['type'])}
                      className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 transition-colors ${
                        newPostType === type
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </button>
                  );
                })}
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e: any) => setSelectedImages(Array.from(e.target.files || []))}
                  />
                  
                  {selectedImages.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {selectedImages.length} image(s) selected
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsCreating(false);
                      setNewPostContent('');
                      setSelectedImages([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleCreatePost}
                    disabled={!newPostContent.trim() || isPosting}
                  >
                    {isPosting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-1" />
                        Post
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Posts List */}
      {loading && posts.length === 0 ? (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">Loading posts...</p>
        </div>
      ) : error ? (
        <Card className="p-8 text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-500" />
          <p className="text-red-600 dark:text-red-400">Failed to load posts</p>
          <Button size="sm" variant="outline" onClick={refresh} className="mt-2">
            Try Again
          </Button>
        </Card>
      ) : posts.length === 0 ? (
        <Card className="p-8 text-center">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500 mb-2">No posts yet</p>
          {canPost && (
            <p className="text-sm text-gray-400">Be the first to post in {spaceName}!</p>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map(renderPost)}
        </div>
      )}

      {/* Real-time Indicator */}
      {subscribed && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live
        </div>
      )}
    </div>
  );
}

// Comments Section Component
function CommentsSection({ 
  postId, 
  onAddComment 
}: { 
  postId: string; 
  onAddComment: (postId: string, content: string) => void;
}) {
  const { comments, loading } = useRealtimeComments(postId);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    await onAddComment(postId, newComment);
    setNewComment('');
    setIsSubmitting(false);
  };

  return (
    <div className="mt-4 pt-4 border-t">
      {/* Comment Input */}
      <div className="flex gap-2 mb-3">
        <Input
          value={newComment}
          onChange={(e: any) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          onKeyPress={(e: any) => e.key === 'Enter' && handleSubmit()}
          disabled={isSubmitting}
        />
        <Button 
          size="sm" 
          onClick={handleSubmit}
          disabled={!newComment.trim() || isSubmitting}
        >
          <Send className="h-3 w-3" />
        </Button>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-2">
          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-xs text-gray-500 text-center py-2">No comments yet</p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-2">
              <Avatar
                src={comment.authorAvatar}
                alt={comment.authorName}
                fallback={comment.authorName[0]}
                size="xs"
              />
              <div className="flex-1">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                  <p className="text-xs font-medium">{comment.authorName}</p>
                  <p className="text-sm">{comment.content}</p>
                </div>
                <span className="text-xs text-gray-500 ml-3">
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}