'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Filter,
  RefreshCw,
  Download,
  Bug,
  Zap,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAnalytics, type AnalyticsInsights } from '@/hooks/use-analytics';
import { logger } from '@/lib/logger';

interface AnalyticsDashboardProps {
  className?: string;
  showFilters?: boolean;
  compactView?: boolean;
}

const SEVERITY_COLORS = {
  low: 'text-blue-600 bg-blue-100',
  medium: 'text-yellow-600 bg-yellow-100',
  high: 'text-orange-600 bg-orange-100',
  critical: 'text-red-600 bg-red-100'
};

const CATEGORY_ICONS = {
  authentication: Bug,
  firebase: Activity,
  api: Zap,
  ui: AlertCircle,
  performance: TrendingUp,
  network: Activity,
  validation: CheckCircle,
  upload: Upload,
  search: Search,
  realtime: Activity,
  unknown: AlertTriangle
};

export function AnalyticsDashboard({
  className = '',
  showFilters = true,
  compactView = false
}: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');

  const {
    data,
    errors,
    insights,
    isLoading,
    isError,
    error,
    refresh
  } = useAnalytics({
    timeRange,
    category: selectedCategory || undefined,
    severity: selectedSeverity as any || undefined,
    autoRefresh: true,
    refreshInterval: 60000
  });

  const handleRefresh = async () => {
    try {
      await refresh();
      logger.info('Analytics dashboard refreshed');
    } catch (error) {
      logger.error('Failed to refresh analytics', { error });
    }
  };

  const exportData = () => {
    if (!data) return;
    
    const exportData = {
      insights,
      errors: errors.slice(0, 100), // Limit export size
      exportedAt: new Date().toISOString(),
      timeRange,
      filters: {
        category: selectedCategory,
        severity: selectedSeverity
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hive-analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    logger.info('Analytics data exported');
  };

  if (isError) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-2 text-red-800">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">Failed to load analytics</span>
        </div>
        <p className="text-red-600 text-sm mt-1">
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </p>
        <button
          onClick={handleRefresh}
          className="mt-3 inline-flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Error Analytics</h2>
          <p className="text-gray-600">Monitor and track platform errors and performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={exportData}
            disabled={!data}
            className="inline-flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex items-center space-x-1 px-3 py-2 bg-hive-primary text-white rounded-md hover:bg-hive-primary/90 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            {/* Time Range */}
            <select
              value={timeRange}
              onChange={(e: any) => setTimeRange(e.target.value as any)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e: any) => setSelectedCategory(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="">All Categories</option>
              <option value="authentication">Authentication</option>
              <option value="firebase">Firebase</option>
              <option value="api">API</option>
              <option value="ui">UI</option>
              <option value="performance">Performance</option>
              <option value="network">Network</option>
              <option value="validation">Validation</option>
              <option value="upload">Upload</option>
              <option value="search">Search</option>
              <option value="realtime">Real-time</option>
            </select>
            
            {/* Severity Filter */}
            <select
              value={selectedSeverity}
              onChange={(e: any) => setSelectedSeverity(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-hive-primary mx-auto" />
            <p className="text-gray-600 mt-2">Loading analytics...</p>
          </div>
        </div>
      )}

      {/* Analytics Content */}
      {!isLoading && insights && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Errors */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Errors</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {insights.totalErrors.toLocaleString()}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>

            {/* Critical Errors */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Errors</p>
                  <p className="text-2xl font-bold text-red-600">
                    {insights.errorsBySeverity.critical || 0}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>

            {/* Most Common Category */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Top Category</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">
                    {Object.entries(insights.errorsByCategory || {})
                      .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'None'}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Time Range */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Range</p>
                  <p className="text-lg font-bold text-gray-900">
                    {timeRange === '1h' ? 'Last Hour' :
                     timeRange === '24h' ? 'Last 24h' :
                     timeRange === '7d' ? 'Last 7 Days' :
                     'Last 30 Days'}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Errors by Category */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Errors by Category</h3>
              <div className="space-y-3">
                {Object.entries(insights.errorsByCategory || {})
                  .sort(([,a], [,b]) => (b as number) - (a as number))
                  .slice(0, 5)
                  .map(([category, count]) => {
                    const percentage = (count as number / insights.totalErrors) * 100;
                    const IconComponent = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || AlertTriangle;
                    
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900 capitalize">{category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-hive-primary h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Errors by Severity */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Errors by Severity</h3>
              <div className="space-y-3">
                {Object.entries(insights.errorsBySeverity || {})
                  .sort(([,a], [,b]) => (b as number) - (a as number))
                  .map(([severity, count]) => {
                    const percentage = (count as number / insights.totalErrors) * 100;
                    const colorClass = SEVERITY_COLORS[severity as keyof typeof SEVERITY_COLORS] || 'text-gray-600 bg-gray-100';
                    
                    return (
                      <div key={severity} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                            {severity}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-hive-primary h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Recent Errors Table */}
          {!compactView && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Errors</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Error
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Severity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Count
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Occurred
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {errors.slice(0, 10).map((error: any) => {
                      const severityClass = SEVERITY_COLORS[error.severity] || 'text-gray-600 bg-gray-100';
                      
                      return (
                        <tr key={error.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <p className="font-medium text-gray-900 truncate max-w-xs">
                                {error.message}
                              </p>
                              {error.context?.url && (
                                <p className="text-gray-500 truncate max-w-xs">
                                  {error.context.url}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityClass}`}>
                              {error.severity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                            {error.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {error.count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(error.lastOccurred).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && insights?.totalErrors === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <h3 className="text-lg font-medium text-gray-900 mt-2">No errors found</h3>
          <p className="text-gray-600 mt-1">
            Great! No errors have been reported in the selected time range.
          </p>
        </div>
      )}
    </div>
  );
}

// Compact version for dashboard widgets
export function AnalyticsWidget({ className = '' }: { className?: string }) {
  return (
    <AnalyticsDashboard
      className={className}
      showFilters={false}
      compactView={true}
    />
  );
}