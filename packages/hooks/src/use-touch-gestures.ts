/**
 * Touch Gestures Hook
 *
 * Provides mobile-first touch interactions for HIVE components:
 * - Pull-to-refresh with haptic feedback simulation
 * - Swipe gestures for navigation and actions
 * - Long-press for context menus
 * - Double-tap for quick actions
 * - Smooth momentum scrolling
 */

"use client"

import { useState, useRef, useCallback, useEffect } from 'react'

export interface TouchPosition {
  x: number
  y: number
  timestamp: number
}

export interface SwipeGestureData {
  direction: 'left' | 'right' | 'up' | 'down'
  distance: number
  velocity: number
  duration: number
  startPosition: TouchPosition
  endPosition: TouchPosition
}

export interface PullToRefreshData {
  distance: number
  isTriggered: boolean
  isRefreshing: boolean
}

export interface UseTouchGesturesOptions {
  /** Enable swipe gestures */
  enableSwipe?: boolean

  /** Enable pull-to-refresh */
  enablePullToRefresh?: boolean

  /** Enable long press */
  enableLongPress?: boolean

  /** Enable double tap */
  enableDoubleTap?: boolean

  /** Minimum swipe distance (px) */
  swipeThreshold?: number

  /** Minimum swipe velocity (px/ms) */
  swipeVelocityThreshold?: number

  /** Pull-to-refresh trigger distance (px) */
  pullToRefreshThreshold?: number

  /** Long press duration (ms) */
  longPressDuration?: number

  /** Double tap max interval (ms) */
  doubleTapInterval?: number

  /** Prevent default touch behaviors */
  preventDefault?: boolean

  /** Debug logging */
  debug?: boolean
}

export interface UseTouchGesturesCallbacks {
  /** Swipe gesture detected */
  onSwipe?: (data: SwipeGestureData) => void

  /** Pull-to-refresh triggered */
  onPullToRefresh?: () => Promise<void> | void

  /** Long press detected */
  onLongPress?: (position: TouchPosition) => void

  /** Double tap detected */
  onDoubleTap?: (position: TouchPosition) => void

  /** Touch interaction started */
  onTouchStart?: (position: TouchPosition) => void

  /** Touch interaction ended */
  onTouchEnd?: (position: TouchPosition) => void
}

export interface UseTouchGesturesReturn {
  /** Touch event handlers for binding to elements */
  touchHandlers: {
    onTouchStart: (e: TouchEvent | React.TouchEvent) => void
    onTouchMove: (e: TouchEvent | React.TouchEvent) => void
    onTouchEnd: (e: TouchEvent | React.TouchEvent) => void
    onTouchCancel: (e: TouchEvent | React.TouchEvent) => void
  }

  /** Current pull-to-refresh state */
  pullToRefreshState: PullToRefreshData

  /** Current touch interaction state */
  touchState: {
    isActive: boolean
    startPosition: TouchPosition | null
    currentPosition: TouchPosition | null
  }

  /** Manually trigger haptic feedback */
  triggerHaptic: (type: 'light' | 'medium' | 'heavy') => void

  /** Reset all gesture states */
  reset: () => void
}

