"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  // Select,
  // SelectContent,
  // SelectItem,
  // SelectTrigger,
  // SelectValue,
  // Checkbox,
} from "@hive/ui";
import { Loader2 } from "lucide-react";
import { debounce } from "lodash";
import { User } from "@/hooks/use-session";
import { type OnboardingStepName } from "@hive/core";

// A utility to generate a handle from a name
const generateHandle = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\\s]/g, "") // remove special characters
    .trim()
    .replace(/\\s+/g, "-"); // replace spaces with hyphens
};

interface StepProps {
  user: User;
  onNext: (_nextStep?: number) => void;
  onPrev?: () => void;
  setCompletedSteps?: (_updater: (_prev: OnboardingStepName[]) => OnboardingStepName[]) => void;
}

export const DisplayNameStep: React.FC<StepProps> = ({
  user,
  onNext,
  onPrev,
  setCompletedSteps,
}) => {
  const [fullName, setFullName] = useState("");
  const [handle, setHandle] = useState("");
  const [isCheckingHandle, setIsCheckingHandle] = useState(false);
  const [handleError, setHandleError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Prefill from email
  useEffect(() => {
    if (user?.email) {
      const nameFromEmail = user.email
        .split("@")[0]
        .replace(/[._0-9]/g, " ")
        .replace(/\\s+/g, " ");
      const capitalized = nameFromEmail
        .split(" ")
        .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
        .join(" ");
      setFullName(capitalized);
      setHandle(generateHandle(capitalized));
    }
  }, [user]);

  // Create a debounced function for handle checking
  const debouncedCheck = debounce(async (h: string) => {
      if (h.length < 3) {
        setHandleError("Handle must be at least 3 characters.");
        setIsCheckingHandle(false);
        return;
      }
      setIsCheckingHandle(true);
      const isAvailable = !["admin", "test", "root"].includes(h); // Mocking
      setHandleError(isAvailable ? null : "This handle is already taken.");
      setIsCheckingHandle(false);
  }, 500);

  useEffect(() => {
    if (handle) {
      void debouncedCheck(handle);
    }
  }, [handle, debouncedCheck]);

  const handleStepComplete = useCallback((step: OnboardingStepName) => {
    setCompletedSteps?.(prev => [...prev, step]);
  }, [setCompletedSteps]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleError || isCheckingHandle) return;

    setIsLoading(true);
    try {
      console.info("Saving:", { fullName, handle });
      onNext(); // Proceed to the next step
      handleStepComplete("name");
    } catch (error) {
      console.error("Failed to save display name", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-[var(--hive-text-inverse)]">Welcome to HIVE</CardTitle>
        <CardDescription className="text-white/80">
          Let&apos;s set up your profile. How should we address you?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setHandle(generateHandle(e.target.value));
              }}
              className="bg-zinc-800 border-zinc-700"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="handle" className="text-white">
              Username (@handle)
            </Label>
            <div className="relative">
              <Input
                id="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="bg-zinc-800 border-zinc-700 pl-8"
                required
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                @
              </span>
              {isCheckingHandle && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" />
              )}
            </div>
            {handleError && (
              <p className="text-xs text-white pt-1">{handleError}</p>
            )}
          </div>
          <div className="flex gap-2">
            {onPrev && (
              <Button type="button" variant="outline" onClick={onPrev}>
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="w-full bg-yellow-500 text-[var(--hive-text-primary)] hover:bg-yellow-600"
              disabled={!!handleError || isCheckingHandle || isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export const LeaderQuestionStep: React.FC<StepProps> = ({
  onNext,
  onPrev,
  setCompletedSteps,
}) => {
  const [choice, setChoice] = useState<boolean | null>(null);

  const handleStepComplete = useCallback((step: OnboardingStepName) => {
    setCompletedSteps?.(prev => [...prev, step]);
  }, [setCompletedSteps]);

  const handleSubmit = async () => {
    try {
      console.info("Saving leader question response");
      onNext();
      handleStepComplete("builder");
    } catch (error) {
      console.error("Failed to save leader question", error);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-[var(--hive-text-inverse)]">Leadership Role</CardTitle>
        <CardDescription className="text-white/80">
          Would you like to take on a leadership role in your campus community?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            type="button"
            onClick={() => setChoice(true)}
            className={`w-full ${
              choice === true
                ? "bg-yellow-500 text-[var(--hive-text-primary)] hover:bg-yellow-600"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
          >
            Yes, I&apos;d like to lead
          </Button>
          <Button
            type="button"
            onClick={() => setChoice(false)}
            className={`w-full ${
              choice === false
                ? "bg-yellow-500 text-[var(--hive-text-primary)] hover:bg-yellow-600"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
          >
            No, I&apos;ll pass for now
          </Button>
        </div>
        <div className="mt-6 flex gap-2">
          {onPrev && (
            <Button type="button" variant="outline" onClick={onPrev}>
              Back
            </Button>
          )}
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-zinc-700 text-[var(--hive-text-inverse)] hover:bg-zinc-600"
            disabled={choice === null}
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const ClaimSpaceStep: React.FC<StepProps> = ({
  onNext,
  onPrev,
  setCompletedSteps,
}) => {
  const handleStepComplete = useCallback((step: OnboardingStepName) => {
    setCompletedSteps?.(prev => [...prev, step]);
  }, [setCompletedSteps]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.info("Saving space claims");
      onNext();
      handleStepComplete("builder");
    } catch (error) {
      console.error("Failed to save space claims", error);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-[var(--hive-text-inverse)]">Claim Your Space</CardTitle>
        <CardDescription className="text-white/80">
          Select the spaces you&apos;d like to lead
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Space list will be populated here */}
          </div>
          <div className="flex gap-2">
            {onPrev && (
              <Button type="button" variant="outline" onClick={onPrev}>
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="w-full bg-yellow-500 text-[var(--hive-text-primary)] hover:bg-yellow-600"
            >
              Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export const PendingNoticeStep: React.FC<StepProps> = ({
  onNext,
  setCompletedSteps,
}) => {
  const handleStepComplete = useCallback((step: OnboardingStepName) => {
    setCompletedSteps?.(prev => [...prev, step]);
  }, [setCompletedSteps]);

  const handleSubmit = async () => {
    try {
      console.info("Proceeding from pending notice");
      onNext();
      handleStepComplete("builder");
    } catch (error) {
      console.error("Failed to proceed from pending notice", error);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-[var(--hive-text-inverse)]">Request Pending</CardTitle>
        <CardDescription className="text-white/80">
          Your space leadership request is being reviewed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-[var(--hive-text-primary)] hover:bg-yellow-600"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};

export const AcademicCardStep: React.FC<StepProps> = ({
  onNext,
  setCompletedSteps,
}) => {
  const handleStepComplete = useCallback((step: OnboardingStepName) => {
    setCompletedSteps?.(prev => [...prev, step]);
  }, [setCompletedSteps]);

  const handleSubmit = async (data: Record<string, unknown> | null) => {
    console.info("Saving academic card:", data);
    onNext();
    handleStepComplete("academics");
  };

  return <div>Academic Card Step - Component not available</div>;
};

export const AvatarUploadStep: React.FC<StepProps> = ({
  onNext,
  setCompletedSteps,
}) => {
  const handleStepComplete = useCallback((step: OnboardingStepName) => {
    setCompletedSteps?.(prev => [...prev, step]);
  }, [setCompletedSteps]);

  const handleSubmit = async (data: Record<string, unknown> | null) => {
    console.info("Uploading avatar:", data);
    onNext();
    handleStepComplete("photo");
  };

  const handleSkip = () => {
    console.info("Skipping avatar upload");
    onNext();
    handleStepComplete("photo");
  };

  return <div>Avatar Upload Step - Component not available</div>;
};

export const InterestsStep: React.FC<StepProps> = ({
  onNext,
  setCompletedSteps,
}) => {
  const handleStepComplete = useCallback((step: OnboardingStepName) => {
    setCompletedSteps?.(prev => [...prev, step]);
  }, [setCompletedSteps]);

  const handleSubmit = async (data: Record<string, unknown> | null) => {
    console.info("Saving interests:", data);
    onNext();
    handleStepComplete("academics");
  };

  return <div>Interests Step - Component not available</div>;
};

export const OnboardingCompleteStep: React.FC<StepProps> = ({
  onNext,
  setCompletedSteps,
}) => {
  const handleStepComplete = useCallback((step: OnboardingStepName) => {
    setCompletedSteps?.(prev => [...prev, step]);
  }, [setCompletedSteps]);

  const handleSubmit = async () => {
    try {
      console.info("Completing onboarding");
      onNext();
      handleStepComplete("legal");
    } catch (error) {
      console.error("Failed to complete onboarding", error);
    }
  };

  return <div>Onboarding Complete Step - Component not available</div>;
};
