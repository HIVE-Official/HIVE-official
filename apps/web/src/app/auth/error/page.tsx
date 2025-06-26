'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@hive/ui'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') || 'UNKNOWN_ERROR'
  const message = searchParams.get('message') || 'Something went wrong during authentication'

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'EXPIRED_LINK':
        return 'Your magic link has expired. Please request a new one.'
      case 'INVALID_TOKEN':
        return 'This link is invalid or has already been used.'
      case 'NETWORK_ERROR':
        return 'Network connection failed. Please check your internet and try again.'
      case 'SERVER_ERROR':
        return 'Our servers are having trouble. Please try again in a few minutes.'
      case 'INVALID_EMAIL':
        return 'This email address is not eligible for HIVE access.'
      default:
        return message
    }
  }

  const getRecoveryAction = (errorCode: string) => {
    switch (errorCode) {
      case 'EXPIRED_LINK':
      case 'INVALID_TOKEN':
        return {
          text: 'Get a new magic link',
          href: '/auth/email'
        }
      case 'NETWORK_ERROR':
      case 'SERVER_ERROR':
        return {
          text: 'Try again',
          href: '/auth/choose'
        }
      case 'INVALID_EMAIL':
        return {
          text: 'Use a different email',
          href: '/auth/email'
        }
      default:
        return {
          text: 'Start over',
          href: '/welcome'
        }
    }
  }

  const recovery = getRecoveryAction(code)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center justify-center min-h-screen px-8 py-12">
        {/* Back Button */}
        <motion.div
          className="self-start mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/welcome">
            <Button
              variant="ghost"
              className="text-muted hover:text-foreground group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to welcome
            </Button>
          </Link>
        </motion.div>

        {/* Error Icon */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="text-center mb-8 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-4xl font-bold font-display mb-4 text-red-500">
            Oops!
          </h1>
          <p className="text-lg text-foreground/80 font-sans mb-2">
            {getErrorMessage(code)}
          </p>
          <p className="text-sm text-muted font-sans">
            Error code: {code}
          </p>
        </motion.div>

        {/* Recovery Actions */}
        <motion.div
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href={recovery.href}>
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-background"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {recovery.text}
            </Button>
          </Link>

          <Link href="/welcome">
            <Button
              variant="outline"
              className="w-full border-border text-muted hover:text-foreground hover:border-accent"
            >
              Go back to welcome
            </Button>
          </Link>
        </motion.div>

        {/* Help Text */}
        <motion.div
          className="text-center mt-8 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
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