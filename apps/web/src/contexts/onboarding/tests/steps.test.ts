// Bounded Context Owner: Identity & Access Management Guild
import { describe, expect, it } from "vitest";
import {
  createStepDescriptors,
  type OnboardingStepId
} from "../types/steps";
import {
  interestOptions,
  majorOptions,
  residentialSpaceOptions
} from "@core";

describe("createStepDescriptors", () => {
  const baseOptions = {
    majors: majorOptions,
    interests: interestOptions,
    residentialSpaces: residentialSpaceOptions
  };

  const extractIds = (
    steps: ReadonlyArray<{ id: OnboardingStepId }>
  ): OnboardingStepId[] => steps.map((step) => step.id);

  it("includes academic step for students", () => {
    const steps = createStepDescriptors({
      ...baseOptions,
      userType: "student"
    });

    expect(extractIds(steps)).toEqual([
      "personal-info",
      "academic-info",
      "interests",
      "review"
    ]);

    const personalStep = steps.find((step) => step.id === "personal-info");
    expect(personalStep?.fields.some((field) => field.path === "handle")).toBe(true);
    const reviewStep = steps.find((step) => step.id === "review");
    expect(reviewStep?.fields.some((field) => field.path === "consentGiven")).toBe(true);
  });

  it("replaces academic step with affiliation for faculty", () => {
    const steps = createStepDescriptors({
      ...baseOptions,
      userType: "faculty"
    });

    expect(extractIds(steps)).toEqual([
      "personal-info",
      "academic-info",
      "interests",
      "review"
    ]);
    const academicStep = steps.find((step) => step.id === "academic-info");
    expect(academicStep?.fields[0].path).toBe("affiliation.department");
  });
});
