'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Badge, Input } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { Search, Heart } from 'lucide-react';
import { INTEREST_CATEGORIES, type InterestCategory } from '@/constants/interests';

export function Interests() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(onboardingData?.interests ?? []);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter interests based on search query
  const filteredInterests = useMemo(() => {
    if (!searchQuery.trim()) {
      return INTEREST_CATEGORIES;
    }

    const filtered: Partial<typeof INTEREST_CATEGORIES> = {};
    Object.entries(INTEREST_CATEGORIES).forEach(([category, interests]) => {
      const matchingInterests = interests.filter((interest) =>
        interest.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingInterests.length > 0) {
        filtered[category as InterestCategory] = matchingInterests;
      }
    });

    return filtered;
  }, [searchQuery]);

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

  const isFormValid = selectedInterests.length >= 3;

  return (
    <Card className="w-full max-w-4xl p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 text-accent" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground">What interests you?</h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Select at least 3 interests to help us connect you with relevant communities
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Search */}
        <div className="space-y-3">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for interests..."
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Selected Count */}
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            {selectedInterests.length} interests selected
          </span>
          {selectedInterests.length < 3 && (
            <span className="ml-2 text-sm text-accent font-medium">
              (Select at least {3 - selectedInterests.length} more)
            </span>
          )}
        </div>

        {/* Interest Categories */}
        <div className="space-y-8 max-h-96 overflow-y-auto">
          {Object.entries(filteredInterests).map(([category, interests]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest: string) => (
                  <Badge
                    key={interest}
                    variant={
                      selectedInterests.includes(interest)
                        ? "accent"
                        : "outline"
                    }
                    className="cursor-pointer transition-all hover:scale-105 text-sm py-2 px-4"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchQuery.trim() && Object.keys(filteredInterests).length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No interests found matching "{searchQuery}"
            </p>
          </div>
        )}

        {/* Selected Interests Summary */}
        {selectedInterests.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              Your Selected Interests
            </h4>
            <div className="flex flex-wrap gap-2 p-4 bg-accent/5 rounded-lg border border-accent/20">
              {selectedInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant="accent"
                  className="cursor-pointer"
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                  <span className="ml-1 text-xs">×</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="flex-1 h-12"
            type="button"
            onClick={() => router.push('/onboarding/complete')}
          >
            Skip for Now
          </Button>
          <Button 
            type="submit"
            disabled={!isFormValid}
            className="flex-1 h-12"
          >
            Continue ({selectedInterests.length}/3+ selected)
          </Button>
        </div>
      </form>
    </Card>
  );
} 