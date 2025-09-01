'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Activity, 
  Users, 
  TrendingUp, 
  Clock, 
  Star,
  Settings,
  Eye,
  EyeOff,
  ChevronRight,
  BarChart3,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Button } from '../hive-button';
import { Badge } from '../../atomic/atoms/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Progress } from '../hive-progress';
import { Switch } from '../hive-switch';

// Dashboard data types (matching API structure)
export interface ProfileDashboardData {
  user: {
    id: string;
    name: string;
    handle: string;
    email: string;
    profilePhotoUrl?: string;
    major?: string;
    academicYear?: string;
    interests: string[];
    joinedAt: string;
    lastActive: string;
  };
  summary: {
    totalSpaces: number;
    activeSpaces: number;
    favoriteSpaces: number;
    totalTimeSpent: number;
    weeklyActivity: number;
    contentCreated: number;
    toolsUsed: number;
    socialInteractions: number;
  };
  recentActivity: {
    spaces: Array<{
      spaceId: string;
      spaceName: string;
      action: string;
      timestamp: string;
      duration?: number;
    }>;
    tools: Array<{
      toolId: string;
      toolName?: string;
      action: string;
      timestamp: string;
      spaceId?: string;
    }>;
    social: Array<{
      type: string;
      description: string;
      timestamp: string;
      spaceId?: string;
    }>;
  };
  upcomingEvents: Array<{
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    type: 'personal' | 'space';
    spaceId?: string;
    spaceName?: string;
    isToday: boolean;
    isUpcoming: boolean;
  }>;
  quickActions: {
    favoriteSpaces: Array<{
      spaceId: string;
      spaceName: string;
      unreadCount: number;
      lastActivity: string;
    }>;
    pinnedSpaces: Array<{
      spaceId: string;
      spaceName: string;
      unreadCount: number;
      lastActivity: string;
    }>;
    recommendations: Array<{
      spaceId: string;
      spaceName: string;
      matchScore: number;
      matchReasons: string[];
    }>;
  };
  insights: {
    peakActivityTime: string;
    mostActiveSpace: {
      spaceId: string;
      spaceName: string;
      timeSpent: number;
    } | null;
    weeklyGoal: {
      target: number;
      current: number;
      percentage: number;
    };
    streaks: {
      currentStreak: number;
      longestStreak: number;
      type: 'daily_activity' | 'content_creation' | 'tool_usage';
    };
  };
  privacy: {
    ghostMode: {
      enabled: boolean;
      level: string;
    };
    visibility: {
      profileVisible: boolean;
      activityVisible: boolean;
      onlineStatus: boolean;
    };
  };
}

interface HiveDashboardProps {
  data?: ProfileDashboardData;
  isLoading?: boolean;
  onRefresh?: () => void;
  onNavigate?: (path: string) => void;
  className?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25
    }
  }
} as const;

