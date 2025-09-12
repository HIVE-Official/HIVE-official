'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Button,
  Alert,
  AlertDescription,
} from '@hive/ui';
import { 
  Activity, 
  Zap, 
  Server, 
  Database,
  Wifi,
  WifiOff,
  AlertTriangle,
  RefreshCw,
  Pause,
  Play
} from 'lucide-react';

interface SystemMetrics {
  cpu: {
    usage: number;
    cores: number;
    temperature?: number;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  network: {
    inbound: number;
    outbound: number;
    latency: number;
    activeConnections: number;
  };
  database: {
    queries: number;
    averageResponseTime: number;
    activeConnections: number;
    slowQueries: number;
  };
  websocket: {
    activeConnections: number;
    messagesPerSecond: number;
    totalMessages: number;
    errors: number;
  };
}

interface RealtimeEvent {
  id: string;
  type: 'user_action' | 'system_event' | 'error' | 'performance';
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  details?: any;
  timestamp: string;
}

interface ActiveUser {
  id: string;
  email: string;
  location: string;
  device: string;
  duration: number;
  actions: number;
}

export default function RealtimeMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [events, setEvents] = useState<RealtimeEvent[]>([]);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [alertLevel, setAlertLevel] = useState<'normal' | 'warning' | 'critical'>('normal');
  
