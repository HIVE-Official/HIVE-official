"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ToolAnalyticsPage } from "../../../../../../../packages/ui/src/pages/hivelab/ToolAnalyticsPage";
import { apiClient } from "@/lib/api-client";
import { useFeatureFlags } from "@hive/hooks";

// Local copy of analytics data type
interface ToolAnalyticsData {
  overview: { totalUsage: number; activeUsers: number; avgRating: number; downloads: number };
  usage: { daily: Array<{ date: string; usage: number; users: number }>; spaces: Array<{ name: string; usage: number; members: number }>; features: Array<{ feature: string; usage: number; percentage: number }> };
  feedback: { ratings: Array<{ rating: number; count: number }>; comments: Array<{ user: string; comment: string; rating: number; date: string }> };
}

// Mock analytics data (replace with real fetch)
const MOCK_ANALYTICS: ToolAnalyticsData = {
  overview: { totalUsage: 1247, activeUsers: 342, avgRating: 4.8, downloads: 892 },
  usage: {
    daily: [
      { date: '2024-01-15', usage: 45, users: 23 },
      { date: '2024-01-16', usage: 52, users: 28 },
      { date: '2024-01-17', usage: 38, users: 19 },
      { date: '2024-01-18', usage: 61, users: 34 },
      { date: '2024-01-19', usage: 73, users: 41 },
      { date: '2024-01-20', usage: 58, users: 29 },
      { date: '2024-01-21', usage: 42, users: 25 },
    ],
    spaces: [
      { name: 'CS Majors', usage: 156, members: 234 },
      { name: 'Student Government', usage: 89, members: 67 },
      { name: 'Engineering Club', usage: 72, members: 145 },
      { name: 'Study Groups', usage: 45, members: 89 },
      { name: 'Greek Life', usage: 38, members: 123 },
    ],
    features: [
      { feature: 'Poll Creation', usage: 456, percentage: 65 },
      { feature: 'Vote Casting', usage: 378, percentage: 54 },
      { feature: 'Results Viewing', usage: 289, percentage: 41 },
      { feature: 'Share Poll', usage: 124, percentage: 18 },
    ],
  },
  feedback: {
    ratings: [
      { rating: 5, count: 234 },
      { rating: 4, count: 156 },
      { rating: 3, count: 45 },
      { rating: 2, count: 12 },
      { rating: 1, count: 5 },
    ],
    comments: [
      { user: 'Sarah M.', comment: 'Perfect for class polls! Easy to use and great results visualization.', rating: 5, date: '2024-01-20' },
      { user: 'Alex K.', comment: 'Works well for our study group decisions. Would love more customization options.', rating: 4, date: '2024-01-19' },
      { user: 'Jamie L.', comment: 'Simple and effective. Helps our organization make better decisions together.', rating: 5, date: '2024-01-18' },
    ],
  },
};

export default function ToolAnalyticsRoutePage() {
  const params = useParams();
  const router = useRouter();
  const flags = useFeatureFlags();

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [analytics, setAnalytics] = useState<ToolAnalyticsData | null>(null);
  const [toolName, setToolName] = useState<string>('Tool');

  useEffect(() => {
    flags.trackEvent('tools', 'view', { page: 'tool-analytics', toolId: params.toolId });
  }, [flags, params.toolId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiClient.get(`/api/tools/${params.toolId}/analytics?range=${timeRange}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setAnalytics(data);
        } else {
          if (!cancelled) setAnalytics(MOCK_ANALYTICS);
        }
      } catch {
        if (!cancelled) setAnalytics(MOCK_ANALYTICS);
      }
    })();
    return () => { cancelled = true; };
  }, [params.toolId, timeRange]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiClient.get(`/api/tools/${params.toolId}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setToolName(data?.name || 'Tool');
        }
      } catch {}
    })();
    return () => { cancelled = true; };
  }, [params.toolId]);

  return (
    <ToolAnalyticsPage
      toolName={toolName}
      analytics={analytics || MOCK_ANALYTICS}
      timeRange={timeRange}
      onTimeRangeChange={setTimeRange}
      onBack={() => router.back()}
      onExport={() => flags.trackEvent('tools', 'export_analytics', { toolId: params.toolId })}
    />
  );
}
