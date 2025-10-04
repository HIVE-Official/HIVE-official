"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import {
  Hash,
  Users,
  Calendar,
  Settings,
  Bell,
  Share,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import {
  HiveCard,
  HiveButton,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@hive/ui';
import type { Space, User } from '@hive/core';
import { SpacePostFeed } from './space-post-feed';
import { SpaceMemberList } from './space-member-list';
import { SpaceEventCalendar } from './space-event-calendar';
import { SpaceContextPanel } from './space-context-panel';
import { SpaceToolRenderer } from './space-tool-renderer';
import {
  getSpaceTypeRules,
  canUserJoinSpace,
  type SpaceType
} from '@/lib/space-type-rules';
import {
  resolveUserPermissions,
  hasPermission,
  type UserPermissions
} from '@/lib/permission-system';
import { api } from '@/lib/api-client';

interface UnifiedSpaceInterfaceProps {
  spaceId: string;
  initialData?: {
    space: Space;
    userMembership: any;
    onlineMembers: User[];
  };
}

export function UnifiedSpaceInterface({
  spaceId,
  initialData
}: UnifiedSpaceInterfaceProps) {
  const [spaceData, setSpaceData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [activeTab, setActiveTab] = useState('posts');
  const [contextPanelVisible, setContextPanelVisible] = useState(true);
  const [installedTools, setInstalledTools] = useState<any[]>([]);
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [onlineMembers, setOnlineMembers] = useState<User[]>([]);

  // Load space data if not provided
  useEffect(() => {
    if (!spaceData && spaceId) {
      loadSpaceData();
    }
  }, [spaceId, spaceData]);

  // Set up realtime connection for this space with proper cleanup
  useEffect(() => {
    if (!spaceId) return;

    let eventSource: EventSource | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let reconnectTimeoutId: NodeJS.Timeout | null = null;
    let isUnmounted = false;

    const connectToRealtime = () => {
      // Don't connect if component is unmounted
      if (isUnmounted) return;

      try {
        // Subscribe to space-specific channels
        const channels = [
          `space:${spaceId}:presence`,
          `space:${spaceId}:activity`,
          `space:${spaceId}:tools`
        ];

        const url = `/api/realtime/sse?channels=${channels.join(',')}`;
        eventSource = new EventSource(url);

        eventSource.onopen = () => {
          if (!isUnmounted) {
            setRealtimeConnected(true);
          }
        };

        eventSource.onmessage = (event) => {
          if (isUnmounted) return;

          try {
            const data = JSON.parse(event.data);
            handleRealtimeMessage(data);
          } catch (error) {
            // Intentionally suppressed - non-critical error
          }
        };

        eventSource.onerror = (error) => {
          if (!isUnmounted) {
            setRealtimeConnected(false);

            // Clean up current connection
            eventSource?.close();
            eventSource = null;

            // Attempt reconnection with exponential backoff
            reconnectTimeoutId = setTimeout(() => {
              if (!isUnmounted) {
                connectToRealtime();
              }
            }, 3000);
          }
        };

      } catch (error) {
        if (!isUnmounted) {
          setRealtimeConnected(false);
        }
      }
    };

    // Connect after a short delay to ensure space data is loaded
    timeoutId = setTimeout(connectToRealtime, 1000);

    return () => {
      // Mark component as unmounted
      isUnmounted = true;

      // Clear all timeouts
      if (timeoutId) clearTimeout(timeoutId);
      if (reconnectTimeoutId) clearTimeout(reconnectTimeoutId);

      // Close EventSource connection
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }

      setRealtimeConnected(false);
    };
  }, [spaceId]);

  // Handle realtime messages
  const handleRealtimeMessage = (data: any) => {
    switch (data.type) {
      case 'presence':
        if (data.data?.status === 'online' && data.data?.currentSpace === spaceId) {
          // Add user to online members if not already there
          setOnlineMembers(prev => {
            const exists = prev.some(member => member.id === data.data.userId);
            if (!exists) {
              // In real implementation, fetch user data
              const newMember = {
                id: data.data.userId,
                fullName: 'Online User',
                handle: 'user',
                email: ''
              } as User;
              return [...prev, newMember];
            }
            return prev;
          });
        } else if (data.data?.status === 'offline') {
          // Remove user from online members
          setOnlineMembers(prev => prev.filter(member => member.id !== data.data.userId));
        }
        break;

      case 'tool_update':
        // Refresh tools when there's a tool update
        if (data.data?.spaceId === spaceId) {
          loadSpaceData();
        }
        break;

      case 'space_activity':
        // Handle space activity updates (new posts, events, etc.)
        break;

      default:
    }
  };

  const loadSpaceData = async () => {
    try {
      setLoading(true);
      const [spaceResponse, membershipResponse, toolsResponse] = await Promise.all([
        api.spaces.get(spaceId),
        api.spaces.membership.get(spaceId),
        api.spaces.tools.list(spaceId)
      ]);

      const spaceResult = await spaceResponse.json();
      const membershipResult = await membershipResponse.json();
      const toolsResult = await toolsResponse.json();

      if (spaceResult.success) {
        setSpaceData({
          space: spaceResult.data,
          userMembership: membershipResult.success ? membershipResult.data : null,
          onlineMembers: onlineMembers
        });
      }

      if (toolsResult.success) {
        // Transform API data to expected format
        const transformedTools = (toolsResult.tools || []).map((tool: any) => ({
          id: tool.deploymentId,
          toolId: tool.toolId,
          name: tool.name,
          description: tool.description,
          category: tool.category,
          status: tool.status,
          icon: '🔧', // Default icon, could be based on category
          position: 'both', // Default to both, could be from configuration
          configuration: tool.configuration,
          permissions: tool.permissions,
          deployer: tool.deployer,
          deployedAt: tool.deployedAt,
          lastUsed: tool.lastUsed,
          usageCount: tool.usageCount
        }));
        setInstalledTools(transformedTools);
      }
    } catch (error) {
      // Intentionally suppressed - non-critical error
    } finally {
      setLoading(false);
    }
  };

  // Get space type rules
  const spaceRules = useMemo(() => {
    if (!spaceData?.space?.type) return null;
    return getSpaceTypeRules(spaceData.space.type as SpaceType);
  }, [spaceData?.space?.type]);

  // Determine user permissions using unified permission system
  const userPermissions = useMemo((): UserPermissions => {
    if (!spaceData?.userMembership) {
      return {
        userId: '',
        spaceId: spaceId,
        role: 'guest'
      };
    }

    const membership = spaceData.userMembership;
    return {
      userId: membership.userId || '',
      spaceId: spaceId,
      role: membership.role || 'member',
      customPermissions: membership.permissions?.map((p: string) => p as any) || undefined
    };
  }, [spaceData?.userMembership, spaceId]);

  // Resolve effective permissions for the user
  const effectivePermissions = useMemo(() => {
    if (!spaceRules) return [];
    return resolveUserPermissions(userPermissions, spaceData?.space?.type as SpaceType, spaceRules);
  }, [userPermissions, spaceData?.space?.type, spaceRules]);

  // Create simplified permissions for SpaceContextPanel
  const simplePermissions = useMemo(() => ({
    isMember: userPermissions.role !== 'guest',
    isAdmin: userPermissions.role === 'admin' || userPermissions.role === 'owner',
    isModerator: userPermissions.role === 'moderator',
    role: userPermissions.role
  }), [userPermissions.role]);

  // Filter tools based on space rules and position
  const inlineTools = useMemo(() => {
    return installedTools.filter(tool =>
      tool.position === 'inline' ||
      (tool.position === 'both')
    );
  }, [installedTools]);

  const contextualTools = useMemo(() => {
    return installedTools.filter(tool =>
      tool.position === 'contextual' ||
      (tool.position === 'both')
    );
  }, [installedTools]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl animate-pulse">🍯</div>
          <span className="text-xl text-[var(--hive-brand-primary)] animate-pulse">Loading space...</span>
        </div>
      </div>
    );
  }

  if (!spaceData?.space) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤷</div>
          <h2 className="text-2xl font-bold text-white mb-2">Space not found</h2>
          <p className="text-gray-400 mb-6">This space might be private or you need permission to access it.</p>
        </div>
      </div>
    );
  }

  const { space } = spaceData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Space Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Space Identity */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 bg-gray-800 rounded-lg border-2 border-gray-700 flex items-center justify-center">
                    <span className="text-2xl">{(space as any).avatar || '🍯'}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-2xl font-bold text-white">{space.name}</h1>
                      <Badge className="bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/30">
                        {space.type?.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-gray-400 max-w-2xl text-sm">
                      {space.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">{space.memberCount || 0}</span>
                    <span className="text-gray-500">members</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <div className={`w-2 h-2 rounded-full ${realtimeConnected ? 'bg-green-500' : 'bg-gray-500'}`} />
                    <span className="font-semibold">{onlineMembers.length}</span>
                    <span className="text-gray-500">online</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <HiveButton
                  variant="outline"
                  size="sm"
                  onClick={() => setContextPanelVisible(!contextPanelVisible)}
                  className="lg:hidden border-gray-700 text-gray-300"
                >
                  <Menu className="w-4 h-4" />
                </HiveButton>

                {userPermissions.role !== 'guest' && (
                  <>
                    <HiveButton
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-300 hover:text-white"
                    >
                      <Bell className="w-4 h-4" />
                    </HiveButton>

                    {hasPermission(userPermissions, spaceData?.space?.type as SpaceType, spaceRules!, 'space:settings') && (
                      <HiveButton
                        variant="outline"
                        size="sm"
                        className="border-gray-700 text-gray-300 hover:text-white"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </HiveButton>
                    )}
                  </>
                )}

                <HiveButton
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:text-white"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </HiveButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - 60/40 Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Side - 60% - Post Board */}
          <div className={contextPanelVisible ? 'lg:col-span-7 space-y-6' : 'lg:col-span-12 space-y-6'}>

            {/* Navigation Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-900 border border-gray-800 w-full">
                <TabsTrigger
                  value="posts"
                  className="flex items-center space-x-2 data-[state=active]:bg-[var(--hive-brand-primary)] data-[state=active]:text-black"
                >
                  <Hash className="w-4 h-4" />
                  <span>Posts</span>
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  className="flex items-center space-x-2 data-[state=active]:bg-[var(--hive-brand-primary)] data-[state=active]:text-black"
                >
                  <Users className="w-4 h-4" />
                  <span>Members</span>
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="flex items-center space-x-2 data-[state=active]:bg-[var(--hive-brand-primary)] data-[state=active]:text-black"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Events</span>
                </TabsTrigger>

                {/* Dynamic Tool Tabs */}
                {inlineTools.map(tool => (
                  <TabsTrigger
                    key={tool.id}
                    value={`tool-${tool.id}`}
                    className="flex items-center space-x-2 data-[state=active]:bg-[var(--hive-brand-primary)] data-[state=active]:text-black"
                  >
                    <span className="text-xs">{tool.icon || '🔧'}</span>
                    <span>{tool.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab Content */}
              <TabsContent value="posts">
                <HiveCard className="bg-gray-900/50 border-gray-800 p-0 overflow-hidden">
                  <SpacePostFeed
                    spaceId={spaceId}
                    canPost={hasPermission(userPermissions, spaceData?.space?.type as SpaceType, spaceRules!, 'posts:create')}
                    spaceRules={spaceRules}
                  />
                </HiveCard>
              </TabsContent>

              <TabsContent value="members">
                <HiveCard className="bg-gray-900/50 border-gray-800 p-6">
                  <SpaceMemberList
                    spaceId={spaceId}
                    userMembership={spaceData.userMembership}
                    onlineMembers={onlineMembers}
                    spaceRules={spaceRules}
                    onClose={() => {}}
                  />
                </HiveCard>
              </TabsContent>

              <TabsContent value="events">
                <HiveCard className="bg-gray-900/50 border-gray-800 p-6">
                  <SpaceEventCalendar
                    spaceId={spaceId}
                    canCreateEvents={hasPermission(userPermissions, spaceData?.space?.type as SpaceType, spaceRules!, 'events:create')}
                    spaceRules={spaceRules}
                  />
                </HiveCard>
              </TabsContent>

              {/* Tool Tab Contents */}
              {inlineTools.map(tool => (
                <TabsContent key={tool.id} value={`tool-${tool.id}`}>
                  <HiveCard className="bg-gray-900/50 border-gray-800 p-6">
                    <SpaceToolRenderer
                      tool={tool}
                      spaceId={spaceId}
                      userPermissions={userPermissions}
                      spaceRules={spaceRules}
                      position="inline"
                    />
                  </HiveCard>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Right Side - 40% - Context Panel */}
          {contextPanelVisible && (
            <div className="lg:col-span-5 space-y-6">
              <SpaceContextPanel
                space={space}
                userMembership={spaceData.userMembership}
                onlineMembers={onlineMembers}
                contextualTools={contextualTools}
                userPermissions={simplePermissions}
                spaceRules={spaceRules}
                onToolInteraction={(toolId, action) => {
                  // Handle tool interactions
                }}
              />
            </div>
          )}
        </div>

        {/* Mobile Context Panel Overlay */}
        {contextPanelVisible && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="absolute right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Space Info</h3>
                  <HiveButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setContextPanelVisible(false)}
                  >
                    <X className="w-4 h-4" />
                  </HiveButton>
                </div>
                <SpaceContextPanel
                  space={space}
                  userMembership={spaceData.userMembership}
                  onlineMembers={onlineMembers}
                  contextualTools={contextualTools}
                  userPermissions={simplePermissions}
                  spaceRules={spaceRules}
                  onToolInteraction={(toolId, action) => {
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}