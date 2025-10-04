'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui';
import { Button } from '@hive/ui';
import { Badge } from '@hive/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hive/ui';
import { Alert, AlertDescription } from '@hive/ui';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@hive/ui';
import { Input } from '@hive/ui';
import { Textarea } from '@hive/ui';
import { Switch } from '@hive/ui';
import { Progress } from '@hive/ui';
import {
  Database,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  RefreshCw,
  Search,
  Filter,
  Download,
  Play,
  Pause,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Info,
  FileText,
  Code,
  Activity,
  PieChart,
  LineChart,
  Hash,
  Eye,
  Trash2,
  Plus,
  Wrench,
  Gauge
} from 'lucide-react';
import { useCSRF, protectedFetch } from '@/hooks/use-csrf';

interface OptimizationData {
  overview: {
    totalCollections: number;
    indexesTotal: number;
    indexesUsed: number;
    indexesUnused: number;
    slowQueries: number;
    avgQueryTime: number;
    optimizationScore: number;
  };
  indexes: {
    total: number;
    used: number;
    unused: number;
    missing: number;
    collections: Record<string, any>;
    recommendations: any[];
  };
  queries: {
    averageTime: number;
    slowQueries: any[];
    queryStats: Record<string, any>;
    bottlenecks: any[];
  };
  collections: {
    total: number;
    details: Record<string, any>;
    totalDocuments: number;
    totalSize: number;
    growth: Record<string, number>;
  };
  suggestions: any[];
  trends: {
    queryTimes: any[];
    indexUsage: any[];
    collectionGrowth: any[];
    errorRates: any[];
  };
  recommendations: {
    critical: any[];
    high: any[];
    medium: any[];
  };
}

