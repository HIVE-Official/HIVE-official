// In-memory onboarding catalog store (dev-friendly)
// Admin API updates mutate this singleton; resets on server restart.

import { UB_UNDERGRADUATE_MAJORS, UB_GRADUATE_PROGRAMS, UB_INTEREST_CATEGORIES } from "@hive/core";

export type InterestCategory = {
  id: string;
  title: string;
  icon?: string;
  items: string[];
};

export type OnboardingCatalog = {
  majors: string[];
  yearRange: { startYear: number; endYear: number };
  interests: InterestCategory[];
  graduatePrograms?: string[];
};

function createDefaultCatalog(): OnboardingCatalog {
  const currentYear = new Date().getFullYear();
  return {
    majors: [...UB_UNDERGRADUATE_MAJORS],
    yearRange: { startYear: currentYear, endYear: currentYear + 6 },
    interests: UB_INTEREST_CATEGORIES.map(({ id, title, icon, items }) => ({
      id,
      title,
      icon,
      items: [...items],
    })),
    graduatePrograms: [...UB_GRADUATE_PROGRAMS],
  };
}

// Multi-campus catalog map; key is campusId (e.g., 'ub').
// 'default' campus acts as a fallback.
const catalogs = new Map<string, OnboardingCatalog>();
catalogs.set('default', createDefaultCatalog());

function ensureCampus(campusId?: string | null): string {
  const id = (campusId || '').trim().toLowerCase() || 'default';
  if (!catalogs.has(id)) catalogs.set(id, createDefaultCatalog());
  return id;
}

export function getCatalog(campusId?: string | null): OnboardingCatalog {
  const id = ensureCampus(campusId);
  return catalogs.get(id)!;
}

export function setCatalog(campusId: string | null | undefined, next: Partial<OnboardingCatalog>): OnboardingCatalog {
  const id = ensureCampus(campusId);
  const current = catalogs.get(id)!;
  const merged: OnboardingCatalog = {
    majors: next.majors ? [...next.majors] : [...current.majors],
    yearRange: next.yearRange ? next.yearRange : current.yearRange,
    interests: next.interests
      ? next.interests.map((category) => ({
          ...category,
          items: [...category.items],
        }))
      : current.interests.map((category) => ({ ...category, items: [...category.items] })),
    graduatePrograms: next.graduatePrograms
      ? [...next.graduatePrograms]
      : current.graduatePrograms
      ? [...current.graduatePrograms]
      : [],
  };
  catalogs.set(id, merged);
  return merged;
}

export function resetCatalog(campusId?: string | null): OnboardingCatalog {
  const id = ensureCampus(campusId);
  const fresh = createDefaultCatalog();
  catalogs.set(id, fresh);
  return fresh;
}
