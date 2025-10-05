"use client";

import { useState } from "react";
import { Dialog, Button, Card, Badge, Input, Alert } from "@hive/ui";
import { 
  ArrowRight, 
  ArrowLeft,
  Check,
  Users,
  Lock,
  Globe,
  Shield,
  Settings,
  Mail,
  Plus,
  X,
  AlertCircle,
  BookOpen,
  Home,
  Briefcase,
  Trophy,
  Hammer
} from "lucide-react";

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSpace: (_spaceData: CreateSpaceData) => void;
  isLoading?: boolean;
  error?: string | null;
}

interface CreateSpaceData {
  type: SpaceType;
  name: string;
  description: string;
  avatar?: string;
  banner?: string;
  visibility: 'public' | 'private' | 'invite_only';
  joinProcess: 'instant' | 'approval' | 'invite_only';
  rules: string[];
  tools: string[];
  foundingMembers: string[];
  customizations: {
    primaryColor?: string;
    category?: string;
    tags?: string[];
  };
}

type SpaceType = 'academic' | 'residential' | 'professional' | 'recreational' | 'project';

type CreateStep = 'type' | 'details' | 'privacy' | 'rules' | 'tools' | 'members' | 'review';

const SPACE_TYPES = {
  academic: {
    name: 'Academic',
    icon: BookOpen,
    emoji: '📚',
    description: 'Study groups, research teams, course collaboration',
    examples: ['CS Study Group', 'Physics Research Lab', 'Writing Circle'],
    suggestedTools: ['study-timer', 'file-share', 'whiteboard', 'poll-maker'],
    color: 'bg-blue-500',
    features: ['Study scheduling', 'Resource sharing', 'Progress tracking', 'Academic calendar integration']
  },
  residential: {
    name: 'Residential',
    icon: Home,
    emoji: '🏠',
    description: 'Residence halls, floors, building communities',
    examples: ['Floor 3 Community', 'Building A Residents', 'Roommate Group'],
    suggestedTools: ['group-chat', 'poll-maker', 'file-share', 'attendance'],
    color: 'bg-green-500',
    features: ['Room coordination', 'Floor events', 'Maintenance requests', 'Quiet hours scheduling']
  },
  professional: {
    name: 'Professional',
    icon: Briefcase,
    emoji: '💼',
    description: 'Career clubs, networking, professional development',
    examples: ['Engineering Career Club', 'Pre-Med Society', 'Startup Network'],
    suggestedTools: ['group-chat', 'file-share', 'poll-maker', 'whiteboard'],
    color: 'bg-purple-500',
    features: ['Job sharing', 'Networking events', 'Mentorship matching', 'Professional development']
  },
  recreational: {
    name: 'Recreational',
    icon: Trophy,
    emoji: '🎮',
    description: 'Sports teams, hobby groups, gaming communities',
    examples: ['Intramural Soccer', 'Board Game Club', 'Photography Group'],
    suggestedTools: ['group-chat', 'poll-maker', 'attendance', 'file-share'],
    color: 'bg-orange-500',
    features: ['Event coordination', 'Resource booking', 'Tournament brackets', 'Activity planning']
  },
  project: {
    name: 'Project',
    icon: Hammer,
    emoji: '🛠️',
    description: 'Hackathon teams, student orgs, volunteer groups',
    examples: ['Hackathon Team Alpha', 'Community Service Club', 'App Development Group'],
    suggestedTools: ['whiteboard', 'file-share', 'group-chat', 'poll-maker'],
    color: 'bg-red-500',
    features: ['Project management', 'Deadline tracking', 'Resource allocation', 'Outcome sharing']
  }
};

const SUGGESTED_TOOLS = {
  'study-timer': { name: 'Study Timer', icon: '⏱️', description: 'Synchronized focus sessions' },
  'poll-maker': { name: 'Live Polls', icon: '📊', description: 'Real-time polling and voting' },
  'whiteboard': { name: 'Whiteboard', icon: '📝', description: 'Collaborative drawing space' },
  'file-share': { name: 'File Share', icon: '📁', description: 'Document sharing hub' },
  'group-chat': { name: 'Group Chat', icon: '💬', description: 'Dedicated chat channel' },
  'attendance': { name: 'Attendance', icon: '✅', description: 'Event attendance tracking' }
};

