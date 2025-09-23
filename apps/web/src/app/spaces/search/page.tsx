'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

// Search redirects to main spaces page with search focus
export default function SpacesSearchPage() {
  useEffect(() => {
    // Could pass a query param to auto-focus search
    redirect('/spaces?focus=search');
  }, []);

  return null;
}