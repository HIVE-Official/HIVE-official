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
import { Input } from "../input";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Badge } from "../badge";
import { Loader2, X, Plus, GraduationCap } from "lucide-react";
import { StepProps } from "./types";

// Academic levels
const ACADEMIC_LEVELS = [
  { value: "undergraduate", label: "Undergraduate" },
  { value: "masters", label: "Master's" },
  { value: "phd", label: "Ph.D." },
];

// Common majors - simplified list for better UX
const COMMON_MAJORS = [
  "Computer Science",
  "Engineering",
  "Business Administration", 
  "Psychology",
  "Biology",
  "English",
  "History",
  "Mathematics",
  "Economics",
  "Political Science",
  "Chemistry",
  "Physics",
  "Art",
  "Music",
  "Education",
  "Communications",
  "Sociology",
  "Philosophy",
  "Pre-Med",
  "Pre-Law",
  "Other"
];

const GRADUATION_YEARS = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() + i);

export interface AcademicCardStepProps extends StepProps {
  initialData?: {
    academicLevel?: string;
    majors?: string[];
    graduationYear?: number;
  };
}

export const AcademicCardStep: React.FC<AcademicCardStepProps> = ({
  initialData = {},
  onSubmit,
  onSkip,
}) => {
  const [academicLevel, setAcademicLevel] = useState(initialData.academicLevel || "undergraduate");
  const [selectedMajors, setSelectedMajors] = useState<string[]>(initialData.majors || []);
  const [currentMajor, setCurrentMajor] = useState("");
  const [customMajor, setCustomMajor] = useState("");
  const [graduationYear, setGraduationYear] = useState(initialData.graduationYear || GRADUATION_YEARS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSubmit = async () => {
    if (selectedMajors.length === 0 || !graduationYear) return;
    
    setIsLoading(true);
    try {
      await onSubmit({
        academicLevel,
        majors: selectedMajors,
        graduationYear,
      });
    } catch (error) {
      console.error("Failed to submit academic info", error);
      setIsLoading(false);
    }
  };

  const addMajor = () => {
    let majorToAdd = "";
    
    if (showCustomInput && customMajor.trim()) {
      majorToAdd = customMajor.trim();
      setCustomMajor("");
      setShowCustomInput(false);
    } else if (currentMajor && currentMajor !== "Other") {
      majorToAdd = currentMajor;
    } else if (currentMajor === "Other") {
      setShowCustomInput(true);
      return;
    }

    if (majorToAdd && !selectedMajors.includes(majorToAdd) && selectedMajors.length < 3) {
      setSelectedMajors([...selectedMajors, majorToAdd]);
      setCurrentMajor("");
    }
  };

  const removeMajor = (majorName: string) => {
    setSelectedMajors(selectedMajors.filter(m => m !== majorName));
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  const availableMajors = COMMON_MAJORS.filter(major => !selectedMajors.includes(major));

  return (
    <Card className="w-full max-w-lg bg-card border-border">
      <CardHeader className="text-center space-y-2">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
          <GraduationCap className="w-6 h-6 text-accent" />
        </div>
        <CardTitle className="text-xl font-display text-card-foreground">
          Academic Information
        </CardTitle>
        <CardDescription className="text-muted-foreground font-sans">
          Tell us about your studies to help us connect you with the right communities
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Academic Level */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-card-foreground">Academic Level</Label>
          <Select value={academicLevel} onValueChange={setAcademicLevel}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your academic level" />
            </SelectTrigger>
            <SelectContent>
              {ACADEMIC_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Majors */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-card-foreground">Major(s)</Label>
            <span className="text-xs text-muted-foreground">
              {selectedMajors.length}/3 selected
            </span>
          </div>

          {/* Major Selection */}
          <div className="space-y-3">
            {!showCustomInput ? (
              <div className="flex gap-2">
                <Select value={currentMajor} onValueChange={setCurrentMajor}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a major" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMajors.map((major) => (
                      <SelectItem key={major} value={major}>
                        {major}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button"
                  onClick={addMajor}
                  disabled={!currentMajor || selectedMajors.length >= 3}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={customMajor}
                  onChange={(e) => setCustomMajor(e.target.value)}
                  placeholder="Enter your major"
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addMajor();
                    }
                  }}
                />
                <Button 
                  type="button"
                  onClick={addMajor}
                  disabled={!customMajor.trim() || selectedMajors.length >= 3}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomMajor("");
                    setCurrentMajor("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Selected Majors */}
          {selectedMajors.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedMajors.map((major) => (
                <Badge
                  key={major}
                  variant="accent"
                  className="flex items-center gap-2 py-1 px-3"
                >
                  <span className="text-sm">{major}</span>
                  <button
                    type="button"
                    onClick={() => removeMajor(major)}
                    className="ml-1 p-0.5 rounded hover:bg-destructive/20 hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Graduation Year */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-card-foreground">Expected Graduation Year</Label>
          <Select 
            value={graduationYear?.toString()} 
            onValueChange={(value: string) => setGraduationYear(parseInt(value))}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select graduation year" />
            </SelectTrigger>
            <SelectContent>
              {GRADUATION_YEARS.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          {onSkip && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleSkip}
              className="flex-1"
            >
              Skip for now
            </Button>
          )}
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1"
            disabled={isLoading || selectedMajors.length === 0 || !graduationYear}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 