import type { Meta, StoryObj } from '@storybook/react';
import { 
  UniversityEmailFieldMolecule,
  StudentIDFieldMolecule,
  MajorSelectionFieldMolecule,
  DormSelectionFieldMolecule,
  GreekAffiliationFieldMolecule,
  CalendarConnectionFieldMolecule,
  PrivacyLevelFieldMolecule,
  BuilderVerificationFieldMolecule,
  SpaceActivationFieldMolecule,
  ToolPublishingFieldMolecule;
} from './form-comprehensive';
import { useState } from 'react';

const meta = {
  title: 'Molecules/Form Comprehensive',
  component: UniversityEmailFieldMolecule,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Comprehensive form field molecules designed specifically for university and campus environments. Each molecule handles complex validation, state management, and user experience patterns common in HIVE.

**Available Components:**
- **UniversityEmailFieldMolecule**: Email validation with university domain checking;
- **StudentIDFieldMolecule**: Student ID input with format validation;
- **MajorSelectionFieldMolecule**: Academic major and year selection;
- **DormSelectionFieldMolecule**: Residence hall and room number fields;
- **GreekAffiliationFieldMolecule**: Greek life organization and position;
- **CalendarConnectionFieldMolecule**: Calendar integration toggles;
- **PrivacyLevelFieldMolecule**: Privacy settings with ghost mode;
- **BuilderVerificationFieldMolecule**: Builder portfolio and experience;
- **SpaceActivationFieldMolecule**: Space creation request form;
- **ToolPublishingFieldMolecule**: Tool publishing and metadata;
**Features:**
- Campus-specific validation logic;
- Real-time feedback and error states;
- Accessible form patterns;
- Consistent HIVE design system integration;
        `,
      },
    },
  },
} satisfies Meta<typeof UniversityEmailFieldMolecule>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component;
const InteractiveField = ({ Component, initialData = {}, ...props }: any) => {
  const [data, setData] = useState(initialData);
  
  const updateData = (key: string, value: any) => {
    setData((prev: any) => ({ ...prev, [key]: value }))
  };
  
  return (
    <div className="w-96 p-6 bg-[var(--hive-background-primary)]">
      <Component;
        {...data}
        {...Object.keys(initialData).reduce((acc, key) => {
          const changeHandler = `on${key.charAt(0).toUpperCase() + key.slice(1)}Change`;
          acc[changeHandler] = (value: any) => updateData(key, value);
          return acc;
        }, {} as any)}
        {...props}
      />
    </div>
  )
};

// 1. University Email Field;
export const UniversityEmailField: Story = {
  render: (args) => (
    <InteractiveField;
      Component={UniversityEmailFieldMolecule}
      initialData={{ value: '' }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Email field with university domain validation and visual feedback.',
      },
    },
  },
};

export const UniversityEmailWithValue: Story = {
  render: (args) => (
    <InteractiveField;
      Component={UniversityEmailFieldMolecule}
      initialData={{ value: 'sarah.chen@stanford.edu' }}
      university="Stanford University"
      {...args}
    />
  ),
};

export const UniversityEmailWithError: Story = {
  render: (args) => (
    <InteractiveField;
      Component={UniversityEmailFieldMolecule}
      initialData={{ value: 'notvalid@gmail.com' }}
      error="Please use your university email address"
      {...args}
    />
  ),
};

// 2. Student ID Field;
export const StudentIDField: Story = {
  render: (args) => (
    <InteractiveField;
      Component={StudentIDFieldMolecule}
      initialData={{ value: '' }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Student ID input with automatic format sanitization.',
      },
    },
  },
};

export const StudentIDWithValue: Story = {
  render: (args) => (
    <InteractiveField;
      Component={StudentIDFieldMolecule}
      initialData={{ value: '123456789' }}
      {...args}
    />
  ),
};

export const StudentIDWithError: Story = {
  render: (args) => (
    <InteractiveField;
      Component={StudentIDFieldMolecule}
      initialData={{ value: '' }}
      error="Student ID is required"
      required;
      {...args}
    />
  ),
};

// 3. Major Selection Field;
export const MajorSelectionField: Story = {
  render: (args) => (
    <InteractiveField;
      Component={MajorSelectionFieldMolecule}
      initialData={{ major: '', year: '' }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combined major and academic year selection with searchable options.',
      },
    },
  },
};

export const MajorSelectionWithValues: Story = {
  render: (args) => (
    <InteractiveField;
      Component={MajorSelectionFieldMolecule}
      initialData={{ major: 'computer-science', year: 'senior' }}
      {...args}
    />
  ),
};

export const MajorSelectionWithErrors: Story = {
  render: (args) => (
    <InteractiveField;
      Component={MajorSelectionFieldMolecule}
      initialData={{ major: '', year: '' }}
      majorError="Please select your major"
      yearError="Please select your academic year"
      required;
      {...args}
    />
  ),
};

// 4. Dorm Selection Field;
export const DormSelectionField: Story = {
  render: (args) => (
    <InteractiveField;
      Component={DormSelectionFieldMolecule}
      initialData={{ dormBuilding: '', roomNumber: '' }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Residence hall and room number input with validation.',
      },
    },
  },
};

export const DormSelectionWithValues: Story = {
  render: (args) => (
    <InteractiveField;
      Component={DormSelectionFieldMolecule}
      initialData={{ dormBuilding: 'Smith Hall', roomNumber: '314' }}
      {...args}
    />
  ),
};

// 5. Greek Affiliation Field;
export const GreekAffiliationField: Story = {
  render: (args) => (
    <InteractiveField;
      Component={GreekAffiliationFieldMolecule}
      initialData={{ organization: '', position: '' }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Greek life organization and position selection with conditional fields.',
      },
    },
  },
};

export const GreekAffiliationWithValues: Story = {
  render: (args) => (
    <InteractiveField;
      Component={GreekAffiliationFieldMolecule}
      initialData={{ organization: 'Alpha Beta Gamma', position: 'president' }}
      {...args}
    />
  ),
};

// 6. Calendar Connection Field;
export const CalendarConnectionField: Story = {
  render: (args) => (
    <InteractiveField;
      Component={CalendarConnectionFieldMolecule}
      initialData={{ googleCalendar: false, outlookCalendar: false, appleCalendar: false }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Calendar integration toggles with connection status indicators.',
      },
    },
  },
};

export const CalendarConnectionWithConnections: Story = {
  render: (args) => (
    <InteractiveField;
      Component={CalendarConnectionFieldMolecule}
      initialData={{ googleCalendar: true, outlookCalendar: false, appleCalendar: true }}
      {...args}
    />
  ),
};

// 7. Privacy Level Field;
export const PrivacyLevelField: Story = {
  render: (args) => (
    <InteractiveField;
      Component={PrivacyLevelFieldMolecule}
      initialData={{ value: 'friends' }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Privacy level selection with dynamic descriptions and ghost mode explanation.',
      },
    },
  },
};

export const PrivacyLevelPublic: Story = {
  render: (args) => (
    <InteractiveField;
      Component={PrivacyLevelFieldMolecule}
      initialData={{ value: 'public' }}
      {...args}
    />
  ),
};

export const PrivacyLevelGhost: Story = {
  render: (args) => (
    <InteractiveField;
      Component={PrivacyLevelFieldMolecule}
      initialData={{ value: 'ghost' }}
      {...args}
    />
  ),
};

// 8. Builder Verification Field;
export const BuilderVerificationField: Story = {
  render: (args) => (
    <InteractiveField;
      Component={BuilderVerificationFieldMolecule}
      initialData={{ portfolioUrl: '', githubUrl: '', experience: '' }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Builder verification with portfolio, GitHub, and experience level fields.',
      },
    },
  },
};

export const BuilderVerificationWithValues: Story = {
  render: (args) => (
    <InteractiveField;
      Component={BuilderVerificationFieldMolecule}
      initialData={{ 
        portfolioUrl: 'https://sarahchen.dev',
        githubUrl: 'github.com/sarahc',
        experience: 'intermediate'
          }}
      {...args}
    />
  ),
};

export const BuilderVerificationWithErrors: Story = {
  render: (args) => (
    <InteractiveField;
      Component={BuilderVerificationFieldMolecule}
      initialData={{ portfolioUrl: '', githubUrl: '', experience: '' }}
      experienceError="Please select your experience level"
      {...args}
    />
  ),
};

// 9. Space Activation Field;
export const SpaceActivationField: Story = {
  render: (args) => (
    <InteractiveField;
      Component={SpaceActivationFieldMolecule}
      initialData={{ spaceName: '', spaceType: '', description: '', expectedMembers: '' }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Space creation request form with name, type, description, and member count.',
      },
    },
  },
};

export const SpaceActivationWithValues: Story = {
  render: (args) => (
    <InteractiveField;
      Component={SpaceActivationFieldMolecule}
      initialData={{ 
        spaceName: 'CS Study Group',
        spaceType: 'academic',
        description: 'A collaborative study group for Computer Science students focusing on data structures and algorithms.',
        expectedMembers: '25'
          }}
      {...args}
    />
  ),
};

export const SpaceActivationWithErrors: Story = {
  render: (args) => (
    <InteractiveField;
      Component={SpaceActivationFieldMolecule}
      initialData={{ spaceName: '', spaceType: '', description: '', expectedMembers: '' }}
      spaceNameError="Space name is required"
      spaceTypeError="Please select a space type"
      descriptionError="Please describe your space"
      {...args}
    />
  ),
};

// 10. Tool Publishing Field;
export const ToolPublishingField: Story = {
  render: (args) => (
    <InteractiveField;
      Component={ToolPublishingFieldMolecule}
      initialData={{ toolName: '', toolDescription: '', toolCategory: '', repositoryUrl: '' }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tool publishing form with name, category, description, and repository fields.',
      },
    },
  },
};

export const ToolPublishingWithValues: Story = {
  render: (args) => (
    <InteractiveField;
      Component={ToolPublishingFieldMolecule}
      initialData={{ 
        toolName: 'GPA Calculator',
        toolDescription: 'A comprehensive GPA calculator that helps students track their academic progress, calculate semester and cumulative GPAs, and set grade goals for future courses.',
        toolCategory: 'academic',
        repositoryUrl: 'https://github.com/sarahc/gpa-calculator'
          }}
      {...args}
    />
  ),
};

export const ToolPublishingWithErrors: Story = {
  render: (args) => (
    <InteractiveField;
      Component={ToolPublishingFieldMolecule}
      initialData={{ toolName: '', toolDescription: '', toolCategory: '', repositoryUrl: '' }}
      toolNameError="Tool name is required"
      toolCategoryError="Please select a category"
      toolDescriptionError="Please describe your tool"
      {...args}
    />
  ),
};

// Form Collection Examples;
export const StudentOnboardingForm: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Complete Your Profile;
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Help us personalize your HIVE experience;
        </p>
      </div>

      <UniversityEmailFieldMolecule;
        value="maya.patel@berkeley.edu"
        university="UC Berkeley"
        required;
      />

      <StudentIDFieldMolecule;
        value="987654321"
        required;
      />

      <MajorSelectionFieldMolecule;
        major="biology"
        year="junior"
        required;
      />

      <DormSelectionFieldMolecule;
        dormBuilding="Unit 3"
        roomNumber="A205"
      />

      <PrivacyLevelFieldMolecule;
        value="friends"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete student onboarding form with multiple field types.',
      },
    },
  },
};

export const BuilderApplicationForm: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Apply to be a Builder;
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Join our community of student developers and creators;
        </p>
      </div>

      <BuilderVerificationFieldMolecule;
        portfolioUrl="https://jordankim.dev"
        githubUrl="github.com/jordank"
        experience="intermediate"
      />

      <ToolPublishingFieldMolecule;
        toolName="Study Scheduler"
        toolDescription="A smart scheduling tool that helps students optimize their study time based on their course load, deadlines, and personal energy levels throughout the day."
        toolCategory="productivity"
        repositoryUrl="https://github.com/jordank/study-scheduler"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Builder application form with verification and tool publishing fields.',
      },
    },
  },
};

export const SpaceLeaderRequestForm: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Request a New Space;
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Create a community for your group or organization;
        </p>
      </div>

      <SpaceActivationFieldMolecule;
        spaceName="Debate Club"
        spaceType="club"
        description="The official debate club for competitive debate tournaments, practice sessions, and public speaking skill development. We welcome all skill levels and provide training for beginners."
        expectedMembers="40"
      />

      <GreekAffiliationFieldMolecule;
        organization=""
        position=""
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Space leader request form for creating new communities.',
      },
    },
  },
};

export const ComprehensiveSettingsForm: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-[var(--hive-background-primary)]">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Account Settings;
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Manage your privacy and integrations;
        </p>
      </div>

      <PrivacyLevelFieldMolecule;
        value="friends"
      />

      <CalendarConnectionFieldMolecule;
        googleCalendar={true}
        outlookCalendar={false}
        appleCalendar={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive settings form with privacy and integration options.',
      },
    },
  },
};