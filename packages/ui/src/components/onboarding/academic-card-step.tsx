"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";

export interface AcademicCardStepProps {
  initialData: {
    major: string;
    graduationYear: number;
  };
  onSubmit: (data: { major: string; graduationYear: number } | null) => void;
  onBack?: () => void;
}

export const AcademicCardStep: React.FC<AcademicCardStepProps> = ({
  initialData,
  onSubmit,
  onBack,
}) => {
  const [major, setMajor] = useState(initialData.major);
  const [graduationYear, setGraduationYear] = useState(initialData.graduationYear);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!major || !graduationYear) return;
    
    setIsLoading(true);
    try {
      onSubmit({
        major,
        graduationYear,
      });
    } catch (error) {
      console.error("Failed to submit academic info", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Academic Information</CardTitle>
        <CardDescription className="text-muted-foreground">
          Tell us about your academic journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="major">Major</Label>
            <Input
              id="major"
              value={major}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMajor(e.target.value)}
              placeholder="e.g., Computer Science"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="graduationYear">Expected Graduation Year</Label>
            <Input
              id="graduationYear"
              type="number"
              value={graduationYear}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGraduationYear(parseInt(e.target.value))}
              min={new Date().getFullYear()}
              max={new Date().getFullYear() + 6}
              required
            />
          </div>
        </div>

        <div className="flex gap-2">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            variant="default"
            onClick={handleSubmit}
            className="flex-1"
            disabled={isLoading || !major || !graduationYear}
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