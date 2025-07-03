"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Badge,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Label,
} from "@hive/ui";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import { Heart, Search, Loader2 } from "lucide-react";
import { logger, INTEREST_CATEGORIES } from "@hive/core";

export function OnboardingInterestsStep() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();

  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    onboardingData?.interests || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filter interests based on search query
  const filteredInterests = useMemo(() => {
    if (!searchQuery.trim()) {
      return INTEREST_CATEGORIES;
    }

    const filtered: Record<string, string[]> = {};
    Object.entries(INTEREST_CATEGORIES).forEach(([category, interests]) => {
      const matchingInterests = interests.filter((interest) =>
        interest.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingInterests.length > 0) {
        filtered[category] = matchingInterests;
      }
    });

    return filtered;
  }, [searchQuery]);

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSkip = async () => {
    setIsLoading(true);

    try {
      await update({
        interests: [],
        onboardingCompleted: true,
      });

      logger.info("Interests skipped, onboarding completed");
      router.push("/onboarding/complete");
    } catch (error) {
      logger.error("Failed to skip interests", { 
        error: error instanceof Error ? error : new Error(String(error))
      });
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await update({
        interests: selectedInterests,
        onboardingCompleted: true,
      });

      logger.info("Interests saved, onboarding completed:", {
        interests: selectedInterests,
      });
      router.push("/onboarding/complete");
    } catch (error) {
      logger.error("Failed to save interests", { 
        error: error instanceof Error ? error : new Error(String(error))
      });
      setIsLoading(false);
    }
  };

  const isFormValid = selectedInterests.length >= 3;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-card border-border">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 text-accent" />
          </div>
          <CardTitle className="text-xl font-display text-card-foreground">
            What Are You Interested In?
          </CardTitle>
          <CardDescription className="text-muted-foreground font-sans">
            Select at least 3 interests to help us connect you with relevant
            communities
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Search */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-card-foreground">
              Search Interests
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for interests..."
                className="h-12 pl-10"
              />
            </div>
          </div>

          {/* Selected Count */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedInterests.length} interests selected
            </span>
            {selectedInterests.length < 3 && (
              <span className="text-sm text-accent">
                Select at least {3 - selectedInterests.length} more
              </span>
            )}
          </div>

          {/* Interest Categories */}
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {Object.entries(filteredInterests).map(([category, interests]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-medium text-card-foreground">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest: string) => (
                    <Badge
                      key={interest}
                      variant={
                        selectedInterests.includes(interest)
                          ? "accent"
                          : "outline"
                      }
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => handleInterestToggle(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {searchQuery.trim() &&
            Object.keys(filteredInterests).length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No interests found matching &quot;{searchQuery}&quot;
                </p>
              </div>
            )}

          {/* Selected Interests Summary */}
          {selectedInterests.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">
                Your Selected Interests
              </Label>
              <div className="flex flex-wrap gap-2 p-4 bg-accent/5 rounded-lg border border-accent/20">
                {selectedInterests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="accent"
                    className="cursor-pointer"
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                    <span className="ml-1 text-xs">×</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={handleSkip}
              disabled={isLoading}
            >
              Skip for Now
            </Button>
            <Button
              className="flex-1 h-12"
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Finishing...
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
