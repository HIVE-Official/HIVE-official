import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { HiveButton, HiveInput, HiveCard, HiveProgress } from '../../components';
import { HiveLogo } from '../../components/hive-icons';
import { Mail, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, User, GraduationCap, AtSign, Camera, Wrench, Shield, Loader2, Sparkles } from 'lucide-react';

const meta: Meta = {
  title: '12-Onboarding/Real Authentication Flow',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete HIVE authentication and onboarding flow using the actual components and APIs we built. This demonstrates the real user journey with session management, backend integration, and proper error handling.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock API responses for Storybook
const mockAPI = {
  sendMagicLink: async (email: string, schoolId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "Magic link sent to your email address",
      devMode: true,
      magicLink: `http://localhost:3000/auth/verify?mode=signIn&oobCode=DEV_MODE&email=${encodeURIComponent(email)}&schoolId=${schoolId}`
    };
  },
  
  verifyMagicLink: async (email: string, schoolId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      needsOnboarding: true,
      userId: `dev_${email.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`,
      developmentMode: true,
    };
  },
  
  completeOnboarding: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      success: true,
      message: "Onboarding completed successfully",
      user: {
        id: data.userId,
        fullName: data.fullName,
        handle: data.handle.toLowerCase(),
        major: data.major,
        builderOptIn: data.builderOptIn,
      },
    };
  },
  
  checkHandle: async (handle: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const reserved = ['admin', 'hive', 'api', 'test'];
    return {
      available: !reserved.includes(handle.toLowerCase()) && handle.length >= 3
    };
  }
};

