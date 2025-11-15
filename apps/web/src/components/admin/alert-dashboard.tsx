'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui';
import { Button } from '@hive/ui';
import { Badge } from '@hive/ui';
import { Tabs, TabsTrigger } from '@hive/ui';
import { Alert, AlertDescription } from '@hive/ui';
import { Dialog, DialogDescription, DialogTrigger } from '@hive/ui';
import { Input } from '@hive/ui';
import { Textarea } from '@hive/ui';
import { Switch } from '@hive/ui';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Shield,
  Database,
  Zap,
  Users,
  Bell,
  BellOff,
  Filter,
  Search,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  ExternalLink,
  MessageSquare,
  User,
  Calendar,
  Activity,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { secureApiFetch } from '@/lib/secure-auth-utils';

interface Alert {
  id: string;
  type: 'system' | 'performance' | 'security' | 'user_impact';
  severity: 'critical' | 'high' | 'medium' | 'low';
  component: string;
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  acknowledged: boolean;
  assignee: string | null;
  tags: string[];
  metadata: {
    source: string;
    context: Record<string, any>;
    [key: string]: any;
  };
}

interface AlertSummary {
  total: number;
  active: number;
  resolved: number;
  acknowledged: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'critical' | 'high' | 'medium' | 'low';
  affectedUsers: string;
  startedAt: string;
  lastUpdate: string;
  assignee: string;
  updates: Array<{
    timestamp: string;
    status: string;
    message: string;
  }>;
}

interface AlertsData {
  summary: AlertSummary;
  active: {
    critical: Alert[];
    high: Alert[];
    medium: Alert[];
    low: Alert[];
  };
  incidents: Incident[];
  categories: {
    system: Alert[];
    performance: Alert[];
    security: Alert[];
    userImpact: Alert[];
  };
  trends: {
    alertsPerHour: Array<{ hour: string; count: number }>;
    resolutionTime: { average: number; median: number };
    falsePositiveRate: number;
  };
}

