"use client";

import React, { useState, createContext, useContext } from 'react';
import { cn } from '../lib/utils';
import { ButtonEnhanced as Button } from '../../atomic/atoms/button-enhanced';
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
  Loader2,
  Sparkles,
  Crown,
  Trophy,
  Target,
  Heart,
  Code,
  Award,
  Rocket,
  Star
} from 'lucide-react';

// =============================================================================
// ENHANCED ONBOARDING STATE MANAGEMENT WITH BRAND DESIGN
// =============================================================================

export type OnboardingStep = 
  | 'welcome'      // Enhanced welcome with brand showcase
  | 'name'         // Enhanced name input with validation
  | 'handle'       // Enhanced handle selection with availability
  | 'photo'        // Enhanced photo upload with premium design
  | 'academics'    // Enhanced university integration
  | 'builder'      // Enhanced builder assessment with visuals
  | 'legal'        // Enhanced legal agreements
  | 'complete';    // Enhanced completion celebration

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
// ENHANCED ONBOARDING PROVIDER WITH BRAND FEATURES
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
        await new Promise(resolve => setTimeout(resolve, 2000));
        onComplete?.(state.data);
      } else {
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
// ENHANCED MAIN ONBOARDING WIZARD WITH BRAND DESIGN
// =============================================================================

interface HiveOnboardingWizardEnhancedProps {
  className?: string;
  onComplete?: (userData: OnboardingState['data']) => void;
  initialStep?: OnboardingStep;
  mockMode?: boolean;
}

export function HiveOnboardingWizardEnhanced({ 
  className, 
  onComplete,
  initialStep = 'welcome',
  mockMode = false 
}: HiveOnboardingWizardEnhancedProps) {
  return (
    <OnboardingProvider 
      onComplete={onComplete} 
      initialStep={initialStep}
      mockMode={mockMode}
    >
      <div className={cn(
        "min-h-screen flex items-center justify-center p-4 relative overflow-hidden",
        "bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]",
        className
      )}>
        {/* Enhanced Brand Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Geometric Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(var(--hive-border-glass) 1px, transparent 1px),
                linear-gradient(90deg, var(--hive-border-glass) 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, var(--hive-brand-primary) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px, 60px 60px, 120px 120px',
              animation: 'grid-pulse 30s ease-in-out infinite'
            }} />
          </div>
          
          {/* Brand Glow Orbs */}
          <div className="absolute top-1/3 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] opacity-10 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-[var(--hive-brand-accent)] to-[var(--hive-status-success)] opacity-8 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Floating Brand Elements */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-2 h-2 rounded-full opacity-20",
                  i % 3 === 0 ? "bg-[var(--hive-brand-primary)]" :
                  i % 3 === 1 ? "bg-[var(--hive-brand-accent)]" :
                  "bg-[var(--hive-status-success)]"
                )}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float-brand ${4 + Math.random() * 6}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          {/* Brand Constellation Effect */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--hive-brand-primary)" />
                  <stop offset="100%" stopColor="var(--hive-brand-accent)" />
                </linearGradient>
              </defs>
              <path 
                d="M20,30 L80,30 L50,70 Z" 
                fill="none" 
                stroke="url(#brandGradient)" 
                strokeWidth="0.5"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>

        <div className="w-full max-w-2xl relative z-10">
          <OnboardingStepRenderer />
        </div>

        <style>{`
          @keyframes grid-pulse {
            0%, 100% { opacity: 0.05; transform: scale(1); }
            50% { opacity: 0.1; transform: scale(1.05); }
          }
          
          @keyframes float-brand {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            33% { transform: translateY(-30px) rotate(120deg) scale(1.1); }
            66% { transform: translateY(-15px) rotate(240deg) scale(0.9); }
          }
        `}</style>
      </div>
    </OnboardingProvider>
  );
}

// =============================================================================
// ENHANCED STEP RENDERER
// =============================================================================

function OnboardingStepRenderer() {
  const { state } = useOnboarding();

  switch (state.step) {
    case 'welcome':
      return <EnhancedWelcomeStep />;
    case 'name':
      return <EnhancedNameStep />;
    case 'handle':
      return <EnhancedHandleStep />;
    case 'photo':
      return <EnhancedPhotoStep />;
    case 'academics':
      return <EnhancedAcademicsStep />;
    case 'builder':
      return <EnhancedBuilderStep />;
    case 'legal':
      return <EnhancedLegalStep />;
    case 'complete':
      return <EnhancedCompleteStep />;
    default:
      return <EnhancedWelcomeStep />;
  }
}

