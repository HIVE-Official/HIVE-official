'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, FlaskConical, User, PlusCircle } from 'lucide-react';

const navItems = [
    { href: '/feed', label: 'Feed', icon: Home },
    { href: '/spaces', label: 'Spaces', icon: Compass },
    { href: '/create', label: 'Create', icon: PlusCircle }, // Special middle button
    { href: '/hivelab', label: 'HiveLAB', icon: FlaskConical },
    { href: '/profile', label: 'Profile', icon: User },
];

export function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex justify-around items-center z-50">
            {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                
                if (item.label === 'Create') {
                    return (
                        <Link key={item.label} href={item.href} className="-mt-6">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-gold text-background shadow-lg shadow-accent-gold/30">
                                <item.icon className="h-8 w-8" />
                            </div>
                        </Link>
                    );
                }
                
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                            isActive ? 'text-accent-gold' : 'text-muted hover:text-primary'
                        }`}
                    >
                        <item.icon className="h-6 w-6" />
                        <span className="text-xs">{item.label}</span>
                    </Link>
                )
            })}
        </nav>
    );
} 