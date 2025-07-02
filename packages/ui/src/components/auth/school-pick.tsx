"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronRight, Lock } from 'lucide-react'
import { Input } from '../input'
import { Button } from '../button'
import { cn } from '../../lib/utils'
import { Dialog } from '../dialog'
import { Label } from '../label'
import type { School } from '@hive/core'

interface SchoolPickProps {
  schools: School[];
  onSchoolSelect: (school: School) => void;
  className?: string;
}

export const SchoolPick: React.FC<SchoolPickProps> = ({
  schools,
  onSchoolSelect,
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showWaitlistDialog, setShowWaitlistDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [waitlistSchool, setWaitlistSchool] = useState<School | null>(null)

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
    if (waitlistSchool) {
      // For now, just close the dialog and show success
      setShowWaitlistDialog(false)
      setShowSuccessDialog(true)
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccessDialog(false)
    setWaitlistSchool(null)
  }

  return (
    <div className={cn("w-full max-w-2xl mx-auto space-y-6", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search your school..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-surface-01/50 border-border focus:border-[#FFD700]/20 focus:ring-1 focus:ring-[#FFD700]/20"
        />
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {filteredSchools.map((school, index) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <button
                onClick={() => handleSchoolClick(school)}
                className={cn(
                  'w-full p-4 text-left rounded-lg border border-border bg-surface-01/50',
                  'hover:bg-surface-01/80 hover:border-[#FFD700]/20 transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-[#FFD700]/20'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{school.name}</h3>
                    <p className="text-sm text-muted-foreground">{school.domain}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {school.status === 'open' ? (
                      <ChevronRight className="h-5 w-5 text-[#FFD700]" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {school.studentsUntilOpen} students until open
                        </span>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Waitlist Dialog */}
      <Dialog
        isOpen={showWaitlistDialog}
        onClose={() => setShowWaitlistDialog(false)}
        title={`Join ${waitlistSchool?.name} Waitlist`}
        description="Get notified when HIVE launches at your school."
      >
        <div className="mt-4 space-y-4">
          <div>
            <Label>School</Label>
            <p className="text-sm text-muted-foreground">{waitlistSchool?.domain}</p>
          </div>
          <Button onClick={handleJoinWaitlist} className="w-full">
            Join Waitlist
          </Button>
        </div>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        isOpen={showSuccessDialog}
        onClose={handleCloseSuccess}
        title="You're on the list!"
        description="We'll notify you when HIVE launches at your school."
      >
        <Button onClick={handleCloseSuccess} className="mt-4 w-full">
          Close
        </Button>
      </Dialog>
    </div>
  )
} 