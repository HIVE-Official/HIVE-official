// Bounded Context Owner: Identity & Access Management Guild
import type { ChangeEvent, FormEvent, ReactElement } from "react";
import { Button, StepperHeader, Input, Textarea, SelectNative, Checkbox, TagInput, CheckboxGroup, FormField, FormFieldControl } from "@hive/ui";
import { useOnboardingFlow } from "../providers/OnboardingFlowProvider";
import type { CatalogOptions, OnboardingDraft } from "../providers/OnboardingFlowProvider";
import type { OnboardingFieldDescriptor, OnboardingFieldPath } from "../types/steps";

// styles handled by design-system components
// legacy helpers removed (TagInput now consumes arrays directly)

const getFieldValue = (
  submission: OnboardingDraft,
  path: OnboardingFieldPath
): unknown => {
  switch (path) {
    case "personalInfo.firstName":
      return submission.personalInfo?.firstName ?? "";
    case "personalInfo.lastName":
      return submission.personalInfo?.lastName ?? "";
    case "personalInfo.pronouns":
      return submission.personalInfo?.pronouns ?? "";
    case "personalInfo.bio":
      return submission.personalInfo?.bio ?? "";
    case "personalInfo.photoUrl":
      return submission.personalInfo?.photoUrl ?? "";
    case "academicInfo.majors":
      return submission.academicInfo?.majors ?? [];
    case "academicInfo.graduationYear":
      return submission.academicInfo?.graduationYear ?? "";
    case "academicInfo.courses":
      return submission.academicInfo?.courses ?? [];
    case "affiliation.department":
      return submission.affiliation?.department ?? "";
    case "socialInfo.instagram":
      return submission.socialInfo?.instagram ?? "";
    case "socialInfo.linkedin":
      return submission.socialInfo?.linkedin ?? "";
    case "socialInfo.website":
      return submission.socialInfo?.website ?? "";
    case "interests":
      return submission.interests?.map((interest) => interest.id) ?? [];
    case "clubs":
      return submission.clubs ?? [];
    case "residentialSelection.spaceId":
      return submission.residentialSelection?.spaceId ?? "";
    case "handle":
      return submission.handle ?? "";
    case "consentGiven":
      return Boolean(submission.consentGiven);
    default:
      return "";
  }
};

const renderReadonlySummary = (
  submission: OnboardingDraft,
  summaryKeys: readonly OnboardingFieldPath[] | undefined,
  catalog: CatalogOptions
): ReactElement => {
  if (!summaryKeys || summaryKeys.length === 0) {
    return <p className="text-sm text-muted-foreground">Nothing to review yet.</p>;
  }

  return (
    <dl className="space-y-3">
      {summaryKeys.map((path) => (
        <div key={path} className="rounded-md border border-input p-3">
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            {path.replace(/\./g, " ")}
          </dt>
          <dd className="text-sm font-medium text-foreground">
            {formatSummaryValue(submission, path, catalog) ?? "Not provided"}
          </dd>
        </div>
      ))}
    </dl>
  );
};

const formatSummaryValue = (
  submission: OnboardingDraft,
  path: OnboardingFieldPath,
  catalog: CatalogOptions
): string | null => {
  switch (path) {
    case "personalInfo.firstName":
      return submission.personalInfo?.firstName ?? null;
    case "personalInfo.lastName":
      return submission.personalInfo?.lastName ?? null;
    case "personalInfo.bio":
      return submission.personalInfo?.bio ?? null;
    case "handle":
      return submission.handle ?? null;
    case "consentGiven":
      return submission.consentGiven ? "Consent granted" : "Consent not granted";
    case "academicInfo.majors":
      return (
        submission.academicInfo?.majors?.map((id) => {
          const match = catalog.majors.find((major) => major.id === id);
          return match ? match.name : id;
        }).join(", ") ?? null
      );
    case "interests":
      return submission.interests && submission.interests.length > 0
        ? submission.interests.map((interest) => interest.label).join(", ")
        : null;
    case "residentialSelection.spaceId":
      if (!submission.residentialSelection?.spaceId) {
        return submission.residentialSelection?.name ?? null;
      }
      return (
        catalog.residentialSpaces.find(
          (space) => space.spaceId === submission.residentialSelection?.spaceId
        )?.name ?? submission.residentialSelection.name ?? null
      );
    default: {
      const value = getFieldValue(submission, path);
      if (Array.isArray(value)) {
        return value.length ? value.join(", ") : null;
      }
      if (typeof value === "string") {
        return value || null;
      }
      if (typeof value === "number") {
        return value.toString();
      }
      return null;
    }
  }
};

// replaced legacy native controls with design-system components

