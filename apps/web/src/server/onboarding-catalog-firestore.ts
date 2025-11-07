import { dbAdmin } from '@/lib/firebase-admin';
import { isFirebaseAdminConfigured } from '@/lib/env';

export type InterestCategory = { id: string; title: string; items: string[]; icon?: string };
export type OnboardingCatalog = {
  majors: string[];
  yearRange: { startYear: number; endYear: number };
  interests: InterestCategory[];
  graduatePrograms?: string[];
};

const COLLECTION = 'campusCatalogs';

export async function fetchCatalogFromFirestore(campusId: string): Promise<OnboardingCatalog | null> {
  if (!isFirebaseAdminConfigured) return null;
  try {
    const doc = await dbAdmin.collection(COLLECTION).doc(campusId).get();
    if (!doc.exists) return null;
    const data = doc.data() as Partial<OnboardingCatalog> | undefined;
    if (!data) return null;
    // Minimal validation
    return {
      majors: Array.isArray(data.majors) ? (data.majors as string[]) : [],
      yearRange:
        data.yearRange && typeof data.yearRange.startYear === 'number' && typeof data.yearRange.endYear === 'number'
          ? data.yearRange
          : (undefined as any),
      interests: Array.isArray(data.interests)
        ? (data.interests as Array<InterestCategory | { id: string; title: string; items?: string[]; icon?: string; interests?: string[] }>).map(
            ({ id, title, icon, items, interests }) => ({
              id,
              title,
              icon,
              items: Array.isArray(items) ? items : Array.isArray(interests) ? interests : [],
            })
          )
        : [],
      graduatePrograms: Array.isArray(data.graduatePrograms) ? (data.graduatePrograms as string[]) : undefined,
    } as OnboardingCatalog;
  } catch (e) {
    return null;
  }
}

export async function updateCatalogInFirestore(campusId: string, next: Partial<OnboardingCatalog>): Promise<boolean> {
  if (!isFirebaseAdminConfigured) return false;
  try {
    const ref = dbAdmin.collection(COLLECTION).doc(campusId);
    await ref.set({ ...(next as any) }, { merge: true });
    return true;
  } catch (e) {
    return false;
  }
}
