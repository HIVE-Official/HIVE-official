import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DisplayNameStep } from "../../components/onboarding/DisplayNameStep";
import { LeaderQuestionStep } from "../../components/onboarding/LeaderQuestionStep";

const meta: Meta = {
  title: "Flows/Onboarding",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Mock handle check function that simulates API delay
const mockHandleCheck = async (handle: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return !["admin", "test", "root"].includes(handle);
};

export const FullFlow: StoryObj = {
  render: () => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
      fullName: "",
      handle: "",
      isLeader: false,
    });

    const handleNext = (nextStep: number) => {
      setStep(nextStep);
    };

    const handleLeaderAnswer = (isLeader: boolean) => {
      setData((prev) => ({ ...prev, isLeader }));
    };

    switch (step) {
      case 1:
        return (
          <DisplayNameStep
            email="john.doe@buffalo.edu"
            onNext={handleNext}
            onHandleCheck={mockHandleCheck}
          />
        );
      case 2:
        return (
          <LeaderQuestionStep
            onNext={handleNext}
            onAnswer={handleLeaderAnswer}
          />
        );
      default:
        return (
          <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
            Flow completed! Current data:
            <pre className="mt-4 p-4 bg-zinc-900 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
    }
  },
}; 