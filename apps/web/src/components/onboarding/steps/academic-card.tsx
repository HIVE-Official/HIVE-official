"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
} from "@hive/ui";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import { XIcon } from "lucide-react";
import {
  ACADEMIC_LEVELS,
  GRADUATION_YEARS,
  type AcademicLevel,
} from "@hive/core";

// Static list of common majors to avoid slow API loading
const COMMON_MAJORS = [
  "Computer Science",
  "Business Administration",
  "Psychology",
  "Biology",
  "Engineering",
  "English",
  "Mathematics",
  "Political Science",
  "Economics",
  "Chemistry",
  "History",
  "Art",
  "Communications",
  "Nursing",
  "Education",
  "Philosophy",
  "Physics",
  "Sociology",
  "Criminal Justice",
  "Marketing",
  "Finance",
  "Accounting",
  "Pre-Med",
  "Pre-Law",
  "International Relations",
  "Environmental Science",
  "Music",
  "Theater",
  "Film Studies",
  "Anthropology",
].sort();

export function AcademicCard() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>(
    onboardingData?.academicLevel ?? "undergraduate"
  );
  const [majors, setMajors] = useState<string[]>(onboardingData?.majors ?? []);
  const [currentMajor, setCurrentMajor] = useState("");
  const [graduationYear, setGraduationYear] = useState<number>(
    onboardingData?.graduationYear ?? GRADUATION_YEARS[0]
  );
  const [error, setError] = useState<string | null>(null);

  const addMajor = () => {
    if (!currentMajor || majors.includes(currentMajor)) return;
    setMajors([...majors, currentMajor]);
    setCurrentMajor("");
  };

  const removeMajor = (major: string) => {
    setMajors(majors.filter((m) => m !== major));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!academicLevel || majors.length === 0 || !graduationYear) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const updatedData = {
        academicLevel,
        majors,
        graduationYear,
      };

      // Update the store
      update(updatedData);

      // Navigate to step 4 (interests)
      router.push("/onboarding/4");
    } catch (error) {
      console.error("Error submitting academic info:", error);
      setError("Failed to save academic information. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-lg bg-surface border border-border rounded-lg p-6 space-y-6">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-medium text-foreground">Academic Information</h2>
          <p className="text-muted font-sans">
            Tell us about your studies to connect you with relevant communities
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground font-medium">Academic Level</Label>
            <Select
              value={academicLevel}
              onValueChange={(value: AcademicLevel) => setAcademicLevel(value)}
            >
              <SelectTrigger className="bg-surface-01 border-border text-foreground">
                <SelectValue placeholder="Select your academic level" />
              </SelectTrigger>
              <SelectContent className="bg-surface-02 border-border">
                {ACADEMIC_LEVELS.map((level) => (
                  <SelectItem 
                    key={level.value} 
                    value={level.value}
                    className="text-foreground hover:bg-surface-01"
                  >
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Major(s)</Label>
            <div className="flex space-x-2">
              <Select value={currentMajor} onValueChange={setCurrentMajor}>
                <SelectTrigger className="flex-1 bg-surface-01 border-border text-foreground">
                  <SelectValue placeholder="Select a major" />
                </SelectTrigger>
                <SelectContent className="bg-surface-02 border-border max-h-60">
                  {COMMON_MAJORS
                    .filter((major) => !majors.includes(major))
                    .map((major) => (
                      <SelectItem 
                        key={major} 
                        value={major}
                        className="text-foreground hover:bg-surface-01"
                      >
                        {major}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={addMajor}
                disabled={!currentMajor || majors.includes(currentMajor)}
                className="bg-surface-01 border border-accent text-accent hover:bg-accent/5 disabled:opacity-50"
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {majors.map((major) => (
                <Badge
                  key={major}
                  variant="outline"
                  className="flex items-center space-x-1 bg-surface-01 border-border text-foreground"
                >
                  <span>{major}</span>
                  <button
                    type="button"
                    onClick={() => removeMajor(major)}
                    className="ml-1 hover:text-accent transition-colors"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Expected Graduation Year</Label>
            <Select
              value={graduationYear.toString()}
              onValueChange={(value) => setGraduationYear(parseInt(value))}
            >
              <SelectTrigger className="bg-surface-01 border-border text-foreground">
                <SelectValue placeholder="Select graduation year" />
              </SelectTrigger>
              <SelectContent className="bg-surface-02 border-border">
                {GRADUATION_YEARS.map((year) => (
                  <SelectItem 
                    key={year} 
                    value={year.toString()}
                    className="text-foreground hover:bg-surface-01"
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-accent text-background font-medium hover:bg-accent/90 transition-colors"
        >
          Continue to Interests
        </Button>
      </form>
    </div>
  );
}
