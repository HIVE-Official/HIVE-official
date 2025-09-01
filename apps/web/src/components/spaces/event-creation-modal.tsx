"use client";

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authenticatedFetch } from '../../lib/auth-utils';
import { Button } from "@hive/ui";
import { Alert } from "@/components/temp-stubs";
import { 
  X, 
  Calendar, 
  MapPin,
  Clock,
  Users,
  Globe,
  Lock,
  DollarSign,
  Repeat,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceId: string;
  spaceName: string;
}

const eventTypes = [
  { value: 'academic', label: 'Academic', color: 'text-blue-400' },
  { value: 'social', label: 'Social', color: 'text-green-400' },
  { value: 'recreational', label: 'Recreational', color: 'text-purple-400' },
  { value: 'cultural', label: 'Cultural', color: 'text-orange-400' },
  { value: 'meeting', label: 'Meeting', color: 'text-gray-400' },
  { value: 'virtual', label: 'Virtual', color: 'text-indigo-400' }
];

export function EventCreationModal({
  isOpen,
  onClose,
  spaceId,
  spaceName
}: EventCreationModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'social',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    virtualLink: '',
    maxAttendees: '',
    cost: '',
    currency: 'USD',
    isPrivate: false,
    requiredRSVP: true,
    isRecurring: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: async (eventData: any) => {
      const response = await authenticatedFetch(`/api/spaces/${spaceId}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create event');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['space-events', spaceId] });
      handleClose();
    },
    onError: (error: Error) => {
      setErrors({ general: error.message });
      setIsSubmitting(false);
    }
  });

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      type: 'social',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      location: '',
      virtualLink: '',
      maxAttendees: '',
      cost: '',
      currency: 'USD',
      isPrivate: false,
      requiredRSVP: true,
      isRecurring: false
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    // Validate date/time logic
    if (formData.startDate && formData.startTime && formData.endDate && formData.endTime) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
      
      if (endDateTime <= startDateTime) {
        newErrors.endDate = 'End date/time must be after start date/time';
      }
    }

    if (formData.type === 'virtual' && !formData.virtualLink.trim()) {
      newErrors.virtualLink = 'Virtual link is required for virtual events';
    }

    if (formData.maxAttendees && parseInt(formData.maxAttendees) < 1) {
      newErrors.maxAttendees = 'Max attendees must be at least 1';
    }

    if (formData.cost && parseFloat(formData.cost) < 0) {
      newErrors.cost = 'Cost cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`).toISOString();
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`).toISOString();

    const eventData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type,
      startDate: startDateTime,
      endDate: endDateTime,
      location: formData.location.trim() || undefined,
      virtualLink: formData.virtualLink.trim() || undefined,
      maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
      cost: formData.cost ? parseFloat(formData.cost) : undefined,
      currency: formData.cost ? formData.currency : undefined,
      isPrivate: formData.isPrivate,
      requiredRSVP: formData.requiredRSVP,
      isRecurring: formData.isRecurring
    };

    createEventMutation.mutate(eventData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

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
              <Calendar className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
              <div>
                <h2 className="text-xl font-semibold text-[var(--hive-text-inverse)]">Create Event</h2>
                <p className="text-sm text-neutral-400">in {spaceName}</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
              className="border-white/[0.2] text-[var(--hive-text-inverse)] hover:bg-white/[0.1]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="What's happening?"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  maxLength={200}
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Event Type *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      className={`p-3 rounded-lg border transition-all ${
                        formData.type === type.value
                          ? 'bg-[var(--hive-brand-secondary)]/10 border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]'
                          : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:border-white/[0.1] hover:text-[var(--hive-text-inverse)]'
                      }`}
                      onClick={() => handleInputChange('type', type.value)}
                    >
                      <div className="text-xs font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tell people more about this event..."
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] placeholder-neutral-400 resize-none focus:outline-none focus:border-[var(--hive-brand-secondary)]/30 h-24"
                  maxLength={2000}
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  />
                  {errors.startDate && <p className="text-red-400 text-xs mt-1">{errors.startDate}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  />
                  {errors.startTime && <p className="text-red-400 text-xs mt-1">{errors.startTime}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  />
                  {errors.endDate && <p className="text-red-400 text-xs mt-1">{errors.endDate}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  />
                  {errors.endTime && <p className="text-red-400 text-xs mt-1">{errors.endTime}</p>}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location {formData.type !== 'virtual' ? '(optional)' : ''}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Where is this happening?"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                />
              </div>

              {/* Virtual Link */}
              {formData.type === 'virtual' && (
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                    <Globe className="inline h-4 w-4 mr-1" />
                    Virtual Link *
                  </label>
                  <input
                    type="url"
                    value={formData.virtualLink}
                    onChange={(e) => handleInputChange('virtualLink', e.target.value)}
                    placeholder="https://zoom.us/j/..."
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  />
                  {errors.virtualLink && <p className="text-red-400 text-xs mt-1">{errors.virtualLink}</p>}
                </div>
              )}

              {/* Max Attendees and Cost */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Max Attendees (optional)
                  </label>
                  <input
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                    placeholder="Unlimited"
                    min="1"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  />
                  {errors.maxAttendees && <p className="text-red-400 text-xs mt-1">{errors.maxAttendees}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Cost (optional)
                  </label>
                  <div className="flex">
                    <select
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="px-3 py-3 rounded-l-lg bg-white/[0.02] border border-r-0 border-white/[0.06] text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                    >
                      <option value="USD">$</option>
                      <option value="EUR">€</option>
                      <option value="GBP">£</option>
                    </select>
                    <input
                      type="number"
                      value={formData.cost}
                      onChange={(e) => handleInputChange('cost', e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="flex-1 px-4 py-3 rounded-r-lg bg-white/[0.02] border border-white/[0.06] text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                    />
                  </div>
                  {errors.cost && <p className="text-red-400 text-xs mt-1">{errors.cost}</p>}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.requiredRSVP}
                    onChange={(e) => handleInputChange('requiredRSVP', e.target.checked)}
                    className="w-4 h-4 rounded border-white/[0.06] bg-white/[0.02] text-[var(--hive-brand-secondary)] focus:ring-[var(--hive-brand-secondary)]/50"
                  />
                  <span className="text-sm text-[var(--hive-text-inverse)]">Require RSVP</span>
                </label>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isPrivate}
                    onChange={(e) => handleInputChange('isPrivate', e.target.checked)}
                    className="w-4 h-4 rounded border-white/[0.06] bg-white/[0.02] text-[var(--hive-brand-secondary)] focus:ring-[var(--hive-brand-secondary)]/50"
                  />
                  <span className="text-sm text-[var(--hive-text-inverse)]">Private event</span>
                </label>
              </div>

              {/* Error Display */}
              {errors.general && (
                <motion.div
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-red-300">{errors.general}</span>
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
                  disabled={isSubmitting}
                  className="flex-1 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating...</span>
                    </div>
                  ) : (
                    'Create Event'
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