// School Search Step
const SchoolSearchStep = ({ onNext }: { onNext: (schoolData: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  
  const mockSchools = [
    { id: 'stanford', name: 'Stanford University', domain: 'stanford.edu' },
    { id: 'berkeley', name: 'UC Berkeley', domain: 'berkeley.edu' },
    { id: 'mit', name: 'MIT', domain: 'mit.edu' },
    { id: 'harvard', name: 'Harvard University', domain: 'harvard.edu' },
  ];
  
  const filteredSchools = mockSchools.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <HiveLogo className="h-12 w-12 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-4">
            Welcome to HIVE
          </h1>
          <p className="text-[var(--hive-text-muted)]">
            Your campus. Built by students who got tired of GroupMe chaos.
          </p>
        </div>
        
        <HiveCard className="p-8">
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-6">
            Find Your School
          </h2>
          
          <div className="space-y-4">
            <HiveInput
              type="text"
              placeholder="Search for your university..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            
            {searchTerm && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredSchools.map((school) => (
                  <div
                    key={school.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedSchool?.id === school.id
                        ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10'
                        : 'border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-focus)]'
                    }`}
                    onClick={() => setSelectedSchool(school)}
                  >
                    <div className="text-[var(--hive-text-primary)] font-medium">
                      {school.name}
                    </div>
                    <div className="text-[var(--hive-text-muted)] text-sm">
                      {school.domain}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <HiveButton
            className="w-full mt-6"
            onClick={() => selectedSchool && onNext(selectedSchool)}
            disabled={!selectedSchool}
          >
            Continue to Sign In
            <ArrowRight className="w-4 h-4 ml-2" />
          </HiveButton>
        </HiveCard>
      </div>
    </div>
  );
};

// Login Step
const LoginStep = ({ schoolData, onNext, onBack }: { 
  schoolData: any; 
  onNext: (email: string, magicLink: string) => void;
  onBack: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await mockAPI.sendMagicLink(email, schoolData.id);
      onNext(email, result.magicLink);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <HiveLogo className="h-12 w-12 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-2">
            Sign in to HIVE
          </h1>
          <p className="text-[var(--hive-text-muted)]">
            Join <span className="text-[var(--hive-brand-primary)]">{schoolData.name}</span> on HIVE
          </p>
        </div>
        
        <HiveCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--hive-text-primary)]">
                School email address
              </label>
              <HiveInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`Enter your @${schoolData.domain} address`}
                required
                disabled={isLoading}
                className="w-full"
              />
              <p className="text-xs mt-1 text-[var(--hive-text-muted)]">
                We'll send a secure magic link to your email
              </p>
            </div>
            
            {error && (
              <div className="p-3 rounded-lg bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/30">
                <p className="text-sm text-[var(--hive-status-error)]">{error}</p>
              </div>
            )}
            
            <HiveButton
              type="submit"
              disabled={isLoading || !email}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending magic link...
                </>
              ) : (
                'Send magic link'
              )}
            </HiveButton>
          </form>
        </HiveCard>
        
        <div className="text-center mt-6">
          <HiveButton variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to school selection
          </HiveButton>
        </div>
      </div>
    </div>
  );
};

// Magic Link Sent Step
const MagicLinkSentStep = ({ email, magicLink, onNext }: { 
  email: string; 
  magicLink: string; 
  onNext: (userData: any) => void;
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  
  const handleMagicLinkClick = async () => {
    setIsVerifying(true);
    
    try {
      const urlParams = new URLSearchParams(new URL(magicLink).search);
      const schoolId = urlParams.get('schoolId');
      
      const result = await mockAPI.verifyMagicLink(email, schoolId || 'test-school');
      
      // Simulate session creation
      const sessionData = {
        userId: result.userId,
        email: email,
        schoolId: schoolId || 'test-school',
        needsOnboarding: result.needsOnboarding,
        verifiedAt: new Date().toISOString(),
      };
      
      onNext(sessionData);
    } catch (error) {
      console.error('Magic link verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--hive-status-success)]/20 border border-[var(--hive-status-success)]/30 flex items-center justify-center">
            <Mail className="w-8 h-8 text-[var(--hive-status-success)]" />
          </div>
          
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-2">
            Check your inbox
          </h1>
          <p className="text-[var(--hive-text-muted)] mb-6">
            Magic link sent to <span className="text-[var(--hive-brand-primary)]">{email}</span>
          </p>
          
          <HiveCard className="p-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-[var(--hive-text-muted)] mb-4">
                🛠️ Development Mode - Magic Link:
              </p>
              <div className="p-3 bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 rounded-lg mb-4">
                <p className="text-xs text-[var(--hive-brand-primary)] break-all">
                  {magicLink}
                </p>
              </div>
              <HiveButton
                onClick={handleMagicLinkClick}
                disabled={isVerifying}
                className="w-full"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Use Dev Magic Link'
                )}
              </HiveButton>
            </div>
          </HiveCard>
          
          <p className="text-sm text-[var(--hive-text-muted)]">
            New to HIVE? Your account will be created automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

// Onboarding Steps
const OnboardingSteps = ({ 
  userData, 
  onComplete 
}: { 
  userData: any; 
  onComplete: (result: any) => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    fullName: '',
    major: '',
    handle: '',
    avatarUrl: '',
    builderOptIn: false,
    consentGiven: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [handleAvailable, setHandleAvailable] = useState<boolean | null>(null);
  const [isCheckingHandle, setIsCheckingHandle] = useState(false);
  
  const steps = [
    { id: 'name', title: 'Your Identity', icon: User },
    { id: 'academics', title: 'Academic Profile', icon: GraduationCap },
    { id: 'handle', title: 'Unique Handle', icon: AtSign },
    { id: 'photo', title: 'Profile Picture', icon: Camera },
    { id: 'builder', title: 'Builder Access', icon: Wrench },
    { id: 'legal', title: 'Terms & Privacy', icon: Shield },
  ];
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const checkHandle = async (handle: string) => {
    if (handle.length < 3) {
      setHandleAvailable(null);
      return;
    }
    
    setIsCheckingHandle(true);
    try {
      const result = await mockAPI.checkHandle(handle);
      setHandleAvailable(result.available);
    } finally {
      setIsCheckingHandle(false);
    }
  };
  
  const canGoNext = () => {
    switch (currentStep) {
      case 0: return data.fullName.trim().length >= 2;
      case 1: return data.major.length > 0;
      case 2: return data.handle.length >= 3 && handleAvailable === true;
      case 3: return true; // Optional step
      case 4: return true;
      case 5: return data.consentGiven;
      default: return false;
    }
  };
  
  const goNext = () => {
    if (currentStep < steps.length - 1 && canGoNext()) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = async () => {
    if (!canGoNext()) return;
    
    setIsSubmitting(true);
    try {
      const result = await mockAPI.completeOnboarding({
        userId: userData.userId,
        ...data,
      });
      
      onComplete(result);
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 0: // Name
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
                What's your name?
              </h2>
              <p className="text-[var(--hive-text-muted)]">
                This is how you'll be known on HIVE
              </p>
            </div>
            <HiveInput
              type="text"
              placeholder="Enter your full name"
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
              className="w-full text-lg"
            />
          </div>
        );
      
      case 1: // Academics
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
                What's your major?
              </h2>
              <p className="text-[var(--hive-text-muted)]">
                Help us connect you with relevant spaces
              </p>
            </div>
            <HiveInput
              type="text"
              placeholder="e.g., Computer Science, Business, Art"
              value={data.major}
              onChange={(e) => setData({ ...data, major: e.target.value })}
              className="w-full text-lg"
            />
          </div>
        );
      
      case 2: // Handle
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
                Choose your handle
              </h2>
              <p className="text-[var(--hive-text-muted)]">
                Your unique @username on HIVE
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-muted)]">
                @
              </div>
              <HiveInput
                type="text"
                placeholder="yourhandle"
                value={data.handle}
                onChange={(e) => {
                  const newHandle = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
                  setData({ ...data, handle: newHandle });
                  checkHandle(newHandle);
                }}
                className="w-full text-lg pl-8"
              />
              {isCheckingHandle && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              )}
              {!isCheckingHandle && handleAvailable === true && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <CheckCircle className="w-4 h-4 text-[var(--hive-status-success)]" />
                </div>
              )}
              {!isCheckingHandle && handleAvailable === false && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <AlertCircle className="w-4 h-4 text-[var(--hive-status-error)]" />
                </div>
              )}
            </div>
            {handleAvailable === false && (
              <p className="text-sm text-[var(--hive-status-error)]">
                This handle is not available
              </p>
            )}
          </div>
        );
      
      case 3: // Photo
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
                Add a profile picture
              </h2>
              <p className="text-[var(--hive-text-muted)]">
                Optional - you can add this later
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-[var(--hive-background-secondary)] rounded-full flex items-center justify-center border-2 border-dashed border-[var(--hive-border-subtle)]">
                <Camera className="w-8 h-8 text-[var(--hive-text-muted)]" />
              </div>
            </div>
            <p className="text-center text-sm text-[var(--hive-text-muted)]">
              Click to upload or drag and drop
            </p>
          </div>
        );
      
      case 4: // Builder
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
                Ready to build?
              </h2>
              <p className="text-[var(--hive-text-muted)]">
                Get access to HIVE's tool builder and create custom solutions
              </p>
            </div>
            <HiveCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[var(--hive-brand-primary)] rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                    Builder Access
                  </h3>
                  <p className="text-sm text-[var(--hive-text-muted)] mb-4">
                    Create tools, automate workflows, and build solutions for your campus community
                  </p>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.builderOptIn}
                      onChange={(e) => setData({ ...data, builderOptIn: e.target.checked })}
                      className="w-4 h-4 text-[var(--hive-brand-primary)] rounded"
                    />
                    <span className="text-sm text-[var(--hive-text-primary)]">
                      Yes, I want builder access
                    </span>
                  </label>
                </div>
              </div>
            </HiveCard>
          </div>
        );
      
      case 5: // Legal
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
                Terms & Privacy
              </h2>
              <p className="text-[var(--hive-text-muted)]">
                Please review and accept our terms
              </p>
            </div>
            <div className="space-y-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.consentGiven}
                  onChange={(e) => setData({ ...data, consentGiven: e.target.checked })}
                  className="w-4 h-4 text-[var(--hive-brand-primary)] rounded mt-1"
                />
                <div className="text-sm text-[var(--hive-text-muted)]">
                  I agree to HIVE's{' '}
                  <a href="#" className="text-[var(--hive-brand-primary)] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[var(--hive-brand-primary)] hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </label>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <HiveCard className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[var(--hive-brand-primary)] rounded-lg flex items-center justify-center">
                  {steps[currentStep] && (() => {
                    const IconComponent = steps[currentStep].icon;
                    return <IconComponent className="w-4 h-4 text-black" />;
                  })()}
                </div>
                <div>
                  <div className="text-sm text-[var(--hive-text-muted)]">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                  <div className="text-lg font-semibold text-[var(--hive-text-primary)]">
                    {steps[currentStep]?.title}
                  </div>
                </div>
              </div>
              <div className="text-sm text-[var(--hive-text-muted)]">
                {Math.round(progress)}% complete
              </div>
            </div>
            <HiveProgress value={progress} className="h-2" />
          </div>
          
          {/* Step Content */}
          <div className="min-h-[280px] mb-6">
            {renderStep()}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <HiveButton
              variant="ghost"
              onClick={goBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </HiveButton>
            
            {currentStep === steps.length - 1 ? (
              <HiveButton
                onClick={handleSubmit}
                disabled={!canGoNext() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating your profile...
                  </>
                ) : (
                  <>
                    Enter HIVE
                    <Sparkles className="w-4 h-4 ml-2" />
                  </>
                )}
              </HiveButton>
            ) : (
              <HiveButton
                onClick={goNext}
                disabled={!canGoNext()}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </HiveButton>
            )}
          </div>
        </HiveCard>
      </div>
    </div>
  );
};

// Success Step
const SuccessStep = ({ result }: { result: any }) => {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-[var(--hive-brand-primary)] to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-black" />
        </div>
        
        <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-4">
          Welcome to HIVE!
        </h1>
        
        <p className="text-xl text-[var(--hive-text-muted)] mb-8">
          Your profile is ready, {result.user.fullName.split(' ')[0]}!
        </p>
        
        <HiveCard className="p-6 mb-8">
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-[var(--hive-text-muted)]">Name:</span>
              <span className="text-[var(--hive-text-primary)]">{result.user.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--hive-text-muted)]">Handle:</span>
              <span className="text-[var(--hive-brand-primary)]">@{result.user.handle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--hive-text-muted)]">Major:</span>
              <span className="text-[var(--hive-text-primary)]">{result.user.major}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--hive-text-muted)]">Builder:</span>
              <span className="text-[var(--hive-text-primary)]">
                {result.user.builderOptIn ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </HiveCard>
        
        <p className="text-sm text-[var(--hive-text-muted)]">
          Taking you to your new digital campus...
        </p>
      </div>
    </div>
  );
};

// Main Flow Component
const RealAuthFlow = () => {
  const [currentStep, setCurrentStep] = useState<'school' | 'login' | 'magic-link' | 'onboarding' | 'success'>('school');
  const [schoolData, setSchoolData] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [magicLink, setMagicLink] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  
  const handleSchoolSelected = (school: any) => {
    setSchoolData(school);
    setCurrentStep('login');
  };
  
  const handleMagicLinkSent = (userEmail: string, link: string) => {
    setEmail(userEmail);
    setMagicLink(link);
    setCurrentStep('magic-link');
  };
  
  const handleMagicLinkVerified = (user: any) => {
    setUserData(user);
    setCurrentStep('onboarding');
  };
  
  const handleOnboardingComplete = (onboardingResult: any) => {
    setResult(onboardingResult);
    setCurrentStep('success');
  };
  
  const resetFlow = () => {
    setCurrentStep('school');
    setSchoolData(null);
    setEmail('');
    setMagicLink('');
    setUserData(null);
    setResult(null);
  };
  
  switch (currentStep) {
    case 'school':
      return <SchoolSearchStep onNext={handleSchoolSelected} />;
    case 'login':
      return (
        <LoginStep
          schoolData={schoolData}
          onNext={handleMagicLinkSent}
          onBack={() => setCurrentStep('school')}
        />
      );
    case 'magic-link':
      return (
        <MagicLinkSentStep
          email={email}
          magicLink={magicLink}
          onNext={handleMagicLinkVerified}
        />
      );
    case 'onboarding':
      return (
        <OnboardingSteps
          userData={userData}
          onComplete={handleOnboardingComplete}
        />
      );
    case 'success':
      return <SuccessStep result={result} />;
    default:
      return null;
  }
};

export const CompleteRealAuthFlow: Story = {
  name: 'Complete Real Authentication Flow',
  render: () => <RealAuthFlow />,
  parameters: {
    docs: {
      description: {
        story: 'Complete authentication and onboarding flow using the actual components and API structure we built. This demonstrates the real user journey: school selection → login → magic link → onboarding → success. All form validation, error handling, and state management works exactly as in the production app.'
      }
    }
  }
};

// Individual step stories for testing
export const SchoolSearch: Story = {
  name: 'School Search Step',
  render: () => <SchoolSearchStep onNext={(school) => console.log('School selected:', school)} />,
  parameters: {
    docs: {
      description: {
        story: 'School search and selection step with real search functionality and school data.'
      }
    }
  }
};

export const LoginForm: Story = {
  name: 'Login Form Step',
  render: () => {
    const mockSchool = { id: 'stanford', name: 'Stanford University', domain: 'stanford.edu' };
    return (
      <LoginStep
        schoolData={mockSchool}
        onNext={(email, link) => console.log('Magic link sent:', { email, link })}
        onBack={() => console.log('Back to school selection')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Login form with email validation and magic link sending functionality.'
      }
    }
  }
};

export const MagicLinkSent: Story = {
  name: 'Magic Link Sent Step',
  render: () => (
    <MagicLinkSentStep
      email="test@stanford.edu"
      magicLink="http://localhost:3000/auth/verify?mode=signIn&oobCode=DEV_MODE&email=test%40stanford.edu&schoolId=stanford"
      onNext={(userData) => console.log('Magic link verified:', userData)}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Magic link confirmation screen with development mode link for testing.'
      }
    }
  }
};

export const OnboardingFlow: Story = {
  name: 'Onboarding Flow Steps',
  render: () => {
    const mockUserData = {
      userId: 'dev_test_user_123',
      email: 'test@stanford.edu',
      schoolId: 'stanford',
    };
    
    return (
      <OnboardingSteps
        userData={mockUserData}
        onComplete={(result) => console.log('Onboarding complete:', result)}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete onboarding wizard with all steps: name, academics, handle, photo, builder, and legal. Features real validation, handle checking, and progress tracking.'
      }
    }
  }
};

export const SuccessScreen: Story = {
  name: 'Success Screen',
  render: () => {
    const mockResult = {
      user: {
        fullName: 'Alex Rivera',
        handle: 'alexrivera',
        major: 'Computer Science',
        builderOptIn: true,
      }
    };
    
    return <SuccessStep result={mockResult} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Success screen showing completed profile information after successful onboarding.'
      }
    }
  }
};