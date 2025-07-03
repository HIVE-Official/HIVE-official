"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { Users, Award } from 'lucide-react';
import { logger } from '@hive/core';

export function OnboardingLeaderStep() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  
  const [isStudentLeader, setIsStudentLeader] = useState<boolean | null>(
    onboardingData?.isStudentLeader ?? null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (leaderChoice: boolean) => {
    setIsLoading(true);
    
    try {
      await update({
        isStudentLeader: leaderChoice
      });

      logger.info('Leadership status saved:', { isStudentLeader: leaderChoice });
      
      // Navigate to academic step (space claiming deferred)
      router.push('/onboarding/academic');
      
    } catch (error) {
      logger.error('Failed to save leadership status', { 
        error: error instanceof Error ? error : new Error(String(error))
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card border-border">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-6 h-6 text-accent" />
          </div>
          <CardTitle className="text-xl font-display text-card-foreground">
            Student Leadership
          </CardTitle>
          <CardDescription className="text-muted-foreground font-sans">
            Are you involved in student leadership or organizations?
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Leader Option */}
            <div 
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all
                ${isStudentLeader === true 
                  ? 'border-accent bg-accent/5' 
                  : 'border-border hover:border-accent/50'
                }
              `}
              onClick={() => setIsStudentLeader(true)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-card-foreground mb-1">
                    Yes, I&apos;m a leader
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    I hold leadership positions in student organizations, clubs, or governance
                  </p>
                </div>
                <div className={`
                  w-4 h-4 rounded-full border-2 mt-2
                  ${isStudentLeader === true 
                    ? 'border-accent bg-accent' 
                    : 'border-muted-foreground'
                  }
                `}>
                  {isStudentLeader === true && (
                    <div className="w-2 h-2 bg-background rounded-full m-0.5" />
                  )}
                </div>
              </div>
            </div>

            {/* Non-Leader Option */}
            <div 
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all
                ${isStudentLeader === false 
                  ? 'border-accent bg-accent/5' 
                  : 'border-border hover:border-accent/50'
                }
              `}
              onClick={() => setIsStudentLeader(false)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-card-foreground mb-1">
                    Not at this time
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    I&apos;m focused on academics or not currently in leadership roles
                  </p>
                </div>
                <div className={`
                  w-4 h-4 rounded-full border-2 mt-2
                  ${isStudentLeader === false 
                    ? 'border-accent bg-accent' 
                    : 'border-muted-foreground'
                  }
                `}>
                  {isStudentLeader === false && (
                    <div className="w-2 h-2 bg-background rounded-full m-0.5" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full h-12"
            disabled={isStudentLeader === null || isLoading}
            onClick={() => handleSubmit(isStudentLeader!)}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Saving...
              </>
            ) : (
              'Next'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 