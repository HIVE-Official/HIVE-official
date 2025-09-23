'use client';

import Link from 'next/link';
import { AuthLayout } from '../../../components/auth/auth-layout';
import { AuthStatus } from '../../../components/auth/auth-status';
import { HiveButton } from '@hive/ui';

export default function ExpiredPage() {
  return (
    <AuthLayout title="Link Expired">
      <AuthStatus
        type="error"
        title="Link Expired"
        message="This magic link has expired or has already been used. Magic links expire after 15 minutes for security reasons."
        action={
          <Link href="/schools" className="block w-full">
            <HiveButton variant="default" size="lg" className="w-full">
              Get a new link
            </HiveButton>
          </Link>
        }
      />
    </AuthLayout>
  );
} 