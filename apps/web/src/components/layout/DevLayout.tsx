'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AppHeader, BottomNavBar, HiveLogo, Button, Avatar, AvatarFallback } from '@hive/ui'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Home, Compass, User, Settings } from 'lucide-react'

// Mock user data for development
const mockUser = {
  fullName: "Jacob Developer",
  email: "dev@ub.edu",
  uid: "dev-user-123",
  isBuilder: true
};

function DesktopDevNav() {
	const pathname = usePathname()
	return (
		<>
			{/* Dev Mode Banner */}
			<div className="bg-[#FFD700]/10 border-b border-[#FFD700]/30 px-4 py-1 text-center">
				<span className="text-[#FFD700] text-xs font-mono">
					🚀 DEVELOPMENT MODE - Full App Shell Testing
				</span>
			</div>
			
			<AppHeader.Root className="border-b border-border bg-background/80 backdrop-blur-md">
				<AppHeader.Content className="max-w-7xl mx-auto px-4">
					<AppHeader.Logo>
						<Link href="/dev/feed" className="flex items-center space-x-3 group">
							<HiveLogo 
								variant="white" 
								size="md" 
								animationType="none"
								className="group-hover:scale-105 transition-transform duration-200"
							/>
							<span className="text-lg font-display font-bold text-foreground tracking-tight">
								HIVE
							</span>
						</Link>
					</AppHeader.Logo>
					<AppHeader.Nav className='ml-8'>
						<Link
							href='/dev/feed'
							className={`text-sm font-medium transition-colors hover:text-[#FFD700] ${
								pathname === '/dev/feed' ? 'text-foreground' : 'text-muted'
							}`}
						>
							Feed
						</Link>
						<Link
							href='/dev/campus'
							className={`text-sm font-medium transition-colors hover:text-[#FFD700] ${
								pathname === '/dev/campus' ? 'text-foreground' : 'text-muted'
							}`}
						>
							Campus
						</Link>
						<Link
							href='/dev/spaces'
							className={`text-sm font-medium transition-colors hover:text-[#FFD700] ${
								pathname === '/dev/spaces' ? 'text-foreground' : 'text-muted'
							}`}
						>
							Spaces
						</Link>
						<Link
							href='/dev/profile'
							className={`text-sm font-medium transition-colors hover:text-[#FFD700] ${
								pathname === '/dev/profile' ? 'text-foreground' : 'text-muted'
							}`}
						>
							Profile
						</Link>
					</AppHeader.Nav>
					<AppHeader.Actions>
						<Button 
							variant='outline'
							size="sm"
							className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors duration-[180ms]"
						>
							Create
						</Button>
						<Link href="/dev/profile">
							<Avatar className="border border-border hover:border-[#FFD700]/50 transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] w-8 h-8">
								<AvatarFallback className="bg-[#2A2A2A] text-foreground text-sm">
									{mockUser.fullName.charAt(0)}
								</AvatarFallback>
							</Avatar>
						</Link>
					</AppHeader.Actions>
				</AppHeader.Content>
			</AppHeader.Root>
		</>
	)
}

function MobileDevNav() {
	const pathname = usePathname()
	return (
		<>
			{/* Dev Mode Banner for Mobile */}
			<div className="bg-[#FFD700]/10 border-b border-[#FFD700]/30 px-4 py-1.5 text-center">
				<span className="text-[#FFD700] text-xs font-mono">
					🚀 DEV MODE
				</span>
			</div>
			
			<BottomNavBar.Root>
				<BottomNavBar.Content>
					<Link href='/dev/feed' className='text-decoration-none'>
						<BottomNavBar.Item isActive={pathname === '/dev/feed'}>
							{pathname === '/dev/feed' && <BottomNavBar.Indicator />}
							<BottomNavBar.Icon>
								<Home />
							</BottomNavBar.Icon>
							<BottomNavBar.Label>Feed</BottomNavBar.Label>
						</BottomNavBar.Item>
					</Link>
					<Link href='/dev/spaces' className='text-decoration-none'>
						<BottomNavBar.Item isActive={pathname === '/dev/spaces'}>
							{pathname === '/dev/spaces' && <BottomNavBar.Indicator />}
							<BottomNavBar.Icon>
								<Compass />
							</BottomNavBar.Icon>
							<BottomNavBar.Label>Spaces</BottomNavBar.Label>
						</BottomNavBar.Item>
					</Link>
					<Link href='/dev/profile' className='text-decoration-none'>
						<BottomNavBar.Item isActive={pathname === '/dev/profile'}>
							{pathname === '/dev/profile' && <BottomNavBar.Indicator />}
							<BottomNavBar.Icon>
								<User />
							</BottomNavBar.Icon>
							<BottomNavBar.Label>Profile</BottomNavBar.Label>
						</BottomNavBar.Item>
					</Link>
				</BottomNavBar.Content>
			</BottomNavBar.Root>
		</>
	)
}

export function DevLayout({ children }: { children: React.ReactNode }) {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	return (
		<div>
			{isDesktop ? <DesktopDevNav /> : <MobileDevNav />}
			<main>{children}</main>
		</div>
	)
}