// =============================================================================
// ENHANCED SHARED COMPONENTS WITH BRAND DESIGN
// =============================================================================

function EnhancedProgressBar() {
  const { state } = useOnboarding();
  const progress = ((state.currentStepIndex + 1) / STEP_ORDER.length) * 100;

  return (
    <div className="relative">
      <div className="w-full h-3 bg-[var(--hive-background-secondary)] rounded-full overflow-hidden border border-[var(--hive-border-glass)]">
        <div 
          className="h-full bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] transition-all duration-700 ease-out rounded-full relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          {/* Animated Progress Shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer" />
        </div>
      </div>
      
      {/* Progress Indicators */}
      <div className="flex justify-between mt-2">
        {STEP_ORDER.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index <= state.currentStepIndex
                ? "bg-[var(--hive-brand-primary)] shadow-[var(--hive-shadow-gold-glow)]"
                : "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-glass)]"
            )}
          />
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

function EnhancedStepNavigation({ canGoBack = true, nextLabel = "Continue" }) {
  const { state, prevStep, nextStep, canProceed } = useOnboarding();

  return (
    <div className="flex justify-between items-center pt-6">
      {canGoBack && state.currentStepIndex > 0 ? (
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={state.loading}
          className="flex items-center gap-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hive-interactive"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      ) : (
        <div />
      )}

      <Button
        variant="primary"
        onClick={nextStep}
        disabled={!canProceed() || state.loading}
        className={cn(
          "flex items-center gap-2 font-semibold hive-interactive",
          canProceed() 
            ? "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] shadow-[var(--hive-shadow-gold-glow)]"
            : "opacity-50 cursor-not-allowed"
        )}
      >
        {state.loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {nextLabel}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// =============================================================================
// ENHANCED WELCOME STEP WITH BRAND SHOWCASE
// =============================================================================

function EnhancedWelcomeStep() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGetStarted = () => {
    setIsAnimating(true);
  };

  return (
    <div className={cn(
      "liquid-metal rounded-3xl p-8 space-y-8 relative overflow-hidden border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)]",
      isAnimating && "scale-95 opacity-80 transition-all duration-500"
    )}>
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] via-transparent to-[var(--hive-overlay-glass-medium)] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--hive-overlay-gold-medium)_0%,transparent_70%)] opacity-30" />
      
      <div className="relative z-10">
        <EnhancedProgressBar />
      </div>
      
      {/* Enhanced HIVE Logo with Premium Animation */}
      <div className="relative z-10 flex justify-center">
        <div className="relative group">
          <div className="w-24 h-24 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-3xl flex items-center justify-center relative overflow-hidden shadow-[var(--hive-shadow-gold-glow-strong)] animate-pulse">
            {/* Logo Core with Enhanced Design */}
            <div className="w-12 h-12 bg-[var(--hive-background-primary)] rounded-xl relative overflow-hidden">
              <div className="absolute inset-3 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-sm" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
            
            {/* Premium Glow Rings */}
            <div className="absolute inset-0 rounded-3xl border-2 border-[var(--hive-brand-primary)] opacity-0 group-hover:opacity-100 animate-pulse scale-110" />
            <div className="absolute inset-0 rounded-3xl border border-[var(--hive-brand-accent)] opacity-50 animate-pulse scale-125" />
            
            {/* Premium Sparkle Effects */}
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-[var(--hive-brand-primary)] animate-pulse" />
            <Crown className="absolute -bottom-1 -left-1 h-4 w-4 text-[var(--hive-brand-accent)] animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>

      {/* Enhanced Welcome Content */}
      <div className="relative z-10 text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk'] tracking-tight leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[var(--hive-brand-primary)] via-[var(--hive-brand-accent)] to-[var(--hive-brand-primary)] bg-clip-text text-transparent animate-pulse">
              HIVE
            </span>
          </h1>
          <p className="text-xl text-[var(--hive-text-secondary)] leading-relaxed max-w-lg mx-auto">
            Let's build your{' '}
            <span className="text-[var(--hive-brand-primary)] font-semibold">builder profile</span>{' '}
            and get you connected to your{' '}
            <span className="text-[var(--hive-status-success)] font-semibold">campus community</span>
          </p>
        </div>

        {/* Enhanced Feature Preview */}
        <div className="glass-strong rounded-2xl p-6 space-y-4 border border-[var(--hive-border-glass-strong)]">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center justify-center gap-2">
            <Rocket className="h-5 w-5 text-[var(--hive-brand-primary)]" />
            What you'll accomplish:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3 text-[var(--hive-text-secondary)]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-accent)]/20 flex items-center justify-center border border-[var(--hive-border-gold)]">
                <User className="h-5 w-5 text-[var(--hive-brand-primary)]" />
              </div>
              <span>Set up your campus identity</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--hive-text-secondary)]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--hive-status-success)]/20 to-[var(--hive-status-info)]/20 flex items-center justify-center border border-[var(--hive-status-success)]/30">
                <GraduationCap className="h-5 w-5 text-[var(--hive-status-success)]" />
              </div>
              <span>Connect to University at Buffalo</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--hive-text-secondary)]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--hive-status-info)]/20 to-[var(--hive-brand-accent)]/20 flex items-center justify-center border border-[var(--hive-status-info)]/30">
                <Zap className="h-5 w-5 text-[var(--hive-status-info)]" />
              </div>
              <span>Choose your builder journey</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <EnhancedStepNavigation canGoBack={false} nextLabel="Get Started" />
      </div>
    </div>
  );
}

