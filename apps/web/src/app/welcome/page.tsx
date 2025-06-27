'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button, Typography, Dialog } from '@hive/ui'
import { useEffect, useState } from 'react'

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isGlitching, setIsGlitching] = useState(false)
  const [showGlitchMessage, setShowGlitchMessage] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Launch date - July 9th, 2025
  const launchDate = new Date('2025-07-09T00:00:00Z')

  // Glitch messages
  const glitchMessages = [
    "wannabe ublinked?",
    "whats ub's new construction project?",
    "does this make parking easier?",
    "rip good fall fest artists"
  ]

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = () => {
      const difference = launchDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    // Initial calculation
    calculateTimeLeft()
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)
    
    // Glitch effect every 15 seconds
    const glitchTimer = setInterval(() => {
      setIsGlitching(true)
      setShowGlitchMessage(true)
      setCurrentMessage(prev => (prev + 1) % glitchMessages.length)
      
      setTimeout(() => {
        setIsGlitching(false)
        setShowGlitchMessage(false)
      }, 2000) // Show glitch message for 2 seconds
    }, 15000)

    return () => {
      clearInterval(timer)
      clearInterval(glitchTimer)
    }
  }, [glitchMessages.length])

  const handleWhatsComing = () => {
    setIsDialogOpen(true)
  }

  if (!mounted) {
    return null
  }

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Pure black background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Glitchy Countdown Timer */}
          <motion.div
            className="mb-12"
            animate={isGlitching ? {
              x: [0, -1, 1, 0],
              y: [0, 0.5, -0.5, 0],
              scale: [1, 1.01, 0.99, 1]
            } : {}}
            transition={{ duration: 0.2 }}
          >
            <Typography 
              variant="hero" 
              align="center" 
              className="text-accent font-mono tracking-widest mb-6"
            >
              LAUNCH IN
            </Typography>
            
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <Typography 
                  variant="hero" 
                  align="center" 
                  className="text-accent font-mono tracking-widest"
                >
                  {formatNumber(timeLeft.days)}
                </Typography>
                <Typography 
                  variant="caption" 
                  align="center" 
                  className="text-accent/60 font-mono uppercase tracking-wider mt-2"
                >
                  Days
                </Typography>
              </div>
              
              <div className="text-center">
                <Typography 
                  variant="hero" 
                  align="center" 
                  className="text-accent font-mono tracking-widest"
                >
                  {formatNumber(timeLeft.hours)}
                </Typography>
                <Typography 
                  variant="caption" 
                  align="center" 
                  className="text-accent/60 font-mono uppercase tracking-wider mt-2"
                >
                  Hours
                </Typography>
              </div>
              
              <div className="text-center">
                <Typography 
                  variant="hero" 
                  align="center" 
                  className="text-accent font-mono tracking-widest"
                >
                  {formatNumber(timeLeft.minutes)}
                </Typography>
                <Typography 
                  variant="caption" 
                  align="center" 
                  className="text-accent/60 font-mono uppercase tracking-wider mt-2"
                >
                  Minutes
                </Typography>
              </div>
              
              <div className="text-center">
                <Typography 
                  variant="hero" 
                  align="center" 
                  className="text-accent font-mono tracking-widest"
                >
                  {formatNumber(timeLeft.seconds)}
                </Typography>
                <Typography 
                  variant="caption" 
                  align="center" 
                  className="text-accent/60 font-mono uppercase tracking-wider mt-2"
                >
                  Seconds
                </Typography>
              </div>
            </div>
          </motion.div>
        
          {/* Subtle Glitch Messages Around Screen */}
          <AnimatePresence>
            {showGlitchMessage && (
              <>
                {/* Top Left */}
        <motion.div
                  className="absolute top-16 left-8 pointer-events-none"
                  initial={{ opacity: 0, x: -10 }}
          animate={{ 
                    opacity: [0, 0.3, 0.2, 0.3, 0],
                    x: [-10, 0, -2, 0, -10]
                  }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 2 }}
                >
                  <Typography 
                    variant="caption" 
                    className="text-accent/20 font-mono text-xs"
                  >
                    {glitchMessages[currentMessage]}
                  </Typography>
                </motion.div>

                {/* Top Right */}
                <motion.div
                  className="absolute top-20 right-8 pointer-events-none"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ 
                    opacity: [0, 0.2, 0.1, 0.2, 0],
                    x: [10, 0, 2, 0, 10]
          }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 2, delay: 0.2 }}
                >
                  <Typography 
                    variant="caption" 
                    className="text-accent/15 font-mono text-xs"
                  >
                    {glitchMessages[(currentMessage + 1) % glitchMessages.length]}
                  </Typography>
                </motion.div>

                {/* Bottom Left */}
        <motion.div
                  className="absolute bottom-32 left-8 pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
          animate={{ 
                    opacity: [0, 0.25, 0.15, 0.25, 0],
                    y: [10, 0, 1, 0, 10]
                  }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 2, delay: 0.4 }}
                >
                  <Typography 
                    variant="caption" 
                    className="text-accent/18 font-mono text-xs"
                  >
                    {glitchMessages[(currentMessage + 2) % glitchMessages.length]}
                  </Typography>
                </motion.div>

                {/* Bottom Right */}
        <motion.div
                  className="absolute bottom-28 right-8 pointer-events-none"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: [0, 0.2, 0.1, 0.2, 0],
                    y: [-10, 0, -1, 0, -10]
                  }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 2, delay: 0.6 }}
          >
                  <Typography 
                    variant="caption" 
                    className="text-accent/12 font-mono text-xs"
                  >
                    {glitchMessages[(currentMessage + 3) % glitchMessages.length]}
                  </Typography>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Subtle Glitch Effect Overlay */}
          <AnimatePresence>
            {isGlitching && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay" />
                <div className="absolute inset-0 bg-accent/3 mix-blend-multiply" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* vBETA Signup Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-16 space-y-8"
          >
            <Typography 
              variant="h3" 
              align="center" 
              className="text-accent font-mono uppercase tracking-wider"
            >
              Sign up for vBETA
            </Typography>
            
            <Typography 
              variant="body" 
              align="center" 
              className="text-accent/60 max-w-2xl mx-auto leading-relaxed font-sans"
            >
              Project will be fully released by July 9th, 2025, but we're rolling out features 
              in bits and pieces. Sign up now to get notified as new elements unlock.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/auth/email">
            <Button
                  variant="outline"
                  size="lg"
                  className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 px-10 py-4 font-sans"
                >
                  Get Started
            </Button>
          </Link>

              <Button 
                variant="outline" 
                size="lg"
                onClick={handleWhatsComing}
                className="border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 px-10 py-4 font-sans"
              >
                What's Coming
              </Button>
            </div>
          </motion.div>

          {/* Status Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="mt-16"
          >
            <Typography 
              variant="caption" 
              align="center" 
              className="text-accent/40 font-mono uppercase tracking-widest"
            >
              System Status: vBETA Development
            </Typography>
          </motion.div>
        </div>
      </div>

      {/* Subtle scan lines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-3">
        <div className="h-full bg-gradient-to-b from-transparent via-accent/5 to-transparent animate-pulse" />
      </div>

      {/* What's Coming Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="🚀 What's Coming to HIVE vBETA"
        description="We're rolling out features gradually. Here's what's on the roadmap:"
        size="lg"
      >
        <div className="space-y-6">
          <div className="flex items-start space-x-4 p-4 rounded-lg bg-surface-02/50 border border-border">
            <div className="text-2xl">👤</div>
            <div>
              <Typography variant="h4" className="font-sans mb-2">
                Profile Dashboard
              </Typography>
              <Typography variant="body" className="text-muted font-sans">
                Complete user profiles with customization options, achievements, and campus connections.
              </Typography>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 rounded-lg bg-surface-02/50 border border-border">
            <div className="text-2xl">🏠</div>
            <div>
              <Typography variant="h4" className="font-sans mb-2">
                Spaces
              </Typography>
              <Typography variant="body" className="text-muted font-sans">
                Create and join campus communities, clubs, study groups, and interest-based spaces.
              </Typography>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 rounded-lg bg-surface-02/50 border border-border">
            <div className="text-2xl">📱</div>
            <div>
              <Typography variant="h4" className="font-sans mb-2">
                Feed & Rituals Engine
              </Typography>
              <Typography variant="body" className="text-muted font-sans">
                Share moments, discover campus traditions, and engage with your community's daily life.
              </Typography>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Typography variant="body-sm" className="text-muted font-sans text-center">
              You'll be notified as each feature becomes available during the vBETA rollout.
            </Typography>
          </div>
        </div>
      </Dialog>
    </div>
  )
} 