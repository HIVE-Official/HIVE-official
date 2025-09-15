'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Alert, AlertDescription } from '@hive/ui';
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
  Database
} from 'lucide-react';
import ModerationCenter from './components/moderation-center';
import AnalyticsDashboard from './components/analytics-dashboard';
import RealtimeMonitor from './components/realtime-monitor';
import PrivacyControls from './components/privacy-controls';

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

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [flagsLoading, setFlagsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/dashboard');
      
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
      const response = await fetch('/api/admin/feature-flags');
      
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
      const response = await fetch(`/api/admin/feature-flags/${flagId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled }),
      });

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
        <Alert variant="error">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Failed to load admin dashboard: {error}
          </AlertDescription>
        </Alert>
        <button 
          onClick={loadDashboardData} 
          className="mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors"
        >
          Retry
        </button>
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

      {/* Detailed Sections */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="flags">Flags</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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
                      <Badge variant="secondary">{count}</Badge>
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
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <ModerationCenter />
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <PrivacyControls />
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <RealtimeMonitor />
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
                <button className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Review Pending
                </button>
                <button className="px-4 py-2 border border-border bg-background text-foreground rounded-md hover:bg-muted transition-colors flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </button>
                <button className="px-4 py-2 border border-border bg-background text-foreground rounded-md hover:bg-muted transition-colors flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Export Data
                </button>
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
                <button 
                  onClick={loadFeatureFlags} 
                  disabled={flagsLoading}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors flex items-center disabled:opacity-50"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  {flagsLoading ? 'Loading...' : 'Refresh Flags'}
                </button>
                <button className="px-4 py-2 border border-border bg-background text-foreground rounded-md hover:bg-muted transition-colors flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </button>
                <button className="px-4 py-2 border border-border bg-background text-foreground rounded-md hover:bg-muted transition-colors flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Create Flag
                </button>
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
                      {featureFlags.map((flag: any) => (
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
                                <input
                                  type="checkbox"
                                  checked={flag.enabled}
                                  onChange={(e: any) => toggleFeatureFlag(flag.id, e.target.checked)}
                                  className="w-4 h-4 text-accent bg-background border-2 rounded border-border focus:ring-accent focus:ring-2"
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
                    <Badge variant="outline">{statistics.system.collections.users}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Spaces</span>
                    <Badge variant="outline">{statistics.system.collections.spaces}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Builder Requests</span>
                    <Badge variant="outline">{statistics.system.collections.builderRequests}</Badge>
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