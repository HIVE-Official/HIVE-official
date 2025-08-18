import React from 'react'
import { Button } from '../button'
import { cn } from '../lib/utils'
import { HiveLogo } from '../HiveLogo'
import { Countdown } from '../countdown'

interface SplashScreenProps {
  onGetInside: () => void
  className?: string
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onGetInside, 
  className 
}) => {
  // Launch date set to July 31st, 2025 at 8 AM
  const launchDate = new Date('2025-07-31T08:00:00').toISOString();

  return (
    <div className={cn(
      "min-h-screen bg-background text-foreground relative overflow-hidden flex items-center justify-center",
      className
    )}>
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBjeD0iMjU2IiBjeT0iMjU2IiByPSIyIi8+PC9zdmc+')] bg-repeat"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full p-4">
        <div className="flex-grow flex flex-col items-center justify-center space-y-10">
          {/* Logo/Brand Mark Area */}
          <div className="space-y-4 flex flex-col items-center">
            <HiveLogo variant="white" size="lg" />
            <p className="text-h3 font-display font-medium text-foreground">
              Your Campus OS
            </p>
          </div>
          
          {/* Countdown Timer */}
          <Countdown targetDate={launchDate} />

          {/* CTA Button - Using new gold border aesthetic */}
          <Button 
            variant="accent" 
            size="xl" 
            onClick={onGetInside}
            className="group relative"
          >
            Get Inside
          </Button>
        </div>
        
        {/* Footer Text */}
        <div className="pb-8">
          <p className="text-caption font-sans text-muted">
            Built by Students · Owned by Students.
          </p>
        </div>
      </div>
      
      {/* Subtle crest watermark in bottom-right */}
      <div className="absolute bottom-8 right-8 opacity-[0.08]">
        <div className="w-16 h-16 border border-accent rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border border-accent rounded-full"></div>
        </div>
      </div>
    </div>
  )
} 