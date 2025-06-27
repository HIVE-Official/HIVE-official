"use client";

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@hive/ui'
import { ArrowLeft, Mail, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { logger } from '@hive/core'

interface CountdownRingProps {
  timeLeft: number
  totalTime: number
}

function CountdownRing({ timeLeft, totalTime }: CountdownRingProps) {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const progress = ((totalTime - timeLeft) / totalTime) * 100
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-border/30"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-accent transition-all duration-1000 ease-in-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-accent font-display">
          {timeLeft}
        </span>
      </div>
    </div>
  )
}

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [canResend, setCanResend] = useState(false)

  const oobCode = searchParams.get('oobCode')
  const email = searchParams.get('email')

  // Handle magic link verification on page load
  useEffect(() => {
    if (oobCode && email) {
      void handleVerification()
    }
  }, [oobCode, email])

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
      setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeLeft])

  const handleVerification = async () => {
    if (!oobCode || !email) {
      setVerificationStatus('error')
      setErrorMessage('Missing verification parameters')
      return
    }

      try {
      const response = await fetch('/api/auth/email/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          url: `${window.location.origin}/auth/verify?oobCode=${oobCode}&email=${email}`,
        }),
      })

        if (response.ok) {
        setVerificationStatus('success')
        // Redirect to onboarding after a short delay
        setTimeout(() => {
            router.push('/onboarding')
        }, 2000)
      } else {
        const error = await response.json()
        setVerificationStatus('error')
        setErrorMessage(error.message || 'Verification failed')
      }
    } catch (error) {
      logger.error('Verification error:', error)
      setVerificationStatus('error')
      setErrorMessage('Network error occurred')
    }
  }

  const handleResend = async () => {
    if (!email) return
    
    try {
      const response = await fetch('/api/auth/email/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setTimeLeft(300)
        setCanResend(false)
        setVerificationStatus('pending')
        setErrorMessage('')
      } else {
        const error = await response.json()
        setErrorMessage(error.message || 'Failed to resend email')
      }
    } catch (error) {
      logger.error('Resend error:', error)
      setErrorMessage('Network error occurred')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        >
        {/* Header */}
        <div className="text-center mb-8">
        <motion.div
            className="w-16 h-16 bg-surface-01 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            {verificationStatus === 'success' ? (
            <Mail className="w-8 h-8 text-accent" />
            ) : verificationStatus === 'error' ? (
              <AlertCircle className="w-8 h-8 text-red-500" />
            ) : (
              <Mail className="w-8 h-8 text-muted" />
            )}
          </motion.div>
          
          <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
            {verificationStatus === 'success' && 'Email Verified!'}
            {verificationStatus === 'error' && 'Verification Failed'}
            {verificationStatus === 'pending' && 'Check Your Email'}
          </h1>

          <p className="text-muted font-sans">
            {verificationStatus === 'success' && 'Redirecting to onboarding...'}
            {verificationStatus === 'error' && errorMessage}
            {verificationStatus === 'pending' && 'We sent a magic link to your email'}
          </p>
        </div>

        {/* Status Content */}
        {verificationStatus === 'pending' && (
        <motion.div
            className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            {/* Countdown */}
            <div className="flex justify-center mb-6">
              <CountdownRing timeLeft={timeLeft} totalTime={300} />
            </div>

            <p className="text-sm text-muted font-sans mb-6">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button
                onClick={handleResend}
                disabled={!canResend}
                className="text-accent hover:text-accent/80 underline"
              >
                try again
              </button>
            </p>

            {/* Manual verification for development */}
            <div className="bg-surface-01 border border-border rounded-lg p-4 mb-6">
              <p className="text-sm text-muted font-sans mb-3">
                For development testing:
              </p>
              <Button
                onClick={handleVerification}
            className="w-full"
              variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Verify Manually
              </Button>
              </div>
          </motion.div>
        )}

        {verificationStatus === 'success' && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-surface-01 border border-accent/20 rounded-lg p-6 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <p className="text-sm text-muted font-sans">
                Your email has been verified successfully!
              </p>
            </div>
          </motion.div>
        )}

        {verificationStatus === 'error' && (
        <motion.div
            className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-surface-01 border border-red-500/20 rounded-lg p-6 mb-6">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-sm text-muted font-sans mb-4">
                {errorMessage}
              </p>
              <Button
                onClick={handleResend}
                className="w-full"
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
        </motion.div>
        )}

        {/* Navigation */}
        <div className="space-y-3">
          <Link href="/auth">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Button>
          </Link>

          <Button
            onClick={() => window.open('https://mail.google.com', '_blank')}
            variant="ghost"
            className="w-full"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Gmail
          </Button>
      </div>
      </motion.div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-surface-01 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-muted animate-spin" />
          </div>
          <p className="text-muted font-sans">Loading verification...</p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