// =============================================================================
// ENHANCED NAME STEP WITH PREMIUM VALIDATION
// =============================================================================

function EnhancedNameStep() {
  const { state, updateData, setError } = useOnboarding();
  const [isFocused, setIsFocused] = useState(false);

  const handleNameChange = (name: string) => {
    updateData({ name });
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
    } else {
      setError(null);
    }
  };

  return (
    <div className="glass-strong rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)] relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-glass-medium)] via-transparent to-[var(--hive-overlay-gold-subtle)] opacity-50" />
      
      <div className="relative z-10">
        <EnhancedProgressBar />
      </div>
      
      {/* Enhanced Header */}
      <div className="relative z-10 text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-accent)]/20 flex items-center justify-center border border-[var(--hive-border-gold)]">
            <User className="h-8 w-8 text-[var(--hive-brand-primary)]" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']">
            What's your name?
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            This is how you'll appear to other builders in your{' '}
            <span className="text-[var(--hive-brand-primary)] font-semibold">campus community</span>
          </p>
        </div>
      </div>

      {/* Enhanced Form */}
      <div className="relative z-10 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={state.data.name}
              onChange={(e) => handleNameChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Alex Rivera"
              className={cn(
                "w-full h-16 px-6 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border-2 rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] transition-all duration-300 hive-interactive",
                isFocused 
                  ? "border-[var(--hive-brand-primary)] ring-4 ring-[var(--hive-brand-primary)]/20 shadow-[var(--hive-shadow-gold-glow)]" 
                  : "border-[var(--hive-border-glass)] hover:border-[var(--hive-border-glass-strong)]"
              )}
              disabled={state.loading}
            />
            
            {/* Enhanced Input Overlay */}
            <div className={cn(
              "absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/0 to-[var(--hive-brand-accent)]/0 transition-all pointer-events-none",
              isFocused && "from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10"
            )} />
            
            {/* Character Count Indicator */}
            {state.data.name.length > 0 && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  state.data.name.length >= 2 
                    ? "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)]" 
                    : "bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)]"
                )}>
                  {state.data.name.length >= 2 ? <Check className="h-3 w-3" /> : state.data.name.length}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Error Display */}
        {state.error && (
          <div className="glass rounded-xl p-3 border border-[var(--hive-status-error)]/20 bg-[var(--hive-status-error)]/10">
            <p className="text-sm text-[var(--hive-status-error)] flex items-center gap-2">
              <Target className="h-4 w-4" />
              {state.error}
            </p>
          </div>
        )}

        {/* Enhanced Success State */}
        {state.data.name.length >= 2 && !state.error && (
          <div className="glass rounded-xl p-3 border border-[var(--hive-status-success)]/20 bg-[var(--hive-status-success)]/10">
            <p className="text-sm text-[var(--hive-status-success)] flex items-center gap-2">
              <Check className="h-4 w-4" />
              Perfect! Welcome to HIVE, {state.data.name}
            </p>
          </div>
        )}
      </div>

      <div className="relative z-10">
        <EnhancedStepNavigation />
      </div>
    </div>
  );
}

// =============================================================================
// ENHANCED HANDLE STEP WITH PREMIUM AVAILABILITY CHECKING
// =============================================================================

