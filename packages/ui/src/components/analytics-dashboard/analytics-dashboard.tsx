"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../hive-progress";
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
  Zap,
  Globe,
  Code,
  Award,
} from "lucide-react";

// Analytics data interface
export interface HiveAnalyticsData {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalSpaces: number;
    totalTools: number;
    spacesCreated: number;
    toolsBuilt: number;
    engagementRate: number;
    retentionRate: number;
  };
  performance: {
    pageLoadTime: number;
    apiResponseTime: number;
    errorRate: number;
    uptime: number;
    successRate: number;
  };
  usage: {
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
    sessionDuration: number;
    pageViews: number;
  };
  growth: {
    userGrowth: number;
    spaceGrowth: number;
    toolGrowth: number;
    engagementGrowth: number;
  };
  trends: {
    userGrowth: number;
    spaceGrowth: number;
    toolAdoption: number;
    platformHealth: number;
  };
  engagement: {
    dailyActiveUsers: number;
    averageSessionTime: number;
    toolUsageRate: number;
  };
  realTimeMetrics: {
    toolsInUse: number;
  };
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  description?: string;
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon,
  description,
}: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="text-gold">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-[var(--hive-text-primary)] mb-1">{value}</div>
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
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp: string;
  component?: string;
}

function AlertItem({
  severity,
  message,
  timestamp,
  component,
}: AlertItemProps) {
  const getSeverityColor = () => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  const getSeverityIcon = () => {
    switch (severity) {
      case "critical":
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 border border-[var(--hive-border-default)] rounded-lg">
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
        <p className="text-sm text-[var(--hive-text-primary)]">{message}</p>
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {timestamp}
        </p>
      </div>
    </div>
  );
}

interface PerformanceChartProps {
  data: Array<{ time: string; value: number }>;
  title: string;
  unit?: string;
}

function PerformanceChart({ data, title, unit = "ms" }: PerformanceChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

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
              minHeight: "0.5",
            }}
          >
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded text-xs text-[var(--hive-text-primary)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {point.value}
              {unit} at {point.time}
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
  const [timeRange, setTimeRange] = useState<"1h" | "24h" | "7d" | "30d">(
    "24h"
  );
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
      setMockData((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        pageViews: prev.pageViews + Math.floor(Math.random() * 50),
        avgResponseTime:
          prev.avgResponseTime + Math.floor(Math.random() * 20 - 10),
      })});
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const mockAlerts: AlertItemProps[] = [
    {
      severity: "high",
      message: "API response time exceeded threshold (>3s)",
      timestamp: "2 minutes ago",
      component: "Space API",
    },
    {
      severity: "medium",
      message: "Higher than usual error rate in Creator Tools",
      timestamp: "15 minutes ago",
      component: "Tool Builder",
    },
    {
      severity: "low",
      message: "Memory usage increased by 15%",
      timestamp: "1 hour ago",
      component: "Main App",
    },
  ];

  const mockPerformanceData = [
    { time: "12:00", value: 245 },
    { time: "12:15", value: 267 },
    { time: "12:30", value: 234 },
    { time: "12:45", value: 289 },
    { time: "13:00", value: 256 },
    { time: "13:15", value: 278 },
    { time: "13:30", value: 245 },
    { time: "13:45", value: 234 },
    { time: "14:00", value: 267 },
    { time: "14:15", value: 289 },
  ];

  const mockCoreWebVitals = {
    lcp: { value: 1.2, rating: "good" as const },
    fid: { value: 45, rating: "good" as const },
    cls: { value: 0.08, rating: "needs-improvement" as const },
  };

  const getWebVitalColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "text-green-400";
      case "needs-improvement":
        return "text-yellow-400";
      case "poor":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--hive-text-primary)]">
              Analytics Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Real-time insights and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-green-400 border-green-400"
            >
              Live
            </Badge>
            <select
              value={timeRange}
              onChange={(e) => {
                const value = e.target.value as "1h" | "24h" | "7d" | "30d";
                if (["1h", "24h", "7d", "30d"].includes(value)) {
                  setTimeRange(value);
                }
              }}
              className="bg-gray-900 border border-[var(--hive-border-default)] rounded px-3 py-1 text-sm text-[var(--hive-text-primary)]"
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
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
                Performance Trends
              </h2>
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
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
                Core Web Vitals
              </h2>
              <Activity className="h-5 w-5 text-gold" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Largest Contentful Paint (LCP)
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${getWebVitalColor(mockCoreWebVitals.lcp.rating)}`}
                  >
                    {mockCoreWebVitals.lcp.value}s
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getWebVitalColor(mockCoreWebVitals.lcp.rating)} border-current`}
                  >
                    {mockCoreWebVitals.lcp.rating.replace("-", " ")}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  First Input Delay (FID)
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${getWebVitalColor(mockCoreWebVitals.fid.rating)}`}
                  >
                    {mockCoreWebVitals.fid.value}ms
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getWebVitalColor(mockCoreWebVitals.fid.rating)} border-current`}
                  >
                    {mockCoreWebVitals.fid.rating.replace("-", " ")}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Cumulative Layout Shift (CLS)
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${getWebVitalColor(mockCoreWebVitals.cls.rating)}`}
                  >
                    {mockCoreWebVitals.cls.value}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getWebVitalColor(mockCoreWebVitals.cls.rating)} border-current`}
                  >
                    {mockCoreWebVitals.cls.rating.replace("-", " ")}
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
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">Live Alerts</h2>
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
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
                System Health
              </h2>
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

