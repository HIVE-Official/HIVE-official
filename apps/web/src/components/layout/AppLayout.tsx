'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AppHeader, BottomNavBar, HiveLogo, Button, Avatar, AvatarFallback, AvatarImage } from '@hive/ui'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Home, Compass, User } from 'lucide-react'

function DesktopNav() {
	const pathname = usePathname()
	return (
		<AppHeader.Root className="border-b border-border bg-background/80 backdrop-blur-md">
			<AppHeader.Content className="max-w-7xl mx-auto">
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
				<AppHeader.Nav className='ml-10'>
					<Link
						href='/feed'
						className={`text-sm font-medium transition-colors hover:text-accent ${
							pathname === '/feed' ? 'text-foreground' : 'text-muted'
						}`}
					>
						Feed
					</Link>
					<Link
						href='/campus'
						className={`text-sm font-medium transition-colors hover:text-accent ${
							pathname === '/campus' ? 'text-foreground' : 'text-muted'
						}`}
					>
						Campus
					</Link>
					<Link
						href='/spaces'
						className={`text-sm font-medium transition-colors hover:text-accent ${
							pathname === '/spaces' ? 'text-foreground' : 'text-muted'
						}`}
					>
						Spaces
					</Link>
				</AppHeader.Nav>
				<AppHeader.Actions>
					<Button 
						variant='outline'
						className="border-accent text-accent hover:bg-accent hover:text-background"
					>
						Create
					</Button>
					<Avatar className="border border-border">
						<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
						<AvatarFallback className="bg-surface-02 text-foreground">CN</AvatarFallback>
					</Avatar>
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
 