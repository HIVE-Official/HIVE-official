"use client";

import React, { useState } from "react";
import { logger } from '@hive/core/utils/logger';

import { useQuery } from "@tanstack/react-query";
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';
import { Button, Badge, HivePostsSurface, HiveEventsSurface, HiveMembersSurface, HivePinnedSurface, HiveToolsSurface, type Comment } from "@hive/ui";
import { useSpacePosts } from '../../../../hooks/use-space-posts';
import { useSpaceEvents } from '../../../../hooks/use-space-events';
import { useSpaceMembers } from '../../../../hooks/use-space-members';
import { useSpacePinned } from '../../../../hooks/use-space-pinned';
import { useSpaceTools } from '../../../../hooks/use-space-tools';
import { useSpaceAnalytics } from '../../../../hooks/use-space-analytics';
import { useSpaceManagement } from '../../../../hooks/use-space-management';
import { PostWithComments } from '../../../../components/posts/post-with-comments';
import { SpaceManagementPanel } from '../../../../components/spaces/space-management-panel';
import { PageContainer } from "@hive/ui";
import { Users, AlertTriangle, Loader2, Hash, /* Heart as _Heart, */ MessageSquare, /* Camera as _Camera, */ Code, Calendar, /* ArrowRight as _ArrowRight, */ Clock, Settings, Grid, List, Maximize2, X, Monitor, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type Space } from "@hive/core";
import { useUnifiedAuth } from "@hive/ui";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SpaceErrorBoundaryWrapper } from "../components/space-error-boundary";
import { SpaceLoadingSkeleton } from "../components/space-loading-skeleton";
import { LeaveSpaceButton } from "../../../../components/spaces/leave-space-button";
import { PostCreationModal } from "../../../../components/spaces/post-creation-modal";
import { EventCreationModal } from "../../../../components/events/event-modal";
import { LeaderToolbar, useLeaderMode /* , type LeaderMode */ } from "../../../../components/spaces/leader-toolbar";
import { getUserSpaceMembership, type SpaceMembership } from "@/lib/spaces/space-permissions";

interface Comment { id: string; text: string; userId: string; createdAt: any; }

