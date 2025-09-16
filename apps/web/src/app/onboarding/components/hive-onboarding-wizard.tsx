"use client";

import React, { useState } from "react";
import { logger } from '@/lib/logger';

import { useRouter } from "next/navigation";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { useUnifiedAuth } from "@hive/ui";
import type { OnboardingData } from "@hive/ui";
import { motion } from "framer-motion";
import { 
  Button, 
  Card, 
  Progress, 
  HiveLogo 
} from "@hive/ui";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  User,
  Users,
  GraduationCap,
  AtSign,
  Camera,
  Wrench,
  Shield,
  CheckCircle,
  Loader2,
  Heart
} from "lucide-react";

// Enhanced HIVE step components
import { HiveWelcomeStep } from "./steps/hive-welcome-step";
import { HiveUserTypeStep } from "./steps/hive-user-type-step";
import { HiveNameStep } from "./steps/hive-name-step";
import { HiveFacultyInfoStep } from "./steps/hive-faculty-info-step";
import { HiveAcademicsStep } from "./steps/hive-academics-step";
import { HiveHandleStep } from "./steps/hive-handle-step";
import { HivePhotoStep } from "./steps/hive-photo-step";
import { HiveInterestsStep } from "./steps/hive-interests-step";
import { HiveBuilderStep } from "./steps/hive-builder-step";
import { HiveLegalStep } from "./steps/hive-legal-step";
import type { HiveOnboardingData } from "../types/onboarding-types";

// HIVE Progress Component using design system
function OnboardingProgress({ value, isComplete, className }: { 
  value: number;
  isComplete?: boolean;
  className?: string;
}) {
  return (
    <Progress
      value={value}
      variant="bar"
      status={isComplete ? "success" : "default"}
      size="lg"
      showValue={false}
      className={cn("w-full", className)}
    />
  );
}

