"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  AlertTriangle, CheckCircle, ArrowRight, ArrowLeft, 
  Mail, Shield, Users, GraduationCap, Building2,
  Loader2, X, AlertCircle, ChevronDown
} from 'lucide-react';
import { HiveLogo } from '../HiveLogo';
import { cn } from '../lib/utils';
import { hiveVariants, hiveTransitions, hivePresets } from '../../lib/motion';

// =============================================================================
// USER TYPE DETECTION & ROUTING SYSTEM
// =============================================================================

// University Data Structures for Backend Integration
interface University {
  id: string;
  name: string;
  domain: string;
  shortName: string;
  logo?: string;
}

interface Department {
  id: string;
  name: string;
  college: string;
  facultyCount: number;
}

interface Major {
  id: string;
  name: string;
  department: string;
  level: 'undergraduate' | 'graduate' | 'phd';
}

// Mock Data - Replace with API calls in production
const UB_DEPARTMENTS: Department[] = [
  { id: 'cse', name: 'Computer Science & Engineering', college: 'School of Engineering', facultyCount: 24 },
  { id: 'ee', name: 'Electrical Engineering', college: 'School of Engineering', facultyCount: 18 },
  { id: 'me', name: 'Mechanical Engineering', college: 'School of Engineering', facultyCount: 22 },
  { id: 'bio', name: 'Biological Sciences', college: 'College of Arts & Sciences', facultyCount: 31 },
  { id: 'chem', name: 'Chemistry', college: 'College of Arts & Sciences', facultyCount: 19 },
  { id: 'math', name: 'Mathematics', college: 'College of Arts & Sciences', facultyCount: 28 },
  { id: 'psych', name: 'Psychology', college: 'College of Arts & Sciences', facultyCount: 25 },
  { id: 'med', name: 'Medicine', college: 'Jacobs School of Medicine', facultyCount: 45 },
  { id: 'bus', name: 'Business Administration', college: 'School of Management', facultyCount: 16 },
  { id: 'law', name: 'Law', college: 'School of Law', facultyCount: 34 }
];

const UB_MAJORS: Major[] = [
  // Engineering
  { id: 'cs-bs', name: 'Computer Science', department: 'cse', level: 'undergraduate' },
  { id: 'cs-ms', name: 'Computer Science', department: 'cse', level: 'graduate' },
  { id: 'cs-phd', name: 'Computer Science', department: 'cse', level: 'phd' },
  { id: 'ee-bs', name: 'Electrical Engineering', department: 'ee', level: 'undergraduate' },
  { id: 'me-bs', name: 'Mechanical Engineering', department: 'me', level: 'undergraduate' },
  
  // Arts & Sciences
  { id: 'bio-bs', name: 'Biology', department: 'bio', level: 'undergraduate' },
  { id: 'chem-bs', name: 'Chemistry', department: 'chem', level: 'undergraduate' },
  { id: 'math-bs', name: 'Mathematics', department: 'math', level: 'undergraduate' },
  { id: 'psych-bs', name: 'Psychology', department: 'psych', level: 'undergraduate' },
  
  // Business
  { id: 'bus-bs', name: 'Business Administration', department: 'bus', level: 'undergraduate' },
  { id: 'mba', name: 'MBA', department: 'bus', level: 'graduate' },
  
  // Medicine
  { id: 'med-md', name: 'Doctor of Medicine', department: 'med', level: 'graduate' },
  
  // Law
  { id: 'law-jd', name: 'Juris Doctor', department: 'law', level: 'graduate' }
];

const CLASS_YEARS = [
  { value: 'freshman', label: 'Freshman (1st Year)' },
  { value: 'sophomore', label: 'Sophomore (2nd Year)' },
  { value: 'junior', label: 'Junior (3rd Year)' },
  { value: 'senior', label: 'Senior (4th Year)' },
  { value: 'super-senior', label: 'Super Senior (5+ Years)' },
  { value: 'graduate', label: 'Graduate Student' },
  { value: 'phd', label: 'PhD Student' }
];

export type UserType = 'STUDENT' | 'FACULTY' | 'STAFF' | 'ALUMNI' | 'NOT_ELIGIBLE';
export type AuthStep = 
  | 'entry'              // Email entry point
  | 'user-type-detection' // Determining user type
  | 'student-flow'        // Student authentication path
  | 'faculty-warning'     // Faculty access limitations warning
  | 'faculty-setup'       // Faculty profile setup
  | 'alumni-rejection'    // Alumni cannot self-register
  | 'not-eligible'        // Not eligible for access
  | 'verification'        // Email verification
  | 'complete';          // Authentication complete

