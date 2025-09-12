"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  HiveCard as Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  HiveButton as Button,
  Badge,
  Progress,
  Alert,
  AlertDescription,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@hive/ui";
import { 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertCircle,
  XCircle,
  Gauge,
  BarChart3,
  LineChart,
  PieChart,
  Bell,
  Users
} from "lucide-react";

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  threshold?: {
    warning: number;
    critical: number;
  };
  trend?: 'up' | 'down' | 'stable';
  lastUpdated: Date;
  description?: string;
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  component: string;
  timestamp: Date;
  resolved?: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
}

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: number;
  responseTime: number;
  lastCheck: Date;
  issues?: string[];
}

export function PlatformHealthMonitor() {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data initialization - In production, this would come from monitoring systems
  useEffect(() => {
    initializeMockData();
    const cleanup = setupRealTimeSubscriptions();
    return cleanup;
  }, [setupRealTimeSubscriptions]);

  const initializeMockData = () => {
    const mockMetrics: HealthMetric[] = [
      {
        id: 'cpu-usage',
        name: 'CPU Usage',
        value: 45,
        unit: '%',
        status: 'healthy',
        threshold: { warning: 70, critical: 90 },
        trend: 'stable',
        lastUpdated: new Date(),
        description: 'Server CPU utilization'
      },
      {
        id: 'memory-usage',
        name: 'Memory Usage',
        value: 62,
        unit: '%',
        status: 'healthy',
        threshold: { warning: 80, critical: 95 },
        trend: 'up',
        lastUpdated: new Date(),
        description: 'Server memory utilization'
      },
      {
        id: 'active-users',
        name: 'Active Users',
        value: 1247,
        unit: 'users',
        status: 'healthy',
        trend: 'up',
        lastUpdated: new Date(),
        description: 'Currently active users'
      },
      {
        id: 'api-response-time',
        name: 'API Response Time',
        value: 145,
        unit: 'ms',
        status: 'healthy',
        threshold: { warning: 500, critical: 1000 },
        trend: 'stable',
        lastUpdated: new Date(),
        description: 'Average API response time'
      },
      {
        id: 'error-rate',
        name: 'Error Rate',
        value: 0.12,
        unit: '%',
        status: 'healthy',
        threshold: { warning: 1, critical: 5 },
        trend: 'down',
        lastUpdated: new Date(),
        description: 'Application error rate'
      },
      {
        id: 'database-connections',
        name: 'DB Connections',
        value: 23,
        unit: 'connections',
        status: 'healthy',
        threshold: { warning: 80, critical: 95 },
        trend: 'stable',
        lastUpdated: new Date(),
        description: 'Active database connections'
      }
    ];

    const mockAlerts: SystemAlert[] = [
      {
        id: '1',
        type: 'warning',
        title: 'High Memory Usage',
        message: 'Memory usage has been above 60% for the last 30 minutes',
        component: 'Web Server',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      },
      {
        id: '2',
        type: 'info',
        title: 'Feature Flag Updated',
        message: 'Feature flag "new-dashboard" was activated',
        component: 'Feature Flags',
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        resolved: true,
        resolvedAt: new Date(Date.now() - 600000),
        resolvedBy: 'admin@hive.com'
      }
    ];

    const mockServices: ServiceStatus[] = [
      {
        name: 'Web Application',
        status: 'operational',
        uptime: 99.9,
        responseTime: 145,
        lastCheck: new Date()
      },
      {
        name: 'API Server',
        status: 'operational',
        uptime: 99.8,
        responseTime: 120,
        lastCheck: new Date()
      },
      {
        name: 'Database',
        status: 'operational',
        uptime: 100,
        responseTime: 15,
        lastCheck: new Date()
      },
      {
        name: 'File Storage',
        status: 'operational',
        uptime: 99.7,
        responseTime: 85,
        lastCheck: new Date()
      },
      {
        name: 'Authentication',
        status: 'degraded',
        uptime: 98.9,
        responseTime: 250,
        lastCheck: new Date(),
        issues: ['Intermittent login delays']
      }
    ];

    setHealthMetrics(mockMetrics);
    setSystemAlerts(mockAlerts);
    setServiceStatuses(mockServices);
    setLoading(false);
  };

  const setupRealTimeSubscriptions = useCallback(() => {
    // In production, set up real-time subscriptions to monitoring data
    // For now, simulate real-time updates
    const interval = setInterval(() => {
      updateMetricsWithRandomData();
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [updateMetricsWithRandomData]);

  const updateMetricsWithRandomData = useCallback(() => {
    setHealthMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.value + (Math.random() - 0.5) * (metric.value * 0.1),
      lastUpdated: new Date(),
      status: calculateMetricStatus(metric.value, metric.threshold)
    })));
  }, []);

  const calculateMetricStatus = (value: number, threshold?: { warning: number; critical: number }): HealthMetric['status'] => {
    if (!threshold) return 'healthy';
    
    if (value >= threshold.critical) return 'critical';
    if (value >= threshold.warning) return 'warning';
    return 'healthy';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy': return 'text-green-400';
      case 'degraded':
      case 'warning': return 'text-yellow-400';
      case 'outage':
      case 'critical': return 'text-red-400';
      case 'maintenance':
      case 'unknown': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'degraded':
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'outage':
      case 'critical': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'maintenance':
      case 'unknown': return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-400" />;
      default: return null;
    }
  };

  const getOverallHealth = () => {
    const criticalCount = healthMetrics.filter(m => m.status === 'critical').length;
    const warningCount = healthMetrics.filter(m => m.status === 'warning').length;
    
    if (criticalCount > 0) return { status: 'critical', message: `${criticalCount} critical issues` };
    if (warningCount > 0) return { status: 'warning', message: `${warningCount} warnings` };
    return { status: 'healthy', message: 'All systems operational' };
  };

  const overallHealth = getOverallHealth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading platform health data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Platform Health Monitor</h2>
          <p className="text-gray-400">Real-time system health and performance metrics</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={(value: string) => setTimeRange(value as '1h' | '24h' | '7d' | '30d')}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overall Health Status */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getStatusIcon(overallHealth.status)}
              <div>
                <h3 className="text-lg font-semibold text-white">System Status</h3>
                <p className={getStatusColor(overallHealth.status)}>
                  {overallHealth.message}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm text-gray-400">Uptime (30 days)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthMetrics.slice(0, 6).map((metric) => (
              <Card key={metric.id} className="border-gray-700 bg-gray-900/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{metric.name}</h4>
                    {getStatusIcon(metric.status)}
                  </div>
                  
                  <div className="flex items-end gap-2 mb-2">
                    <div className="text-2xl font-bold text-white">
                      {typeof metric.value === 'number' ? metric.value.toFixed(metric.unit === '%' ? 1 : 0) : metric.value}
                    </div>
                    <div className="text-sm text-gray-400 mb-1">{metric.unit}</div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  
                  {metric.threshold && (
                    <Progress 
                      value={(metric.value / metric.threshold.critical) * 100} 
                      className="h-2"
                    />
                  )}
                  
                  <div className="text-xs text-gray-500 mt-2">
                    Updated {metric.lastUpdated.toLocaleTimeString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Alerts */}
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.slice(0, 5).map((alert) => (
                  <Alert 
                    key={alert.id} 
                    className={`border-l-4 ${
                      alert.type === 'error' ? 'border-l-red-500' :
                      alert.type === 'warning' ? 'border-l-yellow-500' :
                      'border-l-blue-500'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{alert.title}</div>
                          <div className="text-sm text-gray-400 mt-1">{alert.message}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {alert.component} • {alert.timestamp.toLocaleString()}
                          </div>
                        </div>
                        {alert.resolved && (
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            Resolved
                          </Badge>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          {/* All Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {healthMetrics.map((metric) => (
              <Card key={metric.id} className="border-gray-700 bg-gray-900/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-5 h-5" />
                      {metric.name}
                    </div>
                    {getStatusIcon(metric.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-end gap-2">
                      <div className="text-3xl font-bold text-white">
                        {typeof metric.value === 'number' ? metric.value.toFixed(metric.unit === '%' ? 1 : 0) : metric.value}
                      </div>
                      <div className="text-gray-400 mb-1">{metric.unit}</div>
                      {getTrendIcon(metric.trend)}
                    </div>
                    
                    {metric.threshold && (
                      <div className="space-y-2">
                        <Progress 
                          value={(metric.value / metric.threshold.critical) * 100} 
                          className="h-3"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0</span>
                          <span className="text-yellow-400">Warning: {metric.threshold.warning}</span>
                          <span className="text-red-400">Critical: {metric.threshold.critical}</span>
                        </div>
                      </div>
                    )}
                    
                    {metric.description && (
                      <p className="text-sm text-gray-400">{metric.description}</p>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      Last updated: {metric.lastUpdated.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          {/* Service Status */}
          <div className="grid gap-4">
            {serviceStatuses.map((service, index) => (
              <Card key={index} className="border-gray-700 bg-gray-900/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <h4 className="font-medium text-white">{service.name}</h4>
                        <p className={`text-sm capitalize ${getStatusColor(service.status)}`}>
                          {service.status}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-white">{service.uptime}%</div>
                        <div className="text-gray-400">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-white">{service.responseTime}ms</div>
                        <div className="text-gray-400">Response</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-white">
                          {service.lastCheck.toLocaleTimeString()}
                        </div>
                        <div className="text-gray-400">Last Check</div>
                      </div>
                    </div>
                  </div>
                  
                  {service.issues && service.issues.length > 0 && (
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="text-sm text-yellow-300">
                        <strong>Issues:</strong> {service.issues.join(', ')}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          {/* System Alerts */}
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 ${
                          alert.type === 'error' ? 'text-red-400' :
                          alert.type === 'warning' ? 'text-yellow-400' :
                          'text-blue-400'
                        }`}>
                          <AlertCircle className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{alert.title}</h4>
                          <p className="text-gray-300 mt-1">{alert.message}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{alert.component}</span>
                            <span>{alert.timestamp.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {alert.resolved ? (
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            Resolved
                          </Badge>
                        ) : (
                          <Button size="sm" variant="ghost">
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {alert.resolved && alert.resolvedAt && (
                      <div className="mt-3 pt-3 border-t border-gray-700 text-sm text-gray-500">
                        Resolved by {alert.resolvedBy} on {alert.resolvedAt.toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-gray-700 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Response Time Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center text-gray-400">
                  Charts integration placeholder
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-700 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Error Rate Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center text-gray-400">
                  Charts integration placeholder
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-700 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Resource Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center text-gray-400">
                  Charts integration placeholder
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-700 bg-gray-900/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center text-gray-400">
                  Charts integration placeholder
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}