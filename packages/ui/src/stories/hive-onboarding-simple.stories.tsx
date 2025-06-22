"use client";

import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button, Card, Input } from "@hive/ui";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Simple onboarding without complex animations
function SimpleOnboarding() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(0, prev - 1));

  const steps = [
    // Step 1: Welcome
    <div key="welcome" className="text-center space-y-6">
      <h1 className="font-display text-4xl font-light text-white">HIVE</h1>
      <p className="text-[#6B7280]">Finally, your campus network</p>
      <Button onClick={handleNext} className="bg-[#FFD700] text-[#0A0A0A]">
        Enter HIVE <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>,

    // Step 2: Email
    <div key="email" className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-light text-white mb-2">
          Welcome to campus
        </h2>
        <p className="text-sm text-[#6B7280]">Enter your .edu email</p>
      </div>
      <Input
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        placeholder="your.name@university.edu"
        className="w-full bg-[#111111] border-[#2A2A2A] text-white"
      />
      <div className="flex gap-3">
        <Button onClick={handleBack} variant="outline" className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!email.includes(".edu")}
          className="flex-1 bg-[#FFD700] text-[#0A0A0A]"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>,

    // Step 3: Name
    <div key="name" className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-light text-white mb-2">
          What should we call you?
        </h2>
      </div>
      <Input
        type="text"
        value={fullName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFullName(e.target.value)
        }
        placeholder="Your full name"
        className="w-full bg-[#111111] border-[#2A2A2A] text-white"
      />
      <div className="flex gap-3">
        <Button onClick={handleBack} variant="outline" className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={fullName.length < 2}
          className="flex-1 bg-[#FFD700] text-[#0A0A0A]"
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#111111] border-[#2A2A2A] p-8">
        <div className="mb-6">
          <div className="w-full bg-[#2A2A2A] h-1 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFD700] rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            />
          </div>
          <div className="text-sm text-[#6B7280] mt-2 text-center">
            Step {step + 1} of 3
          </div>
        </div>

        {steps[step] || steps[0]}
      </Card>
    </div>
  );
}

const meta: Meta = {
  title: "Onboarding/Simple Test",
  component: SimpleOnboarding,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof SimpleOnboarding>;

export const Default: Story = {
  name: "Simple Onboarding",
};
