"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Users, Image, BarChart3, Settings } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const adminNavItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: BarChart3
  },
  {
    href: '/admin/moderation', 
    label: 'Photo Moderation',
    icon: Image
  },
  {
    href: '/admin/users',
    label: 'User Management',
    icon: Users
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: Settings
  }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-surface">
        <div className="px-6 py-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            <span className="font-display font-semibold text-foreground">
              HIVE Admin
            </span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-surface border-r border-border min-h-[calc(100vh-4rem)]">
          <div className="p-4">
            <ul className="space-y-2">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-body transition-colors ${
                        isActive
                          ? 'bg-accent/10 text-accent border border-accent/20'
                          : 'text-muted hover:text-foreground hover:bg-surface-01'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}