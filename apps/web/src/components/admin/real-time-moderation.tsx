'use client';

import React, { useState, useEffect } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Avatar
} from '@hive/ui';
import {
  Flag,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MessageCircle,
  User,
  Clock,
  TrendingUp,
  Eye,
  Ban,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ContentReport {
  id: string;
  type: 'post' | 'comment' | 'profile' | 'space' | 'tool';
  contentId: string;
  contentPreview: string;
  reportedBy: {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
  };
  reportedUser: {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
    previousViolations: number;
  };
  reason: 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'other';
  description: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  action?: 'dismissed' | 'warned' | 'content_removed' | 'user_suspended' | 'user_banned';
  notes?: string;
}

interface ModerationStats {
  pending: number;
  reviewing: number;
  resolvedToday: number;
  avgResponseTime: number;
  falsePositiveRate: number;
  topReportReasons: { reason: string; count: number }[];
  recentTrends: { hour: string; reports: number }[];
}

interface AutoModerationRule {
  id: string;
  name: string;
  enabled: boolean;
  type: 'keyword' | 'pattern' | 'behavior' | 'ml_based';
  severity: 'low' | 'medium' | 'high';
  actions: string[];
  matchCount: number;
  falsePositives: number;
}

export function RealTimeModeration() {
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [stats, setStats] = useState<ModerationStats | null>(null);
  const [autoModRules, setAutoModRules] = useState<AutoModerationRule[]>([]);
  const [selectedReport, setSelectedReport] = useState<ContentReport | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModerationData();
    // Set up real-time updates
    const interval = setInterval(loadModerationData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadModerationData = async () => {
    try {
      const [reportsRes, statsRes, rulesRes] = await Promise.all([
        fetch('/api/admin/moderation/reports'),
        fetch('/api/admin/moderation/stats'),
        fetch('/api/admin/moderation/rules')
      ]);

      if (reportsRes.ok) {
        const reportsData = await reportsRes.json();
        setReports(reportsData.reports || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (rulesRes.ok) {
        const rulesData = await rulesRes.json();
        setAutoModRules(rulesData.rules || []);
      }
    } catch (error) {
      console.error('Failed to load moderation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReportAction = async (reportId: string, action: string, notes?: string) => {
    try {
      const response = await fetch(`/api/admin/moderation/reports/${reportId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, notes })
      });

      if (response.ok) {
        // Update local state
        setReports(prev => prev.map(report =>
          report.id === reportId
            ? { ...report, status: 'resolved' as const, action, reviewedAt: new Date(), notes } as ContentReport
            : report
        ));
        setSelectedReport(null);
        loadModerationData(); // Refresh data
      }
    } catch (error) {
      console.error('Failed to perform moderation action:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'reviewing': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      case 'escalated': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const filteredReports = reports.filter(report => {
    if (filterStatus !== 'all' && report.status !== filterStatus) return false;
    if (filterPriority !== 'all' && report.priority !== filterPriority) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Real-time Stats */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
              <p className="text-xs text-gray-400 mt-1">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Reviewing</CardTitle>
                <Eye className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{stats.reviewing}</div>
              <p className="text-xs text-gray-400 mt-1">Currently under review</p>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{stats.resolvedToday}</div>
              <p className="text-xs text-gray-400 mt-1">Avg {stats.avgResponseTime}min response</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                <Shield className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">
                {100 - stats.falsePositiveRate}%
              </div>
              <p className="text-xs text-gray-400 mt-1">True positive rate</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Auto-Moderation Rules */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Auto-Moderation</CardTitle>
              <CardDescription>AI-powered content filtering</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/20 text-green-400">
                {autoModRules.filter(r => r.enabled).length} Active
              </Badge>
              <Button size="sm" variant="outline">
                Configure Rules
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {autoModRules.slice(0, 3).map(rule => (
              <div key={rule.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${rule.enabled ? 'bg-green-500' : 'bg-gray-500'}`} />
                  <div>
                    <p className="font-medium text-white">{rule.name}</p>
                    <p className="text-xs text-gray-400">
                      {rule.matchCount} matches • {rule.falsePositives} false positives
                    </p>
                  </div>
                </div>
                <Badge className={`${
                  rule.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                  rule.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {rule.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Moderation Queue */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Moderation Queue</CardTitle>
              <CardDescription>Review reported content in real-time</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewing">Reviewing</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredReports.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No reports match your filters
              </div>
            ) : (
              filteredReports.map(report => (
                <div
                  key={report.id}
                  className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(report.priority)}`} />
                        <Badge className={`${getStatusColor(report.status)} text-white`}>
                          {report.status}
                        </Badge>
                        <Badge variant="freshman">{report.type}</Badge>
                        <Badge variant="freshman">{report.reason}</Badge>
                        <span className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                        </span>
                      </div>

                      <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                        "{report.contentPreview}"
                      </p>

                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-400">Reported user:</span>
                          <span className="text-white">{report.reportedUser.name}</span>
                          {report.reportedUser.previousViolations > 0 && (
                            <Badge className="bg-red-500/20 text-red-400 text-xs">
                              {report.reportedUser.previousViolations} previous
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Flag className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-400">By:</span>
                          <span className="text-white">{report.reportedBy.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleReportAction(report.id, 'dismissed');
                        }}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleReportAction(report.id, 'content_removed');
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setSelectedReport(report);
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trend Analysis */}
      {stats && stats.topReportReasons.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle>Report Trends</CardTitle>
            <CardDescription>Most common report reasons this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topReportReasons.map((item, index) => (
                <div key={item.reason} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>
                    <span className="text-sm font-medium capitalize text-white">
                      {item.reason.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{item.count} reports</span>
                    <TrendingUp className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}