'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

// Force this page to be dynamic to avoid prerendering issues
export const dynamic = 'force-dynamic'

// Dynamic import to avoid SSR issues
const FeedPageClient = dynamic(() => import('./feed-client'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-muted" />
        <p className="text-muted">Loading...</p>
      </div>
    </div>
  )
})

export default function FeedPage() {
  return <FeedPageClient />
} 