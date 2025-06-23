import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTimerProps {
	duration: number // in seconds
	onComplete?: () => void
	autoStart?: boolean
}

interface UseTimerReturn {
	time: number
	isRunning: boolean
	start: () => void
	pause: () => void
	reset: () => void
}

export const useTimer = ({
	duration,
	onComplete,
	autoStart = false,
}: UseTimerProps): UseTimerReturn => {
	const [time, setTime] = useState(duration)
	const [isRunning, setIsRunning] = useState(autoStart)
	const intervalRef = useRef<NodeJS.Timeout | null>(null)

	const stopTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}, [])

	const start = useCallback(() => {
		if (!isRunning) {
			setIsRunning(true)
		}
	}, [isRunning])

	const pause = useCallback(() => {
		setIsRunning(false)
	}, [])

	const reset = useCallback(() => {
		setIsRunning(autoStart)
		setTime(duration)
	}, [duration, autoStart])

	useEffect(() => {
		if (isRunning && time > 0) {
			intervalRef.current = setInterval(() => {
				setTime(prevTime => prevTime - 1)
			}, 1000)
		} else if (time === 0) {
			stopTimer()
			setIsRunning(false)
			if (onComplete) {
				onComplete()
			}
		}

		return () => stopTimer()
	}, [isRunning, time, onComplete, stopTimer])

	useEffect(() => {
		setTime(duration)
		if (autoStart) {
			setIsRunning(true)
		} else {
			setIsRunning(false)
		}
	}, [duration, autoStart])

	return { time, isRunning, start, pause, reset }
} 