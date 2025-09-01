import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../atomic/atoms/button-enhanced';
import { InputEnhanced as Input } from '../atomic/atoms/input-enhanced';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../atomic/molecules/card';
import { Badge } from '../atomic/atoms/badge';

// =============================================================================
// INDIVIDUAL ONBOARDING COMPONENTS SHOWCASE  
// =============================================================================

/**
 * # Onboarding Components Showcase
 * 
 * Individual onboarding components used throughout the HIVE onboarding wizard.
 * These components guide new users through profile setup, academic configuration,
 * and platform introduction.
 * 
 * ## Components Included
 * - Name input with validation
 * - Handle (@username) selector with availability check
 * - Profile photo upload with preview
 * - Academic year and major selection
 * - Builder skills assessment
 * - Progress indicators and navigation
 */

// Name Input Component
function NameInputComponent({ 
  onNameChange,
  error,
  loading = false 
}: { 
  onNameChange?: (firstName: string, lastName: string) => void;
  error?: string;
  loading?: boolean;
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    onNameChange?.(value, lastName);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    onNameChange?.(firstName, value);
  };

  const isValid = firstName.length >= 2 && lastName.length >= 2;

  return (
    <Card className="w-full max-w-md bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]">
      <CardHeader>
        <CardTitle className="text-[var(--hive-text-primary)]">What's your name?</CardTitle>
        <CardDescription className="text-[var(--hive-text-secondary)]">
          Help your classmates recognize you on HIVE
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--hive-text-primary)]">
              First Name
            </label>
            <Input
              placeholder="John"
              value={firstName}
              onChange={handleFirstNameChange}
              disabled={loading}
              className={error ? 'border-[var(--hive-status-error)]' : ''}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--hive-text-primary)]">
              Last Name
            </label>
            <Input
              placeholder="Doe"
              value={lastName}
              onChange={handleLastNameChange}
              disabled={loading}
              className={error ? 'border-[var(--hive-status-error)]' : ''}
            />
          </div>
        </div>
        
        {error && (
          <div className="text-xs text-[var(--hive-status-error)] flex items-center gap-1">
            <span>⚠</span> {error}
          </div>
        )}

        {/* Preview */}
        {isValid && (
          <div className="p-3 bg-[var(--hive-background-tertiary)] rounded-lg">
            <div className="text-xs text-[var(--hive-text-tertiary)] mb-1">Preview:</div>
            <div className="font-medium text-[var(--hive-text-primary)]">
              {firstName} {lastName}
            </div>
          </div>
        )}

        <Button 
          className="w-full" 
          disabled={!isValid || loading}
          variant={isValid ? "primary" : "secondary"}
        >
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </CardContent>
    </Card>
  );
}

// Handle Selection Component
function HandleSelectorComponent({ 
  onHandleChange,
  error,
  loading = false 
}: { 
  onHandleChange?: (handle: string) => void;
  error?: string;
  loading?: boolean;
}) {
  const [handle, setHandle] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setHandle(value);
    onHandleChange?.(value);
    
    // Simulate availability check
    if (value.length >= 3) {
      setChecking(true);
      setAvailable(null);
      setTimeout(() => {
        setChecking(false);
        setAvailable(!['admin', 'test', 'user', 'buffalo'].includes(value));
      }, 1000);
    } else {
      setAvailable(null);
    }
  };

  const isValid = handle.length >= 3 && available === true;

  return (
    <Card className="w-full max-w-md bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]">
      <CardHeader>
        <CardTitle className="text-[var(--hive-text-primary)]">Choose your handle</CardTitle>
        <CardDescription className="text-[var(--hive-text-secondary)]">
          This is how others will find and mention you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-secondary)]">
              @
            </div>
            <Input
              placeholder="yourhandle"
              value={handle}
              onChange={handleChange}
              disabled={loading}
              className={`pl-8 ${
                error 
                  ? 'border-[var(--hive-status-error)]' 
                  : available === true 
                  ? 'border-[var(--hive-status-success)]'
                  : available === false
                  ? 'border-[var(--hive-status-warning)]'
                  : ''
              }`}
            />
          </div>
          
          {/* Handle Status */}
          {handle.length >= 3 && (
            <div className="flex items-center gap-2 text-xs">
              {checking ? (
                <>
                  <div className="w-3 h-3 border border-[var(--hive-text-tertiary)] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[var(--hive-text-tertiary)]">Checking availability...</span>
                </>
              ) : available === true ? (
                <>
                  <span className="text-[var(--hive-status-success)]">✓</span>
                  <span className="text-[var(--hive-status-success)]">@{handle} is available!</span>
                </>
              ) : available === false ? (
                <>
                  <span className="text-[var(--hive-status-warning)]">⚠</span>
                  <span className="text-[var(--hive-status-warning)]">@{handle} is taken. Try another?</span>
                </>
              ) : null}
            </div>
          )}

          {/* Handle Requirements */}
          {handle.length < 3 && handle.length > 0 && (
            <div className="text-xs text-[var(--hive-text-tertiary)]">
              Handle must be at least 3 characters
            </div>
          )}
          
          {error && (
            <div className="text-xs text-[var(--hive-status-error)] flex items-center gap-1">
              <span>⚠</span> {error}
            </div>
          )}
        </div>

        {/* Preview */}
        {isValid && (
          <div className="p-3 bg-[var(--hive-background-tertiary)] rounded-lg">
            <div className="text-xs text-[var(--hive-text-tertiary)] mb-1">Your profile URL:</div>
            <div className="font-mono text-sm text-[var(--hive-brand-secondary)]">
              hive.college/@{handle}
            </div>
          </div>
        )}

        <Button 
          className="w-full" 
          disabled={!isValid || loading}
          variant={isValid ? "primary" : "secondary"}
        >
          {loading ? 'Saving...' : 'Claim Handle'}
        </Button>
      </CardContent>
    </Card>
  );
}

