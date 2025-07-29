"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiveCard, HiveButton } from '@hive/ui';

// Tool interface based on Profile System requirements
interface PersonalTool {
  id: string;
  name: string;
  icon: string;
  category: 'productivity' | 'study' | 'organization' | 'communication' | 'other';
  isInstalled: boolean;
  lastUsed?: string;
  usageCount: number;
  quickLaunch: boolean;
}

interface ToolUsageStats {
  totalTools: number;
  weeklyUsage: number;
  lastUsed: string | null;
  mostUsedTool: string | null;
}

interface PersonalToolsCardProps {
  className?: string;
  variant?: 'desktop' | 'mobile';
  onToolClick?: (toolId: string) => void;
  onManageTools?: () => void;
  onAddTools?: () => void;
}

// Simulated personal tools data - will connect to Tool System APIs
const mockPersonalTools: PersonalTool[] = [
  { id: 'study-timer', name: 'Study Timer', icon: '⏱️', category: 'productivity', isInstalled: true, lastUsed: '2024-01-20T10:30:00Z', usageCount: 45, quickLaunch: true },
  { id: 'task-tracker', name: 'Task Tracker', icon: '✅', category: 'productivity', isInstalled: true, lastUsed: '2024-01-20T09:15:00Z', usageCount: 32, quickLaunch: true },
  { id: 'grade-calc', name: 'Grade Calculator', icon: '📊', category: 'study', isInstalled: true, lastUsed: '2024-01-19T16:45:00Z', usageCount: 28, quickLaunch: true },
  { id: 'schedule-sync', name: 'Schedule Sync', icon: '📅', category: 'organization', isInstalled: true, lastUsed: '2024-01-19T14:20:00Z', usageCount: 18, quickLaunch: true },
  { id: 'note-keeper', name: 'Note Keeper', icon: '📝', category: 'study', isInstalled: true, lastUsed: '2024-01-18T11:10:00Z', usageCount: 55, quickLaunch: true },
  { id: 'campus-map', name: 'Campus Navigator', icon: '🗺️', category: 'other', isInstalled: true, lastUsed: '2024-01-17T13:25:00Z', usageCount: 12, quickLaunch: false },
];

const mockUsageStats: ToolUsageStats = {
  totalTools: 6,
  weeklyUsage: 24,
  lastUsed: 'Study Timer • 2 hours ago',
  mostUsedTool: 'Note Keeper'
};

