"use client";

/**
 * HIVE Tool Usage Tracker
 * Analytics and usage tracking for community tools
 */

import React, { useState, useMemo } from 'react';
import { Tool } from '@hive/core';
import { HiveCard } from '../hive-card';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../atomic/atoms/badge';
import { 
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  Calendar,
  Download,
  Star,
  Activity,
  Eye,
  Play,
  Share2,
  AlertCircle,
  Award,
  Zap,
  Target,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface ToolUsageData {
  toolId: string;
  spaceId: string;
  sessions: Array<{
    id: string;
    userId: string;
    userName: string;
    startTime: string;
    endTime?: string;
    duration?: number; // in seconds
    completedSuccessfully: boolean;
    dataSubmitted?: any;
    errors?: string[];
  }>;
  analytics: {
    totalSessions: number;
    uniqueUsers: number;
    averageSessionTime: number; // in seconds
    completionRate: number; // percentage
    errorRate: number; // percentage
    popularityScore: number;
    dailyUsage: Array<{
      date: string;
      sessions: number;
      users: number;
    }>;
    hourlyUsage: Array<{
      hour: number;
      sessions: number;
    }>;
    userGrowth: Array<{
      period: string;
      newUsers: number;
      returningUsers: number;
    }>;
  };
  feedback: Array<{
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment?: string;
    timestamp: string;
  }>;
  performance: {
    loadTime: number; // in ms
    renderTime: number; // in ms
    errorFrequency: number;
    crashes: number;
  };
}

interface ToolUsageTrackerProps {
  tool: Tool;
  usageData: ToolUsageData;
  dateRange: '7d' | '30d' | '90d' | '1y';
  onDateRangeChange: (range: '7d' | '30d' | '90d' | '1y') => void;
  onExportData: () => void;
  userRole: 'admin' | 'moderator' | 'member';
}

export const ToolUsageTracker: React.FC<ToolUsageTrackerProps> = ({
  tool,
  usageData,
  dateRange,
  onDateRangeChange,
  onExportData,
  userRole
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'users' | 'feedback' | 'performance'>('overview');

  // Calculate trends
  const trends = useMemo(() => {
    const { analytics } = usageData;
    const recent = analytics.dailyUsage.slice(-7);
    const previous = analytics.dailyUsage.slice(-14, -7);
    
    const recentTotal = recent.reduce((sum, day) => sum + day.sessions, 0);
    const previousTotal = previous.reduce((sum, day) => sum + day.sessions, 0);
    
    const sessionsTrend = previousTotal === 0 ? 0 : ((recentTotal - previousTotal) / previousTotal) * 100;
    
    const recentUsers = recent.reduce((sum, day) => sum + day.users, 0);
    const previousUsers = previous.reduce((sum, day) => sum + day.users, 0);
    
    const usersTrend = previousUsers === 0 ? 0 : ((recentUsers - previousUsers) / previousUsers) * 100;

    return {
      sessions: sessionsTrend,
      users: usersTrend,
      completion: analytics.completionRate,
      errors: analytics.errorRate
    };
  }, [usageData.analytics]);

  // Get trend icon and color
  const getTrendIndicator = (trend: number) => {
    if (trend > 5) return { icon: ArrowUp, color: 'text-green-500' };
    if (trend < -5) return { icon: ArrowDown, color: 'text-red-500' };
    return { icon: Minus, color: 'text-gray-500' };
  };

  // Format duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes === 0) return `${remainingSeconds}s`;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${Math.round(value * 100) / 100}%`;
  };

  // Get rating stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-400" />);
    }
    
    return stars;
  };

  // Check permissions
  const canViewDetailedAnalytics = userRole === 'admin' || userRole === 'moderator';
  const canExportData = userRole === 'admin';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[var(--hive-primary)]" />
            <span>Usage Analytics</span>
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-1">
            Analytics for "{tool.name}"
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value as any)}
            className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg px-3 py-2 text-[var(--hive-text-primary)] text-sm focus:border-[var(--hive-primary)] focus:outline-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          {canExportData && (
            <Button variant="secondary" onClick={onExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-[var(--hive-border-default)]">
        <div className="flex space-x-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'sessions', label: 'Sessions', icon: Activity },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'feedback', label: 'Feedback', icon: Star },
            { id: 'performance', label: 'Performance', icon: Zap }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[var(--hive-primary)] text-[var(--hive-primary)]'
                    : 'border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <HiveCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                      {usageData.analytics.totalSessions.toLocaleString()}
                    </div>
                    <div className="text-sm text-[var(--hive-text-secondary)]">Total Sessions</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {(() => {
                      const { icon: TrendIcon, color } = getTrendIndicator(trends.sessions);
                      return (
                        <>
                          <TrendIcon className={`w-4 h-4 ${color}`} />
                          <span className={`text-sm ${color}`}>
                            {Math.abs(trends.sessions).toFixed(1)}%
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </HiveCard>
              
              <HiveCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                      {usageData.analytics.uniqueUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-[var(--hive-text-secondary)]">Unique Users</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {(() => {
                      const { icon: TrendIcon, color } = getTrendIndicator(trends.users);
                      return (
                        <>
                          <TrendIcon className={`w-4 h-4 ${color}`} />
                          <span className={`text-sm ${color}`}>
                            {Math.abs(trends.users).toFixed(1)}%
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </HiveCard>
              
              <HiveCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                      {formatDuration(usageData.analytics.averageSessionTime)}
                    </div>
                    <div className="text-sm text-[var(--hive-text-secondary)]">Avg Session</div>
                  </div>
                  <Clock className="w-8 h-8 text-[var(--hive-primary)]" />
                </div>
              </HiveCard>
              
              <HiveCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                      {formatPercentage(usageData.analytics.completionRate)}
                    </div>
                    <div className="text-sm text-[var(--hive-text-secondary)]">Completion Rate</div>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </HiveCard>
            </div>

            {/* Usage Chart Placeholder */}
            <HiveCard className="p-6">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                Daily Usage Trend
              </h3>
              <div className="h-64 bg-[var(--hive-background-secondary)] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
                  <p className="text-[var(--hive-text-secondary)]">
                    Usage chart visualization would be implemented here
                  </p>
                </div>
              </div>
            </HiveCard>

            {/* Top Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HiveCard className="p-6">
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                  Performance Insights
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--hive-text-secondary)]">Load Time</span>
                    <span className="text-[var(--hive-text-primary)] font-medium">
                      {usageData.performance.loadTime}ms
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--hive-text-secondary)]">Error Rate</span>
                    <span className="text-[var(--hive-text-primary)] font-medium">
                      {formatPercentage(usageData.analytics.errorRate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--hive-text-secondary)]">Crashes</span>
                    <span className="text-[var(--hive-text-primary)] font-medium">
                      {usageData.performance.crashes}
                    </span>
                  </div>
                </div>
              </HiveCard>

              <HiveCard className="p-6">
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                  User Engagement
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--hive-text-secondary)]">Popularity Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(usageData.analytics.popularityScore / 20)}
                      </div>
                      <span className="text-[var(--hive-text-primary)] font-medium">
                        {(usageData.analytics.popularityScore / 20).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--hive-text-secondary)]">Feedback Count</span>
                    <span className="text-[var(--hive-text-primary)] font-medium">
                      {usageData.feedback.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--hive-text-secondary)]">Avg Rating</span>
                    <span className="text-[var(--hive-text-primary)] font-medium">
                      {usageData.feedback.length > 0 
                        ? (usageData.feedback.reduce((sum, f) => sum + f.rating, 0) / usageData.feedback.length).toFixed(1)
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
              </HiveCard>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <HiveCard className="p-6">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                Recent Sessions
              </h3>
              
              {canViewDetailedAnalytics ? (
                <div className="space-y-3">
                  {usageData.sessions.slice(0, 10).map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 bg-[var(--hive-background-secondary)] rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[var(--hive-primary)]/20 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-[var(--hive-primary)]" />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--hive-text-primary)]">
                            {session.userName}
                          </p>
                          <p className="text-sm text-[var(--hive-text-secondary)]">
                            {new Date(session.startTime).toLocaleDateString()} at {new Date(session.startTime).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-[var(--hive-text-primary)]">
                            {session.duration ? formatDuration(session.duration) : 'In progress'}
                          </p>
                          <div className="flex items-center space-x-2">
                            {session.completedSuccessfully ? (
                              <Badge variant="primary" className="text-xs">Completed</Badge>
                            ) : session.errors && session.errors.length > 0 ? (
                              <Badge variant="destructive" className="text-xs">Error</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">Incomplete</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {usageData.sessions.length > 10 && (
                    <div className="text-center py-4">
                      <Button variant="secondary" size="sm">
                        Load More Sessions
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
                  <p className="text-[var(--hive-text-secondary)]">
                    Detailed session data requires moderator or admin permissions.
                  </p>
                </div>
              )}
            </HiveCard>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <HiveCard className="p-6">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                User Growth
              </h3>
              
              {canViewDetailedAnalytics ? (
                <div className="space-y-4">
                  {usageData.analytics.userGrowth.map((period, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-[var(--hive-background-secondary)] rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-[var(--hive-text-primary)]">
                          {period.period}
                        </p>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-green-500">
                            +{period.newUsers}
                          </p>
                          <p className="text-xs text-[var(--hive-text-secondary)]">New</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-blue-500">
                            {period.returningUsers}
                          </p>
                          <p className="text-xs text-[var(--hive-text-secondary)]">Returning</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
                  <p className="text-[var(--hive-text-secondary)]">
                    User analytics require moderator or admin permissions.
                  </p>
                </div>
              )}
            </HiveCard>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <HiveCard className="p-6">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                User Feedback
              </h3>
              
              {usageData.feedback.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
                  <p className="text-[var(--hive-text-secondary)]">
                    No feedback received yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {usageData.feedback.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="p-4 bg-[var(--hive-background-secondary)] rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[var(--hive-primary)]/20 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-[var(--hive-primary)]" />
                          </div>
                          <div>
                            <p className="font-medium text-[var(--hive-text-primary)]">
                              {feedback.userName}
                            </p>
                            <p className="text-sm text-[var(--hive-text-secondary)]">
                              {new Date(feedback.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          {renderStars(feedback.rating)}
                        </div>
                      </div>
                      
                      {feedback.comment && (
                        <p className="text-[var(--hive-text-secondary)] text-sm">
                          "{feedback.comment}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </HiveCard>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <HiveCard className="p-6">
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                  Response Times
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--hive-text-secondary)]">Load Time</span>
                    <span className="text-[var(--hive-text-primary)] font-medium">
                      {usageData.performance.loadTime}ms
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--hive-text-secondary)]">Render Time</span>
                    <span className="text-[var(--hive-text-primary)] font-medium">
                      {usageData.performance.renderTime}ms
                    </span>
                  </div>
                </div>
              </HiveCard>

              <HiveCard className="p-6">
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                  Reliability
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--hive-text-secondary)]">Error Frequency</span>
                    <span className="text-[var(--hive-text-primary)] font-medium">
                      {usageData.performance.errorFrequency}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--hive-text-secondary)]">Total Crashes</span>
                    <span className="text-[var(--hive-text-primary)] font-medium">
                      {usageData.performance.crashes}
                    </span>
                  </div>
                </div>
              </HiveCard>
            </div>

            {/* Performance Recommendations */}
            <HiveCard className="p-6">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center">
                <Award className="w-5 h-5 text-[var(--hive-primary)] mr-2" />
                Performance Recommendations
              </h3>
              
              <div className="space-y-3">
                {usageData.performance.loadTime > 3000 && (
                  <div className="flex items-start space-x-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[var(--hive-text-primary)]">
                        Slow Load Time
                      </p>
                      <p className="text-sm text-[var(--hive-text-secondary)]">
                        Consider optimizing tool elements and reducing complexity to improve load times.
                      </p>
                    </div>
                  </div>
                )}
                
                {usageData.analytics.completionRate < 0.7 && (
                  <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[var(--hive-text-primary)]">
                        Low Completion Rate
                      </p>
                      <p className="text-sm text-[var(--hive-text-secondary)]">
                        Users often don't complete the tool. Consider simplifying the workflow or adding guidance.
                      </p>
                    </div>
                  </div>
                )}
                
                {usageData.performance.crashes > 5 && (
                  <div className="flex items-start space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[var(--hive-text-primary)]">
                        Stability Issues
                      </p>
                      <p className="text-sm text-[var(--hive-text-secondary)]">
                        Multiple crashes detected. Review tool logic and error handling.
                      </p>
                    </div>
                  </div>
                )}
                
                {usageData.performance.loadTime <= 3000 && usageData.analytics.completionRate >= 0.7 && usageData.performance.crashes <= 5 && (
                  <div className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <Award className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[var(--hive-text-primary)]">
                        Great Performance!
                      </p>
                      <p className="text-sm text-[var(--hive-text-secondary)]">
                        Your tool is performing well with good load times, completion rates, and stability.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </HiveCard>
          </div>
        )}
      </div>
    </div>
  );
};