async function fetchSpaceById(spaceId: string): Promise<Space> {
  const response = await authenticatedFetch(`/api/spaces/${spaceId}`);
  if (response.status === 404) {
    throw new Error("Space not found");
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch space: ${response.status}`);
  }
  return response.json() as Promise<Space>;
}

function LoadingState() {
  return (
    <div className="px-6 md:px-8">
      <SpaceLoadingSkeleton variant="detail" />
    </div>
  );
}

function ErrorState({ error }: { error: Error }) {
  const isNotFound = error.message === "Space not found";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-4">
          {isNotFound ? "Space Not Found" : "Something Went Wrong"}
        </h1>
        <p className="text-neutral-400 mb-8">
          {isNotFound
            ? "This space doesn't exist or may have been removed."
            : "We encountered an error loading this space. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/spaces">
            <Button variant="outline" className="w-full sm:w-auto">
              Browse Spaces
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

function SpaceStatusBadge({ status }: { status: Space["status"] }) {
  const statusConfig = {
    dormant: { label: "Preview Mode", variant: "info" as const, color: "text-blue-400" },
    frozen: { label: "View Only", variant: "secondary" as const, color: "text-gray-400" },
    activated: { label: "Active", variant: "success" as const, color: "text-green-400" },
  };

  const config = statusConfig[status] || statusConfig.activated;

  return (
    <Badge variant={config.variant} className={`text-xs ${config.color}`}>
      {config.label}
    </Badge>
  );
}

// Widget types and modal states
type WidgetType = 'posts' | 'events' | 'members' | 'pinned' | 'tools';
type ViewMode = 'desktop' | 'mobile';

interface WidgetConfig {
  id: WidgetType;
  title: string;
  icon: React.ComponentType;
  component: React.ComponentType<any>;
  adminOnly?: boolean;
  allowedViews?: string[];
}

const WIDGET_CONFIGS: WidgetConfig[] = [
  {
    id: 'posts',
    title: 'Post Board',
    icon: MessageSquare,
    component: HivePostsSurface,
    allowedViews: ['compact', 'detailed']
  },
  {
    id: 'pinned',
    title: 'Pinned',
    icon: Clock,
    component: HivePinnedSurface,
    allowedViews: ['list', 'grid']
  },
  {
    id: 'events',
    title: 'Events',
    icon: Calendar,
    component: HiveEventsSurface,
    allowedViews: ['list', 'calendar', 'grid']
  },
  {
    id: 'members',
    title: 'Members',
    icon: Users,
    component: HiveMembersSurface,
    allowedViews: ['grid', 'list', 'activity']
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Code,
    component: HiveToolsSurface,
    adminOnly: true,
    allowedViews: ['grid', 'list']
  }
];

export default function SpaceDetailPage({
  params,
}: {
  params: Promise<{ spaceId: string }>;
}) {
  const [spaceId, setSpaceId] = React.useState<string | null>(null);
  const [isJoined, setIsJoined] = React.useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [activeModal, setActiveModal] = useState<WidgetType | null>(null);
  const [currentTab, setCurrentTab] = useState<WidgetType>('posts');
  const [widgetViews, setWidgetViews] = useState<Record<WidgetType, string>>({
    posts: 'grid',
    events: 'list',
    members: 'grid',
    pinned: 'list',
    tools: 'grid'
  });
  const [showPostCreation, setShowPostCreation] = useState(false);
  const [postCreationType, setPostCreationType] = useState<'discussion' | 'question' | 'poll' | 'announcement' | 'link'>('discussion');
  const [showEventCreation, setShowEventCreation] = useState(false);
  
  // Leader mode management
  const { currentMode, toggleMode, /* exitMode, */ isInMode, /* isInAnyMode */ } = useLeaderMode(); // TODO: exitMode and isInAnyMode for future leader features
  
  // Configure mode state
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  
  // Insights mode - Real analytics data
  
  // Space membership and permissions state
  const [spaceMembership, setSpaceMembership] = useState<SpaceMembership | null>(null);
  const [/* membershipLoading */, setMembershipLoading] = useState(true); // TODO: For membership loading state
  
  const { user } = useUnifiedAuth();
  
  // Use real-time posts hook
  const { 
    posts, 
    loading: postsLoading, 
    createPost: createSpacePost,
    toggleReaction,
    deletePost,
    respondToCoordination 
  } = useSpacePosts(spaceId);
  
  // Use real-time events hook
  const {
    events,
    loading: eventsLoading,
    createEvent,
    updateEvent,
    deleteEvent,
    rsvpToEvent
  } = useSpaceEvents(spaceId);
  
  // Use real-time members hook
  const {
    members,
    loading: membersLoading,
    summary: membersSummary,
    refresh: refreshMembers
  } = useSpaceMembers(spaceId);
  
  // Use real-time pinned items hook
  const {
    items: pinnedItems,
    loading: pinnedLoading,
    pinItem,
    unpinItem,
    trackAction: trackPinnedAction,
    refresh: refreshPinned
  } = useSpacePinned(spaceId);
  
  // Use real tools hook
  const {
    tools,
    loading: toolsLoading,
    installTool,
    uninstallTool,
    updateToolConfig,
    refresh: refreshTools
  } = useSpaceTools(spaceId);
  
  // Use real analytics hook (only enabled for leaders in insights mode)
  const {
    analytics: analyticsData,
    loading: analyticsLoading,
    refresh: refreshAnalytics
  } = useSpaceAnalytics(spaceId, isLeader && currentMode === 'insights');
  
  // Use space management hook for leader tools
  const {
    updateSettings,
    changeUserRole,
    removeMember: removeMemberFromSpace,
    blockMember: blockSpaceMember,
    inviteMember,
    updating: managementUpdating
  } = useSpaceManagement(spaceId);

  const handleJoinSpace = async () => {
    try {
      const response = await authenticatedFetch('/api/spaces/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ spaceId })
      });

      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error || 'Failed to join space');
      }

      const result = await response.json();
      
      // Show connection notification if auto-connections were created
      if (result.data?.connections?.created > 0) {
        const connectionMessage = result.data.connections.message;
        // Use a toast notification if available, otherwise alert
        if (typeof window !== 'undefined' && window.showToast) {
          window.showToast({
            title: 'Welcome to ' + space?.name,
            description: connectionMessage,
            type: 'success'
          });
        } else {
        }
      }

      setIsJoined(true);
      
      // Refresh to show updated membership state
      window.location.reload();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to join space';
      alert(errorMessage);
    }
  };

  // Real role checking based on space membership
  const isAdmin = spaceMembership?.role === 'admin' || spaceMembership?.role === 'owner';
  const isLeader = spaceMembership?.permissions?.canViewAnalytics || false;
  const leaderRole: 'owner' | 'admin' | 'moderator' = (spaceMembership?.role as 'owner' | 'admin' | 'moderator') || 'member';
  
  // Filter widgets based on permissions
  const availableWidgets = WIDGET_CONFIGS.filter(widget => 
    !widget.adminOnly || isAdmin
  );
  
  // Responsive detection
  React.useEffect(() => {
    const checkViewMode = () => {
      setViewMode(window.innerWidth < 768 ? 'mobile' : 'desktop');
    };
    
    checkViewMode();
    window.addEventListener('resize', checkViewMode);
    return () => window.removeEventListener('resize', checkViewMode);
  }, []);
  
  const openModal = (widgetType: WidgetType) => {
    setActiveModal(widgetType);
  };
  
  const closeModal = () => {
    setActiveModal(null);
  };
  
  const changeWidgetView = (widgetId: WidgetType, view: string) => {
    setWidgetViews(prev => ({ ...prev, [widgetId]: view }));
  };
  
  const handleAddTool = () => {
    // Navigate to the builder page with space context
    window.location.href = `/build?spaceId=${spaceId}`;
  };
  
  const handleConfigureTool = (toolId: string) => {
    // Navigate to tool configuration
    window.location.href = `/build?toolId=${toolId}`;
  };
  
  const handleViewToolAnalytics = (toolId: string) => {
    // Navigate to tool analytics
    window.location.href = `/tools/${toolId}/analytics`;
  };
  
  const handleRemoveTool = async (deploymentId: string) => {
    try {
      await uninstallTool(deploymentId);
      await refreshTools();
    } catch (error) {
      logger.error('Failed to remove tool:', error);
    }
  };

  const handleCreatePost = (type: 'activity' | 'discussion' | 'question' | 'poll' | 'announcement' | 'link' | 'study_session' | 'food_run' | 'ride_share' | 'meetup') => {
    // Map all types to supported modal types
    const mappedType: 'discussion' | 'question' | 'poll' | 'announcement' | 'link' = 
      ['discussion', 'question', 'poll', 'announcement', 'link'].includes(type) 
        ? type as 'discussion' | 'question' | 'poll' | 'announcement' | 'link'
        : 'discussion'; // Default fallback
    
    setPostCreationType(mappedType);
    setShowPostCreation(true);
  };

  const handleCreateComment = async (_postId: string, content: string, parentCommentId?: string): Promise<Comment> => {
    const response = await authenticatedFetch(`/api/spaces/${spaceId}/posts/${_postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content, parentCommentId })
    });

    if (!response.ok) {
      const errorData = await response.json() as { error?: string };
      throw new Error(errorData.error || 'Failed to create comment');
    }

    const result = await response.json() as { data: Comment };
    return result.data;
  };

  const handleLoadComments = async (_postId: string): Promise<Comment[]> => {
    const response = await authenticatedFetch(`/api/spaces/${spaceId}/posts/${_postId}/comments`);
    
    if (!response.ok) {
      const errorData = await response.json() as { error?: string };
      throw new Error(errorData.error || 'Failed to load comments');
    }

    const result = await response.json() as { data: { _comments: Comment[] } };
    return result.data.comments;
  };

  // Posts are now fetched via useSpacePosts hook with real-time updates

  // Member Management Handlers
  const handleChangeRole = async (memberId: string, role: string) => {
    try {
      await changeUserRole(memberId, role as 'admin' | 'moderator' | 'member');
      // Refresh members list to show updated roles
      refreshMembers();
    } catch (error) {
      logger.error('Failed to change role:', error);
      // Show error toast if available
      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast({
          title: 'Error',
          description: 'Failed to change member role',
          type: 'error'
        });
      }
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member from the space?')) {
      return;
    }

    try {
      await removeMemberFromSpace(memberId);
      // Refresh members list to show updated list
      refreshMembers();
    } catch (error) {
      logger.error('Failed to remove member:', error);
      // Show error toast if available
      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast({
          title: 'Error',
          description: 'Failed to remove member',
          type: 'error'
        });
      }
    }
  };

  const handleBlockMember = async (memberId: string) => {
    const reason = prompt('Reason for suspension (optional):');
    
    try {
      await blockSpaceMember(memberId, 'suspend');
      // Refresh members list to show updated status
      refreshMembers();
    } catch (error) {
      logger.error('Failed to suspend member:', error);
      // Show error toast if available
      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast({
          title: 'Error',
          description: 'Failed to suspend member',
          type: 'error'
        });
      }
    }
  };

  React.useEffect(() => {
    params.then(({ spaceId }) => setSpaceId(spaceId));
  }, [params]);
  
  // Fetch user's space membership and permissions
  React.useEffect(() => {
    let isMounted = true;
    
    async function fetchMembership() {
      if (!spaceId || !user) {
        setMembershipLoading(false);
        return;
      }
      
      try {
        const membership = await getUserSpaceMembership(spaceId);
        if (isMounted) {
          setSpaceMembership(membership);
        }
      } catch (error) {
        logger.error('Failed to fetch space membership:', error);
        if (isMounted) {
          setSpaceMembership(null);
        }
      } finally {
        if (isMounted) {
          setMembershipLoading(false);
        }
      }
    }
    
    fetchMembership();
    
    return () => {
      isMounted = false;
    };
  }, [spaceId, user]);

  // Posts are now fetched automatically via useSpacePosts hook
  
  // Fetch analytics data when Insights Mode is activated
  React.useEffect(() => {
    if (currentMode === 'insights' && spaceId && isLeader && !analyticsData) {
      // Analytics are now handled by useSpaceAnalytics hook
      refreshAnalytics();
    }
  }, [currentMode, spaceId, isLeader, analyticsData, refreshAnalytics]);

  const {
    data: space,
    isLoading,
    error,
  } = useQuery<Space>({
    queryKey: ["space", spaceId],
    queryFn: () => fetchSpaceById(spaceId!),
    enabled: !!spaceId,
    retry: (failureCount, error) => {
      if (error.message === "Space not found") return false;
      return failureCount < 3;
    },
  });

  if (!spaceId || isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!space) {
    return <ErrorState error={new Error("Space not found")} />;
  }

  return (
    <SpaceErrorBoundaryWrapper>
      {/* Space Banner */}
      <div className="relative h-48 w-full md:h-64 lg:h-80 -mt-16 -mx-6 md:-mx-8">
        {space.bannerUrl ? (
          <Image
            src={space.bannerUrl}
            alt={`${space.name} banner`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-neutral-800 to-neutral-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <PageContainer
        breadcrumbs={[
          { label: "Discover", href: "/spaces" },
          { label: space.name, icon: <Hash /> },
        ]}
        className="-mt-16 relative z-10"
        padding="lg"
      >
        {/* Space Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--hive-text-inverse)] truncate font-['Space_Grotesk']">
                {space.name}
              </h1>
              <SpaceStatusBadge status={space.status} />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{(space.memberCount || 0).toLocaleString()} members</span>
              </div>

              <Badge variant="skill-tag" className="capitalize text-xs">
                {space.type}
              </Badge>

              {space.tags.length > 0 && (
                <Badge variant="skill-tag" className="capitalize text-xs">
                  {space.tags[0].sub_type}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {space.status === 'dormant' ? (
              <Button 
                variant="outline" 
                className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                disabled
              >
                Preview Only
              </Button>
            ) : space.status === 'frozen' ? (
              <Button 
                variant="outline" 
                className="border-gray-500/20 text-gray-400"
                disabled
              >
                View Only
              </Button>
            ) : isJoined ? (
              <LeaveSpaceButton
                spaceId={space.id}
                spaceName={space.name}
                spaceType={space.type}
                onLeave={() => {
                  setIsJoined(false);
                  // Optionally redirect or refresh
                }}
              />
            ) : (
              <Button 
                variant="primary"
                className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255]"
                onClick={handleJoinSpace}
              >
                Join Space
              </Button>
            )}
          </div>
        </div>

        {/* Widget System Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
            <span className="text-sm text-neutral-400">
              {viewMode === 'mobile' ? 'Tab View' : 'Widget View'}
            </span>
          </div>
          
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              className="border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/10"
            >
              <Settings className="h-4 w-4 mr-2" />
              Customize Layout
            </Button>
          )}
        </div>

        {/* Mobile Tab View */}
        {viewMode === 'mobile' ? (
          <div className="space-y-4">
            {/* Tab Navigation */}
            <div className="flex overflow-x-auto pb-2 gap-2">
              {availableWidgets.map((widget: any) => {
                const Icon = widget.icon as React.ComponentType<{ className?: string }>;
                const isActive = currentTab === widget.id;
                
                return (
                  <motion.button
                    key={widget.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30'
                        : 'bg-[var(--hive-white)]/[0.02] text-neutral-400 border border-[var(--hive-white)]/[0.06] hover:text-[var(--hive-text-inverse)]'
                    }`}
                    onClick={() => setCurrentTab(widget.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{widget.title}</span>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Active Tab Content */}
            <div className="rounded-xl bg-[var(--hive-white)]/[0.02] border border-[var(--hive-white)]/[0.06] p-6">
              {(() => {
                const activeWidget = availableWidgets.find(w => w.id === currentTab);
                if (!activeWidget) return null;
                
                const Component = activeWidget.component;
                return (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">{activeWidget.title}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[var(--hive-white)]/[0.2] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-white)]/[0.1]"
                        onClick={() => openModal(activeWidget.id)}
                      >
                        <Maximize2 className="h-4 w-4 mr-2" />
                        Expand
                      </Button>
                    </div>
                    <Component
                      space={space}
                      posts={activeWidget.id === 'posts' ? posts : undefined}
                      tools={activeWidget.id === 'tools' ? tools : undefined}
                      isLoading={activeWidget.id === 'posts' ? postsLoading : activeWidget.id === 'tools' ? toolsLoading : undefined}
                      mode="view"
                      maxItems={5}
                      showCompact={true}
                    />
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          /* Desktop Widget Grid - 60/40 Layout per PRD */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Primary Widget - Post Board (60%) */}
            <div className="lg:col-span-3 space-y-6">
              <motion.div
                className={cn(
                  "rounded-xl p-6 cursor-pointer group transition-all",
                  currentMode === 'insights' 
                    ? "bg-[var(--hive-gold)]/5 border border-[var(--hive-gold)]/30" 
                    : "bg-[var(--hive-white)]/[0.02] border border-[var(--hive-white)]/[0.06] hover:border-[var(--hive-white)]/[0.1]"
                )}
                onClick={() => openModal('posts')}
                whileHover={{ scale: 1.01 }}
                layout
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
                    <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">Post Board</h3>
                    {currentMode === 'insights' && (
                      <motion.div
                        className="px-2 py-1 bg-[var(--hive-gold)]/20 border border-[var(--hive-gold)]/30 rounded text-xs text-[var(--hive-gold)]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        Analytics Active
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {currentMode === 'insights' ? (
                      <Activity className="h-4 w-4 text-[var(--hive-gold)]" />
                    ) : (
                      <>
                        <span className="text-xs text-neutral-400">Click to expand</span>
                        <Maximize2 className="h-4 w-4 text-neutral-400 group-hover:text-[var(--hive-brand-secondary)] transition-colors" />
                      </>
                    )}
                  </div>
                </div>
                
                {/* Insights Mode Overlay for Posts */}
                {currentMode === 'insights' && (
                  <motion.div
                    className="mb-4 p-4 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {analyticsLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-5 w-5 animate-spin text-[var(--hive-gold)]" />
                        <span className="ml-2 text-sm text-neutral-400">Loading analytics...</span>
                      </div>
                    ) : analyticsData ? (
                      <>
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[var(--hive-gold)]">{analyticsData.contentData?.postsThisWeek || 0}</div>
                            <div className="text-xs text-neutral-400">Posts This Week</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{analyticsData.contentData?.averageEngagement || 0}%</div>
                            <div className="text-xs text-neutral-400">Engagement Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">{analyticsData.contentData?.totalPosts || 0}</div>
                            <div className="text-xs text-neutral-400">Total Posts</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-400">Peak activity: 2-4 PM</span>
                          <span className={cn(
                            (analyticsData.contentData?.contentGrowthRate ?? 0) >= 0 ? "text-green-400" : "text-red-400"
                          )}>
                            {(analyticsData.contentData?.contentGrowthRate ?? 0) >= 0 ? "↑" : "↓"} {Math.abs(analyticsData.contentData?.contentGrowthRate || 0)}% vs last week
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4 text-neutral-400 text-sm">
                        Analytics data unavailable
                      </div>
                    )}
                  </motion.div>
                )}
                {/* Show management panel in manage mode, posts otherwise */}
                {isLeader && currentMode === 'manage' ? (
                  <SpaceManagementPanel
                    spaceId={spaceId}
                    isOwner={spaceMembership?.role === 'owner'}
                    currentUserId={user?.id || ''}
                  />
                ) : (
                <HivePostsSurface
                  space={space}
                  posts={posts}
                  isLoading={postsLoading}
                  mode="view"
                  maxPosts={3}
                  showFilters={false}
                  canPost={isJoined && space.status === 'activated'}
                  onCreatePost={handleCreatePost}
                  onCreateComment={handleCreateComment}
                  onLoadComments={handleLoadComments}
                  leaderMode={currentMode}
                  canModerate={isLeader && isInMode('moderate')}
                  // NEW: Enhanced coordination features
                  showLiveActivity={true}
                  liveActivityCount={analyticsData?.membershipData?.activeMembers || 0}
                  currentUserId={user?.id}
                  onCoordinationResponse={async (postId, response) => {
                    try {
                      const apiResponse = await authenticatedFetch(`/api/spaces/${spaceId}/posts/${postId}/coordination`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response)
                      });
                      if (!apiResponse.ok) throw new Error('Failed to submit coordination response');
                      // Refresh to show updated coordination data
                      window.location.reload();
                    } catch (error) {
                      logger.error('Coordination response error:', error);
                      alert('Failed to submit response. Please try again.');
                    }
                  }}
                  onUpdateCoordinationStatus={async (postId, status) => {
                    try {
                      const apiResponse = await authenticatedFetch(`/api/spaces/${spaceId}/posts/${postId}/coordination/status`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status })
                      });
                      if (!apiResponse.ok) throw new Error('Failed to update coordination status');
                      // Refresh to show updated status
                      window.location.reload();
                    } catch (error) {
                      logger.error('Coordination status error:', error);
                      alert('Failed to update status. Please try again.');
                    }
                  }}
                  PostRenderer={PostWithComments}
                  onReaction={toggleReaction}
                  onShare={async (postId: any) => {
                    // Share functionality can be implemented later
                  }}
                  onDelete={async (postId: any) => {
                    if (confirm('Are you sure you want to delete this post?')) {
                      try {
                        await deletePost(postId);
                      } catch (error) {
                        logger.error('Delete post error:', error);
                      }
                    }
                  }}
                />
                )}
              </motion.div>
            </div>
            
            {/* Secondary Widgets (40%) */}
            <div className="lg:col-span-2 space-y-6">
              {availableWidgets.filter(w => w.id !== 'posts').map((widget: any) => {
                const Icon = widget.icon as React.ComponentType<{ className?: string }>;
                const Component = widget.component;
                
                return (
                  <motion.div
                    key={widget.id}
                    className={cn(
                      "rounded-xl p-4 cursor-pointer group transition-all",
                      currentMode === 'insights' 
                        ? "bg-[var(--hive-gold)]/5 border border-[var(--hive-gold)]/30" 
                        : "bg-[var(--hive-white)]/[0.02] border border-[var(--hive-white)]/[0.06] hover:border-[var(--hive-white)]/[0.1]"
                    )}
                    onClick={() => openModal(widget.id)}
                    whileHover={{ scale: 1.02 }}
                    layout
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
                        <h4 className="text-sm font-semibold text-[var(--hive-text-inverse)]">{widget.title}</h4>
                        {widget.adminOnly && (
                          <Badge variant="primary" className="text-xs border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]">
                            Admin
                          </Badge>
                        )}
                        {currentMode === 'insights' && (
                          <motion.div
                            className="w-2 h-2 bg-[var(--hive-gold)] rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>
                      {currentMode === 'insights' ? (
                        <Activity className="h-3 w-3 text-[var(--hive-gold)]" />
                      ) : (
                        <Maximize2 className="h-3 w-3 text-neutral-400 group-hover:text-[var(--hive-brand-secondary)] transition-colors" />
                      )}
                    </div>
                    
                    {/* Widget-Specific Insights Overlays */}
                    {currentMode === 'insights' && widget.id === 'members' && (
                      <motion.div
                        className="mb-3 p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {analyticsLoading ? (
                          <div className="flex items-center justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin text-[var(--hive-gold)]" />
                          </div>
                        ) : analyticsData ? (
                          <>
                            <div className="grid grid-cols-2 gap-3 mb-2">
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-400">{analyticsData.membershipData?.activeMembers || 0}</div>
                                <div className="text-xs text-neutral-400">Active Members</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-blue-400">{analyticsData.membershipData?.newMembers || 0}</div>
                                <div className="text-xs text-neutral-400">New This Week</div>
                              </div>
                            </div>
                            <div className="text-xs text-neutral-400 text-center">
                              Retention: <span className="text-green-400">{analyticsData.membershipData?.averageEngagement || 0}%</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-neutral-400 text-center">Analytics unavailable</div>
                        )}
                      </motion.div>
                    )}
                    
                    {currentMode === 'insights' && widget.id === 'events' && (
                      <motion.div
                        className="mb-3 p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {analyticsLoading ? (
                          <div className="flex items-center justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin text-[var(--hive-gold)]" />
                          </div>
                        ) : analyticsData ? (
                          <>
                            <div className="grid grid-cols-2 gap-3 mb-2">
                              <div className="text-center">
                                <div className="text-lg font-bold text-[var(--hive-gold)]">{analyticsData.eventsData?.upcomingEvents || 0}</div>
                                <div className="text-xs text-neutral-400">Upcoming</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-400">{analyticsData.eventsData?.averageAttendance || 0}%</div>
                                <div className="text-xs text-neutral-400">Avg Attendance</div>
                              </div>
                            </div>
                            <div className="text-xs text-neutral-400 text-center">
                              Total events: <span className="text-[var(--hive-text-inverse)]">{analyticsData.eventsData?.totalEvents || 0}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-neutral-400 text-center">Analytics unavailable</div>
                        )}
                      </motion.div>
                    )}
                    
                    {currentMode === 'insights' && widget.id === 'tools' && (
                      <motion.div
                        className="mb-3 p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {analyticsLoading ? (
                          <div className="flex items-center justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin text-[var(--hive-gold)]" />
                          </div>
                        ) : analyticsData ? (
                          <>
                            <div className="grid grid-cols-2 gap-3 mb-2">
                              <div className="text-center">
                                <div className="text-lg font-bold text-cyan-400">{analyticsData.toolsData?.activeTools || 0}</div>
                                <div className="text-xs text-neutral-400">Active Tools</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-[var(--hive-gold)]">{analyticsData.toolsData?.toolUsage || 0}</div>
                                <div className="text-xs text-neutral-400">Weekly Uses</div>
                              </div>
                            </div>
                            <div className="text-xs text-neutral-400 text-center">
                              Top: <span className="text-[var(--hive-text-inverse)]">{analyticsData.toolsData?.topTools?.[0] || 'N/A'}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-neutral-400 text-center">Analytics unavailable</div>
                        )}
                      </motion.div>
                    )}
                    
                    {currentMode === 'insights' && widget.id === 'pinned' && (
                      <motion.div
                        className="mb-3 p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {analyticsLoading ? (
                          <div className="flex items-center justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin text-[var(--hive-gold)]" />
                          </div>
                        ) : analyticsData ? (
                          <>
                            <div className="grid grid-cols-2 gap-3 mb-2">
                              <div className="text-center">
                                <div className="text-lg font-bold text-pink-400">{analyticsData.resourcesData?.items || 0}</div>
                                <div className="text-xs text-neutral-400">Pinned Items</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-indigo-400">{analyticsData.resourcesData?.totalViews || 0}</div>
                                <div className="text-xs text-neutral-400">Total Views</div>
                              </div>
                            </div>
                            <div className="text-xs text-neutral-400 text-center">
                              Most viewed: <span className="text-[var(--hive-text-inverse)]">{analyticsData.resourcesData?.mostViewed || 'N/A'}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-neutral-400 text-center">Analytics unavailable</div>
                        )}
                      </motion.div>
                    )}
                    {/* Enhanced Member Directory Widget for Leaders */}
                    {widget.id === 'members' && isLeader && (currentMode === 'manage' || currentMode === 'insights') ? (
                      <HiveMembersSurface
                        space={space}
                        members={members}
                        isBuilder={isLeader}
                        leaderMode={currentMode === 'manage' ? 'manage' : 'insights'}
                        maxMembers={5}
                        canManageMembers={isLeader}
                        onInviteMember={() => {}}
                        onMessageMember={(memberId) => {}}
                      />
                    ) : widget.id === 'events' && isLeader && (currentMode === 'manage' || currentMode === 'insights') ? (
                      <HiveEventsSurface
                        space={space}
                        events={events}
                        canCreateEvents={isLeader}
                        canModerate={isLeader}
                        leaderMode={currentMode === 'manage' ? 'moderate' : 'insights'}
                        onCreateEvent={() => setShowEventCreation(true)}
                        onEditEvent={(eventId: any) => updateEvent(eventId, {})}
                        onCancelEvent={(eventId: any) => deleteEvent(eventId)}
                        onRSVPEvent={(eventId, status) => rsvpToEvent(eventId, status as any)}
                      />
                    ) : (
                      <Component
                        space={space}
                        posts={widget.id === 'posts' ? posts : undefined}
                        members={widget.id === 'members' ? members : undefined}
                        items={widget.id === 'pinned' ? pinnedItems : undefined}
                        tools={widget.id === 'tools' ? tools : undefined}
                        isLoading={widget.id === 'posts' ? postsLoading : widget.id === 'members' ? membersLoading : widget.id === 'pinned' ? pinnedLoading : widget.id === 'tools' ? toolsLoading : undefined}
                        mode="view"
                        showCompact={true}
                        maxItems={3}
                        isBuilder={isAdmin}
                        canPin={widget.id === 'pinned' ? isLeader : undefined}
                        canModerate={isLeader}
                        leaderMode={currentMode}
                        canManageTools={isAdmin}
                        onAddTool={widget.id === 'tools' ? handleAddTool : undefined}
                        onConfigureTool={widget.id === 'tools' ? handleConfigureTool : undefined}
                        onViewToolAnalytics={widget.id === 'tools' ? handleViewToolAnalytics : undefined}
                        onRemoveTool={widget.id === 'tools' ? handleRemoveTool : undefined}
                        onAddPinned={widget.id === 'pinned' ? () => {} : undefined}
                        onViewItem={widget.id === 'pinned' ? (itemId: any) => trackPinnedAction(itemId, 'view') : undefined}
                        onDownloadItem={widget.id === 'pinned' ? (itemId: any) => trackPinnedAction(itemId, 'download') : undefined}
                        onUnpinItem={widget.id === 'pinned' ? unpinItem : undefined}
                      />
                    )}
                  </motion.div>
                );
              })}
              
              {/* About Widget - Enhanced for Configure & Insights Mode */}
              <div className={cn(
                "rounded-xl p-4 transition-all",
                currentMode === 'configure' 
                  ? "border border-green-500/30 bg-green-500/5" 
                  : currentMode === 'insights'
                  ? "border border-[var(--hive-gold)]/30 bg-[var(--hive-gold)]/5"
                  : "border border-[var(--hive-white)]/[0.06] bg-[var(--hive-white)]/[0.02]"
              )}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-[var(--hive-text-inverse)]">About</h4>
                    {currentMode === 'insights' && (
                      <motion.div
                        className="w-2 h-2 bg-[var(--hive-gold)] rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                  {currentMode === 'configure' && isLeader && (
                    <motion.button
                      className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 hover:bg-green-500/30 transition-all"
                      onClick={() => {
                        setIsEditingDescription(!isEditingDescription);
                        setEditedDescription(space.description || '');
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Settings className="w-3 h-3 mr-1 inline" />
                      {isEditingDescription ? 'Cancel' : 'Edit'}
                    </motion.button>
                  )}
                  {currentMode === 'insights' && (
                    <Activity className="h-3 w-3 text-[var(--hive-gold)]" />
                  )}
                </div>
                
                {/* Insights Mode Overview */}
                {currentMode === 'insights' && (
                  <motion.div
                    className="mb-4 p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {analyticsLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-4 w-4 animate-spin text-[var(--hive-gold)]" />
                        <span className="ml-2 text-xs text-neutral-400">Loading health score...</span>
                      </div>
                    ) : analyticsData ? (
                      <>
                        <div className="text-xs font-medium text-[var(--hive-gold)] mb-2">Space Health Score</div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex-1 bg-[var(--hive-white)]/10 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${((analyticsData as any).membershipData?.healthScore || (analyticsData.membershipData?.activeMembers ? Math.min(analyticsData.membershipData.activeMembers / 10, 10) : 0)) * 10}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-[var(--hive-text-inverse)]">{(analyticsData as any).membershipData?.healthScore || Math.floor((analyticsData.membershipData?.activeMembers || 0) / 10)}/10</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Activity</span>
                            <span className={cn(
                              (analyticsData as any).membershipData?.activity === 'High' ? "text-green-400" :
                              (analyticsData as any).membershipData?.activity === 'Medium' ? "text-[var(--hive-gold)]" : "text-red-400"
                            )}>
                              {(analyticsData as any).membershipData?.activity || 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Engagement</span>
                            <span className={cn(
                              (analyticsData as any).membershipData?.engagement === 'High' ? "text-green-400" :
                              (analyticsData as any).membershipData?.engagement === 'Medium' ? "text-[var(--hive-gold)]" : "text-red-400"
                            )}>
                              {(analyticsData as any).membershipData?.engagement || 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Growth</span>
                            <span className={cn(
                              (analyticsData as any).membershipData?.growth === 'Growing' ? "text-green-400" :
                              (analyticsData as any).membershipData?.growth === 'Steady' ? "text-blue-400" : "text-[var(--hive-gold)]"
                            )}>
                              {(analyticsData as any).membershipData?.growth || 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-400">Retention</span>
                            <span className={cn(
                              (analyticsData as any).membershipData?.retention === 'Excellent' ? "text-green-400" :
                              (analyticsData as any).membershipData?.retention === 'Good' ? "text-blue-400" : "text-[var(--hive-gold)]"
                            )}>
                              {(analyticsData as any).membershipData?.retention || 'N/A'}
                            </span>
                          </div>
                        </div>
                        {(analyticsData as any).membershipData?.alerts && (analyticsData as any).membershipData.alerts.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-[var(--hive-gold)]/20">
                            <div className="text-xs font-medium text-[var(--hive-gold)] mb-1">Latest Alert</div>
                            <div className="text-xs text-neutral-300">
                              {(analyticsData as any).membershipData.alerts[0].message}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-4 text-neutral-400 text-xs">
                        Health metrics unavailable
                      </div>
                    )}
                  </motion.div>
                )}
                
                {/* Editable Description */}
                {isEditingDescription && currentMode === 'configure' ? (
                  <div className="space-y-3">
                    <textarea
                      className="w-full bg-[var(--hive-white)]/5 border border-green-500/30 rounded-lg px-3 py-2 text-xs text-[var(--hive-text-inverse)] placeholder-gray-400 resize-none focus:outline-none focus:border-green-400/50 transition-colors"
                      placeholder="Describe your space..."
                      rows={4}
                      value={editedDescription}
                      onChange={(e: any) => setEditedDescription(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <motion.button
                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-[var(--hive-text-inverse)] text-xs rounded-md transition-colors"
                        onClick={() => {
                          setIsEditingDescription(false);
                          setEditedDescription('');
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-[var(--hive-text-inverse)] text-xs rounded-md transition-colors disabled:opacity-50"
                        disabled={managementUpdating}
                        onClick={async () => {
                          try {
                            await updateSettings({ description: editedDescription });
                            setIsEditingDescription(false);
                            // Update local space object to reflect changes
                            if (space) {
                              space.description = editedDescription;
                            }
                            // Show success toast if available
                            if (typeof window !== 'undefined' && (window as any).showToast) {
                              (window as any).showToast({
                                title: 'Success',
                                description: 'Space description updated',
                                type: 'success'
                              });
                            }
                          } catch (error) {
                            logger.error('Failed to update description:', error);
                            // Show error toast if available
                            if (typeof window !== 'undefined' && (window as any).showToast) {
                              (window as any).showToast({
                                title: 'Error',
                                description: 'Failed to update description',
                                type: 'error'
                              });
                            }
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {managementUpdating ? 'Saving...' : 'Save'}
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {space.description || "No description available."}
                  </p>
                )}
                
                {/* Configure Mode Indicator */}
                {currentMode === 'configure' && !isEditingDescription && (
                  <motion.div
                    className="mt-2 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Configure Mode - Click Edit to modify
                  </motion.div>
                )}
                
                <div className="mt-3 pt-3 border-t border-[var(--hive-white)]/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Type</span>
                    <span className="text-[var(--hive-text-inverse)] capitalize">{space.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Members</span>
                    <span className="text-[var(--hive-text-inverse)]">{(space.memberCount || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal System */}
        <AnimatePresence>
          {activeModal && (
            <motion.div
              className="fixed inset-0 bg-[var(--hive-black)]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-[var(--hive-background-primary)] border border-[var(--hive-white)]/[0.1] rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e: any) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--hive-white)]/[0.06]">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const widget = availableWidgets.find(w => w.id === activeModal);
                      if (!widget) return null;
                      const Icon = widget.icon as React.ComponentType<{ className?: string }>;
                      return (
                        <>
                          <Icon className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
                          <h2 className="text-xl font-semibold text-[var(--hive-text-inverse)]">{widget.title}</h2>
                          {widget.adminOnly && (
                            <Badge variant="primary" className="border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]">
                              Admin Only
                            </Badge>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* View Mode Selector */}
                    {(() => {
                      const widget = availableWidgets.find(w => w.id === activeModal);
                      if (!widget?.allowedViews) return null;
                      
                      return (
                        <div className="flex items-center gap-1 mr-4">
                          {widget.allowedViews.map((view: any) => (
                            <Button
                              key={view}
                              size="sm"
                              variant={widgetViews[activeModal] === view ? 'primary' : 'outline'}
                              className={widgetViews[activeModal] === view 
                                ? 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)]/30'
                                : 'border-[var(--hive-white)]/[0.2] text-neutral-400 hover:text-[var(--hive-text-inverse)]'
                              }
                              onClick={() => changeWidgetView(activeModal, view)}
                            >
                              {view === 'list' && <List className="h-3 w-3" />}
                              {view === 'grid' && <Grid className="h-3 w-3" />}
                              {view === 'calendar' && <Calendar className="h-3 w-3" />}
                              <span className="ml-1 capitalize">{view}</span>
                            </Button>
                          ))}
                        </div>
                      );
                    })()}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[var(--hive-white)]/[0.2] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-white)]/[0.1]"
                      onClick={closeModal}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  {(() => {
                    const widget = availableWidgets.find(w => w.id === activeModal);
                    if (!widget) return null;
                    
                    const Component = widget.component;
                    return (
                      <>
                        {/* Full Member Directory Tool for Leaders */}
                        {widget.id === 'members' && isLeader && (currentMode === 'manage' || currentMode === 'insights') ? (
                          <HiveMembersSurface
                            space={space}
                            members={members}
                            isBuilder={isLeader}
                            leaderMode={currentMode === 'manage' ? 'manage' : 'insights'}
                            maxMembers={50}
                            canManageMembers={isLeader}
                            onInviteMember={() => {}}
                            onMessageMember={(memberId) => {}}
                            onChangeRole={handleChangeRole}
                            onRemoveMember={handleRemoveMember}
                            onBlockMember={handleBlockMember}
                          />
                        ) : widget.id === 'events' && isLeader && (currentMode === 'manage' || currentMode === 'insights') ? (
                          <HiveEventsSurface
                            space={space}
                            events={events}
                            isLoading={eventsLoading}
                            canCreateEvents={isLeader}
                            canModerate={isLeader}
                            onCreateEvent={() => setShowEventCreation(true)}
                            onEditEvent={(eventId: any) => updateEvent(eventId, {})}
                            onCancelEvent={(eventId: any) => deleteEvent(eventId)}
                            onRSVPEvent={(eventId, status) => rsvpToEvent(eventId, status as any)}
                          />
                        ) : (
                          <Component
                            space={space}
                            posts={widget.id === 'posts' ? posts : undefined}
                            members={widget.id === 'members' ? members : undefined}
                            items={widget.id === 'pinned' ? pinnedItems : undefined}
                            tools={widget.id === 'tools' ? tools : undefined}
                            isLoading={widget.id === 'posts' ? postsLoading : widget.id === 'members' ? membersLoading : widget.id === 'pinned' ? pinnedLoading : widget.id === 'tools' ? toolsLoading : undefined}
                            mode="view"
                            viewMode={widgetViews[activeModal] || widget.allowedViews?.[0] || 'default'}
                            canPost={isJoined && space.status === 'activated'}
                            canPin={widget.id === 'pinned' ? isLeader : undefined}
                            canModerate={isAdmin}
                            leaderMode={currentMode}
                            isBuilder={isAdmin}
                            canManageTools={widget.id === 'tools' ? isAdmin : undefined}
                            onAddTool={widget.id === 'tools' ? handleAddTool : undefined}
                            onConfigureTool={widget.id === 'tools' ? handleConfigureTool : undefined}
                            onViewToolAnalytics={widget.id === 'tools' ? handleViewToolAnalytics : undefined}
                            onRemoveTool={widget.id === 'tools' ? handleRemoveTool : undefined}
                            onCreateComment={widget.id === 'posts' ? handleCreateComment : undefined}
                            onLoadComments={widget.id === 'posts' ? handleLoadComments : undefined}
                            onChangeRole={widget.id === 'members' ? handleChangeRole : undefined}
                            onRemoveMember={widget.id === 'members' ? handleRemoveMember : undefined}
                            onBlockMember={widget.id === 'members' ? handleBlockMember : undefined}
                            onInviteMember={widget.id === 'members' ? () => {} : undefined}
                            onMessageMember={widget.id === 'members' ? (memberId) => {} : undefined}
                            onAddPinned={widget.id === 'pinned' ? () => {} : undefined}
                            onViewItem={widget.id === 'pinned' ? (itemId: any) => trackPinnedAction(itemId, 'view') : undefined}
                            onDownloadItem={widget.id === 'pinned' ? (itemId: any) => trackPinnedAction(itemId, 'download') : undefined}
                            onUnpinItem={widget.id === 'pinned' ? unpinItem : undefined}
                          />
                        )}
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post Creation Modal */}
        {showPostCreation && spaceId && (
          <PostCreationModal
            isOpen={showPostCreation}
            onClose={() => setShowPostCreation(false)}
            spaceId={spaceId}
            spaceName={space?.name || 'Space'}
            initialPostType={postCreationType}
            canCreateAnnouncements={isAdmin}
          />
        )}

        {/* Event Creation Modal */}
        {showEventCreation && spaceId && (
          <EventCreationModal
            isOpen={showEventCreation}
            onClose={() => setShowEventCreation(false)}
            spaceId={spaceId}
            spaceName={space?.name || 'Space'}
            onEventCreated={() => {
              // Trigger a refresh of events
              window.location.reload();
            }}
          />
        )}

        {/* Leader Toolbar */}
        <LeaderToolbar
          isVisible={isLeader && isJoined}
          currentMode={currentMode}
          onModeChange={toggleMode}
          spaceRole={leaderRole}
        />
      </PageContainer>
    </SpaceErrorBoundaryWrapper>
  );
}

