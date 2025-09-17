"use client";

import React, { useState, useEffect } from 'react';
import { Card, Badge } from '@hive/ui';
import { 
  Wrench,
  Lock,
  Unlock,
  Sparkles,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProfileModern } from '@hive/hooks';

interface MyToolsCardProps {
  className?: string;
}

export function MyToolsCard({ className }: MyToolsCardProps) {
  const router = useRouter();
  const { profile, unlocks } = useProfileModern();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [progress, setProgress] = useState({
    profileComplete: false,
    spacesJoined: 0,
    postsCreated: 0,
    connectionsBuilt: 0
  });

  useEffect(() => {
    // Check unlock status
    const checkUnlockStatus = () => {
      const profileComplete = profile?.completionPercentage >= 80;
      const spacesJoined = profile?.spacesJoined?.length || 0;
      const hasEngagement = profile?.stats?.posts > 5;
      
      setProgress({
        profileComplete,
        spacesJoined,
        postsCreated: profile?.stats?.posts || 0,
        connectionsBuilt: profile?.stats?.connections || 0
      });
      
      // Unlock if all conditions met
      const unlocked = profileComplete && spacesJoined >= 3 && hasEngagement;
      setIsUnlocked(unlocked || unlocks?.tools === true);
    };
    
    checkUnlockStatus();
  }, [profile, unlocks]);

  const getProgressPercentage = () => {
    let score = 0;
    if (progress.profileComplete) score += 25;
    if (progress.spacesJoined >= 3) score += 25;
    if (progress.postsCreated >= 5) score += 25;
    if (progress.connectionsBuilt >= 10) score += 25;
    return score;
  };

  if (!isUnlocked) {
    return (
      <Card className={`p-4 h-full flex flex-col justify-between bg-muted/30 border-dashed ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-muted-foreground">My Tools</h3>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Locked Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Tool Creation Locked
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div 
              className="bg-accent/50 h-2 rounded-full transition-all"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          
          <p className="text-xs text-muted-foreground">
            {getProgressPercentage()}% Complete
          </p>
        </div>

        {/* Unlock Requirements */}
        <div className="pt-3 border-t border-border/50 space-y-1">
          <div className="flex items-center gap-2 text-xs">
            {progress.profileComplete ? (
              <CheckCircle className="h-3 w-3 text-green-400" />
            ) : (
              <div className="h-3 w-3 rounded-full border border-muted-foreground" />
            )}
            <span className={progress.profileComplete ? 'text-green-400' : 'text-muted-foreground'}>
              Complete profile (80%+)
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            {progress.spacesJoined >= 3 ? (
              <CheckCircle className="h-3 w-3 text-green-400" />
            ) : (
              <div className="h-3 w-3 rounded-full border border-muted-foreground" />
            )}
            <span className={progress.spacesJoined >= 3 ? 'text-green-400' : 'text-muted-foreground'}>
              Join 3+ spaces ({progress.spacesJoined}/3)
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            {progress.postsCreated >= 5 ? (
              <CheckCircle className="h-3 w-3 text-green-400" />
            ) : (
              <div className="h-3 w-3 rounded-full border border-muted-foreground" />
            )}
            <span className={progress.postsCreated >= 5 ? 'text-green-400' : 'text-muted-foreground'}>
              Create 5+ posts ({progress.postsCreated}/5)
            </span>
          </div>
        </div>
      </Card>
    );
  }

  // Unlocked State
  return (
    <Card 
      className={`p-4 h-full flex flex-col justify-between group cursor-pointer hover:border-accent/50 transition-all ${className}`}
      onClick={() => router.push('/hivelab')}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">My Tools</h3>
        <div className="flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-accent" />
          <Unlock className="h-4 w-4 text-green-400" />
        </div>
      </div>

      {/* Unlocked Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-3">
          <Wrench className="h-6 w-6 text-accent" />
        </div>
        
        <div className="text-center mb-3">
          <div className="text-2xl font-bold text-accent">12</div>
          <div className="text-xs text-muted-foreground">templates</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">3</div>
          <div className="text-xs text-muted-foreground">created</div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-border/50">
        <Badge className="w-full justify-center bg-accent/10 text-accent border-accent/30">
          <TrendingUp className="h-3 w-3 mr-1" />
          Builder Status Active
        </Badge>
      </div>

      {/* Hover Hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-accent/50">
          <span className="text-xs font-medium text-accent">Open HiveLab →</span>
        </div>
      </div>
    </Card>
  );
}