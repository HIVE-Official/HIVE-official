'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../lib/utils.js';
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 6, ...props }, ref) => (_jsx(TooltipPrimitive.Content, { ref: ref, sideOffset: sideOffset, className: cn('z-50 max-w-xs rounded-lg border border-[color-mix(in_srgb,var(--hive-border-strong) 40%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-elevated) 94%,transparent)] px-3 py-2 text-xs font-medium text-[var(--hive-text-primary)] shadow-[0_12px_28px_rgba(5,6,8,0.35)] backdrop-blur-sm', 'data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[side=top]:slide-in-from-bottom-1 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 motion-reduce:animate-none', className), ...props })));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const TooltipArrow = React.forwardRef(({ className, ...props }, ref) => (_jsx(TooltipPrimitive.Arrow, { ref: ref, className: cn('fill-[color-mix(in_srgb,var(--hive-background-elevated) 94%,transparent)]', className), ...props })));
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;
export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, TooltipArrow };
//# sourceMappingURL=tooltip.js.map