import type { ReactNode } from 'react';
import { AdminLayoutClient } from './layout-client';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