// Fetch personal tools - connects to Tool System API
async function fetchPersonalTools(): Promise<PersonalTool[]> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'dev_token_' + (session.userId || '123') : session.token}`;
    } else {
      headers.Authorization = `Bearer dev_token_123`;
    }
  } catch (error) {
    console.warn('Could not get auth token for tools, using dev token');
    headers.Authorization = `Bearer dev_token_123`;
  }

  const response = await fetch('/api/tools/personal', { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch personal tools: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.tools || [];
}

// Fetch tool usage statistics
async function fetchToolUsageStats(): Promise<ToolUsageStats> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'dev_token_' + (session.userId || '123') : session.token}`;
    } else {
      headers.Authorization = `Bearer dev_token_123`;
    }
  } catch (error) {
    console.warn('Could not get auth token for tool stats, using dev token');
    headers.Authorization = `Bearer dev_token_123`;
  }

  const response = await fetch('/api/tools/usage-stats', { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch tool usage stats: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.stats || mockUsageStats;
}

export function PersonalToolsCard({ 
  className = "", 
  variant = "desktop",
  onToolClick,
  onManageTools,
  onAddTools 
}: PersonalToolsCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Query personal tools
  const { 
    data: tools, 
    isLoading: toolsLoading, 
    error: toolsError 
  } = useQuery<PersonalTool[]>({
    queryKey: ["personal-tools"],
    queryFn: fetchPersonalTools,
    staleTime: 300000, // 5 minutes
  });

  // Query usage statistics
  const { 
    data: stats, 
    isLoading: statsLoading 
  } = useQuery<ToolUsageStats>({
    queryKey: ["tool-usage-stats"],
    queryFn: fetchToolUsageStats,
    staleTime: 300000, // 5 minutes
  });

  // Handle tool launch
  const handleToolClick = (toolId: string) => {
    console.log(`Launching tool: ${toolId}`);
    // Track tool usage analytics
    if (onToolClick) {
      onToolClick(toolId);
    } else {
      // Default tool launch behavior - navigate to tool interface
      window.location.href = `/tools/${toolId}/run`;
    }
  };

  // Handle manage tools click
  const handleManageTools = () => {
    console.log('Opening tool management interface');
    if (onManageTools) {
      onManageTools();
    } else {
      // Default behavior - navigate to tools management
      window.location.href = '/tools';
    }
  };

  // Handle add tools click
  const handleAddTools = () => {
    console.log('Opening tool marketplace');
    if (onAddTools) {
      onAddTools();
    } else {
      // Default behavior - navigate to tool marketplace
      window.location.href = '/tools/browse';
    }
  };

  // Loading State
  if (toolsLoading || statsLoading) {
    return (
      <HiveCard className={`h-full p-4 ${className}`}>
        <div className="animate-pulse">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-hive-text-muted/20 rounded"></div>
              <div className="w-20 h-4 bg-hive-text-muted/20 rounded"></div>
            </div>
            <div className="w-16 h-6 bg-hive-text-muted/20 rounded"></div>
          </div>

          {/* Tool Grid Skeleton */}
          <div className="mb-4">
            <div className="w-32 h-4 bg-hive-text-muted/20 rounded mb-2"></div>
            <div className="grid grid-cols-6 gap-2 p-3 bg-hive-background-secondary/50 rounded-lg">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-10 h-10 bg-hive-text-muted/20 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="w-24 h-4 bg-hive-text-muted/20 rounded"></div>
            <div className="w-40 h-3 bg-hive-text-muted/20 rounded"></div>
            <div className="w-36 h-3 bg-hive-text-muted/20 rounded"></div>
            <div className="w-32 h-3 bg-hive-text-muted/20 rounded"></div>
          </div>

          {/* V1 Features Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="w-40 h-4 bg-hive-text-muted/20 rounded"></div>
            <div className="p-3 bg-hive-background-secondary/50 rounded-lg space-y-2">
              <div className="w-full h-3 bg-hive-text-muted/20 rounded"></div>
              <div className="w-3/4 h-3 bg-hive-text-muted/20 rounded"></div>
              <div className="w-5/6 h-3 bg-hive-text-muted/20 rounded"></div>
            </div>
          </div>

          {/* Loading message */}
          <div className="text-center text-sm text-hive-text-muted">
            🔄 Syncing tool configurations and data...
          </div>
        </div>
      </HiveCard>
    );
  }

  // Empty State
  if (!tools || tools.length === 0) {
    return (
      <HiveCard 
        className={`h-full p-6 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-hive-brand-primary/10 transition-all duration-300 ease-out ${className}`}
        onClick={handleAddTools}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔧</span>
              <h3 className="text-sm font-semibold text-hive-text-primary">Your Tools</h3>
            </div>
            <HiveButton 
              onClick={(e) => {
                e.stopPropagation();
                handleAddTools();
              }}
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              Browse Tools ↗
            </HiveButton>
          </div>

          {/* Empty State Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-110">🔧</div>
            <h4 className="text-base font-semibold text-hive-text-primary mb-2">
              Build Your Personal Toolkit
            </h4>
            <p className="text-sm text-hive-text-secondary mb-6 max-w-xs">
              Tools are personal utilities that help you stay organized and productive.
            </p>

            {/* Getting Started Box */}
            <div className="w-full p-4 bg-hive-background-secondary/50 rounded-lg mb-6">
              <h5 className="text-xs font-semibold text-hive-text-primary mb-3">💡 GETTING STARTED:</h5>
              <ul className="text-xs text-hive-text-secondary space-y-1 text-left">
                <li>• Browse the tool marketplace</li>
                <li>• Install tools that fit your needs</li>
                <li>• Launch tools directly from your Profile</li>
                <li>• Track your productivity and usage</li>
              </ul>
            </div>

            <HiveButton 
              onClick={(e) => {
                e.stopPropagation();
                handleAddTools();
              }}
              variant="primary"
              className="hover:scale-105 transition-all duration-200"
            >
              + Install Your First Tool
            </HiveButton>
          </div>

          <div className="text-xs text-hive-text-muted text-center mt-4">
            Click to explore tool options ↗
          </div>
        </div>
      </HiveCard>
    );
  }

  // Default State with Tools
  const quickLaunchTools = tools.filter(tool => tool.quickLaunch);
  const totalSlots = variant === 'desktop' ? 12 : 8;
  
  return (
    <HiveCard 
      className={`h-full p-4 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-hive-brand-primary/10 transition-all duration-300 ease-out group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleManageTools}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg transition-transform duration-200 group-hover:scale-110">🔧</span>
            <h3 className="text-sm font-semibold text-hive-text-primary">Your Tools</h3>
          </div>
          <div className="flex items-center gap-2">
            <HiveButton 
              onClick={(e) => {
                e.stopPropagation();
                handleAddTools();
              }}
              variant="outline" 
              size="sm"
              className="text-xs transition-all duration-200 hover:scale-105"
            >
              + Add
            </HiveButton>
            <HiveButton 
              onClick={(e) => {
                e.stopPropagation();
                handleManageTools();
              }}
              variant="ghost" 
              size="sm"
              className="text-xs transition-all duration-200 hover:scale-105"
            >
              ⚙️ Manage
            </HiveButton>
          </div>
        </div>

        {/* Installed Tools Grid */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-hive-brand-primary mb-2">🚀 INSTALLED TOOLS</h4>
          <div className="p-3 bg-hive-background-secondary/30 rounded-lg border border-hive-border-primary/20">
            <div className={`grid ${variant === 'desktop' ? 'grid-cols-6' : 'grid-cols-4'} gap-2 mb-2`}>
              {/* Render installed tools */}
              {Array.from({ length: totalSlots }).map((_, index) => {
                const tool = quickLaunchTools[index];
                
                if (tool) {
                  return (
                    <button
                      key={tool.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToolClick(tool.id);
                      }}
                      className="w-10 h-10 rounded-lg bg-hive-background-secondary border border-hive-border-primary flex items-center justify-center text-sm transition-all duration-200 hover:scale-110 hover:border-hive-brand-primary/40 hover:bg-hive-brand-primary/10 active:scale-95"
                      title={tool.name}
                    >
                      {tool.icon}
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={`empty-${index}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddTools();
                      }}
                      className="w-10 h-10 rounded-lg bg-hive-background-secondary border border-hive-border-primary/50 border-dashed flex items-center justify-center text-hive-text-muted transition-all duration-200 hover:scale-105 hover:border-hive-brand-primary/60 hover:text-hive-brand-primary"
                    >
                      +
                    </button>
                  );
                }
              })}
            </div>
            <p className="text-xs text-hive-text-muted">
              ↑ Tap any tool to launch
            </p>
          </div>
        </div>

        {/* Tool Activity */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-hive-text-primary mb-2">📊 TOOL ACTIVITY</h4>
          <div className="space-y-1 text-xs text-hive-text-secondary">
            <div>• {stats?.totalTools || 0} tools installed and configured</div>
            <div>• Used {stats?.weeklyUsage || 0} times this week</div>
            <div>• Last used: {stats?.lastUsed || 'No recent activity'}</div>
          </div>
        </div>

        {/* V1 Features Preview */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-hive-text-primary mb-2">🎯 TOOL IMPACT (Available in v1)</h4>
          <div className="p-3 bg-hive-background-secondary/20 rounded-lg border border-hive-border-primary/10">
            <div className="space-y-1 text-xs text-hive-text-muted">
              <div className="flex items-center justify-between">
                <span>Tool usage analytics and sharing</span>
                <span className="text-hive-text-muted/60">[LOCKED] ↗</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Community impact metrics</span>
                <span className="text-hive-text-muted/60">[LOCKED] ↗</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tool recommendations and discovery</span>
                <span className="text-hive-text-muted/60">[LOCKED] ↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-auto">
          <HiveButton 
            onClick={(e) => {
              e.stopPropagation();
              handleManageTools();
            }}
            variant="ghost" 
            size="sm"
            className={`w-full text-xs transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-70'}`}
          >
            Manage All Tools ↗
          </HiveButton>
        </div>

        {/* Click hint */}
        <div className="text-xs text-hive-text-muted text-center mt-2 opacity-70">
          Click card body to open tool interface ↗
        </div>
      </div>
    </HiveCard>
  );
}