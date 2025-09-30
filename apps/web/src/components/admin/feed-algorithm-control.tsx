"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui';
import { Button } from '@hive/ui';
import { Badge } from '@hive/ui';
import { Switch } from '@hive/ui';
import { Slider } from '@hive/ui';
import { Alert, AlertDescription } from '@hive/ui';
import {
  Settings,
  TrendingUp,
  Clock,
  Users,
  Calendar,
  BarChart3,
  RefreshCw,
  Save,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  Target
} from 'lucide-react';

interface AlgorithmConfig {
  temporalWeights: {
    happeningNow: number;
    next2Hours: number;
    today: number;
    tomorrow: number;
    thisWeek: number;
    pastEvents: number;
  };
  contentTypePriorities: {
    liveEvent: number;
    ritualContent: number;
    upcomingEvent: number;
    userPost: number;
    spaceActivity: number;
    rssEvent: number;
  };
  engagementFactors: {
    recencyWeight: number;
    popularityWeight: number;
    membershipWeight: number;
    builderBonus: number;
  };
  feedMixRules: {
    maxEventsPerFeed: number;
    minPostsPerFeed: number;
    diversityThreshold: number;
    campusEventBoost: number;
  };
  realTimeSettings: {
    enableSSE: boolean;
    updateInterval: number;
    maxConcurrentUsers: number;
    cacheTimeout: number;
  };
}

interface AlgorithmMetrics {
  performance: {
    avgResponseTime: number;
    cacheHitRate: number;
    errorRate: number;
    throughput: number;
  };
  engagement: {
    avgSessionTime: number;
    clickThroughRate: number;
    contentInteractionRate: number;
    feedScrollDepth: number;
  };
  contentDistribution: {
    events: number;
    posts: number;
    rituals: number;
    averageAge: number;
  };
}

