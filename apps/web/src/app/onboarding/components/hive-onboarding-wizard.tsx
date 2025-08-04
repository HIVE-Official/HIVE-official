"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { useUnifiedAuth } from "@hive/ui";
import { useOnboardingBridge } from "@/components/temp-stubs";
import type { OnboardingData } from "@hive/ui";
import { motion } from "framer-motion";
import { 
  HiveButton, 
  HiveCard, 
  HiveProgress, 
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
  Circle,
  Loader2
} from "lucide-react";

// Enhanced HIVE step components
import { HiveWelcomeStep } from "./steps/hive-welcome-step";
import { HiveUserTypeStep } from "./steps/hive-user-type-step";
import { HiveNameStep } from "./steps/hive-name-step";
import { HiveFacultyInfoStep } from "./steps/hive-faculty-info-step";
import { HiveAcademicsStep } from "./steps/hive-academics-step";
import { HiveHandleStep } from "./steps/hive-handle-step";
import { HivePhotoStep } from "./steps/hive-photo-step";
import { HiveBuilderStep } from "./steps/hive-builder-step";
import { HiveLegalStep } from "./steps/hive-legal-step";

// HIVE Progress Component using design system
function OnboardingProgress({ value, isComplete, className }: { 
  value: number;
  isComplete?: boolean;
  className?: string;
}) {
  return (
    <HiveProgress
      value={value}
      variant={isComplete ? "gradient" : "default"}
      size="lg"
      showValue={false}
      className={cn("w-full", className)}
    />
  );
}

// HIVE Step Indicator using design system
function StepIndicator({ 
  currentStep, 
  totalSteps,
  stepTitles 
}: { 
  currentStep: number; 
  totalSteps: number;
  stepTitles: string[];
}) {
  return (
    <HiveCard 
      variant="elevated" 
      className="hidden lg:block p-[var(--hive-spacing-6)]"
    >
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-[var(--hive-spacing-4)]">
        Setup Progress
      </h3>
      <div className="space-y-[var(--hive-spacing-3)]">
        {stepTitles.map((title, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <motion.div
              key={index}
              className="flex items-center gap-[var(--hive-spacing-3)] group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full border-2 transition-all duration-300",
                "flex items-center justify-center relative overflow-hidden",
                isCompleted
                  ? "bg-[var(--hive-status-success)]/20 border-[var(--hive-status-success)]/50 text-[var(--hive-status-success)]"
                  : isActive
                    ? "bg-[var(--hive-brand-primary)]/20 border-[var(--hive-brand-primary)]/50 text-[var(--hive-brand-primary)]"
                    : "bg-[var(--hive-background-tertiary)]/20 border-[var(--hive-border-subtle)] text-[var(--hive-text-muted)]"
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
                  ? "font-medium text-[var(--hive-text-primary)]"
                  : isCompleted
                    ? "text-[var(--hive-status-success)]"
                    : "text-[var(--hive-text-muted)]"
              )}>
                {title}
              </div>
            </motion.div>
          );
        })}
      </div>
    </HiveCard>
  );
}

// Types
export interface HiveOnboardingData {
  fullName: string;
  userType?: 'student' | 'alumni' | 'faculty';
  firstName?: string;
  lastName?: string;
  facultyEmail?: string;
  major: string;
  academicLevel?: string;
  graduationYear: number;
  handle: string;
  profilePhoto?: string;
  builderRequestSpaces?: string[];
  hasConsented: boolean;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}

