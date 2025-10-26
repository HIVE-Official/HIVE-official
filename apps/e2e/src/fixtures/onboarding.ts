import type { OnboardingProgressSnapshot, OnboardingSubmissionDto } from "@core";

interface ProgressStoreEntry {
  submission: OnboardingSubmissionDto;
  stepsCompleted: string[];
  lastUpdated: string;
}

const store = new Map<string, ProgressStoreEntry>();

const emptySubmission: OnboardingSubmissionDto = {
  personalInfo: {},
  academicInfo: {},
  socialInfo: {},
  interests: [],
  clubs: [],
  residentialSelection: null,
  leadership: { isLeader: false, spaces: [], classCodes: [] },
  consentGiven: false,
  handle: ""
};

export const onboardingStore = {
  get(profileId: string): OnboardingProgressSnapshot | null {
    const entry = store.get(profileId);
    if (!entry) return null;
    return {
      profileId,
      partialSubmission: entry.submission,
      stepsCompleted: entry.stepsCompleted,
      lastUpdated: entry.lastUpdated
    };
  },
  saveStep(profileId: string, stepId: string, partial: Partial<OnboardingSubmissionDto>): ProgressStoreEntry {
    const previous = store.get(profileId) ?? {
      submission: structuredClone(emptySubmission),
      stepsCompleted: [],
      lastUpdated: new Date().toISOString()
    };
    const mergedSubmission = {
      ...previous.submission,
      ...partial,
      leadership: {
        isLeader: partial.leadership?.isLeader ?? previous.submission.leadership?.isLeader ?? false,
        spaces: partial.leadership?.spaces ?? previous.submission.leadership?.spaces ?? [],
        classCodes: partial.leadership?.classCodes ?? previous.submission.leadership?.classCodes ?? []
      }
    } as OnboardingSubmissionDto;

    const stepsCompleted = previous.stepsCompleted.includes(stepId)
      ? previous.stepsCompleted
      : [...previous.stepsCompleted, stepId];

    const entry: ProgressStoreEntry = {
      submission: mergedSubmission,
      stepsCompleted,
      lastUpdated: new Date().toISOString()
    };
    store.set(profileId, entry);
    return entry;
  },
  reset(profileId: string) {
    store.delete(profileId);
  }
};
