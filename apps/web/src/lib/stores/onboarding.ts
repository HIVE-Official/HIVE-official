import { create } from "zustand";
import type { OnboardingState } from "@hive/core";
import { logger } from "@hive/core";

interface OnboardingStore {
  data: Partial<OnboardingState> | null;
  update: (newData: Partial<OnboardingState>) => void;
  reset: () => void;
  setStudentLeader: (isLeader: boolean) => void;
  addSpaceClaim: (claim: any) => void;
  setVerificationLevel: (
    level: "verified" | "verified+" | "faculty" | "alumni"
  ) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set, _get) => ({
  data: null,

  update: (newData) =>
    set((state) => {
      const updatedData = { ...state.data, ...newData };
      logger.info("Updating onboarding data:", updatedData);
      return { data: updatedData };
    }),

  reset: () => {
    logger.info("Resetting onboarding data");
    set({ data: null });
  },

  setStudentLeader: (isLeader) =>
    set((state) => {
      const updatedData = {
        ...state.data,
        isStudentLeader: isLeader,
        // Student leaders are automatically builders
        builderOptIn: isLeader,
        // Student leaders start as verified, upgrade to verified+ after manual review
        verificationLevel: "verified" as const,
      };
      logger.info(`Set student leader status: ${isLeader}`, updatedData);
      return { data: updatedData };
    }),

  addSpaceClaim: (claim) =>
    set((state) => {
      const currentClaims = state.data?.spaceClaims || [];
      const updatedData = {
        ...state.data,
        spaceClaims: [...currentClaims, claim],
      };
      logger.info("Added space claim:", claim);
      return { data: updatedData };
    }),

  setVerificationLevel: (level) =>
    set((state) => {
      const updatedData = {
        ...state.data,
        verificationLevel: level,
      };
      logger.info(`Set verification level: ${level}`);
      return { data: updatedData };
    }),
}));
