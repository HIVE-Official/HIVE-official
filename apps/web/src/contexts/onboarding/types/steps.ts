// Bounded Context Owner: Identity & Access Management Guild
import type { UserType } from "@core";
import type { InterestOption, MajorOption, ResidentialSpaceOption } from "@core";

export type OnboardingStepId =
  | "personal-info"
  | "academic-info"
  | "leadership"
  | "interests"
  | "review";

export type OnboardingFieldPath =
  | "personalInfo.firstName"
  | "personalInfo.lastName"
  | "personalInfo.pronouns"
  | "personalInfo.bio"
  | "personalInfo.photoUrl"
  | "academicInfo.majors"
  | "academicInfo.graduationYear"
  | "academicInfo.courses"
  | "affiliation.department"
  | "socialInfo.instagram"
  | "socialInfo.linkedin"
  | "socialInfo.website"
  | "interests"
  | "clubs"
  | "residentialSelection.spaceId"
  | "handle"
  | "leadership.isLeader"
  | "leadership.spaces"
  | "leadership.classCodes"
  | "consentGiven";

export type FieldControlType =
  | "text"
  | "textarea"
  | "select"
  | "multi-select"
  | "number"
  | "checkbox-group"
  | "checkbox"
  | "tag-input"
  | "readonly";

export interface OnboardingFieldDescriptor {
  readonly id: string;
  readonly path: OnboardingFieldPath;
  readonly label: string;
  readonly control: FieldControlType;
  readonly placeholder?: string;
  readonly helperText?: string;
  readonly required?: boolean;
  readonly maxLength?: number;
  readonly options?: ReadonlyArray<{
    readonly value: string;
    readonly label: string;
    readonly description?: string;
  }>;
  readonly maxSelections?: number;
}

export interface OnboardingStepDescriptor {
  readonly id: OnboardingStepId;
  readonly title: string;
  readonly description: string;
  readonly fields: readonly OnboardingFieldDescriptor[];
  readonly ctaLabel: string;
  readonly backLabel?: string;
  readonly userTypes?: ReadonlyArray<UserType>;
  readonly summaryKeys?: readonly OnboardingFieldPath[];
}

interface StepContextOptions {
  readonly userType: UserType;
  readonly majors: readonly MajorOption[];
  readonly interests: readonly InterestOption[];
  readonly residentialSpaces: readonly ResidentialSpaceOption[];
}

const createPersonalInfoStep = (): OnboardingStepDescriptor => ({
  id: "personal-info",
  title: "Tell us about yourself",
  description:
    "We use this information to personalize your profile and help peers recognize you.",
  ctaLabel: "Save and continue",
  fields: [
    {
      id: "firstName",
      path: "personalInfo.firstName",
      label: "First name",
      control: "text",
      placeholder: "Jordan",
      required: true,
      maxLength: 100
    },
    {
      id: "lastName",
      path: "personalInfo.lastName",
      label: "Last name",
      control: "text",
      placeholder: "Lee",
      required: true,
      maxLength: 100
    },
  {
    id: "pronouns",
    path: "personalInfo.pronouns",
    label: "Pronouns",
    control: "text",
    placeholder: "they/them",
    helperText: "Optional"
  },
    {
      id: "photoUrl",
      path: "personalInfo.photoUrl",
      label: "Profile photo URL",
      control: "text",
      placeholder: "https://"
    },
    {
      id: "instagram",
      path: "socialInfo.instagram",
      label: "Instagram",
      control: "text",
      placeholder: "@ubstudent"
    },
    {
      id: "linkedin",
      path: "socialInfo.linkedin",
      label: "LinkedIn",
      control: "text",
      placeholder: "https://www.linkedin.com/in/username"
    },
    {
      id: "website",
      path: "socialInfo.website",
      label: "Portfolio or website",
      control: "text",
      placeholder: "https://portfolio.me"
    }
  ]
});

