'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
import { PageContainer } from '../molecules/index.js';
import { HiveButton } from '../atoms/index.js';
const DEFAULT_BADGE = 'Roadmap';
export const HiveLabModePlaceholder = ({ mode, badge, title, description, helper, primaryAction, secondaryAction, className, containerClassName, }) => {
    return (_jsx("div", { className: cn('min-h-screen bg-hive-obsidian text-hive-foreground flex flex-col', className), "data-testid": `hivelab-mode-placeholder-${mode}`, children: _jsx(PageContainer, { className: cn('flex-1 py-16 text-center', containerClassName), children: _jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [_jsx("span", { className: "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-hive-text-tertiary", children: badge ?? DEFAULT_BADGE }), _jsx("h1", { className: "text-3xl md:text-4xl font-semibold text-white", children: title }), _jsx("p", { className: "text-base md:text-lg text-hive-text-secondary", children: description }), helper ? (_jsx("p", { className: "text-sm text-hive-text-tertiary", children: helper })) : null, _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3 pt-2", children: [primaryAction ? (_jsx(HiveButton, { variant: primaryAction.variant ?? 'brand', size: primaryAction.size ?? 'lg', onClick: primaryAction.onClick, className: cn(primaryAction.variant === 'brand'
                                    ? 'bg-gradient-to-r from-hive-brand-gold to-amber-500 text-black font-semibold min-w-[12rem]'
                                    : undefined), children: primaryAction.label })) : null, secondaryAction ? (_jsx(HiveButton, { variant: secondaryAction.variant ?? 'outline', size: secondaryAction.size ?? 'default', onClick: secondaryAction.onClick, children: secondaryAction.label })) : null] })] }) }) }));
};
HiveLabModePlaceholder.displayName = 'HiveLabModePlaceholder';
//# sourceMappingURL=hivelab-mode-placeholder.js.map