import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, Badge, Card } from "@hive/ui";
import { INTEREST_CATEGORIES, type InterestCategory } from "@/constants/interests";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveInterestsStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

export function HiveInterestsStep({
  data,
  updateData,
  onNext,
}: HiveInterestsStepProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const selectedInterests = data.interests || [];

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
    const currentInterests = data.interests || [];
    if (currentInterests.includes(interest)) {
      updateData({ interests: currentInterests.filter(i => i !== interest) });
    } else {
      updateData({ interests: [...currentInterests, interest] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Interests are optional, allow proceeding with any number
    onNext();
  };

  const handleSkip = () => {
    updateData({ interests: [] });
    onNext();
  };

  const isMinimumMet = selectedInterests.length >= 3;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-[var(--hive-spacing-8)] py-[var(--hive-spacing-6)]"
    >
      {/* Header */}
      <div className="text-center space-y-[var(--hive-spacing-4)]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-[var(--hive-brand-primary)]/20 backdrop-blur-xl rounded-full flex items-center justify-center"
        >
          <Heart className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            What interests you?
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-2">
            Help us connect you with relevant communities (optional)
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-[var(--hive-spacing-6)]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Search */}
        <div className="space-y-[var(--hive-spacing-3)]">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search interests..."
              className="pl-10 h-12"
              variant="premium"
              size="lg"
            />
          </div>
        </div>

        {/* Selected Count */}
        <div className="text-center">
          <span className="text-sm text-[var(--hive-text-secondary)]">
            {selectedInterests.length} interests selected
          </span>
          {selectedInterests.length < 3 && (
            <span className="ml-2 text-sm text-[var(--hive-brand-primary)] font-medium">
              (Select at least 3 for better matching)
            </span>
          )}
        </div>

        {/* Interest Categories */}
        <div className="space-y-[var(--hive-spacing-6)] max-h-80 overflow-y-auto">
          {Object.entries(filteredInterests).map(([category, interests]) => (
            <div key={category} className="space-y-[var(--hive-spacing-3)]">
              <h3 className="text-sm font-semibold text-[var(--hive-text-primary)] border-b border-[var(--hive-border-primary)] pb-1">
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
                    className="cursor-pointer transition-all hover:scale-105 text-xs py-1.5 px-3"
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
            <p className="text-[var(--hive-text-secondary)]">
              No interests found matching "{searchQuery}"
            </p>
          </div>
        )}

        {/* Selected Interests Summary */}
        {selectedInterests.length > 0 && (
          <div className="space-y-[var(--hive-spacing-3)]">
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">
              Your Selected Interests
            </h4>
            <div className="flex flex-wrap gap-2 p-4 bg-[var(--hive-brand-primary)]/5 rounded-lg border border-[var(--hive-brand-primary)]/20">
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
          <button
            type="button"
            onClick={handleSkip}
            className="flex-1 px-6 py-3 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)] rounded-xl hover:bg-[var(--hive-background-secondary)]/50 transition-colors"
          >
            Skip for now
          </button>
          <button
            type="submit"
            className={cn(
              "flex-1 px-6 py-3 rounded-xl font-medium transition-colors",
              isMinimumMet 
                ? "bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-brand-primary)]/90"
                : "bg-[var(--hive-brand-primary)]/60 text-[var(--hive-text-inverse)] hover:bg-[var(--hive-brand-primary)]/70"
            )}
          >
            Continue{selectedInterests.length > 0 ? ` (${selectedInterests.length} selected)` : ""}
          </button>
        </div>

        {!isMinimumMet && selectedInterests.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[var(--hive-text-muted)] text-center"
          >
            Add {3 - selectedInterests.length} more interests for better community matching
          </motion.p>
        )}
      </motion.form>
    </motion.div>
  );
}