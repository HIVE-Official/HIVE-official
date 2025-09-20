"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system';
import { type Space } from '@hive/core';
import { 
  Pin,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  MessageSquare,
  Link as LinkIcon,
  Image as ImageIcon,
  FileText,
  Video,
  Bookmark,
  AlertCircle,
  Crown,
  Sparkles,
  ArrowRight
} from 'lucide-react';

// HIVE Pinned Surface - Core Information & Welcome Content
// First impression and essential Space information display

const hivePinnedSurfaceVariants = cva(
  "relative w-full",
  {
    variants: {
      mode: {
        view: "",
        edit: "ring-2 ring-yellow-500/30 ring-offset-2 ring-offset-black/20",
        builder: "ring-2 ring-yellow-500/30 ring-offset-2 ring-offset-black/20",
      }
    },
    defaultVariants: {
      mode: "view",
    },
  }
);

// Pinned content types with HIVE design patterns
const pinnedContentTypes = {
  welcome: {
    icon: Star,
    label: 'Welcome Message',
    color: 'text-yellow-400',
    description: 'Space introduction and guidelines'
  },
  announcement: {
    icon: AlertCircle,
    label: 'Announcement',
    color: 'text-orange-400',
    description: 'Important updates and news'
  },
  link: {
    icon: LinkIcon,
    label: 'Quick Link',
    color: 'text-blue-400',
    description: 'External resources and websites'
  },
  event: {
    icon: Calendar,
    label: 'Featured Event',
    color: 'text-green-400',
    description: 'Upcoming important events'
  },
  image: {
    icon: ImageIcon,
    label: 'Image',
    color: 'text-purple-400',
    description: 'Visual content and media'
  },
  document: {
    icon: FileText,
    label: 'Document',
    color: 'text-gray-400',
    description: 'Important files and resources'
  },
} as const;

export interface PinnedContent {
  id: string;
  type: keyof typeof pinnedContentTypes;
  title: string;
  content?: string;
  url?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  priority: 'high' | 'medium' | 'low';
  expiresAt?: Date;
}

export interface HivePinnedSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hivePinnedSurfaceVariants> {
  space: Space;
  pinnedContent?: PinnedContent[];
  isBuilder?: boolean;
  canEdit?: boolean;
  onAddContent?: (type: keyof typeof pinnedContentTypes) => void;
  onEditContent?: (content: PinnedContent) => void;
  onDeleteContent?: (contentId: string) => void;
  onReorderContent?: (contentIds: string[]) => void;
  showWelcomePrompt?: boolean;
  maxItems?: number;
}

