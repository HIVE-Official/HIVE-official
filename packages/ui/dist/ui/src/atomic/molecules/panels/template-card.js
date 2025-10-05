/**
 * Template Card Component
 *
 * Card showing a pre-built tool template in the template browser.
 * Users can select templates to start building from.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../../lib/utils.js';
import { Button } from '../../atoms/button.js';
import { Badge } from '../../atoms/badge.js';
import { Eye, Copy } from 'lucide-react';
export function TemplateCard({ template, isSelected = false, onClick, onPreview, onUse, className, }) {
    return (_jsxs("div", { className: cn('template-card group', 'flex flex-col rounded-lg border bg-card overflow-hidden transition-all', 'hover:shadow-md hover:border-primary/40 cursor-pointer', isSelected && 'ring-2 ring-primary shadow-md', className), onClick: () => onClick?.(template), children: [_jsxs("div", { className: "aspect-video bg-muted relative overflow-hidden", children: [template.thumbnail ? (_jsx("img", { src: template.thumbnail, alt: template.name, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl mb-2", children: "\uD83D\uDEE0\uFE0F" }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [template.elementCount, " elements \u2022 ", template.pageCount, " page", template.pageCount === 1 ? '' : 's'] })] }) })), _jsx("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: (e) => {
                                e.stopPropagation();
                                onPreview?.(template);
                            }, className: "gap-1.5", children: [_jsx(Eye, { className: "h-4 w-4" }), "Preview"] }) }), _jsx("div", { className: "absolute top-2 left-2", children: _jsx(Badge, { variant: "sophomore", className: "text-xs", children: template.category }) }), template.usageCount && template.usageCount > 10 && (_jsx("div", { className: "absolute top-2 right-2", children: _jsxs(Badge, { variant: "freshman", className: "text-xs", children: [template.usageCount, " uses"] }) }))] }), _jsxs("div", { className: "flex flex-col flex-1 p-4", children: [_jsx("h4", { className: "font-semibold text-sm mb-1 line-clamp-1", children: template.name }), _jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mb-3 flex-1", children: template.description }), template.tags && template.tags.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1 mb-3", children: [template.tags.slice(0, 3).map((tag) => (_jsx("span", { className: "px-1.5 py-0.5 bg-muted rounded text-xs text-muted-foreground", children: tag }, tag))), template.tags.length > 3 && (_jsxs("span", { className: "px-1.5 py-0.5 text-xs text-muted-foreground", children: ["+", template.tags.length - 3] }))] })), _jsxs("div", { className: "flex items-center justify-between gap-2 pt-2 border-t", children: [_jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [_jsxs("span", { children: [template.elementCount, " elements"] }), _jsxs("span", { children: [template.pageCount, " page", template.pageCount === 1 ? '' : 's'] })] }), _jsxs(Button, { variant: "default", size: "sm", onClick: (e) => {
                                    e.stopPropagation();
                                    onUse?.(template);
                                }, className: "h-7 gap-1", children: [_jsx(Copy, { className: "h-3 w-3" }), "Use"] })] }), template.createdBy && (_jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: ["By ", template.createdBy] }))] })] }));
}
TemplateCard.displayName = 'TemplateCard';
//# sourceMappingURL=template-card.js.map