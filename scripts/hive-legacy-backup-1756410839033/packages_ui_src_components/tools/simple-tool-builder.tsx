'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from '../../atomic/atoms/badge';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Text } from '../../ui/typography';
import { PlatformIcons } from '../../ui/platform-icons';
import { cn } from '../lib/utils';
import { 
  Plus,
  Edit,
  Eye,
  Share2,
  Settings,
  CheckSquare,
  Clock,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  FileText,
  Zap
} from 'lucide-react';

// =============================================================================
// UB CAMPUS TOOL TEMPLATES
// =============================================================================

export interface UBToolTemplate {
  id: string;
  name: string;
  description: string;
  category: 'coordination' | 'academic' | 'social' | 'campus-life';
  icon: React.ComponentType<any>;
  complexity: 'simple' | 'medium' | 'advanced';
  campusUseCase: string;
  expectedUsers: number;
  buildTime: string;
}

export const UB_TOOL_TEMPLATES: UBToolTemplate[] = [
  {
    id: 'study-group-scheduler',
    name: 'Study Group Scheduler',
    description: 'Coordinate study sessions with availability polling and location booking',
    category: 'academic',
    icon: Calendar,
    complexity: 'simple',
    campusUseCase: 'CS students organizing algorithm study sessions in Lockwood Library',
    expectedUsers: 25,
    buildTime: '5 minutes'
  },
  {
    id: 'dorm-laundry-tracker',
    name: 'Dorm Laundry Tracker',
    description: 'Track laundry machine availability and queue notifications',
    category: 'campus-life',
    icon: Clock,
    complexity: 'simple',
    campusUseCase: 'Ellicott residents coordinating laundry room usage',
    expectedUsers: 150,
    buildTime: '3 minutes'
  },
  {
    id: 'group-food-orders',
    name: 'Group Food Orders',
    description: 'Coordinate bulk food orders with cost splitting and delivery',
    category: 'social',
    icon: Users,
    complexity: 'medium',
    campusUseCase: 'Governors residents ordering from local Buffalo restaurants',
    expectedUsers: 40,
    buildTime: '10 minutes'
  },
  {
    id: 'project-team-matcher',
    name: 'Project Team Matcher',
    description: 'Match students for class projects based on skills and availability',
    category: 'academic',
    icon: Users,
    complexity: 'medium',
    campusUseCase: 'Engineering students forming capstone project teams',
    expectedUsers: 80,
    buildTime: '15 minutes'
  },
  {
    id: 'campus-event-poll',
    name: 'Campus Event Poll',
    description: 'Quick polls for event planning and decision making',
    category: 'coordination',
    icon: CheckSquare,
    complexity: 'simple',
    campusUseCase: 'Student org planning Spring Fest activities',
    expectedUsers: 200,
    buildTime: '2 minutes'
  },
  {
    id: 'room-booking-helper',
    name: 'Room Booking Helper',
    description: 'Coordinate group bookings of study rooms and meeting spaces',
    category: 'academic',
    icon: FileText,
    complexity: 'simple',
    campusUseCase: 'Group study sessions in Student Union conference rooms',
    expectedUsers: 60,
    buildTime: '5 minutes'
  }
];

// =============================================================================
// SIMPLE TOOL BUILDER INTERFACE
// =============================================================================

interface SimpleToolBuilderProps {
  selectedTemplate?: UBToolTemplate;
  onTemplateSelect?: (template: UBToolTemplate) => void;
  onBuildTool?: (template: UBToolTemplate, config: ToolBuildConfig) => void;
  className?: string;
}

export interface ToolBuildConfig {
  toolName: string;
  description: string;
  targetSpace?: string;
  isPublic: boolean;
  settings: Record<string, any>;
}

