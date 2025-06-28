'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button, Input, Label } from '@hive/ui'
import { ArrowLeft, Mail, AlertCircle, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { logger } from '@hive/core'

export default function AuthEmailPage() {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState('')
  const router = useRouter()

  // Email validation - must end with .edu
  useEffect(() => {
    const eduRegex = /^[^@]+@[^@]+\\.edu$/i
    setIsValid(eduRegex.test(email))
    setError('')
  }, [email])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValid) {
      setError('Please enter a valid .edu email address')
      return
    }

    setIsSubmitting(true)
    
    try {
      // API call to start magic link flow
      const response = await fetch('/api/auth/email/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        const { timeoutMs } = await response.json()
        setCountdown(Math.floor(timeoutMs / 1000))
        
        // Navigate to verification page with email parameter
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to send magic link')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkipToOnboarding = () => {
    logger.info('Development mode: skipping to onboarding')
    router.push('/onboarding/welcome')
  }

  const getDomain = (email: string) => {
    const match = email.match(/@(.+)/)
    return match ? match[1] : ''
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900/95 border border-zinc-800 rounded-lg p-6">
        {/* Back Button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/auth/choose">
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
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-accent" />
          </div>
          
          <h1 className="text-2xl font-bold font-display mb-2">
            Enter your .edu email
          </h1>
          <p className="text-sm text-zinc-400 font-sans">
            We&apos;ll send you a magic link to sign in
          </p>
        </motion.div>

        {/* Email Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Student Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="your.name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pr-10 ${
                  email && !isValid 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                    : email && isValid 
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
                    : ''
                }`}
                disabled={isSubmitting}
              />
              
              {/* Validation Icon */}
              <div className="absolute inset-y-0 right-3 flex items-center">
                {email && !isValid && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                {email && isValid && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            </div>
            
            {/* Domain Preview */}
            {email && isValid && (
              <motion.p
                className="text-sm text-accent font-sans"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Sending to {getDomain(email)}
              </motion.p>
            )}
            
            {/* Validation Error */}
            {email && !isValid && (
              <motion.p
                className="text-sm text-red-500 font-sans"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Please use your university .edu email address
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting || countdown > 0}
            className="w-full font-display font-semibold tracking-tight"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Sending magic link...
              </div>
            ) : countdown > 0 ? (
              `Resend in ${countdown}s`
            ) : (
              'Send Magic Link'
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <motion.div
              className="text-center text-red-500 text-sm font-sans bg-red-500/10 px-4 py-3 rounded-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          {/* Dev Skip Button */}
          {process.env.NODE_ENV !== 'production' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
              <Button
                type="button"
                variant="outline"
                className="w-full mt-4 gap-2"
                onClick={handleSkipToOnboarding}
              >
                <span className="w-4 h-4">🛠️</span>
                Skip to Onboarding (Dev)
              </Button>
        </motion.div>
          )}
        </motion.form>
      </div>
    </main>
  )
} 