"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card } from "../atoms/card"
import { Badge } from "../atoms/badge"
import { Button } from "../atoms/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../atoms/select"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointerClick,
  Calendar,
  Download,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

export interface ToolAnalytics {
  toolId: string
  toolName: string
  toolIcon: string

  // Submission metrics
  totalSubmissions: number
  submissionTrend: number // percentage change
  completionRate: number // percentage
  avgCompletionTime: string // e.g., "2m 34s"

  // Engagement metrics
  totalViews: number
  uniqueUsers: number
  abandonmentRate: number // percentage

  // Participation
  activeMembers: number
  totalMembers: number
  participationRate: number // percentage
  topContributors: Array<{
    name: string
    handle: string
    count: number
  }>

  // Time-based data
  usageByHour: Array<{ hour: number; count: number }>
  usageByDay: Array<{ day: string; count: number }>

  // Response patterns (for polls, surveys, etc.)
  topResponses?: Array<{
    answer: string
    count: number
    percentage: number
  }>
}

export interface AnalyticsInsight {
  id: string
  type: "success" | "warning" | "info"
  title: string
  description: string
  metric?: string
  icon: React.ReactNode
}

export interface HiveLabAnalyticsDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Analytics data for tools */
  toolsAnalytics?: ToolAnalytics[]

  /** Selected tool ID */
  selectedToolId?: string

  /** Tool selection handler */
  onToolSelect?: (toolId: string) => void

  /** Date range */
  dateRange?: "7d" | "30d" | "90d" | "all"

  /** Date range change handler */
  onDateRangeChange?: (range: "7d" | "30d" | "90d" | "all") => void

  /** Export data handler */
  onExport?: (format: "csv" | "pdf") => void

  /** Insights */
  insights?: AnalyticsInsight[]
}

const HiveLabAnalyticsDashboard = React.forwardRef<
  HTMLDivElement,
  HiveLabAnalyticsDashboardProps
