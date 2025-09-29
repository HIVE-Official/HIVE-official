import Link from 'next/link'

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-[var(--hive-brand-primary)]">404</h1>
        <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)]">Page Not Found</h2>
        <p className="text-[var(--hive-text-secondary)] max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-lg hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}