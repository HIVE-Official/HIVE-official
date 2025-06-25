"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "..";

interface InterestsStepProps {
  onNext: () => void;
  onSubmit?: (interests: string[]) => Promise<void>;
  onSkip?: () => void;
  maxInterests?: number;
}

// Interest categories and options
const INTEREST_OPTIONS = [
  "Technology",
  "Gaming",
  "Sports",
  "Music",
  "Art & Design",
  "Photography",
  "Cooking",
  "Reading",
  "Travel",
  "Fitness",
  "Movies & TV",
  "Entrepreneurship",
  "Politics",
  "Environmental",
  "Writing",
  "Programming",
  "Fashion",
  "Science",
  "History",
  "Language Learning",
  "Volunteering",
  "Mental Health",
  "Career Development",
  "Social Justice",
];

export const InterestsStep = ({
  onNext,
  onSubmit,
  onSkip,
  maxInterests = 6,
}: InterestsStepProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        // Remove interest
        return prev.filter((i) => i !== interest);
      } else if (prev.length < maxInterests) {
        // Add interest if under limit
        return [...prev, interest];
      }
      // If at limit, ignore
      return prev;
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(selectedInterests);
      }
      onNext();
    } catch (error) {
      console.error("Failed to save interests", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
    onNext();
  };

  const isSelected = (interest: string) => selectedInterests.includes(interest);
  const isAtLimit = selectedInterests.length >= maxInterests;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">
            What are you interested in?
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Select up to {maxInterests} interests to help us personalize your
            experience. You can always update these later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Interest count indicator */}
          <div className="text-center">
            <p className="text-sm text-zinc-400">
              {selectedInterests.length} / {maxInterests} selected
            </p>
          </div>

          {/* Interest grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {INTEREST_OPTIONS.map((interest) => {
              const selected = isSelected(interest);
              const disabled = !selected && isAtLimit;

              return (
                <Button
                  key={interest}
                  variant={selected ? "default" : "outline"}
                  size="sm"
                  className={`
                    h-auto py-3 px-4 text-sm whitespace-normal leading-tight
                    ${
                      selected
                        ? "bg-white text-black hover:bg-zinc-100"
                        : "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    }
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                  onClick={() => handleInterestToggle(interest)}
                  disabled={disabled}
                >
                  {interest}
                </Button>
              );
            })}
          </div>

          {/* Warning when at limit */}
          {isAtLimit && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
              <p className="text-yellow-400 text-sm text-center">
                You've reached the maximum of {maxInterests} interests. Unselect
                one to choose a different interest.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full border-zinc-700 text-white hover:bg-zinc-800"
            >
              Skip for now
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-full bg-white text-black hover:bg-zinc-100"
              disabled={selectedInterests.length === 0 || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {selectedInterests.length === 0
                ? "Select at least one interest"
                : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
