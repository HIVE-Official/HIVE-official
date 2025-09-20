"use client";

import React, { useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system';
import { type Space } from '@hive/core';
import { 
  Pin,
  MessageSquare,
  Calendar,
  Wrench,
  MessageCircle,
  Users,
  Settings,
  Crown,
  Plus,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  ArrowLeft,
  Share2,
  Bookmark,
  Flag,
  Lock,
  Unlock,
  Sparkles,
  Zap,
  Target,
  Grid,
  Layout
} from 'lucide-react';

// Import individual surface components
import {
  HivePinnedSurface,
  HivePostsSurface,
  HiveEventsSurface,
  HiveToolsSurface,
  HiveChatSurface,
  HiveMembersSurface,
  type PinnedContent,
  type Post,
  type Event,
  type Tool,
  type ChatMessage,
  type Member
} from './surfaces';

// HIVE Space Layout - 6-Surface Architecture
// Immutable layout system for consistent Space experiences across HIVE

// Surface types as defined in the spec
export type SurfaceType = 'pinned' | 'posts' | 'events' | 'tools' | 'chat' | 'members';

// Surface configuration with HIVE design patterns
const surfaceConfig = {
  pinned: {
    label: 'Pinned',
    icon: Pin,
    description: 'Intro blocks, links, banners',
    defaultState: 'visible',
    color: 'text-yellow-400',
    order: 1
  },
  posts: {
    label: 'Posts',
    icon: MessageSquare,
    description: 'Threads & quick polls',
    defaultState: 'hidden_until_tool',
    color: 'text-blue-400',
    order: 2
  },
  events: {
    label: 'Events',
    icon: Calendar,
    description: 'Calendar cards with RSVP',
    defaultState: 'hidden_until_tool',
    color: 'text-green-400',
    order: 3
  },
  tools: {
    label: 'Tools Stack',
    icon: Wrench,
    description: 'Running list of live Tools',
    defaultState: 'empty',
    color: 'text-purple-400',
    order: 4
  },
  chat: {
    label: 'Chat',
    icon: MessageCircle,
    description: 'Real-time thread',
    defaultState: 'locked_until_v0_1_1',
    color: 'text-orange-400',
    order: 5
  },
  members: {
    label: 'Members',
    icon: Users,
    description: 'Grid of joined profiles',
    defaultState: 'auto_generated',
    color: 'text-gray-400',
    order: 6
  }
} as const;

const hiveSpaceLayoutVariants = cva(
  "relative w-full min-h-screen bg-[var(--hive-background-primary)]/5 backdrop-blur-sm",
  {
    variants: {
      mode: {
        view: "cursor-default",
        edit: "cursor-crosshair",
        builder: "cursor-pointer",
      },
      layout: {
        standard: "",
        compact: "",
        expanded: "",
      }
    },
    defaultVariants: {
      mode: "view",
      layout: "standard",
    },
  }
);

export interface SpaceSurface {
  type: SurfaceType;
  visible: boolean;
  locked: boolean;
  hasContent: boolean;
  toolCount?: number;
  lastActivity?: Date;
  customTitle?: string
}

export interface HiveSpaceLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveSpaceLayoutVariants> {
  space: Space;
  surfaces: SpaceSurface[];
  isBuilder?: boolean;
  canEdit?: boolean;
  onSurfaceToggle?: (surface: SurfaceType) => void;
  onSurfaceSettings?: (surface: SurfaceType) => void;
  onBuilderMode?: () => void;
  onSpaceSettings?: () => void;
  onBackToDirectory?: () => void;
  children?: React.ReactNode;
  
  // Surface content render props (optional - will use defaults if not provided)
  renderPinnedSurface?: () => React.ReactNode;
  renderPostsSurface?: () => React.ReactNode;
  renderEventsSurface?: () => React.ReactNode;
  renderToolsSurface?: () => React.ReactNode;
  renderChatSurface?: () => React.ReactNode;
  renderMembersSurface?: () => React.ReactNode;
  
  // Surface data props
  pinnedContent?: PinnedContent[];
  posts?: Post[];
  events?: Event[];
  tools?: Tool[];
  messages?: ChatMessage[];
  members?: Member[];
  currentUserId?: string;
  
  // Surface configuration
  chatIsLocked?: boolean;
  canCreateContent?: boolean;
  canModerate?: boolean;
  
  // Builder features
  showBuilderHints?: boolean;
  builderOnboarding?: {
    step: number;
    total: number;
    checklist: Array<{ completed: boolean; label: string }>
  }
}

export const HiveSpaceLayout = React.forwardRef<HTMLDivElement, HiveSpaceLayoutProps>(
  ({ 
    className,
    mode,
    layout,
    space,
    surfaces,
    isBuilder = false,
    canEdit = false,
    onSurfaceToggle,
    onSurfaceSettings,
    onBuilderMode,
    onSpaceSettings,
    onBackToDirectory,
    children,
    renderPinnedSurface,
    renderPostsSurface,
    renderEventsSurface,
    renderToolsSurface,
    renderChatSurface,
    renderMembersSurface,
    pinnedContent = [],
    posts = [],
    events = [],
    tools = [],
    messages = [],
    members = [],
    currentUserId,
    chatIsLocked = true, // Chat locked until v0.1.1
    canCreateContent = true,
    canModerate = false,
    showBuilderHints = false,
    builderOnboarding,
    ...props 
  }, ref) => {
    
    const [collapsedSurfaces, setCollapsedSurfaces] = useState<Set<SurfaceType>>(new Set());
    const [hoveredSurface, setHoveredSurface] = useState<SurfaceType | null>(null);
    const [showSurfaceMenu, setShowSurfaceMenu] = useState(false);
    
    const layoutRef = useRef<HTMLDivElement>(null);
    
    // Get surface configuration with current state
    const activeSurfaces = useMemo(() => 
      surfaces
        .map(surface => ({
          ...surface,
          config: surfaceConfig[surface.type]
        })})
        .sort((a, b) => a.config.order - b.config.order)
        .filter(surface => surface.visible)
    , [surfaces]);
    
    // Handle surface collapse/expand
    const handleSurfaceToggle = useCallback((surfaceType: SurfaceType) => {
      setCollapsedSurfaces(prev => {
        const newSet = new Set(prev);
        if (newSet.has(surfaceType)) {
          newSet.delete(surfaceType)
        } else {
          newSet.add(surfaceType)
        }
        return newSet
      })}
    }, []);
    
    // Render surface content based on type
    const renderSurfaceContent = useCallback((surface: SpaceSurface) => {
      switch (surface.type) {
        case 'pinned':
          return renderPinnedSurface?.() || (
            <HivePinnedSurface
              space={space}
              pinnedContent={pinnedContent}
              isBuilder={isBuilder}
              canEdit={canEdit}
              mode={mode}
            />
          );
        case 'posts':
          return renderPostsSurface?.() || (
            <HivePostsSurface
              space={space}
              posts={posts}
              isBuilder={isBuilder}
              canPost={canCreateContent}
              canModerate={canModerate}
              mode={mode}
            />
          );
        case 'events':
          return renderEventsSurface?.() || (
            <HiveEventsSurface
              space={space}
              events={events}
              isBuilder={isBuilder}
              canCreateEvents={canCreateContent}
              canModerate={canModerate}
              mode={mode}
            />
          );
        case 'tools':
          return renderToolsSurface?.() || (
            <HiveToolsSurface
              space={space}
              tools={tools}
              isBuilder={isBuilder}
              canManageTools={canEdit}
              mode={mode}
              compact={true}
            />
          );
        case 'chat':
          return renderChatSurface?.() || (
            <HiveChatSurface
              space={space}
              messages={messages}
              currentUserId={currentUserId}
              isBuilder={isBuilder}
              canSendMessages={canCreateContent}
              canModerate={canModerate}
              isLocked={chatIsLocked}
              mode={mode}
            />
          );
        case 'members':
          return renderMembersSurface?.() || (
            <HiveMembersSurface
              space={space}
              members={members}
              currentUserId={currentUserId}
              isBuilder={isBuilder}
              canModerate={canModerate}
              mode={mode}
            />
          );
        default:
          return null
      }
    }, [
      space, 
      pinnedContent, 
      posts, 
      events, 
      tools, 
      messages, 
      members,
      currentUserId,
      isBuilder,
      canEdit,
      canCreateContent,
      canModerate,
      chatIsLocked,
      mode,
      renderPinnedSurface, 
      renderPostsSurface, 
      renderEventsSurface, 
      renderToolsSurface, 
      renderChatSurface, 
      renderMembersSurface
    ]);
    
    return (
      <div
        ref={ref}
        className={cn(hiveSpaceLayoutVariants({ mode, layout, className }))}
        {...props}
      >
        {/* Space Header */}
        <motion.header
          className="sticky top-0 z-40 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDurations.smooth }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Space Info */}
              <div className="flex items-center gap-4">
                <motion.button
                  className="p-2 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                  onClick={onBackToDirectory}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
                
                <div>
                  <h1 className="text-xl font-bold text-[var(--hive-text-primary)]">{space.name}</h1>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>{space.memberCount} members</span>
                    <span>•</span>
                    <span className="capitalize">{space.tags?.[0]?.sub_type || space.tags?.[0]?.type}</span>
                    {isBuilder && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Crown className="w-3 h-3" />
                          <span className="font-medium">Builder</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Surface Navigation */}
                <div className="hidden md:flex items-center gap-1 bg-[var(--hive-background-primary)]/20 rounded-xl p-1 border border-white/10">
                  {activeSurfaces.map((surface) => {
                    const Icon = surface.config.icon;
                    const isCollapsed = collapsedSurfaces.has(surface.type);
                    
                    return (
                      <motion.button
                        key={surface.type}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                          hoveredSurface === surface.type
                            ? "bg-yellow-500/20 text-yellow-400"
                            : isCollapsed
                            ? "text-gray-500"
                            : "text-gray-300 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/5"
                        )}
                        onClick={() => handleSurfaceToggle(surface.type)}
                        onMouseEnter={() => setHoveredSurface(surface.type)}
                        onMouseLeave={() => setHoveredSurface(null)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={cn("w-4 h-4", surface.config.color)} />
                        <span className="hidden lg:inline">{surface.config.label}</span>
                        {surface.type === 'tools' && surface.toolCount && (
                          <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                            {surface.toolCount}
                          </span>
                        )}
                      </motion.button>
                    )
          })}
                </div>
                
                {/* Builder Mode Toggle */}
                {canEdit && (
                  <motion.button
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200",
                      mode === 'builder'
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:text-[var(--hive-text-primary)] hover:border-white/20"
                    )}
                    onClick={onBuilderMode}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Wrench className="w-4 h-4" />
                    <span>{mode === 'builder' ? 'Exit Builder' : 'Builder Mode'}</span>
                  </motion.button>
                )}
                
                {/* Space Settings */}
                {canEdit && (
                  <motion.button
                    className="p-2 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                    onClick={onSpaceSettings}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings className="w-5 h-5" />
                  </motion.button>
                )}
                
                {/* More Actions */}
                <motion.button
                  className="p-2 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MoreHorizontal className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            {/* Builder Onboarding Progress */}
            {builderOnboarding && isBuilder && (
              <motion.div
                className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-yellow-400">Builder Setup Progress</h3>
                  <span className="text-xs text-yellow-300">
                    {builderOnboarding.step} of {builderOnboarding.total}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {builderOnboarding.checklist.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        item.completed
                          ? "bg-green-500 border-green-500 text-[var(--hive-text-primary)]"
                          : "border-yellow-500/50 text-yellow-400"
                      )}>
                        {item.completed && <span className="text-xs">✓</span>}
                      </div>
                      <span className={item.completed ? "text-green-400" : "text-yellow-300"}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.header>
        
        {/* Main Content Area - 6 Surfaces */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Primary Column */}
            <div className="lg:col-span-8 space-y-8">
              {activeSurfaces
                .filter(surface => ['pinned', 'posts', 'events'].includes(surface.type))
                .map((surface, index) => (
                <SurfaceContainer
                  key={surface.type}
                  surface={surface}
                  isCollapsed={collapsedSurfaces.has(surface.type)}
                  onToggle={() => handleSurfaceToggle(surface.type)}
                  onSettings={() => onSurfaceSettings?.(surface.type)}
                  canEdit={canEdit}
                  builderMode={mode === 'builder'}
                  index={index}
                >
                  {renderSurfaceContent(surface)}
                </SurfaceContainer>
              ))}
            </div>
            
            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              {activeSurfaces
                .filter(surface => ['tools', 'chat', 'members'].includes(surface.type))
                .map((surface, index) => (
                <SurfaceContainer
                  key={surface.type}
                  surface={surface}
                  isCollapsed={collapsedSurfaces.has(surface.type)}
                  onToggle={() => handleSurfaceToggle(surface.type)}
                  onSettings={() => onSurfaceSettings?.(surface.type)}
                  canEdit={canEdit}
                  builderMode={mode === 'builder'}
                  index={index}
                  compact
                >
                  {renderSurfaceContent(surface)}
                </SurfaceContainer>
              ))}
            </div>
          </div>
        </main>
        
        {/* Builder Hints Overlay */}
        <AnimatePresence>
          {showBuilderHints && mode === 'builder' && (
            <motion.div
              className="fixed inset-0 bg-[var(--hive-background-primary)]/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="max-w-md bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Builder Mode Active</h3>
                  <p className="text-gray-400 mb-6">
                    You can now customize your Space by adding Tools, editing content, and organizing surfaces.
                  </p>
                  <motion.button
                    className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Got it!
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
);

HiveSpaceLayout.displayName = "HiveSpaceLayout";

// Surface Container Component
interface SurfaceContainerProps {
  surface: SpaceSurface & { config: typeof surfaceConfig[SurfaceType] };
  isCollapsed: boolean;
  onToggle: () => void;
  onSettings: () => void;
  canEdit: boolean;
  builderMode: boolean;
  index: number;
  compact?: boolean;
  children: React.ReactNode
}

const SurfaceContainer: React.FC<SurfaceContainerProps> = ({
  surface,
  isCollapsed,
  onToggle,
  onSettings,
  canEdit,
  builderMode,
  index,
  compact = false,
  children
}) => {
  const Icon = surface.config.icon;
  
  return (
    <motion.section
      className={cn(
        "relative bg-[var(--hive-background-primary)]/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden",
        builderMode && "ring-2 ring-yellow-500/20 ring-offset-2 ring-offset-black/20",
        compact && "lg:max-h-96"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      layout
    >
      {/* Surface Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Icon className={cn("w-5 h-5", surface.config.color)} />
          <div>
            <h3 className="font-medium text-[var(--hive-text-primary)]">
              {surface.customTitle || surface.config.label}
            </h3>
            <p className="text-xs text-gray-400">{surface.config.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {surface.type === 'tools' && surface.toolCount && (
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs mr-2">
              {surface.toolCount} tools
            </span>
          )}
          
          {canEdit && (
            <motion.button
              className="p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
              onClick={onSettings}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          )}
          
          <motion.button
            className="p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
            onClick={onToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>
      
      {/* Surface Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className={cn("p-4", compact && "max-h-80 overflow-y-auto")}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
};

// Individual surface components are imported from ./surfaces/

export { hiveSpaceLayoutVariants, surfaceConfig };