"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card } from "@hive/ui";
import { Alert as _Alert } from "@/components/temp-stubs";
import { LiveToolRuntime as _LiveToolRuntime } from "@hive/ui";
import { ArrowLeft, Settings, Share, Download, Activity, Zap, Clock, AlertCircle } from "lucide-react";
import { useFeatureFlags } from "@hive/hooks";
import { useSession } from "../../../../../hooks/use-session";
import type { ElementInstance, Tool } from "@hive/core";
import { logger } from "@/lib/logger";

interface ToolWithInstances {
  tool: Tool;
  instances: ElementInstance[];
  spaceId: string;
  deploymentId: string;
  permissions: {
    canUse: boolean;
    canConfigure: boolean;
    canViewAnalytics: boolean;
  };
}

// Sample tool instances for demonstration
const SAMPLE_INSTANCES: ElementInstance[] = [
  {
    id: 'title-input',
    elementId: 'textInput-v1',
    config: {
      label: 'Poll Question',
      placeholder: 'What should we order for lunch?',
      required: true,
      style: { width: 'full' }
    },
    position: { x: 20, y: 20 },
    parentId: undefined,
    order: 1,
    isVisible: true,
    isLocked: false
  },
  {
    id: 'option1-input',
    elementId: 'textInput-v1',
    config: {
      label: 'Option 1',
      placeholder: 'Pizza',
      required: true
    },
    position: { x: 20, y: 100 },
    parentId: undefined,
    order: 2,
    isVisible: true,
    isLocked: false
  },
  {
    id: 'option2-input',
    elementId: 'textInput-v1',
    config: {
      label: 'Option 2',
      placeholder: 'Sandwiches',
      required: true
    },
    position: { x: 20, y: 180 },
    parentId: undefined,
    order: 3,
    isVisible: true,
    isLocked: false
  },
  {
    id: 'anonymous-toggle',
    elementId: 'choiceSelect-v1',
    config: {
      label: 'Poll Settings',
      options: [
        { value: 'anonymous', label: 'Allow Anonymous Voting' },
        { value: 'showResults', label: 'Show Results After Voting' }
      ],
      multiple: true
    },
    position: { x: 20, y: 260 },
    parentId: undefined,
    order: 4,
    isVisible: true,
    isLocked: false
  },
  {
    id: 'create-button',
    elementId: 'button-v1',
    config: {
      text: 'Create Poll',
      variant: 'primary',
      onClick: {
        type: 'submit',
        data: { action: 'createPoll' }
      }
    },
    position: { x: 20, y: 360 },
    parentId: undefined,
    order: 5,
    isVisible: true,
    isLocked: false
  },
  {
    id: 'countdown-timer',
    elementId: 'countdownTimer-v1',
    config: {
      label: 'Poll Deadline',
      targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      format: 'dhms',
      onComplete: {
        type: 'message',
        value: 'Poll deadline reached!'
      }
    },
    position: { x: 20, y: 420 },
    parentId: undefined,
    order: 6,
    isVisible: true,
    isLocked: false
  },
  {
    id: 'progress-bar',
    elementId: 'progressBar-v1',
    config: {
      label: 'Poll Completion',
      value: 65,
      max: 100,
      showPercentage: true,
      color: '#FFD700'
    },
    position: { x: 20, y: 500 },
    parentId: undefined,
    order: 7,
    isVisible: true,
    isLocked: false
  },
  {
    id: 'rating-stars',
    elementId: 'ratingStars-v1',
    config: {
      label: 'Rate This Poll Tool',
      maxRating: 5,
      allowHalf: true,
      required: false,
      size: 'md'
    },
    position: { x: 20, y: 580 },
    parentId: undefined,
    order: 8,
    isVisible: true,
    isLocked: false
  }
];

const SAMPLE_TOOL: Tool = {
  id: 'poll-maker',
  name: 'Interactive Poll Creator',
  description: 'Create engaging polls with multiple question types and real-time results',
  ownerId: 'sample-user',
  collaborators: [],
  currentVersion: '1.2.0',
  versions: [],
  status: 'published',
  elements: SAMPLE_INSTANCES,
  config: {
    backgroundColor: '#1a1a1a',
    theme: 'dark' as const,
    primaryColor: '#FFD700',
    allowMultipleSubmissions: true,
    requireAuthentication: false,
    showProgressBar: true,
    autoSave: true,
    enableRealTimeUpdates: true,
    maxResponseLength: 1000,
    customCSS: '',
    headerText: 'Poll Configuration',
    footerText: '',
    // Required fields that were missing
    dataRetentionDays: 90,
    notifyOnSubmission: false,
    trackingEnabled: true,
    allowAnalyticsOptOut: true
  },
  metadata: {
    language: 'javascript',
    category: 'productivity',
    tags: ['polls', 'voting', 'surveys', 'engagement'],
  },
  // Required missing properties
  isPublic: true,
  forkCount: 0,
  viewCount: 2340,
  useCount: 1250,
  rating: 4.8,
  ratingCount: 125,
  isSpaceTool: false,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date(),
  publishedAt: new Date('2024-01-20')
};

// Tool data fetching
const useToolData = (toolId: string, spaceId?: string) => {
  const [toolData, setToolData] = useState<ToolWithInstances | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToolData = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, use sample data
        // In production, this would fetch from your API
        if (toolId === 'poll-maker') {
          setToolData({
            tool: SAMPLE_TOOL,
            instances: SAMPLE_INSTANCES,
            spaceId: spaceId || 'demo-space',
            deploymentId: `${toolId}_${spaceId || 'demo-space'}`,
            permissions: {
              canUse: true,
              canConfigure: false,
              canViewAnalytics: false
            }
          });
        } else {
          throw new Error('Tool not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tool');
      } finally {
        setLoading(false);
      }
    };

    fetchToolData();
  }, [toolId, spaceId]);

  return { toolData, loading, error };
};

