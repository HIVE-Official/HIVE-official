'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Trophy,
  Sparkles,
  Target,
  Gift,
  AlertCircle,
  CheckCircle,
  Hash,
  Globe,
  Lock,
  Repeat,
  Bell
} from 'lucide-react';
import { Button, Badge } from '@hive/ui';
import { authenticatedFetch } from '../../lib/auth-utils';
import { cn } from '../../lib/utils';

interface RitualCreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  spaceId?: string;
  onRitualCreated?: (ritualId: string) => void;
}

type RitualType = 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
type ParticipationType = 'individual' | 'collective' | 'progressive' | 'competitive' | 'collaborative' | 'creative' | 'social';
type RecurrencePattern = 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'custom';

interface RitualFormData {
  // Basic Info
  name: string;
  title: string;
  description: string;
  tagline: string;
  type: RitualType;
  
  // Scheduling
  startDate: string;
  startTime: string;
  endDate?: string;
  endTime?: string;
  duration?: number;
  recurrence: RecurrencePattern;
  
  // Participation
  participationType: ParticipationType;
  maxParticipants?: number;
  minParticipants?: number;
  requiresApproval: boolean;
  visibility: 'public' | 'space' | 'private';
  
  // Milestones
  milestones: Array<{
    name: string;
    description: string;
    participantThreshold?: number;
    progressThreshold?: number;
  }>;
  
  // Rewards
  rewards: Array<{
    type: 'badge' | 'feature' | 'access' | 'recognition' | 'tool' | 'customization';
    name: string;
    description: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  }>;
  
  // Notifications
  reminderSettings: {
    enabled: boolean;
    beforeStart: number; // minutes
    duringActive: boolean;
    nearCompletion: boolean;
  };
}

const RITUAL_TYPES = [
  { value: 'onboarding', label: 'Onboarding', icon: Target, color: 'text-blue-400', description: 'Welcome new members' },
  { value: 'seasonal', label: 'Seasonal', icon: Calendar, color: 'text-green-400', description: 'Time-based events' },
  { value: 'achievement', label: 'Achievement', icon: Trophy, color: 'text-yellow-400', description: 'Milestone celebrations' },
  { value: 'community', label: 'Community', icon: Users, color: 'text-purple-400', description: 'Group activities' },
  { value: 'creative', label: 'Creative', icon: Sparkles, color: 'text-pink-400', description: 'Creative challenges' },
  { value: 'legacy', label: 'Legacy', icon: Gift, color: 'text-indigo-400', description: 'Lasting traditions' }
];

const PARTICIPATION_TYPES = [
  { value: 'individual', label: 'Individual', description: 'Personal journey' },
  { value: 'collective', label: 'Collective', description: 'Group achievement' },
  { value: 'progressive', label: 'Progressive', description: 'Building together' },
  { value: 'competitive', label: 'Competitive', description: 'Friendly competition' },
  { value: 'collaborative', label: 'Collaborative', description: 'Working together' },
  { value: 'social', label: 'Social', description: 'Social connections' }
];

