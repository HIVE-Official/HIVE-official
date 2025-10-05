"use client";

import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Button,
  Badge,
  Progress,
  Alert,
  AlertDescription
} from '@hive/ui';
import {
  Activity,
  Wifi,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Users,
  MessageSquare,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Settings
} from 'lucide-react';
import { useRealtimePerformance } from '@/hooks/use-realtime-performance';

interface SystemMetrics {
  totalConnections: number;
  activeConnections: number;
  messagesPerSecond: number;
  averageLatency: number;
  errorRate: number;
  memoryUsage: number;
  cpuUsage: number;
  lastUpdated: number;
}

interface PerformanceConfig {
  enableAutoOptimization: boolean;
  alertThresholds: {
    maxLatency: number;
    maxErrorRate: number;
    maxMemoryUsage: number;
    maxBandwidthUsage: number;
  };
}

export function RealtimePerformanceDashboard() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [config, setConfig] = useState<PerformanceConfig>({
    enableAutoOptimization: true,
    alertThresholds: {
      maxLatency: 2000,
      maxErrorRate: 0.05,
      maxMemoryUsage: 100,
      maxBandwidthUsage: 1000
    }
  });

  const [performanceMetrics, connectionHealth, alerts, performanceActions] = useRealtimePerformance({
    enableMetrics: true,
    enableAlerts: true,
    alertThresholds: config.alertThresholds,
    onAlert: (alert) => {
    },
    onQualityChange: (quality) => {
    }
  });

  // Fetch system metrics from the API
  useEffect(() => {
    fetchSystemMetrics();
    const interval = setInterval(fetchSystemMetrics, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSystemMetrics = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/realtime/metrics?includeConnections=true');
      if (response.ok) {
        const data = await response.json();
        setSystemMetrics(data.metrics.current);
      }
    } catch (error) {
      // Intentionally suppressed - non-critical error
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimizationToggle = async () => {
    try {
      const response = await fetch('/api/realtime/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_config',
          configuration: {
            ...config,
            enableAutoOptimization: !config.enableAutoOptimization
          }
        })
      });

      if (response.ok) {
        setConfig(prev => ({
          ...prev,
          enableAutoOptimization: !prev.enableAutoOptimization
        }));
      }
    } catch (error) {
      // Intentionally suppressed - non-critical error
    }
  };

  const handleForceHealthCheck = async () => {
    try {
      await fetch('/api/realtime/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'force_health_check' })
      });
      await fetchSystemMetrics();
    } catch (error) {
      // Intentionally suppressed - non-critical error
    }
  };

  const getStatusColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'poor': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'connecting': return <RefreshCw className="h-5 w-5 text-yellow-500 animate-spin" />;
      case 'disconnected': return <XCircle className="h-5 w-5 text-gray-500" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatLatency = (latency: number) => {
    return latency > 0 ? `${Math.round(latency)}ms` : 'N/A';
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 10) / 10} ${sizes[i]}`;
  };

  if (isLoading && !systemMetrics) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Loading performance metrics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Real-time Performance</h1>
          <p className="text-gray-400">Monitor and optimize real-time system performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleForceHealthCheck}
            variant="outline"
            className="max-w-sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Health Check
          </Button>
          
          <Button
            onClick={handleOptimizationToggle}
            variant={config.enableAutoOptimization ? "default" : "outline"}
            className="max-w-sm"
          >
            <Settings className="h-4 w-4 mr-2" />
            Auto-Optimization {config.enableAutoOptimization ? 'ON' : 'OFF'}
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.filter(alert => !alert.acknowledged).slice(0, 3).map((alert) => (
            <Alert key={alert.id} variant={alert.severity === 'critical' ? 'destructive' : 'default'}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{alert.message}</span>
                <Button
                  onClick={() => performanceActions.acknowledgeAlert(alert.id)}
                  className="max-w-sm"
                  variant="outline"
                >
                  Acknowledge
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Connection Status */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              {getStatusIcon(connectionHealth.status)}
              <span>Connection Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Quality</span>
                <Badge className={getStatusColor(connectionHealth.quality)}>
                  {connectionHealth.quality.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Uptime</span>
                <span className="text-sm text-white">
                  {Math.round(connectionHealth.uptime / 1000 / 60)}m
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Connections */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Connections</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {systemMetrics?.activeConnections || 0}
              </div>
              <div className="text-sm text-gray-400">
                {systemMetrics?.totalConnections || 0} total
              </div>
              <Progress 
                value={(systemMetrics?.activeConnections || 0) / Math.max(systemMetrics?.totalConnections || 1, 1) * 100}
                className="w-full h-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Message Throughput */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <span>Messages/sec</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {Math.round(systemMetrics?.messagesPerSecond || 0)}
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-gray-400">Processing normally</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Latency */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span>Avg Latency</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {formatLatency(systemMetrics?.averageLatency || performanceMetrics.connectionLatency)}
              </div>
              <div className="flex items-center space-x-1 text-sm">
                {(systemMetrics?.averageLatency || performanceMetrics.connectionLatency) > config.alertThresholds.maxLatency ? (
                  <>
                    <TrendingDown className="h-3 w-3 text-red-500" />
                    <span className="text-red-400">High latency</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-gray-400">Normal</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Breakdown */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-500" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Error Rate</div>
                <div className="text-lg font-semibold text-white">
                  {((systemMetrics?.errorRate || 0) * 100).toFixed(2)}%
                </div>
                <Progress 
                  value={(systemMetrics?.errorRate || 0) / config.alertThresholds.maxErrorRate * 100}
                  className="w-full h-1 mt-1"
                />
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-1">Memory Usage</div>
                <div className="text-lg font-semibold text-white">
                  {Math.round(systemMetrics?.memoryUsage || performanceMetrics.memoryUsage)}MB
                </div>
                <Progress 
                  value={(systemMetrics?.memoryUsage || performanceMetrics.memoryUsage) / config.alertThresholds.maxMemoryUsage * 100}
                  className="w-full h-1 mt-1"
                />
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-1">Bandwidth</div>
                <div className="text-lg font-semibold text-white">
                  {formatBytes(performanceMetrics.bandwidthUsage)}/s
                </div>
                <Progress 
                  value={performanceMetrics.bandwidthUsage / config.alertThresholds.maxBandwidthUsage * 100}
                  className="w-full h-1 mt-1"
                />
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-1">Messages</div>
                <div className="text-lg font-semibold text-white">
                  {performanceMetrics.messagesReceived + performanceMetrics.messagesSent}
                </div>
                <div className="text-xs text-gray-500">
                  {performanceMetrics.messagesReceived} in, {performanceMetrics.messagesSent} out
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Health */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wifi className="h-5 w-5 text-blue-500" />
              <span>Connection Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Issues */}
            <div>
              <div className="text-sm font-medium text-white mb-2">Current Issues</div>
              {connectionHealth.issues.length === 0 ? (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">No issues detected</span>
                </div>
              ) : (
                <div className="space-y-1">
                  {connectionHealth.issues.map((issue, index) => (
                    <div key={index} className="flex items-center space-x-2 text-yellow-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div>
              <div className="text-sm font-medium text-white mb-2">Recommendations</div>
              {connectionHealth.recommendations.length === 0 ? (
                <div className="text-sm text-gray-400">System operating optimally</div>
              ) : (
                <div className="space-y-1">
                  {connectionHealth.recommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className="text-sm text-blue-400">
                      • {rec}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2 pt-2">
              <Button
                onClick={performanceActions.runSpeedTest}
                className="max-w-sm"
                variant="outline"
              >
                <Zap className="h-4 w-4 mr-1" />
                Speed Test
              </Button>
              
              <Button
                onClick={performanceActions.optimizeConnection}
                className="max-w-sm"
                variant="outline"
              >
                <Settings className="h-4 w-4 mr-1" />
                Optimize
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts History */}
      {alerts.length > 0 && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Recent Alerts</span>
            </CardTitle>
            <Button
              onClick={performanceActions.clearAlerts}
              className="max-w-sm"
              variant="outline"
            >
              Clear All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-2 rounded border border-gray-800">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={alert.severity === 'critical' ? 'destructive' : 'default'}
                      className="text-xs"
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-sm text-white">{alert.message}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  {!alert.acknowledged && (
                    <Button
                      onClick={() => performanceActions.acknowledgeAlert(alert.id)}
                      className="max-w-sm"
                      variant="outline"
                      className="text-xs"
                    >
                      Ack
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}