// Academic Info Component
function AcademicInfoComponent({ 
  onAcademicChange,
  loading = false 
}: { 
  onAcademicChange?: (year: string, major: string) => void;
  loading?: boolean;
}) {
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');

  const academicYears = [
    'Freshman (Class of 2028)',
    'Sophomore (Class of 2027)',
    'Junior (Class of 2026)',
    'Senior (Class of 2025)',
    'Graduate Student',
    'Faculty'
  ];

  const popularMajors = [
    'Computer Science',
    'Engineering',
    'Business Administration', 
    'Psychology',
    'Biology',
    'Mathematics',
    'English',
    'Political Science',
    'Art',
    'Other'
  ];

  const handleYearChange = (selectedYear: string) => {
    setYear(selectedYear);
    onAcademicChange?.(selectedYear, major);
  };

  const handleMajorChange = (selectedMajor: string) => {
    setMajor(selectedMajor);
    onAcademicChange?.(year, selectedMajor);
  };

  const isValid = year && major;

  return (
    <Card className="w-full max-w-md bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]">
      <CardHeader>
        <CardTitle className="text-[var(--hive-text-primary)]">Academic Info</CardTitle>
        <CardDescription className="text-[var(--hive-text-secondary)]">
          Help us connect you with relevant classmates and spaces
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Academic Year */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">
            Academic Level
          </label>
          <div className="grid grid-cols-1 gap-2">
            {academicYears.map((yearOption) => (
              <button
                key={yearOption}
                onClick={() => handleYearChange(yearOption)}
                disabled={loading}
                className={`p-3 rounded-lg text-left text-sm transition-all border ${
                  year === yearOption
                    ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)]'
                    : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]'
                }`}
              >
                {yearOption}
              </button>
            ))}
          </div>
        </div>

        {/* Major Selection */}
        {year && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--hive-text-primary)]">
              Major/Field of Study
            </label>
            <div className="flex flex-wrap gap-2">
              {popularMajors.map((majorOption) => (
                <button
                  key={majorOption}
                  onClick={() => handleMajorChange(majorOption)}
                  disabled={loading}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all border ${
                    major === majorOption
                      ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)]'
                      : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]'
                  }`}
                >
                  {majorOption}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        {isValid && (
          <div className="p-3 bg-[var(--hive-background-tertiary)] rounded-lg space-y-2">
            <div className="text-xs text-[var(--hive-text-tertiary)]">Academic Profile:</div>
            <div className="space-y-1">
              <div className="text-sm font-medium text-[var(--hive-text-primary)]">{major}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">{year}</div>
            </div>
          </div>
        )}

        <Button 
          className="w-full" 
          disabled={!isValid || loading}
          variant={isValid ? "primary" : "secondary"}
        >
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </CardContent>
    </Card>
  );
}

// Builder Assessment Component
function BuilderAssessmentComponent({ 
  onAssessmentChange,
  loading = false 
}: { 
  onAssessmentChange?: (skills: string[], interest: string) => void;
  loading?: boolean;
}) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [builderInterest, setBuilderInterest] = useState('');

  const skills = [
    { name: 'Web Development', icon: '🌐' },
    { name: 'Mobile Apps', icon: '📱' },
    { name: 'Data Science', icon: '📊' },
    { name: 'Design', icon: '🎨' },
    { name: 'Writing', icon: '✍️' },
    { name: 'Video/Media', icon: '🎥' },
    { name: 'Research', icon: '🔬' },
    { name: 'Event Planning', icon: '🎉' },
    { name: 'Social Media', icon: '📢' },
    { name: 'Business', icon: '💼' }
  ];

  const interestLevels = [
    { value: 'excited', label: '🚀 Super excited! I want to build tools', emoji: '🚀' },
    { value: 'interested', label: '✨ Interested in learning more', emoji: '✨' },
    { value: 'maybe', label: '🤔 Maybe in the future', emoji: '🤔' },
    { value: 'not-now', label: '👀 Just here to use tools', emoji: '👀' }
  ];

  const toggleSkill = (skill: string) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updated);
    onAssessmentChange?.(updated, builderInterest);
  };

  const handleInterestChange = (interest: string) => {
    setBuilderInterest(interest);
    onAssessmentChange?.(selectedSkills, interest);
  };

  const isValid = builderInterest !== '';

  return (
    <Card className="w-full max-w-md bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]">
      <CardHeader>
        <CardTitle className="text-[var(--hive-text-primary)]">Are you a builder?</CardTitle>
        <CardDescription className="text-[var(--hive-text-secondary)]">
          HIVE is built by students, for students. What are your superpowers?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skills Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">
            What are you good at? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill) => (
              <button
                key={skill.name}
                onClick={() => toggleSkill(skill.name)}
                disabled={loading}
                className={`p-3 rounded-lg text-left text-sm transition-all border flex items-center gap-2 ${
                  selectedSkills.includes(skill.name)
                    ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)]'
                    : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]'
                }`}
              >
                <span>{skill.icon}</span>
                <span>{skill.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Builder Interest Level */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">
            How do you feel about building campus tools?
          </label>
          <div className="space-y-2">
            {interestLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => handleInterestChange(level.value)}
                disabled={loading}
                className={`w-full p-3 rounded-lg text-left text-sm transition-all border ${
                  builderInterest === level.value
                    ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)]'
                    : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Builder Badge Preview */}
        {builderInterest === 'excited' && selectedSkills.length > 0 && (
          <div className="p-3 bg-gradient-to-br from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5 rounded-lg border border-[var(--hive-brand-secondary)]/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚡</span>
              <span className="font-semibold text-[var(--hive-brand-secondary)]">Builder Status Unlocked!</span>
            </div>
            <div className="text-xs text-[var(--hive-text-secondary)]">
              You'll get early access to HIVE Lab and builder tools
            </div>
          </div>
        )}

        <Button 
          className="w-full" 
          disabled={!isValid || loading}
          variant={isValid ? "primary" : "secondary"}
        >
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </CardContent>
    </Card>
  );
}

