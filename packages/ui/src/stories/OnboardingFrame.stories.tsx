// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { OnboardingFrame, FieldText, HiveLogo } from "../index";
import type { StepDescriptor } from "../organisms/stepper-header";
import { Input, Button } from "../index";

const steps: readonly StepDescriptor[] = [
  { id: "personal", title: "Personal", description: "Basics" },
  { id: "academic", title: "Academic", description: "Program" },
  { id: "interests", title: "Interests", description: "Signals" },
  { id: "review", title: "Review", description: "Confirm" },
];

const meta: Meta = {
  title: "Organisms/Onboarding/Frame",
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const [name, setName] = useState("");
    const goNext = () => setIndex((i) => Math.min(steps.length - 1, i + 1));
    const goBack = () => setIndex((i) => Math.max(0, i - 1));
    const completed = steps.slice(0, index).map((s) => s.id);
    const step = steps[index];
    return (
      <div className="max-w-3xl">
        <OnboardingFrame
          steps={steps}
          activeStepId={step.id}
          completedStepIds={completed}
          onNext={index < steps.length - 1 ? goNext : undefined}
          onBack={index > 0 ? goBack : undefined}
        >
          {step.id === "personal" && (
            <div className="space-y-2">
              <label className="text-sm font-semibold">Your name</label>
              <Input placeholder="Ava Nguyen" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          {step.id === "review" && (
            <div className="text-sm text-muted-foreground">
              <p>Review your info. Name: {name || "(not set)"}</p>
            </div>
          )}
        </OnboardingFrame>
      </div>
    );
  }
};

export const GoldAccent: Story = {
  render: () => (
    <div className="max-w-3xl">
      <OnboardingFrame
        steps={steps}
        activeStepId={"academic"}
        completedStepIds={["personal"]}
        accent="gold"
        onBack={() => {}}
        onNext={() => {}}
      >
        <div className="text-sm text-muted-foreground">
          Provide your program details.
        </div>
        <div className="pt-2">
          <Button className="brand-cta">Use gold CTA</Button>
        </div>
      </OnboardingFrame>
    </div>
  )
};

export const Conversational: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const [messages, setMessages] = useState<string[]>([]);
    const [userType, setUserType] = useState<string>("");
    const goNext = () => setIndex((i) => Math.min(steps.length - 1, i + 1));
    const goBack = () => setIndex((i) => Math.max(0, i - 1));
    const completed = steps.slice(0, index).map((s) => s.id);
    const step = steps[index];
    return (
      <div className="max-w-3xl">
        <OnboardingFrame
          variant="chat"
          accent="gold"
          steps={steps}
          activeStepId={step.id}
          completedStepIds={completed}
          onBack={index > 0 ? goBack : undefined}
          onNext={index < steps.length - 1 ? goNext : undefined}
          options={
            step.id === "personal"
              ? [
                  { value: "student", label: "Student" },
                  { value: "alumni", label: "Alumni" },
                  { value: "faculty", label: "Faculty" },
                ]
              : undefined
          }
          onOptionSelect={(val) => {
            setUserType(val);
            setMessages((prev) => [...prev, `I am ${val}.`]);
            setTimeout(goNext, 200);
          }}
        >
          {/* User message bubbles */}
          {messages.map((m, i) => (
            <div key={i} className="flex justify-end">
              <div className="max-w-prose rounded-2xl rounded-br-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm">
                {m}
              </div>
            </div>
          ))}

          {/* Composer */}
          <div className="pt-2">
            <FieldText
              multiline={false}
              placeholder={step.id === "personal" ? "Type your name…" : "Type a reply…"}
              size="sm"
              leading={<HiveLogo variant="white" size={16} aria-hidden />}
              onSubmit={(val) => {
                if (!val.trim()) return;
                setMessages((prev) => [...prev, val.trim()]);
                setTimeout(goNext, 250);
              }}
              sendOnEnter
            />
          </div>
        </OnboardingFrame>
      </div>
    );
  }
};
