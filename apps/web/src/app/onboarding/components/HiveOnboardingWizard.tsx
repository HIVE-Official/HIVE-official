// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Button,
  Card,
  Input,
  StepperHeader,
  TagInput,
  Checkbox,
  CheckboxGroup,
  FormField,
  FormFieldControl,
  Heading,
  Text,
  useReducedMotion as useUiReducedMotion,
  DUR
} from "@hive/ui";
import { LeaderSpaceSelector, type SelectedSpace } from "./LeaderSpaceSelector";
import { useOnboardingFlow } from "@onboarding/providers/OnboardingFlowProvider";

const currentYear = new Date().getFullYear();

export function HiveOnboardingWizard(): JSX.Element | null {
  const {
    state,
    catalog,
    actions: { updateField, complete, previous, saveCurrentStep }
  } = useOnboardingFlow();

  const prefersReducedMotion = useUiReducedMotion();
  const [consent, setConsent] = useState<boolean>(Boolean(state.submission.consentGiven));

  useEffect(() => {
    updateField("consentGiven", consent);
  }, [consent, updateField]);

  useEffect(() => {
    if (
      state.userType &&
      state.userType !== "student" &&
      state.submission.leadership?.isLeader !== true
    ) {
      updateField("leadership.isLeader", true);
    }
  }, [state.submission.leadership?.isLeader, state.userType, updateField]);

  const steps = state.steps;
  const activeStep = steps[state.currentStepIndex] ?? null;
  const isSaving = state.status === "saving";
  const isFirstStep = state.currentStepIndex === 0;

  useEffect(() => {
    // Keep consent checkbox in sync if provider restores progress.
    if (state.submission.consentGiven !== undefined) {
      setConsent(Boolean(state.submission.consentGiven));
    }
  }, [state.submission.consentGiven]);

  const majorsSelected = useMemo(
    () => state.submission.academicInfo?.majors ?? [],
    [state.submission.academicInfo?.majors]
  );
  const graduationYear = state.submission.academicInfo?.graduationYear;
  const interestsSelected = useMemo(
    () => state.submission.interests ?? [],
    [state.submission.interests]
  );
  const leadership = state.submission.leadership;
  const leaderSpaces = useMemo(() => leadership?.spaces ?? [], [leadership?.spaces]);
  const leaderClassCodes = useMemo(() => leadership?.classCodes ?? [], [leadership?.classCodes]);
  const isLeader = leadership?.isLeader ?? (state.userType === "student" ? false : true);

  const canContinue = useMemo(() => {
    if (!activeStep) return false;

    switch (activeStep.id) {
      case "personal-info": {
        const first = state.submission.personalInfo?.firstName?.trim() ?? "";
        const last = state.submission.personalInfo?.lastName?.trim() ?? "";
        return first.length > 0 && last.length > 0;
      }
      case "academic-info": {
        if (state.userType !== "student") {
          return true;
        }
        const gradValid =
          typeof graduationYear === "number" &&
          graduationYear >= currentYear &&
          graduationYear <= currentYear + 10;
        return majorsSelected.length > 0 && gradValid;
      }
      case "interests":
        return interestsSelected.length >= 3 && interestsSelected.length <= 6;
      case "leadership": {
        if (state.userType === "student") {
          if (!isLeader) {
            return true;
          }
          return leaderSpaces.length > 0;
        }

        return leaderSpaces.length + leaderClassCodes.length > 0;
      }
      case "review":
        return consent === true;
      default:
        return true;
    }
  }, [activeStep, consent, graduationYear, interestsSelected.length, leaderClassCodes.length, leaderSpaces.length, isLeader, majorsSelected.length, state.submission, state.userType]);

  const summaryRows = useMemo(() => {
    const personal = state.submission.personalInfo ?? {};
    const name = [personal.firstName, personal.lastName].filter(Boolean).join(" ").trim();
    const majors = majorsSelected
      .map((majorId) => catalog.majors.find((major) => major.id === majorId)?.name ?? majorId)
      .filter(Boolean);
    const interests = interestsSelected.map((interest) => interest.label).filter(Boolean);
    const residential = state.submission.residentialSelection?.name;
    const leadershipSummary = leadership && (leadership.isLeader || leaderSpaces.length > 0 || leaderClassCodes.length > 0)
      ? [
          leaderSpaces.map((space) => space.name).join(", "),
          leaderClassCodes.join(", ")
        ]
          .filter((entry) => entry.length > 0)
          .join(" • ")
      : "";

    return [
      name ? { label: "Name", value: name } : null,
      majors.length ? { label: "Major(s)", value: majors.join(", ") } : null,
      graduationYear ? { label: "Graduation year", value: String(graduationYear) } : null,
      interests.length ? { label: "Interests", value: interests.join(", ") } : null,
      residential ? { label: "Residential community", value: residential } : null,
      leadershipSummary
        ? { label: "Leading", value: leadershipSummary }
        : null
    ].filter(Boolean) as Array<{ label: string; value: string }>;
  }, [catalog.majors, graduationYear, interestsSelected, leaderClassCodes, leaderSpaces, leadership, majorsSelected, state.submission.personalInfo, state.submission.residentialSelection]);

  if (!state.profileId || state.status === "loading" || !activeStep) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Loading your onboarding flow…
      </div>
    );
  }

  const handleContinue = async () => {
    if (!activeStep) return;

    if (activeStep.id === "review") {
      await complete();
      return;
    }

    await saveCurrentStep();
  };

  const renderPersonalInfo = (): JSX.Element => (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField label="First name" labelFor="firstName">
        <FormFieldControl>
          <Input
            id="firstName"
            value={state.submission.personalInfo?.firstName ?? ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("personalInfo.firstName", event.target.value)
            }
            placeholder="Ava"
            maxLength={50}
            required
          />
        </FormFieldControl>
      </FormField>

      <FormField label="Last name" labelFor="lastName">
        <FormFieldControl>
          <Input
            id="lastName"
            value={state.submission.personalInfo?.lastName ?? ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("personalInfo.lastName", event.target.value)
            }
            placeholder="Nguyen"
            maxLength={50}
            required
          />
        </FormFieldControl>
      </FormField>

      <FormField label="Pronouns" labelFor="pronouns" description="Optional">
        <FormFieldControl>
          <Input
            id="pronouns"
            value={state.submission.personalInfo?.pronouns ?? ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("personalInfo.pronouns", event.target.value)
            }
            placeholder="they/them"
            maxLength={50}
          />
        </FormFieldControl>
      </FormField>

      <FormField label="Profile photo URL" labelFor="photoUrl" description="Optional">
        <FormFieldControl>
          <Input
            id="photoUrl"
            value={state.submission.personalInfo?.photoUrl ?? ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("personalInfo.photoUrl", event.target.value)
            }
            placeholder="https://"
          />
        </FormFieldControl>
      </FormField>
    </div>
  );

  const renderAcademicInfo = (): JSX.Element => (
    <div className="grid gap-4">
      <FormField label="Majors" description="Select up to two">
        <FormFieldControl>
          <CheckboxGroup
            values={majorsSelected}
            onChange={(values) => updateField("academicInfo.majors", values)}
            options={catalog.majors.map((major) => ({
              value: major.id,
              label: major.name
            }))}
            maxSelections={2}
          />
        </FormFieldControl>
      </FormField>

      <FormField label="Expected graduation year" labelFor="gradYear">
        <FormFieldControl>
          <Input
            id="gradYear"
            type="number"
            value={graduationYear ? String(graduationYear) : ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateField("academicInfo.graduationYear", event.target.value)
            }
            min={currentYear}
            max={currentYear + 10}
            placeholder={String(currentYear + 4)}
          />
        </FormFieldControl>
      </FormField>
    </div>
  );

  const renderInterestSelection = (): JSX.Element => (
    <div className="grid gap-4">
      <FormField label="Interests" description="Pick 3–6 that fit you best">
        <FormFieldControl>
          <TagInput
            value={interestsSelected.map((interest) => interest.id)}
            onChange={(ids) => updateField("interests", ids)}
            placeholder="Add interest"
            suggestions={catalog.interests.map((interest) => ({
              value: interest.id,
              label: interest.label
            }))}
            maxTags={6}
          />
        </FormFieldControl>
      </FormField>

      <FormField label="Clubs & organizations" description="Press enter to add each item">
        <FormFieldControl>
          <TagInput
            value={state.submission.clubs ?? []}
            onChange={(ids) => updateField("clubs", ids)}
            placeholder="Add a club or org"
            maxTags={10}
          />
        </FormFieldControl>
      </FormField>

      <FormField label="Where do you live?" description="Optional — helps us suggest residential communities">
        <FormFieldControl>
          <div className="relative">
            <select
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={state.submission.residentialSelection?.spaceId ?? ""}
              onChange={(event) => updateField("residentialSelection.spaceId", event.target.value)}
            >
              <option value="">Select a residence (optional)</option>
              {catalog.residentialSpaces.map((space) => (
                <option key={space.spaceId} value={space.spaceId}>
                  {space.name}
                </option>
              ))}
            </select>
          </div>
        </FormFieldControl>
      </FormField>
    </div>
  );

  const renderLeadership = (): JSX.Element => {
    const isStudent = state.userType === "student";

    const handleSelectSpace = (space: SelectedSpace) => {
      if (leaderSpaces.some((existing) => existing.id === space.id)) {
        return;
      }
      const next = [...leaderSpaces, space].slice(0, 3);
      updateField("leadership.spaces", next);
    };

    const handleRemoveSpace = (spaceId: string) => {
      updateField(
        "leadership.spaces",
        leaderSpaces.filter((space) => space.id !== spaceId)
      );
    };

    return (
      <div className="space-y-4">
        {isStudent ? (
          <Checkbox
            id="isLeader"
            label="I lead a campus space or organization"
            checked={isLeader}
            onChange={(value) => {
              updateField("leadership.isLeader", value);
              if (!value) {
                updateField("leadership.spaces", []);
                updateField("leadership.classCodes", []);
              }
            }}
          />
        ) : (
          <Text variant="muted" className="text-sm">
            Faculty & staff are listed as leaders. Link your space or class so students can reach you.
          </Text>
        )}

        {(isLeader || !isStudent) ? (
          <LeaderSpaceSelector
            selected={leaderSpaces}
            onSelect={handleSelectSpace}
            onRemove={handleRemoveSpace}
            disabled={isSaving}
          />
        ) : null}

        {(!isStudent || isLeader) ? (
          <FormField
            label="Class or activity codes"
            description={
              isStudent
                ? "Optional — add course numbers or activity codes so members recognize your group."
                : "Add course numbers or activity codes students can use to find you."
            }
          >
            <FormFieldControl>
              <TagInput
                value={leaderClassCodes}
                onChange={(codes) => updateField("leadership.classCodes", codes)}
                placeholder="e.g., CSE 341, HON 201"
                maxTags={8}
              />
            </FormFieldControl>
          </FormField>
        ) : null}
      </div>
    );
  };

  const renderReview = (): JSX.Element => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Heading level="h3" className="text-lg">
          Quick summary
        </Heading>
        {summaryRows.length === 0 ? (
          <Text variant="muted" className="text-sm">
            Add a few details so we can tailor your Spaces and feed.
          </Text>
        ) : (
          <dl className="space-y-2 rounded-xl border border-border/60 bg-card/70 p-4">
            {summaryRows.map((row) => (
              <div key={row.label} className="flex justify-between gap-3 text-sm">
                <dt className="font-medium text-foreground/80">{row.label}</dt>
                <dd className="text-right text-muted-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className="space-y-2">
        <Checkbox
          id="consent"
          label="I agree to follow campus guidelines and the HIVE Code of Conduct."
          checked={consent}
          onChange={setConsent}
        />
        <Text variant="muted" className="text-xs">
          You can revisit privacy and visibility settings anytime from your profile.
        </Text>
      </div>
    </div>
  );

  const renderContent = (): JSX.Element => {
    switch (activeStep.id) {
      case "personal-info":
        return renderPersonalInfo();
      case "academic-info":
        return renderAcademicInfo();
      case "leadership":
        return renderLeadership();
      case "interests":
        return renderInterestSelection();
      case "review":
        return renderReview();
      default:
        return (
          <div className="text-sm text-muted-foreground">
            Preparing the next step…
          </div>
        );
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <header className="space-y-4">
        <StepperHeader
          steps={steps.map((step) => ({
            id: step.id,
            title: step.title,
            description: step.description
          }))}
          activeStepId={activeStep.id}
          completedStepIds={state.stepsCompleted}
        />
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : DUR.sm / 1000 }}
        >
          <Heading level="h2" className="text-2xl">
            {activeStep.title}
          </Heading>
          {activeStep.description ? (
            <Text variant="muted" className="mt-1">
              {activeStep.description}
            </Text>
          ) : null}
        </motion.div>
      </header>

      <Card className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : DUR.md / 1000 }}
            className="space-y-6"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <footer className="mt-6 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            disabled={isFirstStep || isSaving}
            onClick={() => {
              previous();
            }}
          >
            Back
          </Button>
          <Button
            type="button"
            disabled={!canContinue || isSaving}
            onClick={() => {
              void handleContinue();
            }}
          >
            {activeStep.id === "review" ? "Complete onboarding" : activeStep.ctaLabel ?? "Continue"}
          </Button>
        </footer>
      </Card>
    </section>
  );
}

export default HiveOnboardingWizard;
