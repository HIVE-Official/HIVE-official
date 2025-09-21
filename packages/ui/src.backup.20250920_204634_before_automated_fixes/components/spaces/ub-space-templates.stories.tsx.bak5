import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  UBSpaceTemplateCard, 
  UBSpacesDirectory, 
  SpaceActivationModal,
  UB_SPACE_TEMPLATES 
} from './ub-space-templates';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof UBSpaceTemplateCard> = {
  title: 'Spaces System/UB Campus Templates',
  component: UBSpaceTemplateCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# UB Campus Space Templates

University at Buffalo specific space templates that provide pre-seeded campus communities for students. These templates solve the cold-start problem by creating relevant campus spaces that students can immediately join or request to lead.

## Key Features

- **UB-Specific Communities**: Dorms, academic departments, student organizations
- **Activation System**: Students can request to lead preview spaces  
- **Leadership Recognition**: Shows current community leaders and their experience
- **Campus Integration**: Built specifically for UB culture and structure
- **Mobile Optimized**: Perfect touch interactions for on-campus use

## Space Categories

- **Residential**: Ellicott Complex, Governors, Creekside, etc.
- **Academic**: CSE, Engineering, Business, Medicine departments
- **Social**: Student Union, clubs, interest groups
- **Cultural**: International students, cultural organizations
- **Athletic**: Sports teams, recreational clubs

## Usage in HIVE Platform

These templates appear in the Spaces section of the dashboard and allow UB students to:
1. Discover relevant campus communities
2. Join active spaces with established leadership
3. Request to lead spaces that need activation
4. Build authentic campus connections around shared interests
        `
      }
    }
  },
  argTypes: {
    onRequestActivation: { action: 'request-activation' },
    onViewDetails: { action: 'view-details' }
  }
};

export default meta;
type Story = StoryObj<typeof UBSpaceTemplateCard>;

// =============================================================================
// INDIVIDUAL SPACE TEMPLATE CARD STORIES
// =============================================================================

export const ActiveSpace: Story = {
  args: {
    space: UB_SPACE_TEMPLATES[1], // Governors Complex - Active
    onRequestActivation: action('request-activation'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Active space with established leadership and current members. Shows leader information and join button.'
      }
    }
  }
};

export const PreviewSpace: Story = {
  args: {
    space: UB_SPACE_TEMPLATES[0], // Ellicott Complex - Preview
    onRequestActivation: action('request-activation'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Preview space waiting for student leadership. Shows expected member count and request activation button.'
      }
    }
  }
};

export const AcademicSpace: Story = {
  args: {
    space: UB_SPACE_TEMPLATES[2], // CSE Department - Active
    onRequestActivation: action('request-activation'),
    onViewDetails: action('view-details')
  },
  parameters: {
    docs: {
      description: {
        story: 'Academic department space with CS-specific leadership and high member count.'
      }
    }
  }
};

// =============================================================================
// UB SPACES DIRECTORY STORIES
// =============================================================================

export const CompleteDirectory: StoryObj<typeof UBSpacesDirectory> = {
  render: () => (
    <UBSpacesDirectory
      spaces={UB_SPACE_TEMPLATES}
      onRequestActivation={action('request-activation')}
      onViewDetails={action('view-details')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete UB spaces directory showing all campus communities organized by active/preview status.'
      }
    }
  }
};

export const ResidentialSpacesOnly: StoryObj<typeof UBSpacesDirectory> = {
  render: () => (
    <UBSpacesDirectory
      spaces={UB_SPACE_TEMPLATES}
      filterCategory="residential"
      onRequestActivation={action('request-activation')}
      onViewDetails={action('view-details')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filtered view showing only residential spaces (dorms and housing communities).'
      }
    }
  }
};

export const AcademicSpacesOnly: StoryObj<typeof UBSpacesDirectory> = {
  render: () => (
    <UBSpacesDirectory
      spaces={UB_SPACE_TEMPLATES}
      filterCategory="academic"
      onRequestActivation={action('request-activation')}
      onViewDetails={action('view-details')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filtered view showing only academic spaces (departments and schools).'
      }
    }
  }
};

// =============================================================================
// ACTIVATION REQUEST MODAL STORY
// =============================================================================

export const ActivationRequestModal: StoryObj<typeof SpaceActivationModal> = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    
    return (
      <>
        <button 
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Open Activation Modal
        </button>
        
        <SpaceActivationModal
          spaceId="ellicott-complex"
          spaceName="Ellicott Complex"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={(data) => {
            action('submit-activation')(data);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal for students to request leadership of a preview space. Collects leadership experience and community vision.'
      }
    }
  }
};

// =============================================================================
// UB CAMPUS SCENARIOS
// =============================================================================

export const UBFreshmanExperience: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Welcome to UB, Sarah! 🎓
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Discover your campus communities and connect with fellow Bulls
        </p>
      </div>
      
      <UBSpacesDirectory
        spaces={UB_SPACE_TEMPLATES.filter(space => 
          ['ellicott-complex', 'cse-department', 'student-union'].includes(space.id)
        )}
        onRequestActivation={action('freshman-request-activation')}
        onViewDetails={action('freshman-view-details')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Freshman student discovering relevant UB communities - dorm, major, and campus life spaces.'
      }
    }
  }
};

export const UBTransferStudentExperience: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Welcome Transfer Student! 🐂
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Quick integration into the UB community
        </p>
      </div>
      
      <UBSpacesDirectory
        spaces={UB_SPACE_TEMPLATES.filter(space => 
          ['governors-complex', 'engineering-school', 'international-students'].includes(space.id)
        )}
        onRequestActivation={action('transfer-request-activation')}
        onViewDetails={action('transfer-view-details')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Transfer student finding communities for quick campus integration and support networks.'
      }
    }
  }
};

// =============================================================================
// MOBILE RESPONSIVE STORIES
// =============================================================================

export const MobileSpaceCard: Story = {
  args: {
    space: UB_SPACE_TEMPLATES[1], // Active space
    onRequestActivation: action('mobile-request-activation'),
    onViewDetails: action('mobile-view-details')
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Space template card optimized for mobile viewing with touch-friendly interactions.'
      }
    }
  }
};

export const MobileDirectory: StoryObj<typeof UBSpacesDirectory> = {
  render: () => (
    <UBSpacesDirectory
      spaces={UB_SPACE_TEMPLATES.slice(0, 4)}
      onRequestActivation={action('mobile-request-activation')}
      onViewDetails={action('mobile-view-details')}
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized spaces directory with single-column layout and touch interactions.'
      }
    }
  }
};

// =============================================================================
// ACCESSIBILITY & EDGE CASES
// =============================================================================

export const EmptyDirectory: StoryObj<typeof UBSpacesDirectory> = {
  render: () => (
    <UBSpacesDirectory
      spaces={[]}
      filterCategory="nonexistent"
      onRequestActivation={action('empty-request-activation')}
      onViewDetails={action('empty-view-details')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no spaces match the current filter criteria.'
      }
    }
  }
};

export const HighVolumeDirectory: StoryObj<typeof UBSpacesDirectory> = {
  render: () => {
    // Create expanded template list for testing
    const expandedTemplates = [
      ...UB_SPACE_TEMPLATES,
      {
        id: 'lockwood-library',
        name: 'Lockwood Library Study Groups',
        category: 'academic' as const,
        description: 'Collaborative study spaces and academic resource sharing',
        expectedMembers: 567,
        icon: UB_SPACE_TEMPLATES[0].icon,
        isActive: true,
        activationRequest: {
          requesterName: 'Maya Patel',
          requesterEmail: 'mpatel@buffalo.edu',
          dateRequested: '2024-08-12',
          leadershipExperience: 'Library Student Assistant, Study Group Coordinator'
        }
      },
      {
        id: 'alumni-arena',
        name: 'Alumni Arena Sports Community',
        category: 'athletic' as const,
        description: 'Bulls sports fans, intramural teams, and athletic events',
        expectedMembers: 1823,
        icon: UB_SPACE_TEMPLATES[0].icon,
        isActive: false
      }
    ];
    
    return (
      <UBSpacesDirectory
        spaces={expandedTemplates}
        onRequestActivation={action('high-volume-request-activation')}
        onViewDetails={action('high-volume-view-details')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Directory with many spaces to test grid layout and performance.'
      }
    }
  }
};

// =============================================================================
// INTERACTION TESTING
// =============================================================================

export const InteractiveActivationFlow: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedSpace, setSelectedSpace] = React.useState('');
    
    const handleActivationRequest = (spaceId: string) => {
      const space = UB_SPACE_TEMPLATES.find(s => s.id === spaceId);
      setSelectedSpace(space?.name || '');
      setModalOpen(true);
    };
    
    return (
      <div className="space-y-6">
        <UBSpaceTemplateCard
          space={UB_SPACE_TEMPLATES[0]} // Preview space
          onRequestActivation={handleActivationRequest}
          onViewDetails={action('view-details')}
        />
        
        <SpaceActivationModal
          spaceId={UB_SPACE_TEMPLATES[0].id}
          spaceName={selectedSpace}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={(data) => {
            action('activation-submitted')(data);
            setModalOpen(false);
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete activation flow from space card to modal submission for UB students.'
      }
    }
  }
};