export function AlertDashboard() {
  const [alertsData, setAlertsData] = useState<AlertsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [filters, setFilters] = useState({
    severity: '',
    component: '',
    resolved: false,
    search: ''
  });

  // CSRF token is provided via <meta name="csrf-token"> in admin head

  useEffect(() => {
    loadAlerts();
  }, [filters]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadAlerts();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, filters]);

  const loadAlerts = async () => {
    try {
      const params = new URLSearchParams({
        range: '24h',
        ...(filters.severity && { severity: filters.severity }),
        ...(filters.component && { component: filters.component })
      });

      const response = await secureApiFetch(`/api/admin/alerts?${params}`);

      if (!response.ok) {
        throw new Error('Failed to load alerts');
      }

      const data = await response.json();
      setAlertsData(data.alerts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleAlertAction = async (alertId: string, action: string, notes?: string) => {
    try {
      const response = await secureApiFetch('/api/admin/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId, action, notes })
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} alert`);
      }

      // Reload alerts to reflect changes
      await loadAlerts();
      setSelectedAlert(null);
    } catch (err) {
      console.error(`Error ${action} alert:`, err);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'high':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Database className="w-4 h-4" />;
      case 'performance':
        return <Zap className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'user_impact':
        return <Users className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredAlerts = (alerts: Alert[]) => {
    return alerts.filter(alert => {
      if (filters.resolved && !alert.resolved) return false;
      if (filters.search && !alert.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !alert.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)]"></div>
      </div>
    );
  }

  if (error || !alertsData) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load alerts: {error}
        </AlertDescription>
      </Alert>
    );
  }

  const { summary, active, incidents, categories, trends } = alertsData;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Alert Dashboard</h2>
          <p className="text-gray-400 mt-1">Real-time system monitoring and alerting</p>
        </div>

        <div className="flex items-center gap-4">
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
          <Button onClick={loadAlerts} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-red-600/20 to-red-800/20 border-red-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{summary.critical}</div>
            <p className="text-xs text-gray-400">
              {summary.critical > 0 ? 'Immediate attention required' : 'No critical issues'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border-orange-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <ArrowUp className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">{summary.high}</div>
            <p className="text-xs text-gray-400">
              Require prompt attention
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{summary.active}</div>
            <p className="text-xs text-gray-400">
              {summary.acknowledged} acknowledged
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{trends.resolutionTime.average}m</div>
            <p className="text-xs text-gray-400">
              Average resolution time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Incidents Banner */}
      {incidents.length > 0 && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">
            <strong>{incidents.length} active incident{incidents.length > 1 ? 's' : ''}</strong> requiring attention
          </AlertDescription>
        </Alert>
      )}

      {/* Main Alert Interface */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-gray-900 border border-gray-800">
          <TabsTrigger value="active">
            Active ({summary.active})
          </TabsTrigger>
          <TabsTrigger value="incidents">
            Incidents ({incidents.length})
          </TabsTrigger>
          <TabsTrigger value="categories">
            By Category
          </TabsTrigger>
          <TabsTrigger value="trends">
            Trends
          </TabsTrigger>
          <TabsTrigger value="settings">
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Active Alerts Tab */}
        <TabsContent value="active" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search alerts..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <select
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              value={filters.severity}
              onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
            >
              <option value="">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              value={filters.component}
              onChange={(e) => setFilters(prev => ({ ...prev, component: e.target.value }))}
            >
              <option value="">All Components</option>
              <option value="database">Database</option>
              <option value="api">API</option>
              <option value="authentication">Authentication</option>
              <option value="security">Security</option>
            </select>
          </div>

          {/* Critical Alerts */}
          {active.critical.length > 0 && (
            <Card className="border-red-500/30 bg-red-500/5">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Critical Alerts ({active.critical.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredAlerts(active.critical).map((alert) => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onSelect={setSelectedAlert}
                      onAction={handleAlertAction}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* High Priority Alerts */}
          {active.high.length > 0 && (
            <Card className="border-orange-500/30 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2">
                  <ArrowUp className="w-5 h-5" />
                  High Priority Alerts ({active.high.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredAlerts(active.high).map((alert) => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onSelect={setSelectedAlert}
                      onAction={handleAlertAction}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Medium & Low Priority */}
          <div className="grid gap-4 md:grid-cols-2">
            {active.medium.length > 0 && (
              <Card className="border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400 text-sm">Medium Priority ({active.medium.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredAlerts(active.medium).slice(0, 5).map((alert) => (
                      <AlertCard
                        key={alert.id}
                        alert={alert}
                        onSelect={setSelectedAlert}
                        onAction={handleAlertAction}
                        compact
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {active.low.length > 0 && (
              <Card className="border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400 text-sm">Low Priority ({active.low.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {filteredAlerts(active.low).slice(0, 5).map((alert) => (
                      <AlertCard
                        key={alert.id}
                        alert={alert}
                        onSelect={setSelectedAlert}
                        onAction={handleAlertAction}
                        compact
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Incidents Tab */}
        <TabsContent value="incidents" className="space-y-4">
          {incidents.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-gray-400">No active incidents</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <CategoryCard
              title="System Alerts"
              alerts={categories.system}
              icon={<Database className="w-5 h-5" />}
              color="blue"
            />
            <CategoryCard
              title="Performance"
              alerts={categories.performance}
              icon={<Zap className="w-5 h-5" />}
              color="yellow"
            />
            <CategoryCard
              title="Security"
              alerts={categories.security}
              icon={<Shield className="w-5 h-5" />}
              color="red"
            />
            <CategoryCard
              title="User Impact"
              alerts={categories.userImpact}
              icon={<Users className="w-5 h-5" />}
              color="purple"
            />
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Alert Volume Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {trends.alertsPerHour.reduce((sum, hour) => sum + hour.count, 0)}
                </div>
                <p className="text-xs text-gray-400">Total alerts (24h)</p>
                <div className="mt-4 space-y-1">
                  {trends.alertsPerHour.slice(-6).map((hour, index) => (
                    <div key={hour.hour} className="flex justify-between text-xs">
                      <span className="text-gray-400">
                        {new Date(hour.hour).toLocaleTimeString([], { hour: '2-digit' })}
                      </span>
                      <span className="text-white">{hour.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Resolution Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {trends.resolutionTime.average}m
                </div>
                <p className="text-xs text-gray-400">Avg resolution time</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Median:</span>
                    <span className="text-white">{trends.resolutionTime.median}m</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">False positive rate:</span>
                    <span className="text-white">{trends.falsePositiveRate.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {summary.critical === 0 && summary.high <= 1 ? '98%' : '85%'}
                </div>
                <p className="text-xs text-gray-400">Overall health score</p>
                <div className="mt-4">
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: summary.critical === 0 && summary.high <= 1 ? '98%' : '85%' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>Configure alert thresholds and notification settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Real-time notifications</p>
                    <p className="text-sm text-gray-400">Push notifications for critical alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email summaries</p>
                    <p className="text-sm text-gray-400">Daily summary of all alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-acknowledge low priority</p>
                    <p className="text-sm text-gray-400">Automatically acknowledge low priority alerts after 1 hour</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <AlertDetailModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onAction={handleAlertAction}
        />
      )}
    </div>
  );
}

// Alert Card Component
function AlertCard({
  alert,
  onSelect,
  onAction,
  compact = false
}: {
  alert: Alert;
  onSelect: (alert: Alert) => void;
  onAction: (id: string, action: string, notes?: string) => void;
  compact?: boolean;
}) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div
      className={`p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer ${compact ? 'py-2' : ''}`}
      onClick={() => onSelect(alert)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
              {alert.severity.toUpperCase()}
            </Badge>
            <span className={`text-xs text-gray-400 ${compact ? 'hidden' : ''}`}>
              {alert.component}
            </span>
            <span className="text-xs text-gray-500">
              {formatRelativeTime(alert.timestamp)}
            </span>
          </div>
          <h4 className={`text-white font-medium ${compact ? 'text-sm' : ''}`}>
            {alert.title}
          </h4>
          {!compact && (
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
              {alert.description}
            </p>
          )}
          <div className="flex items-center gap-4 mt-2">
            {alert.acknowledged && (
              <span className="text-xs text-green-400 flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Acknowledged
              </span>
            )}
            {alert.assignee && (
              <span className="text-xs text-blue-400 flex items-center gap-1">
                <User className="w-3 h-3" />
                {alert.assignee}
              </span>
            )}
            {alert.tags.length > 0 && (
              <div className="flex gap-1">
                {alert.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs py-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          {!alert.acknowledged && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onAction(alert.id, 'acknowledge');
              }}
            >
              <Eye className="w-3 h-3" />
            </Button>
          )}
          {!alert.resolved && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onAction(alert.id, 'resolve');
              }}
            >
              <CheckCircle className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Incident Card Component
function IncidentCard({ incident }: { incident: Incident }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'investigating': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'identified': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'monitoring': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'resolved': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <Card className="border-orange-500/30 bg-orange-500/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <div>
              <CardTitle className="text-white">{incident.title}</CardTitle>
              <CardDescription className="text-gray-400">
                Started {new Date(incident.startedAt).toLocaleString()}
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(incident.status)}>
            {incident.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-gray-300">{incident.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Affected: {incident.affectedUsers}</span>
            <span>Assignee: {incident.assignee}</span>
            <span>Last update: {new Date(incident.lastUpdate).toLocaleString()}</span>
          </div>
          {incident.updates && incident.updates.length > 0 && (
            <div className="mt-4 border-t border-gray-700 pt-3">
              <h4 className="text-sm font-medium text-white mb-2">Recent Updates</h4>
              <div className="space-y-2">
                {incident.updates.slice(-2).map((update, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-gray-400">
                      {new Date(update.timestamp).toLocaleTimeString()} -
                    </span>
                    <span className="text-gray-300 ml-2">{update.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Category Card Component
function CategoryCard({
  title,
  alerts,
  icon,
  color
}: {
  title: string;
  alerts: Alert[];
  icon: React.ReactNode;
  color: string;
}) {
  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const colorClasses = {
    blue: 'border-blue-500/30 text-blue-400',
    yellow: 'border-yellow-500/30 text-yellow-400',
    red: 'border-red-500/30 text-red-400',
    purple: 'border-purple-500/30 text-purple-400'
  };

  return (
    <Card className={colorClasses[color as keyof typeof colorClasses]}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          {activeAlerts.length}
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Active alerts
        </p>
        {activeAlerts.length > 0 && (
          <div className="space-y-1">
            {activeAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="text-xs">
                <span className="text-white truncate block">
                  {alert.title}
                </span>
              </div>
            ))}
            {activeAlerts.length > 3 && (
              <p className="text-xs text-gray-400">
                +{activeAlerts.length - 3} more
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Alert Detail Modal Component
function AlertDetailModal({
  alert,
  onClose,
  onAction
}: {
  alert: Alert;
  onClose: () => void;
  onAction: (id: string, action: string, notes?: string) => void;
}) {
  const [notes, setNotes] = useState('');

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Badge className={`${alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`}>
              {alert.severity.toUpperCase()}
            </Badge>
            {alert.title}
          </DialogTitle>
          <DialogDescription>
            {alert.type} • {alert.component} • {new Date(alert.timestamp).toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-gray-300">{alert.description}</p>
          </div>

          {alert.metadata?.context && Object.keys(alert.metadata.context).length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Context</h4>
              <pre className="bg-gray-800 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(alert.metadata.context, null, 2)}
              </pre>
            </div>
          )}

          {alert.tags.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Tags</h4>
              <div className="flex gap-2 flex-wrap">
                {alert.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="font-medium mb-2">Actions</h4>
            <Textarea
              placeholder="Add notes (optional)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mb-3"
            />
            <div className="flex gap-2">
              {!alert.acknowledged && (
                <Button
                  onClick={() => onAction(alert.id, 'acknowledge', notes)}
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Acknowledge
                </Button>
              )}
              {!alert.resolved && (
                <Button
                  onClick={() => onAction(alert.id, 'resolve', notes)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Resolve
                </Button>
              )}
              <Button
                onClick={() => onAction(alert.id, 'escalate', notes)}
                variant="outline"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Escalate
              </Button>
              <Button
                onClick={() => onAction(alert.id, 'suppress', notes)}
                variant="outline"
              >
                <EyeOff className="w-4 h-4 mr-2" />
                Suppress
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
