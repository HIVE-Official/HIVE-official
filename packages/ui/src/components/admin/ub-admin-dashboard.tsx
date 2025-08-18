'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { ButtonEnhanced as Button } from '../../atomic/atoms/button-enhanced';
import { Text } from '../../atomic/atoms/text';
import { Icon } from '../../ui/icon';
import { cn } from '../lib/utils';
import { 
  Shield,
  Users,
  Home,
  Settings,
  Activity,
  Flag,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Database,
  Bell,
  Eye,
  Clock,
  UserCheck,
  Building2,
  GraduationCap,
  Zap,
  Mail,
  FileText,
  Calendar,
  MessageSquare,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Globe,
  Lock
} from 'lucide-react';

// =============================================================================
// UB CAMPUS ADMIN DASHBOARD DATA TYPES
// =============================================================================

export interface UBCampusMetrics {
  platform: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
    university: 'University at Buffalo';
    campus: 'North Campus' | 'South Campus' | 'Downtown' | 'All Campuses';
  };
  students: {
    total: number;
    active: number;
    newThisWeek: number;
    byYear: Record<string, number>;
    byMajor: Record<string, number>;
    byDorm: Record<string, number>;
    verified: number;
    pendingVerification: number;
  };
  spaces: {
    total: number;
    active: number;
    dormant: number;
    needsModeration: number;
    byCategory: Record<string, { count: number; members: number }>;
    totalMembers: number;
    averageEngagement: number;
  };
  tools: {
    total: number;
    active: number;
    pendingReview: number;
    deployments: number;
    byCategory: Record<string, number>;
    usage: {
      dailyActive: number;
      weeklyActive: number;
      monthlyActive: number;
    };
  };
  rituals: {
    total: number;
    active: number;
    completed: number;
    participation: {
      current: number;
      total: number;
      rate: number;
    };
    campusImpact: number;
  };
  content: {
    posts: number;
    comments: number;
    reported: number;
    moderated: number;
    flagged: number;
    approved: number;
  };
  system: {
    status: 'healthy' | 'warning' | 'critical';
    uptime: number;
    performance: {
      responseTime: number;
      errorRate: number;
      throughput: number;
    };
    storage: {
      used: number;
      total: number;
      percentage: number;
    };
    costs: {
      monthly: number;
      daily: number;
      trend: 'up' | 'down' | 'stable';
    };
  };
}

export interface UBModerationItem {
  id: string;
  type: 'space' | 'tool' | 'post' | 'comment' | 'user' | 'ritual';
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
    handle: string;
    email: string;
  };
  reportedBy?: {
    id: string;
    name: string;
    handle: string;
  };
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'escalated';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  campusContext: {
    building?: string;
    dorm?: string;
    department?: string;
    course?: string;
  };
}

export interface UBAdminAction {
  id: string;
  type: 'user_action' | 'content_moderation' | 'system_admin' | 'campus_management';
  action: string;
  description: string;
  adminId: string;
  adminName: string;
  targetId: string;
  targetType: string;
  timestamp: string;
  impact: 'low' | 'medium' | 'high';
  reversible: boolean;
}

// =============================================================================
// UB ADMIN METRICS OVERVIEW COMPONENT
// =============================================================================

interface UBAdminMetricsOverviewProps {
  metrics: UBCampusMetrics;
  className?: string;
}

