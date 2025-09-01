import { AppLayout } from '../../components/app-layout';
import { AuthGuard } from '../../components/auth-guard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard layout wrapper that provides the HIVE shell for all authenticated pages.
 * 
 * This layout:
 * - Wraps authenticated pages with the product shell
 * - Provides navigation, user menu, command palette, and notifications
 * - Handles authentication guard for protected routes
 * - Ensures consistent UX across all dashboard pages
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard requireAuth={true}>
      <AppLayout>
        {children}
      </AppLayout>
    </AuthGuard>
  );
}