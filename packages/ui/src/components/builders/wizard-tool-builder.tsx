"use client";

import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Zap,
  Settings,
  Palette,
  Eye,
  Save,
} from 'lucide-react';

interface WizardStep {
  id: string;
  title: string;
  description: string;
}

// Step 1: Tool Type Selection
function ToolTypeStep({ value, onChange }: { 
  value: string; 
  onChange: (value: string) => void;
}) {
  const toolTypes = [
    {
      id: 'calculator',
      title: 'Calculator',
      description: 'Math-based tools like GPA calculators, tip calculators, etc.',
      icon: '🧮',
      popular: true,
    },
    {
      id: 'organizer',
      title: 'Organizer',
      description: 'Tools to organize information like study planners, schedules',
      icon: '📋',
      popular: true,
    },
    {
      id: 'generator',
      title: 'Generator',
      description: 'Generate content like passwords, team assignments, quizzes',
      icon: '⚡',
      popular: false,
    },
    {
      id: 'converter',
      title: 'Converter',
      description: 'Convert between formats, units, or data types',
      icon: '🔄',
      popular: false,
    },
    {
      id: 'custom',
      title: 'Custom Tool',
      description: 'Build something unique with full customization',
      icon: '🛠️',
      popular: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">What type of tool are you building?</h2>
        <p className="text-zinc-400">Choose the category that best fits your tool concept.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {toolTypes.map((type) => (
          <Card
            key={type.id}
            className={`p-6 cursor-pointer transition-all hover:border-[#FFD700] ${
              value === type.id 
                ? 'border-[#FFD700] bg-[rgba(255,215,0,0.1)]' 
                : 'border-zinc-700 bg-zinc-900'
            }`}
            onClick={() => onChange(type.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{type.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-white">{type.title}</h3>
                  {type.popular && (
                    <span className="px-2 py-1 bg-[#FFD700] text-[#0A0A0A] text-xs font-medium rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-400">{type.description}</p>
              </div>
              {value === type.id && (
                <Check className="w-5 h-5 text-[#FFD700]" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Step 2: Basic Information
function BasicInfoStep({ value, onChange }: {
  value: { name: string; description: string; tags: string[] };
  onChange: (value: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Tell us about your tool</h2>
        <p className="text-zinc-400">Give your tool a name and description so others can find it.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Tool Name *</label>
          <input
            type="text"
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            placeholder="e.g., GPA Calculator, Study Planner"
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-[#FFD700] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Description</label>
          <textarea
            value={value.description}
            onChange={(e) => onChange({ ...value, description: e.target.value })}
            placeholder="Briefly describe what your tool does and how it helps students..."
            rows={4}
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-[#FFD700] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Tags (Optional)</label>
          <input
            type="text"
            value={value.tags.join(', ')}
            onChange={(e) => onChange({ 
              ...value, 
              tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
            })}
            placeholder="math, study, gpa, calculator"
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-[#FFD700] focus:outline-none"
          />
          <p className="text-xs text-zinc-500 mt-1">Separate tags with commas</p>
        </div>
      </div>
    </div>
  );
}

// Main Wizard Component
export function WizardToolBuilder({ 
  initialStep = 0,
  onComplete 
}: {
  initialStep?: number;
  onComplete?: (data: any) => void;
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState({
    toolType: '',
    basicInfo: { name: '', description: '', tags: [] },
    inputFields: [],
    logic: { formula: '', outputLabel: '' },
  });

  const steps: WizardStep[] = [
    {
      id: 'type',
      title: 'Tool Type',
      description: 'Choose your tool category',
    },
    {
      id: 'info',
      title: 'Basic Info',
      description: 'Name and describe your tool',
    },
    {
      id: 'inputs',
      title: 'Input Fields',
      description: 'Configure user inputs',
    },
    {
      id: 'logic',
      title: 'Logic',
      description: 'Define calculations',
    },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.toolType !== '';
      case 1:
        return formData.basicInfo.name.trim() !== '';
      default:
        return true;
    }
  };

  const handleStepData = (stepId: string, data: any) => {
    setFormData(prev => ({ ...prev, [stepId]: data }));
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(formData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ToolTypeStep
            value={formData.toolType}
            onChange={(data) => handleStepData('toolType', data)}
          />
        );
      case 1:
        return (
          <BasicInfoStep
            value={formData.basicInfo}
            onChange={(data) => handleStepData('basicInfo', data)}
          />
        );
      default:
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">Step {currentStep + 1}</h2>
            <p className="text-zinc-400">This step is not yet implemented in the demo.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Tool</h1>
          <p className="text-zinc-400">Follow the steps to build your custom tool</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  index < currentStep 
                    ? 'bg-[#FFD700] text-[#0A0A0A]'
                    : index === currentStep
                    ? 'bg-[#FFD700] text-[#0A0A0A]'
                    : 'bg-zinc-700 text-zinc-400'
                }`}>
                  {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-white">{step.title}</div>
                  <div className="text-xs text-zinc-400">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-zinc-600 mx-6" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8 p-8 bg-zinc-900 border-zinc-700">
          {renderStepContent()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="border-zinc-600 text-zinc-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-3">
            <Button variant="outline" className="border-zinc-600 text-zinc-300">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            
            {currentStep === steps.length - 1 ? (
              <Button 
                onClick={handleComplete}
                disabled={!canProceed()}
                className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
              >
                <Save className="w-4 h-4 mr-2" />
                Create Tool
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={!canProceed()}
                className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}