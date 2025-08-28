// HIVE Wizard Tool Builder - Atomic Design: Template
// Guided step-by-step tool creation wizard

"use client";

import React, { useState, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Zap, 
  Target, 
  Palette, 
  Settings, 
  Eye,
  Save,
  Play,
  HelpCircle,
  Users,
  Lock,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { cn } from '../lib/utils';
import { HiveInput } from '../hive-input';
import { HiveTextarea } from '../hive-textarea';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle } from '../hive-card';
import { HiveSwitch } from '../hive-switch';
import { HiveSelect } from '../hive-select';
import { HiveMotionWrapper } from '../hive-motion-wrapper';
import { motion } from '../framer-motion-proxy';
import { ToolPreview } from './tool-preview';
import type { WizardBuilderProps, Tool, ToolCategory } from './types';

// Wizard steps
interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  isCompleted?: boolean;
  isOptional?: boolean;
}

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'purpose',
    title: 'Define Purpose',
    description: 'What problem will your tool solve?',
    icon: Target
  },
  {
    id: 'audience',
    title: 'Choose Audience',
    description: 'Who will use this tool?',
    icon: Users
  },
  {
    id: 'category',
    title: 'Select Category',
    description: 'What type of tool are you building?',
    icon: Zap
  },
  {
    id: 'design',
    title: 'Design & Style',
    description: 'Customize the look and feel',
    icon: Palette
  },
  {
    id: 'features',
    title: 'Add Features',
    description: 'Select tool functionality',
    icon: Settings
  },
  {
    id: 'preview',
    title: 'Preview & Test',
    description: 'Review your tool before saving',
    icon: Eye
  }
];

// Campus-specific tool categories with guided options
const TOOL_CATEGORIES = [
  {
    id: 'academic',
    name: 'Academic Tools',
    description: 'Course management, assignments, study aids',
    examples: ['Assignment tracker', 'Study scheduler', 'Grade calculator'],
    color: 'var(--hive-color-blue-500)',
    icon: '📚'
  },
  {
    id: 'social',
    name: 'Social Tools',
    description: 'Community building, events, communication',
    examples: ['Event polls', 'Group chat', 'Social calendar'],
    color: 'var(--hive-color-pink-500)',
    icon: '💬'
  },
  {
    id: 'productivity',
    name: 'Productivity Tools',
    description: 'Organization, planning, task management',
    examples: ['To-do lists', 'Time tracker', 'Goal planner'],
    color: 'var(--hive-color-green-500)',
    icon: '⚡'
  },
  {
    id: 'campus-life',
    name: 'Campus Life',
    description: 'Dining, housing, campus resources',
    examples: ['Dining reviews', 'Room finder', 'Campus map'],
    color: 'var(--hive-color-orange-500)',
    icon: '🏫'
  },
  {
    id: 'greek-life',
    name: 'Greek Life',
    description: 'Fraternity and sorority management',
    examples: ['Rush tracker', 'Event planning', 'Member directory'],
    color: 'var(--hive-color-purple-500)',
    icon: '🏛️'
  },
  {
    id: 'analytics',
    name: 'Analytics & Data',
    description: 'Data collection, reporting, insights',
    examples: ['Survey forms', 'Dashboard', 'Report generator'],
    color: 'var(--hive-color-yellow-500)',
    icon: '📊'
  }
];

// Predefined color themes
const COLOR_THEMES = [
  { name: 'HIVE Gold', primary: '#FFD700', secondary: '#FFF8DC', description: 'Classic HIVE branding' },
  { name: 'Academic Blue', primary: '#3B82F6', secondary: '#EBF4FF', description: 'Professional and trustworthy' },
  { name: 'Nature Green', primary: '#10B981', secondary: '#ECFDF5', description: 'Fresh and energetic' },
  { name: 'Campus Orange', primary: '#F97316', secondary: '#FFF7ED', description: 'Warm and inviting' },
  { name: 'Royal Purple', primary: '#8B5CF6', secondary: '#F3F0FF', description: 'Premium and elegant' },
  { name: 'Social Pink', primary: '#EC4899', secondary: '#FDF2F8', description: 'Friendly and approachable' }
];

