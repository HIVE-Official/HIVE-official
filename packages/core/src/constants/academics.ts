import type { AcademicLevel } from "@hive/core";

export const ACADEMIC_LEVELS: { value: AcademicLevel; label: string }[] = [
  { value: "undergraduate", label: "Undergraduate" },
  { value: "masters", label: "Master" },
  { value: "phd", label: "Ph.D." },
];

export const GRADUATION_YEARS = Array.from(
  { length: 8 },
  (_, i) => new Date().getFullYear() + i
);
