'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { 
  X, 
  Type, 
  Calendar, 
  BarChart3, 
  Megaphone, 
  Image, 
  Paperclip, 
  Smile, 
  AtSign, 
  Hash,
  MapPin,
  Clock,
  Users,
  Plus,
  Minus,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Send
} from 'lucide-react';

export type PostType = 'text' | 'event' | 'poll' | 'announcement';

export interface PostCreationData {
  type: PostType;
  content: string;
  
  // Event data
  event?: {
    title: string;
    date: string;
    time: string;
    location?: string;
    description?: string;
    capacity?: number;
    requireRsvp: boolean
  };
  
  // Poll data
  poll?: {
    question: string;
    options: string[];
    allowMultiple: boolean;
    expiresIn?: number; // days
    anonymous: boolean
  };
  
  // Announcement data
  announcement?: {
    priority: 'low' | 'medium' | 'high' | 'urgent';
    pinned: boolean;
    expiresAt?: string
  };
  
  // Attachments
  attachments?: File[];
  
  // Mentions and tags
  mentions?: string[];
  tags?: string[]
}

export interface PostCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PostCreationData) => Promise<void>;
  spaceType?: 'university' | 'residential' | 'greek' | 'student';
  userRole?: 'leader' | 'co_leader' | 'member';
  initialType?: PostType;
  isSubmitting?: boolean;
  className?: string
}

