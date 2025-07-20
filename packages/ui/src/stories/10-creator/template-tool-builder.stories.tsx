import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { TemplateToolBuilder } from '../../components/builders/template-tool-builder';

const meta: Meta<typeof TemplateToolBuilder> = {
  title: '10-Creator/Template Tool Builder',
  component: TemplateToolBuilder,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Template-based tool creation for rapid tool building**

Accelerated tool creation workflow using pre-built templates. Perfect for students who want to quickly create tools without starting from scratch.

## When to Use
- Quick tool creation from proven templates
- Educational tool building workflows
- Common tool pattern implementation
- Guided tool creation for new Builders

## Design Principles
- **Rapid Creation**: Get from idea to working tool quickly
- **Educational**: Templates teach good tool building patterns
- **Customizable**: All templates fully customizable after creation
- **Community-Driven**: Templates created and shared by successful Builders

## Template Categories
- **Study Tools**: Timers, flashcards, progress trackers
- **Academic Tools**: Calculators, converters, schedulers
- **Social Tools**: Polls, surveys, group organizers
- **Utility Tools**: File managers, note takers, bookmarks
- **Creative Tools**: Drawing pads, mood boards, galleries

## Builder Workflow
1. **Template Browse**: Explore categorized template library
2. **Preview**: See template functionality and customization options
3. **Customize**: Modify template properties and styling
4. **Generate**: Create tool instance from template
5. **Further Edit**: Switch to visual builder for advanced customization

## Accessibility
- WCAG 2.1 AA compliant template browsing interface
- Keyboard navigation through template categories
- Screen reader friendly template descriptions
- Clear customization workflow guidance
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    selectedCategory: {
      control: 'select',
      options: ['all', 'study', 'academic', 'social', 'utility', 'creative'],
      description: 'Currently selected template category'
    },
    showPreview: {
      control: 'boolean',
      description: 'Display template preview panel'
    },
    showCustomization: {
      control: 'boolean',
      description: 'Display template customization options'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const templateLibrary = [
  {
    id: 'pomodoro-timer',
    name: 'Pomodoro Study Timer',
    category: 'study',
    description: 'Classic 25-minute focus timer with break intervals and progress tracking',
    author: 'Sarah Chen',
    usageCount: 1247,
    rating: 4.9,
    difficulty: 'Beginner',
    estimatedTime: '5 minutes',
    preview: 'https://picsum.photos/300/200?random=1',
    tags: ['productivity', 'focus', 'time-management'],
    customizations: [
      { id: 'workDuration', name: 'Work Duration', type: 'number', default: 25, unit: 'minutes' },
      { id: 'breakDuration', name: 'Break Duration', type: 'number', default: 5, unit: 'minutes' },
      { id: 'longBreakDuration', name: 'Long Break Duration', type: 'number', default: 15, unit: 'minutes' },
      { id: 'cyclesBeforeLongBreak', name: 'Cycles Before Long Break', type: 'number', default: 4 },
      { id: 'soundEnabled', name: 'Enable Sound Alerts', type: 'boolean', default: true },
      { id: 'colorTheme', name: 'Color Theme', type: 'select', options: ['red', 'blue', 'green', 'purple'], default: 'red' }
    ]
  },
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'academic',
    description: 'Calculate semester and cumulative GPA with credit hours and grade points',
    author: 'Mike Johnson',
    usageCount: 892,
    rating: 4.7,
    difficulty: 'Beginner',
    estimatedTime: '3 minutes',
    preview: 'https://picsum.photos/300/200?random=2',
    tags: ['grades', 'academic', 'calculation'],
    customizations: [
      { id: 'gradeScale', name: 'Grade Scale', type: 'select', options: ['4.0', '4.3', '5.0'], default: '4.0' },
      { id: 'includeMinusPlus', name: 'Include +/- Grades', type: 'boolean', default: true },
      { id: 'showCumulativeGPA', name: 'Show Cumulative GPA', type: 'boolean', default: true },
      { id: 'allowCustomGrades', name: 'Allow Custom Grade Values', type: 'boolean', default: false }
    ]
  },
  {
    id: 'study-group-poll',
    name: 'Study Group Poll',
    category: 'social',
    description: 'Quick polling tool for study group decisions and meeting times',
    author: 'Alex Kim',
    usageCount: 456,
    rating: 4.5,
    difficulty: 'Beginner',
    estimatedTime: '2 minutes',
    preview: 'https://picsum.photos/300/200?random=3',
    tags: ['collaboration', 'polling', 'group-work'],
    customizations: [
      { id: 'maxOptions', name: 'Maximum Options', type: 'number', default: 5, max: 10 },
      { id: 'allowMultipleVotes', name: 'Allow Multiple Votes', type: 'boolean', default: false },
      { id: 'showResults', name: 'Show Live Results', type: 'boolean', default: true },
      { id: 'anonymousVoting', name: 'Anonymous Voting', type: 'boolean', default: false }
    ]
  },
  {
    id: 'flashcard-deck',
    name: 'Digital Flashcards',
    category: 'study',
    description: 'Interactive flashcard system with spaced repetition and progress tracking',
    author: 'Emma Davis',
    usageCount: 1156,
    rating: 4.8,
    difficulty: 'Intermediate',
    estimatedTime: '8 minutes',
    preview: 'https://picsum.photos/300/200?random=4',
    tags: ['memorization', 'study', 'spaced-repetition'],
    customizations: [
      { id: 'cardAnimation', name: 'Card Flip Animation', type: 'select', options: ['flip', 'fade', 'slide'], default: 'flip' },
      { id: 'showProgress', name: 'Show Progress Bar', type: 'boolean', default: true },
      { id: 'shuffleCards', name: 'Shuffle Cards', type: 'boolean', default: false },
      { id: 'spacedRepetition', name: 'Enable Spaced Repetition', type: 'boolean', default: true }
    ]
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    category: 'utility',
    description: 'Convert between different units for physics, chemistry, and engineering',
    author: 'David Wilson',
    usageCount: 687,
    rating: 4.6,
    difficulty: 'Beginner',
    estimatedTime: '4 minutes',
    preview: 'https://picsum.photos/300/200?random=5',
    tags: ['conversion', 'utility', 'science'],
    customizations: [
      { id: 'unitCategories', name: 'Unit Categories', type: 'multiselect', options: ['length', 'weight', 'temperature', 'volume', 'area'], default: ['length', 'weight'] },
      { id: 'precision', name: 'Decimal Precision', type: 'number', default: 2, max: 8 },
      { id: 'showFormulas', name: 'Show Conversion Formulas', type: 'boolean', default: false }
    ]
  },
  {
    id: 'mood-board',
    name: 'Digital Mood Board',
    category: 'creative',
    description: 'Visual inspiration board for design projects and creative brainstorming',
    author: 'Sophia Lee',
    usageCount: 234,
    rating: 4.4,
    difficulty: 'Advanced',
    estimatedTime: '12 minutes',
    preview: 'https://picsum.photos/300/200?random=6',
    tags: ['design', 'inspiration', 'visual'],
    customizations: [
      { id: 'boardLayout', name: 'Board Layout', type: 'select', options: ['grid', 'masonry', 'freeform'], default: 'masonry' },
      { id: 'allowUpload', name: 'Allow Image Upload', type: 'boolean', default: true },
      { id: 'enableCollaboration', name: 'Enable Collaboration', type: 'boolean', default: false },
      { id: 'exportFormat', name: 'Export Format', type: 'select', options: ['png', 'pdf', 'jpg'], default: 'png' }
    ]
  }
];

export const TemplateBrowser: Story = {
  args: {
    templates: templateLibrary,
    selectedCategory: 'all',
    showPreview: true,
    showCustomization: false
  }
};

export const StudyToolsCategory: Story = {
  args: {
    templates: templateLibrary.filter(t => t.category === 'study'),
    selectedCategory: 'study',
    showPreview: true,
    showCustomization: false
  }
};

export const AcademicToolsCategory: Story = {
  args: {
    templates: templateLibrary.filter(t => t.category === 'academic'),
    selectedCategory: 'academic',
    showPreview: true,
    showCustomization: false
  }
};

export const TemplateCustomization: Story = {
  render: () => {
    const [selectedTemplate, setSelectedTemplate] = useState(templateLibrary[0]);
    const [customizations, setCustomizations] = useState({});

    const updateCustomization = (id: string, value: any) => {
      setCustomizations(prev => ({ ...prev, [id]: value }));
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
        <div>
          <h3 className="text-lg font-semibold mb-4">Template: {selectedTemplate.name}</h3>
          <div className="space-y-4">
            <div className="text-sm text-hive-foreground-muted">
              {selectedTemplate.description}
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>{selectedTemplate.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>👥</span>
                <span>{selectedTemplate.usageCount} uses</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span>{selectedTemplate.estimatedTime}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Customization Options</h4>
              {selectedTemplate.customizations.map(option => (
                <div key={option.id} className="space-y-1">
                  <label className="text-sm font-medium">{option.name}</label>
                  {option.type === 'boolean' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={customizations[option.id] ?? option.default}
                        onChange={(e) => updateCustomization(option.id, e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm text-hive-foreground-muted">
                        {customizations[option.id] ?? option.default ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  )}
                  {option.type === 'number' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={customizations[option.id] ?? option.default}
                        onChange={(e) => updateCustomization(option.id, parseInt(e.target.value))}
                        max={option.max}
                        className="w-20 p-1 text-sm bg-hive-background-card border border-hive-border rounded"
                      />
                      {option.unit && (
                        <span className="text-sm text-hive-foreground-muted">{option.unit}</span>
                      )}
                    </div>
                  )}
                  {option.type === 'select' && (
                    <select
                      value={customizations[option.id] ?? option.default}
                      onChange={(e) => updateCustomization(option.id, e.target.value)}
                      className="p-1 text-sm bg-hive-background-card border border-hive-border rounded"
                    >
                      {option.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Live Preview</h4>
          <div className="border border-hive-border rounded-lg overflow-hidden">
            <div className="p-3 bg-hive-background-muted border-b border-hive-border flex items-center justify-between">
              <div className="text-sm font-medium">{selectedTemplate.name}</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="text-xs text-hive-foreground-muted">Live</div>
              </div>
            </div>
            <div className="p-4 bg-white text-black min-h-48">
              {selectedTemplate.id === 'pomodoro-timer' && (
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold">Focus Timer</h3>
                  <div className="text-4xl font-mono">{customizations.workDuration ?? 25}:00</div>
                  <div className="flex justify-center gap-2">
                    <button className="px-4 py-2 bg-red-500 text-white rounded">Start</button>
                    <button className="px-4 py-2 bg-gray-200 rounded">Reset</button>
                  </div>
                  {customizations.soundEnabled !== false && (
                    <div className="text-sm text-gray-600">🔊 Sound alerts enabled</div>
                  )}
                </div>
              )}
              {selectedTemplate.id === 'gpa-calculator' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">GPA Calculator</h3>
                  <div className="text-sm text-gray-600">
                    Scale: {customizations.gradeScale ?? '4.0'}
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-sm font-medium">
                      <div>Course</div>
                      <div>Grade</div>
                      <div>Credits</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <input className="p-2 border rounded" placeholder="CS 101" />
                      <select className="p-2 border rounded">
                        <option>A</option>
                        <option>A-</option>
                        <option>B+</option>
                      </select>
                      <input className="p-2 border rounded" placeholder="3" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const TemplateComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Popular Study Tools Comparison</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templateLibrary.filter(t => t.category === 'study').map(template => (
          <div key={template.id} className="border border-hive-border rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-100">
              <img 
                src={template.preview} 
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h4 className="font-semibold">{template.name}</h4>
                <p className="text-sm text-hive-foreground-muted">{template.description}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>{template.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>👥</span>
                  <span>{template.usageCount}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {template.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs bg-hive-background-muted rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm bg-hive-accent text-black rounded hover:bg-hive-accent-muted transition-colors">
                  Use Template
                </button>
                <button className="px-3 py-2 text-sm bg-hive-background-card border border-hive-border rounded hover:border-hive-accent transition-colors">
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export const TemplateCreationFlow: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const steps = [
      { id: 1, name: 'Choose Template', description: 'Select a template that matches your needs' },
      { id: 2, name: 'Customize', description: 'Adjust settings and properties' },
      { id: 3, name: 'Preview', description: 'Test your tool before creation' },
      { id: 4, name: 'Create', description: 'Generate your tool and start using it' }
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create Tool from Template</h3>
          <div className="text-sm text-hive-foreground-muted">
            Step {currentStep} of {steps.length}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id
                    ? 'bg-hive-accent text-black'
                    : 'bg-hive-background-muted text-hive-foreground-muted'
                }`}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <div>
                  <div className="text-sm font-medium">{step.name}</div>
                  <div className="text-xs text-hive-foreground-muted">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-8 ${
                  currentStep > step.id ? 'bg-hive-accent' : 'bg-hive-background-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="border border-hive-border rounded-lg p-6 min-h-64">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h4 className="font-medium">Choose a Template</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {templateLibrary.slice(0, 6).map(template => (
                  <div
                    key={template.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate?.id === template.id
                        ? 'border-hive-accent bg-hive-accent/10'
                        : 'border-hive-border hover:border-hive-accent/50'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {template.category === 'study' && '📚'}
                        {template.category === 'academic' && '🎓'}
                        {template.category === 'social' && '👥'}
                        {template.category === 'utility' && '🔧'}
                        {template.category === 'creative' && '🎨'}
                      </div>
                      <div className="text-sm font-medium">{template.name}</div>
                      <div className="text-xs text-hive-foreground-muted">{template.difficulty}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentStep === 2 && selectedTemplate && (
            <div className="space-y-4">
              <h4 className="font-medium">Customize: {selectedTemplate.name}</h4>
              <p className="text-sm text-hive-foreground-muted">{selectedTemplate.description}</p>
              <div className="text-sm">
                Customization options would appear here based on the selected template.
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4">
              <h4 className="font-medium">Preview Your Tool</h4>
              <div className="text-sm text-hive-foreground-muted">
                Test your tool functionality before creating it.
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="text-center space-y-4">
              <div className="text-4xl">🎉</div>
              <h4 className="font-medium">Tool Created Successfully!</h4>
              <p className="text-sm text-hive-foreground-muted">
                Your tool is ready to use and share with your Space.
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm bg-hive-background-card border border-hive-border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            disabled={currentStep === steps.length}
            className="px-4 py-2 text-sm bg-hive-accent text-black rounded hover:bg-hive-accent-muted transition-colors disabled:opacity-50"
          >
            {currentStep === steps.length ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    );
  }
};

export const InteractiveTemplateBuilder: Story = {
  args: {
    templates: templateLibrary,
    selectedCategory: 'all',
    showPreview: true,
    showCustomization: true,
    interactive: true,
    onTemplateSelect: (template: any) => {
      console.log('Template selected:', template.name);
    },
    onCustomizationChange: (templateId: string, customizations: any) => {
      console.log('Customizations updated:', templateId, customizations);
    },
    onToolCreate: (template: any, customizations: any) => {
      console.log('Tool created from template:', template.name, customizations);
    }
  }
};