// Common tool features
const TOOL_FEATURES = [
  {
    id: 'user-auth',
    name: 'User Authentication',
    description: 'Require users to log in',
    category: 'security',
    recommended: true
  },
  {
    id: 'data-collection',
    name: 'Data Collection',
    description: 'Collect and store user responses',
    category: 'functionality',
    recommended: true
  },
  {
    id: 'notifications',
    name: 'Notifications',
    description: 'Send alerts and updates to users',
    category: 'engagement',
    recommended: false
  },
  {
    id: 'analytics',
    name: 'Usage Analytics',
    description: 'Track how users interact with your tool',
    category: 'insights',
    recommended: false
  },
  {
    id: 'sharing',
    name: 'Social Sharing',
    description: 'Allow users to share content',
    category: 'social',
    recommended: false
  },
  {
    id: 'mobile-responsive',
    name: 'Mobile Responsive',
    description: 'Optimized for mobile devices',
    category: 'accessibility',
    recommended: true
  },
  {
    id: 'offline-mode',
    name: 'Offline Mode',
    description: 'Work without internet connection',
    category: 'accessibility',
    recommended: false
  },
  {
    id: 'real-time',
    name: 'Real-time Updates',
    description: 'Live updates and collaboration',
    category: 'advanced',
    recommended: false
  }
];

// Step component wrapper
interface StepWrapperProps {
  step: WizardStep;
  isActive: boolean;
  isCompleted: boolean;
  children: React.ReactNode;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ 
  step, 
  isActive, 
  isCompleted, 
  children 
}) => {
  const IconComponent = step.icon;

  return (
    <motion.div
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      className="w-full max-w-4xl mx-auto"
    >
      <HiveCard className="min-h-[500px]">
        <HiveCardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
              isCompleted 
                ? "bg-[var(--hive-color-gold-primary)] text-[var(--hive-background-primary)]"
                : "bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)]"
            )}>
              {isCompleted ? (
                <Check size={24} />
              ) : (
                <IconComponent size={24} />
              )}
            </div>
          </div>
          <HiveCardTitle className="text-2xl font-bold">
            {step.title}
          </HiveCardTitle>
          <p className="text-[var(--hive-text-secondary)] mt-2">
            {step.description}
          </p>
        </HiveCardHeader>

        <HiveCardContent className="pt-0">
          {children}
        </HiveCardContent>
      </HiveCard>
    </motion.div>
  );
};

// Individual step components
const PurposeStep: React.FC<{ tool: Tool; onChange: (tool: Tool) => void }> = ({ 
  tool, 
  onChange 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
          Tool Name
        </label>
        <HiveInput
          value={tool.name}
          onChange={(e) => onChange({ ...tool, name: e.target.value })}
          placeholder="Give your tool a descriptive name..."
          className="text-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
          What problem does this tool solve?
        </label>
        <HiveTextarea
          value={tool.description}
          onChange={(e) => onChange({ ...tool, description: e.target.value })}
          placeholder="Describe the problem your tool addresses and how it helps users..."
          rows={4}
        />
      </div>

      {/* Purpose examples */}
      <div>
        <h3 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">
          Popular Campus Tool Ideas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Track assignment deadlines across all courses',
            'Coordinate study group meetings and locations',
            'Rate and review campus dining options',
            'Find compatible roommates based on preferences',
            'Organize club events and manage RSVPs',
            'Create polls for group decision making'
          ].map((idea, index) => (
            <HiveButton
              key={index}
              variant="secondary"
              size="sm"
              onClick={() => onChange({ 
                ...tool, 
                description: idea + '. This tool will help students by providing an easy-to-use interface for this common campus need.'
              })}
              className="text-left h-auto py-3 justify-start"
            >
              <span className="text-sm">{idea}</span>
            </HiveButton>
          ))}
        </div>
      </div>
    </div>
  );
};

