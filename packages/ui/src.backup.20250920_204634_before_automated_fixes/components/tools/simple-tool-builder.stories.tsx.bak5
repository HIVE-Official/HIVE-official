import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  SimpleToolBuilder, 
  UB_TOOL_TEMPLATES
} from './simple-tool-builder';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof SimpleToolBuilder> = {
  title: 'Tools System/Simple Tool Builder',
  component: SimpleToolBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Simple Tool Builder - UB Campus Coordination

The Simple Tool Builder enables UB students to create coordination tools for campus life in minutes. This system follows the HIVE philosophy of "social utility" - every tool builds community connections while solving real campus problems.

## Key Features

- **UB-Optimized Templates**: Study group schedulers, laundry trackers, food orders, project matchers
- **3-Step Process**: Select template → Configure settings → Preview & deploy
- **Campus Integration**: Built for UB residence halls, departments, and student organizations
- **Zero Code Required**: Visual interface makes tool building accessible to all students
- **Space Deployment**: Tools can be deployed to specific campus spaces or campus-wide

## Tool Templates

### Academic Tools
- **Study Group Scheduler**: Coordinate study sessions with availability polling
- **Project Team Matcher**: Match students for class projects based on skills
- **Room Booking Helper**: Coordinate group bookings of study rooms

### Campus Life Tools  
- **Dorm Laundry Tracker**: Track laundry machine availability and queues
- **Group Food Orders**: Coordinate bulk orders with cost splitting
- **Campus Event Poll**: Quick polls for event planning decisions

## Usage in HIVE Platform

This builder appears in the HiveLab section and allows students to:
1. Browse UB-specific tool templates
2. Configure tools for their communities
3. Deploy tools to relevant campus spaces
4. Share tools across the UB network

The goal is making tool creation so simple that any UB student can solve coordination problems for their community.
        `
      }
    }
  },
  argTypes: {
    onTemplateSelect: { action: 'template-select' },
    onBuildTool: { action: 'build-tool' }
  }
};

export default meta;
type Story = StoryObj<typeof SimpleToolBuilder>;

// =============================================================================
// COMPLETE TOOL BUILDER FLOW STORIES
// =============================================================================

export const CompleteBuilder: Story = {
  args: {
    onTemplateSelect: action('template-select'),
    onBuildTool: action('build-tool')
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete tool builder interface starting from template selection through deployment.'
      }
    }
  }
};

export const WithSelectedTemplate: Story = {
  args: {
    selectedTemplate: UB_TOOL_TEMPLATES[0], // Study Group Scheduler
    onTemplateSelect: action('template-select'),
    onBuildTool: action('build-tool')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool builder with a pre-selected template, showing the configuration step.'
      }
    }
  }
};

// =============================================================================
// TEMPLATE SELECTION STORIES
// =============================================================================

export const TemplateSelection: StoryObj<typeof ToolTemplateSelection> = {
  render: () => (
    <ToolTemplateSelection
      templates={UB_TOOL_TEMPLATES}
      onSelectTemplate={action('select-template')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Template selection interface showing all UB campus coordination tools organized by category.'
      }
    }
  }
};

export const AcademicTemplatesOnly: StoryObj<typeof ToolTemplateSelection> = {
  render: () => (
    <ToolTemplateSelection
      templates={UB_TOOL_TEMPLATES.filter(t => t.category === 'academic')}
      onSelectTemplate={action('select-academic-template')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Academic-focused tool templates for study coordination and project management.'
      }
    }
  }
};

export const CampusLifeTemplatesOnly: StoryObj<typeof ToolTemplateSelection> = {
  render: () => (
    <ToolTemplateSelection
      templates={UB_TOOL_TEMPLATES.filter(t => t.category === 'campus-life')}
      onSelectTemplate={action('select-campus-life-template')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus life tool templates for dorm coordination and daily activities.'
      }
    }
  }
};

// =============================================================================
// TOOL CONFIGURATION STORIES
// =============================================================================

export const ToolConfigurationStep: StoryObj<typeof ToolConfiguration> = {
  render: () => {
    const [config, setConfig] = React.useState({
      toolName: 'CS Algorithm Study Group',
      description: 'Weekly study sessions for CSE 331 - Data Structures & Algorithms',
      targetSpace: 'cse-department',
      isPublic: true,
      settings: {}
    });

    return (
      <ToolConfiguration
        template={UB_TOOL_TEMPLATES[0]} // Study Group Scheduler
        config={config}
        onConfigChange={setConfig}
        onNext={action('config-next')}
        onBack={action('config-back')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool configuration step with form fields for customizing the selected template.'
      }
    }
  }
};

export const LaundryTrackerConfiguration: StoryObj<typeof ToolConfiguration> = {
  render: () => {
    const [config, setConfig] = React.useState({
      toolName: 'Ellicott East Laundry Tracker',
      description: 'Track washing machine availability in Ellicott East laundry room',
      targetSpace: 'ellicott-complex',
      isPublic: false,
      settings: {}
    });

    return (
      <ToolConfiguration
        template={UB_TOOL_TEMPLATES[1]} // Dorm Laundry Tracker
        config={config}
        onConfigChange={setConfig}
        onNext={action('laundry-config-next')}
        onBack={action('laundry-config-back')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Configuration for a dorm-specific laundry tracking tool.'
      }
    }
  }
};

// =============================================================================
// TOOL PREVIEW STORIES
// =============================================================================

export const ToolPreviewStep: StoryObj<typeof ToolPreview> = {
  render: () => (
    <ToolPreview
      template={UB_TOOL_TEMPLATES[0]}
      config={{
        toolName: 'CS Algorithm Study Group',
        description: 'Weekly study sessions for CSE 331 - Data Structures & Algorithms',
        targetSpace: 'cse-department',
        isPublic: true,
        settings: {}
      }}
      onBuild={action('build-tool')}
      onBack={action('preview-back')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Final preview step showing the configured tool before deployment.'
      }
    }
  }
};

export const GroupFoodOrderPreview: StoryObj<typeof ToolPreview> = {
  render: () => (
    <ToolPreview
      template={UB_TOOL_TEMPLATES[2]} // Group Food Orders
      config={{
        toolName: 'Governors Friday Pizza Night',
        description: 'Weekly pizza orders from Picasso\'s with cost splitting',
        targetSpace: 'governors-complex',
        isPublic: false,
        settings: {}
      }}
      onBuild={action('build-food-order-tool')}
      onBack={action('food-preview-back')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Preview of a social coordination tool for group food ordering.'
      }
    }
  }
};

// =============================================================================
// CAMPUS SCENARIO STORIES
// =============================================================================

export const UBFreshmanToolBuilding: Story = {
  render: () => {
    const [mode, setMode] = React.useState<'select' | 'build'>('select');
    const [selectedTemplate, setSelectedTemplate] = React.useState(null);

    if (mode === 'build' && selectedTemplate) {
      return (
        <div className="space-y-6">
          <div className="text-center pb-6">
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
              Building Your First Campus Tool! 🛠️
            </h2>
            <p className="text-[var(--hive-text-secondary)]">
              Sarah, CSE major, Ellicott Complex resident
            </p>
          </div>
          
          <SimpleToolBuilder
            selectedTemplate={selectedTemplate}
            onTemplateSelect={action('freshman-template-select')}
            onBuildTool={action('freshman-build-tool')}
          />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center pb-6">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
            First Tool Builder Experience 🎓
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Sarah, a CSE freshman living in Ellicott, needs to coordinate study groups
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setSelectedTemplate(UB_TOOL_TEMPLATES[0]);
              setMode('build');
            }}
            className="p-6 border border-[var(--hive-border-default)] rounded-lg hover:border-[var(--hive-brand-secondary)] transition-colors text-left"
          >
            <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">
              Study Group Scheduler
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Perfect for organizing CS study sessions in Lockwood Library
            </p>
          </button>
          
          <button
            onClick={() => {
              setSelectedTemplate(UB_TOOL_TEMPLATES[1]);
              setMode('build');
            }}
            className="p-6 border border-[var(--hive-border-default)] rounded-lg hover:border-[var(--hive-brand-secondary)] transition-colors text-left"
          >
            <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">
              Laundry Tracker
            </h3>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              Track washing machines in Ellicott East
            </p>
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Freshman student experience building their first campus coordination tool.'
      }
    }
  }
};

export const RAToolBuildingExperience: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center pb-6">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          RA Building Floor Coordination Tools 🏠
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Marcus, RA in Governors Complex, building tools for resident coordination
        </p>
      </div>
      
      <SimpleToolBuilder
        selectedTemplate={UB_TOOL_TEMPLATES[2]} // Group Food Orders
        onTemplateSelect={action('ra-template-select')}
        onBuildTool={action('ra-build-tool')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resident Advisor building coordination tools for their floor community.'
      }
    }
  }
};

// =============================================================================
// MOBILE RESPONSIVE STORIES
// =============================================================================

export const MobileToolBuilder: Story = {
  args: {
    onTemplateSelect: action('mobile-template-select'),
    onBuildTool: action('mobile-build-tool')
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized tool builder with touch-friendly interactions and single-column layout.'
      }
    }
  }
};

export const MobileTemplateSelection: StoryObj<typeof ToolTemplateSelection> = {
  render: () => (
    <ToolTemplateSelection
      templates={UB_TOOL_TEMPLATES.slice(0, 4)}
      onSelectTemplate={action('mobile-select-template')}
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Template selection optimized for mobile devices with stacked card layout.'
      }
    }
  }
};

// =============================================================================
// INTERACTION TESTING STORIES
// =============================================================================

export const CompleteToolBuildingFlow: Story = {
  render: () => {
    const [step, setStep] = React.useState<'select' | 'configure' | 'preview'>('select');
    const [selectedTemplate, setSelectedTemplate] = React.useState(null);
    const [config, setConfig] = React.useState({
      toolName: '',
      description: '',
      targetSpace: '',
      isPublic: false,
      settings: {}
    });

    const handleTemplateSelect = (template) => {
      setSelectedTemplate(template);
      setConfig(prev => ({
        ...prev,
        toolName: template.name,
        description: template.description
      }));
      setStep('configure');
      action('flow-template-select')(template);
    };

    const handleConfigNext = () => {
      setStep('preview');
      action('flow-config-complete')(config);
    };

    const handleBuild = () => {
      action('flow-tool-built')({ template: selectedTemplate, config });
      alert('Tool built successfully! 🎉');
    };

    return (
      <div className="space-y-6">
        <div className="text-center pb-6">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
            Complete Tool Building Flow
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Interactive demonstration of the full tool creation process
          </p>
        </div>
        
        {step === 'select' && (
          <ToolTemplateSelection
            templates={UB_TOOL_TEMPLATES}
            onSelectTemplate={handleTemplateSelect}
          />
        )}
        
        {step === 'configure' && selectedTemplate && (
          <ToolConfiguration
            template={selectedTemplate}
            config={config}
            onConfigChange={setConfig}
            onNext={handleConfigNext}
            onBack={() => setStep('select')}
          />
        )}
        
        {step === 'preview' && selectedTemplate && (
          <ToolPreview
            template={selectedTemplate}
            config={config}
            onBuild={handleBuild}
            onBack={() => setStep('configure')}
          />
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete interactive flow from template selection through tool deployment.'
      }
    }
  }
};

// =============================================================================
// TOOL TEMPLATE SHOWCASE
// =============================================================================

export const AllUBTemplateShowcase: StoryObj<typeof ToolTemplateSelection> = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          UB Campus Tool Templates
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Pre-built solutions designed specifically for University at Buffalo student life
        </p>
      </div>
      
      <ToolTemplateSelection
        templates={UB_TOOL_TEMPLATES}
        onSelectTemplate={action('showcase-select-template')}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available UB campus tool templates with descriptions and use cases.'
      }
    }
  }
};

// =============================================================================
// ACCESSIBILITY & EDGE CASES
// =============================================================================

export const EmptyTemplateList: StoryObj<typeof ToolTemplateSelection> = {
  render: () => (
    <ToolTemplateSelection
      templates={[]}
      onSelectTemplate={action('empty-select-template')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no tool templates are available.'
      }
    }
  }
};

export const KeyboardNavigationTest: Story = {
  args: {
    onTemplateSelect: action('keyboard-template-select'),
    onBuildTool: action('keyboard-build-tool')
  },
  parameters: {
    docs: {
      description: {
        story: 'Tool builder with focus on keyboard navigation and accessibility compliance.'
      }
    }
  }
};

// =============================================================================
// PERFORMANCE TESTING
// =============================================================================

export const LargeTemplateSet: StoryObj<typeof ToolTemplateSelection> = {
  render: () => {
    // Create expanded template list for performance testing
    const expandedTemplates = [
      ...UB_TOOL_TEMPLATES,
      {
        id: 'advanced-scheduler',
        name: 'Advanced Study Scheduler',
        description: 'Multi-week study planning with calendar integration',
        category: 'academic' as const,
        icon: UB_TOOL_TEMPLATES[0].icon,
        complexity: 'advanced' as const,
        campusUseCase: 'Engineering capstone project coordination',
        expectedUsers: 45,
        buildTime: '20 minutes'
      },
      {
        id: 'event-coordinator',
        name: 'Campus Event Coordinator',
        description: 'Full event planning with RSVP and resource management',
        category: 'social' as const,
        icon: UB_TOOL_TEMPLATES[2].icon,
        complexity: 'advanced' as const,
        campusUseCase: 'Student organization event planning',
        expectedUsers: 200,
        buildTime: '30 minutes'
      },
      {
        id: 'mentor-matcher',
        name: 'Peer Mentor Matcher',
        description: 'Connect students with peer mentors in their field',
        category: 'academic' as const,
        icon: UB_TOOL_TEMPLATES[3].icon,
        complexity: 'medium' as const,
        campusUseCase: 'CS department peer mentoring program',
        expectedUsers: 120,
        buildTime: '15 minutes'
      }
    ];
    
    return (
      <ToolTemplateSelection
        templates={expandedTemplates}
        onSelectTemplate={action('large-set-select-template')}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance test with larger set of tool templates to verify grid layout and responsiveness.'
      }
    }
  }
};