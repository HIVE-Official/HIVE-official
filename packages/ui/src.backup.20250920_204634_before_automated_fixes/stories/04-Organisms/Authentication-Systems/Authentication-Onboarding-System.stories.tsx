import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Progress } from '../../../components/ui/progress';
import { Separator } from '../../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Checkbox } from '../../../components/ui/checkbox';
import { Textarea } from '../../../components/ui/textarea';
import { 
  Mail, 
  Lock, 
  User, 
  Camera, 
  MapPin, 
  GraduationCap, 
  Calendar,
  School,
  Users,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  Eye,
  EyeOff,
  Smartphone;
} from 'lucide-react';

/**
 * # HIVE Authentication & Onboarding System;
 * 
 * Complete authentication flows and student onboarding system for the HIVE campus social utility platform.
 * Features UB-specific email validation, multi-step onboarding wizard, and mobile-optimized user experience.
 * 
 * ## Key Features:
 * - **Magic Link Authentication**: Passwordless login with @buffalo.edu email verification;
 * - **Progressive Onboarding**: 7-step wizard collecting essential student information;
 * - **UB Campus Integration**: Dorm selection, major validation, academic year tracking;
 * - **Profile Customization**: Photo upload, bio creation, privacy settings;
 * - **Mobile-First Design**: Touch-optimized for campus mobile usage;
 * - **Social Onboarding**: Immediate space suggestions and connection opportunities;
 */

const meta: Meta = {
  title: '10-Live Frontend/Authentication & Onboarding System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete authentication and onboarding system for UB students joining HIVE'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Authentication State Management;
const useAuth = (initialState = 'login') => {
  const [authState, setAuthState] = useState(initialState);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSubmit = async () => {
    setIsLoading(true);
    // Simulate API call;
    setTimeout(() => {
      if (email.endsWith('@buffalo.edu')) {
        setAuthState('verify')
      }}
      setIsLoading(false)
    }, 1500)
  };

  return {
    authState,
    setAuthState,
    email,
    setEmail,
    isLoading,
    setIsLoading,
    verificationCode,
    setVerificationCode,
    showPassword,
    setShowPassword,
    handleEmailSubmit;
  }
};

// Onboarding State Management;
const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({userType: '',
    firstName: '',
    lastName: '',
    handle: '',
    profilePhoto: null as string | null,
    bio: '',
    graduationYear: '',
    major: '',
    dorm: '',
    interests: [] as string[],
    privacy: {
      profileVisible: true,
      allowMessages: true,
      showActivity: true; })}
  });

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }}
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }}
  };

  const updateUserData = (field: string, value: any) => {
    setUserData(prev => ({
      ...prev,
      [field]: value;
    }))
  };

  return {
    currentStep,
    setCurrentStep,
    userData,
    updateUserData,
    totalSteps,
    progress,
    nextStep,
    prevStep;
  }
};

// Mock UB Data;
const UB_DATA = {
  dorms: [
    { value: 'ellicott', label: 'Ellicott Complex' },
    { value: 'governors', label: 'Governors Complex' },
    { value: 'south-campus', label: 'South Campus Apartments' },
    { value: 'flint-loop', label: 'Flint Loop' },
    { value: 'creekside', label: 'Creekside Village' },
    { value: 'hadley', label: 'Hadley Village' },
    { value: 'off-campus', label: 'Off Campus' },
    { value: 'commuter', label: 'Commuter' }
  ],
  majors: [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'business', label: 'Business Administration' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'pre-med', label: 'Pre-Medicine' },
    { value: 'architecture', label: 'Architecture' },
    { value: 'undecided', label: 'Undecided' }
  ],
  interests: [
    'Study Groups', 'Intramural Sports', 'Greek Life', 'Music',
    'Photography', 'Gaming', 'Fitness', 'Volunteering',
    'Art', 'Technology', 'Cooking', 'Travel',
    'Writing', 'Theater', 'Environment', 'Politics'
  ]
};

