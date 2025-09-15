"use client";

import { useState, useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Zap, 
  Calendar, 
  Bell, 
  ArrowRight,
  BookOpen,
  MapPin,
  Activity,
  GraduationCap,
  Star,
  Clock
} from 'lucide-react';

// HIVE Atomic Design System
// import { 
//   Display,
//   Heading,
//   Text as Typography,
//   Button,
// } from '@hive/ui';

// Import proper UI components
import { 
  Button,
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Badge,
  Typography
} from '@hive/ui';

// Hooks and API
import { useUnifiedAuth } from '@hive/ui';

// Additional components
const Display = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-2xl font-bold ${className || ''}`}>{children}</div>
);

const Heading = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h1 className={`text-xl font-semibold ${className || ''}`}>{children}</h1>
);

// Components
import { FeedDisplay } from '../../../components/feed/feed-display';

// Dashboard Data Types
interface DashboardData {
  user: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    spaces: number;
    tools: number;
    reputation: number;
  };
  spaces: Array<{
    id: string;
    name: string;
    description: string;
    memberCount: number;
    unreadCount: number;
    lastActivity: string;
    category: string;
    isPrivate: boolean;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'post' | 'join' | 'tool' | 'event';
    title: string;
    description: string;
    timestamp: string;
    spaceName?: string;
    spaceId?: string;
  }>;
  upcomingEvents: Array<{
    id: string;
    title: string;
    time: string;
    spaceName: string;
    spaceId: string;
  }>;
  notifications: Array<{
    id: string;
    type: 'mention' | 'invite' | 'tool';
    title: string;
    timestamp: string;
    unread: boolean;
  }>;
  tools: Array<any>; // Add tools property for compatibility
}

export function DashboardMain() {
  const router = useRouter();
  const { user } = useUnifiedAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch real data from API - using empty data structure for now
        const emptyData: DashboardData = {
          user: {
            id: user?.id || '',
            name: (user as any)?.displayName || user?.email?.split('@')[0] || '',
            handle: user?.email?.split('@')[0] || '',
            avatar: (user as any)?.photoURL || undefined,
            spaces: 0,
            tools: 0,
            reputation: 0
          },
          spaces: [],
          recentActivity: [],
          upcomingEvents: [],
          tools: [],
          notifications: []
        };
        logger.error('Failed to load dashboard:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
        setIsLoading(false);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 bg-accent rounded-lg animate-pulse mx-auto flex items-center justify-center">
            <Activity className="h-6 w-6 text-accent-foreground animate-pulse" />
          </div>
          <div>
            <Heading>Loading your campus dashboard...</Heading>
            <Typography>Getting your spaces and activity ready</Typography>
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 bg-destructive rounded-lg flex items-center justify-center mx-auto">
            <Activity className="h-6 w-6 text-destructive-foreground" />
          </div>
          <div>
            <Heading>Dashboard unavailable</Heading>
            <Typography color="medium">{error || 'Unable to load dashboard'}</Typography>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const unreadNotifications = dashboardData.notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <Display>
              Welcome back, {dashboardData.user.name.split(' ')[0]}! 👋
            </Display>
            <Typography size="large" color="medium" className="mt-1">
              Your campus command center • @{dashboardData.user.handle}
            </Typography>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button onClick={() => router.push('/spaces')} className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Browse Spaces</span>
            </Button>
            <Button variant="outline" onClick={() => router.push('/spaces/create')} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create</span>
            </Button>
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
        >
          <Card className="flex-1">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{dashboardData.user.spaces}</div>
                  <p className="text-sm text-muted-foreground">Active Spaces</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-[var(--hive-gold)]/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-[var(--hive-gold)]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{dashboardData.user.tools}</div>
                  <p className="text-sm text-muted-foreground">Tools Built</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-[var(--hive-gold)]/10 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-[var(--hive-gold)]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{dashboardData.user.reputation.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Campus Rep</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content - Mobile-First Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Spaces & Activity */}
          <div className="flex-1 space-y-6">
            
            {/* My Spaces */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>My Spaces</span>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => router.push('/spaces')}
                    className="flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.spaces.map((space) => (
                    <div 
                      key={space.id} 
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/spaces/${space.id}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-[var(--hive-gold)] rounded-lg flex items-center justify-center">
                          <span className="text-[var(--hive-text-inverse)] font-semibold text-sm">
                            {space.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{space.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-2">
                            <span>{space.memberCount} members</span>
                            <span>•</span>
                            <span>{space.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          {space.category}
                        </Badge>
                        {space.unreadCount > 0 && (
                          <Badge className="h-6 w-6 p-0 flex items-center justify-center text-xs">
                            {space.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>Campus Feed</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push('/feed')}
                      className="flex items-center space-x-1"
                    >
                      <span>View All</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FeedDisplay 
                    feedType="all"
                    showPostCreator={false}
                    maxPosts={3}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Events & Notifications */}
          <div className="w-full lg:w-80 lg:flex-shrink-0 space-y-6">
            
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboardData.upcomingEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer"
                      onClick={() => router.push(`/spaces/${event.spaceId}`)}
                    >
                      <div className="font-medium text-foreground">{event.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-1 mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="text-xs text-accent mt-1">{event.spaceName}</div>
                    </div>
                  ))}
                  {dashboardData.upcomingEvents.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No upcoming events</p>
                      <Button variant="ghost" size="sm" className="mt-2">
                        Explore Events
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>Notifications</span>
                    </div>
                    {unreadNotifications > 0 && (
                      <Badge>{unreadNotifications} new</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboardData.notifications.slice(0, 3).map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        notification.unread 
                          ? 'border-accent bg-accent/10 hover:bg-accent/20' 
                          : 'border-border hover:bg-accent/50'
                      }`}
                    >
                      <div className="font-medium text-foreground">{notification.title}</div>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{notification.timestamp}</span>
                        {notification.unread && (
                          <Badge variant="secondary" className="ml-2 text-xs">New</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  {dashboardData.notifications.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">All caught up!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Campus Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Campus Quick Links</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={() => router.push('/spaces/browse?category=academic')}
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Academic Spaces
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={() => router.push('/spaces/browse?category=residential')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Dorm Communities
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    size="sm"
                    onClick={() => router.push('/tools/browse')}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Campus Tools
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}