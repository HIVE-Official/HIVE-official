'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/lib/routes'
import { EmailForm, HiveLogo } from '@hive/ui'
import { logger } from '@hive/core'

export default function EmailGatePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [schoolName, setSchoolName] = useState<string>("")
  const [schoolDomain, setSchoolDomain] = useState<string>("")

  // Get school from localStorage (set by school selection page)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedSchoolName = localStorage.getItem("hive-selected-school-name");
      const selectedSchoolDomain = localStorage.getItem("hive-selected-school-domain");
      
      if (selectedSchoolName && selectedSchoolDomain) {
        setSchoolName(selectedSchoolName);
        setSchoolDomain(selectedSchoolDomain);
      } else {
        // No school selected, redirect to school selection
        router.push(ROUTES.AUTH.SCHOOL_SELECT);
      }
    }
  }, [router]);

  const handleSubmit = async ({ email }: { email: string }) => {
    setIsLoading(true)
    setApiError(null)

    // Validate email domain matches selected school
    const emailDomain = email.split('@')[1]?.toLowerCase()
    if (emailDomain !== schoolDomain.toLowerCase()) {
      setApiError(`Please use your ${schoolName} email address`)
      setIsLoading(false)
      return
    }

    try {
      const selectedSchoolId = localStorage.getItem("hive-selected-school-id");
      const response = await fetch('/api/auth/email/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          schoolId: selectedSchoolId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send magic link');
      }

      logger.info("Magic link sent successfully", { email, schoolDomain });
      router.push(`${ROUTES.AUTH.CHECK_EMAIL}?email=${encodeURIComponent(email)}`);
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'auth/invalid-email') {
        setApiError('Please enter a valid email address.')
      } else {
        setApiError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex justify-center">
          <HiveLogo variant="white" size="2xl" animationType="gentle-float" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-display font-semibold">Enter your {schoolName || 'school'} email</h1>
          <p className="text-muted mt-2 font-sans">to join or sign in</p>
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