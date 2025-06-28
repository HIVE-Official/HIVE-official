import { NextRequest, NextResponse } from 'next/server'
import type { DailyAnalytics } from '@hive/analytics'

// Mock data for now - this will be replaced with real Firestore aggregation
const generateMockAnalytics = (): DailyAnalytics => {
  const today = new Date().toISOString().split('T')[0]
  
  return {
    date: today,
    authFunnel: {
      emailsEntered: 156,
      magicLinksSent: 143,
      magicLinksClicked: 124,
      authSuccesses: 98,
      authErrors: 26,
      conversionRate: 62.8 // 98/156 * 100
    },
    onboardingFunnel: {
      step1Started: 98,
      step1Completed: 89,
      step2Started: 89,
      step2Completed: 76,
      step3Started: 76,
      step3Completed: 71,
      step4Started: 71,
      step4Completed: 67,
      flowCompleted: 67,
      flowAbandoned: 31,
      completionRate: 68.4, // 67/98 * 100
      avgTimeToComplete: 247 // seconds
    },
    userActivity: {
      newUsers: 67,
      activeUsers: 234,
      returningUsers: 167,
      totalPageViews: 1456,
      avgSessionDuration: 342
    },
    technical: {
      errorRate: 2.3,
      avgLoadTime: 1245,
      mobileUsage: 156,
      desktopUsage: 234,
      topErrors: [
        { error: 'Magic link expired', count: 12 },
        { error: 'Network timeout', count: 8 },
        { error: 'Invalid email format', count: 6 }
      ]
    },
    engagement: {
      postsCreated: 23,
      spacesJoined: 89,
      searchQueries: 178,
      sharesGenerated: 45
    },
    lastUpdated: Date.now()
  }
}

const generateWeeklyTrend = (): DailyAnalytics[] => {
  const trends = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    // Simulate some variance in the data
    const baseData = generateMockAnalytics()
    const variance = 0.8 + (Math.random() * 0.4) // 80% to 120% of base values
    
    trends.push({
      ...baseData,
      date: dateStr,
      authFunnel: {
        ...baseData.authFunnel,
        emailsEntered: Math.floor(baseData.authFunnel.emailsEntered * variance),
        authSuccesses: Math.floor(baseData.authFunnel.authSuccesses * variance)
      },
      onboardingFunnel: {
        ...baseData.onboardingFunnel,
        step1Started: Math.floor(baseData.onboardingFunnel.step1Started * variance),
        flowCompleted: Math.floor(baseData.onboardingFunnel.flowCompleted * variance)
      },
      userActivity: {
        ...baseData.userActivity,
        newUsers: Math.floor(baseData.userActivity.newUsers * variance),
        activeUsers: Math.floor(baseData.userActivity.activeUsers * variance)
      }
    })
  }
  return trends
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || 'today'
    
    if (range === 'week') {
      const weeklyData = generateWeeklyTrend()
      return NextResponse.json({
        data: weeklyData,
        range: 'week'
      })
    }
    
    // Default to today's data
    const todayData = generateMockAnalytics()
    
    return NextResponse.json({
      data: todayData,
      range: 'today'
    })
    
  } catch (error) {
    console.error('Dashboard analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
} 