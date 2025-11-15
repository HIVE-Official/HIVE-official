'use client';

/**
 * Ritual Creator - 5-Step Wizard
 *
 * Admin interface for creating rituals in < 30 seconds.
 * Uses templates + dynamic forms for each archetype.
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Button,
  Badge,
  Input,
  Label,
  Textarea,
  useToast,
} from '@hive/ui';
import {
  RITUAL_TEMPLATES,
  getAvailableTemplates,
  RitualArchetype,
  type RitualTemplate,
  type RitualTemplateId,
} from '@hive/core';
import { ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';

type WizardStep = 'template' | 'basic' | 'config' | 'presentation' | 'review';

export default function CreateRitualPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<WizardStep>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<RitualTemplate | null>(null);
  const [ritualData, setRitualData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock: Get current user count (in production, fetch from API)
  const currentUsers = 150;
  const availableTemplates = getAvailableTemplates(currentUsers);

  const steps: { id: WizardStep; label: string; number: number }[] = [
    { id: 'template', label: 'Choose Template', number: 1 },
    { id: 'basic', label: 'Basic Info', number: 2 },
    { id: 'config', label: 'Configuration', number: 3 },
    { id: 'presentation', label: 'Presentation', number: 4 },
    { id: 'review', label: 'Review & Launch', number: 5 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const handleTemplateSelect = (templateId: RitualTemplateId) => {
    const template = RITUAL_TEMPLATES[templateId];
    setSelectedTemplate(template);
    setRitualData(template.defaults);
    handleNext();
  };

  const handleLaunch = async () => {
    setIsSubmitting(true);
    try {
      // Calculate dates
      const now = new Date();
      const startsAt = new Date(now.getTime() + 60 * 60 * 1000).toISOString(); // 1 hour from now
      const endsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from now

      const payload = {
        ...ritualData,
        campusId: 'ub-buffalo',
        startsAt,
        endsAt,
        phase: 'announced',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch('/api/admin/rituals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create ritual');
      }

      const { data } = await res.json();

      toast({
        title: 'Ritual Created!',
        message: `${ritualData.title} has been created and will start in 1 hour.`,
        type: 'success',
      });

      router.push('/rituals');
    } catch (error) {
      toast({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to create ritual',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Create Ritual</h1>
          <p className="mt-2 text-white/60">Launch a campus-wide event in under 30 seconds</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      idx <= currentStepIndex
                        ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)] text-white'
                        : 'border-white/20 text-white/40'
                    }`}
                  >
                    {idx < currentStepIndex ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="mt-2 text-xs text-white/60">{step.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${
                      idx < currentStepIndex ? 'bg-[var(--hive-brand-primary)]' : 'bg-white/10'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-white/10 bg-white/5 p-6">
          {/* Step 1: Template Selection */}
          {currentStep === 'template' && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">Choose a Template</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(RITUAL_TEMPLATES).map(([id, template]) => {
                  const isAvailable = currentUsers >= template.metadata.minUsers;
                  return (
                    <Card
                      key={id}
                      className={`cursor-pointer border p-4 transition-all ${
                        isAvailable
                          ? 'border-white/20 hover:border-[var(--hive-brand-primary)] hover:bg-white/10'
                          : 'border-white/10 opacity-50'
                      }`}
                      onClick={() => isAvailable && handleTemplateSelect(id as RitualTemplateId)}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-2xl">{template.defaults.presentation?.icon}</span>
                        {!isAvailable && (
                          <Badge variant="secondary" className="text-xs">
                            Unlock at {template.metadata.minUsers}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-white">{template.metadata.name}</h3>
                      <p className="mt-1 text-xs text-white/60">{template.metadata.description}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-white/50">
                        <Badge variant="outline" className="text-xs">
                          {template.metadata.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {template.metadata.difficulty}
                        </Badge>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Basic Configuration */}
          {currentStep === 'basic' && selectedTemplate && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-white">Title</Label>
                  <Input
                    id="title"
                    value={ritualData.title || ''}
                    onChange={(e) => setRitualData({ ...ritualData, title: e.target.value })}
                    placeholder="Enter ritual title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle" className="text-white">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={ritualData.subtitle || ''}
                    onChange={(e) => setRitualData({ ...ritualData, subtitle: e.target.value })}
                    placeholder="Short tagline"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={ritualData.description || ''}
                    onChange={(e) => setRitualData({ ...ritualData, description: e.target.value })}
                    placeholder="Explain what this ritual is about"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="visibility" className="text-white">Visibility</Label>
                  <select
                    id="visibility"
                    value={ritualData.visibility || 'public'}
                    onChange={(e) => setRitualData({ ...ritualData, visibility: e.target.value })}
                    className="mt-1 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-white focus:border-[var(--hive-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--hive-brand-primary)]"
                  >
                    <option value="public">Public</option>
                    <option value="invite_only">Invite Only</option>
                    <option value="secret">Secret</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Archetype Configuration */}
          {currentStep === 'config' && selectedTemplate && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">
                {selectedTemplate.metadata.name} Configuration
              </h2>
              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                <p className="text-sm text-yellow-400">
                  <Sparkles className="mr-2 inline h-4 w-4" />
                  Using smart defaults from template. Advanced config coming soon!
                </p>
              </div>
              <div className="mt-4 space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
                <pre className="overflow-auto text-xs text-white/70">
                  {JSON.stringify(ritualData.config, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Step 4: Presentation */}
          {currentStep === 'presentation' && selectedTemplate && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">Presentation</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="icon" className="text-white">Icon Emoji</Label>
                  <Input
                    id="icon"
                    value={ritualData.presentation?.icon || ''}
                    onChange={(e) =>
                      setRitualData({
                        ...ritualData,
                        presentation: { ...ritualData.presentation, icon: e.target.value },
                      })
                    }
                    placeholder="🎯"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="accentColor" className="text-white">Accent Color</Label>
                  <Input
                    id="accentColor"
                    type="color"
                    value={ritualData.presentation?.accentColor || '#FFD700'}
                    onChange={(e) =>
                      setRitualData({
                        ...ritualData,
                        presentation: { ...ritualData.presentation, accentColor: e.target.value },
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaLabel" className="text-white">CTA Button Text</Label>
                  <Input
                    id="ctaLabel"
                    value={ritualData.presentation?.ctaLabel || ''}
                    onChange={(e) =>
                      setRitualData({
                        ...ritualData,
                        presentation: { ...ritualData.presentation, ctaLabel: e.target.value },
                      })
                    }
                    placeholder="Join Now"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Launch */}
          {currentStep === 'review' && selectedTemplate && (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-white">Review & Launch</h2>
              <div className="space-y-4">
                <Card className="border-white/10 bg-black/30 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-3xl">{ritualData.presentation?.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{ritualData.title}</h3>
                      <p className="text-sm text-white/60">{ritualData.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70">{ritualData.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge>{selectedTemplate.metadata.archetype}</Badge>
                    <Badge variant="outline">{ritualData.visibility}</Badge>
                    <Badge variant="outline">{selectedTemplate.metadata.duration}</Badge>
                  </div>
                </Card>

                <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
                  <h4 className="mb-2 font-semibold text-blue-400">Schedule</h4>
                  <p className="text-sm text-white/70">
                    • Starts: 1 hour from now<br />
                    • Duration: {selectedTemplate.metadata.duration}<br />
                    • Phase: Announced (students will see countdown)
                  </p>
                </div>

                <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                  <h4 className="mb-2 font-semibold text-green-400">Ready to Launch</h4>
                  <p className="text-sm text-white/70">
                    Once launched, this ritual will be visible to all {currentUsers} students at UB.
                    You can always pause or end it early from the admin panel.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {currentStep !== 'review' ? (
              <Button onClick={handleNext} disabled={!selectedTemplate}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleLaunch} disabled={isSubmitting}>
                {isSubmitting ? 'Launching...' : '🚀 Launch Ritual'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
