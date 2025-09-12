"use client";

import React, { useState, useRef } from 'react';
import { Button, Badge } from "@hive/ui";
import { Alert } from "@/components/layout/page-container";
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
  Minus,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// State Management
import { 
  useCreatePost,
  useUIStore,
  useAuthStore
} from '@hive/hooks';
import { useImageUpload } from '@/hooks/use-image-upload';

interface PostCreationModalMigratedProps {
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

// Export both names for compatibility
export function PostCreationModal({
  isOpen,
  onClose,
  spaceId,
  spaceName,
  initialPostType = 'discussion',
  canCreateAnnouncements = false
}: PostCreationModalMigratedProps) {
  // Global state
  const { addToast } = useUIStore();
  const { user } = useAuthStore();

  // Local state
  const [selectedType, setSelectedType] = useState<keyof typeof postTypes>(initialPostType);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [error, setError] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadMultipleImages, isUploading, progress } = useImageUpload();

  // React Query mutation
  const createPost = useCreatePost();

  const handleClose = () => {
    setContent('');
    setTitle('');
    setLinkUrl('');
    setPollOptions(['', '']);
    setError(null);
    setSelectedImages([]);
    setImageUrls([]);
    onClose();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length + selectedImages.length > 4) {
      setError('Maximum 4 images allowed');
      return;
    }
    
    setSelectedImages(prev => [...prev, ...imageFiles]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    if (selectedType === 'link' && !linkUrl.trim()) {
      setError('Link URL is required for link posts');
      return;
    }

    if (selectedType === 'poll') {
      const validOptions = pollOptions.filter(option => option.trim());
      if (validOptions.length < 2) {
        setError('Polls need at least 2 options');
        return;
      }
    }

    // Upload images if any
    let uploadedImageUrls: string[] = [];
    if (selectedImages.length > 0) {
      try {
        uploadedImageUrls = await uploadMultipleImages(
          selectedImages, 
          `spaces/${spaceId}/posts`
        );
      } catch (err) {
        setError('Failed to upload images');
        return;
      }
    }

    const postData: any = {
      spaceId,
      type: selectedType,
      content: content.trim(),
      title: title.trim() || undefined,
      images: uploadedImageUrls
    };

    if (selectedType === 'link') {
      postData.linkUrl = linkUrl.trim();
    }

    if (selectedType === 'poll') {
      postData.pollOptions = pollOptions.filter(option => option.trim());
    }

    createPost.mutate(postData, {
      onSuccess: () => {
        addToast({
          title: 'Post Created!',
          description: `Your ${selectedType} has been shared with ${spaceName}`,
          type: 'success',
        });
        handleClose();
      },
      onError: (error) => {
        setError(error.message || 'Failed to create post');
        addToast({
          title: 'Failed to create post',
          description: error.message || 'Something went wrong',
          type: 'error',
        });
      },
    });
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-post-title"
        aria-describedby="create-post-description"
      >
        <motion.div
          className="bg-[var(--hive-background-primary)] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          role="document"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <Icon className={`h-6 w-6 ${currentTypeConfig.color}`} aria-hidden="true" />
              <div>
                <h2 id="create-post-title" className="text-xl font-semibold text-[var(--hive-text-inverse)]">
                  Create {currentTypeConfig.label}
                </h2>
                <p id="create-post-description" className="text-sm text-neutral-400">
                  in {spaceName}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
              className="border-white/[0.2] text-[var(--hive-text-inverse)] hover:bg-white/[0.1]"
              disabled={createPost.isPending}
              aria-label="Close create post dialog"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Post Type Selector */}
              <div role="group" aria-labelledby="post-type-label">
                <label id="post-type-label" className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-3">
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
                            : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:border-white/[0.1] hover:text-[var(--hive-text-inverse)]'
                        }`}
                        onClick={() => setSelectedType(type as keyof typeof postTypes)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={createPost.isPending}
                        aria-pressed={isSelected}
                        aria-label={`Select ${config.label} post type`}
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
                <label htmlFor="post-title" className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Title (optional)
                </label>
                <input
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your post a title..."
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  maxLength={200}
                  disabled={createPost.isPending}
                  aria-describedby="title-hint"
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="post-content" className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Content
                </label>
                <textarea
                  id="post-content"
                  ref={textareaRef}
                  value={content}
                  onChange={handleContentChange}
                  placeholder={currentTypeConfig.placeholder}
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] placeholder-neutral-400 resize-none focus:outline-none focus:border-[var(--hive-brand-secondary)]/30 min-h-[120px]"
                  maxLength={2000}
                  required
                  disabled={createPost.isPending}
                  aria-required="true"
                  aria-describedby="content-hint"
                />
                <div className="flex justify-between items-center mt-2">
                  <p id="content-hint" className="text-xs text-neutral-400" aria-live="polite">
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
                  <label htmlFor="post-link" className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                    Link URL
                  </label>
                  <input
                    id="post-link"
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                    required={selectedType === 'link'}
                    disabled={createPost.isPending}
                    aria-required={selectedType === 'link' ? 'true' : 'false'}
                  />
                </div>
              )}

              {/* Poll Options (for polls) */}
              {selectedType === 'poll' && (
                <div role="group" aria-labelledby="poll-options-label">
                  <label id="poll-options-label" className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                    Poll Options
                  </label>
                  <div className="space-y-3" role="list">
                    {pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-2" role="listitem">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updatePollOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                          maxLength={100}
                          disabled={createPost.isPending}
                          aria-label={`Poll option ${index + 1}`}
                        />
                        {pollOptions.length > 2 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePollOption(index)}
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            disabled={createPost.isPending}
                            aria-label={`Remove poll option ${index + 1}`}
                          >
                            <Minus className="h-4 w-4" aria-hidden="true" />
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
                        className="border-white/[0.2] text-[var(--hive-text-inverse)] hover:bg-white/[0.1]"
                        disabled={createPost.isPending}
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
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400" aria-hidden="true" />
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
                  disabled={createPost.isPending}
                  className="flex-1"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  disabled={createPost.isPending || !content.trim()}
                  className="flex-1 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255]"
                >
                  {createPost.isPending ? (
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