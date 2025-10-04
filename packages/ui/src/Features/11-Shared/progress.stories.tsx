import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "../../atomic/atoms/progress";
import { useEffect, useState } from "react";

/**
 * # Progress
 *
 * Visual indicator for task completion, file uploads, or loading states.
 * Built on @radix-ui/react-progress with smooth HIVE motion.
 *
 * ## HIVE Motion System
 * - Uses `duration-smooth ease-liquid` for buttery progress animations
 * - Smooth translateX transitions as value changes
 *
 * ## Usage
 * ```tsx
 * <Progress value={progress} className="w-full" />
 * ```
 */
const meta = {
  title: "11-Shared/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default progress at 50%
 */
export const Default: Story = {
  args: {
    value: 50,
    className: "w-[300px]",
  },
};

/**
 * Different progress values
 */
export const Values: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Empty</span>
          <span className="text-foreground">0%</span>
        </div>
        <Progress value={0} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Quarter</span>
          <span className="text-foreground">25%</span>
        </div>
        <Progress value={25} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Half</span>
          <span className="text-foreground">50%</span>
        </div>
        <Progress value={50} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Three Quarters</span>
          <span className="text-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Complete</span>
          <span className="text-foreground">100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
};

/**
 * Animated progress (showcases HIVE motion system)
 */
export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="flex w-[300px] flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Loading...</span>
          <span className="text-foreground">{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
    );
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Thin (1px)</span>
        <Progress value={60} className="h-px" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Default (2px)</span>
        <Progress value={60} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Medium (4px)</span>
        <Progress value={60} className="h-1" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Large (8px)</span>
        <Progress value={60} className="h-2" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Extra Large (12px)</span>
        <Progress value={60} className="h-3" />
      </div>
    </div>
  ),
};

/**
 * Custom colors using className
 */
export const Colors: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Default (Primary/Gold)</span>
        <Progress value={70} />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Success</span>
        <Progress value={70} className="[&>*]:bg-green-500" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Warning</span>
        <Progress value={70} className="[&>*]:bg-yellow-500" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Destructive</span>
        <Progress value={70} className="[&>*]:bg-destructive" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Gradient</span>
        <Progress
          value={70}
          className="[&>*]:bg-gradient-to-r [&>*]:from-primary [&>*]:to-destructive"
        />
      </div>
    </div>
  ),
};

/**
 * File upload progress pattern
 */
export const FileUpload: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsComplete(true);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="flex w-[400px] flex-col gap-3 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-sm font-medium text-foreground">
              design-system-v2.fig
            </p>
            <p className="text-xs text-muted-foreground">
              {isComplete ? "Upload complete" : `Uploading... ${progress}%`}
            </p>
          </div>
          {isComplete && (
            <svg
              className="h-5 w-5 text-green-500"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <Progress
          value={progress}
          className={isComplete ? "[&>*]:bg-green-500" : ""}
        />
      </div>
    );
  },
};

/**
 * Multi-step form progress
 */
