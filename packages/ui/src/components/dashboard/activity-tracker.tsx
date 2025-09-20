'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Zap,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Button } from '../hive-button';
import { Badge } from '../../atomic/atoms/badge';
import { Progress } from '../hive-progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../atomic/ui/tabs';

// Activity data types
export interface ActivityMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  target?: number;
  color: string;
  icon: React.ReactNode
}

export interface ActivitySession {
  id: string;
  spaceId: string;
  spaceName: string;
  startTime: string;
  endTime: string;
  duration: number;
  activityType: 'study' | 'social' | 'tool_usage' | 'content_creation';
  toolsUsed?: string[];
  contentCreated?: {
    type: string;
    count: number
  }[];
  interactions?: number
}

export interface ActivityInsight {
  id: string;
  title: string;
  description: string;
  type: 'achievement' | 'recommendation' | 'warning' | 'milestone';
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  action?: {
    label: string;
    url?: string
  }
}

export interface ActivityGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'daily' | 'weekly' | 'monthly';
  color: string
}

export interface ActivityTrackerData {
  metrics: ActivityMetric[];
  sessions: ActivitySession[];
  insights: ActivityInsight[];
  goals: ActivityGoal[];
  timeRange: 'today' | 'week' | 'month';
  weeklyStats: {
    totalHours: number;
    avgSessionLength: number;
    mostActiveDay: string;
    preferredTimeSlot: string;
    spacesVisited: number;
    toolsUsed: number
  };
  heatmapData?: Array<{
    date: string;
    value: number
  }>
}

interface ActivityTrackerProps {
  data?: ActivityTrackerData;
  isLoading?: boolean;
  onTimeRangeChange?: (range: 'today' | 'week' | 'month') => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onGoalUpdate?: (goalId: string, newTarget: number) => void;
  className?: string
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20
    }
  }
};