interface AuthState {
  step: AuthStep;
  email: string;
  userType: UserType | null;
  loading: boolean;
  error: string | null;
  userData: {
    // Common fields
    name?: string;
    
    // Faculty/Staff specific
    department?: string;
    role?: string;
    office?: string;
    spaceRequests?: string[];
    
    // Student specific  
    major?: string;
    classYear?: string;
    graduationYear?: number;
    academicLevel?: 'undergraduate' | 'graduate' | 'phd';
    
    // Profile data
    profileComplete?: boolean;
    onboardingStep?: number;
  };
}

// Backend Integration Types - Production Ready
interface AuthResult {
  success: boolean;
  user: {
    id: string;
    email: string;
    userType: UserType;
    userData: {
      // Common fields
      name?: string;
      profileComplete: boolean;
      onboardingStep: number;
      
      // Faculty/Staff specific
      department?: string;
      departmentId?: string;
      role?: string;
      office?: string;
      spaceRequests?: string[];
      facultyId?: string;
      
      // Student specific  
      major?: string;
      majorId?: string;
      classYear?: string;
      graduationYear?: number;
      academicLevel?: 'undergraduate' | 'graduate' | 'phd';
      studentId?: string;
      
      // University context
      universityId: string;
      campusId: string;
      
      // Timestamps
      createdAt: string;
      updatedAt: string;
      lastLogin?: string;
    };
  };
  error?: string;
  requiresOnboarding?: boolean;
}

interface ComprehensiveAuthFlowProps {
  onAuthComplete?: (result: AuthResult) => void;
  onStartOnboarding?: (userType: UserType, email: string, userData?: any) => void;
  mockMode?: boolean;
  
  // Backend integration props
  apiEndpoint?: string;
  universityId?: string;
  campusId?: string;
}

// Mock user type detection (in real app, this would be API calls)
const detectUserType = async (email: string): Promise<UserType> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock detection logic
  if (email.includes('student') || email.includes('sarah') || email.includes('john.doe')) {
    return 'STUDENT';
  }
  if (email.includes('prof') || email.includes('dr.') || email.includes('johnson')) {
    return 'FACULTY';
  }
  if (email.includes('alumni') || email.includes('class')) {
    return 'ALUMNI';
  }
  if (email.endsWith('@buffalo.edu')) {
    // Default UB emails to student unless proven otherwise
    return 'STUDENT';
  }
  
  return 'NOT_ELIGIBLE';
};

// University domains validation
const UNIVERSITY_DOMAINS = [
  'buffalo.edu',
  'student.buffalo.edu',
  'cse.buffalo.edu',
  'eng.buffalo.edu'
];

const isUniversityEmail = (email: string): boolean => {
  return UNIVERSITY_DOMAINS.some(domain => email.endsWith(`@${domain}`));
};