export function UBAdminMetricsOverview({ metrics, className }: UBAdminMetricsOverviewProps) {
  const { students, spaces, tools, rituals, content, system } = metrics;

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Platform Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-400/10">
            <Shield className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <Text variant="h2" weight="bold">
              {metrics.platform.name} Admin Dashboard
            </Text>
            <Text variant="body-sm" color="secondary">
              {metrics.platform.university} • {metrics.platform.campus} • Version {metrics.platform.version}
            </Text>
          </div>
        </div>
        <Badge variant={metrics.platform.environment === 'production' ? 'primary' : 'secondary'}>
          {metrics.platform.environment.toUpperCase()}
        </Badge>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Students */}
        <Card className="border-[var(--hive-border-default)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">UB Students</CardTitle>
            <Users className="h-4 w-4 text-[var(--hive-text-secondary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
              {students.total.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Text variant="body-xs" color="secondary">
                {students.active} active
              </Text>
              <Text variant="body-xs" color="success">
                +{students.newThisWeek} this week
              </Text>
            </div>
          </CardContent>
        </Card>

        {/* Spaces */}
        <Card className="border-[var(--hive-border-default)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campus Spaces</CardTitle>
            <Home className="h-4 w-4 text-[var(--hive-text-secondary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
              {spaces.active}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Text variant="body-xs" color="secondary">
                of {spaces.total} total
              </Text>
              {spaces.needsModeration > 0 && (
                <Text variant="body-xs" color="warning">
                  {spaces.needsModeration} pending
                </Text>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tools */}
        <Card className="border-[var(--hive-border-default)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campus Tools</CardTitle>
            <Zap className="h-4 w-4 text-[var(--hive-text-secondary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
              {tools.active}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Text variant="body-xs" color="secondary">
                {tools.deployments} deployments
              </Text>
              {tools.pendingReview > 0 && (
                <Text variant="body-xs" color="warning">
                  {tools.pendingReview} pending
                </Text>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-[var(--hive-border-default)]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Monitor className="h-4 w-4 text-[var(--hive-text-secondary)]" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                system.status === 'healthy' ? 'bg-green-400' : 
                system.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
              )} />
              <Text variant="body-sm" weight="medium" className="capitalize">
                {system.status}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary" className="mt-1">
              Uptime: {formatUptime(system.uptime)}
            </Text>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Demographics */}
        <Card className="border-[var(--hive-border-default)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Student Demographics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Text variant="body-sm" weight="medium" className="mb-2">
                By Class Year
              </Text>
              <div className="space-y-2">
                {Object.entries(students.byYear).map(([year, count]) => (
                  <div key={year} className="flex justify-between items-center">
                    <Text variant="body-sm" color="secondary">{year}</Text>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Text variant="body-sm" weight="medium" className="mb-2">
                Verification Status
              </Text>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-2 rounded-lg bg-[var(--hive-background-primary)]">
                  <Text variant="body-lg" weight="bold" color="success">
                    {students.verified}
                  </Text>
                  <Text variant="body-xs" color="secondary">
                    Verified
                  </Text>
                </div>
                <div className="text-center p-2 rounded-lg bg-[var(--hive-background-primary)]">
                  <Text variant="body-lg" weight="bold" color="warning">
                    {students.pendingVerification}
                  </Text>
                  <Text variant="body-xs" color="secondary">
                    Pending
                  </Text>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Moderation */}
        <Card className="border-[var(--hive-border-default)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-5 w-5" />
              Content Moderation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-[var(--hive-background-primary)]">
                <Text variant="body-lg" weight="bold" color="primary">
                  {content.posts}
                </Text>
                <Text variant="body-xs" color="secondary">
                  Total Posts
                </Text>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--hive-background-primary)]">
                <Text variant="body-lg" weight="bold" color="primary">
                  {content.comments}
                </Text>
                <Text variant="body-xs" color="secondary">
                  Comments
                </Text>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Text variant="body-sm" color="secondary">Reported Content</Text>
                <Badge variant="warning">{content.reported}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text variant="body-sm" color="secondary">Auto-Flagged</Text>
                <Badge variant="secondary">{content.flagged}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <Text variant="body-sm" color="secondary">Approved</Text>
                <Badge variant="success">{content.approved}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <Card className="border-[var(--hive-border-default)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            System Performance & Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-[var(--hive-background-primary)]">
              <Text variant="body-lg" weight="bold" color="primary">
                {system.performance.responseTime}ms
              </Text>
              <Text variant="body-xs" color="secondary">
                Avg Response Time
              </Text>
            </div>
            <div className="text-center p-3 rounded-lg bg-[var(--hive-background-primary)]">
              <Text variant="body-lg" weight="bold" color="primary">
                {(system.performance.errorRate * 100).toFixed(2)}%
              </Text>
              <Text variant="body-xs" color="secondary">
                Error Rate
              </Text>
            </div>
            <div className="text-center p-3 rounded-lg bg-[var(--hive-background-primary)]">
              <Text variant="body-lg" weight="bold" color="primary">
                {system.storage.percentage}%
              </Text>
              <Text variant="body-xs" color="secondary">
                Storage Used
              </Text>
            </div>
            <div className="text-center p-3 rounded-lg bg-[var(--hive-background-primary)]">
              <Text variant="body-lg" weight="bold" color="primary">
                {formatCurrency(system.costs.monthly)}
              </Text>
              <Text variant="body-xs" color="secondary">
                Monthly Cost
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// =============================================================================
// UB MODERATION QUEUE COMPONENT
// =============================================================================

interface UBModerationQueueProps {
  items: UBModerationItem[];
  onApprove?: (itemId: string) => void;
  onReject?: (itemId: string) => void;
  onEscalate?: (itemId: string) => void;
  onView?: (itemId: string) => void;
  className?: string;
}

export function UBModerationQueue({ 
  items, 
  onApprove,
  onReject,
  onEscalate,
  onView,
  className 
}: UBModerationQueueProps) {
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20';
      case 'high': return 'text-orange-400 bg-orange-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'space': return Home;
      case 'tool': return Zap;
      case 'post': return MessageSquare;
      case 'comment': return MessageSquare;
      case 'user': return Users;
      case 'ritual': return Calendar;
      default: return FileText;
    }
  };

  if (items.length === 0) {
    return (
      <Card className={cn("border-[var(--hive-border-default)]", className)}>
        <CardContent className="text-center py-12">
          <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <Text variant="h3" weight="semibold" className="mb-2">
            All Clear!
          </Text>
          <Text variant="body-sm" color="secondary">
            No items pending moderation at this time.
          </Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("border-[var(--hive-border-default)]", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5" />
          Moderation Queue
          <Badge variant="warning" className="ml-auto">
            {items.filter(item => item.status === 'pending').length} pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          
          return (
            <Card key={item.id} className="border-[var(--hive-border-default)]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[var(--hive-background-primary)]">
                      <TypeIcon className="h-4 w-4 text-[var(--hive-text-secondary)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Text variant="body-sm" weight="medium">
                          {item.title}
                        </Text>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {item.type}
                        </Badge>
                        <Badge className={cn("text-xs capitalize", getSeverityColor(item.severity))}>
                          {item.severity}
                        </Badge>
                      </div>
                      <Text variant="body-xs" color="secondary" className="mb-2">
                        {item.description}
                      </Text>
                      <div className="flex items-center gap-4 text-xs text-[var(--hive-text-secondary)]">
                        <span>By {item.author.name} (@{item.author.handle})</span>
                        <span>{formatTimeAgo(item.createdAt)}</span>
                        {item.reportedBy && (
                          <span>Reported by {item.reportedBy.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView?.(item.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {item.status === 'pending' && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => onApprove?.(item.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onReject?.(item.id)}
                        >
                          Reject
                        </Button>
                        {item.severity === 'critical' && (
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => onEscalate?.(item.id)}
                          >
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Escalate
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
                
                {/* Campus Context */}
                {Object.keys(item.campusContext).length > 0 && (
                  <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-[var(--hive-background-primary)]">
                    <Building2 className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                    <Text variant="body-xs" color="secondary">
                      Campus Context:
                    </Text>
                    {Object.entries(item.campusContext).map(([key, value]) => (
                      value && (
                        <Badge key={key} variant="ghost" className="text-xs">
                          {key}: {value}
                        </Badge>
                      )
                    ))}
                  </div>
                )}
                
                {/* Reason */}
                <div className="mt-3 p-2 rounded-lg bg-[var(--hive-background-primary)]">
                  <Text variant="body-xs" weight="medium" className="mb-1">
                    Reason:
                  </Text>
                  <Text variant="body-xs" color="secondary">
                    {item.reason}
                  </Text>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}

// =============================================================================
// UB ADMIN QUICK ACTIONS COMPONENT
// =============================================================================

interface UBAdminQuickActionsProps {
  onSendCampusNotification?: () => void;
  onExportUserData?: () => void;
  onGenerateReport?: (type: string) => void;
  onSystemMaintenance?: () => void;
  onBackupData?: () => void;
  className?: string;
}

export function UBAdminQuickActions({ 
  onSendCampusNotification,
  onExportUserData,
  onGenerateReport,
  onSystemMaintenance,
  onBackupData,
  className 
}: UBAdminQuickActionsProps) {
  return (
    <Card className={cn("border-[var(--hive-border-default)]", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="primary"
            className="w-full justify-start"
            onClick={onSendCampusNotification}
          >
            <Bell className="h-4 w-4 mr-2" />
            Send Campus Notification
          </Button>
          
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={onExportUserData}
          >
            <Database className="h-4 w-4 mr-2" />
            Export User Data
          </Button>
          
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={() => onGenerateReport?.('weekly')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Weekly Report
          </Button>
          
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={() => onGenerateReport?.('security')}
          >
            <Lock className="h-4 w-4 mr-2" />
            Security Report
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={onSystemMaintenance}
          >
            <Settings className="h-4 w-4 mr-2" />
            System Maintenance
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={onBackupData}
          >
            <HardDrive className="h-4 w-4 mr-2" />
            Backup Database
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}