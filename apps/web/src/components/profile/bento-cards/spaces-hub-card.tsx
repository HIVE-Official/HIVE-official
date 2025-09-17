"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@hive/ui';
import { 
  Plus,
  Users,
  MessageSquare,
  Bell,
  Activity,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProfileModern } from '@hive/hooks';

interface SpacePreview {
  id: string;
  name: string;
  abbreviation: string;
  memberCount: number;
  unreadCount: number;
  isActive: boolean;
  color: string;
}

export function SpacesHubCard() {
  const router = useRouter();
  const { spaces } = useProfileModern();
  const [spacePreviews, setSpacePreviews] = useState<SpacePreview[]>([]);
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    // Process spaces into preview format
    if (spaces && spaces.length > 0) {
      const previews = spaces.slice(0, 6).map(space => ({
        id: space.id,
        name: space.name,
        abbreviation: space.name.slice(0, 2).toUpperCase(),
        memberCount: space.memberCount || 0,
        unreadCount: 0, // Would come from real-time data
        isActive: true,
        color: getSpaceColor(space.type)
      }));
      setSpacePreviews(previews);
      
      // Calculate total connections from all spaces
      const connections = spaces.reduce((acc, space) => acc + (space.memberCount || 0), 0);
      setTotalConnections(connections);
    }
  }, [spaces]);

  const getSpaceColor = (type: string) => {
    const colors = {
      academic: 'bg-blue-500/20 text-blue-400',
      residential: 'bg-green-500/20 text-green-400',
      social: 'bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]',
      organization: 'bg-purple-500/20 text-purple-400'
    };
    return colors[type as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="p-4 h-full relative group cursor-pointer hover:border-accent/50 transition-all"
          onClick={() => router.push('/spaces')}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">Spaces Hub</h3>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
      </div>

      {/* Space Grid - 2x3 on mobile, 3x2 on desktop */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {spacePreviews.map((space, idx) => (
          <div
            key={space.id}
            onClick={(e: any) => {
              e.stopPropagation();
              router.push(`/spaces/${space.id}`);
            }}
            className={`relative aspect-square rounded-lg flex flex-col items-center justify-center ${space.color} hover:scale-105 transition-transform cursor-pointer`}
          >
            <span className="font-bold text-sm">{space.abbreviation}</span>
            <span className="text-xs opacity-80">{space.memberCount}</span>
            
            {/* Activity indicator */}
            {space.isActive && (
              <div className="absolute top-1 right-1">
                <Activity className="h-3 w-3" />
              </div>
            )}
            
            {/* Unread indicator */}
            {space.unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">
                  {space.unreadCount > 9 ? '9+' : space.unreadCount}
                </span>
              </div>
            )}
          </div>
        ))}
        
        {/* Add Space Button */}
        <div
          onClick={(e: any) => {
            e.stopPropagation();
            router.push('/spaces/discover');
          }}
          className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer"
        >
          <Plus className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Footer Stats */}
      <div className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{totalConnections} connections</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-3 w-3 text-accent" />
            <Bell className="h-3 w-3 text-[var(--hive-gold)]" />
          </div>
        </div>
      </div>
    </Card>
  );
}