 
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
    isLoading: {
      description: 'Whether schools are loading',
      control: 'boolean',
    },
    userEmail: {
      description: 'User email for waitlist functionality',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockSchools = [
  {
    id: 'buffalo',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open' as const,
    studentsUntilOpen: 0,
    waitlistCount: 0,
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    domain: 'cornell.edu',
    status: 'waitlist' as const,
    studentsUntilOpen: 127,
    waitlistCount: 45,
  },
  {
    id: 'columbia',
    name: 'Columbia University',
    domain: 'columbia.edu',
    status: 'waitlist' as const,
    studentsUntilOpen: 261,
    waitlistCount: 89,
  },
  {
    id: 'nyu',
    name: 'New York University',
    domain: 'nyu.edu',
    status: 'waitlist' as const,
    studentsUntilOpen: 156,
    waitlistCount: 67,
  },
  {
    id: 'rit',
    name: 'Rochester Institute of Technology',
    domain: 'rit.edu',
    status: 'waitlist' as const,
    studentsUntilOpen: 73,
    waitlistCount: 23,
  },
];

export const Default: Story = {
  args: {
    schools: mockSchools,
    onSchoolSelect: action('school-selected'),
    onCreateSchool: action('school-created'),
    isLoading: false,
    userEmail: undefined,
  },
};

export const Loading: Story = {
  args: {
    schools: mockSchools,
    onSchoolSelect: action('school-selected'),
    onCreateSchool: action('school-created'),
    isLoading: true,
    userEmail: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: `
Shows skeleton loading state while schools are being fetched:
- Animated pulse effects
- Maintains proper spacing
- Progressive reveal animation
        `,
      },
    },
  },
};

export const UBFeatured: Story = {
  args: {
    schools: mockSchools,
    onSchoolSelect: action('school-selected'),
    onCreateSchool: action('school-created'),
    isLoading: false,
    userEmail: undefined,
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
        studentsUntilOpen: 127,
        waitlistCount: 45,
      },
      {
        id: 'columbia',
        name: 'Columbia University',
        domain: 'columbia.edu',
        status: 'waitlist' as const,
        studentsUntilOpen: 261,
        waitlistCount: 89,
      },
      {
        id: 'harvard',
        name: 'Harvard University',
        domain: 'harvard.edu',
        status: 'waitlist' as const,
        studentsUntilOpen: 4, // Almost full
        waitlistCount: 289,
      },
    ],
    onSchoolSelect: action('school-selected'),
    onCreateSchool: action('school-created'),
    isLoading: false,
    userEmail: undefined,
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
    isLoading: false,
    userEmail: undefined,
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

export const WithUserEmail: Story = {
  args: {
    schools: mockSchools,
    onSchoolSelect: action('school-selected'),
    onCreateSchool: action('school-created'),
    isLoading: false,
    userEmail: 'john.doe@buffalo.edu',
  },
  parameters: {
    docs: {
      description: {
        story: `
When user email is provided, waitlist flow is streamlined:
- Email field pre-populated in waitlist dialog
- Faster waitlist signup process
- Better user experience
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
    isLoading: false,
    userEmail: undefined,
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