const POST_TYPES: Array<{
  type: PostType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  requiredRole?: 'leader' | 'co_leader'
}> = [
  {
    type: 'text',
    label: 'Text Post',
    description: 'Share thoughts, questions, or updates',
    icon: <Type className="w-5 h-5" />,
    color: 'text-[var(--hive-text-primary)]',
    bgColor: 'bg-[var(--hive-background-secondary)]/60',
    borderColor: 'border-[var(--hive-border-primary)]/30',
  },
  {
    type: 'event',
    label: 'Event',
    description: 'Schedule meetings, activities, or gatherings',
    icon: <Calendar className="w-5 h-5" />,
    color: 'text-[var(--hive-brand-primary)]',
    bgColor: 'bg-[var(--hive-brand-primary)]/10',
    borderColor: 'border-[var(--hive-brand-primary)]/30',
  },
  {
    type: 'poll',
    label: 'Poll',
    description: 'Gather opinions and make group decisions',
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'text-[var(--hive-status-info)]',
    bgColor: 'bg-[var(--hive-status-info)]/10',
    borderColor: 'border-[var(--hive-status-info)]/30',
  },
  {
    type: 'announcement',
    label: 'Announcement',
    description: 'Important notices and updates',
    icon: <Megaphone className="w-5 h-5" />,
    color: 'text-[var(--hive-status-warning)]',
    bgColor: 'bg-[var(--hive-status-warning)]/10',
    borderColor: 'border-[var(--hive-status-warning)]/30',
    requiredRole: 'co_leader',
  },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low Priority', color: 'text-gray-400' },
  { value: 'medium', label: 'Medium Priority', color: 'text-blue-400' },
  { value: 'high', label: 'High Priority', color: 'text-orange-400' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-400' },
];

export const PostCreationModal: React.FC<PostCreationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  spaceType,
  userRole = 'member',
  initialType = 'text',
  isSubmitting = false,
  className
}) => {
  const [selectedType, setSelectedType] = useState<PostType>(initialType);
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Event fields
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCapacity, setEventCapacity] = useState<number | undefined>();
  const [requireRsvp, setRequireRsvp] = useState(true);
  
  // Poll fields
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [pollExpiresIn, setPollExpiresIn] = useState<number | undefined>(7);
  const [anonymousPoll, setAnonymousPoll] = useState(false);
  
  // Announcement fields
  const [announcementPriority, setAnnouncementPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [pinnedAnnouncement, setPinnedAnnouncement] = useState(false);
  const [announcementExpires, setAnnouncementExpires] = useState('');
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canCreateType = (type: PostType): boolean => {
    const typeConfig = POST_TYPES.find(t => t.type === type);
    if (!typeConfig?.requiredRole) return true;
    
    if (typeConfig.requiredRole === 'co_leader') {
      return userRole === 'leader' || userRole === 'co_leader'
    }
    
    return userRole === typeConfig.requiredRole
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!content.trim()) {
      newErrors.content = 'Content is required'
    }

    if (selectedType === 'event') {
      if (!eventTitle.trim()) newErrors.eventTitle = 'Event title is required';
      if (!eventDate) newErrors.eventDate = 'Event date is required';
      if (!eventTime) newErrors.eventTime = 'Event time is required'
    }

    if (selectedType === 'poll') {
      if (!pollQuestion.trim()) newErrors.pollQuestion = 'Poll question is required';
      
      const validOptions = pollOptions.filter(opt => opt.trim());
      if (validOptions.length < 2) {
        newErrors.pollOptions = 'At least 2 poll options are required'
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const data: PostCreationData = {
      type: selectedType,
      content: content.trim(),
    };

    if (selectedType === 'event') {
      data.event = {
        title: eventTitle.trim(),
        date: eventDate,
        time: eventTime,
        location: eventLocation.trim() || undefined,
        description: eventDescription.trim() || undefined,
        capacity: eventCapacity,
        requireRsvp,
      }
    }

    if (selectedType === 'poll') {
      data.poll = {
        question: pollQuestion.trim(),
        options: pollOptions.filter(opt => opt.trim()),
        allowMultiple,
        expiresIn: pollExpiresIn,
        anonymous: anonymousPoll,
      }
    }

    if (selectedType === 'announcement') {
      data.announcement = {
        priority: announcementPriority,
        pinned: pinnedAnnouncement,
        expiresAt: announcementExpires || undefined,
      }
    }

    try {
      await onSubmit(data);
      handleClose()
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  };

  const handleClose = () => {
    setContent('');
    setEventTitle('');
    setEventDate('');
    setEventTime('');
    setEventLocation('');
    setEventDescription('');
    setEventCapacity(undefined);
    setPollQuestion('');
    setPollOptions(['', '']);
    setErrors({});
    onClose()
  };

  const addPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, ''])
    }
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index))
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions)
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn(
            'relative w-full max-w-2xl max-h-[90vh] overflow-hidden',
            'bg-gradient-to-br from-[var(--hive-background-secondary)]/95 via-[var(--hive-background-tertiary)]/90 to-[var(--hive-background-interactive)]/95',
            'backdrop-blur-xl border border-[var(--hive-border-primary)]/30',
            'rounded-3xl shadow-2xl',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--hive-border-primary)]/20">
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
                Create Post
              </h2>
              <p className="text-[var(--hive-text-secondary)] mt-1">
                Share something with your community
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Preview Toggle */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200',
                  showPreview
                    ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30'
                    : 'bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/30 hover:text-[var(--hive-text-primary)]'
                )}
              >
                {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Post Type Selection */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--hive-text-primary)] mb-3">
                Post Type
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {POST_TYPES.map((type) => {
                  const isDisabled = !canCreateType(type.type);
                  
                  return (
                    <motion.button
                      key={type.type}
                      whileHover={!isDisabled ? { scale: 1.02 } : {}}
                      whileTap={!isDisabled ? { scale: 0.98 } : {}}
                      onClick={() => !isDisabled && setSelectedType(type.type)}
                      disabled={isDisabled}
                      className={cn(
                        'p-4 rounded-xl border transition-all duration-200 text-left',
                        selectedType === type.type
                          ? `${type.bgColor} ${type.borderColor} ${type.color}`
                          : 'bg-[var(--hive-background-tertiary)]/40 border-[var(--hive-border-primary)]/20 text-[var(--hive-text-secondary)]',
                        !isDisabled && 'hover:border-[var(--hive-brand-primary)]/30',
                        isDisabled && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {type.icon}
                        <span className="font-medium">{type.label}</span>
                        {isDisabled && <AlertCircle className="w-4 h-4 text-[var(--hive-status-warning)]" />}
                      </div>
                      <p className="text-xs opacity-80">{type.description}</p>
                    </motion.button>
                  )
          })}
              </div>
            </div>

            {/* Main Content */}
            <div>
              <label className="block text-sm font-semibold text-[var(--hive-text-primary)] mb-2">
                {selectedType === 'poll' ? 'Poll Description' : 'Content'}
                <span className="text-[var(--hive-status-error)]">*</span>
              </label>
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  selectedType === 'event'
                    ? 'Describe your event and what people can expect...'
                    : selectedType === 'poll'
                    ? 'Provide context or details about your poll...'
                    : selectedType === 'announcement'
                    ? 'Share your important announcement...'
                    : 'What\'s on your mind?'
                }
                rows={4}
                className={cn(
                  'w-full px-4 py-3 rounded-xl border resize-none transition-all duration-200',
                  'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]',
                  'placeholder:text-[var(--hive-text-muted)]',
                  'focus:outline-none focus:ring-0',
                  errors.content
                    ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
                    : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50'
                )}
              />
              {errors.content && (
                <p className="text-xs text-[var(--hive-status-error)] mt-1">{errors.content}</p>
              )}
            </div>

            {/* Type-specific Fields */}
            {selectedType === 'event' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[var(--hive-text-primary)]">
                  Event Details
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Event Title <span className="text-[var(--hive-status-error)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Enter event title"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border transition-all duration-200',
                      'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]',
                      'placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0',
                      errors.eventTitle
                        ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
                        : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50'
                    )}
                  />
                  {errors.eventTitle && (
                    <p className="text-xs text-[var(--hive-status-error)] mt-1">{errors.eventTitle}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                      Date <span className="text-[var(--hive-status-error)]">*</span>
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border transition-all duration-200',
                        'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]',
                        'focus:outline-none focus:ring-0',
                        errors.eventDate
                          ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
                          : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50'
                      )}
                    />
                    {errors.eventDate && (
                      <p className="text-xs text-[var(--hive-status-error)] mt-1">{errors.eventDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                      Time <span className="text-[var(--hive-status-error)]">*</span>
                    </label>
                    <input
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className={cn(
                        'w-full px-4 py-3 rounded-xl border transition-all duration-200',
                        'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]',
                        'focus:outline-none focus:ring-0',
                        errors.eventTime
                          ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
                          : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50'
                      )}
                    />
                    {errors.eventTime && (
                      <p className="text-xs text-[var(--hive-status-error)] mt-1">{errors.eventTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Where will this event take place?"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={requireRsvp}
                      onChange={(e) => setRequireRsvp(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20"
                    />
                    <span className="text-sm text-[var(--hive-text-primary)]">Require RSVP</span>
                  </label>

                  {eventCapacity !== undefined && (
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-[var(--hive-text-primary)]">Capacity:</label>
                      <input
                        type="number"
                        value={eventCapacity}
                        onChange={(e) => setEventCapacity(Number(e.target.value) || undefined)}
                        min="1"
                        className="w-20 px-2 py-1 rounded border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm focus:outline-none focus:border-[var(--hive-brand-primary)]/50"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedType === 'poll' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[var(--hive-text-primary)]">
                  Poll Details
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Poll Question <span className="text-[var(--hive-status-error)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                    placeholder="What would you like to ask?"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border transition-all duration-200',
                      'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]',
                      'placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0',
                      errors.pollQuestion
                        ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
                        : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50'
                    )}
                  />
                  {errors.pollQuestion && (
                    <p className="text-xs text-[var(--hive-status-error)] mt-1">{errors.pollQuestion}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Poll Options <span className="text-[var(--hive-status-error)]">*</span>
                  </label>
                  <div className="space-y-2">
                    {pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updatePollOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 px-4 py-2 rounded-xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"
                        />
                        {pollOptions.length > 2 && (
                          <button
                            onClick={() => removePollOption(index)}
                            className="w-8 h-8 rounded-lg bg-[var(--hive-status-error)]/10 text-[var(--hive-status-error)] hover:bg-[var(--hive-status-error)]/20 transition-colors duration-200 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {pollOptions.length < 6 && (
                      <button
                        onClick={addPollOption}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] hover:border-[var(--hive-brand-primary)]/50 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Add Option</span>
                      </button>
                    )}
                  </div>
                  {errors.pollOptions && (
                    <p className="text-xs text-[var(--hive-status-error)] mt-1">{errors.pollOptions}</p>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={allowMultiple}
                      onChange={(e) => setAllowMultiple(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20"
                    />
                    <span className="text-sm text-[var(--hive-text-primary)]">Allow multiple choices</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={anonymousPoll}
                      onChange={(e) => setAnonymousPoll(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20"
                    />
                    <span className="text-sm text-[var(--hive-text-primary)]">Anonymous voting</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Poll Duration
                  </label>
                  <select
                    value={pollExpiresIn || ''}
                    onChange={(e) => setPollExpiresIn(Number(e.target.value) || undefined)}
                    className="px-4 py-2 rounded-xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200"
                  >
                    <option value="">No expiration</option>
                    <option value={1}>1 day</option>
                    <option value={3}>3 days</option>
                    <option value={7}>1 week</option>
                    <option value={14}>2 weeks</option>
                    <option value={30}>1 month</option>
                  </select>
                </div>
              </div>
            )}

            {selectedType === 'announcement' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[var(--hive-text-primary)]">
                  Announcement Settings
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRIORITY_OPTIONS.map((priority) => (
                      <button
                        key={priority.value}
                        onClick={() => setAnnouncementPriority(priority.value as any)}
                        className={cn(
                          'p-3 rounded-xl border transition-all duration-200 text-left',
                          announcementPriority === priority.value
                            ? 'bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)]'
                            : 'bg-[var(--hive-background-tertiary)]/40 border-[var(--hive-border-primary)]/20 text-[var(--hive-text-secondary)] hover:border-[var(--hive-brand-primary)]/30'
                        )}
                      >
                        <span className={cn('text-sm font-medium', priority.color)}>
                          {priority.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={pinnedAnnouncement}
                      onChange={(e) => setPinnedAnnouncement(e.target.checked)}
                      className="w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20"
                    />
                    <span className="text-sm text-[var(--hive-text-primary)]">Pin to top</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-[var(--hive-border-primary)]/20">
            <div className="flex items-center gap-2 text-sm text-[var(--hive-text-muted)]">
              <CheckCircle className="w-4 h-4" />
              <span>Draft saved automatically</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-2xl border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-300 disabled:opacity-50"
              >
                Cancel
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isSubmitting || !content.trim()}
                className={cn(
                  'px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2',
                  'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40',
                  'hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish {selectedType === 'text' ? 'Post' : selectedType === 'event' ? 'Event' : selectedType === 'poll' ? 'Poll' : 'Announcement'}</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
};

export default PostCreationModal;