// Bounded Context Owner: Identity & Access Management Guild
import {
  interestOptions,
  majorOptions,
  residentialSpaceOptions,
  type AcademicInfo,
  type AffiliationInfo,
  type InterestOption,
  type MajorOption,
  type OnboardingSubmissionDto,
  type PersonalInfo,
  type PersonalInterest,
  type ResidentialSelection,
  type ResidentialSpaceOption,
  type SocialInfo,
  type UserType
} from "@core";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react";
import type { JSX } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  onboardingClient,
  type CompleteOnboardingResponse
} from "../services/onboardingClient";
import { catalogClient, type CatalogResponse } from "../services/catalogClient";
import {
  createStepDescriptors,
  type OnboardingFieldPath,
  type OnboardingStepDescriptor,
  type OnboardingStepId
} from "../types/steps";

export interface LeadershipDraftSpace {
  readonly id: string;
  readonly name: string;
  readonly campusId?: string;
}

export interface LeadershipDraft {
  readonly isLeader?: boolean;
  readonly spaces?: LeadershipDraftSpace[];
  readonly classCodes?: string[];
}

export interface OnboardingDraft {
  personalInfo?: Partial<PersonalInfo>;
  academicInfo?: Partial<AcademicInfo>;
  socialInfo?: Partial<SocialInfo>;
  affiliation?: Partial<AffiliationInfo>;
  interests?: PersonalInterest[];
  clubs?: string[];
  residentialSelection?: ResidentialSelection;
  handle?: string;
  consentGiven?: boolean;
  leadership?: LeadershipDraft;
}

export interface CatalogOptions {
  readonly majors: MajorOption[];
  readonly interests: InterestOption[];
  readonly residentialSpaces: ResidentialSpaceOption[];
}

interface OnboardingFlowState {
  readonly status: "idle" | "loading" | "ready" | "saving" | "completed" | "error";
  readonly profileId: string | null;
  readonly userType: UserType | null;
  readonly steps: readonly OnboardingStepDescriptor[];
  readonly currentStepIndex: number;
  readonly submission: OnboardingDraft;
  readonly stepsCompleted: readonly string[];
  readonly error?: string;
}

const initialState: OnboardingFlowState = {
  status: "idle",
  profileId: null,
  userType: null,
  steps: [],
  currentStepIndex: 0,
  submission: {},
  stepsCompleted: []
};

interface SetLoadedPayload {
  readonly profileId: string;
  readonly userType: UserType;
  readonly submission: OnboardingDraft;
  readonly stepsCompleted: readonly string[];
  readonly steps: readonly OnboardingStepDescriptor[];
}

type Action =
  | { type: "RESET" }
  | { type: "SET_LOADING"; readonly profileId: string; readonly userType: UserType }
  | { type: "SET_LOADED"; readonly payload: SetLoadedPayload }
  | { type: "SET_ERROR"; readonly error: string }
  | { type: "UPDATE_SUBMISSION"; readonly submission: OnboardingDraft }
  | { type: "SET_STEPS_COMPLETED"; readonly stepsCompleted: readonly string[] }
  | { type: "SET_CURRENT_STEP"; readonly stepId: OnboardingStepId }
  | { type: "SET_STATUS"; readonly status: OnboardingFlowState["status"] };

const reducer = (state: OnboardingFlowState, action: Action): OnboardingFlowState => {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "SET_LOADING":
      return {
        ...state,
        status: "loading",
        profileId: action.profileId,
        userType: action.userType,
        error: undefined
      };
    case "SET_LOADED":
      return {
        ...state,
        status: "ready",
        profileId: action.payload.profileId,
        userType: action.payload.userType,
        submission: action.payload.submission,
        stepsCompleted: action.payload.stepsCompleted,
        steps: action.payload.steps,
        currentStepIndex: 0,
        error: undefined
      };
    case "SET_ERROR":
      return {
        ...state,
        status: "error",
        error: action.error
      };
    case "UPDATE_SUBMISSION":
      return {
        ...state,
        submission: mergeSubmission(state.submission, action.submission)
      };
    case "SET_STEPS_COMPLETED":
      return {
        ...state,
        stepsCompleted: action.stepsCompleted
      };
    case "SET_CURRENT_STEP":
      return {
        ...state,
        currentStepIndex: Math.max(
          0,
          state.steps.findIndex((step) => step.id === action.stepId)
        )
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.status
      };
    default:
      return state;
  }
};