function EnhancedHandleStep() {
  const { state, updateData, setError } = useOnboarding();
  const [isFocused, setIsFocused] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleUsernameChange = async (handle: string) => {
    const cleanHandle = handle.replace('@', '');
    updateData({ handle: cleanHandle });
    
    if (cleanHandle.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(cleanHandle)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    // Simulate availability checking
    setIsChecking(true);
    setError(null);
    
    setTimeout(() => {
      setIsChecking(false);
      // Mock availability check - always available for demo
    }, 800);
  };

  const isAvailable = state.data.handle.length >= 3 && !state.error && !isChecking;

  return (
    <div className="liquid-metal rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)] relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] via-transparent to-[var(--hive-overlay-glass-medium)] opacity-50" />
      
      <div className="relative z-10">
        <EnhancedProgressBar />
      </div>
      
      {/* Enhanced Header */}
      <div className="relative z-10 text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-status-info)]/20 to-[var(--hive-brand-primary)]/20 flex items-center justify-center border border-[var(--hive-status-info)]/30">
            <Hash className="h-8 w-8 text-[var(--hive-status-info)]" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']">
            Choose your handle
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Your unique identifier that other builders will use to{' '}
            <span className="text-[var(--hive-brand-primary)] font-semibold">find and mention you</span>
          </p>
        </div>
      </div>

      {/* Enhanced Form */}
      <div className="relative z-10 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
            Username
          </label>
          <div className="relative">
            <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-xl text-[var(--hive-text-muted)] font-semibold">
              @
            </span>
            <input
              type="text"
              value={state.data.handle}
              onChange={(e) => handleUsernameChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="alexrivera"
              className={cn(
                "w-full h-16 pl-12 pr-16 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border-2 rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] transition-all duration-300 hive-interactive",
                isFocused 
                  ? "border-[var(--hive-brand-primary)] ring-4 ring-[var(--hive-brand-primary)]/20 shadow-[var(--hive-shadow-gold-glow)]" 
                  : "border-[var(--hive-border-glass)] hover:border-[var(--hive-border-glass-strong)]"
              )}
              disabled={state.loading}
            />
            
            {/* Enhanced Status Indicator */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {isChecking ? (
                <Loader2 className="h-5 w-5 animate-spin text-[var(--hive-brand-primary)]" />
              ) : isAvailable ? (
                <div className="w-8 h-8 rounded-full bg-[var(--hive-status-success)]/20 flex items-center justify-center border border-[var(--hive-status-success)]/40">
                  <Check className="h-4 w-4 text-[var(--hive-status-success)]" />
                </div>
              ) : state.data.handle.length >= 3 && state.error ? (
                <div className="w-8 h-8 rounded-full bg-[var(--hive-status-error)]/20 flex items-center justify-center border border-[var(--hive-status-error)]/40">
                  <Target className="h-4 w-4 text-[var(--hive-status-error)]" />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Enhanced Status Messages */}
        {state.error && (
          <div className="glass rounded-xl p-3 border border-[var(--hive-status-error)]/20 bg-[var(--hive-status-error)]/10">
            <p className="text-sm text-[var(--hive-status-error)] flex items-center gap-2">
              <Target className="h-4 w-4" />
              {state.error}
            </p>
          </div>
        )}

        {isChecking && (
          <div className="glass rounded-xl p-3 border border-[var(--hive-brand-primary)]/20 bg-[var(--hive-brand-primary)]/10">
            <p className="text-sm text-[var(--hive-brand-primary)] flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking availability...
            </p>
          </div>
        )}

        {isAvailable && (
          <div className="glass-strong rounded-xl p-4 border border-[var(--hive-status-success)]/20 bg-[var(--hive-status-success)]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--hive-status-success)]/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-[var(--hive-status-success)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--hive-status-success)]">
                  @{state.data.handle} is available! 🎉
                </p>
                <p className="text-xs text-[var(--hive-text-muted)]">
                  This will be your unique identity on HIVE
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10">
        <EnhancedStepNavigation />
      </div>
    </div>
  );
}

// =============================================================================
// ADDITIONAL ENHANCED STEPS (Photo, Academics, Builder, Legal, Complete)
// Note: Due to length constraints, I'll include the remaining steps in abbreviated form
// =============================================================================

function EnhancedPhotoStep() {
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

  return (
    <div className="glass-strong rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)]">
      <EnhancedProgressBar />
      
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-brand-accent)]/20 to-[var(--hive-status-info)]/20 flex items-center justify-center border border-[var(--hive-brand-accent)]/30">
            <Camera className="h-8 w-8 text-[var(--hive-brand-accent)]" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']">
          Add a profile photo
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Help other builders recognize you{' '}
          <span className="text-[var(--hive-text-muted)]">(optional step)</span>
        </p>
      </div>

      <div className="flex justify-center">
        {state.data.photoUrl ? (
          <div className="relative group">
            <img
              src={state.data.photoUrl}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-[var(--hive-brand-primary)] shadow-[var(--hive-shadow-gold-glow)]"
            />
            <button
              onClick={() => updateData({ photoUrl: undefined })}
              className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--hive-status-error)] rounded-full flex items-center justify-center text-[var(--hive-text-primary)] hover:bg-[var(--hive-status-error)]/80 transition-colors shadow-lg"
            >
              ×
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "w-80 h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-6 cursor-pointer transition-all duration-300 hive-interactive",
              dragActive 
                ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10 shadow-[var(--hive-shadow-gold-glow)]" 
                : "border-[var(--hive-border-glass)] hover:border-[var(--hive-border-gold)] hover:bg-[var(--hive-overlay-glass)]"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-accent)]/20 flex items-center justify-center">
              <Upload className="h-8 w-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div className="text-center">
              <p className="text-[var(--hive-text-primary)] font-medium text-lg">
                Drop a photo here
              </p>
              <p className="text-[var(--hive-text-muted)]">
                or click to browse
              </p>
            </div>
          </div>
        )}
      </div>

      <EnhancedStepNavigation nextLabel={state.data.photoUrl ? "Continue" : "Skip for now"} />
    </div>
  );
}

