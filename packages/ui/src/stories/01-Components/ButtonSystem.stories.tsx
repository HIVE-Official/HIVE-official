import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../components/button';
import { cn } from '../../lib/utils';

const meta = {
  title: 'Components/Button System',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# HIVE Button System

The HIVE button system combines technical precision with campus warmth, creating action-oriented interactions that adapt to student energy states.

## Philosophy
- **Technical + Human**: Vercel precision meets campus community warmth
- **Campus Energy Responsive**: Buttons adapt to different energy states
- **Clear Hierarchy**: Primary, secondary, tertiary actions with proper contrast
- **Mobile-First**: 44px minimum touch targets, thumb-friendly interaction

## Special HIVE Buttons
- **Ritual Buttons**: Only buttons allowed to have gold fills
- **Space Activation**: Celebration-ready with success animations
- **Tool Creation**: Builder-focused with technical precision
- **Campus Actions**: Context-aware for student life patterns

## Campus Energy Adaptation
Buttons change personality based on campus energy states while maintaining usability.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'surface'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Campus Energy State Wrapper
const CampusEnergyDemo = ({ 
  energyState, 
  children, 
  description 
}: { 
  energyState: string; 
  children: React.ReactNode; 
  description: string;
}) => (
  <div className="space-y-4 p-6 border rounded-lg">
    <div className="space-y-2">
      <h4 className="font-semibold">{energyState}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="flex flex-wrap gap-3">
      {children}
    </div>
  </div>
);

// Loading Button Component
const LoadingButton = ({ 
  variant = 'default', 
  size = 'default',
  children,
  isLoading = false,
  ...props 
}: {
  variant?: 'default' | 'outline' | 'surface';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [loading, setLoading] = useState(isLoading);
  
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleClick}
      disabled={loading}
      className={cn(loading && "opacity-75")}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      )}
      {children}
    </Button>
  );
};

// Ritual Button Component (special gold fill allowed)
const RitualButton = ({ 
  children, 
  onClick,
  ...props 
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    onClick={onClick}
    className={cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-all",
      "bg-accent text-accent-foreground hover:bg-accent/90",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "h-11 px-4 py-2.5 text-base min-h-[44px]",
      "animate-hive-gold-pulse hover:animate-hive-gold-glow",
      "active:scale-95 transition-transform duration-75"
    )}
    {...props}
  >
    {children}
  </button>
);

export const ButtonVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Default</Button>
          <Button variant="secondary">Outline</Button>
          <Button variant="surface">Surface</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small (36px)</Button>
          <Button size="default">Default (44px)</Button>
          <Button size="lg">Large (48px)</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <LoadingButton>Loading</LoadingButton>
        </div>
      </div>
    </div>
  ),
};

export const CampusEnergyButtons: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Campus Energy Adaptation</h3>
        <p className="text-muted-foreground">
          Buttons adapt their personality to different campus energy states while maintaining usability.
        </p>
      </div>
      
      <CampusEnergyDemo
        energyState="High Energy Periods"
        description="Start of semester, events, social peaks - bolder, more prominent"
      >
        <Button className="font-semibold animate-hive-gold-pulse">
          Join CS Majors
        </Button>
        <Button variant="secondary" className="font-medium border-2">
          Explore Spaces
        </Button>
        <Button variant="surface" className="font-medium">
          Learn More
        </Button>
      </CampusEnergyDemo>
      
      <CampusEnergyDemo
        energyState="Focus Periods"
        description="Study time, exams, project deadlines - calmer, less distracting"
      >
        <Button className="font-normal opacity-90">
          Study Tools
        </Button>
        <Button variant="secondary" className="font-normal">
          Quiet Spaces
        </Button>
        <Button variant="surface" className="font-normal">
          Settings
        </Button>
      </CampusEnergyDemo>
      
      <CampusEnergyDemo
        energyState="Celebration Moments"
        description="Achievements, ritual completion, space activation - special animations"
      >
        <Button className="font-bold animate-hive-gold-glow">
          🎉 Space Activated!
        </Button>
        <Button variant="secondary" className="font-semibold animate-hive-scale-in">
          Share Achievement
        </Button>
        <Button variant="surface" className="font-medium">
          Continue
        </Button>
      </CampusEnergyDemo>
    </div>
  ),
};

