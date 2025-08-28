'use client';

import React, { useState, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Use only working UI imports
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { HiveLogo } from '../HiveLogo';
import { cn } from '../lib/utils';

// Icons
import {
  ArrowLeft, ArrowRight, CheckCircle, Camera, Upload,
  User, AtSign, GraduationCap, Users, Building2, Code,
  BookOpen, Calendar, Target, Heart, Zap, Award,
  Sparkles, Crown, Trophy, Star, Rocket, Shield,
  Loader2, AlertCircle, X, Clock
} from 'lucide-react';

// =============================================================================
// COMPREHENSIVE ONBOARDING SYSTEM - SIMPLIFIED WORKING VERSION
// =============================================================================

export type OnboardingStep = 
  | 'welcome'        // Welcome with HIVE branding
  | 'user-type'      // Confirm user type (from auth)
  | 'profile'        // Name, handle, photo
  | 'academics'      // Major, year, academic level
  | 'interests'      // Academic interests and goals
  | 'spaces'         // Space discovery and joining
  | 'builder'        // Tool building assessment
  | 'legal'          // Terms, privacy, community guidelines
  | 'complete';      // Celebration and platform intro

// Onboarding Data Structure
export interface OnboardingData {
  // Step completion tracking
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  startedAt: Date;
  completedAt?: Date;
  onboardingDuration?: number; // ms

  // User info (from auth)
  email: string;
  userType: 'STUDENT' | 'FACULTY' | 'STAFF';
  universityId: string;
  campusId?: string;

  // Profile data
  name: string;
  handle: string;
  photoUrl?: string;
  bio?: string;

  // Academic data
  major?: string;
  majorId?: string;
  department?: string;
  classYear?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'phd';
  graduationYear?: string;
  academicLevel?: 'undergraduate' | 'graduate' | 'phd';

  // Preferences
  interests: string[];
  selectedSpaces: string[];
  builderExperience: 'beginner' | 'intermediate' | 'advanced';

  // Legal agreements
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
  agreedToCommunity: boolean;
}

// Onboarding Context
interface OnboardingContextType {
  state: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  isStepComplete: (step: OnboardingStep) => boolean;
  canProceed: () => boolean;
  setError: (error: string | null) => void;
  error: string | null;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

// Step sequence
const STEPS: OnboardingStep[] = [
  'welcome',
  'user-type', 
  'profile',
  'academics',
  'interests',
  'spaces',
  'builder',
  'legal',
  'complete'
];

// UB Academic Data
const UB_MAJORS = [
  { id: 'cs-bs', name: 'Computer Science', department: 'Engineering' },
  { id: 'bus-bs', name: 'Business Administration', department: 'Management' },
  { id: 'bio-bs', name: 'Biology', department: 'Arts and Sciences' },
  { id: 'me-bs', name: 'Mechanical Engineering', department: 'Engineering' },
  { id: 'psyc-bs', name: 'Psychology', department: 'Arts and Sciences' }
];

const INTERESTS = [
  { id: 'programming', name: 'Programming', description: 'Software development and coding' },
  { id: 'research', name: 'Research', description: 'Academic research and publications' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', description: 'Starting businesses' },
  { id: 'design', name: 'Design', description: 'UI/UX and graphic design' },
  { id: 'data-science', name: 'Data Science', description: 'Analytics and ML' },
  { id: 'leadership', name: 'Leadership', description: 'Team management' }
];

const SPACES = [
  {
    id: 'cs-study',
    name: 'CS Study Group',
    description: 'Collaborative study sessions for CS majors',
    memberCount: 247,
    tags: ['study', 'programming', 'exams']
  },
  {
    id: 'ub-entrepreneurs', 
    name: 'UB Entrepreneurs',
    description: 'Building the next generation of student startups',
    memberCount: 89,
    tags: ['startup', 'networking', 'innovation']
  }
];

// =============================================================================
// INDIVIDUAL STEP COMPONENTS
// =============================================================================

const WelcomeStep: React.FC = () => {
  const { nextStep } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 text-center"
    >
      <div className="space-y-4">
        <div className="relative mx-auto mb-6">
          <HiveLogo size="xl" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome to HIVE
        </h1>
        
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          The social platform where connections form around solving problems together
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            You're about to join a community of students who build tools, 
            share resources, and collaborate on real solutions to campus problems.
          </p>
        </div>

        <Button 
          onClick={nextStep}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          size="lg"
        >
          Let's Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const UserTypeStep: React.FC = () => {
  const { state, updateData, nextStep, prevStep } = useOnboarding();
  
  const userTypeOptions = [
    { 
      value: 'STUDENT' as const, 
      icon: GraduationCap, 
      title: 'Student', 
      description: 'Undergraduate or graduate student' 
    },
    { 
      value: 'FACULTY' as const, 
      icon: BookOpen, 
      title: 'Faculty', 
      description: 'Professor or instructor' 
    },
    { 
      value: 'STAFF' as const, 
      icon: Building2, 
      title: 'Staff', 
      description: 'University staff member' 
    }
  ];

  const handleSelection = (userType: 'STUDENT' | 'FACULTY' | 'STAFF') => {
    updateData({ userType });
    setTimeout(nextStep, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Confirm Your Role
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          We detected you're a {state.userType?.toLowerCase()} from your email
        </p>
      </div>

      <div className="space-y-4">
        {userTypeOptions.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={cn(
                "cursor-pointer transition-all duration-300 border-2",
                state.userType === option.value 
                  ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10" 
                  : "border-slate-200 dark:border-slate-700 hover:border-yellow-300"
              )}
              onClick={() => handleSelection(option.value)}
            >
              <CardContent className="p-6 flex items-center space-x-4">
                <div className={cn(
                  "p-3 rounded-full",
                  state.userType === option.value ? "bg-yellow-500/20" : "bg-slate-100 dark:bg-slate-800"
                )}>
                  <option.icon 
                    className={cn(
                      "h-6 w-6",
                      state.userType === option.value ? "text-yellow-600" : "text-slate-600 dark:text-slate-400"
                    )}
                  />
                </div>
                <div className="flex-1">
                  <h3 className={cn(
                    "font-semibold",
                    state.userType === option.value ? "text-yellow-600" : "text-slate-900 dark:text-white"
                  )}>
                    {option.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {option.description}
                  </p>
                </div>
                {state.userType === option.value && (
                  <CheckCircle className="h-5 w-5 text-yellow-500" />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          disabled={!state.userType}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const ProfileStep: React.FC = () => {
  const { state, updateData, nextStep, prevStep, setError, error } = useOnboarding();
  const [isUploading, setIsUploading] = useState(false);

  const handleNameChange = (value: string) => {
    updateData({ name: value });
    setError(null);
  };

  const handleHandleChange = (value: string) => {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    updateData({ handle: sanitized });
    setError(null);
  };

  const canProceed = state.name.length >= 2 && state.handle.length >= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Create Your Profile
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          This is how you'll appear to your campus community
        </p>
      </div>

      {/* Photo Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <div className={cn(
            "w-24 h-24 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600",
            "flex items-center justify-center bg-slate-50 dark:bg-slate-800 cursor-pointer",
            "hover:border-yellow-500 transition-colors group"
          )}>
            {state.photoUrl ? (
              <img 
                src={state.photoUrl} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="text-center">
                {isUploading ? (
                  <Loader2 className="h-6 w-6 text-slate-400 group-hover:text-yellow-500 animate-spin" />
                ) : (
                  <Camera className="h-6 w-6 text-slate-400 group-hover:text-yellow-500 transition-colors" />
                )}
                <p className="text-xs text-slate-400 mt-1">
                  {isUploading ? 'Uploading...' : 'Add Photo'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={state.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Handle <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              @
            </span>
            <Input
              type="text"
              value={state.handle}
              onChange={(e) => handleHandleChange(e.target.value)}
              placeholder="username"
              className="pl-7"
            />
          </div>
          <p className="text-xs text-slate-500">
            This will be your unique identifier on HIVE
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          disabled={!canProceed}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const AcademicsStep: React.FC = () => {
  const { state, updateData, nextStep, prevStep } = useOnboarding();
  const [selectedMajor, setSelectedMajor] = useState(state.majorId || '');
  const [classYear, setClassYear] = useState(state.classYear || '');

  const handleMajorChange = (value: string) => {
    setSelectedMajor(value);
    const majorData = UB_MAJORS.find(m => m.id === value);
    updateData({ 
      majorId: value,
      major: majorData?.name,
      department: majorData?.department
    });
  };

  const canProceed = selectedMajor && classYear;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Academic Information
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Help us connect you with relevant academic communities
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Major/Program <span className="text-red-500">*</span>
          </label>
          <select 
            value={selectedMajor}
            onChange={(e) => handleMajorChange(e.target.value)}
            className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-yellow-500 text-slate-900 dark:text-white"
          >
            <option value="">Select your major</option>
            {UB_MAJORS.map(major => (
              <option key={major.id} value={major.id}>{major.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-white">
            Class Year <span className="text-red-500">*</span>
          </label>
          <select
            value={classYear}
            onChange={(e) => {
              setClassYear(e.target.value);
              updateData({ classYear: e.target.value as any });
            }}
            className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-yellow-500 text-slate-900 dark:text-white"
          >
            <option value="">Select your class year</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="graduate">Graduate Student</option>
            <option value="phd">PhD Student</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          disabled={!canProceed}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const InterestsStep: React.FC = () => {
  const { state, updateData, nextStep, prevStep } = useOnboarding();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(state.interests || []);

  const handleInterestToggle = (interestId: string) => {
    const newInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter(id => id !== interestId)
      : [...selectedInterests, interestId];
    
    setSelectedInterests(newInterests);
    updateData({ interests: newInterests });
  };

  const canProceed = selectedInterests.length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Your Interests
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Select at least 2 interests to help us recommend relevant spaces
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {INTERESTS.map((interest) => (
          <Card
            key={interest.id}
            className={cn(
              "cursor-pointer transition-all duration-300 border-2 p-4 text-center",
              selectedInterests.includes(interest.id)
                ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10"
                : "border-slate-200 dark:border-slate-700 hover:border-yellow-300"
            )}
            onClick={() => handleInterestToggle(interest.id)}
          >
            <div className="space-y-2">
              <h3 className={cn(
                "font-semibold text-sm",
                selectedInterests.includes(interest.id) ? "text-yellow-600" : "text-slate-900 dark:text-white"
              )}>
                {interest.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {interest.description}
              </p>
              {selectedInterests.includes(interest.id) && (
                <CheckCircle className="h-4 w-4 text-yellow-500 mx-auto" />
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Selected: {selectedInterests.length} interests
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          disabled={!canProceed}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const SpacesStep: React.FC = () => {
  const { state, updateData, nextStep, prevStep } = useOnboarding();
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(state.selectedSpaces || []);

  const handleSpaceToggle = (spaceId: string) => {
    const newSpaces = selectedSpaces.includes(spaceId)
      ? selectedSpaces.filter(id => id !== spaceId)
      : [...selectedSpaces, spaceId];
    
    setSelectedSpaces(newSpaces);
    updateData({ selectedSpaces: newSpaces });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Join Your First Spaces
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Choose communities you'd like to be part of (you can join more later)
        </p>
      </div>

      <div className="space-y-4">
        {SPACES.map((space) => (
          <Card 
            key={space.id}
            className={cn(
              "cursor-pointer transition-all duration-300 border-2",
              selectedSpaces.includes(space.id)
                ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10"
                : "border-slate-200 dark:border-slate-700 hover:border-yellow-300"
            )}
            onClick={() => handleSpaceToggle(space.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className={cn(
                      "font-bold text-lg",
                      selectedSpaces.includes(space.id) ? "text-yellow-600" : "text-slate-900 dark:text-white"
                    )}>
                      {space.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {space.memberCount} members
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {space.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {space.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {selectedSpaces.includes(space.id) && (
                  <CheckCircle className="h-5 w-5 text-yellow-500 ml-4" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const BuilderStep: React.FC = () => {
  const { state, updateData, nextStep, prevStep } = useOnboarding();
  const [experience, setExperience] = useState(state.builderExperience || 'beginner');

  const experienceOptions = [
    {
      value: 'beginner',
      title: 'New to Building',
      description: "I'm excited to learn how to create tools and solutions",
      icon: Sparkles
    },
    {
      value: 'intermediate',
      title: 'Some Experience',
      description: "I've built a few things and want to do more",
      icon: Code
    },
    {
      value: 'advanced',
      title: 'Experienced Builder',
      description: "I build tools regularly and love helping others",
      icon: Rocket
    }
  ];

  const handleExperienceChange = (value: 'beginner' | 'intermediate' | 'advanced') => {
    setExperience(value);
    updateData({ builderExperience: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Your Building Experience
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          HIVE is about creating tools that solve real problems. What's your experience level?
        </p>
      </div>

      <div className="space-y-4">
        {experienceOptions.map((option) => (
          <Card 
            key={option.value}
            className={cn(
              "cursor-pointer transition-all duration-300 border-2",
              experience === option.value
                ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10"
                : "border-slate-200 dark:border-slate-700 hover:border-yellow-300"
            )}
            onClick={() => handleExperienceChange(option.value)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "p-3 rounded-full",
                  experience === option.value ? "bg-yellow-500/20" : "bg-slate-100 dark:bg-slate-800"
                )}>
                  <option.icon 
                    className={cn(
                      "h-6 w-6",
                      experience === option.value ? "text-yellow-600" : "text-slate-600 dark:text-slate-400"
                    )}
                  />
                </div>
                <div className="flex-1">
                  <h3 className={cn(
                    "font-semibold",
                    experience === option.value ? "text-yellow-600" : "text-slate-900 dark:text-white"
                  )}>
                    {option.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {option.description}
                  </p>
                </div>
                {experience === option.value && (
                  <CheckCircle className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const LegalStep: React.FC = () => {
  const { state, updateData, nextStep, prevStep, setError, error } = useOnboarding();
  const [agreements, setAgreements] = useState({
    terms: state.agreedToTerms || false,
    privacy: state.agreedToPrivacy || false,
    community: state.agreedToCommunity || false
  });

  const handleAgreementChange = (type: keyof typeof agreements, value: boolean) => {
    const newAgreements = { ...agreements, [type]: value };
    setAgreements(newAgreements);
    updateData({
      agreedToTerms: newAgreements.terms,
      agreedToPrivacy: newAgreements.privacy,
      agreedToCommunity: newAgreements.community
    });
    setError(null);
  };

  const canProceed = agreements.terms && agreements.privacy && agreements.community;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Legal Agreements
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Please review and accept our terms to complete your registration
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={agreements.terms}
              onChange={(e) => handleAgreementChange('terms', e.target.checked)}
              className="mt-1 h-4 w-4 text-yellow-500 focus:ring-yellow-500/20 border-slate-300 dark:border-slate-600 rounded"
            />
            <div className="flex-1">
              <p className="text-sm text-slate-900 dark:text-white">
                I agree to the <a href="/legal/terms" className="text-yellow-600 hover:underline">Terms of Service</a>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={(e) => handleAgreementChange('privacy', e.target.checked)}
              className="mt-1 h-4 w-4 text-yellow-500 focus:ring-yellow-500/20 border-slate-300 dark:border-slate-600 rounded"
            />
            <div className="flex-1">
              <p className="text-sm text-slate-900 dark:text-white">
                I agree to the <a href="/legal/privacy" className="text-yellow-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={agreements.community}
              onChange={(e) => handleAgreementChange('community', e.target.checked)}
              className="mt-1 h-4 w-4 text-yellow-500 focus:ring-yellow-500/20 border-slate-300 dark:border-slate-600 rounded"
            />
            <div className="flex-1">
              <p className="text-sm text-slate-900 dark:text-white">
                I agree to follow the <a href="/legal/community-guidelines" className="text-yellow-600 hover:underline">Community Guidelines</a>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            By creating an account, you're joining a community focused on solving real problems together. 
            We're committed to maintaining a safe, productive environment for all University at Buffalo students.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={nextStep}
          disabled={!canProceed}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Complete Setup
          <CheckCircle className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const CompleteStep: React.FC = () => {
  const { state } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 text-center"
    >
      <div className="space-y-6">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome to HIVE, {state.name.split(' ')[0]}! 🎉
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Your profile is set up and you're ready to start building connections and solving problems with your campus community.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <Users className="h-6 w-6 text-yellow-500 mb-2" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Explore Spaces</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Join communities around your interests and major
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <Code className="h-6 w-6 text-yellow-500 mb-2" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Build Tools</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Create solutions that help your campus community
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <Calendar className="h-6 w-6 text-yellow-500 mb-2" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Coordinate</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Organize events and collaborate with others
            </p>
          </div>
        </div>

        <Button 
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Enter HIVE
          <Rocket className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

// =============================================================================
// MAIN WIZARD COMPONENT
// =============================================================================

interface OnboardingProviderProps {
  children: React.ReactNode;
  initialData?: Partial<OnboardingData>;
  userType?: 'STUDENT' | 'FACULTY' | 'STAFF';
  email?: string;
  mockMode?: boolean;
}

const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children,
  initialData = {},
  userType = 'STUDENT',
  email = 'student@buffalo.edu',
  mockMode = false
}) => {
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<OnboardingData>({
    currentStep: 'welcome',
    completedSteps: [],
    startedAt: new Date(),
    email,
    userType: userType as 'STUDENT' | 'FACULTY' | 'STAFF',
    universityId: 'ub-buffalo',
    campusId: 'north-campus',
    name: '',
    handle: '',
    interests: [],
    selectedSpaces: [],
    builderExperience: 'beginner',
    agreedToTerms: false,
    agreedToPrivacy: false,
    agreedToCommunity: false,
    ...initialData
  });

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(state.currentStep);
    if (currentIndex < STEPS.length - 1) {
      const newStep = STEPS[currentIndex + 1];
      setState(prev => ({
        ...prev,
        currentStep: newStep,
        completedSteps: [...prev.completedSteps.filter(s => s !== prev.currentStep), prev.currentStep]
      }));
    }
  }, [state.currentStep]);

  const prevStep = useCallback(() => {
    const currentIndex = STEPS.indexOf(state.currentStep);
    if (currentIndex > 0) {
      const newStep = STEPS[currentIndex - 1];
      setState(prev => ({ ...prev, currentStep: newStep }));
    }
  }, [state.currentStep]);

  const goToStep = useCallback((step: OnboardingStep) => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const isStepComplete = useCallback((step: OnboardingStep) => {
    return state.completedSteps.includes(step);
  }, [state.completedSteps]);

  const canProceed = useCallback(() => {
    return true;
  }, [state]);

  const contextValue: OnboardingContextType = {
    state,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    isStepComplete,
    canProceed,
    setError,
    error
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

export interface ComprehensiveOnboardingWizardProps {
  userType?: 'STUDENT' | 'FACULTY' | 'STAFF';
  email?: string;
  initialData?: Partial<OnboardingData>;
  mockMode?: boolean;
  onComplete?: (data: OnboardingData) => void;
  onStepChange?: (step: OnboardingStep, progress: number) => void;
}

export const ComprehensiveOnboardingWizard: React.FC<ComprehensiveOnboardingWizardProps> = ({
  userType = 'STUDENT',
  email = 'student@buffalo.edu',
  initialData = {},
  mockMode = false,
  onComplete,
  onStepChange
}) => {
  return (
    <OnboardingProvider
      userType={userType}
      email={email}
      initialData={initialData}
      mockMode={mockMode}
    >
      <OnboardingWizardContent onComplete={onComplete} onStepChange={onStepChange} />
    </OnboardingProvider>
  );
};

const OnboardingWizardContent: React.FC<{
  onComplete?: (data: OnboardingData) => void;
  onStepChange?: (step: OnboardingStep, progress: number) => void;
}> = ({ onComplete, onStepChange }) => {
  const { state } = useOnboarding();

  // Notify parent of step changes
  React.useEffect(() => {
    const progress = ((STEPS.indexOf(state.currentStep) + 1) / STEPS.length) * 100;
    onStepChange?.(state.currentStep, progress);
  }, [state.currentStep, onStepChange]);

  const renderStep = () => {
    switch (state.currentStep) {
      case 'welcome':
        return <WelcomeStep />;
      case 'user-type':
        return <UserTypeStep />;
      case 'profile':
        return <ProfileStep />;
      case 'academics':
        return <AcademicsStep />;
      case 'interests':
        return <InterestsStep />;
      case 'spaces':
        return <SpacesStep />;
      case 'builder':
        return <BuilderStep />;
      case 'legal':
        return <LegalStep />;
      case 'complete':
        return <CompleteStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden relative flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-yellow-400/15 to-red-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-green-400/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Main Container */}
      <Card className="relative w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-2xl rounded-3xl overflow-hidden z-10">
        {/* Header */}
        <div className="p-8 pb-6 text-center border-b border-slate-200 dark:border-slate-700">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6"
          >
            <HiveLogo size="lg" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-2"
          >
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Welcome to HIVE
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Set up your profile to connect with your campus community
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Step {STEPS.indexOf(state.currentStep) + 1} of {STEPS.length}
            </span>
            <span className="text-sm font-medium text-yellow-600">
              {Math.round(((STEPS.indexOf(state.currentStep) + 1) / STEPS.length) * 100)}%
            </span>
          </div>
          <Progress 
            value={((STEPS.indexOf(state.currentStep) + 1) / STEPS.length) * 100} 
            className="h-2"
          />
        </div>

        {/* Step Content */}
        <div className="p-8 pt-6">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};

export default ComprehensiveOnboardingWizard;