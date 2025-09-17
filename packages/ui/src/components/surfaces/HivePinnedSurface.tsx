"use client";

import React, { useState, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { Card as HiveCard, CardHeader as HiveCardHeader, CardTitle as HiveCardTitle, CardContent as HiveCardContent } from '../../atomic/ui/card';
import { Button as HiveButton } from '../../atomic/atoms/button-enhanced';
import { HiveBadge } from '../hive-badge';
import { 
  Pin,
  Link,
  FileText,
  AlertCircle,
  Calendar,
  Download,
  ExternalLink,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  Info,
  ChevronRight,
  File,
  Image
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useFirebaseRealtime, useOptimisticUpdates } from '../../hooks/use-live-updates';

// Types
interface PinnedItem {
  id: string;
  type: 'announcement' | 'resource' | 'link' | 'document' | 'alert';
  title: string;
  description?: string;
  content?: string;
  url?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  imageUrl?: string;
  priority: 'high' | 'medium' | 'low';
  authorId: string;
  authorName: string;
  pinnedAt: Date;
  expiresAt?: Date;
  tags?: string[];
}

export interface HivePinnedSurfaceProps {
  spaceId: string;
  spaceName?: string;
  isLeader?: boolean;
  currentUserId?: string;
  className?: string;
  variant?: 'widget' | 'full' | 'compact';
  pinnedItems?: PinnedItem[];
  loading?: boolean;
  error?: Error | null;
  onPinItem?: () => void;
  onUnpinItem?: (itemId: string) => Promise<void>;
  onEditItem?: (itemId: string) => void;
}

// Pinned Item Card Component
const PinnedItemCard: React.FC<{
  item: PinnedItem;
  isLeader: boolean;
  variant?: 'widget' | 'full' | 'compact';
  onEdit?: () => void;
  onUnpin?: () => void;
  onView?: () => void;
}> = ({ item, isLeader, variant = 'widget', onEdit, onUnpin, onView }) => {
  const [showActions, setShowActions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const typeConfig = {
    announcement: {
      icon: AlertCircle,
      color: 'text-blue-600 bg-blue-50',
      label: 'Announcement'
    },
    resource: {
      icon: FileText,
      color: 'text-green-600 bg-green-50',
      label: 'Resource'
    },
    link: {
      icon: Link,
      color: 'text-purple-600 bg-purple-50',
      label: 'Link'
    },
    document: {
      icon: File,
      color: 'text-gray-600 bg-gray-50',
      label: 'Document'
    },
    alert: {
      icon: Info,
      color: 'text-red-600 bg-red-50',
      label: 'Alert'
    }
  };

  const priorityColors = {
    high: 'border-l-4 border-l-red-500',
    medium: 'border-l-4 border-l-yellow-500',
    low: 'border-l-4 border-l-gray-300'
  };

  const config = typeConfig[item.type];
  const TypeIcon = config.icon;

  return (
    <div className={cn(
      "bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all",
      priorityColors[item.priority],
      variant === 'compact' && "p-3",
      variant !== 'compact' && "p-4"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className={cn(
          "p-2 rounded-lg shrink-0",
          config.color
        )}>
          <TypeIcon className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 line-clamp-1">
                {item.title}
              </h3>
              
              {item.description && (
                <p className={cn(
                  "text-sm text-gray-600 mt-1",
                  !isExpanded && "line-clamp-2"
                )}>
                  {item.description}
                </p>
              )}

              {item.content && isExpanded && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {item.content}
                  </p>
                </div>
              )}

              {/* File attachment */}
              {item.fileUrl && (
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  {item.fileName || 'Download'}
                  {item.fileSize && (
                    <span className="text-xs text-gray-500">({item.fileSize})</span>
                  )}
                </a>
              )}

              {/* External link */}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-3 w-3" />
                  View link
                </a>
              )}

              {/* Image */}
              {item.imageUrl && isExpanded && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="mt-3 rounded-lg w-full max-h-64 object-cover"
                />
              )}

              {/* Tags */}
              {item.tags && item.tags.length > 0 && variant === 'full' && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Metadata */}
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span>Pinned by {item.authorName}</span>
                <span>•</span>
                <span>{formatDistanceToNow(item.pinnedAt, { addSuffix: true })}</span>
                {item.expiresAt && (
                  <>
                    <span>•</span>
                    <span className="text-orange-600">
                      Expires {formatDistanceToNow(item.expiresAt, { addSuffix: true })}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="relative shrink-0">
              {(item.content || item.imageUrl) && !isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 mr-1"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
              
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {showActions && (
                <div className="absolute right-0 top-6 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  {isExpanded && (
                    <button
                      onClick={() => {
                        setIsExpanded(false);
                        setShowActions(false);
                      }}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Collapse
                    </button>
                  )}
                  
                  {isLeader && (
                    <>
                      <button
                        onClick={() => {
                          onEdit?.();
                          setShowActions(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit item
                      </button>
                      <button
                        onClick={() => {
                          onUnpin?.();
                          setShowActions(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Unpin item
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Surface Component
export const HivePinnedSurface: React.FC<HivePinnedSurfaceProps> = ({
  spaceId,
  spaceName,
  isLeader = false,
  currentUserId,
  className,
  variant = 'widget',
  pinnedItems: propItems,
  loading = false,
  error = null,
  onPinItem,
  onUnpinItem,
  onEditItem,
}) => {
  // No mock data - use real pinned items only
  const emptyPinnedItems: PinnedItem[] = [];
  
  /* Removed mock data
  const mockPinnedItems: PinnedItem[] = useMemo(() => [
    {
      id: '1',
      type: 'alert',
      title: 'Important: Space Guidelines Updated',
      description: 'We\'ve updated our community guidelines to better reflect our values and ensure a positive environment for everyone.',
      content: 'Please review the following changes:\n\n1. Respectful communication is mandatory\n2. No spam or self-promotion without approval\n3. Share resources that benefit the community\n4. Report any issues to space leaders immediately',
      priority: 'high',
      authorId: '1',
      authorName: 'Sarah Chen',
      pinnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      tags: ['guidelines', 'important']
    },
    {
      id: '2',
      type: 'resource',
      title: 'Project Resources & Templates',
      description: 'Collection of useful templates and resources for our projects.',
      fileUrl: '#',
      fileName: 'project-templates.zip',
      fileSize: '2.4 MB',
      priority: 'medium',
      authorId: '2',
      authorName: 'Marcus Johnson',
      pinnedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
      tags: ['resources', 'templates']
    },
    {
      id: '3',
      type: 'link',
      title: 'Team Collaboration Board',
      description: 'Our shared Notion workspace for project planning and collaboration.',
      url: 'https://notion.so/workspace',
      priority: 'medium',
      authorId: '3',
      authorName: 'Emily Rodriguez',
      pinnedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
      tags: ['collaboration', 'planning']
    },
    {
      id: '4',
      type: 'announcement',
      title: 'Welcome New Members!',
      description: 'A warm welcome to everyone who joined this week. Feel free to introduce yourself in the feed!',
      priority: 'low',
      authorId: '1',
      authorName: 'Sarah Chen',
      pinnedAt: new Date(Date.now() - 1000 * 60 * 60 * 96),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      tags: ['welcome']
    }
  ], []);
  */

  // Real-time pinned items data
  const { data: realtimePinnedItems, loading: realtimeLoading, error: realtimeError } = useFirebaseRealtime<PinnedItem>(
    'pinned',
    [{ field: 'spaceId', operator: '==', value: spaceId }],
    'pinnedAt',
    10,
    [spaceId]
  );
  const { data: optimisticPinnedItems } = useOptimisticUpdates<PinnedItem>(propItems || realtimePinnedItems || []);
  
  // Use optimistic pinned items for immediate UI updates
  const pinnedItems = optimisticPinnedItems || emptyPinnedItems;
  const isLoading = loading || realtimeLoading;
  const displayError = error || realtimeError;

  // Sort by priority then by date
  const sortedItems = useMemo(() => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...pinnedItems].sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.pinnedAt.getTime() - a.pinnedAt.getTime();
    });
  }, [pinnedItems]);

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-16 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (displayError) {
    return (
      <HiveCard className={cn("p-6", className)}>
        <div className="text-center space-y-2">
          <p className="text-gray-600">Unable to load pinned items</p>
          <p className="text-sm text-gray-500">{displayError.message}</p>
        </div>
      </HiveCard>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pin className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            {variant === 'full' && spaceName ? `${spaceName} Pinned` : 'Pinned'}
          </h2>
          <HiveBadge variant="secondary" className="text-xs">
            {sortedItems.length}
          </HiveBadge>
        </div>

        {isLeader && (
          <HiveButton
            variant="ghost"
            size="sm"
            onClick={onPinItem}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Pin Item
          </HiveButton>
        )}
      </div>

      {/* Pinned Items */}
      <div className="space-y-3">
        {sortedItems.length === 0 ? (
          <HiveCard className="p-8">
            <div className="text-center space-y-2">
              <Pin className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="text-gray-600">No pinned items</p>
              <p className="text-sm text-gray-500">
                {isLeader 
                  ? "Pin important announcements, resources, or links for your space" 
                  : "Important information will appear here"}
              </p>
            </div>
          </HiveCard>
        ) : (
          sortedItems
            .slice(0, variant === 'widget' ? 3 : undefined)
            .map((item) => (
              <PinnedItemCard
                key={item.id}
                item={item}
                isLeader={isLeader}
                variant={variant}
                onEdit={() => onEditItem?.(item.id)}
                onUnpin={() => onUnpinItem?.(item.id)}
                onView={() => {}}
              />
            ))
        )}
      </div>

      {/* View More for widget variant */}
      {variant === 'widget' && sortedItems.length > 3 && (
        <button className="w-full py-2 text-sm text-orange-600 hover:text-orange-700 font-medium">
          View all {sortedItems.length} pinned items →
        </button>
      )}
    </div>
  );
};

// Export display name for debugging
HivePinnedSurface.displayName = 'HivePinnedSurface';