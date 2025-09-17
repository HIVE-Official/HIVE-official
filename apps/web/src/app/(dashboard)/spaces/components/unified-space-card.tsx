"use client";

import { Button, Card, useUnifiedAuth } from "@hive/ui";
import { Users, Star, MapPin, ArrowRight, Heart, Activity, Crown, Shield } from "lucide-react";
import type { Space  } from '@/types/core';
import { useRouter } from "next/navigation";
import { useState } from "react";

// Temporary stubs until ExpandFocus and SpaceDetailsWidget are exported from @hive/ui
function ExpandFocus({ children, /* isExpanded, */ onExpand, /* onCollapse, expandFrom, focusContent */ }: any) { // TODO: Temporary stub - unused params for future features
  return <div onClick={onExpand}>{children}</div>;
}

function SpaceDetailsWidget({ space, membershipRole, onJoin, onLeave, onMessage, onSettings }: any) {
  return (
    <div className="p-4 bg-hive-background-secondary rounded-lg">
      <h3 className="text-hive-text-primary font-semibold mb-2">{space.name}</h3>
      <p className="text-hive-text-secondary text-sm mb-4">{space.description}</p>
      <div className="flex gap-2">
        {!membershipRole && (
          <Button onClick={() => onJoin?.(space.id)} size="sm">Join</Button>
        )}
        {membershipRole && (
          <Button onClick={() => onLeave?.(space.id)} size="sm" variant="outline">Leave</Button>
        )}
        <Button onClick={() => onMessage?.(space.id)} size="sm" variant="outline">Message</Button>
        {(membershipRole === 'admin' || membershipRole === 'owner') && (
          <Button onClick={() => onSettings?.(space.id)} size="sm" variant="outline">Settings</Button>
        )}
      </div>
    </div>
  );
}

interface UnifiedSpaceCardProps {
  space: Space & {
    status?: string;
    potentialMembers?: number;
    awaitingLeader?: boolean;
    hasRequestedActivation?: boolean;
  };
  variant?: "grid" | "list" | "compact";
  showMembership?: boolean;
  membershipRole?: "member" | "admin" | "owner";
  onAction?: (_action: string) => void;
}

