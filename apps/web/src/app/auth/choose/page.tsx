'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@hive/ui'
import { Mail, Globe, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

interface OptionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  disabled?: boolean
  disabledReason?: string
}

function OptionCard({ icon, title, description, href, disabled = false, disabledReason }: OptionCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (disabled) {
    return (
      <div className="relative">
        <div className="bg-surface-01/50 border border-border/30 rounded-xl p-6 cursor-not-allowed opacity-50">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center mr-4">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-muted font-display">{title}</h3>
              <p className="text-sm text-muted/60 font-sans">{description}</p>
            </div>
          </div>
          {disabledReason && (
            <p className="text-xs text-amber-500 font-sans bg-amber-500/10 px-3 py-2 rounded-md">
              {disabledReason}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <Link href={href}>
      <motion.div
        className="bg-surface-01 border border-border/20 rounded-xl p-6 hover:border-accent/40 transition-all duration-300 cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex items-center mb-4">
          <motion.div 
            className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-accent/20 transition-colors duration-300"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground font-display group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-muted font-sans">{description}</p>
          </div>
        </div>
        <div className="flex items-center text-accent text-sm font-medium font-sans">
          Continue
          <motion.div
            className="ml-2"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

export default function AuthChoosePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center justify-center min-h-screen px-8 py-12">
        {/* Back Button */}
        <motion.div
          className="self-start mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button asChild variant="ghost" className="text-muted hover:text-foreground group">
            <Link href="/welcome">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold font-display mb-4">
            Choose your path
          </h1>
          <p className="text-lg text-muted font-sans">
            How would you like to join HIVE?
          </p>
        </motion.div>

        {/* Auth Options */}
        <motion.div
          className="w-full max-w-md space-y-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <OptionCard
            icon={<Mail className="w-6 h-6 text-accent" />}
            title="Email (.edu)"
            description="Use your student email address"
            href="/auth/email"
          />
          
          <OptionCard
            icon={<Globe className="w-6 h-6 text-muted" />}
            title="Google SSO"
            description="Sign in with your Google account"
            href="/auth/google"
            disabled={true}
            disabledReason="Campus policy: email only"
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          className="flex items-center w-full max-w-md mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex-1 h-px bg-border/30"></div>
          <span className="px-4 text-sm text-muted font-sans">Your campus, your choice</span>
          <div className="flex-1 h-px bg-border/30"></div>
        </motion.div>

        {/* Alternative Option */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link 
            href="/auth/verify"
            className="text-sm text-muted hover:text-accent transition-colors duration-200 font-sans"
          >
            Already have a link? Paste it here
          </Link>
        </motion.div>
      </div>
    </div>
  )
} 