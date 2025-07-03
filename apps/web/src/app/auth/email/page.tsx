'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EmailForm, HiveLogo } from '@hive/ui'
import { auth, isDomainAllowed } from '@hive/core'
import { sendSignInLinkToEmail } from 'firebase/auth'

export default function EmailGatePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const handleSubmit = async ({ email }: { email: string }) => {
    setIsLoading(true)
    setApiError(null)

    if (!isDomainAllowed(email)) {
      setApiError('HIVE is not yet available for this school. Check back soon!')
      setIsLoading(false)
      return
    }

    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/verify`,
        handleCodeInApp: true,
      }
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('emailForSignIn', email)
      }
      router.push(`/auth/email-sent?email=${encodeURIComponent(email)}`)
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        setApiError('Please enter a valid email address.')
      } else {
        setApiError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex justify-center">
          <HiveLogo className="h-16 w-16" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Enter your school email</h1>
          <p className="text-gray-400 mt-2">to join or sign in</p>
        </div>
        <EmailForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          apiError={apiError}
        />
      </div>
    </div>
  )
} 