"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Dashboard redirects to FEED (primary landing) per feed-first strategy
// Feed becomes the primary landing spot with ritual stories and temporal content
export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to feed as the primary landing page
    router.replace('/feed');
  }, [router]);

  return null; // No UI needed since we're redirecting immediately
}