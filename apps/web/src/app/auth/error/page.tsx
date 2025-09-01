'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@hive/ui'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { AuthErrorCode, getErrorMessage, getErrorRecoveryAction } from '@hive/auth-logic'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('code') || 'UNKNOWN_ERROR'
  const code = AuthErrorCode[errorCode as keyof typeof AuthErrorCode] || AuthErrorCode.UNKNOWN_ERROR
  const errorMessage = getErrorMessage(code)
  const recovery = getErrorRecoveryAction(code)

  // Get action button configuration
  const getActionButton = () => {
    switch (recovery.type) {
      case 'REDIRECT':
        return {
          text: code === AuthErrorCode.EXPIRED_LINK 
            ? 'Get a new magic link'
            : code === AuthErrorCode.INVALID_EMAIL
            ? 'Use a different email'
            : 'Try again',
          href: recovery.path || '/welcome',
          icon: RefreshCw
        }
      
      case 'RETRY':
        return {
          text: 'Try again',
          href: '/auth/choose',
          icon: RefreshCw
        }
      
      case 'WAIT':
        return {
          text: `Wait ${recovery.waitMs ? recovery.waitMs / 1000 : 30} seconds`,
          href: '#',
          icon: RefreshCw,
          disabled: true
        }
      
      case 'CONTACT_SUPPORT':
        return {
          text: 'Contact Support',
          href: '/help',
          icon: RefreshCw
        }
      
      default:
        return {
          text: 'Start over',
          href: '/welcome',
          icon: RefreshCw
        }
    }
  }

  const action = getActionButton()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center justify-center min-h-screen px-8 py-12">
        {/* Back Button */}
        <motion.div
          className="self-start mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
        >
          <Button asChild variant="ghost" className="text-muted hover:text-foreground group">
            <Link href="/welcome">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]" />
              Back to welcome
            </Link>
          </Button>
        </motion.div>

        {/* Error Icon */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18, delay: 0.05, ease: [0.33, 0.65, 0, 1] }}
        >
          <div className="w-16 h-16 bg-surface-01 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-muted" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="text-center mb-8 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.1, ease: [0.33, 0.65, 0, 1] }}
        >
          <h1 className="text-4xl font-bold font-sans mb-4 text-foreground">
            Oops!
          </h1>
          <p className="text-lg text-foreground/80 font-sans mb-2">
            {errorMessage}
          </p>
          <p className="text-sm text-muted font-sans">
            Error code: {errorCode}
          </p>
        </motion.div>

        {/* Recovery Actions */}
        <motion.div
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.15, ease: [0.33, 0.65, 0, 1] }}
        >
          <Button
            asChild
            className="w-full bg-foreground hover:bg-foreground/90 text-background"
            disabled={action.disabled}
          >
            <Link href={action.href}>
              <action.icon className="w-4 h-4 mr-2" />
              {action.text}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full border-border text-muted hover:text-foreground hover:border-accent"
          >
            <Link href="/welcome">Go back to welcome</Link>
          </Button>
        </motion.div>

        {/* Help Text */}
        <motion.div
          className="text-center mt-8 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18, delay: 0.2, ease: [0.33, 0.65, 0, 1] }}
        >
          <p className="text-xs text-muted font-sans">
            Still having trouble? The HIVE team is here to help.{' '}
            <Link 
              href="/help" 
              className="text-accent hover:underline"
            >
              Contact support
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
} 