interface OnboardingFlowContextValue {
  readonly state: OnboardingFlowState;
  readonly currentStep: OnboardingStepDescriptor | null;
  readonly catalog: CatalogOptions;
  readonly actions: {
    readonly goToStep: (stepId: OnboardingStepId) => void;
    readonly next: () => void;
    readonly previous: () => void;
    readonly updateField: (path: OnboardingFieldPath, value: unknown) => void;
    readonly saveCurrentStep: () => Promise<void>;
    readonly complete: () => Promise<CompleteOnboardingResponse>;
  };
}

const OnboardingFlowContext = createContext<OnboardingFlowContextValue | null>(null);

export const OnboardingFlowProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: authState, actions: authActions } = useAuth();
  const [catalog, setCatalog] = useState<CatalogResponse>({
    majors: majorOptions,
    interests: interestOptions,
    residentialSpaces: residentialSpaceOptions
  });

  const steps = useMemo(() => {
    if (!authState.userType) {
      return [] as OnboardingStepDescriptor[];
    }

    return createStepDescriptors({
      userType: authState.userType,
      majors: catalog.majors,
      interests: catalog.interests,
      residentialSpaces: catalog.residentialSpaces
    });
  }, [authState.userType, catalog]);

  useEffect(() => {
    let cancelled = false;

    void catalogClient
      .fetchCatalog()
      .then((snapshot) => {
        if (!cancelled) {
          setCatalog(snapshot);
        }
      })
      .catch((error) => {
        globalThis.console.warn("Failed to load catalog, using fallback.", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const loadProgress = useCallback(
    async (profileId: string, userType: UserType) => {
      dispatch({ type: "SET_LOADING", profileId, userType });

      try {
        const existing = await onboardingClient.getProgress(profileId);
        dispatch({
          type: "SET_LOADED",
          payload: {
            profileId,
            userType,
            submission: toDraft(existing?.partialSubmission),
            stepsCompleted: existing?.stepsCompleted ?? [],
            steps
          }
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          error: error instanceof Error ? error.message : "Failed to load onboarding"
        });
      }
    },
    [steps]
  );

  useEffect(() => {
    if (
      authState.status === "onboarding" &&
      authState.profileId &&
      authState.userType &&
      state.status === "idle"
    ) {
      void loadProgress(authState.profileId, authState.userType);
    }
  }, [authState, loadProgress, state.status]);

  const currentStep = state.steps[state.currentStepIndex] ?? null;

  const goToStep = useCallback(
    (stepId: OnboardingStepId) => {
      dispatch({ type: "SET_CURRENT_STEP", stepId });
    },
    []
  );

  const next = useCallback(() => {
    if (state.currentStepIndex < state.steps.length - 1) {
      const nextStep = state.steps[state.currentStepIndex + 1];
      dispatch({ type: "SET_CURRENT_STEP", stepId: nextStep.id });
    }
  }, [state.currentStepIndex, state.steps]);

  const previous = useCallback(() => {
    if (state.currentStepIndex > 0) {
      const prevStep = state.steps[state.currentStepIndex - 1];
      dispatch({ type: "SET_CURRENT_STEP", stepId: prevStep.id });
    }
  }, [state.currentStepIndex, state.steps]);

  const updateField = useCallback(
    (path: OnboardingFieldPath, value: unknown) => {
      dispatch({
        type: "UPDATE_SUBMISSION",
        submission: buildSubmissionPatch(path, value, catalog)
      });
    },
    [catalog]
  );

  const saveCurrentStep = useCallback(async () => {
    if (!state.profileId || !currentStep) {
      return;
    }

    dispatch({ type: "SET_STATUS", status: "saving" });
    try {
      const draft = extractSubmissionForStep(currentStep, state.submission);
      const response = await onboardingClient.saveProgress({
        profileId: state.profileId,
        stepId: currentStep.id,
        partialSubmission: normaliseSubmission(draft)
      });
      dispatch({ type: "SET_STEPS_COMPLETED", stepsCompleted: response.stepsCompleted });
      dispatch({ type: "SET_STATUS", status: "ready" });
      next();
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        error: error instanceof Error ? error.message : "Failed to save progress"
      });
    }
  }, [currentStep, next, state.profileId, state.submission]);

  const complete = useCallback(async () => {
    if (!state.profileId || !authState.userType) {
      throw new Error("Profile not ready for completion");
    }

    dispatch({ type: "SET_STATUS", status: "saving" });

    try {
      const response = await onboardingClient.completeOnboarding({
        profileId: state.profileId,
        submission: normaliseSubmission(state.submission)
      });

      await authActions.completeOnboarding({
        sessionId: response.session.sessionId,
        profileId: state.profileId,
        issuedAt: response.session.issuedAt,
        expiresAt: response.session.expiresAt
      });

      dispatch({ type: "SET_STATUS", status: "completed" });
      return response;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        error: error instanceof Error ? error.message : "Failed to complete onboarding"
      });
      throw error;
    }
  }, [authActions, authState.userType, state.profileId, state.submission]);

  const value: OnboardingFlowContextValue = {
    state,
    currentStep,
    catalog,
    actions: {
      goToStep,
      next,
      previous,
      updateField,
      saveCurrentStep,
      complete
    }
  };

  return (
    <OnboardingFlowContext.Provider value={value}>
      {children}
    </OnboardingFlowContext.Provider>
  );
};

