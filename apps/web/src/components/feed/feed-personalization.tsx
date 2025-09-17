'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Sliders,
  Hash,
  Calendar,
  Users,
  Zap,
  Clock,
  TrendingUp,
  Bell,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Sparkles,
  Filter,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { Button, Badge, Switch } from '@hive/ui';
import { cn } from '@/lib/utils';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';

interface PersonalizationSettings {
  contentPreferences: {
    posts: boolean;
    events: boolean;
    rituals: boolean;
    tools: boolean;
    coordinations: boolean;
  };
  priorityFilters: {
    urgent: boolean;
    high: boolean;
    normal: boolean;
    low: boolean;
  };
  timeRange: 'today' | 'week' | 'month' | 'all';
  algorithmWeights: {
    relevance: number;
    recency: number;
    engagement: number;
    social: number;
    diversity: number;
  };
  notificationSettings: {
    realTime: boolean;
    digest: 'never' | 'daily' | 'weekly';
    mentions: boolean;
    trending: boolean;
    events: boolean;
  };
  privacySettings: {
    hideActivity: boolean;
    anonymousEngagement: boolean;
    limitedProfile: boolean;
  };
  smartFilters: {
    hideSeenContent: boolean;
    boostFromFriends: boolean;
    academicFocus: boolean;
    socialFocus: boolean;
    campusWideOnly: boolean;
  };
}

interface FeedPersonalizationProps {
  userId: string;
  currentSettings?: Partial<PersonalizationSettings>;
  onSettingsChange?: (settings: PersonalizationSettings) => void;
  onClose?: () => void;
  className?: string;
}

const DEFAULT_SETTINGS: PersonalizationSettings = {
  contentPreferences: {
    posts: true,
    events: true,
    rituals: true,
    tools: true,
    coordinations: true
  },
  priorityFilters: {
    urgent: true,
    high: true,
    normal: true,
    low: false
  },
  timeRange: 'week',
  algorithmWeights: {
    relevance: 70,
    recency: 60,
    engagement: 50,
    social: 40,
    diversity: 30
  },
  notificationSettings: {
    realTime: true,
    digest: 'daily',
    mentions: true,
    trending: false,
    events: true
  },
  privacySettings: {
    hideActivity: false,
    anonymousEngagement: false,
    limitedProfile: false
  },
  smartFilters: {
    hideSeenContent: false,
    boostFromFriends: true,
    academicFocus: false,
    socialFocus: false,
    campusWideOnly: false
  }
};