export function CreateSpaceModal({ isOpen, onClose, onCreateSpace, isLoading = false, error = null }: CreateSpaceModalProps) {
  const [currentStep, setCurrentStep] = useState<CreateStep>('type');
  const [spaceData, setSpaceData] = useState<CreateSpaceData>({
    type: 'academic',
    name: '',
    description: '',
    visibility: 'public',
    joinProcess: 'instant',
    rules: [],
    tools: [],
    foundingMembers: [],
    customizations: {}
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newRule, setNewRule] = useState('');

  const steps: CreateStep[] = ['type', 'details', 'privacy', 'rules', 'tools', 'members', 'review'];
  const currentStepIndex = steps.indexOf(currentStep);

  const validateStep = (step: CreateStep): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 'type':
        if (!spaceData.type) newErrors.type = 'Please select a space type';
        break;
      case 'details':
        if (!spaceData.name.trim()) newErrors.name = 'Space name is required';
        if (spaceData.name.length > 50) newErrors.name = 'Space name must be 50 characters or less';
        if (!spaceData.description.trim()) newErrors.description = 'Description is required';
        if (spaceData.description.length > 200) newErrors.description = 'Description must be 200 characters or less';
        break;
      case 'privacy':
        if (!spaceData.visibility) newErrors.visibility = 'Please select visibility';
        if (!spaceData.joinProcess) newErrors.joinProcess = 'Please select join process';
        break;
      case 'rules':
        if (spaceData.rules.length === 0) newErrors.rules = 'Please add at least one community guideline';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex]);
      }
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleCreateSpace = () => {
    if (validateStep('review') && !isLoading) {
      onCreateSpace(spaceData);
      // Don't close modal or reset form here - parent will handle it
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setCurrentStep('type');
      setSpaceData({
        type: 'academic',
        name: '',
        description: '',
        visibility: 'public',
        joinProcess: 'instant',
        rules: [],
        tools: [],
        foundingMembers: [],
        customizations: {}
      });
      setErrors({});
    }
  };

  const updateSpaceData = (updates: Partial<CreateSpaceData>) => {
    setSpaceData(prev => ({ ...prev, ...updates }));
    setErrors({});
  };

  const addRule = (rule: string) => {
    if (rule.trim() && !spaceData.rules.includes(rule.trim())) {
      updateSpaceData({ rules: [...spaceData.rules, rule.trim()] });
    }
  };

  const removeRule = (index: number) => {
    updateSpaceData({ rules: spaceData.rules.filter((_, i) => i !== index) });
  };

  const toggleTool = (toolId: string) => {
    const tools = spaceData.tools.includes(toolId)
      ? spaceData.tools.filter(t => t !== toolId)
      : [...spaceData.tools, toolId];
    updateSpaceData({ tools });
  };

  const getStepTitle = (step: CreateStep) => {
    switch (step) {
      case 'type': return 'Choose Space Type';
      case 'details': return 'Space Details';
      case 'privacy': return 'Privacy & Access';
      case 'rules': return 'Community Guidelines';
      case 'tools': return 'Tools & Features';
      case 'members': return 'Founding Members';
      case 'review': return 'Review & Launch';
      default: return '';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'type':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">What type of space are you creating?</h3>
              <p className="text-zinc-400">Choose the category that best fits your community's purpose</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(SPACE_TYPES).map(([type, config]) => {
                const _Icon = config.icon;
                const isSelected = spaceData.type === type;
                
                return (
                  <Card
                    key={type}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]' 
                        : 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800'
                    }`}
                    onClick={() => updateSpaceData({ type: type as SpaceType })}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-12 h-12 ${config.color} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                        {config.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{config.name}</h4>
                          {isSelected && <Check className="h-5 w-5 text-[var(--hive-brand-primary)]" />}
                        </div>
                        <p className="text-sm text-zinc-400 mb-3 leading-tight">{config.description}</p>
                        <div className="space-y-2">
                          <div className="text-xs text-zinc-500 font-medium">Examples:</div>
                          <div className="flex flex-wrap gap-1">
                            {config.examples.slice(0, 2).map((example) => (
                              <Badge key={example} variant="secondary" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {errors.type && (
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.type}</span>
              </div>
            )}
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`w-16 h-16 ${SPACE_TYPES[spaceData.type].color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3`}>
                {SPACE_TYPES[spaceData.type].emoji}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Space Identity</h3>
              <p className="text-zinc-400">Give your {SPACE_TYPES[spaceData.type].name.toLowerCase()} space a name and description</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Space Name *</label>
                <Input
                  value={spaceData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSpaceData({ name: (e.target as any).value })}
                  placeholder="Enter a clear, descriptive name..."
                  maxLength={50}
                  error={errors.name}
                />
                <div className="text-xs text-zinc-500 mt-1">{spaceData.name.length}/50 characters</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Description *</label>
                <textarea
                  value={spaceData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateSpaceData({ description: (e.target as any).value })}
                  placeholder="Describe the purpose and goals of your space..."
                  maxLength={200}
                  rows={4}
                  className={`w-full p-3 bg-zinc-800 border rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/50 resize-none ${
                    errors.description ? 'border-red-500' : 'border-zinc-700 focus:border-[var(--hive-brand-primary)]'
                  }`}
                />
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs text-zinc-500">{spaceData.description.length}/200 characters</div>
                  {errors.description && (
                    <div className="text-red-400 text-xs">{errors.description}</div>
                  )}
                </div>
              </div>

              {/* Category Tags */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">Category Tags (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {['study-group', 'social', 'academic', 'project', 'community', 'networking'].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={`cursor-pointer transition-colors ${
                        spaceData.customizations.tags?.includes(tag) ? 'bg-[var(--hive-brand-primary)] text-hive-obsidian' : ''
                      }`}
                      onClick={() => {
                        const currentTags = spaceData.customizations.tags || [];
                        const newTags = currentTags.includes(tag)
                          ? currentTags.filter(t => t !== tag)
                          : [...currentTags, tag];
                        updateSpaceData({
                          customizations: { ...spaceData.customizations, tags: newTags }
                        });
                      }}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Privacy & Access Settings</h3>
              <p className="text-zinc-400">Configure who can see and join your space</p>
            </div>

            {/* Visibility Settings */}
            <div>
              <h4 className="font-medium text-white mb-3">Space Visibility</h4>
              <div className="space-y-3">
                {[
                  {
                    value: 'public',
                    icon: Globe,
                    title: 'Public',
                    description: 'Anyone on campus can discover and view this space'
                  },
                  {
                    value: 'private',
                    icon: Lock,
                    title: 'Private',
                    description: 'Only members can see the space and its content'
                  },
                  {
                    value: 'invite_only',
                    icon: Shield,
                    title: 'Invite Only',
                    description: 'Only invited users can see and access the space'
                  }
                ].map((option) => {
                  const Icon = option.icon;
                  const isSelected = spaceData.visibility === option.value;
                  
                  return (
                    <Card
                      key={option.value}
                      className={`p-4 cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]' 
                          : 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800'
                      }`}
                      onClick={() => updateSpaceData({ visibility: option.value as any })}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-[var(--hive-brand-primary)]' : 'text-zinc-400'}`} />
                        <div className="flex-1">
                          <div className="font-medium text-white">{option.title}</div>
                          <div className="text-sm text-zinc-400">{option.description}</div>
                        </div>
                        {isSelected && <Check className="h-5 w-5 text-[var(--hive-brand-primary)]" />}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Join Process */}
            <div>
              <h4 className="font-medium text-white mb-3">Join Process</h4>
              <div className="space-y-3">
                {[
                  {
                    value: 'instant',
                    icon: Users,
                    title: 'Instant Join',
                    description: 'Anyone can join immediately without approval'
                  },
                  {
                    value: 'approval',
                    icon: Settings,
                    title: 'Requires Approval',
                    description: 'Admins must approve new member requests'
                  },
                  {
                    value: 'invite_only',
                    icon: Mail,
                    title: 'Invite Only',
                    description: 'New members can only join via invitation'
                  }
                ].map((option) => {
                  const Icon = option.icon;
                  const isSelected = spaceData.joinProcess === option.value;
                  
                  return (
                    <Card
                      key={option.value}
                      className={`p-4 cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]' 
                          : 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800'
                      }`}
                      onClick={() => updateSpaceData({ joinProcess: option.value as any })}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-[var(--hive-brand-primary)]' : 'text-zinc-400'}`} />
                        <div className="flex-1">
                          <div className="font-medium text-white">{option.title}</div>
                          <div className="text-sm text-zinc-400">{option.description}</div>
                        </div>
                        {isSelected && <Check className="h-5 w-5 text-[var(--hive-brand-primary)]" />}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'rules': {
        const defaultRules = [
          'Be respectful and constructive in all interactions',
          'Stay on topic and contribute meaningfully',
          'No spam, harassment, or inappropriate content',
          'Help maintain a positive learning environment'
        ];

        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Community Guidelines</h3>
              <p className="text-zinc-400">Set clear expectations for your space members</p>
            </div>

            {/* Add Rule Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Add Custom Rule</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newRule}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewRule((e.target as any).value)}
                  placeholder="Enter a community guideline..."
                  className="flex-1 p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-[var(--hive-brand-primary)] focus:outline-none"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addRule(newRule);
                      setNewRule('');
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    addRule(newRule);
                    setNewRule('');
                  }}
                  disabled={!newRule.trim()}
                  className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Suggested Rules */}
            <div>
              <h4 className="font-medium text-white mb-3">Suggested Guidelines</h4>
              <div className="space-y-2">
                {defaultRules.map((rule, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      spaceData.rules.includes(rule)
                        ? 'bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)] text-white'
                        : 'bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                    }`}
                    onClick={() => {
                      if (spaceData.rules.includes(rule)) {
                        removeRule(spaceData.rules.indexOf(rule));
                      } else {
                        addRule(rule);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{rule}</span>
                      {spaceData.rules.includes(rule) ? (
                        <Check className="h-4 w-4 text-[var(--hive-brand-primary)]" />
                      ) : (
                        <Plus className="h-4 w-4 text-zinc-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Rules */}
            {spaceData.rules.length > 0 && (
              <div>
                <h4 className="font-medium text-white mb-3">Your Community Guidelines ({spaceData.rules.length})</h4>
                <div className="space-y-2">
                  {spaceData.rules.map((rule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)] rounded-lg">
                      <span className="text-sm text-white">{rule}</span>
                      <Button
                        variant="outline"
                        className="max-w-sm"
                        onClick={() => removeRule(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.rules && (
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.rules}</span>
              </div>
            )}
          </div>
        );
      }

      case 'tools': {
        const suggestedTools = SPACE_TYPES[spaceData.type].suggestedTools;
        
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Tools & Features</h3>
              <p className="text-zinc-400">Choose tools that will help your {SPACE_TYPES[spaceData.type].name.toLowerCase()} space coordinate effectively</p>
            </div>

            {/* Recommended Tools */}
            <div>
              <h4 className="font-medium text-white mb-3">Recommended for {SPACE_TYPES[spaceData.type].name} Spaces</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedTools.map((toolId) => {
                  const tool = SUGGESTED_TOOLS[toolId as keyof typeof SUGGESTED_TOOLS];
                  const isSelected = spaceData.tools.includes(toolId);
                  
                  return (
                    <Card
                      key={toolId}
                      className={`p-4 cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]' 
                          : 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800'
                      }`}
                      onClick={() => toggleTool(toolId)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{tool.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{tool.name}</div>
                          <div className="text-sm text-zinc-400">{tool.description}</div>
                        </div>
                        {isSelected && <Check className="h-5 w-5 text-[var(--hive-brand-primary)]" />}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Other Available Tools */}
            <div>
              <h4 className="font-medium text-white mb-3">Other Available Tools</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(SUGGESTED_TOOLS)
                  .filter(([toolId]) => !suggestedTools.includes(toolId))
                  .map(([toolId, tool]) => {
                    const isSelected = spaceData.tools.includes(toolId);
                    
                    return (
                      <Card
                        key={toolId}
                        className={`p-4 cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? 'bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]' 
                            : 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800'
                        }`}
                        onClick={() => toggleTool(toolId)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{tool.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium text-white">{tool.name}</div>
                            <div className="text-sm text-zinc-400">{tool.description}</div>
                          </div>
                          {isSelected && <Check className="h-5 w-5 text-[var(--hive-brand-primary)]" />}
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </div>

            {spaceData.tools.length > 0 && (
              <div className="p-4 bg-zinc-800/30 rounded-lg">
                <div className="text-sm text-zinc-400 mb-2">Selected Tools:</div>
                <div className="flex flex-wrap gap-2">
                  {spaceData.tools.map((toolId) => (
                    <Badge key={toolId} variant="secondary" className="flex items-center space-x-1">
                      <span>{SUGGESTED_TOOLS[toolId as keyof typeof SUGGESTED_TOOLS]?.icon}</span>
                      <span>{SUGGESTED_TOOLS[toolId as keyof typeof SUGGESTED_TOOLS]?.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'members':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Founding Members</h3>
              <p className="text-zinc-400">Invite initial members to help establish your space (optional)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Invite by Handle or Email</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="@handle or email@university.edu"
                  className="flex-1 p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-[var(--hive-brand-primary)] focus:outline-none"
                />
                <Button className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne">
                  <Plus className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                You can invite more members after creating the space
              </div>
            </div>

            <div className="p-4 bg-zinc-800/30 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-zinc-400">
                <Users className="h-4 w-4" />
                <span>You'll be automatically added as the space admin</span>
              </div>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`w-16 h-16 ${SPACE_TYPES[spaceData.type].color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3`}>
                {SPACE_TYPES[spaceData.type].emoji}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Launch!</h3>
              <p className="text-zinc-400">Review your space details before creating</p>
            </div>

            <div className="space-y-4">
              {/* Basic Info */}
              <Card className="p-4 bg-zinc-800/50 border-zinc-700">
                <h4 className="font-medium text-white mb-3">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Type:</span>
                    <Badge variant="secondary">{SPACE_TYPES[spaceData.type].name}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Name:</span>
                    <span className="text-white font-medium">{spaceData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Visibility:</span>
                    <span className="text-white capitalize">{spaceData.visibility.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Join Process:</span>
                    <span className="text-white capitalize">{spaceData.joinProcess.replace('_', ' ')}</span>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <Card className="p-4 bg-zinc-800/50 border-zinc-700">
                <h4 className="font-medium text-white mb-2">Description</h4>
                <p className="text-zinc-300 text-sm leading-relaxed">{spaceData.description}</p>
              </Card>

              {/* Guidelines */}
              <Card className="p-4 bg-zinc-800/50 border-zinc-700">
                <h4 className="font-medium text-white mb-3">Community Guidelines ({spaceData.rules.length})</h4>
                <div className="space-y-2">
                  {spaceData.rules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-zinc-300">{rule}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tools */}
              {spaceData.tools.length > 0 && (
                <Card className="p-4 bg-zinc-800/50 border-zinc-700">
                  <h4 className="font-medium text-white mb-3">Enabled Tools ({spaceData.tools.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {spaceData.tools.map((toolId) => (
                      <Badge key={toolId} variant="secondary" className="flex items-center space-x-1">
                        <span>{SUGGESTED_TOOLS[toolId as keyof typeof SUGGESTED_TOOLS]?.icon}</span>
                        <span>{SUGGESTED_TOOLS[toolId as keyof typeof SUGGESTED_TOOLS]?.name}</span>
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleClose}
     
     
      className="max-h-[90vh] overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Header with Progress */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Create New Space</h2>
            <div className="text-sm text-zinc-400">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step} className="flex-1">
                <div className={`h-2 rounded-full transition-colors ${
                  index <= currentStepIndex ? 'bg-[var(--hive-brand-primary)]' : 'bg-zinc-700'
                }`} />
              </div>
            ))}
          </div>
          
          <div className="mt-3">
            <h3 className="text-lg font-semibold text-white">{getStepTitle(currentStep)}</h3>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderStepContent()}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-zinc-800">
          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={currentStepIndex === 0 ? handleClose : prevStep}
              className="flex items-center space-x-2"
              disabled={isLoading}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{currentStepIndex === 0 ? 'Cancel' : 'Back'}</span>
            </Button>

            <Button
              onClick={currentStep === 'review' ? handleCreateSpace : nextStep}
              className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne flex items-center space-x-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-hive-obsidian/20 border-t-hive-obsidian rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span>{currentStep === 'review' ? 'Create Space' : 'Continue'}</span>
                  {currentStep !== 'review' && <ArrowRight className="h-4 w-4" />}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}