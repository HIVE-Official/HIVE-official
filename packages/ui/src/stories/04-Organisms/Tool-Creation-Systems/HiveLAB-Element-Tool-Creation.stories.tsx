/**
 * HIVE HiveLAB: Element-to-Tool Creation System
 * Comprehensive documentation for Builders creating Tools from Elements in HiveLAB
 */

import React, { useState, useRef, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Progress } from '../../../components/ui/progress';
import { 
  Wrench, 
  Plus, 
  Zap, 
  Eye, 
  Save, 
  Share, 
  Layers,
  MousePointer,
  Smartphone,
  Monitor,
  Users,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  DragHandleDots2,
  Trash2,
  Copy,
  Settings,
  Play,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Calculator,
  Image,
  Video,
  Map,
  Clock,
  Star,
  Heart,
  Target,
  Database,
  Link,
  Code
} from 'lucide-react';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../hive-tokens.css';

const meta = {
  title: '13-HiveLAB/Element-to-Tool Creation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE HiveLAB: Element-to-Tool Creation System

Comprehensive documentation for Builders using HiveLAB to combine 22 Elements into functional campus Tools. HiveLAB is HIVE's visual tool creation environment where Elements (Lego pieces) become Tools (recipes) that solve real campus problems.

## HiveLAB Philosophy
- **Visual First**: Drag-and-drop creation without coding
- **Campus Utility**: Every Tool solves real student coordination problems
- **Element Composition**: 22 atomic Elements combine in infinite ways
- **Mobile Creation**: Build Tools on the devices students actually use

## Creation Flow
1. **Concept**: Identify campus problem to solve
2. **Design**: Combine Elements into functional Tool
3. **Configure**: Set up Element interactions and data flow
4. **Test**: Preview Tool behavior across devices
5. **Publish**: Submit to Marketplace for community installation
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const HiveLABShowcase = () => {
  const [activeDemo, setActiveDemo] = useState<string>('elements-library');
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [canvasElements, setCanvasElements] = useState<any[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildStep, setBuildStep] = useState(1);
  const [draggedElement, setDraggedElement] = useState<any>(null);

  // 22 vBETA Elements Library
  const elementsLibrary = {
    'input-data': {
      title: 'Input & Data Collection',
      description: 'Elements for gathering information from users',
      color: '#4F46E5',
      elements: [
        {
          name: 'Text Input',
          icon: FileText,
          description: 'Single-line text entry for names, titles, short responses',
          usage: 'Name fields, space titles, quick answers',
          campusExample: 'Enter your dorm room number',
          dataType: 'string',
          config: ['placeholder', 'validation', 'max length']
        },
        {
          name: 'Long Text',
          icon: MessageSquare,
          description: 'Multi-line text area for descriptions and detailed input',
          usage: 'Event descriptions, detailed feedback, study notes',
          campusExample: 'Describe what topics you want to cover in the study group',
          dataType: 'string',
          config: ['placeholder', 'char limit', 'auto-resize']
        },
        {
          name: 'Number Input',
          icon: Calculator,
          description: 'Numeric input with validation and calculations',
          usage: 'GPA calculations, split costs, group sizes',
          campusExample: 'How much should everyone contribute for pizza?',
          dataType: 'number',
          config: ['min/max values', 'decimal places', 'currency format']
        },
        {
          name: 'Date Picker',
          icon: Calendar,
          description: 'Date and time selection for scheduling',
          usage: 'Event scheduling, deadline tracking, availability',
          campusExample: 'When is the study session?',
          dataType: 'datetime',
          config: ['date range', 'time zones', 'recurring events']
        },
        {
          name: 'File Upload',
          icon: Image,
          description: 'File and media upload with preview',
          usage: 'Share notes, upload assignments, event photos',
          campusExample: 'Upload your study guide to share',
          dataType: 'file',
          config: ['file types', 'size limits', 'multiple uploads']
        }
      ]
    },
    'interaction-control': {
      title: 'Interaction & Control',
      description: 'Elements for user actions and decision making',
      color: '#059669',
      elements: [
        {
          name: 'Button',
          icon: MousePointer,
          description: 'Clickable actions and form submissions',
          usage: 'Join group, submit form, confirm action',
          campusExample: 'Join Study Group',
          dataType: 'action',
          config: ['button text', 'style variant', 'confirmation dialog']
        },
        {
          name: 'Poll/Vote',
          icon: BarChart3,
          description: 'Quick voting and opinion gathering',
          usage: 'Group decisions, preference gathering, consensus',
          campusExample: 'What time works best for everyone?',
          dataType: 'poll',
          config: ['options', 'vote limits', 'anonymous voting']
        },
        {
          name: 'Rating Scale',
          icon: Star,
          description: 'Numeric or star-based rating system',
          usage: 'Rate study spots, review tools, feedback',
          campusExample: 'How helpful was this study session?',
          dataType: 'rating',
          config: ['scale range', 'rating type', 'required/optional']
        },
        {
          name: 'Checkbox List',
          icon: CheckCircle,
          description: 'Multiple selection from predefined options',
          usage: 'Available times, interested topics, dietary restrictions',
          campusExample: 'Which CS topics do you need help with?',
          dataType: 'array',
          config: ['options', 'min/max selections', 'custom options']
        },
        {
          name: 'Toggle Switch',
          icon: Settings,
          description: 'Binary on/off controls and preferences',
          usage: 'Notification settings, availability, privacy controls',
          campusExample: 'Are you available for group study?',
          dataType: 'boolean',
          config: ['default state', 'labels', 'confirmation']
        }
      ]
    },
    'display-communication': {
      title: 'Display & Communication',
      description: 'Elements for showing information and facilitating communication',
      color: '#DC2626',
      elements: [
        {
          name: 'Text Display',
          icon: FileText,
          description: 'Static text, headings, and formatted content',
          usage: 'Instructions, announcements, descriptions',
          campusExample: 'Study Group Guidelines',
          dataType: 'content',
          config: ['text formatting', 'dynamic content', 'styling']
        },
        {
          name: 'Image Display',
          icon: Image,
          description: 'Static images, photos, and visual content',
          usage: 'Event photos, location maps, visual guides',
          campusExample: 'Map to the study room',
          dataType: 'media',
          config: ['image source', 'size/crop', 'alt text']
        },
        {
          name: 'Data Table',
          icon: Database,
          description: 'Structured data display with sorting and filtering',
          usage: 'Member lists, schedule grids, resource inventories',
          campusExample: 'Study group member availability',
          dataType: 'table',
          config: ['columns', 'sorting', 'pagination']
        },
        {
          name: 'Progress Bar',
          icon: BarChart3,
          description: 'Visual progress indicators and completion status',
          usage: 'Goal tracking, event capacity, completion rates',
          campusExample: 'Study session signup progress (8/12 spots filled)',
          dataType: 'progress',
          config: ['progress source', 'styling', 'labels']
        },
        {
          name: 'Status Badge',
          icon: Target,
          description: 'Visual status indicators and labels',
          usage: 'Member roles, availability status, priority levels',
          campusExample: 'Available Now • Study Leader • CS Major',
          dataType: 'status',
          config: ['status options', 'colors', 'auto-update']
        }
      ]
    },
    'logic-automation': {
      title: 'Logic & Automation',
      description: 'Elements for conditional logic and automated actions',
      color: '#7C3AED',
      elements: [
        {
          name: 'Conditional Logic',
          icon: Code,
          description: 'Show/hide elements based on user input or conditions',
          usage: 'Dynamic forms, personalized content, smart workflows',
          campusExample: 'Show "Bring Calculator" only if Math Study Group selected',
          dataType: 'logic',
          config: ['conditions', 'actions', 'fallback behavior']
        },
        {
          name: 'Auto-Calculate',
          icon: Calculator,
          description: 'Automatic calculations based on user input',
          usage: 'Split bills, GPA calculations, time conversions',
          campusExample: 'Auto-calculate everyone\'s share of the pizza cost',
          dataType: 'calculation',
          config: ['formula', 'input sources', 'display format']
        },
        {
          name: 'Timer/Countdown',
          icon: Clock,
          description: 'Time-based elements for deadlines and schedules',
          usage: 'Event countdowns, deadline reminders, session timers',
          campusExample: 'Time until study group starts',
          dataType: 'time',
          config: ['target time', 'display format', 'completion action']
        },
        {
          name: 'Notification Trigger',
          icon: AlertTriangle,
          description: 'Automated notifications based on actions or conditions',
          usage: 'Signup confirmations, deadline alerts, status updates',
          campusExample: 'Notify group when someone joins the study session',
          dataType: 'notification',
          config: ['trigger conditions', 'recipients', 'message template']
        },
        {
          name: 'Data Connector',
          icon: Link,
          description: 'Connect and sync data between different Elements',
          usage: 'Form submissions update displays, polls trigger actions',
          campusExample: 'Poll results automatically update the group decision display',
          dataType: 'connection',
          config: ['data source', 'target element', 'sync rules']
        }
      ]
    },
    'campus-specific': {
      title: 'Campus-Specific',
      description: 'Elements designed for university life and coordination',
      color: '#EA580C',
      elements: [
        {
          name: 'Location Picker',
          icon: Map,
          description: 'Campus location selection and mapping',
          usage: 'Study spot finder, meetup locations, resource mapping',
          campusExample: 'Where should we meet for the study group?',
          dataType: 'location',
          config: ['location database', 'map integration', 'custom locations']
        },
        {
          name: 'Member Roster',
          icon: Users,
          description: 'Group membership tracking and management',
          usage: 'Study group members, event attendees, project teams',
          campusExample: 'CS 220 Study Group Members (8/12)',
          dataType: 'membership',
          config: ['capacity limits', 'role assignments', 'waiting list']
        }
      ]
    }
  };

  // Tool Creation Examples
  const toolExamples = [
    {
      name: 'Quick Poll',
      description: 'Simple voting for group decisions',
      elements: ['Text Display', 'Poll/Vote', 'Button', 'Progress Bar'],
      campusUse: 'What time should we have the floor movie night?',
      complexity: 'Simple',
      buildTime: '5 minutes'
    },
    {
      name: 'Study Group Coordinator',
      description: 'Comprehensive study session planning',
      elements: ['Text Input', 'Date Picker', 'Location Picker', 'Member Roster', 'Checkbox List', 'Auto-Calculate'],
      campusUse: 'Organize weekly CS study sessions with topic planning and attendance tracking',
      complexity: 'Advanced',
      buildTime: '20 minutes'
    },
    {
      name: 'Textbook Exchange',
      description: 'Buy/sell/trade campus textbooks',
      elements: ['Text Input', 'Image Upload', 'Number Input', 'Text Display', 'Button', 'Status Badge'],
      campusUse: 'Students can list textbooks for sale and browse available books',
      complexity: 'Moderate',
      buildTime: '12 minutes'
    },
    {
      name: 'GPA Calculator',
      description: 'Personal academic tracking tool',
      elements: ['Text Input', 'Number Input', 'Auto-Calculate', 'Progress Bar', 'Data Table'],
      campusUse: 'Calculate current GPA and track academic progress',
      complexity: 'Moderate',
      buildTime: '15 minutes'
    }
  ];

  // Interactive Tool Builder Demo
  const ToolBuilderCanvas = () => {
    const [selectedTool, setSelectedTool] = useState<any>(toolExamples[0]);
    const [buildProgress, setBuildProgress] = useState(0);

    const simulateBuilding = () => {
      setIsBuilding(true);
      setBuildStep(1);
      setBuildProgress(0);

      const steps = [
        { step: 1, label: 'Selecting Elements', progress: 20 },
        { step: 2, label: 'Arranging Layout', progress: 40 },
        { step: 3, label: 'Configuring Logic', progress: 60 },
        { step: 4, label: 'Testing Preview', progress: 80 },
        { step: 5, label: 'Publishing Tool', progress: 100 }
      ];

      steps.forEach((stepData, index) => {
        setTimeout(() => {
          setBuildStep(stepData.step);
          setBuildProgress(stepData.progress);
          if (stepData.step === 5) {
            setTimeout(() => setIsBuilding(false), 1000);
          }
        }, index * 1500);
      });
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tool Selection */}
          <div className="space-y-4">
            <h4 className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
              Choose Tool to Build
            </h4>
            <div className="space-y-3">
              {toolExamples.map((tool, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer hive-interactive ${
                    selectedTool.name === tool.name ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--hive-background-secondary)',
                    borderColor: selectedTool.name === tool.name ? 'var(--hive-border-gold)' : 'var(--hive-border-primary)',
                    ringColor: 'var(--hive-brand-primary)'
                  }}
                  onClick={() => setSelectedTool(tool)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                      {tool.name}
                    </h5>
                    <Badge style={{
                      backgroundColor: tool.complexity === 'Simple' ? 'var(--hive-status-success)' :
                                     tool.complexity === 'Moderate' ? 'var(--hive-status-warning)' :
                                     'var(--hive-status-info)',
                      color: 'white'
                    }}>
                      {tool.complexity}
                    </Badge>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--hive-text-muted)' }}>
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {tool.elements.slice(0, 3).map((element, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs"
                             style={{ borderColor: 'var(--hive-border-subtle)', color: 'var(--hive-text-muted)' }}>
                        {element}
                      </Badge>
                    ))}
                    {tool.elements.length > 3 && (
                      <Badge variant="outline" className="text-xs"
                             style={{ borderColor: 'var(--hive-border-subtle)', color: 'var(--hive-text-muted)' }}>
                        +{tool.elements.length - 3} more
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Building Simulation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                HiveLAB Builder
              </h4>
              <Button
                onClick={simulateBuilding}
                disabled={isBuilding}
                style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}
              >
                {isBuilding ? (
                  <>
                    <Wrench className="w-4 h-4 mr-2 animate-spin" />
                    Building...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Build {selectedTool.name}
                  </>
                )}
              </Button>
            </div>

            <Card className="p-6" style={{ 
              backgroundColor: 'var(--hive-background-tertiary)',
              borderColor: 'var(--hive-border-primary)'
            }}>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                    {selectedTool.name}
                  </h5>
                  <p className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                    {selectedTool.campusUse}
                  </p>
                </div>

                {isBuilding && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
                        Step {buildStep}/5: {
                          buildStep === 1 ? 'Selecting Elements' :
                          buildStep === 2 ? 'Arranging Layout' :
                          buildStep === 3 ? 'Configuring Logic' :
                          buildStep === 4 ? 'Testing Preview' :
                          'Publishing Tool'
                        }
                      </span>
                      <span className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                        {buildProgress}%
                      </span>
                    </div>
                    <Progress value={buildProgress} className="h-2" />
                    
                    {buildProgress === 100 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center p-4 rounded-lg"
                        style={{ backgroundColor: 'var(--hive-overlay-success-subtle)' }}
                      >
                        <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--hive-status-success)' }} />
                        <p className="font-medium" style={{ color: 'var(--hive-status-success)' }}>
                          Tool Published to Marketplace!
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                <div>
                  <h6 className="text-sm font-medium mb-2" style={{ color: 'var(--hive-text-secondary)' }}>
                    Required Elements:
                  </h6>
                  <div className="flex flex-wrap gap-2">
                    {selectedTool.elements.map((element, idx) => (
                      <Badge key={idx} variant="outline"
                             style={{ borderColor: 'var(--hive-border-gold)', color: 'var(--hive-brand-primary)' }}>
                        {element}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div style={{ color: 'var(--hive-text-muted)' }}>
                    Build Time: {selectedTool.buildTime}
                  </div>
                  <div style={{ color: 'var(--hive-text-muted)' }}>
                    Complexity: {selectedTool.complexity}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // Element Detail Component
  const ElementDetail = ({ element, categoryColor }: { element: any; categoryColor: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="p-6" style={{ 
        backgroundColor: 'var(--hive-background-secondary)',
        borderColor: categoryColor
      }}>
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center"
               style={{ backgroundColor: categoryColor, color: 'white' }}>
            <element.icon className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
              {element.name}
            </h4>
            <p className="text-sm mb-4" style={{ color: 'var(--hive-text-muted)' }}>
              {element.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium mb-2" style={{ color: 'var(--hive-text-secondary)' }}>
                  Campus Example:
                </h5>
                <p className="text-sm p-3 rounded-lg" 
                   style={{ 
                     backgroundColor: 'var(--hive-background-tertiary)', 
                     color: 'var(--hive-text-primary)'
                   }}>
                  "{element.campusExample}"
                </p>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-2" style={{ color: 'var(--hive-text-secondary)' }}>
                  Configuration Options:
                </h5>
                <div className="flex flex-wrap gap-1">
                  {element.config.map((option: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs"
                           style={{ borderColor: 'var(--hive-border-subtle)', color: 'var(--hive-text-muted)' }}>
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <span style={{ color: 'var(--hive-text-secondary)' }}>
                  Usage: {element.usage}
                </span>
              </div>
              <Badge style={{ backgroundColor: categoryColor, color: 'white' }}>
                {element.dataType}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-8" style={{ 
      background: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-color-void) 50%, var(--hive-background-secondary) 100%)',
      color: 'var(--hive-text-primary)'
    }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 hive-interactive p-2"
                 style={{ 
                   backgroundColor: 'var(--hive-background-tertiary)',
                   border: '1px solid var(--hive-border-gold)'
                 }}>
              <Wrench className="w-full h-full" style={{ color: 'var(--hive-brand-primary)' }} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-white bg-clip-text text-transparent">
              HiveLAB Creation System
            </h1>
          </div>
          <p className="text-xl mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            Visual tool creation environment where Builders combine 22 Elements into functional campus Tools that solve real student coordination problems.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gray-800/50 text-white border-gray-700">22 Elements</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Visual Builder</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Mobile Creation</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Campus Tools</Badge>
          </div>
        </motion.div>

        {/* Demo Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'elements-library', label: 'Elements Library', icon: Layers },
              { key: 'tool-builder', label: 'Tool Builder Demo', icon: Wrench },
              { key: 'creation-workflow', label: 'Creation Workflow', icon: ArrowRight }
            ].map(({ key, label, icon: IconComponent }) => {
              const isActive = activeDemo === key;
              return (
                <Button
                  key={key}
                  variant={isActive ? "default" : "outline"}
                  size="lg"
                  className="hive-interactive"
                  style={isActive ? {
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)',
                    borderColor: 'var(--hive-border-gold)'
                  } : {
                    borderColor: 'var(--hive-border-primary)',
                    color: 'var(--hive-text-secondary)'
                  }}
                  onClick={() => setActiveDemo(key)}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {label}
                </Button>
              );
            })}
          </div>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeDemo === 'elements-library' && (
            <motion.div
              key="elements-library"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {Object.entries(elementsLibrary).map(([categoryKey, category], index) => (
                <motion.div
                  key={categoryKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hive-glass border border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center" style={{ color: category.color }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                             style={{ backgroundColor: category.color, color: 'white' }}>
                          <Layers className="w-5 h-5" />
                        </div>
                        {category.title}
                        <Badge className="ml-3" style={{ backgroundColor: category.color, color: 'white' }}>
                          {category.elements.length} Elements
                        </Badge>
                      </CardTitle>
                      <p style={{ color: 'var(--hive-text-muted)' }}>
                        {category.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.elements.map((element, idx) => (
                          <motion.div
                            key={idx}
                            className="p-4 rounded-lg border cursor-pointer hive-interactive"
                            style={{
                              backgroundColor: 'var(--hive-background-secondary)',
                              borderColor: selectedElement?.name === element.name ? category.color : 'var(--hive-border-primary)'
                            }}
                            onClick={() => setSelectedElement(element)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = category.color;
                              e.currentTarget.style.backgroundColor = 'var(--hive-background-interactive)';
                            }}
                            onMouseLeave={(e) => {
                              if (selectedElement?.name !== element.name) {
                                e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                              }
                              e.currentTarget.style.backgroundColor = 'var(--hive-background-secondary)';
                            }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                                   style={{ backgroundColor: category.color, color: 'white' }}>
                                <element.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--hive-text-primary)' }}>
                                  {element.name}
                                </h4>
                                <p className="text-xs mb-2" style={{ color: 'var(--hive-text-muted)' }}>
                                  {element.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-xs"
                                         style={{ borderColor: category.color, color: category.color }}>
                                    {element.dataType}
                                  </Badge>
                                  <span className="text-xs" style={{ color: 'var(--hive-text-disabled)' }}>
                                    Click for details
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Selected Element Details */}
              <AnimatePresence>
                {selectedElement && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                  >
                    <ElementDetail 
                      element={selectedElement} 
                      categoryColor={
                        Object.values(elementsLibrary).find(cat => 
                          cat.elements.some(el => el.name === selectedElement.name)
                        )?.color || '#4F46E5'
                      } 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeDemo === 'tool-builder' && (
            <motion.div
              key="tool-builder"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="hive-glass border border-gray-700">
                <CardHeader>
                  <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                    Interactive Tool Builder Demo
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    Experience how Builders combine Elements into functional campus Tools
                  </p>
                </CardHeader>
                <CardContent>
                  <ToolBuilderCanvas />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeDemo === 'creation-workflow' && (
            <motion.div
              key="creation-workflow"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <Card className="hive-glass border border-gray-700">
                <CardHeader>
                  <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                    HiveLAB Creation Workflow
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    Complete Builder journey from concept to published Tool
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        step: 1,
                        title: 'Identify Campus Problem',
                        description: 'Recognize coordination challenges in your campus community',
                        example: '"Our floor needs a better way to coordinate group food orders"',
                        time: '2 minutes',
                        icon: Target
                      },
                      {
                        step: 2,
                        title: 'Select Elements',
                        description: 'Choose from 22 Elements to solve the problem',
                        example: 'Text Input (restaurant), Member Roster (participants), Auto-Calculate (costs)',
                        time: '3 minutes',
                        icon: Plus
                      },
                      {
                        step: 3,
                        title: 'Design Layout',
                        description: 'Arrange Elements in logical, mobile-friendly order',
                        example: 'Header → Restaurant Selection → Member Signup → Cost Calculator → Order Button',
                        time: '5 minutes',
                        icon: Layers
                      },
                      {
                        step: 4,
                        title: 'Configure Logic',
                        description: 'Set up Element interactions and data flow',
                        example: 'When member joins → update cost calculation → send notification',
                        time: '7 minutes',
                        icon: Settings
                      },
                      {
                        step: 5,
                        title: 'Test & Preview',
                        description: 'Preview Tool behavior across mobile and desktop',
                        example: 'Test signup flow, cost calculations, mobile responsiveness',
                        time: '3 minutes',
                        icon: Eye
                      },
                      {
                        step: 6,
                        title: 'Publish to Marketplace',
                        description: 'Submit Tool for review and community installation',
                        example: 'Add description, tags, usage instructions → Submit for review',
                        time: '2 minutes',
                        icon: Share
                      }
                    ].map((phase, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-6"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2"
                               style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                            <phase.icon className="w-6 h-6" />
                          </div>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                               style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                            {phase.step}
                          </div>
                          {index < 5 && (
                            <div className="w-0.5 h-8 mt-2"
                                 style={{ backgroundColor: 'var(--hive-border-primary)' }}></div>
                          )}
                        </div>

                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-lg" style={{ color: 'var(--hive-text-primary)' }}>
                              {phase.title}
                            </h4>
                            <Badge style={{ backgroundColor: 'var(--hive-overlay-gold-subtle)', color: 'var(--hive-brand-primary)' }}>
                              ~{phase.time}
                            </Badge>
                          </div>
                          
                          <p className="text-sm mb-3" style={{ color: 'var(--hive-text-muted)' }}>
                            {phase.description}
                          </p>
                          
                          <div className="p-3 rounded-lg" 
                               style={{ backgroundColor: 'var(--hive-background-tertiary)' }}>
                            <p className="text-sm font-mono" style={{ color: 'var(--hive-text-secondary)' }}>
                              Example: {phase.example}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Implementation Guidelines */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Builder Guidelines & Best Practices
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Essential principles for creating effective campus Tools in HiveLAB
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Campus Problem Focus
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-success)' }} />
                        Solve real coordination challenges students face daily
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-success)' }} />
                        Test with your own community before publishing
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-success)' }} />
                        Start simple, add complexity based on user feedback
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-success)' }} />
                        Consider different campus contexts (dorms, classes, activities)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Mobile-First Design
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <Smartphone className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-brand-primary)' }} />
                        Design for thumbs - students use Tools while walking
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <Smartphone className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-brand-primary)' }} />
                        Keep forms short and actions clear
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <Smartphone className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-brand-primary)' }} />
                        Test on actual mobile devices in various lighting
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <Smartphone className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-brand-primary)' }} />
                        Consider offline functionality for unreliable campus WiFi
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Element Combination Strategy
                    </h4>
                    <div className="p-4 rounded-lg space-y-3"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)' }}>
                      <div className="text-sm">
                        <span className="font-medium" style={{ color: 'var(--hive-text-secondary)' }}>Simple Tools:</span>
                        <span className="ml-2" style={{ color: 'var(--hive-text-muted)' }}>3-5 Elements maximum</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium" style={{ color: 'var(--hive-text-secondary)' }}>Complex Tools:</span>
                        <span className="ml-2" style={{ color: 'var(--hive-text-muted)' }}>6-10 Elements with clear logic flow</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium" style={{ color: 'var(--hive-text-secondary)' }}>Power Tools:</span>
                        <span className="ml-2" style={{ color: 'var(--hive-text-muted)' }}>10+ Elements for advanced coordination</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Community Guidelines
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <Users className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-info)' }} />
                        Tools must serve community coordination, not individual gain
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <Users className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-info)' }} />
                        Respect privacy and student data protection guidelines
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <Users className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-info)' }} />
                        Include clear instructions and purpose descriptions
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <Users className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: 'var(--hive-status-info)' }} />
                        Attribution is automatic - focus on community value
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export const HiveLABElementToToolCreation: Story = {
  render: () => <HiveLABShowcase />,
  parameters: {
    layout: 'fullscreen'
  }
};