'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const BottomNavBarRoot = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<nav
		ref={ref}
		role='navigation'
		className={cn(
			'fixed inset-x-0 bottom-0 z-50 h-16 border-t border-neutral-800 bg-neutral-950/80 backdrop-blur-lg',
			className,
		)}
		{...props}
	/>
))
BottomNavBarRoot.displayName = 'BottomNavBarRoot'

const BottomNavBarContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('mx-auto grid h-full max-w-md grid-cols-3 items-stretch', className)}
		{...props}
	/>
))
BottomNavBarContent.displayName = 'BottomNavBarContent'

const BottomNavBarItem = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			'relative flex flex-col items-center justify-center gap-1 px-2 pt-2 pb-1 text-xs font-medium text-neutral-400 transition-colors hover:text-white',
			{
				'text-white': isActive,
			},
			className,
		)}
		{...props}
	/>
))
BottomNavBarItem.displayName = 'BottomNavBarItem'

const BottomNavBarIndicator = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		className={cn(
			'absolute top-0 h-0.5 w-8 rounded-full bg-gold-500 transition-all',
			className,
		)}
		{...props}
	/>
))
BottomNavBarIndicator.displayName = 'BottomNavBarIndicator'

const BottomNavBarIcon = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<span ref={ref} className={cn('h-6 w-6', className)} {...props} />
))
BottomNavBarIcon.displayName = 'BottomNavBarIcon'

const BottomNavBarLabel = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<span ref={ref} className={cn('truncate', className)} {...props} />
))
BottomNavBarLabel.displayName = 'BottomNavBarLabel'

export const BottomNavBar = {
	Root: BottomNavBarRoot,
	Content: BottomNavBarContent,
	Item: BottomNavBarItem,
	Icon: BottomNavBarIcon,
	Label: BottomNavBarLabel,
	Indicator: BottomNavBarIndicator,
}

export {
	BottomNavBarRoot,
	BottomNavBarContent,
	BottomNavBarItem,
	BottomNavBarIcon,
	BottomNavBarLabel,
	BottomNavBarIndicator,
} 