export function FeedAlgorithmControl() {
  const [config, setConfig] = useState<AlgorithmConfig | null>(null);
  const [metrics, setMetrics] = useState<AlgorithmMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    loadAlgorithmConfig();
    loadMetrics();

    // Auto-refresh metrics every 30 seconds
    const interval = setInterval(loadMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadAlgorithmConfig = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/feed-algorithm');

      if (!response.ok) {
        throw new Error('Failed to load algorithm config');
      }

      const data = await response.json();
      setConfig(data.config);
      setLastUpdated(new Date(data.lastUpdated));
    } catch (error) {
      console.error('Error loading algorithm config:', error);
      // Set default config if loading fails
      setConfig(getDefaultConfig());
    } finally {
      setLoading(false);
    }
  };

  const loadMetrics = async () => {
    try {
      const response = await fetch('/api/admin/feed-metrics');

      if (!response.ok) {
        throw new Error('Failed to load metrics');
      }

      const data = await response.json();
      setMetrics(data.metrics);
    } catch (error) {
      console.error('Error loading metrics:', error);
    }
  };

  const saveConfig = async () => {
    if (!config) return;

    try {
      setSaving(true);
      const response = await fetch('/api/admin/feed-algorithm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config }),
      });

      if (!response.ok) {
        throw new Error('Failed to save config');
      }

      setUnsavedChanges(false);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error saving config:', error);
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    setConfig(getDefaultConfig());
    setUnsavedChanges(true);
  };

  const updateConfig = (path: string, value: number | boolean) => {
    if (!config) return;

    const keys = path.split('.');
    const newConfig = { ...config };
    let current: any = newConfig;

    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setConfig(newConfig);
    setUnsavedChanges(true);
  };

  const getDefaultConfig = (): AlgorithmConfig => ({
    temporalWeights: {
      happeningNow: 100,
      next2Hours: 90,
      today: 70,
      tomorrow: 60,
      thisWeek: 40,
      pastEvents: 20,
    },
    contentTypePriorities: {
      liveEvent: 10,
      ritualContent: 9,
      upcomingEvent: 8,
      userPost: 6,
      spaceActivity: 5,
      rssEvent: 4,
    },
    engagementFactors: {
      recencyWeight: 0.3,
      popularityWeight: 0.2,
      membershipWeight: 0.4,
      builderBonus: 5,
    },
    feedMixRules: {
      maxEventsPerFeed: 8,
      minPostsPerFeed: 3,
      diversityThreshold: 0.7,
      campusEventBoost: 0.8,
    },
    realTimeSettings: {
      enableSSE: true,
      updateInterval: 5000,
      maxConcurrentUsers: 1000,
      cacheTimeout: 300,
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)]"></div>
      </div>
    );
  }

  if (!config) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load algorithm configuration. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-hive-text-primary">Feed Algorithm Control</h2>
          <p className="text-hive-text-secondary">
            Real-time control of the temporal event weighting algorithm and feed parameters
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {unsavedChanges && (
            <Badge variant="destructive" className="animate-pulse">
              Unsaved Changes
            </Badge>
          )}
          {lastUpdated && (
            <span className="text-sm text-hive-text-secondary">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button onClick={loadMetrics} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={resetToDefaults} variant="outline" size="sm">
            Reset Defaults
          </Button>
          <Button
            onClick={saveConfig}
            disabled={saving || !unsavedChanges}
            className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
          >
            {saving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Real-time Metrics Dashboard */}
      {metrics && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-green-500/10 border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-400">Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                {metrics.performance.avgResponseTime}ms
              </div>
              <p className="text-xs text-green-400/70">Average feed load time</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-400">Cache Hit Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">
                {metrics.performance.cacheHitRate}%
              </div>
              <p className="text-xs text-blue-400/70">Algorithm efficiency</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-purple-400">Engagement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">
                {metrics.engagement.clickThroughRate}%
              </div>
              <p className="text-xs text-purple-400/70">Content interaction</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10 border-orange-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-orange-400">Content Mix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">
                {Math.round((metrics.contentDistribution.events / (metrics.contentDistribution.events + metrics.contentDistribution.posts)) * 100)}%
              </div>
              <p className="text-xs text-orange-400/70">Events vs Posts</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Temporal Weights Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-[var(--hive-brand-primary)]" />
              <span>Temporal Event Weights</span>
            </CardTitle>
            <CardDescription>
              Control how time proximity affects content ranking (0-100 points)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(config.temporalWeights).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-hive-text-primary capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <Badge variant="outline" className="text-[var(--hive-brand-primary)]">
                    {value} pts
                  </Badge>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={([newValue]) => updateConfig(`temporalWeights.${key}`, newValue)}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Content Type Priorities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-[var(--hive-brand-primary)]" />
              <span>Content Type Priorities</span>
            </CardTitle>
            <CardDescription>
              Set relative importance of different content types (1-10 scale)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(config.contentTypePriorities).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-hive-text-primary capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <Badge
                    variant="outline"
                    className={value >= 8 ? "text-green-400" : value >= 6 ? "text-yellow-400" : "text-gray-400"}
                  >
                    Priority {value}
                  </Badge>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={([newValue]) => updateConfig(`contentTypePriorities.${key}`, newValue)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Engagement Factors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-[var(--hive-brand-primary)]" />
              <span>Engagement Factors</span>
            </CardTitle>
            <CardDescription>
              Weight distribution for engagement scoring (0.0-1.0 scale)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(config.engagementFactors).map(([key, value]) => {
              const isBonus = key === 'builderBonus';
              const maxValue = isBonus ? 20 : 1;
              const step = isBonus ? 1 : 0.1;
              const displayValue = isBonus ? `+${value}` : value.toFixed(1);

              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-hive-text-primary capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <Badge variant="outline" className="text-[var(--hive-brand-primary)]">
                      {displayValue}{isBonus ? ' pts' : ''}
                    </Badge>
                  </div>
                  <Slider
                    value={[value]}
                    onValueChange={([newValue]) => updateConfig(`engagementFactors.${key}`, newValue)}
                    max={maxValue}
                    min={0}
                    step={step}
                    className="w-full"
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Feed Mix Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-[var(--hive-brand-primary)]" />
              <span>Feed Mix Rules</span>
            </CardTitle>
            <CardDescription>
              Control content distribution and diversity in feeds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(config.feedMixRules).map(([key, value]) => {
              const isPercentage = key.includes('Boost') || key.includes('Threshold');
              const maxValue = isPercentage ? 1 : key.includes('max') ? 20 : key.includes('min') ? 10 : 1;
              const step = isPercentage ? 0.1 : 1;
              const displayValue = isPercentage ? `${(value * 100).toFixed(0)}%` : value.toString();

              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-hive-text-primary capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <Badge variant="outline" className="text-[var(--hive-brand-primary)]">
                      {displayValue}
                    </Badge>
                  </div>
                  <Slider
                    value={[value]}
                    onValueChange={([newValue]) => updateConfig(`feedMixRules.${key}`, newValue)}
                    max={maxValue}
                    min={0}
                    step={step}
                    className="w-full"
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Real-time Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-[var(--hive-brand-primary)]" />
            <span>Real-time Settings</span>
          </CardTitle>
          <CardDescription>
            Configure SSE updates and performance parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-hive-text-primary">
                    Enable Server-Sent Events
                  </label>
                  <p className="text-xs text-hive-text-secondary">
                    Real-time feed updates via SSE
                  </p>
                </div>
                <Switch
                  checked={config.realTimeSettings.enableSSE}
                  onCheckedChange={(checked) => updateConfig('realTimeSettings.enableSSE', checked)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-hive-text-primary">
                    Update Interval
                  </label>
                  <Badge variant="outline" className="text-[var(--hive-brand-primary)]">
                    {config.realTimeSettings.updateInterval / 1000}s
                  </Badge>
                </div>
                <Slider
                  value={[config.realTimeSettings.updateInterval]}
                  onValueChange={([newValue]) => updateConfig('realTimeSettings.updateInterval', newValue)}
                  max={30000}
                  min={1000}
                  step={1000}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-hive-text-primary">
                    Max Concurrent Users
                  </label>
                  <Badge variant="outline" className="text-[var(--hive-brand-primary)]">
                    {config.realTimeSettings.maxConcurrentUsers}
                  </Badge>
                </div>
                <Slider
                  value={[config.realTimeSettings.maxConcurrentUsers]}
                  onValueChange={([newValue]) => updateConfig('realTimeSettings.maxConcurrentUsers', newValue)}
                  max={5000}
                  min={100}
                  step={100}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-hive-text-primary">
                    Cache Timeout
                  </label>
                  <Badge variant="outline" className="text-[var(--hive-brand-primary)]">
                    {config.realTimeSettings.cacheTimeout}s
                  </Badge>
                </div>
                <Slider
                  value={[config.realTimeSettings.cacheTimeout]}
                  onValueChange={([newValue]) => updateConfig('realTimeSettings.cacheTimeout', newValue)}
                  max={3600}
                  min={60}
                  step={60}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Reminder */}
      {unsavedChanges && (
        <Alert className="border-[var(--hive-brand-primary)]/30 bg-[var(--hive-brand-primary)]/10">
          <CheckCircle className="h-4 w-4 text-[var(--hive-brand-primary)]" />
          <AlertDescription className="text-[var(--hive-brand-primary)]">
            You have unsaved changes to the feed algorithm configuration.
            Remember to save your changes to apply them to the live system.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}