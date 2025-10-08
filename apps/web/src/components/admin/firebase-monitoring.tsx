'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Progress,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Alert,
  AlertDescription
} from '@hive/ui';
import {
  Server,
  Database,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Wifi,
  HardDrive,
  Cpu,
  RefreshCw,
  Shield,
  Globe,
  Eye,
  Flame
} from 'lucide-react';

interface FirebaseMetrics {
  firestore: {
    reads: number;
    writes: number;
    deletes: number;
    activeConnections: number;
    queriesPerSecond: number;
    indexUsage: {
      total: number;
      used: number;
      unused: number;
    };
    storage: {
      documentsCount: number;
      totalSizeMB: number;
      growth: number; // percentage
    };
  };
  authentication: {
    activeUsers: number;
    signInsToday: number;
    signUpsToday: number;
    failedAttempts: number;
    magicLinksSent: number;
    providers: {
      email: number;
      google: number;
      development: number;
    };
  };
  hosting: {
    bandwidth: number; // MB
    requests: number;
    cacheHitRate: number; // percentage
    averageResponseTime: number; // ms
    errors: {
      "4xx": number;
      "5xx": number;
    };
  };
  functions: {
    invocations: number;
    errors: number;
    averageExecutionTime: number; // ms
    memoryUsage: number; // MB
    timeouts: number;
  };
  performance: {
    pageLoadTimes: {
      p50: number;
      p90: number;
      p95: number;
    };
    coreWebVitals: {
      lcp: number; // Largest Contentful Paint
      fid: number; // First Input Delay
      cls: number; // Cumulative Layout Shift
    };
    networkLatency: number;
  };
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  issues: {
    level: 'warning' | 'critical';
    message: string;
    timestamp: string;
    resolved: boolean;
  }[];
  recommendations: string[];
}

