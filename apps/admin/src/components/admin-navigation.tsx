"use client";

import React from "react";
import { Badge } from "@hive/ui";

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  pendingCounts?: {
    builderRequests: number;
    flaggedContent: number;
    userReports: number;
  };
}

export function AdminNavigation({ activeTab, onTabChange, pendingCounts }: AdminNavigationProps) {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: '🏠',
      description: 'Platform overview and key metrics'
    },
    {
      id: 'users',
      label: 'Users',
      icon: '👥',
      description: 'User management and search',
      badge: pendingCounts?.userReports
    },
    {
      id: 'spaces',
      label: 'Spaces',
      icon: '🏢',
      description: 'Space management and configuration'
    },
    {
      id: 'content',
      label: 'Content',
      icon: '📝',
      description: 'Content moderation and flags',
      badge: pendingCounts?.flaggedContent
    },
    {
      id: 'builders',
      label: 'Builders',
      icon: '🔨',
      description: 'Builder approval queue',
      badge: pendingCounts?.builderRequests
    },
    {
      id: 'feature-flags',
      label: 'Feature Flags',
      icon: '🚩',
      description: 'Feature flags and A/B testing'
    },
    {
      id: 'health-monitor',
      label: 'Health',
      icon: '💓',
      description: 'Real-time platform health monitoring'
    },
    {
      id: 'emergency',
      label: 'Emergency',
      icon: '🚨',
      description: 'Emergency controls and kill switches'
    },
    {
      id: 'config',
      label: 'Config',
      icon: '⚙️',
      description: 'Platform configuration management'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📊',
      description: 'Platform analytics and insights'
    },
    {
      id: 'system',
      label: 'System',
      icon: '🔧',
      description: 'System settings and logs'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 bg-gray-900 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${activeTab === tab.id
                ? 'text-white bg-amber-500'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }
            `}
            title={tab.description}
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.badge && tab.badge > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {tab.badge}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}