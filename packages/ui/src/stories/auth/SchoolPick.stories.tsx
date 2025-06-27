/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { SchoolPick } from '../../components/auth/school-pick';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SchoolPick> = {
  title: 'Auth/SchoolPick',
  component: SchoolPick,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Screen 1: School Pick** - "Where do you study?"

According to the HIVE vBETA Authentication spec:
- Sticky search bar with glass 20% opacity
- Featured UB card with gold border + "Open • Jump in"
- Search results with status pills showing remaining count
- Wait-list pill shows "{remaining} left" (default "346 left")

**Copy**: 
- Header: "finally, your campus OS"
- UB subtext: "UB students board first."
- Wait-list subtext: "Rally {remaining} rebels to spark HIVE here."

**Motion**: Rows slide-in, UB card pulses gold once.
        `,
      },
    },
  },
  argTypes: {
    schools: {
      description: 'Array of schools with status and waitlist counts',
    },
    onSchoolSelect: {
      description: 'Callback when user selects a school',
      action: 'school-selected',
    },
    onCreateSchool: {
      description: 'Callback when user creates a new school',
      action: 'school-created',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockSchools = [
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open' as const,
    isUB: true,
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    domain: 'cornell.edu',
    status: 'waitlist' as const,
    waitlistCount: 127,
  },
  {
    id: 'columbia',
    name: 'Columbia University',
    domain: 'columbia.edu',
    status: 'waitlist' as const,
    waitlistCount: 261,
  },
  {
    id: 'nyu',
    name: 'New York University',
    domain: 'nyu.edu',
    status: 'waitlist' as const,
    waitlistCount: 156,
  },
  {
    id: 'rit',
    name: 'Rochester Institute of Technology',
    domain: 'rit.edu',
    status: 'waitlist' as const,
    waitlistCount: 73,
  },
];

export const Default: Story = {
  args: {
    schools: mockSchools,
    onSchoolSelect: action('school-selected'),
    onCreateSchool: action('school-created'),
  },
};

export const UBFeatured: Story = {
  args: {
    schools: mockSchools,
    onSchoolSelect: action('school-selected'),
    onCreateSchool: action('school-created'),
  },
  parameters: {
    docs: {
      description: {
        story: `
UB is prominently featured with:
- Gold border (2px)
- "Open • Jump in" ritual badge
- Gold pulse animation on mount
- Priority positioning at top
        `,
      },
    },
  },
};

export const WaitlistStatus: Story = {
  args: {
    schools: [
      {
        id: 'cornell',
        name: 'Cornell University',
        domain: 'cornell.edu',
        status: 'waitlist' as const,
        waitlistCount: 127,
      },
      {
        id: 'columbia',
        name: 'Columbia University',
        domain: 'columbia.edu',
        status: 'waitlist' as const,
        waitlistCount: 261,
      },
      {
        id: 'harvard',
        name: 'Harvard University',
        domain: 'harvard.edu',
        status: 'waitlist' as const,
        waitlistCount: 4, // Almost full
      },
    ],
    onSchoolSelect: action('school-selected'),
    onCreateSchool: action('school-created'),
  },
  parameters: {
    docs: {
      description: {
        story: `
Waitlist schools show:
- "{remaining} left" badges
- Rally messaging: "Rally X rebels to spark HIVE here."
- Different urgency levels based on remaining slots
        `,
      },
    },
  },
};

export const SearchInteraction: Story = {
  args: {
    schools: mockSchools,
    onSchoolSelect: action('school-selected'),
    onCreateSchool: action('school-created'),
  },
  parameters: {
    docs: {
      description: {
        story: `
Try typing in the search bar:
- "buffalo" → Shows UB featured
- "cornell" → Filters to Cornell only
- "nonexistent" → Shows "Add {School}? (wait-list)" option
        `,
      },
    },
  },
};

export const BrandValidation: Story = {
  args: {
    schools: mockSchools,
    onSchoolSelect: action('school-selected'),
    onCreateSchool: action('school-created'),
  },
  parameters: {
    docs: {
      description: {
        story: `
**Brand Compliance Check:**
- ✅ Space Grotesk for headers ("finally, your campus OS")
- ✅ Geist Sans for body text and subtitles
- ✅ Gold accent (#FFD700) for UB card border and badges
- ✅ Proper contrast and hierarchy
- ✅ 8dp grid spacing system
- ✅ Glass search bar with backdrop-blur
        `,
      },
    },
  },
}; 