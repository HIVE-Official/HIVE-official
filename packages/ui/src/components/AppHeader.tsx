import React from 'react';
import { cn } from '@/lib/utils';

const AppHeaderRoot = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <header
        ref={ref}
        className={cn('sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60', className)}
        {...props}
    />
));
AppHeaderRoot.displayName = 'AppHeaderRoot';

const AppHeaderContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('container flex h-14 items-center', className)} {...props} />
));
AppHeaderContent.displayName = 'AppHeaderContent';

const AppHeaderLogo = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mr-4 flex items-center', className)} {...props} />
));
AppHeaderLogo.displayName = 'AppHeaderLogo';

const AppHeaderNav = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <nav ref={ref} className={cn('flex items-center space-x-6 text-sm font-medium', className)} {...props} />
));
AppHeaderNav.displayName = 'AppHeaderNav';

const AppHeaderActions = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-1 items-center justify-end space-x-4', className)} {...props} />
));
AppHeaderActions.displayName = 'AppHeaderActions';

export const AppHeader = {
    Root: AppHeaderRoot,
    Content: AppHeaderContent,
    Logo: AppHeaderLogo,
    Nav: AppHeaderNav,
    Actions: AppHeaderActions,
}; 