export function HiveDashboard({ 
  data, 
  isLoading = false, 
  onRefresh, 
  onNavigate,
  className = ""
}: HiveDashboardProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  const [ghostMode, setGhostMode] = useState(data?.privacy.ghostMode.enabled || false);

  // Handle ghost mode toggle
  const handleGhostModeToggle = async (enabled: boolean) => {
    setGhostMode(enabled);
    // TODO: Call API to update ghost mode
  };

  // Format duration helper
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Format time helper
  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-lg text-[var(--hive-text-muted)] mb-4">Unable to load dashboard</p>
          <ButtonEnhanced onClick={onRefresh}>Try Again</ButtonEnhanced>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={`dashboard-container p-6 space-y-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div 
        className="dashboard-header flex items-center justify-between"
        variants={cardVariants}
      >
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={data.user.profilePhotoUrl} />
            <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-[var(--hive-text-primary)]">
              {data.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {data.user.name.split(' ')[0]}
            </h1>
            <p className="text-[var(--hive-text-muted)] flex items-center space-x-2">
              <span>@{data.user.handle}</span>
              {data.user.major && (
                <>
                  <span>•</span>
                  <span>{data.user.major}</span>
                </>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Ghost Mode Toggle */}
          <div className="flex items-center space-x-2">
            {ghostMode ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
            <span className="text-sm text-[var(--hive-text-muted)]">Ghost Mode</span>
            <SwitchEnhanced 
              checked={ghostMode} 
              onCheckedChange={handleGhostModeToggle}
            />
          </div>
          
          <ButtonEnhanced variant="secondary" size="sm" onClick={onRefresh}>
            <Activity className="h-4 w-4 mr-2" />
            Refresh
          </ButtonEnhanced>
        </div>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="dashboard-grid grid grid-cols-12 gap-6">
        
        {/* Summary Stats - Large Card */}
        <motion.div 
          className="col-span-12 lg:col-span-8"
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Campus Activity Summary</span>
                <Badge variant="secondary">{timeRange}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Active Spaces"
                  value={data.summary.activeSpaces}
                  total={data.summary.totalSpaces}
                  icon={<Users className="h-4 w-4" />}
                  color="blue"
                />
                <StatCard
                  label="Time This Week"
                  value={formatDuration(data.summary.weeklyActivity)}
                  icon={<Clock className="h-4 w-4" />}
                  color="green"
                />
                <StatCard
                  label="Content Created"
                  value={data.summary.contentCreated}
                  icon={<Award className="h-4 w-4" />}
                  color="purple"
                />
                <StatCard
                  label="Tools Used"
                  value={data.summary.toolsUsed}
                  icon={<Zap className="h-4 w-4" />}
                  color="orange"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Goal Progress */}
        <motion.div 
          className="col-span-12 lg:col-span-4"
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-emerald-600" />
                <span>Weekly Goal</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">
                  {data.insights.weeklyGoal.percentage}%
                </div>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  {formatDuration(data.insights.weeklyGoal.current)} of {formatDuration(data.insights.weeklyGoal.target)}
                </p>
              </div>
              <Progress 
                value={data.insights.weeklyGoal.percentage} 
                className="h-2"
              />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Current streak: {data.insights.streaks.currentStreak} days</span>
                <span>Best: {data.insights.streaks.longestStreak} days</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="col-span-12 lg:col-span-6"
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>Quick Access</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.quickActions.favoriteSpaces.slice(0, 4).map((space) => (
                <motion.div 
                  key={space.spaceId}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-[var(--hive-background-secondary)] cursor-pointer transition-colors"
                  onClick={() => onNavigate?.(`/spaces/${space.spaceId}`)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-sm">{space.spaceName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {space.unreadCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {space.unreadCount}
                      </Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div 
          className="col-span-12 lg:col-span-6"
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.upcomingEvents.slice(0, 4).map((event) => (
                <motion.div 
                  key={event.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-[var(--hive-background-secondary)] cursor-pointer transition-colors"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${event.isToday ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {event.spaceName || 'Personal'} • {formatTimeAgo(event.startDate)}
                      </p>
                    </div>
                  </div>
                  {event.isToday && (
                    <Badge variant="destructive" className="text-xs">Today</Badge>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className="col-span-12"
          variants={cardVariants}
          whileHover="hover"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Spaces Activity */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Spaces</h4>
                  {data.recentActivity.spaces.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.spaceName}</p>
                        <p className="text-gray-500 text-xs">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tools Activity */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Tools</h4>
                  {data.recentActivity.tools.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.toolName || 'Unknown Tool'}</p>
                        <p className="text-gray-500 text-xs">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Activity */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Social</h4>
                  {data.recentActivity.social.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.description}</p>
                        <p className="text-gray-500 text-xs">{formatTimeAgo(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights Card */}
        <motion.div 
          className="col-span-12 lg:col-span-6"
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>Campus Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--hive-text-muted)]">Peak Activity Time</span>
                <span className="font-semibold text-purple-600">{data.insights.peakActivityTime}</span>
              </div>
              
              {data.insights.mostActiveSpace && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--hive-text-muted)]">Most Active Space</span>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{data.insights.mostActiveSpace.spaceName}</p>
                    <p className="text-xs text-gray-500">{formatDuration(data.insights.mostActiveSpace.timeSpent)}</p>
                  </div>
                </div>
              )}
              
              <div className="pt-2 border-t border-purple-200">
                <ButtonEnhanced 
                  variant="secondary" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onNavigate?.('/analytics')}
                >
                  View Detailed Analytics
                </ButtonEnhanced>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Space Recommendations */}
        <motion.div 
          className="col-span-12 lg:col-span-6"
          variants={cardVariants}
          whileHover="hover"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <span>Recommended Spaces</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.quickActions.recommendations.length > 0 ? (
                data.quickActions.recommendations.map((rec) => (
                  <motion.div 
                    key={rec.spaceId}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-[var(--hive-background-secondary)] cursor-pointer transition-colors"
                    onClick={() => onNavigate?.(`/spaces/${rec.spaceId}`)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">{rec.spaceName}</p>
                        <p className="text-xs text-gray-500">
                          {rec.matchScore}% match • {rec.matchReasons[0]}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No recommendations available</p>
                  <p className="text-xs mt-1">Explore spaces to get personalized suggestions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Stat Card Component
interface StatCardProps {
  label: string;
  value: string | number;
  total?: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function StatCard({ label, value, total, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    orange: 'text-orange-600 bg-orange-100',
  };

  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colorClasses[color]} mb-2`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {value}{total && <span className="text-gray-500">/{total}</span>}
      </div>
      <div className="text-sm text-[var(--hive-text-muted)]">{label}</div>
    </div>
  );
}

// Loading Skeleton
function DashboardSkeleton() {
  return (
    <div className="dashboard-container p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="col-span-12 lg:col-span-6">
            <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HiveDashboard;