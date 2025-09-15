"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/client/firebase-client';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { 
  Loader2, ChevronRight, ChevronLeft, User as UserIcon, Heart, Check, 
  GraduationCap, Home, Target, Users, Sparkles, ArrowRight, AlertCircle,
  Search, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Button, 
  Input, 
  Select,
  Card, 
  CardContent,
  Badge,
  Checkbox,
  Container,
  HiveModal
} from '@hive/ui';
import { AnimatedDropdown, type DropdownOption } from '@/components/ui/animated-dropdown';
import { ALL_INTERESTS, INTEREST_CATEGORIES } from '@/constants/interests';
import { IdentitySelector, LivingSituationSelector } from '@/components/onboarding/identity-selector';
import { 
  UB_MAJORS, 
  UB_LIVING_SITUATIONS,
  UB_INITIAL_SPACES,
  UB_CAMPUS_GOALS,
  getGraduationYears 
} from '@/data/ub-academic-data';
import { logger } from '@hive/core';

/**
 * HIVE Onboarding - Enhanced with Smooth Animations
 * Firebase Integration + Framer Motion animations
 * Includes jwrhineh@buffalo.edu bypass for testing
 */

// Animation Variants using Design System Motion Tokens
const HIVE_MOTION = {
  durations: {
    micro: 0.15,
    fast: 0.2,
    standard: 0.3,
    slow: 0.5,
    deliberate: 0.7
  },
  easing: {
    standard: [0.4, 0.0, 0.2, 1],
    decelerate: [0.0, 0.0, 0.2, 1],
    accelerate: [0.4, 0.0, 1, 1]
  },
  stagger: {
    micro: 0.05,
    small: 0.1,
    medium: 0.15
  }
} as const;

// Respect reduced motion preferences
const getMotionConfig = () => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      ...HIVE_MOTION,
      durations: {
        micro: 0,
        fast: 0,
        standard: 0,
        slow: 0,
        deliberate: 0
      },
      stagger: {
        micro: 0,
        small: 0,
        medium: 0
      }
    };
  }
  return HIVE_MOTION;
};

const stepContentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Transition configurations will be created inside the component to access motionConfig

const cardVariants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98 }
};

