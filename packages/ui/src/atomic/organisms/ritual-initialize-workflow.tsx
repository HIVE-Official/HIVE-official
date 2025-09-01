"use client";

import React, { useState, useEffect } from 'react';
import { Button, Progress, Input, Textarea } from '../atoms';
import { Card } from '../molecules';
import { 
  Target, 
  User, 
  BookOpen, 
  Heart, 
  Briefcase, 
  MapPin,
  Camera,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Users,
  Clock,
  Badge
} from 'lucide-react';

export interface InitializeRitualProps {
  currentStep?: number;
  onStepComplete?: (stepId: string, data: any) => void;
  onRitualComplete?: () => void;
  userProgress?: {
    completedSteps: string[];
    currentStepData?: any;
  };
  className?: string;
}

interface RitualStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  estimatedTime: number; // minutes
  isRequired: boolean;
  component: React.ComponentType<any>;
}

// Step Components
const ProfileBasicsStep = ({ onComplete, initialData }: any) => {
  const [formData, setFormData] = useState({
    displayName: initialData?.displayName || '',
    bio: initialData?.bio || '',
    major: initialData?.major || '',
    graduationYear: initialData?.graduationYear || '',
    ...initialData
  });

  const majors = [
    'Computer Science', 'Biology', 'Psychology', 'Business', 'Engineering',
    'Mathematics', 'English', 'History', 'Chemistry', 'Physics', 'Art', 'Music'
  ];

  const years = ['2025', '2026', '2027', '2028'];

  const isValid = formData.displayName.trim() && formData.major && formData.graduationYear;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-hive-gold to-hive-brand-secondary rounded-full flex items-center justify-center">
          <User className="h-10 w-10 text-hive-obsidian" />
        </div>
        <h3 className="text-2xl font-bold text-hive-text-primary mb-2">
          Tell Us About Yourself
        </h3>
        <p className="text-hive-text-secondary">
          This information helps us personalize your HIVE experience
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-hive-text-primary mb-2">
            Display Name *
          </label>
          <Input
            value={formData.displayName}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, displayName: e.target.value }))}
            placeholder="How should others see your name?"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-hive-text-primary mb-2">
            Bio
          </label>
          <Textarea
            value={formData.bio}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell us a bit about yourself..."
            className="w-full h-24"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-hive-text-primary mb-2">
              Major *
            </label>
            <select
              value={formData.major}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, major: e.target.value }))}
              className="w-full p-3 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary"
            >
              <option value="">Select your major</option>
              {majors.map(major => (
                <option key={major} value={major}>{major}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-hive-text-primary mb-2">
              Graduation Year *
            </label>
            <select
              value={formData.graduationYear}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, graduationYear: e.target.value }))}
              className="w-full p-3 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary"
            >
              <option value="">Select year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Button
        onClick={() => onComplete(formData)}
        disabled={!isValid}
        className="w-full bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90"
      >
        Continue to Interests
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

