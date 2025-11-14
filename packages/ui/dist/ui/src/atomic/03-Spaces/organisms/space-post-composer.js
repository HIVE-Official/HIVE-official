'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '@/lib/utils';
import { FeedComposerSheet } from '../../02-Feed/organisms/feed-composer-sheet.js';
import { Switch } from '../../00-Global/atoms/switch.js';
import { Label } from '../../00-Global/atoms/label.js';
/**
 * SpacePostComposer
 *
 * Pre-configured post composer for a specific space.
 * - Space is pre-selected (not changeable)
 * - Optional anonymous posting toggle
 * - Wraps FeedComposerSheet with space context
 */
export const SpacePostComposer = React.forwardRef(({ spaceId, spaceName, spaceIcon, spaceColor, open, onOpenChange, allowAnonymous = false, defaultAnonymous = false, onSubmit, isSubmitting = false, maxLength = 2000, allowMedia = true, className, ...props }, ref) => {
    const [isAnonymous, setIsAnonymous] = React.useState(defaultAnonymous);
    const handleSubmit = React.useCallback((data) => {
        onSubmit?.({
            ...data,
            anonymous: isAnonymous,
        });
    }, [onSubmit, isAnonymous]);
    // Reset anonymous state when modal closes
    React.useEffect(() => {
        if (!open) {
            setIsAnonymous(defaultAnonymous);
        }
    }, [open, defaultAnonymous]);
    return (_jsx("div", { ref: ref, className: cn('', className), ...props, children: _jsx(FeedComposerSheet, { open: open, onOpenChange: onOpenChange, spaces: [
                {
                    id: spaceId,
                    name: spaceName,
                    icon: spaceIcon,
                    color: spaceColor,
                },
            ], selectedSpaceId: spaceId, onSubmit: handleSubmit, isSubmitting: isSubmitting, maxLength: maxLength, allowMedia: allowMedia, customFooter: allowAnonymous ? (_jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] p-3", children: [_jsxs("div", { className: "flex flex-1 items-center gap-2", children: [_jsx(Label, { htmlFor: "anonymous-toggle", className: "text-sm text-[var(--hive-text-secondary)] cursor-pointer", children: "Post anonymously" }), _jsx("span", { className: "text-xs text-[var(--hive-text-tertiary)]", children: "(only leaders can see your identity)" })] }), _jsx(Switch, { id: "anonymous-toggle", checked: isAnonymous, onCheckedChange: setIsAnonymous })] })) : null }) }));
});
SpacePostComposer.displayName = 'SpacePostComposer';
//# sourceMappingURL=space-post-composer.js.map