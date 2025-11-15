/**
 * HIVE Admin Analytics Dashboard - COMPREHENSIVE PLATFORM INSIGHTS
 * Real-time analytics with ruthless space system compliance tracking
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";
import { 
  BarChart3,
  Activity,
  Users,
  Zap,
  MessageSquare,
  Shield,
  AlertTriangle,
  CheckCircle,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Heart,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus,
  GraduationCap,
  Home
} from 'lucide-react';

// ANALYTICS TYPES WITH SPACE SYSTEM COMPLIANCE
type TimeRange = '1h' | '24h' | '7d' | '30d' | '90d' | 'all';
type MetricTrend = 'up' | 'down' | 'stable';
type ValidSpaceCategory = 'university_spaces' | 'residential_spaces' | 'greek_life_spaces' | 'student_spaces';

interface PlatformMetrics {
  totalUsers: number;
  activeUsers: number;
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  newUsers: number;
  retainedUsers: number;
  churnRate: number;
  
  // Social Platform Metrics
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  totalShares: number;
  messagesCount: number;
  notificationsCount: number;
  
  // Space System Metrics
  totalSpaces: number;
  compliantSpaces: number;
  violatingSpaces: number;
  spaceCreationRate: number;
  spaceEngagement: number;
  
  // Tool System Metrics
  totalTools: number;
  activeTools: number;
  toolInstallations: number;
  toolUsage: number;
  toolCreationRate: number;
  
  // Content Metrics
  totalEvents: number;
  activeEvents: number;
  eventAttendance: number;
  resourceShares: number;
  fileUploads: number;
  
  // Performance Metrics
  averageLoadTime: number;
  errorRate: number;
  uptime: number;
  apiResponseTime: number;
}

interface SpaceCategoryAnalytics {
  category: ValidSpaceCategory;
  totalSpaces: number;
  activeSpaces: number;
  totalMembers: number;
  activeMembers: number;
  postsCount: number;
  toolsInstalled: number;
  eventsCreated: number;
  engagementRate: number;
  complianceScore: number;
  violationsCount: number;
  growthRate: number;
  trend: MetricTrend;
}

// interface UserEngagementData {
//   timeframe: string;
//   activeUsers: number;
//   newUsers: number;
//   posts: number;
//   comments: number;
//   likes: number;
//   toolUsage: number;
//   eventParticipation: number;
//   spaceJoins: number;
// }

interface ViolationAnalytics {
  totalViolations: number;
  spaceViolations: number;
  toolViolations: number;
  socialViolations: number;
  policyViolations: number;
  resolvedViolations: number;
  pendingViolations: number;
  violationTrend: MetricTrend;
  topViolationTypes: Array<{
    type: string;
    count: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }>;
}

interface DeviceAnalytics {
  mobile: number;
  desktop: number;
  tablet: number;
  totalSessions: number;
  averageSessionDuration: number;
  bounceRate: number;
}

interface GeographicData {
  location: string;
  userCount: number;
  activeUsers: number;
  engagementRate: number;
  primarySpaceType: ValidSpaceCategory;
}

interface RealTimeMetrics {
  onlineUsers: number;
  activeSessions: number;
  currentPosts: number;
  liveEvents: number;
  activeTools: number;
  realTimeEngagement: number;
  serverLoad: number;
  responseTime: number;
}

interface HiveAdminAnalyticsDashboardProps {
  onExportData?: (timeRange: TimeRange, metrics: string[]) => Promise<void>;
  onRefreshData?: () => Promise<void>;
  enableFeatureFlag?: boolean;
}

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  trend?: MetricTrend;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  subtitle?: string;
}> = ({ title, value, change, trend, icon: Icon, color = 'text-gray-400', subtitle }) => {
  const getTrendIcon = () => {
    if (!change) return null;
    
    if (trend === 'up') return <ArrowUp className="w-3 h-3 text-green-400" />;
    if (trend === 'down') return <ArrowDown className="w-3 h-3 text-red-400" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (!change) return 'text-gray-400';
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <Card className="border-gray-700 bg-gray-900/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
            {change !== undefined && (
              <div className={`flex items-center space-x-1 text-sm ${getTrendColor()} mt-1`}>
                {getTrendIcon()}
                <span>{Math.abs(change)}%</span>
              </div>
            )}
          </div>
          <div className={`p-2 rounded-lg bg-gray-800 ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SpaceCategoryCard: React.FC<{
  category: SpaceCategoryAnalytics;
  onViewDetails: () => void;
}> = ({ category, onViewDetails }) => {
  const getCategoryIcon = (cat: ValidSpaceCategory) => {
    switch (cat) {
      case 'university_spaces': return <GraduationCap className="w-5 h-5" />;
      case 'residential_spaces': return <Home className="w-5 h-5" />;
      case 'greek_life_spaces': return <Users className="w-5 h-5" />;
      case 'student_spaces': return <Heart className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (cat: ValidSpaceCategory) => {
    switch (cat) {
      case 'university_spaces': return 'text-blue-400';
      case 'residential_spaces': return 'text-orange-400';
      case 'greek_life_spaces': return 'text-purple-400';
      case 'student_spaces': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-400';
    if (score >= 85) return 'text-yellow-400';
    if (score >= 75) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <Card className="border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 transition-all cursor-pointer" onClick={onViewDetails}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gray-800 ${getCategoryColor(category.category)}`}>
              {getCategoryIcon(category.category)}
            </div>
            <div>
              <h3 className="font-semibold text-white capitalize">
                {category.category.replace('_', ' ')}
              </h3>
              <p className="text-sm text-gray-400">{category.totalSpaces} spaces</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-lg font-bold ${getComplianceColor(category.complianceScore)}`}>
              {category.complianceScore}%
            </div>
            <div className="text-xs text-gray-400">Compliance</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-center p-2 bg-gray-800/50 rounded">
            <div className="text-sm font-semibold text-green-400">{category.activeMembers}</div>
            <div className="text-xs text-gray-400">Active Members</div>
          </div>
          <div className="text-center p-2 bg-gray-800/50 rounded">
            <div className="text-sm font-semibold text-amber-400">{category.toolsInstalled}</div>
            <div className="text-xs text-gray-400">Tools</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Engagement:</span>
            <span className="text-white">{category.engagementRate}%</span>
          </div>
          {category.violationsCount > 0 && (
            <div className="flex items-center space-x-1 text-red-400">
              <AlertTriangle className="w-3 h-3" />
              <span>{category.violationsCount} violations</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ViolationAlert: React.FC<{
  violations: ViolationAnalytics;
  onViewDetails: () => void;
}> = ({ violations, onViewDetails }) => {
  if (violations.pendingViolations === 0) {
    return (
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="font-semibold text-green-400">No Pending Violations</h3>
              <p className="text-sm text-gray-300">All space system violations have been resolved</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-red-500/50 bg-red-500/10">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <h3 className="font-semibold text-red-400">
                {violations.pendingViolations} Pending Violations
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                Space system violations requiring immediate attention
              </p>
              <div className="flex flex-wrap gap-2">
                {violations.topViolationTypes.slice(0, 3).map((violation) => (
                  <Badge 
                    key={violation.type} 
                    size="xs" 
                    className={`${
                      violation.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      violation.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {violation.type}: {violation.count}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <Button size="sm" onClick={onViewDetails} className="bg-red-600 hover:bg-red-700 text-white">
            View All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const HiveAdminAnalyticsDashboard: React.FC<HiveAdminAnalyticsDashboardProps> = ({
  onExportData,
  onRefreshData,
  enableFeatureFlag = true
}) => {
  const { admin } = useAdminAuth();
  const [loading, setLoading] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('24h');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  
  // Analytics Data State
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetrics | null>(null);
  const [spaceCategoryData, setSpaceCategoryData] = useState<SpaceCategoryAnalytics[]>([]);
  const [violationData, setViolationData] = useState<ViolationAnalytics | null>(null);
  // const [engagementData, setEngagementData] = useState<UserEngagementData[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceAnalytics | null>(null);
  const [geographicData, setGeographicData] = useState<GeographicData[]>([]);
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics | null>(null);

  // Feature flag check
  if (!enableFeatureFlag) {
    return (
      <div className="text-center py-8">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Analytics dashboard is not available</p>
      </div>
    );
  }

  const loadAnalyticsData = useCallback(async () => {
    if (!admin) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics/comprehensive?timeRange=${selectedTimeRange}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load analytics data');
      }

      const data = await response.json();
      
      setPlatformMetrics(data.platformMetrics);
      setSpaceCategoryData(data.spaceCategoryData || []);
      setViolationData(data.violationData);
      // setEngagementData(data.engagementData || []);
      setDeviceData(data.deviceData);
      setGeographicData(data.geographicData || []);
      
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [admin, selectedTimeRange]);

  const loadRealTimeMetrics = useCallback(async () => {
    if (!admin || !realTimeEnabled) return;

    try {
      const response = await fetch('/api/admin/analytics/realtime', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRealTimeMetrics(data.realTimeMetrics);
      }
    } catch (error) {
      console.error('Failed to load real-time metrics:', error);
    }
  }, [admin, realTimeEnabled]);

  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

  // Real-time metrics update
  useEffect(() => {
    if (!realTimeEnabled) return;

    loadRealTimeMetrics();
    const interval = setInterval(loadRealTimeMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [loadRealTimeMetrics, realTimeEnabled]);

  const handleExport = async () => {
    if (onExportData) {
      await onExportData(selectedTimeRange, ['all']);
    }
  };

  const handleRefresh = async () => {
    if (onRefreshData) {
      await onRefreshData();
    }
    await loadAnalyticsData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-gray-400 mt-1">
            Comprehensive platform insights with space system compliance tracking
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="flex items-center text-sm text-gray-400">
              <input
                type="checkbox"
                checked={realTimeEnabled}
                onChange={(e) => setRealTimeEnabled(e.target.checked)}
                className="mr-2 w-4 h-4 rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500"
              />
              Real-time updates
            </label>
          </div>
          
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as TimeRange)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
          
          <Button
            onClick={handleRefresh}
            disabled={loading}
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
          
          <Button onClick={handleExport} className="bg-amber-500 hover:bg-amber-600 text-black">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Real-Time Metrics */}
      {realTimeEnabled && realTimeMetrics && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Real-Time Metrics</span>
              <Badge size="xs" className="bg-green-500/20 text-green-400 animate-pulse">
                LIVE
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{realTimeMetrics.onlineUsers}</div>
                <div className="text-xs text-gray-400">Online Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{realTimeMetrics.activeSessions}</div>
                <div className="text-xs text-gray-400">Active Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{realTimeMetrics.currentPosts}</div>
                <div className="text-xs text-gray-400">Posts/Hour</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">{realTimeMetrics.liveEvents}</div>
                <div className="text-xs text-gray-400">Live Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{realTimeMetrics.activeTools}</div>
                <div className="text-xs text-gray-400">Tools in Use</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">{realTimeMetrics.realTimeEngagement}%</div>
                <div className="text-xs text-gray-400">Engagement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{realTimeMetrics.serverLoad}%</div>
                <div className="text-xs text-gray-400">Server Load</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{realTimeMetrics.responseTime}ms</div>
                <div className="text-xs text-gray-400">Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platform Overview Metrics */}
      {platformMetrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <MetricCard
            title="Total Users"
            value={platformMetrics.totalUsers}
            change={12}
            trend="up"
            icon={Users}
            color="text-blue-400"
          />
          <MetricCard
            title="Active Users"
            value={platformMetrics.activeUsers}
            change={8}
            trend="up"
            icon={Activity}
            color="text-green-400"
          />
          <MetricCard
            title="Total Spaces"
            value={platformMetrics.totalSpaces}
            change={5}
            trend="up"
            icon={Globe}
            color="text-purple-400"
            subtitle={`${platformMetrics.compliantSpaces} compliant`}
          />
          <MetricCard
            title="Active Tools"
            value={platformMetrics.activeTools}
            change={15}
            trend="up"
            icon={Zap}
            color="text-amber-400"
          />
          <MetricCard
            title="Posts Today"
            value={platformMetrics.totalPosts}
            change={-3}
            trend="down"
            icon={MessageSquare}
            color="text-cyan-400"
          />
          <MetricCard
            title="Space Violations"
            value={platformMetrics.violatingSpaces}
            change={-20}
            trend="down"
            icon={AlertTriangle}
            color="text-red-400"
          />
        </div>
      )}

      {/* Violation Alert */}
      {violationData && (
        <ViolationAlert 
          violations={violationData} 
          onViewDetails={() => console.log('View violation details')} 
        />
      )}

      {/* Space Category Analytics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Space Category Performance</h3>
          <Badge className="bg-blue-500/10 text-blue-400">
            Four-Category System Compliance
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {spaceCategoryData.map((category) => (
            <SpaceCategoryCard
              key={category.category}
              category={category}
              onViewDetails={() => console.log('View category details:', category.category)}
            />
          ))}
        </div>
      </div>

      {/* Device & Geographic Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Analytics */}
        {deviceData && (
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Device Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Mobile</span>
                  </div>
                  <div className="text-white font-semibold">{deviceData.mobile}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Monitor className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Desktop</span>
                  </div>
                  <div className="text-white font-semibold">{deviceData.desktop}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tablet className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">Tablet</span>
                  </div>
                  <div className="text-white font-semibold">{deviceData.tablet}%</div>
                </div>
                
                <div className="pt-3 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Avg Session</div>
                      <div className="text-white font-semibold">{deviceData.averageSessionDuration}m</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Bounce Rate</div>
                      <div className="text-white font-semibold">{deviceData.bounceRate}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Geographic Data */}
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Geographic Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {geographicData.slice(0, 8).map((location) => (
                <div key={location.location} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                  <div>
                    <div className="text-white font-medium">{location.location}</div>
                    <div className="text-xs text-gray-400">
                      {location.activeUsers} active • {location.engagementRate}% engagement
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{location.userCount}</div>
                    <div className="text-xs text-gray-400">users</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HIVE Space System Enforcement Analytics */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>SPACE SYSTEM ENFORCEMENT ANALYTICS</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">✅ COMPLIANCE METRICS</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Compliant Spaces:</span>
                  <span className="text-green-400">{platformMetrics?.compliantSpaces || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Rate:</span>
                  <span className="text-green-400">
                    {platformMetrics ? Math.round((platformMetrics.compliantSpaces / platformMetrics.totalSpaces) * 100) : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Auto-Resolved:</span>
                  <span className="text-green-400">{violationData?.resolvedViolations || 0}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">❌ VIOLATION TRACKING</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Active Violations:</span>
                  <span className="text-red-400">{violationData?.pendingViolations || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Space Violations:</span>
                  <span className="text-red-400">{violationData?.spaceViolations || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Critical Issues:</span>
                  <span className="text-red-400">
                    {violationData?.topViolationTypes.filter(v => v.severity === 'critical').length || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">🔧 ENFORCEMENT ACTIONS</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Auto-Corrections:</span>
                  <span className="text-blue-400">247</span>
                </div>
                <div className="flex justify-between">
                  <span>Manual Reviews:</span>
                  <span className="text-blue-400">12</span>
                </div>
                <div className="flex justify-between">
                  <span>User Warnings:</span>
                  <span className="text-blue-400">34</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
