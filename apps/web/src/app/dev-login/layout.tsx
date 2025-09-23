import { notFound } from 'next/navigation';

export default function DevLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Block dev routes in production
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return children;
}