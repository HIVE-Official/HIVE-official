'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { logger } from '@hive/core'
import { ROUTES } from '@/lib/routes'

// State Management
import { useAuthStore } from '@hive/hooks'

interface RouteGuardMigratedProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireOnboarding?: boolean
  redirectTo?: string
}

export function RouteGuardMigrated({ 
  children, 
  requireAuth = true, 
  requireOnboarding = false,
  redirectTo 
}: RouteGuardMigratedProps) {
  const { user, profile, isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip auth checks if Firebase is not configured
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      return;
    }

    // Wait for auth state to be determined
    if (isLoading) return

    const checkAccess = async () => {
      try {
        // Handle auth requirement
        if (requireAuth && !isAuthenticated) {
          logger.warn('🔒 No user authenticated, redirecting to auth')
          router.push(redirectTo || ROUTES.AUTH.SCHOOL_SELECT)
          return
        }

        // Handle onboarding requirement
        if (requireOnboarding && isAuthenticated && profile && !profile.onboardingCompleted) {
          // Don't redirect if we're already in the onboarding flow
          if (!pathname.startsWith('/onboarding')) {
            logger.info('📝 User needs onboarding, redirecting')
            router.push(ROUTES.ONBOARDING.STEP_1)
            return
          }
        }

        // Check if authenticated user without profile needs onboarding
        if (requireOnboarding && isAuthenticated && !profile) {
          if (!pathname.startsWith('/onboarding')) {
            logger.info('📝 User has no profile, redirecting to onboarding')
            router.push(ROUTES.ONBOARDING.STEP_1)
            return
          }
        }
      } catch (error) {
        logger.error('Failed to check route access', { 
          error: error instanceof Error ? error : new Error(String(error))
        })
      }
    }

    void checkAccess()
  }, [user, profile, isAuthenticated, isLoading, requireAuth, requireOnboarding, router, pathname, redirectTo])

  // Skip auth checks if Firebase is not configured
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return <>{children}</>
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted" />
          <p className="text-muted">Authenticating...</p>
        </div>
      </div>
    )
  }

  // Additional check for required states
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted" />
          <p className="text-muted">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  if (requireOnboarding && isAuthenticated && (!profile || !profile.onboardingCompleted)) {
    if (!pathname.startsWith('/onboarding')) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted" />
            <p className="text-muted">Redirecting to onboarding...</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}