const mergeSubmission = (existing: OnboardingDraft, incoming: OnboardingDraft): OnboardingDraft => ({
  personalInfo: incoming.personalInfo
    ? { ...existing.personalInfo, ...incoming.personalInfo }
    : existing.personalInfo,
  academicInfo: incoming.academicInfo
    ? { ...existing.academicInfo, ...incoming.academicInfo }
    : existing.academicInfo,
  socialInfo: incoming.socialInfo
    ? { ...existing.socialInfo, ...incoming.socialInfo }
    : existing.socialInfo,
  affiliation: incoming.affiliation
    ? { ...existing.affiliation, ...incoming.affiliation }
    : existing.affiliation,
  interests: incoming.interests ?? existing.interests,
  clubs: incoming.clubs ?? existing.clubs,
  residentialSelection:
    incoming.residentialSelection ?? existing.residentialSelection,
  handle: incoming.handle ?? existing.handle,
  consentGiven:
    incoming.consentGiven !== undefined
      ? incoming.consentGiven
      : existing.consentGiven,
  leadership: mergeLeadershipDraft(existing.leadership, incoming.leadership)
});

const mergeLeadershipDraft = (
  existing?: LeadershipDraft,
  incoming?: LeadershipDraft
): LeadershipDraft | undefined => {
  if (!existing && !incoming) {
    return undefined;
  }

  const spaces = incoming?.spaces
    ? incoming.spaces.map((space) => ({ ...space }))
    : existing?.spaces
    ? existing.spaces.map((space) => ({ ...space }))
    : undefined;

  const classCodes = incoming?.classCodes
    ? [...incoming.classCodes]
    : existing?.classCodes
    ? [...existing.classCodes]
    : undefined;

  const isLeader =
    incoming?.isLeader !== undefined
      ? incoming.isLeader
      : existing?.isLeader;

  if (isLeader === undefined && !spaces && !classCodes) {
    return undefined;
  }

  return {
    isLeader,
    spaces,
    classCodes
  };
};

const toDraft = (submission?: Partial<OnboardingSubmissionDto>): OnboardingDraft => {
  if (!submission) {
    return {};
  }

  return {
    personalInfo: submission.personalInfo ? { ...submission.personalInfo } : undefined,
    academicInfo: submission.academicInfo ? { ...submission.academicInfo } : undefined,
    socialInfo: submission.socialInfo ? { ...submission.socialInfo } : undefined,
    affiliation: submission.affiliation ? { ...submission.affiliation } : undefined,
    interests: submission.interests
      ? submission.interests.map((interest) => ({
          id: interest.id,
          label: interest.label,
          category: interest.category
        }))
      : undefined,
    clubs: submission.clubs ? [...submission.clubs] : undefined,
    residentialSelection: submission.residentialSelection
      ? { ...submission.residentialSelection }
      : undefined,
    handle: submission.handle,
    consentGiven: submission.consentGiven,
    leadership: submission.leadership
      ? {
          isLeader: submission.leadership.isLeader,
          spaces: submission.leadership.spaces?.map((space) => ({ ...space })),
          classCodes: submission.leadership.classCodes
            ? [...submission.leadership.classCodes]
            : undefined
        }
      : undefined
  };
};

