'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Zap, 
  Calendar,
  Award,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Star,
  Flame,
  Eye,
  Heart,
  MessageSquare,
  Share2
} from 'lucide-react';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';

// Types for analytics data
export interface AnalyticsMetric {
  id: string;
  label: string;
  value: number;
  previousValue?: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  trend?: number[];
  unit?: string;
  format?: 'number' | 'percentage' | 'currency' | 'time';
  icon?: React.ReactNode;
  color?: string;
}

export interface AnalyticsTimeframe {
  id: string;
  label: string;
  value: string;
}

export interface AnalyticsData {
  timeframe: string;
  metrics: AnalyticsMetric[];
  chartData: any[];
  lastUpdated: string;
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
  isLoading?: boolean;
  onTimeframeChange?: (timeframe: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  className?: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  data,
  isLoading = false,
  onTimeframeChange,
  onRefresh,
  onExport,
  className
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  const timeframes: AnalyticsTimeframe[] = [
    { id: 'week', label: 'This Week', value: '7d' },
    { id: 'month', label: 'This Month', value: '30d' },
    { id: 'semester', label: 'This Semester', value: '120d' },
    { id: 'year', label: 'This Year', value: '365d' }
  ];

  const formatValue = (metric: AnalyticsMetric): string => {
    const { value, format, unit } = metric;
    
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'time':
        return `${Math.floor(value / 60)}h ${value % 60}m`;
      default:
        return unit ? `${value.toLocaleString()} ${unit}` : value.toLocaleString();
    }
  };