export function SimpleToolBuilder({ 
  selectedTemplate,
  onTemplateSelect,
  onBuildTool,
  className 
}: SimpleToolBuilderProps) {
  const [buildConfig, setBuildConfig] = React.useState<ToolBuildConfig>({
    toolName: '',
    description: '',
    targetSpace: '',
    isPublic: false,
    settings: {}
  });
  
  const [activeStep, setActiveStep] = React.useState<'select' | 'configure' | 'preview'>('select');
  
  React.useEffect(() => {
    if (selectedTemplate) {
      setBuildConfig(prev => ({
        ...prev,
        toolName: selectedTemplate.name,
        description: selectedTemplate.description
      }));
      setActiveStep('configure');
    }
  }, [selectedTemplate]);
  
  return (
    <div className={cn("max-w-4xl mx-auto space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
          <Text variant="h1" weight="bold">
            UB Campus Tool Builder
          </Text>
        </div>
        <Text variant="body-lg" color="secondary">
          Build coordination tools for your campus community in minutes
        </Text>
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {(['select', 'configure', 'preview'] as const).map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              activeStep === step 
                ? "bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)]" 
                : index < ['select', 'configure', 'preview'].indexOf(activeStep)
                ? "bg-[var(--hive-status-success)] text-[var(--hive-text-inverse)]"
                : "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)]"
            )}>
              {index + 1}
            </div>
            <Text variant="body-sm" weight="medium" color={
              activeStep === step ? 'primary' : 'secondary'
            }>
              {step === 'select' ? 'Choose Template' : 
               step === 'configure' ? 'Configure Tool' : 'Preview & Build'}
            </Text>
            {index < 2 && (
              <div className="w-8 h-px bg-[var(--hive-border-default)]" />
            )}
          </div>
        ))}
      </div>
      
      {/* Template Selection */}
      {activeStep === 'select' && (
        <ToolTemplateSelection
          templates={UB_TOOL_TEMPLATES}
          onSelectTemplate={(template) => {
            onTemplateSelect?.(template);
            setActiveStep('configure');
          }}
        />
      )}
      
      {/* Configuration */}
      {activeStep === 'configure' && selectedTemplate && (
        <ToolConfiguration
          template={selectedTemplate}
          config={buildConfig}
          onConfigChange={setBuildConfig}
          onNext={() => setActiveStep('preview')}
          onBack={() => setActiveStep('select')}
        />
      )}
      
      {/* Preview & Build */}
      {activeStep === 'preview' && selectedTemplate && (
        <ToolPreview
          template={selectedTemplate}
          config={buildConfig}
          onBuild={() => onBuildTool?.(selectedTemplate, buildConfig)}
          onBack={() => setActiveStep('configure')}
        />
      )}
    </div>
  );
}

// =============================================================================
// TEMPLATE SELECTION COMPONENT
// =============================================================================

interface ToolTemplateSelectionProps {
  templates: UBToolTemplate[];
  onSelectTemplate: (template: UBToolTemplate) => void;
}

