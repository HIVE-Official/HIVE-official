"use client";

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { Card } from '@hive/ui';
import { 
  Users,
  UserPlus,
  Sparkles,
  Activity
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PeopleCardProps {
  className?: string;
}

export function PeopleCard({ className }: PeopleCardProps) {
  const router = useRouter();
  const [friendCount, setFriendCount] = useState(12);
  const [potentialFriends, setPotentialFriends] = useState(28);
  const [activeNow, setActiveNow] = useState(5);

  useEffect(() => {
    // Fetch real data from API
    fetchPeopleData();
  }, []);

  const fetchPeopleData = async () => {
    try {
      const response = await fetch('/api/profile/connections?summary=true', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setFriendCount(data.friendCount || 0);
        setPotentialFriends(data.potentialCount || 0);
        setActiveNow(data.activeCount || 0);
      }
    } catch (error) {
      logger.error('Error fetching people data:', { error: String(error) });
      // Default values if API fails
      setFriendCount(0);
      setPotentialFriends(0);
      setActiveNow(0);
    }
  };

  return (
    <Card 
      className={`p-4 h-full flex flex-col justify-between group cursor-pointer hover:border-accent/50 transition-all ${className}`}
      onClick={() => router.push('/people')}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">People</h3>
        <Users className="h-4 w-4 text-accent" />
      </div>

      {/* Main Stats */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-4xl font-bold text-accent mb-1">
          {friendCount}
        </div>
        <div className="text-sm text-muted-foreground mb-3">
          friends
        </div>

        {/* Potential Friends */}
        <div className="flex items-center gap-2 text-sm text-[var(--hive-gold)]">
          <Sparkles className="h-4 w-4" />
          <span>{potentialFriends} potential</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-green-400" />
            <span className="text-xs text-muted-foreground">
              {activeNow} active now
            </span>
          </div>
          <UserPlus className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
        </div>
      </div>

      {/* Build Hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-accent/50">
          <span className="text-xs font-medium text-accent">Build →</span>
        </div>
      </div>
    </Card>
  );
}