const AudienceStep: React.FC<{ tool: Tool; onChange: (tool: Tool) => void }> = ({ 
  tool, 
  onChange 
}) => {
  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);
  
  const audiences = [
    { id: 'students', name: 'Students', description: 'Undergraduate and graduate students', icon: '🎓' },
    { id: 'faculty', name: 'Faculty', description: 'Professors and instructors', icon: '👨‍🏫' },
    { id: 'staff', name: 'Staff', description: 'University administrators and staff', icon: '👔' },
    { id: 'clubs', name: 'Student Organizations', description: 'Clubs, societies, and groups', icon: '🏛️' },
    { id: 'greek', name: 'Greek Life', description: 'Fraternities and sororities', icon: '🏺' },
    { id: 'public', name: 'General Public', description: 'Open to everyone', icon: '🌍' }
  ];

  const toggleAudience = (audienceId: string) => {
    const newAudience = selectedAudience.includes(audienceId)
      ? selectedAudience.filter(id => id !== audienceId)
      : [...selectedAudience, audienceId];
    
    setSelectedAudience(newAudience);
    onChange({ 
      ...tool, 
      metadata: { 
        ...tool.metadata, 
        tags: [...(tool.metadata.tags || []), ...newAudience] 
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">
          Who is your primary audience?
        </h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
          Select all groups that will use this tool. This helps with permissions and features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audiences.map((audience) => (
          <HiveCard
            key={audience.id}
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedAudience.includes(audience.id)
                ? "ring-2 ring-[var(--hive-color-gold-primary)] bg-[var(--hive-color-gold-primary)]/5"
                : "hover:shadow-md"
            )}
            onClick={() => toggleAudience(audience.id)}
          >
            <HiveCardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{audience.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">
                    {audience.name}
                  </h4>
                  <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
                    {audience.description}
                  </p>
                </div>
                {selectedAudience.includes(audience.id) && (
                  <Check size={20} className="text-[var(--hive-color-gold-primary)]" />
                )}
              </div>
            </HiveCardContent>
          </HiveCard>
        ))}
      </div>

      {/* Privacy settings */}
      <div className="mt-8 pt-6 border-t border-[var(--hive-border-default)]">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">
          Privacy & Access
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-[var(--hive-text-primary)]">Public Tool</h4>
              <p className="text-sm text-[var(--hive-text-secondary)]">
                Anyone can discover and use this tool
              </p>
            </div>
            <HiveSwitch
              checked={tool.isPublic}
              onCheckedChange={(checked) => onChange({ ...tool, isPublic: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-[var(--hive-text-primary)]">Require Authentication</h4>
              <p className="text-sm text-[var(--hive-text-secondary)]">
                Users must log in to use this tool
              </p>
            </div>
            <HiveSwitch
              checked={tool.config.requireAuthentication}
              onCheckedChange={(checked) => onChange({ 
                ...tool, 
                config: { ...tool.config, requireAuthentication: checked }
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryStep: React.FC<{ tool: Tool; onChange: (tool: Tool) => void }> = ({ 
  tool, 
  onChange 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(tool.metadata.category || '');

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onChange({
      ...tool,
      metadata: {
        ...tool.metadata,
        category: categoryId as ToolCategory
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">
          What category best describes your tool?
        </h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
          This helps users discover your tool and suggests relevant features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TOOL_CATEGORIES.map((category) => (
          <HiveCard
            key={category.id}
            className={cn(
              "cursor-pointer transition-all duration-200",
              selectedCategory === category.id
                ? "ring-2 ring-[var(--hive-color-gold-primary)] bg-[var(--hive-color-gold-primary)]/5"
                : "hover:shadow-md"
            )}
            onClick={() => selectCategory(category.id)}
          >
            <HiveCardContent className="p-6">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  {category.icon}
                </div>
                <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                  {category.name}
                </h4>
                <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
                  {category.description}
                </p>
                <div className="text-xs text-[var(--hive-text-tertiary)]">
                  Examples: {category.examples.join(', ')}
                </div>
                {selectedCategory === category.id && (
                  <div className="mt-4">
                    <HiveBadge className="bg-[var(--hive-color-gold-primary)] text-[var(--hive-background-primary)]">
                      <Check size={12} />
                      Selected
                    </HiveBadge>
                  </div>
                )}
              </div>
            </HiveCardContent>
          </HiveCard>
        ))}
      </div>
    </div>
  );
};

const DesignStep: React.FC<{ tool: Tool; onChange: (tool: Tool) => void }> = ({ 
  tool, 
  onChange 
}) => {
  const [selectedTheme, setSelectedTheme] = useState(tool.config.primaryColor || COLOR_THEMES[0].primary);

  const selectTheme = (theme: typeof COLOR_THEMES[0]) => {
    setSelectedTheme(theme.primary);
    onChange({
      ...tool,
      config: {
        ...tool.config,
        primaryColor: theme.primary,
        backgroundColor: theme.secondary
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Color theme selection */}
      <div>
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">
          Choose a Color Theme
        </h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
          Select colors that match your tool's purpose and audience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLOR_THEMES.map((theme) => (
            <HiveCard
              key={theme.name}
              className={cn(
                "cursor-pointer transition-all duration-200",
                selectedTheme === theme.primary
                  ? "ring-2 ring-[var(--hive-color-gold-primary)]"
                  : "hover:shadow-md"
              )}
              onClick={() => selectTheme(theme)}
            >
              <HiveCardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">
                    <div 
                      className="w-6 h-6 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: theme.secondary }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[var(--hive-text-primary)]">
                      {theme.name}
                    </h4>
                  </div>
                  {selectedTheme === theme.primary && (
                    <Check size={16} className="text-[var(--hive-color-gold-primary)]" />
                  )}
                </div>
                <p className="text-xs text-[var(--hive-text-secondary)]">
                  {theme.description}
                </p>
              </HiveCardContent>
            </HiveCard>
          ))}
        </div>
      </div>

      {/* Theme preferences */}
      <div className="pt-6 border-t border-[var(--hive-border-default)]">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-4">
          Theme Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
              Theme Mode
            </label>
            <HiveSelect
              value={tool.config.theme || 'auto'}
              onValueChange={(value) => onChange({
                ...tool,
                config: { ...tool.config, theme: value as any }
              })}
              options={[
                { value: 'auto', label: 'Auto (System Preference)' },
                { value: 'light', label: 'Light Mode' },
                { value: 'dark', label: 'Dark Mode' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesStep: React.FC<{ tool: Tool; onChange: (tool: Tool) => void }> = ({ 
  tool, 
  onChange 
}) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (featureId: string) => {
    const newFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter(id => id !== featureId)
      : [...selectedFeatures, featureId];
    
    setSelectedFeatures(newFeatures);
    
    // Update tool config based on selected features
    const updatedConfig = { ...tool.config };
    
    if (newFeatures.includes('user-auth')) {
      updatedConfig.requireAuthentication = true;
    }
    if (newFeatures.includes('analytics')) {
      updatedConfig.trackingEnabled = true;
    }
    if (newFeatures.includes('notifications')) {
      updatedConfig.notifyOnSubmission = true;
    }

    onChange({ ...tool, config: updatedConfig });
  };

  const featuresByCategory = TOOL_FEATURES.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, typeof TOOL_FEATURES>);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">
          Add Features to Your Tool
        </h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
          Select features that enhance your tool's functionality. Recommended features are pre-selected.
        </p>
      </div>

      {Object.entries(featuresByCategory).map(([categoryName, features]) => (
        <div key={categoryName}>
          <h4 className="font-medium text-[var(--hive-text-primary)] mb-3 capitalize">
            {categoryName}
          </h4>
          <div className="space-y-3">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer transition-all duration-200",
                  selectedFeatures.includes(feature.id) || feature.recommended
                    ? "border-[var(--hive-color-gold-primary)] bg-[var(--hive-color-gold-primary)]/5"
                    : "border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)]"
                )}
                onClick={() => toggleFeature(feature.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-[var(--hive-text-primary)]">
                        {feature.name}
                      </h5>
                      {feature.recommended && (
                        <HiveBadge variant="course-tag" className="text-xs">
                          Recommended
                        </HiveBadge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      {feature.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <HiveSwitch
                      checked={selectedFeatures.includes(feature.id) || feature.recommended}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const PreviewStep: React.FC<{ tool: Tool }> = ({ tool }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3">
          Your Tool is Ready!
        </h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-6">
          Review your tool configuration and test it before saving.
        </p>
      </div>

      {/* Tool summary */}
      <HiveCard>
        <HiveCardContent className="p-6">
          <div className="flex items-start gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: tool.config.primaryColor + '20' }}
            >
              🛠️
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
                {tool.name}
              </h4>
              <p className="text-[var(--hive-text-secondary)] mb-4">
                {tool.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <HiveBadge variant="course-tag">
                  {tool.metadata.category}
                </HiveBadge>
                <HiveBadge variant="course-tag">
                  {tool.config.theme} theme
                </HiveBadge>
                {tool.isPublic && (
                  <HiveBadge variant="course-tag">
                    <Globe size={12} />
                    Public
                  </HiveBadge>
                )}
                {tool.config.requireAuthentication && (
                  <HiveBadge variant="course-tag">
                    <Lock size={12} />
                    Auth Required
                  </HiveBadge>
                )}
              </div>
            </div>
          </div>
        </HiveCardContent>
      </HiveCard>

      {/* Preview actions */}
      <div className="flex gap-4 justify-center">
        <HiveButton
          variant="secondary"
          onClick={() => setShowPreview(true)}
          className="flex items-center gap-2"
        >
          <Eye size={16} />
          Preview Tool
        </HiveButton>
      </div>

      {/* Next steps */}
      <div className="text-center pt-6 border-t border-[var(--hive-border-default)]">
        <h4 className="font-medium text-[var(--hive-text-primary)] mb-2">
          Next Steps
        </h4>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
          After saving, you can customize your tool further in the visual builder or deploy it immediately.
        </p>
        <div className="flex gap-2 justify-center text-xs text-[var(--hive-text-tertiary)]">
          <div className="flex items-center gap-1">
            <Monitor size={12} />
            Desktop ready
          </div>
          <div className="flex items-center gap-1">
            <Tablet size={12} />
            Tablet optimized
          </div>
          <div className="flex items-center gap-1">
            <Smartphone size={12} />
            Mobile responsive
          </div>
        </div>
      </div>

      {/* Preview modal */}
      {showPreview && (
        <ToolPreview
          tool={tool}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

// Main Wizard Tool Builder component
export const WizardToolBuilder: React.FC<WizardBuilderProps> = ({
  tool,
  onChange,
  onSave,
  onPreview,
  isLoading = false
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const currentStepData = WIZARD_STEPS[currentStep];
  const isLastStep = currentStep === WIZARD_STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  // Check if current step is completed
  const isCurrentStepCompleted = useCallback(() => {
    switch (currentStepData.id) {
      case 'purpose':
        return tool.name.trim() && tool.description.trim();
      case 'audience':
        return true; // Audience step is always considered complete
      case 'category':
        return tool.metadata.category;
      case 'design':
        return tool.config.primaryColor;
      case 'features':
        return true; // Features step is always considered complete
      case 'preview':
        return true; // Preview step is always considered complete
      default:
        return false;
    }
  }, [tool, currentStepData.id]);

  // Handle next step
  const handleNext = () => {
    if (isCurrentStepCompleted()) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      if (!isLastStep) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle step navigation
  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex - 1)) {
      setCurrentStep(stepIndex);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStepData.id) {
      case 'purpose':
        return <PurposeStep tool={tool} onChange={onChange} />;
      case 'audience':
        return <AudienceStep tool={tool} onChange={onChange} />;
      case 'category':
        return <CategoryStep tool={tool} onChange={onChange} />;
      case 'design':
        return <DesignStep tool={tool} onChange={onChange} />;
      case 'features':
        return <FeaturesStep tool={tool} onChange={onChange} />;
      case 'preview':
        return <PreviewStep tool={tool} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Progress bar */}
      <div className="sticky top-0 z-10 bg-[var(--hive-background-secondary)] border-b border-[var(--hive-border-default)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          {/* Steps navigation */}
          <div className="flex items-center justify-between mb-4">
            {WIZARD_STEPS.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === currentStep;
              const isCompleted = completedSteps.has(index);
              const isAccessible = index <= currentStep || completedSteps.has(index - 1);

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                      isActive 
                        ? "bg-[var(--hive-color-gold-primary)] text-[var(--hive-background-primary)]"
                        : isCompleted
                        ? "bg-[var(--hive-color-gold-primary)] text-[var(--hive-background-primary)]"
                        : isAccessible
                        ? "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] hover:bg-[var(--hive-interactive-hover)]"
                        : "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-disabled)] cursor-not-allowed"
                    )}
                    onClick={() => isAccessible && goToStep(index)}
                    disabled={!isAccessible}
                  >
                    {isCompleted ? (
                      <Check size={16} />
                    ) : (
                      <IconComponent size={16} />
                    )}
                  </button>
                  
                  {index < WIZARD_STEPS.length - 1 && (
                    <div 
                      className="w-8 h-px bg-[var(--hive-border-default)] mx-2"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[var(--hive-background-tertiary)] rounded-full h-2">
            <div 
              className="bg-[var(--hive-color-gold-primary)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / WIZARD_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <StepWrapper
          step={currentStepData}
          isActive={true}
          isCompleted={completedSteps.has(currentStep)}
        >
          {renderStepContent()}
        </StepWrapper>
      </div>

      {/* Navigation footer */}
      <div className="sticky bottom-0 bg-[var(--hive-background-secondary)] border-t border-[var(--hive-border-default)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--hive-text-secondary)]">
                Step {currentStep + 1} of {WIZARD_STEPS.length}
              </span>
              {!isCurrentStepCompleted() && (
                <HiveBadge variant="course-tag" className="text-xs">
                  <HelpCircle size={12} />
                  Complete to continue
                </HiveBadge>
              )}
            </div>

            <div className="flex gap-2">
              <HiveButton
                variant="secondary"
                onClick={handlePrevious}
                disabled={isFirstStep}
              >
                <ChevronLeft size={16} />
                Previous
              </HiveButton>

              {isLastStep ? (
                <div className="flex gap-2">
                  <HiveButton
                    variant="secondary"
                    onClick={() => onSave(tool)}
                    disabled={isLoading}
                  >
                    <Save size={16} />
                    Save Draft
                  </HiveButton>
                  <HiveButton
                    variant="primary"
                    onClick={() => onPreview(tool)}
                  >
                    <Play size={16} />
                    Build Tool
                  </HiveButton>
                </div>
              ) : (
                <HiveButton
                  onClick={handleNext}
                  disabled={!isCurrentStepCompleted()}
                >
                  Next
                  <ChevronRight size={16} />
                </HiveButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardToolBuilder;