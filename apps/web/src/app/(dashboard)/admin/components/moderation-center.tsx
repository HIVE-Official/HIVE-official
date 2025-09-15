'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  Badge, 
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@hive/ui';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Flag,
  RefreshCw
} from 'lucide-react';

interface ContentReport {
  id: string;
  type: 'post' | 'comment' | 'profile' | 'space' | 'tool';
  reportedItemId: string;
  reportedUserId: string;
  reporterUserId: string;
  reason: string;
  description: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
  reviewedBy?: string;
  resolution?: string;
  metadata?: {
    contentPreview?: string;
    userHistory?: {
      previousReports: number;
      previousViolations: number;
    };
  };
}

interface ModerationStats {
  totalReports: number;
  pendingReports: number;
  resolvedToday: number;
  averageResolutionTime: number;
  reportsByType: Record<string, number>;
  reportsByPriority: Record<string, number>;
  topReporters: Array<{ userId: string; count: number }>;
  topViolators: Array<{ userId: string; count: number }>;
}

export default function ModerationCenter() {
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [stats, setStats] = useState<ModerationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<ContentReport | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'critical'>('pending');

  useEffect(() => {
    loadModerationData();
  }, []);

  const loadModerationData = async () => {
    try {
      setLoading(true);
      
      // Load reports
      const reportsResponse = await fetch('/api/admin/moderation/reports');
      if (reportsResponse.ok) {
        const reportsData = await reportsResponse.json();
        setReports(reportsData.reports || []);
      }

      // Load stats
      const statsResponse = await fetch('/api/admin/moderation/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }
    } catch (error) {
      logger.error('Error loading moderation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReportAction = async (reportId: string, action: 'approve' | 'dismiss' | 'escalate', resolution?: string) => {
    try {
      const response = await fetch(`/api/admin/moderation/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, resolution })
      });

      if (response.ok) {
        // Refresh data
        await loadModerationData();
        setSelectedReport(null);
      }
    } catch (error) {
      logger.error('Error handling report:', error);
    }
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    if (filter === 'pending') return report.status === 'pending' || report.status === 'reviewing';
    if (filter === 'critical') return report.priority === 'critical' || report.priority === 'high';
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'dismissed': return <XCircle className="h-4 w-4 text-gray-600" />;
      case 'reviewing': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Moderation Center</h2>
          <p className="text-muted-foreground">Review and manage content reports</p>
        </div>
        <Button onClick={loadModerationData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Pending Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingReports}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Resolved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolvedToday}</div>
              <p className="text-xs text-muted-foreground">Reports handled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Avg Resolution Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageResolutionTime}h</div>
              <p className="text-xs text-muted-foreground">Response time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReports}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
        <TabsList>
          <TabsTrigger value="pending">Pending ({reports.filter(r => r.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="critical">Critical ({reports.filter(r => r.priority === 'critical' || r.priority === 'high').length})</TabsTrigger>
          <TabsTrigger value="all">All Reports ({reports.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-4">
          <div className="space-y-4">
            {filteredReports.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-muted-foreground">No reports to review</p>
                </CardContent>
              </Card>
            ) : (
              filteredReports.map((report) => (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(report.status)}
                          <Badge className={getPriorityColor(report.priority)}>
                            {report.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{report.type}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h4 className="font-semibold mb-1">{report.reason}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        
                        {report.metadata?.contentPreview && (
                          <div className="bg-gray-50 rounded p-2 mb-2">
                            <p className="text-xs text-gray-600 truncate">
                              "{report.metadata.contentPreview}"
                            </p>
                          </div>
                        )}

                        {report.metadata?.userHistory && (
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>
                              <Flag className="h-3 w-3 inline mr-1" />
                              {report.metadata.userHistory.previousReports} previous reports
                            </span>
                            <span>
                              <AlertTriangle className="h-3 w-3 inline mr-1" />
                              {report.metadata.userHistory.previousViolations} violations
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2 ml-4">
                        {report.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleReportAction(report.id, 'approve', 'Content violates community guidelines')}
                            >
                              Take Action
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReportAction(report.id, 'dismiss')}
                            >
                              Dismiss
                            </Button>
                            {(report.priority === 'critical' || report.priority === 'high') && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReportAction(report.id, 'escalate')}
                              >
                                Escalate
                              </Button>
                            )}
                          </>
                        )}
                        {report.status === 'resolved' && (
                          <Badge variant="default" className="bg-green-600">
                            Resolved
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>Review and take action on this report</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Report details and action buttons */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Report Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>Type: {selectedReport.type}</div>
                    <div>Priority: {selectedReport.priority}</div>
                    <div>Status: {selectedReport.status}</div>
                    <div>Reason: {selectedReport.reason}</div>
                    <div>Description: {selectedReport.description}</div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedReport(null)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="default"
                    onClick={() => handleReportAction(selectedReport.id, 'approve', 'Content violates guidelines')}
                  >
                    Take Action
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}