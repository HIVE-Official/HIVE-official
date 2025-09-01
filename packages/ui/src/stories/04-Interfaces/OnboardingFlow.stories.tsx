import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { cn } from '../../../lib/utils';

const meta = {
  title: 'Interfaces/Onboarding Flow',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Onboarding Flow

The 5-step onboarding flow builds progressive investment while helping students define their campus identity.

## Philosophy
- **Progressive Investment**: Each step builds excitement for what's next
- **Identity + Community**: Help students define campus identity while preparing for community
- **Anticipation Building**: Hint at spaces, tools, rituals throughout
- **Technical Precision**: Clean, confident flow that feels professional

## Flow: Welcome → Profile → Pledge → Academic → Interests

Each step has its own personality while maintaining momentum toward platform entry.

## Campus Energy Adaptation
The onboarding adapts to campus energy states - more excitement during recruitment, calmer during focus periods.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Onboarding Layout Component
const OnboardingLayout = ({ 
  children, 
  step, 
  title, 
  subtitle,
  progress,
  showBack = false,
  onBack,
}: { 
  children: React.ReactNode;
  step: number;
  title: string;
  subtitle?: string;
  progress: number;
  showBack?: boolean;
  onBack?: () => void;
}) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="w-full max-w-lg space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          {showBack && (
            <Button variant="surface" size="sm" onClick={onBack}>
              ← Back
            </Button>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-display font-bold text-accent">HIVE</h1>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {step} of 5</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-base ease-brand"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
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

// Interest Categories
const INTEREST_CATEGORIES = [
  {
    id: 'academic',
    name: 'Academic',
    emoji: '📚',
    interests: ['Research', 'Study Groups', 'Tutoring', 'Academic Writing']
  },
  {
    id: 'tech',
    name: 'Technology',
    emoji: '💻',
    interests: ['Web Development', 'Mobile Apps', 'Data Science', 'AI/ML']
  },
  {
    id: 'creative',
    name: 'Creative',
    emoji: '🎨',
    interests: ['Design', 'Photography', 'Writing', 'Music']
  },
  {
    id: 'social',
    name: 'Social',
    emoji: '👥',
    interests: ['Events', 'Networking', 'Community Service', 'Leadership']
  },
  {
    id: 'sports',
    name: 'Sports',
    emoji: '⚽',
    interests: ['Intramurals', 'Fitness', 'Outdoor Activities', 'Team Sports']
  },
  {
    id: 'career',
    name: 'Career',
    emoji: '💼',
    interests: ['Internships', 'Job Search', 'Professional Development', 'Entrepreneurship']
  },
];

export const Step1Welcome: Story = {
  render: () => (
    <OnboardingLayout
      step={1}
      title="Welcome to HIVE"
      subtitle="Let's build your campus story together"
      progress={20}
    >
      <div className="space-y-6">
        {/* Hero Visual */}
        <div className="text-center space-y-4">
          <div className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center mx-auto animate-hive-gold-pulse">
            <span className="text-6xl">🏛️</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">The programmable campus layer</h3>
            <p className="text-muted-foreground">
              Where students find their people, make decisions together, and build tools that spread.
            </p>
          </div>
        </div>
        
        {/* Investment Building */}
        <div className="bg-surface p-6 rounded-lg space-y-4">
          <h4 className="font-semibold">What you'll get:</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🏢</span>
              </div>
              <div>
                <p className="font-medium">Join campus spaces</p>
                <p className="text-sm text-muted-foreground">Connect with your major, dorm, and interests</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🛠️</span>
              </div>
              <div>
                <p className="font-medium">Build useful tools</p>
                <p className="text-sm text-muted-foreground">Create solutions that help your community</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🎯</span>
              </div>
              <div>
                <p className="font-medium">Participate in rituals</p>
                <p className="text-sm text-muted-foreground">Campus-wide experiences that bring everyone together</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Community Context */}
        <div className="bg-surface p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">247 students</p>
              <p className="text-sm text-muted-foreground">from your campus</p>
            </div>
            <div className="text-right">
              <p className="font-medium">42 active spaces</p>
              <p className="text-sm text-muted-foreground">ready to join</p>
            </div>
          </div>
        </div>
        
        {/* Continue Button */}
        <Button className="w-full font-semibold animate-hive-scale-in">
          Let's Get Started
        </Button>
        
        {/* Time Expectation */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Takes 3-5 minutes • You can always change this later
          </p>
        </div>
      </div>
    </OnboardingLayout>
  ),
};

export const Step2ProfileCreation: Story = {
  render: () => {
    const [displayName, setDisplayName] = useState('');
    const [handle, setHandle] = useState('');
    const [isCheckingHandle, setIsCheckingHandle] = useState(false);
    const [handleAvailable, setHandleAvailable] = useState<boolean | null>(null);
    
    // Auto-generate handle from display name
    React.useEffect(() => {
      if (displayName) {
        const generatedHandle = displayName.toLowerCase().replace(/\s+/g, '.');
        setHandle(generatedHandle);
        
        // Simulate handle checking
        setIsCheckingHandle(true);
        setTimeout(() => {
          setHandleAvailable(Math.random() > 0.3);
          setIsCheckingHandle(false);
        }, 800);
      }
    }, [displayName]);
    
    return (
      <OnboardingLayout
        step={2}
        title="Create Your Profile"
        subtitle="How do you want to be known on campus?"
        progress={40}
        showBack={true}
      >
        <div className="space-y-6">
          {/* Avatar Upload */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-border hover:border-accent transition-colors cursor-pointer">
              <span className="text-3xl">📸</span>
            </div>
            <Button variant="secondary" size="sm">
              Upload Photo
            </Button>
          </div>
          
          {/* Display Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Display Name</label>
            <Input
              type="text"
              placeholder="Your full name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              This is how other students will see you
            </p>
          </div>
          
          {/* Handle Generation */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Handle</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="your.handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="pl-12"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                @
              </div>
            </div>
            
            {/* Handle Availability */}
            {handle && (
              <div className={cn(
                "flex items-center space-x-2 text-sm p-2 rounded",
                isCheckingHandle && "text-muted-foreground",
                handleAvailable === true && "text-foreground bg-surface",
                handleAvailable === false && "text-foreground bg-surface"
              )}>
                <div className="flex items-center space-x-1">
                  {isCheckingHandle ? (
                    <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                  ) : handleAvailable ? (
                    <span>✓</span>
                  ) : (
                    <span>○</span>
                  )}
                  <span>
                    {isCheckingHandle ? 'Checking availability...' : 
                     handleAvailable ? 'Handle available' : 
                     'Handle taken'}
                  </span>
                </div>
              </div>
            )}
            
            {/* Handle Suggestions */}
            {handleAvailable === false && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Try these instead:</p>
                <div className="flex flex-wrap gap-2">
                  {[`${handle}1`, `${handle}.2025`, `${handle}.ub`].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setHandle(suggestion)}
                      className="px-2 py-1 bg-surface text-sm rounded hover:bg-accent/20 transition-colors"
                    >
                      @{suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Campus Context */}
          <div className="bg-surface p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Your campus identity</h4>
            <p className="text-sm text-muted-foreground">
              This profile will help you connect with classmates, join relevant spaces, and build your campus community.
            </p>
          </div>
          
          {/* Continue Button */}
          <Button 
            className="w-full font-semibold"
            disabled={!displayName || !handle || isCheckingHandle || !handleAvailable}
          >
            Continue
          </Button>
        </div>
      </OnboardingLayout>
    );
  },
};

export const Step3SchoolPledge: Story = {
  render: () => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [agreedToCommunity, setAgreedToCommunity] = useState(false);
    
    return (
      <OnboardingLayout
        step={3}
        title="Join Your Campus Community"
        subtitle="Let's establish what HIVE means for our campus"
        progress={60}
        showBack={true}
      >
        <div className="space-y-6">
          {/* Community Values */}
          <div className="bg-surface p-6 rounded-lg space-y-4">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold">Building together</h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-accent">•</span>
                <span>We create tools that help our campus community thrive</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-accent">•</span>
                <span>We respect diverse perspectives and inclusive participation</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-accent">•</span>
                <span>We build solutions, not just conversations</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-accent">•</span>
                <span>We help good ideas spread across campus</span>
              </div>
            </div>
          </div>
          
          {/* Exclusive Membership */}
          <div className="bg-surface p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">University at Buffalo</p>
                <p className="text-sm text-muted-foreground">Campus community</p>
              </div>
              <div className="text-right">
                <p className="font-medium">247 students</p>
                <p className="text-sm text-muted-foreground">building together</p>
              </div>
            </div>
          </div>
          
          {/* Commitment Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the <span className="text-accent">Terms of Service</span> and <span className="text-accent">Privacy Policy</span>
              </label>
            </div>
            
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="community"
                checked={agreedToCommunity}
                onChange={(e) => setAgreedToCommunity(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="community" className="text-sm">
                I commit to building a positive campus community through HIVE
              </label>
            </div>
          </div>
          
          {/* Responsibility */}
          <div className="bg-surface p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Your role</h4>
            <p className="text-sm text-muted-foreground">
              As a HIVE member, you'll have the power to create spaces, build tools, and shape how your campus connects. Use it well.
            </p>
          </div>
          
          {/* Continue Button */}
          <Button 
            className="w-full font-semibold"
            disabled={!agreedToTerms || !agreedToCommunity}
          >
            Join the Community
          </Button>
        </div>
      </OnboardingLayout>
    );
  },
};

export const Step4AcademicInfo: Story = {
  render: () => {
    const [academicLevel, setAcademicLevel] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [major, setMajor] = useState('');
    
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 8 }, (_, i) => currentYear + i);
    
    return (
      <OnboardingLayout
        step={4}
        title="Academic Information"
        subtitle="Help us connect you with the right communities"
        progress={80}
        showBack={true}
      >
        <div className="space-y-6">
          {/* Academic Level */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Academic Level</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'undergraduate', label: 'Undergraduate' },
                { value: 'graduate', label: 'Graduate' },
                { value: 'phd', label: 'PhD' },
                { value: 'faculty', label: 'Faculty' },
              ].map((level) => (
                <button
                  key={level.value}
                  onClick={() => setAcademicLevel(level.value)}
                  className={cn(
                    "p-3 rounded-lg border transition-all text-sm",
                    academicLevel === level.value
                      ? "border-accent bg-surface"
                      : "border-border hover:border-accent/50"
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Graduation Year */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Graduation Year</label>
            <select
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          {/* Major */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Major</label>
            <Input
              type="text"
              placeholder="e.g., Computer Science"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              This helps us recommend relevant academic spaces
            </p>
          </div>
          
          {/* Smart Matching Preview */}
          {major && (
            <div className="bg-surface p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Potential communities</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">📚</span>
                  <span className="text-sm">{major} Majors</span>
                  <span className="text-xs text-muted-foreground">(89 students)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🎓</span>
                  <span className="text-sm">Class of {graduationYear}</span>
                  <span className="text-xs text-muted-foreground">(247 students)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🏛️</span>
                  <span className="text-sm">{academicLevel}s</span>
                  <span className="text-xs text-muted-foreground">(156 students)</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Continue Button */}
          <Button 
            className="w-full font-semibold"
            disabled={!academicLevel || !graduationYear || !major}
          >
            Continue
          </Button>
        </div>
      </OnboardingLayout>
    );
  },
};

export const Step5InterestSelection: Story = {
  render: () => {
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    
    const toggleInterest = (interest: string) => {
      setSelectedInterests(prev => 
        prev.includes(interest) 
          ? prev.filter(i => i !== interest)
          : [...prev, interest]
      );
    };
    
    return (
      <OnboardingLayout
        step={5}
        title="What interests you?"
        subtitle="Select interests to discover relevant spaces and tools"
        progress={100}
        showBack={true}
      >
        <div className="space-y-6">
          {/* Selection Count */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {selectedInterests.length} selected • Choose at least 3
            </p>
          </div>
          
          {/* Interest Categories */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {INTEREST_CATEGORIES.map((category) => (
              <div key={category.id} className="border rounded-lg">
                <button
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )}
                  className="w-full p-4 flex items-center justify-between hover:bg-surface/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.emoji}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {category.interests.filter(i => selectedInterests.includes(i)).length}/{category.interests.length}
                    </span>
                    <span className="text-muted-foreground">
                      {expandedCategory === category.id ? '−' : '+'}
                    </span>
                  </div>
                </button>
                
                {expandedCategory === category.id && (
                  <div className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-2">
                      {category.interests.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={cn(
                            "p-2 rounded text-sm transition-all",
                            selectedInterests.includes(interest)
                              ? "bg-accent text-accent-foreground"
                              : "bg-surface hover:bg-accent/20"
                          )}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Algorithm Training */}
          <div className="bg-surface p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Personalized recommendations</h4>
            <p className="text-sm text-muted-foreground">
              We'll use your interests to recommend relevant spaces, tools, and connections. You can always adjust these later.
            </p>
          </div>
          
          {/* Continue Button */}
          <Button 
            className="w-full font-semibold"
            disabled={selectedInterests.length < 3}
          >
            Complete Setup
          </Button>
        </div>
      </OnboardingLayout>
    );
  },
};

export const OnboardingComplete: Story = {
  render: () => (
    <OnboardingLayout
      step={5}
      title="Welcome to HIVE!"
      subtitle="Your campus story begins now"
      progress={100}
    >
      <div className="space-y-6">
        {/* Celebration */}
        <div className="text-center space-y-4">
          <div className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center mx-auto animate-hive-ritual-burst">
            <span className="text-6xl">🎉</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">You're all set!</h3>
            <p className="text-muted-foreground">
              Your profile is complete and you're ready to explore campus
            </p>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className="bg-surface p-6 rounded-lg space-y-4">
          <h4 className="font-semibold">What's next?</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🏢</span>
              </div>
              <div>
                <p className="font-medium">Explore spaces</p>
                <p className="text-sm text-muted-foreground">Join CS Majors, your dorm, and interest groups</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🕯️</span>
              </div>
              <div>
                <p className="font-medium">Light your flame</p>
                <p className="text-sm text-muted-foreground">Participate in your first HIVE ritual</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🛠️</span>
              </div>
              <div>
                <p className="font-medium">Build tools</p>
                <p className="text-sm text-muted-foreground">Create something useful for your community</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Platform Entry */}
        <div className="space-y-3">
          <Button className="w-full font-semibold animate-hive-space-join">
            Enter HIVE
          </Button>
          <Button variant="secondary" className="w-full">
            Customize Profile
          </Button>
        </div>
        
        {/* Welcome Message */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            You're now part of the campus community. Let's build something amazing together.
          </p>
        </div>
      </div>
    </OnboardingLayout>
  ),
};

export const CampusEnergyFlow: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Campus Energy Onboarding</h2>
        <p className="text-muted-foreground">
          How the onboarding flow adapts to different campus energy states.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* High Energy - Recruitment */}
        <div className="space-y-4">
          <h3 className="font-semibold">High Energy (Recruitment)</h3>
          <div className="bg-surface p-4 rounded-lg border-2 border-accent/50">
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-4xl animate-hive-gold-pulse">🏛️</div>
                <h4 className="font-bold">Join the Movement!</h4>
                <p className="text-sm font-medium">847 students building together</p>
              </div>
              <div className="space-y-2">
                <Button className="w-full font-bold animate-hive-gold-glow">
                  Get Started Now
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Limited spots available
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Focus Period */}
        <div className="space-y-4">
          <h3 className="font-semibold">Focus Period</h3>
          <div className="bg-surface p-4 rounded-lg">
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-4xl opacity-75">🏛️</div>
                <h4 className="font-normal">Welcome to HIVE</h4>
                <p className="text-sm text-muted-foreground">Your campus collaboration space</p>
              </div>
              <div className="space-y-2">
                <Button className="w-full font-normal">
                  Begin Setup
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Takes 3-5 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Celebration */}
        <div className="space-y-4">
          <h3 className="font-semibold">Celebration Period</h3>
          <div className="bg-surface p-4 rounded-lg">
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-4xl animate-hive-ritual-burst">🎉</div>
                <h4 className="font-bold">You Made It!</h4>
                <p className="text-sm font-medium">Celebrate with your campus community</p>
              </div>
              <div className="space-y-2">
                <Button className="w-full font-bold animate-hive-space-join">
                  Claim Your Spot
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  You've earned this
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};