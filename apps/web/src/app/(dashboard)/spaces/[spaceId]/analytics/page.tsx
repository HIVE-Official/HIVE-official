"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from '../../../../../components/error-boundary';
import { PageContainer } from "@/components/temp-stubs";

import { BarChart3, ArrowLeft } from 'lucide-react';

interface SpaceAnalyticsPageProps {
  params: Promise<{
    spaceId: string;
  }>;
}

interface SpaceAnalytics {
  spaceId: string;
  spaceName: string;
  spaceType: string;
  membershipData: {
    totalMembers: number;
    activeMembers: number;
    newMembers: number;
    churnMembers: number;
    memberGrowthRate: number;
    averageEngagement: number;
  };
  contentData: {
    totalPosts: number;
    postsThisWeek: number;
    averageEngagement: number;
    topContentTypes: Array<{ type: string; count: number; engagement: number }>;
    contentGrowthRate: number;
    moderationQueue: number;
  };
  eventData: {
    totalEvents: number;
    upcomingEvents: number;
    averageAttendance: number;
    eventCompletionRate: number;
    topEventTypes: Array<{ type: string; count: number; avgAttendance: number }>;
  };
  toolData: {
    totalTools: number;
    activeTools: number;
    toolUsage: number;
    topTools: Array<{ name: string; usage: number; satisfaction: number }>;
  };
  healthMetrics: {
    overallHealth: number;
    engagementTrend: 'up' | 'down' | 'stable';
    alerts: Array<{ type: 'warning' | 'critical' | 'info'; message: string }>;
    recommendations: Array<{ priority: 'high' | 'medium' | 'low'; action: string }>;
  };
  timeSeriesData: {
    memberGrowth: Array<{ date: string; members: number; active: number }>;
    contentActivity: Array<{ date: string; posts: number; engagement: number }>;
    eventAttendance: Array<{ date: string; events: number; attendance: number }>;
  };
  lastUpdated: string;
}

export default function SpaceAnalyticsPage({ params }: SpaceAnalyticsPageProps) {
  const router = useRouter();
  const [spaceId, setSpaceId] = useState<string>('');
  const [analytics, setAnalytics] = useState<SpaceAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Resolve params Promise
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSpaceId(resolvedParams.spaceId);
    };
    resolveParams();
  }, [params]);
  const [error, setError] = useState<string | null>(null);
  // TODO: For leader-specific analytics features

  const loadAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/spaces/${spaceId}/analytics?timeRange=30d`);
      const data = await response.json() as { success?: boolean; analytics?: SpaceAnalytics; message?: string };

      if (!response.ok) {
        if (response.status === 403) {
          setError('You do not have permission to view analytics for this space.');
          return;
        }
        throw new Error(data.message || 'Failed to load analytics');
      }

      if (data.success && data.analytics) {
        setAnalytics(data.analytics!);
      } else {
        setError('Analytics data not available');
      }
    } catch (err) {
      console.error('Error loading space analytics:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  }, [spaceId]);

  useEffect(() => {
    if (spaceId) {
      loadAnalytics();
    }
  }, [spaceId, loadAnalytics]);

  const handleRefresh = async () => {
    await loadAnalytics();
  };

  // TODO: For future export functionality
  // const handleExportData = () => {
  //   if (!analytics) return;
  //   
  //   // Create CSV export of analytics data
  //   const csvData = [
  //     ['Metric', 'Value'],
  //     ['Total Members', analytics.membershipData.totalMembers],
  //     ['Active Members', analytics.membershipData.activeMembers],
  //     ['New Members (30d)', analytics.membershipData.newMembers],
  //     ['Total Posts', analytics.contentData.totalPosts],
  //     ['Posts This Week', analytics.contentData.postsThisWeek],
  //     ['Total Events', analytics.eventData.totalEvents],
  //     ['Upcoming Events', analytics.eventData.upcomingEvents],
  //     ['Overall Health Score', analytics.healthMetrics.overallHealth],
  //   ];
  //   
  //   const csvContent = csvData.map(row => row.join(',').join('\n');
  //   const blob = new Blob([csvContent], { type: 'text/csv' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `${analytics.spaceName}-analytics-${new Date().toISOString().split('T')[0]}.csv`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   window.URL.revokeObjectURL(url);
  // };

  // TODO: For future settings integration
  // const handleUpdateSettings = () => {
  //   router.push(`/spaces/${spaceId}/settings`);
  // };

  if (isLoading) {
    return (
      <PageContainer 
        title="Loading Analytics..." 
        maxWidth="7xl"
        breadcrumbs={[
          { label: "Spaces", href: "/spaces" },
          { label: "Analytics", icon: BarChart3 }
        ]}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-white">Loading space analytics...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer 
        title="Analytics Error" 
        maxWidth="7xl"
        breadcrumbs={[
          { label: "Spaces", href: "/spaces" },
          { label: "Analytics", icon: BarChart3 }
        ]}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center max-w-md">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Analytics Unavailable</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </button>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-hive-gold text-black rounded-lg hover:bg-hive-champagne transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!analytics) {
    return (
      <PageContainer 
        title="No Analytics Data" 
        maxWidth="7xl"
        breadcrumbs={[
          { label: "Spaces", href: "/spaces" },
          { label: "Analytics", icon: BarChart3 }
        ]}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Analytics Available</h3>
            <p className="text-gray-400">Analytics data is not available for this space.</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <ErrorBoundary>
      <PageContainer
        title="Space Analytics"
        subtitle={`Insights and metrics for ${analytics.spaceName}`}
        maxWidth="7xl"
        breadcrumbs={[
          { label: "Spaces", href: "/spaces" },
          { label: analytics.spaceName, href: `/spaces/${spaceId}` },
          { label: "Analytics", icon: BarChart3 }
        ]}
        actions={
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Space
          </button>
        }
      >
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-hive-gold rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-6 w-6 text-hive-obsidian" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Analytics Dashboard</h3>
          <p className="text-gray-400 mb-4">Advanced analytics dashboard is coming soon.</p>
          <div className="space-y-2 text-sm text-gray-300">
            <p>Space: {analytics.spaceName}</p>
            <p>Members: {analytics.membershipData.totalMembers}</p>
            <p>Posts: {analytics.contentData.totalPosts}</p>
          </div>
        </div>
      </PageContainer>
    </ErrorBoundary>
  );
}