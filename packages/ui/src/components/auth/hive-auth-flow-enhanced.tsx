"use client";

import React, { useState, createContext, useContext } from 'react';
import { cn } from '../lib/utils';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Check, Mail, ArrowLeft, ArrowRight, Loader2, AlertCircle, Sparkles, Zap, Users, Shield } from 'lucide-react';

// =============================================================================
// ENHANCED HIVE AUTH FLOW WITH LATEST BRAND DESIGN
// =============================================================================

export type AuthStep = 
  | 'welcome'           // Enhanced welcome with brand showcase
  | 'sign-in'          // Enhanced sign in with liquid metal design
  | 'sign-up'          // Enhanced sign up with glass morphism
  | 'forgot-password'  // Enhanced password reset
  | 'verify-email'     // Enhanced email verification
  | 'magic-link-sent'  // Enhanced magic link confirmation
  | 'onboarding';      // Enhanced onboarding redirect

export interface AuthState {
  step: AuthStep;
  email: string;
  loading: boolean;
  error: string | null;
  isNewUser: boolean;
}

export interface AuthContextType {
  state: AuthState;
  setStep: (step: AuthStep) => void;
  setEmail: (email: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsNewUser: (isNewUser: boolean) => void;
  goBack: () => void;
  handleSignIn: (email: string, password?: string) => Promise<void>;
  handleSignUp: (email: string, password: string, name: string) => Promise<void>;
  handleMagicLink: (email: string) => Promise<void>;
  handleForgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// =============================================================================
// ENHANCED AUTH PROVIDER WITH BRAND ANIMATIONS
// =============================================================================

interface AuthProviderProps {
  children: React.ReactNode;
  onAuthSuccess?: (user: { id: string; email: string; name: string; isNewUser: boolean }) => void;
  initialStep?: AuthStep;
  mockMode?: boolean;
}

export function AuthProvider({ 
  children, 
  onAuthSuccess, 
  initialStep = 'welcome',
  mockMode = false 
}: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    step: initialStep,
    email: '',
    loading: false,
    error: null,
    isNewUser: false,
  });

  const setStep = (step: AuthStep) => setState(prev => ({ ...prev, step }));
  const setEmail = (email: string) => setState(prev => ({ ...prev, email }));
  const setLoading = (loading: boolean) => setState(prev => ({ ...prev, loading }));
  const setError = (error: string | null) => setState(prev => ({ ...prev, error }));
  const setIsNewUser = (isNewUser: boolean) => setState(prev => ({ ...prev, isNewUser }));

  const goBack = () => {
    const stepFlow: Record<AuthStep, AuthStep> = {
      'welcome': 'welcome',
      'sign-in': 'welcome',
      'sign-up': 'welcome', 
      'forgot-password': 'sign-in',
      'verify-email': 'sign-in',
      'magic-link-sent': 'sign-in',
      'onboarding': 'welcome',
    };
    setStep(stepFlow[state.step]);
    setError(null);
  };

