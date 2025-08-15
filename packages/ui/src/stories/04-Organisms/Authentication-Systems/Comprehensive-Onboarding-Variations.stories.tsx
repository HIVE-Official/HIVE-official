import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { HiveProgress as Progress } from '../../components/hive-progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Switch } from '../../components/ui/switch';
import { Checkbox } from '../../components/ui/checkbox';
import { HiveTextarea as Textarea } from '../../components/hive-textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronRight,
  User,
  GraduationCap,
  Users,
  MapPin,
  Calendar,
  Heart,
  Star,
  Camera,
  Upload,
  Mail,
  Lock,
  Shield,
  Globe,
  Smartphone,
  BookOpen,
  Coffee,
  Music,
  Gamepad2,
  Palette,
  Code,
  Briefcase,
  Zap,
  Home,
  Building,
  Car,
  Plane,
  AlertCircle,
  CheckCircle,
  Info,
  Sparkles,
  Award,
  Target,
  Clock,
  UserPlus
} from 'lucide-react';

const meta: Meta = {
  title: '29-Comprehensive-Onboarding-Variations/Onboarding-System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Comprehensive Onboarding Variations

Complete onboarding system with tailored flows for different user types, campus integration,
personalization, and adaptive pathways for University at Buffalo students, faculty, and staff.

## Features Demonstrated

### User Type Variations
- **Freshman Students**: First-time college experience with campus orientation and social integration
- **Transfer Students**: Credit evaluation, major mapping, and community integration
- **Graduate Students**: Research focus, professional networking, and academic resources
- **Faculty Members**: Course management, research collaboration, and institutional tools
- **Staff Members**: Administrative access, department coordination, and campus services
- **International Students**: Visa support, cultural adaptation, and English language resources

### Adaptive Onboarding Features
- **Smart Step Progression**: Dynamic flow based on user responses and profile completion
- **Contextual Help**: Interactive tutorials and campus-specific guidance
- **Social Integration**: Friend discovery, group recommendations, and community building
- **Academic Planning**: Course selection, major requirements, and graduation tracking
- **Campus Navigation**: Building locations, service integration, and local resources

### UB-Specific Integration
- **Buffalo Weather Preparation**: Winter clothing recommendations and weather alerts
- **Campus Housing**: Dorm preferences, roommate matching, and move-in assistance
- **Dining Plans**: Meal preferences, dietary restrictions, and campus dining options
- **Transportation**: Stampede shuttle, parking permits, and Buffalo Metro integration
- **Local Community**: Buffalo attractions, internship opportunities, and city resources

### Personalization Engine
- **Interest-Based Matching**: Hobby alignment, study groups, and activity recommendations
- **Academic Focus Areas**: Major-specific resources, research opportunities, and career paths
- **Social Preferences**: Introvert/extrovert adaptation, group size preferences, and interaction styles
- **Accessibility Needs**: Screen reader support, mobility accommodations, and assistive technology
- **Cultural Background**: International student support, cultural groups, and language services
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Onboarding Context and Types
interface OnboardingState {
  currentStep: number;
  userType: 'freshman' | 'transfer' | 'graduate' | 'faculty' | 'staff' | 'international' | null;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    preferredName: string;
  };
  academicInfo: {
    major: string;
    year: string;
    previousInstitution?: string;
    expectedGraduation: string;
    academicInterests: string[];
  };
  campusPreferences: {
    housing: string;
    diningPlan: string;
    transportation: string[];
    activities: string[];
  };
  socialPreferences: {
    extroverted: boolean;
    studyGroupPreference: string;
    socialActivities: string[];
    communicationStyle: string;
  };
  accessibility: {
    needsAccommodations: boolean;
    accommodationTypes: string[];
    assistiveTechnology: string[];
  };
  internationalNeeds?: {
    visaStatus: string;
    englishProficiency: string;
    culturalSupport: boolean;
    previousUSExperience: boolean;
  };
  completionStatus: Record<string, boolean>;
}

interface OnboardingAction {
  type: 'SET_USER_TYPE' | 'UPDATE_PERSONAL_INFO' | 'UPDATE_ACADEMIC_INFO' | 
        'UPDATE_CAMPUS_PREFERENCES' | 'UPDATE_SOCIAL_PREFERENCES' | 
        'UPDATE_ACCESSIBILITY' | 'UPDATE_INTERNATIONAL' | 'NEXT_STEP' | 
        'PREVIOUS_STEP' | 'COMPLETE_STEP' | 'RESET';
  payload?: any;
}