const createAcademicStep = (
  options: StepContextOptions
): OnboardingStepDescriptor => ({
  id: "academic-info",
  title: "Academic focus",
  description: "Choose up to two majors and let the community know when you graduate.",
  ctaLabel: "Save academic info",
  userTypes: ["student"],
  fields: [
    {
      id: "majors",
      path: "academicInfo.majors",
      label: "Majors",
      control: "multi-select",
      required: true,
      maxSelections: 2,
      options: options.majors.map((major) => ({
        value: major.id,
        label: major.name,
        description: major.college
      }))
    },
    {
      id: "graduationYear",
      path: "academicInfo.graduationYear",
      label: "Expected graduation year",
      control: "number",
      required: true
    },
    {
      id: "courses",
      path: "academicInfo.courses",
      label: "Key courses",
      control: "tag-input",
      helperText: "Add up to 10 courses you're proud of."
    }
  ]
});

const createInterestsStep = (
  options: StepContextOptions
): OnboardingStepDescriptor => ({
  id: "interests",
  title: "Interests & communities",
  description:
    "Pick interests so we can recommend spaces, events, and peers that match your goals.",
  ctaLabel: "Save interests",
  fields: [
    {
      id: "interests",
      path: "interests",
      label: "Interests",
      control: "tag-input",
      required: true,
      helperText: "Pick at least three so we can tailor your feed."
    },
    {
      id: "clubs",
      path: "clubs",
      label: "Clubs & organizations",
      control: "tag-input",
      helperText: "Add the orgs you’re active in (press enter to add)."
    },
    {
      id: "residential",
      path: "residentialSelection.spaceId",
      label: "Where do you live?",
      control: "select",
      options: options.residentialSpaces.map((space) => ({
        value: space.spaceId,
        label: space.name,
        description: space.cta
      }))
    }
  ]
});

const createLeadershipStep = (
  options: StepContextOptions
): OnboardingStepDescriptor => ({
  id: "leadership",
  title:
    options.userType === "student"
      ? "Claim the spaces you lead"
      : "Link your space or class",
  description:
    options.userType === "student"
      ? "Optional — if you run a space, claim it so we can connect members faster."
      : "Tell us which space or class you lead so students know where to find you.",
  ctaLabel: "Save leadership info",
  fields: [
    {
      id: "isLeader",
      path: "leadership.isLeader",
      label: "I lead a space or class",
      control: "checkbox"
    },
    {
      id: "spaces",
      path: "leadership.spaces",
      label: "Spaces you lead",
      control: "multi-select",
      helperText: "Search and select up to three spaces you organize."
    },
    {
      id: "classCodes",
      path: "leadership.classCodes",
      label: "Class or activity codes",
      control: "tag-input",
      helperText: "Add course numbers or activity codes students will recognize."
    }
  ]
});

const createReviewStep = (): OnboardingStepDescriptor => ({
  id: "review",
  title: "Review & launch",
  description:
    "Double-check your details before unlocking your curated spaces and recommendations.",
  ctaLabel: "Complete onboarding",
  fields: [
    {
      id: "summary",
      path: "personalInfo.firstName",
      label: "Summary",
      control: "readonly"
    },
    {
      id: "consent",
      path: "consentGiven",
      label: "I consent to HIVE collecting and using my data as described in the Privacy Policy",
      control: "checkbox",
      helperText: "Required to activate your account."
    }
  ],
  summaryKeys: [
    "personalInfo.firstName",
    "personalInfo.lastName",
    "academicInfo.majors",
    "interests",
    "residentialSelection.spaceId",
    "consentGiven"
  ]
});

export const createStepDescriptors = (
  options: StepContextOptions
): OnboardingStepDescriptor[] => {
  const baseSteps = [createPersonalInfoStep()];

  if (options.userType === "student") {
    baseSteps.push(createAcademicStep(options));
  }

  baseSteps.push(createInterestsStep(options));
  baseSteps.push(createLeadershipStep(options));
  baseSteps.push(createReviewStep());

  return baseSteps;
};
