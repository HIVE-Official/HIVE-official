"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { logger } from "@hive/core/utils/logger";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
} from "..";

interface AcademicCardStepProps {
  onNext: () => void;
  onSubmit?: (data: {
    majorId: string;
    graduationYear: string;
    isFirstYear: boolean;
  }) => Promise<void>;
}

// Major options (simplified - would come from a data source)
const MAJORS = [
  { id: "computer-science", name: "Computer Science" },
  { id: "business", name: "Business Administration" },
  { id: "engineering", name: "Engineering" },
  { id: "psychology", name: "Psychology" },
  { id: "biology", name: "Biology" },
  { id: "english", name: "English" },
  { id: "mathematics", name: "Mathematics" },
  { id: "art", name: "Art" },
  { id: "history", name: "History" },
  { id: "undecided", name: "Undecided" },
];

// Generate graduation years (current year + 1 to +6)
const currentYear = new Date().getFullYear();
const GRADUATION_YEARS = Array.from({ length: 6 }, (_, i) =>
  String(currentYear + 1 + i)
);

export const AcademicCardStep = ({
  onNext,
  onSubmit,
}: AcademicCardStepProps) => {
  const [majorId, setMajorId] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [isFirstYear, setIsFirstYear] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!majorId || !graduationYear) return;

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit({ majorId, graduationYear, isFirstYear });
      }
      onNext();
    } catch (error) {
      logger.error("Failed to save academic info", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Academic Information</CardTitle>
          <CardDescription className="text-zinc-400">
            Help us understand your academic journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="major" className="text-zinc-300">
                Major / Field of Study
              </Label>
              <Select value={majorId} onValueChange={setMajorId} required>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select your major" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {MAJORS.map((major) => (
                    <SelectItem
                      key={major.id}
                      value={major.id}
                      className="text-white hover:bg-zinc-700 focus:bg-zinc-700"
                    >
                      {major.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="graduationYear" className="text-zinc-300">
                Expected Graduation Year
              </Label>
              <Select
                value={graduationYear}
                onValueChange={setGraduationYear}
                required
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select graduation year" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {GRADUATION_YEARS.map((year) => (
                    <SelectItem
                      key={year}
                      value={year}
                      className="text-white hover:bg-zinc-700 focus:bg-zinc-700"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="firstYear"
                checked={isFirstYear}
                onCheckedChange={(checked) => setIsFirstYear(!!checked)}
                className="border-zinc-600 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
              />
              <Label
                htmlFor="firstYear"
                className="text-zinc-300 text-sm cursor-pointer"
              >
                I&apos;m a first-year student
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-zinc-100 transition-colors"
              disabled={!majorId || !graduationYear || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
