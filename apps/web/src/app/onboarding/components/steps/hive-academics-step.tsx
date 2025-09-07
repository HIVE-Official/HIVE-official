import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Check } from "lucide-react";
import { Card } from "@hive/ui";
import { AnimatedDropdown, type DropdownOption } from "@/components/ui/animated-dropdown";
import { UB_MAJORS } from "@/constants/majors";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveAcademicsStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

export function HiveAcademicsStep({
  data,
  updateData,
  onNext,
}: HiveAcademicsStepProps) {
  const [academicLevel, setAcademicLevel] = useState<string>(data.academicLevel || '');
  const [majors, setMajors] = useState<string[]>(data.majors || []);
  const [minor, setMinor] = useState<string>(data.minor || '');
  const [graduationYear, setGraduationYear] = useState<string>(data.graduationYear?.toString() || '');
  const [showValidationError, setShowValidationError] = useState(false);

  // Academic level options
  const academicLevelOptions: DropdownOption[] = [
    { value: 'Freshman', label: 'Freshman', icon: '🎓' },
    { value: 'Sophomore', label: 'Sophomore', icon: '📚' },
    { value: 'Junior', label: 'Junior', icon: '✏️' },
    { value: 'Senior', label: 'Senior', icon: '🎯' },
    { value: 'Graduate Student', label: 'Graduate Student', icon: '🔬' },
  ];

  // Major options from UB_MAJORS
  const majorOptions: DropdownOption[] = UB_MAJORS.map(major => ({
    value: major.name,
    label: major.name,
  }));

  // Minor options (can be same as majors or different)
  const minorOptions: DropdownOption[] = [
    { value: 'None', label: 'No Minor' },
    ...majorOptions,
  ];

  // Graduation year options (starting from 2026)
  const startYear = 2026;
  const graduationYearOptions: DropdownOption[] = Array.from({ length: 7 }, (_, i) => {
    const year = startYear + i;
    return { value: year.toString(), label: year.toString() };
  });

  // Update parent data when values change
  const handleAcademicLevelChange = (value: string | string[]) => {
    const level = Array.isArray(value) ? value[0] : value;
    setAcademicLevel(level);
    updateData({ academicLevel: level });
    setShowValidationError(false);
  };

  const handleMajorsChange = (value: string | string[]) => {
    const newMajors = Array.isArray(value) ? value : [value];
    setMajors(newMajors);
    updateData({ majors: newMajors });
  };

  const handleMinorChange = (value: string | string[]) => {
    const newMinor = Array.isArray(value) ? value[0] : value;
    setMinor(newMinor);
    updateData({ minor: newMinor === 'None' ? undefined : newMinor });
  };

  const handleGraduationYearChange = (value: string | string[]) => {
    const year = Array.isArray(value) ? value[0] : value;
    setGraduationYear(year);
    updateData({ graduationYear: parseInt(year) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!academicLevel) {
      setShowValidationError(true);
      return;
    }
    if (majors.length > 0 && academicLevel) {
      onNext();
    }
  };

  const primaryMajor = majors[0];
  const selectedMajorInfo = primaryMajor ? UB_MAJORS.find((m) => m.name === primaryMajor) : null;

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
        {/* Academic Level Selection */}
        <AnimatedDropdown
          options={academicLevelOptions}
          value={academicLevel}
          onChange={handleAcademicLevelChange}
          placeholder="Select your academic level"
          label="Academic Level"
          required
          error={showValidationError ? "Please select your academic level to continue" : undefined}
        />

        {/* Major Selection */}
        <AnimatedDropdown
          options={majorOptions}
          value={majors}
          onChange={handleMajorsChange}
          placeholder="Select your major(s)"
          label="Major"
          required
          multiple
          searchable
          clearable
        />

        {/* Minor Selection */}
        <AnimatedDropdown
          options={minorOptions}
          value={minor}
          onChange={handleMinorChange}
          placeholder="Enter your minor if applicable"
          label="Minor (optional)"
          searchable
          clearable
        />

        {/* Graduation Year */}
        <AnimatedDropdown
          options={graduationYearOptions}
          value={graduationYear}
          onChange={handleGraduationYearChange}
          placeholder="Select graduation year"
          label="Expected Graduation Year"
        />

        {/* Academic Insights */}
        {majors.length > 0 && (
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
                  <span>Connect with students in {majors.length === 1 ? majors[0] : `${majors.length} different programs`}</span>
                </div>
                <div className="flex items-center gap-[var(--hive-spacing-2)]">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>Join relevant study groups and project teams</span>
                </div>
                <div className="flex items-center gap-[var(--hive-spacing-2)]">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>Discover career-focused communities across your fields</span>
                </div>
                {majors.length > 1 && (
                  <div className="flex items-center gap-[var(--hive-spacing-2)]">
                    <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                    <span>Explore interdisciplinary opportunities with your double/triple major</span>
                  </div>
                )}
              </div>
              
              {/* Selected Major School Info */}
              {selectedMajorInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-4 border-t border-[var(--hive-border-primary)]/20"
                >
                  <div className="text-sm text-[var(--hive-text-secondary)] flex items-center gap-[var(--hive-spacing-2)]">
                    <Check className="w-4 h-4 text-[var(--hive-status-success)]" />
                    <span>Primary: {selectedMajorInfo.school}</span>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full py-3 px-4 bg-[var(--hive-brand-primary)] text-white rounded-xl font-medium hover:bg-[var(--hive-brand-primary)]/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
        </motion.button>
      </motion.form>
    </motion.div>
  );
}