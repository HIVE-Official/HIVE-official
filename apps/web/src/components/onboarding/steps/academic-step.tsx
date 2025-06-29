"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@hive/ui';
import { Button } from '@hive/ui';
import { Input } from '@hive/ui';
import { Label } from '@hive/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@hive/ui';
import { Badge } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { ALL_MAJORS } from '@hive/core';
import { GraduationCap, X, Loader2, Search } from 'lucide-react';
import { logger } from '@hive/core';
import type { AcademicLevel, MajorType } from '@hive/core';

// Generate graduation years (current year + 8 years)
const GRADUATION_YEARS = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() + i);

const ACADEMIC_LEVELS: { value: AcademicLevel; label: string }[] = [
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: "Graduate" },
  { value: 'phd', label: 'Ph.D.' },
];

export function OnboardingAcademicStep() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>(
    onboardingData?.academicLevel || 'undergraduate'
  );
  const [selectedMajors, setSelectedMajors] = useState<string[]>(
    onboardingData?.majors || []
  );
  const [graduationYear, setGraduationYear] = useState<number>(
    onboardingData?.graduationYear || GRADUATION_YEARS[0]
  );
  const [majorSearch, setMajorSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Filter majors based on search query
  const filteredMajors = useMemo(() => {
    if (!majorSearch.trim()) {
      return ALL_MAJORS.slice(0, 20); // Show first 20 majors by default
    }
    
    return ALL_MAJORS.filter((major: MajorType) =>
      major.name.toLowerCase().includes(majorSearch.toLowerCase())
    ).slice(0, 50); // Limit to 50 results for performance
  }, [majorSearch]);

  const handleMajorSelect = (majorName: string) => {
    if (!selectedMajors.includes(majorName) && selectedMajors.length < 3) {
      setSelectedMajors([...selectedMajors, majorName]);
      setMajorSearch(''); // Clear search after selection
    }
  };

  const handleMajorRemove = (majorName: string) => {
    setSelectedMajors(selectedMajors.filter(m => m !== majorName));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedMajors.length === 0) return;
    
    setIsLoading(true);
    
    try {
      await update({
        academicLevel,
        majors: selectedMajors,
        graduationYear
      });

      logger.info('Academic info saved:', { academicLevel, majors: selectedMajors, graduationYear });
      router.push('/onboarding/avatar');
      
    } catch (error) {
      logger.error('Failed to save academic info:', error);
      setIsLoading(false);
    }
  };

  const isFormValid = selectedMajors.length > 0 && graduationYear;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card border-border">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <GraduationCap className="w-6 h-6 text-accent" />
          </div>
          <CardTitle className="text-xl font-display text-card-foreground">
            Academic Information
          </CardTitle>
          <CardDescription className="text-muted-foreground font-sans">
            Tell us about your studies to connect you with relevant communities
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Academic Level */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">
                Academic Level
              </Label>
              <Select value={academicLevel} onValueChange={(value: AcademicLevel) => setAcademicLevel(value)}>
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

            {/* Major Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-card-foreground">
                  Major(s)
                </Label>
                <span className="text-xs text-muted-foreground">
                  {selectedMajors.length}/3 selected
                </span>
              </div>

              {/* Major Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  value={majorSearch}
                  onChange={(e) => setMajorSearch(e.target.value)}
                  placeholder="Search for your major..."
                  className="h-12 pl-10"
                />
              </div>

              {/* Major Options */}
              {majorSearch.trim() && filteredMajors.length > 0 && (
                <div className="max-h-48 overflow-y-auto border border-border rounded-lg">
                  {filteredMajors.map((major: MajorType) => (
                    <div
                      key={major.name}
                      className="p-3 hover:bg-accent/5 cursor-pointer border-b border-border last:border-b-0"
                      onClick={() => handleMajorSelect(major.name)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-card-foreground">{major.name}</span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {major.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

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
                        onClick={() => handleMajorRemove(major)}
                        className="p-0.5 rounded hover:bg-destructive/20 hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Select up to 3 majors. Search to find your specific program.
              </p>
            </div>

            {/* Graduation Year */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">
                Expected Graduation Year
              </Label>
              <Select 
                value={graduationYear.toString()} 
                onValueChange={(value) => setGraduationYear(parseInt(value))}
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Next'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 