  const wsRef = useRef<WebSocket | null>(null);
  const eventsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPaused) {
      connectWebSocket();
      loadInitialData();
    }
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [isPaused]);

  const connectWebSocket = () => {
    try {
      // Connect to real-time monitoring WebSocket
      wsRef.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/api/realtime/websocket');
      
      wsRef.current.onopen = () => {
        setIsConnected(true);
        console.log('WebSocket connected');
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleRealtimeData(data);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      wsRef.current.onclose = () => {
        setIsConnected(false);
        // Attempt to reconnect after 5 seconds
        if (!isPaused) {
          setTimeout(connectWebSocket, 5000);
        }
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setIsConnected(false);
    }
  };

  const loadInitialData = async () => {
    try {
      // Load system metrics
      const metricsResponse = await fetch('/api/admin/monitoring/metrics');
      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData);
      }

      // Load active users
      const usersResponse = await fetch('/api/admin/monitoring/active-users');
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setActiveUsers(usersData.users || []);
      }

      // Load recent events
      const eventsResponse = await fetch('/api/admin/monitoring/events?limit=50');
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setEvents(eventsData.events || []);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const handleRealtimeData = (data: any) => {
    switch (data.type) {
      case 'metrics':
        setMetrics(data.payload);
        checkAlertConditions(data.payload);
        break;
      case 'event':
        addEvent(data.payload);
        break;
      case 'user_activity':
        updateActiveUsers(data.payload);
        break;
    }
  };

  const addEvent = (event: RealtimeEvent) => {
    setEvents(prev => {
      const newEvents = [event, ...prev].slice(0, 100); // Keep last 100 events
      
      // Auto-scroll to bottom if user is near bottom
      if (eventsContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = eventsContainerRef.current;
        if (scrollHeight - scrollTop - clientHeight < 100) {
          setTimeout(() => {
            eventsContainerRef.current?.scrollTo(0, eventsContainerRef.current.scrollHeight);
          }, 100);
        }
      }
      
      return newEvents;
    });
  };

  const updateActiveUsers = (userUpdate: any) => {
    setActiveUsers(prev => {
      if (userUpdate.action === 'join') {
        return [...prev, userUpdate.user];
      } else if (userUpdate.action === 'leave') {
        return prev.filter(u => u.id !== userUpdate.userId);
      } else if (userUpdate.action === 'update') {
        return prev.map(u => u.id === userUpdate.user.id ? userUpdate.user : u);
      }
      return prev;
    });
  };

  const checkAlertConditions = (metrics: SystemMetrics) => {
    // Check for critical conditions
    if (
      metrics.cpu.usage > 90 ||
      metrics.memory.percentage > 90 ||
      metrics.database.slowQueries > 10 ||
      metrics.websocket.errors > 50
    ) {
      setAlertLevel('critical');
    } else if (
      metrics.cpu.usage > 75 ||
      metrics.memory.percentage > 75 ||
      metrics.database.slowQueries > 5 ||
      metrics.websocket.errors > 20
    ) {
      setAlertLevel('warning');
    } else {
      setAlertLevel('normal');
    }
  };

  const getHealthColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'error': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold">Real-time Monitor</h2>
          <Badge variant={isConnected ? 'default' : 'destructive'} className="flex items-center">
            {isConnected ? (
              <>
                <Wifi className="h-3 w-3 mr-1" />
                Connected
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3 mr-1" />
                Disconnected
              </>
            )}
          </Badge>
          {alertLevel !== 'normal' && (
            <Badge variant={alertLevel === 'critical' ? 'destructive' : 'secondary'}>
              {alertLevel.toUpperCase()} ALERT
            </Badge>
          )}
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setIsPaused(!isPaused)}
            variant="outline"
            size="sm"
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button onClick={loadInitialData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* System Alerts */}
      {alertLevel !== 'normal' && (
        <Alert variant={alertLevel === 'critical' ? 'destructive' : 'default'}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            System is experiencing {alertLevel} issues. Check metrics below for details.
          </AlertDescription>
        </Alert>
      )}

      {/* System Metrics Grid */}
      {metrics && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getHealthColor(metrics.cpu.usage, { good: 50, warning: 75 })}`}>
                {metrics.cpu.usage.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {metrics.cpu.cores} cores
                {metrics.cpu.temperature && ` • ${metrics.cpu.temperature}°C`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Server className="h-4 w-4 mr-2" />
                Memory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getHealthColor(metrics.memory.percentage, { good: 60, warning: 80 })}`}>
                {metrics.memory.percentage.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {(metrics.memory.used / 1024 / 1024 / 1024).toFixed(1)}GB / 
                {(metrics.memory.total / 1024 / 1024 / 1024).toFixed(1)}GB
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Database className="h-4 w-4 mr-2" />
                Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.database.queries}/s</div>
              <p className="text-xs text-muted-foreground">
                {metrics.database.averageResponseTime}ms avg • 
                {metrics.database.slowQueries > 0 && (
                  <span className="text-red-600"> {metrics.database.slowQueries} slow</span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                WebSocket
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.websocket.activeConnections}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.websocket.messagesPerSecond} msg/s
                {metrics.websocket.errors > 0 && (
                  <span className="text-red-600"> • {metrics.websocket.errors} errors</span>
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {/* Active Users */}
        <Card>
          <CardHeader>
            <CardTitle>Active Users ({activeUsers.length})</CardTitle>
            <CardDescription>Currently online users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {activeUsers.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No active users</p>
              ) : (
                activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.email}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{user.location}</span>
                        <span>•</span>
                        <span>{user.device}</span>
                        <span>•</span>
                        <span>{user.duration}m</span>
                      </div>
                    </div>
                    <Badge variant="outline">{user.actions} actions</Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Live Event Stream */}
        <Card>
          <CardHeader>
            <CardTitle>Event Stream</CardTitle>
            <CardDescription>Real-time system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              ref={eventsContainerRef}
              className="space-y-2 max-h-96 overflow-y-auto"
            >
              {events.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No recent events</p>
              ) : (
                events.map((event) => (
                  <div 
                    key={event.id} 
                    className={`p-2 rounded border ${getSeverityColor(event.severity)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.message}</p>
                        {event.details && (
                          <p className="text-xs mt-1 opacity-75">
                            {JSON.stringify(event.details).substring(0, 100)}...
                          </p>
                        )}
                      </div>
                      <span className="text-xs ml-2 whitespace-nowrap">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Activity */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle>Network Activity</CardTitle>
            <CardDescription>Real-time network traffic and latency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Inbound</p>
                <p className="text-xl font-bold">{(metrics.network.inbound / 1024).toFixed(2)} KB/s</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Outbound</p>
                <p className="text-xl font-bold">{(metrics.network.outbound / 1024).toFixed(2)} KB/s</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Latency</p>
                <p className={`text-xl font-bold ${getHealthColor(metrics.network.latency, { good: 50, warning: 100 })}`}>
                  {metrics.network.latency}ms
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="text-xl font-bold">{metrics.network.activeConnections}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}