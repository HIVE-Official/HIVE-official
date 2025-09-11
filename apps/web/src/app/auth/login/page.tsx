'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { logger } from '@hive/core'
import { ROUTES } from '@/lib/routes'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

// State Management
import { useAuthStore, useUIStore } from '@hive/hooks'

// Auth mutations - use local client-side hooks
import { useSendMagicLink, useVerifyMagicLink } from '@/hooks/use-auth-mutations'

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || ROUTES.APP.FEED
  const schoolId = searchParams.get('school')
  
  // Global state
  const { user, setUser } = useAuthStore()
  const { addToast } = useUIStore()
  
  // Local state
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [checkingAuth, setCheckingAuth] = useState(true)
  
  // Mutations
  const sendMagicLink = useSendMagicLink()
  const verifyMagicLink = useVerifyMagicLink()
  
  // Check if user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: any) => {
      if (firebaseUser) {
        // User is already signed in
        logger.info('User already authenticated, redirecting...', { uid: firebaseUser.uid })
        addToast({
          title: 'Already signed in',
          description: 'Redirecting to your dashboard...',
          type: 'info'
        })
        router.push(redirect)
      } else {
        setCheckingAuth(false)
      }
    })

    return () => unsubscribe()
  }, [redirect, router, addToast])
  
  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])
  
  // Check for magic link token in URL
  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      handleMagicLinkVerification(token)
    }
  }, [searchParams])
  
  const handleMagicLinkVerification = async (token: string) => {
    try {
      const result = await verifyMagicLink.mutateAsync({ token })
      
      if (result.user) {
        setUser(result.user)
        addToast({
          title: 'Welcome back!',
          description: 'You have been successfully signed in.',
          type: 'success'
        })
        
        // Redirect based on user state
        if (!result.user.onboardingCompleted) {
          router.push(ROUTES.ONBOARDING.STEP_1)
        } else {
          router.push(redirect)
        }
      }
    } catch (error) {
      logger.error('Failed to verify magic link', { error })
      addToast({
        title: 'Invalid or expired link',
        description: 'Please request a new sign-in link.',
        type: 'error'
      })
      router.push(ROUTES.AUTH.LOGIN)
    }
  }
  
  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      addToast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        type: 'error'
      })
      return
    }
    
    // Validate email domain
    if (schoolId && schoolId === 'ub-buffalo' && !email.endsWith('@buffalo.edu')) {
      addToast({
        title: 'School email required',
        description: 'Please use your @buffalo.edu email address.',
        type: 'error'
      })
      return
    } else if (!schoolId && !email.endsWith('.edu')) {
      addToast({
        title: 'Educational email required',
        description: 'Please use a valid .edu email address.',
        type: 'error'
      })
      return
    }
    
    try {
      await sendMagicLink.mutateAsync({ 
        email, 
        schoolId,
        redirectUrl: `${window.location.origin}${ROUTES.AUTH.LOGIN}?redirect=${redirect}`
      })
      
      setEmailSent(true)
      setCountdown(60) // 60 second cooldown
      
      addToast({
        title: 'Check your email',
        description: `We've sent a sign-in link to ${email}`,
        type: 'success'
      })
    } catch (error) {
      // Error is already logged in the mutation's onError handler
      const errorMessage = error instanceof Error ? error.message : 'Failed to send magic link';
      addToast({
        title: 'Failed to send email',
        description: errorMessage,
        type: 'error'
      })
    }
  }
  
  const handleResendEmail = () => {
    setEmailSent(false)
    setEmail('')
  }
  
  // Show loading state while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-hive-background-primary flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-hive-brand-primary animate-spin mx-auto" />
          <p className="text-white/80">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-hive-background-primary flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-hive-primary/5 via-transparent to-hive-secondary/5" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-hive-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-hive-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <button
          onClick={() => router.push('/schools')}
          className="flex items-center gap-2 text-sm text-hive-text-secondary hover:text-hive-text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to school selection
        </button>
        
        <div className="bg-hive-surface-primary/80 backdrop-blur-xl rounded-2xl border border-hive-border-primary shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-hive-primary/20 to-hive-secondary/20 rounded-2xl mb-6 p-4">
              <Image
                src="/assets/hive-logo-white.svg"
                alt="HIVE Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
            <h1 className="text-3xl font-bold text-hive-text-primary mb-2">
              Welcome to HIVE
            </h1>
            <p className="text-hive-text-secondary">
              {schoolId ? `Sign in with your UB email` : `Enter your email to continue`}
            </p>
          </div>
          
          {!emailSent ? (
            <form onSubmit={handleSendMagicLink} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-hive-text-primary">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-hive-text-tertiary" />
                  <input
                    id="email"
                    type="email"
                    placeholder={schoolId ? "your.name@buffalo.edu" : "your@email.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-hive-background-secondary border border-hive-border-secondary rounded-xl text-hive-text-primary placeholder:text-hive-text-tertiary focus:outline-none focus:ring-2 focus:ring-hive-primary focus:border-transparent transition-all"
                    disabled={sendMagicLink.isPending}
                    autoFocus
                    required
                  />
                </div>
                {schoolId && (
                  <p className="text-xs text-hive-text-tertiary">
                    Must be a @buffalo.edu email address
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={sendMagicLink.isPending || !email}
                className="w-full py-3 px-4 bg-gradient-to-r from-hive-primary to-hive-secondary text-white font-medium rounded-xl hover:shadow-lg hover:shadow-hive-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {sendMagicLink.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    Send sign-in link
                  </>
                )}
              </button>
              
              {/* Help text for school emails */}
              <div className="bg-hive-background-secondary/50 rounded-xl p-4 space-y-2">
                <p className="text-sm text-hive-text-secondary text-center">
                  🎓 Use your school email address to join your campus community
                </p>
                {schoolId && (
                  <p className="text-xs text-hive-text-tertiary text-center">
                    Only @buffalo.edu emails can access UB's HIVE
                  </p>
                )}
              </div>
            </form>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="flex justify-center">
                <div className="h-20 w-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-xl text-hive-text-primary">Check your email!</h3>
                <p className="text-sm text-hive-text-secondary">
                  We've sent a sign-in link to:
                </p>
                <p className="font-medium text-hive-text-primary">{email}</p>
              </div>
              
              <div className="bg-hive-background-secondary rounded-xl p-4 text-sm space-y-2">
                <p className="font-medium text-hive-text-primary">Didn't receive the email?</p>
                <ul className="text-left space-y-1 text-hive-text-secondary">
                  <li>• Check your spam folder</li>
                  <li>• Make sure you entered the correct email</li>
                  <li>• Wait a few moments and try again</li>
                </ul>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleResendEmail}
                  disabled={countdown > 0}
                  className="w-full py-3 px-4 bg-hive-background-secondary border border-hive-border-secondary rounded-xl text-hive-text-primary font-medium hover:bg-hive-background-tertiary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {countdown > 0 ? (
                    `Resend in ${countdown}s`
                  ) : (
                    'Try different email'
                  )}
                </button>
                
                <button
                  onClick={() => router.push('/schools')}
                  className="text-sm text-hive-text-secondary hover:text-hive-text-primary transition-colors"
                >
                  Back to school selection
                </button>
              </div>
            </div>
          )}
        </div>
        
        <p className="text-center text-xs text-hive-text-tertiary mt-6">
          By signing in, you agree to our{' '}
          <a href="/terms" className="underline hover:text-hive-text-secondary transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="underline hover:text-hive-text-secondary transition-colors">
            Privacy Policy
          </a>
        </p>
      </div>
      
      {/* Loading overlay for magic link verification */}
      {verifyMagicLink.isPending && (
        <div className="fixed inset-0 bg-hive-background-primary/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-hive-surface-primary p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-hive-primary" />
            <p className="text-sm font-medium text-hive-text-primary">Signing you in...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-hive-primary" />
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  )
}