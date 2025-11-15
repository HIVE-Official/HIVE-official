'use client';

import * as React from 'react';
import { z } from 'zod';
import {
  RitualArchetype,
  RitualComposerSchema,
  createDefaultConfig,
  type RitualComposerInput,
} from '@hive/core';
import { Button } from '../../00-Global/atoms/button';
import { Input } from '../../00-Global/atoms/input';
import { Textarea } from '../../00-Global/atoms/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../00-Global/atoms/select';
import { Label } from '../../00-Global/atoms/label';
import { cn } from '../../../lib/utils';

const STEP_TITLES = ['Details', 'Schedule', 'Presentation', 'Configuration', 'Review'];

export interface AdminRitualComposerProps {
  initialValue?: Partial<RitualComposerInput>;
  onSubmit: (payload: RitualComposerInput) => Promise<void> | void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export const AdminRitualComposer: React.FC<AdminRitualComposerProps> = ({
  initialValue,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [step, setStep] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  const [formState, setFormState] = React.useState<RitualComposerInput>(() => {
    const defaultArchetype = initialValue?.archetype ?? RitualArchetype.Tournament;
    const defaults = createDefaultConfig(defaultArchetype);
    return {
      campusId: initialValue?.campusId,
      title: initialValue?.title ?? '',
      subtitle: initialValue?.subtitle,
      description: initialValue?.description ?? '',
      slug: initialValue?.slug,
      archetype: defaultArchetype,
      startsAt: initialValue?.startsAt ?? new Date().toISOString(),
      endsAt:
        initialValue?.endsAt ??
        new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      visibility: initialValue?.visibility ?? 'public',
      presentation: initialValue?.presentation ?? {
        accentColor: '#8B5CF6',
        ctaLabel: 'Join Now',
      },
      config: initialValue?.config ?? defaults,
    };
  });

  const [configDraft, setConfigDraft] = React.useState(
    JSON.stringify(formState.config, null, 2),
  );

  React.useEffect(() => {
    try {
      const parsed = JSON.parse(configDraft);
      setFormState((prev) => ({ ...prev, config: parsed }));
      setError(null);
    } catch {
      // ignore until submission
    }
  }, [configDraft]);

  const archetypeOptions = React.useMemo(() => Object.values(RitualArchetype), []);

  const handleFieldChange = <K extends keyof RitualComposerInput>(field: K, value: RitualComposerInput[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleArchetypeChange = (value: RitualArchetype) => {
    handleFieldChange('archetype', value);
    const defaults = createDefaultConfig(value);
    setConfigDraft(JSON.stringify(defaults, null, 2));
  };

  const validateCurrentStep = (): boolean => {
    setError(null);

    try {
      if (step === 0) {
        z
          .object({
            title: z.string().min(3, 'Title is required'),
            description: z.string().min(10, 'Description is required'),
          })
          .parse({ title: formState.title, description: formState.description });
      }

      if (step === 1) {
        z
          .object({
            startsAt: z.string().min(1),
            endsAt: z.string().min(1),
          })
          .parse({ startsAt: formState.startsAt, endsAt: formState.endsAt });

        const startsAt = new Date(formState.startsAt).getTime();
        const endsAt = new Date(formState.endsAt).getTime();
        if (Number.isFinite(startsAt) && Number.isFinite(endsAt) && endsAt <= startsAt) {
          throw new Error('End time must be after the start time.');
        }
      }

      if (step === 3) {
        JSON.parse(configDraft);
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Validation failed');
      return false;
    }
  };

  const goToNext = () => {
    if (!validateCurrentStep()) return;
    setStep((prev) => Math.min(prev + 1, STEP_TITLES.length - 1));
  };

  const goToPrevious = () => {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      const parsedConfig = JSON.parse(configDraft);
      const payload: RitualComposerInput = {
        ...formState,
        config: parsedConfig,
      };

      const validated = RitualComposerSchema.parse(payload);
      await onSubmit(validated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit ritual');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formState.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="Campus Madness Tournament"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formState.subtitle ?? ''}
                onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                placeholder="Spaces compete, campus votes"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formState.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="archetype">Archetype</Label>
              <Select value={formState.archetype} onValueChange={(value) => handleArchetypeChange(value as RitualArchetype)}>
                <SelectTrigger id="archetype">
                  <SelectValue placeholder="Select archetype" />
                </SelectTrigger>
                <SelectContent>
                  {archetypeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="startsAt">Starts</Label>
              <Input
                id="startsAt"
                type="datetime-local"
                value={toLocalDateTime(formState.startsAt)}
                onChange={(e) => handleFieldChange('startsAt', new Date(e.target.value).toISOString())}
              />
            </div>
            <div>
              <Label htmlFor="endsAt">Ends</Label>
              <Input
                id="endsAt"
                type="datetime-local"
                value={toLocalDateTime(formState.endsAt)}
                onChange={(e) => handleFieldChange('endsAt', new Date(e.target.value).toISOString())}
              />
            </div>
            <div>
              <Label htmlFor="visibility">Visibility</Label>
              <Select
                value={formState.visibility}
                onValueChange={(value) => handleFieldChange('visibility', value as RitualComposerInput['visibility'])}
              >
                <SelectTrigger id="visibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="invite_only">Invite only</SelectItem>
                  <SelectItem value="secret">Secret</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="accentColor">Accent color</Label>
              <Input
                id="accentColor"
                type="color"
                value={formState.presentation?.accentColor ?? '#8B5CF6'}
                onChange={(e) =>
                  handleFieldChange('presentation', {
                    ...formState.presentation,
                    accentColor: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="ctaLabel">Primary CTA</Label>
              <Input
                id="ctaLabel"
                value={formState.presentation?.ctaLabel ?? ''}
                onChange={(e) =>
                  handleFieldChange('presentation', {
                    ...formState.presentation,
                    ctaLabel: e.target.value,
                  })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="bannerImage">Banner image URL</Label>
              <Input
                id="bannerImage"
                value={formState.presentation?.bannerImage ?? ''}
                onChange={(e) =>
                  handleFieldChange('presentation', {
                    ...formState.presentation,
                    bannerImage: e.target.value,
                  })
                }
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="config">Archetype configuration</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfigDraft(JSON.stringify(createDefaultConfig(formState.archetype), null, 2))}
              >
                Reset to defaults
              </Button>
            </div>
            <Textarea
              id="config"
              value={configDraft}
              onChange={(e) => setConfigDraft(e.target.value)}
              rows={14}
              className="font-mono text-sm"
            />
            <p className="text-xs text-[var(--hive-text-tertiary)]">
              Provide archetype-specific configuration in JSON format.
            </p>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Review</h3>
              <p className="text-sm text-[var(--hive-text-secondary)]">
                Confirm the ritual details before publishing.
              </p>
            </div>
            <pre className="max-h-64 overflow-auto rounded-xl bg-[var(--hive-background-tertiary)] p-4 text-xs text-[var(--hive-text-secondary)]">
              {JSON.stringify({ ...formState, config: formState.config }, null, 2)}
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 pb-4">
        {STEP_TITLES.map((title, index) => (
          <React.Fragment key={title}>
            <button
              type="button"
              className={cn(
                'flex h-8 min-w-[32px] items-center justify-center rounded-full border px-3 text-xs font-semibold transition-colors',
                index === step
                  ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)]'
                  : 'border-white/10 text-white/60 hover:text-white',
              )}
              onClick={() => setStep(index)}
            >
              {index + 1}
            </button>
            {index < STEP_TITLES.length - 1 ? (
              <div className="h-px flex-1 bg-white/10" />
            ) : null}
          </React.Fragment>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        {renderStep()}
        {error && (
          <p className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <div className="flex gap-2">
          {step > 0 && (
            <Button variant="secondary" onClick={goToPrevious} disabled={isSubmitting}>
              Back
            </Button>
          )}
          {step < STEP_TITLES.length - 1 && (
            <Button onClick={goToNext} disabled={isSubmitting}>
              Next
            </Button>
          )}
          {step === STEP_TITLES.length - 1 && (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Publishing…' : 'Publish Ritual'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

function toLocalDateTime(isoValue: string): string {
  try {
    const date = new Date(isoValue);
    const tzOffset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - tzOffset * 60 * 1000);
    return local.toISOString().slice(0, 16);
  } catch {
    return isoValue;
  }
}
