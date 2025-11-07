'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { z } from 'zod';
import { RitualArchetype, RitualComposerSchema, createDefaultConfig, } from '@hive/core';
import { Button } from '../../atoms/button.js';
import { Input } from '../../atoms/input.js';
import { Textarea } from '../../atoms/textarea.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../atoms/select.js';
import { Label } from '../../atoms/label.js';
import { cn } from '../../../lib/utils.js';
const STEP_TITLES = ['Details', 'Schedule', 'Presentation', 'Configuration', 'Review'];
export const AdminRitualComposer = ({ initialValue, onSubmit, onCancel, isSubmitting = false, }) => {
    const [step, setStep] = React.useState(0);
    const [error, setError] = React.useState(null);
    const [formState, setFormState] = React.useState(() => {
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
            endsAt: initialValue?.endsAt ??
                new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            visibility: initialValue?.visibility ?? 'public',
            presentation: initialValue?.presentation ?? {
                accentColor: '#8B5CF6',
                ctaLabel: 'Join Now',
            },
            config: initialValue?.config ?? defaults,
        };
    });
    const [configDraft, setConfigDraft] = React.useState(JSON.stringify(formState.config, null, 2));
    React.useEffect(() => {
        try {
            const parsed = JSON.parse(configDraft);
            setFormState((prev) => ({ ...prev, config: parsed }));
            setError(null);
        }
        catch {
            // ignore until submission
        }
    }, [configDraft]);
    const archetypeOptions = React.useMemo(() => Object.values(RitualArchetype), []);
    const handleFieldChange = (field, value) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };
    const handleArchetypeChange = (value) => {
        handleFieldChange('archetype', value);
        const defaults = createDefaultConfig(value);
        setConfigDraft(JSON.stringify(defaults, null, 2));
    };
    const validateCurrentStep = () => {
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
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Validation failed');
            return false;
        }
    };
    const goToNext = () => {
        if (!validateCurrentStep())
            return;
        setStep((prev) => Math.min(prev + 1, STEP_TITLES.length - 1));
    };
    const goToPrevious = () => {
        setError(null);
        setStep((prev) => Math.max(prev - 1, 0));
    };
    const handleSubmit = async () => {
        try {
            const parsedConfig = JSON.parse(configDraft);
            const payload = {
                ...formState,
                config: parsedConfig,
            };
            const validated = RitualComposerSchema.parse(payload);
            await onSubmit(validated);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to submit ritual');
        }
    };
    const renderStep = () => {
        switch (step) {
            case 0:
                return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "title", children: "Title" }), _jsx(Input, { id: "title", value: formState.title, onChange: (e) => handleFieldChange('title', e.target.value), placeholder: "Campus Madness Tournament" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "subtitle", children: "Subtitle" }), _jsx(Input, { id: "subtitle", value: formState.subtitle ?? '', onChange: (e) => handleFieldChange('subtitle', e.target.value), placeholder: "Spaces compete, campus votes" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Textarea, { id: "description", value: formState.description, onChange: (e) => handleFieldChange('description', e.target.value), rows: 5 })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "archetype", children: "Archetype" }), _jsxs(Select, { value: formState.archetype, onValueChange: (value) => handleArchetypeChange(value), children: [_jsx(SelectTrigger, { id: "archetype", children: _jsx(SelectValue, { placeholder: "Select archetype" }) }), _jsx(SelectContent, { children: archetypeOptions.map((option) => (_jsx(SelectItem, { value: option, children: option.replace('_', ' ') }, option))) })] })] })] }));
            case 1:
                return (_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "startsAt", children: "Starts" }), _jsx(Input, { id: "startsAt", type: "datetime-local", value: toLocalDateTime(formState.startsAt), onChange: (e) => handleFieldChange('startsAt', new Date(e.target.value).toISOString()) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "endsAt", children: "Ends" }), _jsx(Input, { id: "endsAt", type: "datetime-local", value: toLocalDateTime(formState.endsAt), onChange: (e) => handleFieldChange('endsAt', new Date(e.target.value).toISOString()) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "visibility", children: "Visibility" }), _jsxs(Select, { value: formState.visibility, onValueChange: (value) => handleFieldChange('visibility', value), children: [_jsx(SelectTrigger, { id: "visibility", children: _jsx(SelectValue, { placeholder: "Select visibility" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "public", children: "Public" }), _jsx(SelectItem, { value: "invite_only", children: "Invite only" }), _jsx(SelectItem, { value: "secret", children: "Secret" })] })] })] })] }));
            case 2:
                return (_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "accentColor", children: "Accent color" }), _jsx(Input, { id: "accentColor", type: "color", value: formState.presentation?.accentColor ?? '#8B5CF6', onChange: (e) => handleFieldChange('presentation', {
                                        ...formState.presentation,
                                        accentColor: e.target.value,
                                    }) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "ctaLabel", children: "Primary CTA" }), _jsx(Input, { id: "ctaLabel", value: formState.presentation?.ctaLabel ?? '', onChange: (e) => handleFieldChange('presentation', {
                                        ...formState.presentation,
                                        ctaLabel: e.target.value,
                                    }) })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx(Label, { htmlFor: "bannerImage", children: "Banner image URL" }), _jsx(Input, { id: "bannerImage", value: formState.presentation?.bannerImage ?? '', onChange: (e) => handleFieldChange('presentation', {
                                        ...formState.presentation,
                                        bannerImage: e.target.value,
                                    }) })] })] }));
            case 3:
                return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "config", children: "Archetype configuration" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setConfigDraft(JSON.stringify(createDefaultConfig(formState.archetype), null, 2)), children: "Reset to defaults" })] }), _jsx(Textarea, { id: "config", value: configDraft, onChange: (e) => setConfigDraft(e.target.value), rows: 14, className: "font-mono text-sm" }), _jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)]", children: "Provide archetype-specific configuration in JSON format." })] }));
            case 4:
                return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Review" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Confirm the ritual details before publishing." })] }), _jsx("pre", { className: "max-h-64 overflow-auto rounded-xl bg-[var(--hive-background-tertiary)] p-4 text-xs text-[var(--hive-text-secondary)]", children: JSON.stringify({ ...formState, config: formState.config }, null, 2) })] }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "flex h-full flex-col", children: [_jsx("div", { className: "flex items-center gap-2 pb-4", children: STEP_TITLES.map((title, index) => (_jsxs(React.Fragment, { children: [_jsx("button", { type: "button", className: cn('flex h-8 min-w-[32px] items-center justify-center rounded-full border px-3 text-xs font-semibold transition-colors', index === step
                                ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)]'
                                : 'border-white/10 text-white/60 hover:text-white'), onClick: () => setStep(index), children: index + 1 }), index < STEP_TITLES.length - 1 ? (_jsx("div", { className: "h-px flex-1 bg-white/10" })) : null] }, title))) }), _jsxs("div", { className: "flex-1 overflow-auto", children: [renderStep(), error && (_jsx("p", { className: "mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200", children: error }))] }), _jsxs("div", { className: "mt-6 flex items-center justify-between border-t border-white/10 pt-4", children: [_jsx(Button, { variant: "ghost", onClick: onCancel, disabled: isSubmitting, children: "Cancel" }), _jsxs("div", { className: "flex gap-2", children: [step > 0 && (_jsx(Button, { variant: "secondary", onClick: goToPrevious, disabled: isSubmitting, children: "Back" })), step < STEP_TITLES.length - 1 && (_jsx(Button, { onClick: goToNext, disabled: isSubmitting, children: "Next" })), step === STEP_TITLES.length - 1 && (_jsx(Button, { onClick: handleSubmit, disabled: isSubmitting, children: isSubmitting ? 'Publishing…' : 'Publish Ritual' }))] })] })] }));
};
function toLocalDateTime(isoValue) {
    try {
        const date = new Date(isoValue);
        const tzOffset = date.getTimezoneOffset();
        const local = new Date(date.getTime() - tzOffset * 60 * 1000);
        return local.toISOString().slice(0, 16);
    }
    catch {
        return isoValue;
    }
}
//# sourceMappingURL=admin-ritual-composer.js.map