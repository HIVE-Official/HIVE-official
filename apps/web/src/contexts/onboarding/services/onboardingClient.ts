// Bounded Context Owner: Identity & Access Management Guild
import type {
  OnboardingSubmissionDto,
  OnboardingProgressSnapshot
} from "@core";

export interface SaveProgressRequest {
  readonly profileId: string;
  readonly stepId: string;
  readonly partialSubmission: Partial<OnboardingSubmissionDto>;
}

export interface SaveProgressResponse {
  readonly profileId: string;
  readonly stepsCompleted: readonly string[];
  readonly lastUpdated: string;
}

export interface CompleteOnboardingResponse {
  readonly profileId: string;
  readonly campusId: string;
  readonly onboardingCompletedAt: string;
  readonly session: {
    readonly sessionId: string;
    readonly issuedAt: string;
    readonly expiresAt: string;
  };
  readonly domainEvents: readonly unknown[];
  readonly defaultSpaces: readonly { readonly id: string; readonly name: string }[];
  readonly cohortSpaces: readonly { readonly id: string; readonly name: string }[];
}

const jsonHeaders = {
  "Content-Type": "application/json"
};

const parseJson = async <T>(response: Response): Promise<T> => {
  const text = await response.text();
  if (!text) {
    throw new Error("Empty response");
  }
  return JSON.parse(text) as T;
};

export const onboardingClient = {
  async getProgress(profileId: string): Promise<OnboardingProgressSnapshot | null> {
    const response = await globalThis.fetch(`/api/onboarding/progress?profileId=${profileId}`, {
      method: "GET"
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to load onboarding progress");
    }

    const snapshot = await parseJson<OnboardingProgressSnapshot>(response);

    return {
      ...snapshot,
      lastUpdated: new Date(snapshot.lastUpdated)
    };
  },

  async saveProgress(payload: SaveProgressRequest): Promise<SaveProgressResponse> {
    const response = await globalThis.fetch("/api/onboarding/progress", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to save onboarding progress");
    }

    return parseJson<SaveProgressResponse>(response);
  },

  async completeOnboarding(
    payload: CompleteOnboardingRequest
  ): Promise<CompleteOnboardingResponse> {
    const response = await globalThis.fetch("/api/onboarding/complete", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to complete onboarding");
    }

    return parseJson<CompleteOnboardingResponse>(response);
  }
};

export interface CompleteOnboardingRequest {
  readonly profileId: string;
  readonly submission: OnboardingSubmissionDto;
}
