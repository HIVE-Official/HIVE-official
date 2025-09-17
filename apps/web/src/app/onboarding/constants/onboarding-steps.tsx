import React from 'react';
import { Sparkles, GraduationCap, User as UserIcon, Home, Target, Users, Heart, Check } from 'lucide-react';

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  progress: number;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
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
    subtitle: 'What gets you excited?',
    icon: <Heart className="h-5 w-5" />,
    progress: 70
  },
  {
    id: 'spaces',
    title: 'Join Communities',
    subtitle: 'Find your people',
    icon: <Users className="h-5 w-5" />,
    progress: 85
  },
  {
    id: 'complete',
    title: 'All Set!',
    subtitle: 'Welcome to your campus community',
    icon: <Check className="h-5 w-5" />,
    progress: 100
  }
];