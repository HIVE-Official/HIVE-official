'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { HiveModal } from '../../components/hive-modal';
import { 
  X, 
  Plus, 
  Calendar, 
  Clock,
  Users, 
  Target,
  Sparkles,
  Trophy,
  Gift,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Hash,
  Zap
} from 'lucide-react';

// Import types from your existing ritual system
export type RitualType = 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
export type ParticipationType = 'individual' | 'collective' | 'progressive' | 'competitive' | 'collaborative' | 'creative' | 'social';

export interface RitualCreationData {
  // Basic Information
  name: string;
  title: string;
  description: string;
  tagline: string;
  type: RitualType;
  category: string;
  tags: string[];
  
  // Timing & Schedule
  startTime: string;
  endTime?: string;
  duration?: number; // in minutes
  timezone: string;
  
  // Participation
  participationType: ParticipationType;
  maxParticipants?: number;
  minParticipants?: number;
  requiresInvitation: boolean;
  universities: string[];
  isGlobal: boolean;
  
  // Actions
  actions: RitualAction[];
  
  // Milestones & Rewards
  milestones: RitualMilestone[];
  rewards: RitualReward[];
  
  // Prerequisites
  prerequisites: {
    minSpaceMemberships?: number;
    requiredFeatures?: string[];
    completedRituals?: string[];
    accountAge?: number;
    academicStatus?: string[];
  };
}

interface RitualAction {
  id: string;
  type: 'post' | 'join_space' | 'create_tool' | 'interact' | 'vote' | 'share' | 'comment' | 'attend';
  name: string;
  description: string;
  isRequired: boolean;
  weight: number; // 0-100
  maxOccurrences?: number;
  timeLimit?: number;
}

interface RitualMilestone {
  id: string;
  name: string;
  description: string;
  participantThreshold: number;
  progressThreshold: number; // 0-100
  timeThreshold?: string;
  unlocks: string[];
  celebration?: {
    message: string;
    animation?: string;
    badgeAwarded?: string;
  };
}

interface RitualReward {
  id: string;
  type: 'badge' | 'feature' | 'access' | 'recognition' | 'tool' | 'customization';
  name: string;
  description: string;
  requiresCompletion: boolean;
  minimumParticipation: number; // 0-100
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  isTimeLimited: boolean;
  expiresAt?: string;
  unlockScope: 'user' | 'space' | 'campus' | 'platform';
}

export interface RitualCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RitualCreationData) => Promise<void>;
  spaceId?: string;
  isLoading?: boolean;
}

