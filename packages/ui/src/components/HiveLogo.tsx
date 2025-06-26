import React from 'react'
import { cn } from '../lib/utils'

export function HiveLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-6 w-6', className)}
      {...props}
    >
      <path d="M12 2 19 6.5v11L12 22 5 17.5v-11L12 2z" />
      <path d="M9 8v8" />
      <path d="M15 8v8" />
    </svg>
  )
}
