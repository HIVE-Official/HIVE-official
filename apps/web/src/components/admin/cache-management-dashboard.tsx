'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@hive/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hive/ui';
import { Badge } from '@hive/ui';
import { Button } from '@hive/ui';
import { secureApiFetch } from '@/lib/secure-auth-utils';
import { Alert, AlertDescription } from '@hive/ui';
import { Progress } from '@hive/ui';

interface CacheManagementData {
  overview: {
    status: 'healthy' | 'degraded' | 'critical';
    uptime: number;
    totalOperations: number;
    hitRate: number;
    memoryUsage: number;
    activeConnections: number;
    avgResponseTime: number;
    errorRate: number;
  };
  performance: {
    operationStats: {
      hits: number;
      misses: number;
      sets: number;
      deletes: number;
      errors: number;
    };
    memoryBreakdown: Record<string, any>;
    slowQueries: Array<{
      operation: string;
      key: string;
      responseTime: number;
      timestamp: number;
    }>;
    hotKeys: Array<{
      key: string;
      accessCount: number;
      lastAccessed: number;
      type: string;
    }>;
  };
  namespaces: Array<{
    namespace: string;
    keyCount: number;
    memoryUsage: number;
    hitRate: number;
    avgTTL: number;
    description: string;
  }>;
  campusIsolation: Array<{
    campusId: string;
    keyCount: number;
    memoryUsage: number;
    hitRate: number;
    topNamespaces: Array<{
      namespace: string;
      count: number;
    }>;
  }>;
  alerts: Array<{
    level: 'info' | 'warning' | 'critical';
    message: string;
    timestamp: number;
    metric: string;
    threshold: number;
    currentValue: number;
  }>;
  recommendations: Array<{
    type: 'performance' | 'memory' | 'ttl' | 'scaling';
    priority: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    impact: string;
    action: string;
  }>;
}

