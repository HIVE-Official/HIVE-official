"use client";

import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';
import { HiveButton } from '../hive-button';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  Search,
  Zap,
  BookOpen,
  Users,
  Scale,
  Camera,
  User,
  Hash,
  GraduationCap,
  Loader2
} from 'lucide-react';

// =============================================================================
// ONBOARDING STATE MANAGEMENT
// =============================================================================

export type OnboardingStep = 
  | 'welcome'      // Welcome to HIVE
  | 'name'         // Full name input
  | 'handle'       // @username selection
  | 'photo'        // Profile photo upload
  | 'academics'    // University, major, year
  | 'builder'      // Builder interest assessment
  | 'legal'        // Terms, privacy, community guidelines
  | 'complete';    // Onboarding complete

export interface OnboardingState {
  step: OnboardingStep;
  currentStepIndex: number;
  loading: boolean;
  error: string | null;
  data: {
    name: string;
    handle: string;
    photoUrl?: string;
    university: string;
    major: string;
    graduationYear: string;
    interests: string[];
    builderExperience: 'none' | 'beginner' | 'intermediate' | 'advanced';
    builderGoals: string[];
    agreedToTerms: boolean;
    agreedToPrivacy: boolean;
    agreedToCommunity: boolean;
  };
}

export interface OnboardingContextType {
  state: OnboardingState;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: OnboardingStep) => void;
  updateData: (updates: Partial<OnboardingState['data']>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  canProceed: () => boolean;
  completeOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}

// =============================================================================
// ONBOARDING PROVIDER
// =============================================================================

const STEP_ORDER: OnboardingStep[] = [
  'welcome', 'name', 'handle', 'photo', 'academics', 'builder', 'legal', 'complete'
];

interface OnboardingProviderProps {
  children: React.ReactNode;
  onComplete?: (userData: OnboardingState['data']) => void;
  initialStep?: OnboardingStep;
  mockMode?: boolean;
}