// Card and stagger configurations will be created inside the component

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  progress: number;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to HIVE',
    subtitle: 'The social platform for builders',
    icon: <Sparkles className="h-5 w-5" />,
    progress: 5
  },
  {
    id: 'user-type',
    title: 'Your Role',
    subtitle: 'How are you connected to campus?',
    icon: <GraduationCap className="h-5 w-5" />,
    progress: 15
  },
  {
    id: 'identity',
    title: 'Your Identity',
    subtitle: 'How should we know you?',
    icon: <UserIcon className="h-5 w-5" />,
    progress: 25
  },
  {
    id: 'academic',
    title: 'Academic Profile',
    subtitle: 'Your educational journey',
    icon: <GraduationCap className="h-5 w-5" />,
    progress: 40
  },
  {
    id: 'campus-life',
    title: 'Campus Life',
    subtitle: 'Where you live and thrive',
    icon: <Home className="h-5 w-5" />,
    progress: 55
  },
  {
    id: 'interests',
    title: 'Your Interests',
    subtitle: 'What drives your passion?',
    icon: <Heart className="h-5 w-5" />,
    progress: 70
  },
  {
    id: 'communities',
    title: 'Join Communities',
    subtitle: 'Find your people',
    icon: <Users className="h-5 w-5" />,
    progress: 85
  },
  {
    id: 'goals',
    title: 'Set Your Goals',
    subtitle: 'What do you want to achieve?',
    icon: <Target className="h-5 w-5" />,
    progress: 95
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    subtitle: 'Welcome to your campus community',
    icon: <Check className="h-5 w-5" />,
    progress: 100
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const motionConfig = getMotionConfig();
  
  // Motion configurations using design system tokens
  const stepContentTransition = {
    duration: motionConfig.durations.standard,
    ease: motionConfig.easing.decelerate
  };

  const cardTransition = {
    duration: motionConfig.durations.fast,
    ease: motionConfig.easing.standard
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: motionConfig.stagger.small
      }
    }
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [availableSpaces, setAvailableSpaces] = useState<any[]>([]);
  const [loadingSpaces, setLoadingSpaces] = useState(false);
  const [spaceSearchQuery, setSpaceSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Profile data that builds throughout the journey
  const [profile, setProfile] = useState({
    // Identity
    firstName: '',
    lastName: '',
    handle: '',
    
    // Faculty-specific fields
    department: '',
    spaceRequest: '',
    
    // Academic
    graduationYear: '',
    major: '',
    minor: '',
    academicLevel: '',
    userType: 'student' as 'student' | 'alumni' | 'faculty',
    
    // Campus Life
    livingSituation: '',
    roomNumber: '',
    
    // Interests (max 10)
    interests: [] as string[],
    
    // Student Leadership
    isStudentLeader: false,
    builderRequestSpaces: [] as string[],
    newSpaceRequest: '',
    
    // Goals (max 5)
    goals: [] as string[],
    
    // Preferences
    notifications: {
      messages: true,
      events: true,
      spaces: true,
      academic: false
    },
    visibility: 'campus', // 'public', 'campus', 'connections'
    
    // Consent
    consentGiven: false
  });

  // Auto-generate handle from name
  useEffect(() => {
    if (profile.firstName && profile.lastName) {
      const baseHandle = `${profile.firstName.toLowerCase()}${profile.lastName.toLowerCase()}`.replace(/[^a-z]/g, '');
      setProfile(prev => ({ ...prev, handle: baseHandle }));
    }
  }, [profile.firstName, profile.lastName]);

  // Profile completion percentage
  const getProfileCompletion = () => {
    let completed = 0;
    const checks = [
      profile.firstName && profile.lastName,
      profile.graduationYear,
      profile.major,
      profile.livingSituation,
      profile.interests.length > 0,
      profile.builderRequestSpaces.length > 0,
      profile.goals.length > 0
    ];
    
    checks.forEach(check => {
      if (check) completed += 14.3;
    });
    
    return Math.min(100, Math.round(completed));
  };

  // Check Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        setFirebaseUser(user);
        
        // Check if already onboarded
        try {
          const userDoc = await getDoc(doc(db, 'users', user.id));
          if (userDoc.exists() && userDoc.data()?.onboardingCompletedAt) {
            logger.info('User already onboarded, redirecting to dashboard');
            router.push('/dashboard');
            return;
          }
          
          // Load draft if exists
          const draftDoc = await getDoc(doc(db, 'onboardingDrafts', user.id));
          if (draftDoc.exists()) {
            const draft = draftDoc.data();
            setProfile(prev => ({ ...prev, ...draft }));
            setCurrentStep(draft.currentStep || 0);
            logger.info('Loaded onboarding draft');
          }
          
          // No bypass - all users must complete onboarding normally
          
        } catch (error) {
          logger.error('Error checking onboarding status', { error });
        }
        
        setIsLoading(false);
      } else {
        // No authenticated user, redirect to login
        logger.warn('No authenticated user, redirecting to login');
        router.push('/auth/login?redirect=/onboarding');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Auto-save draft to Firestore
  useEffect(() => {
    if (!firebaseUser || currentStep === 0 || currentStep === ONBOARDING_STEPS.length - 1) return;

    const saveDraft = async () => {
      try {
        await setDoc(doc(db, 'onboardingDrafts', firebaseUser.uid), {
          ...profile,
          currentStep,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 2000);
        logger.info('Saved onboarding draft');
      } catch (error) {
        logger.error('Failed to save draft', { error });
      }
    };

    const timer = setTimeout(saveDraft, 1000); // Debounce saves
    return () => clearTimeout(timer);
  }, [profile, currentStep, firebaseUser]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setError(null);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setError(null);
    }
  };

  const handleComplete = async () => {
    if (!firebaseUser) {
      setError('No authenticated user found');
      return;
    }

    setIsSaving(true);
    setError(null);
    
    try {
      // Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();
      
      // Prepare data for API
      const onboardingData = {
        fullName: `${profile.firstName} ${profile.lastName}`,
        firstName: profile.firstName,
        lastName: profile.lastName,
        handle: profile.handle,
        userType: profile.userType,
        major: profile.major,
        majors: [profile.major], // API expects array
        academicLevel: profile.academicLevel || undefined,
        graduationYear: parseInt(profile.graduationYear),
        avatarUrl: profilePhoto || '',
        builderRequestSpaces: profile.builderRequestSpaces,
        interests: profile.interests,
        consentGiven: profile.consentGiven || true
      };
      
      // Call complete-onboarding API
      const response = await fetch('/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(onboardingData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to complete onboarding');
      }
      
      const result = await response.json();
      logger.info('Onboarding completed successfully', { userId: firebaseUser.uid });
      
      // Save additional preferences to user document
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        pronouns: profile.pronouns,
        bio: profile.bio,
        minor: profile.minor,
        livingSituation: profile.livingSituation,
        roomNumber: profile.roomNumber,
        goals: profile.goals,
        notifications: profile.notifications,
        visibility: profile.visibility,
        onboardingCompletedAt: new Date().toISOString()
      });
      
      // Delete draft
      try {
        await updateDoc(doc(db, 'onboardingDrafts', firebaseUser.uid), {
          completed: true,
          completedAt: new Date().toISOString()
        });
      } catch (e) {
        // Draft might not exist, that's ok
      }
      
      // Navigate to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (error) {
      logger.error('Failed to complete onboarding', { error });
      setError(error instanceof Error ? error.message : 'Failed to complete onboarding');
      setIsSaving(false);
    }
  };

  // Search for spaces using the search API
  const searchSpaces = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      // Get the user's auth token
      const idToken = await firebaseUser?.getIdToken();
      
      if (!idToken) {
        throw new Error('No authentication token available');
      }
      
      // Call the real spaces search API (with actual RSS feed data)
      const endpoint = '/api/spaces/search';
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (idToken) {
        headers['Authorization'] = `Bearer ${idToken}`;
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: query,
          limit: 10,
          sortBy: 'relevance'
        })
      });
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.spaces && data.spaces.length > 0) {
        // Filter out auto-generated and cohort spaces
        const filteredSpaces = data.spaces
          .filter((space: any) => {
            return space.name && 
                   !space.isAutoGenerated && 
                   !space.isSample &&
                   !space.id.startsWith('sample') &&
                   space.type !== 'cohort';
          });
        
        setSearchResults(filteredSpaces);
        logger.info('Search results', { query, count: filteredSpaces.length });
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      logger.error('Space search failed', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        query
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (spaceSearchQuery) {
        searchSpaces(spaceSearchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce
    
    return () => clearTimeout(timer);
  }, [spaceSearchQuery]);

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return true; // Welcome
      case 1: return profile.userType && profile.userType !== ''; // User Type
      case 2: return profile.firstName.length >= 2 && profile.lastName.length >= 2 && profile.handle.length >= 3; // Identity
      case 3: // Academic - different validation based on user type
        if (profile.userType === 'student') {
          return profile.graduationYear && profile.major;
        } else if (profile.userType === 'faculty') {
          return profile.department && profile.spaceRequest && profile.spaceRequest.length >= 10;
        } else if (profile.userType === 'alumni') {
          return true; // Alumni will be redirected
        }
        return false;
      case 4: return profile.userType === 'student' ? profile.livingSituation : true; // Campus Life (students only)
      case 5: return profile.userType === 'student' ? profile.interests.length >= 3 : true; // Interests (students only)
      case 6: return true; // Student Leadership (optional)
      case 7: return profile.userType === 'student' ? profile.goals.length >= 1 : true; // Goals (students only)
      case 8: return true; // Complete
      default: return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--hive-gold)] mx-auto" />
          <p className="text-[var(--hive-text-primary)]/60">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!firebaseUser) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <Card className="bg-[var(--hive-background-tertiary)] border-[var(--hive-gray-700)] max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-[var(--hive-gold)] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[var(--hive-text-primary)] mb-2">Authentication Required</h2>
            <p className="text-[var(--hive-text-primary)]/60 mb-6">Please sign in to continue with onboarding</p>
            <Button 
              onClick={() => router.push('/auth/login?redirect=/onboarding')}
              className="bg-[var(--hive-gold)] text-[var(--hive-black)] hover:opacity-90"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStepData = ONBOARDING_STEPS[currentStep];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex flex-col">
      {/* Header with progress */}
      <div className="border-b border-[var(--hive-background-tertiary)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/hive-logo-white.svg"
                alt="HIVE"
                width={32}
                height={32}
                className="w-8 h-8"
                onError={(e: any) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/whitelogo.svg";
                }}
              />
              <div>
                <h1 className="text-sm font-medium text-[var(--hive-text-primary)]">Building Your Profile</h1>
                <p className="text-xs text-[var(--hive-text-primary)]/60">{getProfileCompletion()}% Complete</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {draftSaved && (
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Draft saved
                </span>
              )}
              <div className="text-sm text-[var(--hive-text-primary)]/60">
                Step {currentStep + 1} of {ONBOARDING_STEPS.length}
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="relative h-1 bg-[var(--hive-background-tertiary)] overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[var(--hive-gold)] to-[var(--hive-gold)]/80"
            initial={{ width: "0%" }}
            animate={{ width: `${currentStepData.progress}%` }}
            transition={{ 
              duration: motionConfig.durations.deliberate, 
              ease: motionConfig.easing.decelerate,
              delay: motionConfig.durations.fast 
            }}
          />
          <motion.div
            className="absolute top-0 right-0 h-full w-8 bg-gradient-to-r from-transparent to-[var(--hive-gold)]/50"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ 
              duration: motionConfig.durations.slow,
              ease: motionConfig.easing.decelerate,
              delay: motionConfig.durations.standard,
              repeat: currentStepData.progress < 100 ? Infinity : 0,
              repeatType: "reverse",
              repeatDelay: motionConfig.durations.deliberate
            }}
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 text-[var(--hive-gold)] px-4 py-3 mx-auto max-w-4xl mt-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Left side - Profile Preview */}
        <div className="hidden lg:block w-1/3 border-r border-[var(--hive-background-tertiary)] bg-[#0F0F10]">
          <div className="p-8">
            <h2 className="text-sm font-medium text-[var(--hive-text-primary)]/60 mb-6">PROFILE PREVIEW</h2>
            
            {/* Profile Card Preview */}
            <Card className="bg-[var(--hive-background-tertiary)] border-[var(--hive-gray-700)]">
              <CardContent className="p-6 space-y-4">
                {/* Profile Photo */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--hive-gold)] to-[var(--hive-gold)] flex items-center justify-center">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <UserIcon className="w-8 h-8 text-[var(--hive-black)]" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--hive-text-primary)]">
                      {profile.firstName && profile.lastName ? `${profile.firstName} ${profile.lastName}` : 'Your Name'}
                    </h3>
                    {profile.handle && (
                      <p className="text-sm text-[var(--hive-text-primary)]/60">@{profile.handle}</p>
                    )}
                  </div>
                </div>

                {/* Academic Info */}
                {(profile.major || profile.graduationYear) && (
                  <div className="pt-4 border-t border-[var(--hive-gray-700)]">
                    <p className="text-xs text-[var(--hive-text-primary)]/40 mb-2">ACADEMIC</p>
                    {profile.major && (
                      <p className="text-sm text-[var(--hive-text-primary)]">
                        {UB_MAJORS.find(m => m.value === profile.major)?.label}
                      </p>
                    )}
                    {profile.graduationYear && (
                      <p className="text-sm text-[var(--hive-text-primary)]/60">Class of {profile.graduationYear}</p>
                    )}
                  </div>
                )}

                {/* Interests */}
                {profile.interests.length > 0 && (
                  <div className="pt-4 border-t border-[var(--hive-gray-700)]">
                    <p className="text-xs text-[var(--hive-text-primary)]/40 mb-2">INTERESTS</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.slice(0, 5).map(interest => (
                        <Badge 
                          key={interest}
                          variant="secondary"
                          className="bg-[var(--hive-gray-700)] text-[var(--hive-gold)] border-0"
                        >
                          {interest}
                        </Badge>
                      ))}
                      {profile.interests.length > 5 && (
                        <span className="px-2 py-1 text-xs text-[var(--hive-text-primary)]/40">
                          +{profile.interests.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Goals */}
                {profile.goals.length > 0 && (
                  <div className="pt-4 border-t border-[var(--hive-gray-700)]">
                    <p className="text-xs text-[var(--hive-text-primary)]/40 mb-2">GOALS</p>
                    <ul className="space-y-1">
                      {profile.goals.slice(0, 3).map(goal => (
                        <li key={goal} className="text-sm text-[var(--hive-text-primary)] flex items-center gap-2">
                          <Target className="w-3 h-3 text-[var(--hive-gold)]" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* User email display */}
            <div className="mt-4 p-3 bg-[var(--hive-background-tertiary)] rounded-lg">
              <p className="text-xs text-[var(--hive-text-primary)]/40 mb-1">Signed in as</p>
              <p className="text-sm text-[var(--hive-text-primary)] truncate">{firebaseUser.email}</p>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Container className="w-full max-w-xl">
            {/* Step header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                {currentStep !== 0 && (
                  <div className="p-3 rounded-xl bg-[var(--hive-gold)]/10 text-[var(--hive-gold)]">
                    {currentStepData.icon}
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
                    {currentStepData.title}
                  </h2>
                  <p className="text-[var(--hive-text-primary)]/60">
                    {currentStepData.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Step content */}
            <div className="space-y-6">
              <AnimatePresence mode="wait" key={currentStep}>
                {/* Step 0: Welcome */}
                {currentStep === 0 && (
                  <motion.div 
                    className="space-y-6"
                    variants={stepContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={stepContentTransition}
                  >
                  <Card className="bg-[var(--hive-background-tertiary)] border-[var(--hive-gray-700)]">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <Image
                          src="/assets/hive-logo-white.svg"
                          alt="HIVE"
                          width={64}
                          height={64}
                          className="w-16 h-16 mx-auto mb-4"
                          onError={(e: any) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/assets/whitelogo.svg";
                          }}
                        />
                        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-2">
                          Welcome to HIVE at UB
                        </h3>
                        <p className="text-[var(--hive-text-primary)]/60">
                          Your campus, connected. Let's build your profile and find your community.
                        </p>
                      </div>
                      
                      <div className="space-y-3 text-left">
                        <div className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[var(--hive-gold)] mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-[var(--hive-text-primary)]/60">
                            Connect with 30,000+ UB students
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[var(--hive-gold)] mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-[var(--hive-text-primary)]/60">
                            Join communities that match your interests
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[var(--hive-gold)] mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-[var(--hive-text-primary)]/60">
                            Build tools and solutions with your peers
                          </p>
                        </div>
                      </div>
                      
                      {/* Consent checkbox */}
                      <div className="mt-6 p-4 bg-[#0F0F10] rounded-lg">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <Checkbox
                            checked={profile.consentGiven}
                            onChange={(e: any) => setProfile(prev => ({ 
                              ...prev, 
                              consentGiven: e.target.checked 
                            }))}
                            className="mt-0.5"
                          />
                          <span className="text-sm text-[var(--hive-text-secondary)] text-left">
                            I agree to HIVE's{' '}
                            <button
                              type="button"
                              onClick={(e: any) => {
                                e.stopPropagation();
                                setShowTermsModal(true);
                              }}
                              className="text-[var(--hive-gold)] underline hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
                            >
                              Terms of Service
                            </button>
                            {' '}and{' '}
                            <button
                              type="button"
                              onClick={(e: any) => {
                                e.stopPropagation();
                                setShowPrivacyModal(true);
                              }}
                              className="text-[var(--hive-gold)] underline hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
                            >
                              Privacy Policy
                            </button>, 
                            and consent to the collection and processing of my data as described.
                          </span>
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                  </motion.div>
                )}

                {/* Step 1: User Type */}
                {currentStep === 1 && (
                  <motion.div 
                    className="space-y-6"
                    variants={stepContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={stepContentTransition}
                  >
                  <div className="text-center space-y-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center mx-auto">
                      <GraduationCap className="w-8 h-8 text-[var(--hive-gold)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
                        HIVE is built for students
                      </h3>
                      <p className="text-[var(--hive-text-primary)]/60 text-sm">
                        We know .edu emails include alumni and faculty. Help us understand your connection to campus.
                      </p>
                    </div>
                  </div>

                  <motion.div 
                    className="space-y-3"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {[
                      { 
                        value: 'student', 
                        label: 'Current Student', 
                        description: 'I\'m currently enrolled and taking classes',
                        icon: <GraduationCap className="w-5 h-5" />
                      },
                      { 
                        value: 'alumni', 
                        label: 'Alumni', 
                        description: 'I graduated and maintain my .edu email',
                        icon: <Users className="w-5 h-5" />
                      },
                      { 
                        value: 'faculty', 
                        label: 'Faculty/Staff', 
                        description: 'I work at the university in any capacity',
                        icon: <UserIcon className="w-5 h-5" />
                      }
                    ].map((option: any) => (
                      <motion.div
                        key={option.value}
                        variants={staggerItem}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Card 
                          className={`cursor-pointer transition-all p-4 ${
                            profile.userType === option.value
                              ? 'bg-[var(--hive-gold)]/10 border-[var(--hive-gold)] ring-2 ring-[var(--hive-gold)]/20'
                              : 'bg-[var(--hive-background-tertiary)] border-[var(--hive-gray-700)] hover:border-[#3A3A3B]'
                          }`}
                          onClick={() => setProfile(prev => ({ ...prev, userType: option.value as 'student' | 'alumni' | 'faculty' }))}
                        >
                        <div className="flex items-center gap-4">
                          <div className={`flex-shrink-0 ${
                            profile.userType === option.value ? 'text-[var(--hive-gold)]' : 'text-[var(--hive-text-primary)]/40'
                          }`}>
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <div className={`font-medium ${
                              profile.userType === option.value ? 'text-[var(--hive-gold)]' : 'text-[var(--hive-text-primary)]'
                            }`}>
                              {option.label}
                            </div>
                            <div className="text-sm text-[var(--hive-text-primary)]/60">
                              {option.description}
                            </div>
                          </div>
                          {profile.userType === option.value && (
                            <Check className="w-5 h-5 text-[var(--hive-gold)] flex-shrink-0" />
                          )}
                        </div>
                      </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {profile.userType === 'alumni' && (
                      <motion.div 
                        className="mt-6 p-4 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/30 rounded-xl"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={cardTransition}
                      >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center flex-shrink-0">
                          <Users className="w-4 h-4 text-[var(--hive-gold)]" />
                        </div>
                        <div>
                          <div className="font-medium text-[var(--hive-gold)] mb-1">
                            Alumni Waitlist
                          </div>
                          <div className="text-sm text-[var(--hive-text-primary)]/80">
                            HIVE is currently focused on current students. We'll notify you when we expand to alumni!
                          </div>
                        </div>
                      </div>
                      </motion.div>
                    )}

                    {profile.userType === 'faculty' && (
                      <motion.div 
                        className="mt-6 p-4 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/30 rounded-xl"
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={cardTransition}
                      >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center flex-shrink-0">
                          <Target className="w-4 h-4 text-[var(--hive-gold)]" />
                        </div>
                        <div>
                          <div className="font-medium text-[var(--hive-gold)] mb-1">
                            Faculty Space Requests
                          </div>
                          <div className="text-sm text-[var(--hive-text-primary)]/80">
                            You can request to create and manage spaces for your courses, research, or campus initiatives.
                          </div>
                        </div>
                      </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </motion.div>
                )}

                {/* Step 2: Identity */}
                {currentStep === 2 && (
                  <motion.div 
                    className="space-y-6"
                    variants={stepContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={stepContentTransition}
                  >
                    <motion.div variants={staggerContainer} initial="initial" animate="animate">
                      <motion.div variants={staggerItem}>
                        <Input
                          label="First Name *"
                          value={profile.firstName}
                          onChange={(e: any) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                          placeholder="First name"
                          autoFocus
                          className="focus:border-[var(--hive-gold)] focus:ring-[var(--hive-gold)]/20"
                        />
                      </motion.div>

                      <motion.div variants={staggerItem}>
                        <Input
                          label="Last Name *"
                          value={profile.lastName}
                          onChange={(e: any) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                          placeholder="Last name"
                          className="focus:border-[var(--hive-gold)] focus:ring-[var(--hive-gold)]/20"
                        />
                      </motion.div>

                      <motion.div variants={staggerItem}>
                        <div className="p-4 bg-[var(--hive-background-tertiary)] border border-[var(--hive-gray-700)] rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-[var(--hive-text-primary)]/60">Handle</label>
                            <Badge variant="secondary" className="bg-[var(--hive-gold)]/10 text-[var(--hive-gold)] border-0 text-xs">
                              Auto-generated
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#6B6B6F]">@</span>
                            <span className="text-[var(--hive-gold)] font-mono">{profile.handle || 'handle'}</span>
                          </div>
                          <p className="text-xs text-[var(--hive-text-primary)]/40 mt-2">
                            Your handle will be automatically generated from your name
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}

              {/* Step 3: Academic */}
              {currentStep === 3 && (
                <motion.div 
                  className="space-y-6"
                  variants={stepContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={stepContentTransition}
                >
                  {/* Only show academic fields for students, different content for others */}
                  {profile.userType === 'student' && (
                    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                      <motion.div variants={staggerItem}>
                        <AnimatedDropdown
                          label="Academic Level"
                          options={[
                            { value: 'freshman', label: 'Freshman' },
                            { value: 'sophomore', label: 'Sophomore' },
                            { value: 'junior', label: 'Junior' },
                            { value: 'senior', label: 'Senior' },
                            { value: 'graduate', label: 'Graduate Student' }
                          ]}
                          value={profile.academicLevel}
                          onChange={(value: any) => setProfile(prev => ({ ...prev, academicLevel: Array.isArray(value) ? value[0] : value }))}
                          placeholder="Select your academic level"
                        />
                      </motion.div>
                      
                      <motion.div variants={staggerItem}>
                        <AnimatedDropdown
                          label="Major"
                          required
                          searchable
                          options={UB_MAJORS.map(major => ({
                            value: major.value,
                            label: major.label
                          }))}
                          value={profile.major}
                          onChange={(value: any) => setProfile(prev => ({ ...prev, major: Array.isArray(value) ? value[0] : value }))}
                          placeholder="Select your major"
                        />
                      </motion.div>

                      <motion.div variants={staggerItem}>
                        <AnimatedDropdown
                          label="Minor (optional)"
                          searchable
                          clearable
                          options={[
                            { value: '', label: 'No Minor' },
                            ...UB_MAJORS.map(major => ({
                              value: major.value,
                              label: major.label
                            }))
                          ]}
                          value={profile.minor}
                          onChange={(value: any) => {
                            const selectedValue = Array.isArray(value) ? value[0] : value;
                            setProfile(prev => ({ ...prev, minor: selectedValue === '' ? '' : selectedValue }));
                          }}
                          placeholder="Enter your minor if applicable"
                        />
                      </motion.div>

                      <motion.div variants={staggerItem}>
                        <AnimatedDropdown
                          label="Graduation Year"
                          required
                          options={getGraduationYears().map(year => ({
                            value: year.value,
                            label: year.label
                          }))}
                          value={profile.graduationYear}
                          onChange={(value: any) => setProfile(prev => ({ ...prev, graduationYear: Array.isArray(value) ? value[0] : value }))}
                          placeholder="Select your graduation year"
                        />
                      </motion.div>
                    </motion.div>
                  )}

                  {profile.userType === 'alumni' && (
                    <motion.div 
                      className="text-center py-12 space-y-4"
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      transition={cardTransition}
                    >
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center mx-auto"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Users className="w-10 h-10 text-[var(--hive-gold)]" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
                          Alumni Waitlist
                        </h3>
                        <p className="text-[var(--hive-text-primary)]/60 max-w-md mx-auto">
                          Thank you for your interest! HIVE is currently focused on current students. 
                          We'll notify you via email when we expand to include alumni.
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Button
                          onClick={() => router.push('/auth/login')}
                          className="bg-[var(--hive-gold)] text-[var(--hive-black)] hover:opacity-90"
                        >
                          Got it, thanks
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}

                  {profile.userType === 'faculty' && (
                    <motion.div 
                      className="text-center py-12 space-y-6"
                      variants={cardVariants}
                      initial="initial"
                      animate="animate"
                      transition={cardTransition}
                    >
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center mx-auto"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Target className="w-10 h-10 text-[var(--hive-gold)]" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
                          Faculty Space Requests
                        </h3>
                        <p className="text-[var(--hive-text-primary)]/60 max-w-md mx-auto mb-6">
                          Faculty and staff can request to create and manage spaces for courses, research projects, 
                          or campus initiatives. Tell us what you'd like to build.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        className="max-w-lg mx-auto"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                      >
                        <motion.div variants={staggerItem}>
                          <Input
                            label="Department/Unit *"
                            value={profile.department || ''}
                            onChange={(e: any) => setProfile(prev => ({ ...prev, department: e.target.value }))}
                            placeholder="e.g. Computer Science, Student Life, etc."
                            className="focus:border-[var(--hive-gold)] focus:ring-[var(--hive-gold)]/20 mb-4"
                          />
                        </motion.div>
                        
                        <motion.div variants={staggerItem}>
                          <label className="block text-sm font-medium text-[var(--hive-text-primary)]/60 mb-2">
                            Space Request Description *
                          </label>
                          <textarea
                            value={profile.spaceRequest || ''}
                            onChange={(e: any) => setProfile(prev => ({ ...prev, spaceRequest: e.target.value }))}
                            placeholder="Describe the space you'd like to create and how students would benefit..."
                            rows={4}
                            className="w-full px-4 py-3 bg-[var(--hive-background-tertiary)] border border-[var(--hive-gray-700)] rounded-xl text-[var(--hive-text-primary)] placeholder-[#6B6B6F] focus:outline-none focus:border-[var(--hive-gold)] transition-colors resize-none"
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Campus Life */}
              {currentStep === 4 && (
                <motion.div 
                  className="space-y-6"
                  variants={stepContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={stepContentTransition}
                >
                  <motion.div variants={staggerContainer} initial="initial" animate="animate">
                    <motion.div variants={staggerItem}>
                      <LivingSituationSelector
                        value={profile.livingSituation}
                        onChange={(value: any) => setProfile(prev => ({ ...prev, livingSituation: value }))}
                      />
                    </motion.div>

                    <AnimatePresence>
                      {profile.livingSituation && (
                        profile.livingSituation === 'ellicott' || 
                        profile.livingSituation === 'governors' || 
                        profile.livingSituation === 'south_campus'
                      ) && (
                        <motion.div 
                          variants={staggerItem}
                          initial="initial"
                          animate="animate"
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Input
                            label="Room Number (optional)"
                            value={profile.roomNumber}
                            onChange={(e: any) => setProfile(prev => ({ ...prev, roomNumber: e.target.value }))}
                            placeholder="e.g., Porter 312B"
                            className="mt-4"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 5: Interests */}
              {currentStep === 5 && (
                <motion.div 
                  className="space-y-4"
                  variants={stepContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={stepContentTransition}
                >
                  <motion.div variants={staggerContainer} initial="initial" animate="animate">
                    <motion.div variants={staggerItem}>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
                          What's your vibe? 
                        </h2>
                        <p className="text-[var(--hive-text-primary)]/60">
                          Pick the ones that actually describe you (not what looks good on LinkedIn)
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-sm text-[var(--hive-text-primary)]/40">
                            {profile.interests.length < 3 
                              ? `Pick at least ${3 - profile.interests.length} more`
                              : profile.interests.length < 10
                              ? `${10 - profile.interests.length} slots left`
                              : 'You\'re maxed out!'
                            }
                          </span>
                          <div className="flex gap-1">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 w-8 rounded-full transition-colors ${
                                  i < profile.interests.length
                                    ? 'bg-[var(--hive-gold)]'
                                    : 'bg-[var(--hive-white)]/10'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={staggerItem}>
                      <Card className="bg-[var(--hive-background-primary)] border-[var(--hive-background-tertiary)]">
                        <CardContent className="p-6 max-h-[500px] overflow-y-auto">
                          <div className="space-y-8">
                            {Object.entries(INTEREST_CATEGORIES).map(([category, interests]) => (
                              <div key={category}>
                                <h4 className="text-base font-bold text-[var(--hive-gold)] mb-4 flex items-center gap-2">
                                  <span className="text-2xl">
                                    {category.includes('Academic') && '📚'}
                                    {category.includes('Social') && '🎉'}
                                    {category.includes('Tech') && '💻'}
                                    {category.includes('Food') && '🍜'}
                                    {category.includes('Campus Life') && '🦬'}
                                    {category.includes('Buffalo') && '🍗'}
                                    {category.includes('Entertainment') && '📺'}
                                    {category.includes('Gaming') && '🎮'}
                                    {category.includes('Health') && '💪'}
                                    {category.includes('Work') && '💰'}
                                    {category.includes('Relationships') && '❤️'}
                                    {category.includes('Creative') && '🎨'}
                                    {category.includes('Random') && '🎲'}
                                    {category.includes('Internet') && '📱'}
                                    {category.includes('Greek') && '🏛️'}
                                  </span>
                                  {category}
                                </h4>
                                <motion.div 
                                  className="flex flex-wrap gap-2"
                                  variants={staggerContainer}
                                  initial="initial"
                                  animate="animate"
                                >
                                  {interests.slice(0, 15).map((interest, index) => (
                                    <motion.button
                                      key={interest}
                                      onClick={() => {
                                        if (profile.interests.includes(interest)) {
                                          setProfile(prev => ({
                                            ...prev,
                                            interests: prev.interests.filter(i => i !== interest)
                                          }));
                                        } else if (profile.interests.length < 10) {
                                          setProfile(prev => ({
                                            ...prev,
                                            interests: [...prev.interests, interest]
                                          }));
                                        }
                                      }}
                                      disabled={!profile.interests.includes(interest) && profile.interests.length >= 10}
                                      className={`
                                        relative px-4 py-2 rounded-full text-sm font-medium
                                        transition-all duration-200 transform
                                        ${profile.interests.includes(interest) 
                                          ? 'bg-gradient-to-r from-[var(--hive-gold)] to-[#FFA500] text-[var(--hive-black)] scale-105 shadow-lg shadow-[var(--hive-gold)]/30' 
                                          : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-gray-700)] hover:text-[var(--hive-text-primary)] hover:scale-105'
                                        }
                                        ${!profile.interests.includes(interest) && profile.interests.length >= 10 
                                          ? 'opacity-40 cursor-not-allowed' 
                                          : ''
                                        }
                                      `}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: index * 0.02 }}
                                      whileHover={{ scale: profile.interests.length < 10 || profile.interests.includes(interest) ? 1.1 : 1 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <AnimatePresence mode="wait">
                                        {profile.interests.includes(interest) && (
                                          <motion.span
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 'auto', opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            className="inline-flex mr-1.5"
                                          >
                                            ✓
                                          </motion.span>
                                        )}
                                      </AnimatePresence>
                                      {interest}
                                    </motion.button>
                                  ))}
                                </motion.div>
                                {interests.length > 15 && (
                                  <details className="mt-3">
                                    <summary className="text-xs text-[var(--hive-text-primary)]/40 cursor-pointer hover:text-[var(--hive-text-primary)]/60">
                                      Show {interests.length - 15} more...
                                    </summary>
                                    <motion.div 
                                      className="flex flex-wrap gap-2 mt-3"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                    >
                                      {interests.slice(15).map((interest, index) => (
                                        <motion.button
                                          key={interest}
                                          onClick={() => {
                                            if (profile.interests.includes(interest)) {
                                              setProfile(prev => ({
                                                ...prev,
                                                interests: prev.interests.filter(i => i !== interest)
                                              }));
                                            } else if (profile.interests.length < 10) {
                                              setProfile(prev => ({
                                                ...prev,
                                                interests: [...prev.interests, interest]
                                              }));
                                            }
                                          }}
                                          disabled={!profile.interests.includes(interest) && profile.interests.length >= 10}
                                          className={`
                                            relative px-4 py-2 rounded-full text-sm font-medium
                                            transition-all duration-200 transform
                                            ${profile.interests.includes(interest) 
                                              ? 'bg-gradient-to-r from-[var(--hive-gold)] to-[#FFA500] text-[var(--hive-black)] scale-105 shadow-lg shadow-[var(--hive-gold)]/30' 
                                              : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-gray-700)] hover:text-[var(--hive-text-primary)] hover:scale-105'
                                            }
                                            ${!profile.interests.includes(interest) && profile.interests.length >= 10 
                                              ? 'opacity-40 cursor-not-allowed' 
                                              : ''
                                            }
                                          `}
                                          whileHover={{ scale: profile.interests.length < 10 || profile.interests.includes(interest) ? 1.1 : 1 }}
                                          whileTap={{ scale: 0.95 }}
                                        >
                                          <AnimatePresence mode="wait">
                                            {profile.interests.includes(interest) && (
                                              <motion.span
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: 'auto', opacity: 1 }}
                                                exit={{ width: 0, opacity: 0 }}
                                                className="inline-flex mr-1.5"
                                              >
                                                ✓
                                              </motion.span>
                                            )}
                                          </AnimatePresence>
                                          {interest}
                                        </motion.button>
                                      ))}
                                    </motion.div>
                                  </details>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 6: Student Leadership */}
              {currentStep === 6 && (
                <motion.div 
                  className="space-y-6"
                  variants={stepContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={stepContentTransition}
                >
                  <motion.div variants={staggerContainer} initial="initial" animate="animate">
                    <motion.div variants={staggerItem}>
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-3">
                          Are you building something on campus? 
                        </h2>
                        <p className="text-lg text-[var(--hive-text-primary)]/80 mb-4">
                          Student leaders get builder access to create custom tools and experiences for their communities
                        </p>
                        
                        {/* What Builder Access Means */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          <motion.div 
                            className="bg-[var(--hive-background-tertiary)] border border-[var(--hive-gray-700)] rounded-xl p-4 hover:border-[var(--hive-gold)]/30 transition-all"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="text-[var(--hive-gold)] mb-2">✨</div>
                            <h4 className="text-sm font-semibold text-[var(--hive-text-primary)] mb-1">Create Tools</h4>
                            <p className="text-xs text-[var(--hive-text-primary)]/60">Build custom solutions for your org's specific needs</p>
                          </motion.div>
                          
                          <motion.div 
                            className="bg-[var(--hive-background-tertiary)] border border-[var(--hive-gray-700)] rounded-xl p-4 hover:border-[var(--hive-gold)]/30 transition-all"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="text-[var(--hive-gold)] mb-2">📊</div>
                            <h4 className="text-sm font-semibold text-[var(--hive-text-primary)] mb-1">See Analytics</h4>
                            <p className="text-xs text-[var(--hive-text-primary)]/60">Track engagement and member activity</p>
                          </motion.div>
                          
                          <motion.div 
                            className="bg-[var(--hive-background-tertiary)] border border-[var(--hive-gray-700)] rounded-xl p-4 hover:border-[var(--hive-gold)]/30 transition-all"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="text-[var(--hive-gold)] mb-2">🎯</div>
                            <h4 className="text-sm font-semibold text-[var(--hive-text-primary)] mb-1">Run Events</h4>
                            <p className="text-xs text-[var(--hive-text-primary)]/60">Coordinate meetings, socials, and initiatives</p>
                          </motion.div>
                          
                          <motion.div 
                            className="bg-[var(--hive-background-tertiary)] border border-[var(--hive-gray-700)] rounded-xl p-4 hover:border-[var(--hive-gold)]/30 transition-all"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="text-[var(--hive-gold)] mb-2">🤝</div>
                            <h4 className="text-sm font-semibold text-[var(--hive-text-primary)] mb-1">Manage Members</h4>
                            <p className="text-xs text-[var(--hive-text-primary)]/60">Onboard new members and assign roles</p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Leadership Toggle */}
                    <motion.div variants={staggerItem}>
                      <div className="relative overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-gold)]/5 via-transparent to-[var(--hive-gold)]/5" />
                        <div className="relative bg-[var(--hive-background-primary)]/80 backdrop-blur-sm border border-[var(--hive-gray-700)] rounded-2xl p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-2">
                                I'm a student leader
                              </h3>
                              <p className="text-sm text-[var(--hive-text-primary)]/70">
                                President, e-board member, team captain, or founding something new
                              </p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                <span className="text-xs px-2 py-1 bg-[var(--hive-white)]/5 text-[var(--hive-text-primary)]/60 rounded-full">Club President</span>
                                <span className="text-xs px-2 py-1 bg-[var(--hive-white)]/5 text-[var(--hive-text-primary)]/60 rounded-full">E-Board</span>
                                <span className="text-xs px-2 py-1 bg-[var(--hive-white)]/5 text-[var(--hive-text-primary)]/60 rounded-full">Team Captain</span>
                                <span className="text-xs px-2 py-1 bg-[var(--hive-white)]/5 text-[var(--hive-text-primary)]/60 rounded-full">Founder</span>
                              </div>
                            </div>
                            
                            <motion.button
                              onClick={() => {
                                const newValue = !profile.isStudentLeader;
                                setProfile(prev => ({ 
                                  ...prev, 
                                  isStudentLeader: newValue 
                                }));
                                // Clear search when toggling
                                setSpaceSearchQuery('');
                                setSearchResults([]);
                              }}
                              className={`
                                relative ml-4 w-20 h-12 rounded-full transition-all duration-300
                                ${profile.isStudentLeader 
                                  ? 'bg-gradient-to-r from-[var(--hive-gold)] to-[#FFA500]' 
                                  : 'bg-[var(--hive-gray-700)]'
                                }
                              `}
                              whileTap={{ scale: 0.95 }}
                            >
                              <motion.div
                                className="absolute top-1 w-10 h-10 bg-[var(--hive-white)] rounded-full shadow-lg"
                                animate={{
                                  x: profile.isStudentLeader ? 38 : 2
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                              {profile.isStudentLeader && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute inset-0 flex items-center justify-center"
                                >
                                  <Check className="h-4 w-4 text-[var(--hive-black)] ml-8" />
                                </motion.div>
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <AnimatePresence>
                      {profile.isStudentLeader && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          {/* Request Builder Access */}
                          <motion.div variants={staggerItem}>
                            <Card className="bg-[var(--hive-background-primary)] border-[var(--hive-background-tertiary)]">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div>
                                    <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-1">
                                      Request builder access 🔨
                                    </h3>
                                    <p className="text-sm text-[var(--hive-text-primary)]/60">
                                      Search for orgs you lead to get admin tools and analytics
                                    </p>
                                  </div>
                                  {profile.builderRequestSpaces.length > 0 && (
                                    <Badge className="bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border-0">
                                      {profile.builderRequestSpaces.length} requested
                                    </Badge>
                                  )}
                                </div>
                                
                                {/* Search Input */}
                                <div className="relative mb-4">
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-primary)]/40" />
                                  <input
                                    type="text"
                                    value={spaceSearchQuery}
                                    onChange={(e: any) => setSpaceSearchQuery(e.target.value)}
                                    placeholder="Search clubs, teams, orgs..."
                                    className="w-full pl-10 pr-10 py-3 bg-[var(--hive-background-tertiary)] border border-[var(--hive-gray-700)] rounded-xl text-[var(--hive-text-primary)] placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold)]/50 focus:border-[var(--hive-gold)] transition-all"
                                    autoFocus
                                  />
                                  {isSearching && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--hive-gold)]" />
                                    </div>
                                  )}
                                  {spaceSearchQuery && !isSearching && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSpaceSearchQuery('');
                                        setSearchResults([]);
                                      }}
                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-primary)]/40 hover:text-[var(--hive-text-primary)]/60 transition-colors"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>

                                {/* Search Results */}
                                {spaceSearchQuery.length >= 2 ? (
                                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                                    {searchResults.length > 0 ? (
                                      <>
                                        <p className="text-xs text-[var(--hive-text-primary)]/40 mb-2">
                                          Found {searchResults.length} organization{searchResults.length !== 1 ? 's' : ''}
                                        </p>
                                        {searchResults.map((space, index) => (
                                          <motion.div
                                            key={space.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                          >
                                            <button
                                              onClick={() => {
                                                if (profile.builderRequestSpaces.includes(space.id)) {
                                                  setProfile(prev => ({
                                                    ...prev,
                                                    builderRequestSpaces: prev.builderRequestSpaces.filter(s => s !== space.id)
                                                  }));
                                                } else {
                                                  setProfile(prev => ({
                                                    ...prev,
                                                    builderRequestSpaces: [...prev.builderRequestSpaces, space.id]
                                                  }));
                                                }
                                              }}
                                              className={`
                                                w-full p-4 rounded-xl border text-left transition-all group
                                                ${profile.builderRequestSpaces.includes(space.id)
                                                  ? 'bg-gradient-to-r from-[var(--hive-gold)]/15 to-[var(--hive-gold)]/5 border-[var(--hive-gold)] shadow-lg shadow-[var(--hive-gold)]/10'
                                                  : 'bg-[var(--hive-background-tertiary)]/50 border-[var(--hive-gray-700)] hover:border-[#3A3A3B] hover:bg-[var(--hive-background-tertiary)]'
                                                }
                                              `}
                                            >
                                              <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-3 flex-1">
                                                  <div className={`
                                                    w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                                                    ${profile.builderRequestSpaces.includes(space.id)
                                                      ? 'bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]'
                                                      : 'bg-[var(--hive-white)]/5 text-[var(--hive-text-primary)]/40 group-hover:bg-[var(--hive-white)]/10'
                                                    }
                                                  `}>
                                                    <Users className="h-5 w-5" />
                                                  </div>
                                                  <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                      <span className={`font-medium transition-colors ${
                                                        profile.builderRequestSpaces.includes(space.id) 
                                                          ? 'text-[var(--hive-gold)]' 
                                                          : 'text-[var(--hive-text-primary)] group-hover:text-[var(--hive-text-primary)]/90'
                                                      }`}>
                                                        {space.name}
                                                      </span>
                                                      {space.isVerified && (
                                                        <span className="text-xs px-2 py-0.5 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] rounded-full">
                                                          Verified
                                                        </span>
                                                      )}
                                                    </div>
                                                    <div className="text-xs text-[var(--hive-text-primary)]/50 mt-0.5">
                                                      {space.memberCount !== undefined && (
                                                        <span className="font-semibold text-[var(--hive-text-primary)]/60">{space.memberCount}</span>
                                                      )} members
                                                      {space.type && (
                                                        <span className="ml-2 capitalize">{space.type.replace('_', ' ')}</span>
                                                      )}
                                                      {space.description && (
                                                        <span className="block mt-1 line-clamp-1">{space.description}</span>
                                                      )}
                                                    </div>
                                                    {profile.builderRequestSpaces.includes(space.id) && (
                                                      <div className="text-xs text-[var(--hive-gold)]/80 mt-2 flex items-center gap-1">
                                                        <Check className="h-3 w-3" />
                                                        You'll be notified when approved
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="flex-shrink-0">
                                                  <AnimatePresence mode="wait">
                                                    {profile.builderRequestSpaces.includes(space.id) ? (
                                                      <motion.div
                                                        key="selected"
                                                        initial={{ scale: 0, rotate: -180 }}
                                                        animate={{ scale: 1, rotate: 0 }}
                                                        exit={{ scale: 0, rotate: 180 }}
                                                        className="w-8 h-8 rounded-full bg-[var(--hive-gold)] flex items-center justify-center"
                                                      >
                                                        <Check className="h-4 w-4 text-[var(--hive-black)]" />
                                                      </motion.div>
                                                    ) : (
                                                      <motion.div
                                                        key="unselected"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="w-8 h-8 rounded-full border-2 border-[var(--hive-white)]/20 group-hover:border-[var(--hive-white)]/40 transition-colors"
                                                      />
                                                    )}
                                                  </AnimatePresence>
                                                </div>
                                              </div>
                                            </button>
                                          </motion.div>
                                        ))}
                                      </>
                                    ) : !isSearching ? (
                                      <div className="text-center py-8 text-[var(--hive-text-primary)]/40">
                                        <p>No organizations found matching "{spaceSearchQuery}"</p>
                                        <p className="text-sm mt-2">Try a different search term</p>
                                      </div>
                                    ) : null}
                                  </div>
                                ) : spaceSearchQuery.length === 1 ? (
                                  <div className="text-center py-8">
                                    <div className="w-16 h-16 rounded-full bg-[var(--hive-gold)]/10 flex items-center justify-center mx-auto mb-3">
                                      <Search className="h-8 w-8 text-[var(--hive-gold)]/40" />
                                    </div>
                                    <p className="text-[var(--hive-text-primary)]/40">Type one more character...</p>
                                    <p className="text-xs text-[var(--hive-text-primary)]/30 mt-1">Minimum 2 characters to search</p>
                                  </div>
                                ) : (
                                  <div className="text-center py-12">
                                    <motion.div 
                                      className="w-20 h-20 rounded-full bg-[var(--hive-background-tertiary)] border border-[var(--hive-gray-700)] flex items-center justify-center mx-auto mb-4"
                                      animate={{ 
                                        scale: [1, 1.05, 1],
                                      }}
                                      transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                      }}
                                    >
                                      <Search className="h-10 w-10 text-[var(--hive-text-primary)]/20" />
                                    </motion.div>
                                    <p className="text-[var(--hive-text-primary)]/40 font-medium">Search your organization</p>
                                    <p className="text-xs text-[var(--hive-text-primary)]/30 mt-2">
                                      Try: "Computer Science", "Dance", "Pre-Med", "Rocket League"
                                    </p>
                                  </div>
                                )}
                                
                                {/* Selected Organizations Display */}
                                {profile.builderRequestSpaces.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-[var(--hive-gray-700)]">
                                    <p className="text-xs text-[var(--hive-text-primary)]/40 mb-3">
                                      Selected for leadership access ({profile.builderRequestSpaces.length})
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {profile.builderRequestSpaces.map((spaceId: any) => {
                                        const space = searchResults.find(s => s.id === spaceId);
                                        return space ? (
                                          <div
                                            key={spaceId}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-[var(--hive-gold)]/20 border border-[var(--hive-gold)] rounded-full"
                                          >
                                            <span className="text-xs text-[var(--hive-gold)]">{space.name}</span>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setProfile(prev => ({
                                                  ...prev,
                                                  builderRequestSpaces: prev.builderRequestSpaces.filter(id => id !== spaceId)
                                                }));
                                              }}
                                              className="text-[var(--hive-gold)] hover:text-[var(--hive-gold)]/80"
                                            >
                                              <X className="h-3 w-3" />
                                            </button>
                                          </div>
                                        ) : null;
                                      })}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Help text */}
                                <div className="mt-4 p-4 bg-gradient-to-r from-[var(--hive-gold)]/5 to-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-xl">
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <Sparkles className="h-4 w-4 text-[var(--hive-gold)]" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-semibold text-[var(--hive-gold)] mb-2">
                                        What happens next?
                                      </p>
                                      <p className="text-xs text-[var(--hive-text-primary)]/70 mb-2">
                                        We'll verify your leadership role (usually within 24 hours)
                                      </p>
                                      <p className="text-xs text-[var(--hive-text-primary)]/60 font-semibold mb-1">Once approved, you can:</p>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="text-xs text-[var(--hive-text-primary)]/50">• Build custom tools</div>
                                        <div className="text-xs text-[var(--hive-text-primary)]/50">• See member analytics</div>
                                        <div className="text-xs text-[var(--hive-text-primary)]/50">• Create events</div>
                                        <div className="text-xs text-[var(--hive-text-primary)]/50">• Send announcements</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                          
                          {/* Create New Space Request */}
                          <motion.div variants={staggerItem}>
                            <div className="relative">
                              {/* Glow effect */}
                              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--hive-gold)] to-[#FFA500] rounded-2xl blur-md opacity-10" />
                              
                              <Card className="relative bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-tertiary)] border-[var(--hive-gold)]/30 overflow-hidden">
                                <CardContent className="p-6">
                                  <div className="absolute top-3 right-3">
                                    <Badge className="bg-gradient-to-r from-[var(--hive-gold)] to-[#FFA500] text-[var(--hive-black)] font-bold border-0">
                                      Coming Soon ⚡
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 flex items-center justify-center flex-shrink-0">
                                      <ArrowRight className="h-6 w-6 text-[var(--hive-gold)]" />
                                    </div>
                                    
                                    <div className="flex-1">
                                      <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-2">
                                        Starting something new?
                                      </h3>
                                      <p className="text-sm text-[var(--hive-text-primary)]/70 mb-3">
                                        Launch your own club, team, or community on HIVE
                                      </p>
                                      
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs text-[var(--hive-text-primary)]/50">
                                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--hive-gold)]" />
                                          <span>Get your own custom space</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-[var(--hive-text-primary)]/50">
                                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--hive-gold)]/70" />
                                          <span>Build tools specific to your community</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-[var(--hive-text-primary)]/50">
                                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--hive-gold)]/40" />
                                          <span>Grow from day one with HIVE's network</span>
                                        </div>
                                      </div>
                                      
                                      <div className="mt-4 p-3 bg-[var(--hive-white)]/5 rounded-lg border border-[var(--hive-white)]/10">
                                        <p className="text-xs text-[var(--hive-text-primary)]/40">
                                          Space creation opens January 2025 - we'll notify you when it's ready!
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {!profile.isStudentLeader && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center py-12"
                      >
                        <motion.div 
                          className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--hive-gold)]/10 to-[var(--hive-gold)]/5 flex items-center justify-center mx-auto mb-4"
                          animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          <Sparkles className="h-12 w-12 text-[var(--hive-gold)]/40" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                          All good! 
                        </h3>
                        <p className="text-[var(--hive-text-primary)]/60 max-w-sm mx-auto">
                          You can still discover and join spaces. If you become a leader later, just update your profile to request builder access.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {/* Step 7: Goals */}
              {currentStep === 7 && (
                <motion.div 
                  className="space-y-4"
                  variants={stepContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={stepContentTransition}
                >
                  <motion.div variants={staggerContainer} initial="initial" animate="animate">
                    <motion.div variants={staggerItem}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-[var(--hive-text-primary)]/60">
                          What are your goals? (select up to 5)
                        </label>
                        <span className="text-xs text-[var(--hive-text-primary)]/40">
                          {profile.goals.length}/5 selected
                        </span>
                      </div>
                    </motion.div>
                    
                    <motion.div variants={staggerItem}>
                      <Card className="bg-[var(--hive-background-tertiary)] border-[var(--hive-gray-700)]">
                        <CardContent className="p-4 max-h-96 overflow-y-auto">
                          <motion.div 
                            className="grid grid-cols-2 gap-2"
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                          >
                            {UB_CAMPUS_GOALS.map((goal, index) => (
                              <motion.div
                                key={goal}
                                variants={staggerItem}
                                whileHover="hover"
                                whileTap="tap"
                                custom={index}
                                transition={{ delay: index * motionConfig.stagger.micro }}
                              >
                                <Button
                                  variant={profile.goals.includes(goal) ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => {
                                    if (profile.goals.includes(goal)) {
                                      setProfile(prev => ({
                                        ...prev,
                                        goals: prev.goals.filter(g => g !== goal)
                                      }));
                                    } else if (profile.goals.length < 5) {
                                      setProfile(prev => ({
                                        ...prev,
                                        goals: [...prev.goals, goal]
                                      }));
                                    }
                                  }}
                                  disabled={!profile.goals.includes(goal) && profile.goals.length >= 5}
                                  className={`justify-start text-left w-full transition-all duration-200 ${
                                    profile.goals.includes(goal)
                                      ? 'bg-[var(--hive-gold)]/10 border-[var(--hive-gold)] text-[var(--hive-gold)] hover:border-[var(--hive-gold)] scale-[1.02]'
                                      : 'hover:scale-[1.01]'
                                  }`}
                                >
                                  {profile.goals.includes(goal) && <Check className="h-3 w-3 mr-1" />}
                                  <span className="truncate">{goal}</span>
                                </Button>
                              </motion.div>
                            ))}
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}


              {/* Step 8: Complete */}
              {currentStep === 8 && (
                <motion.div 
                  className="space-y-6"
                  variants={stepContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={stepContentTransition}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    transition={cardTransition}
                  >
                    <Card className="bg-gradient-to-br from-[var(--hive-gold)]/20 to-[var(--hive-gold)]/10 border-[var(--hive-gold)]/30">
                      <CardContent className="p-8 text-center">
                        <motion.div className="mb-6">
                          <motion.div 
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--hive-gold)] to-[var(--hive-gold)] flex items-center justify-center mx-auto mb-4"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              delay: 0.2,
                              duration: 0.6,
                              type: "spring",
                              stiffness: 200,
                              damping: 15
                            }}
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, duration: 0.3 }}
                            >
                              <Check className="w-10 h-10 text-[var(--hive-black)]" />
                            </motion.div>
                          </motion.div>
                          <motion.h3 
                            className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.3 }}
                          >
                            Welcome to HIVE, {profile.firstName}!
                          </motion.h3>
                          <motion.p 
                            className="text-[var(--hive-text-primary)]/60"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                          >
                            Your profile is ready. Let's explore your new campus community.
                          </motion.p>
                        </motion.div>
                        
                        <motion.div 
                          className="space-y-3 text-left max-w-sm mx-auto"
                          variants={staggerContainer}
                          initial="initial"
                          animate="animate"
                        >
                          {[
                            { icon: Users, text: `Requested builder access for ${profile.builderRequestSpaces.length} communities` },
                            { icon: Heart, text: `${profile.interests.length} interests selected` },
                            { icon: Target, text: `${profile.goals.length} goals set` }
                          ].map((item, index) => (
                            <motion.div 
                              key={index}
                              className="flex items-center gap-3 text-sm text-[var(--hive-text-primary)]/60"
                              variants={staggerItem}
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6 + (index * 0.1), duration: 0.3 }}
                              >
                                <item.icon className="w-4 h-4 text-[var(--hive-gold)]" />
                              </motion.div>
                              <span>{item.text}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <AnimatePresence>
                    {isSaving && (
                      <motion.div 
                        className="flex items-center justify-center gap-2 text-[var(--hive-gold)]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Setting up your dashboard...</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <motion.div 
              className="flex items-center justify-between mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <motion.div
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="text-[var(--hive-text-primary)]/60 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </motion.div>

              {currentStep === 8 ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={handleComplete}
                    disabled={isSaving || !profile.consentGiven}
                    className="bg-gradient-to-r from-[var(--hive-gold)] to-[var(--hive-gold)] text-[var(--hive-black)] hover:opacity-90 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Setting up...
                      </>
                    ) : (
                      <>
                        Enter HIVE
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.div>
                      </>
                    )}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid() || (currentStep === 0 && !profile.consentGiven)}
                    variant="outline"
                    className={`transition-all duration-200 ${
                      isStepValid() 
                        ? "border-[var(--hive-gold)]/30 text-[var(--hive-gold)] hover:bg-[var(--hive-gold)]/5 hover:border-[var(--hive-gold)]/50" 
                        : "border-[#3A3A3B] text-[var(--hive-text-primary)]/40 opacity-50"
                    }`}
                  >
                    {currentStep === 0 ? 'Get Started' : 'Continue'}
                    <motion.div
                      animate={isStepValid() ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </Container>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <HiveModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms of Service"
        size="lg"
        className="max-h-[80vh] overflow-y-auto z-[9999]"
      >
        <div className="space-y-4 text-[var(--hive-text-secondary)]">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">1. Acceptance of Terms</h3>
            <p>By accessing and using HIVE, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">2. Use License</h3>
            <p>Permission is granted to temporarily use HIVE for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">3. User Account</h3>
            <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">4. Privacy</h3>
            <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of HIVE.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">5. Prohibited Uses</h3>
            <p>You may not use HIVE for any unlawful purpose or to solicit others to perform unlawful acts.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">6. Content Liability</h3>
            <p>We shall not be held responsible for any content that appears on your account. You agree to protect and defend us against all claims.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">7. Termination</h3>
            <p>We may terminate your access to HIVE at any time, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account.</p>
          </div>
        </div>
      </HiveModal>

      {/* Privacy Policy Modal */}
      <HiveModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Privacy Policy"
        size="lg"
        className="max-h-[80vh] overflow-y-auto z-[9999]"
      >
        <div className="space-y-4 text-[var(--hive-text-secondary)]">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">How We Use Your Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Information Sharing</h3>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as described in this policy.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Data Security</h3>
            <p>We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Cookies</h3>
            <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Changes to Privacy Policy</h3>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@hive.com</p>
          </div>
        </div>
      </HiveModal>

    </div>
  );
}