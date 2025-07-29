"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Badge, PageContainer, HivePostsSurface, HiveEventsSurface, HiveMembersSurface, HivePinnedSurface, HiveToolsSurface } from "@hive/ui";
import { Users, AlertTriangle, Loader2 as _Loader2, Hash, Heart as _Heart, MessageSquare, Camera as _Camera, Code, Calendar, ArrowRight as _ArrowRight, Clock, Settings, Grid, List, Maximize2, X, Tabs as _Tabs, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type Space } from "@hive/core";
import { useAuth } from "@hive/auth-logic";
import { motion, AnimatePresence } from "framer-motion";
import { SpaceErrorBoundaryWrapper } from "../components/space-error-boundary";
import { SpaceLoadingSkeleton } from "../components/space-loading-skeleton";

async function fetchSpaceById(spaceId: string): Promise<Space> {
  const headers: Record<string, string> = {};
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
    } else {
      headers.Authorization = `Bearer test-token`;
    }
  } catch (error) {
    console.warn('Could not get auth token, using test token');
    headers.Authorization = `Bearer test-token`;
  }

  const response = await fetch(`/api/spaces/${spaceId}`, { headers });
  if (response.status === 404) {
    throw new Error("Space not found");
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch space: ${response.status}`);
  }
  return response.json();
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
        <h1 className="text-2xl font-bold text-white mb-4">
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
    dormant: { label: "Preview Mode", variant: "secondary" as const, color: "text-blue-400" },
    frozen: { label: "View Only", variant: "outline" as const, color: "text-gray-400" },
    activated: { label: "Active", variant: "default" as const, color: "text-green-400" },
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
  const [widgetViews, setWidgetViews] = useState<Record<WidgetType, string>>({});
  
  const { user } = useAuth();

  const handleJoinSpace = async () => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      // Get auth token
      try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
          const session = JSON.parse(sessionJson);
          headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
        } else {
          headers.Authorization = `Bearer test-token`;
        }
      } catch (error) {
        headers.Authorization = `Bearer test-token`;
      }

      const response = await fetch('/api/spaces/join', {
        method: 'POST',
        headers,
        body: JSON.stringify({ spaceId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to join space');
      }

      setIsJoined(true);
      
      // Refresh to show updated membership state
      window.location.reload();
    } catch (error: any) {
      console.error('Failed to join space:', error);
      alert(error.message || 'Failed to join space');
    }
  };

  // Check if user is admin (mock for now)
  const isAdmin = user?.email?.includes('admin') || false;
  
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

  React.useEffect(() => {
    params.then(({ spaceId }) => setSpaceId(spaceId));
  }, [params]);

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
          { label: space.name, icon: Hash },
        ]}
        className="-mt-16 relative z-10"
        padding="lg"
      >
        {/* Space Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white truncate font-['Space_Grotesk']">
                {space.name}
              </h1>
              <SpaceStatusBadge status={space.status} />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{space.memberCount.toLocaleString()} members</span>
              </div>

              <Badge variant="secondary" className="capitalize text-xs">
                {space.type}
              </Badge>

              {space.tags.length > 0 && (
                <Badge variant="outline" className="capitalize text-xs">
                  {space.tags[0].sub_type}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex-shrink-0">
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
            ) : (
              <Button 
                variant="default"
                className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
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
            <Monitor className="h-5 w-5 text-[#FFD700]" />
            <span className="text-sm text-neutral-400">
              {viewMode === 'mobile' ? 'Tab View' : 'Widget View'}
            </span>
          </div>
          
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              className="border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10"
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
              {availableWidgets.map((widget) => {
                const Icon = widget.icon;
                const isActive = currentTab === widget.id;
                
                return (
                  <motion.button
                    key={widget.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30'
                        : 'bg-white/[0.02] text-neutral-400 border border-white/[0.06] hover:text-white'
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
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
              {(() => {
                const activeWidget = availableWidgets.find(w => w.id === currentTab);
                if (!activeWidget) return null;
                
                const Component = activeWidget.component;
                return (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">{activeWidget.title}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/[0.2] text-white hover:bg-white/[0.1]"
                        onClick={() => openModal(activeWidget.id)}
                      >
                        <Maximize2 className="h-4 w-4 mr-2" />
                        Expand
                      </Button>
                    </div>
                    <Component
                      space={space}
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
          /* Desktop Widget Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Widget - Post Board */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6 cursor-pointer group hover:border-white/[0.1] transition-all"
                onClick={() => openModal('posts')}
                whileHover={{ scale: 1.01 }}
                layout
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-[#FFD700]" />
                    <h3 className="text-lg font-semibold text-white">Post Board</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">Click to expand</span>
                    <Maximize2 className="h-4 w-4 text-neutral-400 group-hover:text-[#FFD700] transition-colors" />
                  </div>
                </div>
                <HivePostsSurface
                  space={space}
                  mode="view"
                  maxPosts={3}
                  showFilters={false}
                  canPost={isJoined && space.status === 'activated'}
                />
              </motion.div>
            </div>
            
            {/* Secondary Widgets */}
            <div className="space-y-6">
              {availableWidgets.filter(w => w.id !== 'posts').map((widget) => {
                const Icon = widget.icon;
                const Component = widget.component;
                
                return (
                  <motion.div
                    key={widget.id}
                    className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 cursor-pointer group hover:border-white/[0.1] transition-all"
                    onClick={() => openModal(widget.id)}
                    whileHover={{ scale: 1.02 }}
                    layout
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[#FFD700]" />
                        <h4 className="text-sm font-semibold text-white">{widget.title}</h4>
                        {widget.adminOnly && (
                          <Badge variant="outline" className="text-xs border-[#FFD700]/30 text-[#FFD700]">
                            Admin
                          </Badge>
                        )}
                      </div>
                      <Maximize2 className="h-3 w-3 text-neutral-400 group-hover:text-[#FFD700] transition-colors" />
                    </div>
                    <Component
                      space={space}
                      mode="view"
                      showCompact={true}
                      maxItems={3}
                      isBuilder={isAdmin}
                      canManageTools={isAdmin}
                      onAddTool={widget.id === 'tools' ? handleAddTool : undefined}
                      onConfigureTool={widget.id === 'tools' ? handleConfigureTool : undefined}
                      onViewToolAnalytics={widget.id === 'tools' ? handleViewToolAnalytics : undefined}
                    />
                  </motion.div>
                );
              })}
              
              {/* About Widget */}
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
                <h4 className="text-sm font-semibold text-white mb-3">About</h4>
                <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                  {space.description || "No description available."}
                </p>
                <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Type</span>
                    <span className="text-white capitalize">{space.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Members</span>
                    <span className="text-white">{space.memberCount.toLocaleString()}</span>
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const widget = availableWidgets.find(w => w.id === activeModal);
                      if (!widget) return null;
                      const Icon = widget.icon;
                      return (
                        <>
                          <Icon className="h-6 w-6 text-[#FFD700]" />
                          <h2 className="text-xl font-semibold text-white">{widget.title}</h2>
                          {widget.adminOnly && (
                            <Badge variant="outline" className="border-[#FFD700]/30 text-[#FFD700]">
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
                          {widget.allowedViews.map((view) => (
                            <Button
                              key={view}
                              size="sm"
                              variant={widgetViews[activeModal] === view ? 'default' : 'outline'}
                              className={widgetViews[activeModal] === view 
                                ? 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                                : 'border-white/[0.2] text-neutral-400 hover:text-white'
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
                      className="border-white/[0.2] text-white hover:bg-white/[0.1]"
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
                      <Component
                        space={space}
                        mode="view"
                        viewMode={widgetViews[activeModal] || widget.allowedViews?.[0] || 'default'}
                        canPost={isJoined && space.status === 'activated'}
                        canModerate={isAdmin}
                        isBuilder={isAdmin}
                        canManageTools={widget.id === 'tools' ? isAdmin : undefined}
                        onAddTool={widget.id === 'tools' ? handleAddTool : undefined}
                        onConfigureTool={widget.id === 'tools' ? handleConfigureTool : undefined}
                        onViewToolAnalytics={widget.id === 'tools' ? handleViewToolAnalytics : undefined}
                      />
                    );
                  })()}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageContainer>
    </SpaceErrorBoundaryWrapper>
  );
}