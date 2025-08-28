import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { cn } from '../../lib/utils';

const meta = {
  title: 'Interfaces/Authentication Flow',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Authentication Flow

The authentication flow creates the first impression of HIVE - exclusive but welcoming, technically precise but campus-warm.

## Philosophy
- **Exclusive but Welcoming**: Invitation-only feel that's inclusive
- **Trust Building**: Clear explanations, security-focused
- **Campus Context**: Immediately relevant to student life
- **Smooth Flow**: No friction, clear next steps

## Flow: School Selection → Email Entry → Magic Link → Verification

Each step builds trust and anticipation while maintaining momentum toward onboarding.

## Campus Energy
The auth flow adapts to campus energy - more excitement during recruitment periods, calmer during focus times.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock schools data
const SCHOOLS = [
  { 
    id: 'ub', 
    name: 'University at Buffalo', 
    domain: 'buffalo.edu',
    students: 247,
    logo: '🏛️'
  },
  { 
    id: 'cornell', 
    name: 'Cornell University', 
    domain: 'cornell.edu',
    students: 189,
    logo: '🔴'
  },
  { 
    id: 'syracuse', 
    name: 'Syracuse University', 
    domain: 'syr.edu',
    students: 156,
    logo: '🍊'
  },
  { 
    id: 'rit', 
    name: 'Rochester Institute of Technology', 
    domain: 'rit.edu',
    students: 134,
    logo: '🔶'
  },
];

// Page Layout Component
const AuthPageLayout = ({ 
  children, 
  title, 
  subtitle,
  step,
  totalSteps = 4
}: { 
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
}) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="w-full max-w-md space-y-8">
      {/* HIVE Logo */}
      <div className="text-center">
        <h1 className="text-3xl font-display font-bold text-accent">HIVE</h1>
        <p className="text-sm text-muted-foreground">The programmable campus layer</p>
      </div>
      
      {/* Progress Indicator */}
      {step && (
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={`step-${i}`}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-base",
                  i < step ? "bg-accent" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-semibold">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  </div>
);

// School Selection Component
const SchoolCard = ({ 
  school, 
  isSelected, 
  onClick 
}: { 
  school: typeof SCHOOLS[0];
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full p-4 rounded-lg border-2 transition-all duration-base text-left",
      "hover:border-accent/50 hover:bg-surface/50",
      "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
      isSelected ? "border-accent bg-surface" : "border-border"
    )}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="text-2xl">{school.logo}</div>
        <div>
          <h3 className="font-semibold">{school.name}</h3>
          <p className="text-sm text-muted-foreground">{school.domain}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{school.students} students</p>
        <p className="text-xs text-muted-foreground">connected</p>
      </div>
    </div>
  </button>
);

// Email Validation Component
const EmailValidation = ({ 
  email: _email, 
  domain, 
  isValid 
}: { 
  email: string;
  domain: string;
  isValid: boolean;
}) => (
  <div className={cn(
    "p-3 rounded-lg border transition-all duration-base",
    isValid ? "border-accent/50 bg-surface" : "border-border"
  )}>
    <div className="flex items-center space-x-2">
      <div className="text-lg">
        {isValid ? "✓" : "◐"}
      </div>
      <div>
        <p className="text-sm font-medium">
          {isValid ? "Valid email domain" : "Checking domain..."}
        </p>
        <p className="text-xs text-muted-foreground">
          Must be a {domain} email address
        </p>
      </div>
    </div>
  </div>
);

export const AuthLanding: Story = {
  render: () => (
    <AuthPageLayout 
      title="Welcome to HIVE"
      subtitle="Your campus story starts here"
      step={1}
    >
      <div className="space-y-6">
        {/* Value Proposition */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">🏛️</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">The programmable campus layer</h3>
            <p className="text-sm text-muted-foreground">
              Where students find their people, make decisions together, and build tools that spread.
            </p>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="bg-surface p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">726 students</p>
              <p className="text-sm text-muted-foreground">building together</p>
            </div>
            <div className="flex -space-x-2">
              {['🎓', '👩‍💻', '🔬', '🎨'].map((emoji, i) => (
                <div key={`emoji-${emoji}-${i}`} className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">{emoji}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <Button className="w-full font-semibold">
          Select Your School
        </Button>
        
        {/* Exclusive Messaging */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Invitation-only • Campus communities only
          </p>
        </div>
      </div>
    </AuthPageLayout>
  ),
};

export const SchoolSelection: Story = {
  render: () => {
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredSchools = SCHOOLS.filter(school =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
      <AuthPageLayout 
        title="Select Your School"
        subtitle="Connect with your campus community"
        step={2}
      >
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              🔍
            </div>
          </div>
          
          {/* School List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredSchools.map((school) => (
              <SchoolCard
                key={school.id}
                school={school}
                isSelected={selectedSchool === school.id}
                onClick={() => setSelectedSchool(school.id)}
              />
            ))}
          </div>
          
          {/* Continue Button */}
          <Button 
            className="w-full font-semibold"
            disabled={!selectedSchool}
          >
            Continue to Email
          </Button>
          
          {/* Help Text */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Don't see your school? <span className="text-accent cursor-pointer">Request access</span>
            </p>
          </div>
        </div>
      </AuthPageLayout>
    );
  },
};

export const EmailEntry: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [isValid, setIsValid] = useState(false);
    
    const selectedSchool = SCHOOLS[0]; // Mock selected school
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      
      if (value.includes('@')) {
        setIsValidating(true);
        setTimeout(() => {
          setIsValid(value.endsWith(`@${selectedSchool.domain}`));
          setIsValidating(false);
        }, 800);
      } else {
        setIsValid(false);
        setIsValidating(false);
      }
    };
    
    return (
      <AuthPageLayout 
        title="Enter Your Email"
        subtitle={`Use your ${selectedSchool.name} email address`}
        step={3}
      >
        <div className="space-y-4">
          {/* School Context */}
          <div className="bg-surface p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="text-lg">{selectedSchool.logo}</div>
              <div>
                <p className="font-medium">{selectedSchool.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedSchool.students} students connected
                </p>
              </div>
            </div>
          </div>
          
          {/* Email Input */}
          <div className="space-y-3">
            <Input
              type="email"
              placeholder={`your.email@${selectedSchool.domain}`}
              value={email}
              onChange={handleEmailChange}
              className="text-center"
            />
            
            {/* Validation Feedback */}
            {email.includes('@') && (
              <EmailValidation
                email={email}
                domain={selectedSchool.domain}
                isValid={isValid && !isValidating}
              />
            )}
          </div>
          
          {/* Magic Link Explanation */}
          <div className="bg-surface p-4 rounded-lg space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🔐</span>
              <h4 className="font-semibold">Magic Link Authentication</h4>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• No password required</p>
              <p>• Secure email verification</p>
              <p>• One-click access to HIVE</p>
            </div>
          </div>
          
          {/* Send Button */}
          <Button 
            className="w-full font-semibold"
            disabled={!isValid || isValidating}
          >
            {isValidating ? 'Validating...' : 'Send Magic Link'}
          </Button>
          
          {/* Trust Building */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              We'll never spam you. One-time verification only.
            </p>
          </div>
        </div>
      </AuthPageLayout>
    );
  },
};

export const EmailConfirmation: Story = {
  render: () => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [canResend, setCanResend] = useState(false);
    
    const selectedSchool = SCHOOLS[0];
    const email = "student@buffalo.edu";
    
    // Countdown timer
    React.useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }, []);
    
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    
    return (
      <AuthPageLayout 
        title="Check Your Email"
        subtitle="We sent a magic link to your inbox"
        step={4}
      >
        <div className="space-y-6">
          {/* Email Sent Confirmation */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto animate-hive-gold-pulse">
              <span className="text-3xl">✉️</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Magic link sent!</h3>
              <p className="text-sm text-muted-foreground">
                Check your inbox at <span className="font-medium">{email}</span>
              </p>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="bg-surface p-4 rounded-lg space-y-3">
            <h4 className="font-semibold">What's next?</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span>1.</span>
                <span>Check your email inbox</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>2.</span>
                <span>Click the magic link</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>3.</span>
                <span>Complete your profile setup</span>
              </div>
            </div>
          </div>
          
          {/* Campus Preview */}
          <div className="bg-surface p-4 rounded-lg">
            <h4 className="font-semibold mb-3">While you wait...</h4>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">247 students</span> from {selectedSchool.name} are already building tools and connecting in spaces.
              </p>
              <p className="text-muted-foreground">
                Recent activity: CS Majors space, Study Groups, Campus Events
              </p>
            </div>
          </div>
          
          {/* Resend Section */}
          <div className="space-y-3">
            {!canResend ? (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Can resend in {formatTime(timeLeft)}
                </p>
              </div>
            ) : (
              <Button variant="secondary" className="w-full">
                Resend Magic Link
              </Button>
            )}
            
            {/* Troubleshooting */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Check spam folder • <span className="text-accent cursor-pointer">Use different email</span>
              </p>
            </div>
          </div>
        </div>
      </AuthPageLayout>
    );
  },
};

export const LinkVerification: Story = {
  render: () => {
    const [verificationState, setVerificationState] = useState<'loading' | 'success' | 'error'>('loading');
    
    // Simulate verification process
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setVerificationState('success');
      }, 2000);
      
      return () => clearTimeout(timer);
    }, []);
    
    if (verificationState === 'loading') {
      return (
        <AuthPageLayout title="Verifying Your Link">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Authenticating...</h3>
              <p className="text-sm text-muted-foreground">
                Verifying your email and setting up your account
              </p>
            </div>
          </div>
        </AuthPageLayout>
      );
    }
    
    if (verificationState === 'success') {
      return (
        <AuthPageLayout title="Welcome to HIVE!">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto animate-hive-gold-glow">
              <span className="text-3xl">🎉</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Email verified!</h3>
              <p className="text-sm text-muted-foreground">
                You're ready to build your campus story
              </p>
            </div>
            
            {/* Momentum Building */}
            <div className="bg-surface p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Let's set up your profile</h4>
              <p className="text-sm text-muted-foreground">
                5 quick steps to connect with your campus community
              </p>
            </div>
            
            <Button className="w-full font-semibold animate-hive-scale-in">
              Continue to Profile Setup
            </Button>
          </div>
        </AuthPageLayout>
      );
    }
    
    return (
      <AuthPageLayout title="Verification Failed">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">⚠️</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Link expired or invalid</h3>
            <p className="text-sm text-muted-foreground">
              This magic link has expired or has already been used
            </p>
          </div>
          
          <div className="space-y-3">
            <Button className="w-full font-semibold">
              Request New Magic Link
            </Button>
            <Button variant="secondary" className="w-full">
              Return to Login
            </Button>
          </div>
        </div>
      </AuthPageLayout>
    );
  },
};

