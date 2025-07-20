import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { WizardToolBuilder } from '../../components/builders/wizard-tool-builder';

const meta: Meta<typeof WizardToolBuilder> = {
  title: '10-Creator/Wizard Tool Builder',
  component: WizardToolBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Guided tool creation wizard for new Builders**

Step-by-step tool creation interface that guides new Builders through the tool creation process. Perfect for educational use and onboarding new community members.

## When to Use
- Onboarding new Builders to HiveLAB
- Educational tool creation workflows
- Guided creation for complex tools
- First-time tool building experiences

## Design Principles
- **Educational First**: Teaches good tool building practices
- **Progressive Disclosure**: Shows only relevant options at each step
- **Guided Experience**: Clear next steps and helpful hints
- **Learning Focused**: Explains concepts and best practices

## Wizard Steps
1. **Tool Purpose**: Define what the tool will accomplish
2. **Choose Method**: Template, visual builder, or guided creation
3. **Configure Core**: Set up main functionality and properties
4. **Add Features**: Select additional capabilities and integrations
5. **Customize Appearance**: Branding, colors, and layout options
6. **Test & Preview**: Validate functionality before publishing
7. **Publish & Share**: Make tool available to community

## Educational Features
- **Contextual Help**: Tips and explanations at each step
- **Best Practices**: Guidance on tool design principles
- **Example Gallery**: Showcase of well-built tools for inspiration
- **Progress Tracking**: Clear indication of completion status

## Accessibility
- WCAG 2.1 AA compliant wizard navigation
- Clear step indicators and progress tracking
- Screen reader friendly help content
- Keyboard navigation through all wizard steps
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: 'number',
      min: 1,
      max: 7,
      description: 'Current wizard step (1-7)'
    },
    showHelp: {
      control: 'boolean',
      description: 'Display contextual help and tips'
    },
    allowSkipSteps: {
      control: 'boolean',
      description: 'Allow users to skip optional steps'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const wizardSteps = [
  {
    id: 1,
    title: 'Tool Purpose',
    description: 'What will your tool help students accomplish?',
    type: 'purpose',
    required: true
  },
  {
    id: 2,
    title: 'Creation Method',
    description: 'How would you like to build your tool?',
    type: 'method',
    required: true
  },
  {
    id: 3,
    title: 'Core Configuration',
    description: 'Set up the main functionality',
    type: 'core',
    required: true
  },
  {
    id: 4,
    title: 'Additional Features',
    description: 'Add extra capabilities to your tool',
    type: 'features',
    required: false
  },
  {
    id: 5,
    title: 'Appearance',
    description: 'Customize the look and feel',
    type: 'appearance',
    required: false
  },
  {
    id: 6,
    title: 'Test & Preview',
    description: 'Make sure everything works correctly',
    type: 'preview',
    required: true
  },
  {
    id: 7,
    title: 'Publish',
    description: 'Share your tool with the community',
    type: 'publish',
    required: true
  }
];

const toolPurposes = [
  {
    id: 'productivity',
    title: 'Productivity Tool',
    description: 'Help students manage time, tasks, or organize their work',
    icon: '⏰',
    examples: ['Study timers', 'Task managers', 'Schedule organizers']
  },
  {
    id: 'academic',
    title: 'Academic Tool',
    description: 'Support learning, calculations, or academic work',
    icon: '🎓',
    examples: ['GPA calculators', 'Unit converters', 'Study aids']
  },
  {
    id: 'collaboration',
    title: 'Collaboration Tool',
    description: 'Enable group work, communication, or community building',
    icon: '👥',
    examples: ['Polls', 'Group organizers', 'Peer review systems']
  },
  {
    id: 'creative',
    title: 'Creative Tool',
    description: 'Support design, media creation, or artistic expression',
    icon: '🎨',
    examples: ['Mood boards', 'Drawing tools', 'Media editors']
  }
];

const creationMethods = [
  {
    id: 'template',
    title: 'Use Template',
    description: 'Start with a proven template and customize it',
    difficulty: 'Beginner',
    timeEstimate: '5-10 minutes',
    pros: ['Quick to create', 'Proven design', 'Easy to customize'],
    icon: '📄'
  },
  {
    id: 'visual',
    title: 'Visual Builder',
    description: 'Drag and drop elements to build your tool',
    difficulty: 'Intermediate',
    timeEstimate: '15-30 minutes',
    pros: ['Full control', 'Visual feedback', 'Custom layouts'],
    icon: '🎯'
  },
  {
    id: 'guided',
    title: 'Guided Creation',
    description: 'Answer questions to generate your tool automatically',
    difficulty: 'Beginner',
    timeEstimate: '10-15 minutes',
    pros: ['No technical skills needed', 'Smart defaults', 'Educational'],
    icon: '🧭'
  }
];

export const CompleteWizard: Story = {
  args: {
    initialStep: 0,
    onComplete: (data: any) => {
      console.log('Wizard completed with data:', data);
    }
  }
};

export const PurposeStep: Story = {
  render: () => {
    const [selectedPurpose, setSelectedPurpose] = useState(null);

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 bg-hive-accent text-black rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <div>
              <h2 className="text-xl font-bold">What's the purpose of your tool?</h2>
              <p className="text-hive-foreground-muted">This helps us suggest the best building approach</p>
            </div>
          </div>
          
          <div className="w-full bg-hive-background-muted rounded-full h-2 mb-6">
            <div className="bg-hive-accent h-2 rounded-full w-1/7"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {toolPurposes.map(purpose => (
            <div
              key={purpose.id}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                selectedPurpose?.id === purpose.id
                  ? 'border-hive-accent bg-hive-accent/10'
                  : 'border-hive-border hover:border-hive-accent/50'
              }`}
              onClick={() => setSelectedPurpose(purpose)}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{purpose.icon}</div>
                <h3 className="text-lg font-semibold">{purpose.title}</h3>
              </div>
              <p className="text-sm text-hive-foreground-muted mb-4">
                {purpose.description}
              </p>
              <div className="space-y-1">
                <div className="text-xs font-medium">Examples:</div>
                {purpose.examples.map((example, i) => (
                  <div key={i} className="text-xs text-hive-foreground-muted">
                    • {example}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedPurpose && (
          <div className="bg-hive-background-card border border-hive-border rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedPurpose.icon}</span>
              <div>
                <div className="font-medium">Great choice!</div>
                <div className="text-sm text-hive-foreground-muted">
                  {selectedPurpose.title}s are popular in university communities
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button className="px-4 py-2 text-sm bg-hive-background-card border border-hive-border rounded disabled:opacity-50" disabled>
            Previous
          </button>
          <button 
            className={`px-6 py-2 text-sm rounded transition-colors ${
              selectedPurpose 
                ? 'bg-hive-accent text-black hover:bg-hive-accent-muted' 
                : 'bg-hive-background-muted text-hive-foreground-muted cursor-not-allowed'
            }`}
            disabled={!selectedPurpose}
          >
            Next: Choose Method
          </button>
        </div>
      </div>
    );
  }
};

export const MethodStep: Story = {
  render: () => {
    const [selectedMethod, setSelectedMethod] = useState(null);

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 bg-hive-accent text-black rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <div>
              <h2 className="text-xl font-bold">How would you like to build your tool?</h2>
              <p className="text-hive-foreground-muted">Choose the approach that matches your experience level</p>
            </div>
          </div>
          
          <div className="w-full bg-hive-background-muted rounded-full h-2 mb-6">
            <div className="bg-hive-accent h-2 rounded-full w-2/7"></div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {creationMethods.map(method => (
            <div
              key={method.id}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                selectedMethod?.id === method.id
                  ? 'border-hive-accent bg-hive-accent/10'
                  : 'border-hive-border hover:border-hive-accent/50'
              }`}
              onClick={() => setSelectedMethod(method)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{method.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{method.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      method.difficulty === 'Beginner' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {method.difficulty}
                    </span>
                    <span className="text-xs text-hive-foreground-muted">
                      {method.timeEstimate}
                    </span>
                  </div>
                  <p className="text-sm text-hive-foreground-muted mb-3">
                    {method.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {method.pros.map((pro, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-hive-background-muted rounded">
                        ✓ {pro}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button className="px-4 py-2 text-sm bg-hive-background-card border border-hive-border rounded">
            Previous
          </button>
          <button 
            className={`px-6 py-2 text-sm rounded transition-colors ${
              selectedMethod 
                ? 'bg-hive-accent text-black hover:bg-hive-accent-muted' 
                : 'bg-hive-background-muted text-hive-foreground-muted cursor-not-allowed'
            }`}
            disabled={!selectedMethod}
          >
            Next: Configure Tool
          </button>
        </div>
      </div>
    );
  }
};

export const PreviewStep: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 bg-hive-accent text-black rounded-full flex items-center justify-center font-semibold">
            6
          </div>
          <div>
            <h2 className="text-xl font-bold">Test your tool</h2>
            <p className="text-hive-foreground-muted">Make sure everything works before publishing</p>
          </div>
        </div>
        
        <div className="w-full bg-hive-background-muted rounded-full h-2 mb-6">
          <div className="bg-hive-accent h-2 rounded-full w-6/7"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="font-semibold mb-4">Tool Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-hive-background-card border border-hive-border rounded">
              <span className="text-sm text-hive-foreground-muted">Name:</span>
              <span className="text-sm font-medium">Study Timer Pro</span>
            </div>
            <div className="flex justify-between p-3 bg-hive-background-card border border-hive-border rounded">
              <span className="text-sm text-hive-foreground-muted">Type:</span>
              <span className="text-sm font-medium">Productivity Tool</span>
            </div>
            <div className="flex justify-between p-3 bg-hive-background-card border border-hive-border rounded">
              <span className="text-sm text-hive-foreground-muted">Method:</span>
              <span className="text-sm font-medium">Template-based</span>
            </div>
            <div className="flex justify-between p-3 bg-hive-background-card border border-hive-border rounded">
              <span className="text-sm text-hive-foreground-muted">Features:</span>
              <span className="text-sm font-medium">Timer, Analytics, Notes</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Test Checklist</h4>
            <div className="space-y-2">
              {[
                'Timer starts and stops correctly',
                'Sound alerts work properly', 
                'Analytics display accurately',
                'Notes save and load properly',
                'Mobile responsive design'
              ].map((test, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <span>{test}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Live Preview</h3>
          <div className="border border-hive-border rounded-lg overflow-hidden">
            <div className="p-3 bg-hive-background-muted border-b border-hive-border flex items-center justify-between">
              <div className="text-sm font-medium">Study Timer Pro</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-xs text-hive-foreground-muted">Live</div>
              </div>
            </div>
            <div className="p-6 bg-white text-black">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Focus Session</h3>
                <div className="text-4xl font-mono">25:00</div>
                <div className="flex justify-center gap-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">Start</button>
                  <button className="px-4 py-2 bg-gray-200 rounded">Reset</button>
                </div>
                <div className="text-sm text-gray-600">🔊 Sound alerts enabled</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="px-4 py-2 text-sm bg-hive-background-card border border-hive-border rounded">
          Previous
        </button>
        <button className="px-6 py-2 text-sm bg-hive-accent text-black rounded hover:bg-hive-accent-muted transition-colors">
          Publish Tool
        </button>
      </div>
    </div>
  )
};

export const ProgressTracking: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(3);

    return (
      <div className="max-w-3xl mx-auto p-6">
        <h3 className="text-lg font-semibold mb-6">Wizard Progress</h3>
        
        <div className="space-y-4">
          {wizardSteps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step.id < currentStep 
                  ? 'bg-green-500 text-white' 
                  : step.id === currentStep 
                    ? 'bg-hive-accent text-black' 
                    : 'bg-hive-background-muted text-hive-foreground-muted'
              }`}>
                {step.id < currentStep ? '✓' : step.id}
              </div>
              
              <div className="flex-1">
                <div className={`font-medium ${
                  step.id <= currentStep ? 'text-hive-foreground' : 'text-hive-foreground-muted'
                }`}>
                  {step.title}
                  {step.required && <span className="text-red-500 ml-1">*</span>}
                </div>
                <div className="text-sm text-hive-foreground-muted">
                  {step.description}
                </div>
              </div>
              
              <div className="text-xs text-hive-foreground-muted">
                {step.id < currentStep && 'Completed'}
                {step.id === currentStep && 'In Progress'}
                {step.id > currentStep && (step.required ? 'Required' : 'Optional')}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm bg-hive-background-card border border-hive-border rounded disabled:opacity-50"
          >
            Previous Step
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(wizardSteps.length, currentStep + 1))}
            disabled={currentStep === wizardSteps.length}
            className="px-4 py-2 text-sm bg-hive-accent text-black rounded hover:bg-hive-accent-muted transition-colors disabled:opacity-50"
          >
            Next Step
          </button>
        </div>
      </div>
    );
  }
};

export const InteractiveWizard: Story = {
  args: {
    initialStep: 0,
    onComplete: (data: any) => {
      console.log('Interactive wizard completed with data:', data);
    }
  }
};