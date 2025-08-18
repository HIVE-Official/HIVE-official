'use client'

import { HiveCard as Card, CardContent, CardHeader, CardTitle } from '@hive/ui'
import { Users, TrendingUp, AlertTriangle, Wrench } from 'lucide-react'

// Mock data - will be replaced with real Firestore data from daily cron
const mockMetrics = {
  totalUsers: 1247,
  conversionRate: 68.5,
  onboardingDropOff: 23.2,
  activeBuilders: 89,
  flaggedContent: 12,
  lastUpdated: '2025-01-15T08:00:00Z'
}

export const MetricCards = () => {
  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-4">
      {/* Last Updated */}
      <div className="text-right">
        <p className="text-xs text-gray-500">
          Last updated: {formatLastUpdated(mockMetrics.lastUpdated)}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {mockMetrics.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">
              Registered accounts
            </p>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {mockMetrics.conversionRate}%
            </div>
            <p className="text-xs text-gray-500">
              Onboarding completion
            </p>
          </CardContent>
        </Card>

        {/* Drop-off Rate */}
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Drop-off Rate
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {mockMetrics.onboardingDropOff}%
            </div>
            <p className="text-xs text-gray-500">
              Onboarding abandonment
            </p>
          </CardContent>
        </Card>

        {/* Active Builders */}
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Builders
            </CardTitle>
            <Wrench className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {mockMetrics.activeBuilders}
            </div>
            <p className="text-xs text-gray-500">
              Builder accounts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Banner for Flagged Content */}
      {mockMetrics.flaggedContent > 0 && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-red-400">
                  {mockMetrics.flaggedContent} items require moderation
                </p>
                <p className="text-xs text-red-300/70">
                  Check the Content Flags section below
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 