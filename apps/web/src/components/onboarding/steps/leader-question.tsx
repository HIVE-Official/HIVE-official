"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@hive/ui";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import type { SpaceType } from "@hive/core";

// Mock spaces data for now - real API integration pending
const mockSpaces = {
  academic: [
    { id: "cs-majors", name: "Computer Science Majors" },
    { id: "business-students", name: "Business Students" },
    { id: "pre-med", name: "Pre-Med Track" },
  ],
  social: [
    { id: "gaming-club", name: "Gaming Club" },
    { id: "intramural-sports", name: "Intramural Sports" },
    { id: "music-lovers", name: "Music Lovers" },
  ],
};

type Space = {
  id: string;
  name: string;
};

export function LeaderQuestion() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  const [isLeader, setIsLeader] = useState(
    onboardingData?.isStudentLeader ?? false
  );
  const [spaceType, setSpaceType] = useState(
    onboardingData?.spaceType ?? "academic"
  );
  const [spaceId, setSpaceId] = useState(onboardingData?.spaceId ?? "");

  // Get available spaces based on type
  const spaces = mockSpaces[spaceType as keyof typeof mockSpaces] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await update({
      isStudentLeader: isLeader,
      spaceId: isLeader ? spaceId : undefined,
      spaceType: isLeader ? spaceType : undefined,
    });

    // If they are a leader, go to verification step, otherwise skip to academic
    router.push(isLeader ? "/onboarding/3" : "/onboarding/4");
  };

  return (
    <Card className="w-full max-w-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Are you a student leader?</h2>
        <p className="text-muted-foreground">
          We&apos;re looking for student leaders who want to help shape their
          campus communities.
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
              Yes, I&apos;m a student leader
            </Button>
            <Button
              type="button"
              variant={!isLeader ? "default" : "outline"}
              onClick={() => setIsLeader(false)}
            >
              No, I&apos;m not
            </Button>
          </div>

          {isLeader && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Select your organization type</Label>
                <Select
                  value={spaceType}
                  onValueChange={(value: string) => setSpaceType(value as SpaceType)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clubs">Student Club</SelectItem>
                    <SelectItem value="organizations">
                      Student Organization
                    </SelectItem>
                    <SelectItem value="academic">Academic Group</SelectItem>
                    <SelectItem value="greek">Greek Life</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {spaceType && (
                <div className="space-y-2">
                  <Label>Select your organization</Label>
                  <Select value={spaceId} onValueChange={setSpaceId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {spaces.map((space: Space) => (
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

      <div className="space-y-4 mt-6">
        <h2 className="text-2xl font-bold">
          Why are you interested in leadership opportunities?
        </h2>
        <p className="text-center text-muted-foreground">
          I&apos;m interested in leadership opportunities
        </p>
      </div>

      <div className="space-y-4 mt-6">
        <h2 className="text-2xl font-bold">
          Why are you here to connect and learn?
        </h2>
        <p className="text-center text-muted-foreground">
          I&apos;m here to connect and learn
        </p>
      </div>
    </Card>
  );
} 
