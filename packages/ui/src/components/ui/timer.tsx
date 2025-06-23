'use client'

import * as React from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { useTimer } from '@hive/hooks'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TimerProps extends React.HTMLAttributes<HTMLDivElement> {
	duration: number
	onComplete?: () => void
	autoStart?: boolean
}

const formatTime = (seconds: number) => {
	const h = Math.floor(seconds / 3600)
	const m = Math.floor((seconds % 3600) / 60)
	const s = seconds % 60

	const parts = [h > 0 ? h : null, m, s]
		.filter(v => v !== null)
		.map(v => String(v).padStart(2, '0'))

	return parts.join(':')
}

const Timer = React.forwardRef<HTMLDivElement, TimerProps>(
	(
		{ className, duration, onComplete, autoStart = false, ...props },
		ref
	) => {
		const [isCompleted, setIsCompleted] = React.useState(false)

		const handleComplete = () => {
			setIsCompleted(true)
			if (onComplete) {
				onComplete()
			}
			setTimeout(() => setIsCompleted(false), 1200) // Reset after animation
		}

		const { time, isRunning, start, pause, reset } = useTimer({
			duration,
			onComplete: handleComplete,
			autoStart,
		})

		const handleReset = () => {
			setIsCompleted(false)
			reset()
		}

		return (
			<div
				ref={ref}
				className={cn('flex flex-col items-center gap-4', className)}
				{...props}
			>
				<div
					className={cn(
						'font-mono text-6xl font-bold tracking-tighter transition-colors',
						isCompleted ? 'animate-pulse text-amber-400' : 'text-foreground'
					)}
				>
					{formatTime(time)}
				</div>
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon" onClick={handleReset}>
						<RotateCcw className="h-6 w-6" />
						<span className="sr-only">Reset</span>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={isRunning ? pause : start}
					>
						{isRunning ? (
							<Pause className="h-6 w-6" />
						) : (
							<Play className="h-6 w-6" />
						)}
						<span className="sr-only">{isRunning ? 'Pause' : 'Play'}</span>
					</Button>
				</div>
			</div>
		)
	}
)

Timer.displayName = 'Timer'

export { Timer } 