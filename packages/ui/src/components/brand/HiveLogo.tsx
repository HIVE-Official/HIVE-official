'use client'

import { cn } from '@/lib/utils'
import { HiveLogoIcon } from '@/components/brand/HiveLogoIcon'

export interface HiveLogoProps {
	className?: string
	showText?: boolean
	size?: number
}

export function HiveLogo({
	className,
	showText = true,
	size = 32,
}: HiveLogoProps) {
	return (
		<div className={cn('flex items-center gap-2', className)}>
			<HiveLogoIcon
				className='text-gold-500'
				style={{ width: size, height: size }}
			/>
			{showText && (
				<span
					className='text-lg font-bold tracking-tighter text-white'
					style={{ fontSize: size * 0.75 }}
				>
					HIVE
				</span>
			)}
		</div>
	)
} 