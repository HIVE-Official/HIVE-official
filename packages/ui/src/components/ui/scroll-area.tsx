import React from 'react'
import { cn } from '../../lib/utils'

export default {}
interface ScrollAreaProps {
  children: React.ReactNode
  className?: string
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className }) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="h-full w-full overflow-auto">
        {children}
      </div>
    </div>
  )
} 
