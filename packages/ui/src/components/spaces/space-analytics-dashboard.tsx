'use client';

import React, { useState } from 'react';
import { motion } from '../framer-motion-proxy';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Calendar,
  MessageSquare,
  Zap,
  Eye,
  ChevronRight,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';

// Analytics data interfaces
interface SpaceAnalytics {
  spaceId: string;
  spaceName: string;
  spaceType: string;
  
  // Member Analytics
  membershipData: {
    totalMembers: number;
    activeMembers: number; // Active in last 7 days
    newMembers: number; // Joined in last 30 days
    churnMembers: number; // Left in last 30 days
    memberGrowthRate: number; // % growth
    averageEngagement: number; // 0-100 score
  };
  
  // Content Analytics
  contentData: {
    totalPosts: number;
    postsThisWeek: number;
    averageEngagement: number;
    topContentTypes: Array<{ type: string; count: number; engagement: number }>;
    contentGrowthRate: number;
    moderationQueue: number;
  };
  
  // Event Analytics
  eventData: {
    totalEvents: number;
    upcomingEvents: number;
    averageAttendance: number;
    eventCompletionRate: number;
    topEventTypes: Array<{ type: string; count: number; avgAttendance: number }>;
  };
  
  // Tool Analytics
  toolData: {
    totalTools: number;
    activeTools: number;
    toolUsage: number; // Total interactions
    topTools: Array<{ name: string; usage: number; satisfaction: number }>;
  };
  
  // Health Metrics
  healthMetrics: {
    overallHealth: number; // 0-100 score
    engagementTrend: 'up' | 'down' | 'stable';
    alerts: Array<{ type: 'warning' | 'critical' | 'info'; message: string }>;
    recommendations: Array<{ priority: 'high' | 'medium' | 'low'; action: string }>;
  };
  
  // Time-series data for charts
  timeSeriesData: {
    memberGrowth: Array<{ date: string; members: number; active: number }>;
    contentActivity: Array<{ date: string; posts: number; engagement: number }>;
    eventAttendance: Array<{ date: string; events: number; attendance: number }>;
  };
  
  lastUpdated: string;
}

interface SpaceAnalyticsDashboardProps {
  analytics: SpaceAnalytics;
  isLeader?: boolean;
  onRefresh?: () => void;
  onExportData?: () => void;
  onUpdateSettings?: () => void;
}

