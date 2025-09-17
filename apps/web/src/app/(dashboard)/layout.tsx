import { HiveUnifiedShell } from '../../components/shell/hive-unified-shell';
import { AuthGuard } from '../../components/auth-guard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard layout wrapper that provides the HIVE shell for all authenticated pages.
 * 
 * This layout:
 * - Wraps authenticated pages with the unified navigation shell
 * - Supports both sidebar and header navigation modes
 * - Provides mobile-optimized bottom navigation
 * - Handles authentication guard for protected routes
 * - Ensures consistent UX across all dashboard pages
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard requireAuth={true}>
      <HiveUnifiedShell>
        {children}
      </HiveUnifiedShell>
    </AuthGuard>
  );
}