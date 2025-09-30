'use client';

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui';
import { Button } from '@hive/ui';
import { Badge } from '@hive/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hive/ui';
import { Alert, AlertDescription } from '@hive/ui';
import { Switch } from '@hive/ui';
import { useCSRF, protectedFetch } from '@/hooks/use-csrf';
import {
  Users,
  Home,
  Settings,
  Activity,
  Flag,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Database,
  Shield,
  LineChart,
  Bell,
  Server
} from 'lucide-react';
import { RealTimeModeration } from '@/components/admin/real-time-moderation';
import { ContentAnalytics } from '@/components/admin/content-analytics';
import { FeedAlgorithmControl } from '@/components/admin/feed-algorithm-control';
import { BehavioralAnalytics } from '@/components/admin/behavioral-analytics';
import { AdminGuard } from '@/components/admin/admin-guard';
import { FeedConfigurationPanel } from '@/components/admin/feed-configuration-panel';
import { RitualManagementPanel } from '@/components/admin/ritual-management-panel';
import { FirebaseMonitoring } from '@/components/admin/firebase-monitoring';
import { AlertDashboard } from '@/components/admin/alert-dashboard';
import { DatabasePerformanceDashboard } from '@/components/admin/database-performance-dashboard';
import CampusExpansionDashboard from '@/components/admin/campus-expansion-dashboard';
import CacheManagementDashboard from '@/components/admin/cache-management-dashboard';

interface AdminDashboardData {
  platform: {
    name: string;
    version: string;
    environment: string;
    university: string;
  };
  statistics: {
    users: {
      total: number;
      active: number;
      inactive: number;
      byMajor: Record<string, number>;
      byYear: Record<string, number>;
      growth?: {
        lastWeek: number;
        lastMonth: number;
      };
    };
    spaces: {
      total: number;
      active: number;
      dormant: number;
      byType: Record<string, { total: number; members: number }>;
      hasBuilders: number;
      totalMembers: number;
      activationRate: number;
    };
    builderRequests: {
      total: number;
      pending: number;
      approved: number;
      rejected: number;
      urgent: number;
      approvalRate: number;
      averageResponseTime: number;
    };
    system: {
      status: string;
      uptime: number;
      memory: { heapUsed: number; heapTotal: number } | null;
      collections: {
        users: number;
        spaces: number;
        builderRequests: number;
      };
    };
  };
}

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'experimental' | 'infrastructure' | 'ui_ux' | 'tools' | 'spaces' | 'admin';
  enabled: boolean;
  rollout: {
    type: 'all' | 'percentage' | 'users' | 'schools' | 'ab_test';
    percentage?: number;
    targetUsers?: string[];
    targetSchools?: string[];
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
    version: number;
  };
}

