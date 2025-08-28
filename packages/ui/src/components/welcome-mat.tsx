'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card'
import { cn } from '../lib/utils'

type WelcomeMatProps = {
  isVisible: boolean
  onDismiss: () => void
  userName?: string
  className?: string
}

export function WelcomeMat({
  isVisible,
  onDismiss,
  userName,
  className,
}: WelcomeMatProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md',
            className,
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Card className="w-[340px] max-w-full text-center">
              <CardHeader>
                <CardTitle>You&apos;re in — welcome to HIVE!</CardTitle>
                <CardDescription>
                  {userName ? `Hello ${userName}! ` : ''}Explore spaces and connect
                  with your campus.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 pt-0">
                <Button onClick={onDismiss}>Explore Spaces</Button>
                <Button variant="secondary" onClick={onDismiss}>
                  View your profile →
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function useWelcomeMat() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [hasCheckedStorage, setHasCheckedStorage] = React.useState(false)

  React.useEffect(() => {
    const dismissed = typeof window !== 'undefined' &&
      window.localStorage.getItem('welcomeMatDismissed')
    if (!dismissed) {
      setIsVisible(true)
    }
    setHasCheckedStorage(true)
  }, [])

  const dismissWelcomeMat = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('welcomeMatDismissed', 'true')
    }
    setIsVisible(false)
  }, [])

  return { isVisible, dismissWelcomeMat, hasCheckedStorage }
}
