import type { Meta, StoryObj } from '@storybook/react';
import { ProfileIdentityWidget } from './profile-identity-widget';
import type { UIProfile } from './profile-types';

const meta = {
  title: 'Organisms/Profile/ProfileIdentityWidget',
  component: ProfileIdentityWidget,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'black',
      values: [
        { name: 'black', value: '#000000' },
        { name: 'dark', value: '#171717' }
      ]
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-black p-8">
        <div className="max-w-2xl mx-auto">
          <Story />
        </div>
      </div>
    )
  ],
  tags: ['autodocs'],
  argTypes: {
    isOwnProfile: {
      control: 'boolean',
      description: 'Whether viewing own profile'
    },
    onEditPhoto: {
      action: 'editPhoto',
      description: 'Callback when edit photo is clicked'
    }
  }
} satisfies Meta<typeof ProfileIdentityWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample profile data following SPEC
const sampleProfile: UIProfile = {
  identity: {
    id: 'user-123',
    fullName: 'Sarah Chen',
    email: 'sarah.chen@buffalo.edu',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    photos: [],
    primaryPhotoIndex: 0,
    photoContexts: []
  },
  academic: {
    campusId: 'ub-buffalo',
    major: 'Computer Science',
    academicYear: 'junior',
    graduationYear: 2025,
    housing: 'Ellicott Complex',
    pronouns: 'she/her'
  },
  personal: {
    bio: 'CS major passionate about AI and machine learning. Looking for study partners for Algorithms and fellow coffee enthusiasts ☕',
    interests: ['Machine Learning', 'React', 'Coffee', 'Hiking'],
    lookingFor: ['study_partners', 'project_collaborators'],
    currentVibe: 'Grinding through midterms 📚'
  },
  privacy: {
    level: 'visible',
    widgets: {
      myActivity: { level: 'public' },
      mySpaces: { level: 'connections' },
      myConnections: { level: 'public' }
    }
  },
  social: {
    connections: {
      connectionIds: ['user-456', 'user-789', 'user-012'],
      friendIds: ['user-456'],
      strength: {}
    },
    mutualSpaces: ['space-cs350', 'space-ellicott', 'space-coffee-club']
  },
  verification: {
    emailVerified: true,
    profileVerified: true,
    accountStatus: 'active',
    userType: 'student',
    onboardingCompleted: true,
    facultyVerified: false
  },
  metadata: {
    completionPercentage: 85,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-10-01'),
    lastActiveAt: new Date()
  },
  widgets: {
    myActivity: { level: 'public' },
    mySpaces: { level: 'connections' },
    myConnections: { level: 'public' }
  }
};

// Stories
export const Default: Story = {
  args: {
    profile: sampleProfile,
    isOwnProfile: false
  }
};

export const OwnProfile: Story = {
  args: {
    profile: sampleProfile,
    isOwnProfile: true
  }
};

export const IncompleteProfile: Story = {
  args: {
    profile: {
      ...sampleProfile,
      identity: {
        ...sampleProfile.identity,
        avatarUrl: undefined
      },
      personal: {
        ...sampleProfile.personal,
        bio: undefined
      },
      metadata: {
        ...sampleProfile.metadata,
        completionPercentage: 45
      }
    },
    isOwnProfile: true
  }
};

export const VerifiedFaculty: Story = {
  args: {
    profile: {
      ...sampleProfile,
      identity: {
        ...sampleProfile.identity,
        fullName: 'Dr. James Wilson'
      },
      academic: {
        ...sampleProfile.academic,
        academicYear: 'faculty'
      },
      verification: {
        ...sampleProfile.verification,
        userType: 'faculty',
        facultyVerified: true
      }
    },
    isOwnProfile: false
  }
};

export const MinimalProfile: Story = {
  args: {
    profile: {
      identity: {
        id: 'user-minimal',
        fullName: 'Anonymous Student',
        email: 'student@buffalo.edu'
      },
      academic: {
        campusId: 'ub-buffalo'
      },
      personal: {
        interests: []
      },
      privacy: {
        level: 'visible',
        widgets: {}
      },
      social: {
        connections: {
          connectionIds: [],
          friendIds: [],
          strength: {}
        },
        mutualSpaces: []
      },
      verification: {
        emailVerified: true,
        profileVerified: false,
        accountStatus: 'active',
        userType: 'student',
        onboardingCompleted: false
      },
      metadata: {
        completionPercentage: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date()
      },
      widgets: {}
    },
    isOwnProfile: true
  }
};