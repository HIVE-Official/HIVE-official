"use client";

import React, { useState } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import { 
  Target,
  CheckCircle,
  Circle,
  ArrowRight,
  TrendingUp,
  Users,
  Wrench,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileStrengthCardProps {
  completionPercentage: number;
  completedFields: string[];
  nextSteps: string[];
  isUnlocked: boolean;
}

const PROFILE_STAGES = [
  {
    name: 'Getting Started',
    minPercentage: 0,
    maxPercentage: 30,
    color: 'text-red-500',
    bgColor: 'bg-red-500',
    description: 'Complete your basic information'
  },
  {
    name: 'Building Profile',
    minPercentage: 31,
    maxPercentage: 60,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500',
    description: 'Add personal touches and interests'
  },
  {
    name: 'Campus Ready',
    minPercentage: 61,
    maxPercentage: 85,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    description: 'Ready for campus connections'
  },
  {
    name: 'HIVE Champion',
    minPercentage: 86,
    maxPercentage: 100,
    color: 'text-green-500',
    bgColor: 'bg-green-500',
    description: 'Maximizing your HIVE experience'
  }
];

const NEXT_UNLOCK_TEASERS = [
  {
    threshold: 40,
    feature: 'Space Explorer Card',
    description: 'Track your campus community engagement',
    icon: Users
  },
  {
    threshold: 60,
    feature: 'Tool Builder Dashboard',
    description: 'Create and share campus utilities',
    icon: Wrench
  },
  {
    threshold: 80,
    feature: 'Campus Analytics',
    description: 'Insights on your university experience',
    icon: TrendingUp
  },
  {
    threshold: 100,
    feature: 'Elite Status',
    description: 'Unlock all premium HIVE features',
    icon: Sparkles
  }
];

export function ProfileStrengthCard({ 
  completionPercentage, 
  completedFields, 
  nextSteps, 
  isUnlocked 
}: ProfileStrengthCardProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  // Determine current stage
  const currentStage = PROFILE_STAGES.find(stage => 
    completionPercentage >= stage.minPercentage && completionPercentage <= stage.maxPercentage
  ) || PROFILE_STAGES[0];

  // Find next unlock
  const nextUnlock = NEXT_UNLOCK_TEASERS.find(teaser => completionPercentage < teaser.threshold);
  const progressToNextUnlock = nextUnlock 
    ? ((completionPercentage - (nextUnlock.threshold - 20)) / 20) * 100
    : 100;

  if (!isUnlocked) {
    return (
      <Card className="p-6 opacity-50">
        <div className="text-center">
          <Target className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Profile strength locked</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 relative overflow-hidden">
      {/* Progress ring background effect */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10"
           style={{ backgroundColor: currentStage.bgColor.replace('bg-', '') }} />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-accent" />
          <span className="font-medium">Profile Strength</span>
        </div>
        <Badge 
          variant="secondary" 
          className={`${currentStage.color} border-current`}
        >
          {currentStage.name}
        </Badge>
      </div>

      {/* Main completion circle */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          {/* Progress circle */}
          <div className="w-20 h-20 mx-auto mb-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={currentStage.color}
                strokeDasharray={`${completionPercentage}, 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">{completionPercentage}%</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{currentStage.description}</div>
        </div>
      </div>

      {/* Next steps */}
      {nextSteps.length > 0 && (
        <div className="space-y-3 mb-4">
          <div className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Next Steps
          </div>
          <div className="space-y-2">
            {nextSteps.slice(0, showDetails ? undefined : 2).map((step, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Circle className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{step}</span>
              </div>
            ))}
            {!showDetails && nextSteps.length > 2 && (
              <button 
                onClick={() => setShowDetails(true)}
                className="flex items-center gap-1 text-sm text-accent hover:underline"
              >
                <span>Show {nextSteps.length - 2} more</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Next unlock teaser */}
      {nextUnlock && (
        <div className="bg-accent/5 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <nextUnlock.icon className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">
                Next Unlock: {nextUnlock.feature}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                {nextUnlock.description}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground">
                  {nextUnlock.threshold - completionPercentage}% to unlock
                </div>
                <div className="flex-1 bg-muted rounded-full h-1">
                  <div 
                    className="bg-accent h-1 rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(0, Math.min(100, progressToNextUnlock))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion rewards */}
      {completionPercentage >= 100 && (
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <div>
              <div className="text-sm font-medium text-accent">Profile Complete!</div>
              <div className="text-xs text-muted-foreground">
                You've unlocked all HIVE features
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="space-y-2">
        <Button 
          onClick={() => router.push('/profile/edit')}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <ArrowRight className="h-4 w-4 mr-2" />
          Complete Profile
        </Button>

        {completionPercentage > 60 && (
          <Button 
            onClick={() => router.push('/profile/analytics')}
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        )}

        {/* Stage-specific actions */}
        {currentStage.name === 'Campus Ready' && (
          <Button 
            onClick={() => router.push('/spaces')}
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
          >
            <Users className="h-4 w-4 mr-2" />
            Join More Spaces
          </Button>
        )}

        {currentStage.name === 'HIVE Champion' && (
          <Button 
            onClick={() => router.push('/tools')}
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
          >
            <Wrench className="h-4 w-4 mr-2" />
            Build Campus Tools
          </Button>
        )}
      </div>
    </Card>
  );
}