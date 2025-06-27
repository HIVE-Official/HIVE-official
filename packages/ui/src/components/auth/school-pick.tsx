"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronRight, Lock } from 'lucide-react'
import { Input } from '../input'
import { Button } from '../button'
import { cn } from '../../lib/utils'
import { Dialog } from '../dialog'
import { Label } from '../label'

// Define School type here since we can't import from @hive/core in the UI package
export interface School {
  id: string
  name: string
  domain: string
  status: 'open' | 'coming-soon'
}

const defaultSchools: School[] = [
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open'
  },
  {
    id: 'stony-brook',
    name: 'Stony Brook University',
    domain: 'stonybrook.edu',
    status: 'coming-soon'
  },
  {
    id: 'st-bonaventure',
    name: 'St. Bonaventure University',
    domain: 'sbu.edu',
    status: 'coming-soon'
  },
  {
    id: 'binghamton',
    name: 'Binghamton University',
    domain: 'binghamton.edu',
    status: 'coming-soon'
  },
  {
    id: 'buffalo-state',
    name: 'Buffalo State University',
    domain: 'buffalostate.edu',
    status: 'coming-soon'
  }
]

interface SchoolPickProps {
  schools?: School[]
  onSchoolSelect: (school: School) => void
  onCreateSchool?: () => void
  className?: string
}

export const SchoolPick: React.FC<SchoolPickProps> = ({
  schools = defaultSchools,
  onSchoolSelect,
  onCreateSchool: _onCreateSchool,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [waitlistSchool, setWaitlistSchool] = useState<School | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSchoolClick = (school: School) => {
    if (school.status === 'open') {
      onSchoolSelect(school)
    } else {
      setWaitlistSchool(school)
      setShowWaitlistDialog(true)
    }
  }

  const handleJoinWaitlist = async (_email: string) => {
    if (!waitlistSchool) return

    setIsSubmitting(true)
    try {
      // Here you would integrate with your waitlist API
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Close waitlist dialog and show success
      setShowWaitlistDialog(false)
      setShowSuccessDialog(true)
    } catch (error) {
      // Handle error
      console.error('Failed to join waitlist:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccessDialog(false)
    setWaitlistSchool(null)
  }

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  }

  return (
    <div className={cn("min-h-screen flex items-center justify-center p-6", className)}>
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
      <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-3"
      >
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-foreground tracking-tight">
            Choose Your Campus
          </h1>
          <p className="text-lg font-sans text-muted">
            Join your university's exclusive HIVE community
          </p>
        </motion.div>

          {/* Search Field */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
          <Input
            type="text"
            placeholder="Search your school..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          </motion.div>

        {/* School List */}
        <div className="space-y-3">
          {filteredSchools.map((school) => (
                <motion.button
              key={school.id}
                  onClick={() => handleSchoolClick(school)}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeInUp}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={cn(
                    "w-full p-4 rounded-lg border text-left group",
                "border-border bg-surface-01 hover:bg-[#FFD700]/5",
                "transition-all duration-200 ease-smooth"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-h4 font-display font-medium group-hover:text-[#FFD700]">
                      {school.name}
                    </h3>
                  </div>
                  <p className="text-sm font-medium">
                    {school.status === 'open' ? (
                      <span className="text-success">Open now</span>
                    ) : (
                      <span className="text-muted flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Coming Soon • 3**
                        </span>
                    )}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted group-hover:text-[#FFD700] transition-colors duration-200" />
              </div>
                </motion.button>
          ))}
        </div>
      </div>

      {/* Waitlist Dialog */}
      <Dialog
        isOpen={showWaitlistDialog}
        onClose={() => setShowWaitlistDialog(false)}
        title="Join the Waitlist"
        description={`${waitlistSchool?.name} is coming soon! Join the waitlist to be notified when we launch.`}
      >
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const email = formData.get('email') as string
          handleJoinWaitlist(email)
        }}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">School Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={waitlistSchool ? `you@${waitlistSchool.domain}` : ''}
                required
                pattern={waitlistSchool ? `.*@${waitlistSchool.domain}$` : undefined}
                title="Please use your school email address"
              />
            </div>
            
            <Button
              variant="surface"
              type="submit"
              className="w-full font-display font-semibold tracking-tight"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        isOpen={showSuccessDialog}
        onClose={handleCloseSuccess}
        title="You're on the List!"
        description={`We'll notify you as soon as ${waitlistSchool?.name} launches on HIVE. Get ready to join your campus community!`}
      >
        <div className="mt-6">
          <Button
            variant="surface"
            onClick={handleCloseSuccess}
            className="w-full font-display font-semibold tracking-tight"
          >
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  )
} 