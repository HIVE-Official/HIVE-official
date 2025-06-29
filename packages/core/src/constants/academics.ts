import type { AcademicLevel } from "../types/onboarding";

export const ACADEMIC_LEVELS: { value: AcademicLevel; label: string }[] = [
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate" },
  { value: "phd", label: "Ph.D." },
];

export const GRADUATION_YEARS = Array.from(
  { length: 8 },
  (_, i) => new Date().getFullYear() + i
);
