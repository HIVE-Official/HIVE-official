import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Search, ChevronDown, Check, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, Select, Card } from "@hive/ui";
import { UB_MAJORS } from "@hive/core";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveAcademicsStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

type AcademicLevel = 'undergraduate' | 'graduate' | 'doctoral';

export function HiveAcademicsStep({
  data,
  updateData,
  onNext,
}: HiveAcademicsStepProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel | null>(null);
  const [showValidationError, setShowValidationError] = useState(false);

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 7 }, (_, i) => (currentYear + i).toString().slice(-2));
  const yearOptions = graduationYears.map(year => ({ value: `'${year}`, label: `'${year}` }));

  // Filter majors based on academic level and search query
  const filteredMajors = UB_MAJORS.filter((major) => {
    const matchesSearch = major.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      major.school.toLowerCase().includes(searchQuery.toLowerCase());
    
    // For now, show all majors regardless of level - can be enhanced later with level-specific filtering
    return matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!academicLevel) {
      setShowValidationError(true);
      return;
    }
    if (data.major && academicLevel) {
      onNext();
    }
  };

  const selectMajor = (major: string) => {
    updateData({ major });
    setShowDropdown(false);
    setSearchQuery("");
  };

  const selectedMajorInfo = UB_MAJORS.find((m) => m.name === data.major);

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
          <GraduationCap className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            Tell us about your academics
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-2">
            This helps us connect you with the right Spaces and classmates.
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
        {/* Academic Level Selection - FIRST */}
        <div className="space-y-[var(--hive-spacing-3)]">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            Academic Level <span className="text-[var(--hive-brand-primary)]">*</span>
          </label>
          <div className="grid grid-cols-3 gap-[var(--hive-spacing-3)]">
            {[
              { value: 'undergraduate', label: 'Undergraduate', icon: '🎓' },
              { value: 'graduate', label: 'Graduate', icon: '📚' },
              { value: 'doctoral', label: 'Doctoral', icon: '🔬' }
            ].map((level) => (
              <motion.button
                key={level.value}
                type="button"
                onClick={() => {
                  setAcademicLevel(level.value as AcademicLevel);
                  setShowValidationError(false);
                }}
                className={cn(
                  "relative p-4 rounded-xl border transition-all duration-200 text-center hover:scale-[1.02] active:scale-[0.98]",
                  academicLevel === level.value
                    ? "bg-[var(--hive-brand-primary)]/20 border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]"
                    : "bg-[var(--hive-background-secondary)]/40 border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:border-[var(--hive-brand-primary)]/50"
                )}
                // Removed whileHover and whileTap - using CSS hover/active states
              >
                <div className="text-lg mb-1">{level.icon}</div>
                <div className="text-sm font-medium">{level.label}</div>
                {academicLevel === level.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-[var(--hive-text-inverse)]" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Validation Error */}
          <AnimatePresence>
            {showValidationError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[var(--hive-status-error)] text-sm flex items-center gap-2"
              >
                <span className="text-[var(--hive-status-error)]">⚠️</span>
                Please select your academic level to continue
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Major Selection using HiveInput */}
        <div className="space-y-[var(--hive-spacing-3)]">
          <Input
            label="Major *"
            placeholder="Search for your major..."
            value={data.major || searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              if (data.major) {
                // If they start typing, clear the selected major
                updateData({ major: "" });
                setSearchQuery(value);
              } else {
                setSearchQuery(value);
              }
              setShowDropdown(value.length > 0);
            }}
            onFocus={() => {
              setFocusedField("major");
              if (!data.major && searchQuery.length > 0) setShowDropdown(true);
            }}
            onBlur={() => {
              setFocusedField(null);
              setTimeout(() => setShowDropdown(false), 200);
            }}
            variant="premium"
            size="lg"
            floatingLabel={false}
            leftIcon={<Search className="w-4 h-4" />}
            onClear={() => {
              updateData({ major: "" });
              setSearchQuery("");
              setShowDropdown(false);
            }}
            className="w-full"
          />

          {/* Dropdown */}
          <AnimatePresence>
            {showDropdown && searchQuery.length > 0 && filteredMajors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative z-50"
              >
                <div className="absolute w-full mt-2 max-h-60 overflow-y-auto bg-[var(--hive-background-primary)] border-2 border-[var(--hive-brand-primary)]/30 rounded-xl shadow-2xl backdrop-blur-md">
                  {filteredMajors.map((major, index) => (
                    <motion.button
                      key={major.name}
                      type="button"
                      onClick={() => selectMajor(major.name)}
                      className="w-full text-left px-4 py-3 hover:bg-[var(--hive-brand-primary)]/10 text-[var(--hive-text-primary)] transition-all duration-200 border-b border-[var(--hive-border-primary)]/20 last:border-b-0 hover:border-[var(--hive-brand-primary)]/30"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4, backgroundColor: "var(--hive-brand-primary, #D4AF37)/10" }}
                    >
                      <div className="font-medium text-sm text-[var(--hive-text-primary)]">{major.name}</div>
                      <div className="text-xs text-[var(--hive-brand-primary)]">{major.school}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected Major Info */}
          {selectedMajorInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-[var(--hive-text-secondary)] flex items-center gap-[var(--hive-spacing-2)]"
            >
              <Check className="w-4 h-4 text-[var(--hive-status-success)]" />
              <span>{selectedMajorInfo.school}</span>
            </motion.div>
          )}
        </div>

        {/* Graduation Year using HiveSelect */}
        <div className="space-y-[var(--hive-spacing-3)]">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">Expected Graduation Year</label>
          <div className="relative">
            <select
              value={data.graduationYear ? `'${data.graduationYear.toString().slice(-2)}` : ""}
              onChange={(e) => {
                const year = e.target.value.replace("'", "");
                const fullYear = parseInt(`20${year}`);
                updateData({ graduationYear: fullYear });
              }}
              className="w-full bg-[var(--hive-background-secondary)]/40 backdrop-blur-sm border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-primary)] rounded-xl px-4 py-3 pr-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/50 focus:border-[var(--hive-brand-primary)]/50 appearance-none"
            >
              <option value="" disabled className="bg-[var(--hive-background-primary)] text-[var(--hive-text-muted)]">
                Select graduation year
              </option>
              {yearOptions.map((year) => (
                <option key={year.value} value={year.value} className="bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
                  {year.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[var(--hive-text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Academic Insights */}
        {data.major && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card 
              variant="elevated"
              className="p-[var(--hive-spacing-4)]"
            >
              <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-[var(--hive-spacing-3)] flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-[var(--hive-brand-primary)]" />
                Your Academic Journey
              </h4>
              <div className="space-y-[var(--hive-spacing-2)] text-xs text-[var(--hive-text-muted)]">
                <div className="flex items-center gap-[var(--hive-spacing-2)]">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>Connect with {data.major} students</span>
                </div>
                <div className="flex items-center gap-[var(--hive-spacing-2)]">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>Join relevant study groups and project teams</span>
                </div>
                <div className="flex items-center gap-[var(--hive-spacing-2)]">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>Discover career-focused communities</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
}