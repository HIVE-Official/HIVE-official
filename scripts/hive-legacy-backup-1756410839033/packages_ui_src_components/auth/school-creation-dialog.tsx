"use client";

import React from 'react'
import { Dialog } from '../dialog'
import { Button } from '../button'
import { motion } from 'framer-motion'

export interface SchoolCreationDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; domain: string }) => void
}

export const SchoolCreationDialog: React.FC<SchoolCreationDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSubmit({
      name: formData.get('name') as string,
      domain: formData.get('domain') as string,
    })
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Add Your School"
      description="Help us expand HIVE to your school by providing some basic information."
      size="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* School Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            School Name
          </label>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border border-border bg-surface-02 px-3 py-2 text-foreground placeholder:text-muted focus:border-[var(--hive-brand-secondary)] focus:outline-none focus:ring-1 focus:ring-gold"
              placeholder="e.g. University of Buffalo"
              autoComplete="organization"
            />
          </motion.div>
        </div>

        {/* School Domain */}
        <div className="flex flex-col gap-2">
          <label htmlFor="domain" className="text-sm font-medium">
            School Email Domain
          </label>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <input
              id="domain"
              name="domain"
              type="text"
              required
              className="w-full rounded-md border border-border bg-surface-02 px-3 py-2 text-foreground placeholder:text-muted focus:border-[var(--hive-brand-secondary)] focus:outline-none focus:ring-1 focus:ring-gold"
              placeholder="e.g. buffalo.edu"
              pattern="^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,}$"
              title="Please enter a valid domain (e.g. buffalo.edu)"
            />
          </motion.div>
          <p className="text-xs text-muted">
            This should be the domain students use for their school email (e.g.
            buffalo.edu)
          </p>
        </div>

        {/* Actions */}
        <motion.div
          className="flex justify-end gap-3 pt-2"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          <ButtonEnhanced
            type="button"
            variant="secondary"
            onClick={onClose}
            className="border-[var(--hive-brand-secondary)]/50 hover:border-[var(--hive-brand-secondary)]"
          >
            Cancel
          </ButtonEnhanced>
          <ButtonEnhanced type="submit">Submit Request</ButtonEnhanced>
        </motion.div>
      </form>
    </Dialog>
  )
} 