export function UnifiedSpaceCard({ 
  space, 
  variant = "grid", 
  showMembership = false,
  membershipRole = "member",
  onAction 
}: UnifiedSpaceCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const unifiedAuth = useUnifiedAuth();
  
  const handleCardClick = () => {
    setIsExpanded(true);
  };

  const handleJoinClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      // Get auth token from unified auth context
      const authToken = await unifiedAuth.getAuthToken();
      if (!authToken) {
        throw new Error('Authentication required to join spaces');
      }
      headers.Authorization = `Bearer ${authToken}`;

      const response = await fetch('/api/spaces/join', {
        method: 'POST',
        headers,
        body: JSON.stringify({ spaceId: space.id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Handle Greek life restriction with special UI
        if (response.status === 409 && errorData.error?.includes('Greek life organization')) {
          const shouldLeave = confirm(
            `${errorData.error}\n\nWould you like to leave your current Greek life organization to join this one?`
          );
          
          if (shouldLeave) {
            // For now, show instructions - in future we could implement direct leaving
            alert('To switch Greek life organizations, please go to your current organization\'s page and leave it first, then return here to join this one.');
          }
          return;
        }
        
        throw new Error(errorData.error || 'Failed to join space');
      }

      onAction?.('join');
      
      // Refresh the page to show updated state
      window.location.reload();
    } catch (error: any) {
      alert(error.message || 'Failed to join space');
    }
  };

  const getActionButton = () => {
    // Preview mode spaces waiting for leaders
    if (space.status === 'preview' && space.awaitingLeader) {
      if (space.hasRequestedActivation) {
        return { text: 'Request Pending', action: 'pending', disabled: true };
      }
      return { text: 'Request to Lead', action: 'request-lead', disabled: false };
    }
    
    if (space.status === 'dormant') {
      return { text: 'Preview', action: 'preview', disabled: false };
    }
    
    if (space.status === 'frozen') {
      return { text: 'View Only', action: 'view', disabled: true };
    }
    
    if (showMembership) {
      return { text: 'Open', action: 'open', disabled: false };
    }
    
    return { text: 'Join', action: 'join', disabled: false };
  };

  const getRoleBadge = () => {
    if (!showMembership) return null;
    
    if (membershipRole === "owner") {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-hive-gold/20 text-hive-gold rounded-full text-xs">
          <Crown className="h-3 w-3" />
          Owner
        </div>
      );
    }
    
    if (membershipRole === "admin") {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
          <Star className="h-3 w-3" />
          Admin
        </div>
      );
    }
    
    return null;
  };

  const getSpaceInitial = () => {
    return space.name.charAt(0).toUpperCase();
  };

  const isGreekLife = () => {
    return space.type === 'greek_life';
  };

  const getGreekLifeBadge = () => {
    if (!isGreekLife()) return null;
    
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] rounded-full text-xs">
        <Shield className="h-3 w-3" />
        1 Organization Limit
      </div>
    );
  };


  if (variant === "list") {
    return (
      <ExpandFocus
        isExpanded={isExpanded}
        onExpand={() => setIsExpanded(true)}
        onCollapse={() => setIsExpanded(false)}
        expandFrom="center"
        focusContent={
          <SpaceDetailsWidget
            space={space}
            membershipRole={showMembership ? membershipRole || null : null}
            onJoin={(_spaceId: string) => { // TODO: spaceId for future join action tracking
              onAction?.('join');
              setIsExpanded(false);
            }}
            onLeave={(_spaceId: string) => { // TODO: spaceId for future leave action tracking
              onAction?.('leave');
              setIsExpanded(false);
            }}
            onMessage={(spaceId: string) => {
              router.push(`/spaces/${spaceId}/chat`);
            }}
            onSettings={(spaceId: string) => {
              router.push(`/spaces/${spaceId}/settings`);
            }}
          />
        }
      >
        <Card 
          className="p-4 bg-hive-background-elevated/20 border-hive-border-subtle hover:bg-hive-background-elevated/40 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/50 focus:ring-offset-2 focus:ring-offset-hive-background-primary"
          onClick={handleCardClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`View ${space.name} space - ${space.description || 'No description'}`}
        >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-hive-brand-primary to-hive-interactive-hover rounded-lg flex items-center justify-center text-hive-background-primary font-semibold">
              {getSpaceInitial()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-[var(--hive-text-inverse)]">{space.name}</h3>
                {getRoleBadge()}
                {getGreekLifeBadge()}
              </div>
              <p className="text-sm text-[var(--hive-text-muted)] line-clamp-1 mb-2">{space.description}</p>
              <div className="flex items-center gap-4 text-xs text-[#71717A]">
                <span className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {space.status === 'preview' && space.potentialMembers ? (
                    <>{space.potentialMembers} potential members</>
                  ) : (
                    <>{space.memberCount || 0} members</>
                  )}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {space.type?.replace('_', ' ')}
                </span>
                {space.status === 'preview' && (
                  <span className="px-2 py-0.5 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] rounded-full text-xs">
                    Preview Mode
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button 
            size="sm"
            className={
              getActionButton().action === 'request-lead' 
                ? "bg-[var(--hive-gold)] text-[var(--hive-text-primary)] hover:bg-amber-600" 
                : "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255] disabled:opacity-50"
            }
            onClick={(e) => {
              e.stopPropagation();
              const action = getActionButton().action;
              if (action === 'join') {
                handleJoinClick(e);
              } else if (action === 'request-lead') {
                router.push(`/spaces/${space.id}/request-activation`);
              } else if (action === 'open') {
                router.push(`/spaces/${space.id}`);
              }
            }}
            disabled={getActionButton().disabled}
            aria-label={`${getActionButton().text} ${space.name} space`}
          >
            {getActionButton().text}
          </Button>
        </div>
      </Card>
      </ExpandFocus>
    );
  }

  if (variant === "compact") {
    return (
      <ExpandFocus
        isExpanded={isExpanded}
        onExpand={() => setIsExpanded(true)}
        onCollapse={() => setIsExpanded(false)}
        expandFrom="center"
        focusContent={
          <SpaceDetailsWidget
            space={space}
            membershipRole={showMembership ? membershipRole || null : null}
            onJoin={(_spaceId: string) => { // TODO: spaceId for future join action tracking
              onAction?.('join');
              setIsExpanded(false);
            }}
            onLeave={(_spaceId: string) => { // TODO: spaceId for future leave action tracking
              onAction?.('leave');
              setIsExpanded(false);
            }}
            onMessage={(spaceId: string) => {
              router.push(`/spaces/${spaceId}/chat`);
            }}
            onSettings={(spaceId: string) => {
              router.push(`/spaces/${spaceId}/settings`);
            }}
          />
        }
      >
        <Card 
          className="flex-shrink-0 w-64 p-4 bg-hive-background-elevated/20 border-hive-border-subtle hover:bg-hive-background-elevated/40 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/50 focus:ring-offset-2 focus:ring-offset-hive-background-primary"
          onClick={handleCardClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`View ${space.name} space - ${space.type?.replace('_', ' ')}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-hive-brand-primary to-hive-interactive-hover rounded-lg flex items-center justify-center text-hive-background-primary font-semibold text-sm">
              {getSpaceInitial()}
            </div>
            <div className="flex-1">
              <h4 className="text-hive-text-primary font-medium text-sm truncate">{space.name}</h4>
              <p className="text-xs text-hive-text-tertiary capitalize">{space.type?.replace('_', ' ')}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-hive-brand-primary group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="flex items-center text-xs text-hive-text-tertiary">
            <Activity className="h-3 w-3 mr-1 text-green-400" />
            Active now
          </div>
        </Card>
      </ExpandFocus>
    );
  }

  // Default: grid variant
  return (
    <ExpandFocus
      isExpanded={isExpanded}
      onExpand={() => setIsExpanded(true)}
      onCollapse={() => setIsExpanded(false)}
      expandFrom="center"
      focusContent={
        <SpaceDetailsWidget
          space={space}
          membershipRole={showMembership ? membershipRole || null : null}
          onJoin={(_spaceId: string) => {
            onAction?.('join');
            setIsExpanded(false);
          }}
          onLeave={(_spaceId: string) => {
            onAction?.('leave');
            setIsExpanded(false);
          }}
          onMessage={(spaceId: string) => {
            router.push(`/spaces/${spaceId}/chat`);
          }}
          onSettings={(spaceId: string) => {
            router.push(`/spaces/${spaceId}/settings`);
          }}
        />
      }
    >
      <Card 
        className="group p-6 bg-hive-background-elevated/20 border-hive-border-subtle hover:bg-hive-background-elevated/40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/50 focus:ring-offset-2 focus:ring-offset-hive-background-primary"
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        tabIndex={0}
      role="button"
      aria-label={`View ${space.name} space - ${space.description || 'No description'}`}
    >
      
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-hive-brand-primary to-hive-interactive-hover rounded-lg flex items-center justify-center text-hive-background-primary font-semibold">
          {getSpaceInitial()}
        </div>
        <div className="flex items-center gap-2">
          {getRoleBadge()}
          {getGreekLifeBadge()}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-hive-gold" />
            <span className="text-xs text-hive-text-tertiary">4.8</span>
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-hive-text-primary mb-2 group-hover:text-hive-brand-primary transition-colors">
        {space.name}
      </h3>
      
      <p className="text-sm text-hive-text-tertiary mb-4 line-clamp-2">
        {space.description || "No description available"}
      </p>

      <div className="flex items-center justify-between text-xs text-hive-text-tertiary mb-4">
        <span className="flex items-center">
          <Users className="h-3 w-3 mr-1" />
          {space.memberCount || 0} members
        </span>
        <span className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          {space.type?.replace('_', ' ')}
        </span>
      </div>


      <div className="flex gap-2">
        <Button 
          size="sm"
          className="flex-1 bg-hive-brand-primary text-hive-background-primary hover:bg-hive-interactive-hover disabled:opacity-50"
          onClick={getActionButton().action === 'join' ? handleJoinClick : (e) => e.stopPropagation()}
          disabled={getActionButton().disabled}
          aria-label={`${getActionButton().text} ${space.name} space`}
        >
          {getActionButton().text}
        </Button>
        
        {onAction && (
          <Button 
            size="sm"
            variant="outline"
            className="border-hive-border-secondary text-hive-text-primary hover:bg-hive-background-elevated/20"
            onClick={(e) => {
              e.stopPropagation();
              onAction('favorite');
            }}
            aria-label={`Add ${space.name} to favorites`}
          >
            <Heart className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
    </ExpandFocus>
  );
}