export function FirebaseMonitoring() {
  const [metrics, setMetrics] = useState<FirebaseMetrics | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  useEffect(() => {
    loadFirebaseMetrics();

    // Auto-refresh every 30 seconds if enabled
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(loadFirebaseMetrics, 30000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, timeRange]);

  const loadFirebaseMetrics = async () => {
    try {
      setLoading(true);
      const [metricsRes, healthRes] = await Promise.all([
        fetch(`/api/admin/firebase-metrics?range=${timeRange}`),
        fetch('/api/admin/system-health')
      ]);

      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setMetrics(metricsData.metrics);
      }

      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setHealth(healthData.health);
      }
    } catch (error) {
      console.error('Failed to load Firebase metrics:', error);
      setMetrics(getMockFirebaseMetrics());
      setHealth(getMockSystemHealth());
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)]"></div>
      </div>
    );
  }

  if (!metrics || !health) {
    return (
      <div className="text-center py-8 text-gray-400">
        No Firebase monitoring data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Firebase Infrastructure</h2>
          <p className="text-gray-400">Real-time monitoring and performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className={`px-4 py-2 ${getStatusColor(health.status)}`}>
            <div className="flex items-center gap-2">
              {getStatusIcon(health.status)}
              <div>
                <div className="text-sm font-medium capitalize">{health.status}</div>
                <div className="text-xs opacity-70">
                  {Math.floor(health.uptime / 60)}h {health.uptime % 60}m uptime
                </div>
              </div>
            </div>
          </Card>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Auto-refresh</label>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e: React.ChangeEvent) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4 rounded border border-gray-600 bg-gray-800"
            />
          </div>
          <select
            value={timeRange}
            onChange={(e: React.ChangeEvent) => setTimeRange((e.target as any).value as any)}
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24h</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <Button variant="outline" className="max-w-sm" onClick={loadFirebaseMetrics}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Active Issues Alert */}
      {health.issues.filter(issue => !issue.resolved).length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {health.issues.filter(issue => !issue.resolved).length} active issues require attention.
            Check the System Health tab for details.
          </AlertDescription>
        </Alert>
      )}

      {/* Core Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Firestore Operations</CardTitle>
              <Database className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {(metrics.firestore.reads + metrics.firestore.writes).toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-xs text-blue-400">
                {metrics.firestore.reads.toLocaleString()} reads
              </div>
              <div className="text-xs text-blue-400">
                {metrics.firestore.writes.toLocaleString()} writes
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {metrics.authentication.activeUsers.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-400">
                +{metrics.authentication.signUpsToday} today
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Zap className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {metrics.hosting.averageResponseTime}ms
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-purple-400">
                {metrics.hosting.cacheHitRate}% cache hits
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border-orange-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Functions</CardTitle>
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {metrics.functions.invocations.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-orange-400">
                {((1 - metrics.functions.errors / metrics.functions.invocations) * 100).toFixed(1)}% success
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="firestore" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="firestore">Firestore</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="hosting">Hosting</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>

        {/* Firestore Monitoring */}
        <TabsContent value="firestore" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Database Operations</CardTitle>
                <CardDescription>Real-time Firestore activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Queries/second</span>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {metrics.firestore.queriesPerSecond}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active connections</span>
                  <Badge className="bg-green-500/20 text-green-400">
                    {metrics.firestore.activeConnections}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Documents stored</span>
                  <Badge variant="secondary">
                    {metrics.firestore.storage.documentsCount.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage size</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {metrics.firestore.storage.totalSizeMB} MB
                    </span>
                    {metrics.firestore.storage.growth > 0 && (
                      <Badge className="bg-yellow-500/20 text-yellow-400">
                        +{metrics.firestore.storage.growth}%
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Index Usage</CardTitle>
                <CardDescription>Database optimization status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Index Efficiency</span>
                    <span>
                      {Math.round((metrics.firestore.indexUsage.used / metrics.firestore.indexUsage.total) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(metrics.firestore.indexUsage.used / metrics.firestore.indexUsage.total) * 100}
                    className="h-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Used indexes</div>
                    <div className="font-medium text-green-400">
                      {metrics.firestore.indexUsage.used}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Unused indexes</div>
                    <div className="font-medium text-yellow-400">
                      {metrics.firestore.indexUsage.unused}
                    </div>
                  </div>
                </div>
                {metrics.firestore.indexUsage.unused > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      {metrics.firestore.indexUsage.unused} unused indexes detected.
                      Consider cleanup to reduce costs.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Authentication Monitoring */}
        <TabsContent value="auth" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Authentication Activity</CardTitle>
                <CardDescription>User sign-ins and registrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sign-ins today</span>
                  <Badge className="bg-green-500/20 text-green-400">
                    {metrics.authentication.signInsToday}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">New sign-ups</span>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {metrics.authentication.signUpsToday}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Failed attempts</span>
                  <Badge className={`${metrics.authentication.failedAttempts > 10 ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {metrics.authentication.failedAttempts}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Magic links sent</span>
                  <Badge variant="secondary">
                    {metrics.authentication.magicLinksSent}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Auth Providers</CardTitle>
                <CardDescription>Authentication method distribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email/Magic Link</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(metrics.authentication.providers.email / metrics.authentication.activeUsers) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-12">
                        {metrics.authentication.providers.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Google OAuth</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(metrics.authentication.providers.google / metrics.authentication.activeUsers) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-12">
                        {metrics.authentication.providers.google}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Development</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${(metrics.authentication.providers.development / metrics.authentication.activeUsers) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-12">
                        {metrics.authentication.providers.development}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Hosting Monitoring */}
        <TabsContent value="hosting" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Hosting Performance</CardTitle>
                <CardDescription>Web traffic and response times</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total requests</span>
                  <Badge variant="secondary">
                    {metrics.hosting.requests.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bandwidth used</span>
                  <Badge variant="secondary">
                    {metrics.hosting.bandwidth} MB
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cache hit rate</span>
                  <Badge className={`${metrics.hosting.cacheHitRate > 80 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {metrics.hosting.cacheHitRate}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg response time</span>
                  <Badge className={`${metrics.hosting.averageResponseTime < 200 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {metrics.hosting.averageResponseTime}ms
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Error Monitoring</CardTitle>
                <CardDescription>HTTP error tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Client errors (4xx)</span>
                  <Badge className={`${metrics.hosting.errors['4xx'] > 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {metrics.hosting.errors['4xx']}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Server errors (5xx)</span>
                  <Badge className={`${metrics.hosting.errors['5xx'] > 10 ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {metrics.hosting.errors['5xx']}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Success rate</span>
                  <Badge className="bg-green-500/20 text-green-400">
                    {((1 - (metrics.hosting.errors['4xx'] + metrics.hosting.errors['5xx']) / metrics.hosting.requests) * 100).toFixed(2)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Monitoring */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
                <CardDescription>User experience metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>LCP (Largest Contentful Paint)</span>
                      <span className={metrics.performance.coreWebVitals.lcp <= 2500 ? 'text-green-400' : 'text-yellow-400'}>
                        {(metrics.performance.coreWebVitals.lcp / 1000).toFixed(1)}s
                      </span>
                    </div>
                    <Progress
                      value={Math.min((metrics.performance.coreWebVitals.lcp / 4000) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>FID (First Input Delay)</span>
                      <span className={metrics.performance.coreWebVitals.fid <= 100 ? 'text-green-400' : 'text-yellow-400'}>
                        {metrics.performance.coreWebVitals.fid}ms
                      </span>
                    </div>
                    <Progress
                      value={Math.min((metrics.performance.coreWebVitals.fid / 300) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CLS (Cumulative Layout Shift)</span>
                      <span className={metrics.performance.coreWebVitals.cls <= 0.1 ? 'text-green-400' : 'text-yellow-400'}>
                        {metrics.performance.coreWebVitals.cls.toFixed(3)}
                      </span>
                    </div>
                    <Progress
                      value={Math.min((metrics.performance.coreWebVitals.cls / 0.25) * 100, 100)}
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Page Load Performance</CardTitle>
                <CardDescription>Response time percentiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-gray-400 text-xs">P50</div>
                    <div className="text-lg font-bold text-green-400">
                      {metrics.performance.pageLoadTimes.p50}ms
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">P90</div>
                    <div className="text-lg font-bold text-yellow-400">
                      {metrics.performance.pageLoadTimes.p90}ms
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">P95</div>
                    <div className="text-lg font-bold text-orange-400">
                      {metrics.performance.pageLoadTimes.p95}ms
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <span className="text-sm">Network latency</span>
                  <Badge variant="secondary">
                    {metrics.performance.networkLatency}ms
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Health */}
        <TabsContent value="health" className="space-y-4">
          <div className="space-y-4">
            {health.recommendations.length > 0 && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-medium mb-2">Optimization Recommendations:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {health.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm">{rec}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
                <CardDescription>System alerts and incident history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {health.issues.length === 0 ? (
                    <div className="text-center py-4 text-gray-400">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                      No issues detected. System running smoothly.
                    </div>
                  ) : (
                    health.issues.map((issue, index) => (
                      <div key={index} className={`p-3 rounded-lg border ${
                        issue.resolved
                          ? 'bg-gray-800/50 border-gray-700'
                          : issue.level === 'critical'
                            ? 'bg-red-500/10 border-red-500/30'
                            : 'bg-yellow-500/10 border-yellow-500/30'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {issue.resolved ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <AlertTriangle className={`w-4 h-4 ${issue.level === 'critical' ? 'text-red-400' : 'text-yellow-400'}`} />
                              )}
                              <Badge variant={issue.level === 'critical' ? 'destructive' : 'secondary'}>
                                {issue.level}
                              </Badge>
                              <span className="text-xs text-gray-400">
                                {new Date(issue.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm">{issue.message}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Mock data for development
function getMockFirebaseMetrics(): FirebaseMetrics {
  return {
    firestore: {
      reads: 45234,
      writes: 12456,
      deletes: 234,
      activeConnections: 89,
      queriesPerSecond: 23.4,
      indexUsage: {
        total: 45,
        used: 38,
        unused: 7
      },
      storage: {
        documentsCount: 15678,
        totalSizeMB: 234.5,
        growth: 12.3
      }
    },
    authentication: {
      activeUsers: 1234,
      signInsToday: 234,
      signUpsToday: 34,
      failedAttempts: 5,
      magicLinksSent: 189,
      providers: {
        email: 956,
        google: 234,
        development: 44
      }
    },
    hosting: {
      bandwidth: 5678,
      requests: 23456,
      cacheHitRate: 87,
      averageResponseTime: 245,
      errors: {
        "4xx": 45,
        "5xx": 8
      }
    },
    functions: {
      invocations: 8934,
      errors: 23,
      averageExecutionTime: 456,
      memoryUsage: 128,
      timeouts: 2
    },
    performance: {
      pageLoadTimes: {
        p50: 1200,
        p90: 2400,
        p95: 3200
      },
      coreWebVitals: {
        lcp: 1800,
        fid: 85,
        cls: 0.08
      },
      networkLatency: 120
    }
  };
}

function getMockSystemHealth(): SystemHealth {
  return {
    status: 'healthy',
    uptime: 1440, // 24 hours
    issues: [
      {
        level: 'warning',
        message: 'High Firestore read volume detected - consider implementing caching',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        resolved: true
      },
      {
        level: 'warning',
        message: '7 unused Firestore indexes consuming unnecessary storage',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        resolved: false
      }
    ],
    recommendations: [
      'Consider implementing Redis caching for frequently accessed data',
      'Remove 7 unused Firestore indexes to reduce costs',
      'Enable compression for static assets to improve load times',
      'Set up Firebase Performance Monitoring alerts for proactive monitoring'
    ]
  };
}