export const SpaceAnalyticsDashboard: React.FC<SpaceAnalyticsDashboardProps> = ({
  analytics,
  isLeader = false,
  onRefresh,
  onExportData,
  onUpdateSettings
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'content' | 'events' | 'tools'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/10';
    if (score >= 60) return 'bg-yellow-500/10';
    return 'bg-red-500/10';
  };

  const getTrendIcon = (trend: string, isUp: boolean = false) => {
    if (trend === 'up' || isUp) return <TrendingUp className="h-4 w-4 text-green-400" />;
    if (trend === 'down' || (!isUp && trend !== 'stable')) return <TrendingDown className="h-4 w-4 text-red-400" />;
    return <Activity className="h-4 w-4 text-gray-400" />;
  };

  if (!isLeader) {
    return (
      <HiveCard className="p-6 text-center">
        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Analytics Dashboard</h3>
        <p className="text-gray-400">Space analytics are available to space leaders and moderators.</p>
      </HiveCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{analytics.spaceName} Analytics</h2>
          <p className="text-gray-400 mt-1">
            Last updated {new Date(analytics.lastUpdated).toLocaleString()}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex items-center bg-gray-800 rounded-lg p-1">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  timeRange === range 
                    ? 'bg-[#FFD700] text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          
          <HiveButton variant="secondary" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </HiveButton>
          
          <HiveButton variant="secondary" size="sm" onClick={onExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </HiveButton>
        </div>
      </div>

      {/* Health Overview */}
      <HiveCard className={`p-6 ${getHealthBgColor(analytics.healthMetrics.overallHealth)}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Space Health Score</h3>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-bold ${getHealthColor(analytics.healthMetrics.overallHealth)}`}>
                {analytics.healthMetrics.overallHealth}
              </span>
              <span className="text-gray-400">/ 100</span>
              {getTrendIcon(analytics.healthMetrics.engagementTrend)}
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-400 mb-2">Engagement Trend</div>
            <div className="flex items-center gap-1">
              {getTrendIcon(analytics.healthMetrics.engagementTrend)}
              <span className="text-white capitalize">{analytics.healthMetrics.engagementTrend}</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {analytics.healthMetrics.alerts.length > 0 && (
          <div className="space-y-2">
            {analytics.healthMetrics.alerts.slice(0, 3).map((alert, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {alert.type === 'critical' && <AlertTriangle className="h-4 w-4 text-red-400" />}
                {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-400" />}
                {alert.type === 'info' && <CheckCircle className="h-4 w-4 text-blue-400" />}
                <span className="text-gray-300">{alert.message}</span>
              </div>
            ))}
          </div>
        )}
      </HiveCard>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 bg-gray-800 rounded-lg p-1">
        {([
          { key: 'overview', label: 'Overview', icon: BarChart3 },
          { key: 'members', label: 'Members', icon: Users },
          { key: 'content', label: 'Content', icon: MessageSquare },
          { key: 'events', label: 'Events', icon: Calendar },
          { key: 'tools', label: 'Tools', icon: Zap }
        ] as const).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded transition-colors ${
              activeTab === key 
                ? 'bg-[#FFD700] text-black' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        key={activeTab}
      >
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Key Metrics */}
            <HiveCard className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-5 w-5 text-blue-400" />
                {getTrendIcon('', analytics.membershipData.memberGrowthRate > 0)}
              </div>
              <div className="text-2xl font-bold text-white">{analytics.membershipData.totalMembers}</div>
              <div className="text-sm text-gray-400">Total Members</div>
              <div className="text-xs text-green-400 mt-1">
                +{analytics.membershipData.newMembers} this month
              </div>
            </HiveCard>

            <HiveCard className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-5 w-5 text-green-400" />
                <span className="text-xs text-gray-400">{analytics.membershipData.averageEngagement}%</span>
              </div>
              <div className="text-2xl font-bold text-white">{analytics.membershipData.activeMembers}</div>
              <div className="text-sm text-gray-400">Active Members</div>
              <div className="text-xs text-gray-400 mt-1">Last 7 days</div>
            </HiveCard>

            <HiveCard className="p-6">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="h-5 w-5 text-purple-400" />
                {getTrendIcon('', analytics.contentData.contentGrowthRate > 0)}
              </div>
              <div className="text-2xl font-bold text-white">{analytics.contentData.totalPosts}</div>
              <div className="text-sm text-gray-400">Total Posts</div>
              <div className="text-xs text-blue-400 mt-1">
                {analytics.contentData.postsThisWeek} this week
              </div>
            </HiveCard>

            <HiveCard className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="h-5 w-5 text-orange-400" />
                <span className="text-xs text-gray-400">{analytics.eventData.averageAttendance}% avg</span>
              </div>
              <div className="text-2xl font-bold text-white">{analytics.eventData.totalEvents}</div>
              <div className="text-sm text-gray-400">Events Hosted</div>
              <div className="text-xs text-orange-400 mt-1">
                {analytics.eventData.upcomingEvents} upcoming
              </div>
            </HiveCard>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HiveCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Member Growth</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">New Members</span>
                    <span className="text-green-400">+{analytics.membershipData.newMembers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Members Left</span>
                    <span className="text-red-400">-{analytics.membershipData.churnMembers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Growth Rate</span>
                    <span className={analytics.membershipData.memberGrowthRate > 0 ? 'text-green-400' : 'text-red-400'}>
                      {analytics.membershipData.memberGrowthRate > 0 ? '+' : ''}{analytics.membershipData.memberGrowthRate}%
                    </span>
                  </div>
                </div>
              </HiveCard>

              <HiveCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Engagement Levels</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Highly Active</span>
                    <span className="text-green-400">{Math.round(analytics.membershipData.activeMembers * 0.3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Moderately Active</span>
                    <span className="text-yellow-400">{Math.round(analytics.membershipData.activeMembers * 0.5)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Low Activity</span>
                    <span className="text-red-400">{analytics.membershipData.totalMembers - analytics.membershipData.activeMembers}</span>
                  </div>
                </div>
              </HiveCard>

              <HiveCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Member Roles</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Leaders</span>
                    <span className="text-[#FFD700]">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Builders</span>
                    <span className="text-purple-400">{Math.round(analytics.membershipData.totalMembers * 0.1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Members</span>
                    <span className="text-blue-400">{Math.round(analytics.membershipData.totalMembers * 0.85)}</span>
                  </div>
                </div>
              </HiveCard>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HiveCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Content Performance</h3>
                <div className="space-y-4">
                  {analytics.contentData.topContentTypes.map((content, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="text-white capitalize">{content.type.replace('_', ' ')}</div>
                        <div className="text-sm text-gray-400">{content.count} posts</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{content.engagement}%</div>
                        <div className="text-sm text-gray-400">engagement</div>
                      </div>
                    </div>
                  ))}
                </div>
              </HiveCard>

              <HiveCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Content Moderation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pending Review</span>
                    <span className="text-yellow-400">{analytics.contentData.moderationQueue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Auto-Approved</span>
                    <span className="text-green-400">{analytics.contentData.totalPosts - analytics.contentData.moderationQueue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Approval Rate</span>
                    <span className="text-green-400">94%</span>
                  </div>
                </div>
                
                {analytics.contentData.moderationQueue > 0 && (
                  <HiveButton className="w-full mt-4" size="sm">
                    Review Queue <ChevronRight className="h-4 w-4 ml-1" />
                  </HiveButton>
                )}
              </HiveCard>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HiveCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Event Performance</h3>
                <div className="space-y-4">
                  {analytics.eventData.topEventTypes.map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="text-white capitalize">{event.type.replace('_', ' ')}</div>
                        <div className="text-sm text-gray-400">{event.count} events</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{event.avgAttendance}%</div>
                        <div className="text-sm text-gray-400">avg attendance</div>
                      </div>
                    </div>
                  ))}
                </div>
              </HiveCard>

              <HiveCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Event Insights</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completion Rate</span>
                    <span className="text-green-400">{analytics.eventData.eventCompletionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Attendance</span>
                    <span className="text-blue-400">{analytics.eventData.averageAttendance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">No-show Rate</span>
                    <span className="text-red-400">{100 - analytics.eventData.averageAttendance}%</span>
                  </div>
                </div>
              </HiveCard>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HiveCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Tool Usage</h3>
                <div className="space-y-4">
                  {analytics.toolData.topTools.map((tool, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="text-white">{tool.name}</div>
                        <div className="text-sm text-gray-400">{tool.usage} uses</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white">{tool.satisfaction}%</div>
                        <div className="text-sm text-gray-400">satisfaction</div>
                      </div>
                    </div>
                  ))}
                </div>
              </HiveCard>

              <HiveCard className="p-6">
                <h3 className="font-semibold text-white mb-4">Tool Health</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Tools</span>
                    <span className="text-green-400">{analytics.toolData.activeTools}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Usage</span>
                    <span className="text-blue-400">{analytics.toolData.toolUsage.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg per Tool</span>
                    <span className="text-purple-400">{Math.round(analytics.toolData.toolUsage / analytics.toolData.totalTools)}</span>
                  </div>
                </div>
              </HiveCard>
            </div>
          </div>
        )}
      </motion.div>

      {/* Recommendations */}
      {analytics.healthMetrics.recommendations.length > 0 && (
        <HiveCard className="p-6">
          <h3 className="font-semibold text-white mb-4">Recommendations</h3>
          <div className="space-y-3">
            {analytics.healthMetrics.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  rec.priority === 'high' ? 'bg-red-400' : rec.priority === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                }`} />
                <div className="flex-1">
                  <div className="text-white">{rec.action}</div>
                  <div className="text-sm text-gray-400 capitalize">{rec.priority} priority</div>
                </div>
                <HiveButton variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </HiveButton>
              </div>
            ))}
          </div>
        </HiveCard>
      )}
    </div>
  );
};