'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button-enhanced';
import { Avatar, AvatarImage, AvatarFallback } from '../atoms/avatar';

// HIVE Resource Sharing Card Molecule - Campus Utility Component
// Designed for students to share and exchange academic resources

export interface SharedResource {
  id: string;
  title: string;
  type: 'textbook' | 'notes' | 'study-guide' | 'assignment' | 'lab' | 'project' | 'other';
  description: string;
  course: string;
  professor?: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  price?: number; // null for free resources
  availability: 'available' | 'reserved' | 'unavailable';
  image?: string;
  tags: string[];
  owner: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    verified: boolean;
  };
  location: string; // pickup location or delivery method
  postedDate: Date;
  expiresDate?: Date;
  contactMethod: 'message' | 'email' | 'phone';
  views: number;
  favorites: number;
  isFavorited?: boolean;
}

export interface ResourceSharingCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'resource'> {
  resource: SharedResource;
  compact?: boolean;
  showOwnerInfo?: boolean;
  onContact?: (resourceId: string) => void;
  onFavorite?: (resourceId: string) => void;
  onShare?: (resourceId: string) => void;
  onReport?: (resourceId: string) => void;
  currentUserId?: string;
}

const ResourceSharingCard = React.forwardRef<HTMLDivElement, ResourceSharingCardProps>(
  ({
    resource,
    compact = false,
    showOwnerInfo = true,
    onContact,
    onFavorite,
    onShare,
    onReport,
    currentUserId,
    className,
    ...props
  }, ref) => {
    const isOwner = currentUserId === resource.owner.id;
    const isAvailable = resource.availability === 'available';
    const isFree = resource.price === null || resource.price === 0;
    const daysAgo = Math.floor((Date.now() - resource.postedDate.getTime()) / (1000 * 60 * 60 * 24));

    const getTypeIcon = (type: SharedResource['type']) => {
      const icons = {
        textbook: '📚',
        notes: '📝',
        'study-guide': '📖',
        assignment: '📋',
        lab: '🔬',
        project: '💻',
        other: '📄'
      };
      return icons[type] || icons.other;
    };

    const getConditionColor = (condition: SharedResource['condition']) => {
      switch (condition) {
        case 'new':
        case 'like-new':
          return 'text-[var(--hive-status-success)]';
        case 'good':
          return 'text-[var(--hive-brand-primary)]';
        case 'fair':
          return 'text-[var(--hive-status-warning)]';
        case 'poor':
          return 'text-[var(--hive-status-error)]';
        default:
          return 'text-[var(--hive-text-secondary)]';
      }
    };

    const getAvailabilityBadge = () => {
      switch (resource.availability) {
        case 'available':
          return <Badge variant="success" size="sm">Available</Badge>;
        case 'reserved':
          return <Badge variant="warning" size="sm">Reserved</Badge>;
        case 'unavailable':
          return <Badge variant="error" size="sm">Unavailable</Badge>;
        default:
          return null;
      }
    };

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn(
            'border border-[var(--hive-border-primary)] rounded-lg p-3 bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors cursor-pointer',
            !isAvailable && 'opacity-60',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3">
            <div className="text-lg">{getTypeIcon(resource.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-[var(--hive-text-primary)] truncate text-sm">
                  {resource.title}
                </h4>
                {getAvailabilityBadge()}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--hive-text-secondary)]">
                <span>{resource.course}</span>
                <span>•</span>
                <span className={getConditionColor(resource.condition)}>
                  {resource.condition}
                </span>
                <span>•</span>
                <span className="font-medium text-[var(--hive-brand-primary)]">
                  {isFree ? 'Free' : `$${resource.price}`}
                </span>
              </div>
            </div>
            <Button size="sm" disabled={!isAvailable || isOwner} onClick={() => onContact?.(resource.id)}>
              Contact
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'border border-[var(--hive-border-primary)] rounded-xl bg-[var(--hive-background-secondary)] overflow-hidden transition-all duration-200 hover:shadow-md',
          !isAvailable && 'opacity-75',
          className
        )}
        {...props}
      >
        {/* Resource Image */}
        {resource.image && (
          <div className="aspect-video bg-[var(--hive-background-tertiary)] relative overflow-hidden">
            <img 
              src={resource.image} 
              alt={resource.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              {getAvailabilityBadge()}
            </div>
            <div className="absolute top-2 left-2">
              <Badge size="sm" variant="secondary">
                {getTypeIcon(resource.type)} {resource.type}
              </Badge>
            </div>
          </div>
        )}

        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--hive-text-primary)] line-clamp-2">
                  {resource.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge size="sm" variant="secondary">
                    {resource.course}
                  </Badge>
                  {resource.professor && (
                    <span className="text-xs text-[var(--hive-text-secondary)]">
                      Prof. {resource.professor}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[var(--hive-brand-primary)]">
                  {isFree ? 'FREE' : `$${resource.price}`}
                </div>
                <div className={cn('text-xs font-medium', getConditionColor(resource.condition))}>
                  {resource.condition}
                </div>
              </div>
            </div>

            <p className="text-sm text-[var(--hive-text-secondary)] line-clamp-2">
              {resource.description}
            </p>
          </div>

          {/* Tags */}
          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {resource.tags.slice(0, 3).map(tag => (
                <Badge key={tag} size="sm" variant="secondary">
                  {tag}
                </Badge>
              ))}
              {resource.tags.length > 3 && (
                <Badge size="sm" variant="secondary">
                  +{resource.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Owner Info */}
          {showOwnerInfo && (
            <div className="flex items-center justify-between pt-2 border-t border-[var(--hive-border-subtle)]">
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage src={resource.owner.avatar} alt={resource.owner.name} />
                  <AvatarFallback>
                    {resource.owner.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                      {resource.owner.name}
                    </span>
                    {resource.owner.verified && (
                      <span className="text-[var(--hive-brand-primary)]" title="Verified student">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[var(--hive-text-secondary)]">
                    <span>★ {resource.owner.rating.toFixed(1)}</span>
                    <span>•</span>
                    <span>{daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-[var(--hive-text-tertiary)]">
                📍 {resource.location}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 text-xs text-[var(--hive-text-secondary)]">
              <span>👁 {resource.views}</span>
              <button 
                onClick={() => onFavorite?.(resource.id)}
                className={cn(
                  'flex items-center gap-1 hover:text-[var(--hive-brand-primary)] transition-colors',
                  resource.isFavorited && 'text-[var(--hive-status-error)]'
                )}
              >
                {resource.isFavorited ? '❤️' : '🤍'} {resource.favorites}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {!isOwner && (
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onShare?.(resource.id)}
                  aria-label="Share resource"
                >
                  Share
                </Button>
              )}
              <Button 
                size="sm" 
                disabled={!isAvailable || isOwner}
                onClick={() => onContact?.(resource.id)}
              >
                {isOwner ? 'Your Item' : 'Contact'}
              </Button>
            </div>
          </div>

          {/* Expiry Warning */}
          {resource.expiresDate && (
            <div className="text-xs text-[var(--hive-status-warning)] bg-[var(--hive-overlay-orange-subtle)] px-2 py-1 rounded">
              Expires {resource.expiresDate.toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    );
  }
);
ResourceSharingCard.displayName = 'ResourceSharingCard';

// Resource Grid Component for displaying multiple cards
export interface ResourceGridProps extends React.HTMLAttributes<HTMLDivElement> {
  resources: SharedResource[];
  compact?: boolean;
  columns?: 1 | 2 | 3 | 4;
  showOwnerInfo?: boolean;
  onContact?: (resourceId: string) => void;
  onFavorite?: (resourceId: string) => void;
  onShare?: (resourceId: string) => void;
  currentUserId?: string;
  loading?: boolean;
  emptyMessage?: string;
}

const ResourceGrid = React.forwardRef<HTMLDivElement, ResourceGridProps>(
  ({
    resources,
    compact = false,
    columns = 3,
    showOwnerInfo = true,
    onContact,
    onFavorite,
    onShare,
    currentUserId,
    loading = false,
    emptyMessage = "No resources found",
    className,
    ...props
  }, ref) => {
    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    };

    if (loading) {
      return (
        <div className={cn('grid gap-4', gridCols[columns], className)} ref={ref} {...props}>
          {Array.from({ length: columns * 2 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-[var(--hive-background-tertiary)] aspect-video rounded-t-xl" />
              <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-b-xl p-4 space-y-3">
                <div className="h-4 bg-[var(--hive-background-tertiary)] rounded w-3/4" />
                <div className="h-3 bg-[var(--hive-background-tertiary)] rounded w-1/2" />
                <div className="h-8 bg-[var(--hive-background-tertiary)] rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (resources.length === 0) {
      return (
        <div className="text-center py-12 text-[var(--hive-text-secondary)]">
          {emptyMessage}
        </div>
      );
    }

    return (
      <div 
        className={cn('grid gap-4', gridCols[columns], className)} 
        ref={ref} 
        {...props}
      >
        {resources.map(resource => (
          <ResourceSharingCard
            key={resource.id}
            resource={resource}
            compact={compact}
            showOwnerInfo={showOwnerInfo}
            onContact={onContact}
            onFavorite={onFavorite}
            onShare={onShare}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    );
  }
);
ResourceGrid.displayName = 'ResourceGrid';

export { ResourceSharingCard, ResourceGrid };