export default function CacheManagementDashboard() {
  const [data, setData] = useState<CacheManagementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await secureApiFetch('/api/admin/cache-management');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch cache management data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleAction = async (action: string, params?: any) => {
    setActiveAction(action);
    try {
      const response = await secureApiFetch('/api/admin/cache-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...params })
      });

      if (response.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setActiveAction(null);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'degraded':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'critical':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'info':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'warning':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'critical':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'high':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading cache management data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-500">Failed to load cache management data</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Cache Management</h1>
          <p className="text-gray-400">Monitor and manage Redis cache performance and health</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <Button
            onClick={() => handleAction('optimizeCache')}
            disabled={activeAction === 'optimizeCache'}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {activeAction === 'optimizeCache' ? 'Optimizing...' : 'Optimize Cache'}
          </Button>
        </div>
      </div>

      {/* Status Alerts */}
      {data.alerts.length > 0 && (
        <div className="space-y-2">
          {data.alerts.map((alert, index) => (
            <Alert key={index} className={`border ${getAlertColor(alert.level)}`}>
              <AlertDescription className="flex justify-between items-center">
                <div>
                  <Badge className={`mr-2 ${getAlertColor(alert.level)} capitalize`}>
                    {alert.level}
                  </Badge>
                  {alert.message}
                </div>
                <div className="text-sm opacity-75">
                  {alert.currentValue} / {alert.threshold}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`border p-4 ${getStatusColor(data.overview.status)}`}>
          <div className="text-sm opacity-90">Cache Status</div>
          <div className="text-2xl font-bold capitalize">{data.overview.status}</div>
          <div className="text-xs opacity-75">
            Uptime: {formatUptime(data.overview.uptime)}
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-sm text-gray-400">Hit Rate</div>
          <div className="text-2xl font-bold text-green-400">{data.overview.hitRate.toFixed(1)}%</div>
          <div className="text-xs text-gray-500">
            {data.performance.operationStats.hits.toLocaleString()} hits
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-sm text-gray-400">Memory Usage</div>
          <div className="text-2xl font-bold text-blue-400">
            {formatBytes(data.overview.memoryUsage)}
          </div>
          <div className="text-xs text-gray-500">
            {data.overview.activeConnections} connections
          </div>
        </Card>

        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-sm text-gray-400">Response Time</div>
          <div className="text-2xl font-bold text-purple-400">
            {data.overview.avgResponseTime.toFixed(0)}ms
          </div>
          <div className="text-xs text-gray-500">
            {data.overview.errorRate.toFixed(2)}% error rate
          </div>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
          <TabsTrigger value="performance" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            Performance
          </TabsTrigger>
          <TabsTrigger value="namespaces" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            Namespaces
          </TabsTrigger>
          <TabsTrigger value="campus" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            Campus Isolation
          </TabsTrigger>
          <TabsTrigger value="optimization" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            Optimization
          </TabsTrigger>
          <TabsTrigger value="actions" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">
            Actions
          </TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Operation Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Hits</span>
                  <span className="text-green-400 font-medium">
                    {data.performance.operationStats.hits.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Misses</span>
                  <span className="text-yellow-400 font-medium">
                    {data.performance.operationStats.misses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sets</span>
                  <span className="text-blue-400 font-medium">
                    {data.performance.operationStats.sets.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Deletes</span>
                  <span className="text-purple-400 font-medium">
                    {data.performance.operationStats.deletes.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Errors</span>
                  <span className="text-red-400 font-medium">
                    {data.performance.operationStats.errors.toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Memory Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Used Memory</span>
                  <span className="text-white">
                    {data.performance.memoryBreakdown.used_memory_human || formatBytes(data.performance.memoryBreakdown.used_memory)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Peak Memory</span>
                  <span className="text-white">
                    {formatBytes(data.performance.memoryBreakdown.used_memory_peak)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">RSS Memory</span>
                  <span className="text-white">
                    {formatBytes(data.performance.memoryBreakdown.used_memory_rss)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Fragmentation</span>
                  <span className="text-yellow-400">
                    {data.performance.memoryBreakdown.mem_fragmentation_ratio?.toFixed(2) || 'N/A'}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Slow Queries</h3>
              <div className="space-y-3">
                {data.performance.slowQueries.map((query, index) => (
                  <div key={index} className="p-3 bg-gray-900 rounded border border-gray-600">
                    <div className="flex justify-between items-center mb-1">
                      <Badge className="bg-red-400/10 text-red-400 border-red-400/30">
                        {query.operation}
                      </Badge>
                      <span className="text-red-400 font-mono text-sm">{query.responseTime}ms</span>
                    </div>
                    <div className="text-sm text-gray-400 font-mono break-all">
                      {query.key}
                    </div>
                  </div>
                ))}
                {data.performance.slowQueries.length === 0 && (
                  <div className="text-gray-500 text-center py-4">No slow queries detected</div>
                )}
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Hot Keys</h3>
              <div className="space-y-3">
                {data.performance.hotKeys.map((key, index) => (
                  <div key={index} className="p-3 bg-gray-900 rounded border border-gray-600">
                    <div className="flex justify-between items-center mb-1">
                      <Badge className="bg-green-400/10 text-green-400 border-green-400/30">
                        {key.type}
                      </Badge>
                      <span className="text-green-400 font-mono text-sm">
                        {key.accessCount} hits
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 font-mono break-all">
                      {key.key}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Namespaces Tab */}
        <TabsContent value="namespaces" className="space-y-4">
          <div className="grid gap-4">
            {data.namespaces.map((namespace) => (
              <Card key={namespace.namespace} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{namespace.namespace}</h3>
                    <p className="text-gray-400 text-sm">{namespace.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400">{namespace.keyCount}</div>
                    <div className="text-sm text-gray-400">keys</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">{formatBytes(namespace.memoryUsage)}</div>
                    <div className="text-sm text-gray-400">Memory Usage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-400">{namespace.hitRate.toFixed(1)}%</div>
                    <div className="text-sm text-gray-400">Hit Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-400">{namespace.avgTTL}s</div>
                    <div className="text-sm text-gray-400">Avg TTL</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction('flushNamespace', { namespace: namespace.namespace })}
                      disabled={activeAction === 'flushNamespace'}
                      className="border-red-600 text-red-400 hover:bg-red-600/10"
                    >
                      Flush Namespace
                    </Button>
                  </div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(namespace.hitRate, 100)}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Campus Isolation Tab */}
        <TabsContent value="campus" className="space-y-4">
          <div className="grid gap-4">
            {data.campusIsolation.map((campus) => (
              <Card key={campus.campusId} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{campus.campusId}</h3>
                    <p className="text-gray-400">{campus.keyCount.toLocaleString()} total keys</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${campus.hitRate > 80 ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'}`}>
                      {campus.hitRate.toFixed(1)}% Hit Rate
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Memory Usage</h4>
                    <div className="text-2xl font-bold text-blue-400">
                      {formatBytes(campus.memoryUsage)}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Top Namespaces</h4>
                    <div className="space-y-1">
                      {campus.topNamespaces.slice(0, 3).map((ns, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-400">{ns.namespace}</span>
                          <span className="text-white">{ns.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Button
                      variant="outline"
                      onClick={() => handleAction('flushCampus', { campusId: campus.campusId })}
                      disabled={activeAction === 'flushCampus'}
                      className="border-red-600 text-red-400 hover:bg-red-600/10 w-full"
                    >
                      {activeAction === 'flushCampus' ? 'Flushing...' : 'Flush Campus Cache'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Optimization Tab */}
        <TabsContent value="optimization" className="space-y-4">
          <div className="grid gap-4">
            {data.recommendations.map((rec, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{rec.title}</h3>
                      <Badge className={`${getPriorityColor(rec.priority)} capitalize`}>
                        {rec.priority} Priority
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-2">{rec.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="text-white font-medium mb-1">Expected Impact:</h4>
                    <p className="text-green-400">{rec.impact}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Recommended Action:</h4>
                    <p className="text-blue-400">{rec.action}</p>
                  </div>
                </div>
              </Card>
            ))}
            {data.recommendations.length === 0 && (
              <Card className="bg-gray-800 border-gray-700 p-6 text-center">
                <div className="text-green-400 text-lg font-semibold mb-2">✓ Cache Optimally Configured</div>
                <p className="text-gray-400">No optimization recommendations at this time.</p>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Actions Tab */}
        <TabsContent value="actions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Cache Operations</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => handleAction('analyzeMemoryUsage')}
                  disabled={activeAction === 'analyzeMemoryUsage'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {activeAction === 'analyzeMemoryUsage' ? 'Analyzing...' : 'Analyze Memory Usage'}
                </Button>
                <Button
                  onClick={() => handleAction('optimizeCache')}
                  disabled={activeAction === 'optimizeCache'}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {activeAction === 'optimizeCache' ? 'Optimizing...' : 'Optimize Cache'}
                </Button>
              </div>
            </Card>

            <Card className="bg-gray-800 border-red-700 p-6">
              <h3 className="text-lg font-semibold text-red-400 mb-4">Dangerous Operations</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    if (confirm('Are you sure? This will clear ALL cache data.')) {
                      handleAction('flushAll');
                    }
                  }}
                  disabled={activeAction === 'flushAll'}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  {activeAction === 'flushAll' ? 'Flushing...' : 'Flush All Cache'}
                </Button>
              </div>
              <p className="text-red-400 text-sm mt-2">
                ⚠️ This action cannot be undone and will affect all users.
              </p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
