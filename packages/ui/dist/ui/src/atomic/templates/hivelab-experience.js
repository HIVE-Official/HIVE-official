'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HiveLabModePlaceholder, } from './hivelab-mode-placeholder.js';
import { HiveLabOverview, } from './hivelab-overview.js';
import { hiveLabModeCopy as defaultModeCopy, hiveLabOverviewMock, } from './hivelab-mock-data.js';
import { VisualToolComposer, } from '@/components/hivelab/visual-tool-composer';
import { initializeElementSystem } from '@/lib/hivelab/element-system';
const VISUAL_MODE = 'visual';
function enhanceQuickActions(actions) {
    return actions.map((action) => {
        let highlight = action.highlight;
        if (action.mode === 'visual') {
            highlight = 'Best starting point';
        }
        else if (action.mode === 'template' || action.mode === 'wizard') {
            highlight = highlight ?? 'Coming soon';
        }
        else if (action.mode) {
            highlight = highlight ?? 'Roadmap';
        }
        return {
            ...action,
            highlight,
            tags: action.tags ? action.tags.map((tag) => ({ ...tag })) : undefined,
        };
    });
}
export const HiveLabExperience = ({ initialMode = 'overview', overviewConfig, modeCopy, composerProps, userId, onModeChange, }) => {
    const [mode, setMode] = useState(initialMode);
    useEffect(() => {
        initializeElementSystem();
    }, []);
    useEffect(() => {
        onModeChange?.(mode);
    }, [mode, onModeChange]);
    const resolvedOverview = useMemo(() => {
        const base = overviewConfig ?? hiveLabOverviewMock;
        return {
            ...base,
            hero: base.hero,
            quickActions: enhanceQuickActions(base.quickActions),
            callToAction: base.callToAction
                ? {
                    ...base.callToAction,
                    onClick: () => setMode(VISUAL_MODE),
                }
                : undefined,
        };
    }, [overviewConfig]);
    const resolvedModeCopy = modeCopy ?? defaultModeCopy;
    const { onSave, onPreview, onCancel, userId: composerUserId, ...restComposerProps } = composerProps ?? {};
    const resolvedUserId = composerUserId ?? userId ?? 'hive-user';
    const handleSave = useCallback(async (composition) => {
        if (onSave) {
            await onSave(composition);
        }
    }, [onSave]);
    const handlePreview = useCallback((composition) => {
        onPreview?.(composition);
    }, [onPreview]);
    const handleCancel = useCallback(() => {
        onCancel?.();
        setMode('overview');
    }, [onCancel]);
    const handleActionSelect = useCallback((action) => {
        if (action.mode) {
            setMode(action.mode);
        }
    }, []);
    if (mode === 'overview') {
        return (_jsx(HiveLabOverview, { ...resolvedOverview, onSelectAction: handleActionSelect }));
    }
    if (mode === 'visual') {
        return (_jsx(VisualToolComposer, { userId: resolvedUserId, onSave: handleSave, onPreview: handlePreview, onCancel: handleCancel, ...restComposerProps }));
    }
    const placeholderKey = mode;
    const placeholderCopy = resolvedModeCopy[placeholderKey];
    return (_jsx(HiveLabModePlaceholder, { mode: placeholderKey, badge: placeholderCopy?.badge, title: placeholderCopy?.title ?? 'Coming soon', description: placeholderCopy?.description ??
            'This HiveLab mode is in active development. Switch to the visual builder to start creating campus tools today.', helper: placeholderCopy?.helper, primaryAction: {
            label: 'Open visual builder',
            variant: 'brand',
            size: 'lg',
            onClick: () => setMode('visual'),
        }, secondaryAction: {
            label: 'Back to overview',
            onClick: () => setMode('overview'),
        } }));
};
HiveLabExperience.displayName = 'HiveLabExperience';
//# sourceMappingURL=hivelab-experience.js.map