export const SpecialHIVEButtons: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Special HIVE Button Types</h3>
        <p className="text-muted-foreground">
          Campus-specific buttons with special behaviors and animations.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Ritual Buttons</h4>
          <p className="text-sm text-muted-foreground">
            Only buttons allowed to have gold fills - for special HIVE moments
          </p>
          <div className="flex flex-wrap gap-4">
            <RitualButton>🕯️ Light Your Flame</RitualButton>
            <RitualButton>🔗 Pass the Torch</RitualButton>
            <RitualButton>❓ Share Wisdom</RitualButton>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Space Activation</h4>
          <p className="text-sm text-muted-foreground">
            Celebration-ready buttons that transform on success
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="font-semibold">
              Request to Lead Space
            </Button>
            <Button variant="secondary" className="font-medium">
              Activate CS Majors
            </Button>
            <Button className="font-bold animate-hive-space-join">
              ✨ Successfully Activated
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Tool Creation</h4>
          <p className="text-sm text-muted-foreground">
            Builder-focused buttons with technical precision
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="font-medium font-mono">
              Create Tool
            </Button>
            <Button variant="secondary" className="font-medium">
              Save Draft
            </Button>
            <Button variant="surface" className="font-medium">
              Preview
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Magic Link Flow</h4>
          <p className="text-sm text-muted-foreground">
            Email-specific buttons with waiting states
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="font-medium">
              Send Magic Link
            </Button>
            <LoadingButton variant="secondary">
              Resend Email
            </LoadingButton>
            <Button variant="surface" className="font-medium">
              Use Different Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CampusActionHierarchy: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Campus Action Hierarchy</h3>
        <p className="text-muted-foreground">
          Button hierarchy designed for campus-specific actions and student workflows.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Primary Actions</h4>
          <p className="text-sm text-muted-foreground">
            Main campus actions - joining, creating, activating
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="font-semibold">Join Space</Button>
            <Button className="font-semibold">Activate Space</Button>
            <Button className="font-semibold">Create Tool</Button>
            <Button className="font-semibold">Complete Ritual</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Secondary Actions</h4>
          <p className="text-sm text-muted-foreground">
            Supporting actions - learning, viewing, configuring
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary">Learn More</Button>
            <Button variant="secondary">View Details</Button>
            <Button variant="secondary">Settings</Button>
            <Button variant="secondary">Share</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Tertiary Actions</h4>
          <p className="text-sm text-muted-foreground">
            Navigation and utility actions
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="surface">Cancel</Button>
            <Button variant="surface">Back</Button>
            <Button variant="surface">Skip</Button>
            <Button variant="surface">Maybe Later</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Destructive Actions</h4>
          <p className="text-sm text-muted-foreground">
            Potentially harmful actions - but no red colors!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" className="border-foreground/20">
              Leave Space
            </Button>
            <Button variant="secondary" className="border-foreground/20">
              Delete Tool
            </Button>
            <Button variant="secondary" className="border-foreground/20">
              Remove Member
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const MobileAccessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mobile Accessibility</h3>
        <p className="text-muted-foreground">
          All buttons meet 44px minimum touch targets and thumb-friendly interaction.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Touch Target Sizes</h4>
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-center space-y-2">
              <Button size="sm">Small</Button>
              <p className="text-xs text-muted-foreground">36px (compact)</p>
            </div>
            <div className="text-center space-y-2">
              <Button size="default">Default</Button>
              <p className="text-xs text-muted-foreground">44px (mobile)</p>
            </div>
            <div className="text-center space-y-2">
              <Button size="lg">Large</Button>
              <p className="text-xs text-muted-foreground">48px (primary)</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Thumb-Friendly Positioning</h4>
          <div className="max-w-sm mx-auto p-4 bg-surface rounded-lg">
            <div className="space-y-4">
              <div className="text-center">
                <h5 className="font-medium">Join CS Majors</h5>
                <p className="text-sm text-muted-foreground">
                  247 students • Active community
                </p>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1">Join Space</Button>
                <Button variant="secondary" className="flex-1">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Focus States</h4>
          <p className="text-sm text-muted-foreground">
            Gold focus rings (2px) are visible and accessible
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="focus:ring-2 focus:ring-accent focus:ring-offset-2">
              Keyboard Navigation
            </Button>
            <Button variant="secondary" className="focus:ring-2 focus:ring-accent focus:ring-offset-2">
              Screen Reader
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const [activeDemo, setActiveDemo] = useState<string | null>(null);
    
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Interactive Button Demo</h3>
          <p className="text-muted-foreground">
            Test different button interactions and states.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Campus Action Flows</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg space-y-3">
              <h5 className="font-medium">Space Joining Flow</h5>
              <div className="space-y-2">
                <Button 
                  className="w-full"
                  onClick={() => setActiveDemo('space-joining')}
                >
                  {activeDemo === 'space-joining' ? '✓ Joined!' : 'Join CS Majors'}
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setActiveDemo(null)}
                >
                  Reset Demo
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg space-y-3">
              <h5 className="font-medium">Ritual Participation</h5>
              <div className="space-y-2">
                <RitualButton 
                  onClick={() => setActiveDemo('ritual')}
                  className="w-full"
                >
                  {activeDemo === 'ritual' ? '🕯️ Flame Lit!' : '🕯️ Light Your Flame'}
                </RitualButton>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setActiveDemo(null)}
                >
                  Reset Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};