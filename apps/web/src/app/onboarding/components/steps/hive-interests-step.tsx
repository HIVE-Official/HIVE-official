import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { HiveCard } from "@hive/ui";
import { UB_INTEREST_CATEGORIES } from "@hive/core";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveInterestsStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

const DEFAULT_INTEREST_CATEGORIES: Array<{ id: string; title: string; icon?: string; interests: string[] }> =
  UB_INTEREST_CATEGORIES.map(({ id, title, icon, items }) => ({
    id,
    title,
    icon,
    interests: items,
  }));

export function HiveInterestsStep({ data, updateData }: HiveInterestsStepProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(data.interests || []);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(() => {
    const first = DEFAULT_INTEREST_CATEGORIES[0]?.id;
    return first ? [first] : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [serverCategories, setServerCategories] = useState<Array<{ id: string; title: string; icon?: string; interests: string[] }> | null>(null);

  // Resolve campusId from Start flow session or fallback
  function resolveCampusId(): string | null {
    try {
      const raw = window.sessionStorage.getItem('start.campus');
      if (!raw) return null;
      const campus = JSON.parse(raw);
      return campus?.id || null;
    } catch {
      return null;
    }
  }

  // Load server-controlled interests if available
  useEffect(() => {
    let mounted = true;
    const campusId = resolveCampusId();
    const qs = campusId ? `?campusId=${encodeURIComponent(campusId)}` : '';
    fetch(`/api/onboarding/catalog${qs}`, { credentials: 'include' })
      .then(r => r.json())
      .then(json => {
        const interests = (json?.data?.interests || json?.interests) as Array<{
          id: string;
          title: string;
          icon?: string;
          items?: string[];
          interests?: string[];
        }> | undefined;
        if (mounted && interests && interests.length) {
          setServerCategories(
            interests.map((c) => ({
              id: c.id,
              title: c.title,
              icon: c.icon,
              interests: Array.isArray(c.items) ? c.items : Array.isArray(c.interests) ? c.interests : [],
            }))
          );
        }
      })
      .catch(() => {})
    return () => { mounted = false; };
  }, []);

  const CATEGORIES = serverCategories ?? DEFAULT_INTEREST_CATEGORIES;

  // Update parent data when interests change
  useEffect(() => {
    updateData({ interests: selectedInterests });
  }, [selectedInterests, updateData]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else if (prev.length < 6) { // Max 6 interests
        return [...prev, interest];
      }
      return prev;
    });
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Filter interests based on search
  const getFilteredInterests = (interests: string[]) => {
    if (!searchTerm.trim()) return interests;
    return interests.filter(interest =>
      interest.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Behavioral Psychology: Progress visualization to encourage 70% completion
  const progressPercentage = Math.min((selectedInterests.length / 6) * 100, 100);
  const isOptimalRange = selectedInterests.length >= 3 && selectedInterests.length <= 6;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-[var(--hive-spacing-6)] py-[var(--hive-spacing-4)] max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center space-y-[var(--hive-spacing-3)]">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">
            Dial in your vibe
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-2">
            Pick 3-6 signals so Tonight @ UB ships the right energy.
          </p>
        </motion.div>
      </div>

      {/* Progress & Count */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <HiveCard className="p-[var(--hive-spacing-4)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[var(--hive-text-primary)]">
              {selectedInterests.length} / 6 locked
            </span>
            <div className={cn(
              "text-xs px-2 py-1 rounded-full transition-colors",
              isOptimalRange
                ? "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)]"
                : "bg-[var(--hive-background-tertiary)]/20 text-[var(--hive-text-muted)]"
            )}>
              {selectedInterests.length < 3 ? `${3 - selectedInterests.length} more to unlock`
               : selectedInterests.length === 6 ? 'Maxed out'
               : 'Looking good'}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[var(--hive-background-tertiary)]/20 rounded-full h-2">
            <motion.div
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                isOptimalRange
                  ? "bg-[var(--hive-status-success)]"
                  : "bg-[var(--hive-brand-primary)]/50"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${(selectedInterests.length / 6) * 100}%` }}
            />
          </div>
        </HiveCard>
      </motion.div>

      {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="Search interests"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-xl bg-[var(--hive-background-secondary)]/20 border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)]/50 focus:ring-1 focus:ring-[var(--hive-brand-primary)]/20 transition-all"
          />
        </motion.div>

      {/* Interest Categories */}
      <div className="space-y-[var(--hive-spacing-4)]">
        {CATEGORIES.map((category, categoryIndex) => {
          const filteredInterests = getFilteredInterests(category.interests);
          const isExpanded = expandedCategories.includes(category.id);
          const hasSearchResults = searchTerm.trim() ? filteredInterests.length > 0 : true;

          if (!hasSearchResults) return null;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + categoryIndex * 0.05 }}
            >
              <HiveCard className="overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-[var(--hive-spacing-4)] flex items-center justify-between hover:bg-[var(--hive-background-secondary)]/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{category.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-[var(--hive-text-primary)]">
                        {category.title}
                      </h3>
                      <p className="text-xs text-[var(--hive-text-muted)]">
                        {filteredInterests.length} picks
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-[var(--hive-text-muted)]" />
                  </motion.div>
                </button>

                {/* Interest Chips */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-[var(--hive-spacing-4)] pt-0">
                        <div className="flex flex-wrap gap-2">
                          {filteredInterests.map((interest, index) => {
                            const isSelected = selectedInterests.includes(interest);
                            const canSelect = !isSelected && selectedInterests.length < 6;

                            return (
                              <motion.button
                                key={interest}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.02 }}
                                onClick={() => toggleInterest(interest)}
                                disabled={!isSelected && selectedInterests.length >= 6}
                                className={cn(
                                  "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
                                  "hover:scale-105 active:scale-95",
                                  isSelected
                                    ? "bg-[var(--hive-brand-primary)] text-black shadow-md"
                                    : canSelect
                                      ? "bg-[var(--hive-background-secondary)]/20 border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/50"
                                      : "bg-[var(--hive-background-tertiary)]/10 border border-[var(--hive-border-primary)]/10 text-[var(--hive-text-muted)] cursor-not-allowed opacity-50"
                                )}
                              >
                                {interest}
                                {isSelected && (
                                  <CheckCircle className="w-3 h-3" />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </HiveCard>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Interests Summary */}
      {selectedInterests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <HiveCard className="p-[var(--hive-spacing-4)]">
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3 flex items-center">
              <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full mr-2" />
              Selected
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-2 py-1 bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] rounded-full text-xs font-medium"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </HiveCard>
        </motion.div>
      )}

      {/* Behavioral Encouragement */}
      {selectedInterests.length > 0 && selectedInterests.length < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm text-[var(--hive-text-muted)]">
            Add {3 - selectedInterests.length} more to unlock the Continue button.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
