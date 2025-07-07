'use client'

import { useState, useEffect } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '@hive/ui'
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Mail,
  MousePointer,
  CheckCircle,
  Smartphone,
  Monitor,
  Activity,
  BarChart3,
  RefreshCw
} from 'lucide-react'

// Temporary local Card components until we fix the import
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)
const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)
const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)
const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={className}>{children}</h3>
)

interface DailyAnalytics {
  date: string
  authFunnel: {
    emailsEntered: number
    magicLinksSent: number
    magicLinksClicked: number
    authSuccesses: number
    authErrors: number
    conversionRate: number
  }
  onboardingFunnel: {
    step1Started: number
    step1Completed: number
    step2Started: number
    step2Completed: number
    step3Started: number
    step3Completed: number
    step4Started: number
    step4Completed: number
    flowCompleted: number
    flowAbandoned: number
    completionRate: number
    avgTimeToComplete: number
  }
  userActivity: {
    newUsers: number
    activeUsers: number
    returningUsers: number
    totalPageViews: number
    avgSessionDuration: number
  }
  technical: {
    errorRate: number
    avgLoadTime: number
    mobileUsage: number
    desktopUsage: number
    topErrors: Array<{ error: string; count: number }>
  }
  engagement: {
    postsCreated: number
    spacesJoined: number
    searchQueries: number
    sharesGenerated: number
  }
  lastUpdated: number
}

interface AnalyticsDashboardProps {
  className?: string
}

export const AnalyticsDashboard = ({ className }: AnalyticsDashboardProps) => {
  const [data, setData] = useState<DailyAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/analytics/dashboard?range=today')
      const result = await response.json()
      
      if (response.ok) {
        setData(result.data)
        setError(null)
      } else {
        setError('Failed to fetch analytics data')
      }
    } catch (err) {
      setError('Network error occurred')
      console.error('Analytics fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchAnalytics, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // const formatTime = (seconds: number) => {
  //   const minutes = Math.floor(seconds / 60)
  //   const remainingSeconds = seconds % 60
  //   return `${minutes}m ${remainingSeconds}s`
  // }

  const formatLastUpdated = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading && !data) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <div className="animate-spin">
            <RefreshCw className="h-5 w-5 text-gold" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-gray-700 bg-gray-900/50">
              <CardContent className="pt-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-700 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card className="border-muted bg-surface">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Analytics Error</p>
                <p className="text-xs text-muted">{error}</p>
                <button 
                  onClick={fetchAnalytics}
                  className="mt-2 text-xs text-muted hover:text-foreground underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-sm text-gray-400">
            Last updated: {formatLastUpdated(data.lastUpdated)}
          </p>
        </div>
        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gold hover:text-gold/80 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Critical Alerts */}
      {(data.authFunnel.conversionRate < 50 || data.onboardingFunnel.completionRate < 60 || data.technical.errorRate > 5) && (
        <Card className="border-muted bg-surface">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-foreground" />
              <h3 className="text-sm font-medium text-foreground">Critical Issues Detected</h3>
            </div>
            <div className="space-y-2 text-xs text-muted">
              {data.authFunnel.conversionRate < 50 && (
                <p>• Auth conversion rate is critically low ({data.authFunnel.conversionRate.toFixed(1)}%)</p>
              )}
              {data.onboardingFunnel.completionRate < 60 && (
                <p>• Onboarding completion rate needs attention ({data.onboardingFunnel.completionRate.toFixed(1)}%)</p>
              )}
              {data.technical.errorRate > 5 && (
                <p>• Error rate is too high ({data.technical.errorRate.toFixed(1)}%)</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Authentication Funnel */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Authentication Funnel</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Emails Entered</CardTitle>
              <Mail className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.authFunnel.emailsEntered}</div>
              <p className="text-xs text-gray-500">Starting point</p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Links Sent</CardTitle>
              <TrendingUp className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.authFunnel.magicLinksSent}</div>
              <p className="text-xs text-gray-500">
                {((data.authFunnel.magicLinksSent / data.authFunnel.emailsEntered) * 100).toFixed(1)}% of entries
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Links Clicked</CardTitle>
              <MousePointer className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.authFunnel.magicLinksClicked}</div>
              <p className="text-xs text-gray-500">
                {((data.authFunnel.magicLinksClicked / data.authFunnel.magicLinksSent) * 100).toFixed(1)}% clicked
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Auth Success</CardTitle>
              <CheckCircle className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.authFunnel.authSuccesses}</div>
              <p className="text-xs text-gray-500">Successful signins</p>
            </CardContent>
          </Card>

          <Card className={`border-gray-700 bg-gray-900/50 ${data.authFunnel.conversionRate < 60 ? 'border-accent/30' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Conversion Rate</CardTitle>
              <BarChart3 className={`h-4 w-4 ${data.authFunnel.conversionRate < 60 ? 'text-accent' : 'text-accent'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${data.authFunnel.conversionRate < 60 ? 'text-accent' : 'text-accent'}`}>
                {data.authFunnel.conversionRate.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">Overall success rate</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Onboarding Funnel */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Onboarding Funnel</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Step 1 (Academic)</CardTitle>
              <Users className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.onboardingFunnel.step1Completed}</div>
              <p className="text-xs text-gray-500">
                {((data.onboardingFunnel.step1Completed / data.onboardingFunnel.step1Started) * 100).toFixed(1)}% completed
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Step 2 (Discovery)</CardTitle>
              <Activity className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.onboardingFunnel.step2Completed}</div>
              <p className="text-xs text-gray-500">
                {((data.onboardingFunnel.step2Completed / data.onboardingFunnel.step2Started) * 100).toFixed(1)}% completed
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Step 3 (Profile)</CardTitle>
              <Users className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.onboardingFunnel.step3Completed}</div>
              <p className="text-xs text-gray-500">
                {((data.onboardingFunnel.step3Completed / data.onboardingFunnel.step3Started) * 100).toFixed(1)}% completed
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Flow Complete</CardTitle>
              <CheckCircle className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.onboardingFunnel.flowCompleted}</div>
              <p className="text-xs text-gray-500">
                {data.onboardingFunnel.completionRate.toFixed(1)}% completion rate
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Health */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Technical Health</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className={`border-gray-700 bg-gray-900/50 ${data.technical.errorRate > 3 ? 'border-muted/30' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Error Rate</CardTitle>
              <AlertTriangle className={`h-4 w-4 ${data.technical.errorRate > 3 ? 'text-foreground' : 'text-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${data.technical.errorRate > 3 ? 'text-foreground' : 'text-foreground'}`}>
                {data.technical.errorRate.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-500">Error rate today</p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Load Time</CardTitle>
              <Activity className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.technical.avgLoadTime}ms</div>
              <p className="text-xs text-gray-500">Average page load</p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Mobile Users</CardTitle>
              <Smartphone className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.technical.mobileUsage}</div>
              <p className="text-xs text-gray-500">
                {((data.technical.mobileUsage / (data.technical.mobileUsage + data.technical.desktopUsage)) * 100).toFixed(1)}% mobile
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Desktop Users</CardTitle>
              <Monitor className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.technical.desktopUsage}</div>
              <p className="text-xs text-gray-500">
                {((data.technical.desktopUsage / (data.technical.mobileUsage + data.technical.desktopUsage)) * 100).toFixed(1)}% desktop
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 