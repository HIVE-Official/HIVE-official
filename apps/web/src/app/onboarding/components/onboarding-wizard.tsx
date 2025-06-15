"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/hooks";
import { Button, Card } from "@hive/ui";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { MotionDiv, AnimatePresence } from "@hive/ui";

// Step components
import { WelcomeStep } from "./steps/welcome-step";
import { NameStep } from "./steps/name-step";
import { AcademicsStep } from "./steps/academics-step";
import { HandleStep } from "./steps/handle-step";
import { PhotoStep } from "./steps/photo-step";
import { BuilderStep } from "./steps/builder-step";
import { LegalStep } from "./steps/legal-step";

// Simple Progress component
function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`w-full bg-zinc-800 rounded-full h-2 ${className}`}>
      <div
        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

// Types
export interface OnboardingData {
  fullName: string;
  major: string;
  graduationYear: number;
  handle: string;
  profilePhoto?: string;
  isBuilder: boolean;
  hasConsented: boolean;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}

const TOTAL_STEPS = 7;

const steps = [
  { id: "welcome", title: "Welcome", component: WelcomeStep },
  { id: "name", title: "Your Name", component: NameStep },
  { id: "academics", title: "Academics", component: AcademicsStep },
  { id: "handle", title: "Username", component: HandleStep },
  { id: "photo", title: "Profile Photo", component: PhotoStep },
  { id: "builder", title: "Builder Status", component: BuilderStep },
  { id: "legal", title: "Terms & Privacy", component: LegalStep },
];

export function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    fullName: "",
    major: "",
    graduationYear: new Date().getFullYear(),
    handle: "",
    isBuilder: false,
    hasConsented: false,
    acceptedTerms: false,
    acceptedPrivacy: false,
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const canGoNext = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case "welcome":
        return true;
      case "name":
        return data.fullName.trim().length > 0;
      case "academics":
        return data.major.length > 0;
      case "handle":
        return data.handle.length > 0;
      case "photo":
        return true; // Optional step
      case "builder":
        return true;
      case "legal":
        return data.acceptedTerms && data.acceptedPrivacy;
      default:
        return false;
    }
  };

  const canGoBack = () => {
    return currentStep > 0;
  };

  const goNext = () => {
    if (currentStep < TOTAL_STEPS - 1 && canGoNext()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (canGoBack()) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canGoNext()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error || "Failed to complete onboarding");
      }

      // Show success animation
      setCurrentStep(TOTAL_STEPS); // Go to success state

      // Redirect after delay
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("Onboarding error:", error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;
  const CurrentStepComponent = steps[currentStep]?.component;

  // Success state
  if (currentStep >= TOTAL_STEPS) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <MotionDiv
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6"
          >
            <Sparkles className="w-12 h-12 text-yellow-500" />
          </MotionDiv>
          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Welcome to HIVE, {data.fullName.split(" ")[0]}!
          </MotionDiv>
          <MotionDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-zinc-400 text-lg"
          >
            Your profile is ready. Taking you to your new home...
          </MotionDiv>
        </MotionDiv>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-zinc-400">
                Step {currentStep + 1} of {TOTAL_STEPS}
              </div>
              <div className="text-sm text-zinc-400">
                {steps[currentStep]?.title}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="px-6 pt-0">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-[400px] flex flex-col"
              >
                {CurrentStepComponent && (
                  <CurrentStepComponent
                    data={data}
                    updateData={updateData}
                    onNext={goNext}
                  />
                )}
              </MotionDiv>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 mb-6 border-t border-zinc-800">
              <Button
                variant="ghost"
                onClick={goBack}
                disabled={!canGoBack()}
                className="text-zinc-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentStep === TOTAL_STEPS - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!canGoNext() || isSubmitting}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                >
                  {isSubmitting ? "Creating your profile..." : "Enter HIVE"}
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={goNext}
                  disabled={!canGoNext()}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Preview Sidebar */}
      <div className="hidden lg:block w-80 bg-zinc-950 border-l border-zinc-800 p-6">
        <div className="sticky top-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Building your profile...
          </h3>
          <Card className="bg-zinc-900 border-zinc-800">
            <div className="p-4">
              <div className="space-y-4">
                {/* Profile Photo Preview */}
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
                  {data.profilePhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={data.profilePhoto}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-zinc-700 rounded-full" />
                  )}
                </div>

                {/* Name */}
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Name</div>
                  <div className="text-white font-medium">
                    {data.fullName || "Your name"}
                  </div>
                </div>

                {/* Handle */}
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Handle</div>
                  <div className="text-yellow-500">
                    @{data.handle || "your-handle"}
                  </div>
                </div>

                {/* Major */}
                <div>
                  <div className="text-sm text-zinc-500 mb-1">Major</div>
                  <div className="text-zinc-300">
                    {data.major || "Your major"}
                  </div>
                </div>

                {/* Builder Badge */}
                {data.isBuilder && (
                  <div className="inline-flex items-center px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">
                    Builder
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