  const handleSignIn = async (email: string, password?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (mockMode) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const isNewUser = email.includes('new');
        
        if (isNewUser) {
          setStep('onboarding');
        }
        
        onAuthSuccess?.({
          id: '1',
          email,
          name: email.split('@')[0],
          isNewUser
        });
      }
    } catch (error) {
      setError('Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (mockMode) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStep('verify-email');
      }
    } catch (error) {
      setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (mockMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStep('magic-link-sent');
      }
    } catch (error) {
      setError('Failed to send magic link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      if (mockMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStep('magic-link-sent');
      }
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    state,
    setStep,
    setEmail,
    setLoading,
    setError,
    setIsNewUser,
    goBack,
    handleSignIn,
    handleSignUp,
    handleMagicLink,
    handleForgotPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// =============================================================================
// ENHANCED AUTH FLOW COMPONENT WITH BRAND DESIGN
// =============================================================================

interface HiveAuthFlowEnhancedProps {
  className?: string;
  onAuthSuccess?: (user: { id: string; email: string; name: string; isNewUser: boolean }) => void;
  initialStep?: AuthStep;
  mockMode?: boolean;
}

export function HiveAuthFlowEnhanced({ 
  className, 
  onAuthSuccess,
  initialStep = 'welcome',
  mockMode = false 
}: HiveAuthFlowEnhancedProps) {
  return (
    <AuthProvider 
      onAuthSuccess={onAuthSuccess} 
      initialStep={initialStep}
      mockMode={mockMode}
    >
      <div className={cn(
        "min-h-screen flex items-center justify-center p-4 relative overflow-hidden",
        "bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]",
        className
      )}>
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(var(--hive-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--hive-border-subtle) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'grid-flow 20s linear infinite'
            }} />
          </div>
          
          {/* Gold Glow Orbs */}
          <div className="absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[var(--hive-brand-primary)] opacity-5 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-[var(--hive-brand-accent)] opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[var(--hive-brand-primary)] rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <AuthStepRenderer />
        </div>

        <style>{`
          @keyframes grid-flow {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </div>
    </AuthProvider>
  );
}

// =============================================================================
// ENHANCED STEP RENDERER
// =============================================================================

function AuthStepRenderer() {
  const { state } = useAuth();

  switch (state.step) {
    case 'welcome':
      return <EnhancedWelcomeStep />;
    case 'sign-in':
      return <EnhancedSignInStep />;
    case 'sign-up':
      return <EnhancedSignUpStep />;
    case 'forgot-password':
      return <EnhancedForgotPasswordStep />;
    case 'verify-email':
      return <EnhancedVerifyEmailStep />;
    case 'magic-link-sent':
      return <EnhancedMagicLinkSentStep />;
    case 'onboarding':
      return <EnhancedOnboardingRedirectStep />;
    default:
      return <EnhancedWelcomeStep />;
  }
}

// =============================================================================
// ENHANCED WELCOME STEP WITH BRAND SHOWCASE
// =============================================================================

function EnhancedWelcomeStep() {
  const { setStep } = useAuth();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGetStarted = () => {
    setIsAnimating(true);
    setTimeout(() => setStep('sign-up'), 300);
  };

  return (
    <div className={cn(
      "liquid-metal rounded-3xl p-8 text-center space-y-8 relative overflow-hidden",
      "border border-[var(--hive-border-glass)] shadow-[var(--hive-shadow-level3)]",
      isAnimating && "scale-95 opacity-80 transition-all duration-300"
    )}>
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] via-transparent to-[var(--hive-overlay-glass)] opacity-50" />
      
      {/* Enhanced HIVE Logo with Animation */}
      <div className="relative z-10 flex justify-center">
        <div className="relative group">
          <div className="w-20 h-20 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-[var(--hive-shadow-gold-glow)]">
            {/* Logo Core */}
            <div className="w-10 h-10 bg-[var(--hive-background-primary)] rounded-xl relative">
              <div className="absolute inset-2 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-sm" />
            </div>
            
            {/* Animated Glow Ring */}
            <div className="absolute inset-0 rounded-2xl border-2 border-[var(--hive-brand-primary)] opacity-0 group-hover:opacity-100 animate-pulse" />
            
            {/* Sparkle Effects */}
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-[var(--hive-brand-primary)] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Enhanced Welcome Content */}
      <div className="relative z-10 space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk'] tracking-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
              HIVE
            </span>
          </h1>
          <p className="text-xl text-[var(--hive-text-secondary)] leading-relaxed max-w-sm mx-auto">
            Your <span className="text-[var(--hive-brand-primary)] font-semibold">programmable campus layer</span> where students build the future
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="glass rounded-2xl p-6 space-y-4 border border-[var(--hive-border-glass)]">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center justify-center gap-2">
            <Zap className="h-5 w-5 text-[var(--hive-brand-primary)]" />
            Transform Your Campus Experience
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="flex items-center gap-3 text-[var(--hive-text-secondary)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--hive-brand-primary)]/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-[var(--hive-brand-primary)]" />
              </div>
              <span>Connect with builder communities</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--hive-text-secondary)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--hive-status-success)]/10 flex items-center justify-center">
                <Zap className="h-4 w-4 text-[var(--hive-status-success)]" />
              </div>
              <span>Build tools that solve real problems</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--hive-text-secondary)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--hive-status-info)]/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-[var(--hive-status-info)]" />
              </div>
              <span>University-verified secure platform</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Action Buttons */}
      <div className="relative z-10 space-y-4">
        <Button 
          variant="primary" 
          size="lg"
          className="w-full bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] font-semibold shadow-[var(--hive-shadow-gold-glow)] hive-interactive"
          onClick={handleGetStarted}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Create Account
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
        
        <Button 
          variant="secondary" 
          size="lg"
          className="w-full border-[var(--hive-border-glass)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass)] hive-interactive"
          onClick={() => setStep('sign-in')}
        >
          Sign In
        </Button>
      </div>

      {/* Enhanced Footer */}
      <div className="relative z-10">
        <p className="text-sm text-[var(--hive-text-muted)] leading-relaxed">
          Join <span className="text-[var(--hive-brand-primary)] font-semibold">thousands</span> of student builders transforming campus life
        </p>
        <div className="flex justify-center mt-3 space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-[var(--hive-brand-primary)] rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// ENHANCED SIGN IN STEP WITH LIQUID METAL DESIGN
// =============================================================================

function EnhancedSignInStep() {
  const { state, setStep, goBack, handleSignIn, handleMagicLink, setError } = useAuth();
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setIsSubmitting(true);
    if (usePassword) {
      if (!password.trim()) {
        setError('Password is required');
        return;
      }
      await handleSignIn(email, password);
    } else {
      await handleMagicLink(email);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="liquid-metal rounded-3xl p-8 space-y-6 border border-[var(--hive-border-glass)] shadow-[var(--hive-shadow-level3)] relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-glass)] via-transparent to-[var(--hive-overlay-gold-subtle)] opacity-30" />
      
      {/* Header */}
      <div className="relative z-10 text-center space-y-4">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors hive-interactive"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']">
            Sign In to{' '}
            <span className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
              HIVE
            </span>
          </h2>
          <p className="text-[var(--hive-text-secondary)]">Welcome back, builder</p>
        </div>
      </div>

      {/* Enhanced Error Display */}
      {state.error && (
        <div className="relative z-10 glass rounded-xl p-4 border border-[var(--hive-status-error)]/20 bg-[var(--hive-status-error)]/10">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-[var(--hive-status-error)] flex-shrink-0" />
            <span className="text-sm text-[var(--hive-status-error)]">{state.error}</span>
          </div>
        </div>
      )}

      {/* Enhanced Form */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            University Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="alex@buffalo.edu"
              className="w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive"
              disabled={state.loading}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/0 to-[var(--hive-brand-accent)]/0 hover:from-[var(--hive-brand-primary)]/5 hover:to-[var(--hive-brand-accent)]/5 transition-all pointer-events-none" />
          </div>
        </div>

        {usePassword && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive"
                disabled={state.loading}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/0 to-[var(--hive-brand-accent)]/0 hover:from-[var(--hive-brand-primary)]/5 hover:to-[var(--hive-brand-accent)]/5 transition-all pointer-events-none" />
            </div>
          </div>
        )}

        <Button 
          type="submit"
          variant="primary"
          size="lg"
          className={cn(
            "w-full font-semibold hive-interactive",
            usePassword 
              ? "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] shadow-[var(--hive-shadow-gold-glow)]" 
              : "bg-gradient-to-r from-[var(--hive-status-info)] to-[var(--hive-status-info)] text-white shadow-[var(--hive-shadow-level2)]"
          )}
          disabled={state.loading || isSubmitting}
        >
          {(state.loading || isSubmitting) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {usePassword ? (
            <>
              <Shield className="h-4 w-4 mr-2" />
              Sign In
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Send Magic Link
            </>
          )}
        </Button>
      </form>

      {/* Enhanced Toggle Auth Method */}
      <div className="relative z-10 text-center">
        <button
          type="button"
          onClick={() => setUsePassword(!usePassword)}
          className="text-sm text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-accent)] transition-colors font-medium"
          disabled={state.loading}
        >
          {usePassword ? (
            <>
              <Zap className="h-3 w-3 mr-1 inline" />
              Use magic link instead
            </>
          ) : (
            <>
              <Shield className="h-3 w-3 mr-1 inline" />
              Use password instead
            </>
          )}
        </button>
      </div>

      {/* Enhanced Footer Links */}
      <div className="relative z-10 text-center space-y-3">
        {usePassword && (
          <button
            type="button"
            onClick={() => setStep('forgot-password')}
            className="block text-sm text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors mx-auto"
            disabled={state.loading}
          >
            Forgot your password?
          </button>
        )}
        
        <div className="text-sm text-[var(--hive-text-muted)]">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setStep('sign-up')}
            className="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-accent)] transition-colors font-medium"
            disabled={state.loading}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// ENHANCED SIGN UP STEP WITH GLASS MORPHISM
// =============================================================================

function EnhancedSignUpStep() {
  const { state, setStep, goBack, handleSignUp, setError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced Validation
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('University email is required');
      return;
    }
    if (!formData.email.includes('.edu')) {
      setError('Please use your university (.edu) email address');
      return;
    }
    if (!formData.password) {
      setError('Password is required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsSubmitting(true);
    await handleSignUp(formData.email, formData.password, formData.name);
    setIsSubmitting(false);
  };

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="glass-strong rounded-3xl p-8 space-y-6 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)] relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] via-transparent to-[var(--hive-overlay-glass-medium)] opacity-40" />
      
      {/* Header */}
      <div className="relative z-10 text-center space-y-4">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors hive-interactive"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']">
            Join{' '}
            <span className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
              HIVE
            </span>
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Start building tools for your campus
          </p>
        </div>
      </div>

      {/* Enhanced Error Display */}
      {state.error && (
        <div className="relative z-10 glass rounded-xl p-4 border border-[var(--hive-status-error)]/20 bg-[var(--hive-status-error)]/10">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-[var(--hive-status-error)] flex-shrink-0" />
            <span className="text-sm text-[var(--hive-status-error)]">{state.error}</span>
          </div>
        </div>
      )}

      {/* Enhanced Form */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="Alex Rivera"
            className="w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive"
            disabled={state.loading}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            University Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="alex@buffalo.edu"
            className="w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive"
            disabled={state.loading}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            placeholder="Create a strong password"
            className="w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive"
            disabled={state.loading}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            Confirm Password
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
            className="w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive"
            disabled={state.loading}
          />
        </div>

        <Button 
          type="submit"
          variant="primary"
          size="lg"
          className="w-full bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] font-semibold shadow-[var(--hive-shadow-gold-glow)] hive-interactive"
          disabled={state.loading || isSubmitting}
        >
          {(state.loading || isSubmitting) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          <Sparkles className="h-4 w-4 mr-2" />
          Create Account
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </form>

      {/* Enhanced Footer */}
      <div className="relative z-10 text-center text-sm text-[var(--hive-text-muted)]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => setStep('sign-in')}
          className="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-accent)] transition-colors font-medium"
          disabled={state.loading}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// ADDITIONAL ENHANCED STEPS (Forgot Password, Verify Email, etc.)
// =============================================================================

function EnhancedForgotPasswordStep() {
  const { state, goBack, handleForgotPassword, setError } = useAuth();
  const [email, setEmailInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    await handleForgotPassword(email);
  };

  return (
    <div className="liquid-metal rounded-3xl p-8 space-y-6 border border-[var(--hive-border-glass)] shadow-[var(--hive-shadow-level3)]">
      <div className="text-center space-y-4">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors hive-interactive"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            Reset Password
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            We'll send you a secure link to reset your password
          </p>
        </div>
      </div>

      {state.error && (
        <div className="glass rounded-xl p-4 border border-[var(--hive-status-error)]/20 bg-[var(--hive-status-error)]/10">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-[var(--hive-status-error)]" />
            <span className="text-sm text-[var(--hive-status-error)]">{state.error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
            University Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="alex@buffalo.edu"
            className="w-full h-12 px-4 bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all"
            disabled={state.loading}
          />
        </div>

        <Button 
          type="submit"
          variant="primary"
          size="lg"
          className="w-full bg-gradient-to-r from-[var(--hive-status-info)] to-[var(--hive-status-info)] text-white font-semibold hive-interactive"
          disabled={state.loading}
        >
          {state.loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          <Mail className="h-4 w-4 mr-2" />
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}

function EnhancedVerifyEmailStep() {
  const { state, goBack } = useAuth();

  return (
    <div className="glass-strong rounded-3xl p-8 text-center space-y-6 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level3)]">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center relative">
          <Mail className="h-10 w-10 text-[var(--hive-brand-primary)]" />
          <div className="absolute inset-0 rounded-full border-2 border-[var(--hive-brand-primary)] animate-pulse" />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
          Check Your Email
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          We sent a verification link to{' '}
          <strong className="text-[var(--hive-brand-primary)]">{state.email}</strong>
        </p>
      </div>

      <div className="glass rounded-xl p-4 border border-[var(--hive-border-glass)]">
        <p className="text-sm text-[var(--hive-text-muted)]">
          Click the link in your email to verify your account and complete registration.
        </p>
      </div>
      
      <Button 
        variant="secondary" 
        size="lg"
        className="w-full border-[var(--hive-border-glass)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass)] hive-interactive"
        onClick={goBack}
      >
        Back to Sign Up
      </Button>
    </div>
  );
}

function EnhancedMagicLinkSentStep() {
  const { state, goBack } = useAuth();

  return (
    <div className="liquid-metal rounded-3xl p-8 text-center space-y-6 border border-[var(--hive-border-glass)] shadow-[var(--hive-shadow-level3)]">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-[var(--hive-status-success)]/20 rounded-full flex items-center justify-center relative">
          <Check className="h-10 w-10 text-[var(--hive-status-success)]" />
          <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-[var(--hive-brand-primary)] animate-pulse" />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
          Magic Link Sent ✨
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Check your email for a secure sign-in link
        </p>
      </div>

      <div className="glass rounded-xl p-4 border border-[var(--hive-border-glass)]">
        <p className="text-sm text-[var(--hive-text-muted)]">
          We sent a secure link to{' '}
          <strong className="text-[var(--hive-brand-primary)]">{state.email}</strong>.{' '}
          Click it to sign in instantly.
        </p>
      </div>
      
      <Button 
        variant="secondary" 
        size="lg"
        className="w-full border-[var(--hive-border-glass)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass)] hive-interactive"
        onClick={goBack}
      >
        Back to Sign In
      </Button>
    </div>
  );
}

function EnhancedOnboardingRedirectStep() {
  return (
    <div className="glass-strong rounded-3xl p-8 text-center space-y-6 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-gold-glow)]">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-full flex items-center justify-center animate-pulse shadow-[var(--hive-shadow-gold-glow)]">
          <ArrowRight className="h-10 w-10 text-[var(--hive-text-inverse)]" />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
            HIVE!
          </span>
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Let's get you set up with your builder profile
        </p>
      </div>

      <div className="space-y-3">
        <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-3 overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-full transition-all duration-1000 animate-pulse" style={{ width: '33%' }} />
        </div>
        <p className="text-sm text-[var(--hive-text-muted)]">
          Setting up your campus builder profile...
        </p>
      </div>
    </div>
  );
}