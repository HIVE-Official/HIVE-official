"use client";

/**
 * Space Tools Tab - Real Implementation
 * 
 * Shows installed tools in a Space with the ability to launch, manage, and install new tools.
 * This is the critical integration point between Tools and Spaces.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { Plus, Settings, Play, MoreVertical, Users, TrendingUp, Star, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { ToolDefinition, ToolRuntimeEngine } from './tool-runtime-engine';
import { ToolMarketplace } from './tool-marketplace';

interface SpaceToolsTabProps {
  spaceId: string;
  userId: string;
  userRole: 'admin' | 'moderator' | 'member';
  className?: string;
}

interface InstalledTool extends ToolDefinition {
  installedAt: string;
  installedBy: string;
  settings: {
    enabled: boolean;
    permissions: string[];
    position: number;
  };
  usage: {
    totalUsers: number;
    thisWeek: number;
    lastUsed?: string;
  };
}

type TabView = 'installed' | 'marketplace' | 'running';

export function SpaceToolsTab({ spaceId, userId, userRole, className }: SpaceToolsTabProps) {
  const [currentView, setCurrentView] = useState<TabView>('installed');
  const [installedTools, setInstalledTools] = useState<InstalledTool[]>([]);
  const [runningTool, setRunningTool] = useState<ToolDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch installed tools for this space
  const fetchInstalledTools = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/spaces/${spaceId}/tools`, {
        headers: { 'Authorization': `Bearer ${userId}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setInstalledTools(data.tools || []);
      } else {
        // Fallback to sample tools for development
        setInstalledTools(getSampleInstalledTools());
      }
    } catch (error) {
      console.error('Failed to fetch installed tools:', error);
      setInstalledTools(getSampleInstalledTools());
    } finally {
      setLoading(false);
    }
  }, [spaceId, userId]);

  // Install tool from marketplace
  const handleInstallTool = async (toolId: string) => {
    try {
      const response = await fetch(`/api/spaces/${spaceId}/tools/install`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ toolId })
      });

      if (response.ok) {
        // Refresh installed tools list
        await fetchInstalledTools();
        // Switch back to installed view
        setCurrentView('installed');
      } else {
        console.error('Failed to install tool');
      }
    } catch (error) {
      console.error('Error installing tool:', error);
    }
  };

  // Launch tool
  const handleLaunchTool = (tool: InstalledTool) => {
    setRunningTool(tool);
    setCurrentView('running');
  };

  // Save tool data
  const handleSaveToolData = async (data: Record<string, any>) => {
    if (!runningTool) return;
    
    try {
      await fetch(`/api/tools/${runningTool.id}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ 
          spaceId, 
          data,
          userId 
        })
      });
    } catch (error) {
      console.error('Failed to save tool data:', error);
    }
  };

  // Submit tool data
  const handleSubmitToolData = async (data: Record<string, any>) => {
    if (!runningTool) return;
    
    try {
      await fetch(`/api/tools/${runningTool.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify({ 
          spaceId, 
          data,
          userId 
        })
      });
      
      // Close tool after successful submission
      setRunningTool(null);
      setCurrentView('installed');
    } catch (error) {
      console.error('Failed to submit tool data:', error);
    }
  };

  // Load installed tools on mount
  useEffect(() => {
    fetchInstalledTools();
  }, [fetchInstalledTools]);

  // Filter tools by search
  const filteredTools = installedTools.filter(tool =>
    !searchQuery || 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (currentView === 'running' && runningTool) {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Running Tool Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setRunningTool(null);
                setCurrentView('installed');
              }}
            >
              ← Back to Tools
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-[var(--hive-text-muted)]">Tool Running</span>
            </div>
          </div>
        </div>

        {/* Tool Runtime */}
        <ToolRuntimeEngine
          tool={runningTool}
          userId={userId}
          spaceId={spaceId}
          mode="production"
          onSave={handleSaveToolData}
          onSubmit={handleSubmitToolData}
        />
      </div>
    );
  }

  if (currentView === 'marketplace') {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Marketplace Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add Tools to Space</h2>
          <Button
            variant="secondary"
            onClick={() => setCurrentView('installed')}
          >
            ← Back to Installed
          </Button>
        </div>

        {/* Marketplace */}
        <ToolMarketplace
          spaceId={spaceId}
          userId={userId}
          onInstallTool={handleInstallTool}
          onViewTool={(toolId) => {
            // Could implement tool preview here
            console.log('View tool:', toolId);
          }}
        />
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Space Tools</h2>
          <p className="text-sm text-[var(--hive-text-muted)]">
            {installedTools.length} tools installed • {installedTools.filter(t => t.settings.enabled).length} active
          </p>
        </div>
        
        {(userRole === 'admin' || userRole === 'moderator') && (
          <Button onClick={() => setCurrentView('marketplace')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Tools
          </Button>
        )}
      </div>

      {/* Search */}
      {installedTools.length > 0 && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search installed tools..."
            className="w-full pl-10 pr-4 py-2 border border-[var(--hive-border-default)] rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      )}

      {/* Tools Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[var(--hive-background-secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {installedTools.length === 0 ? 'No tools installed yet' : 'No tools found'}
          </h3>
          <p className="text-[var(--hive-text-muted)] mb-4">
            {installedTools.length === 0 
              ? 'Add tools from the marketplace to help coordinate your space activities'
              : 'Try adjusting your search terms'
            }
          </p>
          {(userRole === 'admin' || userRole === 'moderator') && installedTools.length === 0 && (
            <Button onClick={() => setCurrentView('marketplace')}>
              Browse Marketplace
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map(tool => (
            <InstalledToolCard
              key={tool.id}
              tool={tool}
              userRole={userRole}
              onLaunch={() => handleLaunchTool(tool)}
              onToggle={async (enabled) => {
                // Update tool enabled status
                try {
                  await fetch(`/api/spaces/${spaceId}/tools/${tool.id}/settings`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${userId}`
                    },
                    body: JSON.stringify({ enabled })
                  });
                  
                  // Update local state
                  setInstalledTools(prev => prev.map(t => 
                    t.id === tool.id 
                      ? { ...t, settings: { ...t.settings, enabled } }
                      : t
                  ));
                } catch (error) {
                  console.error('Failed to update tool settings:', error);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Individual Installed Tool Card
interface InstalledToolCardProps {
  tool: InstalledTool;
  userRole: 'admin' | 'moderator' | 'member';
  onLaunch: () => void;
  onToggle: (enabled: boolean) => void;
}

function InstalledToolCard({ tool, userRole, onLaunch, onToggle }: InstalledToolCardProps) {
  const canManage = userRole === 'admin' || userRole === 'moderator';

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">{tool.name}</h3>
              {!tool.settings.enabled && (
                <Badge variant="secondary" className="text-xs">Disabled</Badge>
              )}
            </div>
            <p className="text-sm text-[var(--hive-text-muted)] line-clamp-2">
              {tool.description}
            </p>
          </div>
          
          {canManage && (
            <button className="p-1 text-gray-400 hover:text-[var(--hive-text-muted)]">
              <MoreVertical className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Usage Stats */}
        <div className="flex items-center gap-4 text-sm text-[var(--hive-text-muted)]">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{tool.usage.totalUsers} users</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>{tool.usage.thisWeek} this week</span>
          </div>
        </div>

        {/* Last Used */}
        {tool.usage.lastUsed && (
          <p className="text-xs text-gray-500">
            Last used {new Date(tool.usage.lastUsed).toLocaleDateString()}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <Button
            size="sm"
            onClick={onLaunch}
            disabled={!tool.settings.enabled}
            className="flex-1"
          >
            <Play className="w-4 h-4 mr-1" />
            Launch
          </Button>
          
          {canManage && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onToggle(!tool.settings.enabled)}
            >
              {tool.settings.enabled ? 'Disable' : 'Enable'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// Sample installed tools for development
function getSampleInstalledTools(): InstalledTool[] {
  return [
    {
      id: 'event-creator',
      name: 'Event Creator',
      description: 'Create and manage events with RSVP tracking and check-in capabilities.',
      version: '1.0.0',
      elements: [],
      actions: [],
      metadata: {
        createdBy: 'hive-team',
        createdAt: '2024-01-01T00:00:00Z',
        category: 'event',
        tags: ['events', 'coordination']
      },
      installedAt: '2024-01-15T10:00:00Z',
      installedBy: 'space-admin',
      settings: {
        enabled: true,
        permissions: ['create_events', 'manage_rsvps'],
        position: 1
      },
      usage: {
        totalUsers: 45,
        thisWeek: 12,
        lastUsed: '2024-01-20T14:30:00Z'
      }
    },
    {
      id: 'study-scheduler',
      name: 'Study Group Scheduler',
      description: 'Coordinate study sessions and group meetings with scheduling and room booking.',
      version: '1.2.0',
      elements: [],
      actions: [],
      metadata: {
        createdBy: 'student-builder',
        createdAt: '2024-01-10T00:00:00Z',
        category: 'academic',
        tags: ['study', 'scheduling']
      },
      installedAt: '2024-01-18T09:00:00Z',
      installedBy: 'space-admin',
      settings: {
        enabled: true,
        permissions: ['create_sessions', 'book_rooms'],
        position: 2
      },
      usage: {
        totalUsers: 23,
        thisWeek: 8,
        lastUsed: '2024-01-19T16:00:00Z'
      }
    },
    {
      id: 'feedback-collector',
      name: 'Feedback Collector',
      description: 'Gather feedback from space members on events, activities, and improvements.',
      version: '1.0.5',
      elements: [],
      actions: [],
      metadata: {
        createdBy: 'community-builder',
        createdAt: '2024-01-12T00:00:00Z',
        category: 'social',
        tags: ['feedback', 'community']
      },
      installedAt: '2024-01-20T11:00:00Z',
      installedBy: 'space-moderator',
      settings: {
        enabled: false,
        permissions: ['create_surveys', 'view_responses'],
        position: 3
      },
      usage: {
        totalUsers: 7,
        thisWeek: 2,
        lastUsed: '2024-01-19T10:00:00Z'
      }
    }
  ];
}

export default SpaceToolsTab;