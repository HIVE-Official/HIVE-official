"use client";

import { Button, Card } from "@hive/ui";
import { Users, Star, MapPin, ArrowRight, Heart, Activity, Crown, Shield } from "lucide-react";
import { type Space } from "@hive/core";

interface UnifiedSpaceCardProps {
  space: Space;
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
  const handleCardClick = () => {
    window.location.href = `/spaces/${space.id}`;
  };

  const handleJoinClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
      <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
        <Shield className="h-3 w-3" />
        1 Organization Limit
      </div>
    );
  };


  if (variant === "list") {
    return (
      <Card 
        className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
              {getSpaceInitial()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-white">{space.name}</h3>
                {getRoleBadge()}
                {getGreekLifeBadge()}
              </div>
              <p className="text-sm text-[#A1A1AA] line-clamp-1 mb-2">{space.description}</p>
              <div className="flex items-center gap-4 text-xs text-[#71717A]">
                <span className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {space.memberCount || 0} members
                </span>
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {space.type?.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
          <Button 
            size="sm"
            className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255] disabled:opacity-50"
            onClick={getActionButton().action === 'join' ? handleJoinClick : (e) => e.stopPropagation()}
            disabled={getActionButton().disabled}
            aria-label={`${getActionButton().text} ${space.name} space`}
          >
            {getActionButton().text}
          </Button>
        </div>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card 
        className="flex-shrink-0 w-64 p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.04)] transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
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
          <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFE255] rounded-lg flex items-center justify-center text-[#0A0A0A] font-semibold text-sm">
            {getSpaceInitial()}
          </div>
          <div className="flex-1">
            <h4 className="text-white font-medium text-sm truncate">{space.name}</h4>
            <p className="text-xs text-[#A1A1AA] capitalize">{space.type?.replace('_', ' ')}</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#FFD700] group-hover:translate-x-1 transition-transform" />
        </div>
        <div className="flex items-center text-xs text-[#A1A1AA]">
          <Activity className="h-3 w-3 mr-1 text-green-400" />
          Active now
        </div>
      </Card>
    );
  }

  // Default: grid variant
  return (
    <Card 
      className="group p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
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
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
          {getSpaceInitial()}
        </div>
        <div className="flex items-center gap-2">
          {getRoleBadge()}
          {getGreekLifeBadge()}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-hive-gold" />
            <span className="text-xs text-[#A1A1AA]">4.8</span>
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
        {space.name}
      </h3>
      
      <p className="text-sm text-[#A1A1AA] mb-4 line-clamp-2">
        {space.description || "No description available"}
      </p>

      <div className="flex items-center justify-between text-xs text-[#71717A] mb-4">
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
          className="flex-1 bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255] disabled:opacity-50"
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
            className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
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
  );
}