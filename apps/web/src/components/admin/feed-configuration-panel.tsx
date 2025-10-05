"use client";

/**
 * Feed Configuration Panel for Admin Dashboard
 *
 * Real-time control center for HIVE feed features and algorithms.
 * Changes propagate instantly to all active users without code deploys.
 *
 * @educational This implements the Strategy pattern - different feed
 * configurations are strategies that can be swapped at runtime, allowing
 * A/B testing and rapid iteration based on engagement metrics.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import {
  Settings,
  ToggleLeft,
  ToggleRight,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Zap,
  Users,
  Trophy,
  Clock,
  TrendingUp,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react';
import { feedConfig, type FeedConfiguration, DEFAULT_FEED_CONFIG } from '@/lib/feed-config';
import { useAuth } from '@hive/auth-logic';
import { useToast } from '@/hooks/use-toast';

// ═══════════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════════

export function FeedConfigurationPanel() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [config, setConfig] = useState<FeedConfiguration | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalConfig, setOriginalConfig] = useState<FeedConfiguration | null>(null);

  // Load current configuration
  useEffect(() => {
    async function loadConfig() {
      setLoading(true);
      try {
        const currentConfig = await feedConfig.getConfig();
        setConfig(currentConfig);
        setOriginalConfig(currentConfig);
      } catch (error) {
        console.error('Failed to load feed configuration:', error);
        toast({
          title: 'Failed to load configuration',
          description: error instanceof Error ? error.message : 'Unknown error occurred',
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    }

    loadConfig();

    // Subscribe to configuration changes
    const unsubscribe = feedConfig.subscribe((newConfig) => {
      setConfig(newConfig);
      setOriginalConfig(newConfig);
      setHasChanges(false);
    });

    return unsubscribe;
  }, [toast]);

  // Track changes
  useEffect(() => {
    if (!config || !originalConfig) return;

    const hasChanges = JSON.stringify(config) !== JSON.stringify(originalConfig);
    setHasChanges(hasChanges);
  }, [config, originalConfig]);

  // Toggle feature
  const toggleFeature = useCallback((feature: keyof FeedConfiguration['features']) => {
    if (!config) return;

    setConfig(prev => ({
      ...prev!,
      features: {
        ...prev!.features,
        [feature]: !prev!.features[feature]
      }
    }));
  }, [config]);

  // Update algorithm weight
  const updateAlgorithm = useCallback((algorithm: keyof FeedConfiguration['algorithms'], value: number) => {
    if (!config) return;

    setConfig(prev => ({
      ...prev!,
      algorithms: {
        ...prev!.algorithms,
        [algorithm]: value
      }
    }));
  }, [config]);

  // Update posting rule
  const updatePostingRule = useCallback((rule: keyof FeedConfiguration['postingRules'], value: number | boolean) => {
    if (!config) return;

    setConfig(prev => ({
      ...prev!,
      postingRules: {
        ...prev!.postingRules,
        [rule]: value
      }
    }));
  }, [config]);

  // Update ritual display mode
  const updateRitualDisplay = useCallback((mode: 'stories' | 'cards' | 'both' | 'none') => {
    if (!config) return;

    setConfig(prev => ({
      ...prev!,
      activeRitual: {
        ...prev!.activeRitual,
        displayMode: mode
      }
    }));
  }, [config]);

  // Save configuration
  const saveConfiguration = useCallback(async () => {
    if (!config || !hasChanges || !user) return;

    setSaving(true);
    try {
      await feedConfig.updateConfig(config, user.email || 'admin');

      toast({
        title: 'Configuration saved',
        description: 'Feed settings have been updated for all users',
        type: 'success'
      });

      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save configuration:', error);
      toast({
        title: 'Failed to save configuration',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  }, [config, hasChanges, user, toast]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setConfig(DEFAULT_FEED_CONFIG);
  }, []);

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          Loading configuration...
        </div>
      </Card>
    );
  }

  if (!config) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p>Failed to load feed configuration</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-[var(--hive-brand-primary)]" />
            <div>
              <h2 className="text-xl font-bold text-hive-text-primary">Feed Configuration</h2>
              <p className="text-sm text-hive-text-secondary">
                Real-time control of feed features and algorithms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasChanges && (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                Unsaved Changes
              </Badge>
            )}

            <Button
              variant="outline"
              onClick={resetToDefaults}
              disabled={saving}
            >
              Reset to Defaults
            </Button>

            <Button
              onClick={saveConfiguration}
              disabled={!hasChanges || saving}
              className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
            >
              {saving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Environment info */}
        <div className="flex items-center gap-4 text-sm">
          <Badge className="bg-blue-500/20 text-blue-400">
            {config.metadata.environment}
          </Badge>
          <span className="text-hive-text-secondary">
            Version {config.metadata.version}
          </span>
          <span className="text-hive-text-secondary">
            Last updated by {config.metadata.updatedBy}
          </span>
        </div>
      </Card>

      {/* Feature Toggles */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4 flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Feature Toggles
        </h3>

        <div className="space-y-4">
          {Object.entries(config.features).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-hive-background-overlay rounded-lg">
              <div className="flex items-center gap-3">
                {value ? (
                  <ToggleRight className="h-5 w-5 text-green-400" />
                ) : (
                  <ToggleLeft className="h-5 w-5 text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-hive-text-primary">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-xs text-hive-text-secondary">
                    {getFeatureDescription(key as keyof FeedConfiguration['features'])}
                  </p>
                </div>
              </div>

              <Button
                variant={value ? 'primary' : 'secondary'}
                className="max-w-sm"
                onClick={() => toggleFeature(key as keyof FeedConfiguration['features'])}
              >
                {value ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Algorithm Weights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Algorithm Weights
        </h3>

        <div className="space-y-4">
          {Object.entries(config.algorithms).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-hive-text-primary">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <span className="text-sm text-[var(--hive-brand-primary)] font-bold">{value}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e: React.ChangeEvent) => updateAlgorithm(key as keyof FeedConfiguration['algorithms'], parseInt((e.target as any).value))}
                className="w-full h-2 bg-hive-background rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Posting Rules */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4 flex items-center">
          <Lock className="h-5 w-5 mr-2" />
          Posting Rules
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-hive-text-primary">
              Min Account Age (days)
            </label>
            <input
              type="number"
              min="0"
              max="30"
              value={config.postingRules.minAccountAgeDays}
              onChange={(e: React.ChangeEvent) => updatePostingRule('minAccountAgeDays', parseInt((e.target as any).value))}
              className="w-full px-3 py-2 bg-hive-background border border-hive-border rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-hive-text-primary">
              Min Space Memberships
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={config.postingRules.minSpaceMemberships}
              onChange={(e: React.ChangeEvent) => updatePostingRule('minSpaceMemberships', parseInt((e.target as any).value))}
              className="w-full px-3 py-2 bg-hive-background border border-hive-border rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-hive-text-primary">
              Min Engagement Score
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={config.postingRules.minEngagementScore}
              onChange={(e: React.ChangeEvent) => updatePostingRule('minEngagementScore', parseInt((e.target as any).value))}
              className="w-full px-3 py-2 bg-hive-background border border-hive-border rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-hive-text-primary">
              Daily Post Limit
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={config.postingRules.dailyPostLimit}
              onChange={(e: React.ChangeEvent) => updatePostingRule('dailyPostLimit', parseInt((e.target as any).value))}
              className="w-full px-3 py-2 bg-hive-background border border-hive-border rounded-lg"
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.postingRules.requireProfileComplete}
              onChange={(e: React.ChangeEvent) => updatePostingRule('requireProfileComplete', e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-hive-text-primary">Require complete profile</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={config.postingRules.specialEventOverride}
              onChange={(e: React.ChangeEvent) => updatePostingRule('specialEventOverride', e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-hive-text-primary">Allow ritual override of posting rules</span>
          </label>
        </div>
      </Card>

      {/* Ritual Display Mode */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4 flex items-center">
          <Trophy className="h-5 w-5 mr-2" />
          Ritual Display Mode
        </h3>

        <div className="grid grid-cols-4 gap-3">
          {(['stories', 'cards', 'both', 'none'] as const).map((mode) => (
            <Button
              key={mode}
              variant={config.activeRitual.displayMode === mode ? 'primary' : 'secondary'}
              onClick={() => updateRitualDisplay(mode)}
              className="capitalize"
            >
              {mode === 'none' ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {mode}
            </Button>
          ))}
        </div>

        {config.activeRitual.id && (
          <div className="mt-4 p-3 bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 rounded-lg">
            <p className="text-sm text-hive-text-primary">
              <span className="font-semibold">Active Ritual:</span> {config.activeRitual.id}
            </p>
            <p className="text-xs text-hive-text-secondary mt-1">
              Participation threshold: {config.activeRitual.participationThreshold}%
            </p>
          </div>
        )}
      </Card>

      {/* Status */}
      <Card className="p-4 bg-green-500/10 border-green-500/30">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <p className="text-sm text-green-400">
            Configuration is live and syncing to all active users
          </p>
        </div>
      </Card>
    </div>
  );
}

// Helper function for feature descriptions
function getFeatureDescription(feature: keyof FeedConfiguration['features']): string {
  const descriptions = {
    ritualsEnabled: 'Show ritual content (stories/cards) in the feed',
    postingGateEnabled: 'Require users to meet criteria before posting',
    temporalBoostingEnabled: 'Prioritize time-sensitive content',
    competitionModeEnabled: 'Enable space vs space competitions',
    storiesStripEnabled: 'Display ritual stories at top of feed',
    horizontalCardsEnabled: 'Show horizontal cards for rituals',
    phantomEngagementEnabled: 'Create synthetic activity for new users'
  };

  return descriptions[feature] || 'Control this feed feature';
}