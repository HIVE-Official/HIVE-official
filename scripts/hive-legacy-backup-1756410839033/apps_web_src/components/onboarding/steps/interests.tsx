'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, ButtonEnhanced, Badge } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';

// This should be moved to a constants file
const AVAILABLE_INTERESTS = [
  "Technology",
  "Science",
  "Arts",
  "Music",
  "Sports",
  "Gaming",
  "Reading",
  "Writing",
  "Photography",
  "Travel",
  "Food",
  "Fashion",
  "Fitness",
  "Movies",
  "Politics",
  "Environment",
  "Business",
  "Education",
  // Add more interests as needed
];

export function Interests() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(onboardingData?.interests ?? []);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await update({
      interests: selectedInterests
    });

    router.push('/onboarding/complete');
  };

  return (
    <Card className="w-full max-w-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">What interests you?</h2>
        <p className="text-muted-foreground">
          Select topics that interest you. This helps us personalize your experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_INTERESTS.map(interest => (
            <Badge
              key={interest}
              variant={selectedInterests.includes(interest) ? "chip" : "outline"}
              className="cursor-pointer hover:bg-primary/90"
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </Badge>
          ))}
        </div>

        <ButtonEnhanced 
          type="submit"
          disabled={selectedInterests.length === 0}
          className="w-full"
        >
          Complete Setup
        </ButtonEnhanced>
      </form>
    </Card>
  );
} 