export const ComprehensiveAuthFlow: React.FC<ComprehensiveAuthFlowProps> = ({
  onAuthComplete,
  onStartOnboarding,
  mockMode = false
}) => {
  const [state, setState] = useState<AuthState>({
    step: 'entry',
    email: '',
    userType: null,
    loading: false,
    error: null,
    userData: {}
  });

  const updateState = useCallback((updates: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleEmailSubmit = async () => {
    if (!state.email.trim()) {
      updateState({ error: 'Please enter your email address' });
      return;
    }

    if (!isUniversityEmail(state.email)) {
      updateState({ error: 'Please use your university .edu email address' });
      return;
    }

    updateState({ loading: true, error: null, step: 'user-type-detection' });

    try {
      const userType = await detectUserType(state.email);
      updateState({ 
        userType, 
        loading: false,
        step: getUserTypeNextStep(userType)
      });
    } catch (error) {
      updateState({ 
        loading: false, 
        error: 'Failed to verify your account. Please try again.',
        step: 'entry'
      });
    }
  };

  const getUserTypeNextStep = (userType: UserType): AuthStep => {
    switch (userType) {
      case 'STUDENT': return 'student-flow';
      case 'FACULTY': return 'faculty-warning';
      case 'ALUMNI': return 'alumni-rejection';
      default: return 'not-eligible';
    }
  };

  const handleStudentContinue = () => {
    if (onStartOnboarding) {
      // Pass initial student data for onboarding
      const initialStudentData = {
        profileComplete: false,
        onboardingStep: 0,
        universityId: 'ub-buffalo',
        campusId: 'north-campus',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        studentId: `stu_${Date.now()}`
      };
      onStartOnboarding('STUDENT', state.email, initialStudentData);
    } else {
      // Mock complete for demo
      const completeStudentData = {
        profileComplete: true,
        onboardingStep: 100,
        universityId: 'ub-buffalo',
        campusId: 'north-campus',
        major: 'Computer Science',
        majorId: 'cs-bs',
        classYear: 'junior',
        academicLevel: 'undergraduate' as const,
        graduationYear: 2026,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        studentId: `stu_${Date.now()}`
      };
      
      updateState({ 
        userData: completeStudentData,
        step: 'complete' 
      });
      
      if (onAuthComplete) {
        const authResult: AuthResult = {
          success: true,
          user: {
            id: `user_${Date.now()}`,
            email: state.email,
            userType: 'STUDENT',
            userData: completeStudentData
          },
          requiresOnboarding: false
        };
        onAuthComplete(authResult);
      }
    }
  };

  const handleFacultyAcceptTerms = () => {
    updateState({ step: 'faculty-setup' });
  };

  const handleFacultyComplete = async (facultyData: any) => {
    updateState({ loading: true });
    
    // Simulate faculty setup API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const completeUserData = {
      ...facultyData,
      profileComplete: true,
      onboardingStep: 100,
      universityId: 'ub-buffalo',
      campusId: 'north-campus',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      departmentId: UB_DEPARTMENTS.find(d => d.name === facultyData.department)?.id || '',
      facultyId: `fac_${Date.now()}`
    };
    
    updateState({ 
      userData: completeUserData,
      loading: false,
      step: 'complete'
    });

    if (onAuthComplete) {
      const authResult: AuthResult = {
        success: true,
        user: {
          id: `user_${Date.now()}`,
          email: state.email,
          userType: 'FACULTY',
          userData: completeUserData
        },
        requiresOnboarding: false
      };
      onAuthComplete(authResult);
    }
  };

  const renderStep = () => {
    switch (state.step) {
      case 'entry':
        return <EntryStep 
          email={state.email}
          loading={state.loading}
          error={state.error}
          onEmailChange={(email) => updateState({ email, error: null })}
          onSubmit={handleEmailSubmit}
        />;

      case 'user-type-detection':
        return <UserTypeDetectionStep email={state.email} />;

      case 'student-flow':
        return <StudentFlowStep 
          email={state.email}
          onContinue={handleStudentContinue}
        />;

      case 'faculty-warning':
        return <FacultyWarningStep 
          email={state.email}
          onAccept={handleFacultyAcceptTerms}
          onReject={() => updateState({ step: 'entry', email: '', userType: null })}
        />;

      case 'faculty-setup':
        return <FacultySetupStep 
          email={state.email}
          loading={state.loading}
          onComplete={handleFacultyComplete}
          onBack={() => updateState({ step: 'faculty-warning' })}
        />;

      case 'alumni-rejection':
        return <AlumniRejectionStep 
          onBack={() => updateState({ step: 'entry', email: '', userType: null })}
        />;

      case 'not-eligible':
        return <NotEligibleStep 
          email={state.email}
          onBack={() => updateState({ step: 'entry', email: '', userType: null })}
        />;

      case 'complete':
        return <CompleteStep 
          userType={state.userType!}
          email={state.email}
          userData={state.userData}
        />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Enhanced Background with HIVE Branding */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,215,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_45deg,transparent,rgba(255,215,0,0.05),transparent)]" />
      </div>

      <motion.div 
        className="w-full max-w-lg relative z-10"
        initial="hidden"
        animate="visible"
        variants={hiveVariants.container}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 1.05, y: -20 }
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={hiveTransitions.elegant}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// =============================================================================
// STEP COMPONENTS
// =============================================================================

interface EntryStepProps {
  email: string;
  loading: boolean;
  error: string | null;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
}

const EntryStep: React.FC<EntryStepProps> = ({
  email, loading, error, onEmailChange, onSubmit
}) => (
  <Card className="text-center">
    <CardHeader className="pb-4">
      <div className="mb-6">
        <HiveLogo variant="gold" size="xl" animationType="gentle-float" />
      </div>
      <CardTitle className="text-2xl mb-2">HIVE</CardTitle>
      <p className="text-[var(--hive-text-secondary)]">
        Your campus community
      </p>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="text-left space-y-4">
        <label className="block text-sm font-medium">
          Enter your .edu email:
        </label>
        <InputEnhanced
          type="email"
          placeholder="sarah.chen@buffalo.edu"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !loading && onSubmit()}
          className={cn(error && "border-red-500")}
        />
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>
      
      <ButtonEnhanced 
        onClick={onSubmit}
        disabled={loading || !email.trim()}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </ButtonEnhanced>
    </CardContent>
  </Card>
);

