'use client'

import { useAuth } from '@hive/auth-logic'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { logger } from '@hive/core'
import { ROUTES } from '@/lib/routes'

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireOnboarding?: boolean
  redirectTo?: string
}

export function RouteGuard({ 
  children, 
  requireAuth = true, 
  requireOnboarding = false,
  redirectTo 
}: RouteGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(!process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? false : true)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return;
    }

    if (isLoading) return

    const checkAccess = async () => {
      try {
        // Handle auth requirement
        if (requireAuth && !user) {
          logger.warn('🔒 No user found, redirecting to auth')
          router.push(redirectTo || ROUTES.AUTH.EMAIL)
          return
        }

        // Handle onboarding requirement
        if (requireOnboarding && user && !user.onboardingCompleted) {
          // Don't redirect if we're already in the onboarding flow
          if (!pathname.startsWith('/onboarding')) {
            logger.info('📝 User needs onboarding, redirecting')
            router.push(ROUTES.ONBOARDING.STEP_1)
          return
        }
        }

        setIsChecking(false)
      } catch (error) {
        logger.error('Failed to check route access', { 
          error: error instanceof Error ? error : new Error(String(error))
        })
        setIsChecking(false)
      }
    }

    void checkAccess()
  }, [user, isLoading, requireAuth, requireOnboarding, router, pathname, redirectTo])

  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return children;
  }

  if (isChecking || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted" />
          <p className="text-muted">Loading...</p>
        </div>
      </div>
    )
  }

  return children;
} 