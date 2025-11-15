'use client';

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;

const baseItemClasses =
  'relative flex cursor-default select-none items-center gap-3 rounded-xl px-3 py-2 text-sm text-[var(--hive-text-secondary)] outline-none transition-colors focus:bg-[color-mix(in_srgb,var(--hive-background-tertiary) 45%,transparent)] focus:text-[var(--hive-text-primary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-40';

const Content = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <ContextMenuPortal>
    <ContextMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[220px] rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-elevated) 96%,transparent)] p-1.5 shadow-hive-level4 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 motion-reduce:animate-none',
        className
      )}
      {...props}
    />
  </ContextMenuPortal>
));
Content.displayName = ContextMenuPrimitive.Content.displayName;

const SubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 min-w-[200px] rounded-2xl border border-[color-mix(in_srgb,var(--hive-border-default) 70%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-elevated) 96%,transparent)] p-1.5 shadow-hive-level4 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-left-2 data-[state=open]:slide-in-from-right-2 motion-reduce:animate-none',
      className
    )}
    {...props}
  />
));
SubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(baseItemClasses, className)}
    {...props}
  />
));
Item.displayName = ContextMenuPrimitive.Item.displayName;

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(baseItemClasses, className)}
    checked={checked}
    {...props}
  >
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    <span className="pl-5">{children}</span>
  </ContextMenuPrimitive.CheckboxItem>
));
CheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const SubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      baseItemClasses,
      'data-[state=open]:bg-[color-mix(in_srgb,var(--hive-background-tertiary) 45%,transparent)] data-[state=open]:text-[var(--hive-text-primary)]',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />
  </ContextMenuPrimitive.SubTrigger>
));
SubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const Label = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[color-mix(in_srgb,var(--hive-text-tertiary) 90%,transparent)]',
      className
    )}
    {...props}
  />
));
Label.displayName = ContextMenuPrimitive.Label.displayName;

const Separator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn(
      'my-1 h-px bg-[color-mix(in_srgb,var(--hive-border-default) 60%,transparent)]',
      className
    )}
    {...props}
  />
));
Separator.displayName = ContextMenuPrimitive.Separator.displayName;

const Shortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('ml-auto text-[0.65rem] font-medium uppercase tracking-wide text-[var(--hive-text-tertiary)]', className)}
    {...props}
  />
);
Shortcut.displayName = 'ContextMenuShortcut';

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  Content as ContextMenuContent,
  SubContent as ContextMenuSubContent,
  Item as ContextMenuItem,
  CheckboxItem as ContextMenuCheckboxItem,
  SubTrigger as ContextMenuSubTrigger,
  Label as ContextMenuLabel,
  Separator as ContextMenuSeparator,
  Shortcut as ContextMenuShortcut
};