// HIVE Step Indicator using design system
function StepIndicator({ 
  currentStep, 
  totalSteps: _totalSteps,
  stepTitles 
}: { 
  currentStep: number; 
  totalSteps: number;
  stepTitles: string[];
}) {
  return (
    <Card 
      variant="elevated" 
      className="hidden lg:block p-[1rem]"
    >
      <h3 className="text-lg font-semibold text-foreground mb-[1rem]">
        Setup Progress
      </h3>
      <div className="space-y-[1rem]">
        {stepTitles.map((title, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <motion.div
              key={index}
              className="flex items-center gap-[1rem] group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full border-2 transition-all duration-300",
                "flex items-center justify-center relative overflow-hidden",
                isCompleted
                  ? "bg-[rgb(var(--success))]/20 border-[rgb(var(--success))]/50 text-[rgb(var(--success))]"
                  : isActive
                    ? "bg-[rgb(var(--accent))]/20 border-[rgb(var(--accent))]/50 text-[rgb(var(--accent))]"
                    : "bg-[rgb(var(--surface))]/20 border-[rgb(var(--border))] text-muted"
              )}>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              
              <div className={cn(
                "flex-1 text-sm transition-colors duration-300",
                isActive
                  ? "font-medium text-foreground"
                  : isCompleted
                    ? "text-[rgb(var(--success))]"
                    : "text-muted"
              )}>
                {title}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}

// Types

const TOTAL_STEPS = 9; // Updated for interests step

const steps = [
  { 
    id: "welcome", 
    title: "Welcome to HIVE", 
    component: HiveWelcomeStep,
    icon: Sparkles,
    description: "Your journey begins"
  },
  { 
    id: "userType", 
    title: "Your Role", 
    component: HiveUserTypeStep,
    icon: Users,
    description: "Student, alumni, or faculty"
  },
  { 
    id: "name", 
    title: "Your Identity", 
    component: HiveNameStep,
    icon: User,
    description: "How you'll be known"
  },
  { 
    id: "academics", 
    title: "Academic Profile", 
    component: HiveAcademicsStep,
    icon: GraduationCap,
    description: "Your field of study"
  },
  { 
    id: "handle", 
    title: "Unique Handle", 
    component: HiveHandleStep,
    icon: AtSign,
    description: "Your @username"
  },
  { 
    id: "photo", 
    title: "Profile Picture", 
    component: HivePhotoStep,
    icon: Camera,
    description: "Show your personality"
  },
  { 
    id: "interests", 
    title: "Your Interests", 
    component: HiveInterestsStep,
    icon: Heart,
    description: "What you care about"
  },
  { 
    id: "builder", 
    title: "Builder Requests", 
    component: HiveBuilderStep,
    icon: Wrench,
    description: "Request builder access"
  },
  { 
    id: "legal", 
    title: "Terms & Privacy", 
    component: HiveLegalStep,
    icon: Shield,
    description: "Secure your account"
  },
];

export function HiveOnboardingWizard() {
  const router = useRouter();
  const unifiedAuth = useUnifiedAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HiveOnboardingData>({
    fullName: "",
    userType: undefined,
    firstName: "",
    lastName: "",
    facultyEmail: "",
    majors: [], // Changed from major: ""
    academicLevel: "",
    graduationYear: new Date().getFullYear() + 4, // Default to 4 years from now
    handle: "",
    profilePhoto: "",
    builderRequestSpaces: [],
    interests: [], // Added interests array
    hasConsented: false,
    acceptedTerms: false,
    acceptedPrivacy: false,
  });

  const updateData = (newData: Partial<HiveOnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const canGoNext = () => {
    const step = steps[currentStep];
    const currentYear = new Date().getFullYear();
    
    // Special validation for faculty users
    if (data.userType === 'faculty') {
      switch (currentStep) {
        case 0: // Welcome
          return true;
        case 1: // User Type
          return data.userType !== undefined;
        case 2: // Faculty Info (custom step)
          return data.firstName && data.firstName.trim().length >= 2 && 
                 data.lastName && data.lastName.trim().length >= 2;
        case 6: // Builder (space selection)
          return data.builderRequestSpaces && data.builderRequestSpaces.length > 0; // Required for faculty
        case 7: // Legal (skipped to)
          return data.acceptedTerms && data.acceptedPrivacy;
        default:
          return true;
      }
    }
    
    // Standard validation for students
    switch (step.id) {
      case "welcome":
        return true;
      case "userType":
        return data.userType !== undefined;
      case "name":
        return data.firstName && data.firstName.trim().length >= 2 && 
               data.lastName && data.lastName.trim().length >= 2;
      case "academics":
        return data.majors.length > 0 && 
               data.graduationYear >= currentYear && 
               data.graduationYear <= currentYear + 10;
      case "handle":
        return data.handle.length >= 3 && 
               data.handle.length <= 20 &&
               /^[a-zA-Z0-9]/.test(data.handle) &&
               /[a-zA-Z0-9]$/.test(data.handle) &&
               /^[a-zA-Z0-9._-]+$/.test(data.handle) &&
               !/[._-]{2,}/.test(data.handle);
      case "photo":
        return true; // Optional step
      case "interests":
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
      // Faculty get simplified flow: Welcome -> User Type -> Faculty Info -> Builder -> Legal
      if (data.userType === 'faculty') {
        if (currentStep === 1) { // From user type, go to faculty info (create custom step)
          setCurrentStep(2); // We'll replace step 2 with faculty info for faculty users
        } else if (currentStep === 2) { // From faculty info, go to builder step
          setCurrentStep(6); // Go to builder step (index 6)
        } else if (currentStep === 6) { // From builder, go to legal
          setCurrentStep(TOTAL_STEPS - 1); // Skip to legal step
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const goBack = () => {
    if (canGoBack()) {
      // Faculty get simplified flow: Welcome -> User Type -> Faculty Info -> Builder -> Legal
      if (data.userType === 'faculty') {
        if (currentStep === TOTAL_STEPS - 1) { // From legal, go back to builder
          setCurrentStep(6); // Go to builder step (index 6)
        } else if (currentStep === 6) { // From builder, go back to faculty info
          setCurrentStep(2); // Go to faculty info step (index 2)
        } else if (currentStep === 2) { // From faculty info, go back to user type
          setCurrentStep(1); // Go to user type step
        } else {
          setCurrentStep((prev) => prev - 1);
        }
      } else {
        setCurrentStep((prev) => prev - 1);
      }
    }
  };

  const handleSubmit = async () => {
    if (!canGoNext()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      if (!unifiedAuth.isAuthenticated || !unifiedAuth.user) {
        throw new Error("Authentication required. Please sign in again.");
      }
      
      // Prepare onboarding data for the bridge
      const onboardingData: OnboardingData = {
        fullName: data.fullName,
        userType: data.userType!,
        firstName: data.firstName,
        lastName: data.lastName,
        majors: data.userType === 'faculty' ? ['Faculty'] : data.majors,
        academicLevel: data.academicLevel,
        graduationYear: data.userType === 'faculty' ? new Date().getFullYear() : data.graduationYear,
        interests: data.interests || [],
        handle: data.userType === 'faculty' ? `${data.firstName?.toLowerCase()}.${data.lastName?.toLowerCase()}` : data.handle,
        avatarUrl: data.profilePhoto || "",
        builderRequestSpaces: data.builderRequestSpaces || [],
        consentGiven: data.hasConsented && data.acceptedTerms && data.acceptedPrivacy,
      };

      // Complete onboarding through the bridge
      const result = await unifiedAuth.completeOnboarding(onboardingData);
      
      if (!result.success) {
        throw new Error(result.error || 'Onboarding completion failed');
      }
      // Auto-create and join relevant spaces after onboarding
      try {
        const spaceCreationPromises = [];
        
        // Create/join cohort spaces based on major and graduation year
        if (data.userType === 'student' && data.majors && data.graduationYear) {
          data.majors.forEach(major => {
            // Create cohort space ID (e.g., "cs-2025", "psychology-2026")
            const cohortSpaceId = `${major.toLowerCase().replace(/\s+/g, '-')}-${data.graduationYear}`;
            spaceCreationPromises.push(
              fetch('/api/spaces/auto-join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  spaceType: 'cohort',
                  spaceId: cohortSpaceId,
                  spaceName: `${major} ${data.graduationYear}`,
                  userId: result.user?.id
                })
              })
            );
          });
        }
        
        // Join interest-based spaces
        if (data.interests && data.interests.length > 0) {
          data.interests.slice(0, 3).forEach(interest => {
            const interestSpaceId = `interest-${interest.toLowerCase().replace(/\s+/g, '-')}`;
            spaceCreationPromises.push(
              fetch('/api/spaces/auto-join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  spaceType: 'interest',
                  spaceId: interestSpaceId,
                  spaceName: interest,
                  userId: result.user?.id
                })
              })
            );
          });
        }
        
        // Execute all space joins in parallel
        const spaceResponses = await Promise.allSettled(spaceCreationPromises);
        const successfulJoins = spaceResponses.filter(r => r.status === 'fulfilled').length;
      } catch (spaceError) {
        // Don't fail onboarding if space creation fails
        logger.error('Space auto-join failed (non-critical):', { error: String(spaceError) });
      }

      // Show success animation
      setCurrentStep(TOTAL_STEPS);

      // Redirect after delay - give time for session to update
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      logger.error('Onboarding error:', { error: String(error) });
      
      // Enhanced error handling with user-friendly messages
      let userFriendlyError = "Something went wrong during setup.";
      
      if (error instanceof Error) {
        const errorMessage = error.message;
        
        if (errorMessage.includes('handle') && errorMessage.includes('taken')) {
          userFriendlyError = "This handle is already taken. Please choose a different one.";
        } else if (errorMessage.includes('handle') && errorMessage.includes('invalid')) {
          userFriendlyError = "Invalid handle format. Please use only letters, numbers, periods, hyphens, and underscores.";
        } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
          userFriendlyError = "Network error. Please check your connection and try again.";
        } else if (errorMessage.includes('consent') || errorMessage.includes('terms')) {
          userFriendlyError = "Please accept the terms and privacy policy to continue.";
        } else if (errorMessage.includes('authentication') || errorMessage.includes('token')) {
          userFriendlyError = "Session expired. Please sign in again.";
          // Redirect to login after showing error
          setTimeout(() => {
            router.push('/schools');
          }, 3000);
        } else if (errorMessage.includes('email') && errorMessage.includes('duplicate')) {
          userFriendlyError = "An account with this email already exists.";
        } else if (errorMessage.includes('server') || errorMessage.includes('500')) {
          userFriendlyError = "Server error. Please try again in a few moments.";
        } else if (errorMessage.includes('required')) {
          userFriendlyError = "Please fill in all required fields.";
        } else {
          userFriendlyError = errorMessage;
        }
      }
      
      setError(userFriendlyError);
      
      // Auto-clear error after 8 seconds
      setTimeout(() => {
        setError(null);
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate progress based on user type - faculty has simplified flow
  const getFacultyProgress = () => {
    const facultySteps = [0, 1, 2, 6, 7]; // Welcome, User Type, Faculty Info, Builder, Legal
    const currentStepIndex = facultySteps.indexOf(currentStep);
    return currentStepIndex >= 0 ? ((currentStepIndex + 1) / facultySteps.length) * 100 : 0;
  };
  
  const progress = data.userType === 'faculty' ? getFacultyProgress() : ((currentStep + 1) / TOTAL_STEPS) * 100;
  const CurrentStepComponent = steps[currentStep]?.component;
  const currentStepData = steps[currentStep];

  // Success state with HIVE branding
  if (currentStep >= TOTAL_STEPS) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-[1rem] relative overflow-hidden">
        {/* Background Effects using HIVE tokens */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--accent))]/5 via-transparent to-[rgb(var(--success))]/5" />
        
        <Card 
          variant="elevated"
          className="max-w-md text-center p-[1rem] relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto w-32 h-32 bg-gradient-to-br from-[rgb(var(--success))]/20 via-[rgb(var(--success))]/10 to-[rgb(var(--success))]/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-[1rem] border border-[rgb(var(--success))]/30"
            >
              <Sparkles className="w-16 h-16 text-[rgb(var(--success))]" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-[1rem]"
            >
              <h2 className="text-4xl font-bold text-foreground">
                Welcome to HIVE, {data.fullName.split(" ")[0]}!
              </h2>
              <p className="text-xl text-muted">
                Your profile is ready. Taking you to your new digital campus...
              </p>
            </motion.div>

            {/* Floating particles */}
            {Array.from({ length: 6 }).map((_, i) => {
              // Use deterministic values to avoid hydration mismatch
              const x = (i * 80 - 200 + (i % 2) * 100) % 400 - 200;
              const y = (i * 60 - 150 + (i % 3) * 80) % 400 - 200;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[rgb(var(--success))]/60 rounded-full"
                  initial={{ 
                    x,
                    y,
                    scale: 0
                  }}
                  animate={{
                    y: [0, -20, 0],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex relative overflow-hidden">
      {/* Background Effects using HIVE tokens */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--background))] via-[rgb(var(--surface))] to-[rgb(var(--background))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.02)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,215,0,0.03)_0%,transparent_50%)]" />
      
      {/* Header with HIVE Logo */}
      <motion.div 
        className="absolute top-0 left-0 right-0 z-20 border-b border-accent/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto p-[1rem]">
          <div className="flex items-center justify-center">
            <HiveLogo size="md" variant="gold" showWordmark={true} />
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-[1rem] pt-24 relative z-10">
        <Card 
          variant="elevated"
          className="w-full max-w-2xl overflow-hidden"
        >
          {/* Header with enhanced progress */}
          <div className="p-[1rem] pb-[1rem]">
            <div className="flex items-center justify-between mb-[1rem]">
              <div className="flex items-center gap-[1rem]">
                <div>
                  <div className="text-sm text-muted">
                    {data.userType === 'faculty' ? (
                      `Step ${[0, 1, 2, 6, 7].indexOf(currentStep) + 1} of 5`
                    ) : (
                      `Step ${currentStep + 1} of ${TOTAL_STEPS}`
                    )}
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {data.userType === 'faculty' && currentStep === 6 ? 'Request Management Access' : currentStepData?.title}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted">
                {Math.round(progress)}% complete
              </div>
            </div>
            <OnboardingProgress 
              value={progress} 
              isComplete={currentStep >= TOTAL_STEPS - 1}
              className="h-3" 
            />
          </div>

          {/* Step Content */}
          <div className="p-[1rem] pt-[1rem]">
            <motion.div
              key={currentStep}
              className="min-h-[500px] flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Special handling for faculty users at step 2 */}
              {data.userType === 'faculty' && currentStep === 2 ? (
                <HiveFacultyInfoStep
                  data={data}
                  updateData={updateData}
                  onNext={goNext}
                />
              ) : CurrentStepComponent && (
                <CurrentStepComponent
                  data={data}
                  updateData={updateData}
                  onNext={goNext}
                />
              )}
            </motion.div>

            {/* Error Display using HIVE Card */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-[1rem]"
              >
                <Card 
                  variant="announcement"
                  className="p-[1rem]"
                >
                  <div className="flex items-center gap-[1rem]">
                    <div className="w-5 h-5 bg-[rgb(var(--error))]/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">!</span>
                    </div>
                    <span className="text-sm text-[rgb(var(--error))]">{error}</span>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Navigation using HIVE Buttons - Hidden on Welcome Step */}
            {currentStep !== 0 && (
              <div className="flex justify-between items-center mt-[1rem] pt-[1rem] mb-[1rem]">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={goBack}
                  disabled={!canGoBack()}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  data-testid="back-button"
                  aria-label="Go to previous step"
                >
                  Back
                </Button>

                {currentStep === TOTAL_STEPS - 1 ? (
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!canGoNext() || isSubmitting}
                    rightIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    data-testid="enter-hive-button"
                    aria-label="Complete onboarding and enter HIVE"
                  >
                    {isSubmitting ? "Creating your profile..." : "Enter HIVE"}
                  </Button>
                ) : (
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={goNext}
                    disabled={!canGoNext()}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    data-testid="continue-button"
                    aria-label="Continue to next step"
                  >
                    Continue
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Enhanced Sidebar */}
      <div className="hidden lg:block w-80 p-[1rem] pt-24 relative z-10">
        <div className="sticky top-6 space-y-[1rem]">
          <StepIndicator 
            currentStep={data.userType === 'faculty' ? [0, 1, 2, 6, 7].indexOf(currentStep) : currentStep}
            totalSteps={data.userType === 'faculty' ? 5 : TOTAL_STEPS}
            stepTitles={data.userType === 'faculty' ? 
              ["Welcome to HIVE", "Your Role", "Faculty Information", "Request Management Access", "Terms & Privacy"] :
              steps.map(s => s.title)
            }
          />
          
          {/* Profile Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card 
              variant="elevated"
              className="p-[1rem]"
            >
              <h3 className="text-lg font-semibold text-foreground mb-[1rem]">
                Building your profile...
              </h3>
              
              {/* Overlapping Card Design */}
              <div className="relative space-y-3">
                {/* Profile Photo Card - Clean, no text */}
                <Card
                  variant="minimal"
                  className="w-20 h-24 p-0 overflow-hidden"
                >
                  {data.profilePhoto ? (
                    <Image
                      src={data.profilePhoto}
                      alt="Profile"
                      width={80}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[rgb(var(--surface))]/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-muted" />
                    </div>
                  )}
                </Card>

                {/* Separate Info Cards - Overlapping slightly */}
                <div className="relative -ml-2 space-y-2">
                  {/* Name Card */}
                  <Card variant="minimal" className="p-3 rotate-1">
                    <div className="text-xs text-muted mb-1">Name</div>
                    <div className="text-foreground font-semibold text-sm">
                      {data.fullName || "Your name"}
                    </div>
                  </Card>

                  {/* Handle Card */}
                  <Card variant="gold-accent" className="p-3 -rotate-1 relative -mt-1">
                    <div className="text-xs text-muted mb-1">Handle</div>
                    <div className="text-[rgb(var(--accent))] font-medium text-sm">
                      @{data.handle || "your-handle"}
                    </div>
                  </Card>

                  {/* Major Card */}
                  <Card variant="default" className="p-3 rotate-1 relative -mt-1">
                    <div className="text-xs text-muted mb-1">Majors</div>
                    <div className="text-muted text-sm">
                      {data.majors.length > 0 ? data.majors.join(", ") : "Your majors"}
                    </div>
                  </Card>

                  {/* Builder Spaces Badge */}
                  {data.builderRequestSpaces && data.builderRequestSpaces.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Card variant="gold-accent" className="p-2 -rotate-1 relative -mt-1">
                        <div className="inline-flex items-center text-[rgb(var(--accent))] text-xs">
                          <Users className="w-3 h-3 mr-1" />
                          <span>{data.builderRequestSpaces.length} Space{data.builderRequestSpaces.length !== 1 ? 's' : ''}</span>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}