export const CampusEnergyVariations: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Variations</h2>
        <p className="text-muted-foreground">
          How the auth flow adapts to different campus energy states.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* High Energy */}
        <div className="space-y-4">
          <h3 className="font-semibold">High Energy Period</h3>
          <p className="text-sm text-muted-foreground">
            Start of semester, recruitment, events
          </p>
          <div className="bg-surface p-4 rounded-lg border-2 border-accent/50">
            <div className="text-center space-y-3">
              <div className="text-2xl animate-hive-gold-pulse">🏛️</div>
              <h4 className="font-bold">Join the Movement!</h4>
              <p className="text-sm font-medium">
                847 students building together
              </p>
              <Button className="font-bold animate-hive-gold-glow">
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
        
        {/* Focus Period */}
        <div className="space-y-4">
          <h3 className="font-semibold">Focus Period</h3>
          <p className="text-sm text-muted-foreground">
            Study time, exams, quiet collaboration
          </p>
          <div className="bg-surface p-4 rounded-lg">
            <div className="text-center space-y-3">
              <div className="text-2xl opacity-75">🏛️</div>
              <h4 className="font-normal">Welcome to HIVE</h4>
              <p className="text-sm text-muted-foreground">
                Your campus collaboration space
              </p>
              <Button className="font-normal">
                Continue
              </Button>
            </div>
          </div>
        </div>
        
        {/* Celebration */}
        <div className="space-y-4">
          <h3 className="font-semibold">Celebration Period</h3>
          <p className="text-sm text-muted-foreground">
            End of semester, achievements, milestones
          </p>
          <div className="bg-surface p-4 rounded-lg">
            <div className="text-center space-y-3">
              <div className="text-2xl animate-hive-ritual-burst">🎉</div>
              <h4 className="font-bold">Congratulations!</h4>
              <p className="text-sm font-medium">
                You've earned access to HIVE
              </p>
              <Button className="font-bold animate-hive-space-join">
                Claim Your Spot
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};