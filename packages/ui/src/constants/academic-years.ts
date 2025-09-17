export const UB_ACADEMIC_YEARS = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate',
  'PhD',
  'Alumni',
] as const;

export type UBAcademicYear = typeof UB_ACADEMIC_YEARS[number];