// HIVE Overview Analytics Component
interface HiveOverviewAnalyticsProps {
  data: HiveAnalyticsData;
  formatNumber: (num: number) => string;
  getTrendIndicator: (value: number, isPositive?: boolean) => { color: string; arrow: string };
}

function HiveOverviewAnalytics({ data, formatNumber, getTrendIndicator }: HiveOverviewAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Key Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Total Users</h3>
                <p className="text-sm text-hive-text-mutedLight">Platform-wide</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-400">
              {formatNumber(data.overview.totalUsers)}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${getTrendIndicator(data.trends.userGrowth).color}`}>
                {getTrendIndicator(data.trends.userGrowth).arrow} {data.trends.userGrowth}%
              </span>
              <span className="text-xs text-hive-text-mutedLight">this month</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Spaces Created</h3>
                <p className="text-sm text-hive-text-mutedLight">Community hubs</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-400">
              {formatNumber(data.overview.spacesCreated)}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${getTrendIndicator(data.trends.spaceGrowth).color}`}>
                {getTrendIndicator(data.trends.spaceGrowth).arrow} {data.trends.spaceGrowth}%
              </span>
              <span className="text-xs text-hive-text-mutedLight">this month</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Tools Built</h3>
                <p className="text-sm text-hive-text-mutedLight">Student creations</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-green-400">
              {formatNumber(data.overview.toolsBuilt)}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${getTrendIndicator(data.trends.toolAdoption).color}`}>
                {getTrendIndicator(data.trends.toolAdoption).arrow} {data.trends.toolAdoption}%
              </span>
              <span className="text-xs text-hive-text-mutedLight">this month</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Platform Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-hive-gold" />
              <span>Platform Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-hive-gold mb-2">
                {data.trends.platformHealth}%
              </div>
              <p className="text-sm text-hive-text-mutedLight">Overall Health Score</p>
            </div>
            <Progress value={data.trends.platformHealth} className="h-3" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-hive-text-mutedLight">Uptime</span>
                <span className="text-green-400">{data.performance.uptime}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-hive-text-mutedLight">Success Rate</span>
                <span className="text-green-400">{data.performance.successRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-hive-text-mutedLight">Response Time</span>
                <span className="text-blue-400">{data.performance.apiResponseTime}ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-hive-text-mutedLight">Error Rate</span>
                <span className="text-orange-400">{(data.performance.errorRate * 100).toFixed(2)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-hive-gold" />
              <span>Growth Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-hive-text-mutedLight">User Growth</span>
                <div className="flex items-center space-x-2">
                  <Progress value={Math.abs(data.trends.userGrowth) * 8} className="w-20 h-2" />
                  <span className={`text-sm font-medium ${getTrendIndicator(data.trends.userGrowth).color}`}>
                    {data.trends.userGrowth}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-hive-text-mutedLight">Space Creation</span>
                <div className="flex items-center space-x-2">
                  <Progress value={Math.abs(data.trends.spaceGrowth) * 8} className="w-20 h-2" />
                  <span className={`text-sm font-medium ${getTrendIndicator(data.trends.spaceGrowth).color}`}>
                    {data.trends.spaceGrowth}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-hive-text-mutedLight">Tool Adoption</span>
                <div className="flex items-center space-x-2">
                  <Progress value={Math.abs(data.trends.toolAdoption) * 8} className="w-20 h-2" />
                  <span className={`text-sm font-medium ${getTrendIndicator(data.trends.toolAdoption).color}`}>
                    {data.trends.toolAdoption}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// HIVE Performance Analytics Component
function HivePerformanceAnalytics({ data }: { data: HiveAnalyticsData; formatNumber: (num: number) => string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <Zap className="h-8 w-8 mx-auto mb-3 text-blue-400" />
          <div className="text-2xl font-bold text-white">{data.performance.pageLoadTime}s</div>
          <div className="text-sm text-hive-text-mutedLight">Page Load Time</div>
        </Card>
        <Card className="p-6 text-center">
          <Activity className="h-8 w-8 mx-auto mb-3 text-green-400" />
          <div className="text-2xl font-bold text-white">{data.performance.apiResponseTime}ms</div>
          <div className="text-sm text-hive-text-mutedLight">API Response</div>
        </Card>
        <Card className="p-6 text-center">
          <CheckCircle className="h-8 w-8 mx-auto mb-3 text-green-400" />
          <div className="text-2xl font-bold text-white">{data.performance.uptime}%</div>
          <div className="text-sm text-hive-text-mutedLight">Uptime</div>
        </Card>
        <Card className="p-6 text-center">
          <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-orange-400" />
          <div className="text-2xl font-bold text-white">{(data.performance.errorRate * 100).toFixed(2)}%</div>
          <div className="text-sm text-hive-text-mutedLight">Error Rate</div>
        </Card>
      </div>
    </div>
  );
}

// HIVE Engagement Analytics Component
function HiveEngagementAnalytics({ data, formatNumber, getTrendIndicator }: HiveOverviewAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Daily Active Users</h3>
            <Users className="h-5 w-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {formatNumber(data.engagement.dailyActiveUsers)}
          </div>
          <Progress value={75} className="h-2 mb-2" />
          <p className="text-xs text-hive-text-mutedLight">+12% vs last week</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Session Time</h3>
            <Clock className="h-5 w-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400 mb-2">
            {data.engagement.averageSessionTime}m
          </div>
          <Progress value={85} className="h-2 mb-2" />
          <p className="text-xs text-hive-text-mutedLight">Average per user</p>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Tool Usage</h3>
            <Code className="h-5 w-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {data.engagement.toolUsageRate}%
          </div>
          <Progress value={data.engagement.toolUsageRate} className="h-2 mb-2" />
          <p className="text-xs text-hive-text-mutedLight">User adoption rate</p>
        </Card>
      </div>
    </div>
  );
}

// HIVE Tools Analytics Component
function HiveToolsAnalytics({ data, formatNumber }: { data: HiveAnalyticsData; formatNumber: (num: number) => string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-hive-gold" />
              <span>Tool Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {formatNumber(data.overview.toolsBuilt)}
                </div>
                <p className="text-sm text-hive-text-mutedLight">Total Built</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {formatNumber(data.realTimeMetrics.toolsInUse)}
                </div>
                <p className="text-sm text-hive-text-mutedLight">Currently Active</p>
              </div>
            </div>
            <Progress value={data.engagement.toolUsageRate} className="h-3" />
            <p className="text-xs text-center text-hive-text-mutedLight">
              {data.engagement.toolUsageRate}% adoption rate
            </p>
          </CardContent>
        </Card>
        
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-hive-gold" />
              <span>Popular Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Academic Tools', usage: 89, color: 'bg-blue-500' },
              { name: 'Productivity', usage: 76, color: 'bg-green-500' },
              { name: 'Social Features', usage: 64, color: 'bg-purple-500' },
              { name: 'Utilities', usage: 52, color: 'bg-orange-500' }
            ].map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">{category.name}</span>
                  <span className="text-hive-text-mutedLight">{category.usage}%</span>
                </div>
                <div className="w-full bg-hive-background-tertiary rounded-full h-2">
                  <div 
                    className={`${category.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${category.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
