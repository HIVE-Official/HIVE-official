/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { InterestsStep } from '../components/onboarding/interests-step';
import { OnboardingCompleteStep } from '../components/onboarding/onboarding-complete-step';
import { AvatarUploadStep } from '../components/onboarding/avatar-upload-step';
import { AcademicCardStep } from '../components/onboarding/academic-card-step';
import type { StepProps } from '../components/onboarding/types';

/**
 * HIVE Onboarding Components - Brand Compliant Edition
 * 
 * These components follow HIVE's strict brand guidelines:
 * ✅ NO yellow fills (reserved for attention/shock moments)
 * ✅ Black/white fills for primary actions 
 * ✅ Modular design with consistent CSS variables
 * ✅ Dark-first surfaces with subtle embossing
 * ✅ Gold accents only for focus states and special moments
 */
const meta: Meta<StepProps> = {
  title: 'HIVE/Onboarding Steps',
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0A0A' },
        { name: 'surface', value: '#111111' },
      ],
    },
    docs: {
      description: {
        component: `
## Brand-Compliant Onboarding Components

These components demonstrate HIVE's strict brand adherence:

### ✅ Brand Rules Followed:
- **No Yellow Fills**: Buttons use black/white fills only
- **Modular Design**: All colors use CSS variables
- **Dark-First**: Consistent with HIVE's brand identity
- **Gold Accents**: Reserved for focus states only

### 🎨 Design System:
- Primary actions: White fills with black text
- Secondary actions: Outlined style
- Selected states: White fills (not yellow)
- Surfaces: Modular 3-tier system (surface-01, surface-02, surface-03)
        `,
      },
    },
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    onSkip: { action: 'skipped' },
  },
} satisfies Meta<StepProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interest Selection Step
 * Shows the modular approach with white-fill selected states
 * and proper surface hierarchy.
 */
export const InterestSelection: Story = {
  render: (args: StepProps) => (
    <div className="p-8 bg-background min-h-screen">
      <InterestsStep {...args} />
    </div>
  ),
  args: {
    onSubmit: async (data: Record<string, unknown> | null) => {
      console.log('Interests submitted:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSkip: () => console.log('Interests skipped'),
    initialInterests: [],
  },
  parameters: {
    docs: {
      description: {
        story: `
**Brand Compliance Features:**
- ✅ Selected interests use white fills (not yellow)
- ✅ Unselected use surface-01 with proper hover states
- ✅ Primary button uses white fill with black text
- ✅ Modular CSS variables throughout
        `,
      },
    },
  },
};

/**
 * Academic Information Step
 * Demonstrates form inputs with consistent styling
 * and proper color hierarchy.
 */
export const AcademicInformation: Story = {
  render: (args: StepProps) => (
    <div className="p-8 bg-background min-h-screen">
      <AcademicCardStep {...args} />
    </div>
  ),
  args: {
    onSubmit: async (data: Record<string, unknown> | null) => {
      console.log('Academic info submitted:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSkip: () => console.log('Academic info skipped'),
  },
  parameters: {
    docs: {
      description: {
        story: `
**Brand Compliance Features:**
- ✅ Input fields use proper bg-input color
- ✅ Labels use card-foreground for proper contrast
- ✅ Primary button maintains white fill standard
- ✅ All surfaces use modular CSS variables
        `,
      },
    },
  },
};

/**
 * Avatar Upload Step
 * Shows file upload with brand-compliant styling
 * and proper interactive states.
 */
export const AvatarUpload: Story = {
  render: (args: StepProps) => (
    <div className="p-8 bg-background min-h-screen">
      <AvatarUploadStep {...args} />
    </div>
  ),
  args: {
    onSubmit: async (data: Record<string, unknown> | null) => {
      console.log('Avatar uploaded:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSkip: () => console.log('Avatar upload skipped'),
  },
  parameters: {
    docs: {
      description: {
        story: `
**Brand Compliance Features:**
- ✅ File input styled with surface-01/surface-02
- ✅ Proper hover states without yellow
- ✅ Upload button uses white fill standard
- ✅ Consistent typography hierarchy
        `,
      },
    },
  },
};

/**
 * Onboarding Complete Step
 * Final step with celebration moment
 * but still maintains brand discipline.
 */
export const OnboardingComplete: Story = {
  render: (args: StepProps) => (
    <div className="p-8 bg-background min-h-screen">
      <OnboardingCompleteStep {...args} />
    </div>
  ),
  args: {
    onSubmit: async () => {
      console.log('Onboarding completed!');
      await new Promise(resolve => setTimeout(resolve, 500));
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
**Brand Compliance Features:**
- ✅ Even celebration moments use white fills
- ✅ No yellow/gold fills for buttons
- ✅ Maintains modular surface system
- ✅ Typography uses proper contrast ratios

**Note:** This is where we could use the 'ritual' button variant for special moments, but standard white fill works for most cases.
        `,
      },
    },
  },
};

/**
 * Complete Flow Showcase
 * Shows all steps in a single view for comparison
 * and design system consistency verification.
 */
export const CompleteFlow: Story = {
  render: () => (
    <div className="p-8 bg-background min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Interest Selection</h2>
          <InterestsStep 
            onSubmit={async () => {}} 
            onSkip={() => {}}
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Academic Information</h2>
          <AcademicCardStep 
            onSubmit={async () => {}} 
            onSkip={() => {}}
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Avatar Upload</h2>
          <AvatarUploadStep 
            onSubmit={async () => {}} 
            onSkip={() => {}}
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Completion</h2>
          <OnboardingCompleteStep 
            onSubmit={async () => {}}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Design System Validation:**

This view shows all onboarding components together to validate:
- ✅ Consistent surface hierarchy across all cards
- ✅ No yellow fills anywhere (brand compliance)
- ✅ Proper white/black contrast for all buttons
- ✅ Modular CSS variable usage throughout
- ✅ Consistent spacing and typography

**Brand Rules Enforced:**
1. **No Yellow Fills**: All buttons use black or white fills
2. **Modular Surfaces**: bg-card, bg-surface-01, bg-surface-02 hierarchy
3. **Gold for Focus Only**: Gold only appears in focus rings
4. **Typography Hierarchy**: Proper contrast with card-foreground/muted-foreground
        `,
      },
    },
  },
}; 