export function OnboardingProvider({ 
  children, 
  onComplete, 
  initialStep = 'welcome',
  mockMode = false 
}: OnboardingProviderProps) {
  const [state, setState] = useState<OnboardingState>({
    step: initialStep,
    currentStepIndex: STEP_ORDER.indexOf(initialStep),
    loading: false,
    error: null,
    data: {
      name: '',
      handle: '',
      university: '',
      major: '',
      graduationYear: '',
      interests: [],
      builderExperience: 'none',
      builderGoals: [],
      agreedToTerms: false,
      agreedToPrivacy: false,
      agreedToCommunity: false,
    },
  });

  const nextStep = () => {
    const nextIndex = Math.min(state.currentStepIndex + 1, STEP_ORDER.length - 1);
    setState(prev => ({
      ...prev,
      step: STEP_ORDER[nextIndex],
      currentStepIndex: nextIndex,
      error: null,
    }));
  };

  const prevStep = () => {
    const prevIndex = Math.max(state.currentStepIndex - 1, 0);
    setState(prev => ({
      ...prev,
      step: STEP_ORDER[prevIndex],
      currentStepIndex: prevIndex,
      error: null,
    }));
  };

  const setStep = (step: OnboardingStep) => {
    const stepIndex = STEP_ORDER.indexOf(step);
    setState(prev => ({
      ...prev,
      step,
      currentStepIndex: stepIndex,
      error: null,
    }));
  };

  const updateData = (updates: Partial<OnboardingState['data']>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...updates },
    }));
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const canProceed = (): boolean => {
    const { data, step } = state;

    switch (step) {
      case 'welcome':
        return true;
      case 'name':
        return data.name.trim().length >= 2;
      case 'handle':
        return data.handle.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(data.handle);
      case 'photo':
        return true; // Photo is optional
      case 'academics':
        return data.university.trim().length > 0 && data.major.trim().length > 0 && data.graduationYear.length > 0;
      case 'builder':
        return data.builderExperience !== 'none' || data.builderGoals.length > 0;
      case 'legal':
        return data.agreedToTerms && data.agreedToPrivacy && data.agreedToCommunity;
      case 'complete':
        return true;
      default:
        return false;
    }
  };

  const completeOnboarding = async () => {
    setLoading(true);
    setError(null);

    try {
      if (mockMode) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        onComplete?.(state.data);
      } else {
        // Real implementation would go here
        console.log('Complete onboarding:', state.data);
        onComplete?.(state.data);
      }
    } catch (error) {
      setError('Failed to complete onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contextValue: OnboardingContextType = {
    state,
    nextStep,
    prevStep,
    setStep,
    updateData,
    setLoading,
    setError,
    canProceed,
    completeOnboarding,
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
}

// =============================================================================
// MAIN ONBOARDING WIZARD
// =============================================================================

interface HiveOnboardingWizardProps {
  className?: string;
  onComplete?: (userData: OnboardingState['data']) => void;
  initialStep?: OnboardingStep;
  mockMode?: boolean;
}

export function HiveOnboardingWizard({ 
  className, 
  onComplete,
  initialStep = 'welcome',
  mockMode = false 
}: HiveOnboardingWizardProps) {
  return (
    <OnboardingProvider 
      onComplete={onComplete} 
      initialStep={initialStep}
      mockMode={mockMode}
    >
      <div className={cn(
        "min-h-screen flex items-center justify-center p-4",
        "bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]",
        className
      )}>
        <div className="w-full max-w-2xl">
          <OnboardingStepRenderer />
        </div>
      </div>
    </OnboardingProvider>
  );
}

// =============================================================================
// STEP RENDERER
// =============================================================================

function OnboardingStepRenderer() {
  const { state } = useOnboarding();

  switch (state.step) {
    case 'welcome':
      return <WelcomeStep />;
    case 'name':
      return <NameStep />;
    case 'handle':
      return <HandleStep />;
    case 'photo':
      return <PhotoStep />;
    case 'academics':
      return <AcademicsStep />;
    case 'builder':
      return <BuilderStep />;
    case 'legal':
      return <LegalStep />;
    case 'complete':
      return <CompleteStep />;
    default:
      return <WelcomeStep />;
  }
}

// =============================================================================
// SHARED COMPONENTS
// =============================================================================

function ProgressBar() {
  const { state } = useOnboarding();
  const progress = ((state.currentStepIndex + 1) / STEP_ORDER.length) * 100;

  return (
    <div className="w-full h-2 bg-[var(--hive-background-secondary)] rounded-full overflow-hidden">
      <div 
        className="h-full bg-[var(--hive-brand-primary)] transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function StepNavigation({ canGoBack = true, nextLabel = "Continue" }) {
  const { state, prevStep, nextStep, canProceed } = useOnboarding();

  return (
    <div className="flex justify-between items-center pt-6">
      {canGoBack && state.currentStepIndex > 0 ? (
        <HiveButton
          variant="ghost"
          onClick={prevStep}
          disabled={state.loading}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </HiveButton>
      ) : (
        <div />
      )}

      <HiveButton
        variant="premium"
        onClick={nextStep}
        disabled={!canProceed() || state.loading}
        className="flex items-center gap-2"
      >
        {state.loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {nextLabel}
        <ArrowRight className="h-4 w-4" />
      </HiveButton>
    </div>
  );
}

// =============================================================================
// ONBOARDING STEPS
// =============================================================================

function WelcomeStep() {
  return (
    <div className="glass rounded-3xl p-8 space-y-8">
      <ProgressBar />
      
      <div className="text-center space-y-6">
        {/* Animated HIVE Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-[var(--hive-brand-primary)] rounded-3xl flex items-center justify-center animate-pulse">
            <div className="w-10 h-10 bg-[var(--hive-background-primary)] rounded-xl" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[var(--hive-text-primary)]">
            Welcome to HIVE
          </h1>
          <p className="text-xl text-[var(--hive-text-muted)] max-w-md mx-auto">
            Let's build your builder profile and get you connected to your campus community
          </p>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
            What you'll do:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-[var(--hive-text-muted)]">
              <User className="h-4 w-4 text-[var(--hive-brand-primary)]" />
              Set up your profile
            </div>
            <div className="flex items-center gap-2 text-[var(--hive-text-muted)]">
              <GraduationCap className="h-4 w-4 text-[var(--hive-brand-primary)]" />
              Connect to your university
            </div>
            <div className="flex items-center gap-2 text-[var(--hive-text-muted)]">
              <Zap className="h-4 w-4 text-[var(--hive-brand-primary)]" />
              Choose your builder path
            </div>
          </div>
        </div>
      </div>

      <StepNavigation canGoBack={false} nextLabel="Get Started" />
    </div>
  );
}

function NameStep() {
  const { state, updateData, setError } = useOnboarding();

  const handleNameChange = (name: string) => {
    updateData({ name });
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
    } else {
      setError(null);
    }
  };

  return (
    <div className="glass rounded-3xl p-8 space-y-8">
      <ProgressBar />
      
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)]">
            What's your name?
          </h2>
          <p className="text-[var(--hive-text-muted)]">
            This is how you'll appear to other builders in your campus community
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={state.data.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Alex Rivera"
              className="w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all"
              disabled={state.loading}
            />
          </div>

          {state.error && (
            <p className="text-sm text-[var(--hive-status-error)]">{state.error}</p>
          )}
        </div>
      </div>

      <StepNavigation />
    </div>
  );
}

function HandleStep() {
  const { state, updateData, setError } = useOnboarding();

  const handleUsernameChange = (handle: string) => {
    // Remove @ if user types it
    const cleanHandle = handle.replace('@', '');
    updateData({ handle: cleanHandle });
    
    if (cleanHandle.length < 3) {
      setError('Username must be at least 3 characters');
    } else if (!/^[a-zA-Z0-9_]+$/.test(cleanHandle)) {
      setError('Username can only contain letters, numbers, and underscores');
    } else {
      setError(null);
    }
  };

  return (
    <div className="glass rounded-3xl p-8 space-y-8">
      <ProgressBar />
      
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Hash className="h-8 w-8 text-[var(--hive-brand-primary)] mx-auto" />
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)]">
            Choose your handle
          </h2>
          <p className="text-[var(--hive-text-muted)]">
            Your unique identifier that other builders will use to find and mention you
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg text-[var(--hive-text-muted)]">
                @
              </span>
              <input
                type="text"
                value={state.data.handle}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder="alexrivera"
                className="w-full h-14 pl-8 pr-4 text-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all"
                disabled={state.loading}
              />
            </div>
          </div>

          {state.error && (
            <p className="text-sm text-[var(--hive-status-error)]">{state.error}</p>
          )}

          {state.data.handle && !state.error && (
            <div className="glass rounded-xl p-3 bg-[var(--hive-status-success)]/10 border border-[var(--hive-status-success)]/20">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[var(--hive-status-success)]" />
                <span className="text-sm text-[var(--hive-status-success)]">
                  @{state.data.handle} is available
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <StepNavigation />
    </div>
  );
}

function PhotoStep() {
  const { state, updateData } = useOnboarding();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const photoUrl = URL.createObjectURL(file);
      updateData({ photoUrl });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const photoUrl = URL.createObjectURL(file);
      updateData({ photoUrl });
    }
  };

  return (
    <div className="glass rounded-3xl p-8 space-y-8">
      <ProgressBar />
      
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Camera className="h-8 w-8 text-[var(--hive-brand-primary)] mx-auto" />
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)]">
            Add a profile photo
          </h2>
          <p className="text-[var(--hive-text-muted)]">
            Help other builders recognize you (you can skip this step)
          </p>
        </div>

        <div className="flex justify-center">
          {state.data.photoUrl ? (
            <div className="relative">
              <img
                src={state.data.photoUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-[var(--hive-brand-primary)]"
              />
              <button
                onClick={() => updateData({ photoUrl: undefined })}
                className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--hive-status-error)] rounded-full flex items-center justify-center text-white text-sm font-bold hover:bg-[var(--hive-status-error)]/80 transition-colors"
              >
                ×
              </button>
            </div>
          ) : (
            <div
              className={cn(
                "w-64 h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all",
                dragActive 
                  ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10" 
                  : "border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)]"
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              <Upload className="h-12 w-12 text-[var(--hive-text-muted)]" />
              <div className="text-center">
                <p className="text-[var(--hive-text-primary)] font-medium">
                  Drop a photo here
                </p>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  or click to browse
                </p>
              </div>
            </div>
          )}
        </div>

        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      <StepNavigation nextLabel={state.data.photoUrl ? "Continue" : "Skip for now"} />
    </div>
  );
}

function AcademicsStep() {
  const { state, updateData } = useOnboarding();

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from(
    { length: 8 }, 
    (_, i) => (currentYear + i).toString()
  );

  return (
    <div className="glass rounded-3xl p-8 space-y-8">
      <ProgressBar />
      
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <GraduationCap className="h-8 w-8 text-[var(--hive-brand-primary)] mx-auto" />
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)]">
            Academic Info
          </h2>
          <p className="text-[var(--hive-text-muted)]">
            Connect with your campus community and relevant spaces
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              University
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-muted)]" />
              <input
                type="text"
                value={state.data.university}
                onChange={(e) => updateData({ university: e.target.value })}
                placeholder="Search for your university..."
                className="w-full h-12 pl-10 pr-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all"
                disabled={state.loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Major/Field of Study
            </label>
            <input
              type="text"
              value={state.data.major}
              onChange={(e) => updateData({ major: e.target.value })}
              placeholder="Computer Science, Business, etc."
              className="w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all"
              disabled={state.loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Expected Graduation Year
            </label>
            <select
              value={state.data.graduationYear}
              onChange={(e) => updateData({ graduationYear: e.target.value })}
              className="w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all"
              disabled={state.loading}
            >
              <option value="">Select graduation year</option>
              {graduationYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <StepNavigation />
    </div>
  );
}

function BuilderStep() {
  const { state, updateData } = useOnboarding();

  const experiences = [
    { value: 'none', label: 'No experience', description: 'New to building digital tools' },
    { value: 'beginner', label: 'Beginner', description: 'Some basic coding or tool-building experience' },
    { value: 'intermediate', label: 'Intermediate', description: 'Built apps or tools before' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced developer or maker' },
  ];

  const goals = [
    { id: 'learn', label: 'Learn to build', icon: BookOpen },
    { id: 'solve', label: 'Solve campus problems', icon: Zap },
    { id: 'connect', label: 'Connect with builders', icon: Users },
    { id: 'impact', label: 'Create campus impact', icon: Scale },
  ];

  const toggleGoal = (goalId: string) => {
    const currentGoals = state.data.builderGoals;
    const newGoals = currentGoals.includes(goalId)
      ? currentGoals.filter(g => g !== goalId)
      : [...currentGoals, goalId];
    updateData({ builderGoals: newGoals });
  };

  return (
    <div className="glass rounded-3xl p-8 space-y-8">
      <ProgressBar />
      
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Zap className="h-8 w-8 text-[var(--hive-brand-primary)] mx-auto" />
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)]">
            Your Builder Journey
          </h2>
          <p className="text-[var(--hive-text-muted)]">
            Help us understand your experience and goals so we can personalize HIVE for you
          </p>
        </div>

        <div className="space-y-6">
          {/* Experience Level */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-3">
              Building Experience
            </h3>
            <div className="space-y-2">
              {experiences.map((exp) => (
                <label
                  key={exp.value}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                    state.data.builderExperience === exp.value
                      ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"
                      : "border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)]"
                  )}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={exp.value}
                    checked={state.data.builderExperience === exp.value}
                    onChange={(e) => updateData({ builderExperience: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    state.data.builderExperience === exp.value
                      ? "border-[var(--hive-brand-primary)]"
                      : "border-[var(--hive-border-primary)]"
                  )}>
                    {state.data.builderExperience === exp.value && (
                      <div className="w-2 h-2 rounded-full bg-[var(--hive-brand-primary)]" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--hive-text-primary)]">{exp.label}</div>
                    <div className="text-sm text-[var(--hive-text-muted)]">{exp.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Builder Goals */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-3">
              What do you want to do on HIVE? (Select all that apply)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {goals.map((goal) => {
                const Icon = goal.icon;
                const isSelected = state.data.builderGoals.includes(goal.id);
                
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={cn(
                      "p-4 rounded-xl border transition-all text-left",
                      isSelected
                        ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"
                        : "border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)]"
                    )}
                  >
                    <Icon className={cn(
                      "h-6 w-6 mb-2",
                      isSelected ? "text-[var(--hive-brand-primary)]" : "text-[var(--hive-text-muted)]"
                    )} />
                    <div className="font-medium text-[var(--hive-text-primary)]">
                      {goal.label}
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-[var(--hive-brand-primary)] mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <StepNavigation />
    </div>
  );
}

function LegalStep() {
  const { state, updateData } = useOnboarding();

  const agreements = [
    {
      key: 'agreedToTerms' as const,
      title: 'Terms of Service',
      description: 'I agree to HIVE\'s terms of service and acceptable use policy',
    },
    {
      key: 'agreedToPrivacy' as const,
      title: 'Privacy Policy',
      description: 'I understand how HIVE collects, uses, and protects my data',
    },
    {
      key: 'agreedToCommunity' as const,
      title: 'Community Guidelines',
      description: 'I will follow HIVE\'s community guidelines and respect other builders',
    },
  ];

  return (
    <div className="glass rounded-3xl p-8 space-y-8">
      <ProgressBar />
      
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Scale className="h-8 w-8 text-[var(--hive-brand-primary)] mx-auto" />
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)]">
            Community Agreements
          </h2>
          <p className="text-[var(--hive-text-muted)]">
            Please review and accept our community standards to complete your registration
          </p>
        </div>

        <div className="space-y-4">
          {agreements.map((agreement) => (
            <label
              key={agreement.key}
              className="flex items-start gap-3 p-4 rounded-xl border border-[var(--hive-border-primary)] cursor-pointer hover:border-[var(--hive-border-secondary)] transition-all"
            >
              <input
                type="checkbox"
                checked={state.data[agreement.key]}
                onChange={(e) => updateData({ [agreement.key]: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-[var(--hive-border-primary)] text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/30"
              />
              <div>
                <div className="font-medium text-[var(--hive-text-primary)]">
                  {agreement.title}
                </div>
                <div className="text-sm text-[var(--hive-text-muted)] mt-1">
                  {agreement.description}
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="text-center text-sm text-[var(--hive-text-muted)]">
          By continuing, you confirm that you are at least 13 years old and agree to all the above terms.
        </div>
      </div>

      <StepNavigation nextLabel="Complete Registration" />
    </div>
  );
}

function CompleteStep() {
  const { state, completeOnboarding } = useOnboarding();

  React.useEffect(() => {
    // Auto-complete onboarding after a delay
    const timer = setTimeout(() => {
      completeOnboarding();
    }, 2000);

    return () => clearTimeout(timer);
  }, [completeOnboarding]);

  return (
    <div className="glass rounded-3xl p-8 text-center space-y-8">
      <div className="space-y-6">
        {/* Success Animation */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center animate-pulse">
            <Check className="h-12 w-12 text-[var(--hive-background-primary)]" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[var(--hive-text-primary)]">
            Welcome to HIVE, {state.data.name}!
          </h1>
          <p className="text-xl text-[var(--hive-text-muted)]">
            Your builder profile is complete. Get ready to transform your campus experience.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 space-y-3">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
            What's next?
          </h3>
          <div className="space-y-2 text-sm text-[var(--hive-text-muted)]">
            <div>✨ Explore pre-seeded Spaces for your campus</div>
            <div>🛠️ Create your first Tool in HiveLAB</div>
            <div>🚀 Connect with other builders</div>
          </div>
        </div>

        {state.loading && (
          <div className="flex items-center justify-center gap-2 text-[var(--hive-text-muted)]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Setting up your profile...
          </div>
        )}
      </div>
    </div>
  );
}