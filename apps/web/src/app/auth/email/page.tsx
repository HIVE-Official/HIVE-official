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
  const [selectedSchool, setSelectedSchool] = useState<{
    id: string;
    name: string;
    domain: string;
  } | null>(null)
  const router = useRouter()
  const isDevelopment = process.env.NODE_ENV === 'development'

  // Load selected school from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const schoolId = localStorage.getItem('hive-selected-school-id')
      const schoolName = localStorage.getItem('hive-selected-school-name')
      const schoolDomain = localStorage.getItem('hive-selected-school-domain')
      
      if (schoolId && schoolName && schoolDomain) {
        setSelectedSchool({ id: schoolId, name: schoolName, domain: schoolDomain })
      } else {
        // No school selected, redirect back to school selection
        router.push('/auth/school-select')
      }
    }
  }, [router])

  // Email validation - must match selected school domain
  useEffect(() => {
    if (!selectedSchool) return
    
    const domainRegex = new RegExp(`^[^@]+@${selectedSchool.domain.replace('.', '\\.')}$`, 'i')
    setIsValid(domainRegex.test(email))
    setError('')
  }, [email, selectedSchool])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValid || !selectedSchool) {
      setError(`Please enter a valid ${selectedSchool?.domain} email address`)
      return
    }

    setIsSubmitting(true)
    setError('')
    
    try {
      // Store email for verification page
      if (typeof window !== 'undefined') {
        localStorage.setItem('hive-auth-email', email)
      }

      // Development mode - simulate magic link flow
      if (isDevelopment) {
        logger.info('🔥 Development mode: Simulating magic link flow')
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
        router.push(`/auth/verify?email=${encodeURIComponent(email)}&dev=true`)
        return
      }

      // Production mode - API call to start magic link flow
      const response = await fetch('/api/auth/email/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          schoolId: selectedSchool.id 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Navigate to verification page
        router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
      } else {
        setError(data.message || 'Failed to send magic link')
        logger.error('Magic link error:', data)
      }
    } catch (error) {
      setError('Network error. Please try again.')
      logger.error('Network error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkipToOnboarding = () => {
    logger.info('Development mode: skipping to onboarding')
    router.push('/onboarding/1')
  }

  const getDomain = (email: string) => {
    const match = email.match(/@(.+)/)
    return match ? match[1] : ''
  }

  // Show loading while school data loads
  if (!selectedSchool) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      {isDevelopment && (
        <div className="fixed top-0 left-0 right-0 bg-accent/20 text-accent text-center py-1 text-sm">
          Development Mode: Auth service simulated
        </div>
      )}
      <div className="w-full max-w-md bg-surface border border-border rounded-lg p-6">
        {/* Back Button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/auth/school-select">
            <Button
              variant="ghost"
              className="text-muted hover:text-foreground group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Change School
            </Button>
          </Link>
        </motion.div>

        {/* School Context */}
        <motion.div
          className="mb-6 p-3 bg-surface-01 border border-border rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-sm text-foreground font-medium">
            {selectedSchool.name}
          </p>
          <p className="text-xs text-muted">
            Enter your {selectedSchool.domain} email address
          </p>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-surface-01 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-foreground" />
          </div>
          
          <h1 className="text-2xl font-display font-medium mb-2 text-foreground">
            Enter your student email
          </h1>
          <p className="text-sm text-muted font-sans">
            We'll send you a magic link to sign in
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
                placeholder={`your.name@${selectedSchool.domain}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pr-10 ${
                  email && !isValid 
                    ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                    : email && isValid 
                    ? 'border-accent focus:border-accent focus:ring-accent/20'
                    : ''
                }`}
                disabled={isSubmitting}
              />
              
              {/* Validation Icon */}
              <div className="absolute inset-y-0 right-3 flex items-center">
                {email && !isValid && (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                )}
                {email && isValid && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            </div>
            
            {/* Domain Preview */}
            {email && isValid && (
              <motion.p
                className="text-sm text-green-500 font-sans"
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
                className="text-sm text-destructive font-sans"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Please use your {selectedSchool.domain} email address
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isValid || isSubmitting || countdown > 0}
            className="w-full font-display font-semibold tracking-tight"
            variant="default"
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