function EnhancedAcademicsStep() {
  const { state, updateData } = useOnboarding();

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from(
    { length: 8 }, 
    (_, i) => (currentYear + i).toString()
  );

  return (
    <div className="liquid-metal rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)]">
      <EnhancedProgressBar />
      
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-status-success)]/20 to-[var(--hive-status-info)]/20 flex items-center justify-center border border-[var(--hive-status-success)]/30">
            <GraduationCap className="h-8 w-8 text-[var(--hive-status-success)]" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']">
          Academic Info
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Connect with your{' '}
          <span className="text-[var(--hive-brand-primary)] font-semibold">campus community</span>{' '}
          and relevant spaces
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
            University
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--hive-text-muted)]" />
            <input
              type="text"
              value={state.data.university}
              onChange={(e) => updateData({ university: e.target.value })}
              placeholder="University at Buffalo"
              className="w-full h-14 pl-12 pr-4 bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
            Major/Field of Study
          </label>
          <input
            type="text"
            value={state.data.major}
            onChange={(e) => updateData({ major: e.target.value })}
            placeholder="Computer Science, Business, Engineering..."
            className="w-full h-14 px-4 bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-3">
            Expected Graduation Year
          </label>
          <select
            value={state.data.graduationYear}
            onChange={(e) => updateData({ graduationYear: e.target.value })}
            className="w-full h-14 px-4 bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive"
          >
            <option value="">Select graduation year</option>
            {graduationYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <EnhancedStepNavigation />
    </div>
  );
}

