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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  // Import the new design system components
  AcademicCardStep as UIAcademicCardStep,
  AvatarUploadStep as UIAvatarUploadStep,
  InterestsStep as UIInterestsStep,
  OnboardingCompleteStep as UIOnboardingCompleteStep,
} from "@hive/ui";
import { Loader2 } from "lucide-react";
import { debounce } from "lodash";
import { User } from "firebase/auth";

// A utility to generate a handle from a name
const generateHandle = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove special characters
    .trim()
    .replace(/\s+/g, "-"); // replace spaces with hyphens
};

interface StepProps {
  user: User;
  onNext: (nextStep?: number) => void;
  onPrev?: () => void;
}

export const DisplayNameStep: React.FC<StepProps> = ({
  user,
  onNext,
  onPrev,
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
        .replace(/\s+/g, " ");
      const capitalized = nameFromEmail
        .split(" ")
        .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
        .join(" ");
      setFullName(capitalized);
      setHandle(generateHandle(capitalized));
    }
  }, [user]);

  // Create a debounced function for handle checking
  const debouncedCheck = useCallback(
    debounce(async (h: string) => {
      if (h.length < 3) {
        setHandleError("Handle must be at least 3 characters.");
        setIsCheckingHandle(false);
        return;
      }
      setIsCheckingHandle(true);
      // const functions = getFunctions();
      // const checkHandle = httpsCallable(functions, 'checkHandleUniqueness');
      // const { data } = await checkHandle({ handle: h });
      // const isAvailable = (data as any).available;
      const isAvailable = !["admin", "test", "root"].includes(h); // Mocking
      setHandleError(isAvailable ? null : "This handle is already taken.");
      setIsCheckingHandle(false);
    }, 500),
    []
  );

  useEffect(() => {
    if (handle) {
      void debouncedCheck(handle);
    }
  }, [handle, debouncedCheck]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleError || isCheckingHandle) return;

    setIsLoading(true);
    try {
      // const functions = getFunctions();
      // const saveDisplayName = httpsCallable(functions, 'onboardingSaveDisplayName');
      // await saveDisplayName({ fullName, handle });
      console.log("Saving:", { fullName, handle });
      onNext(); // Proceed to the next step
    } catch (error) {
      console.error("Failed to save display name", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Welcome to HIVE</CardTitle>
        <CardDescription className="text-zinc-400">
          Let&apos;s set up your profile. How should we address you?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-zinc-300">
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
            <Label htmlFor="handle" className="text-zinc-300">
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
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                @
              </span>
              {isCheckingHandle && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" />
              )}
            </div>
            {handleError && (
              <p className="text-xs text-red-500 pt-1">{handleError}</p>
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
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
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

export const LeaderQuestionStep: React.FC<StepProps> = ({ onNext, onPrev }) => {
  const [choice, setChoice] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (choice === null) return;
    setIsLoading(true);
    try {
      // const functions = getFunctions();
      // const saveLeaderChoice = httpsCallable(functions, 'onboardingSaveLeaderChoice');
      // await saveLeaderChoice({ isLeaderCandidate: choice });
      console.log("Saving leader choice:", choice);
      if (choice) {
        onNext(3); // Go to Claim Space step
      } else {
        onNext(4); // Skip to Academic Card step
      }
    } catch (error) {
      console.error("Failed to save leader choice", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Are you a student leader?</CardTitle>
        <CardDescription className="text-zinc-400">
          Student leaders, club presidents, and event organizers get special
          tools on HIVE to manage their communities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <Button
            onClick={() => setChoice(true)}
            variant={choice === true ? "default" : "outline"}
            className={`w-full h-24 text-lg ${choice === true ? "bg-yellow-500 text-black border-yellow-500" : "border-zinc-700"}`}
          >
            Yes, I am
          </Button>
          <Button
            onClick={() => setChoice(false)}
            variant={choice === false ? "default" : "outline"}
            className={`w-full h-24 text-lg ${choice === false ? "bg-yellow-500 text-black border-yellow-500" : "border-zinc-700"}`}
          >
            No, not right now
          </Button>
        </div>
        <div className="flex gap-2">
          {onPrev && (
            <Button type="button" variant="outline" onClick={onPrev}>
              Back
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            className="w-full bg-zinc-700 text-white hover:bg-zinc-600"
            disabled={choice === null || isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const ClaimSpaceStep: React.FC<StepProps> = ({ onNext, onPrev }) => {
  const [spaceName, setSpaceName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock search results
  const mockSpaces = [
    "Computer Science Association",
    "Gaming Club",
    "Art Society",
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSpaces = mockSpaces.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spaceName) return;
    setIsLoading(true);
    try {
      // const functions = getFunctions();
      // const claimSpace = httpsCallable(functions, 'onboardingClaimSpace');
      // const { data } = await claimSpace({ spaceName });
      // const { verificationRequired } = data as any;
      const verificationRequired = true; // Mocking
      console.log("Claiming space:", { spaceName, verificationRequired });
      if (verificationRequired) {
        onNext(3.5); // Go to pending notice
      } else {
        onNext(4); // Go to academic card
      }
    } catch (error) {
      console.error("Failed to save space claim", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Claim Your Space</CardTitle>
        <CardDescription className="text-zinc-400">
          If you lead a club or organization, claim its Space on HIVE now.
          You&apos;ll get tools to manage members, post events, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search" className="text-zinc-300">
            Search for existing spaces
          </Label>
          <Input
            id="search"
            placeholder="e.g. 'Engineering Student Society'"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-800 border-zinc-700"
          />
          <div className="pt-2 space-y-2">
            {filteredSpaces.map((space) => (
              <div
                key={space}
                className="p-3 bg-zinc-800 rounded-md text-white text-sm"
              >
                {space}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-zinc-500 text-sm">or</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-space" className="text-zinc-300">
              Request a new space
            </Label>
            <Input
              id="new-space"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
              placeholder="Your Organization Name"
              required
            />
          </div>
          <div className="flex gap-2">
            {onPrev && (
              <Button type="button" variant="outline" onClick={onPrev}>
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              disabled={!spaceName || isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Request Space
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export const PendingNoticeStep: React.FC<StepProps> = ({ onNext, _onPrev }) => {
  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Verification Pending</CardTitle>
        <CardDescription className="text-zinc-400">
          Our team will review your request to claim this Space. You&apos;ll be
          notified once it&apos;s approved.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => onNext(4)}
          className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
        >
          Continue Onboarding
        </Button>
      </CardContent>
    </Card>
  );
};

export const AcademicCardStep: React.FC<StepProps> = ({ onNext }) => {
  const handleSubmit = async (data: {
    majorId: string;
    graduationYear: string;
    isFirstYear: boolean;
  }) => {
    try {
      // const functions = getFunctions();
      // const saveAcademicInfo = httpsCallable(functions, 'onboardingSaveAcademicInfo');
      // await saveAcademicInfo(data);
      console.log("Saving academic info:", data);
    } catch (error) {
      console.error("Failed to save academic info", error);
      throw error; // Re-throw to let UI component handle loading state
    }
  };

  return <UIAcademicCardStep onNext={onNext} onSubmit={handleSubmit} />;
};

export const AvatarUploadStep: React.FC<StepProps> = ({ onNext }) => {
  const handleSubmit = async (file: File | null) => {
    try {
      // const functions = getFunctions();
      // const saveAvatar = httpsCallable(functions, 'onboardingSaveAvatar');
      // await saveAvatar({ imageUrl: 'some-url' });
      console.log("Saving avatar:", file?.name || "No file selected");
    } catch (error) {
      console.error("Failed to save avatar", error);
      throw error;
    }
  };

  const handleSkip = () => {
    console.log("User skipped avatar upload");
  };

  return (
    <UIAvatarUploadStep
      onNext={onNext}
      onSubmit={handleSubmit}
      onSkip={handleSkip}
    />
  );
};

export const InterestsStep: React.FC<StepProps> = ({ onNext, onPrev }) => {
  const handleSubmit = async (interests: string[]) => {
    try {
      // const functions = getFunctions();
      // const saveInterests = httpsCallable(functions, 'onboardingSaveInterests');
      // await saveInterests({ interests });
      console.log("Saving interests:", interests);
    } catch (error) {
      console.error("Failed to save interests", error);
      throw error;
    }
  };

  const handleSkip = () => {
    console.log("User skipped interests selection");
  };

  return (
    <UIInterestsStep
      onNext={onNext}
      onSubmit={handleSubmit}
      onSkip={handleSkip}
      maxInterests={6}
    />
  );
};

export const OnboardingCompleteStep: React.FC<StepProps> = ({
  onNext,
  user,
}) => {
  // Extract user display name from email or user data
  const userDisplayName = user?.email?.split("@")[0] || "there";

  return (
    <UIOnboardingCompleteStep
      onNext={onNext}
      autoRedirectDelay={3000}
      showRedirectButton={false}
      userDisplayName={userDisplayName}
    />
  );
};
