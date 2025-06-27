'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SchoolPick, type School, EmailGate, MagicLinkSent } from '.'
import { SchoolCreationDialog } from './school-creation-dialog'
import { useToast } from '../toast-provider'

export type AuthStep = 'school-pick' | 'email-gate' | 'magic-link-sent'

export interface AuthFlowProps {
  schools: School[]
  onEmailSubmit: (email: string) => Promise<void>
  onSchoolCreate: (data: { name: string; domain: string }) => Promise<void>
  initialStep?: AuthStep
}

export const AuthFlow: React.FC<AuthFlowProps> = ({
  schools,
  onEmailSubmit,
  onSchoolCreate,
  initialStep = 'school-pick'
}) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>(initialStep)
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null)
  const [selectedEmail, setSelectedEmail] = useState<string>('')
  const [isSchoolDialogOpen, setIsSchoolDialogOpen] = useState(false)
  const { showToast } = useToast()

  const handleSchoolSelect = (school: School) => {
    setSelectedSchoolId(school.id)
    setCurrentStep('email-gate')
  }

  const handleEmailSubmit = async (email: string) => {
    try {
      await onEmailSubmit(email)
      setSelectedEmail(email)
      setCurrentStep('magic-link-sent')
      return true
    } catch {
      showToast('Failed to send magic link. Please try again.', {
        intent: 'error'
      })
      return false
    }
  }

  const handleSchoolCreate = async (data: { name: string; domain: string }) => {
    try {
      await onSchoolCreate(data)
      setIsSchoolDialogOpen(false)
      showToast('Your school has been submitted for review.', {
        intent: 'success'
      })
    } catch {
      showToast('Failed to submit school. Please try again.', {
        intent: 'error'
      })
    }
  }

  const handleResendMagicLink = async () => {
    try {
      await onEmailSubmit(selectedEmail)
      showToast('Magic link resent successfully.', {
        intent: 'success'
      })
      return true
    } catch {
      showToast('Failed to resend magic link. Please try again.', {
        intent: 'error'
      })
      return false
    }
  }

  const selectedSchool = selectedSchoolId ? schools.find(s => s.id === selectedSchoolId) : null

  return (
    <>
      <AnimatePresence mode="wait">
        {currentStep === 'school-pick' && (
          <motion.div
            key="school-pick"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <SchoolPick
              schools={schools}
              onSchoolSelect={handleSchoolSelect}
              onCreateSchool={() => setIsSchoolDialogOpen(true)}
            />
          </motion.div>
        )}

        {currentStep === 'email-gate' && selectedSchool && (
          <motion.div
            key="email-gate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <EmailGate
              schoolName={selectedSchool.name}
              schoolDomain={selectedSchool.domain}
              onBack={() => setCurrentStep('school-pick')}
              onDevContinue={() => handleEmailSubmit('dev@buffalo.edu')}
            />
          </motion.div>
        )}

        {currentStep === 'magic-link-sent' && selectedSchool && (
          <motion.div
            key="magic-link-sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <MagicLinkSent 
              email={selectedEmail}
              school={selectedSchool}
              onBack={() => setCurrentStep('email-gate')}
              onResend={handleResendMagicLink}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SchoolCreationDialog
        isOpen={isSchoolDialogOpen}
        onClose={() => setIsSchoolDialogOpen(false)}
        onSubmit={handleSchoolCreate}
      />
    </>
  )
} 