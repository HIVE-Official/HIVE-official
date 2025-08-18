"use client";

import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authenticatedFetch } from '../../lib/auth-utils';
import { Button, Badge } from "@hive/ui";
import { Alert } from "@/components/temp-stubs";
import { 
  X, 
  MessageSquare, 
  MessageCircle, 
  BarChart3 as Poll, 
  Pin, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PostCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceId: string;
  spaceName: string;
  initialPostType?: 'discussion' | 'question' | 'poll' | 'announcement' | 'link';
  canCreateAnnouncements?: boolean;
}

const postTypes = {
  discussion: {
    icon: MessageSquare,
    label: 'Discussion',
    color: 'text-blue-400',
    description: 'Start a conversation',
    placeholder: 'What would you like to discuss?'
  },
  question: {
    icon: MessageCircle,
    label: 'Question',
    color: 'text-green-400',
    description: 'Ask the community',
    placeholder: 'What would you like to know?'
  },
  poll: {
    icon: Poll,
    label: 'Poll',
    color: 'text-purple-400',
    description: 'Gather opinions',
    placeholder: 'What question would you like to ask?'
  },
  announcement: {
    icon: Pin,
    label: 'Announcement',
    color: 'text-yellow-400',
    description: 'Important updates',
    placeholder: 'What announcement would you like to make?'
  },
  link: {
    icon: LinkIcon,
    label: 'Link Share',
    color: 'text-indigo-400',
    description: 'Share a resource',
    placeholder: 'Share something interesting...'
  }
} as const;

export function PostCreationModal({
  isOpen,
  onClose,
  spaceId,
  spaceName,
  initialPostType = 'discussion',
  canCreateAnnouncements = false
}: PostCreationModalProps) {
  const [selectedType, setSelectedType] = useState<keyof typeof postTypes>(initialPostType);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: {
      type: string;
      content: string;
      title?: string;
      linkUrl?: string;
      pollOptions?: string[];
    }) => {
      const response = await authenticatedFetch(`/api/spaces/${spaceId}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create post');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['space-posts', spaceId] });
      handleClose();
    },
    onError: (error: Error) => {
      setError(error.message);
      setIsSubmitting(false);
    }
  });

  const handleClose = () => {
    setContent('');
    setTitle('');
    setLinkUrl('');
    setPollOptions(['', '']);
    setError(null);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validation
    if (!content.trim()) {
      setError('Content is required');
      setIsSubmitting(false);
      return;
    }

    if (selectedType === 'link' && !linkUrl.trim()) {
      setError('Link URL is required for link posts');
      setIsSubmitting(false);
      return;
    }

    if (selectedType === 'poll') {
      const validOptions = pollOptions.filter(option => option.trim());
      if (validOptions.length < 2) {
        setError('Polls need at least 2 options');
        setIsSubmitting(false);
        return;
      }
    }

    const postData: any = {
      type: selectedType,
      content: content.trim(),
      title: title.trim() || undefined
    };

    if (selectedType === 'link') {
      postData.linkUrl = linkUrl.trim();
    }

    if (selectedType === 'poll') {
      postData.pollOptions = pollOptions.filter(option => option.trim());
    }

    createPostMutation.mutate(postData);
  };

  const addPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  // Auto-resize textarea
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const currentTypeConfig = postTypes[selectedType];
  const Icon = currentTypeConfig.icon;

  // Filter available post types based on permissions
  const availableTypes = Object.entries(postTypes).filter(([type]) => {
    if (type === 'announcement' && !canCreateAnnouncements) {
      return false;
    }
    return true;
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="bg-[var(--hive-background-primary)] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <Icon className={`h-6 w-6 ${currentTypeConfig.color}`} />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Create {currentTypeConfig.label}
                </h2>
                <p className="text-sm text-neutral-400">
                  in {spaceName}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
              className="border-white/[0.2] text-white hover:bg-white/[0.1]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Post Type Selector */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Post Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableTypes.map(([type, config]) => {
                    const TypeIcon = config.icon;
                    const isSelected = selectedType === type;
                    
                    return (
                      <motion.button
                        key={type}
                        type="button"
                        className={`p-3 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-[var(--hive-brand-secondary)]/10 border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]'
                            : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:border-white/[0.1] hover:text-white'
                        }`}
                        onClick={() => setSelectedType(type as keyof typeof postTypes)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <TypeIcon className="h-5 w-5 mx-auto mb-2" />
                        <div className="text-xs font-medium">{config.label}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Title (optional) */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Title (optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your post a title..."
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  maxLength={200}
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Content
                </label>
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={handleContentChange}
                  placeholder={currentTypeConfig.placeholder}
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white placeholder-neutral-400 resize-none focus:outline-none focus:border-[var(--hive-brand-secondary)]/30 min-h-[120px]"
                  maxLength={2000}
                  required
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-neutral-400">
                    {content.length}/2000 characters
                  </p>
                  <p className="text-xs text-neutral-400">
                    {currentTypeConfig.description}
                  </p>
                </div>
              </div>

              {/* Link URL (for link posts) */}
              {selectedType === 'link' && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Link URL
                  </label>
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                    required={selectedType === 'link'}
                  />
                </div>
              )}

              {/* Poll Options (for polls) */}
              {selectedType === 'poll' && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Poll Options
                  </label>
                  <div className="space-y-3">
                    {pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updatePollOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                          maxLength={100}
                        />
                        {pollOptions.length > 2 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePollOption(index)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    {pollOptions.length < 6 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addPollOption}
                        className="border-white/[0.2] text-white hover:bg-white/[0.1]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <motion.div
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-red-300">{error}</span>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/[0.06]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || !content.trim()}
                  className="flex-1 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating...</span>
                    </div>
                  ) : (
                    `Create ${currentTypeConfig.label}`
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}