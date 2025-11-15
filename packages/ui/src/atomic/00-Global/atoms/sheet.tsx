'use client';

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-40 bg-[color-mix(in_srgb,var(--hive-background-overlay,rgba(10,11,13,0.76)) 92%,transparent)] backdrop-blur-md transition-all duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none',
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'fixed z-50 flex flex-col bg-[var(--hive-background-elevated)] text-[var(--hive-text-primary)] shadow-hive-level3 border border-[color-mix(in_srgb,var(--hive-border-default) 85%,transparent)] data-[state=open]:animate-in data-[state=closed]:animate-out motion-reduce:animate-none',
  {
    variants: {
      side: {
        right: 'inset-y-0 right-0 w-full max-w-[420px] sm:rounded-l-3xl data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2',
        left: 'inset-y-0 left-0 w-full max-w-[420px] sm:rounded-r-3xl data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2',
        bottom:
          'inset-x-0 bottom-0 mt-auto w-full rounded-t-3xl border-b-0 data-[state=closed]:slide-out-to-bottom-1/2 data-[state=open]:slide-in-from-bottom-1/2',
        top: 'inset-x-0 top-0 mb-auto w-full rounded-b-3xl border-t-0 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-top-1/2'
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  showClose?: boolean;
  closeAriaLabel?: string;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, children, side, showClose = true, closeAriaLabel = 'Close sheet', ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        sheetVariants({ side }),
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-overlay,#050607)]',
        side === 'bottom' || side === 'top' ? 'px-5 pb-6 pt-4' : 'px-6 py-6',
        className
      )}
      {...props}
    >
      {showClose ? (
        <SheetClose
          className={cn(
            'absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--hive-border-default) 75%,transparent)] bg-[color-mix(in_srgb,var(--hive-background-primary) 90%,transparent)] text-[var(--hive-text-secondary)] transition-colors hover:text-[var(--hive-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-overlay,#050607)]',
            side === 'left' ? 'left-4 right-auto' : null
          )}
        >
          <X className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          <span className="sr-only">{closeAriaLabel}</span>
        </SheetClose>
      ) : null}
      {children}
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('px-1 pb-4 pt-1 flex flex-col gap-2', className)}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'mt-auto flex flex-col gap-3 border-t border-[color-mix(in_srgb,var(--hive-border-default) 75%,transparent)] px-1 pt-4',
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold tracking-tight text-[var(--hive-text-primary)]', className)}
    {...props}
  />
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--hive-text-secondary)] leading-relaxed', className)}
    {...props}
  />
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants
};

export type { SheetContentProps };