const initialOnboardingState: OnboardingState = {
  currentStep: 0,
  userType: null,
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    preferredName: ''
  },
  academicInfo: {
    major: '',
    year: '',
    expectedGraduation: '',
    academicInterests: []
  },
  campusPreferences: {
    housing: '',
    diningPlan: '',
    transportation: [],
    activities: []
  },
  socialPreferences: {
    extroverted: true,
    studyGroupPreference: '',
    socialActivities: [],
    communicationStyle: ''
  },
  accessibility: {
    needsAccommodations: false,
    accommodationTypes: [],
    assistiveTechnology: []
  },
  completionStatus: {}
};

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return { ...state, userType: action.payload };
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case 'UPDATE_ACADEMIC_INFO':
      return { ...state, academicInfo: { ...state.academicInfo, ...action.payload } };
    case 'UPDATE_CAMPUS_PREFERENCES':
      return { ...state, campusPreferences: { ...state.campusPreferences, ...action.payload } };
    case 'UPDATE_SOCIAL_PREFERENCES':
      return { ...state, socialPreferences: { ...state.socialPreferences, ...action.payload } };
    case 'UPDATE_ACCESSIBILITY':
      return { ...state, accessibility: { ...state.accessibility, ...action.payload } };
    case 'UPDATE_INTERNATIONAL':
      return { ...state, internationalNeeds: { ...state.internationalNeeds, ...action.payload } };
    case 'NEXT_STEP':
      return { ...state, currentStep: Math.min(state.currentStep + 1, 8) };
    case 'PREVIOUS_STEP':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 0) };
    case 'COMPLETE_STEP':
      return { 
        ...state, 
        completionStatus: { ...state.completionStatus, [action.payload]: true }
      };
    case 'RESET':
      return initialOnboardingState;
    default:
      return state;
  }
}

const OnboardingContext = createContext<{
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
} | null>(null);

// UB-Specific Data
const ubSpecificData = {
  majors: [
    'Computer Science', 'Engineering', 'Business Administration', 'Psychology',
    'Biology', 'Mathematics', 'English', 'Political Science', 'Economics',
    'Architecture', 'Medicine', 'Law', 'Nursing', 'Education', 'Social Work'
  ],
  housingOptions: [
    'Ellicott Complex', 'Governors Complex', 'South Campus Apartments',
    'Hadley Village', 'Creekside Village', 'Flint Loop', 'Off-Campus'
  ],
  diningPlans: [
    'Unlimited Plus', 'Unlimited', '14 Meals + $300', '10 Meals + $500',
    'Declining Balance Only', 'Commuter Plan'
  ],
  campusActivities: [
    'Greek Life', 'Student Government', 'Club Sports', 'Research Groups',
    'Cultural Organizations', 'Academic Clubs', 'Volunteer Services',
    'Arts & Music', 'Technology Clubs', 'Honor Societies'
  ],
  buffaloResources: [
    'Downtown Buffalo Attractions', 'Elmwood Village', 'Buffalo Bills Games',
    'Local Restaurants', 'Internship Opportunities', 'Public Transportation',
    'Winter Activities', 'Cultural Events', 'Nightlife', 'Outdoor Recreation'
  ]
};