export const HivePinnedSurface = React.forwardRef<HTMLDivElement, HivePinnedSurfaceProps>(
  ({ 
    className,
    mode,
    space,
    pinnedContent = [],
    isBuilder = false,
    canEdit = false,
    onAddContent,
    onEditContent,
    onDeleteContent,
    onReorderContent,
    showWelcomePrompt = true,
    maxItems = 6,
    ...props 
  }, ref) => {
    
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [showAddMenu, setShowAddMenu] = useState(false);
    
    // Sort pinned content by priority and date
    const sortedContent = pinnedContent
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      })
      .slice(0, maxItems);
    
    const handleAddContent = useCallback((type: keyof typeof pinnedContentTypes) => {
      onAddContent?.(type);
      setShowAddMenu(false);
    }, [onAddContent]);
    
    // Empty state for new Spaces
    if (pinnedContent.length === 0 && showWelcomePrompt) {
      return (
        <div
          ref={ref}
          className={cn(hivePinnedSurfaceVariants({ mode, className }))}
          {...props}
        >
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-6 bg-yellow-500/20 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: motionDurations.quick }}
            >
              <Pin className="w-8 h-8 text-yellow-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">Welcome to {space.name}</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              {space.description || "This Space is ready for content! Pin important announcements, links, and resources to help members get started."}
            </p>
            
            {isBuilder && canEdit && (
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-200 font-medium"
                onClick={() => setShowAddMenu(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                Add First Pin
              </motion.button>
            )}
          </motion.div>
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(hivePinnedSurfaceVariants({ mode, className }))}
        {...props}
      >
        {/* Content Grid */}
        <div className="space-y-4">
          {sortedContent.map((content, index) => {
            const typeConfig = pinnedContentTypes[content.type];
            const TypeIcon = typeConfig.icon;
            const isHovered = hoveredItem === content.id;
            
            return (
              <motion.article
                key={content.id}
                className={cn(
                  "relative group bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl p-4 transition-all duration-200",
                  isHovered && "border-white/10",
                  content.priority === 'high' && "ring-1 ring-yellow-500/20",
                  mode === 'edit' && "hover:ring-2 hover:ring-yellow-500/30"
                )}
                onMouseEnter={() => setHoveredItem(content.id)}
                onMouseLeave={() => setHoveredItem(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                {/* Priority Indicator */}
                {content.priority === 'high' && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  />
                )}
                
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                      content.priority === 'high' ? "bg-yellow-500/20" : "bg-[var(--hive-text-primary)]/5"
                    )}>
                      <TypeIcon className={cn("w-5 h-5", typeConfig.color)} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[var(--hive-text-primary)] text-sm truncate">
                        {content.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                        <span>{typeConfig.label}</span>
                        <span>•</span>
                        <time>{new Date(content.updatedAt).toLocaleDateString()}</time>
                        {content.expiresAt && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1 text-orange-400">
                              <Clock className="w-3 h-3" />
                              <span>Expires</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <AnimatePresence>
                    {(isHovered || mode === 'edit') && canEdit && (
                      <motion.div
                        className="flex items-center gap-1 ml-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: motionDurations.quick }}
                      >
                        <motion.button
                          className="p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                          onClick={() => onEditContent?.(content)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </motion.button>
                        <motion.button
                          className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200"
                          onClick={() => onDeleteContent?.(content.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  {/* Text Content */}
                  {content.content && (
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                      {content.content}
                    </p>
                  )}
                  
                  {/* Image Content */}
                  {content.imageUrl && (
                    <motion.div
                      className="relative rounded-lg overflow-hidden bg-gray-800/50"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: motionDurations.quick }}
                    >
                      <img
                        src={content.imageUrl}
                        alt=""
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>
                  )}
                  
                  {/* Link Preview */}
                  {content.url && (
                    <motion.a
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 bg-[var(--hive-text-primary)]/5 rounded-lg text-sm text-blue-400 hover:bg-[var(--hive-text-primary)]/10 transition-all duration-200 group"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{content.url}</span>
                      <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
        
        {/* Add Content Button */}
        {canEdit && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <motion.button
                className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:border-white/20 hover:text-[var(--hive-text-primary)] transition-all duration-200"
                onClick={() => setShowAddMenu(!showAddMenu)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Pin Content</span>
              </motion.button>
              
              {/* Add Menu */}
              <AnimatePresence>
                {showAddMenu && (
                  <motion.div
                    className="absolute top-full left-0 right-0 mt-2 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: motionDurations.quick }}
                  >
                    <div className="p-2">
                      {Object.entries(pinnedContentTypes).map(([type, config]) => {
                        const Icon = config.icon;
                        return (
                          <motion.button
                            key={type}
                            className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                            onClick={() => handleAddContent(type as keyof typeof pinnedContentTypes)}
                            whileHover={{ x: 4 }}
                          >
                            <Icon className={cn("w-5 h-5", config.color)} />
                            <div>
                              <div className="text-sm font-medium text-[var(--hive-text-primary)]">{config.label}</div>
                              <div className="text-xs text-gray-400">{config.description}</div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
        
        {/* Builder Hint */}
        {isBuilder && mode === 'edit' && (
          <motion.div
            className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-1">Builder Mode Active</h4>
                <p className="text-xs text-yellow-300/80">
                  Pin essential content that welcomes new members and provides quick access to important resources.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

HivePinnedSurface.displayName = "HivePinnedSurface";

export { hivePinnedSurfaceVariants, pinnedContentTypes };