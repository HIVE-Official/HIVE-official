'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Compass, FlaskConical, User, Settings } from 'lucide-react';

const navItems = [
    { href: '/feed', label: 'Feed', icon: Home },
    { href: '/spaces', label: 'Spaces', icon: Compass },
    { href: '/hivelab', label: 'HiveLAB', icon: FlaskConical },
];

export function DesktopSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex flex-col h-screen p-4 border-r border-border bg-card">
            {/* Logo */}
            <div className="mb-10 px-4">
                <Link href="/feed">
                    <Image src="/assets/images/hivelogo.png" alt="HIVE Logo" width={100} height={28} />
                </Link>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            pathname.startsWith(item.href)
                                ? 'bg-accent-gold text-background'
                                : 'text-muted hover:bg-muted/50 hover:text-primary'
                        }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* User Profile / Settings */}
            <div className="mt-auto space-y-2">
                 <Link
                    href="/profile"
                    className={`flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === '/profile'
                            ? 'bg-muted/50 text-primary'
                            : 'text-muted hover:bg-muted/50 hover:text-primary'
                    }`}
                >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                </Link>
                 <Link
                    href="/settings"
                    className={`flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === '/settings'
                            ? 'bg-muted/50 text-primary'
                            : 'text-muted hover:bg-muted/50 hover:text-primary'
                    }`}
                >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </Link>
            </div>
        </aside>
    );
} 