// Progress Indicator Component
function ProgressIndicatorComponent({ 
  currentStep = 3,
  totalSteps = 6,
  steps = ['Welcome', 'Name', 'Handle', 'Academic', 'Builder', 'Complete']
}: { 
  currentStep?: number;
  totalSteps?: number;
  steps?: string[];
}) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card className="w-full max-w-md bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]">
      <CardHeader>
        <CardTitle className="text-[var(--hive-text-primary)]">Onboarding Progress</CardTitle>
        <CardDescription className="text-[var(--hive-text-secondary)]">
          Step {currentStep} of {totalSteps}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[var(--hive-text-tertiary)]">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-[var(--hive-background-tertiary)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary)]/80 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="space-y-2">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;
            
            return (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  isCompleted 
                    ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                    : isCurrent 
                    ? 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border-2 border-[var(--hive-brand-secondary)]'
                    : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-tertiary)]'
                }`}>
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className={`text-sm ${
                  isCurrent 
                    ? 'text-[var(--hive-text-primary)] font-medium'
                    : isCompleted
                    ? 'text-[var(--hive-text-secondary)]'
                    : 'text-[var(--hive-text-tertiary)]'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Time Estimate */}
        <div className="text-center pt-2 border-t border-[var(--hive-border-default)]">
          <div className="text-xs text-[var(--hive-text-tertiary)]">
            About {totalSteps - currentStep + 1} minutes remaining
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// STORYBOOK CONFIGURATION
// =============================================================================

const meta: Meta<typeof NameInputComponent> = {
  title: 'Onboarding Components/Individual Components',
  component: NameInputComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Individual onboarding components that guide users through profile setup and platform introduction.'
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0A0A' },
        { name: 'light', value: '#FFFFFF' }
      ]
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// INDIVIDUAL COMPONENT STORIES
// =============================================================================

export const NameInput: Story = {
  name: '👤 Name Input',
  render: () => (
    <NameInputComponent 
      onNameChange={(first, last) => console.log('Name:', first, last)} 
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Name input component with validation and preview for first and last name collection.'
      }
    }
  }
};

export const HandleSelector: Story = {
  name: '@ Handle Selector',
  render: () => (
    <HandleSelectorComponent 
      onHandleChange={(handle) => console.log('Handle:', handle)} 
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Handle selection component with availability checking and validation.'
      }
    }
  }
};