export function ActivityTracker({ 
  data, 
  isLoading = false, 
  onTimeRangeChange, 
  onRefresh,
  onExport,
  onGoalUpdate,
  className = ""
}: ActivityTrackerProps) {
  const [activeView, setActiveView] = useState<'overview' | 'sessions' | 'goals'>('overview');
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>(data?.timeRange || 'week');

  const handleTimeRangeChange = (range: 'today' | 'week' | 'month') => {
    setTimeRange(range);
    onTimeRangeChange?.(range)
  };

  // Calculate completion percentage for goals
  const goalCompletions = useMemo(() => {
    if (!data?.goals) return {};
    return data.goals.reduce((acc, goal) => {
      acc[goal.id] = Math.min((goal.current / goal.target) * 100, 100);
      return acc
    }, {} as Record<string, number>)
  }, [data?.goals]);

  // Group sessions by date
  const sessionsByDate = useMemo(() => {
    if (!data?.sessions) return {};
    return data.sessions.reduce((acc, session) => {
      const date = session.startTime.split('T')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(session);
      return acc
    }, {} as Record<string, ActivitySession[]>)
  }, [data?.sessions]);

  // Format duration
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  };

  // Format time
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  };

  if (isLoading) {
    return <ActivityTrackerSkeleton />
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Unable to load activity data</p>
          <Button onClick={onRefresh}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className={`activity-tracker space-y-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span>Activity Tracker</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tabs value={timeRange} onValueChange={(value) => handleTimeRangeChange(value as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button variant="outline" size="sm" onClick={onRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={onExport}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Content Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {data.metrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg bg-${metric.color}-100`}>
                          <div className={`text-${metric.color}-600`}>
                            {metric.icon}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs">
                          {metric.changeType === 'increase' ? (
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          ) : metric.changeType === 'decrease' ? (
                            <TrendingDown className="h-3 w-3 text-red-500" />
                          ) : null}
                          <span className={`
                            ${metric.changeType === 'increase' ? 'text-green-600' : ''}
                            ${metric.changeType === 'decrease' ? 'text-red-600' : ''}
                            ${metric.changeType === 'neutral' ? 'text-gray-500' : ''}
                          `}>
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {metric.value}
                        <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
                      </div>
                      <div className="text-sm text-gray-600">{metric.name}</div>
                      {metric.target && (
                        <div className="mt-2">
                          <Progress 
                            value={(metric.value / metric.target) * 100} 
                            className="h-1"
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            Target: {metric.target} {metric.unit}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Weekly Stats */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span>Weekly Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatDuration(data.weeklyStats.totalHours)}
                      </div>
                      <div className="text-sm text-gray-600">Total Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatDuration(data.weeklyStats.avgSessionLength)}
                      </div>
                      <div className="text-sm text-gray-600">Avg Session</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {data.weeklyStats.mostActiveDay}
                      </div>
                      <div className="text-sm text-gray-600">Most Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {data.weeklyStats.preferredTimeSlot}
                      </div>
                      <div className="text-sm text-gray-600">Peak Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">
                        {data.weeklyStats.spacesVisited}
                      </div>
                      <div className="text-sm text-gray-600">Spaces</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600">
                        {data.weeklyStats.toolsUsed}
                      </div>
                      <div className="text-sm text-gray-600">Tools</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Insights */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    <span>Insights & Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.insights.map((insight) => (
                      <motion.div
                        key={insight.id}
                        className={`p-4 rounded-lg border ${
                          insight.type === 'achievement' ? 'bg-green-50 border-green-200' :
                          insight.type === 'warning' ? 'bg-red-50 border-red-200' :
                          insight.type === 'recommendation' ? 'bg-blue-50 border-blue-200' :
                          'bg-purple-50 border-purple-200'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                            <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                            {insight.actionable && insight.action && (
                              <Button variant="outline" size="sm" className="text-xs">
                                {insight.action.label}
                              </Button>
                            )}
                          </div>
                          <Badge 
                            variant={insight.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {insight.priority}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6 mt-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Recent Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(sessionsByDate).map(([date, sessions]) => (
                      <div key={date}>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">
                          {new Date(date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
          })}
                        </h4>
                        <div className="space-y-2">
                          {sessions.map((session) => (
                            <motion.div
                              key={session.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              whileHover={{ x: 2 }}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  session.activityType === 'study' ? 'bg-blue-500' :
                                  session.activityType === 'social' ? 'bg-green-500' :
                                  session.activityType === 'tool_usage' ? 'bg-purple-500' :
                                  'bg-orange-500'
                                }`}></div>
                                <div>
                                  <p className="font-medium text-sm">{session.spaceName}</p>
                                  <p className="text-xs text-gray-500">
                                    {formatTime(session.startTime)} - {formatTime(session.endTime)}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">
                                  {formatDuration(session.duration)}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {session.activityType.replace('_', ' ')}
                                </Badge>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.goals.map((goal) => (
                <motion.div
                  key={goal.id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-sm mb-1">{goal.title}</h4>
                          <p className="text-xs text-gray-600">{goal.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {goal.category}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">
                            {goal.current} / {goal.target} {goal.unit}
                          </span>
                          <span className="text-sm text-gray-500">
                            {Math.round(goalCompletions[goal.id])}%
                          </span>
                        </div>
                        <Progress 
                          value={goalCompletions[goal.id]} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

// Loading Skeleton
function ActivityTrackerSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
      <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  )
}

// Mock data for development
export const mockActivityTrackerData: ActivityTrackerData = {
  metrics: [
    {
      id: 'total_time',
      name: 'Total Time',
      value: 24,
      unit: 'hours',
      change: 12,
      changeType: 'increase',
      target: 30,
      color: 'blue',
      icon: <Clock className="h-4 w-4" />
    },
    {
      id: 'spaces_visited',
      name: 'Spaces',
      value: 8,
      unit: 'spaces',
      change: 2,
      changeType: 'increase',
      color: 'green',
      icon: <Users className="h-4 w-4" />
    },
    {
      id: 'tools_used',
      name: 'Tools',
      value: 15,
      unit: 'tools',
      change: 5,
      changeType: 'increase',
      color: 'purple',
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: 'goals_completed',
      name: 'Goals',
      value: 3,
      unit: 'completed',
      change: 0,
      changeType: 'neutral',
      color: 'orange',
      icon: <Target className="h-4 w-4" />
    }
  ],
  sessions: [
    {
      id: 'session_1',
      spaceId: 'cs_majors',
      spaceName: 'CS Majors',
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 7200000).toISOString(),
      duration: 120,
      activityType: 'study',
      toolsUsed: ['gpa_calculator', 'study_timer'],
      interactions: 15
    }
  ],
  insights: [
    {
      id: 'insight_1',
      title: 'Great Progress!',
      description: 'You\'ve exceeded your weekly study goal by 20%',
      type: 'achievement',
      priority: 'medium',
      actionable: false
    },
    {
      id: 'insight_2',
      title: 'Consider Morning Sessions',
      description: 'Your focus appears highest between 9-11 AM',
      type: 'recommendation',
      priority: 'low',
      actionable: true,
      action: {
        label: 'Schedule Morning Time'
      }
    }
  ],
  goals: [
    {
      id: 'goal_1',
      title: 'Weekly Study Goal',
      description: 'Maintain consistent study schedule',
      target: 25,
      current: 24,
      unit: 'hours',
      deadline: new Date(Date.now() + 259200000).toISOString(),
      category: 'weekly',
      color: 'blue'
    }
  ],
  timeRange: 'week',
  weeklyStats: {
    totalHours: 24,
    avgSessionLength: 45,
    mostActiveDay: 'Tuesday',
    preferredTimeSlot: '2-4 PM',
    spacesVisited: 8,
    toolsUsed: 15
  }
};

export default ActivityTracker;