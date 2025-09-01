"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronRight, Lock } from 'lucide-react'
import { Input } from '../input'
import { Button } from '../button'
import { cn } from '../lib/utils'
import { Dialog } from '../dialog'
import { Label } from '../label'
import { hiveVariants } from '../../lib/motion'
import { useAdaptiveMotion } from '../../lib/adaptive-motion'
import type { School } from '@hive/core'

interface SchoolPickProps {
  schools: School[];
  onSchoolSelect: (school: School) => void;
  className?: string;
  userEmail?: string;
  isLoading?: boolean;
}

// Skeleton Loading Component
const SchoolCardSkeleton = ({ index }: { index: number }) => (
  <motion.div
    variants={hiveVariants.slideUp}
    initial="hidden"
    animate="visible"
    transition={{ delay: index * 0.05 }}
    className="w-full p-6 rounded-xl border border-border bg-surface/50 animate-pulse"
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-6 bg-muted/20 rounded w-48 mb-2"></div>
        <div className="h-4 bg-muted/20 rounded w-32"></div>
      </div>
      <div className="h-5 w-5 bg-muted/20 rounded"></div>
    </div>
  </motion.div>
);

export const SchoolPick: React.FC<SchoolPickProps> = ({
  schools,
  onSchoolSelect,
  className,
  userEmail,
  isLoading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [waitlistSchool, setWaitlistSchool] = useState<School | null>(null)
  const [isJoiningWaitlist, setIsJoiningWaitlist] = useState(false)
  const [waitlistError, setWaitlistError] = useState<string | null>(null)
  const [waitlistEmail, setWaitlistEmail] = useState('')
  
  const { variants: _variants } = useAdaptiveMotion('social')

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSchoolClick = (school: School) => {
    if (school.status === 'open') {
      onSchoolSelect(school)
    } else {
      setWaitlistSchool(school)
      setShowWaitlistDialog(true)
    }
  }

  const handleJoinWaitlist = async () => {
    const email = userEmail || waitlistEmail
    if (!waitlistSchool || !email) {
      setWaitlistError('Email is required to join the waitlist')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setWaitlistError('Please enter a valid email address')
      return
    }

    setIsJoiningWaitlist(true)
    setWaitlistError(null)

    try {
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          schoolId: waitlistSchool.id,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to join waitlist')
      }

      setShowWaitlistDialog(false)
      setShowSuccessDialog(true)
    } catch (error) {
      setWaitlistError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsJoiningWaitlist(false)
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccessDialog(false)
    setWaitlistSchool(null)
    setWaitlistEmail('')
    setWaitlistError(null)
  }

  const handleCloseWaitlist = () => {
    setShowWaitlistDialog(false)
    setWaitlistEmail('')
    setWaitlistError(null)
  }

  return (
    <motion.div 
      className={cn("w-full space-y-8", className)}
      variants={hiveVariants.container}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="relative" variants={hiveVariants.item}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <InputEnhanced
          type="text"
          placeholder="Search your school..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="accent"
          className="pl-10"
        />
      </motion.div>

      <motion.div className="space-y-4" variants={hiveVariants.item}>
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            // Show skeleton loading while schools are loading
            Array.from({ length: 6 }, (_, index) => ({ id: `skeleton-${index}`, index })).map((skeleton) => (
              <SchoolCardSkeleton key={skeleton.id} index={skeleton.index} />
            ))
          ) : (
            filteredSchools.map((school, index) => (
            <motion.div
              key={school.id}
              variants={hiveVariants.slideUp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: index * 0.05 }}
              layout
            >
              <motion.button
                onClick={() => handleSchoolClick(school)}
                className={cn(
                  'w-full p-6 text-left rounded-xl border border-border bg-surface/50',
                  'transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
                  school.status === 'waitlist' && 'border-border/60'
                )}
                whileHover={{
                  scale: 1.01,
                  y: -2,
                  borderColor: school.status === 'open' ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 215, 0, 0.1)',
                  transition: { duration: 0.18, ease: [0.33, 0.65, 0, 1] }
                }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{school.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5">{school.domain}</p>
                  </div>
                  <div className="flex items-center gap-5 ml-6">
                    {school.status === 'open' ? (
                      <motion.div
                        className="text-accent"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="text-right min-w-0">
                          <div className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                            <span>{school.studentsUntilOpen.toString().charAt(0)}</span><span className="blur-[4px] select-none" style={{ filter: 'blur(4px)', textShadow: '0 0 4px currentColor' }}>{school.studentsUntilOpen.toString().slice(1)}</span> people till opening
                          </div>
                        </div>
                        <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Waitlist Dialog */}
      <Dialog
        isOpen={showWaitlistDialog}
        onClose={handleCloseWaitlist}
        title={`Join ${waitlistSchool?.name} Waitlist`}
        description="Get notified when HIVE launches at your school."
      >
        <div className="mt-6 space-y-6">
          <div>
            <Label className="text-base">School</Label>
            <p className="text-sm text-muted-foreground mt-2">{waitlistSchool?.domain}</p>
          </div>
          {!userEmail && (
            <div>
              <Label htmlFor="waitlist-email" className="text-base">Email</Label>
              <InputEnhanced
                id="waitlist-email"
                type="email"
                placeholder="Enter your email address"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                variant="accent"
                className="mt-3"
                required
              />
            </div>
          )}
          {waitlistError && (
            <div className="p-4 rounded-xl bg-surface border border-border">
              <p className="text-sm text-muted-foreground">{waitlistError}</p>
            </div>
          )}
          <ButtonEnhanced 
            onClick={handleJoinWaitlist} 
            variant="primary"
            size="lg"
            fullWidth
            disabled={isJoiningWaitlist || (!userEmail && !waitlistEmail)}
          >
            {isJoiningWaitlist ? 'Joining...' : 'Join Waitlist'}
          </ButtonEnhanced>
        </div>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        isOpen={showSuccessDialog}
        onClose={handleCloseSuccess}
        title="You're on the list!"
        description="We'll notify you when HIVE launches at your school."
      >
        <ButtonEnhanced 
          onClick={handleCloseSuccess} 
          className="mt-6" 
          variant="accent"
          size="lg"
          fullWidth
        >
          Close
        </ButtonEnhanced>
      </Dialog>
    </motion.div>
  )
} 