const UserTypeDetectionStep: React.FC<{ email: string }> = ({ email }) => (
  <Card className="text-center">
    <CardContent className="py-12">
      <div className="space-y-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Verifying your account</h3>
          <p className="text-[var(--hive-text-secondary)] text-sm">
            Checking university records for {email}...
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface StudentFlowStepProps {
  email: string;
  onContinue: () => void;
}

const StudentFlowStep: React.FC<StudentFlowStepProps> = ({ email, onContinue }) => (
  <motion.div
    className="module-border module-surface module-padding space-y-8 text-center"
    variants={hiveVariants.container}
    initial="hidden"
    animate="visible"
  >
    {/* Success Animation */}
    <motion.div 
      className="space-y-4"
      variants={hiveVariants.item}
    >
      <motion.div 
        className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto"
        variants={hiveVariants.goldPulse}
        animate="pulse"
      >
        <CheckCircle className="h-10 w-10 text-accent" />
      </motion.div>
      
      <motion.div 
        className="space-y-3"
        variants={hiveVariants.item}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-display font-bold text-foreground">
          Welcome to HIVE! 🎉
        </h2>
        <p className="text-lg text-accent font-medium">
          Student verification complete
        </p>
      </motion.div>
    </motion.div>

    {/* Verification Details */}
    <motion.div 
      className="bg-surface-02 rounded-lg p-6 text-left space-y-3"
      variants={hiveVariants.item}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-3 text-sm">
        <Mail className="w-4 h-4 text-accent" />
        <span className="text-muted">Verified Email:</span>
        <span className="font-medium text-foreground">{email}</span>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <GraduationCap className="w-4 h-4 text-accent" />
        <span className="text-muted">Status:</span>
        <Badge variant="primary" className="bg-accent/20 text-accent border-accent/30">
          Active Student
        </Badge>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Shield className="w-4 h-4 text-accent" />
        <span className="text-muted">Access Level:</span>
        <span className="font-medium text-foreground">Full Platform Access</span>
      </div>
    </motion.div>

    {/* Features Preview */}
    <motion.div 
      className="space-y-3"
      variants={hiveVariants.item}
      transition={{ delay: 0.4 }}
    >
      <h3 className="font-display font-semibold text-foreground">You can now:</h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted">
          <Users className="w-4 h-4" />
          <span>Join Spaces</span>
        </div>
        <div className="flex items-center gap-2 text-muted">
          <Building2 className="w-4 h-4" />
          <span>Use Tools</span>
        </div>
      </div>
    </motion.div>
    
    {/* Continue Button */}
    <motion.div
      variants={hiveVariants.item}
      transition={{ delay: 0.5 }}
    >
      <ButtonEnhanced 
        onClick={onContinue}
        variant="primary"
        size="lg"
        className="w-full"
        {...hivePresets.button}
      >
        Start Your HIVE Journey
        <ArrowRight className="h-4 w-4 ml-2" />
      </ButtonEnhanced>
    </motion.div>
  </motion.div>
);

interface FacultyWarningStepProps {
  email: string;
  onAccept: () => void;
  onReject: () => void;
}

const FacultyWarningStep: React.FC<FacultyWarningStepProps> = ({ 
  email, onAccept, onReject 
}) => (
  <Card>
    <CardHeader className="text-center pb-4">
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Shield className="h-8 w-8 text-orange-600" />
      </div>
      <CardTitle className="text-orange-800">FACULTY ACCESS NOTICE</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-[var(--hive-text-muted)] mb-2">
          Dr. Johnson (detected as faculty)
        </p>
        <p className="text-sm font-mono text-gray-500">{email}</p>
        
        <Badge variant="secondary" className="mt-3 bg-orange-100 text-orange-800">
          ⚠️ LIMITED ACCESS MODE
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-green-700 mb-2">As faculty, you CAN:</h4>
          <ul className="text-sm space-y-1 text-green-600">
            <li>✓ Request to run/moderate Spaces</li>
            <li>✓ View public campus activity</li>
            <li>✓ Use academic Tools</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-red-700 mb-2">You CANNOT:</h4>
          <ul className="text-sm space-y-1 text-red-600">
            <li>✗ Create new Spaces</li>
            <li>✗ Join student social Spaces</li>
            <li>✗ Access residential Spaces</li>
            <li>✗ View private student profiles</li>
            <li>✗ Participate in social polls</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-3">
        <ButtonEnhanced 
          onClick={onAccept}
          className="flex-1"
        >
          I understand
        </ButtonEnhanced>
        <ButtonEnhanced 
          onClick={onReject}
          variant="secondary"
          className="flex-1"
        >
          I'm not faculty
        </ButtonEnhanced>
      </div>
    </CardContent>
  </Card>
);

interface FacultySetupStepProps {
  email: string;
  loading: boolean;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const FacultySetupStep: React.FC<FacultySetupStepProps> = ({
  email, loading, onComplete, onBack
}) => {
  const [formData, setFormData] = useState({
    displayName: '',
    department: '',
    role: '',
    office: '',
    spaceRequests: []
  });

  const [selectedSpaces, setSelectedSpaces] = useState<string[]>([]);

  const facultyRoles = [
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Research Scientist',
    'Post-doctoral Researcher',
    'Graduate Teaching Assistant',
    'Adjunct Faculty',
    'Visiting Scholar'
  ];

  const academicSpaces = [
    'CS 115 - Intro to Programming',
    'CS 250 - Data Structures', 
    'CS 337 - Computer Graphics',
    'CS 429 - Machine Learning',
    'CS Research Lab',
    'Graduate Seminar',
    'Department Meetings'
  ];

  const handleSubmit = async () => {
    const facultyData = {
      ...formData,
      spaceRequests: selectedSpaces,
      email
    };
    
    await onComplete(facultyData);
  };

  return (
    <motion.div
      className="module-border module-surface module-padding space-y-8"
      variants={hiveVariants.container}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="text-center space-y-3"
        variants={hiveVariants.item}
      >
        <div className="w-16 h-16 bg-surface-01 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-2xl font-display font-semibold text-foreground">
          Faculty Profile Setup
        </h1>
        <p className="text-muted font-body">
          Complete your faculty profile to access HIVE
        </p>
      </motion.div>

      {/* Form Fields */}
      <motion.div className="space-y-6" variants={hiveVariants.container}>
        <motion.div variants={hiveVariants.item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Display Name</label>
            <InputEnhanced 
              placeholder="Dr. John Johnson"
              value={formData.displayName}
              onChange={(e) => setFormData({...formData, displayName: e.target.value})}
              className="bg-surface-01 border-border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Office Location</label>
            <InputEnhanced 
              placeholder="Davis Hall 344"
              value={formData.office}
              onChange={(e) => setFormData({...formData, office: e.target.value})}
              className="bg-surface-01 border-border"
            />
          </div>
        </motion.div>

        <motion.div variants={hiveVariants.item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Department</label>
            <SelectEnhanced 
              value={formData.department} 
              onValueChange={(value) => setFormData({...formData, department: value})}
            >
              <SelectTrigger className="bg-surface-01 border-border">
                <SelectValue placeholder="Select your department" />
              </SelectTrigger>
              <SelectContent>
                {UB_DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name}>
                    <div className="flex flex-col">
                      <span>{dept.name}</span>
                      <span className="text-xs text-muted">{dept.college}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectEnhanced>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Role</label>
            <SelectEnhanced 
              value={formData.role} 
              onValueChange={(value) => setFormData({...formData, role: value})}
            >
              <SelectTrigger className="bg-surface-01 border-border">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {facultyRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectEnhanced>
          </div>
        </motion.div>

        <motion.div variants={hiveVariants.item} className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Request Space Leadership</h4>
            <p className="text-sm text-muted">
              Which academic spaces would you like to lead? Students will vote to approve your requests.
            </p>
          </div>
          
          <div className="space-y-3">
            {academicSpaces.map((space, index) => (
              <motion.label 
                key={space} 
                className={cn(
                  "flex items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer",
                  "hover:border-accent/30 hover:bg-surface-02",
                  selectedSpaces.includes(space) && "border-accent bg-accent/10"
                )}
                variants={hiveVariants.item}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  type="checkbox"
                  checked={selectedSpaces.includes(space)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSpaces([...selectedSpaces, space]);
                    } else {
                      setSelectedSpaces(selectedSpaces.filter(s => s !== space));
                    }
                  }}
                  className="w-4 h-4 text-accent bg-surface-01 border-border rounded focus:ring-accent"
                />
                <span className="text-sm font-body text-foreground flex-1">{space}</span>
                {selectedSpaces.includes(space) && (
                  <CheckCircle className="w-4 h-4 text-accent" />
                )}
              </motion.label>
            ))}
          </div>
          
          <div className="bg-surface-02 p-3 rounded-lg">
            <p className="text-xs text-muted flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Faculty space requests require student community approval
            </p>
          </div>
        </motion.div>

        <motion.div variants={hiveVariants.item} className="flex gap-3 pt-4">
          <ButtonEnhanced 
            onClick={onBack} 
            variant="secondary" 
            className="flex-1"
            {...hivePresets.button}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </ButtonEnhanced>
          <ButtonEnhanced 
            onClick={handleSubmit}
            disabled={loading || !formData.displayName || !formData.department || !formData.role}
            variant="primary"
            className="flex-2"
            {...hivePresets.button}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                Complete Setup
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </ButtonEnhanced>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const AlumniRejectionStep: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <Card>
    <CardContent className="py-8 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <GraduationCap className="h-8 w-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-blue-800 mb-2">
        ALUMNI ACCESS
      </h3>
      <div className="space-y-4 text-left">
        <p>Hi John (Class of 2020)</p>
        <p>Alumni cannot self-register for HIVE.</p>
        <p>Current students can invite alumni for:</p>
        <ul className="text-sm space-y-1 ml-4">
          <li>• Mentorship programs</li>
          <li>• Career networking</li> 
          <li>• Special events</li>
        </ul>
        <p className="text-sm font-medium">
          Want access? Ask a current student to invite you.
        </p>
      </div>
      
      <div className="flex gap-3 mt-6">
        <ButtonEnhanced variant="secondary" className="flex-1">
          Learn about mentorship
        </ButtonEnhanced>
        <ButtonEnhanced onClick={onBack} className="flex-1">
          Back
        </ButtonEnhanced>
      </div>
    </CardContent>
  </Card>
);

interface NotEligibleStepProps {
  email: string;
  onBack: () => void;
}

const NotEligibleStep: React.FC<NotEligibleStepProps> = ({ email, onBack }) => (
  <Card>
    <CardContent className="py-8 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <X className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="text-xl font-semibold text-red-800 mb-4">
        ACCESS DENIED
      </h3>
      <div className="space-y-4 text-left">
        <p>HIVE is exclusively for the University at Buffalo community.</p>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm"><strong>Eligible users:</strong></p>
          <ul className="text-sm space-y-1 mt-2">
            <li>• Current students (.edu email)</li>
            <li>• Faculty/staff (verified)</li>
            <li>• Invited alumni</li>
          </ul>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-sm text-red-700">
            <strong>Your email:</strong> {email}<br />
            <strong>Status:</strong> Not eligible
          </p>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <ButtonEnhanced onClick={onBack} className="flex-1">
          Back
        </ButtonEnhanced>
        <ButtonEnhanced variant="secondary" className="flex-1">
          Learn more
        </ButtonEnhanced>
      </div>
    </CardContent>
  </Card>
);

interface CompleteStepProps {
  userType: UserType;
  email: string;
  userData: any;
}

const CompleteStep: React.FC<CompleteStepProps> = ({ userType, email, userData }) => (
  <Card>
    <CardContent className="py-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-green-800 mb-2">
        {userType === 'STUDENT' ? 'Ready for onboarding!' : 'Setup complete!'}
      </h3>
      
      {userType === 'STUDENT' ? (
        <div className="space-y-4">
          <p className="text-green-600">
            Your student account is verified and ready.
          </p>
          <div className="bg-green-50 rounded-lg p-4 text-left">
            <p className="text-sm text-green-700">
              <strong>Next:</strong> Complete your campus profile setup to join your community spaces.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-blue-600">
            Your faculty dashboard is ready.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 text-left">
            <p className="text-sm text-blue-700">
              <strong>Pending requests:</strong><br />
              {userData.spaceRequests?.map((space: string) => (
                <span key={space} className="block">• {space} (awaiting approval)</span>
              ))}
            </p>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);