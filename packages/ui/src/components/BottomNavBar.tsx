import React from 'react';
import { cn } from '@/lib/utils';

const BottomNavBarRoot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn('fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background', className)}
    {...props}
  />
));
BottomNavBarRoot.displayName = 'BottomNavBarRoot';

const BottomNavBarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('grid h-full max-w-lg grid-cols-3 mx-auto font-medium', className)}
    {...props}
  />
));
BottomNavBarContent.displayName = 'BottomNavBarContent';

interface BottomNavBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const BottomNavBarItem = React.forwardRef<
  HTMLButtonElement,
  BottomNavBarItemProps
>(({ className, isActive, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      'inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group',
      { 'text-primary': isActive },
      className
    )}
    {...props}
  />
));
BottomNavBarItem.displayName = 'BottomNavBarItem';

const BottomNavBarIcon = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('w-6 h-6 mb-1', className)} {...props} />
));
BottomNavBarIcon.displayName = 'BottomNavBarIcon';

const BottomNavBarLabel = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
    <span ref={ref} className={cn('text-sm', className)} {...props} />
));
BottomNavBarLabel.displayName = 'BottomNavBarLabel';


const BottomNavBarIndicator = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('absolute top-0 h-1 w-10 bg-primary rounded-full', className)} {...props} />
));
BottomNavBarIndicator.displayName = 'BottomNavBarIndicator';


export const BottomNavBar = {
    Root: BottomNavBarRoot,
    Content: BottomNavBarContent,
    Item: BottomNavBarItem,
    Icon: BottomNavBarIcon,
    Label: BottomNavBarLabel,
    Indicator: BottomNavBarIndicator,
} 