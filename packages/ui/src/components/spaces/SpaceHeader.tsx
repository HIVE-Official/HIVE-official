'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const SpaceHeaderRoot = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'flex items-center justify-between gap-4 border-b border-neutral-800 bg-neutral-950 p-4',
			className,
		)}
		{...props}
	/>
))
SpaceHeaderRoot.displayName = 'SpaceHeaderRoot'

const SpaceHeaderDetails = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex items-center gap-4', className)} {...props} />
))
SpaceHeaderDetails.displayName = 'SpaceHeaderDetails'

const SpaceHeaderInfo = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex flex-col', className)} {...props} />
))
SpaceHeaderInfo.displayName = 'SpaceHeaderInfo'

const SpaceHeaderName = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn('flex items-center gap-2 text-lg font-bold text-white', className)}
		{...props}
	/>
))
SpaceHeaderName.displayName = 'SpaceHeaderName'

const SpaceHeaderMeta = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn('text-sm text-neutral-400', className)} {...props} />
))
SpaceHeaderMeta.displayName = 'SpaceHeaderMeta'

const SpaceHeaderActions = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
))
SpaceHeaderActions.displayName = 'SpaceHeaderActions'

export const SpaceHeader = {
	Root: SpaceHeaderRoot,
	Details: SpaceHeaderDetails,
	Info: SpaceHeaderInfo,
	Name: SpaceHeaderName,
	Meta: SpaceHeaderMeta,
	Actions: SpaceHeaderActions,
}

export {
	SpaceHeaderRoot,
	SpaceHeaderDetails,
	SpaceHeaderInfo,
	SpaceHeaderName,
	SpaceHeaderMeta,
	SpaceHeaderActions,
} 