// Login Component;
const LoginScreen = ({ auth }: { auth: ReturnType<typeof useAuth> }) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-4">
    <div className="w-full max-w-md space-y-6">
      {/* Logo */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 text-black font-bold text-xl mb-4">
          H;
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome to HIVE</h1>
        <p className="text-gray-400 mt-2">The social utility platform for UB students</p>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-white">Sign in to your account</CardTitle>
          <CardDescription className="text-gray-400">
            Use your @buffalo.edu email to get started;
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">University Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input;
                id="email"
                type="email"
                placeholder="your.name@buffalo.edu"
                value={auth.email}
                onChange={(e) => auth.setEmail(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <Button;
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
            onClick={auth.handleEmailSubmit}
            disabled={auth.isLoading || !auth.email.endsWith('@buffalo.edu')}
          >
            {auth.isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Sending magic link...</span>
              </div>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Magic Link;
              </>
            )}
          </Button>

          {auth.email && !auth.email.endsWith('@buffalo.edu') && (
            <p className="text-red-400 text-sm text-center">
              Only @buffalo.edu emails are accepted;
            </p>
          )}

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Don't have a UB email? Join our waitlist for other universities.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Mobile App Prompt */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Smartphone className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-white font-medium">Mobile Optimized</p>
              <p className="text-gray-400 text-sm">Works great on your phone</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Email Verification Component;
const VerificationScreen = ({ auth }: { auth: ReturnType<typeof useAuth> }) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-4">
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 text-black font-bold text-xl mb-4">
          <Mail className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">Check Your Email</h1>
        <p className="text-gray-400 mt-2">
          We sent a magic link to <span className="text-yellow-500">{auth.email}</span>
        </p>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6 space-y-4">
          <div className="text-center space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="text-white font-medium">Email Sent!</p>
              <p className="text-gray-400 text-sm">Click the link in your email to continue</p>
            </div>

            <div className="space-y-2 text-left">
              <p className="text-white font-medium">What's next?</p>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>• Check your UB email inbox</li>
                <li>• Click the "Sign in to HIVE" link</li>
                <li>• Complete your student profile</li>
                <li>• Start connecting with UB students</li>
              </ul>
            </div>

            <Button;
              variant="outline" 
              className="w-full border-gray-700 text-gray-300 hover:text-white"
              onClick={() => auth.setAuthState('onboarding')}
            >
              Continue to Demo Onboarding;
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button;
          variant="link" 
          className="text-gray-500 hover:text-gray-300"
          onClick={() => auth.setAuthState('login')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login;
        </Button>
      </div>
    </div>
  </div>
);

// Onboarding Step 1: User Type;
const Step1UserType = ({ onboarding }: { onboarding: ReturnType<typeof useOnboarding> }) => {
  const userTypes = [
    {
      type: 'student',
      title: 'Student',
      description: 'I\'m here to connect with classmates and campus life',
      icon: GraduationCap;
    },
    {
      type: 'faculty',
      title: 'Faculty/Staff',
      description: 'I work at UB and want to connect with the campus community',
      icon: School;
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to UB HIVE!</h2>
        <p className="text-gray-400">Let's set up your profile. What best describes you?</p>
      </div>

      <div className="space-y-3">
        {userTypes.map((type) => (
          <Card;
            key={type.type}
            className={`cursor-pointer transition-all border-2 ${
              onboarding.userData.userType === type.type;
                ? 'border-yellow-500 bg-yellow-500/10'
                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
            }`}
            onClick={() => onboarding.updateUserData('userType', type.type)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  onboarding.userData.userType === type.type;
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  <type.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{type.title}</h3>
                  <p className="text-sm text-gray-400">{type.description}</p>
                </div>
                {onboarding.userData.userType === type.type && (
                  <CheckCircle className="h-6 w-6 text-yellow-500" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};

// Onboarding Step 2: Basic Info;
const Step2BasicInfo = ({ onboarding }: { onboarding: ReturnType<typeof useOnboarding> }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
      <p className="text-gray-400">Tell us about yourself</p>
    </div>

    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white">First Name</Label>
          <Input;
            value={onboarding.userData.firstName}
            onChange={(e) => onboarding.updateUserData('firstName', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Sarah"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Last Name</Label>
          <Input;
            value={onboarding.userData.lastName}
            onChange={(e) => onboarding.updateUserData('lastName', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Johnson"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Handle</Label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500">@</span>
          <Input;
            value={onboarding.userData.handle}
            onChange={(e) => onboarding.updateUserData('handle', e.target.value)}
            className="pl-8 bg-gray-800 border-gray-700 text-white"
            placeholder="sarah.johnson"
          />
        </div>
        <p className="text-xs text-gray-500">This is how other students will find you</p>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Bio (Optional)</Label>
        <Textarea;
          value={onboarding.userData.bio}
          onChange={(e) => onboarding.updateUserData('bio', e.target.value)}
          className="bg-gray-800 border-gray-700 text-white resize-none"
          rows={3}
          placeholder="Computer Science major, love hiking and trying new restaurants around Buffalo..."
          maxLength={150}
        />
        <p className="text-xs text-gray-500 text-right">
          {onboarding.userData.bio.length}/150 characters;
        </p>
      </div>
    </div>
  </div>
);

// Onboarding Step 3: Profile Photo;
const Step3ProfilePhoto = ({ onboarding }: { onboarding: ReturnType<typeof useOnboarding> }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Add Your Photo</h2>
      <p className="text-gray-400">Help classmates recognize you around campus</p>
    </div>

    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-32 h-32">
          <AvatarImage src={onboarding.userData.profilePhoto || ''} />
          <AvatarFallback className="bg-gray-800 text-gray-300 text-2xl">
            {onboarding.userData.firstName && onboarding.userData.lastName;
              ? `${onboarding.userData.firstName[0]}${onboarding.userData.lastName[0]}`
              : <User className="w-12 h-12" />
            }
          </AvatarFallback>
        </Avatar>
        <Button;
          size="sm"
          className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-black"
          onClick={() => {
            // Mock photo upload;
            onboarding.updateUserData('profilePhoto', '/api/placeholder/150/150')
          }}
        >
          <Camera className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center space-y-2">
        <Button;
          variant="outline" 
          className="border-gray-700 text-gray-300 hover:text-white"
          onClick={() => onboarding.updateUserData('profilePhoto', '/api/placeholder/150/150')}
        >
          <Camera className="mr-2 h-4 w-4" />
          Upload Photo;
        </Button>
        <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
      </div>

      <div className="w-full p-4 bg-gray-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-medium text-sm">Privacy Note</p>
            <p className="text-gray-400 text-sm">
              Your photo helps build trust in our campus community. 
              You can adjust visibility settings later.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Onboarding Step 4: Academic Info;
const Step4AcademicInfo = ({ onboarding }: { onboarding: ReturnType<typeof useOnboarding> }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Academic Information</h2>
      <p className="text-gray-400">Help us connect you with relevant classmates</p>
    </div>

    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Expected Graduation Year</Label>
        <Select;
          value={onboarding.userData.graduationYear}
          onValueChange={(value) => onboarding.updateUserData('graduationYear', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2027">2027</SelectItem>
            <SelectItem value="2028">2028</SelectItem>
            <SelectItem value="2029">2029</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Major/Field of Study</Label>
        <Select;
          value={onboarding.userData.major}
          onValueChange={(value) => onboarding.updateUserData('major', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select your major" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {UB_DATA.majors.map((major) => (
              <SelectItem key={major.value} value={major.value}>
                {major.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-5 w-5 text-yellow-500" />
          <div>
            <p className="text-white font-medium text-sm">Academic Spaces</p>
            <p className="text-gray-400 text-sm">
              We'll suggest study groups and academic spaces based on your major;
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Onboarding Step 5: Campus Life;
const Step5CampusLife = ({ onboarding }: { onboarding: ReturnType<typeof useOnboarding> }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Campus Life</h2>
      <p className="text-gray-400">Where do you live and what interests you?</p>
    </div>

    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Housing</Label>
        <Select;
          value={onboarding.userData.dorm}
          onValueChange={(value) => onboarding.updateUserData('dorm', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Where do you live?" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {UB_DATA.dorms.map((dorm) => (
              <SelectItem key={dorm.value} value={dorm.value}>
                {dorm.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Interests (Select up to 5)</Label>
        <div className="grid grid-cols-2 gap-2">
          {UB_DATA.interests.map((interest) => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox;
                id={interest}
                checked={onboarding.userData.interests.includes(interest)}
                onChange={(e) => { const checked = e.target.checked; {
                  if (checked && onboarding.userData.interests.length < 5) {
                    onboarding.updateUserData('interests', [...onboarding.userData.interests, interest])
                  } else if (!checked) {
                    onboarding.updateUserData('interests', 
                      onboarding.userData.interests.filter(i => i !== interest)
                    )
                  }
                }}
                disabled={
                  !onboarding.userData.interests.includes(interest) && 
                  onboarding.userData.interests.length >= 5
                }
                className="border-gray-600 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
              />
              <Label htmlFor={interest} className="text-white text-sm">
                {interest}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          {onboarding.userData.interests.length}/5 interests selected;
        </p>
      </div>
    </div>
  </div>
);

// Onboarding Step 6: Privacy Settings;
const Step6PrivacySettings = ({ onboarding }: { onboarding: ReturnType<typeof useOnboarding> }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Privacy & Safety</h2>
      <p className="text-gray-400">Control how you appear to other students</p>
    </div>

    <div className="space-y-4">
      <div className="p-4 bg-gray-800 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Public Profile</p>
            <p className="text-gray-400 text-sm">Other UB students can find and view your profile</p>
          </div>
          <Checkbox;
            checked={onboarding.userData.privacy.profileVisible}
            onChange={(e) => { const checked = e.target.checked; 
              onboarding.updateUserData('privacy', {
                ...onboarding.userData.privacy,
                profileVisible: checked;
              })}
            }
            className="border-gray-600 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
          />
        </div>

        <Separator className="bg-gray-700" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Allow Messages</p>
            <p className="text-gray-400 text-sm">Students can send you direct messages</p>
          </div>
          <Checkbox;
            checked={onboarding.userData.privacy.allowMessages}
            onChange={(e) => { const checked = e.target.checked; 
              onboarding.updateUserData('privacy', {
                ...onboarding.userData.privacy,
                allowMessages: checked;
              })}
            }
            className="border-gray-600 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
          />
        </div>

        <Separator className="bg-gray-700" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Show Activity</p>
            <p className="text-gray-400 text-sm">Display when you're active on HIVE</p>
          </div>
          <Checkbox;
            checked={onboarding.userData.privacy.showActivity}
            onChange={(e) => { const checked = e.target.checked; 
              onboarding.updateUserData('privacy', {
                ...onboarding.userData.privacy,
                showActivity: checked;
              })}
            }
            className="border-gray-600 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
          />
        </div>
      </div>

      <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-medium text-sm">Campus Safety</p>
            <p className="text-gray-400 text-sm">
              HIVE is UB-only. Your information is only visible to verified UB students and faculty.
              You can change these settings anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Onboarding Step 7: Complete;
const Step7Complete = ({ onboarding }: { onboarding: ReturnType<typeof useOnboarding> }) => (
  <div className="space-y-6">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500 text-black font-bold text-xl mb-4">
        <CheckCircle className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Welcome to UB HIVE!</h2>
      <p className="text-gray-400">Your profile is ready. Let's connect you with campus life.</p>
    </div>

    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={onboarding.userData.profilePhoto || ''} />
            <AvatarFallback className="bg-gray-700 text-white">
              {onboarding.userData.firstName && onboarding.userData.lastName;
                ? `${onboarding.userData.firstName[0]}${onboarding.userData.lastName[0]}`
                : <User className="w-8 h-8" />
              }
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-white font-semibold">
              {onboarding.userData.firstName} {onboarding.userData.lastName}
            </h3>
            <p className="text-gray-400">@{onboarding.userData.handle}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
                {UB_DATA.majors.find(m => m.value === onboarding.userData.major)?.label}
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Class of {onboarding.userData.graduationYear}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="space-y-3">
      <h3 className="text-white font-medium">What's next?</h3>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-white font-medium">Join Spaces</p>
              <p className="text-gray-400 text-sm">Connect with your dorm, classes, and interests</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-500 ml-auto" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-white font-medium">Explore Feed</p>
              <p className="text-gray-400 text-sm">See what's happening around UB</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-500 ml-auto" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Main Onboarding Wizard;
const OnboardingWizard = ({ onboarding }: { onboarding: ReturnType<typeof useOnboarding> }) => {
  const renderStep = () => {
    switch (onboarding.currentStep) {
      case 1: return <Step1UserType onboarding={onboarding} />;
      case 2: return <Step2BasicInfo onboarding={onboarding} />;
      case 3: return <Step3ProfilePhoto onboarding={onboarding} />;
      case 4: return <Step4AcademicInfo onboarding={onboarding} />;
      case 5: return <Step5CampusLife onboarding={onboarding} />;
      case 6: return <Step6PrivacySettings onboarding={onboarding} />;
      case 7: return <Step7Complete onboarding={onboarding} />;
      default: return <Step1UserType onboarding={onboarding} />
    }
  };

  const canProceed = () => {
    switch (onboarding.currentStep) {
      case 1: return onboarding.userData.userType !== '';
      case 2: return onboarding.userData.firstName && onboarding.userData.lastName && onboarding.userData.handle;
      case 3: return true; // Photo is optional;
      case 4: return onboarding.userData.graduationYear && onboarding.userData.major;
      case 5: return onboarding.userData.dorm && onboarding.userData.interests.length > 0;
      case 6: return true; // Privacy settings have defaults;
      default: return true;
    }}
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Progress Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Step {onboarding.currentStep} of {onboarding.totalSteps}</span>
            <span className="text-gray-400">{Math.round(onboarding.progress)}%</span>
          </div>
          <Progress value={onboarding.progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button;
            variant="outline"
            onClick={onboarding.prevStep}
            disabled={onboarding.currentStep === 1}
            className="border-gray-700 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back;
          </Button>

          {onboarding.currentStep === onboarding.totalSteps ? (
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
              <CheckCircle className="mr-2 h-4 w-4" />
              Start Using HIVE;
            </Button>
          ) : (
            <Button;
              onClick={onboarding.nextStep}
              disabled={!canProceed()}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next;
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
};

// Demo Authentication Flow;
const AuthenticationDemo = () => {
  const auth = useAuth('login');
  const onboarding = useOnboarding();

  if (auth.authState === 'login') {
    return <LoginScreen auth={auth} />
  }

  if (auth.authState === 'verify') {
    return <VerificationScreen auth={auth} />
  }

  if (auth.authState === 'onboarding') {
    return <OnboardingWizard onboarding={onboarding} />
  }

  return <LoginScreen auth={auth} />
};

export const AuthenticationFlow: Story = {
  render: () => <AuthenticationDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete UB student authentication and onboarding flow with magic link login and 7-step profile setup'
      }
    }
  }
};

export const LoginOnly: Story = {
  render: () => {
    const auth = useAuth('login');
    return <LoginScreen auth={auth} />
  },
  parameters: {
    docs: {
      description: {
        story: 'Login screen with UB email validation and magic link authentication'
      }
    }
  }
};

export const OnboardingOnly: Story = {
  render: () => {
    const onboarding = useOnboarding();
    return <OnboardingWizard onboarding={onboarding} />
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-step onboarding wizard for new UB students'
      }
    }
  }
};

export const MobileAuthFlow: Story = {
  render: () => <AuthenticationDemo />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized authentication flow designed for campus mobile usage'
      }
    }
  }
};