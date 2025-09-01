"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Image, 
  Link, 
  MapPin, 
  Calendar, 
  Hash, 
  X, 
  Smile,
  AtSign,
  Users,
  Globe,
  Lock
} from 'lucide-react';

// HIVE UI Components
import { 
  Card, 
  CardContent,
  Button,
  Textarea,
  Avatar,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@hive/ui';

// Hooks
import { useUnifiedAuth } from '@hive/ui';

// Types
interface PostCreatorProps {
  spaceId?: string;
  spaceName?: string;
  onPostCreated?: (post: any) => void;
  placeholder?: string;
  compact?: boolean;
}

interface PostDraft {
  content: string;
  type: 'text' | 'image' | 'link' | 'poll' | 'event' | 'announcement';
  visibility: 'public' | 'space' | 'private';
  spaceId?: string;
  attachments: any[];
  tags: string[];
  mentions: string[];
}

const POST_TYPES = {
  text: { label: 'Text Post', icon: Hash, color: 'text-blue-500' },
  image: { label: 'Photo/Video', icon: Image, color: 'text-green-500' },
  link: { label: 'Link Share', icon: Link, color: 'text-purple-500' },
  event: { label: 'Event', icon: Calendar, color: 'text-orange-500' },
  announcement: { label: 'Announcement', icon: Users, color: 'text-red-500' }
};

export function PostCreator({ 
  spaceId, 
  spaceName, 
  onPostCreated, 
  placeholder = "What's happening on campus?",
  compact = false 
}: PostCreatorProps) {
  const { user } = useUnifiedAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [draft, setDraft] = useState<PostDraft>({
    content: '',
    type: 'text',
    visibility: spaceId ? 'space' : 'public',
    spaceId,
    attachments: [],
    tags: [],
    mentions: []
  });

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleCollapse = () => {
    if (!draft.content.trim()) {
      setIsExpanded(false);
      setDraft(prev => ({ ...prev, content: '', tags: [], mentions: [] }));
    }
  };

  const handleContentChange = (content: string) => {
    setDraft(prev => ({ ...prev, content }));
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handlePost = async () => {
    if (!draft.content.trim() || isPosting) return;

    try {
      setIsPosting(true);

      // Prepare post data
      const postData = {
        content: draft.content.trim(),
        type: draft.type,
        visibility: draft.visibility,
        ...(draft.spaceId && { spaceId: draft.spaceId }),
        attachments: draft.attachments,
        tags: draft.tags,
        mentions: draft.mentions
      };

      console.log('Creating post:', postData);

      // TODO: Replace with actual API call
      const response = await fetch('/api/social/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const result = await response.json();
      
      // Mock success for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockPost = {
        id: Date.now().toString(),
        content: draft.content,
        author: {
          id: user?.uid || 'mock',
          name: user?.displayName || 'UB Student',
          handle: user?.email?.split('@')[0] || 'student',
          avatar: user?.photoURL
        },
        createdAt: new Date().toISOString(),
        type: draft.type,
        visibility: draft.visibility,
        spaceId: draft.spaceId,
        spaceName,
        likes: 0,
        comments: 0,
        shares: 0
      };

      // Reset form
      setDraft({
        content: '',
        type: 'text',
        visibility: spaceId ? 'space' : 'public',
        spaceId,
        attachments: [],
        tags: [],
        mentions: []
      });
      
      setIsExpanded(false);
      
      // Notify parent component
      onPostCreated?.(mockPost);

    } catch (error) {
      console.error('Failed to create post:', error);
      // TODO: Show error toast
    } finally {
      setIsPosting(false);
    }
  };

  const canPost = draft.content.trim().length > 0 && !isPosting;

  if (compact && !isExpanded) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <div 
            className="flex items-center space-x-3 cursor-text"
            onClick={handleExpand}
          >
            <Avatar className="h-10 w-10">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-[var(--hive-text-inverse)] font-medium">
                  {user?.displayName?.charAt(0) || 'U'}
                </span>
              </div>
            </Avatar>
            <div className="flex-1 py-3 px-4 bg-accent/30 rounded-lg text-muted-foreground hover:bg-accent/50 transition-colors">
              {placeholder}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-[var(--hive-text-inverse)] font-medium">
                    {user?.displayName?.charAt(0) || 'U'}
                  </span>
                </div>
              </Avatar>
              <div>
                <div className="font-medium text-foreground">
                  {user?.displayName || 'UB Student'}
                </div>
                <div className="text-sm text-muted-foreground">
                  @{user?.email?.split('@')[0] || 'student'}
                </div>
              </div>
            </div>

            {/* Visibility Selector */}
            <Select 
              value={draft.visibility} 
              onValueChange={(value: 'public' | 'space' | 'private') => 
                setDraft(prev => ({ ...prev, visibility: value }))
              }
            >
              <SelectTrigger className="w-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>Public</span>
                  </div>
                </SelectItem>
                {spaceId && (
                  <SelectItem value="space">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{spaceName || 'Space Only'}</span>
                    </div>
                  </SelectItem>
                )}
                <SelectItem value="private">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Private</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Input */}
          <div className="space-y-3">
            <Textarea
              ref={textareaRef}
              value={draft.content}
              onChange={(e) => handleContentChange(e.target.value)}
              onFocus={handleExpand}
              onBlur={handleCollapse}
              placeholder={placeholder}
              className="min-h-[80px] max-h-[200px] border-0 resize-none text-lg placeholder:text-muted-foreground focus:ring-0"
              maxLength={500}
            />
            
            {draft.content && (
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{draft.content.length}/500 characters</span>
                {draft.spaceId && spaceName && (
                  <Badge variant="secondary" className="text-xs">
                    Posting to {spaceName}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Expanded Tools */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                
                {/* Post Type Selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Post type:</span>
                  <div className="flex space-x-1">
                    {Object.entries(POST_TYPES).map(([type, config]) => {
                      const IconComponent = config.icon;
                      const isSelected = draft.type === type;
                      return (
                        <Button
                          key={type}
                          variant={isSelected ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setDraft(prev => ({ ...prev, type: type as any }))}
                          className="h-8"
                        >
                          <IconComponent className={`h-4 w-4 ${isSelected ? '' : config.color}`} />
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Tools */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" disabled>
                      <Image className="h-4 w-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      <MapPin className="h-4 w-4 mr-2" />
                      Location
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      <Smile className="h-4 w-4 mr-2" />
                      Emoji
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      <AtSign className="h-4 w-4 mr-2" />
                      Mention
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleCollapse}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handlePost}
                      disabled={!canPost}
                      className="flex items-center space-x-2"
                    >
                      {isPosting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Send className="h-4 w-4" />
                          </motion.div>
                          <span>Posting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Post</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}