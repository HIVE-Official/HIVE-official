'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { 
  Activity, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Eye,
  MousePointer,
  Zap
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  description?: string;
}

function MetricCard({ title, value, change, trend, icon, description }: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="text-gold">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      {change && (
        <p className={`text-xs ${getTrendColor()} flex items-center gap-1`}>
          <span>{getTrendIcon()}</span>
          {change}
          {description && <span className="text-gray-500">from last week</span>}
        </p>
      )}
      {description && !change && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </Card>
  );
}

interface AlertItemProps {
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  component?: string;
}

function AlertItem({ severity, message, timestamp, component }: AlertItemProps) {
  const getSeverityColor = () => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getSeverityIcon = () => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 border border-gray-800 rounded-lg">
      <div className={`p-1 rounded-full ${getSeverityColor()}`}>
        {getSeverityIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs">
            {severity.toUpperCase()}
          </Badge>
          {component && (
            <Badge variant="outline" className="text-xs text-gray-400">
              {component}
            </Badge>
          )}
        </div>
        <p className="text-sm text-white">{message}</p>
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {timestamp}
        </p>
      </div>
    </div>
  );
}

interface PerformanceChartProps {
  data: Array<{ time: string; value: number; }>;
  title: string;
  unit?: string;
}

function PerformanceChart({ data, title, unit = 'ms' }: PerformanceChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-400">{title}</h4>
      <div className="h-24 flex items-end gap-1">
        {data.map((point, index) => (
          <div
            key={index}
            className="flex-1 bg-gold/20 hover:bg-gold/40 transition-colors relative group"
            style={{
              height: `${(point.value / maxValue) * 100}%`,
              minHeight: '2px'
            }}
          >
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-gray-700 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {point.value}{unit} at {point.time}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{data[0]?.time}</span>
        <span>{data[data.length - 1]?.time}</span>
      </div>
    </div>
  );
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [mockData, setMockData] = useState({
    activeUsers: 1247,
    pageViews: 8932,
    errorRate: 0.02,
    avgResponseTime: 245,
    conversionRate: 3.4,
    engagement: 85,
  });

  // Mock real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMockData(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        pageViews: prev.pageViews + Math.floor(Math.random() * 50),
        avgResponseTime: prev.avgResponseTime + Math.floor(Math.random() * 20 - 10),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const mockAlerts: AlertItemProps[] = [
    {
      severity: 'high',
      message: 'API response time exceeded threshold (>3s)',
      timestamp: '2 minutes ago',
      component: 'Space API',
    },
    {
      severity: 'medium',
      message: 'Higher than usual error rate in Creator Tools',
      timestamp: '15 minutes ago',
      component: 'Tool Builder',
    },
    {
      severity: 'low',
      message: 'Memory usage increased by 15%',
      timestamp: '1 hour ago',
      component: 'Main App',
    },
  ];

  const mockPerformanceData = [
    { time: '12:00', value: 245 },
    { time: '12:15', value: 267 },
    { time: '12:30', value: 234 },
    { time: '12:45', value: 289 },
    { time: '13:00', value: 256 },
    { time: '13:15', value: 278 },
    { time: '13:30', value: 245 },
    { time: '13:45', value: 234 },
    { time: '14:00', value: 267 },
    { time: '14:15', value: 289 },
  ];

  const mockCoreWebVitals = {
    lcp: { value: 1.2, rating: 'good' as const },
    fid: { value: 45, rating: 'good' as const },
    cls: { value: 0.08, rating: 'needs-improvement' as const },
  };

  const getWebVitalColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-400';
      case 'needs-improvement': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-gray-400 mt-1">Real-time insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-400 border-green-400">
              Live
            </Badge>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="bg-gray-900 border border-gray-700 rounded px-3 py-1 text-sm text-white"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            title="Active Users"
            value={mockData.activeUsers.toLocaleString()}
            change="+12.5%"
            trend="up"
            icon={<Users className="h-5 w-5" />}
          />
          <MetricCard
            title="Page Views"
            value={mockData.pageViews.toLocaleString()}
            change="+8.2%"
            trend="up"
            icon={<Eye className="h-5 w-5" />}
          />
          <MetricCard
            title="Error Rate"
            value={`${(mockData.errorRate * 100).toFixed(2)}%`}
            change="-0.3%"
            trend="down"
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <MetricCard
            title="Avg Response"
            value={`${mockData.avgResponseTime}ms`}
            change="+15ms"
            trend="up"
            icon={<Zap className="h-5 w-5" />}
          />
          <MetricCard
            title="Conversion Rate"
            value={`${mockData.conversionRate}%`}
            change="+0.8%"
            trend="up"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <MetricCard
            title="Engagement"
            value={`${mockData.engagement}%`}
            change="+5.2%"
            trend="up"
            icon={<MousePointer className="h-5 w-5" />}
          />
        </div>

        {/* Charts and Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Performance Trends</h2>
              <BarChart3 className="h-5 w-5 text-gold" />
            </div>
            <PerformanceChart 
              data={mockPerformanceData} 
              title="API Response Time" 
              unit="ms" 
            />
          </Card>

          {/* Core Web Vitals */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Core Web Vitals</h2>
              <Activity className="h-5 w-5 text-gold" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Largest Contentful Paint (LCP)</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getWebVitalColor(mockCoreWebVitals.lcp.rating)}`}>
                    {mockCoreWebVitals.lcp.value}s
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getWebVitalColor(mockCoreWebVitals.lcp.rating)} border-current`}
                  >
                    {mockCoreWebVitals.lcp.rating.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">First Input Delay (FID)</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getWebVitalColor(mockCoreWebVitals.fid.rating)}`}>
                    {mockCoreWebVitals.fid.value}ms
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getWebVitalColor(mockCoreWebVitals.fid.rating)} border-current`}
                  >
                    {mockCoreWebVitals.fid.rating.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Cumulative Layout Shift (CLS)</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getWebVitalColor(mockCoreWebVitals.cls.rating)}`}>
                    {mockCoreWebVitals.cls.value}
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getWebVitalColor(mockCoreWebVitals.cls.rating)} border-current`}
                  >
                    {mockCoreWebVitals.cls.rating.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts and System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Alerts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Live Alerts</h2>
              <Badge variant="outline" className="text-red-400 border-red-400">
                {mockAlerts.length} Active
              </Badge>
            </div>
            <div className="space-y-3">
              {mockAlerts.map((alert, index) => (
                <AlertItem key={index} {...alert} />
              ))}
            </div>
          </Card>

          {/* System Health */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">System Health</h2>
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm text-green-400">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">API Services</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm text-green-400">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Storage</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <span className="text-sm text-yellow-400">Warning</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Authentication</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm text-green-400">Healthy</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 