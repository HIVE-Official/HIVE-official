"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Image as ImageIcon,
  Link2,
  Smile,
  Hash,
  Calendar,
  Zap,
  MapPin,
  Users,
  Send,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeedPost } from '@/lib/firebase/feed-service';

export interface PostComposerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (postData: Partial<FeedPost>) => Promise<string>;
  defaultType?: 'post' | 'tool_share' | 'event' | 'announcement';
  spaceId?: string;
  spaceName?: string;
}

interface PostData {
  type: 'post' | 'tool_share' | 'event' | 'space_update' | 'achievement' | 'announcement';
  content: {
    text?: string;
    title?: string;
    description?: string;
    toolName?: string;
    eventDetails?: {
      name: string;
      date: string;
      location: string;
    };
  };
  tags: string[];
  mentions: string[];
  visibility: 'public' | 'space' | 'followers';
  spaceId?: string;
  spaceName?: string;
}

const POST_TYPES = [
  {
    id: 'post',
    label: 'General Post',
    icon: Hash,
    description: 'Share thoughts, updates, or discussions',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  {
    id: 'tool_share',
    label: 'Tool Share',
    icon: Zap,
    description: 'Share a tool or resource with the community',
    color: 'text-[var(--hive-gold)]',
    bgColor: 'bg-[var(--hive-gold)]/10'
  },
  {
    id: 'event',
    label: 'Event',
    icon: Calendar,
    description: 'Create or share an event',
    color: 'text-[var(--hive-gold)]',
    bgColor: 'bg-[var(--hive-gold)]/10'
  },
  {
    id: 'announcement',
    label: 'Announcement',
    icon: Users,
    description: 'Important update or announcement',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10'
  }
];

export function PostComposer({
  isOpen,
  onClose,
  onCreatePost,
  defaultType = 'post',
  spaceId,
  spaceName
}: PostComposerProps) {
  const [postData, setPostData] = useState<PostData>({
    type: defaultType,
    content: {
      text: '',
      title: '',
      description: ''
    },
    tags: [],
    mentions: [],
    visibility: spaceId ? 'space' : 'public',
    spaceId,
    spaceName
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  // Handle text changes
  const handleTextChange = (field: keyof PostData['content'], value: string) => {
    setPostData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));

    // Auto-detect hashtags and mentions
    if (field === 'text') {
      const hashtags = value.match(/#[\w]+/g) || [];
      const mentions = value.match(/@[\w]+/g) || [];
      
      setPostData(prev => ({
        ...prev,
        tags: hashtags.map(tag => tag.slice(1)).filter(tag => tag.length > 0),
        mentions: mentions.map(mention => mention.slice(1)).filter(mention => mention.length > 0)
      }));
    }
  };

  // Handle event details
  const handleEventDetailsChange = (field: string, value: string) => {
    setPostData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        eventDetails: {
          ...prev.content.eventDetails,
          [field]: value
        } as any
      }
    }));
  };

  // Add tag
  const addTag = useCallback(() => {
    if (currentTag.trim() && !postData.tags.includes(currentTag.trim())) {
      setPostData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  }, [currentTag, postData.tags]);

  // Remove tag
  const removeTag = useCallback((tagToRemove: string) => {
    setPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  }, []);

  // Handle type selection
  const handleTypeSelect = (type: PostData['type']) => {
    setPostData(prev => ({
      ...prev,
      type,
      content: {
        text: prev.content.text,
        title: type === 'post' ? '' : prev.content.title || '',
        description: type === 'post' ? '' : prev.content.description || '',
        toolName: type === 'tool_share' ? prev.content.toolName || '' : undefined,
        eventDetails: type === 'event' ? prev.content.eventDetails || {
          name: '',
          date: '',
          location: ''
        } : undefined
      }
    }));
    setShowTypeSelector(false);
  };

  // Submit post
  const handleSubmit = async () => {
    if (!postData.content.text?.trim() && !postData.content.title?.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onCreatePost(postData);
      
      // Reset form
      setPostData({
        type: defaultType,
        content: {
          text: '',
          title: '',
          description: ''
        },
        tags: [],
        mentions: [],
        visibility: spaceId ? 'space' : 'public',
        spaceId,
        spaceName
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get selected post type config
  const selectedType = POST_TYPES.find(type => type.id === postData.type) || POST_TYPES[0];
  const SelectedIcon = selectedType.icon;

  const canSubmit = (postData.content.text?.trim() || postData.content.title?.trim()) && !isSubmitting;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--hive-black)]/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0D0D0E] border border-[var(--hive-white)]/[0.08] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--hive-white)]/[0.08]">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", selectedType.bgColor)}>
              <SelectedIcon className={cn("h-5 w-5", selectedType.color)} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--hive-text-primary)]">Create Post</h2>
              <p className="text-sm text-gray-400">{selectedType.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--hive-white)]/[0.05] rounded-lg transition-all text-gray-400 hover:text-[var(--hive-text-primary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Type Selector */}
        <div className="p-6 border-b border-[var(--hive-white)]/[0.08]">
          <div className="relative">
            <button
              onClick={() => setShowTypeSelector(!showTypeSelector)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--hive-white)]/[0.03] hover:bg-[var(--hive-white)]/[0.05] border border-[var(--hive-white)]/[0.08] rounded-lg text-gray-300 transition-all"
            >
              <SelectedIcon className={cn("h-4 w-4", selectedType.color)} />
              <span>{selectedType.label}</span>
            </button>

            <AnimatePresence>
              {showTypeSelector && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[var(--hive-background-tertiary)] border border-[var(--hive-white)]/[0.08] rounded-lg shadow-xl z-10"
                >
                  {POST_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => handleTypeSelect(type.id as PostData['type'])}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[var(--hive-white)]/[0.05] text-left transition-all first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", type.bgColor)}>
                          <Icon className={cn("h-4 w-4", type.color)} />
                        </div>
                        <div>
                          <div className="text-[var(--hive-text-primary)] font-medium">{type.label}</div>
                          <div className="text-xs text-gray-400">{type.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-4">
          {/* Title (for non-post types) */}
          {postData.type !== 'post' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {postData.type === 'tool_share' ? 'Tool Name' : 
                 postData.type === 'event' ? 'Event Name' : 'Title'}
              </label>
              <input
                type="text"
                value={postData.content.title || ''}
                onChange={(e: any) => handleTextChange('title', e.target.value)}
                placeholder={
                  postData.type === 'tool_share' ? 'Enter tool name...' :
                  postData.type === 'event' ? 'Enter event name...' : 'Enter title...'
                }
                className="w-full px-4 py-3 bg-[var(--hive-white)]/[0.03] border border-[var(--hive-white)]/[0.08] rounded-lg text-[var(--hive-text-primary)] placeholder:text-gray-400 focus:border-[var(--hive-gold)] focus:outline-none transition-all"
              />
            </div>
          )}

          {/* Event Details */}
          {postData.type === 'event' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  value={postData.content.eventDetails?.date || ''}
                  onChange={(e: any) => handleEventDetailsChange('date', e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--hive-white)]/[0.03] border border-[var(--hive-white)]/[0.08] rounded-lg text-[var(--hive-text-primary)] focus:border-[var(--hive-gold)] focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={postData.content.eventDetails?.location || ''}
                  onChange={(e: any) => handleEventDetailsChange('location', e.target.value)}
                  placeholder="Enter location..."
                  className="w-full px-4 py-3 bg-[var(--hive-white)]/[0.03] border border-[var(--hive-white)]/[0.08] rounded-lg text-[var(--hive-text-primary)] placeholder:text-gray-400 focus:border-[var(--hive-gold)] focus:outline-none transition-all"
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {postData.type === 'post' ? 'What\'s happening?' : 'Description'}
            </label>
            <textarea
              value={postData.content.text || ''}
              onChange={(e: any) => handleTextChange('text', e.target.value)}
              placeholder={
                postData.type === 'post' ? 'Share what\'s on your mind...' :
                postData.type === 'tool_share' ? 'Describe this tool and how it helps...' :
                postData.type === 'event' ? 'Tell people about this event...' :
                'Add more details...'
              }
              rows={4}
              className="w-full px-4 py-3 bg-[var(--hive-white)]/[0.03] border border-[var(--hive-white)]/[0.08] rounded-lg text-[var(--hive-text-primary)] placeholder:text-gray-400 focus:border-[var(--hive-gold)] focus:outline-none transition-all resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {postData.tags.map((tag: any) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] text-xs rounded-md"
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-[var(--hive-gold)]/70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e: any) => setCurrentTag(e.target.value)}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tags..."
                className="flex-1 px-3 py-2 bg-[var(--hive-white)]/[0.03] border border-[var(--hive-white)]/[0.08] rounded-lg text-[var(--hive-text-primary)] placeholder:text-gray-400 text-sm focus:border-[var(--hive-gold)] focus:outline-none transition-all"
              />
              <button
                onClick={addTag}
                disabled={!currentTag.trim()}
                className="px-3 py-2 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--hive-gold)]/30 transition-all"
              >
                Add
              </button>
            </div>
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Visibility</label>
            <select
              value={postData.visibility}
              onChange={(e: any) => setPostData(prev => ({ ...prev, visibility: e.target.value as any }))}
              className="w-full px-4 py-3 bg-[var(--hive-white)]/[0.03] border border-[var(--hive-white)]/[0.08] rounded-lg text-[var(--hive-text-primary)] focus:border-[var(--hive-gold)] focus:outline-none transition-all"
            >
              <option value="public" className="bg-[var(--hive-background-tertiary)]">Public</option>
              {spaceId && <option value="space" className="bg-[var(--hive-background-tertiary)]">Space Only</option>}
              <option value="followers" className="bg-[var(--hive-background-tertiary)]">Followers Only</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[var(--hive-white)]/[0.08]">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>{spaceName || 'Campus Wide'}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-[var(--hive-white)]/[0.08] text-gray-300 hover:bg-[var(--hive-white)]/[0.05] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="px-6 py-2 rounded-lg bg-[var(--hive-gold)] text-[var(--hive-black)] font-medium hover:bg-[var(--hive-gold)]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}