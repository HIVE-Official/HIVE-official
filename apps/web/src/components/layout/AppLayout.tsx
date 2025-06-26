'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AppHeader } from '@hive/ui'
import { BottomNavBar } from '@hive/ui'
import { HiveLogo } from '@hive/ui'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Home, Compass, User } from 'lucide-react'
import { Button } from '@hive/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@hive/ui'

function DesktopNav() {
	const pathname = usePathname()
	return (
		<AppHeader.Root>
			<AppHeader.Content>
				<AppHeader.Logo>
					<HiveLogo />
				</AppHeader.Logo>
				<AppHeader.Nav className='ml-10'>
					<Link
						href='/feed'
						className={`text-sm font-medium transition-colors hover:text-white ${
							pathname === '/feed' ? 'text-white' : 'text-neutral-400'
						}`}
					>
						Feed
					</Link>
					<Link
						href='/campus'
						className={`text-sm font-medium transition-colors hover:text-white ${
							pathname === '/campus' ? 'text-white' : 'text-neutral-400'
						}`}
					>
						Campus
					</Link>
					<Link
						href='/spaces'
						className={`text-sm font-medium transition-colors hover:text-white ${
							pathname === '/spaces' ? 'text-white' : 'text-neutral-400'
						}`}
					>
						Spaces
					</Link>
				</AppHeader.Nav>
				<AppHeader.Actions>
					<Button variant='default'>Create</Button>
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
						<AvatarFallback>CN</AvatarFallback>
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
 