import { SVGProps } from 'react'

export function HiveLogoIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 256 256'
			fill='currentColor'
			{...props}
		>
			<path d='M208,80v96a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V80a16,16,0,0,1,16-16H192A16,16,0,0,1,208,80Z' />
		</svg>
	)
} 