// Onboarding Step Components
function UserTypeSelection({ state, dispatch }: { 
  state: OnboardingState; 
  dispatch: React.Dispatch<OnboardingAction>; 
}) {
  const userTypes = [
    {
      type: 'freshman',
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Freshman Student',
      description: 'First-time college student ready to start your UB journey',
      features: ['Campus orientation', 'Social integration', 'Academic planning', 'Dorm life prep']
    },
    {
      type: 'transfer',
      icon: <ArrowRight className="h-8 w-8" />,
      title: 'Transfer Student',
      description: 'Bringing credits from another institution to UB',
      features: ['Credit evaluation', 'Major mapping', 'Community integration', 'Academic advising']
    },
    {
      type: 'graduate',
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Graduate Student',
      description: 'Pursuing advanced degrees and research at UB',
      features: ['Research focus', 'Professional networking', 'TA opportunities', 'Career development']
    },
    {
      type: 'international',
      icon: <Globe className="h-8 w-8" />,
      title: 'International Student',
      description: 'Coming to UB from another country',
      features: ['Visa support', 'Cultural adaptation', 'Language resources', 'Immigration guidance']
    },
    {
      type: 'faculty',
      icon: <Users className="h-8 w-8" />,
      title: 'Faculty Member',
      description: 'Teaching and research professional at UB',
      features: ['Course management', 'Research tools', 'Faculty resources', 'Administrative access']
    },
    {
      type: 'staff',
      icon: <Briefcase className="h-8 w-8" />,
      title: 'Staff Member',
      description: 'Administrative and support professional at UB',
      features: ['Department tools', 'Administrative systems', 'Campus services', 'Staff resources']
    }
  ] as const;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to HIVE!</h2>
        <p className="text-lg text-gray-600">
          Let's personalize your University at Buffalo experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userTypes.map((userType) => (
          <Card 
            key={userType.type}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              state.userType === userType.type 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-md'
            }`}
            onClick={() => dispatch({ type: 'SET_USER_TYPE', payload: userType.type })}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  state.userType === userType.type 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {userType.icon}
                </div>
                <h3 className="font-semibold text-lg">{userType.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{userType.description}</p>
              
              <ul className="space-y-2">
                {userType.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {state.userType && (
        <div className="flex justify-center">
          <Button onClick={() => dispatch({ type: 'NEXT_STEP' })} className="bg-blue-600 hover:bg-blue-700">
            Continue as {state.userType.charAt(0).toUpperCase() + state.userType.slice(1)}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function PersonalInformation({ state, dispatch }: { 
  state: OnboardingState; 
  dispatch: React.Dispatch<OnboardingAction>; 
}) {
  const handleInputChange = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { [field]: value } });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">
          Help us set up your HIVE profile with basic information
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={state.personalInfo.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={state.personalInfo.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="preferredName">Preferred Name</Label>
            <Input
              id="preferredName"
              value={state.personalInfo.preferredName}
              onChange={(e) => handleInputChange('preferredName', e.target.value)}
              placeholder="What would you like to be called?"
            />
          </div>

          <div>
            <Label htmlFor="email">UB Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={state.personalInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="yourname@buffalo.edu"
            />
            <p className="text-sm text-gray-500 mt-1">
              Must be a valid @buffalo.edu email address
            </p>
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={state.personalInfo.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="(716) 123-4567"
            />
          </div>

          {state.userType === 'international' && (
            <Alert>
              <Globe className="h-4 w-4" />
              <AlertDescription>
                As an international student, you'll have additional steps for visa verification 
                and cultural orientation resources.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => dispatch({ type: 'PREVIOUS_STEP' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={() => dispatch({ type: 'NEXT_STEP' })}
          disabled={!state.personalInfo.firstName || !state.personalInfo.lastName || !state.personalInfo.email}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function AcademicInformation({ state, dispatch }: { 
  state: OnboardingState; 
  dispatch: React.Dispatch<OnboardingAction>; 
}) {
  const handleInputChange = (field: string, value: string | string[]) => {
    dispatch({ type: 'UPDATE_ACADEMIC_INFO', payload: { [field]: value } });
  };

  const handleInterestToggle = (interest: string) => {
    const currentInterests = state.academicInfo.academicInterests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    
    handleInputChange('academicInterests', newInterests);
  };

  const academicInterests = [
    'Research', 'Internships', 'Study Abroad', 'Honors Program', 
    'Graduate School', 'Professional Development', 'Leadership',
    'Entrepreneurship', 'Community Service', 'Cultural Activities'
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic Information</h2>
        <p className="text-gray-600">
          Tell us about your academic journey and goals at UB
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <Label htmlFor="major">Major/Program *</Label>
            <Select 
              value={state.academicInfo.major} 
              onValueChange={(value) => handleInputChange('major', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your major" />
              </SelectTrigger>
              <SelectContent>
                {ubSpecificData.majors.map((major) => (
                  <SelectItem key={major} value={major}>
                    {major}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(state.userType === 'freshman' || state.userType === 'transfer' || state.userType === 'international') && (
            <div>
              <Label htmlFor="year">Academic Year *</Label>
              <Select 
                value={state.academicInfo.year} 
                onValueChange={(value) => handleInputChange('year', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freshman">Freshman</SelectItem>
                  <SelectItem value="sophomore">Sophomore</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {state.userType === 'transfer' && (
            <div>
              <Label htmlFor="previousInstitution">Previous Institution</Label>
              <Input
                id="previousInstitution"
                value={state.academicInfo.previousInstitution || ''}
                onChange={(e) => handleInputChange('previousInstitution', e.target.value)}
                placeholder="Name of your previous college/university"
              />
            </div>
          )}

          <div>
            <Label htmlFor="expectedGraduation">Expected Graduation</Label>
            <Select 
              value={state.academicInfo.expectedGraduation} 
              onValueChange={(value) => handleInputChange('expectedGraduation', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Expected graduation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring2025">Spring 2025</SelectItem>
                <SelectItem value="fall2025">Fall 2025</SelectItem>
                <SelectItem value="spring2026">Spring 2026</SelectItem>
                <SelectItem value="fall2026">Fall 2026</SelectItem>
                <SelectItem value="spring2027">Spring 2027</SelectItem>
                <SelectItem value="fall2027">Fall 2027</SelectItem>
                <SelectItem value="spring2028">Spring 2028</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Academic Interests (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {academicInterests.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={state.academicInfo.academicInterests.includes(interest)}
                    onCheckedChange={() => handleInterestToggle(interest)}
                  />
                  <Label htmlFor={interest} className="text-sm">{interest}</Label>
                </div>
              ))}
            </div>
          </div>

          {state.userType === 'graduate' && (
            <Alert>
              <BookOpen className="h-4 w-4" />
              <AlertDescription>
                Graduate students will have access to research collaboration tools, 
                TA management systems, and professional development resources.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => dispatch({ type: 'PREVIOUS_STEP' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={() => dispatch({ type: 'NEXT_STEP' })}
          disabled={!state.academicInfo.major}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function CampusLifePreferences({ state, dispatch }: { 
  state: OnboardingState; 
  dispatch: React.Dispatch<OnboardingAction>; 
}) {
  const handlePreferenceChange = (field: string, value: string | string[]) => {
    dispatch({ type: 'UPDATE_CAMPUS_PREFERENCES', payload: { [field]: value } });
  };

  const handleActivityToggle = (activity: string) => {
    const currentActivities = state.campusPreferences.activities;
    const newActivities = currentActivities.includes(activity)
      ? currentActivities.filter(a => a !== activity)
      : [...currentActivities, activity];
    
    handlePreferenceChange('activities', newActivities);
  };

  const handleTransportationToggle = (transport: string) => {
    const currentTransport = state.campusPreferences.transportation;
    const newTransport = currentTransport.includes(transport)
      ? currentTransport.filter(t => t !== transport)
      : [...currentTransport, transport];
    
    handlePreferenceChange('transportation', newTransport);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Campus Life Preferences</h2>
        <p className="text-gray-600">
          Help us customize your UB experience based on your lifestyle
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {(state.userType === 'freshman' || state.userType === 'transfer' || state.userType === 'international') && (
            <div>
              <Label htmlFor="housing">Housing Preference</Label>
              <Select 
                value={state.campusPreferences.housing} 
                onValueChange={(value) => handlePreferenceChange('housing', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select housing option" />
                </SelectTrigger>
                <SelectContent>
                  {ubSpecificData.housingOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(state.userType === 'freshman' || state.userType === 'transfer' || state.userType === 'international') && (
            <div>
              <Label htmlFor="diningPlan">Dining Plan</Label>
              <Select 
                value={state.campusPreferences.diningPlan} 
                onValueChange={(value) => handlePreferenceChange('diningPlan', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dining plan" />
                </SelectTrigger>
                <SelectContent>
                  {ubSpecificData.diningPlans.map((plan) => (
                    <SelectItem key={plan} value={plan}>
                      {plan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label>Transportation Methods (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['Walking', 'Bicycle', 'Stampede Shuttle', 'Personal Car', 'Carpool', 'Public Transit'].map((transport) => (
                <div key={transport} className="flex items-center space-x-2">
                  <Checkbox
                    id={transport}
                    checked={state.campusPreferences.transportation.includes(transport)}
                    onCheckedChange={() => handleTransportationToggle(transport)}
                  />
                  <Label htmlFor={transport} className="text-sm">{transport}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Interested Campus Activities (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {ubSpecificData.campusActivities.map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox
                    id={activity}
                    checked={state.campusPreferences.activities.includes(activity)}
                    onCheckedChange={() => handleActivityToggle(activity)}
                  />
                  <Label htmlFor={activity} className="text-sm">{activity}</Label>
                </div>
              ))}
            </div>
          </div>

          <Alert>
            <MapPin className="h-4 w-4" />
            <AlertDescription>
              These preferences help us recommend spaces, events, and connections 
              that align with your campus lifestyle and interests.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => dispatch({ type: 'PREVIOUS_STEP' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => dispatch({ type: 'NEXT_STEP' })}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SocialPreferencesStep({ state, dispatch }: { 
  state: OnboardingState; 
  dispatch: React.Dispatch<OnboardingAction>; 
}) {
  const handleSocialChange = (field: string, value: boolean | string | string[]) => {
    dispatch({ type: 'UPDATE_SOCIAL_PREFERENCES', payload: { [field]: value } });
  };

  const handleSocialActivityToggle = (activity: string) => {
    const currentActivities = state.socialPreferences.socialActivities;
    const newActivities = currentActivities.includes(activity)
      ? currentActivities.filter(a => a !== activity)
      : [...currentActivities, activity];
    
    handleSocialChange('socialActivities', newActivities);
  };

  const socialActivities = [
    'Study Groups', 'Campus Events', 'Sports & Recreation', 'Gaming',
    'Arts & Culture', 'Volunteer Work', 'Professional Networking',
    'Casual Hangouts', 'Party/Social Events', 'Outdoor Activities'
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Social Preferences</h2>
        <p className="text-gray-600">
          Help us understand how you like to connect and socialize
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label>Social Energy Style</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Card 
                className={`cursor-pointer transition-all ${
                  state.socialPreferences.extroverted 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleSocialChange('extroverted', true)}
              >
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-medium">More Extroverted</h3>
                  <p className="text-sm text-gray-500">Energized by group activities and meeting new people</p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${
                  !state.socialPreferences.extroverted 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => handleSocialChange('extroverted', false)}
              >
                <CardContent className="p-4 text-center">
                  <User className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-medium">More Introverted</h3>
                  <p className="text-sm text-gray-500">Prefer smaller groups and deeper connections</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Label htmlFor="studyGroupPreference">Study Group Preference</Label>
            <Select 
              value={state.socialPreferences.studyGroupPreference} 
              onValueChange={(value) => handleSocialChange('studyGroupPreference', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="How do you prefer to study?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alone">I prefer studying alone</SelectItem>
                <SelectItem value="small">Small groups (2-3 people)</SelectItem>
                <SelectItem value="medium">Medium groups (4-6 people)</SelectItem>
                <SelectItem value="large">Large study groups (7+ people)</SelectItem>
                <SelectItem value="varies">It varies by subject</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="communicationStyle">Communication Style</Label>
            <Select 
              value={state.socialPreferences.communicationStyle} 
              onValueChange={(value) => handleSocialChange('communicationStyle', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="How do you prefer to communicate?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="face-to-face">Face-to-face conversations</SelectItem>
                <SelectItem value="text">Text messaging</SelectItem>
                <SelectItem value="voice">Voice calls</SelectItem>
                <SelectItem value="video">Video calls</SelectItem>
                <SelectItem value="mixed">Mix of all methods</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Social Activities You Enjoy (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {socialActivities.map((activity) => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox
                    id={activity}
                    checked={state.socialPreferences.socialActivities.includes(activity)}
                    onCheckedChange={() => handleSocialActivityToggle(activity)}
                  />
                  <Label htmlFor={activity} className="text-sm">{activity}</Label>
                </div>
              ))}
            </div>
          </div>

          <Alert>
            <Heart className="h-4 w-4" />
            <AlertDescription>
              These preferences help us suggest compatible friends, study partners, 
              and social spaces that match your personality and interests.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => dispatch({ type: 'PREVIOUS_STEP' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => dispatch({ type: 'NEXT_STEP' })}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function AccessibilityNeeds({ state, dispatch }: { 
  state: OnboardingState; 
  dispatch: React.Dispatch<OnboardingAction>; 
}) {
  const handleAccessibilityChange = (field: string, value: boolean | string[]) => {
    dispatch({ type: 'UPDATE_ACCESSIBILITY', payload: { [field]: value } });
  };

  const handleAccommodationToggle = (accommodation: string) => {
    const current = state.accessibility.accommodationTypes;
    const updated = current.includes(accommodation)
      ? current.filter(a => a !== accommodation)
      : [...current, accommodation];
    
    handleAccessibilityChange('accommodationTypes', updated);
  };

  const handleTechnologyToggle = (tech: string) => {
    const current = state.accessibility.assistiveTechnology;
    const updated = current.includes(tech)
      ? current.filter(t => t !== tech)
      : [...current, tech];
    
    handleAccessibilityChange('assistiveTechnology', updated);
  };

  const accommodationTypes = [
    'Extended Time for Exams', 'Note-taking Assistance', 'Sign Language Interpreter',
    'Accessible Seating', 'Alternative Format Materials', 'Mobility Accommodations',
    'Hearing Accommodations', 'Vision Accommodations', 'Learning Disability Support',
    'Mental Health Accommodations'
  ];

  const assistiveTechnologies = [
    'Screen Reader', 'Voice Recognition Software', 'Magnification Software',
    'Alternative Keyboards', 'Communication Devices', 'Mobility Aids',
    'Hearing Aids/FM Systems', 'Braille Display', 'Switch Access', 'Eye Tracking'
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Accessibility & Support</h2>
        <p className="text-gray-600">
          Help us ensure HIVE works perfectly for your needs
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <Switch
              id="needsAccommodations"
              checked={state.accessibility.needsAccommodations}
              onCheckedChange={(checked) => handleAccessibilityChange('needsAccommodations', checked)}
            />
            <Label htmlFor="needsAccommodations" className="text-base">
              I need accessibility accommodations or support
            </Label>
          </div>

          {state.accessibility.needsAccommodations && (
            <>
              <div>
                <Label>Types of Accommodations (Select all that apply)</Label>
                <div className="grid grid-cols-1 gap-2 mt-2 max-h-48 overflow-y-auto">
                  {accommodationTypes.map((accommodation) => (
                    <div key={accommodation} className="flex items-center space-x-2">
                      <Checkbox
                        id={accommodation}
                        checked={state.accessibility.accommodationTypes.includes(accommodation)}
                        onCheckedChange={() => handleAccommodationToggle(accommodation)}
                      />
                      <Label htmlFor={accommodation} className="text-sm">{accommodation}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Assistive Technology (Select all that apply)</Label>
                <div className="grid grid-cols-1 gap-2 mt-2 max-h-48 overflow-y-auto">
                  {assistiveTechnologies.map((tech) => (
                    <div key={tech} className="flex items-center space-x-2">
                      <Checkbox
                        id={tech}
                        checked={state.accessibility.assistiveTechnology.includes(tech)}
                        onCheckedChange={() => handleTechnologyToggle(tech)}
                      />
                      <Label htmlFor={tech} className="text-sm">{tech}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              UB's Accessibility Services office provides comprehensive support. 
              All accommodation information is kept confidential and only shared 
              with relevant academic personnel as needed.
            </AlertDescription>
          </Alert>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Contact Information</h4>
            <p className="text-sm text-blue-800">
              Accessibility Services<br />
              Phone: (716) 645-2608<br />
              Email: stu-accessibility@buffalo.edu<br />
              Location: 25 Capen Hall
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => dispatch({ type: 'PREVIOUS_STEP' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => dispatch({ type: 'NEXT_STEP' })}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function InternationalStudentNeeds({ state, dispatch }: { 
  state: OnboardingState; 
  dispatch: React.Dispatch<OnboardingAction>; 
}) {
  const handleInternationalChange = (field: string, value: string | boolean) => {
    dispatch({ type: 'UPDATE_INTERNATIONAL', payload: { [field]: value } });
  };

  if (state.userType !== 'international') {
    dispatch({ type: 'NEXT_STEP' });
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">International Student Support</h2>
        <p className="text-gray-600">
          Additional resources and support for your transition to UB
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="visaStatus">Visa Status</Label>
            <Select 
              value={state.internationalNeeds?.visaStatus || ''} 
              onValueChange={(value) => handleInternationalChange('visaStatus', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your visa status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="f1">F-1 Student Visa</SelectItem>
                <SelectItem value="j1">J-1 Exchange Visa</SelectItem>
                <SelectItem value="h1b">H-1B Work Visa</SelectItem>
                <SelectItem value="greencard">Green Card/Permanent Resident</SelectItem>
                <SelectItem value="citizen">US Citizen</SelectItem>
                <SelectItem value="other">Other/Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="englishProficiency">English Proficiency Level</Label>
            <Select 
              value={state.internationalNeeds?.englishProficiency || ''} 
              onValueChange={(value) => handleInternationalChange('englishProficiency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Rate your English proficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="native">Native/Fluent</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="support">Need language support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              id="culturalSupport"
              checked={state.internationalNeeds?.culturalSupport || false}
              onCheckedChange={(checked) => handleInternationalChange('culturalSupport', checked)}
            />
            <Label htmlFor="culturalSupport" className="text-base">
              I'm interested in cultural support and community connections
            </Label>
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              id="previousUSExperience"
              checked={state.internationalNeeds?.previousUSExperience || false}
              onCheckedChange={(checked) => handleInternationalChange('previousUSExperience', checked)}
            />
            <Label htmlFor="previousUSExperience" className="text-base">
              I have previous experience living/studying in the US
            </Label>
          </div>

          <Alert>
            <Globe className="h-4 w-4" />
            <AlertDescription>
              UB's International Student Services provides comprehensive support including
              visa guidance, cultural programming, and academic adjustment assistance.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">International Student Services</h4>
              <p className="text-sm text-green-800">
                Phone: (716) 645-2258<br />
                Email: intlservices@buffalo.edu<br />
                Location: 201 Talbert Hall
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">English Language Institute</h4>
              <p className="text-sm text-purple-800">
                Phone: (716) 645-2077<br />
                Email: eli-info@buffalo.edu<br />
                Location: 318 Baldy Hall
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => dispatch({ type: 'PREVIOUS_STEP' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => dispatch({ type: 'NEXT_STEP' })}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function OnboardingCompletion({ state, dispatch }: { 
  state: OnboardingState; 
  dispatch: React.Dispatch<OnboardingAction>; 
}) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    setIsCompleting(true);
    // Simulate completion process
    setTimeout(() => {
      setIsCompleting(false);
      // Redirect to dashboard would happen here
    }, 2000);
  };

  const getPersonalizedWelcome = () => {
    const name = state.personalInfo.preferredName || state.personalInfo.firstName;
    const userTypeMessages = {
      freshman: `Welcome to UB, ${name}! Get ready for an amazing college journey.`,
      transfer: `Welcome ${name}! We're excited to have you continue your academic journey at UB.`,
      graduate: `Welcome ${name}! Your graduate experience at UB starts now.`,
      international: `Welcome to UB and the United States, ${name}! We're here to support your journey.`,
      faculty: `Welcome to the UB community, ${name}! Ready to inspire the next generation?`,
      staff: `Welcome to the UB team, ${name}! Thank you for supporting our campus community.`
    };

    return userTypeMessages[state.userType || 'freshman'];
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    // Housing-based recommendations
    if (state.campusPreferences.housing === 'Ellicott Complex') {
      recommendations.push('Join the Ellicott Community space for dorm events and coordination');
    }
    
    // Major-based recommendations
    if (state.academicInfo.major === 'Computer Science') {
      recommendations.push('Check out the CS Club and Hackathon Planning spaces');
    }
    
    // Social preference-based recommendations
    if (state.socialPreferences.extroverted) {
      recommendations.push('Explore large group spaces and campus-wide events');
    } else {
      recommendations.push('Look for smaller study groups and intimate community spaces');
    }
    
    // Activity-based recommendations
    if (state.campusPreferences.activities.includes('Greek Life')) {
      recommendations.push('Connect with Greek organizations during rush periods');
    }
    
    return recommendations;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isCompleting ? 'Setting up your account...' : 'Welcome to HIVE!'}
        </h2>
        <p className="text-lg text-gray-600">
          {getPersonalizedWelcome()}
        </p>
      </div>

      {!isCompleting && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {getRecommendations().map((recommendation, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Target className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Explore Spaces</h4>
                  <p className="text-sm text-blue-800">Find communities that match your interests</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-1">Build Your Profile</h4>
                  <p className="text-sm text-green-800">Complete your profile and add a photo</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-1">Connect with Peers</h4>
                  <p className="text-sm text-purple-800">Find classmates and potential study partners</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-1">Create Your First Tool</h4>
                  <p className="text-sm text-orange-800">Try the tool builder for your academic needs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              You can always update these preferences later in your account settings. 
              HIVE learns and adapts to your usage patterns to provide better recommendations.
            </AlertDescription>
          </Alert>
        </>
      )}

      {isCompleting && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-pulse space-y-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full mx-auto"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">Creating your personalized HIVE experience...</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => dispatch({ type: 'PREVIOUS_STEP' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {!isCompleting && (
          <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
            Complete Setup
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialOnboardingState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
}

// Main Onboarding System Component
function ComprehensiveOnboardingSystem() {
  return (
    <OnboardingProvider>
      <OnboardingFlow />
    </OnboardingProvider>
  );
}

function OnboardingFlow() {
  const context = useContext(OnboardingContext);
  if (!context) return null;

  const { state, dispatch } = context;

  const steps = [
    'User Type',
    'Personal Info',
    'Academic Info', 
    'Campus Life',
    'Social Preferences',
    'Accessibility',
    ...(state.userType === 'international' ? ['International Support'] : []),
    'Complete'
  ];

  const currentStepIndex = state.currentStep;
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Progress Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold text-gray-900">HIVE Onboarding</h1>
            <Badge variant="outline">
              Step {currentStepIndex + 1} of {steps.length}
            </Badge>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600">
              {steps[currentStepIndex]} • {Math.round(progress)}% Complete
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {currentStepIndex === 0 && <UserTypeSelection state={state} dispatch={dispatch} />}
          {currentStepIndex === 1 && <PersonalInformation state={state} dispatch={dispatch} />}
          {currentStepIndex === 2 && <AcademicInformation state={state} dispatch={dispatch} />}
          {currentStepIndex === 3 && <CampusLifePreferences state={state} dispatch={dispatch} />}
          {currentStepIndex === 4 && <SocialPreferencesStep state={state} dispatch={dispatch} />}
          {currentStepIndex === 5 && <AccessibilityNeeds state={state} dispatch={dispatch} />}
          {currentStepIndex === 6 && state.userType === 'international' && <InternationalStudentNeeds state={state} dispatch={dispatch} />}
          {((currentStepIndex === 6 && state.userType !== 'international') || currentStepIndex === 7) && <OnboardingCompletion state={state} dispatch={dispatch} />}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 mt-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-sm text-gray-500">
          <span>© 2025 HIVE - University at Buffalo</span>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Need Help?</Button>
            <Button variant="ghost" size="sm">Privacy Policy</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Story Exports
export const ComprehensiveOnboardingSystemDemo: Story = {
  render: () => <ComprehensiveOnboardingSystem />,
  parameters: {
    docs: {
      description: {
        story: `
Complete onboarding system with personalized flows for different user types, 
adaptive progression, and comprehensive UB campus integration.
        `,
      },
    },
  },
};

export const FreshmanOnboardingFlow: Story = {
  render: () => (
    <OnboardingProvider>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Freshman Student Onboarding</h2>
        <UserTypeSelection 
          state={{...initialOnboardingState, userType: 'freshman'}} 
          dispatch={() => {}} 
        />
      </div>
    </OnboardingProvider>
  ),
};

export const InternationalStudentFlow: Story = {
  render: () => (
    <OnboardingProvider>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">International Student Support</h2>
        <InternationalStudentNeeds 
          state={{...initialOnboardingState, userType: 'international'}} 
          dispatch={() => {}} 
        />
      </div>
    </OnboardingProvider>
  ),
};

export const AccessibilityOnboardingStep: Story = {
  render: () => (
    <OnboardingProvider>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Accessibility & Support</h2>
        <AccessibilityNeeds 
          state={{...initialOnboardingState, accessibility: { needsAccommodations: true, accommodationTypes: [], assistiveTechnology: [] }}} 
          dispatch={() => {}} 
        />
      </div>
    </OnboardingProvider>
  ),
};

export const OnboardingCompletionDemo: Story = {
  render: () => (
    <OnboardingProvider>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Onboarding Complete</h2>
        <OnboardingCompletion 
          state={{
            ...initialOnboardingState, 
            userType: 'freshman',
            personalInfo: { ...initialOnboardingState.personalInfo, firstName: 'Sarah', preferredName: 'Sarah' },
            academicInfo: { ...initialOnboardingState.academicInfo, major: 'Computer Science' }
          }} 
          dispatch={() => {}} 
        />
      </div>
    </OnboardingProvider>
  ),
};