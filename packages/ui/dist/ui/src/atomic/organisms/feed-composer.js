'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * Feed Composer - Create new posts in the feed
 *
 * Features:
 * - Text input area (auto-growing)
 * - Media upload toolbar
 * - Space selector
 * - Privacy selector
 * - Character counter
 * - Submit button
 */
const feedComposerVariants = cva('w-full border rounded-lg p-4 bg-[var(--hive-surface-primary)]', {
    variants: {
        variant: {
            default: 'border-[var(--hive-border-default)]',
            focused: 'border-[var(--hive-brand-primary)] shadow-lg',
        },
        size: {
            compact: 'max-w-[600px]',
            full: 'w-full',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'compact',
    },
});
export const FeedComposer = React.forwardRef(({ className, variant, size, placeholder = "What's happening?", maxLength = 5000, selectedSpace = 'Select a space', isPrivate = false, isSubmitting = false, onSubmit, onCancel, ...props }, ref) => {
    const [content, setContent] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);
    const charCount = content.length;
    const isOverLimit = charCount > maxLength;
    const canSubmit = charCount > 0 && !isOverLimit && !isSubmitting;
    return (_jsxs("div", { ref: ref, className: cn(feedComposerVariants({ variant: isFocused ? 'focused' : variant, size }), className), ...props, children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-[var(--hive-surface-secondary)] flex items-center justify-center", children: _jsx("span", { children: "\uD83D\uDC64" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-semibold text-[var(--hive-text-primary)]", children: "Your Name" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "@yourhandle" })] })] }), _jsx("textarea", { value: content, onChange: (e) => setContent(e.target.value), onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), placeholder: placeholder, className: cn('w-full min-h-[120px] bg-transparent border-none outline-none resize-none', 'text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]', 'text-lg'), disabled: isSubmitting }), _jsxs("div", { className: "border-t border-[var(--hive-border-default)] pt-3 mt-3", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("button", { type: "button", className: "p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors", title: "Add photo", children: _jsx("span", { className: "text-xl", children: "\uD83D\uDCF7" }) }), _jsx("button", { type: "button", className: "p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors", title: "Add video", children: _jsx("span", { className: "text-xl", children: "\uD83C\uDFA5" }) }), _jsx("button", { type: "button", className: "p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors", title: "Add link", children: _jsx("span", { className: "text-xl", children: "\uD83D\uDD17" }) }), _jsx("button", { type: "button", className: "p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors", title: "Create event", children: _jsx("span", { className: "text-xl", children: "\uD83D\uDCC5" }) }), _jsx("button", { type: "button", className: "p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors", title: "Create poll", children: _jsx("span", { className: "text-xl", children: "\uD83D\uDCCA" }) }), _jsx("button", { type: "button", className: "p-2 hover:bg-[var(--hive-surface-secondary)] rounded transition-colors", title: "Add emoji", children: _jsx("span", { className: "text-xl", children: "\uD83D\uDE0A" }) })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex-1 flex items-center gap-2", children: [_jsxs("button", { type: "button", className: "px-3 py-1.5 rounded bg-[var(--hive-surface-secondary)] hover:bg-[var(--hive-surface-tertiary)] transition-colors text-sm", children: [_jsx("span", { className: "mr-1", children: "\uD83D\uDCCD" }), selectedSpace] }), _jsxs("button", { type: "button", className: "px-3 py-1.5 rounded bg-[var(--hive-surface-secondary)] hover:bg-[var(--hive-surface-tertiary)] transition-colors text-sm", children: [_jsx("span", { className: "mr-1", children: isPrivate ? '🔒' : '🌍' }), isPrivate ? 'Private' : 'Public'] })] }), _jsxs("span", { className: cn('text-sm', isOverLimit
                                    ? 'text-[var(--hive-error)]'
                                    : 'text-[var(--hive-text-tertiary)]'), children: [charCount, "/", maxLength] }), _jsx("button", { type: "button", onClick: () => onSubmit?.(content), disabled: !canSubmit, className: cn('px-6 py-2 rounded-lg font-semibold transition-colors', canSubmit
                                    ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:opacity-90'
                                    : 'bg-[var(--hive-surface-secondary)] text-[var(--hive-text-tertiary)] cursor-not-allowed'), children: isSubmitting ? 'Posting...' : 'Post' })] })] }), _jsx("div", { className: "mt-3 p-2 bg-[var(--hive-surface-tertiary)] rounded text-xs text-[var(--hive-text-tertiary)]", children: "\u26A0\uFE0F SKELETON: Actual UI/UX to be designed in Storybook review" })] }));
});
FeedComposer.displayName = 'FeedComposer';
//# sourceMappingURL=feed-composer.js.map