const RITUAL_TYPE_CONFIG = {
  onboarding: { icon: Sparkles, color: 'text-purple-400', bgColor: 'bg-purple-500/20', label: 'Welcome Journey' },
  seasonal: { icon: Calendar, color: 'text-orange-400', bgColor: 'bg-orange-500/20', label: 'Seasonal Event' },
  achievement: { icon: Trophy, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', label: 'Achievement Challenge' },
  community: { icon: Users, color: 'text-blue-400', bgColor: 'bg-blue-500/20', label: 'Community Building' },
  creative: { icon: Zap, color: 'text-pink-400', bgColor: 'bg-pink-500/20', label: 'Creative Project' },
  emergency: { icon: Target, color: 'text-red-400', bgColor: 'bg-red-500/20', label: 'Emergency Response' },
  legacy: { icon: Gift, color: 'text-indigo-400', bgColor: 'bg-indigo-500/20', label: 'Legacy Tradition' }
};

const ACTION_TYPE_CONFIG = {
  post: { label: 'Create Post', icon: Hash },
  join_space: { label: 'Join Space', icon: Users },
  create_tool: { label: 'Create Tool', icon: Zap },
  interact: { label: 'Interact', icon: Target },
  vote: { label: 'Vote/Poll', icon: CheckCircle },
  share: { label: 'Share Content', icon: ArrowRight },
  comment: { label: 'Comment', icon: Hash },
  attend: { label: 'Attend Event', icon: Calendar }
};

export function RitualCreationModal({ isOpen, onClose, onSubmit, spaceId, isLoading = false }: RitualCreationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RitualCreationData>>({
    name: '',
    title: '',
    description: '',
    tagline: '',
    type: 'community',
    category: 'general',
    tags: [],
    startTime: '',
    timezone: 'America/New_York',
    participationType: 'collective',
    requiresInvitation: false,
    universities: ['buffalo'],
    isGlobal: false,
    actions: [],
    milestones: [],
    rewards: [],
    prerequisites: {}
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewMode, setPreviewMode] = useState(false);

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (stepNum) {
      case 1:
        if (!formData.name?.trim()) newErrors.name = 'Ritual name is required';
        if (!formData.title?.trim()) newErrors.title = 'Title is required';
        if (!formData.description?.trim()) newErrors.description = 'Description is required';
        if (!formData.tagline?.trim()) newErrors.tagline = 'Tagline is required';
        break;
      case 2:
        if (!formData.startTime) newErrors.startTime = 'Start time is required';
        if (formData.endTime && new Date(formData.endTime) <= new Date(formData.startTime!)) {
          newErrors.endTime = 'End time must be after start time';
        }
        break;
      case 3:
        if (!formData.actions?.length) newErrors.actions = 'At least one action is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(Math.min(step + 1, 5));
    }
  };

  const handlePrev = () => {
    setStep(Math.max(step - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(step) && formData as RitualCreationData) {
      await onSubmit(formData as RitualCreationData);
    }
  };

  const addAction = () => {
    const newAction: RitualAction = {
      id: `action-${Date.now()}`,
      type: 'post',
      name: '',
      description: '',
      isRequired: false,
      weight: 10,
      maxOccurrences: 1
    };
    setFormData(prev => ({
      ...prev,
      actions: [...(prev.actions || []), newAction]
    }));
  };

  const updateAction = (index: number, updates: Partial<RitualAction>) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions?.map((action, i) => 
        i === index ? { ...action, ...updates } : action
      ) || []
    }));
  };

  const removeAction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions?.filter((_, i) => i !== index) || []
    }));
  };

  const addMilestone = () => {
    const newMilestone: RitualMilestone = {
      id: `milestone-${Date.now()}`,
      name: '',
      description: '',
      participantThreshold: 1,
      progressThreshold: 50,
      unlocks: []
    };
    setFormData(prev => ({
      ...prev,
      milestones: [...(prev.milestones || []), newMilestone]
    }));
  };

  const updateMilestone = (index: number, updates: Partial<RitualMilestone>) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones?.map((milestone, i) => 
        i === index ? { ...milestone, ...updates } : milestone
      ) || []
    }));
  };

  const removeMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones?.filter((_, i) => i !== index) || []
    }));
  };

  const addReward = () => {
    const newReward: RitualReward = {
      id: `reward-${Date.now()}`,
      type: 'badge',
      name: '',
      description: '',
      requiresCompletion: true,
      minimumParticipation: 80,
      rarity: 'common',
      isTimeLimited: false,
      unlockScope: 'user'
    };
    setFormData(prev => ({
      ...prev,
      rewards: [...(prev.rewards || []), newReward]
    }));
  };

  const updateReward = (index: number, updates: Partial<RitualReward>) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards?.map((reward, i) => 
        i === index ? { ...reward, ...updates } : reward
      ) || []
    }));
  };

  const removeReward = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards?.filter((_, i) => i !== index) || []
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                Basic Information
              </h3>
              
              {/* Ritual Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
                  Ritual Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(RITUAL_TYPE_CONFIG).map(([type, config]) => {
                    const Icon = config.icon;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: type as RitualType }))}
                        className={cn(
                          "p-4 rounded-xl border transition-all text-left",
                          formData.type === type
                            ? "border-[var(--hive-gold)] bg-[var(--hive-gold)]/10"
                            : "border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)]"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={cn("p-2 rounded-lg", config.bgColor)}>
                            <Icon className={cn("h-4 w-4", config.color)} />
                          </div>
                          <span className="font-medium text-[var(--hive-text-primary)]">
                            {config.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Basic Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Ritual Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]",
                      errors.name ? "border-red-500" : "border-[var(--hive-border-subtle)]"
                    )}
                    placeholder="e.g., Welcome Week 2025"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Display Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]",
                      errors.title ? "border-red-500" : "border-[var(--hive-border-subtle)]"
                    )}
                    placeholder="e.g., Welcome to Campus Life"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-400">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    value={formData.tagline || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]",
                      errors.tagline ? "border-red-500" : "border-[var(--hive-border-subtle)]"
                    )}
                    placeholder="e.g., Connect, Explore, and Make Your Mark"
                  />
                  {errors.tagline && (
                    <p className="mt-1 text-sm text-red-400">{errors.tagline}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] resize-none",
                      errors.description ? "border-red-500" : "border-[var(--hive-border-subtle)]"
                    )}
                    placeholder="Describe what this ritual is about and what participants will experience..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-400">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                Timing & Participation
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                      Start Time *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.startTime || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]",
                        errors.startTime ? "border-red-500" : "border-[var(--hive-border-subtle)]"
                      )}
                    />
                    {errors.startTime && (
                      <p className="mt-1 text-sm text-red-400">{errors.startTime}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                      End Time (optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.endTime || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]",
                        errors.endTime ? "border-red-500" : "border-[var(--hive-border-subtle)]"
                      )}
                    />
                    {errors.endTime && (
                      <p className="mt-1 text-sm text-red-400">{errors.endTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                    Participation Type
                  </label>
                  <select
                    value={formData.participationType || 'collective'}
                    onChange={(e) => setFormData(prev => ({ ...prev, participationType: e.target.value as ParticipationType }))}
                    className="w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                  >
                    <option value="individual">Individual - Personal journey</option>
                    <option value="collective">Collective - Community effort</option>
                    <option value="progressive">Progressive - Step by step</option>
                    <option value="competitive">Competitive - Rankings and leaderboards</option>
                    <option value="collaborative">Collaborative - Work together</option>
                    <option value="creative">Creative - Express and create</option>
                    <option value="social">Social - Meet and connect</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.maxParticipants || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || undefined }))}
                      className="w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                      placeholder="Unlimited"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                      Min Participants
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.minParticipants || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, minParticipants: parseInt(e.target.value) || undefined }))}
                      className="w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                      placeholder="No minimum"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="requiresInvitation"
                      checked={formData.requiresInvitation || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, requiresInvitation: e.target.checked }))}
                      className="rounded border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)]"
                    />
                    <label htmlFor="requiresInvitation" className="text-sm text-[var(--hive-text-primary)]">
                      Requires invitation to join
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isGlobal"
                      checked={formData.isGlobal || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, isGlobal: e.target.checked }))}
                      className="rounded border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)]"
                    />
                    <label htmlFor="isGlobal" className="text-sm text-[var(--hive-text-primary)]">
                      Global ritual (all universities)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                Actions & Requirements
              </h3>
              
              {/* Actions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Required Actions</h4>
                  <button
                    type="button"
                    onClick={addAction}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90"
                  >
                    <Plus className="h-4 w-4" />
                    Add Action
                  </button>
                </div>

                {formData.actions?.map((action, index) => {
                  const ActionIcon = ACTION_TYPE_CONFIG[action.type].icon;
                  return (
                    <div key={action.id} className="p-4 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-subtle)]">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-2 flex-1">
                          <ActionIcon className="h-4 w-4 text-[var(--hive-text-secondary)]" />
                          <select
                            value={action.type}
                            onChange={(e) => updateAction(index, { type: e.target.value as any })}
                            className="px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                          >
                            {Object.entries(ACTION_TYPE_CONFIG).map(([key, config]) => (
                              <option key={key} value={key}>{config.label}</option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAction(index)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-4 space-y-3">
                        <input
                          type="text"
                          value={action.name}
                          onChange={(e) => updateAction(index, { name: e.target.value })}
                          placeholder="Action name"
                          className="w-full px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                        />
                        <textarea
                          value={action.description}
                          onChange={(e) => updateAction(index, { description: e.target.value })}
                          placeholder="Action description"
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)] resize-none"
                        />

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`required-${action.id}`}
                              checked={action.isRequired}
                              onChange={(e) => updateAction(index, { isRequired: e.target.checked })}
                              className="rounded border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)]"
                            />
                            <label htmlFor={`required-${action.id}`} className="text-sm text-[var(--hive-text-primary)]">
                              Required
                            </label>
                          </div>

                          <div className="flex items-center gap-2">
                            <label className="text-sm text-[var(--hive-text-primary)]">Points:</label>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={action.weight}
                              onChange={(e) => updateAction(index, { weight: parseInt(e.target.value) || 10 })}
                              className="w-16 px-2 py-1 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {errors.actions && (
                  <p className="text-sm text-red-400">{errors.actions}</p>
                )}

                {formData.actions?.length === 0 && (
                  <div className="text-center py-8 text-[var(--hive-text-secondary)]">
                    <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No actions defined yet. Add actions for participants to complete.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                Milestones & Rewards
              </h3>

              {/* Milestones */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Milestones</h4>
                  <button
                    type="button"
                    onClick={addMilestone}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90"
                  >
                    <Plus className="h-4 w-4" />
                    Add Milestone
                  </button>
                </div>

                {formData.milestones?.map((milestone, index) => (
                  <div key={milestone.id} className="p-4 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-subtle)]">
                    <div className="flex items-start justify-between mb-3">
                      <Trophy className="h-5 w-5 text-[var(--hive-gold)] mt-1" />
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        value={milestone.name}
                        onChange={(e) => updateMilestone(index, { name: e.target.value })}
                        placeholder="Milestone name"
                        className="w-full px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                      />
                      <textarea
                        value={milestone.description}
                        onChange={(e) => updateMilestone(index, { description: e.target.value })}
                        placeholder="Milestone description"
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)] resize-none"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-[var(--hive-text-secondary)] mb-1">
                            Participant Threshold
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={milestone.participantThreshold}
                            onChange={(e) => updateMilestone(index, { participantThreshold: parseInt(e.target.value) || 1 })}
                            className="w-full px-3 py-2 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[var(--hive-text-secondary)] mb-1">
                            Progress Threshold (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={milestone.progressThreshold}
                            onChange={(e) => updateMilestone(index, { progressThreshold: parseInt(e.target.value) || 50 })}
                            className="w-full px-3 py-2 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rewards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Rewards</h4>
                  <button
                    type="button"
                    onClick={addReward}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90"
                  >
                    <Plus className="h-4 w-4" />
                    Add Reward
                  </button>
                </div>

                {formData.rewards?.map((reward, index) => (
                  <div key={reward.id} className="p-4 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-subtle)]">
                    <div className="flex items-start justify-between mb-3">
                      <Gift className="h-5 w-5 text-[var(--hive-gold)] mt-1" />
                      <button
                        type="button"
                        onClick={() => removeReward(index)}
                        className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={reward.name}
                          onChange={(e) => updateReward(index, { name: e.target.value })}
                          placeholder="Reward name"
                          className="px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                        />
                        <select
                          value={reward.type}
                          onChange={(e) => updateReward(index, { type: e.target.value as any })}
                          className="px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                        >
                          <option value="badge">Badge</option>
                          <option value="feature">Feature Unlock</option>
                          <option value="access">Special Access</option>
                          <option value="recognition">Recognition</option>
                          <option value="tool">Tool Access</option>
                          <option value="customization">Customization</option>
                        </select>
                      </div>

                      <textarea
                        value={reward.description}
                        onChange={(e) => updateReward(index, { description: e.target.value })}
                        placeholder="Reward description"
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)] resize-none"
                      />

                      <div className="grid grid-cols-3 gap-3">
                        <select
                          value={reward.rarity}
                          onChange={(e) => updateReward(index, { rarity: e.target.value as any })}
                          className="px-3 py-2 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                        >
                          <option value="common">Common</option>
                          <option value="uncommon">Uncommon</option>
                          <option value="rare">Rare</option>
                          <option value="epic">Epic</option>
                          <option value="legendary">Legendary</option>
                        </select>

                        <select
                          value={reward.unlockScope}
                          onChange={(e) => updateReward(index, { unlockScope: e.target.value as any })}
                          className="px-3 py-2 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                        >
                          <option value="user">Personal</option>
                          <option value="space">Space-wide</option>
                          <option value="campus">Campus-wide</option>
                          <option value="platform">Platform-wide</option>
                        </select>

                        <div className="flex items-center gap-2">
                          <label className="text-xs text-[var(--hive-text-secondary)]">Min %:</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={reward.minimumParticipation}
                            onChange={(e) => updateReward(index, { minimumParticipation: parseInt(e.target.value) || 80 })}
                            className="w-16 px-2 py-1 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                Preview & Confirm
              </h3>

              <div className="space-y-6">
                {/* Preview Card */}
                <div className="p-6 bg-[var(--hive-background-tertiary)] rounded-xl border border-[var(--hive-border-subtle)]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {formData.type && (
                        <div className={cn("p-3 rounded-xl", RITUAL_TYPE_CONFIG[formData.type].bgColor)}>
                          {React.createElement(RITUAL_TYPE_CONFIG[formData.type].icon, {
                            className: cn("h-6 w-6", RITUAL_TYPE_CONFIG[formData.type].color)
                          })}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xl font-bold text-[var(--hive-text-primary)]">{formData.title}</h4>
                        <p className="text-sm text-[var(--hive-gold)]">{formData.tagline}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] text-sm rounded-lg">
                      {formData.type && RITUAL_TYPE_CONFIG[formData.type].label}
                    </div>
                  </div>

                  <p className="text-[var(--hive-text-secondary)] mb-6">{formData.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                        {formData.actions?.length || 0}
                      </div>
                      <div className="text-xs text-[var(--hive-text-secondary)]">Actions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                        {formData.milestones?.length || 0}
                      </div>
                      <div className="text-xs text-[var(--hive-text-secondary)]">Milestones</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                        {formData.rewards?.length || 0}
                      </div>
                      <div className="text-xs text-[var(--hive-text-secondary)]">Rewards</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-[var(--hive-text-secondary)]">
                      Participation: {formData.participationType}
                    </div>
                    <div className="text-[var(--hive-text-secondary)]">
                      {formData.startTime && new Date(formData.startTime).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 bg-[var(--hive-gold)]/10 rounded-lg border border-[var(--hive-gold)]/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[var(--hive-gold)] mt-0.5" />
                    <div>
                      <h5 className="font-medium text-[var(--hive-text-primary)] mb-1">Ready to Create</h5>
                      <p className="text-sm text-[var(--hive-text-secondary)]">
                        Your ritual "{formData.title}" is configured and ready to be created. 
                        It will be saved as a draft and can be scheduled to go live later.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <HiveModal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="max-h-[90vh] overflow-hidden"
    >
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--hive-border-subtle)]">
          <div>
            <h2 className="text-xl font-bold text-[var(--hive-text-primary)]">Create New Ritual</h2>
            <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
              Step {step} of 5: {
                step === 1 ? 'Basic Information' :
                step === 2 ? 'Timing & Participation' :
                step === 3 ? 'Actions & Requirements' :
                step === 4 ? 'Milestones & Rewards' :
                'Preview & Confirm'
              }
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X className="h-5 w-5 text-[var(--hive-text-secondary)]" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-[var(--hive-background-tertiary)]">
          <div 
            className="h-full bg-[var(--hive-gold)] transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)]">
          <button
            onClick={handlePrev}
            disabled={step === 1 || isLoading}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
              step === 1 || isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)]"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  i + 1 === step
                    ? "bg-[var(--hive-gold)]"
                    : i + 1 < step
                    ? "bg-[var(--hive-gold)]/60"
                    : "bg-[var(--hive-border-subtle)]"
                )}
              />
            ))}
          </div>

          {step < 5 ? (
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Create Ritual
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </HiveModal>
  );
}