export function useTouchGestures(
  options: UseTouchGesturesOptions = {},
  callbacks: UseTouchGesturesCallbacks = {}
): UseTouchGesturesReturn {
  const {
    enableSwipe = true,
    enablePullToRefresh = false,
    enableLongPress = true,
    enableDoubleTap = true,
    swipeThreshold = 50,
    swipeVelocityThreshold = 0.3,
    pullToRefreshThreshold = 80,
    longPressDuration = 500,
    doubleTapInterval = 300,
    preventDefault = false,
    debug = false
  } = options

  const {
    onSwipe,
    onPullToRefresh,
    onLongPress,
    onDoubleTap,
    onTouchStart,
    onTouchEnd
  } = callbacks

  // State
  const [pullToRefreshState, setPullToRefreshState] = useState<PullToRefreshData>({
    distance: 0,
    isTriggered: false,
    isRefreshing: false
  })

  const [touchState, setTouchState] = useState({
    isActive: false,
    startPosition: null as TouchPosition | null,
    currentPosition: null as TouchPosition | null
  })

  // Refs for tracking gestures
  const touchStartRef = useRef<TouchPosition | null>(null)
  const touchCurrentRef = useRef<TouchPosition | null>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastTapRef = useRef<TouchPosition | null>(null)
  const lastTapTimeRef = useRef<number>(0)
  const initialScrollTopRef = useRef<number>(0)

  const log = useCallback((message: string, ...args: unknown[]) => {
    if (debug) {
      console.log(`[TouchGestures] ${message}`, ...args)
    }
  }, [debug])

  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      }
      navigator.vibrate(patterns[type])
    }

    // iOS haptic feedback simulation via Web Audio API
    if ('AudioContext' in window) {
      try {
        const audioContext = new AudioContext()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      } catch (error) {
        // Haptic feedback not available
      }
    }
  }, [])

  const getTouchPosition = useCallback((e: TouchEvent | React.TouchEvent): TouchPosition => {
    const touch = 'touches' in e ? e.touches[0] || e.changedTouches[0] : e
    return {
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    }
  }, [])

  const calculateDistance = useCallback((start: TouchPosition, end: TouchPosition): number => {
    const dx = end.x - start.x
    const dy = end.y - start.y
    return Math.sqrt(dx * dx + dy * dy)
  }, [])

  const calculateVelocity = useCallback((start: TouchPosition, end: TouchPosition): number => {
    const distance = calculateDistance(start, end)
    const time = end.timestamp - start.timestamp
    return time > 0 ? distance / time : 0
  }, [calculateDistance])

  const getSwipeDirection = useCallback((start: TouchPosition, end: TouchPosition): SwipeGestureData['direction'] => {
    const dx = end.x - start.x
    const dy = end.y - start.y

    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? 'right' : 'left'
    } else {
      return dy > 0 ? 'down' : 'up'
    }
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent | React.TouchEvent) => {
    const position = getTouchPosition(e)
    touchStartRef.current = position
    touchCurrentRef.current = position

    setTouchState({
      isActive: true,
      startPosition: position,
      currentPosition: position
    })

    // Store initial scroll position for pull-to-refresh
    if (enablePullToRefresh) {
      initialScrollTopRef.current = window.scrollY || document.documentElement.scrollTop
    }

    // Start long press timer
    if (enableLongPress && onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        log('Long press detected')
        triggerHaptic('medium')
        onLongPress(position)
      }, longPressDuration)
    }

    // Handle double tap detection
    if (enableDoubleTap && onDoubleTap && lastTapRef.current) {
      const timeDiff = position.timestamp - lastTapTimeRef.current
      const distance = calculateDistance(position, lastTapRef.current)

      if (timeDiff < doubleTapInterval && distance < 50) {
        log('Double tap detected')
        triggerHaptic('light')
        onDoubleTap(position)
        lastTapRef.current = null // Reset to prevent triple tap
        return
      }
    }

    lastTapRef.current = position
    lastTapTimeRef.current = position.timestamp

    onTouchStart?.(position)

    if (preventDefault) {
      e.preventDefault()
    }
  }, [getTouchPosition, enablePullToRefresh, enableLongPress, enableDoubleTap, onLongPress, onDoubleTap, onTouchStart, longPressDuration, doubleTapInterval, calculateDistance, triggerHaptic, preventDefault, log])

  const handleTouchMove = useCallback((e: TouchEvent | React.TouchEvent) => {
    if (!touchStartRef.current) return

    const position = getTouchPosition(e)
    touchCurrentRef.current = position

    setTouchState(prev => ({
      ...prev,
      currentPosition: position
    }))

    // Clear long press timer on movement
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }

    // Handle pull-to-refresh
    if (enablePullToRefresh && initialScrollTopRef.current === 0) {
      const deltaY = position.y - touchStartRef.current.y
      if (deltaY > 0) { // Pulling down
        const distance = Math.min(deltaY * 0.5, pullToRefreshThreshold * 1.5) // Damping effect

        setPullToRefreshState(prev => ({
          ...prev,
          distance,
          isTriggered: distance >= pullToRefreshThreshold
        }))

        // Haptic feedback when threshold is reached
        if (distance >= pullToRefreshThreshold && !pullToRefreshState.isTriggered) {
          triggerHaptic('medium')
        }

        if (preventDefault) {
          e.preventDefault()
        }
      }
    }

    if (preventDefault) {
      e.preventDefault()
    }
  }, [getTouchPosition, enablePullToRefresh, pullToRefreshThreshold, pullToRefreshState.isTriggered, triggerHaptic, preventDefault])

  const handleTouchEnd = useCallback((e: TouchEvent | React.TouchEvent) => {
    if (!touchStartRef.current || !touchCurrentRef.current) return

    const startPosition = touchStartRef.current
    const endPosition = touchCurrentRef.current

    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }

    // Handle swipe gesture
    if (enableSwipe && onSwipe) {
      const distance = calculateDistance(startPosition, endPosition)
      const velocity = calculateVelocity(startPosition, endPosition)

      if (distance >= swipeThreshold && velocity >= swipeVelocityThreshold) {
        const swipeData: SwipeGestureData = {
          direction: getSwipeDirection(startPosition, endPosition),
          distance,
          velocity,
          duration: endPosition.timestamp - startPosition.timestamp,
          startPosition,
          endPosition
        }

        log('Swipe detected:', swipeData.direction, distance, velocity)
        triggerHaptic('light')
        onSwipe(swipeData)
      }
    }

    // Handle pull-to-refresh trigger
    if (enablePullToRefresh && pullToRefreshState.isTriggered && !pullToRefreshState.isRefreshing && onPullToRefresh) {
      log('Pull-to-refresh triggered')
      setPullToRefreshState(prev => ({ ...prev, isRefreshing: true }))

      const refreshPromise = onPullToRefresh()
      if (refreshPromise && typeof refreshPromise.then === 'function') {
        refreshPromise.finally(() => {
          setPullToRefreshState({
            distance: 0,
            isTriggered: false,
            isRefreshing: false
          })
        })
      } else {
        // Simulate loading for synchronous refresh
        setTimeout(() => {
          setPullToRefreshState({
            distance: 0,
            isTriggered: false,
            isRefreshing: false
          })
        }, 1000)
      }
    } else {
      // Reset pull-to-refresh state
      setPullToRefreshState({
        distance: 0,
        isTriggered: false,
        isRefreshing: false
      })
    }

    // Reset touch state
    setTouchState({
      isActive: false,
      startPosition: null,
      currentPosition: null
    })

    touchStartRef.current = null
    touchCurrentRef.current = null

    onTouchEnd?.(endPosition)

    if (preventDefault) {
      e.preventDefault()
    }
  }, [enableSwipe, enablePullToRefresh, onSwipe, onPullToRefresh, onTouchEnd, calculateDistance, calculateVelocity, getSwipeDirection, swipeThreshold, swipeVelocityThreshold, pullToRefreshState.isTriggered, pullToRefreshState.isRefreshing, triggerHaptic, preventDefault, log])

  const handleTouchCancel = useCallback((_e: TouchEvent | React.TouchEvent) => {
    // Clear all timers and reset state
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }

    setTouchState({
      isActive: false,
      startPosition: null,
      currentPosition: null
    })

    setPullToRefreshState({
      distance: 0,
      isTriggered: false,
      isRefreshing: false
    })

    touchStartRef.current = null
    touchCurrentRef.current = null
  }, [])

  const reset = useCallback(() => {
    handleTouchCancel({} as TouchEvent)
  }, [handleTouchCancel])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  }, [])

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel
    },
    pullToRefreshState,
    touchState,
    triggerHaptic,
    reset
  }
}