const FieldRenderer = ({
  field,
  summaryKeys,
  catalog
}: {
  readonly field: OnboardingFieldDescriptor;
  readonly summaryKeys?: readonly OnboardingFieldPath[];
  readonly catalog: CatalogOptions;
}): ReactElement => {
  const {
    state,
    actions: { updateField }
  } = useOnboardingFlow();

  const value = getFieldValue(state.submission, field.path);
  const stringValue = (input: unknown): string =>
    typeof input === "string" ? input : "";
  const arrayValue = (input: unknown): string[] => {
    if (Array.isArray(input)) {
      return input as string[];
    }
    if (typeof input === "string") {
      return input
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  };

  switch (field.control) {
    case "text":
      return (
        <Input
          id={field.id}
          required={field.required}
          maxLength={field.maxLength}
          value={stringValue(value)}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField(field.path, event.target.value)
          }
          placeholder={field.placeholder}
        />
      );
    case "textarea":
      return (
        <Textarea
          id={field.id}
          required={field.required}
          maxLength={field.maxLength}
          value={stringValue(value)}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            updateField(field.path, event.target.value)
          }
          placeholder={field.placeholder}
        />
      );
    case "number":
      return (
        <Input
          type="number"
          id={field.id}
          required={field.required}
          value={typeof value === "number" ? value : value ? Number(value) : ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateField(field.path, event.target.value)
          }
          placeholder={field.placeholder}
        />
      );
    case "multi-select": {
      const options = field.options?.map((o) => ({ value: o.value, label: o.label, description: o.description })) ?? [];
      return (
        <CheckboxGroup
          values={arrayValue(value)}
          onChange={(selection) => updateField(field.path, selection)}
          options={options}
          maxSelections={field.maxSelections}
        />
      );
    }
    case "checkbox-group": {
      const options = field.options?.map((o) => ({ value: o.value, label: o.label, description: o.description })) ?? [];
      return (
        <CheckboxGroup
          values={arrayValue(value)}
          onChange={(selection) => updateField(field.path, selection)}
          options={options}
          maxSelections={field.maxSelections}
        />
      );
    }
    case "checkbox":
      return (
        <Checkbox
          id={field.id}
          label={field.label}
          checked={Boolean(value)}
          onChange={(checked) => updateField(field.path, checked)}
        />
      );
    case "tag-input": {
      const suggestions = field.options?.map((o) => ({ value: o.value, label: o.label, description: o.description })) ?? [];
      return (
        <TagInput
          value={arrayValue(value)}
          onChange={(tags) => updateField(field.path, tags)}
          placeholder={field.placeholder ?? "Type and press Enter"}
          suggestions={suggestions}
          maxTags={field.maxSelections}
        />
      );
    }
    case "select":
      return (
        <SelectNative
          value={stringValue(value)}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => updateField(field.path, event.target.value)}
        >
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectNative>
      );
    case "readonly":
      return renderReadonlySummary(state.submission, summaryKeys, catalog);
    default:
      return <span className="text-sm text-muted-foreground">Unsupported field</span>;
  }
};

export const OnboardingStepper = (): ReactElement | null => {
  const {
    state,
    currentStep,
    catalog,
    actions: { previous, saveCurrentStep, complete }
  } = useOnboardingFlow();

  const isFirstStep = state.currentStepIndex === 0;
  const isLastStep = state.currentStepIndex === state.steps.length - 1;

  const disabled = state.status === "saving";

  if (!currentStep) {
    return null;
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <header className="space-y-4">
        <StepperHeader
          steps={state.steps.map((step) => ({
            id: step.id,
            title: step.title,
            description: step.description
          }))}
          activeStepId={currentStep.id}
          completedStepIds={state.stepsCompleted}
        />
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {currentStep.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {currentStep.description}
          </p>
        </div>
      </header>

      <form
        className="space-y-6"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (isLastStep) {
            void complete();
          } else {
            void saveCurrentStep();
          }
        }}
      >
        <div className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
          {currentStep.fields.map((field) => (
            <FormField
              key={field.id}
              label={field.control !== "checkbox" ? field.label : undefined}
              labelFor={field.id}
              description={field.helperText}
            >
              <FormFieldControl>
                <FieldRenderer
                  field={field}
                  summaryKeys={currentStep.summaryKeys}
                  catalog={catalog}
                />
              </FormFieldControl>
            </FormField>
          ))}
        </div>

        <footer className="flex items-center justify-between">
          <Button type="button" variant="outline" onClick={previous} disabled={isFirstStep || disabled}>
            Back
          </Button>
          <Button type="submit" disabled={disabled}>
            {isLastStep ? "Complete onboarding" : currentStep.ctaLabel}
          </Button>
        </footer>
      </form>
    </section>
  );
};