function EnhancedBuilderStep() {
  const { state, updateData } = useOnboarding();

  const experiences = [
    { value: 'none', label: 'New to Building', description: 'Ready to learn and explore', icon: Star },
    { value: 'beginner', label: 'Beginner Builder', description: 'Some coding or tool experience', icon: Code },
    { value: 'intermediate', label: 'Experienced Builder', description: 'Built projects and tools before', icon: Trophy },
    { value: 'advanced', label: 'Expert Builder', description: 'Seasoned developer and creator', icon: Crown },
  ];

  const goals = [
    { id: 'learn', label: 'Learn to Build', icon: BookOpen, color: 'var(--hive-status-info)' },
    { id: 'solve', label: 'Solve Campus Problems', icon: Zap, color: 'var(--hive-brand-primary)' },
    { id: 'connect', label: 'Connect with Builders', icon: Users, color: 'var(--hive-status-success)' },
    { id: 'impact', label: 'Create Campus Impact', icon: Award, color: 'var(--hive-brand-accent)' },
  ];

  const toggleGoal = (goalId: string) => {
    const currentGoals = state.data.builderGoals;
    const newGoals = currentGoals.includes(goalId)
      ? currentGoals.filter(g => g !== goalId)
      : [...currentGoals, goalId];
    updateData({ builderGoals: newGoals });
  };

  return (
    <div className="glass-strong rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)]">
      <EnhancedProgressBar />
      
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-accent)]/20 flex items-center justify-center border border-[var(--hive-border-gold)]">
            <Zap className="h-8 w-8 text-[var(--hive-brand-primary)]" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']">
          Your Builder Journey
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Help us personalize HIVE for your{' '}
          <span className="text-[var(--hive-brand-primary)] font-semibold">technical experience</span>{' '}
          and goals
        </p>
      </div>

      <div className="space-y-8">
        {/* Enhanced Experience Level */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[var(--hive-brand-primary)]" />
            Building Experience
          </h3>
          <div className="space-y-3">
            {experiences.map((exp) => {
              const IconComponent = exp.icon;
              return (
                <label
                  key={exp.value}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 hive-interactive",
                    state.data.builderExperience === exp.value
                      ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10 shadow-[var(--hive-shadow-gold-glow)]"
                      : "border-[var(--hive-border-glass)] hover:border-[var(--hive-border-gold)] hover:bg-[var(--hive-overlay-glass)]"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center border transition-all",
                    state.data.builderExperience === exp.value
                      ? "bg-[var(--hive-brand-primary)]/20 border-[var(--hive-brand-primary)]"
                      : "bg-[var(--hive-background-secondary)] border-[var(--hive-border-glass)]"
                  )}>
                    <IconComponent className={cn(
                      "h-6 w-6",
                      state.data.builderExperience === exp.value
                        ? "text-[var(--hive-brand-primary)]"
                        : "text-[var(--hive-text-muted)]"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[var(--hive-text-primary)]">{exp.label}</div>
                    <div className="text-sm text-[var(--hive-text-muted)]">{exp.description}</div>
                  </div>
                  <input
                    type="radio"
                    name="experience"
                    value={exp.value}
                    checked={state.data.builderExperience === exp.value}
                    onChange={(e) => updateData({ builderExperience: e.target.value as any })}
                    className="sr-only"
                  />
                  {state.data.builderExperience === exp.value && (
                    <Check className="h-5 w-5 text-[var(--hive-brand-primary)]" />
                  )}
                </label>
              );
            })}
          </div>
        </div>

        {/* Enhanced Builder Goals */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-[var(--hive-brand-primary)]" />
            Platform Goals <span className="text-sm font-normal text-[var(--hive-text-muted)]">(Select all that apply)</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {goals.map((goal) => {
              const IconComponent = goal.icon;
              const isSelected = state.data.builderGoals.includes(goal.id);
              
              return (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={cn(
                    "p-6 rounded-xl border transition-all duration-300 text-left hive-interactive",
                    isSelected
                      ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10 shadow-[var(--hive-shadow-gold-glow)]"
                      : "border-[var(--hive-border-glass)] hover:border-[var(--hive-border-gold)] hover:bg-[var(--hive-overlay-glass)]"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      isSelected
                        ? "bg-[var(--hive-brand-primary)]/20"
                        : "bg-[var(--hive-background-secondary)]"
                    )}>
                      <IconComponent 
                        className={cn(
                          "h-5 w-5",
                          isSelected ? "text-[var(--hive-brand-primary)]" : "text-[var(--hive-text-muted)]"
                        )}
                        style={{ color: isSelected ? goal.color : undefined }}
                      />
                    </div>
                    {isSelected && (
                      <Check className="h-5 w-5 text-[var(--hive-brand-primary)]" />
                    )}
                  </div>
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {goal.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <EnhancedStepNavigation />
    </div>
  );
}

function EnhancedLegalStep() {
  const { state, updateData } = useOnboarding();

  const agreements = [
    {
      key: 'agreedToTerms' as const,
      title: 'Terms of Service',
      description: 'I agree to HIVE\'s terms of service and acceptable use policy',
      icon: Scale
    },
    {
      key: 'agreedToPrivacy' as const,
      title: 'Privacy Policy',
      description: 'I understand how HIVE collects, uses, and protects my data',
      icon: Users
    },
    {
      key: 'agreedToCommunity' as const,
      title: 'Community Guidelines',
      description: 'I will follow HIVE\'s community guidelines and respect other builders',
      icon: Heart
    },
  ];

  return (
    <div className="liquid-metal rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)]">
      <EnhancedProgressBar />
      
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-status-info)]/20 to-[var(--hive-brand-primary)]/20 flex items-center justify-center border border-[var(--hive-status-info)]/30">
            <Scale className="h-8 w-8 text-[var(--hive-status-info)]" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']">
          Community Agreements
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Please review and accept our{' '}
          <span className="text-[var(--hive-brand-primary)] font-semibold">community standards</span>{' '}
          to complete registration
        </p>
      </div>

      <div className="space-y-4">
        {agreements.map((agreement) => {
          const IconComponent = agreement.icon;
          return (
            <label
              key={agreement.key}
              className="flex items-start gap-4 p-4 rounded-xl border border-[var(--hive-border-glass)] cursor-pointer hover:border-[var(--hive-border-gold)] hover:bg-[var(--hive-overlay-glass)] transition-all duration-300 hive-interactive"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={state.data[agreement.key]}
                  onChange={(e) => updateData({ [agreement.key]: e.target.checked })}
                  className="w-5 h-5 rounded border-[var(--hive-border-glass)] text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/30"
                />
                <div className="w-10 h-10 rounded-lg bg-[var(--hive-background-secondary)] flex items-center justify-center">
                  <IconComponent className="h-5 w-5 text-[var(--hive-text-muted)]" />
                </div>
              </div>
              <div>
                <div className="font-medium text-[var(--hive-text-primary)]">
                  {agreement.title}
                </div>
                <div className="text-sm text-[var(--hive-text-muted)] mt-1">
                  {agreement.description}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div className="text-center text-sm text-[var(--hive-text-muted)] p-4 glass rounded-xl border border-[var(--hive-border-glass)]">
        By continuing, you confirm that you are at least 13 years old and agree to all the above terms.
      </div>

      <EnhancedStepNavigation nextLabel="Complete Registration" />
    </div>
  );
}

function EnhancedCompleteStep() {
  const { state, completeOnboarding } = useOnboarding();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      completeOnboarding();
    }, 2000);

    return () => clearTimeout(timer);
  }, [completeOnboarding]);

  return (
    <div className="glass-strong rounded-3xl p-8 text-center space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-gold-glow-strong)] relative overflow-hidden">
      {/* Celebration Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-gold-medium)] via-transparent to-[var(--hive-overlay-gold-subtle)] opacity-60" />
      
      {/* Success Animation */}
      <div className="relative z-10 flex justify-center">
        <div className="w-32 h-32 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-full flex items-center justify-center animate-pulse shadow-[var(--hive-shadow-gold-glow-strong)] relative">
          <Check className="h-16 w-16 text-[var(--hive-text-inverse)]" />
          
          {/* Celebration Sparkles */}
          <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-[var(--hive-brand-primary)] animate-pulse" />
          <Crown className="absolute -bottom-1 -left-1 h-6 w-6 text-[var(--hive-brand-accent)] animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Trophy className="absolute top-2 -left-3 h-5 w-5 text-[var(--hive-brand-primary)] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
              HIVE
            </span>,{' '}
            {state.data.name}! 🎉
          </h1>
          <p className="text-xl text-[var(--hive-text-secondary)] leading-relaxed">
            Your{' '}
            <span className="text-[var(--hive-brand-primary)] font-semibold">builder profile</span>{' '}
            is complete. Get ready to transform your campus experience.
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-6 space-y-4 border border-[var(--hive-border-gold)]">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center justify-center gap-2">
            <Rocket className="h-5 w-5 text-[var(--hive-brand-primary)]" />
            What's next?
          </h3>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center gap-3 text-[var(--hive-text-secondary)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--hive-status-success)]/20 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-[var(--hive-status-success)]" />
              </div>
              <span>Explore pre-seeded Spaces for your campus</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--hive-text-secondary)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--hive-brand-primary)]/20 flex items-center justify-center">
                <Zap className="h-4 w-4 text-[var(--hive-brand-primary)]" />
              </div>
              <span>Create your first Tool in HiveLAB</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--hive-text-secondary)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--hive-status-info)]/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-[var(--hive-status-info)]" />
              </div>
              <span>Connect with other builders at UB</span>
            </div>
          </div>
        </div>

        {state.loading && (
          <div className="flex items-center justify-center gap-3 text-[var(--hive-text-muted)]">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Setting up your campus builder profile...</span>
          </div>
        )}
      </div>
    </div>
  );
}