const buildSubmissionPatch = (
  path: OnboardingFieldPath,
  value: unknown,
  catalog: CatalogOptions
): OnboardingDraft => {
  switch (path) {
    case "personalInfo.firstName":
      return {
        personalInfo: {
          firstName: typeof value === "string" ? value : ""
        }
      };
    case "personalInfo.lastName":
      return {
        personalInfo: {
          lastName: typeof value === "string" ? value : ""
        }
      };
    case "personalInfo.pronouns":
      return {
        personalInfo: {
          pronouns: typeof value === "string" && value.length > 0 ? value : undefined
        }
      };
    case "personalInfo.photoUrl":
      return {
        personalInfo: {
          photoUrl: typeof value === "string" && value.length > 0 ? value : undefined
        }
      };
    case "handle":
      return {
        handle: typeof value === "string" ? value : ""
      };
    case "leadership.isLeader":
      return {
        leadership: {
          isLeader: Boolean(value)
        }
      };
    case "leadership.spaces": {
      const spaces = Array.isArray(value)
        ? (value as LeadershipDraftSpace[]).map((space) => ({ ...space }))
        : undefined;
      return {
        leadership: {
          spaces
        }
      };
    }
    case "leadership.classCodes": {
      const codes = Array.isArray(value)
        ? (value as string[])
        : typeof value === "string"
        ? value.split(",").map((item) => item.trim())
        : [];
      return {
        leadership: {
          classCodes: codes.filter((code) => code.length > 0)
        }
      };
    }
    case "academicInfo.majors": {
      const majors = Array.isArray(value)
        ? (value as string[]).slice(0, 2)
        : typeof value === "string" && value.length > 0
        ? value.split(",").map((item) => item.trim()).slice(0, 2)
        : [];
      const validMajors = majors.filter((id) => catalog.majors.some((major) => major.id === id));
      return { academicInfo: { majors: validMajors } };
    }
    case "academicInfo.graduationYear":
      return {
        academicInfo: {
          graduationYear: value ? Number(value) : undefined
        }
      };
    case "academicInfo.courses": {
      const courses = Array.isArray(value)
        ? (value as string[]).slice(0, 10)
        : typeof value === "string" && value.length > 0
        ? value.split(",").map((item) => item.trim()).slice(0, 10)
        : [];
      return { academicInfo: { courses } };
    }
    case "socialInfo.instagram":
      return {
        socialInfo: {
          instagram: typeof value === "string" && value.length > 0 ? value : undefined
        }
      };
    case "socialInfo.linkedin":
      return {
        socialInfo: {
          linkedin: typeof value === "string" && value.length > 0 ? value : undefined
        }
      };
    case "socialInfo.website":
      return {
        socialInfo: {
          website: typeof value === "string" && value.length > 0 ? value : undefined
        }
      };
    case "interests": {
      const ids = Array.isArray(value)
        ? (value as string[])
        : typeof value === "string"
        ? value.split(",").map((item) => item.trim())
        : [];
      const selected: PersonalInterest[] = ids
        .map((id) => catalog.interests.find((option) => option.id === id))
        .filter((option): option is InterestOption => Boolean(option))
        .map((option) => ({
          id: option.id,
          label: option.label,
          category: option.category
        }));
      return { interests: selected };
    }
    case "clubs": {
      const clubs = Array.isArray(value)
        ? (value as string[])
        : typeof value === "string"
        ? value.split(",").map((item) => item.trim())
        : [];
      return { clubs };
    }
    case "residentialSelection.spaceId": {
      const space = catalog.residentialSpaces.find((option) => option.spaceId === value);
      if (!space) {
        return { residentialSelection: undefined };
      }
      return {
        residentialSelection: {
          spaceId: space.spaceId,
          name: space.name
        }
      };
    }
    case "consentGiven":
      return {
        consentGiven: Boolean(value)
      };
    default:
      return {};
  }
};

