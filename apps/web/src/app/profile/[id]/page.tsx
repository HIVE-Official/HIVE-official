"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

/**
 * SPEC-COMPLIANT PUBLIC PROFILE VIEW WITH PRESENCE
 *
 * Per SPEC.md:
 * - NO HANDLE DISPLAY: Use ID in URLs, not handle
 * - CAMPUS ISOLATION: All profiles filtered by campusId
 * - PRIVACY WIDGETS: Respect widget-level privacy settings
 * - TWO-LAYER SOCIAL: Show connections and friends appropriately
 * - PRESENCE SYSTEM: Real-time online/offline status with ghost mode
 */

import { ProfileContextProvider } from '@/components/profile/ProfileContextProvider';
import ProfilePageContent from './ProfilePageContent';

export default function PublicProfilePage() {
  return (
    <ProfileContextProvider>
      <ProfilePageContent />
    </ProfileContextProvider>
  );
}