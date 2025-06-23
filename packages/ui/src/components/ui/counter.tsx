import * as React from 'react'
import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CounterProps extends React.HTMLAttributes<HTMLDivElement> {
	value?: number
	onValueChange?: (value: number) => void
	min?: number
	max?: number
	step?: number
}

const Counter = React.forwardRef<HTMLDivElement, CounterProps>(
	(
		{
			className,
			value: initialValue = 0,
			onValueChange,
			min = 0,
			max = 100,
			step = 1,
			...props
		},
		ref
	) => {
		const [value, setValue] = React.useState(initialValue)

		const handleValueChange = (newValue: number) => {
			const clampedValue = Math.max(min, Math.min(newValue, max))
			setValue(clampedValue)
			if (onValueChange) {
				onValueChange(clampedValue)
			}
		}

		const increment = () => {
			handleValueChange(value + step)
		}

		const decrement = () => {
			handleValueChange(value - step)
		}

		React.useEffect(() => {
			setValue(initialValue)
		}, [initialValue])

		return (
			<div
				ref={ref}
				className={cn(
					'flex items-center justify-center gap-2',
					className
				)}
				{...props}
			>
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8 shrink-0 rounded-full"
					onClick={decrement}
					disabled={value <= min}
				>
					<Minus className="h-4 w-4" />
					<span className="sr-only">Decrement</span>
				</Button>
				<div className="flex-1 text-center">
					<div className="font-mono text-xl font-semibold tracking-tighter text-foreground">
						{value}
					</div>
				</div>
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8 shrink-0 rounded-full"
					onClick={increment}
					disabled={value >= max}
				>
					<Plus className="h-4 w-4" />
					<span className="sr-only">Increment</span>
				</Button>
			</div>
		)
	}
)

Counter.displayName = 'Counter'

export { Counter } 