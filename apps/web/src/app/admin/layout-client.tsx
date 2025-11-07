'use client';

import type { ReactNode } from 'react';
import { AdminGuard } from '@/components/admin/admin-guard';

export function AdminLayoutClient({ children }: { children: ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>;
}