>(
  (
    {
      className,
      toolsAnalytics = [],
      selectedToolId,
      onToolSelect,
      dateRange = "30d",
      onDateRangeChange,
      onExport,
      insights = [],
      ...props
    },
    ref
  ) => {
    const selectedTool = toolsAnalytics.find((t) => t.toolId === selectedToolId)

    return (
      <Card ref={ref} className={cn("flex flex-col h-full", className)} {...props}>
        {/* Header */}
        <div className="p-6 border-b border-white/8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Tool Analytics</h2>
              <p className="text-sm text-white/70">
                Track performance and member engagement
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Date Range Selector */}
              <Select value={dateRange} onValueChange={onDateRangeChange}>
                <SelectTrigger className="w-32 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>

              {/* Export Button */}
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2"
                onClick={() => onExport?.("csv")}
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Tool Selector */}
          {toolsAnalytics.length > 0 && (
            <Select value={selectedToolId} onValueChange={onToolSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a tool..." />
              </SelectTrigger>
              <SelectContent>
                {toolsAnalytics.map((tool) => (
                  <SelectItem key={tool.toolId} value={tool.toolId}>
                    <div className="flex items-center gap-2">
                      <span>{tool.toolIcon}</span>
                      <span>{tool.toolName}</span>
                      <Badge variant="sophomore" className="ml-auto">
                        {tool.totalSubmissions} submissions
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {selectedTool ? (
          <Tabs defaultValue="overview" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 mx-6 mt-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  label="Total Submissions"
                  value={selectedTool.totalSubmissions.toString()}
                  trend={selectedTool.submissionTrend}
                  icon={<MousePointerClick className="h-4 w-4" />}
                />
                <MetricCard
                  label="Completion Rate"
                  value={`${selectedTool.completionRate}%`}
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  trendColor="green"
                />
                <MetricCard
                  label="Total Views"
                  value={selectedTool.totalViews.toString()}
                  icon={<Eye className="h-4 w-4" />}
                />
                <MetricCard
                  label="Unique Users"
                  value={selectedTool.uniqueUsers.toString()}
                  icon={<Users className="h-4 w-4" />}
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Usage by Day */}
                <Card className="p-4">
                  <h3 className="text-sm font-semibold mb-4">Usage Trend</h3>
                  <div className="space-y-2">
                    {selectedTool.usageByDay.map((day) => (
                      <div key={day.day} className="flex items-center gap-2">
                        <span className="text-xs text-white/70 w-16">{day.day}</span>
                        <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-[#FFD700] transition-all"
                            style={{
                              width: `${(day.count / Math.max(...selectedTool.usageByDay.map(d => d.count))) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium w-8 text-right">{day.count}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Usage by Hour */}
                <Card className="p-4">
                  <h3 className="text-sm font-semibold mb-4">Peak Usage Hours</h3>
                  <div className="flex items-end justify-between gap-1 h-32">
                    {selectedTool.usageByHour.map((hour) => {
                      const maxCount = Math.max(...selectedTool.usageByHour.map(h => h.count))
                      const height = (hour.count / maxCount) * 100
                      return (
                        <div key={hour.hour} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full bg-[#FFD700] rounded-t transition-all hover:opacity-80"
                            style={{ height: `${height}%` }}
                            title={`${hour.hour}:00 - ${hour.count} submissions`}
                          />
                          <span className="text-[9px] text-white/70">
                            {hour.hour}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              </div>

              {/* Top Responses (if available) */}
              {selectedTool.topResponses && selectedTool.topResponses.length > 0 && (
                <Card className="p-4">
                  <h3 className="text-sm font-semibold mb-4">Top Responses</h3>
                  <div className="space-y-3">
                    {selectedTool.topResponses.map((response, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">{response.answer}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/70">{response.count}</span>
                            <Badge variant="sophomore" className="text-xs">
                              {response.percentage}%
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <div
                            className="h-full bg-[#FFD700] rounded-full transition-all"
                            style={{ width: `${response.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Engagement Tab */}
            <TabsContent value="engagement" className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                  label="Avg. Completion Time"
                  value={selectedTool.avgCompletionTime}
                  icon={<Calendar className="h-4 w-4" />}
                />
                <MetricCard
                  label="Abandonment Rate"
                  value={`${selectedTool.abandonmentRate}%`}
                  icon={<AlertCircle className="h-4 w-4" />}
                  trendColor={selectedTool.abandonmentRate > 30 ? "red" : "green"}
                />
                <MetricCard
                  label="Participation Rate"
                  value={`${selectedTool.participationRate}%`}
                  icon={<Users className="h-4 w-4" />}
                  trendColor="green"
                />
              </div>

              {/* Engagement Details */}
              <Card className="p-4">
                <h3 className="text-sm font-semibold mb-4">Engagement Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-white/70" />
                      <span className="text-sm">Viewed tool</span>
                    </div>
                    <span className="text-sm font-semibold">{selectedTool.totalViews}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <MousePointerClick className="h-4 w-4 text-white/70" />
                      <span className="text-sm">Started submission</span>
                    </div>
                    <span className="text-sm font-semibold">
                      {Math.round(selectedTool.totalViews * 0.7)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#FFD700]/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#FFD700]" />
                      <span className="text-sm font-medium">Completed submission</span>
                    </div>
                    <span className="text-sm font-semibold text-[#FFD700]">
                      {selectedTool.totalSubmissions}
                    </span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Participants Tab */}
            <TabsContent value="participants" className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricCard
                  label="Active Members"
                  value={`${selectedTool.activeMembers} / ${selectedTool.totalMembers}`}
                  icon={<Users className="h-4 w-4" />}
                />
                <MetricCard
                  label="Participation Rate"
                  value={`${selectedTool.participationRate}%`}
                  icon={<TrendingUp className="h-4 w-4" />}
                  trendColor="green"
                />
              </div>

              {/* Top Contributors */}
              <Card className="p-4">
                <h3 className="text-sm font-semibold mb-4">Top Contributors</h3>
                <div className="space-y-2">
                  {selectedTool.topContributors.map((contributor, idx) => (
                    <div
                      key={contributor.handle}
                      className="flex items-center justify-between p-3 bg-white/10 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FFD700] text-black text-xs font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {contributor.name}
                          </p>
                          <p className="text-xs text-white/70">{contributor.handle}</p>
                        </div>
                      </div>
                      <Badge variant="sophomore">{contributor.count} submissions</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="flex-1 overflow-y-auto p-6 space-y-4">
              {insights.length > 0 ? (
                insights.map((insight) => (
                  <Card
                    key={insight.id}
                    className={cn(
                      "p-4",
                      insight.type === "success" && "border-green-500/50 bg-green-500/5",
                      insight.type === "warning" && "border-yellow-500/50 bg-yellow-500/5",
                      insight.type === "info" && "border-blue-500/50 bg-blue-500/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          insight.type === "success" && "bg-green-500/10 text-green-500",
                          insight.type === "warning" && "bg-yellow-500/10 text-yellow-500",
                          insight.type === "info" && "bg-blue-500/10 text-blue-500"
                        )}
                      >
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-sm text-white/70">{insight.description}</p>
                        {insight.metric && (
                          <Badge variant="freshman" className="mt-2">
                            {insight.metric}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4 text-white/70" />
                  <h3 className="text-sm font-semibold mb-2">No insights yet</h3>
                  <p className="text-xs text-white/70">
                    We'll generate insights as your tool gets more usage
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">No Tool Selected</h3>
              <p className="text-sm text-white/70">
                Select a tool above to view its analytics
              </p>
            </div>
          </div>
        )}
      </Card>
    )
  }
)

HiveLabAnalyticsDashboard.displayName = "HiveLabAnalyticsDashboard"

// Metric Card Component
interface MetricCardProps {
  label: string
  value: string
  trend?: number
  trendColor?: "green" | "red"
  icon: React.ReactNode
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  trendColor,
  icon,
}) => {
  const showTrend = trend !== undefined
  const isPositive = trend && trend > 0

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-white/70">{label}</span>
        <div className="text-white/70">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-white">{value}</p>
        {showTrend && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trendColor === "green" && "text-green-500",
              trendColor === "red" && "text-red-500",
              !trendColor && (isPositive ? "text-green-500" : "text-red-500")
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </Card>
  )
}

export { HiveLabAnalyticsDashboard }