export function ToolTemplateSelection({ templates, onSelectTemplate }: ToolTemplateSelectionProps) {
  const categorizedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) acc[template.category] = [];
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, UBToolTemplate[]>);
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Text variant="h2" weight="semibold" className="mb-2">
          Choose Your Tool Template
        </Text>
        <Text variant="body-md" color="secondary">
          Select from UB-optimized templates designed for campus life
        </Text>
      </div>
      
      {Object.entries(categorizedTemplates).map(([category, categoryTemplates]) => (
        <div key={category}>
          <Text variant="h3" weight="semibold" className="mb-4 capitalize">
            {category.replace('-', ' ')} Tools
          </Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTemplates.map((template) => (
              <ToolTemplateCard
                key={template.id}
                template={template}
                onSelect={() => onSelectTemplate(template)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// TOOL TEMPLATE CARD
// =============================================================================

interface ToolTemplateCardProps {
  template: UBToolTemplate;
  onSelect: () => void;
}

function ToolTemplateCard({ template, onSelect }: ToolTemplateCardProps) {
  const IconComponent = template.icon;
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-[var(--hive-border-default)]" onClick={onSelect}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--hive-brand-secondary)] bg-opacity-10">
              <IconComponent className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--hive-text-primary)]">
                {template.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {template.complexity}
                </Badge>
                <Badge variant="ghost" className="text-xs">
                  {template.buildTime}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Text variant="body-sm" color="secondary" className="mb-3">
          {template.description}
        </Text>
        
        <div className="p-3 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] mb-4">
          <Text variant="body-xs" weight="medium" className="mb-1">
            Campus Use Case:
          </Text>
          <Text variant="body-xs" color="secondary">
            {template.campusUseCase}
          </Text>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[var(--hive-text-secondary)]" />
            <Text variant="body-xs" color="secondary">
              ~{template.expectedUsers} users
            </Text>
          </div>
          
          <ButtonEnhanced variant="primary" size="sm">
            Build This Tool
          </ButtonEnhanced>
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// TOOL CONFIGURATION COMPONENT
// =============================================================================

interface ToolConfigurationProps {
  template: UBToolTemplate;
  config: ToolBuildConfig;
  onConfigChange: (config: ToolBuildConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ToolConfiguration({ 
  template, 
  config, 
  onConfigChange, 
  onNext, 
  onBack 
}: ToolConfigurationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
          Configure: {template.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <Text variant="body-sm" weight="medium" className="mb-2">
            Tool Name
          </Text>
          <input
            type="text"
            value={config.toolName}
            onChange={(e) => onConfigChange({ ...config, toolName: e.target.value })}
            placeholder="Enter a name for your tool..."
            className="w-full p-3 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]"
          />
        </div>
        
        <div>
          <Text variant="body-sm" weight="medium" className="mb-2">
            Description
          </Text>
          <textarea
            value={config.description}
            onChange={(e) => onConfigChange({ ...config, description: e.target.value })}
            placeholder="Describe how your UB community will use this tool..."
            className="w-full p-3 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]"
            rows={3}
          />
        </div>
        
        <div>
          <Text variant="body-sm" weight="medium" className="mb-2">
            Target Space (Optional)
          </Text>
          <select
            value={config.targetSpace}
            onChange={(e) => onConfigChange({ ...config, targetSpace: e.target.value })}
            className="w-full p-3 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]"
          >
            <option value="">Available to all spaces</option>
            <option value="cse-department">CSE Department</option>
            <option value="ellicott-complex">Ellicott Complex</option>
            <option value="governors-complex">Governors Complex</option>
            <option value="student-union">Student Union</option>
          </select>
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isPublic"
            checked={config.isPublic}
            onChange={(e) => onConfigChange({ ...config, isPublic: e.target.checked })}
            className="rounded border-[var(--hive-border-default)]"
          />
          <label htmlFor="isPublic">
            <Text variant="body-sm" weight="medium">
              Make tool publicly visible in campus marketplace
            </Text>
          </label>
        </div>
        
        <div className="flex items-center gap-3 pt-4">
          <ButtonEnhanced variant="secondary" onClick={onBack}>
            Back to Templates
          </ButtonEnhanced>
          <ButtonEnhanced 
            variant="primary" 
            onClick={onNext}
            disabled={!config.toolName.trim()}
          >
            Preview Tool
          </ButtonEnhanced>
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// TOOL PREVIEW COMPONENT
// =============================================================================

interface ToolPreviewProps {
  template: UBToolTemplate;
  config: ToolBuildConfig;
  onBuild: () => void;
  onBack: () => void;
}

export function ToolPreview({ template, config, onBuild, onBack }: ToolPreviewProps) {
  const IconComponent = template.icon;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
            Preview: {config.toolName}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="p-6 rounded-lg border-2 border-dashed border-[var(--hive-border-default)] bg-[var(--hive-background-primary)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-[var(--hive-brand-secondary)] bg-opacity-10">
                <IconComponent className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
              </div>
              <div>
                <Text variant="h3" weight="semibold">
                  {config.toolName}
                </Text>
                <Text variant="body-sm" color="secondary">
                  {config.description}
                </Text>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 rounded-lg bg-[var(--hive-background-secondary)]">
                <Text variant="body-sm" weight="medium">Category</Text>
                <Text variant="body-xs" color="secondary" className="capitalize">
                  {template.category.replace('-', ' ')}
                </Text>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--hive-background-secondary)]">
                <Text variant="body-sm" weight="medium">Expected Users</Text>
                <Text variant="body-xs" color="secondary">
                  ~{template.expectedUsers} UB students
                </Text>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--hive-background-secondary)]">
                <Text variant="body-sm" weight="medium">Availability</Text>
                <Text variant="body-xs" color="secondary">
                  {config.isPublic ? 'Campus-wide' : 'Space-specific'}
                </Text>
              </div>
            </div>
            
            <div className="text-center py-8 border-2 border-dashed border-[var(--hive-border-default)] rounded-lg">
              <Text variant="body-md" color="secondary">
                🛠️ Interactive tool interface will appear here
              </Text>
              <Text variant="body-sm" color="secondary">
                Ready to deploy to your UB community
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between">
        <ButtonEnhanced variant="secondary" onClick={onBack}>
          Back to Configuration
        </ButtonEnhanced>
        
        <div className="flex items-center gap-3">
          <ButtonEnhanced variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Preview
          </ButtonEnhanced>
          <ButtonEnhanced variant="primary" onClick={onBuild}>
            <Zap className="h-4 w-4 mr-2" />
            Build & Deploy Tool
          </ButtonEnhanced>
        </div>
      </div>
    </div>
  );
}