const extractSubmissionForStep = (
  step: OnboardingStepDescriptor,
  submission: OnboardingDraft
): OnboardingDraft => {
  const partial: OnboardingDraft = {};

  for (const field of step.fields) {
    switch (field.path) {
      case "personalInfo.firstName":
      case "personalInfo.lastName":
      case "personalInfo.pronouns":
      case "personalInfo.bio":
      case "personalInfo.photoUrl":
        if (submission.personalInfo) {
          partial.personalInfo = {
            ...partial.personalInfo,
            ...submission.personalInfo
          };
        }
        break;
      case "academicInfo.majors":
      case "academicInfo.graduationYear":
      case "academicInfo.courses":
        if (submission.academicInfo) {
          partial.academicInfo = {
            ...partial.academicInfo,
            ...submission.academicInfo
          };
        }
        break;
      case "affiliation.department":
        partial.affiliation = submission.affiliation;
        break;
      case "socialInfo.instagram":
      case "socialInfo.linkedin":
      case "socialInfo.website":
        if (submission.socialInfo) {
          partial.socialInfo = {
            ...partial.socialInfo,
            ...submission.socialInfo
          };
        }
        break;
      case "interests":
        partial.interests = submission.interests;
        break;
      case "clubs":
        partial.clubs = submission.clubs;
        break;
      case "residentialSelection.spaceId":
        partial.residentialSelection = submission.residentialSelection;
        break;
      case "handle":
        partial.handle = submission.handle;
        break;
      case "leadership.isLeader":
      case "leadership.spaces":
      case "leadership.classCodes":
        if (submission.leadership) {
          partial.leadership = {
            ...partial.leadership,
            isLeader:
              submission.leadership.isLeader ?? partial.leadership?.isLeader,
            spaces: submission.leadership.spaces
              ? submission.leadership.spaces.map((space) => ({ ...space }))
              : partial.leadership?.spaces,
            classCodes: submission.leadership.classCodes
              ? [...submission.leadership.classCodes]
              : partial.leadership?.classCodes
          };
        }
        break;
      case "consentGiven":
        partial.consentGiven = submission.consentGiven;
        break;
      default:
        break;
    }
  }

  return partial;
};

const normaliseSubmission = (submission: OnboardingDraft): OnboardingSubmissionDto => {
  const personalInfo: OnboardingSubmissionDto["personalInfo"] = {
    firstName: submission.personalInfo?.firstName ?? "",
    lastName: submission.personalInfo?.lastName ?? "",
    pronouns: submission.personalInfo?.pronouns,
    photoUrl: submission.personalInfo?.photoUrl
  };

  if (submission.personalInfo?.bio && submission.personalInfo.bio.trim().length > 0) {
    personalInfo.bio = submission.personalInfo.bio;
  }

  const academicInfo =
    submission.academicInfo?.majors && submission.academicInfo.graduationYear !== undefined
      ? {
          majors: submission.academicInfo.majors,
          graduationYear: submission.academicInfo.graduationYear,
          courses: submission.academicInfo.courses
        }
      : undefined;

  const socialInfo =
    submission.socialInfo &&
    (submission.socialInfo.instagram ||
      submission.socialInfo.linkedin ||
      submission.socialInfo.website)
      ? {
          instagram: submission.socialInfo.instagram,
          linkedin: submission.socialInfo.linkedin,
          website: submission.socialInfo.website
        }
      : undefined;

  return {
    personalInfo,
    academicInfo,
    socialInfo,
    interests: submission.interests ?? [],
    clubs: submission.clubs ?? [],
    residentialSelection: submission.residentialSelection,
    handle: submission.handle ?? "",
    consentGiven: submission.consentGiven ?? false,
    leadership:
      submission.leadership &&
      (submission.leadership.isLeader ||
        (submission.leadership.spaces?.length ?? 0) > 0 ||
        (submission.leadership.classCodes?.length ?? 0) > 0)
        ? {
            isLeader: Boolean(submission.leadership.isLeader),
            spaces: (submission.leadership.spaces ?? [])
              .filter((space): space is LeadershipDraftSpace => Boolean(space?.id) && Boolean(space?.name))
              .map((space) => ({
                id: space.id,
                name: space.name,
                campusId: space.campusId
              })),
            classCodes: (submission.leadership.classCodes ?? [])
              .map((code) => code.trim())
              .filter((code) => code.length > 0)
          }
        : undefined
  };
};

export const useOnboardingFlow = (): OnboardingFlowContextValue => {
  const context = useContext(OnboardingFlowContext);
  if (!context) {
    throw new Error("useOnboardingFlow must be used within OnboardingFlowProvider");
  }
  return context;
};
