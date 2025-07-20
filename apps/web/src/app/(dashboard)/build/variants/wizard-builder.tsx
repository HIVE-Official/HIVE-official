"use client";

import React, { useState } from 'react';
import { Card, Button } from '@hive/ui';
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
  component: React.ComponentType<any>;
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

// Step 3: Input Fields Configuration
function InputFieldsStep({ value, onChange }: {
  value: Array<{ id: string; label: string; type: string; required: boolean }>;
  onChange: (value: any) => void;
}) {
  const addField = () => {
    const newField = {
      id: `field-${Date.now()}`,
      label: '',
      type: 'text',
      required: false,
    };
    onChange([...value, newField]);
  };

  const updateField = (index: number, updates: any) => {
    const updated = [...value];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
  };

  const removeField = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Configure input fields</h2>
        <p className="text-zinc-400">Define what information users need to provide to your tool.</p>
      </div>

      <div className="space-y-4">
        {value.map((field, index) => (
          <Card key={field.id} className="p-4 bg-zinc-900 border-zinc-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Field Label</label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => updateField(index, { label: e.target.value })}
                  placeholder="e.g., Current GPA"
                  className="w-full p-2 bg-zinc-800 border border-zinc-600 rounded text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Field Type</label>
                <select
                  value={field.type}
                  onChange={(e) => updateField(index, { type: e.target.value })}
                  className="w-full p-2 bg-zinc-800 border border-zinc-600 rounded text-white text-sm"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                  <option value="select">Dropdown</option>
                  <option value="checkbox">Checkbox</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(index, { required: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-zinc-300">Required</span>
                </label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeField(index)}
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Button
          onClick={addField}
          variant="outline"
          className="w-full border-dashed border-zinc-600 text-zinc-400 hover:border-[#FFD700] hover:text-[#FFD700]"
        >
          + Add Input Field
        </Button>
      </div>
    </div>
  );
}

// Step 4: Logic Configuration
function LogicStep({ value, onChange }: {
  value: { formula: string; outputLabel: string };
  onChange: (value: any) => void;
}) {
  const exampleFormulas = [
    { 
      type: 'GPA Calculator', 
      formula: '(grade_points * credit_hours) / total_credit_hours',
      description: 'Calculate weighted GPA'
    },
    { 
      type: 'Tip Calculator', 
      formula: 'bill_amount * (tip_percentage / 100)',
      description: 'Calculate tip amount'
    },
    { 
      type: 'Grade Calculator', 
      formula: '(current_points / total_points) * 100',
      description: 'Calculate percentage grade'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Define your calculation logic</h2>
        <p className="text-zinc-400">Write a simple formula using your input field names.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Formula</label>
          <textarea
            value={value.formula}
            onChange={(e) => onChange({ ...value, formula: e.target.value })}
            placeholder="e.g., (field1 + field2) / 2"
            rows={3}
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-[#FFD700] focus:outline-none font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Output Label</label>
          <input
            type="text"
            value={value.outputLabel}
            onChange={(e) => onChange({ ...value, outputLabel: e.target.value })}
            placeholder="e.g., Your GPA is:"
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-[#FFD700] focus:outline-none"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-3">Example Formulas</h3>
          <div className="space-y-2">
            {exampleFormulas.map((example, index) => (
              <Card key={index} className="p-3 bg-zinc-800 border-zinc-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white text-sm">{example.type}</h4>
                    <code className="text-xs text-[#FFD700] block mt-1">{example.formula}</code>
                    <p className="text-xs text-zinc-400 mt-1">{example.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onChange({ ...value, formula: example.formula })}
                    className="text-xs"
                  >
                    Use
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Wizard Component
export function WizardToolBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
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
      component: ToolTypeStep,
    },
    {
      id: 'info',
      title: 'Basic Info',
      description: 'Name and describe your tool',
      component: BasicInfoStep,
    },
    {
      id: 'inputs',
      title: 'Input Fields',
      description: 'Configure user inputs',
      component: InputFieldsStep,
    },
    {
      id: 'logic',
      title: 'Logic',
      description: 'Define calculations',
      component: LogicStep,
    },
  ];

  const currentStepData = steps[currentStep];
  const StepComponent = currentStepData.component;

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.toolType !== '';
      case 1:
        return formData.basicInfo.name.trim() !== '';
      case 2:
        return formData.inputFields.length > 0;
      case 3:
        return formData.logic.formula.trim() !== '';
      default:
        return true;
    }
  };

  const handleStepData = (stepId: string, data: any) => {
    setFormData(prev => ({ ...prev, [stepId]: data }));
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
          <StepComponent
            value={formData[currentStepData.id as keyof typeof formData]}
            onChange={(data: any) => handleStepData(currentStepData.id, data)}
          />
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
                className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
                disabled={!canProceed()}
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