export default function ToolRunPage() {
  const params = useParams();
  const router = useRouter();
  const { sessionData: _sessionData } = useSession();
  const flags = useFeatureFlags();
  
  const toolId = params.toolId as string;
  const spaceId = 'demo-space'; // In production, get from query params or context
  
  const { toolData, loading, error } = useToolData(toolId, spaceId);
  const [actionLog, setActionLog] = useState<Array<{ time: string; action: string; data?: any }>>([]);

  useEffect(() => {
    flags.trackEvent('tools', 'view', { page: 'tool-run', toolId });
  }, [flags, toolId]);

  const _handleToolAction = (instanceId: string, action: string, data?: any) => {
    logger.debug('Tool action', { instanceId, action, data });
    
    // Log the action
    setActionLog(prev => [{
      time: new Date().toLocaleTimeString(),
      action: `${instanceId}: ${action}`,
      data
    }, ...prev.slice(0, 9)]); // Keep last 10 actions
    
    // Handle specific actions
    if (action === 'click' && data?.type === 'submit') {
      logger.debug('Form submitted with poll data', { data });
      // Here you would typically send data to your backend
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <p className="text-white">Loading tool...</p>
        </div>
      </div>
    );
  }

  if (error || !toolData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-4" />
          <p className="text-white mb-2">Failed to load tool</p>
          <p className="text-[#A1A1AA] text-sm">{error}</p>
          <Button 
            onClick={() => router.back()} 
            className="mt-4"
            variant="outline"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const { tool, instances, permissions } = toolData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.8)] backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.back()}
                className="text-[#A1A1AA] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  {tool.name} - Live Tool
                </h1>
                <p className="text-sm text-[#A1A1AA]">
                  {tool.description} • Running v{tool.currentVersion}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/tools/${tool.id}/settings`)}
                className="border-[rgba(255,255,255,0.2)] text-[#A1A1AA] hover:text-white"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                className="border-[rgba(255,255,255,0.2)] text-[#A1A1AA] hover:text-white"
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Tool Interface */}
          <div className="lg:col-span-3">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden">
              <div className="min-h-[600px] flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-hive-gold rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-hive-obsidian" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Tool Runtime</h3>
                  <p className="text-[#A1A1AA] mb-4">
                    Live tool runtime is coming soon. This will provide an interactive environment 
                    for running and testing your tools.
                  </p>
                  <div className="space-y-2 text-sm text-[#A1A1AA]">
                    <p>Tool: {tool.name}</p>
                    <p>Version: {tool.currentVersion}</p>
                    <p>Elements: {instances.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Tool Info */}
            <Card className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <h3 className="font-semibold text-white mb-3">Tool Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">Version:</span>
                  <span className="text-white">{tool.currentVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">Elements:</span>
                  <span className="text-white">{instances.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">Rating:</span>
                  <span className="text-white">{tool.rating || 0}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A1A1AA]">Usage:</span>
                  <span className="text-white">{tool.useCount || 0} times</span>
                </div>
              </div>
            </Card>

            {/* Status */}
            <Card className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <h3 className="font-semibold text-white mb-3">Runtime Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white">Live Runtime Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-white">State Persistence On</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-white">Real-time Sync</span>
                </div>
                {permissions.canUse && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-white">Full Access</span>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Action Log */}
            <Card className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Action Log
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {actionLog.length === 0 ? (
                  <p className="text-xs text-[#A1A1AA] text-center py-4">
                    No actions yet. Interact with the tool to see logs.
                  </p>
                ) : (
                  actionLog.map((log, index) => (
                    <div key={index} className="text-xs border-l-2 border-[#FFD700]/30 pl-2">
                      <div className="text-[#A1A1AA]">{log.time}</div>
                      <div className="text-white font-mono">{log.action}</div>
                      {log.data && (
                        <div className="text-[#A1A1AA] mt-1">
                          {JSON.stringify(log.data, null, 2)}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <h3 className="font-semibold text-white mb-3">Actions</h3>
              <div className="space-y-2">
                <Button
                  size="sm"
                  onClick={() => router.push(`/tools/${tool.id}/edit`)}
                  className="w-full bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Tool
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push(`/tools/${tool.id}/analytics`)}
                  className="w-full bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start"
                  disabled={!permissions.canViewAnalytics}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </Card>

            {/* Usage Help */}
            <Card className="p-4 bg-gradient-to-r from-[rgba(255,215,0,0.05)] to-[rgba(255,215,0,0.02)] border-[rgba(255,215,0,0.1)]">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Live Tool Features
              </h3>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                  <div className="w-1 h-1 bg-[#FFD700] rounded-full"></div>
                  State automatically saves
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                  <div className="w-1 h-1 bg-[#FFD700] rounded-full"></div>
                  Real-time element interactions
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                  <div className="w-1 h-1 bg-[#FFD700] rounded-full"></div>
                  Conditional logic execution
                </div>
                <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                  <div className="w-1 h-1 bg-[#FFD700] rounded-full"></div>
                  Works offline with sync
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10"
                onClick={() => router.push(`/tools/${tool.id}/preview`)}
              >
                <Clock className="h-4 w-4 mr-1" />
                Preview Mode
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}