  const getChangeIcon = (changeType?: string) => {
    switch (changeType) {
      case 'increase':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'decrease':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getChangeColor = (changeType?: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-500';
      case 'decrease':
        return 'text-red-500';
      default:
        return 'text-hive-text-secondary';
    }
  };

  const topMetrics = useMemo(() => {
    return data.metrics.slice(0, 4);
  }, [data.metrics]);

  const additionalMetrics = useMemo(() => {
    return data.metrics.slice(4);
  }, [data.metrics]);

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="animate-pulse">
          <div className="h-8 bg-hive-surface-elevated rounded-md w-48 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-hive-surface-elevated rounded-xl" />
            ))}
          </div>
          <div className="h-64 bg-hive-surface-elevated rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-hive-text-primary">Analytics Dashboard</h2>
          <p className="text-hive-text-secondary">
            Track your campus engagement and tool usage
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-1 bg-hive-surface-elevated rounded-lg p-1">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                onClick={() => onTimeframeChange?.(timeframe.value)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  data.timeframe === timeframe.value
                    ? "bg-hive-gold text-hive-text-primary"
                    : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-primary"
                )}
              >
                {timeframe.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <HiveButton variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </HiveButton>
          
          <HiveButton variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </HiveButton>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard
              metric={metric}
              isSelected={selectedMetric === metric.id}
              onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Detailed Chart View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <HiveCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-hive-text-primary">
                {selectedMetric 
                  ? data.metrics.find(m => m.id === selectedMetric)?.label 
                  : 'Activity Overview'
                }
              </h3>
              <p className="text-sm text-hive-text-secondary">
                Detailed analytics for the selected timeframe
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('overview')}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === 'overview' 
                    ? "bg-hive-gold text-hive-text-primary" 
                    : "text-hive-text-secondary hover:text-hive-text-primary"
                )}
              >
                <BarChart3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === 'detailed' 
                    ? "bg-hive-gold text-hive-text-primary" 
                    : "text-hive-text-secondary hover:text-hive-text-primary"
                )}
              >
                <LineChart className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 bg-hive-background-primary rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-hive-text-secondary">
                Interactive chart visualization
              </p>
              <p className="text-sm text-hive-text-tertiary">
                Chart component integration pending
              </p>
            </div>
          </div>
        </HiveCard>
      </motion.div>

      {/* Additional Metrics */}
      {additionalMetrics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <HiveCard className="p-6">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">
              Detailed Metrics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {additionalMetrics.map((metric) => (
                <div key={metric.id} className="flex items-center gap-3 p-4 bg-hive-background-primary rounded-lg">
                  <div className="flex-shrink-0">
                    {metric.icon && (
                      <div className="w-10 h-10 rounded-lg bg-hive-surface-elevated flex items-center justify-center">
                        {metric.icon}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-hive-text-primary truncate">
                      {metric.label}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-hive-text-primary">
                        {formatValue(metric)}
                      </span>
                      {metric.change !== undefined && (
                        <div className={cn("flex items-center gap-1", getChangeColor(metric.changeType))}>
                          {getChangeIcon(metric.changeType)}
                          <span className="text-sm font-medium">
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </HiveCard>
        </motion.div>
      )}

      {/* Last Updated */}
      <div className="text-center">
        <p className="text-sm text-hive-text-secondary flex items-center justify-center gap-2">
          <Clock className="h-4 w-4" />
          Last updated: {new Date(data.lastUpdated).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// Individual Metric Card Component
interface MetricCardProps {
  metric: AnalyticsMetric;
  isSelected?: boolean;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric, isSelected, onClick }) => {
  const { label, value, change, changeType, icon } = metric;

  return (
    <HiveCard
      className={cn(
        "p-6 cursor-pointer transition-all duration-200 hover:shadow-lg",
        isSelected && "ring-2 ring-hive-gold shadow-lg"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && (
              <div className="w-8 h-8 rounded-lg bg-hive-surface-elevated flex items-center justify-center">
                {icon}
              </div>
            )}
            <p className="text-sm font-medium text-hive-text-secondary truncate">
              {label}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-hive-text-primary">
              {formatValue(metric)}
            </p>
            
            {change !== undefined && (
              <div className={cn("flex items-center gap-1", getChangeColor(changeType))}>
                {getChangeIcon(changeType)}
                <span className="text-sm font-medium">
                  {change > 0 ? '+' : ''}{change}% vs last period
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mini Trend Line */}
      {metric.trend && (
        <div className="mt-4">
          <div className="h-12 bg-hive-background-primary rounded-md flex items-end justify-between px-1">
            {metric.trend.map((point, index) => (
              <div
                key={index}
                className="w-1 bg-hive-gold rounded-t-sm"
                style={{ height: `${(point / Math.max(...metric.trend!)) * 100}%` }}
              />
            ))}
          </div>
        </div>
      )}
    </HiveCard>
  );
};

// Sample Analytics Data Generator
export const generateSampleAnalyticsData = (): AnalyticsData => {
  return {
    timeframe: '30d',
    lastUpdated: new Date().toISOString(),
    metrics: [
      {
        id: 'spaces_joined',
        label: 'Spaces Joined',
        value: 18,
        previousValue: 15,
        change: 20,
        changeType: 'increase',
        icon: <Users className="h-4 w-4 text-blue-500" />,
        trend: [12, 14, 15, 16, 17, 18, 18]
      },
      {
        id: 'tools_used',
        label: 'Tools Used',
        value: 127,
        previousValue: 98,
        change: 30,
        changeType: 'increase',
        icon: <Zap className="h-4 w-4 text-green-500" />,
        trend: [98, 105, 112, 118, 123, 125, 127]
      },
      {
        id: 'study_hours',
        label: 'Study Hours',
        value: 45,
        previousValue: 52,
        change: -13,
        changeType: 'decrease',
        icon: <Clock className="h-4 w-4 text-orange-500" />,
        format: 'time',
        trend: [52, 50, 48, 46, 45, 44, 45]
      },
      {
        id: 'connections_made',
        label: 'New Connections',
        value: 234,
        previousValue: 189,
        change: 24,
        changeType: 'increase',
        icon: <Heart className="h-4 w-4 text-red-500" />,
        trend: [189, 195, 208, 218, 225, 230, 234]
      },
      {
        id: 'engagement_rate',
        label: 'Engagement Rate',
        value: 87,
        previousValue: 82,
        change: 6,
        changeType: 'increase',
        icon: <Activity className="h-4 w-4 text-purple-500" />,
        format: 'percentage'
      },
      {
        id: 'tools_created',
        label: 'Tools Created',
        value: 12,
        previousValue: 8,
        change: 50,
        changeType: 'increase',
        icon: <Star className="h-4 w-4 text-yellow-500" />
      },
      {
        id: 'achievements_earned',
        label: 'Achievements',
        value: 28,
        previousValue: 23,
        change: 22,
        changeType: 'increase',
        icon: <Award className="h-4 w-4 text-gold" />
      },
      {
        id: 'weekly_streak',
        label: 'Weekly Streak',
        value: 12,
        previousValue: 9,
        change: 33,
        changeType: 'increase',
        icon: <Flame className="h-4 w-4 text-orange-600" />,
        unit: 'weeks'
      }
    ],
    chartData: [] // Chart data would be populated by actual chart library
  };
};

export default AnalyticsDashboard;