export function RitualCreationWizard({
  isOpen,
  onClose,
  spaceId,
  onRitualCreated
}: RitualCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<RitualFormData>({
    name: '',
    title: '',
    description: '',
    tagline: '',
    type: 'community',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    duration: 7,
    recurrence: 'none',
    participationType: 'collective',
    maxParticipants: undefined,
    minParticipants: undefined,
    requiresApproval: false,
    visibility: 'public',
    milestones: [],
    rewards: [],
    reminderSettings: {
      enabled: true,
      beforeStart: 60,
      duringActive: true,
      nearCompletion: true
    }
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.title || !formData.description) {
        throw new Error('Please fill in all required fields');
      }

      if (!formData.startDate || !formData.startTime) {
        throw new Error('Please set the ritual start time');
      }

      // Prepare API payload
      const payload = {
        ...formData,
        spaceId,
        startTime: new Date(`${formData.startDate}T${formData.startTime}`).toISOString(),
        endTime: formData.endDate && formData.endTime 
          ? new Date(`${formData.endDate}T${formData.endTime}`).toISOString()
          : undefined,
        status: 'scheduled'
      };

      const response = await authenticatedFetch('/api/rituals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create ritual');
      }

      const result = await response.json();
      onRitualCreated?.(result.ritual.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create ritual');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addMilestone = () => {
    setFormData({
      ...formData,
      milestones: [
        ...formData.milestones,
        { name: '', description: '', participantThreshold: 10, progressThreshold: 25 }
      ]
    });
  };

  const removeMilestone = (index: number) => {
    setFormData({
      ...formData,
      milestones: formData.milestones.filter((_, i) => i !== index)
    });
  };

  const addReward = () => {
    setFormData({
      ...formData,
      rewards: [
        ...formData.rewards,
        { type: 'badge', name: '', description: '', rarity: 'common' }
      ]
    });
  };

  const removeReward = (index: number) => {
    setFormData({
      ...formData,
      rewards: formData.rewards.filter((_, i) => i !== index)
    });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <React.Fragment key={step}>
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
              currentStep === step
                ? "bg-[var(--hive-brand-secondary)] text-black"
                : currentStep > step
                ? "bg-green-500/20 text-green-400"
                : "bg-white/10 text-neutral-400"
            )}
          >
            {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
          </div>
          {step < 5 && (
            <div
              className={cn(
                "w-16 h-0.5 transition-all",
                currentStep > step ? "bg-green-500/50" : "bg-white/10"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
                Basic Information
              </h3>
              <p className="text-sm text-neutral-400">
                Define your ritual's identity and purpose
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                Ritual Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {RITUAL_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value as RitualType })}
                      className={cn(
                        "p-3 border rounded-lg transition-all",
                        formData.type === type.value
                          ? "bg-[var(--hive-brand-secondary)]/20 border-[var(--hive-brand-secondary)]/30"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      )}
                    >
                      <Icon className={cn("h-5 w-5 mb-2", type.color)} />
                      <div className="text-sm font-medium text-[var(--hive-text-inverse)]">
                        {type.label}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {type.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                Internal Name (for organization)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                placeholder="e.g., fall-2024-welcome-week"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                Public Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                placeholder="e.g., Welcome Week Challenge"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                placeholder="e.g., Connect, explore, and make your mark"
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30 resize-none"
                placeholder="Describe what participants will do and experience..."
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
                Schedule & Duration
              </h3>
              <p className="text-sm text-neutral-400">
                When will your ritual take place?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  End Date (optional)
                </label>
                <input
                  type="date"
                  value={formData.endDate || ''}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.endTime || ''}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                Duration (days)
              </label>
              <input
                type="number"
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || undefined })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                placeholder="How many days will this ritual run?"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                <Repeat className="inline h-4 w-4 mr-1" />
                Recurrence
              </label>
              <select
                value={formData.recurrence}
                onChange={(e) => setFormData({ ...formData, recurrence: e.target.value as RecurrencePattern })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
              >
                <option value="none">One-time ritual</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom schedule</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
                Participation Settings
              </h3>
              <p className="text-sm text-neutral-400">
                How will people participate in your ritual?
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                Participation Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {PARTICIPATION_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, participationType: type.value as ParticipationType })}
                    className={cn(
                      "p-3 border rounded-lg transition-all text-left",
                      formData.participationType === type.value
                        ? "bg-[var(--hive-brand-secondary)]/20 border-[var(--hive-brand-secondary)]/30"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="text-sm font-medium text-[var(--hive-text-inverse)]">
                      {type.label}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {type.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Minimum Participants
                </label>
                <input
                  type="number"
                  value={formData.minParticipants || ''}
                  onChange={(e) => setFormData({ ...formData, minParticipants: parseInt(e.target.value) || undefined })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  placeholder="Optional"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  value={formData.maxParticipants || ''}
                  onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) || undefined })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                  placeholder="Unlimited"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                Visibility
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, visibility: 'public' })}
                  className={cn(
                    "p-3 border rounded-lg transition-all",
                    formData.visibility === 'public'
                      ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                      : "bg-white/5 border-white/10 text-neutral-400 hover:text-[var(--hive-text-inverse)]"
                  )}
                >
                  <Globe className="h-4 w-4 mb-1" />
                  <div className="text-xs">Public</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, visibility: 'space' })}
                  className={cn(
                    "p-3 border rounded-lg transition-all",
                    formData.visibility === 'space'
                      ? "bg-green-500/20 border-green-500/30 text-green-400"
                      : "bg-white/5 border-white/10 text-neutral-400 hover:text-[var(--hive-text-inverse)]"
                  )}
                >
                  <Hash className="h-4 w-4 mb-1" />
                  <div className="text-xs">Space Only</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, visibility: 'private' })}
                  className={cn(
                    "p-3 border rounded-lg transition-all",
                    formData.visibility === 'private'
                      ? "bg-purple-500/20 border-purple-500/30 text-purple-400"
                      : "bg-white/5 border-white/10 text-neutral-400 hover:text-[var(--hive-text-inverse)]"
                  )}
                >
                  <Lock className="h-4 w-4 mb-1" />
                  <div className="text-xs">Private</div>
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requiresApproval}
                  onChange={(e) => setFormData({ ...formData, requiresApproval: e.target.checked })}
                  className="w-4 h-4 bg-white/10 border border-white/20 rounded text-[var(--hive-brand-secondary)] focus:ring-[var(--hive-brand-secondary)]"
                />
                <span className="text-sm text-[var(--hive-text-inverse)]">
                  Require approval to join
                </span>
              </label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
                Milestones & Rewards
              </h3>
              <p className="text-sm text-neutral-400">
                Define achievements and incentives
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-[var(--hive-text-inverse)]">
                  Milestones
                </label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addMilestone}
                  className="text-xs"
                >
                  <Target className="h-3 w-3 mr-1" />
                  Add Milestone
                </Button>
              </div>
              <div className="space-y-3">
                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <input
                        type="text"
                        value={milestone.name}
                        onChange={(e) => {
                          const newMilestones = [...formData.milestones];
                          newMilestones[index].name = e.target.value;
                          setFormData({ ...formData, milestones: newMilestones });
                        }}
                        className="flex-1 bg-transparent border-b border-white/20 text-sm text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                        placeholder="Milestone name"
                      />
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="ml-2 text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={milestone.description}
                      onChange={(e) => {
                        const newMilestones = [...formData.milestones];
                        newMilestones[index].description = e.target.value;
                        setFormData({ ...formData, milestones: newMilestones });
                      }}
                      className="w-full bg-transparent text-xs text-neutral-400 placeholder-neutral-500 focus:outline-none"
                      placeholder="Description"
                    />
                  </div>
                ))}
                {formData.milestones.length === 0 && (
                  <div className="text-center py-4 text-neutral-400 text-sm">
                    No milestones added yet
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-[var(--hive-text-inverse)]">
                  Rewards
                </label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addReward}
                  className="text-xs"
                >
                  <Gift className="h-3 w-3 mr-1" />
                  Add Reward
                </Button>
              </div>
              <div className="space-y-3">
                {formData.rewards.map((reward, index) => (
                  <div key={index} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <input
                        type="text"
                        value={reward.name}
                        onChange={(e) => {
                          const newRewards = [...formData.rewards];
                          newRewards[index].name = e.target.value;
                          setFormData({ ...formData, rewards: newRewards });
                        }}
                        className="flex-1 bg-transparent border-b border-white/20 text-sm text-[var(--hive-text-inverse)] placeholder-neutral-400 focus:outline-none focus:border-[var(--hive-brand-secondary)]/30"
                        placeholder="Reward name"
                      />
                      <button
                        type="button"
                        onClick={() => removeReward(index)}
                        className="ml-2 text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <select
                        value={reward.type}
                        onChange={(e) => {
                          const newRewards = [...formData.rewards];
                          newRewards[index].type = e.target.value as any;
                          setFormData({ ...formData, rewards: newRewards });
                        }}
                        className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-neutral-300"
                      >
                        <option value="badge">Badge</option>
                        <option value="feature">Feature</option>
                        <option value="access">Access</option>
                        <option value="recognition">Recognition</option>
                        <option value="tool">Tool</option>
                        <option value="customization">Customization</option>
                      </select>
                      <select
                        value={reward.rarity}
                        onChange={(e) => {
                          const newRewards = [...formData.rewards];
                          newRewards[index].rarity = e.target.value as any;
                          setFormData({ ...formData, rewards: newRewards });
                        }}
                        className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-neutral-300"
                      >
                        <option value="common">Common</option>
                        <option value="uncommon">Uncommon</option>
                        <option value="rare">Rare</option>
                        <option value="epic">Epic</option>
                        <option value="legendary">Legendary</option>
                      </select>
                    </div>
                  </div>
                ))}
                {formData.rewards.length === 0 && (
                  <div className="text-center py-4 text-neutral-400 text-sm">
                    No rewards added yet
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">
                Notifications & Review
              </h3>
              <p className="text-sm text-neutral-400">
                Configure reminders and review your ritual
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.reminderSettings.enabled}
                  onChange={(e) => setFormData({
                    ...formData,
                    reminderSettings: { ...formData.reminderSettings, enabled: e.target.checked }
                  })}
                  className="w-4 h-4 bg-white/10 border border-white/20 rounded text-[var(--hive-brand-secondary)] focus:ring-[var(--hive-brand-secondary)]"
                />
                <span className="text-sm text-[var(--hive-text-inverse)]">
                  <Bell className="inline h-4 w-4 mr-1" />
                  Enable notifications
                </span>
              </label>

              {formData.reminderSettings.enabled && (
                <div className="ml-6 space-y-3">
                  <div>
                    <label className="text-xs text-neutral-400">
                      Remind participants before start (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.reminderSettings.beforeStart}
                      onChange={(e) => setFormData({
                        ...formData,
                        reminderSettings: { ...formData.reminderSettings, beforeStart: parseInt(e.target.value) || 60 }
                      })}
                      className="w-full mt-1 bg-white/5 border border-white/10 rounded px-3 py-1 text-sm text-[var(--hive-text-inverse)]"
                      min="5"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.reminderSettings.duringActive}
                      onChange={(e) => setFormData({
                        ...formData,
                        reminderSettings: { ...formData.reminderSettings, duringActive: e.target.checked }
                      })}
                      className="w-4 h-4 bg-white/10 border border-white/20 rounded"
                    />
                    <span className="text-xs text-neutral-300">
                      Send progress updates during ritual
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.reminderSettings.nearCompletion}
                      onChange={(e) => setFormData({
                        ...formData,
                        reminderSettings: { ...formData.reminderSettings, nearCompletion: e.target.checked }
                      })}
                      className="w-4 h-4 bg-white/10 border border-white/20 rounded"
                    />
                    <span className="text-xs text-neutral-300">
                      Notify when ritual is ending soon
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-sm font-medium text-[var(--hive-text-inverse)] mb-3">
                Ritual Summary
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Title:</span>
                  <span className="text-[var(--hive-text-inverse)]">{formData.title || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Type:</span>
                  <span className="text-[var(--hive-text-inverse)] capitalize">{formData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Start:</span>
                  <span className="text-[var(--hive-text-inverse)]">
                    {formData.startDate && formData.startTime 
                      ? `${formData.startDate} at ${formData.startTime}`
                      : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Participation:</span>
                  <span className="text-[var(--hive-text-inverse)] capitalize">{formData.participationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Visibility:</span>
                  <span className="text-[var(--hive-text-inverse)] capitalize">{formData.visibility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Milestones:</span>
                  <span className="text-[var(--hive-text-inverse)]">{formData.milestones.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Rewards:</span>
                  <span className="text-[var(--hive-text-inverse)]">{formData.rewards.length}</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-red-400">{error}</span>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
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
        onClick={onClose}
      >
        <motion.div
          className="bg-[var(--hive-background-primary)] border border-white/10 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
              <h2 className="text-xl font-semibold text-[var(--hive-text-inverse)]">
                Create Ritual
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-neutral-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {renderStepIndicator()}
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-white/10">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-white/20 text-neutral-400 hover:text-[var(--hive-text-inverse)]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-neutral-400">
              Step {currentStep} of {totalSteps}
            </div>

            {currentStep < totalSteps ? (
              <Button
                variant="primary"
                onClick={handleNext}
                className="bg-[var(--hive-brand-secondary)] text-black hover:bg-[var(--hive-brand-secondary)]/90"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[var(--hive-brand-secondary)] to-green-400 text-black hover:opacity-90"
              >
                {isSubmitting ? 'Creating...' : 'Create Ritual'}
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}