export const MultiStep: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;

    return (
      <div className="flex w-[400px] flex-col gap-6 rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              Account Setup
            </h3>
            <span className="text-xs text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="flex flex-col gap-2">
          {["Personal Info", "Security", "Preferences", "Confirmation"].map(
            (step, index) => (
              <div
                key={step}
                className={`flex items-center gap-2 rounded-md p-2 transition-smooth ease-liquid ${
                  index + 1 === currentStep
                    ? "bg-primary/10 text-foreground"
                    : index + 1 < currentStep
                    ? "text-muted-foreground line-through"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs transition-smooth ease-liquid ${
                    index + 1 === currentStep
                      ? "bg-primary text-primary-foreground"
                      : index + 1 < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1 < currentStep ? "✓" : index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            )
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm transition-smooth ease-liquid hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentStep((prev) => Math.min(totalSteps, prev + 1))
            }
            disabled={currentStep === totalSteps}
            className="flex-1 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * Loading skeleton with progress
 */
export const LoadingState: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 200);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="flex w-[400px] flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        </div>
        <Progress value={progress} className="h-1" />
      </div>
    );
  },
};

/**
 * Production showcase: Dashboard widget
 */
export const ProductionShowcase: Story = {
  render: () => {
    const metrics = [
      {
        label: "Storage Used",
        value: 68,
        current: "6.8 GB",
        total: "10 GB",
        color: "[&>*]:bg-primary",
      },
      {
        label: "API Calls",
        value: 45,
        current: "4,500",
        total: "10,000",
        color: "[&>*]:bg-green-500",
      },
      {
        label: "Team Members",
        value: 80,
        current: "8",
        total: "10",
        color: "[&>*]:bg-yellow-500",
      },
      {
        label: "Build Minutes",
        value: 92,
        current: "920",
        total: "1000",
        color: "[&>*]:bg-destructive",
      },
    ];

    return (
      <div className="flex w-[500px] flex-col gap-6 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Usage Overview
          </h2>
          <span className="text-xs text-muted-foreground">This month</span>
        </div>

        <div className="grid gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4 transition-smooth ease-liquid hover:border-primary/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {metric.label}
                </span>
                <span className="text-sm text-muted-foreground">
                  {metric.current} / {metric.total}
                </span>
              </div>
              <Progress value={metric.value} className={metric.color} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{metric.value}% used</span>
                <span
                  className={
                    metric.value >= 90
                      ? "text-destructive"
                      : metric.value >= 75
                      ? "text-yellow-500"
                      : "text-green-500"
                  }
                >
                  {metric.value >= 90
                    ? "Critical"
                    : metric.value >= 75
                    ? "Warning"
                    : "Healthy"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Onboarding wizard progress (7-step flow)
 */
export const OnboardingWizard: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(3);
    const steps = [
      { id: 1, title: "Welcome to HIVE", emoji: "👋" },
      { id: 2, title: "What's Your Role?", emoji: "🎓" },
      { id: 3, title: "Personal Info", emoji: "✨" },
      { id: 4, title: "Profile Photo", emoji: "📸" },
      { id: 5, title: "Academic & Bio", emoji: "📚" },
      { id: 6, title: "Your Interests", emoji: "🎯" },
      { id: 7, title: "You're All Set!", emoji: "🎉" },
    ];
    const progress = (currentStep / steps.length) * 100;

    return (
      <div className="flex w-[600px] flex-col gap-6 rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Complete Your Profile
            </h2>
            <span className="text-sm font-medium text-primary">
              {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {Math.round(progress)}% complete • {steps.length - currentStep} steps remaining
          </p>
        </div>

        <div className="space-y-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all duration-smooth ease-liquid ${
                step.id === currentStep
                  ? "border-primary bg-primary/10"
                  : step.id < currentStep
                  ? "border-border bg-muted/50 opacity-50"
                  : "border-border bg-background"
              }`}
            >
              <span className="text-xl">{step.emoji}</span>
              <span className={`flex-1 text-sm ${step.id < currentStep ? "line-through" : ""}`}>
                {step.title}
              </span>
              {step.id < currentStep && (
                <svg
                  className="h-4 w-4 text-green-500"
                  fill="none"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {step.id === currentStep && (
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="flex-1 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-medium transition-smooth ease-liquid hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
            className="flex-1 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90"
          >
            {currentStep === steps.length ? "Get Started" : "Continue"}
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Profile completion gamification
 */
export const ProfileCompletion: Story = {
  render: () => {
    const completionPercentage = 75;
    const sections = [
      { name: "Basic Info", completed: true },
      { name: "Profile Photo", completed: true },
      { name: "Bio & Interests", completed: true },
      { name: "Social Links", completed: false },
      { name: "Verification", completed: false },
    ];

    return (
      <div className="flex w-[400px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Profile Strength</h3>
          <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
        </div>

        <Progress value={completionPercentage} className="h-3" />

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-primary">Almost there!</span> Complete your profile
            to unlock premium features and connect with more students.
          </p>
        </div>

        <div className="space-y-2">
          {sections.map((section) => (
            <div
              key={section.name}
              className="flex items-center gap-2 rounded-md p-2 transition-smooth ease-liquid hover:bg-muted/50"
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full transition-smooth ease-liquid ${
                  section.completed
                    ? "bg-green-500 text-white"
                    : "border-2 border-muted-foreground/30"
                }`}
              >
                {section.completed && (
                  <svg className="h-3 w-3" fill="none" strokeWidth="3" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${section.completed ? "text-muted-foreground" : "text-foreground font-medium"}`}>
                {section.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Space membership goal progress
 */
export const SpaceMembershipGoal: Story = {
  render: () => {
    const currentMembers = 87;
    const goalMembers = 100;
    const progress = (currentMembers / goalMembers) * 100;

    return (
      <div className="flex w-[450px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">CS Study Group</h3>
            <p className="text-sm text-muted-foreground mt-1">Grow our community to 100 members</p>
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1">
            <span className="text-xs font-medium text-primary">Active</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Member Goal Progress</span>
            <span className="text-2xl font-bold text-foreground">
              {currentMembers}
              <span className="text-sm font-normal text-muted-foreground"> / {goalMembers}</span>
            </span>
          </div>
          <Progress value={progress} className="h-3 [&>*]:bg-gradient-to-r [&>*]:from-primary [&>*]:to-green-500" />
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{Math.round(progress)}% to goal</span>
            <span className="font-medium text-green-500">{goalMembers - currentMembers} members away!</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-smooth ease-liquid hover:bg-accent">
            View Members
          </button>
          <button className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90">
            Invite Friends
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * HIVE Pattern: Ritual streak progress (daily check-ins)
 */
export const RitualStreak: Story = {
  render: () => {
    const currentStreak = 12;
    const goalStreak = 30;
    const progress = (currentStreak / goalStreak) * 100;
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const completedDays = [true, true, true, true, true, false, false];

    return (
      <div className="flex w-[400px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <span className="text-2xl">🔥</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">Daily Gym Check-in</h3>
            <p className="text-sm text-muted-foreground">Keep your streak alive!</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Current Streak</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-primary">{currentStreak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>
          <Progress value={progress} className="h-2.5 [&>*]:bg-gradient-to-r [&>*]:from-yellow-500 [&>*]:via-orange-500 [&>*]:to-red-500" />
          <p className="text-xs text-muted-foreground text-center">
            {goalStreak - currentStreak} days until 30-day streak badge
          </p>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-xs text-muted-foreground mb-3">This Week</p>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">{day}</span>
                <div
                  className={`h-8 w-8 rounded-lg transition-all duration-smooth ease-liquid ${
                    completedDays[index]
                      ? "bg-green-500 ring-2 ring-green-500/20"
                      : "border-2 border-dashed border-muted-foreground/30"
                  }`}
                >
                  {completedDays[index] && (
                    <div className="flex h-full items-center justify-center">
                      <svg className="h-4 w-4 text-white" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90">
          Check In Today
        </button>
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};
