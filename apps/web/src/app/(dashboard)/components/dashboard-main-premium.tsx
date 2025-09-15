"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Zap, 
  Calendar, 
  Bell, 
  ArrowRight,
  Activity,
  Star,
  Clock,
  TrendingUp,
  Grid3X3,
  Compass,
  Settings,
  ChevronRight,
  Hash,
  MessageSquare,
  MapPin,
  Sparkles
} from 'lucide-react';

// Temporary imports
import { useUnifiedAuth } from '@hive/ui';

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
}

export function DashboardMainPremium() {
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
        
        // Real data structure with empty values
        const emptyData: DashboardData = {
          user: {
            id: user?.id || '',
            name: user?.fullName || 'User',
            handle: user?.handle || user?.email?.split('@')[0] || 'user',
            avatar: user?.avatarUrl || undefined,
            spaces: 0,
            tools: 0,
            reputation: 0
          },
          spaces: [],
          recentActivity: [],
          upcomingEvents: [],
          notifications: []
        };
        
        setDashboardData(emptyData);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="h-12 w-12 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 text-sm">Loading your workspace...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="h-12 w-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Activity className="h-6 w-6 text-black" />
          </div>
          <h2 className="text-xl font-semibold text-black mb-2">
            Unable to load dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'Something went wrong. Please try again.'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-[#FFD700] text-black rounded-lg hover:bg-[#F5C500] transition-colors text-sm font-medium"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  const unreadNotifications = dashboardData.notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-black">
                Welcome back, {dashboardData.user.name.split(' ')[0]}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                @{dashboardData.user.handle}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/spaces')}
                className="px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#F5C500] transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-sm hover:shadow-md"
              >
                <Compass className="h-4 w-4" />
                <span>Explore</span>
              </button>
              
              <button
                onClick={() => router.push('/spaces/create')}
                className="px-4 py-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-200 flex items-center gap-2 text-sm font-medium text-black"
              >
                <Plus className="h-4 w-4" />
                <span>Create</span>
              </button>
              
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-black" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-[#FFD700] text-black text-[10px] font-medium rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              
              <button className="p-2 rounded-lg hover:bg-gray-100)] transition-colors">
                <Settings className="h-5 w-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Users className="h-5 w-5 text-black" />
              </div>
              <TrendingUp className="h-4 w-4 text-[#FFD700]" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {dashboardData.user.spaces}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Active Spaces</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-[#FFFACD] rounded-lg">
                <Zap className="h-5 w-5 text-[#FFD700]" />
              </div>
              <TrendingUp className="h-4 w-4 text-[#FFD700]" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {dashboardData.user.tools}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Tools Created</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Star className="h-5 w-5 text-black" />
              </div>
              <Sparkles className="h-4 w-4 text-[#FFD700]" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {dashboardData.user.reputation.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Reputation Points</p>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Spaces */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Grid3X3 className="h-5 w-5 text-gray-700)]" />
                    <h2 className="text-lg font-semibold text-gray-900">My Spaces</h2>
                  </div>
                  <button 
                    onClick={() => router.push('/spaces')}
                    className="text-sm text-black hover:text-[#FFD700] font-medium flex items-center gap-1"
                  >
                    View all
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {dashboardData.spaces.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.spaces.map((space: any) => (
                      <div
                        key={space.id}
                        className="p-4 rounded-lg border border-gray-200 hover:border-gray-300)] transition-colors cursor-pointer"
                        onClick={() => router.push(`/spaces/${space.id}`)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {space.isPrivate && (
                                <span className="px-2 py-0.5 bg-gray-100)] text-gray-600 text-xs font-medium rounded">
                                  Private
                                </span>
                              )}
                              <h3 className="font-medium text-gray-900">{space.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{space.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {space.memberCount} members
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {space.lastActivity}
                              </span>
                            </div>
                          </div>
                          {space.unreadCount > 0 && (
                            <span className="px-2 py-1 bg-[#FFD700] text-black text-xs font-medium rounded">
                              {space.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="h-12 w-12 bg-gray-100)] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Grid3X3 className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-4">No spaces joined yet</p>
                    <button
                      onClick={() => router.push('/spaces')}
                      className="px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#F5C500] transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                    >
                      Explore Spaces
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-gray-700)]" />
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>
              </div>
              
              <div className="p-6">
                {dashboardData.recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {dashboardData.recentActivity.map((activity: any) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50)] transition-colors">
                        <div className="p-2 bg-gray-100)] rounded-lg">
                          {activity.type === 'post' && <MessageSquare className="h-4 w-4 text-gray-600" />}
                          {activity.type === 'join' && <Users className="h-4 w-4 text-gray-600" />}
                          {activity.type === 'tool' && <Zap className="h-4 w-4 text-gray-600" />}
                          {activity.type === 'event' && <Calendar className="h-4 w-4 text-gray-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-600 mt-0.5">{activity.description}</p>
                          {activity.spaceName && (
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <Hash className="h-3 w-3" />
                              {activity.spaceName}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No recent activity</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white border border-gray-200 rounded-xl"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-700)]" />
                    <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
                  </div>
                  <button className="text-sm text-black hover:text-[#FFD700] font-medium">
                    View all
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {dashboardData.upcomingEvents.length > 0 ? (
                  <div className="space-y-3">
                    {dashboardData.upcomingEvents.map((event: any) => (
                      <div key={event.id} className="p-3 rounded-lg border border-gray-200 hover:border-gray-300)] transition-colors cursor-pointer">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">{event.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.spaceName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600 py-4">No upcoming events</p>
                )}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-2">
                <button
                  onClick={() => router.push('/profile')}
                  className="w-full p-3 text-left rounded-lg hover:bg-gray-50)] transition-colors flex items-center justify-between group"
                >
                  <span className="text-sm text-gray-700)]">View Profile</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#FFD700] transition-colors" />
                </button>
                <button
                  onClick={() => router.push('/tools')}
                  className="w-full p-3 text-left rounded-lg hover:bg-gray-50)] transition-colors flex items-center justify-between group"
                >
                  <span className="text-sm text-gray-700)]">Browse Tools</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#FFD700] transition-colors" />
                </button>
                <button
                  onClick={() => router.push('/feed')}
                  className="w-full p-3 text-left rounded-lg hover:bg-gray-50)] transition-colors flex items-center justify-between group"
                >
                  <span className="text-sm text-gray-700)]">Campus Feed</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#FFD700] transition-colors" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}