'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const AppHeaderRoot = React.forwardRef<
	HTMLElement,
	React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
	<header
		ref={ref}
		className={cn(
			'sticky top-0 z-50 h-16 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-lg',
			className,
		)}
		{...props}
	/>
))
AppHeaderRoot.displayName = 'AppHeaderRoot'

const AppHeaderContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('container mx-auto flex h-full items-center', className)}
		{...props}
	/>
))
AppHeaderContent.displayName = 'AppHeaderContent'

const AppHeaderLogo = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex items-center', className)} {...props} />
))
AppHeaderLogo.displayName = 'AppHeaderLogo'

const AppHeaderNav = React.forwardRef<
	HTMLElement,
	React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
	<nav
		ref={ref}
		className={cn('hidden md:flex md:items-center md:gap-4 lg:gap-6', className)}
		{...props}
	/>
))
AppHeaderNav.displayName = 'AppHeaderNav'

const AppHeaderActions = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex flex-1 items-center justify-end gap-4', className)}
		{...props}
	/>
))
AppHeaderActions.displayName = 'AppHeaderActions'

export const AppHeader = {
	Root: AppHeaderRoot,
	Content: AppHeaderContent,
	Logo: AppHeaderLogo,
	Nav: AppHeaderNav,
	Actions: AppHeaderActions,
}

export {
	AppHeaderRoot,
	AppHeaderContent,
	AppHeaderLogo,
	AppHeaderNav,
	AppHeaderActions,
} 