import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { OnboardingFrame } from "@/organisms/onboarding/onboarding-frame";
import { Input } from "@/atoms/input";
import { Avatar } from "@/atoms/avatar";
import { Badge } from "@/atoms/badge";

const meta: Meta = {
  title: "Onboarding/Hybrid",
};
export default meta;

export const ChatStyle: StoryObj = {
  render: () => {
    const steps = [
      { id: "personal", title: "What should we call you?", description: "Names show on posts and events." },
      { id: "academic", title: "Your academics", description: "Pick up to 2 majors, or choose ‘Undecided’." },
      { id: "interests", title: "Pick your interests", description: "Choose at least 3 so HIVE feels like yours." },
      { id: "leadership", title: "Do you lead a group?", description: "Claim it now or verify later." },
      { id: "consent", title: "Review & consent" },
    ] as const;

    return (
      <div className="p-6">
        <OnboardingFrame
          steps={steps}
          activeStepId="personal"
          completedStepIds={[]}
          variant="chat"
          options={[
            { value: "alex", label: "Alex" },
            { value: "Jordan", label: "Jordan" },
            { value: "Taylor", label: "Taylor" },
          ]}
          onOptionSelect={() => {}}
        >
          <div className="flex items-center gap-3">
            <Avatar fallback="A" />
            <div className="grid w-full grid-cols-2 gap-3">
              <Input placeholder="First name" />
              <Input placeholder="Last name" />
              <div className="col-span-2">
                <Input placeholder="@handle (optional)" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-caption text-muted-foreground">
            <span>Suggested:</span>
            <Badge>alexw</Badge>
            <Badge>alex_w</Badge>
            <Badge>alex2025</Badge>
          </div>
        </OnboardingFrame>
      </div>
    );
  },
};

