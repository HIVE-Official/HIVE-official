'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle
} from './sheet';

const ActionSheetRoot = Sheet;
const ActionSheetTrigger = SheetTrigger;
const ActionSheetClose = SheetClose;

const ActionSheetContent = React.forwardRef<
  React.ElementRef<typeof SheetContent>,
  React.ComponentPropsWithoutRef<typeof SheetContent> & { showHandle?: boolean }
>(({ className, children, showHandle = true, ...props }, ref) => (
  <SheetContent
    ref={ref}
    side="bottom"
    showClose={false}
    className={cn(
      'border-b-0 px-2 pb-4 pt-2 sm:px-4',
      'bg-[color-mix(in_srgb,var(--hive-background-elevated) 96%,transparent)]',
      className
    )}
    {...props}
  >
    {showHandle ? (
      <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[color-mix(in_srgb,var(--hive-border-default) 45%,transparent)]" />
    ) : null}
    <div className="max-h-[60vh] space-y-3 overflow-y-auto px-1">{children}</div>
  </SheetContent>
));
ActionSheetContent.displayName = 'ActionSheetContent';

const ActionSheetHeader = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetHeader>) => (
  <SheetHeader
    className={cn('px-2 text-center text-[var(--hive-text-secondary)]', className)}
    {...props}
  />
);
ActionSheetHeader.displayName = 'ActionSheetHeader';

const ActionSheetTitle = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetTitle>) => (
  <SheetTitle
    className={cn('text-base font-semibold text-[var(--hive-text-primary)]', className)}
    {...props}
  />
);
ActionSheetTitle.displayName = 'ActionSheetTitle';

const ActionSheetDescription = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SheetDescription>) => (
  <SheetDescription
    className={cn('text-sm text-[var(--hive-text-secondary)]', className)}
    {...props}
  />
);
ActionSheetDescription.displayName = 'ActionSheetDescription';

type ActionSheetItemTone = 'default' | 'danger';

export interface ActionSheetItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ActionSheetItemTone;
  hint?: string;
  leadingIcon?: React.ReactNode;
}

const toneMap: Record<
  ActionSheetItemTone,
  { text: string; hover: string; hint: string }
> = {
  default: {
    text: 'text-[var(--hive-text-primary)]',
    hover: 'hover:bg-[color-mix(in_srgb,var(--hive-background-tertiary) 35%,transparent)]',
    hint: 'text-[var(--hive-text-secondary)]'
  },
  danger: {
    text: 'text-[var(--hive-status-error)]',
    hover: 'hover:bg-[color-mix(in_srgb,var(--hive-status-error) 18%,var(--hive-background-elevated))]',
    hint: 'text-[color-mix(in_srgb,var(--hive-status-error) 70%,var(--hive-text-secondary))]'
  }
};

const ActionSheetItem = React.forwardRef<HTMLButtonElement, ActionSheetItemProps>(
  ({ className, tone = 'default', hint, leadingIcon, children, disabled, ...props }, ref) => {
    const palette = toneMap[tone];
    return (
      <button
        ref={ref}
        className={cn(
          'group flex w-full items-center justify-between gap-3 rounded-2xl border border-transparent px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-elevated)]',
          palette.text,
          palette.hover,
          disabled
            ? 'cursor-not-allowed opacity-40'
            : 'cursor-pointer bg-[color-mix(in_srgb,var(--hive-background-elevated) 96%,transparent)]',
          className
        )}
        disabled={disabled}
        {...props}
      >
        <span className="flex items-center gap-3">
          {leadingIcon ? <span className="text-[var(--hive-brand-secondary)]">{leadingIcon}</span> : null}
          <span>{children}</span>
        </span>
        {hint ? (
          <span className={cn('text-xs font-medium leading-tight', palette.hint)}>
            {hint}
          </span>
        ) : null}
      </button>
    );
  }
);
ActionSheetItem.displayName = 'ActionSheetItem';

const ActionSheetSeparator = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'h-px w-full bg-[color-mix(in_srgb,var(--hive-border-default) 55%,transparent)]',
      className
    )}
  />
);
ActionSheetSeparator.displayName = 'ActionSheetSeparator';

const ActionSheetCancel = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children = 'Cancel', ...props }, ref) => (
  <ActionSheetClose asChild>
    <button
      ref={ref}
      className={cn(
        'mt-2 w-full rounded-2xl bg-[var(--hive-background-tertiary)] px-4 py-3 text-center text-[var(--hive-text-primary)] shadow-hive-level1 transition hover:bg-[color-mix(in_srgb,var(--hive-background-tertiary) 85%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-elevated)]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  </ActionSheetClose>
));
ActionSheetCancel.displayName = 'ActionSheetCancel';

export {
  ActionSheetRoot as ActionSheet,
  ActionSheetTrigger,
  ActionSheetClose,
  ActionSheetContent,
  ActionSheetHeader,
  ActionSheetTitle,
  ActionSheetDescription,
  ActionSheetItem,
  ActionSheetSeparator,
  ActionSheetCancel
};
