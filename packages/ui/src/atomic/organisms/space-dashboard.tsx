'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { 
  Users, 
  Settings, 
  Plus, 
  MoreHorizontal, 
  Crown, 
  UserPlus, 
  Share2,
  Bell,
  Calendar,
  Hash,
  MessageSquare,
  Activity
} from 'lucide-react';
import { AnySpace } from './hive-space-card';
import { SpacePost } from '../molecules/post-board';
import { PlantedTool } from '../molecules/planted-tool-widget';

export interface SpaceDashboardProps {
  space: AnySpace;
  posts: SpacePost[];
  plantedTools: PlantedTool[];
  
  // User context
  currentUser?: {
    id: string;
    role?: 'leader' | 'co_leader' | 'member' | 'non_member'
  };
  
  // Interaction handlers
  onJoinSpace?: () => void;
  onLeaveSpace?: () => void;
  onPlantTool?: () => void;
  onConfigureTool?: (toolId: string) => void;
  onRemoveTool?: (toolId: string) => void;
  onCreatePost?: () => void;
  onPostReaction?: (postId: string, emoji: string) => void;
  onShareSpace?: () => void;
  onManageSpace?: () => void;
  
  // Display options
  variant?: 'default' | 'compact';
  showToolGrid?: boolean;
  className?: string
}

