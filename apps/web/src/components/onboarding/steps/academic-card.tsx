"use client";

import { useState, useEffect } from "react";
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
  Badge,
  CardDescription,
} from "@hive/ui";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import { XIcon } from "lucide-react";
import {
  ACADEMIC_LEVELS,
  GRADUATION_YEARS,
  type AcademicLevel,
} from "@hive/core";

export function AcademicCard() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>(
    onboardingData?.academicLevel ?? "undergraduate"
  );
  const [majors, setMajors] = useState<string[]>(onboardingData?.majors ?? []);
  const [availableMajors, setAvailableMajors] = useState<string[]>([]);
  const [isLoadingMajors, setIsLoadingMajors] = useState(true);
  const [currentMajor, setCurrentMajor] = useState("");
  const [graduationYear, setGraduationYear] = useState<number>(
    onboardingData?.graduationYear ?? GRADUATION_YEARS[0]
  );

  useEffect(() => {
    const fetchMajors = async () => {
      if (!onboardingData?.schoolId) return;
      setIsLoadingMajors(true);
      try {
        const response = await fetch(
          `/api/schools/${onboardingData.schoolId}/majors`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setAvailableMajors(data.map((major) => major.name));
        }
      } catch (error) {
        // Handle error case, maybe show a toast
        console.error("Failed to fetch majors", error);
      } finally {
        setIsLoadingMajors(false);
      }
    };

    void fetchMajors();
  }, [onboardingData?.schoolId]);

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

    await update({
      academicLevel,
      majors,
      graduationYear,
    });

    router.push("/onboarding/3"); // Navigate to interests step
  };

  return (
    <Card className="w-full max-w-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Academic Information</h2>
        <CardDescription className="text-muted-foreground font-sans">
          Tell us about your studies to connect you with relevant communities
        </CardDescription>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Academic Level</Label>
            <Select
              value={academicLevel}
              onValueChange={(value: AcademicLevel) => setAcademicLevel(value)}
            >
              <SelectTrigger>
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

          <div className="space-y-2">
            <Label>Major(s)</Label>
            <div className="flex space-x-2">
              <Select value={currentMajor} onValueChange={setCurrentMajor}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a major" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingMajors ? (
                    <SelectItem value="loading" disabled>
                      Loading majors...
                    </SelectItem>
                  ) : (
                    availableMajors
                      .filter((major) => !majors.includes(major))
                      .map((major) => (
                        <SelectItem key={major} value={major}>
                          {major}
                        </SelectItem>
                      ))
                  )}
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={addMajor}
                disabled={!currentMajor || majors.includes(currentMajor)}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {majors.map((major) => (
                <Badge
                  key={major}
                  variant="outline"
                  className="flex items-center space-x-1"
                >
                  <span>{major}</span>
                  <button
                    type="button"
                    onClick={() => removeMajor(major)}
                    className="ml-1 hover:text-destructive"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Expected Graduation Year</Label>
            <Select
              value={graduationYear.toString()}
              onValueChange={(value) => setGraduationYear(parseInt(value))}
            >
              <SelectTrigger>
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
        </div>

        <Button
          type="submit"
          disabled={majors.length === 0 || !graduationYear}
          className="w-full"
        >
          Continue
        </Button>
      </form>
    </Card>
  );
}
