'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../../lib/utils';
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverContent = React.forwardRef(({ className, align = 'center', sideOffset = 8, ...props }, ref) => (_jsx(PopoverPrimitive.Portal, { children: _jsx(PopoverPrimitive.Content, { ref: ref, align: align, sideOffset: sideOffset, className: cn('z-50 w-auto min-w-[220px] max-w-[360px] rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 80%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-elevated) 97%,transparent)] p-4 text-[var(--hive-text-secondary)] shadow-hive-level4 outline-none', 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 motion-reduce:animate-none', className), ...props }) })));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const PopoverArrow = React.forwardRef(({ className, ...props }, ref) => (_jsx(PopoverPrimitive.Arrow, { ref: ref, className: cn('fill-[var(--hive-background-elevated)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]', className), ...props })));
PopoverArrow.displayName = PopoverPrimitive.Arrow.displayName;
export { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverAnchor };
//# sourceMappingURL=popover.js.map