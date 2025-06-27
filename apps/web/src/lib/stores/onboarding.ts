import { create } from 'zustand';
import type { OnboardingData } from '@hive/core';

interface OnboardingStore {
  data: Partial<OnboardingData> | null;
  update: (newData: Partial<OnboardingData>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  data: null,
  update: (newData) => set((state) => ({
    data: { ...state.data, ...newData }
  })),
  reset: () => set({ data: null })
})); 