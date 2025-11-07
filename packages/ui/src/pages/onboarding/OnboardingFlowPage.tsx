import * as React from "react";

import { Button } from "../../atomic/atoms/button";
import { Input } from "../../atomic/atoms/input";
import { Textarea } from "../../atomic/atoms/textarea";
import { Checkbox } from "../../atomic/atoms/checkbox";
import { Label } from "../../atomic/atoms/label";
import { Surface } from "../../layout";
import { Badge } from "../../atomic/atoms/badge";
import { cn } from "../../lib/utils";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  status: "complete" | "current" | "upcoming";
}

export interface OnboardingFlowPageProps {
  campusName?: string;
  steps?: OnboardingStep[];
  interests?: string[];
  selectedInterests?: string[];
  onSelectInterest?: (interest: string) => void;
}

const DEFAULT_STEPS: OnboardingStep[] = [
  {
    id: "identity",
    title: "Identity",
    description: "Name, campus badge, pronouns",
    status: "current",
  },
  {
    id: "interests",
    title: "Interests",
    description: "Spaces, rituals, and squads",
    status: "upcoming",
  },
  {
    id: "tools",
    title: "Tools",
    description: "Pick HiveLab experiences",
    status: "upcoming",
  },
];

const DEFAULT_INTERESTS = [
  "Robotics",
  "Design",
  "Campus Impact",
  "Arts",
  "Sustainability",
  "Hackathons",
  "Wellness",
  "Campus Media",
  "HiveLab Automation",
  "E-Sports",
];

export function OnboardingFlowPage({
  campusName = "UB",
  steps = DEFAULT_STEPS,
  interests = DEFAULT_INTERESTS,
  selectedInterests = ["Robotics", "Hackathons", "HiveLab Automation"],
  onSelectInterest,
}: OnboardingFlowPageProps) {
  return (
    <div className="min-h-screen bg-[var(--hive-background-page,#06070d)] text-[var(--hive-text-primary,#f7f7ff)]">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 pb-24 pt-14">
        <header className="space-y-4 text-center">
          <Badge tone="contrast" variant="pill" className="uppercase tracking-[0.32em]">
            Welcome to {campusName}
          </Badge>
          <h1 className="text-3xl font-semibold text-[var(--hive-text-primary,#f5f5ff)]">Launch your campus presence</h1>
          <p className="mx-auto max-w-xl text-sm text-[var(--hive-text-secondary,#c5c7d8)]">
            In under two minutes, we’ll personalize spaces, rituals, and HiveLab tools so you’re publishing with student energy tonight.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Surface className="space-y-6 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
            <h2 className="text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]">Set your campus badge</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="full-name" className="text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8c92a7)]">
                  Full name
                </Label>
                <Input id="full-name" placeholder="Laney Fraass" defaultValue="Laney Fraass" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="handle" className="text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8c92a7)]">
                  Handle
                </Label>
                <Input
                  id="handle"
                  placeholder="laney"
                  defaultValue="laney"
                  className="mt-2"
                  leftIcon={
                    <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--hive-text-muted,#8c92a7)]">
                      hive.so/
                    </span>
                  }
                />
              </div>
              <div>
                <Label htmlFor="campus-role" className="text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted,#8c92a7)]">
                  Campus focus
                </Label>
                <Textarea
                  id="campus-role"
                  rows={3}
                  className="mt-2 resize-none"
                  defaultValue="Student Lead · UB Robotics Collective & HiveLab Fellow"
                />
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-4 py-3">
                <Checkbox id="student-run" defaultChecked />
                <Label htmlFor="student-run" className="text-sm text-[var(--hive-text-secondary,#c5c7d8)]">
                  I’m representing a student-run space or ritual.
                </Label>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="ghost">Exit</Button>
              <Button variant="primary" className="px-8">
                Continue
              </Button>
            </div>
          </Surface>

          <Surface className="space-y-6 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6">
            <h2 className="text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]">Campus pathways</h2>
            <p className="text-sm text-[var(--hive-text-secondary,#c5c7d8)]">
              Pick up to three for personalized rituals, spaces, and HiveLab templates.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => {
                const active = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => onSelectInterest?.(interest)}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left text-sm transition-colors duration-150",
                      active
                        ? "border-[var(--hive-brand-primary,#ffd166)] bg-[rgba(255,214,102,0.12)] text-[var(--hive-text-primary,#f5f5ff)] shadow-[0_12px_28px_rgba(255,214,102,0.18)]"
                        : "border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] text-[var(--hive-text-secondary,#c5c7d8)] hover:border-[var(--hive-border-default,#2a2d3c)]",
                    )}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
            <div className="rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-4 py-3">
              <p className="text-xs text-[var(--hive-text-secondary,#c5c7d8)]">
                Customize later in your profile. You’ll get a curated feed and onboarding prompts in Feed, Spaces, and HiveLab.
              </p>
            </div>
          </Surface>
        </div>

        <Surface className="grid gap-4 rounded-3xl border border-[var(--hive-border-default,#232536)] bg-[var(--hive-background-secondary,#0f1019)] p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]">Progress</h2>
            <ol className="space-y-2">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm",
                    step.status === "complete" && "border-[rgba(34,197,94,0.4)] bg-[rgba(34,197,94,0.12)] text-[var(--hive-status-success-text,#bff3cb)]",
                    step.status === "current" && "border-[var(--hive-brand-primary,#ffd166)] bg-[rgba(255,214,102,0.12)] text-[var(--hive-text-primary,#fdfdfd)]",
                    step.status === "upcoming" && "border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] text-[var(--hive-text-muted,#8c92a7)]",
                  )}
                >
                  <div>
                    <p className="font-semibold">
                      {index + 1}. {step.title}
                    </p>
                    <p className="text-xs">{step.description}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.26em]">{step.status}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--hive-text-primary,#f5f5ff)]">What’s next</h2>
            <div className="space-y-3 rounded-2xl border border-[var(--hive-border-subtle,#232536)] bg-[var(--hive-background-tertiary,#171827)] px-5 py-4 text-sm text-[var(--hive-text-secondary,#c5c7d8)]">
              <p>Unlock ritual previews in Feed once you confirm interests.</p>
              <p>Spaces suggested tonight: Robotics Collective, Hive Founders, Sustainability Studio.</p>
              <p>HiveLab templates: Campus service board, live ritual RSVP, campus quiet hours guard.</p>
            </div>
            <Button variant="secondary" className="w-full">
              Save & exit
            </Button>
          </div>
        </Surface>
      </div>
    </div>
  );
}
