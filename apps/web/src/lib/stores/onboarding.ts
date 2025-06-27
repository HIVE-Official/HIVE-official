import { create } from 'zustand';
import type { OnboardingData } from '@hive/core';
import { logger } from '@hive/core';

interface OnboardingStore {
  data: Partial<OnboardingData> | null;
  update: (newData: Partial<OnboardingData>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  data: null,
  update: (newData) => set((state) => {
    const updatedData = { ...state.data, ...newData };
    logger.info('Updating onboarding data:', updatedData);
    return { data: updatedData };
  }),
  reset: () => {
    logger.info('Resetting onboarding data');
    set({ data: null });
  }
})); 