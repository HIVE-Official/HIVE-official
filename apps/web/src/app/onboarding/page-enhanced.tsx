"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-client';
import { 
  Loader2, ChevronRight, ChevronLeft, User, Calendar, Heart, Check, 
  GraduationCap, Home, Target, Users, BookOpen, MapPin, Bell,
  Camera, Sparkles, ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import { Select, SelectEnhanced } from '@hive/ui';
import { 
  UB_MAJORS, 
  ALL_INTERESTS, 
  UB_LIVING_SITUATIONS,
  UB_INITIAL_SPACES,
  UB_CAMPUS_GOALS,
  getGraduationYears 
} from '@/data/ub-academic-data';

/**
 * HIVE Onboarding - Enhanced with proper dropdowns and comprehensive data
 * Profile-building experience that feels premium and purposeful
 */

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
    subtitle: 'Let\'s build your campus profile',
    icon: <Sparkles className="h-5 w-5" />,
    progress: 10
  },
  {
    id: 'identity',
    title: 'Your Identity',
    subtitle: 'How should we know you?',
    icon: <User className="h-5 w-5" />,
    progress: 20
  },
  {
    id: 'academic',
    title: 'Academic Profile',
    subtitle: 'Your educational journey',
    icon: <GraduationCap className="h-5 w-5" />,
    progress: 35
  },
  {
    id: 'campus-life',
    title: 'Campus Life',
    subtitle: 'Where you live and thrive',
    icon: <Home className="h-5 w-5" />,
    progress: 50
  },
  {
    id: 'interests',
    title: 'Your Interests',
    subtitle: 'What drives your passion?',
    icon: <Heart className="h-5 w-5" />,
    progress: 65
  },
  {
    id: 'communities',
    title: 'Join Communities',
    subtitle: 'Find your people',
    icon: <Users className="h-5 w-5" />,
    progress: 80
  },
  {
    id: 'goals',
    title: 'Set Your Goals',
    subtitle: 'What do you want to achieve?',
    icon: <Target className="h-5 w-5" />,
    progress: 90
  },
  {
    id: 'preferences',
    title: 'Final Touches',
    subtitle: 'Customize your experience',
    icon: <Bell className="h-5 w-5" />,
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

export default function EnhancedOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  
  // Profile data that builds throughout the journey
  const [profile, setProfile] = useState({
    // Identity
    displayName: '',
    handle: '',
    pronouns: '',
    bio: '',
    
    // Academic
    graduationYear: '',
    major: '',
    minor: '',
    gpa: '',
    
    // Campus Life
    livingSituation: '',
    roomNumber: '',
    
    // Interests (max 10)
    interests: [] as string[],
    
    // Communities (recommended 3-5)
    joinedSpaces: [] as string[],
    
    // Goals (max 5)
    goals: [] as string[],
    
    // Preferences
    notifications: {
      messages: true,
      events: true,
      spaces: true,
      academic: false
    },
    visibility: 'campus' // 'public', 'campus', 'connections'
  });

  // Profile completion percentage
  const getProfileCompletion = () => {
    let completed = 0;
    const checks = [
      profile.displayName,
      profile.graduationYear,
      profile.major,
      profile.livingSituation,
      profile.interests.length > 0,
      profile.joinedSpaces.length > 0,
      profile.goals.length > 0
    ];
    
    checks.forEach(check => {
      if (check) completed += 14.3;
    });
    
    return Math.min(100, Math.round(completed));
  };

  useEffect(() => {
    // Check for authorized session
    const authSession = localStorage.getItem('auth_session');
    if (authSession) {
      const sessionData = JSON.parse(authSession);
      
      // Pre-fill for jwrhineh@buffalo.edu
      if (sessionData.email === 'jwrhineh@buffalo.edu') {
        setProfile(prev => ({
          ...prev,
          displayName: 'Jacob Rhineheart',
          handle: 'jwrhineh',
          graduationYear: '2025',
          major: 'computer-science'
        }));
      }
      
      setIsLoading(false);
    } else {
      // Redirect to sign in if no session
      router.push('/signin');
    }
  }, [router]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsSaving(true);
    
    try {
      // Get session data
      const authSession = localStorage.getItem('auth_session');
      if (!authSession) {
        throw new Error('No auth session');
      }
      
      const sessionData = JSON.parse(authSession);
      
      // Save profile to localStorage (in production would save to Firestore)
      const userData = {
        ...profile,
        email: sessionData.email,
        schoolId: sessionData.schoolId || 'ub',
        profilePhoto,
        onboardingCompleted: true,
        onboardingCompletedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('user_data', JSON.stringify(userData));
      localStorage.setItem('onboarding_complete', 'true');
      
      // Navigate to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      setIsSaving(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return true; // Welcome
      case 1: return profile.displayName.length >= 2; // Identity
      case 2: return profile.graduationYear && profile.major; // Academic
      case 3: return profile.livingSituation; // Campus Life
      case 4: return profile.interests.length >= 3; // Interests (min 3)
      case 5: return profile.joinedSpaces.length >= 1; // Communities (min 1)
      case 6: return profile.goals.length >= 1; // Goals (min 1)
      case 7: return true; // Preferences (always valid)
      case 8: return true; // Complete
      default: return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FFD700]" />
      </div>
    );
  }

  const currentStepData = ONBOARDING_STEPS[currentStep];

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col">
      {/* Header with progress */}
      <div className="border-b border-[#1A1A1B]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/hive-logo-white.svg"
                alt="HIVE"
                width={32}
                height={32}
                className="w-8 h-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/whitelogo.svg";
                }}
              />
              <div>
                <h1 className="text-sm font-medium text-white">Building Your Profile</h1>
                <p className="text-xs text-[#6B6B6F]">{getProfileCompletion()}% Complete</p>
              </div>
            </div>
            
            <div className="text-sm text-[#8B8B8F]">
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-[#1A1A1B]">
          <div 
            className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFD700] transition-all duration-500 ease-out"
            style={{ width: `${currentStepData.progress}%` }}
          />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Left side - Profile Preview */}
        <div className="hidden lg:block w-1/3 border-r border-[#1A1A1B] bg-[#0F0F10]">
          <div className="p-8">
            <h2 className="text-sm font-medium text-[#8B8B8F] mb-6">PROFILE PREVIEW</h2>
            
            {/* Profile Card Preview */}
            <div className="bg-[#1A1A1B] rounded-2xl p-6 space-y-4">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFD700] flex items-center justify-center">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-black" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    {profile.displayName || 'Your Name'}
                  </h3>
                  {profile.handle && (
                    <p className="text-sm text-[#8B8B8F]">@{profile.handle}</p>
                  )}
                </div>
              </div>

              {/* Academic Info */}
              {(profile.major || profile.graduationYear) && (
                <div className="pt-4 border-t border-[#2A2A2B]">
                  <p className="text-xs text-[#6B6B6F] mb-2">ACADEMIC</p>
                  {profile.major && (
                    <p className="text-sm text-white">
                      {UB_MAJORS.find(m => m.value === profile.major)?.label}
                    </p>
                  )}
                  {profile.graduationYear && (
                    <p className="text-sm text-[#8B8B8F]">Class of {profile.graduationYear}</p>
                  )}
                </div>
              )}

              {/* Interests */}
              {profile.interests.length > 0 && (
                <div className="pt-4 border-t border-[#2A2A2B]">
                  <p className="text-xs text-[#6B6B6F] mb-2">INTERESTS</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.slice(0, 5).map(interest => (
                      <span 
                        key={interest}
                        className="px-2 py-1 bg-[#2A2A2B] rounded-full text-xs text-[#FFD700]"
                      >
                        {interest}
                      </span>
                    ))}
                    {profile.interests.length > 5 && (
                      <span className="px-2 py-1 text-xs text-[#6B6B6F]">
                        +{profile.interests.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Goals */}
              {profile.goals.length > 0 && (
                <div className="pt-4 border-t border-[#2A2A2B]">
                  <p className="text-xs text-[#6B6B6F] mb-2">GOALS</p>
                  <ul className="space-y-1">
                    {profile.goals.slice(0, 3).map(goal => (
                      <li key={goal} className="text-sm text-white flex items-center gap-2">
                        <Target className="w-3 h-3 text-[#FFD700]" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-xl">
            {/* Step header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#FFD700]/10 text-[#FFD700]">
                  {currentStepData.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {currentStepData.title}
                  </h2>
                  <p className="text-[#8B8B8F]">
                    {currentStepData.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Step content */}
            <div className="space-y-6">
              {/* Step 0: Welcome */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="bg-[#1A1A1B] rounded-2xl p-8 text-center">
                    <div className="mb-6">
                      <Image
                        src="/assets/hive-logo-white.svg"
                        alt="HIVE"
                        width={64}
                        height={64}
                        className="w-16 h-16 mx-auto mb-4"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/assets/whitelogo.svg";
                        }}
                      />
                      <h3 className="text-xl font-bold text-white mb-2">
                        Welcome to HIVE at UB
                      </h3>
                      <p className="text-[#8B8B8F]">
                        Your campus, connected. Let's build your profile and find your community.
                      </p>
                    </div>
                    
                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#C1C1C4]">
                          Connect with 30,000+ UB students
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#C1C1C4]">
                          Join communities that match your interests
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#C1C1C4]">
                          Build tools and solutions with your peers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Identity */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#8B8B8F] mb-2">
                      Display Name *
                    </label>
                    <input
                      type="text"
                      value={profile.displayName}
                      onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="How should we call you?"
                      className="w-full px-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white placeholder-[#6B6B6F] focus:outline-none focus:border-[#FFD700] transition-colors"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8B8B8F] mb-2">
                      Handle
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6F]">@</span>
                      <input
                        type="text"
                        value={profile.handle}
                        onChange={(e) => setProfile(prev => ({ ...prev, handle: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') }))}
                        placeholder="yourhandle"
                        className="w-full pl-8 pr-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white placeholder-[#6B6B6F] focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8B8B8F] mb-2">
                      Pronouns (optional)
                    </label>
                    <input
                      type="text"
                      value={profile.pronouns}
                      onChange={(e) => setProfile(prev => ({ ...prev, pronouns: e.target.value }))}
                      placeholder="she/her, he/him, they/them, etc."
                      className="w-full px-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white placeholder-[#6B6B6F] focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8B8B8F] mb-2">
                      Bio (optional)
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us a bit about yourself..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white placeholder-[#6B6B6F] focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Academic */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#8B8B8F] mb-2">
                      Graduation Year *
                    </label>
                    <select
                      value={profile.graduationYear}
                      onChange={(e) => setProfile(prev => ({ ...prev, graduationYear: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white focus:outline-none focus:border-[#FFD700] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#1A1A1B]">Select your graduation year</option>
                      {getGraduationYears().map(year => (
                        <option key={year.value} value={year.value} className="bg-[#1A1A1B]">
                          {year.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8B8B8F] mb-2">
                      Major *
                    </label>
                    <select
                      value={profile.major}
                      onChange={(e) => setProfile(prev => ({ ...prev, major: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white focus:outline-none focus:border-[#FFD700] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#1A1A1B]">Select your major</option>
                      {UB_MAJORS.map(major => (
                        <option key={major.value} value={major.value} className="bg-[#1A1A1B]">
                          {major.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8B8B8F] mb-2">
                      Minor (optional)
                    </label>
                    <input
                      type="text"
                      value={profile.minor}
                      onChange={(e) => setProfile(prev => ({ ...prev, minor: e.target.value }))}
                      placeholder="Enter your minor if applicable"
                      className="w-full px-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white placeholder-[#6B6B6F] focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8B8B8F] mb-2">
                      GPA (optional)
                    </label>
                    <input
                      type="text"
                      value={profile.gpa}
                      onChange={(e) => setProfile(prev => ({ ...prev, gpa: e.target.value }))}
                      placeholder="e.g., 3.75"
                      className="w-full px-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white placeholder-[#6B6B6F] focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Campus Life */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#8B8B8F] mb-2">
                      Where do you live? *
                    </label>
                    <select
                      value={profile.livingSituation}
                      onChange={(e) => setProfile(prev => ({ ...prev, livingSituation: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white focus:outline-none focus:border-[#FFD700] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#1A1A1B]">Select your living situation</option>
                      <optgroup label="North Campus" className="bg-[#1A1A1B]">
                        {UB_LIVING_SITUATIONS.filter(s => s.campus === 'North').map(situation => (
                          <option key={situation.value} value={situation.value} className="bg-[#1A1A1B]">
                            {situation.label}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="South Campus" className="bg-[#1A1A1B]">
                        {UB_LIVING_SITUATIONS.filter(s => s.campus === 'South').map(situation => (
                          <option key={situation.value} value={situation.value} className="bg-[#1A1A1B]">
                            {situation.label}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Off Campus" className="bg-[#1A1A1B]">
                        {UB_LIVING_SITUATIONS.filter(s => s.campus === 'Off').map(situation => (
                          <option key={situation.value} value={situation.value} className="bg-[#1A1A1B]">
                            {situation.label}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Other" className="bg-[#1A1A1B]">
                        {UB_LIVING_SITUATIONS.filter(s => s.campus === 'Commuter' || s.campus === 'Other').map(situation => (
                          <option key={situation.value} value={situation.value} className="bg-[#1A1A1B]">
                            {situation.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {profile.livingSituation && profile.livingSituation.includes('campus') && (
                    <div>
                      <label className="block text-sm font-medium text-[#8B8B8F] mb-2">
                        Room Number (optional)
                      </label>
                      <input
                        type="text"
                        value={profile.roomNumber}
                        onChange={(e) => setProfile(prev => ({ ...prev, roomNumber: e.target.value }))}
                        placeholder="e.g., Porter 312B"
                        className="w-full px-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white placeholder-[#6B6B6F] focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Interests */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[#8B8B8F]">
                      Select Your Interests (minimum 3, maximum 10)
                    </label>
                    <span className="text-xs text-[#6B6B6F]">
                      {profile.interests.length}/10 selected
                    </span>
                  </div>
                  
                  <div className="bg-[#1A1A1B] rounded-xl p-4 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {ALL_INTERESTS.map(interest => (
                        <button
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
                          className={`px-3 py-2 rounded-lg border text-sm text-left transition-all ${
                            profile.interests.includes(interest)
                              ? 'bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700]'
                              : 'bg-transparent border-[#2A2A2B] text-[#8B8B8F] hover:border-[#3A3A3B] disabled:opacity-50 disabled:cursor-not-allowed'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {profile.interests.includes(interest) && <Check className="h-3 w-3 flex-shrink-0" />}
                            <span className="truncate">{interest}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {profile.interests.length < 3 && (
                    <p className="text-xs text-[#FFD700]">
                      Please select at least 3 interests to continue
                    </p>
                  )}
                </div>
              )}

              {/* Step 5: Communities */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[#8B8B8F]">
                      Join Communities (recommended 3-5)
                    </label>
                    <span className="text-xs text-[#6B6B6F]">
                      {profile.joinedSpaces.length} selected
                    </span>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {UB_INITIAL_SPACES.map(space => (
                      <button
                        key={space.id}
                        onClick={() => {
                          if (profile.joinedSpaces.includes(space.id)) {
                            setProfile(prev => ({
                              ...prev,
                              joinedSpaces: prev.joinedSpaces.filter(s => s !== space.id)
                            }));
                          } else {
                            setProfile(prev => ({
                              ...prev,
                              joinedSpaces: [...prev.joinedSpaces, space.id]
                            }));
                          }
                        }}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          profile.joinedSpaces.includes(space.id)
                            ? 'bg-[#FFD700]/10 border-[#FFD700]'
                            : 'bg-[#1A1A1B] border-[#2A2A2B] hover:border-[#3A3A3B]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 ${
                            profile.joinedSpaces.includes(space.id) ? 'text-[#FFD700]' : 'text-[#6B6B6F]'
                          }`}>
                            {profile.joinedSpaces.includes(space.id) ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              <Users className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-medium ${
                                profile.joinedSpaces.includes(space.id) ? 'text-[#FFD700]' : 'text-white'
                              }`}>
                                {space.name}
                              </h4>
                              <span className="text-xs text-[#6B6B6F]">{space.memberCount}</span>
                            </div>
                            <p className="text-sm text-[#8B8B8F] mt-1">{space.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Goals */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[#8B8B8F]">
                      What are your goals? (select up to 5)
                    </label>
                    <span className="text-xs text-[#6B6B6F]">
                      {profile.goals.length}/5 selected
                    </span>
                  </div>
                  
                  <div className="bg-[#1A1A1B] rounded-xl p-4 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {UB_CAMPUS_GOALS.map(goal => (
                        <button
                          key={goal}
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
                          className={`px-3 py-2 rounded-lg border text-sm text-left transition-all ${
                            profile.goals.includes(goal)
                              ? 'bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700]'
                              : 'bg-transparent border-[#2A2A2B] text-[#8B8B8F] hover:border-[#3A3A3B] disabled:opacity-50 disabled:cursor-not-allowed'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {profile.goals.includes(goal) && <Check className="h-3 w-3 flex-shrink-0" />}
                            <span className="truncate">{goal}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: Preferences */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-[#8B8B8F] mb-4">
                      Notification Preferences
                    </h3>
                    <div className="space-y-3">
                      {Object.entries({
                        messages: 'Direct Messages',
                        events: 'Campus Events',
                        spaces: 'Community Updates',
                        academic: 'Academic Reminders'
                      }).map(([key, label]) => (
                        <label key={key} className="flex items-center justify-between p-3 bg-[#1A1A1B] rounded-lg cursor-pointer hover:bg-[#1F1F20] transition-colors">
                          <span className="text-white">{label}</span>
                          <input
                            type="checkbox"
                            checked={profile.notifications[key as keyof typeof profile.notifications]}
                            onChange={(e) => setProfile(prev => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                [key]: e.target.checked
                              }
                            }))}
                            className="w-4 h-4 rounded border-[#2A2A2B] bg-transparent text-[#FFD700] focus:ring-[#FFD700]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#8B8B8F] mb-4">
                      Profile Visibility
                    </h3>
                    <select
                      value={profile.visibility}
                      onChange={(e) => setProfile(prev => ({ ...prev, visibility: e.target.value }))}
                      className="w-full px-4 py-3 bg-[#1A1A1B] border border-[#2A2A2B] rounded-xl text-white focus:outline-none focus:border-[#FFD700] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="public" className="bg-[#1A1A1B]">Public - Anyone can see</option>
                      <option value="campus" className="bg-[#1A1A1B]">Campus Only - UB students only</option>
                      <option value="connections" className="bg-[#1A1A1B]">Connections - Your connections only</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 8: Complete */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/10 rounded-2xl p-8 text-center border border-[#FFD700]/30">
                    <div className="mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFD700] flex items-center justify-center mx-auto mb-4">
                        <Check className="w-10 h-10 text-black" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Welcome to HIVE, {profile.displayName}!
                      </h3>
                      <p className="text-[#C1C1C4]">
                        Your profile is ready. Let's explore your new campus community.
                      </p>
                    </div>
                    
                    <div className="space-y-3 text-left max-w-sm mx-auto">
                      <div className="flex items-center gap-3 text-sm text-[#C1C1C4]">
                        <Users className="w-4 h-4 text-[#FFD700]" />
                        <span>Joined {profile.joinedSpaces.length} communities</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#C1C1C4]">
                        <Heart className="w-4 h-4 text-[#FFD700]" />
                        <span>{profile.interests.length} interests selected</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#C1C1C4]">
                        <Target className="w-4 h-4 text-[#FFD700]" />
                        <span>{profile.goals.length} goals set</span>
                      </div>
                    </div>
                  </div>

                  {isSaving && (
                    <div className="flex items-center justify-center gap-2 text-[#FFD700]">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Setting up your dashboard...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 0
                    ? 'text-[#6B6B6F] cursor-not-allowed'
                    : 'text-[#8B8B8F] hover:text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              {currentStep === 8 ? (
                <button
                  onClick={handleComplete}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFD700] rounded-xl text-black font-medium hover:opacity-90 transition-all disabled:opacity-50"
                >
                  Enter HIVE
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    isStepValid()
                      ? 'bg-[#FFD700] text-black hover:opacity-90'
                      : 'bg-[#1A1A1B] text-[#6B6B6F] cursor-not-allowed'
                  }`}
                >
                  {currentStep === 0 ? 'Get Started' : 'Continue'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}