export function DatabasePerformanceDashboard() {
  const [optimizationData, setOptimizationData] = useState<OptimizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  const { token: csrfToken, getHeaders } = useCSRF();

  useEffect(() => {
    loadOptimizationData();
  }, [selectedCollection]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadOptimizationData();
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, [autoRefresh, selectedCollection]);

  const loadOptimizationData = async () => {
    try {
      const params = new URLSearchParams({
        analysis: 'full',
        ...(selectedCollection && { collection: selectedCollection })
      });

      const response = await protectedFetch(`/api/admin/database-optimization?${params}`, {
        headers: getHeaders()
      }, csrfToken);

      if (!response.ok) {
        throw new Error('Failed to load optimization data');
      }

      const data = await response.json();
      setOptimizationData(data.optimization);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimizationAction = async (action: string, params: any = {}) => {
    try {
      setActionInProgress(action);
      const response = await protectedFetch('/api/admin/database-optimization', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ action, ...params })
      }, csrfToken);

      if (!response.ok) {
        throw new Error(`Failed to perform ${action}`);
      }

      const result = await response.json();

      // Reload data to reflect changes
      await loadOptimizationData();

      return result.result;
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
      throw err;
    } finally {
      setActionInProgress(null);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-400/10 border-green-400/30';
    if (score >= 70) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    return 'text-red-400 bg-red-400/10 border-red-400/30';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)]"></div>
      </div>
    );
  }

  if (error || !optimizationData) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load database optimization data: {error}
        </AlertDescription>
      </Alert>
    );
  }

  const { overview, indexes, queries, collections, suggestions, trends, recommendations } = optimizationData;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Database Performance Dashboard</h2>
          <p className="text-gray-400 mt-1">Optimize queries, indexes, and data models for maximum performance</p>
        </div>

        <div className="flex items-center gap-4">
          <select
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            value={selectedCollection}
            onChange={(e: React.ChangeEvent) => setSelectedCollection(e.target.value)}
          >
            <option value="">All Collections</option>
            <option value="users">Users</option>
            <option value="spaces">Spaces</option>
            <option value="posts">Posts</option>
            <option value="rituals">Rituals</option>
          </select>
          <div className="flex items-center gap-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <label htmlFor="auto-refresh" className="text-sm text-gray-400">
              Auto-refresh
            </label>
          </div>
          <Button onClick={loadOptimizationData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Optimization Score Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className={`${getScoreColor(overview.optimizationScore)} border`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimization Score</CardTitle>
            <Gauge className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.optimizationScore}/100</div>
            <Progress
              value={overview.optimizationScore}
              className="mt-2 h-2"
            />
            <p className="text-xs mt-2 opacity-80">
              {overview.optimizationScore >= 90 ? 'Excellent' :
               overview.optimizationScore >= 70 ? 'Good' : 'Needs Attention'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Query Performance</CardTitle>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{formatDuration(overview.avgQueryTime)}</div>
            <p className="text-xs text-gray-400">
              {overview.slowQueries} slow queries detected
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Index Health</CardTitle>
            <Hash className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">
              {overview.indexesUsed}/{overview.indexesTotal}
            </div>
            <p className="text-xs text-gray-400">
              {overview.indexesUnused} unused indexes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
            <Database className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{overview.totalCollections}</div>
            <p className="text-xs text-gray-400">
              {collections.totalDocuments.toLocaleString()} documents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Issues Alert */}
      {recommendations.critical.length > 0 && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">
            <strong>{recommendations.critical.length} critical optimization issue{recommendations.critical.length > 1 ? 's' : ''}</strong> requiring immediate attention
          </AlertDescription>
        </Alert>
      )}

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 bg-gray-900 border border-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="indexes">Indexes</TabsTrigger>
          <TabsTrigger value="queries">Queries</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Optimization Actions</CardTitle>
                <CardDescription>Common performance improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.critical.slice(0, 3).map((rec, index) => (
                    <div key={rec.id || index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm">{rec.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{rec.description}</p>
                        <Badge className={`text-xs mt-2 ${getPriorityColor(rec.priority)}`}>
                          {rec.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleOptimizationAction(
                          rec.type === 'index' ? 'create_index' : 'optimize_queries',
                          { collection: rec.collection, suggestion: rec }
                        )}
                        disabled={actionInProgress === rec.id}
                      >
                        {actionInProgress === rec.id ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Current database performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Average Query Time</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{formatDuration(overview.avgQueryTime)}</span>
                      {overview.avgQueryTime > 500 ? (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Index Efficiency</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {Math.round((overview.indexesUsed / overview.indexesTotal) * 100)}%
                      </span>
                      <Progress
                        value={(overview.indexesUsed / overview.indexesTotal) * 100}
                        className="w-16 h-2"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Data Size</span>
                    <span className="text-white font-medium">
                      {formatBytes(collections.totalSize * 1024)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Growth Rate</span>
                    <span className="text-white font-medium">
                      {Object.values(collections.growth).reduce((avg, rate) => avg + rate, 0) / Object.values(collections.growth).length}% /day
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collection Health Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Collection Health Matrix</CardTitle>
              <CardDescription>Performance overview across all collections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-5">
                {Object.entries(collections.details).map(([name, details]: [string, any]) => (
                  <div key={name} className="p-3 bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium text-white capitalize mb-2">{name}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Documents:</span>
                        <span className="text-white">{details.documentCount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white">{formatBytes((details.estimatedSize || 0) * 1024)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth:</span>
                        <span className={`${details.growthRate > 15 ? 'text-orange-400' : 'text-green-400'}`}>
                          {details.growthRate?.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Indexes Tab */}
        <TabsContent value="indexes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-green-500/5 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 text-sm">Used Indexes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400 mb-2">{indexes.used}</div>
                <p className="text-xs text-gray-400">Actively optimizing queries</p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/5 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-sm">Unused Indexes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400 mb-2">{indexes.unused}</div>
                <p className="text-xs text-gray-400">Consider removing to save storage</p>
              </CardContent>
            </Card>

            <Card className="bg-red-500/5 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 text-sm">Missing Indexes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-400 mb-2">{indexes.missing}</div>
                <p className="text-xs text-gray-400">Recommended for optimization</p>
              </CardContent>
            </Card>
          </div>

          {/* Index Details by Collection */}
          <div className="space-y-4">
            {Object.entries(indexes.collections).map(([collectionName, collectionData]: [string, any]) => (
              <Card key={collectionName}>
                <CardHeader>
                  <CardTitle className="capitalize">{collectionName} Indexes</CardTitle>
                  <CardDescription>
                    {collectionData.usage?.used} used, {collectionData.usage?.unused} unused, {collectionData.usage?.total} total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {collectionData.indexes?.map((index: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm">{index.name}</h4>
                          <p className="text-xs text-gray-400">
                            Fields: {Array.isArray(index.fields) ? index.fields.join(', ') : 'Complex'}
                          </p>
                          <Badge className={`text-xs mt-1 ${index.used ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {index.used ? 'Active' : 'Unused'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          {!index.used && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOptimizationAction('drop_index', {
                                collection: collectionName,
                                indexName: index.name
                              })}
                              disabled={actionInProgress === `drop_${index.name}`}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Index Recommendations */}
                    {collectionData.recommendations?.map((rec: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-blue-500/5 rounded-lg border border-blue-500/30">
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-400 text-sm">
                            <Plus className="w-3 h-3 inline mr-1" />
                            {rec.indexName}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">{rec.reason}</p>
                          <Badge className={`text-xs mt-1 ${getPriorityColor(rec.priority)}`}>
                            {rec.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleOptimizationAction('create_index', {
                            collection: collectionName,
                            indexName: rec.indexName,
                            indexFields: rec.fields
                          })}
                          disabled={actionInProgress === `create_${rec.indexName}`}
                        >
                          {actionInProgress === `create_${rec.indexName}` ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Queries Tab */}
        <TabsContent value="queries" className="space-y-4">
          {/* Slow Queries */}
          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Slow Queries ({queries.slowQueries.length})
              </CardTitle>
              <CardDescription>Queries taking longer than 1 second</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queries.slowQueries.map((query, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 capitalize">
                        {query.collection}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-400">
                          Avg: <span className="text-orange-400 font-medium">{formatDuration(query.avgDuration)}</span>
                        </span>
                        <span className="text-gray-400">
                          Count: <span className="text-white font-medium">{query.count?.toLocaleString()}</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-900 p-2 rounded text-xs font-mono text-gray-300 mb-2">
                      {query.pattern}
                    </div>
                    {query.suggestedOptimization && (
                      <p className="text-xs text-blue-400">
                        💡 {query.suggestedOptimization}
                      </p>
                    )}
                    <div className="flex justify-end mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOptimizationAction('optimize_queries', {
                          collection: query.collection,
                          query: query.pattern
                        })}
                        disabled={actionInProgress === `optimize_${index}`}
                      >
                        {actionInProgress === `optimize_${index}` ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Settings className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Bottlenecks */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Bottlenecks</CardTitle>
              <CardDescription>Identified performance issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queries.bottlenecks.map((bottleneck, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="capitalize">{bottleneck.collection}</Badge>
                        <Badge className={getPriorityColor(bottleneck.severity)}>
                          {bottleneck.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-white text-sm">{bottleneck.description}</h4>
                      <p className="text-xs text-gray-400 mt-1">{bottleneck.recommendation}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Wrench className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-4">
          <div className="grid gap-4">
            {Object.entries(collections.details).map(([name, details]: [string, any]) => (
              <Card key={name}>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    {name}
                  </CardTitle>
                  <CardDescription>
                    {details.documentCount?.toLocaleString()} documents • {formatBytes((details.estimatedSize || 0) * 1024)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Storage Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Documents:</span>
                          <span className="text-white font-medium">{details.documentCount?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Avg Doc Size:</span>
                          <span className="text-white font-medium">{formatBytes((details.averageDocumentSize || 0) * 1024)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Total Size:</span>
                          <span className="text-white font-medium">{formatBytes((details.estimatedSize || 0) * 1024)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Growth Rate:</span>
                          <span className={`font-medium ${details.growthRate > 15 ? 'text-orange-400' : 'text-green-400'}`}>
                            {details.growthRate?.toFixed(1)}%/day
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Activity Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Reads/hour:</span>
                          <span className="text-white font-medium">{details.readFrequency?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Writes/hour:</span>
                          <span className="text-white font-medium">{details.writeFrequency?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Read/Write Ratio:</span>
                          <span className="text-white font-medium">
                            {((details.readFrequency || 0) / (details.writeFrequency || 1)).toFixed(1)}:1
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-white">Data Hotspots</h4>
                      <div className="space-y-2">
                        {details.hotspots?.map((hotspot: any, index: number) => (
                          <div key={index} className="text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">{hotspot.field}:</span>
                              <span className="text-white font-medium">{hotspot.concentration}%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{hotspot.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOptimizationAction('analyze_collection', { collection: name })}
                        disabled={actionInProgress === `analyze_${name}`}
                      >
                        {actionInProgress === `analyze_${name}` ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <BarChart3 className="w-3 h-3" />
                        )}
                        Analyze
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOptimizationAction('optimize_queries', { collection: name })}
                        disabled={actionInProgress === `optimize_collection_${name}`}
                      >
                        {actionInProgress === `optimize_collection_${name}` ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Settings className="w-3 h-3" />
                        )}
                        Optimize
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent value="suggestions" className="space-y-4">
          {/* Critical Recommendations */}
          {recommendations.critical.length > 0 && (
            <Card className="border-red-500/30 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Critical Recommendations ({recommendations.critical.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.critical.map((rec, index) => (
                    <OptimizationSuggestionCard
                      key={rec.id || index}
                      suggestion={rec}
                      onAction={handleOptimizationAction}
                      actionInProgress={actionInProgress}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* High Priority Recommendations */}
          {recommendations.high.length > 0 && (
            <Card className="border-orange-500/30 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <ArrowUp className="w-5 h-5" />
                  High Priority Recommendations ({recommendations.high.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.high.map((rec, index) => (
                    <OptimizationSuggestionCard
                      key={rec.id || index}
                      suggestion={rec}
                      onAction={handleOptimizationAction}
                      actionInProgress={actionInProgress}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Medium Priority Recommendations */}
          {recommendations.medium.length > 0 && (
            <Card className="border-yellow-500/30 bg-yellow-500/5">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Medium Priority Recommendations ({recommendations.medium.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.medium.map((rec, index) => (
                    <OptimizationSuggestionCard
                      key={rec.id || index}
                      suggestion={rec}
                      onAction={handleOptimizationAction}
                      actionInProgress={actionInProgress}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Query Time Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Query Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Average:</span>
                    <span className="text-white font-medium">{formatDuration(overview.avgQueryTime)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">24h Trend:</span>
                    <span className="text-green-400 font-medium flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      -12%
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-gray-400 mb-2">Last 6 hours</div>
                    <div className="flex items-end gap-1 h-8">
                      {trends.queryTimes.slice(-6).map((point, index) => (
                        <div
                          key={index}
                          className="bg-blue-500/50 flex-1 rounded-t"
                          style={{ height: `${(point.avgTime / 800) * 100}%` }}
                          title={`${formatDuration(point.avgTime)} at ${new Date(point.time).toLocaleTimeString()}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Index Usage Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Index Usage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Hit Rate:</span>
                    <span className="text-green-400 font-medium">
                      {trends.indexUsage[trends.indexUsage.length - 1]?.hitRate?.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Miss Rate:</span>
                    <span className="text-orange-400 font-medium">
                      {trends.indexUsage[trends.indexUsage.length - 1]?.missRate?.toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-gray-400 mb-2">Last 6 hours</div>
                    <div className="flex items-end gap-1 h-8">
                      {trends.indexUsage.slice(-6).map((point, index) => (
                        <div key={index} className="flex-1 flex flex-col">
                          <div
                            className="bg-green-500/50 rounded-t"
                            style={{ height: `${point.hitRate}%` }}
                            title={`${point.hitRate.toFixed(1)}% hit rate`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Collection Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Collection Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Docs Added/hour:</span>
                    <span className="text-blue-400 font-medium">
                      {trends.collectionGrowth[trends.collectionGrowth.length - 1]?.documentsAdded}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Size Growth/hour:</span>
                    <span className="text-purple-400 font-medium">
                      {formatBytes((trends.collectionGrowth[trends.collectionGrowth.length - 1]?.sizeIncrease || 0) * 1024 * 1024)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Rates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Error Rate Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Current Error Rate:</span>
                    <span className="text-green-400 font-medium">
                      {trends.errorRates[trends.errorRates.length - 1]?.errorRate?.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Timeouts/hour:</span>
                    <span className="text-yellow-400 font-medium">
                      {trends.errorRates[trends.errorRates.length - 1]?.timeouts || 0}
                    </span>
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

// Optimization Suggestion Card Component
function OptimizationSuggestionCard({
  suggestion,
  onAction,
  actionInProgress
}: {
  suggestion: any;
  onAction: (action: string, params: any) => Promise<any>;
  actionInProgress: string | null;
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'index': return <Hash className="w-4 h-4" />;
      case 'query': return <Zap className="w-4 h-4" />;
      case 'data_model': return <Database className="w-4 h-4" />;
      case 'performance': return <TrendingUp className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getActionType = (suggestionType: string) => {
    switch (suggestionType) {
      case 'index': return 'create_index';
      case 'query': return 'optimize_queries';
      default: return 'analyze_collection';
    }
  };

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {getTypeIcon(suggestion.type)}
          <div>
            <h4 className="font-medium text-white">{suggestion.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={`text-xs ${getPriorityColor(suggestion.priority)}`}>
                {suggestion.priority.toUpperCase()}
              </Badge>
              <Badge variant="freshman" className="text-xs capitalize">
                {suggestion.type.replace('_', ' ')}
              </Badge>
              <Badge variant="freshman" className="text-xs capitalize">
                {suggestion.collection || 'All'}
              </Badge>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => onAction(getActionType(suggestion.type), {
            collection: suggestion.collection,
            suggestion
          })}
          disabled={actionInProgress === suggestion.id}
        >
          {actionInProgress === suggestion.id ? (
            <RefreshCw className="w-3 h-3 animate-spin" />
          ) : (
            <Play className="w-3 h-3" />
          )}
        </Button>
      </div>

      <p className="text-sm text-gray-300 mb-3">{suggestion.description}</p>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <h5 className="text-xs font-medium text-gray-400 mb-1">Expected Impact</h5>
          <p className="text-sm text-green-400">{suggestion.estimatedImpact}</p>
        </div>
        <div>
          <h5 className="text-xs font-medium text-gray-400 mb-1">Implementation</h5>
          <p className="text-sm text-blue-400">{suggestion.effort || 'Medium'} effort</p>
        </div>
      </div>

      {suggestion.implementation && (
        <div className="mt-3">
          <h5 className="text-xs font-medium text-gray-400 mb-1">Implementation Details</h5>
          <div className="bg-gray-900 p-2 rounded text-xs font-mono text-gray-300">
            {suggestion.implementation}
          </div>
        </div>
      )}
    </div>
  );
}