const InterestsStep = ({ onComplete, initialData }: any) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialData?.interests || []);

  const interestCategories = {
    'Academic': ['Study Groups', 'Research', 'Tutoring', 'Academic Clubs'],
    'Technology': ['Coding', 'AI/ML', 'Cybersecurity', 'Web Development', 'Mobile Apps'],
    'Creative': ['Art', 'Music', 'Writing', 'Photography', 'Design'],
    'Sports & Fitness': ['Intramural Sports', 'Gym', 'Running', 'Yoga', 'Outdoor Activities'],
    'Social': ['Parties', 'Networking', 'Community Service', 'Cultural Events'],
    'Professional': ['Internships', 'Career Development', 'Entrepreneurship', 'Finance']
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const isValid = selectedInterests.length >= 3;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-hive-brand-secondary to-purple-500 rounded-full flex items-center justify-center">
          <Heart className="h-10 w-10 text-[var(--hive-text-inverse)]" />
        </div>
        <h3 className="text-2xl font-bold text-hive-text-primary mb-2">
          What Interests You?
        </h3>
        <p className="text-hive-text-secondary">
          Select at least 3 interests to help us find your communities
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(interestCategories).map(([category, interests]) => (
          <div key={category}>
            <h4 className="font-semibold text-hive-text-primary mb-3">{category}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interests.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-3 rounded-lg border transition-all text-sm ${
                    selectedInterests.includes(interest)
                      ? 'bg-hive-gold/20 border-hive-gold text-hive-gold'
                      : 'bg-hive-surface-elevated border-hive-border-subtle text-hive-text-secondary hover:border-hive-gold/50'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-hive-surface-elevated p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-hive-text-secondary">Selected interests:</span>
          <span className={`font-semibold ${isValid ? 'text-hive-gold' : 'text-hive-text-secondary'}`}>
            {selectedInterests.length}/3+ required
          </span>
        </div>
        {selectedInterests.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedInterests.map(interest => (
              <span
                key={interest}
                className="px-2 py-1 bg-hive-gold/20 text-hive-gold text-xs rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={() => onComplete({ interests: selectedInterests })}
        disabled={!isValid}
        className="w-full bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90"
      >
        Continue to Goals
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

const GoalsStep = ({ onComplete, initialData }: any) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialData?.goals || []);

  const campusGoals = [
    { id: 'academic_excellence', label: 'Academic Excellence', description: 'Maintain high GPA and excel in coursework' },
    { id: 'research', label: 'Research Opportunities', description: 'Get involved in faculty research projects' },
    { id: 'internships', label: 'Internships', description: 'Secure valuable work experience' },
    { id: 'leadership', label: 'Leadership Roles', description: 'Take on leadership positions in organizations' },
    { id: 'networking', label: 'Professional Networking', description: 'Build connections for career opportunities' },
    { id: 'social_life', label: 'Active Social Life', description: 'Make lasting friendships and memories' },
    { id: 'clubs', label: 'Club Involvement', description: 'Join and contribute to student organizations' },
    { id: 'fitness', label: 'Health & Fitness', description: 'Maintain physical and mental wellbeing' },
    { id: 'creativity', label: 'Creative Expression', description: 'Explore artistic and creative pursuits' },
    { id: 'entrepreneurship', label: 'Entrepreneurship', description: 'Start projects or business ventures' }
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const isValid = selectedGoals.length >= 2;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
          <Target className="h-10 w-10 text-[var(--hive-text-inverse)]" />
        </div>
        <h3 className="text-2xl font-bold text-hive-text-primary mb-2">
          What Are Your Campus Goals?
        </h3>
        <p className="text-hive-text-secondary">
          Select your top priorities to help us recommend relevant spaces and tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campusGoals.map(goal => (
          <button
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`p-4 rounded-lg border text-left transition-all ${
              selectedGoals.includes(goal.id)
                ? 'bg-hive-gold/20 border-hive-gold'
                : 'bg-hive-surface-elevated border-hive-border-subtle hover:border-hive-gold/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                selectedGoals.includes(goal.id)
                  ? 'border-hive-gold bg-hive-gold'
                  : 'border-hive-border-subtle'
              }`}>
                {selectedGoals.includes(goal.id) && (
                  <CheckCircle className="h-3 w-3 text-hive-obsidian" />
                )}
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${
                  selectedGoals.includes(goal.id) ? 'text-hive-gold' : 'text-hive-text-primary'
                }`}>
                  {goal.label}
                </h4>
                <p className="text-sm text-hive-text-secondary">
                  {goal.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-hive-surface-elevated p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-hive-text-secondary">Selected goals:</span>
          <span className={`font-semibold ${isValid ? 'text-hive-gold' : 'text-hive-text-secondary'}`}>
            {selectedGoals.length}/2+ required
          </span>
        </div>
      </div>

      <Button
        onClick={() => onComplete({ goals: selectedGoals })}
        disabled={!isValid}
        className="w-full bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90"
      >
        Complete Initialize Ritual
        <Sparkles className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export function RitualInitializeWorkflow({ 
  currentStep = 0, 
  onStepComplete,
  onRitualComplete,
  userProgress,
  className = '' 
}: InitializeRitualProps) {
  const [activeStep, setActiveStep] = useState(currentStep);
  const [stepData, setStepData] = useState<Record<string, any>>({});
  const [isComplete, setIsComplete] = useState(false);

  const steps: RitualStep[] = [
    {
      id: 'profile_basics',
      title: 'Profile Basics',
      description: 'Set up your basic profile information',
      icon: User,
      estimatedTime: 3,
      isRequired: true,
      component: ProfileBasicsStep
    },
    {
      id: 'interests',
      title: 'Select Interests',
      description: 'Choose your academic and social interests',
      icon: Heart,
      estimatedTime: 5,
      isRequired: true,
      component: InterestsStep
    },
    {
      id: 'campus_goals',
      title: 'Campus Goals',
      description: 'Define your objectives for campus life',
      icon: Target,
      estimatedTime: 4,
      isRequired: true,
      component: GoalsStep
    }
  ];

  const handleStepComplete = (data: any) => {
    const step = steps[activeStep];
    const newStepData = { ...stepData, [step.id]: data };
    setStepData(newStepData);
    
    onStepComplete?.(step.id, data);

    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setIsComplete(true);
      onRitualComplete?.();
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const totalEstimatedTime = steps.reduce((total, step) => total + step.estimatedTime, 0);
  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  if (isComplete) {
    return (
      <div className={`space-y-8 ${className}`}>
        <Card className="p-8 text-center bg-gradient-to-br from-hive-gold/10 to-green-500/10 border-hive-gold/30">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-hive-gold to-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-[var(--hive-text-inverse)]" />
          </div>
          
          <h2 className="text-3xl font-bold text-hive-text-primary mb-4">
            Initialize Ritual Complete!
          </h2>
          
          <p className="text-hive-text-secondary text-lg mb-6">
            Your HIVE profile is now set up and ready. Your interests and goals will help us 
            personalize your experience and connect you with relevant communities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-hive-surface-elevated rounded-lg">
              <Badge className="h-8 w-8 mx-auto mb-2 text-hive-gold" />
              <h3 className="font-semibold text-hive-text-primary">Profile Complete</h3>
              <p className="text-sm text-hive-text-secondary">Avatar Widget populated</p>
            </div>
            <div className="p-4 bg-hive-surface-elevated rounded-lg">
              <Heart className="h-8 w-8 mx-auto mb-2 text-hive-brand-secondary" />
              <h3 className="font-semibold text-hive-text-primary">Interests Saved</h3>
              <p className="text-sm text-hive-text-secondary">Personalization active</p>
            </div>
            <div className="p-4 bg-hive-surface-elevated rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-400" />
              <h3 className="font-semibold text-hive-text-primary">Goals Set</h3>
              <p className="text-sm text-hive-text-secondary">Recommendations ready</p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-hive-gold">
            <Users className="h-5 w-5" />
            <span className="font-medium">Ready for Week 2: Discover Communities</span>
          </div>
        </Card>
      </div>
    );
  }

  const CurrentStepComponent = steps[activeStep].component;

  return (
    <div className={`space-y-8 ${className}`}>
      <Card className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-hive-text-primary">
              Initialize Ritual
            </h2>
            <p className="text-hive-text-secondary">
              Week 1 • Build your foundation
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-hive-text-secondary text-sm">
              <Clock className="h-4 w-4" />
              <span>~{totalEstimatedTime} minutes total</span>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-hive-text-primary">
              Step {activeStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-hive-text-secondary">
              {Math.round(progressPercentage)}% complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-500' 
                    : isActive 
                    ? 'bg-hive-gold' 
                    : 'bg-hive-surface-elevated border border-hive-border-subtle'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-[var(--hive-text-inverse)]" />
                  ) : (
                    <Icon className={`h-5 w-5 ${
                      isActive ? 'text-hive-obsidian' : 'text-hive-text-secondary'
                    }`} />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    isCompleted ? 'bg-green-500' : 'bg-hive-border-subtle'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Current Step */}
      <Card className="p-8">
        <CurrentStepComponent
          onComplete={handleStepComplete}
          initialData={stepData[steps[activeStep].id]}
        />
        
        {/* Navigation */}
        {activeStep > 0 && (
          <div className="mt-6">
            <Button
              variant="secondary"
              onClick={handlePreviousStep}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Step
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}