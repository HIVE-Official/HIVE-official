"use client";

import React, { useState, useEffect } from "react";
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
  // Import the new design system components
  AcademicCardStep as UIAcademicCardStep,
  InterestsStep as UIInterestsStep,
  OnboardingCompleteStep as UIOnboardingCompleteStep,
  ClaimSpaceStep as UIClaimSpaceStep,
} from "@hive/ui";
import { Loader2, Upload } from "lucide-react";
import { debounce } from "lodash";
import { AuthUser } from "@hive/auth-logic";
import { logger } from "@hive/core";
import type { OnboardingState } from "@hive/core";

// A utility to generate a handle from a name
const generateHandle = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\\s]/g, "") // remove special characters
    .trim()
    .replace(/\\s+/g, "-"); // replace spaces with hyphens
};

interface StepProps {
  user: AuthUser;
  onNext: (nextStep?: number, data?: Partial<OnboardingState>) => void;
  onPrev?: () => void;
  data?: Partial<OnboardingState>;
}

export const DisplayNameAvatarStep: React.FC<StepProps> = ({
  user,
  onNext,
  onPrev,
  data,
}) => {
  const [fullName, setFullName] = useState<string>(data?.fullName || "");
  const [handle, setHandle] = useState<string>(data?.handle || "");
  const [isCheckingHandle, setIsCheckingHandle] = useState(false);
  const [handleError, setHandleError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(data?.avatarUrl || null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleError || isCheckingHandle) return;

    setIsLoading(true);
    try {
      // Upload avatar if selected
      let avatarUrl = data?.avatarUrl;
      if (selectedFile) {
        // TODO: Implement avatar upload
        avatarUrl = previewUrl; // Temporary for development
      }

      onNext(undefined, {
        fullName,
        handle,
        avatarUrl,
      });
    } catch (error) {
      logger.error("Failed to save display name and avatar", error);
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
          <div className="space-y-4">
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
            <div className="space-y-2">
              <Label className="text-zinc-300">Profile Picture</Label>
              <div className="flex items-center gap-4">
                {previewUrl ? (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-zinc-500" />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("avatar-upload")?.click()}
                  >
                    Choose Photo
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            {onPrev && (
              <Button
                type="button"
                variant="outline"
                onClick={onPrev}
                disabled={isLoading}
              >
                Back
              </Button>
            )}
            <Button type="submit" disabled={isLoading || !!handleError}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
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
  data,
}) => {
  const [isLeader, setIsLeader] = useState<boolean | null>(data?.isLeader || null);

  const handleSubmit = async () => {
    if (isLeader === null) return;

    onNext(undefined, {
      isLeader,
      shouldClaimSpace: isLeader,
    });
  };

  return (
    <Card className="w-full max-w-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Are you a leader?</CardTitle>
        <CardDescription className="text-muted-foreground">
          Leaders can create and manage spaces for their organizations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <Button
            type="button"
            onClick={() => setIsLeader(true)}
            variant="surface"
            className={`w-full ${
              isLeader === true
                ? "bg-surface-03"
                : ""
            }`}
          >
            Yes, I&apos;m a leader
          </Button>
          <Button
            type="button"
            onClick={() => setIsLeader(false)}
            variant="surface"
            className={`w-full ${
              isLeader === false
                ? "bg-surface-03"
                : ""
            }`}
          >
            No, I&apos;m a member
          </Button>
        </div>

        <div className="flex gap-2">
          {onPrev && (
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            variant="default"
            onClick={handleSubmit}
            className="flex-1"
            disabled={isLeader === null}
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
  data,
}) => {
  const [spaceName, setSpaceName] = useState<string>(data?.spaceName || "");
  const [spaceDescription, setSpaceDescription] = useState<string>(data?.spaceDescription || "");
  const [isLoading, setIsLoading] = useState(false);

  // Skip this step if they're not a leader
  useEffect(() => {
    if (data?.isLeader === false) {
      onNext();
    }
  }, [data?.isLeader, onNext]);

  const handleSubmit = async () => {
    if (!spaceName || !spaceDescription) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement space creation
      logger.info("Creating space:", { spaceName, spaceDescription });
      
      onNext(undefined, {
        spaceName,
        spaceDescription,
        spaceCreated: true,
      });
    } catch (error) {
      logger.error("Failed to create space", error);
      setIsLoading(false);
    }
  };

  return (
    <UIClaimSpaceStep
      spaceName={spaceName}
      spaceDescription={spaceDescription}
      onSpaceNameChange={(value: string) => setSpaceName(value)}
      onSpaceDescriptionChange={(value: string) => setSpaceDescription(value)}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onBack={onPrev}
    />
  );
};

export const AcademicCardStep: React.FC<StepProps> = ({
  onNext,
  onPrev,
  data,
}) => {
  const handleSubmit = async (formData: { major: string; graduationYear: number } | null) => {
    if (!formData) return;

    onNext(undefined, {
      major: formData.major,
      graduationYear: formData.graduationYear,
    } as Partial<OnboardingState>);
  };

  return (
    <UIAcademicCardStep
      initialData={{
        major: data?.major || "",
        graduationYear: data?.graduationYear || new Date().getFullYear() + 4,
      }}
      onSubmit={handleSubmit}
      onBack={onPrev}
    />
  );
};

export const InterestsStep: React.FC<StepProps> = ({
  onNext,
  onPrev,
  data,
}) => {
  const handleSubmit = async (formData: { interests: string[] } | null) => {
    if (!formData) return;
    
    onNext(undefined, {
      interests: formData.interests,
    });
  };

  return (
    <UIInterestsStep
      initialInterests={data?.interests || []}
      onSubmit={handleSubmit}
      onBack={onPrev}
    />
  );
};

export const OnboardingCompleteStep: React.FC<StepProps> = ({
  onNext,
  user: _user,
}) => {
  const handleSubmit = async () => {
    try {
      logger.info("Completing onboarding");
      onNext();
    } catch (error) {
      logger.error("Failed to complete onboarding", error);
    }
  };

  return <UIOnboardingCompleteStep onSubmit={handleSubmit} />;
};
