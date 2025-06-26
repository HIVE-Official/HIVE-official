"use client";

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@hive/ui'
import { ArrowLeft, Mail, RefreshCw, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

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

export default function AuthVerifyPage() {
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds initial countdown
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isPolling, setIsPolling] = useState(true)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const domain = email.split('@')[1] || ''

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  // Polling for verification status
  useEffect(() => {
    if (!isPolling) return

    const pollVerification = async () => {
      try {
        const response = await fetch(`/api/auth/email/status?email=${encodeURIComponent(email)}`)
        if (response.ok) {
          const { verified } = await response.json()
          if (verified) {
            setIsPolling(false)
            router.push('/onboarding')
            return
          }
        }
      } catch {
        setError('Network error. Please try again.')
      }
    }

    // Poll every 4 seconds
    const interval = setInterval(pollVerification, 4000)
    
    // Stop polling after 5 minutes
    const timeout = setTimeout(() => {
      setIsPolling(false)
      setError('Verification timeout. Please try again.')
    }, 5 * 60 * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [email, router, isPolling])

  const handleResend = async () => {
    setIsResending(true)
    setError('')
    
    try {
      const response = await fetch('/api/auth/email/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        const { timeoutMs } = await response.json()
        setTimeLeft(Math.floor(timeoutMs / 1000))
        setCanResend(false)
        setIsPolling(true)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to resend magic link')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  const getEmailProvider = (domain: string) => {
    if (domain.includes('gmail')) return 'Gmail'
    if (domain.includes('outlook') || domain.includes('hotmail')) return 'Outlook'
    if (domain.includes('yahoo')) return 'Yahoo'
    return domain
  }

  const getEmailUrl = (domain: string) => {
    if (domain.includes('gmail')) return 'https://mail.google.com'
    if (domain.includes('outlook') || domain.includes('hotmail')) return 'https://outlook.live.com'
    if (domain.includes('yahoo')) return 'https://mail.yahoo.com'
    return `https://${domain}`
  }

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
          <Link href="/auth/email">
            <Button
              variant="ghost"
              className="text-muted hover:text-foreground group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-accent" />
          </div>
          
          <h1 className="text-4xl font-bold font-display mb-4">
            Check your email
          </h1>
          <p className="text-lg text-muted font-sans mb-2">
            We sent a magic link to
          </p>
          <p className="text-lg font-semibold text-accent font-display">
            {email}
          </p>
        </motion.div>

        {/* Countdown Ring */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CountdownRing timeLeft={timeLeft} totalTime={60} />
        </motion.div>

        {/* Status Message */}
        <motion.div
          className="text-center mb-8 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {isPolling ? (
            <div className="flex items-center justify-center text-muted font-sans">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              Waiting for verification...
            </div>
          ) : (
            <p className="text-muted font-sans">
              Check your <strong>{getEmailProvider(domain)}</strong> inbox and click the link
            </p>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Open Email Button */}
          <a
            href={getEmailUrl(domain)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent hover:text-background"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open {getEmailProvider(domain)}
            </Button>
          </a>

          {/* Resend Button */}
          <Button
            onClick={handleResend}
            disabled={!canResend || isResending}
            variant="ghost"
            className="w-full text-muted hover:text-foreground"
          >
            {isResending ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Resending...
              </div>
            ) : canResend ? (
              <div className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend magic link
              </div>
            ) : (
              `Resend in ${timeLeft}s`
            )}
          </Button>

          {/* Use Different Email */}
          <Link href="/auth/email" className="w-full">
            <Button variant="ghost" className="w-full text-muted hover:text-foreground">
              Use a different email
            </Button>
          </Link>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="text-center text-red-500 text-sm font-sans bg-red-500/10 px-4 py-3 rounded-md mt-6 max-w-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {/* Help Text */}
        <motion.div
          className="text-center mt-8 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p className="text-xs text-muted font-sans">
            Didn&apos;t receive it? Check your spam folder or try a different email address
          </p>
        </motion.div>
      </div>
    </div>
  )
}