const TOTAL_STEPS = 8;

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
  const onboardingBridge = useOnboardingBridge();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HiveOnboardingData>({
    fullName: "",
    userType: undefined,
    firstName: "",
    lastName: "",
    facultyEmail: "",
    major: "",
    academicLevel: "",
    graduationYear: new Date().getFullYear() + 4, // Default to 4 years from now
    handle: "",
    profilePhoto: "",
    builderRequestSpaces: [],
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
        return data.major.length > 0 && 
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
        major: data.userType === 'faculty' ? 'Faculty' : data.major,
        academicLevel: data.academicLevel,
        graduationYear: data.userType === 'faculty' ? new Date().getFullYear() : data.graduationYear,
        handle: data.userType === 'faculty' ? `${data.firstName?.toLowerCase()}.${data.lastName?.toLowerCase()}` : data.handle,
        avatarUrl: data.profilePhoto || "",
        builderRequestSpaces: data.builderRequestSpaces || [],
        consentGiven: data.hasConsented && data.acceptedTerms && data.acceptedPrivacy,
      };

      // Complete onboarding through the bridge
      const result = await onboardingBridge.completeOnboarding(onboardingData);
      
      if (!result.success) {
        throw new Error(result.error || 'Onboarding completion failed');
      }

      console.log('🎉 Onboarding completed successfully:', {
        user: result.user,
        builderRequestsCreated: result.builderRequestsCreated
      });

      // Auto-create spaces after onboarding
      const spaceResults = await onboardingBridge.createPostOnboardingSpaces(onboardingData);
      console.log('🏗️ Post-onboarding spaces:', spaceResults);

      // Show success animation
      setCurrentStep(TOTAL_STEPS);

      // Redirect after delay - give time for session to update
      setTimeout(() => {
        console.log('🚀 Redirecting to dashboard after onboarding completion');
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Onboarding error:", error);
      setError(error instanceof Error ? error.message : "Something went wrong");
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
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-[var(--hive-spacing-4)] relative overflow-hidden">
        {/* Background Effects using HIVE tokens */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-brand-primary)]/5 via-transparent to-[var(--hive-status-success)]/5" />
        
        <HiveCard 
          variant="elevated"
          className="max-w-md text-center p-[var(--hive-spacing-8)] relative z-10"
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
              className="mx-auto w-32 h-32 bg-gradient-to-br from-[var(--hive-status-success)]/20 via-[var(--hive-status-success)]/10 to-[var(--hive-status-success)]/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-[var(--hive-spacing-8)] border border-[var(--hive-status-success)]/30"
            >
              <Sparkles className="w-16 h-16 text-[var(--hive-status-success)]" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-[var(--hive-spacing-4)]"
            >
              <h2 className="text-4xl font-bold text-[var(--hive-text-primary)]">
                Welcome to HIVE, {data.fullName.split(" ")[0]}!
              </h2>
              <p className="text-xl text-[var(--hive-text-secondary)]">
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
                  className="absolute w-1 h-1 bg-[var(--hive-status-success)]/60 rounded-full"
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
        </HiveCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] flex relative overflow-hidden">
      {/* Background Effects using HIVE tokens */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-primary)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.02)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(255,215,0,0.03)_0%,transparent_50%)]" />
      
      {/* Header with HIVE Logo */}
      <motion.div 
        className="absolute top-0 left-0 right-0 z-20 border-b border-[var(--hive-border-primary)]/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto p-[var(--hive-spacing-6)]">
          <div className="flex items-center justify-center">
            <HiveLogo size="md" variant="gold" showWordmark={true} />
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-[var(--hive-spacing-4)] pt-24 relative z-10">
        <HiveCard 
          variant="elevated"
          className="w-full max-w-2xl overflow-hidden"
        >
          {/* Header with enhanced progress */}
          <div className="p-[var(--hive-spacing-6)] pb-[var(--hive-spacing-4)]">
            <div className="flex items-center justify-between mb-[var(--hive-spacing-4)]">
              <div className="flex items-center gap-[var(--hive-spacing-3)]">
                <div>
                  <div className="text-sm text-[var(--hive-text-muted)]">
                    {data.userType === 'faculty' ? (
                      `Step ${[0, 1, 2, 6, 7].indexOf(currentStep) + 1} of 5`
                    ) : (
                      `Step ${currentStep + 1} of ${TOTAL_STEPS}`
                    )}
                  </div>
                  <div className="text-lg font-semibold text-[var(--hive-text-primary)]">
                    {data.userType === 'faculty' && currentStep === 6 ? 'Request Management Access' : currentStepData?.title}
                  </div>
                </div>
              </div>
              <div className="text-sm text-[var(--hive-text-muted)]">
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
          <div className="p-[var(--hive-spacing-6)] pt-[var(--hive-spacing-2)]">
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
                className="mt-[var(--hive-spacing-6)]"
              >
                <HiveCard 
                  variant="announcement"
                  className="p-[var(--hive-spacing-4)]"
                >
                  <div className="flex items-center gap-[var(--hive-spacing-2)]">
                    <div className="w-5 h-5 bg-[var(--hive-status-error)]/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">!</span>
                    </div>
                    <span className="text-sm text-[var(--hive-status-error)]">{error}</span>
                  </div>
                </HiveCard>
              </motion.div>
            )}

            {/* Navigation using HIVE Buttons - Hidden on Welcome Step */}
            {currentStep !== 0 && (
              <div className="flex justify-between items-center mt-[var(--hive-spacing-8)] pt-[var(--hive-spacing-6)] mb-[var(--hive-spacing-6)]">
                <HiveButton
                  variant="secondary"
                  size="xl"
                  onClick={goBack}
                  disabled={!canGoBack()}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  data-testid="back-button"
                  aria-label="Go to previous step"
                >
                  Back
                </HiveButton>

                {currentStep === TOTAL_STEPS - 1 ? (
                  <HiveButton
                    variant="premium"
                    size="xl"
                    onClick={handleSubmit}
                    disabled={!canGoNext() || isSubmitting}
                    rightIcon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    data-testid="enter-hive-button"
                    aria-label="Complete onboarding and enter HIVE"
                  >
                    {isSubmitting ? "Creating your profile..." : "Enter HIVE"}
                  </HiveButton>
                ) : (
                  <HiveButton
                    variant="premium"
                    size="xl"
                    onClick={goNext}
                    disabled={!canGoNext()}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    data-testid="continue-button"
                    aria-label="Continue to next step"
                  >
                    Continue
                  </HiveButton>
                )}
              </div>
            )}
          </div>
        </HiveCard>
      </div>

      {/* Enhanced Sidebar */}
      <div className="hidden lg:block w-80 p-[var(--hive-spacing-6)] pt-24 relative z-10">
        <div className="sticky top-6 space-y-[var(--hive-spacing-6)]">
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
            <HiveCard 
              variant="elevated"
              className="p-[var(--hive-spacing-4)]"
            >
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-[var(--hive-spacing-4)]">
                Building your profile...
              </h3>
              
              {/* Overlapping Card Design */}
              <div className="relative space-y-3">
                {/* Profile Photo Card - Clean, no text */}
                <HiveCard
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
                    <div className="w-full h-full bg-[var(--hive-background-tertiary)]/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-[var(--hive-text-muted)]" />
                    </div>
                  )}
                </HiveCard>

                {/* Separate Info Cards - Overlapping slightly */}
                <div className="relative -ml-2 space-y-2">
                  {/* Name Card */}
                  <HiveCard variant="minimal" className="p-3 rotate-1">
                    <div className="text-xs text-[var(--hive-text-muted)] mb-1">Name</div>
                    <div className="text-[var(--hive-text-primary)] font-semibold text-sm">
                      {data.fullName || "Your name"}
                    </div>
                  </HiveCard>

                  {/* Handle Card */}
                  <HiveCard variant="gold-accent" className="p-3 -rotate-1 relative -mt-1">
                    <div className="text-xs text-[var(--hive-text-muted)] mb-1">Handle</div>
                    <div className="text-[var(--hive-brand-primary)] font-medium text-sm">
                      @{data.handle || "your-handle"}
                    </div>
                  </HiveCard>

                  {/* Major Card */}
                  <HiveCard variant="default" className="p-3 rotate-1 relative -mt-1">
                    <div className="text-xs text-[var(--hive-text-muted)] mb-1">Major</div>
                    <div className="text-[var(--hive-text-secondary)] text-sm">
                      {data.major || "Your major"}
                    </div>
                  </HiveCard>

                  {/* Builder Spaces Badge */}
                  {data.builderRequestSpaces && data.builderRequestSpaces.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <HiveCard variant="gold-accent" className="p-2 -rotate-1 relative -mt-1">
                        <div className="inline-flex items-center text-[var(--hive-brand-primary)] text-xs">
                          <Users className="w-3 h-3 mr-1" />
                          <span>{data.builderRequestSpaces.length} Space{data.builderRequestSpaces.length !== 1 ? 's' : ''}</span>
                        </div>
                      </HiveCard>
                    </motion.div>
                  )}
                </div>
              </div>
            </HiveCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}