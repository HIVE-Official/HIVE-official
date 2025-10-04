import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProgressChecklist } from "./progress-checklist";

/**
 * # ProgressChecklist
 *
 * Generic progress tracking component for ANY completion workflow.
 *
 * **Use Cases:**
 * - Profile completion (social platforms)
 * - Onboarding flows
 * - Task lists with progress
 * - Course/module completion
 * - Achievement tracking
 *
 * **Key Features:**
 * - Configurable title and target percentage
 * - Weighted items (flexible % contribution)
 * - Action buttons for incomplete items
 * - Compact and full variants
 * - Auto-calculates percentage from item weights
 *
 * ## Example: Profile Completion (HIVE)
 * ```tsx
 * <ProgressChecklist
 *   title="Profile Completion"
 *   targetPercentage={70}
 *   items={[
 *     { id: "bio", label: "Add bio", completed: true, weight: 25 },
 *     { id: "photo", label: "Upload photo", completed: false, weight: 25, onAction: () => {} }
 *   ]}
 * />
 * ```
 *
 * ## Example: Onboarding
 * ```tsx
 * <ProgressChecklist
 *   title="Get Started"
 *   targetPercentage={100}
 *   items={onboardingSteps}
 * />
 * ```
 */
const meta = {
  title: "Atomic/Organisms/ProgressChecklist",
  component: ProgressChecklist,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Generic progress tracking with weighted items. Works for profiles, onboarding, courses, tasks, etc.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressChecklist>;

export default meta;
type Story = StoryObj<typeof ProgressChecklist>;

/**
 * Profile completion (HIVE use case with 70% target)
 */
export const ProfileCompletion: Story = {
  args: {
    title: "Profile Completion",
    targetPercentage: 70,
    items: [
      {
        id: "bio",
        label: "Add a bio",
        description: "Tell others about yourself",
        completed: true,
        weight: 25,
      },
      {
        id: "photo",
        label: "Upload profile photo",
        description: "Add a photo so people recognize you",
        completed: true,
        weight: 25,
      },
      {
        id: "interests",
        label: "Select interests",
        description: "Help us recommend spaces",
        completed: true,
        weight: 20,
      },
      {
        id: "connections",
        label: "Make 3 connections",
        description: "Start building your network",
        completed: false,
        weight: 15,
        actionLabel: "Find People",
        onAction: () => alert("Navigate to connections"),
      },
      {
        id: "spaces",
        label: "Join 2 spaces",
        description: "Explore communities",
        completed: false,
        weight: 15,
        actionLabel: "Browse Spaces",
        onAction: () => alert("Navigate to spaces"),
      },
    ],
  },
};

/**
 * Onboarding flow (100% completion target)
 */
export const OnboardingFlow: Story = {
  args: {
    title: "Welcome to HIVE!",
    targetPercentage: 100,
    targetReachedLabel: "🎉 Onboarding Complete!",
    items: [
      {
        id: "verify",
        label: "Verify email",
        completed: true,
        weight: 33,
      },
      {
        id: "profile",
        label: "Set up profile",
        completed: true,
        weight: 33,
      },
      {
        id: "explore",
        label: "Explore campus",
        completed: false,
        weight: 34,
        actionLabel: "Start Tour",
        onAction: () => alert("Start campus tour"),
      },
    ],
  },
};

/**
 * Course completion
 */
export const CourseProgress: Story = {
  args: {
    title: "Introduction to React",
    targetPercentage: 100,
    items: [
      {
        id: "module1",
        label: "Module 1: Basics",
        description: "Learn JSX and components",
        completed: true,
        weight: 20,
      },
      {
        id: "module2",
        label: "Module 2: Hooks",
        description: "useState and useEffect",
        completed: true,
        weight: 20,
      },
      {
        id: "module3",
        label: "Module 3: Context",
        description: "State management",
        completed: false,
        weight: 20,
        actionLabel: "Continue",
        onAction: () => alert("Resume module"),
      },
      {
        id: "module4",
        label: "Module 4: Performance",
        description: "Optimization techniques",
        completed: false,
        weight: 20,
      },
      {
        id: "final",
        label: "Final Project",
        description: "Build a complete app",
        completed: false,
        weight: 20,
      },
    ],
  },
};

/**
 * Compact variant
 */
export const CompactVariant: Story = {
  args: {
    variant: "compact",
    title: "Setup Progress",
    targetPercentage: 80,
    items: [
      { id: "1", label: "Step 1", completed: true, weight: 33 },
      { id: "2", label: "Step 2", completed: true, weight: 33 },
      { id: "3", label: "Step 3", completed: false, weight: 34 },
    ],
  },
};

/**
 * Show incomplete items only
 */
export const IncompleteOnly: Story = {
  args: {
    title: "Remaining Tasks",
    showIncompleteOnly: true,
    items: [
      { id: "1", label: "Task 1", completed: true, weight: 25 },
      { id: "2", label: "Task 2", completed: true, weight: 25 },
      { id: "3", label: "Task 3", completed: false, weight: 25, actionLabel: "Do it" },
      { id: "4", label: "Task 4", completed: false, weight: 25, actionLabel: "Do it" },
    ],
  },
};

/**
 * All items completed (empty state)
 */
export const AllCompleted: Story = {
  args: {
    title: "Profile Setup",
    showIncompleteOnly: true,
    targetPercentage: 100,
    items: [
      { id: "1", label: "Task 1", completed: true, weight: 33 },
      { id: "2", label: "Task 2", completed: true, weight: 33 },
      { id: "3", label: "Task 3", completed: true, weight: 34 },
    ],
  },
};

/**
 * Target reached (70% for HIVE)
 */
export const TargetReached: Story = {
  args: {
    title: "Profile Completion",
    targetPercentage: 70,
    targetReachedLabel: "✨ Profile Ready!",
    items: [
      { id: "bio", label: "Add bio", completed: true, weight: 25 },
      { id: "photo", label: "Upload photo", completed: true, weight: 25 },
      { id: "interests", label: "Select interests", completed: true, weight: 20 },
      { id: "connections", label: "Make connections", completed: true, weight: 15 },
      { id: "spaces", label: "Join spaces", completed: false, weight: 15 },
    ],
  },
};
