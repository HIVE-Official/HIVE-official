"use client";

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@hive/ui'
import { ArrowLeft, Mail, RefreshCw, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react'
import { useState, useEffect, useCallback, Suspense } from 'react'
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
  const [verificationStatus, setVerificationStatus] = useState<'waiting' | 'verifying' | 'success' | 'error'>('waiting')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [canResend, setCanResend] = useState(false)
  const [email, setEmail] = useState<string>('')

  const handleVerification = useCallback(async () => {
    const urlEmail = searchParams.get('email')
    const dev = searchParams.get('dev')
    const storedEmail = typeof window !== 'undefined' ? localStorage.getItem('hive-auth-email') : null
    const finalEmail = urlEmail || storedEmail
    
    if (!finalEmail) {
      setVerificationStatus('error')
      setErrorMessage('No email found for verification. Please start the sign-in process again.')
      return
    }

    setVerificationStatus('verifying')

    try {
      const response = await fetch('/api/auth/email/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: finalEmail,
          url: window.location.href,
          dev: dev || undefined,
        }),
      })

      const data = await response.json()

      if (response.ok && data.ok) {
        setVerificationStatus('success')
        
        // Store auth data
        if (typeof window !== 'undefined') {
          localStorage.setItem('hive-auth-token', data.idToken)
          localStorage.setItem('hive-user-data', JSON.stringify(data.user))
          localStorage.removeItem('hive-auth-email') // Clean up
        }

        // Redirect based on user status
        setTimeout(() => {
          if (data.user.isNewUser) {
            router.push('/onboarding/welcome')
          } else {
            router.push('/feed')
          }
        }, 2000)
      } else {
        setVerificationStatus('error')
        setErrorMessage(data.message || 'Verification failed')
      }
    } catch (error) {
      logger.error('Verification error:', error)
      setVerificationStatus('error')
      setErrorMessage('Network error occurred. Please check your connection and try again.')
    }
  }, [searchParams, router])

  // Get parameters from URL or localStorage
  useEffect(() => {
    const urlEmail = searchParams.get('email')
    const dev = searchParams.get('dev')
    const oobCode = searchParams.get('oobCode')
    const mode = searchParams.get('mode')
    
    // Get email from URL or localStorage
    const storedEmail = typeof window !== 'undefined' ? localStorage.getItem('hive-auth-email') : null
    const finalEmail = urlEmail || storedEmail || ''
    setEmail(finalEmail)

    // Auto-verify if this is a magic link
    if ((oobCode && mode === 'signIn') || (dev === 'true' && finalEmail)) {
      void handleVerification()
    }
  }, [searchParams, handleVerification])

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && verificationStatus === 'waiting') {
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
  }, [timeLeft, verificationStatus])

  const handleResend = async () => {
    if (!email) {
      setErrorMessage('No email found to resend to.')
      return
    }
    
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
        setVerificationStatus('waiting')
        setErrorMessage('')
        
        // Store email again
        if (typeof window !== 'undefined') {
          localStorage.setItem('hive-auth-email', email)
        }
      } else {
        const error = await response.json()
        setErrorMessage(error.message || 'Failed to resend email')
      }
    } catch (error) {
      logger.error('Resend error:', error)
      setErrorMessage('Network error occurred')
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
              <CheckCircle className="w-8 h-8 text-green-500" />
            ) : verificationStatus === 'error' ? (
              <AlertCircle className="w-8 h-8 text-red-500" />
            ) : verificationStatus === 'verifying' ? (
              <RefreshCw className="w-8 h-8 text-accent animate-spin" />
            ) : (
              <Mail className="w-8 h-8 text-muted" />
            )}
          </motion.div>
          
          <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
            {verificationStatus === 'success' && 'Welcome to HIVE!'}
            {verificationStatus === 'error' && 'Verification Failed'}
            {verificationStatus === 'verifying' && 'Verifying...'}
            {verificationStatus === 'waiting' && 'Check Your Email'}
          </h1>

          <p className="text-muted font-sans">
            {verificationStatus === 'success' && 'Setting up your account...'}
            {verificationStatus === 'error' && errorMessage}
            {verificationStatus === 'verifying' && 'Please wait while we verify your email'}
            {verificationStatus === 'waiting' && (
              <>
                We sent a magic link to {email && <span className="text-white font-medium">{email}</span>}
                {!email && 'your email'}
              </>
            )}
          </p>
        </div>

        {/* Status Content */}
        {verificationStatus === 'waiting' && (
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

            <p className="text-sm text-muted font-sans mb-2">
              {timeLeft > 0 ? `Link expires in ${formatTime(timeLeft)}` : 'Link has expired'}
            </p>

            <p className="text-sm text-muted font-sans mb-6">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button
                onClick={handleResend}
                disabled={!canResend && timeLeft > 0}
                className={`text-accent hover:text-accent/80 underline ${
                  (!canResend && timeLeft > 0) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {canResend || timeLeft === 0 ? 'send a new one' : `try again in ${formatTime(timeLeft)}`}
              </button>
            </p>
          </motion.div>
        )}

        {verificationStatus === 'verifying' && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-surface-01 border border-accent/20 rounded-lg p-6 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-accent animate-spin" />
              </div>
              <p className="text-sm text-muted font-sans">
                Verifying your email address...
              </p>
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
            <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-6 mb-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-sm text-muted font-sans">
                Your email has been verified successfully! Redirecting you now...
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
            <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-6 mb-6">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="text-sm text-muted font-sans mb-4">
                {errorMessage}
              </p>
              <div className="space-y-2">
                <Button
                  onClick={handleResend}
                  className="w-full"
                  variant="outline"
                  disabled={!email}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {email ? 'Send New Magic Link' : 'Start Over'}
                </Button>
                {!email && (
                  <Button
                    onClick={() => router.push('/auth/email')}
                    className="w-full"
                    variant="surface"
                  >
                    Start Sign In Process
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="space-y-3">
          <Link href="/auth/email">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Button>
          </Link>

          {email && email.includes('@') && (
            <Button
              onClick={() => {
                const domain = email.split('@')[1]
                if (domain.includes('gmail')) {
                  window.open('https://mail.google.com', '_blank')
                } else if (domain.includes('outlook') || domain.includes('hotmail')) {
                  window.open('https://outlook.live.com', '_blank')
                } else if (domain.includes('yahoo')) {
                  window.open('https://mail.yahoo.com', '_blank')
                } else {
                  window.open(`https://${domain}`, '_blank')
                }
              }}
              variant="ghost"
              className="w-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Email ({email.split('@')[1]})
            </Button>
          )}
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
