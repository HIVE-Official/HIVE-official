"use client";

import { useRouter } from 'next/navigation'
import { SplashScreen } from '@hive/ui'
import { useCallback } from 'react'

export default function HomePage() {
  const router = useRouter()

  const handleGetInside = useCallback(() => {
    router.push('/auth/email')
  }, [router])

  return <SplashScreen onGetInside={handleGetInside} />
}
