import Link from 'next/link';
import { AuthLayout } from '../../../components/auth/auth-layout';
import { AuthStatus } from '../../../components/auth/auth-status';

export default function ExpiredPage() {
  return (
    <AuthLayout title="Link Expired">
      <AuthStatus
        type="error"
        title="Link Expired"
        message="This magic link has expired or has already been used. Magic links expire after 15 minutes for security reasons."
        action={
          <Link href="/schools" className="block w-full">
            <button className="w-full hive-button-primary px-6 py-3">
              Get a new link
            </button>
          </Link>
        }
      />
    </AuthLayout>
  );
} 