function AdminDashboardInternal() {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [flagsLoading, setFlagsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { token: csrfToken, getHeaders } = useCSRF();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadDashboardData();
    }
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await protectedFetch('/api/admin/dashboard', {
        headers: getHeaders()
      }, csrfToken);
      
      if (!response.ok) {
        throw new Error('Failed to load dashboard data');
      }
      
      const data = await response.json() as AdminDashboardData;
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const loadFeatureFlags = async () => {
    try {
      setFlagsLoading(true);
      const response = await protectedFetch('/api/admin/feature-flags', {
        headers: getHeaders()
      }, csrfToken);
      
      if (!response.ok) {
        throw new Error('Failed to load feature flags');
      }
      
      const data = await response.json() as { flags?: FeatureFlag[] };
      setFeatureFlags(data.flags || []);
    } catch (err) {
      console.error('Error loading feature flags:', err);
      setFeatureFlags([]);
    } finally {
      setFlagsLoading(false);
    }
  };

  const toggleFeatureFlag = async (flagId: string, enabled: boolean) => {
    try {
      const response = await protectedFetch(`/api/admin/feature-flags/${flagId}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ enabled }),
      }, csrfToken);

      if (!response.ok) {
        throw new Error('Failed to update feature flag');
      }

      // Update local state
      setFeatureFlags(prev => 
        prev.map(flag => 
          flag.id === flagId ? { ...flag, enabled } : flag
        )
      );
    } catch (err) {
      console.error('Error updating feature flag:', err);
    }
  };

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatMemory = (bytes: number): string => {
    return `${Math.round(bytes / 1024 / 1024)}MB`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load admin dashboard: {error}
          </AlertDescription>
        </Alert>
        <Button onClick={loadDashboardData} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { platform, statistics } = dashboardData;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{platform.name} Admin Dashboard</h1>
          <p className="text-muted-foreground">
            {platform.university} • Version {platform.version} • {platform.environment}
          </p>
        </div>
        <Badge variant={platform.environment === 'production' ? 'default' : 'secondary'}>
          {platform.environment.toUpperCase()}
        </Badge>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.users.total}</div>
            <p className="text-xs text-muted-foreground">
              {statistics.users.active} active • {statistics.users.inactive} inactive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Spaces</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.spaces.active}</div>
            <p className="text-xs text-muted-foreground">
              {statistics.spaces.activationRate}% activation rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Builder Requests</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.builderRequests.pending}</div>
            <p className="text-xs text-muted-foreground">
              {statistics.builderRequests.urgent} urgent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                statistics.system.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-sm font-medium capitalize">{statistics.system.status}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Uptime: {formatUptime(statistics.system.uptime)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Alert Bar for Critical Issues */}
      {statistics.builderRequests.urgent > 0 && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <Bell className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-400">
            <strong>{statistics.builderRequests.urgent} urgent items</strong> require immediate attention
          </AlertDescription>
        </Alert>
      )}

      {/* Detailed Sections */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-10 bg-gray-900 border border-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="algorithm" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Algorithm
          </TabsTrigger>
          <TabsTrigger value="rituals" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Rituals
          </TabsTrigger>
          <TabsTrigger value="moderation" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Moderation
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <LineChart className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="infrastructure" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            Infrastructure
          </TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="spaces">Spaces</TabsTrigger>
          <TabsTrigger value="flags">Features</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Overview Tab - Quick Actions Dashboard */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Platform Health Score */}
            <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Platform Health Score</CardTitle>
                  <div className="text-3xl font-bold text-green-400">92/100</div>
                </div>
                <CardDescription>Overall platform performance and stability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">User Engagement</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 w-32 bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '88%' }} />
                      </div>
                      <span className="text-xs text-gray-400">88%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Content Quality</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 w-32 bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '94%' }} />
                      </div>
                      <span className="text-xs text-gray-400">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">System Performance</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 w-32 bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: '96%' }} />
                      </div>
                      <span className="text-xs text-gray-400">96%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Safety & Trust</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 w-32 bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: '90%' }} />
                      </div>
                      <span className="text-xs text-gray-400">90%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <Button className="w-full justify-start bg-[var(--hive-brand-primary)]/10 hover:bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30">
                    <Users className="w-4 h-4 mr-2" />
                    Review Builder Requests ({statistics.builderRequests.pending})
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Moderate Reported Content
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    View Live Activity Feed
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Weekly Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Platform Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Feed */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Admin Activity</CardTitle>
                <Button size="sm" variant="outline">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Builder request approved for @jacoblee</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Feature flag 'new_onboarding_flow' enabled</p>
                    <p className="text-xs text-gray-400">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Content removed for policy violation</p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm text-white">System backup completed successfully</p>
                    <p className="text-xs text-gray-400">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Algorithm Control Tab - Using Feed Configuration Panel */}
        <TabsContent value="algorithm" className="space-y-4">
          <FeedConfigurationPanel />
        </TabsContent>

        {/* Rituals Tab - Campus-wide Engagement Campaigns */}
        <TabsContent value="rituals" className="space-y-4">
          <RitualManagementPanel />
        </TabsContent>

        {/* Moderation Tab */}
        <TabsContent value="moderation" className="space-y-4">
          <RealTimeModeration />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Tabs defaultValue="behavioral" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="behavioral">Behavioral Analytics</TabsTrigger>
              <TabsTrigger value="content">Content Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="behavioral">
              <BehavioralAnalytics />
            </TabsContent>

            <TabsContent value="content">
              <ContentAnalytics />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Infrastructure Tab - Complete Technical Infrastructure */}
        <TabsContent value="infrastructure" className="space-y-4">
          <Tabs defaultValue="monitoring" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="monitoring">Firebase Monitoring</TabsTrigger>
              <TabsTrigger value="database">Database Performance</TabsTrigger>
              <TabsTrigger value="alerts">Alert Dashboard</TabsTrigger>
              <TabsTrigger value="expansion">Campus Expansion</TabsTrigger>
              <TabsTrigger value="cache">Cache Management</TabsTrigger>
              <TabsTrigger value="health">System Health</TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring">
              <FirebaseMonitoring />
            </TabsContent>

            <TabsContent value="database">
              <DatabasePerformanceDashboard />
            </TabsContent>

            <TabsContent value="alerts">
              <AlertDashboard />
            </TabsContent>

            <TabsContent value="expansion">
              <CampusExpansionDashboard />
            </TabsContent>

            <TabsContent value="cache">
              <CacheManagementDashboard />
            </TabsContent>

            <TabsContent value="health">
              <Card>
                <CardHeader>
                  <CardTitle>System Health Overview</CardTitle>
                  <CardDescription>Comprehensive health monitoring across all systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Infrastructure Status</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Firebase Database</span>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Healthy</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Authentication</span>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Healthy</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">API Services</span>
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Degraded</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Email Service</span>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Operational</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Performance Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Avg Response Time</span>
                          <span className="text-white">142ms</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Error Rate</span>
                          <span className="text-white">0.8%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Uptime</span>
                          <span className="text-white">99.94%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Active Connections</span>
                          <span className="text-white">234</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution by Major</CardTitle>
                <CardDescription>Top majors on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(statistics.users.byMajor).slice(0, 5).map(([major, count]) => (
                    <div key={major} className="flex justify-between items-center">
                      <span className="text-sm">{major}</span>
                      <Badge variant="sophomore">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Distribution by Year</CardTitle>
                <CardDescription>Class year breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(statistics.users.byYear).map(([year, count]) => (
                    <div key={year} className="flex justify-between items-center">
                      <span className="text-sm">{year}</span>
                      <Badge variant="freshman">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spaces" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Space Statistics</CardTitle>
                <CardDescription>Overview of all spaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Spaces</span>
                    <span className="font-bold">{statistics.spaces.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Spaces</span>
                    <span className="font-bold text-green-600">{statistics.spaces.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dormant Spaces</span>
                    <span className="font-bold text-yellow-600">{statistics.spaces.dormant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Members</span>
                    <span className="font-bold">{statistics.spaces.totalMembers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spaces by Type</CardTitle>
                <CardDescription>Distribution across space categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(statistics.spaces.byType).map(([type, data]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{type.replace(/_/g, ' ')}</span>
                      <div className="flex space-x-2">
                        <Badge variant="sophomore">{data.total}</Badge>
                        <Badge variant="freshman">{data.members} members</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Builder role requests awaiting review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  {statistics.builderRequests.pending}
                </div>
                {statistics.builderRequests.urgent > 0 && (
                  <div className="flex items-center mt-2 text-red-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span className="text-sm">{statistics.builderRequests.urgent} urgent</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Approval Rate</CardTitle>
                <CardDescription>Historical approval percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {statistics.builderRequests.approvalRate}%
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {statistics.builderRequests.approved} approved, {statistics.builderRequests.rejected} rejected
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
                <CardDescription>Average time to review requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {statistics.builderRequests.averageResponseTime}h
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Average response time
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage builder requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Review Pending
                </Button>
                <Button variant="secondary">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="secondary">
                  <Activity className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flags" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Flags Management</CardTitle>
              <CardDescription>Control platform features and experiments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <Button onClick={loadFeatureFlags} disabled={flagsLoading}>
                  <Flag className="h-4 w-4 mr-2" />
                  {flagsLoading ? 'Loading...' : 'Refresh Flags'}
                </Button>
                <Button variant="secondary">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="secondary">
                  <Settings className="h-4 w-4 mr-2" />
                  Create Flag
                </Button>
              </div>

              {flagsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {featureFlags.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No feature flags found. Load flags or create your first flag.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {featureFlags.map((flag) => (
                        <Card key={flag.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="font-semibold">{flag.name}</h3>
                                  <Badge variant={flag.category === 'experimental' ? 'secondary' : 'outline'}>
                                    {flag.category.replace('_', ' ')}
                                  </Badge>
                                  <Badge variant={flag.enabled ? 'default' : 'secondary'}>
                                    {flag.enabled ? 'Enabled' : 'Disabled'}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {flag.description}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                  <span>ID: {flag.id}</span>
                                  <span>Rollout: {flag.rollout.type}</span>
                                  {flag.rollout.percentage && (
                                    <span>{flag.rollout.percentage}% rollout</span>
                                  )}
                                  <span>v{flag.metadata.version}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <Switch
                                  checked={flag.enabled}
                                  onCheckedChange={(enabled: boolean) => toggleFeatureFlag(flag.id, enabled)}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Current system status and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Status</span>
                    <Badge variant={statistics.system.status === 'healthy' ? 'default' : 'destructive'}>
                      {statistics.system.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime</span>
                    <span>{formatUptime(statistics.system.uptime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory Usage</span>
                    <span>{formatMemory(statistics.system.memory?.heapUsed || 0)} / {formatMemory(statistics.system.memory?.heapTotal || 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database Collections</CardTitle>
                <CardDescription>Document counts in Firestore</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Users</span>
                    <Badge variant="freshman">{statistics.system.collections.users}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Spaces</span>
                    <Badge variant="freshman">{statistics.system.collections.spaces}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Builder Requests</span>
                    <Badge variant="freshman">{statistics.system.collections.builderRequests}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Export wrapped with AdminGuard for security
export default function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminDashboardInternal />
    </AdminGuard>
  );
}