export function FeedPersonalization({
  userId,
  currentSettings = {},
  onSettingsChange,
  onClose,
  className = ''
}: FeedPersonalizationProps) {
  const [settings, setSettings] = useState<PersonalizationSettings>({
    ...DEFAULT_SETTINGS,
    ...currentSettings
  });
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['content']));
  const [saving, setSaving] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  useEffect(() => {
    fetchAiSuggestions();
  }, []);

  const fetchAiSuggestions = async () => {
    try {
      const response = await authenticatedFetch('/api/feed/ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, currentSettings: settings })
      });

      if (response.ok) {
        const data = await response.json();
        setAiSuggestions(data.suggestions || []);
      }
    } catch (error) {
      logger.error('Error fetching AI suggestions:', { error: String(error) });
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const updateSettings = (updates: Partial<PersonalizationSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const updateContentPreference = (type: keyof PersonalizationSettings['contentPreferences']) => {
    setSettings(prev => ({
      ...prev,
      contentPreferences: {
        ...prev.contentPreferences,
        [type]: !prev.contentPreferences[type]
      }
    }));
  };

  const updatePriorityFilter = (priority: keyof PersonalizationSettings['priorityFilters']) => {
    setSettings(prev => ({
      ...prev,
      priorityFilters: {
        ...prev.priorityFilters,
        [priority]: !prev.priorityFilters[priority]
      }
    }));
  };

  const updateAlgorithmWeight = (weight: keyof PersonalizationSettings['algorithmWeights'], value: number) => {
    setSettings(prev => ({
      ...prev,
      algorithmWeights: {
        ...prev.algorithmWeights,
        [weight]: value
      }
    }));
  };

  const updateSmartFilter = (filter: keyof PersonalizationSettings['smartFilters']) => {
    setSettings(prev => ({
      ...prev,
      smartFilters: {
        ...prev.smartFilters,
        [filter]: !prev.smartFilters[filter]
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await authenticatedFetch('/api/feed/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, settings })
      });

      if (response.ok) {
        onSettingsChange?.(settings);
        onClose?.();
      }
    } catch (error) {
      logger.error('Error saving preferences:', { error: String(error) });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const applyPreset = (preset: 'academic' | 'social' | 'balanced' | 'minimal') => {
    switch (preset) {
      case 'academic':
        setSettings(prev => ({
          ...prev,
          contentPreferences: { ...prev.contentPreferences, posts: false, coordinations: true },
          smartFilters: { ...prev.smartFilters, academicFocus: true, socialFocus: false },
          algorithmWeights: { ...prev.algorithmWeights, relevance: 90, social: 20 }
        }));
        break;
      case 'social':
        setSettings(prev => ({
          ...prev,
          contentPreferences: { ...prev.contentPreferences, events: true, rituals: true },
          smartFilters: { ...prev.smartFilters, academicFocus: false, socialFocus: true },
          algorithmWeights: { ...prev.algorithmWeights, social: 80, relevance: 40 }
        }));
        break;
      case 'balanced':
        setSettings(DEFAULT_SETTINGS);
        break;
      case 'minimal':
        setSettings(prev => ({
          ...prev,
          priorityFilters: { urgent: true, high: true, normal: false, low: false },
          timeRange: 'today',
          notificationSettings: { ...prev.notificationSettings, realTime: false, digest: 'weekly' }
        }));
        break;
    }
  };

  return (
    <div className={cn('max-h-[80vh] overflow-y-auto space-y-4', className)}>
      {/* Header */}
      <div className="sticky top-0 bg-black z-10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
            <h2 className="text-lg font-semibold text-[var(--hive-text-inverse)]">
              Personalize Your Feed
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-neutral-400"
          >
            ✕
          </Button>
        </div>

        {/* Quick Presets */}
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset('academic')}
            className="border-white/20"
          >
            📚 Academic
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset('social')}
            className="border-white/20"
          >
            🎉 Social
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset('balanced')}
            className="border-white/20"
          >
            ⚖️ Balanced
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset('minimal')}
            className="border-white/20"
          >
            🔇 Minimal
          </Button>
        </div>
      </div>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <div className="bg-[var(--hive-brand-secondary)]/10 border border-[var(--hive-brand-secondary)]/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
            <span className="text-sm font-medium text-[var(--hive-brand-secondary)]">
              AI Suggestions
            </span>
          </div>
          <ul className="space-y-1">
            {aiSuggestions.map((suggestion, index) => (
              <li key={index} className="text-xs text-neutral-300 flex items-start gap-1">
                <span className="text-[var(--hive-brand-secondary)]">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content Types Section */}
      <div className="bg-white/5 rounded-lg border border-white/10">
        <button
          onClick={() => toggleSection('content')}
          className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-neutral-400" />
            <span className="font-medium text-[var(--hive-text-inverse)]">Content Types</span>
          </div>
          {expandedSections.has('content') ? (
            <ChevronUp className="h-4 w-4 text-neutral-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-neutral-400" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.has('content') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 p-4 space-y-3"
            >
              {Object.entries(settings.contentPreferences).map(([type, enabled]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-neutral-300 capitalize">{type}</span>
                  <Switch
                    checked={enabled}
                    onCheckedChange={() => updateContentPreference(type as any)}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Priority Filters Section */}
      <div className="bg-white/5 rounded-lg border border-white/10">
        <button
          onClick={() => toggleSection('priority')}
          className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-neutral-400" />
            <span className="font-medium text-[var(--hive-text-inverse)]">Priority Levels</span>
          </div>
          {expandedSections.has('priority') ? (
            <ChevronUp className="h-4 w-4 text-neutral-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-neutral-400" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.has('priority') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 p-4 space-y-3"
            >
              {Object.entries(settings.priorityFilters).map(([priority, enabled]) => (
                <div key={priority} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={cn(
                      'text-xs capitalize',
                      priority === 'urgent' && 'bg-red-400/20 text-red-400',
                      priority === 'high' && 'bg-orange-400/20 text-orange-400',
                      priority === 'normal' && 'bg-blue-400/20 text-blue-400',
                      priority === 'low' && 'bg-neutral-400/20 text-neutral-400'
                    )}>
                      {priority}
                    </Badge>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={() => updatePriorityFilter(priority as any)}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Algorithm Weights Section */}
      <div className="bg-white/5 rounded-lg border border-white/10">
        <button
          onClick={() => toggleSection('algorithm')}
          className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-neutral-400" />
            <span className="font-medium text-[var(--hive-text-inverse)]">Algorithm Tuning</span>
          </div>
          {expandedSections.has('algorithm') ? (
            <ChevronUp className="h-4 w-4 text-neutral-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-neutral-400" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.has('algorithm') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 p-4 space-y-4"
            >
              {Object.entries(settings.algorithmWeights).map(([weight, value]) => (
                <div key={weight} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-300 capitalize">{weight}</span>
                    <span className="text-xs text-neutral-400">{value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e: any) => updateAlgorithmWeight(weight as any, parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Smart Filters Section */}
      <div className="bg-white/5 rounded-lg border border-white/10">
        <button
          onClick={() => toggleSection('smart')}
          className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-neutral-400" />
            <span className="font-medium text-[var(--hive-text-inverse)]">Smart Filters</span>
          </div>
          {expandedSections.has('smart') ? (
            <ChevronUp className="h-4 w-4 text-neutral-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-neutral-400" />
          )}
        </button>

        <AnimatePresence>
          {expandedSections.has('smart') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/10 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <EyeOff className="h-3 w-3 text-neutral-400" />
                  <span className="text-sm text-neutral-300">Hide seen content</span>
                </div>
                <Switch
                  checked={settings.smartFilters.hideSeenContent}
                  onCheckedChange={() => updateSmartFilter('hideSeenContent')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-neutral-400" />
                  <span className="text-sm text-neutral-300">Boost from friends</span>
                </div>
                <Switch
                  checked={settings.smartFilters.boostFromFriends}
                  onCheckedChange={() => updateSmartFilter('boostFromFriends')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">📚</span>
                  <span className="text-sm text-neutral-300">Academic focus</span>
                </div>
                <Switch
                  checked={settings.smartFilters.academicFocus}
                  onCheckedChange={() => updateSmartFilter('academicFocus')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🎉</span>
                  <span className="text-sm text-neutral-300">Social focus</span>
                </div>
                <Switch
                  checked={settings.smartFilters.socialFocus}
                  onCheckedChange={() => updateSmartFilter('socialFocus')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🏫</span>
                  <span className="text-sm text-neutral-300">Campus-wide only</span>
                </div>
                <Switch
                  checked={settings.smartFilters.campusWideOnly}
                  onCheckedChange={() => updateSmartFilter('campusWideOnly')}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Time Range Selection */}
      <div className="bg-white/5 rounded-lg border border-white/10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-neutral-400" />
          <span className="font-medium text-[var(--hive-text-inverse)]">Time Range</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {(['today', 'week', 'month', 'all'] as const).map(range => (
            <button
              key={range}
              onClick={() => updateSettings({ timeRange: range })}
              className={cn(
                'py-2 px-3 rounded-lg text-sm capitalize transition-all',
                settings.timeRange === range
                  ? 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30'
                  : 'bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10'
              )}
            >
              {range === 'all' ? 'All Time' : range}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-black pt-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleReset}
          className="text-neutral-400"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/20"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </div>
  );
}