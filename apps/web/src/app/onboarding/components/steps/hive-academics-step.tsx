import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HiveCard,
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@hive/ui";
import { Skeleton, LiveRegion } from "@hive/ui";
import type {
  AcademicLevel,
  HiveOnboardingData,
  LivingSituation,
} from "../hive-onboarding-wizard";

interface HiveAcademicsStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

const FALLBACK_MAJORS = [
  "Computer Science",
  "Business Administration",
  "Biology",
  "Psychology",
  "Mechanical Engineering",
  "Nursing",
];

export function HiveAcademicsStep({
  data,
  updateData,
  onNext,
}: HiveAcademicsStepProps) {
  const [isMajorPickerOpen, setIsMajorPickerOpen] = useState(false);
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel | null>(
    data.academicLevel ?? null
  );
  const [showValidationError, setShowValidationError] = useState(false);
  const [bio, setBio] = useState(data.bio ?? "");
  const [livingSituation, setLivingSituation] = useState<LivingSituation | null>(
    data.livingSituation ?? null
  );

  const currentYear = new Date().getFullYear();
  const [catalog, setCatalog] = useState<null | { majors?: string[]; yearRange?: { startYear: number; endYear: number } }>(null);
  const [isCatalogLoading, setIsCatalogLoading] = useState<boolean>(true);
  const [a11yMessage, setA11yMessage] = useState<string | null>(null);

  const academicLevelOptions: Array<{ value: AcademicLevel; label: string; icon: string }> = [
    { value: "undergraduate", label: "Undergraduate", icon: "🎓" },
    { value: "graduate", label: "Graduate", icon: "📚" },
    { value: "doctoral", label: "Doctoral", icon: "🔬" },
  ];

  const livingSituationOptions: Array<{
    value: LivingSituation;
    label: string;
    icon: string;
    desc: string;
  }> = [
    { value: "on-campus", label: "On-campus", icon: "🏫", desc: "Dorms & residence halls" },
    { value: "off-campus", label: "Off-campus", icon: "🏠", desc: "Apartments & houses" },
    { value: "commuter", label: "Commuter", icon: "🚗", desc: "Living at home" },
    { value: "not-sure", label: "Not sure yet", icon: "🤔", desc: "Still deciding" },
  ];

  // Attempt to load server-controlled majors and year range
  useEffect(() => {
    let mounted = true;
    const campusId = (() => {
      try {
        const raw = window.sessionStorage.getItem('start.campus');
        if (!raw) return null;
        const campus = JSON.parse(raw);
        return campus?.id || null;
      } catch { return null; }
    })();
    const qs = campusId ? `?campusId=${encodeURIComponent(campusId)}` : '';
    setIsCatalogLoading(true);
    setA11yMessage('Loading majors from catalog');
    fetch(`/api/onboarding/catalog${qs}`, { credentials: 'include' })
      .then(r => r.json())
      .then(json => {
        const d = json?.data || json;
        if (mounted) {
          setCatalog({ majors: d?.majors, yearRange: d?.yearRange });
          setA11yMessage('Majors loaded');
        }
      })
      .catch(() => { if (mounted) setA11yMessage('Using fallback majors'); })
      .finally(() => { if (mounted) setIsCatalogLoading(false); });
    return () => { mounted = false; };
  }, []);

  const majorCatalog = useMemo(() => {
    const source = catalog?.majors && catalog.majors.length ? catalog.majors : FALLBACK_MAJORS;
    return Array.from(new Set(source)).sort((a, b) => a.localeCompare(b));
  }, [catalog?.majors]);

  const majorGroups = useMemo(() => {
    return majorCatalog.reduce<Array<{ heading: string; majors: string[] }>>((groups, major) => {
      const letter = major.charAt(0).toUpperCase();
      const existing = groups.find((group) => group.heading === letter);
      if (existing) {
        existing.majors.push(major);
      } else {
        groups.push({ heading: letter, majors: [major] });
      }
      return groups;
    }, []).map((group) => ({
      heading: group.heading,
      majors: group.majors.sort((a, b) => a.localeCompare(b)),
    }));
  }, [majorCatalog]);

  const yrStart = catalog?.yearRange?.startYear ?? currentYear;
  const yrEnd = catalog?.yearRange?.endYear ?? (currentYear + 6);
  const yearOptions = Array.from({ length: Math.max(1, yrEnd - yrStart + 1) }, (_, i) => {
    const full = yrStart + i;
    const short = String(full).slice(-2);
    return { value: `'${short}`, label: `'${short}` };
  });

  const handleAcademicLevelSelect = (level: AcademicLevel) => {
    setAcademicLevel(level);
    setShowValidationError(false);
    updateData({ academicLevel: level });
  };

  const handleLivingSituationSelect = (value: LivingSituation) => {
    setLivingSituation(value);
    updateData({ livingSituation: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    setIsMajorPickerOpen(false);
  };

  const selectedMajorName = data.major ?? "";

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-[var(--hive-spacing-8)] py-[var(--hive-spacing-6)]"
    >
      {/* Screen-reader announcements for async loading */}
      <LiveRegion message={a11yMessage} politeness="polite" className="sr-only" />
      {/* Header */}
      <div className="text-center space-y-[var(--hive-spacing-3)]">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">
            Academics & bio
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-2">
            Lock in your major, year, and living setup so the UB feed feels as sharp as you are.
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
            Academic Level{" "}
            <span className="text-[var(--hive-brand-primary)]">*</span>
          </label>
          <div className="grid grid-cols-3 gap-[var(--hive-spacing-3)]">
            {academicLevelOptions.map((level) => (
              <motion.button
                key={level.value}
                type="button"
                onClick={() => handleAcademicLevelSelect(level.value)}
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
                    <Check className="w-3 h-3 text-white" />
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

        {/* Major Selection using Input */}
        <div className="space-y-[var(--hive-spacing-3)]">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            Major <span className="text-[var(--hive-brand-primary)]">*</span>
          </label>
          {isCatalogLoading ? (
            <div className="space-y-3" role="status" aria-live="polite">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
          <button
            type="button"
            onClick={() => setIsMajorPickerOpen(true)}
            className={cn(
              "w-full rounded-xl border border-[var(--hive-border-primary)]/40 bg-[linear-gradient(140deg,rgba(255,255,255,0.03),rgba(11,12,18,0.9))]",
              "px-4 py-3 text-left transition hover:border-[var(--hive-brand-primary)]/50 hover:shadow-[0_12px_36px_rgba(14,16,24,0.45)]",
              "flex items-center justify-between gap-3 text-sm text-[var(--hive-text-primary)]"
            )}
            aria-haspopup="dialog"
            aria-expanded={isMajorPickerOpen}
          >
            <div>
              <div className="font-medium">
                {selectedMajorName || "Search majors"}
              </div>
              <div className="text-xs text-[var(--hive-text-muted)]">
                {selectedMajorName ? "Tap to switch" : "Pull from the official UB catalog"}
              </div>
            </div>
            <Search className="h-4 w-4 text-[var(--hive-text-muted)]" aria-hidden />
          </button>
          )}

          <CommandDialog open={isMajorPickerOpen} onOpenChange={setIsMajorPickerOpen}>
            <Command>
              <CommandInput placeholder="Search majors..." autoFocus />
              <CommandList>
                <CommandEmpty>Nothing matched. Try another keyword.</CommandEmpty>
                {majorGroups.map((group) => (
                  <CommandGroup key={group.heading} heading={group.heading}>
                    {group.majors.map((major) => (
                      <CommandItem
                        key={major}
                        value={major}
                        onSelect={selectMajor}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span>{major}</span>
                          {selectedMajorName === major && (
                            <Check className="h-4 w-4 text-[var(--hive-brand-primary)]" aria-hidden />
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </CommandDialog>

          {selectedMajorName && !isCatalogLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-[var(--hive-text-secondary)] flex items-center gap-[var(--hive-spacing-2)]"
            >
              <Check className="w-4 h-4 text-[var(--hive-status-success)]" />
              <span>{selectedMajorName}</span>
            </motion.div>
          )}
        </div>

        {/* Graduation Year using HiveSelect */}
        <div className="space-y-[var(--hive-spacing-3)]">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            Expected Graduation Year
          </label>
          <div className="relative">
            <select
              value={
                data.graduationYear
                  ? `'${data.graduationYear.toString().slice(-2)}`
                  : ""
              }
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const year = event.target.value.replace("'", "");
                const fullYear = parseInt(`20${year}`);
                updateData({ graduationYear: fullYear });
              }}
              className="w-full bg-[var(--hive-background-secondary)]/40 backdrop-blur-sm border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-primary)] rounded-xl px-4 py-3 pr-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/50 focus:border-[var(--hive-brand-primary)]/50 appearance-none"
            >
              <option
                value=""
                disabled
                className="bg-[var(--hive-background-primary)] text-[var(--hive-text-muted)]"
              >
                Select graduation year
              </option>
              {yearOptions.map((year) => (
                <option
                  key={year.value}
                  value={year.value}
                  className="bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]"
                >
                  {year.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[var(--hive-text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Bio Field (Optional) */}
        <div className="space-y-[var(--hive-spacing-3)]">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            Bio <span className="text-[var(--hive-text-muted)] text-xs">(Optional)</span>
          </label>
          <div className="relative">
            <textarea
              value={bio}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                const value = event.target.value.slice(0, 200);
                setBio(value);
                updateData({ bio: value });
              }}
              placeholder="What brings you to HIVE?"
              className="w-full bg-[var(--hive-background-secondary)]/40 backdrop-blur-sm border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-primary)] rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/50 focus:border-[var(--hive-brand-primary)]/50 resize-none min-h-[100px]"
              rows={3}
            />
            <div className="absolute bottom-3 right-3 text-xs text-[var(--hive-text-muted)]">
              {bio.length}/200
            </div>
          </div>
          <p className="text-xs text-[var(--hive-text-muted)]">
            Share a bit about yourself - your interests, goals, or what you&apos;re looking for in your college experience.
          </p>
        </div>

        {/* Living Situation (Smart Optional) */}
        <div className="space-y-[var(--hive-spacing-3)]">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            Living Situation <span className="text-[var(--hive-text-muted)] text-xs">(Helps with matching)</span>
          </label>
          <div className="grid grid-cols-2 gap-[var(--hive-spacing-3)]">
            {livingSituationOptions.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => handleLivingSituationSelect(option.value)}
                className={cn(
                  "relative p-4 rounded-xl border transition-all duration-200 text-left hover:scale-[1.02] active:scale-[0.98]",
                  livingSituation === option.value
                    ? "bg-[var(--hive-brand-primary)]/20 border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]"
                    : "bg-[var(--hive-background-secondary)]/40 border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:border-[var(--hive-brand-primary)]/50"
                )}
              >
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="text-sm font-medium mb-1">{option.label}</div>
                <div className="text-xs opacity-70">{option.desc}</div>
                {livingSituation === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Academic Insights */}
        {data.major && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <HiveCard className="p-[var(--hive-spacing-4)]">
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
            </HiveCard>
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
}