export const SpaceDashboard: React.FC<SpaceDashboardProps> = ({
  space,
  posts,
  plantedTools,
  currentUser,
  onJoinSpace,
  onLeaveSpace,
  onPlantTool,
  onConfigureTool,
  onRemoveTool,
  onCreatePost,
  onPostReaction,
  onShareSpace,
  onManageSpace,
  variant = 'default',
  showToolGrid = true,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'events'>('posts');
  
  const isLeader = currentUser?.role === 'leader' || currentUser?.role === 'co_leader';
  const isMember = currentUser?.role !== 'non_member' && currentUser?.role !== undefined;

  const getSpaceTypeIcon = () => {
    switch (space.type) {
      case 'university': return '🎓';
      case 'residential': return '🏠';
      case 'greek': return '👥';
      case 'student': return '⭐'
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`
  };

  return (
    <div className={cn('min-h-screen bg-[var(--hive-background-primary)]', className)}>
      {/* Space Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl border-b border-[var(--hive-border-primary)]/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Space Identity */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--hive-background-tertiary)]/80 border border-[var(--hive-border-primary)]/30 flex items-center justify-center">
                <span className="text-2xl">{space.logoUrl ? '🏛️' : getSpaceTypeIcon()}</span>
              </div>
              
              <div>
                <h1 className="text-xl font-bold text-[var(--hive-text-primary)] flex items-center gap-2">
                  {space.name}
                  {space.type === 'university' && 'academic' in space && space.academic.isOfficial && (
                    <div className="px-2 py-0.5 bg-[var(--hive-status-info)]/20 border border-[var(--hive-status-info)]/40 rounded-full">
                      <span className="text-xs font-semibold text-[var(--hive-status-info)]">Official</span>
                    </div>
                  )}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-[var(--hive-text-secondary)]">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{space.memberCount.toLocaleString()} members</span>
                  </div>
                  <span className="capitalize">{space.type} space</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {!isMember ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onJoinSpace}
                  className="px-6 py-2.5 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40 rounded-2xl font-semibold hover:bg-[var(--hive-brand-primary)]/30 transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Space
                </motion.button>
              ) : (
                <>
                  <button
                    onClick={onShareSpace}
                    className="w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] transition-colors duration-200"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  
                  <button className="w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] transition-colors duration-200">
                    <Bell className="w-4 h-4" />
                  </button>
                  
                  {isLeader && (
                    <button
                      onClick={onManageSpace}
                      className="w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] transition-colors duration-200"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className={cn(
          'grid gap-8',
          showToolGrid && variant === 'default' ? 'grid-cols-5' : 'grid-cols-1'
        )}>
          {/* Post Board - 60% width (3/5 columns) */}
          <div className={cn(
            showToolGrid && variant === 'default' ? 'col-span-3' : 'col-span-1'
          )}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Post Board Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">Activity</h2>
                  
                  {/* Tabs */}
                  <div className="flex items-center bg-[var(--hive-background-secondary)]/60 border border-[var(--hive-border-primary)]/20 rounded-xl p-1">
                    {(['posts', 'events', 'members'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                          activeTab === tab
                            ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)]'
                            : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
                        )}
                      >
                        {tab === 'posts' && <MessageSquare className="w-4 h-4 mr-2" />}
                        {tab === 'events' && <Calendar className="w-4 h-4 mr-2" />}
                        {tab === 'members' && <Users className="w-4 h-4 mr-2" />}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {isMember && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCreatePost}
                    className="px-4 py-2 bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30 rounded-xl font-medium hover:bg-[var(--hive-brand-primary)]/20 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </motion.button>
                )}
              </div>

              {/* Posts */}
              <div className="space-y-4">
                <AnimatePresence>
                  {posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl border border-[var(--hive-border-primary)]/20 rounded-2xl p-6"
                    >
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center">
                            <span className="text-sm font-bold text-[var(--hive-text-primary)]">
                              {post.author.name.charAt(0)}
                            </span>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[var(--hive-text-primary)]">
                                {post.author.name}
                              </span>
                              {post.author.role === 'leader' && (
                                <Crown className="w-3 h-3 text-[var(--hive-brand-secondary)]" />
                              )}
                            </div>
                            <span className="text-xs text-[var(--hive-text-muted)]">
                              {formatTimeAgo(post.timestamp)}
                            </span>
                          </div>
                        </div>

                        <button className="text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors duration-200">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <p className="text-[var(--hive-text-primary)] leading-relaxed">
                          {post.content}
                        </p>
                        
                        {/* Event Preview */}
                        {post.type === 'event' && (
                          <div className="mt-3 p-3 bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/20 rounded-xl">
                            <div className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">Event</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Reactions */}
                      {post.reactions && post.reactions.length > 0 && (
                        <div className="flex items-center gap-2 pt-3 border-t border-[var(--hive-border-primary)]/10">
                          {post.reactions.map((reaction, idx) => (
                            <button
                              key={idx}
                              onClick={() => onPostReaction?.(post.id, reaction.emoji)}
                              className={cn(
                                'px-3 py-1 rounded-full text-sm transition-all duration-200',
                                reaction.userReacted
                                  ? 'bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30'
                                  : 'bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20 hover:bg-[var(--hive-background-tertiary)]/60'
                              )}
                            >
                              {reaction.emoji} {reaction.count}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {posts.length === 0 && (
                  <div className="text-center py-12 text-[var(--hive-text-muted)]">
                    <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No activity yet. Be the first to post!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Tool Grid - 40% width (2/5 columns) */}
          {showToolGrid && variant === 'default' && (
            <div className="col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Tool Grid Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">Tools</h2>
                  
                  {isLeader && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onPlantTool}
                      className="px-4 py-2 bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30 rounded-xl font-medium hover:bg-[var(--hive-brand-primary)]/20 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Plant Tool
                    </motion.button>
                  )}
                </div>

                {/* Planted Tools */}
                <div className="space-y-4">
                  {plantedTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      className="bg-[var(--hive-background-secondary)]/60 backdrop-blur-xl border border-[var(--hive-border-primary)]/20 rounded-2xl p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center">
                            <span className="text-lg">{tool.icon}</span>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-[var(--hive-text-primary)]">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-[var(--hive-text-secondary)]">
                              {tool.description}
                            </p>
                          </div>
                        </div>

                        {isLeader && (
                          <button
                            onClick={() => onConfigureTool?.(tool.id)}
                            className="text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors duration-200"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Tool Status */}
                      <div className="flex items-center justify-between">
                        <div className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          tool.status === 'active' && 'bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)]',
                          tool.status === 'configured' && 'bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)]',
                          tool.status === 'needs_setup' && 'bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)]'
                        )}>
                          {tool.status.replace('_', ' ')}
                        </div>

                        {tool.outputs && tool.outputs > 0 && (
                          <span className="text-xs text-[var(--hive-text-muted)]">
                            {tool.outputs} posts
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {plantedTools.length === 0 && (
                    <div className="text-center py-8 text-[var(--hive-text-muted)]">
                      <Hash className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No tools planted yet</p>
                      {isLeader && (
                        <p className="text-xs mt-1">Plant tools to add functionality</p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default SpaceDashboard;