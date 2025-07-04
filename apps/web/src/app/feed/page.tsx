'use client'

import { RouteGuard } from '@/components/auth/route-guard'
import { useAuth, auth } from '@hive/auth-logic'
import { Button } from '@hive/ui'
import { motion } from 'framer-motion'
import { LogOut, User, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/routes'
import { signOut } from 'firebase/auth'
import { logger } from '@hive/core'

function FeedContent() {
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      if (auth) {
        await signOut(auth)
        logger.info('User signed out successfully')
        router.push(ROUTES.AUTH.EMAIL)
      }
    } catch (error) {
      logger.error('Error signing out', { 
        error: error instanceof Error ? error : new Error(String(error))
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface-01">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-display font-semibold text-foreground">
                HIVE
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
            Welcome to HIVE!
          </h2>
          
          <p className="text-lg text-muted font-sans mb-8 max-w-2xl mx-auto">
            You&apos;ve successfully completed the authentication and onboarding flow. 
            This is your feed where you&apos;ll see posts from your campus community.
          </p>

          <div className="bg-surface-01 border border-border rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              Your Profile
            </h3>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-muted font-sans">Email:</span>
                <span className="font-sans">{user?.email}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted font-sans">Name:</span>
                <span className="font-sans">{user?.fullName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted font-sans">Status:</span>
                <span className="text-accent font-sans">✓ Authenticated</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-muted font-sans">
            <p>🎉 Authentication & Onboarding Flow Complete!</p>
            <p className="mt-2">Ready to connect with your campus community.</p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default function FeedPage() {
  return (
    <RouteGuard requireAuth={true} redirectTo={ROUTES.AUTH.EMAIL}>
      <FeedContent />
    </RouteGuard>
  )
} 