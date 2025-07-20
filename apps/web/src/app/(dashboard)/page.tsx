"use client";

import { useState, useEffect } from 'react';
import { HiveDashboard } from '@hive/ui';
import { useSession } from '../../hooks/use-session';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetch('/api/profile/dashboard');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data.dashboard); // Extract dashboard from response
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadDashboardData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleRefresh = () => {
    setIsLoading(true);
    window.location.reload();
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <HiveDashboard
      data={dashboardData}
      isLoading={isLoading}
      onRefresh={handleRefresh}
      onNavigate={handleNavigate}
    />
  );
}