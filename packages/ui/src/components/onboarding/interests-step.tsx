"use client";

import React, { useState } from "react";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Loader2 } from "lucide-react";

const AVAILABLE_INTERESTS = [
  "Software Development",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "UI/UX Design",
  "Product Management",
  "Entrepreneurship",
  "Research",
  "Open Source",
  "Blockchain",
];

export interface InterestsStepProps {
  initialInterests: string[];
  onSubmit: (data: { interests: string[] } | null) => void;
  onBack?: () => void;
}

export const InterestsStep: React.FC<InterestsStepProps> = ({
  initialInterests,
  onSubmit,
  onBack,
}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests);
  const [isLoading, setIsLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    if (selectedInterests.length === 0) return;
    
    setIsLoading(true);
    try {
      onSubmit({
        interests: selectedInterests,
      });
    } catch (error) {
      console.error("Failed to submit interests", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Your Interests</CardTitle>
        <CardDescription className="text-muted-foreground">
          Select topics that interest you to help us personalize your experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {AVAILABLE_INTERESTS.map((interest) => (
            <Button
              key={interest}
              type="button"
              variant={selectedInterests.includes(interest) ? "default" : "outline"}
              onClick={() => toggleInterest(interest)}
              className="text-sm"
            >
              {interest}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          {onBack && (
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            className="flex-1"
            disabled={isLoading || selectedInterests.length === 0}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 