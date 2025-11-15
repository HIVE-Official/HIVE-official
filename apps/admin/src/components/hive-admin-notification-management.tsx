/**
 * HIVE Admin Notification Management - COMPREHENSIVE PLATFORM COMMUNICATIONS
 * Complete oversight of all platform notifications with space system compliance enforcement
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";
import { 
  Bell,
  AlertTriangle,
  XCircle,
  Clock,
  Send,
  User,
  Globe,
  Shield,
  Zap,
  Calendar,
  Heart,
  Flag,
  Search,
  RefreshCw,
  Eye,
  Edit3,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Target,
  BarChart3,
  FileText,
  Megaphone
} from 'lucide-react';

// NOTIFICATION TYPES WITH SPACE SYSTEM ENFORCEMENT
type NotificationType = 
  | 'system_alert' 
  | 'space_violation' 
  | 'space_update' 
  | 'user_action' 
  | 'tool_notification' 
  | 'event_reminder' 
  | 'social_notification' 
  | 'compliance_alert' 
  | 'security_warning' 
  | 'platform_announcement';

type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent' | 'critical';
type NotificationStatus = 'draft' | 'scheduled' | 'sent' | 'delivered' | 'failed' | 'cancelled';
type DeliveryChannel = 'in_app' | 'email' | 'sms' | 'push' | 'webhook' | 'all';
type ValidSpaceCategory = 'university_spaces' | 'residential_spaces' | 'greek_life_spaces' | 'student_spaces';

interface NotificationTarget {
  type: 'all_users' | 'user_role' | 'space_members' | 'space_category' | 'custom_list' | 'single_user';
  value?: string;
  userIds?: string[];
  spaceIds?: string[];
  categories?: ValidSpaceCategory[];
  roles?: string[];
  filters?: {
    activeOnly?: boolean;
    compliantOnly?: boolean;
    hasViolations?: boolean;
    lastActiveWithin?: number; // days
  };
}

interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  subject: string;
  content: string;
  htmlContent?: string;
  variables: string[];
  isSystem: boolean;
  createdBy: string;
  createdAt: string;
  usageCount: number;
}

interface HiveNotification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  
  // Content
  title: string;
  message: string;
  htmlContent?: string;
  actionUrl?: string;
  actionText?: string;
  imageUrl?: string;
  
  // Targeting
  target: NotificationTarget;
  estimatedRecipients: number;
  actualRecipients?: number;
  
  // Delivery
  channels: DeliveryChannel[];
  scheduledFor?: string;
  sentAt?: string;
  deliveredAt?: string;
  
  // Template & Personalization
  templateId?: string;
  variables?: Record<string, string>;
  personalized: boolean;
  
  // Space System Context
  relatedSpaceId?: string;
  spaceCategory?: ValidSpaceCategory;
  spaceViolationType?: string;
  complianceLevel?: 'compliant' | 'warning' | 'violation' | 'critical';
  
  // Analytics
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    failed: number;
    unsubscribed: number;
  };
  
  // System Information
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  
  // Device Targeting
  deviceTypes?: ('mobile' | 'desktop' | 'tablet')[];
  platforms?: ('ios' | 'android' | 'web')[];
  
  // Compliance & Moderation
  requiresApproval: boolean;
  approvedBy?: string;
  approvedAt?: string;
  moderationNotes?: string[];
}

interface NotificationCampaign {
  id: string;
  name: string;
  description: string;
  type: 'announcement' | 'reminder' | 'alert' | 'engagement' | 'compliance';
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  
  notifications: HiveNotification[];
  
  // Targeting
  totalTargeted: number;
  totalReached: number;
  
  // Performance
  overallMetrics: {
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    engagementScore: number;
  };
  
  // Schedule
  startDate: string;
  endDate?: string;
  frequency?: 'once' | 'daily' | 'weekly' | 'monthly';
  
  // Space System Integration
  enforcesSpaceCompliance: boolean;
  targetedSpaceCategories: ValidSpaceCategory[];
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface NotificationAnalytics {
  totalSent: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  unsubscribeRate: number;
  
  byType: Record<NotificationType, {
    count: number;
    deliveryRate: number;
    engagementRate: number;
  }>;
  
  byChannel: Record<DeliveryChannel, {
    sent: number;
    delivered: number;
    opened: number;
    failed: number;
  }>;
  
  bySpaceCategory: Record<ValidSpaceCategory, {
    notifications: number;
    complianceAlerts: number;
    engagementRate: number;
  }>;
  
  performanceTrends: Array<{
    date: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
  }>;
}

interface HiveAdminNotificationManagementProps {
  onSendNotification?: (notification: HiveNotification) => Promise<void>;
  onCreateCampaign?: (campaign: NotificationCampaign) => Promise<void>;
  onUpdateTemplate?: (template: NotificationTemplate) => Promise<void>;
  enableFeatureFlag?: boolean;
}

const NotificationCard: React.FC<{
  notification: HiveNotification;
  onViewDetails: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onResend: () => void;
}> = ({ notification, onViewDetails, onEdit, onCancel, onResend }) => {
  const [showMetrics, setShowMetrics] = useState(false);

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'system_alert': return <AlertTriangle className="w-4 h-4" />;
      case 'space_violation': return <Shield className="w-4 h-4" />;
      case 'space_update': return <Globe className="w-4 h-4" />;
      case 'user_action': return <User className="w-4 h-4" />;
      case 'tool_notification': return <Zap className="w-4 h-4" />;
      case 'event_reminder': return <Calendar className="w-4 h-4" />;
      case 'social_notification': return <Heart className="w-4 h-4" />;
      case 'compliance_alert': return <Flag className="w-4 h-4" />;
      case 'security_warning': return <Shield className="w-4 h-4" />;
      case 'platform_announcement': return <Megaphone className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case 'system_alert': return 'text-red-400';
      case 'space_violation': return 'text-orange-400';
      case 'space_update': return 'text-blue-400';
      case 'user_action': return 'text-green-400';
      case 'tool_notification': return 'text-amber-400';
      case 'event_reminder': return 'text-purple-400';
      case 'social_notification': return 'text-pink-400';
      case 'compliance_alert': return 'text-red-500';
      case 'security_warning': return 'text-red-600';
      case 'platform_announcement': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'urgent': return 'bg-orange-500';
      case 'high': return 'bg-yellow-500';
      case 'medium': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: NotificationStatus) => {
    switch (status) {
      case 'sent': return 'text-green-400';
      case 'delivered': return 'text-blue-400';
      case 'failed': return 'text-red-400';
      case 'scheduled': return 'text-yellow-400';
      case 'cancelled': return 'text-gray-400';
      case 'draft': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getEngagementRate = () => {
    if (notification.metrics.delivered === 0) return 0;
    return Math.round(((notification.metrics.opened + notification.metrics.clicked) / notification.metrics.delivered) * 100);
  };

  return (
    <Card className="border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 transition-all">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <div className={`p-2 rounded-lg bg-gray-800 ${getTypeColor(notification.type)}`}>
              {getTypeIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-white truncate">{notification.title}</h3>
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                {notification.complianceLevel === 'violation' && (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">{notification.message}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                <span className="capitalize">{notification.type.replace('_', ' ')}</span>
                <span>•</span>
                <span className={getStatusColor(notification.status)}>{notification.status}</span>
                <span>•</span>
                <span>{notification.estimatedRecipients} recipients</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" onClick={onViewDetails}>
              <Eye className="w-4 h-4" />
            </Button>
            {notification.status === 'draft' && (
              <Button size="sm" variant="ghost" onClick={onEdit}>
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
            {notification.status === 'failed' && (
              <Button size="sm" variant="ghost" onClick={onResend} className="text-green-400">
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
            {['scheduled', 'draft'].includes(notification.status) && (
              <Button size="sm" variant="ghost" onClick={onCancel} className="text-red-400">
                <XCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Channels */}
        <div className="flex flex-wrap gap-1 mb-3">
          {notification.channels.map((channel) => (
            <Badge key={channel} size="xs" className="bg-blue-500/10 text-blue-400">
              {channel.replace('_', ' ')}
            </Badge>
          ))}
          {notification.relatedSpaceId && (
            <Badge size="xs" className="bg-purple-500/10 text-purple-400">
              Space-Related
            </Badge>
          )}
          {notification.complianceLevel && (
            <Badge 
              size="xs" 
              className={`${
                notification.complianceLevel === 'violation' ? 'bg-red-500/10 text-red-400' :
                notification.complianceLevel === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-green-500/10 text-green-400'
              }`}
            >
              {notification.complianceLevel}
            </Badge>
          )}
        </div>

        {/* Metrics Toggle */}
        {notification.status === 'sent' || notification.status === 'delivered' ? (
          <div>
            <button
              onClick={() => setShowMetrics(!showMetrics)}
              className="flex items-center justify-between w-full text-xs text-gray-400 hover:text-white transition-colors mb-2"
            >
              <span>Performance Metrics</span>
              {showMetrics ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            
            {showMetrics && (
              <div className="grid grid-cols-4 gap-2">
                  <div className="text-center p-2 bg-gray-800/50 rounded">
                    <div className="text-sm font-semibold text-green-400">{notification.metrics.delivered}</div>
                    <div className="text-xs text-gray-400">Delivered</div>
                  </div>
                  <div className="text-center p-2 bg-gray-800/50 rounded">
                    <div className="text-sm font-semibold text-blue-400">{notification.metrics.opened}</div>
                    <div className="text-xs text-gray-400">Opened</div>
                  </div>
                  <div className="text-center p-2 bg-gray-800/50 rounded">
                    <div className="text-sm font-semibold text-purple-400">{notification.metrics.clicked}</div>
                    <div className="text-xs text-gray-400">Clicked</div>
                  </div>
                  <div className="text-center p-2 bg-gray-800/50 rounded">
                    <div className="text-sm font-semibold text-amber-400">{getEngagementRate()}%</div>
                    <div className="text-xs text-gray-400">Engagement</div>
                  </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs">
            <div className="text-gray-400">
              {notification.scheduledFor ? (
                <>Scheduled: {new Date(notification.scheduledFor).toLocaleDateString()}</>
              ) : (
                <>Created: {new Date(notification.createdAt).toLocaleDateString()}</>
              )}
            </div>
            {notification.expiresAt && (
              <div className="text-yellow-400">
                Expires: {new Date(notification.expiresAt).toLocaleDateString()}
              </div>
            )}
          </div>
        )}

        {/* Space System Context */}
        {notification.spaceCategory && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Shield className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400">Space System Context</span>
              </div>
              <div className="text-gray-300 capitalize">
                {notification.spaceCategory.replace('_', ' ')}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const QuickStatsCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; direction: 'up' | 'down' | 'stable' };
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}> = ({ title, value, subtitle, trend, icon: Icon, color = 'text-gray-400' }) => {
  return (
    <Card className="border-gray-700 bg-gray-900/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className={`flex items-center space-x-1 text-sm mt-1 ${
                trend.direction === 'up' ? 'text-green-400' :
                trend.direction === 'down' ? 'text-red-400' :
                'text-gray-400'
              }`}>
                {trend.direction === 'up' ? <ArrowUp className="w-3 h-3" /> :
                 trend.direction === 'down' ? <ArrowDown className="w-3 h-3" /> :
                 <Minus className="w-3 h-3" />}
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <div className={`p-2 rounded-lg bg-gray-800 ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const HiveAdminNotificationManagement: React.FC<HiveAdminNotificationManagementProps> = ({
  // onSendNotification,
  // onCreateCampaign, 
  // onUpdateTemplate,
  enableFeatureFlag = true
}) => {
  const { admin } = useAdminAuth();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<HiveNotification[]>([]);
  const [campaigns, setCampaigns] = useState<NotificationCampaign[]>([]);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [analytics, setAnalytics] = useState<NotificationAnalytics | null>(null);
  
  const [selectedTab, setSelectedTab] = useState<'notifications' | 'campaigns' | 'templates' | 'analytics'>('notifications');
  const [typeFilter, setTypeFilter] = useState<NotificationType | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<NotificationStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Feature flag check
  if (!enableFeatureFlag) {
    return (
      <div className="text-center py-8">
        <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Notification management system is not available</p>
      </div>
    );
  }

  const loadNotifications = useCallback(async () => {
    if (!admin) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/notifications/comprehensive', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load notifications');
      }

      const data = await response.json();
      setNotifications(data.notifications || []);
      setCampaigns(data.campaigns || []);
      setTemplates(data.templates || []);
      setAnalytics(data.analytics);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [admin]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getNotificationStats = () => {
    const stats = {
      total: notifications.length,
      sent: notifications.filter(n => n.status === 'sent').length,
      scheduled: notifications.filter(n => n.status === 'scheduled').length,
      failed: notifications.filter(n => n.status === 'failed').length,
      draft: notifications.filter(n => n.status === 'draft').length,
      spaceRelated: notifications.filter(n => n.relatedSpaceId).length,
      complianceAlerts: notifications.filter(n => n.type === 'compliance_alert' || n.type === 'space_violation').length,
    };

    return stats;
  };

  const stats = getNotificationStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Notification Management</h2>
          <p className="text-gray-400 mt-1">
            Comprehensive platform communications with space system compliance enforcement
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={loadNotifications}
            disabled={loading}
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
          
          <Button className="bg-amber-500 hover:bg-amber-600 text-black">
            <Plus className="w-4 h-4 mr-2" />
            Create Notification
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <QuickStatsCard
          title="Total Notifications"
          value={stats.total}
          icon={Bell}
          color="text-blue-400"
        />
        <QuickStatsCard
          title="Sent Today"
          value={stats.sent}
          trend={{ value: 12, direction: 'up' }}
          icon={Send}
          color="text-green-400"
        />
        <QuickStatsCard
          title="Scheduled"
          value={stats.scheduled}
          icon={Clock}
          color="text-yellow-400"
        />
        <QuickStatsCard
          title="Failed"
          value={stats.failed}
          icon={XCircle}
          color="text-red-400"
        />
        <QuickStatsCard
          title="Space Related"
          value={stats.spaceRelated}
          icon={Globe}
          color="text-purple-400"
        />
        <QuickStatsCard
          title="Compliance Alerts"
          value={stats.complianceAlerts}
          icon={Shield}
          color="text-orange-400"
        />
        <QuickStatsCard
          title="Delivery Rate"
          value={analytics ? `${Math.round(analytics.deliveryRate)}%` : 'N/A'}
          trend={{ value: 3, direction: 'up' }}
          icon={Target}
          color="text-cyan-400"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
        <button
          onClick={() => setSelectedTab('notifications')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            selectedTab === 'notifications'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
          <Badge size="xs" className={selectedTab === 'notifications' ? 'bg-white/20' : 'bg-gray-700'}>
            {stats.total}
          </Badge>
        </button>
        
        <button
          onClick={() => setSelectedTab('campaigns')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            selectedTab === 'campaigns'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Campaigns</span>
          <Badge size="xs" className={selectedTab === 'campaigns' ? 'bg-white/20' : 'bg-gray-700'}>
            {campaigns.length}
          </Badge>
        </button>

        <button
          onClick={() => setSelectedTab('templates')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            selectedTab === 'templates'
              ? 'bg-green-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Templates</span>
          <Badge size="xs" className={selectedTab === 'templates' ? 'bg-white/20' : 'bg-gray-700'}>
            {templates.length}
          </Badge>
        </button>

        <button
          onClick={() => setSelectedTab('analytics')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            selectedTab === 'analytics'
              ? 'bg-amber-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </button>
      </div>

      {/* Content Based on Selected Tab */}
      {selectedTab === 'notifications' && (
        <div className="space-y-4">
          {/* Filters */}
          <Card className="border-gray-700 bg-gray-900/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as NotificationType | 'all')}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">All Types</option>
                  <option value="system_alert">System Alert</option>
                  <option value="space_violation">Space Violation</option>
                  <option value="compliance_alert">Compliance Alert</option>
                  <option value="platform_announcement">Announcement</option>
                  <option value="user_action">User Action</option>
                  <option value="tool_notification">Tool Notification</option>
                  <option value="event_reminder">Event Reminder</option>
                  <option value="social_notification">Social</option>
                </select>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as NotificationStatus | 'all')}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="sent">Sent</option>
                  <option value="delivered">Delivered</option>
                  <option value="failed">Failed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 text-amber-500 mx-auto mb-4 animate-spin" />
                <p className="text-gray-400">Loading notifications...</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No notifications found</h3>
                <p className="text-gray-400">
                  {searchTerm ? 'Try adjusting your search' : 'No notifications match the current filters'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onViewDetails={() => console.log('View details:', notification.id)}
                    onEdit={() => console.log('Edit notification:', notification.id)}
                    onCancel={() => console.log('Cancel notification:', notification.id)}
                    onResend={() => console.log('Resend notification:', notification.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Space System Compliance Integration */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>SPACE SYSTEM NOTIFICATION ENFORCEMENT</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">✅ COMPLIANCE NOTIFICATIONS</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Automatic space violation alerts</li>
                <li>• Compliance score updates</li>
                <li>• Space approval notifications</li>
                <li>• Tool installation confirmations</li>
              </ul>
            </div>
            
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">❌ VIOLATION ALERTS</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Forbidden space creation attempts</li>
                <li>• Space system misuse warnings</li>
                <li>• Immediate violation notifications</li>
                <li>• Escalation alert system</li>
              </ul>
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">🔧 SYSTEM INTEGRATION</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Real-time space monitoring</li>
                <li>• Automated enforcement actions</li>
                <li>• Cross-platform notification sync</li>
                <li>• Admin oversight dashboard</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
