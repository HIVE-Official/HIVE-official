import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiveButton, 
  HiveInput, 
  HiveCard, 
  HiveProgress 
} from '../../components';
import { HiveLogo } from '../../components/hive-icons';
import { 
  Mail, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  AtSign, 
  Camera, 
  GraduationCap, 
  Wrench, 
  Shield, 
  Loader2, 
  Sparkles,
  School
} from 'lucide-react';

const meta: Meta = {
  title: '12-Onboarding/Clean Auth & Onboarding',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Clean, properly spaced authentication and onboarding flow using HIVE design system with generous spacing and clear visual hierarchy.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// SIMPLIFIED STATE & FLOW
// =============================================================================

type Step = 'school' | 'auth' | 'name' | 'handle' | 'academics' | 'builder' | 'success';

interface FlowState {
  step: Step;
  loading: boolean;
  schoolName: string;
  email: string;
  name: string;
  handle: string;
  major: string;
  builderOptIn: boolean;
}

// =============================================================================
// MOTION SYSTEM
// =============================================================================

const pageTransition = {
  initial: { opacity: 0, y: 40 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -40,
    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
  }
};

// =============================================================================
// SCHOOL SELECTION
// =============================================================================

function SchoolStep({ onNext }: { onNext: (school: string) => void }) {
  const [selected, setSelected] = useState('');
  const schools = ['Stanford University', 'UC Berkeley', 'MIT', 'Harvard University'];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-secondary)] flex items-center justify-center px-8 py-16"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-20">
          <HiveLogo className="h-16 w-16 mx-auto mb-12" />
          <h1 className="text-5xl font-bold text-[var(--hive-text-primary)] mb-8">
            Welcome to HIVE
          </h1>
          <p className="text-xl text-[var(--hive-text-muted)] leading-relaxed">
            Your campus. Built by students who got tired of GroupMe chaos.
          </p>
        </div>
        
        {/* School Selection Card */}
        <HiveCard className="hive-glass p-12 space-y-10">
          <div className="flex items-center space-x-4 mb-8">
            <School className="h-6 w-6 text-[var(--hive-brand-primary)]" />
            <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">
              Find Your School
            </h2>
          </div>
          
          <HiveInput
            type="text"
            placeholder="Search for your university..."
            className="w-full h-14 text-lg"
          />
          
          <div className="space-y-4">
            {schools.map((school) => (
              <motion.button
                key={school}
                className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                  selected === school
                    ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/5'
                    : 'border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]/50'
                }`}
                onClick={() => setSelected(school)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-lg font-medium text-[var(--hive-text-primary)]">
                  {school}
                </div>
                <div className="text-sm text-[var(--hive-text-muted)] mt-1">
                  @{school.toLowerCase().replace(/\s/g, '')}.edu
                </div>
              </motion.button>
            ))}
          </div>
          
          <HiveButton
            className="w-full h-14 text-lg"
            onClick={() => selected && onNext(selected)}
            disabled={!selected}
            variant="premium"
          >
            Continue to Sign In
            <ArrowRight className="w-5 h-5 ml-3" />
          </HiveButton>
        </HiveCard>
      </div>
    </motion.div>
  );
}

// =============================================================================
// AUTHENTICATION
// =============================================================================

function AuthStep({ schoolName, onNext, onBack }: { 
  schoolName: string; 
  onNext: (email: string) => void;
  onBack: () => void;
}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    onNext(email);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-secondary)] flex items-center justify-center px-8 py-16"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-16">
          <HiveLogo className="h-12 w-12 mx-auto mb-10" />
          <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-6">
            Sign in to HIVE
          </h1>
          <p className="text-lg text-[var(--hive-text-muted)]">
            Join <span className="text-[var(--hive-brand-primary)]">{schoolName}</span> on HIVE
          </p>
        </div>
        
        <HiveCard className="hive-glass p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium mb-4 text-[var(--hive-text-primary)]">
                School email address
              </label>
              <HiveInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your school email"
                required
                disabled={loading}
                className="w-full h-14 text-lg"
              />
              <p className="text-sm mt-3 text-[var(--hive-text-muted)]">
                We'll send a secure magic link to your email
              </p>
            </div>
            
            <HiveButton
              type="submit"
              disabled={loading || !email}
              className="w-full h-14 text-lg"
              variant="premium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Sending magic link...
                </>
              ) : (
                <>
                  Send magic link
                  <Mail className="w-5 h-5 ml-3" />
                </>
              )}
            </HiveButton>
          </form>
        </HiveCard>
        
        {/* Back Button */}
        <div className="text-center mt-10">
          <HiveButton variant="ghost" onClick={onBack} className="text-lg">
            <ArrowLeft className="w-5 h-5 mr-3" />
            Back to school selection
          </HiveButton>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// ONBOARDING STEP WRAPPER
// =============================================================================

function OnboardingStep({ 
  title, 
  subtitle, 
  step, 
  totalSteps, 
  children, 
  onNext, 
  onBack, 
  canProceed = true,
  nextLabel = "Continue"
}: {
  title: string;
  subtitle: string;
  step: number;
  totalSteps: number;
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  canProceed?: boolean;
  nextLabel?: string;
}) {
  const progress = (step / totalSteps) * 100;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-secondary)] flex items-center justify-center px-8 py-16"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-2xl">
        <HiveCard className="hive-glass p-16">
          {/* Progress Header */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-sm text-[var(--hive-text-muted)] mb-2">
                  Step {step} of {totalSteps}
                </div>
                <h1 className="text-3xl font-bold text-[var(--hive-text-primary)]">
                  {title}
                </h1>
              </div>
              <div className="text-lg text-[var(--hive-text-muted)]">
                {Math.round(progress)}%
              </div>
            </div>
            <HiveProgress value={progress} className="h-3 mb-6" />
            <p className="text-lg text-[var(--hive-text-muted)] leading-relaxed">
              {subtitle}
            </p>
          </div>
          
          {/* Step Content */}
          <div className="mb-16">
            {children}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center">
            <HiveButton
              variant="ghost"
              onClick={onBack}
              className="text-lg px-8"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back
            </HiveButton>
            
            <HiveButton
              onClick={onNext}
              disabled={!canProceed}
              variant="premium"
              className="text-lg px-12 h-14"
            >
              {nextLabel}
              <ArrowRight className="w-5 h-5 ml-3" />
            </HiveButton>
          </div>
        </HiveCard>
      </div>
    </motion.div>
  );
}

// =============================================================================
// NAME STEP
// =============================================================================

function NameStep({ onNext, onBack }: { onNext: (name: string) => void; onBack: () => void }) {
  const [name, setName] = useState('');

  return (
    <OnboardingStep
      title="What's your name?"
      subtitle="This is how you'll be known on HIVE"
      step={1}
      totalSteps={4}
      onNext={() => onNext(name)}
      onBack={onBack}
      canProceed={name.trim().length >= 2}
    >
      <div className="text-center space-y-12">
        <div className="w-24 h-24 bg-[var(--hive-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto">
          <User className="w-12 h-12 text-[var(--hive-brand-primary)]" />
        </div>

        <div className="max-w-md mx-auto">
          <HiveInput
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-16 text-xl text-center"
            autoFocus
          />
        </div>

        {name.trim().length >= 2 && (
          <motion.div 
            className="flex items-center justify-center space-x-3 text-[var(--hive-status-success)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-lg">Looks good!</span>
          </motion.div>
        )}
      </div>
    </OnboardingStep>
  );
}

// =============================================================================
// HANDLE STEP
// =============================================================================

function HandleStep({ onNext, onBack }: { onNext: (handle: string) => void; onBack: () => void }) {
  const [handle, setHandle] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkHandle = (value: string) => {
    if (value.length >= 3) {
      const reserved = ['admin', 'hive', 'api'];
      setIsAvailable(!reserved.includes(value.toLowerCase()));
    } else {
      setIsAvailable(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setHandle(value);
    checkHandle(value);
  };

  return (
    <OnboardingStep
      title="Choose your handle"
      subtitle="Your unique @username on HIVE"
      step={2}
      totalSteps={4}
      onNext={() => onNext(handle)}
      onBack={onBack}
      canProceed={handle.length >= 3 && isAvailable === true}
    >
      <div className="text-center space-y-12">
        <div className="w-24 h-24 bg-[var(--hive-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto">
          <AtSign className="w-12 h-12 text-[var(--hive-brand-primary)]" />
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <div className="relative">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-muted)] text-xl">
              @
            </div>
            <HiveInput
              type="text"
              placeholder="yourhandle"
              value={handle}
              onChange={handleChange}
              className="w-full h-16 text-xl text-center pl-12"
              autoFocus
            />
            
            {/* Status Indicator */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              {isAvailable === true && (
                <CheckCircle className="w-6 h-6 text-[var(--hive-status-success)]" />
              )}
            </div>
          </div>
          
          <p className="text-sm text-[var(--hive-text-muted)]">
            3+ characters, letters, numbers, and underscores only
          </p>
        </div>

        {handle.length >= 3 && isAvailable === true && (
          <motion.div
            className="p-6 bg-[var(--hive-status-success)]/10 border border-[var(--hive-status-success)]/30 rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-center space-x-3 text-[var(--hive-status-success)]">
              <CheckCircle className="w-5 h-5" />
              <span className="text-lg font-medium">@{handle} is available!</span>
            </div>
          </motion.div>
        )}
      </div>
    </OnboardingStep>
  );
}

// =============================================================================
// ACADEMICS STEP
// =============================================================================

function AcademicsStep({ onNext, onBack }: { onNext: (major: string) => void; onBack: () => void }) {
  const [major, setMajor] = useState('');
  
  const majors = [
    'Computer Science', 'Business', 'Engineering', 'Psychology',
    'Biology', 'Economics', 'Art & Design', 'Mathematics'
  ];

  return (
    <OnboardingStep
      title="What's your major?"
      subtitle="Help us connect you with relevant spaces and peers"
      step={3}
      totalSteps={4}
      onNext={() => onNext(major)}
      onBack={onBack}
      canProceed={!!major}
    >
      <div className="space-y-12">
        <div className="text-center">
          <div className="w-24 h-24 bg-[var(--hive-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <GraduationCap className="w-12 h-12 text-[var(--hive-brand-primary)]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {majors.map((majorOption) => (
            <motion.button
              key={majorOption}
              className={`p-6 rounded-2xl border-2 text-lg transition-all ${
                major === majorOption
                  ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/5 text-[var(--hive-brand-primary)]'
                  : 'border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/50'
              }`}
              onClick={() => setMajor(majorOption)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {majorOption}
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <HiveInput
            type="text"
            placeholder="Or enter your major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full max-w-md mx-auto h-14 text-lg text-center"
          />
        </div>
      </div>
    </OnboardingStep>
  );
}

// =============================================================================
// BUILDER STEP
// =============================================================================

function BuilderStep({ onNext, onBack }: { onNext: (optIn: boolean) => void; onBack: () => void }) {
  const [builderOptIn, setBuilderOptIn] = useState(false);

  return (
    <OnboardingStep
      title="Ready to build?"
      subtitle="Get access to HIVE's tool builder and create custom solutions"
      step={4}
      totalSteps={4}
      onNext={() => onNext(builderOptIn)}
      onBack={onBack}
      canProceed={true}
      nextLabel="Complete Setup"
    >
      <div className="space-y-12">
        <div className="text-center">
          <div className="w-24 h-24 bg-[var(--hive-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Wrench className="w-12 h-12 text-[var(--hive-brand-primary)]" />
          </div>
        </div>

        <HiveCard className="p-10">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-[var(--hive-brand-primary)] rounded-2xl flex items-center justify-center">
              <Wrench className="w-8 h-8 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">
                Builder Access
              </h3>
              <p className="text-lg text-[var(--hive-text-muted)] mb-8 leading-relaxed">
                Create tools, automate workflows, and build solutions for your campus community
              </p>
              <label className="flex items-center space-x-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={builderOptIn}
                  onChange={(e) => setBuilderOptIn(e.target.checked)}
                  className="w-5 h-5 text-[var(--hive-brand-primary)] rounded"
                />
                <span className="text-lg text-[var(--hive-text-primary)]">
                  Yes, I want builder access
                </span>
              </label>
            </div>
          </div>
        </HiveCard>

        {builderOptIn && (
          <motion.div
            className="text-center p-8 bg-[var(--hive-brand-primary)]/5 border border-[var(--hive-brand-primary)]/20 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="w-8 h-8 text-[var(--hive-brand-primary)] mx-auto mb-4" />
            <p className="text-lg text-[var(--hive-text-primary)] font-medium mb-2">
              Welcome to the builder community!
            </p>
            <p className="text-[var(--hive-text-muted)]">
              You'll get access to advanced tools and exclusive builder spaces
            </p>
          </motion.div>
        )}
      </div>
    </OnboardingStep>
  );
}

// =============================================================================
// SUCCESS STEP
// =============================================================================

function SuccessStep({ state }: { state: FlowState }) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-secondary)] flex items-center justify-center px-8 py-16"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="w-full max-w-lg text-center">
        <motion.div 
          className="w-32 h-32 bg-gradient-to-br from-[var(--hive-brand-primary)] to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-12"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Sparkles className="w-16 h-16 text-black" />
        </motion.div>
        
        <h1 className="text-5xl font-bold text-[var(--hive-text-primary)] mb-8">
          Welcome to HIVE!
        </h1>
        
        <p className="text-xl text-[var(--hive-text-muted)] mb-16 leading-relaxed">
          Your profile is ready, {state.name.split(' ')[0]}!
        </p>
        
        <HiveCard className="hive-glass p-10 mb-12">
          <div className="space-y-6 text-left">
            <div className="flex justify-between items-center">
              <span className="text-lg text-[var(--hive-text-muted)]">Name:</span>
              <span className="text-lg text-[var(--hive-text-primary)]">{state.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-[var(--hive-text-muted)]">Handle:</span>
              <span className="text-lg text-[var(--hive-brand-primary)]">@{state.handle}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-[var(--hive-text-muted)]">Major:</span>
              <span className="text-lg text-[var(--hive-text-primary)]">{state.major}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-[var(--hive-text-muted)]">Builder:</span>
              <span className="text-lg text-[var(--hive-text-primary)]">
                {state.builderOptIn ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </HiveCard>
        
        <motion.p 
          className="text-lg text-[var(--hive-text-muted)]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Taking you to your new digital campus...
        </motion.p>
      </div>
    </motion.div>
  );
}

// =============================================================================
// MAIN FLOW COMPONENT
// =============================================================================

function CleanAuthFlow() {
  const [state, setState] = useState<FlowState>({
    step: 'school',
    loading: false,
    schoolName: '',
    email: '',
    name: '',
    handle: '',
    major: '',
    builderOptIn: false,
  });

  const updateState = (updates: Partial<FlowState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (state.step) {
      case 'school':
        return (
          <SchoolStep 
            onNext={(schoolName) => updateState({ schoolName, step: 'auth' })}
          />
        );
      case 'auth':
        return (
          <AuthStep
            schoolName={state.schoolName}
            onNext={(email) => updateState({ email, step: 'name' })}
            onBack={() => updateState({ step: 'school' })}
          />
        );
      case 'name':
        return (
          <NameStep
            onNext={(name) => updateState({ name, step: 'handle' })}
            onBack={() => updateState({ step: 'auth' })}
          />
        );
      case 'handle':
        return (
          <HandleStep
            onNext={(handle) => updateState({ handle, step: 'academics' })}
            onBack={() => updateState({ step: 'name' })}
          />
        );
      case 'academics':
        return (
          <AcademicsStep
            onNext={(major) => updateState({ major, step: 'builder' })}
            onBack={() => updateState({ step: 'handle' })}
          />
        );
      case 'builder':
        return (
          <BuilderStep
            onNext={(builderOptIn) => updateState({ builderOptIn, step: 'success' })}
            onBack={() => updateState({ step: 'academics' })}
          />
        );
      case 'success':
        return <SuccessStep state={state} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={state.step}>
        {renderStep()}
      </motion.div>
    </AnimatePresence>
  );
}

// =============================================================================
// STORIES
// =============================================================================

export const CompleteFlow: Story = {
  name: 'Clean Complete Flow',
  render: () => <CleanAuthFlow />,
  parameters: {
    docs: {
      description: {
        story: 'Clean, properly spaced authentication and onboarding flow with generous spacing, clear visual hierarchy, and proper HIVE design system implementation.'
      }
    }
  }
};

export const SchoolSelection: Story = {
  name: 'School Selection',
  render: () => (
    <SchoolStep onNext={(school) => console.log('Selected:', school)} />
  )
};

export const Authentication: Story = {
  name: 'Authentication',
  render: () => (
    <AuthStep 
      schoolName="Stanford University"
      onNext={(email) => console.log('Email:', email)}
      onBack={() => console.log('Back')}
    />
  )
};

export const NameCollection: Story = {
  name: 'Name Collection',
  render: () => (
    <NameStep 
      onNext={(name) => console.log('Name:', name)}
      onBack={() => console.log('Back')}
    />
  )
};

export const HandleSelection: Story = {
  name: 'Handle Selection',
  render: () => (
    <HandleStep 
      onNext={(handle) => console.log('Handle:', handle)}
      onBack={() => console.log('Back')}
    />
  )
};

export const AcademicDetails: Story = {
  name: 'Academic Details',
  render: () => (
    <AcademicsStep 
      onNext={(major) => console.log('Major:', major)}
      onBack={() => console.log('Back')}
    />
  )
};

export const BuilderPreferences: Story = {
  name: 'Builder Preferences',
  render: () => (
    <BuilderStep 
      onNext={(optIn) => console.log('Builder:', optIn)}
      onBack={() => console.log('Back')}
    />
  )
};

export const SuccessScreen: Story = {
  name: 'Success Screen',
  render: () => (
    <SuccessStep 
      state={{
        step: 'success',
        loading: false,
        schoolName: 'Stanford University',
        email: 'alex@stanford.edu',
        name: 'Alex Rivera',
        handle: 'alexrivera',
        major: 'Computer Science',
        builderOptIn: true,
      }}
    />
  )
};