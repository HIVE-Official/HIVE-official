"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Textarea } from '@hive/ui';
import { secureApiFetch } from '@/lib/secure-auth-utils';
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Trash2,
  UserX,
  Ban,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  RefreshCw,
  ArrowUpDown,
  User,
  Calendar,
  Flag,
  Shield,
} from "lucide-react";

interface ContentReport {
  id: string;
  reporterId: string;
  reporterInfo: {
    name: string;
    email: string;
    trustScore: number;
  };
  contentId: string;
  contentType:
    | "post"
    | "comment"
    | "message"
    | "tool"
    | "space"
    | "profile"
    | "event";
  contentOwnerId: string;
  spaceId?: string;
  category: string;
  subCategory?: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  evidence?: {
    screenshots: string[];
    urls: string[];
    additionalContext: string;
  };
  status: "pending" | "under_review" | "resolved" | "dismissed" | "escalated";
  assignedModerator?: string;
  aiAnalysis?: {
    confidence: number;
    suggestedAction: string;
    riskScore: number;
    reasoning: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ModerationStats {
  pendingReports: number;
  todayReports: number;
  resolvedToday: number;
  lastUpdated: string;
}

export function ModerationQueue() {
  const [reports, setReports] = useState<ContentReport[]>([]);
  const [stats, setStats] = useState<ModerationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<ContentReport | null>(
    null
  );
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState("pending");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [assignmentFilter, setAssignmentFilter] = useState("all");

  // Action dialog state
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    report: ContentReport | null;
    action: string;
  }>({
    isOpen: false,
    report: null,
    action: "",
  });

  const [actionReason, setActionReason] = useState("");
  const [actionNotes, setActionNotes] = useState("");

  const fetchModerationQueue = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        limit: "50",
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(categoryFilter !== "all" && { category: categoryFilter }),
        ...(severityFilter !== "all" && { severity: severityFilter }),
        ...(assignmentFilter === "me" && { assignedTo: "me" }),
        ...(assignmentFilter !== "all" &&
          assignmentFilter !== "me" && { assignedTo: assignmentFilter }),
      });

      const response = await secureApiFetch(`/api/admin/moderation?${params}`);
      if (response.ok) {
        const data = await response.json();
        setReports(data.reports);
        setStats(data.statistics);
      }
    } catch (error) {
      console.error("Failed to fetch moderation queue:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModerationQueue();
    const interval = setInterval(fetchModerationQueue, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [
    statusFilter,
    categoryFilter,
    severityFilter,
    assignmentFilter,
  ]);

  const handleModerationAction = async (
    reportId: string,
    action: string,
    reason: string,
    notes?: string
  ) => {
    try {
      setIsProcessingAction(true);
      const response = await secureApiFetch("/api/admin/moderation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          action,
          reason,
          notes,
        }),
      });

      if (response.ok) {
        await fetchModerationQueue(); // Refresh the queue
        setActionDialog({ isOpen: false, report: null, action: "" });
        setActionReason("");
        setActionNotes("");
      } else {
        throw new Error("Failed to process moderation action");
      }
    } catch (error) {
      console.error("Error processing moderation action:", error);
    } finally {
      setIsProcessingAction(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "under_review":
        return <Eye className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "dismissed":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      case "escalated":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Flag className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "hide_content":
        return <EyeOff className="h-4 w-4" />;
      case "remove_content":
        return <Trash2 className="h-4 w-4" />;
      case "warn_user":
        return <AlertTriangle className="h-4 w-4" />;
      case "suspend_user":
        return <UserX className="h-4 w-4" />;
      case "ban_user":
        return <Ban className="h-4 w-4" />;
      case "escalate_human":
        return <ArrowUpDown className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  if (isLoading && reports.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">
            Loading moderation queue...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Moderation Queue</h1>
          <p className="text-gray-400">Review and moderate reported content</p>
        </div>

        <Button
          onClick={fetchModerationQueue}
          variant="secondary"
          size="sm"
          disabled={isLoading}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm font-medium">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span>Pending Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats.pendingReports}
              </div>
              <p className="text-sm text-gray-400">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm font-medium">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>Today&apos;s Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats.todayReports}
              </div>
              <p className="text-sm text-gray-400">New today</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-sm font-medium">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Resolved Today</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats.resolvedToday}
              </div>
              <p className="text-sm text-gray-400">Processed</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-40 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
              <option value="escalated">Escalated</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-40 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
            >
              <option value="all">All Categories</option>
              <option value="spam">Spam</option>
              <option value="harassment">Harassment</option>
              <option value="hate_speech">Hate Speech</option>
              <option value="inappropriate_content">Inappropriate</option>
              <option value="misinformation">Misinformation</option>
              <option value="violence">Violence</option>
              <option value="other">Other</option>
            </select>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-40 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={assignmentFilter}
              onChange={(e) => setAssignmentFilter(e.target.value)}
              className="w-40 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
            >
              <option value="all">All Reports</option>
              <option value="me">My Reports</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Queue is Clear!
                </h3>
                <p className="text-gray-400">
                  No reports match the current filters.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          reports.map((report) => (
            <Card
              key={report.id}
              className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${getSeverityColor(
                          report.severity
                        )}`}
                      />
                      <Badge variant="freshman" className="text-xs">
                        {report.contentType}
                      </Badge>
                      <Badge variant="freshman" className="text-xs capitalize">
                        {report.category.replace("_", " ")}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(report.status)}
                        <span className="text-sm text-gray-400 capitalize">
                          {report.status.replace("_", " ")}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatTimeAgo(report.createdAt)}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-white font-medium mb-1">
                        Report #{report.id.slice(-8)}
                      </p>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {report.description}
                      </p>
                    </div>

                    {/* Reporter Info */}
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">
                          Reporter: {report.reporterInfo.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">
                          Trust:{" "}
                          {Math.round(report.reporterInfo.trustScore * 100)}%
                        </span>
                      </div>
                      {report.aiAnalysis && (
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4 text-purple-400" />
                          <span className="text-purple-400">
                            AI: {Math.round(report.aiAnalysis.confidence * 100)}
                            % confident
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSelectedReport(report);
                        setIsReviewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                    <Dialog
                      open={isReviewDialogOpen}
                      onOpenChange={setIsReviewDialogOpen}
                    >
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Report Details</DialogTitle>
                        </DialogHeader>
                        {selectedReport && (
                          <ReportDetailsPanel
                            report={selectedReport}
                            onAction={(action) => {
                              setActionDialog({
                                isOpen: true,
                                report: selectedReport,
                                action,
                              });
                            }}
                          />
                        )}
                      </DialogContent>
                    </Dialog>

                    {report.status === "pending" && (
                      <>
                        <Button
                          onClick={() =>
                            setActionDialog({
                              isOpen: true,
                              report,
                              action: "warn_user",
                            })
                          }
                          variant="outline"
                          size="sm"
                          className="text-yellow-400 border-yellow-400/50 hover:bg-yellow-400/10"
                        >
                          {getActionIcon("warn_user")}
                        </Button>
                        <Button
                          onClick={() =>
                            setActionDialog({
                              isOpen: true,
                              report,
                              action: "hide_content",
                            })
                          }
                          variant="outline"
                          size="sm"
                          className="text-orange-400 border-orange-400/50 hover:bg-orange-400/10"
                        >
                          {getActionIcon("hide_content")}
                        </Button>
                        <Button
                          onClick={() =>
                            setActionDialog({
                              isOpen: true,
                              report,
                              action: "remove_content",
                            })
                          }
                          variant="outline"
                          size="sm"
                          className="text-red-400 border-red-400/50 hover:bg-red-400/10"
                        >
                          {getActionIcon("remove_content")}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Moderation Action Dialog */}
      <Dialog
        open={actionDialog.isOpen}
        onOpenChange={(open) =>
          !open && setActionDialog({ isOpen: false, report: null, action: "" })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {getActionIcon(actionDialog.action)}
              <span>Confirm {actionDialog.action.replace("_", " ")}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This action will{" "}
                {actionDialog.action.replace("_", " ").toLowerCase()} for report
                #{actionDialog.report?.id.slice(-8)}.
              </AlertDescription>
            </Alert>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Reason (required)
              </label>
              <Textarea
                value={actionReason}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setActionReason(e.target.value)
                }
                placeholder="Provide a detailed reason for this action..."
                className="min-h-[80px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Additional Notes (optional)
              </label>
              <Textarea
                value={actionNotes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setActionNotes(e.target.value)
                }
                placeholder="Any additional context or notes..."
                className="min-h-[60px]"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="secondary"
                onClick={() =>
                  setActionDialog({ isOpen: false, report: null, action: "" })
                }
                disabled={isProcessingAction}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (actionDialog.report && actionReason.trim()) {
                    handleModerationAction(
                      actionDialog.report.id,
                      actionDialog.action,
                      actionReason,
                      actionNotes.trim() || undefined
                    );
                  }
                }}
                disabled={isProcessingAction || !actionReason.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                {isProcessingAction ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  getActionIcon(actionDialog.action)
                )}
                Confirm Action
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Detailed report review panel
function ReportDetailsPanel({
  report,
  onAction,
}: {
  report: ContentReport;
  onAction: (action: string) => void;
}) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Report Details</TabsTrigger>
          <TabsTrigger value="content">Content Preview</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-white mb-2">
                Report Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">ID:</span>
                  <span className="text-white">{report.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <Badge variant="freshman">{report.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Severity:</span>
                  <Badge className={getSeverityColor(report.severity)}>
                    {report.severity}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Content Type:</span>
                  <span className="text-white">{report.contentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Created:</span>
                  <span className="text-white">
                    {new Date(report.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-white mb-2">Reporter</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{report.reporterInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Trust Score:</span>
                  <span className="text-white">
                    {Math.round(report.reporterInfo.trustScore * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-2">Description</h4>
            <p className="text-gray-300 bg-gray-800 p-3 rounded border">
              {report.description}
            </p>
          </div>

          {report.evidence && (
            <div>
              <h4 className="font-medium text-white mb-2">Evidence</h4>
              <div className="bg-gray-800 p-3 rounded border">
                {report.evidence.additionalContext && (
                  <p className="text-gray-300 mb-2">
                    {report.evidence.additionalContext}
                  </p>
                )}
                {report.evidence.urls && report.evidence.urls.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">URLs:</p>
                    {report.evidence.urls.map((url, index) => (
                      <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm block"
                      >
                        {url}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Content preview would be loaded here from the actual content
              source.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {report.aiAnalysis ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">AI Assessment</h4>
                <div className="bg-gray-800 p-4 rounded border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={report.aiAnalysis.confidence * 100}
                        className="w-20"
                      />
                      <span className="text-white">
                        {Math.round(report.aiAnalysis.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Suggested Action:</span>
                    <Badge variant="freshman">
                      {report.aiAnalysis.suggestedAction}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Risk Score:</span>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={report.aiAnalysis.riskScore * 100}
                        className="w-20"
                      />
                      <span className="text-white">
                        {Math.round(report.aiAnalysis.riskScore * 100)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">Reasoning:</span>
                    <p className="text-gray-300 text-sm">
                      {report.aiAnalysis.reasoning}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                AI analysis is not available for this report.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      {report.status === "pending" && (
        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-800">
          <Button
            onClick={() => onAction("no_action")}
            variant="outline"
            size="sm"
          >
            Dismiss
          </Button>
          <Button
            onClick={() => onAction("warn_user")}
            variant="outline"
            size="sm"
            className="text-yellow-400"
          >
            Warn User
          </Button>
          <Button
            onClick={() => onAction("hide_content")}
            variant="outline"
            size="sm"
            className="text-orange-400"
          >
            Hide Content
          </Button>
          <Button
            onClick={() => onAction("remove_content")}
            variant="outline"
            size="sm"
            className="text-red-400"
          >
            Remove Content
          </Button>
        </div>
      )}
    </div>
  );

  function getSeverityColor(severity: string) {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  }
}
