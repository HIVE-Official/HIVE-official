'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

// Browse redirects to main spaces page with discovery mode
export default function SpacesBrowsePage() {
  useEffect(() => {
    redirect('/spaces');
  }, []);

  return null;
}