export const AcademicInfo: Story = {
  name: '🎓 Academic Info',
  render: () => (
    <AcademicInfoComponent 
      onAcademicChange={(year, major) => console.log('Academic:', year, major)} 
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Academic information collection for university level and major selection.'
      }
    }
  }
};

export const BuilderAssessment: Story = {
  name: '⚡ Builder Assessment',
  render: () => (
    <BuilderAssessmentComponent 
      onAssessmentChange={(skills, interest) => console.log('Builder:', skills, interest)} 
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Builder skills assessment to identify potential tool creators and unlock builder features.'
      }
    }
  }
};

export const ProgressIndicator: Story = {
  name: '📊 Progress Indicator',
  render: () => <ProgressIndicatorComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Onboarding progress indicator showing current step, completion percentage, and remaining steps.'
      }
    }
  }
};

export const ProgressIndicatorStart: Story = {
  name: '📊 Progress (Start)',
  render: () => <ProgressIndicatorComponent currentStep={1} />
};

export const ProgressIndicatorMiddle: Story = {
  name: '📊 Progress (Middle)', 
  render: () => <ProgressIndicatorComponent currentStep={4} />
};

export const ProgressIndicatorEnd: Story = {
  name: '📊 Progress (Near End)',
  render: () => <ProgressIndicatorComponent currentStep={6} />
};

// Component Composition Example
export const OnboardingFlowComposition: Story = {
  name: '🎨 Complete Onboarding Flow',
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
      handle: '',
      year: '',
      major: '',
      skills: [] as string[],
      builderInterest: ''
    });

    const totalSteps = 6;
    const steps = ['Welcome', 'Name', 'Handle', 'Academic', 'Builder', 'Complete'];

    const handleNext = () => {
      setCurrentStep(Math.min(currentStep + 1, totalSteps));
    };

    const handleBack = () => {
      setCurrentStep(Math.max(currentStep - 1, 1));
    };

    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            Welcome to HIVE
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Let's get you set up at the University of Buffalo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Progress Sidebar */}
          <div>
            <ProgressIndicatorComponent 
              currentStep={currentStep} 
              totalSteps={totalSteps}
              steps={steps}
            />
          </div>

          {/* Step Content */}
          <div>
            {currentStep === 1 && (
              <Card className="bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary)]/60 flex items-center justify-center">
                    <span className="text-2xl">👋</span>
                  </div>
                  <CardTitle className="text-[var(--hive-text-primary)]">Welcome to HIVE!</CardTitle>
                  <CardDescription className="text-[var(--hive-text-secondary)]">
                    The social platform built by UB students, for UB students
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button onClick={handleNext} className="w-full">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <NameInputComponent 
                onNameChange={(first, last) => {
                  setUserData({ ...userData, firstName: first, lastName: last });
                  if (first.length >= 2 && last.length >= 2) {
                    setTimeout(handleNext, 1000);
                  }
                }}
              />
            )}

            {currentStep === 3 && (
              <HandleSelectorComponent 
                onHandleChange={(handle) => {
                  setUserData({ ...userData, handle });
                  if (handle.length >= 3) {
                    setTimeout(handleNext, 1500);
                  }
                }}
              />
            )}

            {currentStep === 4 && (
              <AcademicInfoComponent 
                onAcademicChange={(year, major) => {
                  setUserData({ ...userData, year, major });
                  if (year && major) {
                    setTimeout(handleNext, 1000);
                  }
                }}
              />
            )}

            {currentStep === 5 && (
              <BuilderAssessmentComponent 
                onAssessmentChange={(skills, interest) => {
                  setUserData({ ...userData, skills, builderInterest: interest });
                  if (interest) {
                    setTimeout(handleNext, 1000);
                  }
                }}
              />
            )}

            {currentStep === 6 && (
              <Card className="bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)]">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary)]/60 flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <CardTitle className="text-[var(--hive-text-primary)]">
                    All set, {userData.firstName}!
                  </CardTitle>
                  <CardDescription className="text-[var(--hive-text-secondary)]">
                    You're ready to start building your campus community
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <div className="font-mono text-sm text-[var(--hive-brand-secondary)]">
                      @{userData.handle}
                    </div>
                    <div className="text-sm text-[var(--hive-text-secondary)]">
                      {userData.major} • {userData.year}
                    </div>
                    {userData.builderInterest === 'excited' && (
                      <Badge className="bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)]">
                        ⚡ Builder
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full">
                    Enter HIVE
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            {currentStep > 1 && currentStep < 6 && (
              <div className="flex justify-between mt-4">
                <Button variant="ghost" onClick={handleBack}>
                  ← Back
                </Button>
                <Button onClick={handleNext}>
                  Next →
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete onboarding flow composition showing how individual components work together to create a seamless user experience.'
      }
    }
  }
};