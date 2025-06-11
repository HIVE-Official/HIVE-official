import { AuthProvider } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';

export default function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
        <AppLayout>
        {children}
        </AppLayout>
    </AuthProvider>
  )
} 