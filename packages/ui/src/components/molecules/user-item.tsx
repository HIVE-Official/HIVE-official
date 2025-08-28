'use client';

import * as React from "react";
import { cn } from "../lib/utils";
import { Avatar } from "../ui/avatar";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

// HIVE Level 2 Molecule: User Item
// Components: Avatar + Name + Role/Year + Status Indicator + Action Button
// Context: Member lists, user search results, mention suggestions
// States: Online, Offline, Ghost Mode, Blocked

export interface UserItemProps {
  user: {
    id: string;
    name: string;
    handle?: string;
    avatar?: string;
    role?: string;
    year?: string;
    isOnline?: boolean;
    isGhostMode?: boolean;
    isBlocked?: boolean;
    isBuilder?: boolean;
  };
  variant?: 'default' | 'compact' | 'detailed';
  showStatus?: boolean;
  actionButton?: {
    label: string;
    onClick: (user: any) => void;
    variant?: 'primary' | 'secondary' | 'destructive';
    loading?: boolean;
  };
  onUserClick?: (user: any) => void;
  className?: string;
  disabled?: boolean;
}

export const UserItem = React.forwardRef<HTMLDivElement, UserItemProps>(
  ({
    user,
    variant = 'default',
    showStatus = true,
    actionButton,
    onUserClick,
    className,
    disabled = false,
    ...props
  }, ref) => {
    
    const handleUserClick = () => {
      if (!disabled && onUserClick) {
        onUserClick(user);
      }
    };
    
    const handleActionClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (actionButton && !actionButton.loading) {
        actionButton.onClick(user);
      }
    };
    
    // Generate avatar fallback from name
    const avatarFallback = user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    const isInteractive = onUserClick && !disabled;
    
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg transition-colors",
          isInteractive && "cursor-pointer hover:bg-white/5 focus:bg-white/10 focus:outline-none",
          disabled && "opacity-50 cursor-not-allowed",
          user.isBlocked && "opacity-60",
          className
        )}
        onClick={handleUserClick}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={isInteractive ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleUserClick();
          }
        } : undefined}
        {...props}
      >
        {/* Avatar with Status Indicator */}
        <div className="relative shrink-0">
          <Avatar 
            size={variant === 'compact' ? 'sm' : 'md'}
            className={cn(
              user.isGhostMode && "opacity-60",
              user.isBlocked && "grayscale"
            )}
          >
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#2C2C2E] text-white/70 text-sm font-medium">
                {avatarFallback}
              </div>
            )}
          </Avatar>
          
          {/* Online Status Indicator */}
          {showStatus && user.isOnline && !user.isGhostMode && !user.isBlocked && (
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-black bg-[#34D399]" />
          )}
          
          {/* Ghost Mode Indicator */}
          {showStatus && user.isGhostMode && (
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-black bg-white/30" />
          )}
        </div>
        
        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {/* Name */}
            <Typography 
              size={variant === 'compact' ? 'small' : 'regular'}
              weight="medium"
              className={cn(
                "truncate",
                user.isBlocked && "line-through"
              )}
            >
              {user.name}
            </Typography>
            
            {/* Builder Badge */}
            {user.isBuilder && (
              <Badge variant="secondary" className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20">
                Builder
              </Badge>
            )}
            
            {/* Ghost Mode Badge */}
            {user.isGhostMode && (
              <Badge variant="secondary" className="bg-white/10 text-white/60">
                Ghost
              </Badge>
            )}
          </div>
          
          {/* Handle and Role/Year */}
          {variant !== 'compact' && (
            <div className="flex items-center gap-2 mt-1">
              {user.handle && (
                <Typography size="small" color="medium" className="truncate">
                  @{user.handle}
                </Typography>
              )}
              
              {user.role && (
                <>
                  {user.handle && (
                    <span className="text-white/30">•</span>
                  )}
                  <Typography size="small" color="medium" className="truncate">
                    {user.role}
                  </Typography>
                </>
              )}
              
              {user.year && (
                <>
                  {(user.handle || user.role) && (
                    <span className="text-white/30">•</span>
                  )}
                  <Typography size="small" color="medium" className="truncate">
                    Class of {user.year}
                  </Typography>
                </>
              )}
            </div>
          )}
          
          {/* Blocked State Message */}
          {user.isBlocked && variant === 'detailed' && (
            <Typography size="small" color="error" className="mt-1">
              This user is blocked
            </Typography>
          )}
        </div>
        
        {/* Action Button */}
        {actionButton && !user.isBlocked && (
          <Button
            variant={actionButton.variant || 'secondary'}
            size="small"
            loading={actionButton.loading}
            onClick={handleActionClick}
            className="shrink-0"
          >
            {actionButton.label}
          </Button>
        )}
        
        {/* Status Text for Compact Variant */}
        {variant === 'compact' && showStatus && (
          <div className="shrink-0">
            {user.isOnline && !user.isGhostMode && (
              <div className="h-2 w-2 rounded-full bg-[#34D399]" />
            )}
            {user.isGhostMode && (
              <div className="h-2 w-2 rounded-full bg-white/30" />
            )}
            {!user.isOnline && !user.isGhostMode && (
              <div className="h-2 w-2 rounded-full bg-white/20" />
            )}
          </div>
        )}
      </div>
    );
  }
);

UserItem.displayName = "UserItem";

// User Item Presets for common use cases
export const UserItemPresets = {
  // Member List Item
  MemberListItem: (props: Omit<UserItemProps, 'variant'>) => (
    <UserItem variant="primary" showStatus={true} {...props} />
  ),
  
  // Search Result Item
  SearchResultItem: (props: Omit<UserItemProps, 'variant'>) => (
    <UserItem variant="detailed" showStatus={false} {...props} />
  ),
  
  // Compact List Item (for mobile or condensed lists)
  CompactListItem: (props: Omit<UserItemProps, 'variant'>) => (
    <UserItem variant="compact" showStatus={true} {...props} />
  ),
  
  // Mention Suggestion Item
  MentionItem: (props: Omit<UserItemProps, 'variant' | 'showStatus'>) => (
    <UserItem variant="primary" showStatus={false} {...props} />
  ),
};

export { UserItem as UserItemMolecule };