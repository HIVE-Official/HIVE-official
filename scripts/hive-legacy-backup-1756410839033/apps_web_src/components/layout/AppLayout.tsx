'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AppHeader, BottomNavBar, HiveLogo, ButtonEnhanced, Avatar, AvatarFallback } from '@hive/ui'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useUnifiedAuth } from '@hive/ui'
import { Home, Compass, User } from 'lucide-react'

function DesktopNav() {
	const pathname = usePathname()
	const { user } = useUnifiedAuth()
	return (
		<AppHeader.Root className="border-b border-border bg-background/80 backdrop-blur-md">
			<AppHeader.Content className="max-w-7xl mx-auto px-4">
				<AppHeader.Logo>
					<Link href="/feed" className="flex items-center space-x-3 group">
						<HiveLogo 
							variant="white" 
							size="lg" 
							animationType="none"
							className="group-hover:scale-105 transition-transform duration-200"
						/>
						<span className="text-xl font-display font-bold text-foreground tracking-tight">
							HIVE
						</span>
					</Link>
				</AppHeader.Logo>
				<AppHeader.Nav className='ml-8'>
					<Link
						href='/feed'
						className={`text-sm font-medium transition-colors hover:text-[var(--hive-brand-secondary)] ${
							pathname === '/feed' ? 'text-foreground' : 'text-muted'
						}`}
					>
						Feed
					</Link>
					<Link
						href='/campus'
						className={`text-sm font-medium transition-colors hover:text-[var(--hive-brand-secondary)] ${
							pathname === '/campus' ? 'text-foreground' : 'text-muted'
						}`}
					>
						Campus
					</Link>
					<Link
						href='/spaces'
						className={`text-sm font-medium transition-colors hover:text-[var(--hive-brand-secondary)] ${
							pathname === '/spaces' ? 'text-foreground' : 'text-muted'
						}`}
					>
						Spaces
					</Link>
					<Link
						href='/profile'
						className={`text-sm font-medium transition-colors hover:text-[var(--hive-brand-secondary)] ${
							pathname === '/profile' ? 'text-foreground' : 'text-muted'
						}`}
					>
						Profile
					</Link>
				</AppHeader.Nav>
				<AppHeader.Actions>
					<ButtonEnhanced 
						variant='outline'
						size="sm"
						className="border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-[180ms]"
					>
						Create
					</ButtonEnhanced>
					<Link href="/profile">
						<Avatar className="border border-border hover:border-[var(--hive-brand-secondary)]/50 transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] w-8 h-8">
							<AvatarFallback className="bg-[#2A2A2A] text-foreground text-sm">
								{user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
							</AvatarFallback>
						</Avatar>
					</Link>
				</AppHeader.Actions>
			</AppHeader.Content>
		</AppHeader.Root>
	)
}

function MobileNav() {
	const pathname = usePathname()
	return (
		<BottomNavBar.Root>
			<BottomNavBar.Content>
				<Link href='/feed' className='text-decoration-none'>
					<BottomNavBar.Item isActive={pathname === '/feed'}>
						{pathname === '/feed' && <BottomNavBar.Indicator />}
						<BottomNavBar.Icon>
							<Home />
						</BottomNavBar.Icon>
						<BottomNavBar.Label>Feed</BottomNavBar.Label>
					</BottomNavBar.Item>
				</Link>
				<Link href='/spaces' className='text-decoration-none'>
					<BottomNavBar.Item isActive={pathname === '/spaces'}>
						{pathname === '/spaces' && <BottomNavBar.Indicator />}
						<BottomNavBar.Icon>
							<Compass />
						</BottomNavBar.Icon>
						<BottomNavBar.Label>Spaces</BottomNavBar.Label>
					</BottomNavBar.Item>
				</Link>
				<Link href='/profile' className='text-decoration-none'>
					<BottomNavBar.Item isActive={pathname === '/profile'}>
						{pathname === '/profile' && <BottomNavBar.Indicator />}
						<BottomNavBar.Icon>
							<User />
						</BottomNavBar.Icon>
						<BottomNavBar.Label>Profile</BottomNavBar.Label>
					</BottomNavBar.Item>
				</Link>
			</BottomNavBar.Content>
		</BottomNavBar.Root>
	)
}

export function AppLayout({ children }: { children: React.ReactNode }) {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	return (
		<div>
			{isDesktop ? <DesktopNav /> : <MobileNav />}
			<main>{children}</main>
		</div>
	)
}
 