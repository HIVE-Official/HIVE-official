'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { useSpaces } from '@hive/hooks';

export function LeaderQuestion() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  const [isLeader, setIsLeader] = useState(onboardingData?.isStudentLeader ?? false);
  const [spaceType, setSpaceType] = useState(onboardingData?.spaceType ?? '');
  const [spaceId, setSpaceId] = useState(onboardingData?.spaceId ?? '');

  // Fetch available spaces based on type
  const { data: spaces, isLoading } = useSpaces(spaceType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await update({
      isStudentLeader: isLeader,
      spaceId: isLeader ? spaceId : undefined,
      spaceType: isLeader ? spaceType : undefined
    });

    // If they are a leader, go to verification step, otherwise skip to academic
    router.push(isLeader ? '/onboarding/3' : '/onboarding/4');
  };

  return (
    <Card className="w-full max-w-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Are you a student leader?</h2>
        <p className="text-muted-foreground">
          Let us know if you're a leader of any student organizations, clubs, or academic groups.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant={isLeader ? "default" : "outline"}
              onClick={() => setIsLeader(true)}
            >
              Yes, I'm a student leader
            </Button>
            <Button
              type="button"
              variant={!isLeader ? "default" : "outline"}
              onClick={() => setIsLeader(false)}
            >
              No, I'm not
            </Button>
          </div>

          {isLeader && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Select your organization type</Label>
                <Select value={spaceType} onValueChange={setSpaceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clubs">Student Club</SelectItem>
                    <SelectItem value="organizations">Student Organization</SelectItem>
                    <SelectItem value="academic">Academic Group</SelectItem>
                    <SelectItem value="greek">Greek Life</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {spaceType && !isLoading && spaces && (
                <div className="space-y-2">
                  <Label>Select your organization</Label>
                  <Select value={spaceId} onValueChange={setSpaceId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {spaces.map(space => (
                        <SelectItem key={space.id} value={space.id}>
                          {space.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>

        <Button 
          type="submit"
          disabled={isLeader && (!spaceType || !spaceId)}
          className="w-full"
        >
          Continue
        </Button>
      </form>
    </Card>
  );
} 